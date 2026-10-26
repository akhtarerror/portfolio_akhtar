import type { Metadata } from "next";
import profile from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import organizationData from "@/data/organization.json";
import { ExperienceItem } from "@/components/ExperienceEntry";
import ExperienceTabs from "@/components/ExperienceTabs";

export const metadata: Metadata = {
  title: `Experience — ${profile.name}`,
};

export default function ExperiencePage() {
  const experience = experienceData as ExperienceItem[];
  const organization = organizationData as ExperienceItem[];

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden px-6 py-20">
      <div
        className="shape-blob-2 pointer-events-none absolute -right-16 -top-10 -z-10 h-56 w-56 bg-yellow/25 sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="shape-circle pointer-events-none absolute -left-10 bottom-10 -z-10 h-24 w-24 bg-mint/20"
        aria-hidden
      />

      <p className="inline-block rotate-1 rounded-md bg-violet px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-white">
        Experience
      </p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
        My journey, from organization to career.
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        A summary of the roles, responsibilities, and organizations I&apos;ve been part of so far.
      </p>

      <div className="mt-10">
        <ExperienceTabs work={experience} organization={organization} />
      </div>
    </section>
  );
}
