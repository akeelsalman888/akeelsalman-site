import { site } from "../content";

export default function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

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
        <div className="flex gap-6 text-sm">
          <a href={`mailto:${site.email}`} className="text-muted hover:text-foreground">
            Email
          </a>
          {socials.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize text-muted hover:text-foreground"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
