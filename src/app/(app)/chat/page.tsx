import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Briefcase,
  Coffee,
  GraduationCap,
  Home,
  Hotel,
  MessageCircle,
  MessageSquareText,
  PhoneCall,
  ShoppingBasket,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { SCENARIOS } from "../../../../content/scenarios";

const ICONS: Record<string, LucideIcon> = {
  coffee: Coffee,
  users: Users,
  "shopping-basket": ShoppingBasket,
  hotel: Hotel,
  stethoscope: Stethoscope,
  "message-circle": MessageCircle,
  home: Home,
  briefcase: Briefcase,
};

/** Konversationsmodus: Szenario wählen – als Chat (tippen) oder Anruf (sprechen). */
export default async function ChatOverviewPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const levels = ["A1", "A2", "B1"] as const;

  return (
    <main className="flex flex-col gap-4">
      <div>
        <h1 className="text-h1">Konversation</h1>
        <p className="mt-1 text-body text-ink-500">
          Übe echte Gespräche: als Chat zum Tippen oder als Anruf zum Sprechen.
          Im Anruf läuft fast alles auf Türkisch – Deutsch gibt es nur, wenn du nicht
          weiterkommst oder danach fragst.
        </p>
      </div>

      {/* Freies Gespräch mit dem Lehrer */}
      <Link href="/chat/live/hoca" className="block">
        <div className="rounded-card bg-brand-500 p-5 text-brand-ink shadow-soft transition-transform hover:scale-[1.01]">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-ink/10" aria-hidden>
              <GraduationCap className="h-7 w-7" />
            </span>
            <div className="flex-1">
              <h2 className="text-h2">Anruf mit Hoca</h2>
              <p className="mt-0.5 text-body text-brand-ink/80">
                Freies Gespräch mit deinem Lehrer – er kennt deinen Wortschatz und passt sich deinem Niveau an.
              </p>
            </div>
            <PhoneCall aria-hidden className="h-6 w-6 shrink-0" />
          </div>
        </div>
      </Link>

      {levels.map((level) => {
        const scenarios = SCENARIOS.filter((s) => s.level === level);
        if (scenarios.length === 0) return null;
        return (
          <section key={level}>
            <h2 className="mb-2 text-h3 text-ink-700">Niveau {level}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {scenarios.map((s) => {
                const Icon = ICONS[s.emojiFree] ?? MessageCircle;
                return (
                  <Card key={s.id} className="flex h-full flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50" aria-hidden>
                        <Icon className="h-5 w-5 text-brand-600" />
                      </span>
                      <div>
                        <p className="font-semibold">{s.title}</p>
                        <p className="text-caption text-ink-500">{s.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Link
                        href={`/chat/live/${s.id}`}
                        className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-chip bg-brand-500 px-3 text-caption font-bold text-brand-ink transition-transform hover:scale-[1.02]"
                      >
                        <PhoneCall aria-hidden className="h-4 w-4" /> Anrufen
                      </Link>
                      <Link
                        href={`/chat/${s.id}`}
                        className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-chip border-2 border-ink-100 px-3 text-caption font-bold text-ink-700 hover:border-brand-500"
                      >
                        <MessageSquareText aria-hidden className="h-4 w-4" /> Chatten
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
