"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LayoutDashboard, Users, BookOpen, ArrowLeft, type LucideIcon } from "lucide-react";

type Item = { href: string; label: string; Icon: LucideIcon };

const items: Item[] = [
  { href: "/admin", label: "Übersicht", Icon: LayoutDashboard },
  { href: "/admin/users", label: "Nutzer", Icon: Users },
  { href: "/admin/content", label: "Inhalte & Test", Icon: BookOpen },
];

/**
 * Hamburger-Menü mit allen Admin-Funktionen. Rendert nur im Admin-Bereich; der
 * Zugriffsschutz liegt serverseitig in requireAdmin (dieses Menü ist reine Navigation).
 */
export function AdminMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  function active(href: string) {
    return href === "/admin" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Admin-Menü öffnen"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-button border border-ink-100 bg-surface text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-30" role="dialog" aria-modal="true" aria-label="Admin-Menü">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] animate-slide-in-right flex-col border-l border-ink-100 bg-surface p-4 shadow-lifted">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-h3 font-bold text-ink-900">Admin</span>
              <button
                type="button"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-ink-100"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-[48px] items-center gap-3 rounded-button px-3 font-medium transition-colors ${
                    active(item.href) ? "bg-ink-100 text-ink-900" : "text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  <item.Icon aria-hidden className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/dashboard"
              className="mt-auto flex min-h-[48px] items-center gap-3 rounded-button px-3 font-medium text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              <ArrowLeft aria-hidden className="h-5 w-5" />
              Zurück zur App
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
