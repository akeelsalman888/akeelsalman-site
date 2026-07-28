import Reveal from "./Reveal";

/*
  Shared section shell: hairline top rule, faint dot texture, a mono
  "NN · Kicker" eyebrow, and a heavy display heading. Wrapped in Reveal so the
  whole block fades up as it scrolls into view.
*/
export default function Section({
  id,
  index,
  title,
  kicker,
  intro,
  children,
  className = "",
}) {
  return (
    <Reveal
      as="section"
      id={id}
      className={`relative overflow-hidden border-t border-white/5 ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <header className="mb-12 flex flex-col gap-4 sm:mb-16">
          {(index || kicker) && (
            <span className="eyebrow flex items-center gap-3 text-neutral-500">
              {index && <span className="text-accent">{index}</span>}
              {index && kicker && (
                <span aria-hidden className="h-px w-6 bg-accent/40" />
              )}
              {kicker}
            </span>
          )}
          <h2 className="max-w-4xl font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {intro && (
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </Reveal>
  );
}
