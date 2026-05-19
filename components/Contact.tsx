"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const channels = [
  {
    label: "GitHub",
    handle: "@NixonSiagian",
    href: "https://github.com/NixonSiagian",
    Icon: FiGithub,
  },
  {
    label: "LinkedIn",
    handle: "in/nixonsiagian",
    href: "https://www.linkedin.com/in/nixonsiagian",
    Icon: FiLinkedin,
  },
  {
    label: "Email",
    handle: "nixon.siagian@proton.me",
    href: "mailto:nixon.siagian@proton.me",
    Icon: FiMail,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something reliable"
          description="Open to DevOps and backend roles, freelance work, and interesting collaborations."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.25),transparent_60%)] blur-2xl"
          />
          <div className="relative grid gap-3 md:grid-cols-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/85">
                    <c.Icon className="text-base" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-sm text-white/85">
                      {c.handle}
                    </div>
                  </div>
                </div>
                <FiArrowUpRight className="text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            ))}
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-3 border-t border-white/5 pt-8 text-center">
            <p className="max-w-md text-sm text-white/60">
              Prefer email? Drop a line and I&apos;ll get back to you.
            </p>
            <a href="mailto:nixon.siagian@proton.me" className="btn-primary">
              <FiMail />
              Send an email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
