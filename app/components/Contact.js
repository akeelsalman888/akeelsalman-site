import { site } from "../content";
import ContactForm from "./ContactForm";

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
          Have a project in mind, or an existing site that needs a hand? Tell me
          a bit about it below — I read every message and reply personally.
        </p>

        <ContactForm />

        <p className="mt-10 text-sm text-muted">
          Prefer email? Reach me directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-[4px] transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}
