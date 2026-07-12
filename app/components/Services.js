import Section from "./Section";
import { services } from "../content";

export default function Services() {
  return (
    <Section
      id="services"
      index="01"
      kicker="Services"
      title="What I can help you with"
    >
      <ol className="flex flex-col">
        {services.map((s, i) => (
          <li
            key={s.title}
            className="group grid grid-cols-1 gap-2 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-8"
          >
            <span className="font-display text-2xl italic text-faint transition-colors group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-medium tracking-tight">
              {s.title}
            </h3>
            <p className="leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
