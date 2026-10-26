import ExperienceGallery from "@/components/ExperienceGallery";

export type EducationItem = {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  achievements: string[];
  photos?: string[];
};

export default function EducationEntry({ item, index }: { item: EducationItem; index: number }) {
  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-coral font-mono text-xs text-coral">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-2 w-px flex-1 bg-line last:hidden" aria-hidden />
      </div>

      <div className="catalog-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-coral">{item.period}</p>
        <h3 className="mt-2 font-display text-xl text-ink">{item.degree}</h3>
        <p className="mt-1 text-sm text-muted">
          {item.institution} · {item.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>

        {item.achievements?.length > 0 && (
          <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-4">
            {item.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-ink">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                {a}
              </li>
            ))}
          </ul>
        )}

        <ExperienceGallery photos={item.photos ?? []} title={item.degree} accentHex="#ff6452" />
      </div>
    </div>
  );
}
