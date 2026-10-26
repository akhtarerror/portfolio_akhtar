"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import profile from "@/data/profile.json";
import { getAccent } from "@/lib/theme";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/portfolio", label: "Portfolio" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/" className="font-display text-lg tracking-tight text-ink">
            {profile.name.split(" ")[0]}
            <span className="text-coral">.</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item, i) => {
              const active = pathname === item.href;
              const accent = getAccent(i);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    active ? `${accent.text} tab-active` : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md border-2 border-ink p-1.5 text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* backdrop — rendered outside <header> so its blurred backdrop-filter
          doesn't turn the header into a containing block for these fixed elements */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[90] bg-ink/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* slide-in drawer from the left */}
      <nav
        aria-hidden={!open}
        className={`fixed left-0 top-0 z-[100] flex h-full w-72 max-w-[80%] flex-col gap-1 border-r-2 border-ink bg-cream px-6 py-5 shadow-[8px_0_0_rgba(33,26,53,0.15)] transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-lg tracking-tight text-ink"
          >
            {profile.name.split(" ")[0]}
            <span className="text-coral">.</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="rounded-md border-2 border-ink p-1.5 text-ink"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {NAV_ITEMS.map((item, i) => {
          const active = pathname === item.href;
          const accent = getAccent(i);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`w-fit rounded-md px-2 py-2 font-mono text-xs uppercase tracking-widest ${
                active ? `${accent.solid} text-white` : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}