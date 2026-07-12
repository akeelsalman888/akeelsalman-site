import Section from "./Section";
import { about } from "../content";

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section id="about" index="04" kicker="About" title="A little about me">
      <div className="grid gap-12 sm:grid-cols-3 sm:gap-16">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-[1.75rem]">
            {lead}
          </p>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <aside>
          <h3 className="eyebrow text-faint">Credentials</h3>
          <ul className="mt-4 space-y-4">
            {about.credentials.map((c) => (
              <li key={c} className="flex gap-3 leading-snug">
                <span aria-hidden className="mt-1 text-accent">
                  ▹
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
