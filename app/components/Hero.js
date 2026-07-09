import { site } from "../content";

export default function Hero() {
  return (
    <section id="top" className="mx-auto w-full max-w-4xl px-6 py-24 sm:py-32">
      <p className="mb-4 text-sm font-medium text-accent">{site.title}</p>
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {site.tagline}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        Hi, I'm {site.name} — a full-stack developer available for freelance work.
      </p>
      <p className="mt-2 text-sm text-muted">{site.location}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
        <a
          href="#projects"
          className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface"
        >
          View my work
        </a>
      </div>
    </section>
  );
}
