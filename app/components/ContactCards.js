import { site } from "../content";
import CopyButton from "./CopyButton";
import {
  MailIcon,
  PhoneIcon,
  GitHubIcon,
  LinkedInIcon,
  ArrowUpRightIcon,
} from "./icons";

/*
  One card per contact channel. Replaces the row of small round icon buttons that
  used to sit in the footer — same four destinations, but each one now states what
  it is, shows the actual handle, and names the action it performs.
*/

const CARD =
  "group relative flex flex-col rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-lg transition-all duration-500 hover:border-white/30 hover:bg-surface-2/40";

const TILE =
  "flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/10";

const ARROW =
  "h-4 w-4 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white";

const LABEL = "mt-6 font-display text-lg font-extrabold tracking-tight text-white";
const VALUE = "mt-1 break-all font-mono text-xs text-neutral-400";

// The action row is a fixed-height flex row on EVERY card, including the email
// one that also holds a 28px copy button — otherwise that card's action text
// would sit lower than the rest and the row of cards would look misaligned.
// The margin lives here, never on ACTION: two competing margin utilities on one
// element resolve by CSS order, not by the order they appear in the class string.
const ACTION_ROW = "mt-6 flex h-7 items-center";
const ACTION =
  "eyebrow text-neutral-500 transition-colors duration-300 group-hover:text-white";

// Strips the scheme (and any www.) so the handle reads as a handle, not a URL.
const pretty = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function LinkCard({ href, external, Icon, label, value, action }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-tilt
      className={CARD}
    >
      <div className="flex items-start justify-between">
        <span className={TILE}>
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRightIcon className={ARROW} />
      </div>
      <h3 className={LABEL}>{label}</h3>
      <p className={VALUE}>{value}</p>
      <div className={ACTION_ROW}>
        <span className={ACTION}>{action}</span>
      </div>
    </a>
  );
}

export default function ContactCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/*
        The email card carries two actions, so it can't be a single <a> wrapping
        everything — a <button> nested inside an <a> is invalid HTML. Instead the
        anchor is stretched across the card behind the content, and the copy
        button is a sibling painted above it. Static text is pointer-events-none
        so clicks fall through to the anchor.
      */}
      <div data-tilt className={CARD}>
        <a
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.name}`}
          className="absolute inset-0 rounded-2xl"
        />
        <div className="pointer-events-none relative flex items-start justify-between">
          <span className={TILE}>
            <MailIcon className="h-5 w-5" />
          </span>
          <ArrowUpRightIcon className={ARROW} />
        </div>
        <h3 className={`pointer-events-none relative ${LABEL}`}>Email</h3>
        <p className={`pointer-events-none relative ${VALUE}`}>{site.email}</p>
        <div className={`relative ${ACTION_ROW} justify-between gap-2`}>
          <span className={`pointer-events-none ${ACTION}`}>Write an email</span>
          <CopyButton value={site.email} label="Copy email address" />
        </div>
      </div>

      {site.phoneDisplay && (
        <LinkCard
          href={`tel:${site.phone}`}
          Icon={PhoneIcon}
          label="Phone"
          value={site.phoneDisplay}
          action="Call or text"
        />
      )}

      <LinkCard
        href={site.socials.github}
        external
        Icon={GitHubIcon}
        label="GitHub"
        value={pretty(site.socials.github)}
        action="Explore repositories"
      />

      <LinkCard
        href={site.socials.linkedin}
        external
        Icon={LinkedInIcon}
        label="LinkedIn"
        value={pretty(site.socials.linkedin).replace(/^linkedin\.com\//, "")}
        action="Connect & chat"
      />
    </div>
  );
}
