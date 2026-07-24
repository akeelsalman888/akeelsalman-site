"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ImageGlyph({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 17 4.5-4.5 3 3L16 11l4 4" />
    </svg>
  );
}

function ZoomIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ChevronIcon({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function ScreenshotGallery({ shots }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const hasMultiple = shots.filter((s) => s.src).length > 1;

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (delta) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        const withSrc = shots
          .map((s, i) => i)
          .filter((i) => shots[i].src);
        const pos = withSrc.indexOf(current);
        const next = withSrc[(pos + delta + withSrc.length) % withSrc.length];
        return next;
      });
    },
    [shots],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const active = isOpen ? shots[activeIndex] : null;

  return (
    <>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((s, i) => (
          <figure key={s.alt} className="flex flex-col gap-3">
            {s.src ? (
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border shadow-sm"
                aria-label={`View larger: ${s.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-90 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ZoomIcon className="h-4 w-4" />
                </span>
              </button>
            ) : (
              <div
                className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-surface px-6 text-center"
                role="img"
                aria-label={`Screenshot placeholder: ${s.alt}`}
              >
                <ImageGlyph className="h-8 w-8 text-faint" />
                <span className="eyebrow text-faint">Screenshot to add</span>
              </div>
            )}
            <figcaption className="text-sm leading-relaxed text-faint">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-600/90 text-white transition-colors hover:bg-red-600"
            >
              <CloseIcon className="h-5 w-5" />
            </button>

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
                >
                  <ChevronIcon className="h-5 w-5" flip />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
                >
                  <ChevronIcon className="h-5 w-5" />
                </button>
              </>
            )}

            <div
              className="flex max-h-full max-w-full flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
              />
              <p className="max-w-xl text-center text-sm leading-relaxed text-white/70">
                {active.caption}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
