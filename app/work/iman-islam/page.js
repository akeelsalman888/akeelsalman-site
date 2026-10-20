import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { site, testimonials } from "../../content";
import ScreenshotGallery from "../iman-connect/ScreenshotGallery";

export const metadata = {
  title: `Iman Islamic Center — Case Study · ${site.name}`,
  description:
    "How I designed and built www.iman-islam.org: a bilingual English/Arabic website with full RTL support, online giving, program registration, and prayer times — for a community center serving 300+ families.",
  alternates: { canonical: "/work/iman-islam" },
};

const LIVE_URL = "https://www.iman-islam.org";

// Facts — kept aligned with content.js. No invented metrics; every number below
// is countable in the repo.
const meta = [
  { label: "Role", value: "Sole developer & designer" },
  { label: "Scope", value: "2 languages · full RTL · 80+ components" },
  { label: "Stack", value: "React · Vite · Firebase · Apps Script" },
  { label: "Status", value: "Live & public" },
];

// What the site actually does for the community, grouped by who it serves.
const features = [
  {
    tag: "Giving",
    title: "Online donations",
    body: "Families can give from any device, in either language, to the fund of their choice — routed so that processing fees don't come out of the center's income.",
  },
  {
    tag: "Programs",
    title: "Registration & payment",
    body: "Quran classes for boys, girls, and adults, plus the weekend and daycare programs — families apply and pay online instead of filling in paper at the door.",
  },
  {
    tag: "Services",
    title: "Requests to the Imam",
    body: "Fatwa questions, marriage documentation, and family-support requests arrive as structured submissions the office can act on, rather than as phone messages.",
  },
  {
    tag: "Community",
    title: "Prayer times & visits",
    body: "Daily prayer times alongside the Hijri date, plus announcements, events, volunteer sign-up, and visit booking for schools and neighbours.",
  },
];

// The bilingual work — the part of this project that is genuinely uncommon.
const bilingual = [
  {
    title: "One translation layer, not two websites",
    body: "Every string on the site lives in a single translation module and is served through one language context. There is no separate Arabic build to keep in sync — switching language re-renders the same components, so a change ships to both audiences at once.",
  },
  {
    title: "The layout mirrors itself",
    body: "Arabic reads right-to-left, so the entire interface has to flip — navigation, spacing, icons, form fields. That's done with direction-aware CSS rather than a second Arabic stylesheet, which keeps one design system instead of two that slowly drift apart.",
  },
  {
    title: "Arabic that survives a PDF",
    body: "Arabic is a connected script: a letter changes shape depending on what sits beside it. Browsers handle that automatically; PDF generators do not, and text comes out disconnected or reversed. A reshaping step runs before any document is generated, so certificates print correctly in Arabic.",
  },
  {
    title: "Two calendars at once",
    body: "The center runs on the Hijri calendar for religious dates and the Gregorian calendar for everything else. Both are rendered together, so nobody has to convert dates in their head.",
  },
];

// Technical decisions worth explaining in an interview.
const decisions = [
  {
    title: "Fees don't come out of donations",
    body: "Giving is handled through a nonprofit payment platform behind a small serverless proxy, chosen so the center keeps what its families give instead of losing a percentage of every gift to processing.",
  },
  {
    title: "No server to run or pay for",
    body: "A React front end on managed hosting, with Google Apps Script handling form submissions into the office's existing Google Workspace. There's no server for a volunteer-run board to maintain, secure, or budget for.",
  },
  {
    title: "Every page checked in both languages",
    body: "An automated Playwright suite walks every route in English and Arabic across phone, tablet, and desktop widths, comparing against approved visual baselines. It runs in CI on each change — so an RTL layout can't quietly break while nobody is looking at the Arabic side.",
  },
  {
    title: "Images optimized at build time",
    body: "Gallery photos, program images, and logos are compressed and resized by a build script rather than by hand, so the site stays fast on the phones most families actually browse it on.",
  },
];

// Screenshots — captured from the live site.
const shots = [
  {
    src: "/work/iman-islam/homepage-en.png",
    alt: "Iman Islamic Center home page in English",
    caption: "The home page in English.",
  },
  {
    src: "/work/iman-islam/homepage-ar.png",
    alt: "Iman Islamic Center home page in Arabic, right-to-left",
    caption:
      "The same page in Arabic — the whole layout mirrors, not just the text.",
  },
  {
    src: "/work/iman-islam/prayer-times.png",
    alt: "Daily prayer times with the Hijri date",
    caption: "Daily prayer times, shown with both the Hijri and Gregorian date.",
  },
  {
    src: "/work/iman-islam/donation-page.png",
    alt: "Online donation page",
    caption: "Giving — fund selection in either language, on any device.",
  },
  {
    src: "/work/iman-islam/class-registration-form.png",
    alt: "Quran class application form",
    caption: "Program registration — apply and pay without coming in person.",
  },
];

// Shared shell for each numbered section below.
function Chapter({ index, kicker, title, intro, children, className = "" }) {
  return (
    <Reveal
      as="section"
      className={`relative overflow-hidden border-t border-white/5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-25"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-14 sm:px-8 sm:py-20">
        <span className="eyebrow flex items-center gap-2 text-neutral-500">
          <span className="text-neutral-600">{index}</span>
          <span aria-hidden>·</span>
          {kicker}
        </span>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            {intro}
          </p>
        )}
        {children}
      </div>
    </Reveal>
  );
}

export default function ImanIslamCaseStudy() {
  const testimonial = testimonials.find(
    (t) => t.name === "Abdulaziz Al-Abbasi",
  );
  const hasShots = shots.some((s) => s.src);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />

      <main id="main" className="flex-1">
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-6 pt-28 sm:px-8 sm:pt-36">
            <Link
              href="/#projects"
              className="rise font-mono text-xs uppercase tracking-wider text-neutral-400 transition-colors hover:text-white"
            >
              ← Back to work
            </Link>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "80ms" }}
            >
              <span className="eyebrow rounded border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-300">
                Case study
              </span>
              <span className="eyebrow text-neutral-500">
                Bilingual community website
              </span>
            </div>

            <h1
              className="rise mt-5 font-display text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-7xl"
              style={{ animationDelay: "140ms" }}
            >
              Iman Islamic Center
            </h1>

            <p
              className="rise mt-6 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
              style={{ animationDelay: "200ms" }}
            >
              A public website for a community center serving 300+ families,
              built to work equally well in English and Arabic — full
              right-to-left layout, online giving, program registration, prayer
              times, and requests that reach the office as structured
              submissions instead of phone messages.
            </p>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rise group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
              style={{ animationDelay: "230ms" }}
            >
              Visit the live site
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>

            {/* Meta grid */}
            <dl
              className="rise mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
              style={{ animationDelay: "260ms" }}
            >
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/10 bg-surface/80 p-4"
                >
                  <dt className="eyebrow text-neutral-600">{m.label}</dt>
                  <dd className="mt-2 text-sm leading-snug text-neutral-200">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* The problem */}
        <Chapter
          index="01"
          kicker="The problem"
          title="A center with no front door online"
        >
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              Iman Islamic Center serves 300+ families in Lincoln, Nebraska.
              Everything it offered — classes, donations, questions for the
              Imam, visit requests — happened in person, by phone, or on paper.
              If you weren&apos;t already at the masjid, there was no way in.
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              Its community is split across two languages, and that made the
              usual answer inadequate. An English-only site would leave out the
              families who most needed the information; a bolted-on translation
              widget would mistranslate religious terms and break the layout
              the moment text ran right-to-left. Both languages had to be first
              class from the start.
            </p>
          </div>
        </Chapter>

        {/* What I built */}
        <Chapter
          index="02"
          kicker="What I built"
          title="One site, two languages, four jobs"
          intro="I designed and built the site solo. Rather than a brochure with a contact form, it carries the four things families actually come to the center for — and each one works identically in Arabic."
        >
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.tag}
                data-tilt
                className="group rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-surface-2/40 md:p-7"
              >
                <span className="eyebrow rounded border border-white/10 bg-white/5 px-2 py-1 text-neutral-300">
                  {f.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-white">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {f.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Every submission lands in the office&apos;s existing Google
            Workspace, which is what made the internal side possible —{" "}
            <Link
              href="/work/iman-connect"
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/50"
            >
              Iman Connect
            </Link>{" "}
            is the portal the board uses to act on it.
          </p>
        </Chapter>

        {/* Bilingual */}
        <Chapter
          index="03"
          kicker="The hard part"
          title="Bilingual by architecture, not by plugin"
          intro="Most of the engineering in this project is here. Supporting Arabic properly is not translation — it is a different reading direction, a different calendar, and a script that changes shape as you write it."
        >
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {bilingual.map((b) => (
              <div
                key={b.title}
                data-tilt
                className="rounded-2xl border border-white/10 bg-surface/80 p-6 transition-all duration-500 hover:border-white/30 md:p-7"
              >
                <h3 className="font-display text-lg font-extrabold tracking-tight text-white">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* Inside the site — appears once real screenshots are added */}
        {hasShots && (
          <Chapter
            index="04"
            kicker="Inside the site"
            title="A look at the screens"
            intro="Tap or click any screenshot to view it larger — or open the live site and switch languages yourself."
          >
            <ScreenshotGallery shots={shots} />
          </Chapter>
        )}

        {/* Technical decisions */}
        <Chapter
          index={hasShots ? "05" : "04"}
          kicker="Technical decisions"
          title="Choices that fit a volunteer-run center"
        >
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {decisions.map((d) => (
              <div
                key={d.title}
                data-tilt
                className="rounded-2xl border border-white/10 bg-surface/80 p-6 transition-all duration-500 hover:border-white/30 md:p-7"
              >
                <h3 className="font-display text-lg font-extrabold tracking-tight text-white">
                  {d.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Chapter>

        {/* Outcome — client's own words */}
        {testimonial && (
          <Chapter
            index={hasShots ? "06" : "05"}
            kicker="Outcome"
            title="In the client's words"
          >
            <figure className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-surface/80 p-6 md:p-10">
              <span
                aria-hidden="true"
                className="select-none font-display text-6xl font-black leading-none text-neutral-800 opacity-60"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-4 text-base leading-relaxed text-neutral-200 sm:text-lg">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 flex flex-col gap-1 border-t border-white/5 pt-5">
                <span className="font-display text-base font-extrabold tracking-tight text-white">
                  {testimonial.name}
                </span>
                <span className="font-mono text-[11px] text-neutral-400">
                  {testimonial.role} · {testimonial.org}
                </span>
              </figcaption>
            </figure>
          </Chapter>
        )}

        {/* CTA */}
        <Reveal
          as="section"
          className="relative overflow-hidden border-t border-white/5"
        >
          <div
            aria-hidden="true"
            className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-32 w-full max-w-[500px] -translate-x-1/2 bg-purple-500/10 blur-[100px]"
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
            <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl">
              Need a site that works in{" "}
              <span className="markline">more than one language</span>?
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Bilingual and right-to-left sites are their own discipline, and
              most agencies treat them as an afterthought. I build them properly
              — one codebase, one design system, both audiences first class.
            </p>
            <Link
              href="/#contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-ink shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
            >
              Start a conversation
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
