"use client";

import { useEffect, useState } from "react";
import { site } from "../content";

// How long the fill takes to reach 100%, in ms.
const DURATION = 4400;

/*
  How often the number changes.

  This is what decides whether the counter is readable. Driven off
  requestAnimationFrame it updated ~60x a second — a different number every 16ms,
  far too fast for the eye to settle on any of them, which read as an unreadable
  blur no matter how long DURATION was. Ticking on a fixed interval keeps each
  value on screen long enough to be read.

  Keep this at 120ms or above; below that the digits smear together again. The
  fill glides between steps via a CSS transition of the same length, so only the
  number steps — the liquid level stays smooth.
*/
const TICK_MS = 170;

const INK_MS = 320; // accent -> white once full
const HOLD_MS = 420; // beat on the finished name
const FADE_MS = 480;

/*
  Ease-out exponent. Lower = more even pacing. At 2 (a square curve) the number
  rockets through most of its range in the first quarter of the run; 1.4 keeps a
  gentle deceleration while holding the per-step increments close enough to track.
*/
const EASE = 1.4;

/*
  Start-up screen: accent rises through the letters of Akeel's name while a
  counter climbs to 100%, then the fill inks over to white and the panel fades.
  Shown once per browser session.

  The number and the liquid level come from the SAME state, so they cannot drift
  apart — the percentage is literally how far up the letterforms the fill has got.

  Rendered on the server at 0 so it's painted with the first frame — if it only
  appeared after hydration you'd see the real page flash first. On repeat loads
  within a session the pre-paint script in layout.js sets data-intro="done" on
  <html>, which hides this via CSS instantly; the effect below then unmounts it.

  Decorative: aria-hidden, skipped entirely for reduced-motion, dismissible with
  any click or keypress, and hidden in print (see globals.css).
*/
export default function IntroOverlay() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("run"); // run | full | out | gone

  useEffect(() => {
    const root = document.documentElement;

    const alreadyShown = (() => {
      try {
        return sessionStorage.getItem("introShown") === "1";
      } catch {
        return false;
      }
    })();
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Nothing to play — drop it. Deferred a frame so this isn't a synchronous
    // setState inside the effect body.
    if (alreadyShown || reduced) {
      root.setAttribute("data-intro", "done");
      const id = requestAnimationFrame(() => setPhase("gone"));
      return () => cancelAnimationFrame(id);
    }

    let ticker = 0;
    let holdTimer = 0;
    let removeTimer = 0;
    let finished = false;

    const remember = () => {
      try {
        sessionStorage.setItem("introShown", "1");
      } catch {
        /* private mode — it'll just replay next load, which is harmless. */
      }
      root.setAttribute("data-intro", "done");
    };

    const leave = () => {
      setPhase("out");
      removeTimer = setTimeout(() => setPhase("gone"), FADE_MS);
    };

    // Reached 100% — top the fill up, ink it white, hold, then go.
    const complete = () => {
      if (finished) return;
      finished = true;
      clearInterval(ticker);
      remember();
      setPct(100);
      setPhase("full");
      holdTimer = setTimeout(leave, INK_MS + HOLD_MS);
    };

    // Visitor tapped or hit a key — get out of the way immediately.
    const dismiss = () => {
      if (finished) return;
      finished = true;
      clearInterval(ticker);
      remember();
      leave();
    };

    // Measured against a real timestamp rather than by accumulating TICK_MS, so a
    // backgrounded tab (where timers get throttled) resumes at the right value
    // instead of leaving the fill stranded part-way.
    const started = performance.now();

    ticker = setInterval(() => {
      const t = Math.min(1, (performance.now() - started) / DURATION);
      setPct(Math.round((1 - (1 - t) ** EASE) * 100));
      if (t >= 1) complete();
    }, TICK_MS);

    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", dismiss);

    return () => {
      clearInterval(ticker);
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`intro-overlay ${phase === "out" ? "is-out" : ""}`}
      aria-hidden="true"
    >
      <div className={`intro-name ${phase === "full" ? "is-full" : ""}`}>
        {/*
          Two identical copies stacked so they align exactly: the lower one
          stroke-only in the accent, the upper one solid and clipped from the
          bottom. inset(TOP right bottom left) — the top inset is the empty part,
          so it's simply the inverse of the percentage. One value drives both the
          number below and this level, which is why they can never disagree.
        */}
        <span className="intro-name-layer intro-name-outline">{site.name}</span>
        <span
          className="intro-name-layer intro-name-fill"
          style={{
            clipPath: `inset(${100 - pct}% 0 0 0)`,
            transition: `clip-path ${TICK_MS}ms linear`,
          }}
        >
          {site.name}
        </span>
      </div>

      {/* The readout. A fixed-width, right-aligned number means the digits never
          nudge the "%" sideways as the count grows from one place to three. */}
      <p className="intro-count">
        <span className="intro-count-num">{pct}</span>
        <span className="text-accent">%</span>
      </p>
    </div>
  );
}
