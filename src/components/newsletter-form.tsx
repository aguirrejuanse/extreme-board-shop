"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  if (subscribed) {
    return (
      <p
        role="status"
        className="rounded-xl bg-success-soft px-4 py-3 text-sm font-semibold text-success"
      >
        ¡Listo! Te avisamos cuando haya ofertas y novedades.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full rounded-full border border-line bg-ink px-4 py-2.5 text-sm text-paper placeholder:text-paper-dim/60 focus:border-acid focus:outline-none"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-acid px-5 py-2.5 text-xs font-bold tracking-wide text-ink uppercase motion-press hover-lift"
      >
        Sumate
      </button>
    </form>
  );
}
