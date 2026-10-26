"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { getAccent } from "@/lib/theme";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  featured?: boolean;
};

const CATEGORY_ACCENT: Record<string, number> = {
  "Web Application": 0, // blue
  "Landing Page": 2, // yellow
  "Mobile Application": 1, // coral
};

const DESCRIPTION_LIMIT = 50;

export default function PortfolioCard({ item, index = 0 }: { item: PortfolioItem; index?: number }) {
  const accentIndex = CATEGORY_ACCENT[item.category] ?? index;
  const accent = getAccent(accentIndex);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const isDescriptionTruncated = item.description.length > DESCRIPTION_LIMIT;
  const shortDescription = isDescriptionTruncated
    ? `${item.description.slice(0, DESCRIPTION_LIMIT).trimEnd()}...`
    : item.description;

  useEffect(() => {
    if (!open && !detailOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDetailOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, detailOpen]);

  return (
    <>
      <div
        className="catalog-card group flex flex-col justify-between p-6"
        style={{ "--accent": accent.hex } as React.CSSProperties}
      >
        <div>
          <div className="mb-4 flex items-start justify-between">
            <span
              className={`catalog-stamp rounded-full border px-2 py-1 ${accent.border} ${accent.text}`}
            >
              No.{item.id} — {item.year}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Enlarge image for ${item.title}`}
            className="group/img relative mb-4 block aspect-[4/3] w-full overflow-hidden rounded-md border-2 border-ink bg-paper-tint"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover transition-transform duration-300 group-hover/img:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-200 group-hover/img:bg-ink/40 group-hover/img:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full border-2 border-cream bg-ink/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-cream">
                <ZoomIn size={14} />
                View image
              </span>
            </span>
          </button>

          <p className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}>
            {item.category}
          </p>
          <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{shortDescription}</p>
          {isDescriptionTruncated && (
            <button
              type="button"
              onClick={() => setDetailOpen(true)}
              className={`mt-2 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest ${accent.text} hover:underline`}
            >
              Lihat Detail
              <ArrowUpRight size={12} />
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-coral px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]">
          Visit Project
          <ArrowUpRight size={16} />
        </a>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} image preview`}
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close preview"
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-0.5"
            >
              <X size={18} />
            </button>

            <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-paper-tint shadow-[8px_8px_0_var(--ink)]">
              <Image
                src={item.image}
                alt={item.title}
                width={1920}
                height={1440}
                sizes="(max-width: 768px) 100vw, 90vw"
                className="h-auto max-h-[92vh] w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {detailOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} full details`}
          onClick={() => setDetailOpen(false)}
        >
          <div className="relative w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setDetailOpen(false)}
              aria-label="Close details"
              className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-0.5"
            >
              <X size={18} />
            </button>

            {/* area scroll: hanya vertikal, horizontal dikunci */}
            <div className="max-h-[92vh] overflow-y-auto overflow-x-hidden overscroll-contain pb-2 pr-2 pt-1">
            <div
              className="catalog-card flex flex-col justify-between break-words p-6 shadow-[8px_8px_0_var(--ink)]"
              style={{ "--accent": accent.hex } as React.CSSProperties}
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={`catalog-stamp rounded-full border px-2 py-1 ${accent.border} ${accent.text}`}
                  >
                    No.{item.id} — {item.year}
                  </span>
                </div>

                <div className="relative mb-4 block aspect-[4/3] w-full overflow-hidden rounded-md border-2 border-ink bg-paper-tint">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 576px"
                    className="object-cover"
                  />
                </div>

                <p className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}>
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-coral px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]"
              >
                Visit Project
                <ArrowUpRight size={16} />
              </a>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}