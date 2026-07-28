import { site } from "../content";

/*
  Deliberately link-free. The four contact channels that used to live here as
  round icon buttons are now the card grid at the end of the Contact section
  directly above, so repeating them here would just duplicate them.
*/
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <a
            href="#top"
            className="font-display text-2xl font-black uppercase tracking-tighter text-white transition-colors hover:text-neutral-300"
          >
            {site.name}
          </a>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            {site.title}
          </p>
          <p className="mt-1 font-mono text-[11px] text-neutral-600">
            © 2026 · Built and designed by hand.
          </p>
        </div>

        <a
          href="#top"
          className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-wider text-neutral-500 transition-colors hover:text-white sm:self-auto"
        >
          <span aria-hidden>↑</span>
          Back to top
        </a>
      </div>
    </footer>
  );
}
