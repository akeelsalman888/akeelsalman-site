"use client";

import { useState } from "react";

const FIELD =
  "w-full rounded-lg border bg-surface px-4 py-3 text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none";
const LABEL = "eyebrow mb-2 block text-faint";

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
      <div className="mt-10 max-w-xl rounded-xl border bg-surface p-8">
        <p className="font-display text-2xl font-medium tracking-tight text-accent">
          Message sent — thank you.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          I&apos;ve got it and I&apos;ll reply personally, usually within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10 max-w-xl">
      {/* Honeypot — hidden from humans, catches bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

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
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          {status !== "sending" && <span aria-hidden>→</span>}
        </button>
        <p className="text-sm text-faint">I reply within 24 hours.</p>
      </div>
    </form>
  );
}
