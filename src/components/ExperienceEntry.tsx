import { getAccent } from "@/lib/theme";
import ExperienceGallery from "@/components/ExperienceGallery";

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  photos?: string[];
};

export default function ExperienceEntry({ item, index }: { item: ExperienceItem; index: number }) {
  const accent = getAccent(index);

  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${accent.border} ${accent.text}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-2 w-px flex-1 bg-line last:hidden" aria-hidden />
      </div>

      <div className="catalog-card p-6" style={{ "--accent": accent.hex } as React.CSSProperties}>
        <div className="flex flex-wrap items-center gap-3">
          <p className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}>{item.period}</p>
          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
            {item.type}
          </span>
        </div>

        <h3 className="mt-2 font-display text-xl text-ink">{item.role}</h3>
        <p className="mt-1 text-sm text-muted">
          {item.company} · {item.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>

        {item.highlights?.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink">
                <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accent.solid}`} />
                {h}
              </li>
            ))}
          </ul>
        )}

        <ExperienceGallery photos={item.photos ?? []} title={item.role} accentHex={accent.hex} />
      </div>
    </div>
  );
}
