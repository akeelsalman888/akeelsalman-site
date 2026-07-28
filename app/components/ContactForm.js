"use client";

import { useState } from "react";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-neutral-600 transition-colors duration-300 hover:border-white/20 focus:border-white/40 focus:outline-none";
const LABEL = "eyebrow mb-2 block text-neutral-500";
const CARD =
  "rounded-2xl border border-white/10 bg-surface/80 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:p-8";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      company: form.company.value, // honeypot
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error || "Couldn't send your message. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`${CARD} flex flex-col items-start justify-center`}>
        <span
          aria-hidden="true"
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white"
        >
          ✓
        </span>
        <p className="font-display text-2xl font-extrabold tracking-tight text-white">
          Message sent — thank you.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          I&apos;ve got it and I&apos;ll reply personally, usually within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={CARD}>
      {/* Honeypot — hidden from humans, catches bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="eyebrow mb-6 text-neutral-500">Start a project</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={LABEL}>
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          placeholder="What are you looking to build? A rough idea is plenty to start."
          className={`${FIELD} resize-y`}
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-ink shadow-md shadow-accent/20 transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          {status !== "sending" && (
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
        <p className="font-mono text-[11px] text-neutral-500">
          I reply within 24 hours.
        </p>
      </div>
    </form>
  );
}
