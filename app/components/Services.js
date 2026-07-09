import Section from "./Section";
import { services } from "../content";

export default function Services() {
  return (
    <Section id="services" title="What I can help with">
      <div className="grid gap-6 sm:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border bg-surface p-6 transition-colors hover:border-accent"
          >
            <h3 className="mb-2 font-medium">{s.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
