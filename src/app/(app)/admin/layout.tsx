import { requireAdmin } from "@/lib/auth";
import { AdminMenu } from "@/components/AdminMenu";

/**
 * Admin-Bereich. requireAdmin() ist das serverseitige Gate: nicht eingeloggt →
 * /login, kein Admin → /dashboard. Läuft vor jedem Rendern einer Admin-Seite.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">Admin</p>
          <h1 className="text-display font-black text-ink-900">Kontrollzentrum</h1>
        </div>
        <AdminMenu />
      </div>
      {children}
    </div>
  );
}
