"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { FiServer, FiTerminal, FiZap } from "react-icons/fi";

const pillars = [
  {
    icon: FiServer,
    title: "Infrastructure",
    body: "Containers, CI/CD, and reproducible environments. I treat infrastructure like code — versioned, reviewed, and boring on purpose.",
  },
  {
    icon: FiTerminal,
    title: "Backend & Automation",
    body: "Node.js & TypeScript services, scripting on Linux, glueing systems together with pipelines and tooling that pays for itself.",
  },
  {
    icon: FiZap,
    title: "DevOps Mindset",
    body: "Observability over guessing. Small blast radius. Fast feedback. If it's painful, automate it before it bites in production.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="About"
          title="Engineer focused on reliability and automation"
          description="I'm Nixon — I work where backend code meets infrastructure. My happy place is a clean pipeline, a healthy dashboard, and a deploy that nobody notices."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-colors hover:border-white/20"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-white/80">
                <p.icon className="text-lg" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
