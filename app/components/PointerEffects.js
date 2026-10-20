"use client";

import { useEffect } from "react";

// Maximum card rotation on each axis, in degrees.
const MAX_DEG = 9;

/*
  How far the light pools move, in px, at full pointer deflection. Negative, so
  they hang back opposite the pointer while the grid mesh (below) is pulled
  toward it — that opposition is what reads as depth instead of the whole
  background sliding as one sheet.
*/
const DRIFT = { glow: -44 };

// Easing applied per frame toward the pointer. Lower = more lag on the pull.
const EASE_DRIFT = 0.12;
const EASE_GLOW = 0.2;

/*
  The grid mesh push. Nodes within GRID_RADIUS px of the pointer are pulled
  toward it, falling off to nothing at the edge — GRID_STRENGTH is the pull at
  distance 0. EASE_WARP fades the whole effect in/out with `live` so it doesn't
  pop when the pointer enters or leaves.
*/
const GRID_RADIUS = 260;
const GRID_STRENGTH = 46;
const EASE_WARP = 0.12;

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

    const ambEl = document.querySelector(".amb");
    const glow = document.querySelector(".amb-cursor-glow");
    const canvas = document.querySelector(".amb-grid-canvas");
    const gridCtx = canvas?.getContext("2d");
    const pools = document.querySelector(".amb-glow");

    // Shared with the CSS grid's cell size so the mesh this draws lines up with
    // it exactly during the fade handoff between the two.
    const GRID =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--grid")
      ) || 44;

    let canvasW = 0;
    let canvasH = 0;

    const resizeCanvas = () => {
      if (!canvas || !gridCtx) return;
      const dpr = window.devicePixelRatio || 1;
      canvasW = window.innerWidth;
      canvasH = window.innerHeight;
      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    ambEl?.classList.add("amb-warp");

    let pointerX = -1000;
    let pointerY = -1000;
    let glowX = -1000; // eased, trails the pointer
    let glowY = -1000;
    let driftX = 0; // eased, normalised −1…1 from the viewport centre
    let driftY = 0;
    let lastX = -1000; // pointer position at the previous frame, for speed
    let lastY = -1000;
    let speed = 0; // eased, normalised 0…1
    let warpAmt = 0; // eased 0…1, how much the grid mesh is currently pulled
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

    /*
      Redraws the grid as a mesh of nodes at GRID spacing, pulling each one
      toward (px, py) by an amount that falls off to 0 at GRID_RADIUS — a
      quadratic falloff so the pull is felt as a smooth dent rather than a hard
      edge. Drawn as full mesh lines (not just displaced dots) so the lattice
      visibly bends instead of just breaking apart near the cursor.

      amt eases the whole effect in/out with `live`, independent of the falloff
      above — this is what fades the push in when the pointer arrives instead of
      snapping straight to full strength.
    */
    const drawWarpedGrid = (ctx, w, h, px, py, amt) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.058)";
      ctx.lineWidth = 1;

      const cols = Math.ceil(w / GRID) + 4;
      const rows = Math.ceil(h / GRID) + 4;
      const startX = -2 * GRID;
      const startY = -2 * GRID;

      const warp = (x, y) => {
        const dx = x - px;
        const dy = y - py;
        const dist = Math.hypot(dx, dy);
        if (dist >= GRID_RADIUS || dist < 0.01) return [x, y];
        const pull = GRID_STRENGTH * amt * (1 - dist / GRID_RADIUS) ** 2;
        return [x - (dx / dist) * pull, y - (dy / dist) * pull];
      };

      ctx.beginPath();
      for (let r = 0; r <= rows; r++) {
        const y = startY + r * GRID;
        for (let c = 0; c <= cols; c++) {
          const [wx, wy] = warp(startX + c * GRID, y);
          if (c === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
      }
      for (let c = 0; c <= cols; c++) {
        const x = startX + c * GRID;
        for (let r = 0; r <= rows; r++) {
          const [wx, wy] = warp(x, startY + r * GRID);
          if (r === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
      }
      ctx.stroke();
    };

    const render = () => {
      // --- background drift -------------------------------------------------
      const nx = (pointerX / window.innerWidth) * 2 - 1;
      const ny = (pointerY / window.innerHeight) * 2 - 1;
      driftX += (nx - driftX) * EASE_DRIFT;
      driftY += (ny - driftY) * EASE_DRIFT;

      if (pools) {
        pools.style.setProperty("--gdx", `${(driftX * DRIFT.glow).toFixed(2)}px`);
        pools.style.setProperty("--gdy", `${(driftY * DRIFT.glow).toFixed(2)}px`);
      }

      // --- grid mesh push -----------------------------------------------------
      warpAmt += ((live ? 1 : 0) - warpAmt) * EASE_WARP;
      if (gridCtx) {
        if (warpAmt > 0.001) {
          drawWarpedGrid(gridCtx, canvasW, canvasH, pointerX, pointerY, warpAmt);
        } else {
          gridCtx.clearRect(0, 0, canvasW, canvasH);
        }
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
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      releaseTilt(tilted);
      ambEl?.classList.remove("amb-warp");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
