"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiGithub } from "react-icons/fi";

// Three.js is heavy — load it client-side only and lazily.
const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid bg-grid-mask opacity-60" />

      {/* Gradient haze */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Content */}
      <div className="container-page relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="section-label"
        >
          Available for opportunities
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-balance font-sans text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          <span className="text-gradient">Nixon Siagian</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-4 font-mono text-sm text-white/60 md:text-base"
        >
          <span className="text-white/80">DevOps Engineer</span>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-white/80">Software Developer</span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-6 max-w-xl text-balance text-base text-white/65 md:text-lg"
        >
          I build reliable infrastructure, automate the boring parts, and ship
          clean backend systems that don&apos;t wake anyone up at 3 AM.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="#projects" className="btn-primary">
            View Projects
            <FiArrowDownRight className="text-base" />
          </a>
          <a
            href="https://github.com/NixonSiagian"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FiGithub className="text-base" />
            GitHub
          </a>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md"
        >
          {[
            { k: "Focus", v: "DevOps · Backend" },
            { k: "Stack", v: "Node · Docker · Linux" },
            { k: "Mindset", v: "Automate everything" },
          ].map((s) => (
            <div key={s.k} className="px-4 py-4 text-left">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                {s.k}
              </div>
              <div className="mt-1 text-xs font-medium text-white/85 md:text-sm">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 justify-center rounded-full border border-white/15 p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
