/**
 * Szenarien für den Konversationsmodus.
 * Neue Szenarien: einfach hier ergänzen – kein Code nötig.
 */
export interface Scenario {
  id: string;
  title: string;
  emojiFree: string; // Lucide-Icon-Name (siehe ScenarioIcon in der Chat-Seite)
  level: "A1" | "A2" | "B1";
  description: string;
  /** Rollenbeschreibung für den Bot */
  botRole: string;
  /** Erster Satz des Bots (Türkisch) */
  opener: string;
  openerTranslation: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: "cafe",
    title: "Im Café bestellen",
    emojiFree: "coffee",
    level: "A1",
    description: "Bestell Getränke, frag nach der Rechnung, führe Smalltalk mit dem Kellner.",
    botRole: "Du bist Kellner in einem Çay-Garten am Bosporus, herzlich und geduldig.",
    opener: "Hoş geldiniz! Ne istersiniz?",
    openerTranslation: "Willkommen! Was möchten Sie?",
  },
  {
    id: "kennenlernen",
    title: "Jemanden kennenlernen",
    emojiFree: "users",
    level: "A1",
    description: "Stell dich vor, frag nach Name und Herkunft, erzähl von dir.",
    botRole: "Du bist Elif, eine freundliche Studentin, die im Sprachcafé neue Leute kennenlernt.",
    opener: "Merhaba! Ben Elif. Senin adın ne?",
    openerTranslation: "Hallo! Ich bin Elif. Wie heißt du?",
  },
  {
    id: "markt",
    title: "Auf dem Wochenmarkt",
    emojiFree: "shopping-basket",
    level: "A1",
    description: "Frag nach Preisen, kauf Obst und Gemüse, handle ein bisschen.",
    botRole: "Du bist Marktverkäufer auf einem Istanbuler Wochenmarkt, lebhaft und humorvoll.",
    opener: "Buyurun! Taze meyve, taze sebze! Ne istiyorsunuz?",
    openerTranslation: "Bitte sehr! Frisches Obst, frisches Gemüse! Was möchten Sie?",
  },
  {
    id: "hotel",
    title: "Im Hotel einchecken",
    emojiFree: "hotel",
    level: "A2",
    description: "Check ein, frag nach Frühstück und WLAN, melde ein Problem mit dem Zimmer.",
    botRole: "Du bist Rezeptionistin in einem Hotel in Antalya, professionell und hilfsbereit.",
    opener: "İyi akşamlar, hoş geldiniz! Size nasıl yardımcı olabilirim?",
    openerTranslation: "Guten Abend, willkommen! Wie kann ich Ihnen helfen?",
  },
  {
    id: "arzt",
    title: "Beim Arzt",
    emojiFree: "stethoscope",
    level: "A2",
    description: "Beschreib deine Symptome, versteh die Diagnose und die Anweisungen.",
    botRole: "Du bist eine ruhige, verständnisvolle Ärztin in einer Praxis in Izmir.",
    opener: "Buyurun, geçin lütfen. Neyiniz var?",
    openerTranslation: "Bitte, kommen Sie rein. Was fehlt Ihnen?",
  },
  {
    id: "smalltalk",
    title: "Smalltalk mit Nachbarn",
    emojiFree: "message-circle",
    level: "A2",
    description: "Wetter, Wochenende, Alltag – lockeres Gespräch im Treppenhaus.",
    botRole: "Du bist Mehmet, der neugierige, aber liebenswerte Nachbar.",
    opener: "Merhaba komşu! Bugün hava çok güzel, değil mi? Hafta sonu ne yaptın?",
    openerTranslation: "Hallo Nachbar! Das Wetter ist heute sehr schön, oder? Was hast du am Wochenende gemacht?",
  },
  {
    id: "wohnung",
    title: "Wohnungsbesichtigung",
    emojiFree: "home",
    level: "B1",
    description: "Frag nach Miete, Nebenkosten und Vertrag – und verhandle.",
    botRole: "Du bist ein Immobilienmakler in Istanbul, redegewandt, aber fair.",
    opener: "Hoş geldiniz! Daireyi gezelim mi? Bu taraftan buyurun.",
    openerTranslation: "Willkommen! Sollen wir die Wohnung besichtigen? Hier entlang, bitte.",
  },
  {
    id: "vorstellungsgespraech",
    title: "Vorstellungsgespräch",
    emojiFree: "briefcase",
    level: "B1",
    description: "Erzähl von deiner Erfahrung, deinen Stärken und stell Rückfragen.",
    botRole: "Du bist Personalchefin eines Istanbuler Unternehmens, freundlich, aber gründlich.",
    opener: "Hoş geldiniz, buyurun oturun. Bize biraz kendinizden bahseder misiniz?",
    openerTranslation: "Willkommen, bitte setzen Sie sich. Erzählen Sie uns etwas über sich?",
  },
];
