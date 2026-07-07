"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Registrierung fehlgeschlagen.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    router.push("/onboarding");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 p-6">
      <h1 className="text-center text-h1">Konto erstellen</h1>
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-caption font-semibold text-ink-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
              autoComplete="name"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-caption font-semibold text-ink-700">E-Mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-caption font-semibold text-ink-700">Passwort (min. 8 Zeichen)</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
              autoComplete="new-password"
            />
          </label>
          {error && <p className="text-caption text-error-700" role="alert">{error}</p>}
          <Button type="submit" full disabled={loading}>
            {loading ? "Einen Moment …" : "Kostenlos starten"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
          className="mt-3 min-h-[48px] w-full rounded-button border-2 border-ink-100 font-semibold text-ink-700 hover:border-info-500"
        >
          Mit Google registrieren
        </button>
      </Card>
      <p className="text-center text-body text-ink-500">
        Schon dabei?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Einloggen
        </Link>
      </p>
    </main>
  );
}
