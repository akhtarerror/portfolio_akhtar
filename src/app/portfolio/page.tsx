"use client";

import { useMemo, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import PortfolioCard, { PortfolioItem } from "@/components/PortfolioCard";
import { getAccent } from "@/lib/theme";

const items = portfolioData as PortfolioItem[];

export default function PortfolioPage() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], []);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div
        className="shape-blob-3 pointer-events-none absolute -left-20 top-32 -z-10 h-72 w-72 bg-yellow/15"
        aria-hidden
      />
      <p className="inline-block rotate-1 rounded-md bg-mint px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-white">
        Work Archive
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
        Project Portfolio
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        A collection of projects I&apos;ve worked on, from small landing pages to full-featured web applications. Click any image to take a closer look.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categories.map((cat, i) => {
          const accent = getAccent(i);
          const activeClass = active === cat ? `${accent.solid} border-ink text-white` : "border-ink/20 text-muted";
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-ink ${activeClass}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {filtered.map((item, i) => (
          <PortfolioCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted">No projects in this category yet.</p>
      )}
    </section>
  );
}
