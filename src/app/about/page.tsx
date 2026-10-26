import type { Metadata } from "next";
import { Download } from "lucide-react";
import profile from "@/data/profile.json";
import { getAccent } from "@/lib/theme";

export const metadata: Metadata = {
  title: `About — ${profile.name}`,
};

export default function AboutPage() {
  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div
        className="shape-blob-1 pointer-events-none absolute -right-16 -top-8 -z-10 h-64 w-64 bg-coral/15 sm:h-80 sm:w-80"
        aria-hidden
      />
      <p className="inline-block -rotate-1 rounded-md bg-blue px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-white">
        About Me
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
        A little story about who I am and how I work.
      </h1>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="catalog-card h-fit p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-mint">Skills Card</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => {
              const accent = getAccent(i);
              return (
                <li
                  key={skill}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs text-ink ${accent.border} ${accent.tintBg}`}
                >
                  {skill}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <a
        href="/CV_Akhtar-Faizi-Putra_2026.pdf"
        download
        className="mt-14 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-coral px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]"
      >
        <Download size={16} />
        Download CV
      </a>
    </section>
  );
}