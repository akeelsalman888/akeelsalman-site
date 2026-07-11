import Section from "./Section";
import { projects } from "../content";

function CardInner({ p, badge, footer }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{p.name}</h3>
        {badge}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {p.description}
      </p>
      {p.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border px-2.5 py-0.5 text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-4 text-xs text-muted">{footer}</span>
    </>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Selected work">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => {
          const cardBase = "flex flex-col rounded-xl border bg-surface p-6";

          // Case-study link (internal) — takes precedence once assets exist.
          if (p.caseStudyUrl) {
            return (
              <a
                key={p.name}
                href={p.caseStudyUrl}
                className={`group ${cardBase} transition-colors hover:border-accent`}
              >
                <CardInner
                  p={p}
                  badge={
                    <span className="text-xs text-muted transition-transform group-hover:translate-x-0.5">
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
              <div key={p.name} className={cardBase}>
                <CardInner
                  p={p}
                  badge={
                    <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted">
                      🔒 Internal
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
              className={`group ${cardBase} transition-colors hover:border-accent`}
            >
              <CardInner
                p={p}
                badge={
                  <span className="text-muted transition-transform group-hover:translate-x-0.5">
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
