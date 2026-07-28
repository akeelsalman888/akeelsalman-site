import Section from "./Section";
import { services } from "../content";

export default function Services() {
  return (
    <Section
      id="services"
      index="02"
      kicker="Services"
      title="What I can help you with"
      intro="Three things I do end to end — from the first conversation to the system running in production."
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <li
            key={s.title}
            style={{ "--stagger-index": i }}
            data-tilt
            className="reveal-child group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-accent/40 md:p-8"
          >
            {/* Accent rule that draws itself across the top edge on hover —
                replaces the oversized ghosted numeral this card used to lead
                with, which was lifted wholesale from the reference. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />

            <span className="eyebrow text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-5 font-display text-xl font-extrabold tracking-tight text-white">
              {s.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
