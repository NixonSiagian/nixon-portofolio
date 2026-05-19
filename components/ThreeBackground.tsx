"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight animated 3D background:
 *  - Particle field (low-poly stars) drifting on a slow rotation
 *  - Subtle wireframe icosahedron in the background, rotating
 *  - Mouse parallax (desktop only)
 *  - Pauses when tab is hidden or element is offscreen
 *  - Reduces particle count and DPR on small viewports
 */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Particles ---------------------------------------------------------
    const PARTICLE_COUNT = isMobile ? 600 : 1800;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 1.5 + 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.025 : 0.018,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Wireframe icosahedron --------------------------------------------
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x7c5cff,
      transparent: true,
      opacity: 0.35,
    });
    const ico = new THREE.LineSegments(icoEdges, icoMat);
    scene.add(ico);

    // Secondary smaller wireframe for depth
    const ico2Geo = new THREE.IcosahedronGeometry(1.1, 0);
    const ico2Edges = new THREE.EdgesGeometry(ico2Geo);
    const ico2Mat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
    });
    const ico2 = new THREE.LineSegments(ico2Edges, ico2Mat);
    ico2.position.set(3, -1.2, -2);
    scene.add(ico2);

    // ---- Interaction -------------------------------------------------------
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.tx = nx;
      mouse.ty = ny;
    };
    if (!isMobile) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    // ---- Resize ------------------------------------------------------------
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ---- Visibility / IntersectionObserver --------------------------------
    let visible = true;
    let inView = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) inView = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(mount);

    // ---- Render loop -------------------------------------------------------
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible || !inView) return;

      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      // Smooth mouse easing
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const speed = reduceMotion ? 0.05 : 1;

      particles.rotation.y += dt * 0.04 * speed;
      particles.rotation.x += dt * 0.012 * speed;

      ico.rotation.x += dt * 0.12 * speed;
      ico.rotation.y += dt * 0.16 * speed;

      ico2.rotation.x -= dt * 0.18 * speed;
      ico2.rotation.y -= dt * 0.12 * speed;
      ico2.position.y = -1.2 + Math.sin(t * 0.6) * 0.2;

      // Parallax
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ---- Cleanup -----------------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();

      particleGeo.dispose();
      particleMat.dispose();
      icoGeo.dispose();
      icoEdges.dispose();
      icoMat.dispose();
      ico2Geo.dispose();
      ico2Edges.dispose();
      ico2Mat.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
