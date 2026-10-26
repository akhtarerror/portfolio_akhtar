import profile from "@/data/profile.json";
import { getAccent } from "@/lib/theme";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper-tint">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center text-sm text-muted">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {profile.name} — built with Next.js
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          {profile.socials.map((s, i) => {
            const accent = getAccent(i);
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs uppercase tracking-widest text-muted transition-colors ${accent.hoverText}`}
              >
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
