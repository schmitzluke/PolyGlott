# PolyGlott - AI Handover & Projektstatus

Diese Datei fasst den aktuellen Stand, den Kontext und die neuesten Änderungen des Projekts zusammen. Sie dient als Übergabedokument (Handover) für andere KIs oder Entwickler, um schnell in das Projekt einzusteigen.

## 1. Kontext
Das Projekt ist eine Sprachlern-App (Fokus aktuell: Türkisch lernen), die sich durch interaktive Lektionen, echte Dialoge und Gamification auszeichnet. 
*   **Ursprünglicher Name:** Bubbel / Babbel
*   **Neuer Name:** PolyGlott
*   **Tech-Stack:** Next.js (App Router), React, Tailwind CSS (mit CSS Variables für Light/Dark Mode nach spezifischem Design-System), Prisma ORM (SQLite/PostgreSQL), NextAuth für Authentifizierung.
*   **Kern-Features:**
    *   Lernpfad (Courses/Units/Lessons)
    *   Wortschatz-Trainer (Spaced Repetition nach SM-2)
    *   Gamification (XP, Streaks, Level, Achievements)
    *   Premium-Modell (Freischaltung zusätzlicher Lektionen)

## 2. Wichtige Changes (Kürzlich umgesetzt)
In der letzten Session wurden umfangreiche Erweiterungen vorgenommen:
*   **Rebranding:** Die App wurde vollständig von "Bubbel" zu "PolyGlott" umbenannt. Dies umfasst UI-Texte, Metadaten (`package.json`), Dokumentationen und Seed-Daten.
*   **Community & Social Features:**
    *   **Follow-System:** Das Prisma-Schema wurde um eine Self-Relation im `User`-Modell erweitert (`Follows`), sodass sich Nutzer gegenseitig folgen können.
    *   **Community-Seite (`/community`):** Implementierung eines Leaderboards zur Anzeige der Top-Nutzer basierend auf XP.
    *   **Öffentliche Profile (`/users/[id]`):** Ansicht für fremde Nutzer mit Follower-Statistiken, Beitrittsdatum und aktuellem Level.
    *   **Interaktion:** Einführung einer `FollowButton`-Komponente und der dazugehörigen API-Logik.
*   **Design & UI:** Verfeinerung des UI-Stylings der neuen Komponenten (Nutzung der etablierten Tailwind-Tokens wie `text-brand-600`, `bg-surface`, etc.).

## 3. Server und API Kontext
Ein zentrales neues Feature ist die Vorbereitung der Backend-Infrastruktur für eine **externe Companion-App**, die von einem Kollegen entwickelt wird.

*   **Follow-API (`/api/users/[id]/follow`):**
    *   `POST`: Einem Nutzer folgen.
    *   `DELETE`: Einem Nutzer entfolgen.
    *   *Sicherheit:* Geschützt durch `getServerSession` (nur für eingeloggte Nutzer).

*   **Externe Schnittstelle (`GET /api/external/user/[id]`):**
    *   **Zweck:** Bereitstellung von Read-Only-Daten für die Companion-App (z.B. zur Anzeige von Widgets auf dem Homescreen).
    *   **Payload:** Aggregiert den aktuellen Status des Nutzers in einem optimierten JSON:
        *   *Gamification:* Aktuelles Level, Gesamt-XP, heutige XP, Tagesziel-Fortschritt, Streak-Status (Tage und ob der Streak noch "am Leben" ist).
        *   *Lernaufgaben:* Anzahl der fälligen Vokabel-Karten zur Wiederholung.
        *   *Nächste Lektion:* ID und Titel der nächsten anstehenden Lektion.
        *   *Deep-Links:* Bereitstellung von URLs (z.B. `/lessons/[id]` oder `/review`), um aus der Companion-App direkt über ein Widget in die Lernsession von PolyGlott zu springen.
    *   **Offenes Todo (Sicherheit):** Diese Route ist aktuell öffentlich (nur User-ID benötigt), um das Setup und Testing mit der Companion-App zu erleichtern. Für den produktiven Einsatz **muss** hier noch eine Authentifizierungsebene eingeführt werden (z. B. Validierung eines statischen API-Keys via Request-Header oder ein Token-Austausch-Verfahren), um unbefugten Datenabruf zu verhindern.

## 4. Anleitung für andere KIs: Verbindung mit dem Server / API
Um die Companion-App zu entwickeln und die externe API zu testen, gehst du wie folgt vor:

### 1. Lokalen Server starten
Stelle sicher, dass du dich im Root-Verzeichnis des Projekts befindest. Der Entwicklungsserver läuft standardmäßig auf Port 3000.
```bash
# Abhängigkeiten installieren (falls noch nicht geschehen)
npm install

# Datenbank synchronisieren & Prisma Client generieren
npx prisma generate
npx prisma db push

# Server starten
npm run dev
```
Die App ist nun lokal unter `http://localhost:3000` erreichbar.

### 2. Externe API abfragen
Um die Schnittstelle zu testen, benötigst du eine gültige `User-ID` aus der Datenbank. Du kannst in der lokalen SQLite/PostgreSQL Datenbank (oder durch Registrieren eines neuen Accounts über die UI) eine ID herausfinden.

**Beispiel-Aufruf (cURL):**
```bash
curl -X GET http://localhost:3000/api/external/user/<USER_ID> -H "Content-Type: application/json"
```

**Erwartete JSON-Antwort:**
```json
{
  "user": {
    "id": "clx91...",
    "name": "Max Mustermann",
    "targetLanguage": "tr"
  },
  "gamification": {
    "level": "A1",
    "xpTotal": 450,
    "todayXp": 45,
    "dailyGoalXp": 50,
    "streak": {
      "current": 5,
      "alive": true
    }
  },
  "tasks": {
    "dueReviews": 12,
    "nextLesson": {
      "id": "clx8...",
      "title": "Begrüßungen",
      "unitTitle": "Unit 1: Basics",
      "deepLink": "/lessons/clx8..."
    },
    "reviewDeepLink": "/review"
  }
}
```

### 3. Integration in die Companion-App (TypeScript / Fetch Beispiel)
```typescript
const fetchUserStatus = async (userId: string) => {
  try {
    // URL anpassen für Produktion (z.B. https://polyglott.app/api/...)
    const response = await fetch(`http://localhost:3000/api/external/user/${userId}`);
    if (!response.ok) throw new Error("Fehler beim Abrufen der Daten");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
```

Mit diesen Informationen kannst du Widgets oder Übersichtsseiten in der Companion-App bauen, die die Metadaten des Nutzers direkt visualisieren.
