/**
 * Verbindliche CEFR-Stufendefinitionen A1–B2.
 * Definiert pro Stufe: Wortschatz-Ziel, Grammatik-Themen, und die 5 Kompetenz-Säulen.
 */

export interface CefrLevelDefinition {
  level: "A1" | "A2" | "B1" | "B2";
  label: string;
  vocabRange: [number, number]; // [min, max]
  grammarTopics: string[];
  skills: {
    reading: string;
    listening: string;
    writing: string;
    speaking: string;
    pragmatics: string;
  };
  canDo: string[]; // Kann-Beschreibungen
}

export const CEFR_LEVELS: Record<string, CefrLevelDefinition> = {
  A1: {
    level: "A1",
    label: "Anfänger",
    vocabRange: [500, 700],
    grammarTopics: [
      "Vokalharmonie & Aussprache (ı/i, ö/ü, ğ)",
      "Präsens -(i)yor (geliyorum, gidiyorum)",
      "Personalsuffixe „sein“ (-yım/-sın: Almanyalıyım)",
      "Satzbau Subjekt–Objekt–Verb; keine Artikel, kein Genus",
      "Erste Fälle als Chunks: Lokativ -de, Richtung -e",
    ],
    skills: {
      reading: "Sehr kurze, einfache Texte (Schilder, Formulare) Satz für Satz verstehen.",
      listening: "Sehr langsam und deutlich gesprochene Sätze zu vertrauten Themen verstehen.",
      writing: "Einfache Formulare ausfüllen und kurze persönliche Angaben machen.",
      speaking: "Sich einfach vorstellen und einfache Fragen stellen/beantworten (Name, Herkunft, Wohnort).",
      pragmatics: "Grundlegende Begrüßungs- und Abschiedsformeln; erkennen, ob \"Du\" oder \"Sie\" angebracht ist.",
    },
    canDo: [
      "Sich einfach vorstellen (Name, Herkunft, Wohnort)",
      "Einfache Fragen stellen und beantworten (Einkauf, Alltag)",
      "Sehr langsam gesprochene Sätze verstehen",
    ],
  },
  A2: {
    level: "A2",
    label: "Grundlagen",
    vocabRange: [1000, 1200],
    grammarTopics: [
      "Vergangenheit -di (gittim, yaptım)",
      "var/yok + Possessiv (Rezervasyonum var)",
      "Fragepartikel mı/mi/mu/mü",
      "Fälle aktiv: Lokativ -de, Dativ -e, Ablativ -dan",
      "Verb + -meyi sevmek (okumayı seviyorum); Begründung mit çünkü",
      "Höfliche Aufforderung -in/-ın (gidin, dönün)",
    ],
    skills: {
      reading: "Einfache Schilder, Speisekarten und kurze Nachrichten verstehen.",
      listening: "Kurze, klar gesprochene Durchsagen und Alltagsgespräche verstehen.",
      writing: "Einfache Notizen, kurze Nachrichten und Postkarten schreiben.",
      speaking: "Über vertraute Dinge sprechen (Familie, Arbeit, Hobbys); einfache Alltagssituationen meistern.",
      pragmatics: "Duzen/Siezen korrekt anwenden; einfache Höflichkeitsformen beherrschen (Bitte/Danke/Entschuldigung).",
    },
    canDo: [
      "Über vertraute Dinge sprechen (Familie, Arbeit, Hobbys)",
      "Einfache Schilder, Speisekarten und kurze Nachrichten verstehen",
      "Einfache Notizen schreiben",
    ],
  },
  B1: {
    level: "B1",
    label: "Selbstständig",
    vocabRange: [2000, 2500],
    grammarTopics: [
      "Futur -acak/-ecek (gideceğim)",
      "Aorist -(a/ı)r für Gewohnheiten (çalışırım, giderim)",
      "Können/Dürfen -ebilmek (gelebilirim, erteleyebilir miyiz?)",
      "Notwendigkeit -malı/-meli (içmelisin)",
      "Vergleich daha/en + Ablativ (Ankara'dan daha büyük)",
      "Konditional -sa/-se (istersen, vaktin varsa); Vorschlag -alım mı?",
      "Miş-Vergangenheit rezeptiv (duydum ki … -miş)",
    ],
    skills: {
      reading: "Texte in klarer Standardsprache zu vertrauten Themen (Arbeit, Schule, Freizeit) global und im Detail erfassen.",
      listening: "Die Hauptpunkte bei klarer Standardsprache verstehen, auch mit leichten Nebengeräuschen.",
      writing: "Zusammenhängende Texte zu vertrauten Themen schreiben; persönliche Briefe mit Erfahrungen und Eindrücken.",
      speaking: "Die meisten Situationen auf Reisen meistern; zusammenhängend über Erfahrungen und Ziele berichten; kurze Begründungen liefern.",
      pragmatics: "Formelle vs. informelle Register sicher unterscheiden; kulturell angemessen reagieren (z. B. Einladungen, Absagen).",
    },
    canDo: [
      "Hauptpunkte bei klarer Standardsprache verstehen (Arbeit, Schule)",
      "Die meisten Situationen auf Reisen meistern",
      "Zusammenhängend über Erfahrungen und Ziele berichten",
      "Kurze Begründungen liefern",
    ],
  },
  B2: {
    level: "B2",
    label: "Fortgeschritten",
    vocabRange: [4000, 5000],
    grammarTopics: [
      "Miş-Vergangenheit aktiv: Gehörtes & Vermutetes (olmuş, gitmiş)",
      "Passiv -il/-in (yapılıyor, kuruldu)",
      "Relativpartizipien -an/-en und -dığı (gördüğüm film)",
      "Nominalisierung -ma/-mak + Possessiv (gelmesini istiyorum)",
      "Irrealer Konditional -seydi (bilseydim gelirdim)",
      "Konnektoren der Argumentation (rağmen, oysa, üstelik, ayrıca)",
      "Formelles Register: Sie-Formen, Höflichkeitsfloskeln im Beruf",
    ],
    skills: {
      reading: "Komplexe Texte zu konkreten und abstrakten Themen verstehen, einschließlich Fachdiskussionen im eigenen Bereich.",
      listening: "Längere Redebeiträge und komplexe Argumentation verstehen, auch bei normalem Sprechtempo und Nebengeräuschen.",
      writing: "Detaillierte Texte (E-Mails, Briefe, Argumentationen) im passenden Stil (formell/informell) verfassen.",
      speaking: "Sich spontan und fließend mit Muttersprachlern unterhalten; Vor- und Nachteile von Standpunkten detailliert erläutern; Präsentationen halten.",
      pragmatics: "Fehlerfreies Duzen/Siezen in allen Kontexten; feine Höflichkeitsnuancen; kulturelle Konventionen sicher anwenden.",
    },
    canDo: [
      "Komplexe Texte zu konkreten und abstrakten Themen verstehen",
      "Fachdiskussionen im eigenen Bereich folgen",
      "Sich spontan und fließend mit Muttersprachlern unterhalten",
      "Vor- und Nachteile von Standpunkten detailliert erläutern",
    ],
  },
};

/** Alle Stufen in Reihenfolge */
export const LEVEL_ORDER: CefrLevelDefinition["level"][] = ["A1", "A2", "B1", "B2"];

/** Wortschatz-Ziel für eine Stufe (oberer Wert) */
export function vocabTargetForLevel(level: string): number {
  return CEFR_LEVELS[level]?.vocabRange[1] ?? 700;
}

/** Nächste Stufe (oder null wenn B2) */
export function nextLevel(level: string): CefrLevelDefinition["level"] | null {
  const idx = LEVEL_ORDER.indexOf(level as CefrLevelDefinition["level"]);
  return idx >= 0 && idx < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[idx + 1] : null;
}
