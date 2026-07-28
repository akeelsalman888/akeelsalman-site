import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import { site, testimonials } from "../../content";
import ScreenshotGallery from "./ScreenshotGallery";

export const metadata = {
  title: `Iman Connect — Case Study · ${site.name}`,
  description:
    "How I designed and built Iman Connect: an SSO-gated operations portal that carries a community center's purchase approvals and reimbursements end to end.",
  alternates: { canonical: "/work/iman-connect" },
};

// Facts — kept aligned with content.js. No invented metrics.
const meta = [
  { label: "Role", value: "Sole developer & designer" },
  { label: "Timeline", value: "~2–3 weeks" },
  { label: "Stack", value: "React · Google Apps Script · Google SSO" },
  { label: "Status", value: "Live · internal (SSO-gated)" },
];

// The end-to-end flow a request travels (IPAS / IPRS). Straight from what the
// system actually does — see the project description in content.js.
const flow = [
  {
    title: "Request",
    body: "A board member submits a purchase or reimbursement request in the portal.",
  },
  {
    title: "Alert",
    body: "The finance committee is notified by email that a request is waiting.",
  },
  {
    title: "Review",
    body: "They approve, deny, or ask a question — all inside the portal.",
  },
  {
    title: "Record",
    body: "A PDF record of the decision is generated and filed automatically.",
  },
  {
    title: "Notify",
    body: "The requester is notified of the outcome, closing the loop.",
  },
];

// The three core systems inside the portal.
const systems = [
  {
    tag: "IPAS",
    title: "Purchase Approval System",
    body: "Carries a purchase request from the moment it's submitted to a filed decision: the finance committee is alerted, reviews it inside the portal, and the requester is told the outcome.",
  },
  {
    tag: "IPRS",
    title: "Purchase Reimbursement System",
    body: "Runs the same disciplined path for reimbursements — request, review, decision, record — so money owed back to members is tracked as carefully as money going out.",
  },
  {
    tag: "Student Payments",
    title: "Program Payment Tracker",
    body: "A simple paid/unpaid ledger for the center's Quran, daycare, and weekend school programs — cash and digital payments logged in one place instead of scattered notes.",
  },
];

// Technical decisions worth explaining in an interview.
const decisions = [
  {
    title: "No server to run or pay for",
    body: "Built on the center's existing Google Workspace with Google Apps Script and a React front end — so there's no separate server to host, secure, or maintain, and no monthly bill for infrastructure the center would have to carry.",
  },
  {
    title: "Sign-in with accounts they already have",
    body: "Access is gated by Google SSO, so board members use the Google accounts they already own — no new passwords to manage, and only authorized people can open the portal.",
  },
  {
    title: "Every decision leaves a record",
    body: "Each approval or reimbursement produces an auto-generated PDF, giving the board a consistent, auditable trail without anyone having to assemble it by hand.",
  },
  {
    title: "Changes can't silently break it",
    body: "A CI pipeline runs visual-regression tests across the portal's screens before each release, so a UI change can't quietly break the workflow the board depends on.",
  },
];

// Screenshot slots. To publish: capture each screen, BLUR any real names and
// dollar amounts, drop the file in /public/work/iman-connect/, and set `src`
// to its path (e.g. "/work/iman-connect/approvals.png"). Leave `src: null`
// and the slot renders a labeled placeholder instead of a broken image.
const shots = [
  {
    src: "/work/iman-connect/dashboard.png",
    alt: "Iman Connect dashboard overview",
    caption:
      "The dashboard — open purchases, pending reimbursements, and what needs attention, at a glance.",
  },
  {
    src: "/work/iman-connect/ipas.png",
    alt: "IPAS purchase request form",
    caption: "IPAS — a board member submits a purchase request.",
  },
  {
    src: "/work/iman-connect/iprs.png",
    alt: "IPRS reimbursement request form",
    caption: "IPRS — the same disciplined path, applied to reimbursements.",
  },
  {
    src: "/work/iman-connect/donate.png",
    alt: "Board dashboard showing donation totals by month and channel",
    caption: "Live donation visibility for the board — by month and by channel.",
  },
  {
    src: "/work/iman-connect/student-payments.png",
    alt: "Student Payments tracker for the center's educational programs",
    caption:
      "Student Payments — a simple paid/unpaid ledger for the Quran, daycare, and weekend school programs. (Names shown are placeholders.)",
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

export default function ImanConnectCaseStudy() {
  const testimonial = testimonials.find((t) => t.name === "Hamza Sindi");

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
                Internal operations tool
              </span>
            </div>

            <h1
              className="rise mt-5 font-display text-5xl font-black uppercase leading-none tracking-tighter text-white sm:text-7xl"
              style={{ animationDelay: "140ms" }}
            >
              Iman Connect
            </h1>

            <p
              className="rise mt-6 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base"
              style={{ animationDelay: "200ms" }}
            >
              An SSO-gated operations portal that carries a community
              center&apos;s purchase approvals and reimbursements from request to
              record, tracks program payments, and gives its board a live view of
              donations — all behind one secure login.
            </p>

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
          title="A growing board, no shared system for money"
        >
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              Iman Islamic Center serves 300+ families. As it grew, its board
              needed a dependable way to handle money decisions — purchase
              requests and reimbursements — that didn&apos;t live in scattered
              emails, group chats, and hallway conversations.
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
              There was no single place to see what had been requested, what was
              approved, and what was still open. Decisions were hard to trace,
              and no one had a shared, up-to-date picture of the center&apos;s
              giving. The board needed structure — without the cost and overhead
              of enterprise software.
            </p>
          </div>
        </Chapter>

        {/* What I built */}
        <Chapter
          index="02"
          kicker="What I built"
          title="One portal, two workflows, one source of truth"
          intro="I designed and built Iman Connect solo — a single internal portal, gated behind Google SSO, built around three core systems and a live view of the center's donations."
        >
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {systems.map((s) => (
              <div
                key={s.tag}
                data-tilt
                className="group rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-surface-2/40 md:p-7"
              >
                <span className="eyebrow rounded border border-white/10 bg-white/5 px-2 py-1 text-neutral-300">
                  {s.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Alongside all three, the portal gives the board live visibility into
            donations — so leadership can see the center&apos;s giving at a glance
            instead of asking for a report.
          </p>
        </Chapter>

        {/* How a request flows */}
        <Chapter
          index="03"
          kicker="How a request flows"
          title="From request to record, end to end"
        >
          <ol className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {flow.map((step, i) => (
              <li
                key={step.title}
                data-tilt
                className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-surface/80 p-5 transition-all duration-500 hover:border-white/30"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-3xl font-black text-neutral-800 opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-extrabold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Chapter>

        {/* Inside the portal — screenshots */}
        <Chapter
          index="04"
          kicker="Inside the portal"
          title="A look at the screens"
          intro="Iman Connect is a private, SSO-gated system, so these are captured views of the board's real workflow. Tap or click any screenshot to view it larger."
        >
          <ScreenshotGallery shots={shots} />
        </Chapter>

        {/* Technical decisions */}
        <Chapter
          index="05"
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
          <Chapter index="06" kicker="Outcome" title="In the client's words">
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
        <Reveal as="section" className="relative overflow-hidden border-t border-white/5">
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
              Need an internal tool that fits how your team{" "}
              <span className="markline">actually works</span>?
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              I build systems like this end to end — solo, start to finish. If you
              have a manual process that&apos;s outgrown email and spreadsheets,
              I&apos;d like to hear about it.
            </p>
            <Link
              href="/#contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-ink shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
            >
              Start a conversation
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
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
