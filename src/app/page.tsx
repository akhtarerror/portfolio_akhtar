import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import profile from "@/data/profile.json";
import portfolioData from "@/data/portfolio.json";
import experienceData from "@/data/experience.json";
import PortfolioCard, { PortfolioItem } from "@/components/PortfolioCard";

const featured = (portfolioData as PortfolioItem[]).filter((p) => p.featured).slice(0, 2);
const latestJob = experienceData[0];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="grain-bg relative overflow-hidden border-b-2 border-ink">
        {/* scattered decorative shapes — the "mainin shape" signature */}
        <div
          className="shape-blob-1 pointer-events-none absolute -right-10 -top-16 h-56 w-56 bg-blue/20 sm:h-72 sm:w-72"
          aria-hidden
        />
        <div
          className="shape-triangle pointer-events-none absolute right-24 top-40 hidden h-16 w-16 bg-yellow/60 sm:block"
          aria-hidden
        />
        <div
          className="shape-circle pointer-events-none absolute -left-8 top-24 h-20 w-20 bg-coral/25"
          aria-hidden
        />
        <div
          className="shape-diamond pointer-events-none absolute bottom-10 right-10 hidden h-10 w-10 bg-mint/50 md:block"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-5xl flex-col-reverse gap-10 px-6 pt-24 md:flex-row md:items-end md:justify-between md:pt-32">
          <div className="flex max-w-xl flex-col gap-10 pb-24 md:self-center md:pb-32">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink bg-mint px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
              <MapPin size={14} className="text-white" />
              {profile.location} — available for new projects
            </div>

            <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
              {profile.name},<br />
              <span className="text-blue">{profile.role}.</span>
            </h1>

            <p className="text-lg leading-relaxed text-muted">{profile.tagline}</p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-coral px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]"
              >
                View Portfolio
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]"
              >
                Get to Know Me
              </Link>
            </div>
          </div>

          {/* profile photo — full photo, flush to the bottom of the hero section */}
          <div className="relative mx-auto flex shrink-0 justify-center md:mx-0 md:self-end">
            <div className="relative h-[320px] w-[240px] overflow-hidden sm:h-[400px] sm:w-[300px] md:h-[520px] md:w-[380px]">
              <Image
                src="/photo_profile.png"
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 300px, 380px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATALOG CARD */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="catalog-card grid grid-cols-1 gap-6 p-8 sm:grid-cols-3">
          <div>
            <p className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-violet">
              <Sparkles size={14} /> Index Card
            </p>
            <p className="mt-2 font-display text-xl text-ink">Quick Overview</p>
          </div>
          <div className="flex flex-col gap-1 border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <span className="font-mono text-[11px] uppercase tracking-widest text-mint">Email</span>
            <span className="text-sm text-ink">{profile.email}</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <span className="font-mono text-[11px] uppercase tracking-widest text-coral">Core Skills</span>
            <span className="text-sm text-ink">{profile.skills.slice(0, 3).join(", ")}</span>
          </div>
        </div>
      </section>

      {/* LATEST EXPERIENCE TEASER */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue">Latest Experience</p>
            <h2 className="mt-2 font-display text-3xl text-ink">What I&apos;m Up To Now</h2>
          </div>
          <Link
            href="/experience"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-blue sm:inline-flex sm:items-center sm:gap-1"
          >
            All Experience <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="catalog-card p-7">
          <span className="font-mono text-[11px] uppercase tracking-widest text-blue">{latestJob.period}</span>
          <h3 className="mt-2 font-display text-2xl text-ink">{latestJob.role}</h3>
          <p className="mt-1 text-sm font-semibold text-coral">{latestJob.company}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{latestJob.description}</p>
        </div>
      </section>

      {/* FEATURED PORTFOLIO */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Featured Projects</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Recent Work</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-mint sm:inline-flex sm:items-center sm:gap-1"
          >
            All Projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {featured.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}