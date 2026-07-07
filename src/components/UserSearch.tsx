"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Nutzersuche à la Instagram: tippen filtert die Community-Liste nach Namen.
 * Schreibt den Suchbegriff debounced in den `?q=`-Query-Param; die Server-Seite
 * (community/page.tsx) filtert damit. Reine Präsentation – keine eigene API nötig.
 */
export function UserSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const first = useRef(true);

  useEffect(() => {
    // Ersten Render (Hydration) nicht als Navigation auslösen
    if (first.current) {
      first.current = false;
      return;
    }
    const id = setTimeout(() => {
      const q = value.trim();
      router.replace(q ? `/community?q=${encodeURIComponent(q)}` : "/community", { scroll: false });
    }, 250);
    return () => clearTimeout(id);
  }, [value, router]);

  return (
    <div className="relative">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nutzer suchen …"
        aria-label="Nutzer suchen"
        className="min-h-[52px] w-full rounded-button border border-ink-100 bg-surface pl-12 pr-11 text-body text-ink-900 placeholder:text-ink-500 outline-none transition-colors focus:border-brand-500"
      />
      {value && (
        <button
          type="button"
          aria-label="Suche leeren"
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100 hover:text-ink-900"
        >
          <X aria-hidden className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
