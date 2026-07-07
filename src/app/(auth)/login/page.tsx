"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("E-Mail oder Passwort stimmen nicht.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 p-6">
      <h1 className="text-center text-h1">Willkommen zurück!</h1>
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-4">
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
            <span className="text-caption font-semibold text-ink-700">Passwort</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="min-h-[48px] rounded-chip border-2 border-ink-100 px-4 focus:border-brand-500"
              autoComplete="current-password"
            />
          </label>
          {error && <p className="text-caption text-error-700" role="alert">{error}</p>}
          <Button type="submit" full disabled={loading}>
            {loading ? "Einen Moment …" : "Einloggen"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-3 min-h-[48px] w-full rounded-button border-2 border-ink-100 font-semibold text-ink-700 hover:border-info-500"
        >
          Mit Google einloggen
        </button>
        <p className="mt-3 text-center text-caption text-ink-500">
          Demo-Konto: demo@polyglott.app / demo1234
        </p>
      </Card>
      <p className="text-center text-body text-ink-500">
        Neu hier?{" "}
        <Link href="/register" className="font-semibold text-brand-600 hover:underline">
          Konto erstellen
        </Link>
      </p>
    </main>
  );
}
