import Section from "./Section";
import { projects } from "../content";

function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/*
  Preview panel. Shows a real screenshot when the project has one; otherwise a
  stylised browser frame with the live domain. The frame is deliberately an
  obvious mock — never a stand-in that could be mistaken for a screenshot.
*/
function Preview({ project }) {
  const domain = project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative flex h-[220px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-2 shadow-lg transition-all duration-300 group-hover/card:border-white/20 sm:h-[260px] md:h-[320px] md:w-1/2">
      {/* Faux browser chrome — shared by both states so they feel like one system. */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
        <span aria-hidden className="h-2 w-2 rounded-full bg-neutral-700" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-neutral-700" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-neutral-700" />
        {domain && (
          <span className="ml-2 flex-1 truncate rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-neutral-500">
            {domain}
          </span>
        )}
      </div>

      <div className="relative flex-1 overflow-hidden">
        {project.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.name} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.04]"
            />
            {/* Fades the bottom of the shot into the card. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-2 to-transparent"
            />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="font-display text-2xl font-black tracking-tight text-neutral-700 transition-colors duration-500 group-hover/card:text-neutral-500 md:text-3xl">
              {project.name}
            </span>
            <span className="eyebrow text-neutral-700">Visit live site</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      index="01"
      kicker="Selected work"
      title="A few things I've built"
      intro="Two production systems for the same community organization — both designed, built, and shipped solo."
    >
      <div className="flex flex-col gap-8">
        {projects.map((p, i) => {
          const isCaseStudy = Boolean(p.caseStudyUrl);
          const href = p.caseStudyUrl ?? p.url;
          const external = !isCaseStudy;

          return (
            <a
              key={p.name}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              style={{ "--stagger-index": i }}
              data-tilt
              className={`reveal-child group/card relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-accent/40 md:gap-12 md:p-10 ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <Preview project={p} />

              <div className="w-full md:w-1/2">
                {/* Small accent index and a rule, rather than the huge ghosted
                    numeral the reference leads its cards with. */}
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="eyebrow text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px w-6 bg-accent/40" />
                  <span className="eyebrow text-neutral-400">
                    {isCaseStudy ? "Case study" : "Live site"}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover/card:text-accent md:text-4xl">
                  {p.name}
                </h3>

                <p className="mt-4 max-w-md text-xs leading-relaxed text-neutral-400 md:text-sm">
                  {p.description}
                </p>

                {p.tech.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-medium text-neutral-300 transition-colors duration-300 group-hover/card:border-white/10 md:text-xs"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="mt-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 transition-colors duration-300 group-hover/card:text-accent">
                  {isCaseStudy
                    ? "Read the case study"
                    : `Visit ${p.url.replace(/^https?:\/\//, "")}`}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
