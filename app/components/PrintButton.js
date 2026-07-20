"use client";

// Triggers the browser's print dialog — used on /resume so a visitor can
// "Save as PDF" straight from the page. Client-only because it touches window.
export default function PrintButton({ className = "" }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      Download PDF
      <span aria-hidden>↓</span>
    </button>
  );
}
