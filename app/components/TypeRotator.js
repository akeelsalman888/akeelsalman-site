"use client";

import { useEffect, useRef, useState } from "react";

const TYPE_MS = 55; // per character while typing
const DELETE_MS = 28; // per character while deleting (faster, feels natural)
const HOLD_MS = 1900; // pause on a finished phrase
const GAP_MS = 320; // pause after clearing, before the next phrase

/*
  Typewriter that cycles through `phrases`, wrapped in JSX-style angle brackets.

  Renders the longest phrase as invisible reserved space so the surrounding
  layout never shifts as the text grows and shrinks. Reduced-motion users get the
  first phrase, static, with no caret.
*/
export default function TypeRotator({ phrases }) {
  const [text, setText] = useState("");
  const [reduced, setReduced] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    // Tracked in the effect (not state) so a single scheduling chain drives the
    // whole cycle — no re-render races between typing and deleting.
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));

        if (charIndex === phrase.length) {
          deleting = true;
          timer.current = setTimeout(step, HOLD_MS);
          return;
        }
        timer.current = setTimeout(step, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setText(phrase.slice(0, charIndex));

      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer.current = setTimeout(step, GAP_MS);
        return;
      }
      timer.current = setTimeout(step, DELETE_MS);
    };

    timer.current = setTimeout(step, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer.current);
    };
  }, [phrases, reduced]);

  return (
    <>
      {/* The animation is decorative — screen readers get one stable phrase
          instead of an announcement per keystroke. */}
      <span className="sr-only">{phrases[0]}</span>

      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-3 font-mono text-lg text-neutral-200 sm:text-xl md:text-2xl"
      >
        {/* A comment marker rather than JSX angle brackets — reads as a dev's
            aside, and doesn't need a closing token on the right. */}
        <span className="font-bold text-accent">{"//"}</span>

        {/*
          min-width in `ch` (a mono font, so exactly one character) gives short
          phrases a floor without reserving the longest phrase's full width —
          which would leave the angle brackets stranded far from the text. The
          brackets drift outward a little as a phrase grows; the row's height is
          fixed by the parent, so nothing below ever moves.
        */}
        {/*
          Left-aligned with a min-width floor in `ch` (a mono font, so exactly one
          character). Left alignment keeps the text anchored to the marker instead
          of drifting as it grows, and the floor stops the caret jittering on the
          shortest phrase.
        */}
        <span
          style={{ minWidth: "24ch" }}
          className="inline-flex items-center whitespace-pre text-left font-semibold text-white"
        >
          {reduced ? phrases[0] : text}
          {!reduced && <span className="caret font-bold text-accent">_</span>}
        </span>
      </div>
    </>
  );
}
