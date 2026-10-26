"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";

const INITIAL_LIMIT = 4;
const MAX_PHOTOS = 10;

export default function ExperienceGallery({
  photos,
  title,
  accentHex,
}: {
  photos: string[];
  title: string;
  accentHex: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cap at MAX_PHOTOS per card, as requested.
  const allPhotos = photos.slice(0, MAX_PHOTOS);
  const visible = allPhotos.slice(0, INITIAL_LIMIT);
  const hidden = allPhotos.slice(INITIAL_LIMIT);
  const remaining = hidden.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % allPhotos.length));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, allPhotos.length]);

  if (!photos || photos.length === 0) return null;

  const renderThumb = (src: string, i: number) => (
    <button
      key={src + i}
      type="button"
      onClick={() => setActiveIndex(i)}
      aria-label={`Lihat foto ${i + 1} dari ${title}`}
      className="group/thumb relative aspect-square overflow-hidden rounded-md border-2 border-ink"
    >
      <Image
        src={src}
        alt={`${title} — documentation ${i + 1}`}
        fill
        sizes="120px"
        className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
      />
    </button>
  );

  return (
    <div className="mt-4 border-t border-line pt-4" style={{ "--accent": accentHex } as React.CSSProperties}>
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
        <ImageIcon size={12} />
        Documentation ({allPhotos.length})
      </p>

      {/* Always-visible row */}
      <div className="grid grid-cols-4 gap-2">
        {visible.map((src, i) => renderThumb(src, i))}
      </div>

      {/* Smoothly expanding section for the rest of the photos */}
      {remaining > 0 && (
        <div
          className="grid transition-[grid-template-rows] duration-500 ease-in-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-4 gap-2 pt-2">
              {hidden.map((src, i) => renderThumb(src, i + INITIAL_LIMIT))}
            </div>
          </div>
        </div>
      )}

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] transition-opacity hover:opacity-70"
        >
          {expanded ? "View Less" : `View More (+${remaining})`}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {mounted &&
        activeIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} documentation foto`}
            onClick={() => setActiveIndex(null)}
          >
            <div className="relative max-h-full w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Tutup"
                className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-0.5"
              >
                <X size={18} />
              </button>

              <div className="relative overflow-hidden rounded-2xl border-2 border-ink bg-paper-tint shadow-[8px_8px_0_var(--ink)]">
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                  <Image
                    src={allPhotos[activeIndex]}
                    alt={`${title} — documentation ${activeIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {allPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((i) => (i === null ? i : (i - 1 + allPhotos.length) % allPhotos.length))
                    }
                    aria-label="Foto sebelumnya"
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-1/2 hover:scale-105"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((i) => (i === null ? i : (i + 1) % allPhotos.length))}
                    aria-label="Foto berikutnya"
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-transform hover:-translate-y-1/2 hover:scale-105"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-white">
                    {activeIndex + 1} / {allPhotos.length}
                  </p>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}