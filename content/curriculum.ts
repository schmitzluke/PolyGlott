/**
 * Maschinenlesbarer CEFR-Lehrplan: definiert alle noch zu generierenden
 * Lektionen bis B1. Der Batch-Generator (npm run generate:curriculum) arbeitet
 * diese Liste ab und überspringt bereits generierte Lektionen.
 *
 * Richtwerte pro Level (CEFR-orientiert):
 *   A1 ≈ 12 Lektionen (~100 Vokabeln)  → 6 handgeschrieben + 6 generiert
 *   A2 ≈ 15 Lektionen (~120 Vokabeln)  → 6 handgeschrieben + 9 generiert
 *   B1 ≈ 15 Lektionen (~130 Vokabeln)  → 15 generiert
 * Dazu: Konversationsmodus für freies Sprechen und Niveau-Tests zum Abschluss.
 */

export interface PlannedLesson {
  courseSlug: string;
  level: "A1" | "A2" | "B1";
  unit: string;
  unitDescription: string;
  title: string;
  /** Lernziel, Kernvokabular und Grammatik für den Generator */
  topic: string;
}

export const CURRICULUM: PlannedLesson[] = [
  // ================================================================
  // A1-AUSBAU (Kurs: tr-a1-alltag) – Units 3 & 4
  // ================================================================
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Essen & Trinken",
    unitDescription: "Im Restaurant bestellen, über Essen sprechen, Vorlieben äußern.",
    title: "Im Restaurant",
    topic:
      "Im Restaurant bestellen: menü, çorba (Suppe), köfte, salata, tatlı (Nachtisch), içecek; 'Ne tavsiye edersiniz?' passiv verstehen; recyceln: istiyorum, lütfen, hesap, afiyet olsun; Grammatik: Akkusativ-Grundidee bei bestimmten Objekten (çorbayı) nur implizit zeigen, nicht erklären",
  },
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Essen & Trinken",
    unitDescription: "Im Restaurant bestellen, über Essen sprechen, Vorlieben äußern.",
    title: "Das schmeckt mir!",
    topic:
      "Vorlieben: seviyorum/sevmiyorum mit Nomen (Balık seviyorum), lezzetli, acı (scharf), tatlı (süß), kahvaltıda ne yersin?; Verneinung -m- einführen (sevmiyorum); recyceln: çay, kahve, su, süt",
  },
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Essen & Trinken",
    unitDescription: "Im Restaurant bestellen, über Essen sprechen, Vorlieben äußern.",
    title: "Einkaufen für zu Hause",
    topic:
      "Lebensmittel einkaufen: ekmek, peynir, yumurta, elma, domates, kilo, yarım; 'Bir kilo domates, lütfen'; recyceln: ne kadar, ucuz/pahalı, Zahlen 1–5; Zahlen 6–10 einführen (altı, yedi, sekiz, dokuz, on)",
  },
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Familie & Menschen",
    unitDescription: "Über Familie sprechen, Menschen beschreiben.",
    title: "Meine Familie",
    topic:
      "Familie: anne, baba, kardeş, abla, ağabey/abi, aile; Possessiv -(i)m vertiefen: annem, babam; 'Kaç kardeşin var?' mit var/yok-Vorgriff (nur als Chunk); recyceln: benim/senin, adı ne",
  },
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Familie & Menschen",
    unitDescription: "Über Familie sprechen, Menschen beschreiben.",
    title: "Wie sieht er aus?",
    topic:
      "Menschen beschreiben: uzun (groß/lang), kısa, genç, yaşlı, güzel, yakışıklı; 'Annem çok genç' – Adjektiv als Prädikat ohne Verb; recyceln: çok, Familienwörter aus voriger Lektion",
  },
  {
    courseSlug: "tr-a1-alltag",
    level: "A1",
    unit: "Familie & Menschen",
    unitDescription: "Über Familie sprechen, Menschen beschreiben.",
    title: "Berufe & Alltag",
    topic:
      "Berufe: öğretmen, doktor, mühendis, öğrenci, işçi; 'Ne iş yapıyorsun?' – 'Öğretmenim' (Beruf + -im = ich bin); recyceln: -yım/-im aus 'Almanyalıyım', çalışıyorum als Chunk",
  },

  // ================================================================
  // A2-AUSBAU (Kurs: tr-a2-alltag-reisen) – Units 3–5
  // ================================================================
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Wohnen & Stadt",
    unitDescription: "Die eigene Wohnung beschreiben, Orte in der Stadt, Wege erklären.",
    title: "Meine Wohnung",
    topic:
      "Wohnung: ev, daire, oda, mutfak, banyo, salon, balkon; 'Evimde üç oda var' – var/yok mit Ortsangabe; Lokativ -de vertiefen: mutfakta, salonda; recyceln: var/yok, Zahlen",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Wohnen & Stadt",
    unitDescription: "Die eigene Wohnung beschreiben, Orte in der Stadt, Wege erklären.",
    title: "In meinem Viertel",
    topic:
      "Stadt: mahalle, market, eczane (Apotheke), park, cami, banka, postane; 'Evimin yanında bir market var' – yanında/karşısında (neben/gegenüber) als Chunks; recyceln: nerede, sağda/solda, yakın/uzak",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Wohnen & Stadt",
    unitDescription: "Die eigene Wohnung beschreiben, Orte in der Stadt, Wege erklären.",
    title: "Wege beschreiben",
    topic:
      "Wegbeschreibung aktiv geben: düz gidin, sağa dönün, sola dönün, ikinci sokak, köşede; Imperativ Sie-Form -in/-ın; recyceln: affedersiniz, nerede, otobüs durağı; Ablativ -dan einführen: buradan (von hier)",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Arbeit & Schule",
    unitDescription: "Über Job, Ausbildung und Pläne im Alltag sprechen.",
    title: "Mein Arbeitstag",
    topic:
      "Arbeit: iş, ofis, toplantı (Meeting), meslektaş yerine 'iş arkadaşı', proje, yoğun (busy); 'İşte çok yoğunum'; Aorist als Chunk für Gewohnheiten: 'Genelde saat dokuzda başlarım' nur rezeptiv; recyceln: her gün, saat kaçta, önce/sonra",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Arbeit & Schule",
    unitDescription: "Über Job, Ausbildung und Pläne im Alltag sprechen.",
    title: "Türkisch lernen",
    topic:
      "Lernen: ders, kurs, kelime, cümle, tekrar etmek, anlamak; 'Anlamadım, tekrar eder misiniz?' (Verstehens-Notfallsätze!); 'Türkçe öğreniyorum çünkü …' – çünkü einführen; recyceln: biraz, öğreniyorum",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Arbeit & Schule",
    unitDescription: "Über Job, Ausbildung und Pläne im Alltag sprechen.",
    title: "Am Telefon",
    topic:
      "Telefonieren: alo, arıyorum, mesaj, meşgul, sonra ararım; 'Kiminle görüşüyorum?' als Chunk; höfliche Bitten: '… ile görüşebilir miyim?' rezeptiv; recyceln: merhaba, teşekkürler, Vergangenheit aradım",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Feste & Einladungen",
    unitDescription: "Einladen, zusagen, absagen und gemeinsam feiern.",
    title: "Kommst du zu meiner Party?",
    topic:
      "Einladung: davet, parti, doğum günü, hediye, gelmek; 'Partime gelir misin?' – höfliche Einladung mit Aorist-Frage als Chunk; zusagen/absagen: 'Tabii, gelirim!' / 'Maalesef gelemem'; recyceln: hafta sonu, saat kaçta",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Feste & Einladungen",
    unitDescription: "Einladen, zusagen, absagen und gemeinsam feiern.",
    title: "Herzlichen Glückwunsch!",
    topic:
      "Feste & Wünsche: bayram, kutlamak, 'Doğum günün kutlu olsun!', 'İyi bayramlar!', mutlu, sağlık; Kulturtipp Şeker Bayramı; recyceln: çok güzel, teşekkür ederim",
  },
  {
    courseSlug: "tr-a2-alltag-reisen",
    level: "A2",
    unit: "Feste & Einladungen",
    unitDescription: "Einladen, zusagen, absagen und gemeinsam feiern.",
    title: "Beim Abendessen zu Gast",
    topic:
      "Zu Gast sein: misafir, buyurun, 'Eline sağlık!' (Kompliment an den Koch), doydum (ich bin satt), biraz daha; Kultur: Schuhe ausziehen, Tee ablehnen ist schwer; recyceln: afiyet olsun, çok lezzetli, yedim/içtim",
  },

  // ================================================================
  // B1 (Kurs: tr-b1-selbststaendig) – Units 1–5
  // ================================================================
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Pläne & Zukunft",
    unitDescription: "Über morgen, nächste Woche und große Pläne sprechen.",
    title: "Meine Pläne fürs Wochenende",
    topic:
      "Futur -acak/-ecek einführen: yapacağım, gideceğim, buluşacağız; yarın, gelecek hafta, planım var; Pläne erzählen und erfragen: 'Hafta sonu ne yapacaksın?'; recyceln: hafta sonu, sinemaya gittim (Kontrast Vergangenheit/Zukunft)",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Pläne & Zukunft",
    unitDescription: "Über morgen, nächste Woche und große Pläne sprechen.",
    title: "Urlaubspläne",
    topic:
      "Reisepläne: tatil, plaj, deniz, rezervasyon yapacağım, uçak, otel; Futur vertiefen mit Fragen 'Nereye gideceksin? Ne zaman döneceksin?'; recyceln: otel-Vokabular aus A2, bilet, ne zaman",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Pläne & Zukunft",
    unitDescription: "Über morgen, nächste Woche und große Pläne sprechen.",
    title: "Verabredungen verschieben",
    topic:
      "Termine ändern: ertelemek, uygun (passend), 'Yarın uygun musun?', 'Toplantıyı erteleyebilir miyiz?' – -ebilmek (können/dürfen) einführen; recyceln: saat kaçta, toplantı, maalesef",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Meinungen & Diskussionen",
    unitDescription: "Meinung äußern, begründen, höflich widersprechen.",
    title: "Ich bin anderer Meinung",
    topic:
      "Meinung: bence, sence, katılıyorum, katılmıyorum, haklısın, çünkü; höflich widersprechen: 'Haklısın ama …'; recyceln: çünkü, çok güzel/pahalı als Meinungsgegenstände",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Meinungen & Diskussionen",
    unitDescription: "Meinung äußern, begründen, höflich widersprechen.",
    title: "Vergleichen & bewerten",
    topic:
      "Vergleich: daha (mehr/…er), en (am …sten), kadar (so … wie); 'İstanbul Ankara'dan daha büyük'; Ablativ -dan im Vergleich; recyceln: büyük/küçük, ucuz/pahalı, güzel",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Meinungen & Diskussionen",
    unitDescription: "Meinung äußern, begründen, höflich widersprechen.",
    title: "Ratschläge geben",
    topic:
      "Notwendigkeit: -malı/-meli (sollen/müssen): 'Daha çok su içmelisin', 'Erken yatmalısın'; alternativ 'bence … lazım'; recyceln: Arzt-Vokabular aus A2 (ilaç, hasta), her gün",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Arbeit & Karriere",
    unitDescription: "Beruflich souverän: Erfahrung, Fähigkeiten, Telefonate.",
    title: "Über den Job sprechen",
    topic:
      "Gewohnheiten mit Aorist -(a/ı)r aktiv: çalışırım, giderim, genelde, bazen, her zaman; 'Ne iş yaparsın?'; Kontrast Aorist vs. -iyor; recyceln: iş, ofis, yoğun aus A2",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Arbeit & Karriere",
    unitDescription: "Beruflich souverän: Erfahrung, Fähigkeiten, Telefonate.",
    title: "Im Vorstellungsgespräch",
    topic:
      "Fähigkeiten: -ebilirim (ich kann): 'İngilizce konuşabilirim', deneyim (Erfahrung), takım, sorumluluk; 'Neden bu işi istiyorsunuz?'; formelle Sie-Formen durchgehend; recyceln: meslek-Vokabular",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Arbeit & Karriere",
    unitDescription: "Beruflich souverän: Erfahrung, Fähigkeiten, Telefonate.",
    title: "Probleme lösen",
    topic:
      "Probleme: sorun, çözüm, yardım edebilir misiniz, bozuk (kaputt), çalışmıyor; Beschwerden höflich formulieren; 'Bilgisayarım çalışmıyor, ne yapmalıyım?'; recyceln: -malı aus Ratschläge-Lektion",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Erlebnisse erzählen",
    unitDescription: "Vergangenes lebendig erzählen und verknüpfen.",
    title: "Meine letzte Reise",
    topic:
      "Erzählen mit Konnektoren: önce, sonra, daha sonra, sonunda, ve, ama; Vergangenheit vertiefen inkl. Verneinung -medim und Frage -din mi: 'Denize girdin mi?'; recyceln: tatil-Vokabular, gittim/gördüm",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Erlebnisse erzählen",
    unitDescription: "Vergangenes lebendig erzählen und verknüpfen.",
    title: "Als ich klein war",
    topic:
      "Früher: eskiden (früher), çocukken (als Kind) – -ken einführen; 'Eskiden her yaz köye giderdik' – Aorist-Vergangenheit -irdi rezeptiv als Chunk; recyceln: Familie aus A1, oyun oynamak",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Erlebnisse erzählen",
    unitDescription: "Vergangenes lebendig erzählen und verknüpfen.",
    title: "Er hat gesagt, dass …",
    topic:
      "Indirekte Rede light: 'dedi' (er/sie sagte) mit direktem Zitat + 'söyledi' rezeptiv; 'Elif geleceğini söyledi' nur als verstehendes Beispiel; Fokus: Gespräche nacherzählen; recyceln: Futur, Vergangenheit",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Gefühle & Zusammenleben",
    unitDescription: "Gefühle ausdrücken, einladen, Beziehungen pflegen.",
    title: "Wie fühlst du dich?",
    topic:
      "Gefühle: mutlu, üzgün, yorgun, heyecanlı, endişeli; 'Kendimi … hissediyorum'; Gründe mit çünkü; trösten: 'Geçecek, merak etme'; recyceln: nasılsın, çünkü, biraz/çok",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Gefühle & Zusammenleben",
    unitDescription: "Gefühle ausdrücken, einladen, Beziehungen pflegen.",
    title: "Wenn du willst …",
    topic:
      "Konditional -sa/-se: 'İstersen birlikte gideriz', 'Vaktin varsa …'; Vorschläge machen: '-alım mı?' (Wollen wir …?): 'Yarın buluşalım mı?'; recyceln: Einladungs-Vokabular aus A2",
  },
  {
    courseSlug: "tr-b1-selbststaendig",
    level: "B1",
    unit: "Gefühle & Zusammenleben",
    unitDescription: "Gefühle ausdrücken, einladen, Beziehungen pflegen.",
    title: "Höflich Kritik üben",
    topic:
      "Diplomatisch bleiben: bence biraz, keşke (ich wünschte), rica etmek, özür dilerim, sorun değil; Kritik + Kompliment kombinieren; Kulturtipp Höflichkeit/kırmamak; recyceln: Meinungs-Vokabular, -malı",
  },
];
