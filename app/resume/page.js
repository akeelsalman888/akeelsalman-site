import Link from "next/link";
import { site, projects, skills, about } from "../content";
import { MailIcon, PhoneIcon, GitHubIcon, LinkedInIcon } from "../components/icons";
import PrintButton from "../components/PrintButton";

export const metadata = {
  title: `Résumé — ${site.name}`,
  description: `Résumé of ${site.name} — ${site.title}.`,
  alternates: { canonical: "/resume" },
};

// Résumé summary — composed from the site's own copy (no invented claims).
const summary =
  "Full-stack web developer specializing in websites, internal tools, and automation for organizations. Self-taught, with a Master's in Information Technology and a background teaching programming and IT. Recently shipped two production systems — a bilingual (English/Arabic) community website and an internal operations portal — solo, end to end.";

// Section heading: mono eyebrow with a hairline rule running out to the edge.
function Heading({ children }) {
  return (
    <h2 className="eyebrow flex items-center gap-3 text-neutral-500 print:text-neutral-700">
      {children}
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-white/10 print:bg-neutral-300"
      />
    </h2>
  );
}

const contacts = [
  { href: `mailto:${site.email}`, label: site.email, Icon: MailIcon },
  ...(site.phoneDisplay
    ? [{ href: `tel:${site.phone}`, label: site.phoneDisplay, Icon: PhoneIcon }]
    : []),
  { href: "https://akeelsalman.com", label: "akeelsalman.com", Icon: null },
  { href: site.socials.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
];

export default function ResumePage() {
  return (
    <main className="resume relative mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-25 print:hidden"
      />

      <div className="relative z-10">
        {/* Screen-only toolbar (hidden when printing). */}
        <div className="mb-12 flex items-center justify-between print:hidden">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-white"
          >
            ← Back to site
          </Link>
          <PrintButton className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-ink transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]" />
        </div>

        {/* Header */}
        <header className="border-b border-white/10 pb-8 print:border-neutral-300">
          <h1 className="font-display text-4xl font-black uppercase tracking-tighter text-white sm:text-6xl print:text-black">
            {site.name}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 sm:text-sm print:text-neutral-700">
            {site.title} · {site.location}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {contacts.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-1.5 text-neutral-300 transition-colors hover:text-white print:text-black"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_15rem]">
          {/* Main column */}
          <div className="flex flex-col gap-9">
            <section>
              <Heading>Summary</Heading>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400 print:text-neutral-800">
                {summary}
              </p>
            </section>

            <section>
              <Heading>Experience</Heading>
              <div className="mt-4 flex flex-col gap-6">
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-white print:text-black">
                    Freelance Web Developer
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 print:text-neutral-600">
                    Remote · Independent
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400 print:text-neutral-800">
                    Design, build, and ship full-stack web applications and
                    automation for organizations — end to end, solo. Selected
                    projects below.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-white print:text-black">
                    Programming &amp; IT Instructor
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400 print:text-neutral-800">
                    Taught programming fundamentals and IT skills to students and
                    professionals; explained technical concepts in plain language.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <Heading>Selected Projects</Heading>
              <div className="mt-4 flex flex-col gap-6">
                {projects.map((p) => (
                  <div key={p.name}>
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-white print:text-black">
                      {p.name}
                      {p.private && (
                        <span className="eyebrow ml-2 align-middle text-neutral-500 print:text-neutral-600">
                          (internal)
                        </span>
                      )}
                    </h3>
                    {p.url && !p.private && (
                      <p className="font-mono text-[11px] text-neutral-500 print:text-neutral-600">
                        {p.url.replace(/^https?:\/\//, "")}
                      </p>
                    )}
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400 print:text-neutral-800">
                      {p.description}
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-neutral-500 print:text-neutral-600">
                      {p.tech.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-9">
            <section>
              <Heading>Skills</Heading>
              <div className="mt-4 flex flex-col gap-4">
                {skills.map((g) => (
                  <div key={g.group}>
                    <h3 className="text-sm font-bold text-white print:text-black">
                      {g.group}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400 print:text-neutral-800">
                      {g.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>Education</Heading>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-snug text-neutral-400 print:text-neutral-800">
                {about.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
