"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle radial glow that follows the cursor.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (isTouch) return;
    setEnabled(true);

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
    >
      <div
        ref={ref}
        className="h-[600px] w-[600px] rounded-full opacity-[0.18] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(124,92,255,0.6) 0%, rgba(34,211,238,0.25) 35%, transparent 70%)",
        }}
      />
    </div>
  );
}
