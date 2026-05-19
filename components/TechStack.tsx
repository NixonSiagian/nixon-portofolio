"use client";

import { motion } from "framer-motion";
import {
  SiNodedotjs,
  SiDocker,
  SiLinux,
  SiTypescript,
  SiGithubactions,
  SiNginx,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiTerraform,
  SiKubernetes,
  SiPrometheus,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

type Tool = {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
};

// Required tools first, then a few related ones to fill the grid nicely.
const tools: Tool[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Linux", Icon: SiLinux, color: "#F5F5F5" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "Terraform", Icon: SiTerraform, color: "#7B42BC" },
  { name: "Nginx", Icon: SiNginx, color: "#009639" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Prometheus", Icon: SiPrometheus, color: "#E6522C" },
];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I reach for"
          description="The toolbox I use day-to-day to ship, monitor, and keep things running smoothly."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {tools.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${t.color}22, transparent 65%)`,
                }}
              />
              <t.Icon
                className="text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{ color: t.color }}
              />
              <span className="font-mono text-[11px] tracking-wide text-white/70">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
