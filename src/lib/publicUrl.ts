/**
 * Basis-URL für Deep-Links, die an externe Clients (Companion-App / Handy-Widget)
 * ausgeliefert werden.
 *
 * WICHTIG: `NEXTAUTH_URL` ist im Dev oft `http://localhost:3000` oder eine LAN-IP
 * (z. B. `http://192.168.178.192:3000`) — beides ist vom Handy im Mobilfunknetz
 * NICHT erreichbar. Setze `PUBLIC_APP_URL` auf eine öffentlich/Tailscale-erreichbare
 * URL (z. B. `https://polyglott.example.com` oder `https://<host>.ts.net`), damit
 * ein Widget-Klick die App korrekt öffnet.
 *
 * Priorität: PUBLIC_APP_URL → NEXTAUTH_URL → http://localhost:3000
 */
export function publicBaseUrl(): string {
  const raw = process.env.PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
  return raw.replace(/\/+$/, ""); // trailing Slash entfernen
}

/** Baut einen absoluten Deep-Link aus einem App-Pfad (`/review`, `/lessons/x`). */
export function deepLink(path: string): string {
  return `${publicBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
