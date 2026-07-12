import Section from "./Section";
import { projects } from "../content";

function RowInner({ p, index, badge, footer }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[3rem_1fr]">
      <span className="font-display text-2xl italic text-faint transition-colors group-hover:text-accent">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
            {p.name}
          </h3>
          {badge}
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          {p.description}
        </p>
        {p.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <li
                key={t}
                className="eyebrow rounded-full border px-3 py-1 text-[0.65rem] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-5 block text-sm text-faint">{footer}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const rowBase =
    "group block border-t py-10 first:border-t-0 first:pt-0 transition-colors";

  return (
    <Section
      id="projects"
      index="03"
      kicker="Selected work"
      title="A few things I've built"
    >
      <div className="flex flex-col">
        {projects.map((p, i) => {
          // Case-study link (internal) — takes precedence once assets exist.
          if (p.caseStudyUrl) {
            return (
              <a key={p.name} href={p.caseStudyUrl} className={rowBase}>
                <RowInner
                  p={p}
                  index={i}
                  badge={
                    <span className="eyebrow text-muted transition-transform group-hover:translate-x-1">
                      Case study →
                    </span>
                  }
                  footer="View screenshots & walkthrough"
                />
              </a>
            );
          }

          // Private, SSO-gated portal — not clickable, no dead login-wall link.
          if (p.private) {
            return (
              <div key={p.name} className={rowBase}>
                <RowInner
                  p={p}
                  index={i}
                  badge={
                    <span className="eyebrow rounded-full border px-3 py-1 text-[0.65rem] text-muted">
                      Internal
                    </span>
                  }
                  footer="Private internal portal — walkthrough available on request"
                />
              </div>
            );
          }

          // Public project — external link (default).
          return (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={rowBase}
            >
              <RowInner
                p={p}
                index={i}
                badge={
                  <span className="text-lg text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                    ↗
                  </span>
                }
                footer={p.url.replace(/^https?:\/\//, "")}
              />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
