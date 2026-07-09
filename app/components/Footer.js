import { site } from "../content";

export default function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
        <p>
          © {"2026"} {site.name}
        </p>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            Email
          </a>
          {socials.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize hover:text-foreground"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
