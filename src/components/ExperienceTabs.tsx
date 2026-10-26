"use client";

import { useState } from "react";
import { getAccent } from "@/lib/theme";
import ExperienceEntry, { ExperienceItem } from "@/components/ExperienceEntry";

const TABS = [
  { key: "work", label: "Pengalaman Kerja" },
  { key: "org", label: "Pengalaman Organisasi" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function ExperienceTabs({
  work,
  organization,
}: {
  work: ExperienceItem[];
  organization: ExperienceItem[];
}) {
  const [active, setActive] = useState<TabKey>("work");
  const list = active === "work" ? work : organization;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab, i) => {
          const accent = getAccent(i);
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`rounded-full border-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-ink ${
                isActive ? `${accent.solid} border-ink text-white` : "border-ink/20 text-muted"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {list.map((item, index) => (
          <ExperienceEntry key={item.id} item={item} index={index} />
        ))}

        {list.length === 0 && (
          <p className="text-sm text-muted">Belum ada data untuk kategori ini.</p>
        )}
      </div>
    </div>
  );
}
