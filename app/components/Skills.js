import Section from "./Section";
import { skills } from "../content";

export default function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      kicker="Toolkit"
      title="Languages & tools I work with"
    >
      <div className="flex flex-col">
        {skills.map((cat) => (
          <div
            key={cat.group}
            className="grid grid-cols-1 gap-4 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[14rem_1fr] sm:gap-10"
          >
            <h3 className="font-display text-xl font-medium tracking-tight">
              {cat.group}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {cat.items.map((item) => (
                <li key={item} className="flex items-baseline gap-2 text-muted">
                  <span aria-hidden className="text-accent">
                    ▹
                  </span>
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
