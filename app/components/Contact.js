import Section from "./Section";
import { site } from "../content";

export default function Contact() {
  return (
    <Section id="contact" title="Let's work together">
      <div className="rounded-2xl border bg-surface p-8 sm:p-12">
        <p className="max-w-lg text-muted">
          Have a project in mind or need help with an existing site? Send me a
          note and I'll get back to you.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Email {site.email}
        </a>
      </div>
    </Section>
  );
}
