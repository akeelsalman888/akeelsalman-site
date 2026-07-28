import Section from "./Section";
import { skills } from "../content";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      kicker="Toolkit"
      title="Languages & tools I work with"
      intro="Trimmed on purpose — everything here is something I've shipped with and can talk through in detail."
    >
      {/* A plain two-column grid. The decorative rotating rings that used to sit
          behind this were dropped: pure ornament, and one of the borrowed
          signature flourishes. */}
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((cat, i) => (
          <div
            key={cat.group}
            style={{ "--stagger-index": i }}
            data-tilt
            className="reveal-child group rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-accent/40 md:p-8"
          >
            <div className="flex items-baseline gap-3">
              <span
                aria-hidden="true"
                className="h-4 w-[3px] shrink-0 rounded-full bg-accent"
              />
              <h3 className="font-display text-xl font-extrabold tracking-tight text-white">
                {cat.group}
              </h3>
              <span
                aria-hidden="true"
                className="ml-auto font-mono text-[11px] text-neutral-600"
              >
                {cat.items.length} tools
              </span>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-neutral-300 transition-all duration-300 hover:border-accent/40 hover:text-white md:text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
