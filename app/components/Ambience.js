/*
  Ambient background: fixed pools of light, a visible breathing grid, and a warm
  wash that follows the cursor over it.

  This stays a plain server component — no "use client", no listeners. The grid
  and glow animate purely in CSS, and the cursor layer is just an empty element
  here; PointerEffects.js moves it by writing custom properties. That keeps the
  whole background present with scripting disabled, minus the cursor response
  (which has nothing to respond to in that case anyway).
*/
export default function Ambience() {
  return (
    <div className="amb" aria-hidden="true">
      <div className="amb-glow" />
      <div className="amb-grid" />
      <div className="amb-cursor-glow" />
    </div>
  );
}
