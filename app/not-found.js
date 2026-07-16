import Link from "next/link";

export const metadata = {
  title: "Page not found — Akeel Salman",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="w-full max-w-xl text-center">
        <p className="eyebrow text-accent">404</p>
        <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          This page wandered off.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          Back home
          <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
