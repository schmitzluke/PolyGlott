import Link from "next/link";
import { db } from "@/lib/db";
import { Users, BookOpen, GraduationCap, CheckCircle2, RefreshCw, MessageSquare } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [userCount, courseCount, lessonCount, progressCount, reviewCount, premiumCount] =
    await Promise.all([
      db.user.count(),
      db.course.count(),
      db.lesson.count(),
      db.userProgress.count(),
      db.reviewItem.count(),
      db.user.count({ where: { isPremium: true } }),
    ]);

  const stats = [
    { label: "Nutzer", value: userCount, Icon: Users },
    { label: "Premium-Nutzer", value: premiumCount, Icon: Users },
    { label: "Kurse", value: courseCount, Icon: GraduationCap },
    { label: "Lektionen", value: lessonCount, Icon: BookOpen },
    { label: "Abschlüsse", value: progressCount, Icon: CheckCircle2 },
    { label: "Karteikarten", value: reviewCount, Icon: RefreshCw },
  ];

  const testLinks = [
    { href: "/dashboard", label: "Lernen (Dashboard)", Icon: GraduationCap },
    { href: "/courses", label: "Kurse durchspielen", Icon: BookOpen },
    { href: "/review", label: "Wiederholen testen", Icon: RefreshCw },
    { href: "/chat", label: "Konversation testen", Icon: MessageSquare },
    { href: "/admin/content", label: "Inhalte & einzelne Lektionen", Icon: BookOpen },
    { href: "/admin/users", label: "Alle Nutzer verwalten", Icon: Users },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-h3 font-bold text-ink-900 mb-4">Statistik</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-card border border-ink-100 bg-surface p-4">
              <s.Icon aria-hidden className="mb-2 h-5 w-5 text-brand-600" />
              <div className="nums text-h2 font-black text-ink-900">{s.value}</div>
              <div className="text-caption text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h3 font-bold text-ink-900 mb-4">Alles testen</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {testLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-[56px] items-center gap-3 rounded-card border border-ink-100 bg-surface px-4 font-medium text-ink-900 transition-colors hover:bg-ink-50"
            >
              <l.Icon aria-hidden className="h-5 w-5 text-brand-600" />
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
