import { testimonials } from "../content";

export default function Testimonials() {
  // Drafts stay hidden — the section only renders once a real quote exists.
  const live = testimonials.filter((t) => !t.draft);
  if (live.length === 0) return null;

  return (
    <section id="testimonials" className="border-t bg-surface">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
        <p className="eyebrow text-accent">Kind words</p>
        <div className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-3">
          {live.map((t, i) => (
            <figure key={i} className="relative flex flex-col">
              <span
                aria-hidden
                className="select-none font-display text-6xl leading-none text-accent opacity-20"
              >
                &ldquo;
              </span>
              <blockquote className="relative -mt-4 flex-1 font-display text-lg font-medium leading-snug tracking-tight">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-0.5">
                <span className="text-sm font-medium">{t.name}</span>
                {t.role && <span className="text-xs text-muted">{t.role}</span>}
                {t.org && <span className="text-xs text-muted">{t.org}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
