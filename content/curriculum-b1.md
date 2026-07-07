# Lehrplan: Der Weg zu B1 (Deutsch → Türkisch)

Dieser Plan definiert, welche Units und Lektionen den Lernenden von A2 zu B1 führen.
Handgeschrieben sind A1 (`de-tr-a1.ts`) und A2 (`de-tr-a2.ts`). Die restlichen Lektionen
werden mit dem Generator erzeugt (`npm run generate -- …`) und landen in `content/generated/`.

## Grammatik-Progression (CEFR-orientiert)

| Stufe | Kern-Grammatik |
|---|---|
| A1 ✅ | Kein Artikel/Genus, Possessiv -(i)m/-(i)n, Herkunft -lI, SOV, Lokativ -DA, Zahlen, mI-Frage |
| A2 ✅ | Vergangenheit -DI, Uhrzeit/Zeitangaben, var/yok, Richtung -(y)A, -mAyI sevmek, Imperativ (Arzt) |
| B1 (Rest A2→B1) | Zukunft -(y)AcAK, Aorist -(A/I)r, Möglichkeit -(y)Abil, Notwendigkeit -mAlI / gerekiyor, Konditional -sA, Relativformen -(y)An / -DIK, Vergleich daha/en, indirekte Rede (dedi ki / -DIğInI söyledi) |

## Geplante Units (Kurs-Slug: `tr-b1-selbststaendig`, Level B1)

1. **Pläne & Zukunft** – „Yarın ne yapacaksın?“
   - Lektion: Meine Pläne fürs Wochenende (Futur -acak)
   - Lektion: Urlaubspläne schmieden (Futur + Zeitangaben)
   - Lektion: Verabredungen treffen & verschieben
2. **Meinungen & Diskussionen**
   - Lektion: Ich bin anderer Meinung (bence, katılıyorum/katılmıyorum, çünkü)
   - Lektion: Vergleichen & bewerten (daha, en, kadar)
   - Lektion: Ratschläge geben (-malısın, bence … -meli)
3. **Arbeit & Bildung**
   - Lektion: Über den Job sprechen (Aorist für Gewohnheiten)
   - Lektion: Im Vorstellungsgespräch (-ebilirim: Ich kann …)
   - Lektion: Am Telefon (formelle Wendungen)
4. **Erlebnisse erzählen**
   - Lektion: Meine letzte Reise (Vergangenheit vertiefen + Konnektoren)
   - Lektion: Als ich klein war … (-ken, eskiden)
   - Lektion: Geschichten nacherzählen (indirekte Rede light)
5. **Gefühle & Beziehungen**
   - Lektion: Wie fühlst du dich? (Gefühlsvokabular, çok/biraz)
   - Lektion: Einladen & absagen (Konditional -sa: wenn du willst …)
   - Lektion: Komplimente & Kritik höflich äußern

## Generator-Aufrufe (Beispiele)

```bash
npm run generate -- --course tr-b1-selbststaendig --level B1 \
  --unit "Pläne & Zukunft" --title "Meine Pläne fürs Wochenende" \
  --topic "Futur -acak/-ecek einführen: yapacağım, gideceğim; yarın, gelecek hafta; Pläne erzählen und erfragen"

npm run generate -- --course tr-b1-selbststaendig --level B1 \
  --unit "Meinungen & Diskussionen" --title "Ich bin anderer Meinung" \
  --topic "Meinung äußern und begründen: bence, sence, katılıyorum, katılmıyorum, çünkü; höflich widersprechen"
```

**Hinweis:** Der Kurs `tr-b1-selbststaendig` muss einmal als (ggf. leerer) Kurs in
`content/` angelegt und registriert werden, bevor generierte Lektionen andocken können –
Vorlage: Kopf von `de-tr-a2.ts` mit `units: []`.

## Qualitätssicherung

Jede generierte Lektion wird automatisch validiert (Lösbarkeit aller Übungen, Dialog-Pflicht,
8–12 Übungen – `src/lib/validateLesson.ts`). Sprachliche Endkontrolle: Lektion einmal
durchspielen; bei Fehlern JSON in `content/generated/` einfach löschen und neu generieren.
