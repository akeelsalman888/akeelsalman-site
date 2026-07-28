import Link from "next/link";

export const metadata = {
  title: "Page not found — Akeel Salman",
};

export default function NotFound() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-32">
      <div
        aria-hidden="true"
        className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative z-10 w-full max-w-xl text-center">
        <p className="eyebrow rise text-neutral-500">Error 404</p>

        <h1
          className="rise mt-6 font-display text-6xl font-black uppercase leading-none tracking-tighter text-white sm:text-8xl"
          style={{ animationDelay: "80ms" }}
        >
          404
        </h1>

        <p
          className="rise mt-6 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          style={{ animationDelay: "140ms" }}
        >
          This page wandered off.
        </p>

        <p
          className="rise mt-4 text-sm leading-relaxed text-neutral-400 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          style={{ animationDelay: "260ms" }}
          className="rise group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-ink transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
        >
          Back home
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
