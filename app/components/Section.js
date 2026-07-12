export default function Section({
  id,
  index,
  title,
  kicker,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`border-t ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <header className="mb-12 flex flex-col gap-3 sm:mb-16">
          <div className="flex items-baseline gap-4">
            {index && (
              <span className="eyebrow text-accent">{index}</span>
            )}
            {kicker && <span className="eyebrow text-faint">{kicker}</span>}
          </div>
          <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
