import { site } from "../content";
import { MailIcon, GitHubIcon, LinkedInIcon } from "./icons";

const ICONS = { github: GitHubIcon, linkedin: LinkedInIcon };
const LABELS = { github: "GitHub", linkedin: "LinkedIn" };

export default function Footer() {
  // Email first, then any social profiles that have a URL set.
  const links = [
    { key: "email", label: "Email", href: `mailto:${site.email}`, Icon: MailIcon },
    ...Object.entries(site.socials)
      .filter(([, url]) => url)
      .map(([name, url]) => ({
        key: name,
        label: LABELS[name] ?? name,
        href: url,
        Icon: ICONS[name],
      })),
  ];

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="font-display text-xl font-semibold tracking-tight">
            {site.name}
          </a>
          <p className="mt-2 text-sm text-faint">
            © 2026 · Built and designed by hand.
          </p>
        </div>
        <div className="flex gap-3">
          {links.map(({ key, label, href, Icon }) => (
            <a
              key={key}
              href={href}
              aria-label={label}
              {...(key !== "email"
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-11 w-11 items-center justify-center rounded-full border text-muted transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
