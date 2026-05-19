"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUpRight, FiGithub, FiStar, FiGitBranch } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

const GITHUB_USER = "NixonSiagian";

// Curated fallback so the section is never empty (e.g. if GitHub rate-limits).
const FALLBACK: Repo[] = [
  {
    id: 1,
    name: "nixon-portofolio",
    full_name: `${GITHUB_USER}/nixon-portofolio`,
    description:
      "Personal developer portfolio — Next.js, Tailwind, Framer Motion, Three.js.",
    html_url: `https://github.com/${GITHUB_USER}/nixon-portofolio`,
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "tailwindcss", "threejs", "portfolio"],
    fork: false,
    archived: false,
  },
];

function langColor(lang: string | null) {
  const map: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Shell: "#89e051",
    Dockerfile: "#384d54",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    PHP: "#4F5D95",
  };
  return (lang && map[lang]) || "#7c5cff";
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              b.forks_count - a.forks_count,
          )
          .slice(0, 6);
        if (filtered.length > 0) setRepos(filtered);
      })
      .catch(() => {
        /* fall back silently */
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Selected work from GitHub"
          description="A live snapshot of what I've been building. Pulled directly from my GitHub profile."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,0%), rgba(124,92,255,0.18), transparent 40%)",
                }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <FiGithub className="text-sm" />
                  <span className="font-mono">{repo.full_name}</span>
                </div>
                <FiArrowUpRight className="text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                {repo.name}
              </h3>
              <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-white/60">
                {repo.description ||
                  "No description provided — but it's probably useful."}
              </p>

              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-xs text-white/55">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: langColor(repo.language) }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <FiStar className="text-[11px]" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiGitBranch className="text-[11px]" />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}

          {loading &&
            Array.from({ length: Math.max(0, 3 - repos.length) }).map((_, i) => (
              <div
                key={`skel-${i}`}
                className="h-56 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]"
              />
            ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View all repositories
            <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
