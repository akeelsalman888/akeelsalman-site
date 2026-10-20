/*
  Ambient background: fixed pools of light, a visible breathing grid, and a warm
  wash that follows the cursor over it.

  This stays a plain server component — no "use client", no listeners. The grid
  and glow animate purely in CSS, and the cursor layer is just an empty element
  here; PointerEffects.js moves it by writing custom properties. That keeps the
  whole background present with scripting disabled, minus the cursor response
  (which has nothing to respond to in that case anyway).

  .amb-grid-canvas is the enhanced version of the grid: PointerEffects.js draws
  a mesh into it and bends the lines near the pointer, so the lattice reads as
  fabric being pressed rather than a flat sheet sliding around. It stays empty
  and hidden (see .amb-warp in globals.css) until JS confirms a fine pointer and
  no motion preference against it — .amb-grid is what renders until then.
*/
export default function Ambience() {
  return (
    <div className="amb" aria-hidden="true">
      <div className="amb-glow" />
      <div className="amb-grid" />
      <canvas className="amb-grid-canvas" />
      <div className="amb-cursor-glow" />
    </div>
  );
}
