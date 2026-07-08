"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Crown, Shield, Plus, RotateCcw, Trash2 } from "lucide-react";

/**
 * Admin-Aktionsknöpfe für einen Nutzer. Ruft /api/admin/users/[id] auf; der
 * eigentliche Schutz + die Logik liegen serverseitig. Zerstörerische Aktionen
 * (Reset, Löschen) fragen per confirm() nach.
 */
export function AdminUserActions({
  userId,
  isPremium,
  isAdmin,
  isSelf,
}: {
  userId: string;
  isPremium: boolean;
  isAdmin: boolean;
  isSelf: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function run(action: string, opts?: { amount?: number; confirmMsg?: string; method?: "POST" | "DELETE" }) {
    if (opts?.confirmMsg && !window.confirm(opts.confirmMsg)) return;
    setBusy(action);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: opts?.method ?? "POST",
        headers: { "Content-Type": "application/json" },
        body: opts?.method === "DELETE" ? undefined : JSON.stringify({ action, amount: opts?.amount }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        alert(data.error ?? "Aktion fehlgeschlagen.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  const btn =
    "inline-flex items-center gap-1 rounded-chip border border-ink-100 px-2.5 py-1.5 text-caption font-medium text-ink-700 transition-colors hover:bg-ink-100 disabled:opacity-50";

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        className={btn}
        disabled={busy !== null}
        onClick={() => run("togglePremium")}
      >
        <Crown aria-hidden className={`h-3.5 w-3.5 ${isPremium ? "text-gold" : "text-ink-400"}`} />
        {isPremium ? "Premium aus" : "Premium an"}
      </button>

      <button
        type="button"
        className={btn}
        disabled={busy !== null || (isSelf && isAdmin)}
        title={isSelf && isAdmin ? "Eigene Admin-Rechte nicht entziehbar" : undefined}
        onClick={() => run("toggleAdmin")}
      >
        <Shield aria-hidden className={`h-3.5 w-3.5 ${isAdmin ? "text-brand-600" : "text-ink-400"}`} />
        {isAdmin ? "Admin aus" : "Admin an"}
      </button>

      <button type="button" className={btn} disabled={busy !== null} onClick={() => run("addXp", { amount: 50 })}>
        <Plus aria-hidden className="h-3.5 w-3.5" /> 50 XP
      </button>

      <button
        type="button"
        className={btn}
        disabled={busy !== null}
        onClick={() => run("resetProgress", { confirmMsg: "Gesamten Lernfortschritt dieses Nutzers löschen (Konto bleibt)?" })}
      >
        <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Reset
      </button>

      {!isSelf && (
        <button
          type="button"
          className={`${btn} border-error-500/40 text-error-700 hover:bg-error-50`}
          disabled={busy !== null}
          onClick={() =>
            run("delete", { method: "DELETE", confirmMsg: "Konto UNWIDERRUFLICH löschen? Alle Daten gehen verloren." })
          }
        >
          <Trash2 aria-hidden className="h-3.5 w-3.5" /> Löschen
        </button>
      )}
    </div>
  );
}
