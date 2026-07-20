"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // null until mounted so server and first client render match (no icon yet),
  // avoiding a hydration mismatch. The <head> script sets the actual theme.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode etc.) — toggle still works for the session.
    }
    document.documentElement.setAttribute("data-theme", next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        {theme === null ? null : isDark ? (
          // Sun — shown in dark mode (tap to go light)
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          // Moon — shown in light mode (tap to go dark)
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
