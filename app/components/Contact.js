import ContactForm from "./ContactForm";
import ContactCards from "./ContactCards";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="relative overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30"
      />
      {/* Warm bloom behind the headline, in the site accent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-32 w-full max-w-[500px] -translate-x-1/2 bg-accent/10 blur-[110px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="eyebrow flex items-center gap-2 text-neutral-500">
              <span className="text-accent">06</span>
              <span aria-hidden>·</span>
              Contact
            </span>

            <h2 className="mt-4 max-w-xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-white sm:text-5xl md:text-6xl">
              Let&apos;s build something{" "}
              <span className="markline">worth shipping</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base">
              Have a project in mind, or an existing site that needs a hand? Tell
              me a bit about it — I read every message and reply personally,
              usually within 24 hours.
            </p>

          </div>

          <ContactForm />
        </div>

        {/* Direct channels, for anyone who'd rather not use the form. Full width
            below the form so all four cards get room on one row at desktop. */}
        <div className="mt-16">
          <h3 className="eyebrow text-neutral-500">Other ways to reach me</h3>
          <div className="mt-6">
            <ContactCards />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
