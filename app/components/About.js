import Section from "./Section";
import { about } from "../content";

export default function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-10 sm:grid-cols-3">
        <div className="space-y-4 text-muted sm:col-span-2">
          {about.paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div>
          <h3 className="mb-3 text-sm font-medium">Credentials</h3>
          <ul className="space-y-2 text-sm text-muted">
            {about.credentials.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-accent">▹</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
