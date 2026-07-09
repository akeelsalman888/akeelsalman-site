import Section from "./Section";
import { projects } from "../content";

export default function Projects() {
  return (
    <Section id="projects" title="Selected work">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-xl border bg-surface p-6 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{p.name}</h3>
              <span className="text-muted transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
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
            <span className="mt-4 text-xs text-muted">
              {p.url.replace(/^https?:\/\//, "")}
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
