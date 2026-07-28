import Section from "./Section";
import { testimonials } from "../content";

export default function Testimonials() {
  // Drafts stay hidden — the section only renders once a real quote exists.
  const live = testimonials.filter((t) => !t.draft);
  if (live.length === 0) return null;

  return (
    <Section
      id="testimonials"
      index="05"
      kicker="Kind words"
      title="What clients say"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {live.map((t, i) => (
          <figure
            key={t.name}
            style={{ "--stagger-index": i }}
            data-tilt
            className="reveal-child group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-surface-2/40 md:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.02] blur-3xl transition-colors duration-500 group-hover:bg-white/[0.05]"
            />

            <span
              aria-hidden="true"
              className="relative select-none font-display text-6xl font-black leading-none text-accent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
            >
              &ldquo;
            </span>

            <blockquote className="relative -mt-4 flex-1 text-sm leading-relaxed text-neutral-300">
              {t.quote}
            </blockquote>

            <figcaption className="relative mt-6 flex flex-col gap-1 border-t border-white/5 pt-5">
              <span className="font-display text-base font-extrabold tracking-tight text-white">
                {t.name}
              </span>
              {t.role && (
                <span className="font-mono text-[11px] text-neutral-400">
                  {t.role}
                </span>
              )}
              {t.org && (
                <span className="font-mono text-[11px] text-neutral-500">
                  {t.org}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
