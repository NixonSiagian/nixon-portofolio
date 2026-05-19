"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-white/45 md:flex-row">
        <div className="font-mono">
          © {year} Nixon Siagian — built with Next.js & Three.js.
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22c55e]" />
          all systems operational
        </div>
      </div>
    </footer>
  );
}
