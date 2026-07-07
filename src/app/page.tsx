import Link from "next/link";
import { redirect } from "next/navigation";
import { Brain, Flame, MessagesSquare } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

/** Landing: eingeloggte Nutzer direkt weiterleiten. */
export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect(user.onboarded ? "/dashboard" : "/onboarding");

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-8 p-6 text-center">
      <div className="flex items-center gap-2 text-h2 font-extrabold text-brand-600">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-2xl text-brand-ink">B</span>
        PolyGlott
      </div>
      <h1 className="text-display text-ink-900">
        Sprich Türkisch – <span className="text-brand-600">ab der ersten Lektion.</span>
      </h1>
      <p className="max-w-xl text-body text-ink-500">
        Kurze, interaktive Lektionen mit echten Dialogen, cleverer Wiederholung und
        Motivation, die bleibt. 10–15 Minuten am Tag reichen.
      </p>
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          href="/register"
          className="min-h-[48px] rounded-button bg-brand-500 px-6 py-3 font-semibold text-brand-ink shadow-soft transition-transform hover:bg-brand-400 active:scale-[0.98]"
        >
          Kostenlos loslegen
        </Link>
        <Link
          href="/login"
          className="min-h-[48px] rounded-button border-2 border-ink-100 bg-surface px-6 py-3 font-semibold text-ink-900 transition-colors hover:border-brand-500"
        >
          Ich habe schon ein Konto
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { Icon: MessagesSquare, title: "Echte Dialoge", text: "Rollenspiele aus dem Alltag statt Vokabellisten." },
          { Icon: Brain, title: "Spaced Repetition", text: "Der SM-2-Algorithmus zeigt dir Wörter genau dann, wenn du sie fast vergisst." },
          { Icon: Flame, title: "Streaks & XP", text: "Tagesziele, Abzeichen und ein Streak, den du nicht reißen willst." },
        ].map(({ Icon, title, text }) => (
          <div key={title} className="rounded-card bg-surface p-5 text-left shadow-soft">
            <Icon aria-hidden className="h-7 w-7 text-brand-600" />
            <p className="mt-2 text-h3">{title}</p>
            <p className="mt-1 text-caption text-ink-500">{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
