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
  Icon: React.ElementType;
  /** Tailwind text-color class, e.g. "text-green-500". Drives both the icon color and the hover glow via currentColor. */
  color: string;
};

// Required tools first, then a few related ones to fill the grid nicely.
const tools: Tool[] = [
  { name: "Node.js", Icon: SiNodedotjs, color: "text-green-600" },
  { name: "Docker", Icon: SiDocker, color: "text-sky-500" },
  { name: "Linux", Icon: SiLinux, color: "text-neutral-100" },
  { name: "TypeScript", Icon: SiTypescript, color: "text-blue-600" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "text-blue-500" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "text-blue-600" },
  { name: "Terraform", Icon: SiTerraform, color: "text-purple-600" },
  { name: "Nginx", Icon: SiNginx, color: "text-green-700" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "text-indigo-600" },
  { name: "Redis", Icon: SiRedis, color: "text-red-500" },
  { name: "Next.js", Icon: SiNextdotjs, color: "text-white" },
  { name: "Prometheus", Icon: SiPrometheus, color: "text-orange-600" },
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
          {tools.map(({ name, Icon, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04] ${color}`}
            >
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,currentColor,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.13]"
              />
              <Icon className="text-3xl transition-transform duration-300 group-hover:scale-110" />
              <span className="font-mono text-[11px] tracking-wide text-white/70">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
