import { site } from "../content";

export default function Contact() {
  return (
    <section id="contact" className="border-t">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
        <p className="eyebrow text-accent">Contact</p>
        <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">
          Let&apos;s build something{" "}
          <span className="italic markline">worth shipping.</span>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          Have a project in mind, or an existing site that needs a hand? Send me
          a note — I read every message and reply personally.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="group mt-10 inline-flex flex-wrap items-baseline gap-x-4 gap-y-1"
        >
          <span className="font-display text-2xl font-medium tracking-tight underline decoration-accent decoration-2 underline-offset-[6px] transition-colors group-hover:text-accent sm:text-3xl">
            {site.email}
          </span>
          <span
            aria-hidden
            className="text-xl text-accent transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </section>
  );
}
