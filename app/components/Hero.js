import { site } from "../content";
import TypeRotator from "./TypeRotator";
import { MailIcon, GitHubIcon, LinkedInIcon } from "./icons";

// Rotating titles — each one is something the work in content.js actually backs up.
const titles = [
  "Full-Stack Web Developer",
  "React & Next.js Developer",
  "Internal Tools Builder",
  "Automation Engineer",
];

// Kept to tools he can defend in an interview (mirrors the toolkit section).
const stack = ["React", "Next.js", "Node.js", "Google Apps Script", "Playwright"];

const socials = [
  { href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-16 pt-28"
    >
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/5"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center sm:px-8">
        {/* Availability — the one thing a prospective client should see first. */}
        <a
          href="#contact"
          className="rise inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md transition-colors duration-300 hover:border-accent/50 hover:text-white"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for work
        </a>

        {/*
          The name must never wrap. `whitespace-nowrap` guarantees one line, and
          the fluid clamp keeps that line inside the viewport at every width:
          it scales with vw on small screens and caps at 7.5rem so the rendered
          text stays narrower than this section's max-w-5xl container on desktop.
          Fixed breakpoint sizes can't do both — text-9xl overflowed, and a size
          small enough to fit desktop looked weak on mobile.
        */}
        <h1
          className="rise whitespace-nowrap font-display text-[clamp(2rem,10.5vw,7.5rem)] font-black uppercase leading-none tracking-[-0.045em] text-white"
          style={{ animationDelay: "80ms" }}
        >
          {site.name}
        </h1>

        <div className="rise h-10 md:h-12" style={{ animationDelay: "140ms" }}>
          <TypeRotator phrases={titles} />
        </div>

        <p
          className="rise max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          I build websites and internal tools for organizations — and automate the
          manual work behind them. I&apos;ve shipped two production systems for a
          community organization, solo, end to end.
        </p>

        <ul
          className="rise flex flex-wrap justify-center gap-2.5"
          style={{ animationDelay: "250ms" }}
        >
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-white/10 bg-surface-2 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-200 transition-colors duration-300 hover:border-accent/50 hover:text-white"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div
          className="rise flex w-full flex-col justify-center gap-4 pt-2 sm:w-auto sm:flex-row"
          style={{ animationDelay: "300ms" }}
        >
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-ink shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] sm:w-auto"
          >
            Start a project
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#projects"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/[0.06] active:scale-[0.98] sm:w-auto"
          >
            See selected work
          </a>
        </div>

        <div
          className="rise flex justify-center gap-6 pt-4 text-neutral-500"
          style={{ animationDelay: "360ms" }}
        >
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="transition-colors duration-300 hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <p
          className="rise eyebrow pt-2 text-neutral-600"
          style={{ animationDelay: "420ms" }}
        >
          {site.location}
        </p>
      </div>
    </section>
  );
}
