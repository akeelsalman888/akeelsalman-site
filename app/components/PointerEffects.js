"use client";

import { useEffect } from "react";

// Maximum card rotation on each axis, in degrees.
const MAX_DEG = 9;

// Fallback if --grid can't be read for any reason. Must match globals.css.
const FALLBACK_GRID = 64;

/*
  Width of the node cluster in cells. MUST match the `* 8` in the .amb-nodes rule,
  and must stay EVEN: the layer is centred on a snapped intersection by shifting it
  back half its width, and only an even span makes that half a whole number of
  cells. An odd span lands the offset on a half-cell and every dot drifts off the
  grid lines it is supposed to be sitting on.
*/
const NODE_SPAN = 8;

/*
  How far each background layer moves, in px, at full pointer deflection.

  The grid's figure is POSITIVE, so it travels the same way as the pointer — the
  lattice is pulled toward the cursor. The light pools are negative, so they hang
  back the other way; that opposition is what reads as depth instead of the whole
  background sliding as one sheet.

  `grid` must stay under the CSS overhang (-128px, two cells) or the pull would
  drag an empty edge into view.
*/
const DRIFT = { grid: 48, glow: -30 };

// Easing applied per frame toward the pointer. Lower = more lag on the pull.
const EASE_DRIFT = 0.09;
const EASE_GLOW = 0.16;

/*
  Everything the pointer drives, from one listener and one animation loop:

  1. The grid lights up. A cluster of the grid's own intersection points glows
     around the pointer, snapped to the nearest intersection so it steps from one
     to the next, plus a warm wash that follows smoothly behind it.

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

    const nodes = document.querySelector(".amb-nodes");
    const glow = document.querySelector(".amb-cursor-glow");
    const gridEl = document.querySelector(".amb-grid");
    const pools = document.querySelector(".amb-glow");

    /*
      Read the cell size from the same custom property the grid background uses,
      so the dots can never drift out of step with the lines they sit on. Re-read
      on resize in case it's ever made responsive.
    */
    let grid = FALLBACK_GRID;
    const readGrid = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--grid")
        .trim();
      const n = parseFloat(raw);
      grid = Number.isFinite(n) && n > 0 ? n : FALLBACK_GRID;
    };
    readGrid();

    let pointerX = -1000;
    let pointerY = -1000;
    let glowX = -1000; // eased, trails the pointer
    let glowY = -1000;
    let driftX = 0; // eased, normalised −1…1 from the viewport centre
    let driftY = 0;
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
        nodes?.classList.add("is-live");
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
      nodes?.classList.remove("is-live");
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

      const gdx = driftX * DRIFT.grid;
      const gdy = driftY * DRIFT.grid;

      if (gridEl) {
        gridEl.style.setProperty("--dx", `${gdx.toFixed(2)}px`);
        gridEl.style.setProperty("--dy", `${gdy.toFixed(2)}px`);
      }
      if (pools) {
        pools.style.setProperty("--gdx", `${(driftX * DRIFT.glow).toFixed(2)}px`);
        pools.style.setProperty("--gdy", `${(driftY * DRIFT.glow).toFixed(2)}px`);
      }

      // --- node cluster ----------------------------------------------------
      if (nodes) {
        /*
          Snap in the GRID's own coordinate space, not the screen's. The grid has
          drifted by (gdx, gdy), so a line drawn at 64n now sits at 64n + gdx on
          screen. Subtracting the drift before rounding finds the intersection the
          pointer is really nearest; adding it back afterwards puts the cluster
          where that intersection currently is. Snapping on raw screen coordinates
          would leave the dots sliding off the lines as the grid moved.
        */
        const snapX = Math.round((pointerX - gdx) / grid) * grid;
        const snapY = Math.round((pointerY - gdy) / grid) * grid;
        const half = (NODE_SPAN / 2) * grid;
        nodes.style.setProperty("--nx", `${(snapX + gdx - half).toFixed(2)}px`);
        nodes.style.setProperty("--ny", `${(snapY + gdy - half).toFixed(2)}px`);
      }

      // --- warm wash -------------------------------------------------------
      if (glow) {
        // Eased so the wash lags slightly behind the stepping cluster.
        glowX += (pointerX - glowX) * EASE_GLOW;
        glowY += (pointerY - glowY) * EASE_GLOW;
        glow.style.setProperty("--gx", `${glowX.toFixed(1)}px`);
        glow.style.setProperty("--gy", `${glowY.toFixed(1)}px`);
      }

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", readGrid);
    window.addEventListener("blur", onLeave);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      releaseTilt(tilted);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", readGrid);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
