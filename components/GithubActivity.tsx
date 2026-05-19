"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const GITHUB_USER = "NixonSiagian";

type Profile = {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  html_url: string;
  created_at: string;
};

export default function GithubActivity() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setProfile(data))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  const stats = [
    { label: "Public repos", value: profile?.public_repos ?? "—" },
    { label: "Followers", value: profile?.followers ?? "—" },
    { label: "Following", value: profile?.following ?? "—" },
    {
      label: "On GitHub since",
      value: profile?.created_at
        ? new Date(profile.created_at).getFullYear()
        : "—",
    },
  ];

  return (
    <section id="activity" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="GitHub Activity"
          title="Live from my GitHub"
          description="Stats and contributions, pulled in real time."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/[0.04]">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.name || GITHUB_USER}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-white/40">
                    NS
                  </div>
                )}
              </div>
              <div>
                <div className="text-base font-semibold">
                  {profile?.name || "Nixon Siagian"}
                </div>
                <a
                  href={`https://github.com/${GITHUB_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/55 hover:text-white"
                >
                  @{GITHUB_USER}
                </a>
              </div>
            </div>
            {profile?.bio && (
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {profile.bio}
              </p>
            )}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                    {s.label}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
            >
              <FiGithub /> View profile <FiArrowUpRight />
            </a>
          </motion.div>

          {/* Contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Contributions
                </div>
                <div className="mt-1 text-base font-semibold">
                  Last year of activity
                </div>
              </div>
              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/70 hover:text-white"
              >
                Open on GitHub
              </a>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-white/5 bg-black/30 p-4">
              {/* ghchart provides a simple SVG contribution graph */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://ghchart.rshah.org/7c5cff/${GITHUB_USER}`}
                alt={`${GITHUB_USER} GitHub contribution chart`}
                loading="lazy"
                className="min-w-[640px] opacity-90"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&theme=transparent&hide_border=true&text_color=ffffff&title_color=ffffff&bg_color=00000000`}
                alt="Top languages"
                loading="lazy"
                className="w-full rounded-xl border border-white/5 bg-black/30 p-3"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&theme=transparent&hide_border=true&text_color=ffffff&title_color=ffffff&icon_color=7c5cff&bg_color=00000000`}
                alt="GitHub stats"
                loading="lazy"
                className="w-full rounded-xl border border-white/5 bg-black/30 p-3"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
