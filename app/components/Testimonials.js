import { testimonials } from "../content";

export default function Testimonials() {
  // Drafts stay hidden — the section only renders once a real quote exists.
  const live = testimonials.filter((t) => !t.draft);
  if (live.length === 0) return null;

  return (
    <section id="testimonials" className="border-t bg-surface">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <p className="eyebrow text-accent">Kind words</p>
        <div className="mt-12 flex flex-col gap-16">
          {live.map((t, i) => (
            <figure key={i} className="relative max-w-3xl">
              <span
                aria-hidden
                className="absolute -left-1 -top-9 select-none font-display text-8xl leading-none text-accent opacity-20 sm:-left-6"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-display text-2xl font-medium leading-snug tracking-tight sm:text-[1.9rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-2 text-sm">
                <span className="font-medium">{t.name}</span>
                {t.role && <span className="text-muted">· {t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
