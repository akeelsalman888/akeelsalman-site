"use client";

import { useEffect } from "react";

// Maximum card rotation on each axis, in degrees.
const MAX_DEG = 9;

/*
  How far each background layer moves, in px, at full pointer deflection.

  The grid's figure is POSITIVE, so it travels the same way as the pointer — the
  lattice is pulled toward the cursor. The light pools are negative, so they hang
  back the other way; that opposition is what reads as depth instead of the whole
  background sliding as one sheet.

  `grid` must stay under the CSS overhang (three cells, 132px at a 44px grid) or
  the pull would drag an empty edge into view.
*/
const DRIFT = { grid: 72, glow: -44 };

// Easing applied per frame toward the pointer. Lower = more lag on the pull.
const EASE_DRIFT = 0.12;
const EASE_GLOW = 0.2;

/*
  Pointer speed → how much the warm wash swells, published as --gs.

  SPEED_FULL is the per-frame travel in px that counts as "full tilt"; anything
  faster is clamped. Rise is quicker than fall so the wash answers a flick
  immediately but settles gently rather than snapping shut.
*/
const SPEED_FULL = 42;
const SPEED_SWELL = 0.26;
const EASE_SPEED_UP = 0.28;
const EASE_SPEED_DOWN = 0.07;

/*
  Everything the pointer drives, from one listener and one animation loop:

  1. The grid lights up. A warm wash follows the pointer, swelling with how fast
     it moves, and the background layers drift against each other underneath it.

  2. Cards tilt. Anything marked `data-tilt` tips in perspective toward the
     pointer and springs back when it leaves.

  Tilt is delegated off `[data-tilt]` rather than done with a wrapper component
  per card, so every card stays a server component and adding tilt anywhere is
  just an attribute. Nothing here touches React state — positions are written
  straight to style properties, so moving the mouse never triggers a render.
*/
export default function PointerEffects() {
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    // Meaningless without a hovering pointer, and unwelcome if the visitor has
    // asked for less motion.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const glow = document.querySelector(".amb-cursor-glow");
    const gridEl = document.querySelector(".amb-grid");
    const pools = document.querySelector(".amb-glow");

    let pointerX = -1000;
    let pointerY = -1000;
    let glowX = -1000; // eased, trails the pointer
    let glowY = -1000;
    let driftX = 0; // eased, normalised −1…1 from the viewport centre
    let driftY = 0;
    let lastX = -1000; // pointer position at the previous frame, for speed
    let lastY = -1000;
    let speed = 0; // eased, normalised 0…1
    let live = false;
    let frame = 0;
    let tilted = null;

    const releaseTilt = (el) => {
      if (!el) return;
      el.classList.remove("is-tilting");
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    const onMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      if (!live) {
        live = true;
        // Start the wash where the pointer is, rather than flying in from 0,0.
        glowX = pointerX;
        glowY = pointerY;
        lastX = pointerX;
        lastY = pointerY;
        glow?.classList.add("is-live");
      }

      // --- card tilt -------------------------------------------------------
      const card = e.target?.closest?.("[data-tilt]");
      if (card !== tilted) {
        releaseTilt(tilted);
        tilted = card;
        // Switch to the responsive transition before the first tilt is written,
        // so the card doesn't ease in from flat over 420ms.
        if (tilted) tilted.classList.add("is-tilting");
      }
      if (tilted) {
        const r = tilted.getBoundingClientRect();
        if (r.width && r.height) {
          // −0.5 … 0.5 from the card's centre.
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          // Pointer near the top pushes the top edge away, like pressing a card.
          tilted.style.setProperty("--tilt-x", `${(-py * MAX_DEG * 2).toFixed(2)}deg`);
          tilted.style.setProperty("--tilt-y", `${(px * MAX_DEG * 2).toFixed(2)}deg`);
        }
      }
    };

    const onLeave = () => {
      live = false;
      glow?.classList.remove("is-live");
      releaseTilt(tilted);
      tilted = null;
    };

    // A card can also be scrolled out from under a stationary pointer.
    const onScroll = () => {
      if (!tilted) return;
      releaseTilt(tilted);
      tilted = null;
    };

    const render = () => {
      // --- background drift ------------------------------------------------
      const nx = (pointerX / window.innerWidth) * 2 - 1;
      const ny = (pointerY / window.innerHeight) * 2 - 1;
      driftX += (nx - driftX) * EASE_DRIFT;
      driftY += (ny - driftY) * EASE_DRIFT;

      if (gridEl) {
        gridEl.style.setProperty("--dx", `${(driftX * DRIFT.grid).toFixed(2)}px`);
        gridEl.style.setProperty("--dy", `${(driftY * DRIFT.grid).toFixed(2)}px`);
      }
      if (pools) {
        pools.style.setProperty("--gdx", `${(driftX * DRIFT.glow).toFixed(2)}px`);
        pools.style.setProperty("--gdy", `${(driftY * DRIFT.glow).toFixed(2)}px`);
      }

      // --- pointer speed ---------------------------------------------------
      /*
        Measured per frame rather than from pointermove timestamps: a stationary
        pointer fires no events at all, so an event-driven reading would freeze at
        whatever the last flick was instead of decaying back to rest.
      */
      const travel = Math.hypot(pointerX - lastX, pointerY - lastY);
      lastX = pointerX;
      lastY = pointerY;
      const target = live ? Math.min(travel / SPEED_FULL, 1) : 0;
      speed += (target - speed) * (target > speed ? EASE_SPEED_UP : EASE_SPEED_DOWN);

      // --- warm wash -------------------------------------------------------
      if (glow) {
        // Eased so the wash lags slightly behind the stepping cluster.
        glowX += (pointerX - glowX) * EASE_GLOW;
        glowY += (pointerY - glowY) * EASE_GLOW;
        glow.style.setProperty("--gx", `${glowX.toFixed(1)}px`);
        glow.style.setProperty("--gy", `${glowY.toFixed(1)}px`);
        glow.style.setProperty("--gs", (1 + speed * SPEED_SWELL).toFixed(3));
      }

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      releaseTilt(tilted);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
