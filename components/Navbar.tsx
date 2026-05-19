"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#activity", label: "Activity" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-white/5 bg-white/[0.02] backdrop-blur-md"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 pl-2 text-sm font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] text-[11px] font-bold text-black">
            NS
          </span>
          <span className="hidden sm:inline">Nixon Siagian</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}
