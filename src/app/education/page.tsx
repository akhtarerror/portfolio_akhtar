import type { Metadata } from "next";
import profile from "@/data/profile.json";
import educationData from "@/data/education.json";
import EducationEntry, { EducationItem } from "@/components/EducationEntry";

export const metadata: Metadata = {
  title: `Education — ${profile.name}`,
};

export default function EducationPage() {
  const education = educationData as EducationItem[];

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div
        className="shape-blob-1 pointer-events-none absolute -right-14 top-4 -z-10 h-56 w-56 bg-violet/15 sm:h-64 sm:w-64"
        aria-hidden
      />
      <p className="inline-block -rotate-1 rounded-md bg-coral px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-white">
        Education
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
        A trail of learning over the years.
      </h1>

      <div className="mt-14">
        {education.map((item, index) => (
          <EducationEntry key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
