"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// `id` is the homepage section this link targets — null for real routes, which
// are excluded from the scroll-spy.
const links = [
  { id: "services", label: "Services" },
  { id: "skills", label: "Toolkit" },
  { id: "projects", label: "Work" },
  { id: "about", label: "About" },
  { id: null, href: "/resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  // Hash links only resolve to a section when we're actually on the homepage;
  // from the case study or résumé page they need to navigate home first.
  const hrefFor = (l) => l.href ?? (isHome ? `#${l.id}` : `/#${l.id}`);

  // Scroll state drives the header's translucent backdrop, plus which pill is lit.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      if (!isHome) return;
      // Probe a little below the nav so a section counts as active once its
      // heading has cleared the header.
      const probe = window.scrollY + 140;
      let current = "";
      for (const l of links) {
        if (!l.id) continue;
        const el = document.getElementById(l.id);
        if (!el) continue;
        if (probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          current = l.id;
          break;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  // Lock the page behind the fullscreen mobile menu, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-end px-6 py-4 transition-all duration-500 md:justify-between md:px-10 ${
          scrolled
            ? "border-b border-white/5 bg-black/40 backdrop-blur-xl md:border-b-0 md:bg-transparent md:backdrop-blur-none"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/*
          Wordmark on the left, links on the right. The reference runs a single
          anonymous pill centred in the viewport with no logo at all — for someone
          being hired, having the name permanently on screen is worth more than
          the symmetry.
        */}
        <a
          href={isHome ? "#top" : "/"}
          className="hidden font-display text-sm font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:text-accent md:block"
        >
          Akeel<span className="text-accent">.</span>
        </a>

        <nav
          aria-label="Main"
          className="hidden items-center rounded-full border border-white/10 bg-surface/70 p-1 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl md:flex"
        >
          {links.map((l) => {
            const isActive = Boolean(l.id) && active === l.id;
            return (
              <a
                key={l.label}
                href={hrefFor(l)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-neutral-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile: hamburger only — the links live in the overlay below. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </header>

      {/* Fullscreen mobile menu. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-0 z-40 flex h-screen flex-col justify-center bg-black/95 px-8 backdrop-blur-2xl md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={hrefFor(l)}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 60}ms` }}
                className="rise border-b border-white/5 py-5 font-display text-3xl font-extrabold uppercase tracking-tight text-neutral-300 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={isHome ? "#contact" : "/#contact"}
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-xs font-bold uppercase tracking-wider text-accent-ink"
          >
            Start a project
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </>
  );
}
