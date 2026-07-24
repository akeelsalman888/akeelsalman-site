import Section from "./Section";
import { projects } from "../content";

function ScreenshotsIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 17 4.5-4.5 3 3L16 11l4 4" />
    </svg>
  );
}

function ExternalLinkIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function RowInner({ p, index, badge, footer, footerAccent, footerIcon }) {
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
        {footerAccent ? (
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition-colors group-hover:bg-accent/20">
            {footerIcon}
            {footer}
          </span>
        ) : (
          <span className="mt-5 block text-sm text-faint">{footer}</span>
        )}
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
                    <span className="eyebrow rounded-full bg-accent px-3 py-1 text-accent-ink transition-transform group-hover:translate-x-1">
                      Case study →
                    </span>
                  }
                  footer="View screenshots & walkthrough"
                  footerAccent
                  footerIcon={<ScreenshotsIcon className="h-4 w-4" />}
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
                  <span className="eyebrow rounded-full bg-accent px-3 py-1 text-accent-ink transition-transform group-hover:translate-x-1">
                    Visit live site ↗
                  </span>
                }
                footer={`Built by me — ${p.url.replace(/^https?:\/\//, "")}`}
                footerAccent
                footerIcon={<ExternalLinkIcon className="h-4 w-4" />}
              />
            </a>
          );
        })}
      </div>
    </Section>
  );
}
