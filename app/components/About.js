import Reveal from "./Reveal";
import { about, site } from "../content";

// Back of the flip card. Every line traces to content.js — no invented metrics.
const facts = [
  { label: "Timezone", value: "Central Time (CT)" },
  { label: "Works", value: "Remote · Worldwide" },
  { label: "Shipped", value: "2 production systems, solo" },
  { label: "Degree", value: "Master of Information Technology" },
  { label: "Also", value: "Taught programming & IT" },
];

export default function About() {
  const [lead, ...rest] = about.paragraphs;
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <Reveal
      as="section"
      id="about"
      className="relative overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Flip card — hover or focus to turn it over. Purely a flourish: the
              facts on the back are all repeated in the prose beside it. */}
          <div className="reveal-child lg:col-span-5">
            <div
              tabIndex={0}
              className="flip-card group relative mx-auto aspect-[3/4] w-full max-w-sm lg:max-w-none"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl bg-white/[0.015] blur-2xl"
              />

              <div className="flip-card-inner">
                <div className="flip-card-front flex flex-col items-center justify-center gap-6 border border-white/10 bg-surface-2 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  <span
                    aria-hidden="true"
                    className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-50"
                  />
                  <span className="relative font-display text-7xl font-black tracking-tighter text-white sm:text-8xl">
                    {initials}
                  </span>
                  <div className="relative flex flex-col items-center gap-2">
                    <span className="font-display text-xl font-extrabold tracking-tight text-white">
                      {site.name}
                    </span>
                    <span className="eyebrow text-neutral-500">{site.title}</span>
                  </div>
                  <span className="eyebrow absolute bottom-6 text-neutral-700">
                    Hover to flip
                  </span>
                </div>

                <div className="flip-card-back flex flex-col justify-center gap-4 border border-white/10 bg-surface-2 px-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  <span
                    aria-hidden="true"
                    className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-50"
                  />
                  <dl className="relative flex flex-col gap-4 text-left">
                    {facts.map((f) => (
                      <div
                        key={f.label}
                        className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                      >
                        <dt className="eyebrow text-neutral-600">{f.label}</dt>
                        <dd className="text-sm font-medium text-neutral-200">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Prose */}
          <div
            className="reveal-child lg:col-span-7"
            style={{ "--stagger-index": 1 }}
          >
            <span className="eyebrow flex items-center gap-2 text-neutral-500">
              <span className="text-accent">03</span>
              <span aria-hidden>·</span>
              About
            </span>

            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
              A little about me
            </h2>

            <div className="mt-6 h-px w-full bg-white/10" />

            <p className="mt-6 text-base font-medium leading-relaxed text-neutral-200 sm:text-lg">
              {lead}
            </p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              {rest.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <h3 className="eyebrow mt-10 text-neutral-500">Credentials</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {about.credentials.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm leading-snug text-neutral-300"
                >
                  <span aria-hidden className="mt-0.5 text-neutral-600">
                    ▹
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>

            <a
              href="/resume"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:text-accent-ink active:scale-[0.98]"
            >
              View full résumé
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
