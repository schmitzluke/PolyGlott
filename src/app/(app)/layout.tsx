import Link from "next/link";
import { redirect } from "next/navigation";
import { Home, Map, MessageCircle, RotateCcw, Settings, User, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BottomNav } from "@/components/BottomNav";

const nav = [
  { href: "/dashboard", label: "Lernen", Icon: Home },
  { href: "/courses", label: "Kurse", Icon: Map },
  { href: "/review", label: "Wiederholen", Icon: RotateCcw },
  { href: "/chat", label: "Konversation", Icon: MessageCircle },
  { href: "/community", label: "Community", Icon: Users },
  { href: "/profile", label: "Profil", Icon: User },
  { href: "/settings", label: "Einstellungen", Icon: Settings },
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-dvh pb-20 lg:pb-0">
      <header className="sticky top-0 z-10 border-b border-ink-100 bg-ink-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between p-3">
          <Link href="/dashboard" className="flex items-center gap-2 font-extrabold text-brand-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-brand-ink">B</span>
            <span className="hidden sm:inline">PolyGlott</span>
          </Link>
          <div className="flex items-center gap-1">
            <nav aria-label="Hauptnavigation" className="hidden gap-1 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-[44px] rounded-button px-4 py-2.5 font-medium text-ink-700 transition-colors duration-150 hover:bg-ink-100 hover:text-ink-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl p-4">{children}</div>

      {/* Mobile: Bottom-Navigation (5 Tabs + "Mehr"-Sheet, siehe BottomNav) */}
      <BottomNav />
    </div>
  );
}
