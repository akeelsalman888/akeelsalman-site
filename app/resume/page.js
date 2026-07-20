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

export default function ResumePage() {
  return (
    <main className="resume mx-auto w-full max-w-4xl px-6 py-12 sm:py-16">
      {/* Screen-only toolbar (hidden when printing). */}
      <div className="mb-10 flex items-center justify-between print:hidden">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-accent">
          ← Back to site
        </Link>
        <PrintButton className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5" />
      </div>

      {/* Header */}
      <header className="border-b pb-6">
        <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-2 text-lg text-muted">
          {site.title} · {site.location}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              href={`mailto:${site.email}`}
            >
              <MailIcon className="h-4 w-4" />
              {site.email}
            </a>
          </li>
          {site.phoneDisplay && (
            <li>
              <a
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                href={`tel:${site.phone}`}
              >
                <PhoneIcon className="h-4 w-4" />
                {site.phoneDisplay}
              </a>
            </li>
          )}
          <li>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              href="https://akeelsalman.com"
            >
              akeelsalman.com
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </li>
        </ul>
      </header>

      <div className="mt-8 grid gap-10 sm:grid-cols-[1fr_15rem]">
        {/* Main column */}
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="eyebrow text-accent">Summary</h2>
            <p className="mt-3 leading-relaxed text-muted">{summary}</p>
          </section>

          <section>
            <h2 className="eyebrow text-accent">Experience</h2>
            <div className="mt-3 flex flex-col gap-5">
              <div>
                <h3 className="font-display text-lg font-medium">Freelance Web Developer</h3>
                <p className="text-sm text-faint">Remote · Independent</p>
                <p className="mt-1 leading-relaxed text-muted">
                  Design, build, and ship full-stack web applications and automation for
                  organizations — end to end, solo. Selected projects below.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg font-medium">Programming &amp; IT Instructor</h3>
                <p className="mt-1 leading-relaxed text-muted">
                  Taught programming fundamentals and IT skills to students and
                  professionals; explained technical concepts in plain language.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="eyebrow text-accent">Selected Projects</h2>
            <div className="mt-3 flex flex-col gap-5">
              {projects.map((p) => (
                <div key={p.name}>
                  <h3 className="font-display text-lg font-medium">
                    {p.name}
                    {p.private && (
                      <span className="eyebrow ml-2 align-middle text-faint">(internal)</span>
                    )}
                  </h3>
                  {p.url && !p.private && (
                    <p className="text-sm text-faint">{p.url.replace(/^https?:\/\//, "")}</p>
                  )}
                  <p className="mt-1 leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-1 text-sm text-faint">{p.tech.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-8">
          <section>
            <h2 className="eyebrow text-accent">Skills</h2>
            <div className="mt-3 flex flex-col gap-4">
              {skills.map((g) => (
                <div key={g.group}>
                  <h3 className="text-sm font-medium">{g.group}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {g.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="eyebrow text-accent">Education</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              {about.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
