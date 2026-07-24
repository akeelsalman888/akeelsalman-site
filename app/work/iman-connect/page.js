import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
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

export default function ImanConnectCaseStudy() {
  const testimonial = testimonials.find((t) => t.name === "Hamza Sindi");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Nav />

      <main id="main" className="flex-1">
        {/* Hero */}
        <header className="mx-auto w-full max-w-5xl px-6 pt-14 pb-4 sm:pt-20">
          <Link
            href="/#projects"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            ← Back to work
          </Link>

          <div className="mt-10 flex items-baseline gap-4">
            <span className="eyebrow text-accent">Case study</span>
            <span className="eyebrow text-faint">Internal operations tool</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Iman Connect
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            An SSO-gated operations portal that carries a community center's
            purchase approvals and reimbursements from request to record,
            tracks program payments, and gives its board a live view of
            donations — all behind one secure login.
          </p>

          {/* Meta grid */}
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-faint">{m.label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {/* The problem */}
        <section className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
          <span className="eyebrow text-accent">01 · The problem</span>
          <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-[16rem_1fr]">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">
              A growing board, no shared system for money
            </h2>
            <div className="max-w-2xl leading-relaxed text-muted">
              <p>
                Iman Islamic Center serves 300+ families. As it grew, its board
                needed a dependable way to handle money decisions — purchase
                requests and reimbursements — that didn't live in scattered
                emails, group chats, and hallway conversations.
              </p>
              <p className="mt-4">
                There was no single place to see what had been requested, what
                was approved, and what was still open. Decisions were hard to
                trace, and no one had a shared, up-to-date picture of the
                center's giving. The board needed structure — without the cost
                and overhead of enterprise software.
              </p>
            </div>
          </div>
        </section>

        {/* What I built */}
        <section className="mx-auto w-full max-w-5xl border-t px-6 py-14 sm:py-20">
          <span className="eyebrow text-accent">02 · What I built</span>
          <h2 className="mt-6 max-w-3xl font-display text-2xl font-medium tracking-tight sm:text-3xl">
            One portal, two workflows, one source of truth
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            I designed and built Iman Connect solo — a single internal portal,
            gated behind Google SSO, built around three core systems and a
            live view of the center's donations.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border bg-surface p-7">
              <span className="eyebrow text-accent">IPAS</span>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                Purchase Approval System
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                Carries a purchase request from the moment it's submitted to a
                filed decision: the finance committee is alerted, reviews it
                inside the portal, and the requester is told the outcome.
              </p>
            </div>
            <div className="rounded-2xl border bg-surface p-7">
              <span className="eyebrow text-accent">IPRS</span>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                Purchase Reimbursement System
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                Runs the same disciplined path for reimbursements — request,
                review, decision, record — so money owed back to members is
                tracked as carefully as money going out.
              </p>
            </div>
            <div className="rounded-2xl border bg-surface p-7">
              <span className="eyebrow text-accent">Student Payments</span>
              <h3 className="mt-2 font-display text-xl font-medium tracking-tight">
                Program Payment Tracker
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                A simple paid/unpaid ledger for the center's Quran, daycare,
                and weekend school programs — cash and digital payments logged
                in one place instead of scattered notes.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-muted">
            Alongside all three, the portal gives the board live visibility
            into donations — so leadership can see the center's giving at a
            glance instead of asking for a report.
          </p>
        </section>

        {/* How a request flows */}
        <section className="mx-auto w-full max-w-5xl border-t px-6 py-14 sm:py-20">
          <span className="eyebrow text-accent">03 · How a request flows</span>
          <h2 className="mt-6 max-w-3xl font-display text-2xl font-medium tracking-tight sm:text-3xl">
            From request to record, end to end
          </h2>

          <ol className="mt-10 grid gap-6 sm:grid-cols-5">
            {flow.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="font-display text-2xl italic text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Inside the portal — screenshots */}
        <section className="mx-auto w-full max-w-5xl border-t px-6 py-14 sm:py-20">
          <span className="eyebrow text-accent">04 · Inside the portal</span>
          <h2 className="mt-6 max-w-3xl font-display text-2xl font-medium tracking-tight sm:text-3xl">
            A look at the screens
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Iman Connect is a private, SSO-gated system, so these are captured
            views of the board's real workflow. Tap or click any screenshot to
            view it larger.
          </p>

          <ScreenshotGallery shots={shots} />
        </section>

        {/* Technical decisions */}
        <section className="mx-auto w-full max-w-5xl border-t px-6 py-14 sm:py-20">
          <span className="eyebrow text-accent">05 · Technical decisions</span>
          <h2 className="mt-6 max-w-3xl font-display text-2xl font-medium tracking-tight sm:text-3xl">
            Choices that fit a volunteer-run center
          </h2>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {decisions.map((d) => (
              <div key={d.title}>
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {d.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome — client's own words */}
        {testimonial && (
          <section className="mx-auto w-full max-w-5xl border-t px-6 py-14 sm:py-20">
            <span className="eyebrow text-accent">06 · Outcome</span>
            <figure className="mt-8 max-w-3xl">
              <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="text-foreground">{testimonial.name}</span> ·{" "}
                {testimonial.role} · {testimonial.org}
              </figcaption>
            </figure>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto w-full max-w-5xl border-t px-6 py-16 sm:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Need an internal tool that fits how your team{" "}
            <span className="markline">actually works</span>?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            I build systems like this end to end — solo, start to finish. If you
            have a manual process that's outgrown email and spreadsheets, I'd
            like to hear about it.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
