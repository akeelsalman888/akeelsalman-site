/*
  Ambient background: fixed pools of light, a visible breathing grid, and two
  cursor-driven highlights on top of it.

  This stays a plain server component — no "use client", no listeners. The grid
  and glow animate purely in CSS, and the two cursor layers are just empty
  elements here; PointerEffects.js moves them by writing custom properties. That
  keeps the whole background present with scripting disabled, minus the cursor
  response (which has nothing to respond to in that case anyway).
*/
export default function Ambience() {
  return (
    <div className="amb" aria-hidden="true">
      <div className="amb-glow" />
      <div className="amb-grid" />
      {/* Warm wash first, then the lit cell above it. */}
      <div className="amb-cursor-glow" />
      <div className="amb-nodes" />
    </div>
  );
}
