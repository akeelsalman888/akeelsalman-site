import { site } from "../content";

export default function Hero() {
  // Split the tagline on the em dash so the trailing clause can be set
  // in italic accent — an editorial emphasis device.
  const [lead, aside] = site.tagline.split("—").map((s) => s.trim());

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-5xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28"
    >
      <p className="eyebrow rise text-accent">{site.title}</p>

      <h1 className="rise mt-6 max-w-4xl font-display text-[2.7rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
        {lead}
        {aside && (
          <>
            {" "}
            <span className="italic text-muted">— {aside}</span>
          </>
        )}
      </h1>

      <div className="rise mt-10 flex max-w-2xl flex-col gap-6 border-l-2 border-accent pl-5 sm:mt-12">
        <p className="text-lg leading-relaxed text-muted">
          Hi, I&apos;m <span className="text-foreground">{site.name}</span> — I
          build fast, reliable web apps and the automation behind them. I&apos;ve
          shipped two production systems for a community organization, solo — and
          I&apos;m open to freelance work.
        </p>
        <p className="eyebrow text-faint">{site.location}</p>
      </div>

      <div className="rise mt-10 flex flex-wrap items-center gap-6">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <span aria-hidden>→</span>
        </a>
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 text-sm font-medium"
        >
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            See selected work
          </span>
        </a>
      </div>
    </section>
  );
}
