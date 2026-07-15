"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  BookOpenCheck,
  MessageCircle,
  RotateCcw,
  Settings,
  User,
  Users,
  MoreHorizontal,
  Shield,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = { href: string; label: string; Icon: LucideIcon };

/**
 * Mobile-Bottom-Navigation. Sieben Ziele passen mit den langen deutschen Labels
 * ("Wiederholen", "Konversation") nicht nebeneinander in eine 375px-Leiste – sie
 * überlappen. Lösung: fünf primäre Tabs (kurze Labels) + ein "Mehr"-Sheet für die
 * selteneren Ziele (Profil, Einstellungen). Desktop-Nav bleibt im Header (layout.tsx).
 */
const primary: NavItem[] = [
  { href: "/dashboard", label: "Lernen", Icon: Home },
  { href: "/trainer", label: "Trainer", Icon: BookOpenCheck },
  { href: "/review", label: "Üben", Icon: RotateCcw },
  { href: "/chat", label: "Chat", Icon: MessageCircle },
  { href: "/community", label: "Community", Icon: Users },
];

const more: NavItem[] = [
  { href: "/profile", label: "Profil", Icon: User },
  { href: "/settings", label: "Einstellungen", Icon: Settings },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Sheet bei Navigation schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const moreItems: NavItem[] = isAdmin
    ? [...more, { href: "/admin", label: "Admin", Icon: Shield }]
    : more;
  const moreActive = moreItems.some((item) => isActive(pathname, item.href));

  return (
    <>
      {/* "Mehr"-Sheet */}
      {open && (
        <div className="fixed inset-0 z-20 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 animate-slide-up rounded-t-card border-t border-ink-100 bg-surface p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-lifted">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-h3 font-bold text-ink-900">Mehr</span>
              <button
                type="button"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-[52px] items-center gap-3 rounded-button px-3 font-medium transition-colors duration-150 ${
                    isActive(pathname, item.href)
                      ? "bg-ink-100 text-ink-900"
                      : "text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  <item.Icon aria-hidden className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Hauptnavigation mobil"
        className="fixed inset-x-0 bottom-0 z-10 flex border-t border-ink-100 bg-surface px-1 pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {primary.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-chip px-1 py-1.5 transition-colors duration-150 ${
                active ? "text-brand-600" : "text-ink-700 hover:bg-ink-100"
              }`}
            >
              <item.Icon aria-hidden className="h-5 w-5 shrink-0" />
              <span className="w-full truncate text-center text-[10px] font-medium leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="dialog"
          className={`flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-chip px-1 py-1.5 transition-colors duration-150 ${
            moreActive || open ? "text-brand-600" : "text-ink-700 hover:bg-ink-100"
          }`}
        >
          <MoreHorizontal aria-hidden className="h-5 w-5 shrink-0" />
          <span className="text-[10px] font-medium leading-tight">Mehr</span>
        </button>
      </nav>
    </>
  );
}
