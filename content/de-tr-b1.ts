import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs Deutsch → Türkisch, Level B1 (Premium).
 * Baut auf A1/A2 auf und recycelt deren Wortschatz. Neue Grammatik u. a.:
 * Futur -acak/-ecek, Können -ebilmek, Aorist, Notwendigkeit -malı,
 * Vergleich (daha/en), Konditional -sa/-se. Handgeschrieben (SeedCourse).
 */
export const courseDeTrB1: SeedCourse = {
  slug: "tr-b1-selbststaendig",
  title: "Türkisch B1 – Selbstständig sprechen",
  description:
    "Zukunftspläne, Meinungen, Beruf und Erlebnisse – frei formulieren statt Sätze bauen.",
  level: "B1",
  sourceLang: "de",
  targetLang: "tr",
  isPremium: true,
  units: [
    // ================================================================
    // UNIT 1: Pläne & Zukunft – Futur -acak/-ecek
    // ================================================================
    {
      title: "Pläne & Zukunft",
      description: "Über morgen, nächste Woche und große Pläne sprechen – mit der Zukunftsform.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u1-l1",
          title: "Meine Pläne fürs Wochenende",
          intro:
            "Deine Freundin fragt nach deinen Wochenendplänen: Lerne die Zukunftsform, um Pläne zu erzählen.",
          grammarTip:
            "Die Zukunft bildet die Endung -acak/-ecek (Vokalharmonie): yapmak → yapacağım (ich werde machen), gitmek → gideceğim (ich werde gehen). Vor der Ich-Endung wird k weich zu ğ. Frage: „Ne yapacaksın?“ = Was wirst du machen?",
          vocab: [
            { source: "morgen", target: "yarın", exampleSource: "Morgen werde ich ins Kino gehen.", exampleTarget: "Yarın sinemaya gideceğim." },
            { source: "nächste Woche", target: "gelecek hafta" },
            { source: "der Plan", target: "plan", exampleSource: "Was hast du am Wochenende vor?", exampleTarget: "Hafta sonu planın ne?" },
            { source: "ich werde machen", target: "yapacağım" },
            { source: "ich werde gehen", target: "gideceğim" },
            { source: "wir werden uns treffen", target: "buluşacağız" },
            { source: "ich werde sehen", target: "göreceğim" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Hafta sonu ne yapacaksın?“",
                audioText: "Hafta sonu ne yapacaksın?",
                options: ["Was wirst du am Wochenende machen?", "Was hast du am Wochenende gemacht?", "Was machst du gerade?", "Wo warst du am Wochenende?"],
                correctIndex: 0,
                explanation: "„yapacaksın“ = du wirst machen (Zukunft). „hafta sonu“ (Wochenende) kennst du aus A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Zukunfts-Wörter zu.",
                pairs: [
                  { source: "morgen", target: "yarın" },
                  { source: "nächste Woche", target: "gelecek hafta" },
                  { source: "wir werden uns treffen", target: "buluşacağız" },
                  { source: "ich werde sehen", target: "göreceğim" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Yarın sinemaya ___.",
                options: ["gideceğim", "gittim", "gidiyorum"],
                solution: "gideceğim",
                translation: "Morgen werde ich ins Kino gehen.",
                explanation: "„yarın“ (morgen) verlangt Zukunft: gideceğim. „gittim“ wäre Vergangenheit, „gidiyorum“ Gegenwart.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Nächste Woche werde ich meine Familie sehen.“",
                tokens: ["Gelecek hafta", "ailemi", "göreceğim."],
                solution: "Gelecek hafta ailemi göreceğim.",
                translation: "Nächste Woche werde ich meine Familie sehen.",
                explanation: "„aile“ (Familie, aus A1) + Akkusativ -mi = ailemi; „göreceğim“ = ich werde sehen.",
                audioText: "Gelecek hafta ailemi göreceğim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Was wirst du am Wochenende machen?",
                solution: "Hafta sonu ne yapacaksın",
                altSolutions: ["Hafta sonu ne yapacaksın?", "Sen hafta sonu ne yapacaksın?", "Hafta sonu ne yapacaksın ?"],
                hint: "Wochenende + was + du-wirst-machen",
                explanation: "Die Standard-Smalltalk-Frage im B1: „Hafta sonu ne yapacaksın?“",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Yarın arkadaşımla buluşacağız, birlikte yemek yiyeceğiz.",
                question: "Was passiert morgen?",
                options: ["Treffen mit einem Freund", "Ein Arztbesuch", "Eine Reise ans Meer"],
                correctIndex: 0,
                explanation: "„arkadaşımla buluşacağız“ = wir treffen uns mit meinem Freund; „yiyeceğiz“ = wir werden essen.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hafta sonu sinemaya gideceğim, sonra arkadaşımla buluşacağız.",
                translation: "Am Wochenende werde ich ins Kino gehen, danach treffe ich mich mit meinem Freund.",
                tip: "Zukunft mit -acak/-ecek: gi-de-ce-ğim. Das ğ wird kaum gesprochen, es dehnt nur den Vokal.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Wochenendpläne",
                scene: "Deine Freundin Elif fragt, was du am Wochenende vorhast.",
                turns: [
                  { speaker: "Elif", text: "Hafta sonu ne yapacaksın?", translation: "Was wirst du am Wochenende machen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Sinemaya gideceğim.", correct: true, feedback: "Perfekt – Zukunft richtig gebildet: „Ich werde ins Kino gehen.“" },
                      { text: "Sinemaya gittim.", correct: false, feedback: "Das ist Vergangenheit („ich ging“). Elif fragt nach dem kommenden Wochenende: gideceğim." },
                      { text: "Sinema nerede?", correct: false, feedback: "„Wo ist das Kino?“ passt nicht – erzähl von deinem Plan mit der Zukunftsform." },
                    ],
                  },
                  { speaker: "Elif", text: "Güzel! Ben de yarın arkadaşımla buluşacağım.", translation: "Schön! Ich treffe mich morgen mit meiner Freundin." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Nerede buluşacaksınız?", correct: true, feedback: "Stark! „Wo werdet ihr euch treffen?“ – du führst das Gespräch weiter." },
                      { text: "Hoşça kal!", correct: false, feedback: "So früh verabschieden? Frag lieber nach den Details." },
                    ],
                  },
                  { speaker: "Elif", text: "Kadıköy'de. Sen de gelmek ister misin?", translation: "In Kadıköy. Möchtest du auch mitkommen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, memnuniyetle! Saat kaçta?", correct: true, feedback: "Perfekt – Zusage plus Uhrzeit-Frage (saat kaçta aus A2)." },
                      { text: "Hayır, hesap lütfen.", correct: false, feedback: "„Die Rechnung, bitte“ gehört ins Café – hier passt eine Zu- oder Absage." },
                    ],
                  },
                  { speaker: "Elif", text: "Saat ikide. O zaman cumartesi görüşürüz!", translation: "Um zwei. Dann sehen wir uns am Samstag!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u1-l2",
          title: "Urlaubspläne",
          intro:
            "Du planst einen Urlaub am Meer: Erzähle, wohin du fährst und wann du zurückkommst.",
          grammarTip:
            "Die Zukunft eignet sich perfekt für Reisepläne. Frage nach Ziel und Zeit: „Nereye gideceksin?“ (Wohin wirst du fahren?), „Ne zaman döneceksin?“ (Wann wirst du zurückkommen?). Recyceln: Hotel/Ticket-Wörter aus A2.",
          vocab: [
            { source: "der Urlaub", target: "tatil", exampleSource: "Im Urlaub werde ich ans Meer fahren.", exampleTarget: "Tatilde denize gideceğim." },
            { source: "der Strand", target: "plaj" },
            { source: "das Meer", target: "deniz" },
            { source: "das Flugzeug", target: "uçak" },
            { source: "ich werde reservieren", target: "rezervasyon yapacağım" },
            { source: "ich werde zurückkommen", target: "döneceğim" },
            { source: "ich werde schwimmen", target: "yüzeceğim" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Tatilde denize gideceğim“?",
                audioText: "Tatilde denize gideceğim.",
                options: ["Im Urlaub werde ich ans Meer fahren.", "Im Urlaub bin ich ans Meer gefahren.", "Ich möchte ans Meer.", "Wo ist das Meer?"],
                correctIndex: 0,
                explanation: "„tatil“ = Urlaub, „deniz“ = Meer, „gideceğim“ = ich werde fahren (Zukunft).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Reise-Wörter zu.",
                pairs: [
                  { source: "der Strand", target: "plaj" },
                  { source: "das Meer", target: "deniz" },
                  { source: "das Flugzeug", target: "uçak" },
                  { source: "ich werde schwimmen", target: "yüzeceğim" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Otel için yarın ___.",
                options: ["rezervasyon yapacağım", "rezervasyon yaptım", "rezervasyon var"],
                solution: "rezervasyon yapacağım",
                translation: "Für das Hotel werde ich morgen reservieren.",
                explanation: "„yarın“ (morgen) verlangt Zukunft. „otel“ und „rezervasyon“ kennst du aus A2.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Wann wirst du zurückkommen?“",
                tokens: ["Ne zaman", "döneceksin?"],
                solution: "Ne zaman döneceksin?",
                translation: "Wann wirst du zurückkommen?",
                explanation: "„ne zaman“ (wann, aus A2) + „döneceksin“ (du wirst zurückkommen).",
                audioText: "Ne zaman döneceksin?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich werde ans Meer fahren und schwimmen.",
                solution: "Denize gideceğim ve yüzeceğim",
                altSolutions: ["Denize gideceğim ve yüzeceğim.", "Denize gidip yüzeceğim", "Deniz'e gideceğim ve yüzeceğim"],
                hint: "ans-Meer + ich-werde-fahren + und + ich-werde-schwimmen",
                explanation: "Zwei Zukunftsverben mit „ve“ (und) verbunden: gideceğim ve yüzeceğim.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Gelecek hafta uçakla Antalya'ya gideceğiz, bir hafta kalacağız.",
                question: "Womit reist die Person nach Antalya?",
                options: ["mit dem Flugzeug", "mit dem Bus", "mit dem Zug"],
                correctIndex: 0,
                explanation: "„uçakla“ = mit dem Flugzeug, „kalacağız“ = wir werden bleiben. „gelecek hafta“ recycelt Lektion 1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Wörter aus Lektion 1 & A2.",
                pairs: [
                  { source: "morgen", target: "yarın" },
                  { source: "nächste Woche", target: "gelecek hafta" },
                  { source: "ich werde gehen", target: "gideceğim" },
                  { source: "das Ticket", target: "bilet" },
                  { source: "das Hotel", target: "otel" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Yarın plan yapacağım. Gelecek hafta arkadaşımı göreceğim ve onunla buluşacağız; birlikte sinemaya gideceğiz.",
                translation: "Morgen werde ich planen. Nächste Woche werde ich meinen Freund sehen und wir treffen uns; zusammen gehen wir ins Kino.",
                tip: "🔁 Wiederholung: Zukunft aus Lektion 1 – „yarın“, „plan“, „gelecek hafta“, „göreceğim“, „buluşacağız“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Sommerpläne",
                scene: "Dein Freund Murat fragt nach deinen Urlaubsplänen.",
                turns: [
                  { speaker: "Murat", text: "Bu yaz tatilde nereye gideceksin?", translation: "Wohin wirst du diesen Sommer im Urlaub fahren?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Antalya'ya gideceğim, denizde yüzeceğim.", correct: true, feedback: "Perfekt – Ziel und Plan in der Zukunftsform!" },
                      { text: "Antalya'ya gittim.", correct: false, feedback: "Das ist Vergangenheit – Murat fragt nach dem kommenden Sommer: gideceğim." },
                      { text: "Antalya çok uzak.", correct: false, feedback: "„Antalya ist weit“ beantwortet die Frage nicht – sag, was du dort vorhast." },
                    ],
                  },
                  { speaker: "Murat", text: "Harika! Ne zaman döneceksin?", translation: "Toll! Wann wirst du zurückkommen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Gelecek hafta döneceğim.", correct: true, feedback: "Stark! „gelecek hafta“ + Zukunft – genau richtig." },
                      { text: "Dün döndüm.", correct: false, feedback: "„Gestern bin ich zurückgekommen“ passt nicht – du fährst doch erst noch." },
                    ],
                  },
                  { speaker: "Murat", text: "Otel buldun mu?", translation: "Hast du ein Hotel gefunden?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Henüz değil, yarın rezervasyon yapacağım.", correct: true, feedback: "Perfekt – „henüz değil“ (noch nicht) plus Zukunftsplan." },
                      { text: "Evet, çok lezzetli.", correct: false, feedback: "„Sehr lecker“ passt zum Essen, nicht zum Hotel – antworte zur Reservierung." },
                    ],
                  },
                  { speaker: "Murat", text: "İyi tatiller o zaman!", translation: "Dann schönen Urlaub!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u1-l3",
          title: "Verabredungen verschieben",
          intro:
            "Ein Termin passt dir nicht: Lerne höflich zu fragen, ob man verschieben kann.",
          grammarTip:
            "„Können/dürfen“ bildet -ebilmek/-abilmek: gelmek → gelebilirim (ich kann kommen), ertelemek → erteleyebilir miyiz? (können wir verschieben?). Die Frage entsteht mit „mi“ nach der -ebilir-Form.",
          vocab: [
            { source: "verschieben", target: "ertelemek", exampleSource: "Können wir das Meeting verschieben?", exampleTarget: "Toplantıyı erteleyebilir miyiz?" },
            { source: "passend / gelegen", target: "uygun" },
            { source: "verfügbar / frei (Zeit)", target: "müsait" },
            { source: "können wir verschieben?", target: "erteleyebilir miyiz?" },
            { source: "ich kann kommen", target: "gelebilirim" },
            { source: "ein anderer Tag", target: "başka bir gün" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Toplantıyı erteleyebilir miyiz?“",
                audioText: "Toplantıyı erteleyebilir miyiz?",
                options: ["Können wir das Meeting verschieben?", "Wann ist das Meeting?", "Das Meeting ist abgesagt.", "Ich komme zum Meeting."],
                correctIndex: 0,
                explanation: "„ertelemek“ = verschieben → „erteleyebilir miyiz?“ = können wir verschieben? „toplantı“ (Meeting) recycelt A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Wörter zu.",
                pairs: [
                  { source: "passend / gelegen", target: "uygun" },
                  { source: "verfügbar / frei", target: "müsait" },
                  { source: "ich kann kommen", target: "gelebilirim" },
                  { source: "ein anderer Tag", target: "başka bir gün" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Yarın müsait değilim, ___ buluşabilir miyiz?",
                options: ["başka bir gün", "her gün", "bugün"],
                solution: "başka bir gün",
                translation: "Morgen habe ich keine Zeit, können wir uns an einem anderen Tag treffen?",
                explanation: "„başka bir gün“ = ein anderer Tag; „buluşabilir miyiz?“ = können wir uns treffen?",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Bist du morgen frei?“",
                tokens: ["Yarın", "müsait", "misin?"],
                solution: "Yarın müsait misin?",
                translation: "Bist du morgen frei?",
                explanation: "„müsait“ (frei/verfügbar) + Fragepartikel „misin?“ = bist du?",
                audioText: "Yarın müsait misin?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Leider kann ich morgen nicht kommen.",
                solution: "Maalesef yarın gelemem",
                altSolutions: ["Maalesef yarın gelemem.", "Yarın maalesef gelemem", "Maalesef yarın gelemeyeceğim"],
                hint: "leider + morgen + ich-kann-nicht-kommen",
                explanation: "„gelemem“ = ich kann nicht kommen (Verneinung von gelebilirim); „maalesef“ recycelt A2.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Maalesef yarın müsait değilim. Toplantıyı erteleyebilir miyiz?",
                translation: "Leider habe ich morgen keine Zeit. Können wir das Meeting verschieben?",
                tip: "„erteleyebilir miyiz“ klingt lang – sprich es in Silben: er-te-le-ye-bi-lir mi-yiz.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Zukunft & Arbeit (Lektion 1–2 & A2).",
                pairs: [
                  { source: "wir werden uns treffen", target: "buluşacağız" },
                  { source: "ich werde zurückkommen", target: "döneceğim" },
                  { source: "das Meeting", target: "toplantı" },
                  { source: "leider", target: "maalesef" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Tatilde uçakla denize gideceğim, plajda yüzeceğim. Otel için rezervasyon yapacağım ve gelecek hafta döneceğim. Yarın plan yapacağım, arkadaşımı göreceğim, buluşacağız.",
                translation: "Im Urlaub werde ich mit dem Flugzeug ans Meer fahren, am Strand schwimmen. Fürs Hotel werde ich reservieren und nächste Woche zurückkommen. Morgen werde ich planen, meinen Freund sehen, wir treffen uns.",
                tip: "🔁 Wiederholung: Reise (Lektion 2) + Pläne (Lektion 1) – „tatil“, „uçak“, „deniz“, „plaj“, „yüzeceğim“, „rezervasyon yapacağım“, „döneceğim“, „yarın“, „plan“, „göreceğim“, „buluşacağız“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Ein Termin passt nicht",
                scene: "Deine Kollegin Zeynep will ein Meeting mit dir festlegen.",
                turns: [
                  { speaker: "Zeynep", text: "Yarınki toplantı için uygun musun?", translation: "Passt dir das Meeting morgen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Maalesef yarın müsait değilim. Erteleyebilir miyiz?", correct: true, feedback: "Perfekt – höfliche Absage plus Bitte um Verschiebung." },
                      { text: "Evet, çok lezzetli.", correct: false, feedback: "„Sehr lecker“ passt nicht zum Termin – sag, ob dir morgen passt." },
                      { text: "Toplantı nerede?", correct: false, feedback: "Nach dem Ort zu fragen weicht aus – sag lieber, ob der Termin passt." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Tabii, sorun değil. Başka bir gün ne zaman uygun?", translation: "Klar, kein Problem. Wann passt dir ein anderer Tag?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Perşembe müsaitim, perşembe buluşabilir miyiz?", correct: true, feedback: "Stark! Konkreter Gegenvorschlag mit -ebilmek." },
                      { text: "Güle güle!", correct: false, feedback: "„Tschüss“ beendet das Gespräch zu früh – schlag einen neuen Tag vor." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Perşembe benim için de uygun. O zaman perşembe görüşürüz!", translation: "Donnerstag passt mir auch. Dann sehen wir uns am Donnerstag!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 2: Meinungen & Diskussionen – Meinung, Vergleich, Rat
    // ================================================================
    {
      title: "Meinungen & Diskussionen",
      description: "Die eigene Meinung äußern, vergleichen und bewerten, höflich widersprechen und Rat geben.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u2-l1",
          title: "Ich bin anderer Meinung",
          intro:
            "Im Gespräch über Filme und Städte: Sag deine Meinung, stimme zu oder widersprich höflich.",
          grammarTip:
            "„bence“ = meiner Meinung nach, „sence“ = deiner Meinung nach. Zustimmen: „katılıyorum“ (ich stimme zu), widersprechen: „katılmıyorum“. Höflich bleiben: „Haklısın, ama bence …“ (Du hast recht, aber meiner Meinung nach …). Begründen mit „çünkü“ (aus A2).",
          vocab: [
            { source: "meiner Meinung nach", target: "bence", exampleSource: "Meiner Meinung nach ist dieser Film schön.", exampleTarget: "Bence bu film güzel." },
            { source: "deiner Meinung nach", target: "sence" },
            { source: "ich stimme zu", target: "katılıyorum" },
            { source: "ich stimme nicht zu", target: "katılmıyorum" },
            { source: "du hast recht", target: "haklısın" },
            { source: "die Meinung / die Idee", target: "fikir" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bence bu film çok güzel“?",
                audioText: "Bence bu film çok güzel.",
                options: ["Meiner Meinung nach ist dieser Film sehr schön.", "Dieser Film ist zu lang.", "Ich mag diesen Film nicht.", "Welcher Film ist das?"],
                correctIndex: 0,
                explanation: "„bence“ = meiner Meinung nach; „çok güzel“ (sehr schön) kennst du aus A1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Meinungs-Wörter zu.",
                pairs: [
                  { source: "meiner Meinung nach", target: "bence" },
                  { source: "ich stimme zu", target: "katılıyorum" },
                  { source: "ich stimme nicht zu", target: "katılmıyorum" },
                  { source: "du hast recht", target: "haklısın" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Haklısın, ___ bence film biraz uzun.",
                options: ["ama", "çünkü", "ve"],
                solution: "ama",
                translation: "Du hast recht, aber meiner Meinung nach ist der Film ein bisschen lang.",
                explanation: "„ama“ (aber) leitet den höflichen Widerspruch ein; danach kommt deine Meinung mit „bence“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du höflich, dass du anderer Meinung bist?",
                options: ["Katılmıyorum, çünkü …", "Haklısın!", "Bence de.", "Çok güzel."],
                correctIndex: 0,
                explanation: "„katılmıyorum, çünkü …“ = ich stimme nicht zu, weil … So widersprichst du mit Begründung.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Meiner Meinung nach ist Türkisch nicht schwer.“",
                tokens: ["Bence", "Türkçe", "zor", "değil."],
                solution: "Bence Türkçe zor değil.",
                translation: "Meiner Meinung nach ist Türkisch nicht schwer.",
                explanation: "„bence“ am Anfang, „değil“ (nicht) verneint das Adjektiv „zor“ (schwer).",
                audioText: "Bence Türkçe zor değil.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich stimme zu, du hast recht.",
                solution: "Katılıyorum, haklısın",
                altSolutions: ["Katılıyorum, haklısın.", "Sana katılıyorum, haklısın", "Katılıyorum haklısın"],
                hint: "ich-stimme-zu + du-hast-recht",
                explanation: "„katılıyorum“ + „haklısın“ – so bestätigst du das Gegenüber.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bence İstanbul çok güzel ama biraz pahalı.",
                question: "Was ist die Meinung der Person über Istanbul?",
                options: ["schön, aber teuer", "hässlich und billig", "klein und ruhig"],
                correctIndex: 0,
                explanation: "„güzel ama pahalı“ = schön, aber teuer. „pahalı“ (teuer) recycelt A1.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Yarın müsait değilim, toplantıyı erteleyebilir miyiz? Cuma uygun, o zaman gelebilirim. Tatilde denize gideceğim, plajda yüzeceğim.",
                translation: "Morgen habe ich keine Zeit, können wir das Meeting verschieben? Freitag passt, dann kann ich kommen. Im Urlaub werde ich ans Meer fahren, am Strand schwimmen.",
                tip: "🔁 Wiederholung: Termine (Lektion 3) + Reise (Lektion 2) – „müsait“, „erteleyebilir“, „uygun“, „gelebilirim“, „tatil“, „deniz“, „plaj“, „yüzeceğim“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Diskussion über einen Film",
                scene: "Deine Freundin Selin redet mit dir über einen Film.",
                turns: [
                  { speaker: "Selin", text: "Bence bu film çok güzeldi. Sence?", translation: "Meiner Meinung nach war dieser Film sehr schön. Und deiner?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Katılıyorum, ben de çok beğendim.", correct: true, feedback: "Perfekt – Zustimmung plus eigene Begründung." },
                      { text: "Bilmiyorum, üzgünüm.", correct: false, feedback: "Du hast den Film doch gesehen – sag deine Meinung mit „bence“." },
                      { text: "Hesap, lütfen.", correct: false, feedback: "„Die Rechnung, bitte“ passt nicht in eine Filmdiskussion." },
                    ],
                  },
                  { speaker: "Selin", text: "Ama sonu biraz üzücüydü, değil mi?", translation: "Aber das Ende war etwas traurig, oder?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Haklısın, ama bence son çok güzeldi.", correct: true, feedback: "Stark! Höflich widersprochen: erst zustimmen, dann die eigene Meinung." },
                      { text: "Katılmıyorum, film yok.", correct: false, feedback: "„Es gibt keinen Film“ ergibt keinen Sinn – widersprich mit einer echten Meinung." },
                    ],
                  },
                  { speaker: "Selin", text: "Belki de haklısın. Herkesin fikri farklı!", translation: "Vielleicht hast du recht. Jeder hat eine andere Meinung!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u2-l2",
          title: "Vergleichen & bewerten",
          intro:
            "Zwei Städte, zwei Cafés: Lerne zu vergleichen – größer, schöner, am besten.",
          grammarTip:
            "Vergleich mit „daha“ (mehr/-er): „daha büyük“ = größer. Der Vergleichspartner bekommt den Ablativ -dan/-den: „İstanbul Ankara'dan daha büyük“ = Istanbul ist größer als Ankara. Superlativ mit „en“: „en güzel“ = am schönsten. Recyceln: büyük/küçük, ucuz/pahalı, güzel.",
          vocab: [
            { source: "mehr / -er (Vergleich)", target: "daha", exampleSource: "Istanbul ist größer als Ankara.", exampleTarget: "İstanbul Ankara'dan daha büyük." },
            { source: "am … sten", target: "en", exampleSource: "Das ist das schönste Café.", exampleTarget: "Bu en güzel kafe." },
            { source: "so … wie", target: "kadar" },
            { source: "größer", target: "daha büyük" },
            { source: "billiger", target: "daha ucuz" },
            { source: "am schönsten", target: "en güzel" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „İstanbul Ankara'dan daha büyük“?",
                audioText: "İstanbul Ankara'dan daha büyük.",
                options: ["Istanbul ist größer als Ankara.", "Istanbul ist so groß wie Ankara.", "Ankara ist größer als Istanbul.", "Istanbul liegt bei Ankara."],
                correctIndex: 0,
                explanation: "„Ankara'dan“ (als Ankara, Ablativ) + „daha büyük“ (größer). Der Vergleichspartner bekommt -dan.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Vergleichs-Wörter zu.",
                pairs: [
                  { source: "mehr / -er", target: "daha" },
                  { source: "am … sten", target: "en" },
                  { source: "größer", target: "daha büyük" },
                  { source: "am schönsten", target: "en güzel" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu kafe diğerinden daha ___.",
                options: ["ucuz", "en", "kadar"],
                solution: "ucuz",
                translation: "Dieses Café ist billiger als das andere.",
                explanation: "„diğerinden“ (als das andere) + „daha ucuz“ (billiger). „ucuz“ (billig) recycelt A1.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Das ist das schönste Café.“",
                tokens: ["Bu", "en", "güzel", "kafe."],
                solution: "Bu en güzel kafe.",
                translation: "Das ist das schönste Café.",
                explanation: "Superlativ: „en“ + Adjektiv + Nomen. „en güzel kafe“ = das schönste Café.",
                audioText: "Bu en güzel kafe.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Der Tee ist billiger als der Kaffee.",
                solution: "Çay kahveden daha ucuz",
                altSolutions: ["Çay kahveden daha ucuz.", "Çay, kahveden daha ucuz", "Çay kahveden daha ucuzdur"],
                hint: "Tee + als-Kaffee + billiger",
                explanation: "„kahveden“ (als Kaffee, Ablativ) + „daha ucuz“. „çay“ und „kahve“ sind A1.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bence en güzel mevsim ilkbahar, çünkü hava çok güzel.",
                question: "Welche Jahreszeit findet die Person am schönsten?",
                options: ["den Frühling", "den Sommer", "den Winter"],
                correctIndex: 0,
                explanation: "„en güzel mevsim“ = die schönste Jahreszeit, „ilkbahar“ = Frühling. „bence“ und „çünkü“ recyceln B1/A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Meinung & Adjektive (Lektion 4 & A1).",
                pairs: [
                  { source: "meiner Meinung nach", target: "bence" },
                  { source: "ich stimme zu", target: "katılıyorum" },
                  { source: "teuer", target: "pahalı" },
                  { source: "groß", target: "büyük" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bence bu fikir güzel. Sence? Ben katılıyorum, haklısın; ama bazen katılmıyorum. Yarın müsaitsen toplantıyı erteleyebilir miyiz?",
                translation: "Meiner Meinung nach ist diese Idee gut. Und deiner? Ich stimme zu, du hast recht; aber manchmal stimme ich nicht zu. Wenn du morgen Zeit hast, können wir das Meeting verschieben?",
                tip: "🔁 Wiederholung: Meinung (Lektion 4) + Termine (Lektion 3) – „bence“, „fikir“, „sence“, „katılıyorum“, „haklısın“, „katılmıyorum“, „müsait“, „erteleyebilir“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Welches Café ist besser?",
                scene: "Du und Deniz sucht ein Café aus.",
                turns: [
                  { speaker: "Deniz", text: "Sence hangi kafe daha iyi?", translation: "Welches Café ist deiner Meinung nach besser?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bence bu kafe daha güzel ama diğeri daha ucuz.", correct: true, feedback: "Perfekt – zwei Vergleiche mit „daha“, plus deine Meinung." },
                      { text: "Kafe gittim.", correct: false, feedback: "„Ich ging Café“ ist grammatisch falsch und Vergangenheit – vergleiche die Cafés mit „daha“." },
                      { text: "Kafe yok.", correct: false, feedback: "„Es gibt kein Café“ stimmt nicht – ihr steht ja vor zweien. Vergleiche sie." },
                    ],
                  },
                  { speaker: "Deniz", text: "Doğru. Peki en iyi kahve nerede?", translation: "Stimmt. Und wo gibt es den besten Kaffee?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bence buranın kahvesi en güzel.", correct: true, feedback: "Stark! Superlativ „en güzel“ richtig eingesetzt." },
                      { text: "Kahve pahalı değil güzel.", correct: false, feedback: "Der Satz ist unklar – nutz „en güzel“ für den besten Kaffee." },
                    ],
                  },
                  { speaker: "Deniz", text: "O zaman burada kalalım!", translation: "Dann lass uns hier bleiben!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u2-l3",
          title: "Ratschläge geben",
          intro:
            "Ein Freund fühlt sich nicht wohl: Gib ihm Rat mit „du solltest …“.",
          grammarTip:
            "Rat und Notwendigkeit bildet -malı/-meli: içmek → içmelisin (du solltest trinken), yatmak → yatmalısın (du solltest schlafen). Für „ich muss“: yapmalıyım. Alternativ: „bence … lazım“ (… ist nötig). Recyceln: Arzt-Wörter aus A2 (ilaç, hasta), her gün.",
          vocab: [
            { source: "du solltest trinken", target: "içmelisin", exampleSource: "Du solltest mehr Wasser trinken.", exampleTarget: "Daha çok su içmelisin." },
            { source: "du solltest schlafen", target: "yatmalısın" },
            { source: "sich ausruhen", target: "dinlenmek" },
            { source: "nötig / man braucht", target: "lazım" },
            { source: "früh", target: "erken" },
            { source: "aufpassen / achtgeben", target: "dikkat etmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Daha çok su içmelisin“?",
                audioText: "Daha çok su içmelisin.",
                options: ["Du solltest mehr Wasser trinken.", "Ich trinke viel Wasser.", "Willst du Wasser?", "Es gibt kein Wasser."],
                correctIndex: 0,
                explanation: "„içmelisin“ = du solltest trinken (-meli + Endung). „daha çok“ = mehr, „su“ = Wasser (A1).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Rat-Wörter zu.",
                pairs: [
                  { source: "du solltest schlafen", target: "yatmalısın" },
                  { source: "sich ausruhen", target: "dinlenmek" },
                  { source: "nötig / man braucht", target: "lazım" },
                  { source: "früh", target: "erken" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Hastasın, bu ___ günde üç kere almalısın.",
                options: ["ilacı", "erken", "lazım"],
                solution: "ilacı",
                translation: "Du bist krank, dieses Medikament solltest du dreimal am Tag nehmen.",
                explanation: "„ilaç“ (Medikament, Akkusativ ilacı) + „almalısın“ (du solltest nehmen). „hasta“ und „ilaç“ recyceln A2.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Du solltest früh schlafen gehen.“",
                tokens: ["Erken", "yatmalısın."],
                solution: "Erken yatmalısın.",
                translation: "Du solltest früh schlafen gehen.",
                explanation: "„erken“ (früh) + „yatmalısın“ (du solltest schlafen) – ein klassischer Rat.",
                audioText: "Erken yatmalısın.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Du solltest dich ausruhen.",
                solution: "Dinlenmelisin",
                altSolutions: ["Dinlenmelisin.", "Biraz dinlenmelisin", "Sen dinlenmelisin"],
                hint: "sich-ausruhen + du-solltest",
                explanation: "„dinlenmek“ → „dinlenmelisin“ (du solltest dich ausruhen).",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hastasın, dinlenmelisin ve daha çok su içmelisin.",
                translation: "Du bist krank, du solltest dich ausruhen und mehr Wasser trinken.",
                tip: "-meli-sin am Wortende: din-len-me-li-sin. Betone die vorletzte Silbe leicht.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Vergleich & Meinung (Lektion 4–5).",
                pairs: [
                  { source: "größer", target: "daha büyük" },
                  { source: "am schönsten", target: "en güzel" },
                  { source: "du hast recht", target: "haklısın" },
                  { source: "meiner Meinung nach", target: "bence" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İstanbul Ankara'dan daha büyük. Bu kafe diğerinden daha ucuz ama en güzel kahve burada. Bence haklısın, katılıyorum.",
                translation: "Istanbul ist größer als Ankara. Dieses Café ist billiger als das andere, aber den schönsten Kaffee gibt es hier. Meiner Meinung nach hast du recht, ich stimme zu.",
                tip: "🔁 Wiederholung: Vergleich (Lektion 5) + Meinung (Lektion 4) – „daha büyük“, „daha ucuz“, „en güzel“, „bence“, „haklısın“, „katılıyorum“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Guter Rat für einen Freund",
                scene: "Dein Freund Emre ist müde und erkältet.",
                turns: [
                  { speaker: "Emre", text: "Çok hastayım, başım da ağrıyor.", translation: "Ich bin sehr krank, mein Kopf tut auch weh." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "O zaman dinlenmelisin ve erken yatmalısın.", correct: true, feedback: "Perfekt – zwei Ratschläge mit -malı/-meli." },
                      { text: "Bence en güzel kafe bu.", correct: false, feedback: "Ein Café-Vergleich hilft dem kranken Freund nicht – gib ihm einen Rat." },
                      { text: "Dün sinemaya gittim.", correct: false, feedback: "Erzähl nicht von gestern – rate deinem Freund, was er tun sollte." },
                    ],
                  },
                  { speaker: "Emre", text: "Haklısın. Başka ne yapmalıyım?", translation: "Du hast recht. Was sollte ich noch tun?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Daha çok su içmelisin, çünkü bu iyi gelir.", correct: true, feedback: "Stark! Rat plus Begründung mit „çünkü“." },
                      { text: "Su yok, güle güle.", correct: false, feedback: "„Es gibt kein Wasser, tschüss“ ist kein guter Rat – bleib beim Thema Gesundheit." },
                    ],
                  },
                  { speaker: "Emre", text: "Teşekkürler, çok iyi bir arkadaşsın!", translation: "Danke, du bist ein sehr guter Freund!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 3: Arbeit & Karriere – Aorist, Können -ebilir, Probleme
    // ================================================================
    {
      title: "Arbeit & Karriere",
      description: "Über Gewohnheiten im Job sprechen, Fähigkeiten nennen und Probleme lösen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u3-l1",
          title: "Über den Job sprechen",
          intro:
            "Ein Kollege fragt nach deinem Arbeitsalltag: Erzähle von Gewohnheiten mit der Aorist-Form.",
          grammarTip:
            "Für Gewohnheiten (was man regelmäßig tut) nutzt Türkisch den Aorist -r/-ır: çalışmak → çalışırım (ich arbeite/üblicherweise), gitmek → giderim. Kontrast: „Şu an çalışıyorum“ (ich arbeite gerade) vs. „Genelde evde çalışırım“ (normalerweise arbeite ich zu Hause). Recyceln: iş, ofis, yoğun aus A2.",
          vocab: [
            { source: "ich arbeite (üblicherweise)", target: "çalışırım", exampleSource: "Normalerweise arbeite ich um neun.", exampleTarget: "Genelde saat dokuzda çalışırım." },
            { source: "ich gehe (üblicherweise)", target: "giderim" },
            { source: "meistens / normalerweise", target: "genelde" },
            { source: "manchmal", target: "bazen" },
            { source: "immer", target: "her zaman" },
            { source: "Was arbeitest du?", target: "Ne iş yaparsın?" },
            { source: "der Beruf", target: "meslek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Genelde ofiste çalışırım“?",
                audioText: "Genelde ofiste çalışırım.",
                options: ["Normalerweise arbeite ich im Büro.", "Ich arbeite gerade im Büro.", "Ich habe im Büro gearbeitet.", "Wo ist das Büro?"],
                correctIndex: 0,
                explanation: "„genelde“ = meistens + Aorist „çalışırım“ (ich arbeite üblicherweise). „ofis“ recycelt A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Häufigkeits-Wörter zu.",
                pairs: [
                  { source: "meistens", target: "genelde" },
                  { source: "manchmal", target: "bazen" },
                  { source: "immer", target: "her zaman" },
                  { source: "der Beruf", target: "meslek" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Ben her zaman saat sekizde işe ___.",
                options: ["giderim", "gittim", "gideceğim"],
                solution: "giderim",
                translation: "Ich gehe immer um acht Uhr zur Arbeit.",
                explanation: "„her zaman“ (immer) verlangt den Aorist der Gewohnheit: giderim. „işe“ (zur Arbeit) recycelt A2.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "„Ne iş yaparsın?“ – wonach fragt die Person?",
                options: ["nach deinem Beruf", "nach deinem Namen", "nach der Uhrzeit", "nach dem Weg"],
                correctIndex: 0,
                explanation: "„Ne iş yaparsın?“ = Was arbeitest du? / Was ist dein Beruf? – die Standardfrage zum Job.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Manchmal arbeite ich zu Hause.“",
                tokens: ["Bazen", "evde", "çalışırım."],
                solution: "Bazen evde çalışırım.",
                translation: "Manchmal arbeite ich zu Hause.",
                explanation: "„bazen“ (manchmal) + Aorist „çalışırım“. „ev“ (Haus) recycelt A2.",
                audioText: "Bazen evde çalışırım.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Was arbeitest du?",
                solution: "Ne iş yaparsın",
                altSolutions: ["Ne iş yaparsın?", "Sen ne iş yaparsın?", "Ne iş yapıyorsun?"],
                hint: "was + Arbeit + du-machst",
                explanation: "„Ne iş yaparsın?“ mit Aorist ist die übliche Frage nach dem Beruf.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Ben öğretmenim, genelde okulda çalışırım ama bazen evden çalışırım.",
                question: "Wo arbeitet die Person manchmal?",
                options: ["von zu Hause", "im Krankenhaus", "im Büro"],
                correctIndex: 0,
                explanation: "„bazen evden çalışırım“ = manchmal arbeite ich von zu Hause. „öğretmen“ = Lehrer:in.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Arbeit & Rat (A2 & Lektion 6).",
                pairs: [
                  { source: "die Arbeit / der Job", target: "iş" },
                  { source: "das Büro", target: "ofis" },
                  { source: "viel zu tun", target: "yoğun" },
                  { source: "du solltest dich ausruhen", target: "dinlenmelisin" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hastaysan dinlenmelisin ve erken yatmalısın. Daha çok su içmelisin; sağlığa dikkat etmek lazım. Bu ilaç diğerinden daha ucuz, en güzeli bu.",
                translation: "Wenn du krank bist, solltest du dich ausruhen und früh schlafen gehen. Du solltest mehr Wasser trinken; man muss auf die Gesundheit achten. Dieses Medikament ist billiger als das andere, das beste ist dieses.",
                tip: "🔁 Wiederholung: Ratschläge (Lektion 6) + Vergleich (Lektion 5) – „dinlenmek“, „erken“, „yatmalısın“, „içmelisin“, „dikkat etmek“, „lazım“, „daha ucuz“, „en güzel“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Smalltalk über den Job",
                scene: "Auf einer Feier fragt dich Kaan nach deiner Arbeit.",
                turns: [
                  { speaker: "Kaan", text: "Merhaba! Ne iş yaparsın?", translation: "Hallo! Was arbeitest du?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Mühendisim, genelde ofiste çalışırım.", correct: true, feedback: "Perfekt – Beruf plus Gewohnheit mit dem Aorist." },
                      { text: "Ofise gittim.", correct: false, feedback: "Das ist Vergangenheit – beschreib deinen Job mit dem Aorist „çalışırım“." },
                      { text: "İş nerede?", correct: false, feedback: "„Wo ist die Arbeit?“ passt nicht – erzähl, was du beruflich machst." },
                    ],
                  },
                  { speaker: "Kaan", text: "İlginç! Her gün ofise mi gidersin?", translation: "Interessant! Gehst du jeden Tag ins Büro?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bazen evden çalışırım, iş çok yoğun.", correct: true, feedback: "Stark! „bazen“ + Aorist, plus „yoğun“ (aus A2) recycelt." },
                      { text: "Evet, dün gittim.", correct: false, feedback: "„Gestern“ ist Vergangenheit – Kaan fragt nach deiner Gewohnheit." },
                    ],
                  },
                  { speaker: "Kaan", text: "Anlıyorum. Kolay gelsin!", translation: "Verstehe. Viel Erfolg bei der Arbeit!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u3-l2",
          title: "Im Vorstellungsgespräch",
          intro:
            "Du bist im Bewerbungsgespräch: Nenne deine Fähigkeiten und Erfahrung – in der Sie-Form.",
          grammarTip:
            "Fähigkeiten mit -ebilirim/-abilirim (ich kann): konuşmak → konuşabilirim (ich kann sprechen), yapmak → yapabilirim. Im Gespräch bleibst du bei der höflichen Sie-Form. Recyceln: meslek, Aorist aus der letzten Lektion.",
          vocab: [
            { source: "ich kann sprechen", target: "konuşabilirim", exampleSource: "Ich kann Englisch sprechen.", exampleTarget: "İngilizce konuşabilirim." },
            { source: "die Erfahrung", target: "deneyim" },
            { source: "das Team", target: "takım" },
            { source: "die Verantwortung", target: "sorumluluk" },
            { source: "erfolgreich", target: "başarılı" },
            { source: "das Vorstellungsgespräch", target: "iş görüşmesi" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „İngilizce ve Almanca konuşabilirim“?",
                audioText: "İngilizce ve Almanca konuşabilirim.",
                options: ["Ich kann Englisch und Deutsch sprechen.", "Ich lerne Englisch und Deutsch.", "Ich mag Englisch und Deutsch.", "Sprechen Sie Englisch?"],
                correctIndex: 0,
                explanation: "„konuşabilirim“ = ich kann sprechen (-ebilirim). „ve“ = und. „Almanca“ (Deutsch) kennst du aus A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Bewerbungs-Wörter zu.",
                pairs: [
                  { source: "die Erfahrung", target: "deneyim" },
                  { source: "das Team", target: "takım" },
                  { source: "die Verantwortung", target: "sorumluluk" },
                  { source: "erfolgreich", target: "başarılı" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Beş yıl ___ var, takımda çalışabilirim.",
                options: ["deneyimim", "takım", "başarılı"],
                solution: "deneyimim",
                translation: "Ich habe fünf Jahre Erfahrung, ich kann im Team arbeiten.",
                explanation: "„deneyimim var“ = ich habe Erfahrung (Possessiv + var, aus A2). „çalışabilirim“ = ich kann arbeiten.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich kann Verantwortung übernehmen.“",
                tokens: ["Sorumluluk", "alabilirim."],
                solution: "Sorumluluk alabilirim.",
                translation: "Ich kann Verantwortung übernehmen.",
                explanation: "„sorumluluk almak“ = Verantwortung übernehmen → „alabilirim“ (ich kann übernehmen).",
                audioText: "Sorumluluk alabilirim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich kann gut im Team arbeiten.",
                solution: "Takımda iyi çalışabilirim",
                altSolutions: ["Takımda iyi çalışabilirim.", "Takım içinde iyi çalışabilirim", "İyi takım çalışması yapabilirim"],
                hint: "im-Team + gut + ich-kann-arbeiten",
                explanation: "„takımda“ (im Team) + „çalışabilirim“ (ich kann arbeiten). „iyi“ (gut) ist A1.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İyi günler. Üç yıl deneyimim var ve İngilizce konuşabilirim.",
                translation: "Guten Tag. Ich habe drei Jahre Erfahrung und kann Englisch sprechen.",
                tip: "„konuşabilirim“ ist lang – ko-nu-şa-bi-li-rim. Ruhig und deutlich, das wirkt souverän.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Job-Gewohnheiten (Lektion 7 & A2).",
                pairs: [
                  { source: "meistens", target: "genelde" },
                  { source: "ich arbeite (üblicherweise)", target: "çalışırım" },
                  { source: "das Meeting", target: "toplantı" },
                  { source: "der Beruf", target: "meslek" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Ne iş yaparsın? Ben genelde ofiste çalışırım, bazen evden. Her zaman erken işe giderim; mesleğimi severim. Hastaysan dinlenmelisin, sağlığa dikkat etmek lazım.",
                translation: "Was arbeitest du? Ich arbeite meistens im Büro, manchmal von zu Hause. Ich gehe immer früh zur Arbeit; ich liebe meinen Beruf. Wenn du krank bist, solltest du dich ausruhen, man muss auf die Gesundheit achten.",
                tip: "🔁 Wiederholung: Job (Lektion 7) + Rat (Lektion 6) – „Ne iş yaparsın?“, „genelde“, „çalışırım“, „bazen“, „her zaman“, „giderim“, „meslek“, „dinlenmek“, „dikkat etmek“, „lazım“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das Bewerbungsgespräch",
                scene: "Frau Yıldız führt mit dir ein Vorstellungsgespräch.",
                turns: [
                  { speaker: "Yıldız Hanım", text: "Hoş geldiniz. Bize kendinizden bahseder misiniz?", translation: "Willkommen. Erzählen Sie uns etwas über sich?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Mühendisim, beş yıl deneyimim var.", correct: true, feedback: "Perfekt – Beruf und Erfahrung klar genannt." },
                      { text: "İyiyim, teşekkürler.", correct: false, feedback: "„Mir geht's gut“ ist Smalltalk – hier stellst du dich beruflich vor." },
                      { text: "Hesap, lütfen.", correct: false, feedback: "Das gehört ins Café – erzähl von deiner Erfahrung." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Güzel. Yabancı dil biliyor musunuz?", translation: "Schön. Sprechen Sie Fremdsprachen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, İngilizce ve Almanca konuşabilirim.", correct: true, feedback: "Stark! Fähigkeiten mit -ebilirim, genau richtig." },
                      { text: "Almanca çok zor.", correct: false, feedback: "„Deutsch ist schwer“ verkauft dich unter Wert – sag, was du kannst." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Çok iyi. Sizinle tekrar görüşeceğiz.", translation: "Sehr gut. Wir werden uns wiedersehen." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u3-l3",
          title: "Probleme lösen",
          intro:
            "Der Computer streikt: Beschreibe ein Problem und bitte höflich um Hilfe.",
          grammarTip:
            "Ein Problem beschreiben: „bozuk“ (kaputt), „çalışmıyor“ (funktioniert nicht). Höflich um Hilfe bitten: „Yardım edebilir misiniz?“ (Können Sie helfen?). Was tun? „Ne yapmalıyım?“ (Was soll ich tun? – -malı aus Lektion 6).",
          vocab: [
            { source: "das Problem", target: "sorun", exampleSource: "Es gibt ein Problem.", exampleTarget: "Bir sorun var." },
            { source: "die Lösung", target: "çözüm" },
            { source: "kaputt", target: "bozuk" },
            { source: "funktioniert nicht", target: "çalışmıyor" },
            { source: "Können Sie helfen?", target: "yardım edebilir misiniz?" },
            { source: "reparieren", target: "tamir etmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bilgisayarım çalışmıyor“?",
                audioText: "Bilgisayarım çalışmıyor.",
                options: ["Mein Computer funktioniert nicht.", "Ich habe keinen Computer.", "Mein Computer ist neu.", "Wo ist mein Computer?"],
                correctIndex: 0,
                explanation: "„bilgisayarım“ = mein Computer, „çalışmıyor“ = funktioniert nicht (Verneinung von çalışıyor).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Problem-Wörter zu.",
                pairs: [
                  { source: "das Problem", target: "sorun" },
                  { source: "die Lösung", target: "çözüm" },
                  { source: "kaputt", target: "bozuk" },
                  { source: "reparieren", target: "tamir etmek" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Telefonum ___, tamir etmelisiniz.",
                options: ["bozuk", "çözüm", "başarılı"],
                solution: "bozuk",
                translation: "Mein Telefon ist kaputt, Sie sollten es reparieren.",
                explanation: "„bozuk“ = kaputt; „tamir etmelisiniz“ = Sie sollten reparieren (-meli in der Sie-Form).",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Können Sie mir helfen?“",
                tokens: ["Bana", "yardım", "edebilir", "misiniz?"],
                solution: "Bana yardım edebilir misiniz?",
                translation: "Können Sie mir helfen?",
                explanation: "„bana“ (mir) + „yardım edebilir misiniz?“ – die höfliche Bitte um Hilfe.",
                audioText: "Bana yardım edebilir misiniz?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Es gibt ein Problem, was soll ich tun?",
                solution: "Bir sorun var, ne yapmalıyım",
                altSolutions: ["Bir sorun var, ne yapmalıyım?", "Bir sorun var. Ne yapmalıyım?", "Sorun var, ne yapmalıyım"],
                hint: "ein-Problem + es-gibt + was + soll-ich-tun",
                explanation: "„sorun var“ (es gibt ein Problem) + „ne yapmalıyım?“ (was soll ich tun? -malı).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "İnternet çalışmıyor, bir sorun var. Yardım edebilir misiniz?",
                question: "Was ist das Problem?",
                options: ["Das Internet funktioniert nicht", "Der Computer ist weg", "Das Telefon ist teuer"],
                correctIndex: 0,
                explanation: "„internet çalışmıyor“ = das Internet funktioniert nicht; „yardım edebilir misiniz?“ = können Sie helfen?",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Fähigkeiten & Rat (Lektion 8 & 6).",
                pairs: [
                  { source: "ich kann sprechen", target: "konuşabilirim" },
                  { source: "die Erfahrung", target: "deneyim" },
                  { source: "du solltest trinken", target: "içmelisin" },
                  { source: "nötig / man braucht", target: "lazım" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İş görüşmesinde beş yıl deneyimim var. İngilizce konuşabilirim, takımda çalışırım, sorumluluk alabilirim ve başarılı olurum. Genelde erken işe giderim.",
                translation: "Im Bewerbungsgespräch: Ich habe fünf Jahre Erfahrung. Ich kann Englisch, arbeite im Team, kann Verantwortung übernehmen und bin erfolgreich. Meistens gehe ich früh zur Arbeit.",
                tip: "🔁 Wiederholung: Bewerbung (Lektion 8) + Job (Lektion 7) – „iş görüşmesi“, „deneyim“, „konuşabilirim“, „takım“, „sorumluluk“, „başarılı“, „genelde“, „giderim“, „erken“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Der Computer streikt",
                scene: "Im Büro geht dein Computer nicht mehr – du rufst den IT-Support Levent an.",
                turns: [
                  { speaker: "Levent", text: "Merhaba, IT destek. Sorununuz nedir?", translation: "Hallo, IT-Support. Was ist Ihr Problem?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bilgisayarım çalışmıyor, yardım edebilir misiniz?", correct: true, feedback: "Perfekt – Problem klar beschrieben und höflich um Hilfe gebeten." },
                      { text: "Bilgisayarım çok güzel.", correct: false, feedback: "„Mein Computer ist schön“ ist kein Problem – sag, was nicht funktioniert." },
                      { text: "Dün ofise gittim.", correct: false, feedback: "Das gehört nicht zum Problem – beschreib den Defekt." },
                    ],
                  },
                  { speaker: "Levent", text: "Anladım. Ne zamandan beri bozuk?", translation: "Verstanden. Seit wann ist er kaputt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bu sabahtan beri. Ne yapmalıyım?", correct: true, feedback: "Stark! Zeitangabe plus Frage nach der Lösung mit -malı." },
                      { text: "Çok teşekkürler, güle güle.", correct: false, feedback: "Zu früh verabschiedet – das Problem ist noch nicht gelöst." },
                    ],
                  },
                  { speaker: "Levent", text: "Bilgisayarı kapatıp açın. Sorun çözülür, merak etmeyin.", translation: "Schalten Sie den Computer aus und wieder an. Das Problem löst sich, keine Sorge." },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 4: Erlebnisse erzählen – Konnektoren, Verneinung, früher
    // ================================================================
    {
      title: "Erlebnisse erzählen",
      description: "Vergangenes lebendig erzählen, verknüpfen und über früher sprechen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u4-l1",
          title: "Meine letzte Reise",
          intro:
            "Erzähl von deiner letzten Reise: Verknüpfe die Ereignisse und verneine im Perfekt.",
          grammarTip:
            "Erzähle Schritt für Schritt mit Konnektoren: önce (zuerst), sonra (dann), daha sonra (danach), sonunda (schließlich). Verneinte Vergangenheit mit -medi/-madı: gitmek → gitmedim (ich ging nicht). Frage mit „mi“: „Denize girdin mi?“ (Bist du ins Meer gegangen?). Recyceln: tatil, deniz aus B1.",
          vocab: [
            { source: "danach / später", target: "daha sonra" },
            { source: "schließlich / am Ende", target: "sonunda" },
            { source: "Bist du ins Meer gegangen?", target: "Denize girdin mi?" },
            { source: "ich habe gesehen", target: "gördüm" },
            { source: "ich habe nicht gesehen", target: "görmedim" },
            { source: "wir hatten viel Spaß", target: "çok eğlendik" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Önce plaja gittik, sonra denize girdik“?",
                audioText: "Önce plaja gittik, sonra denize girdik.",
                options: ["Zuerst gingen wir an den Strand, dann ins Meer.", "Wir gehen morgen ans Meer.", "Der Strand ist weit.", "Willst du ans Meer?"],
                correctIndex: 0,
                explanation: "„önce … sonra“ verknüpft die Ereignisse. „plaj“ und „deniz“ kennst du aus B1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Erzähl-Wörter zu.",
                pairs: [
                  { source: "danach / später", target: "daha sonra" },
                  { source: "schließlich", target: "sonunda" },
                  { source: "ich habe gesehen", target: "gördüm" },
                  { source: "wir hatten viel Spaß", target: "çok eğlendik" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Müzeye gittim ama içeri ___.",
                options: ["girmedim", "girdim", "gireceğim"],
                solution: "girmedim",
                translation: "Ich ging zum Museum, aber ich bin nicht hineingegangen.",
                explanation: "Verneinte Vergangenheit: girmek → girmedim (ich ging nicht rein). „ama“ (aber) recycelt B1.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Schließlich sind wir ins Hotel zurückgekehrt.“",
                tokens: ["Sonunda", "otele", "döndük."],
                solution: "Sonunda otele döndük.",
                translation: "Schließlich sind wir ins Hotel zurückgekehrt.",
                explanation: "„sonunda“ (schließlich) + „döndük“ (wir kehrten zurück). „otel“ recycelt A2/B1.",
                audioText: "Sonunda otele döndük.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Bist du ins Meer gegangen?",
                solution: "Denize girdin mi",
                altSolutions: ["Denize girdin mi?", "Sen denize girdin mi?", "Denize girdin mi ?"],
                hint: "ins-Meer + bist-du-gegangen",
                explanation: "„denize girmek“ = ins Meer gehen/baden → Frage „girdin mi?“.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Tatilde çok eğlendik. Önce denize girdik, daha sonra balık yedik.",
                question: "Was haben sie nach dem Baden gemacht?",
                options: ["Fisch gegessen", "geschlafen", "eingekauft"],
                correctIndex: 0,
                explanation: "„daha sonra balık yedik“ = danach haben wir Fisch gegessen. „tatil“ recycelt B1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Reise & Zukunft (B1 Unit 1).",
                pairs: [
                  { source: "der Urlaub", target: "tatil" },
                  { source: "das Meer", target: "deniz" },
                  { source: "ich werde zurückkommen", target: "döneceğim" },
                  { source: "der Strand", target: "plaj" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bilgisayarım bozuk, çalışmıyor. Bir sorun var ama bir çözüm bulacağım; tamir etmek lazım. İş için deneyimim var, sorumluluk alabilirim.",
                translation: "Mein Computer ist kaputt, er funktioniert nicht. Es gibt ein Problem, aber ich werde eine Lösung finden; man muss ihn reparieren. Für die Arbeit habe ich Erfahrung, ich kann Verantwortung übernehmen.",
                tip: "🔁 Wiederholung: Probleme (Lektion 9) + Bewerbung (Lektion 8) – „bozuk“, „çalışmıyor“, „sorun“, „çözüm“, „tamir etmek“, „deneyim“, „sorumluluk“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Wie war dein Urlaub?",
                scene: "Deine Kollegin Pınar fragt nach deiner Reise.",
                turns: [
                  { speaker: "Pınar", text: "Tatilin nasıldı? Denize girdin mi?", translation: "Wie war dein Urlaub? Bist du ins Meer gegangen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok eğlendik! Önce yüzdük, sonra balık yedik.", correct: true, feedback: "Perfekt – erzählt mit „önce … sonra“ und Vergangenheit." },
                      { text: "Yarın denize gideceğim.", correct: false, feedback: "Das ist Zukunft – Pınar fragt nach dem Urlaub, der schon war." },
                      { text: "Deniz nerede?", correct: false, feedback: "„Wo ist das Meer?“ passt nicht – erzähl von deinem Urlaub." },
                    ],
                  },
                  { speaker: "Pınar", text: "Harika! Müzeye de gittiniz mi?", translation: "Toll! Wart ihr auch im Museum?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hayır, müzeye gitmedik ama çok gezdik.", correct: true, feedback: "Stark! Verneinte Vergangenheit „gitmedik“ richtig eingesetzt." },
                      { text: "Evet, müze çok pahalı olacak.", correct: false, feedback: "„wird teuer sein“ ist Zukunft und widerspricht dem „evet“ – bleib in der Vergangenheit." },
                    ],
                  },
                  { speaker: "Pınar", text: "Ne güzel bir tatil! Sonunda dinlenmişsin.", translation: "Was für ein schöner Urlaub! Du hast dich endlich erholt." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u4-l2",
          title: "Als ich klein war",
          intro:
            "Erinnerungen an die Kindheit: Erzähle, wie es früher war.",
          grammarTip:
            "„eskiden“ = früher, „o zamanlar“ = damals. „-ken“ heißt „als/während“: çocukken = als ich Kind war. Für wiederholte Handlungen früher hörst du oft „-irdi“: „Eskiden her yaz köye giderdik“ (Früher fuhren wir jeden Sommer ins Dorf) – erkenne es als Chunk. Recyceln: Familie aus A1.",
          vocab: [
            { source: "früher", target: "eskiden", exampleSource: "Früher wohnte ich in einem Dorf.", exampleTarget: "Eskiden bir köyde otururdum." },
            { source: "als ich Kind war", target: "çocukken" },
            { source: "das Dorf", target: "köy" },
            { source: "damals", target: "o zamanlar" },
            { source: "spielen", target: "oyun oynamak" },
            { source: "wir fuhren (immer)", target: "giderdik" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Çocukken köyde oynardım“?",
                audioText: "Çocukken köyde oynardım.",
                options: ["Als Kind spielte ich im Dorf.", "Ich spiele jetzt im Dorf.", "Kinder spielen im Dorf.", "Wo spielen die Kinder?"],
                correctIndex: 0,
                explanation: "„çocukken“ = als ich Kind war (-ken), „oynardım“ = ich spielte (damals, wiederholt).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Wörter über früher zu.",
                pairs: [
                  { source: "früher", target: "eskiden" },
                  { source: "als ich Kind war", target: "çocukken" },
                  { source: "das Dorf", target: "köy" },
                  { source: "damals", target: "o zamanlar" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "___ her yaz köye giderdik.",
                options: ["Eskiden", "Yarın", "Şimdi"],
                solution: "Eskiden",
                translation: "Früher fuhren wir jeden Sommer ins Dorf.",
                explanation: "„eskiden“ (früher) passt zur Vergangenheitsgewohnheit „giderdik“ (wir fuhren immer).",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Als Kind spielte ich mit meiner Familie.“",
                tokens: ["Çocukken", "ailemle", "oyun", "oynardım."],
                solution: "Çocukken ailemle oyun oynardım.",
                translation: "Als Kind spielte ich mit meiner Familie.",
                explanation: "„çocukken“ + „ailemle“ (mit meiner Familie, aus A1) + „oyun oynardım“.",
                audioText: "Çocukken ailemle oyun oynardım.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Früher wohnte ich in Istanbul.",
                solution: "Eskiden İstanbul'da otururdum",
                altSolutions: ["Eskiden İstanbul'da otururdum.", "Eskiden İstanbulda otururdum", "Ben eskiden İstanbul'da otururdum"],
                hint: "früher + in-Istanbul + ich-wohnte",
                explanation: "„eskiden“ + „otururdum“ (ich wohnte damals). „oturmak“ (wohnen) kennst du aus A1.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Eskiden çocukken her yaz köye giderdik, çok mutluyduk.",
                translation: "Früher, als ich Kind war, fuhren wir jeden Sommer ins Dorf, wir waren sehr glücklich.",
                tip: "„giderdik“ = wir gingen immer: gi-der-dik. Das -di zeigt Vergangenheit, -k das „wir“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Erzählen & Reise (Lektion 10).",
                pairs: [
                  { source: "schließlich", target: "sonunda" },
                  { source: "danach / später", target: "daha sonra" },
                  { source: "ich habe gesehen", target: "gördüm" },
                  { source: "der Urlaub", target: "tatil" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Tatilde çok eğlendik, denize girdik. Önce müzeyi gördüm, daha sonra plaja gittik, sonunda otele döndük. Bir sorun vardı ama çözüm bulduk.",
                translation: "Im Urlaub hatten wir viel Spaß, wir sind ins Meer gegangen. Zuerst sah ich das Museum, danach gingen wir an den Strand, schließlich kehrten wir ins Hotel zurück. Es gab ein Problem, aber wir fanden eine Lösung.",
                tip: "🔁 Wiederholung: Erzählen (Lektion 10) + Probleme (Lektion 9) – „çok eğlendik“, „gördüm“, „daha sonra“, „sonunda“, „sorun“, „çözüm“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Erinnerungen an früher",
                scene: "Dein Freund Tolga zeigt dir alte Fotos.",
                turns: [
                  { speaker: "Tolga", text: "Bak, bu köyümüz. Sen çocukken nerede yaşardın?", translation: "Schau, das ist unser Dorf. Wo hast du als Kind gelebt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Eskiden büyük bir şehirde otururdum.", correct: true, feedback: "Perfekt – „eskiden“ plus Vergangenheitsgewohnheit „otururdum“." },
                      { text: "Yarın köye gideceğim.", correct: false, feedback: "Das ist Zukunft – Tolga fragt nach deiner Kindheit." },
                      { text: "Köy nerede?", correct: false, feedback: "Erzähl von früher, statt nach dem Ort zu fragen." },
                    ],
                  },
                  { speaker: "Tolga", text: "Çocukken ne yapardın?", translation: "Was hast du als Kind gemacht?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Arkadaşlarımla oyun oynardım, çok eğlenirdik.", correct: true, feedback: "Stark! Kindheitserinnerung mit „oynardım“ und Konnektoren." },
                      { text: "Şimdi ofiste çalışırım.", correct: false, feedback: "Das ist deine heutige Gewohnheit – Tolga fragt nach damals." },
                    ],
                  },
                  { speaker: "Tolga", text: "Ne güzel günlerdi, değil mi?", translation: "Was für schöne Tage das waren, oder?" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u4-l3",
          title: "Er hat gesagt, dass …",
          intro:
            "Gib ein Gespräch wieder: Erzähle, wer was gesagt hat.",
          grammarTip:
            "Am einfachsten gibst du Gesagtes mit „dedi“ (er/sie sagte) und dem direkten Zitat wieder: „‚Geliyorum‘ dedi.“ (Er sagte: ‚Ich komme.‘). „söyledi“ heißt ebenfalls „sagte“. So erzählst du Gespräche nach. Recyceln: Futur und Vergangenheit.",
          vocab: [
            { source: "er/sie sagte", target: "dedi", exampleSource: "Er sagte: „Ich komme.“", exampleTarget: "„Geliyorum“ dedi." },
            { source: "sie/er erzählte / sagte", target: "söyledi" },
            { source: "er/sie fragte", target: "sordu" },
            { source: "er/sie antwortete", target: "cevap verdi" },
            { source: "die Nachricht", target: "haber" },
            { source: "später / dann", target: "sonra" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Elif ‚Yarın geleceğim‘ dedi“?",
                audioText: "Elif yarın geleceğim dedi.",
                options: ["Elif sagte: „Ich werde morgen kommen.“", "Elif kam gestern.", "Elif fragt, ob sie kommen soll.", "Wann kommt Elif?"],
                correctIndex: 0,
                explanation: "„dedi“ = sagte, davor das direkte Zitat „Yarın geleceğim“ (ich werde morgen kommen, Futur aus Unit 1).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Redewiedergabe-Wörter zu.",
                pairs: [
                  { source: "er/sie sagte", target: "dedi" },
                  { source: "er/sie fragte", target: "sordu" },
                  { source: "er/sie antwortete", target: "cevap verdi" },
                  { source: "die Nachricht", target: "haber" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Murat bana „Teşekkürler“ ___.",
                options: ["dedi", "sordu", "geldi"],
                solution: "dedi",
                translation: "Murat sagte zu mir: „Danke.“",
                explanation: "„dedi“ (sagte) steht nach dem direkten Zitat. „sordu“ wäre „fragte“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Sie fragte: ‚Wie geht es dir?‘“",
                tokens: ["„Nasılsın?“", "diye", "sordu."],
                solution: "„Nasılsın?“ diye sordu.",
                translation: "Sie fragte: „Wie geht es dir?“",
                explanation: "„diye sordu“ = fragte (wörtlich „sagend fragte“). „nasılsın“ recycelt A1.",
                audioText: "Nasılsın diye sordu.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Er sagte: „Ich komme morgen.“",
                solution: "„Yarın geleceğim“ dedi",
                altSolutions: ["„Yarın geleceğim“ dedi.", "Yarın geleceğim dedi", "O „yarın geleceğim“ dedi"],
                hint: "Zitat (morgen-komme-ich) + er-sagte",
                explanation: "Direktes Zitat + „dedi“. „geleceğim“ ist die Zukunft aus Unit 1.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Ayşe bana telefon etti ve „Hasta oldum, gelemem“ dedi.",
                question: "Was hat Ayşe gesagt?",
                options: ["Sie ist krank und kann nicht kommen", "Sie kommt später", "Sie hat keine Zeit morgen"],
                correctIndex: 0,
                explanation: "„‚Hasta oldum, gelemem‘ dedi“ = sie sagte: „Ich bin krank geworden, ich kann nicht kommen.“ „hasta“ recycelt A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Kindheit & Zukunft (Lektion 11 & Unit 1).",
                pairs: [
                  { source: "früher", target: "eskiden" },
                  { source: "als ich Kind war", target: "çocukken" },
                  { source: "ich werde gehen", target: "gideceğim" },
                  { source: "wir werden uns treffen", target: "buluşacağız" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Eskiden çocukken köyde yaşardık, o zamanlar arkadaşlarımla oyun oynardım; her yaz köye giderdik. Tatilde çok eğlendik, denizi gördük, sonunda döndük.",
                translation: "Früher, als ich Kind war, lebten wir im Dorf, damals spielte ich mit meinen Freunden; jeden Sommer fuhren wir ins Dorf. Im Urlaub hatten wir viel Spaß, sahen das Meer, schließlich kehrten wir zurück.",
                tip: "🔁 Wiederholung: früher (Lektion 11) + Erzählen (Lektion 10) – „eskiden“, „çocukken“, „köy“, „o zamanlar“, „oyun oynamak“, „giderdik“, „çok eğlendik“, „sonunda“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Was hat Can gesagt?",
                scene: "Deine Freundin Ece will wissen, was Can dir erzählt hat.",
                turns: [
                  { speaker: "Ece", text: "Can'la konuştun mu? Ne dedi?", translation: "Hast du mit Can gesprochen? Was hat er gesagt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, „Gelecek hafta buluşalım“ dedi.", correct: true, feedback: "Perfekt – Zitat plus „dedi“, so gibst du Gesagtes wieder." },
                      { text: "Can nerede oturuyor?", correct: false, feedback: "Ece fragt, was Can gesagt hat – gib seine Worte mit „dedi“ wieder." },
                      { text: "Yarın Can'a soracağım.", correct: false, feedback: "Du hast doch schon geredet – erzähl, was er sagte." },
                    ],
                  },
                  { speaker: "Ece", text: "Güzel! Başka bir şey söyledi mi?", translation: "Schön! Hat er noch etwas gesagt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "„Sana bir haberim var“ dedi ama sonra söylemedi.", correct: true, feedback: "Stark! Zwei Verben der Redewiedergabe („dedi“, „söylemedi“) kombiniert." },
                      { text: "Haber çok pahalı.", correct: false, feedback: "„Die Nachricht ist teuer“ ergibt keinen Sinn – erzähl weiter, was Can sagte." },
                    ],
                  },
                  { speaker: "Ece", text: "Çok meraklandım şimdi!", translation: "Jetzt bin ich richtig neugierig!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 5: Gefühle & Zusammenleben – Gefühle, Konditional, Kritik
    // ================================================================
    {
      title: "Gefühle & Zusammenleben",
      description: "Gefühle ausdrücken, Vorschläge machen und höflich Kritik üben – der B1-Abschluss.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u5-l1",
          title: "Wie fühlst du dich?",
          intro:
            "Ein Freund wirkt bedrückt: Sprich über Gefühle und tröste ihn.",
          grammarTip:
            "Gefühle drückst du mit „kendimi … hissediyorum“ aus (ich fühle mich …): „Kendimi yorgun hissediyorum.“ Gründe mit „çünkü“. Trösten: „Geçecek, merak etme“ (Es geht vorbei, keine Sorge). Recyceln: nasılsın, çünkü, biraz/çok.",
          vocab: [
            { source: "traurig", target: "üzgün", exampleSource: "Ich fühle mich heute traurig.", exampleTarget: "Bugün kendimi üzgün hissediyorum." },
            { source: "müde", target: "yorgun" },
            { source: "aufgeregt", target: "heyecanlı" },
            { source: "besorgt", target: "endişeli" },
            { source: "ich fühle mich …", target: "kendimi … hissediyorum" },
            { source: "Mach dir keine Sorgen", target: "merak etme" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Kendimi yorgun hissediyorum“?",
                audioText: "Kendimi yorgun hissediyorum.",
                options: ["Ich fühle mich müde.", "Ich bin krank.", "Ich habe Hunger.", "Mir ist langweilig."],
                correctIndex: 0,
                explanation: "„kendimi … hissediyorum“ = ich fühle mich …, „yorgun“ = müde.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Gefühls-Wörter zu.",
                pairs: [
                  { source: "traurig", target: "üzgün" },
                  { source: "müde", target: "yorgun" },
                  { source: "aufgeregt", target: "heyecanlı" },
                  { source: "besorgt", target: "endişeli" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Kendimi ___ hissediyorum çünkü yarın sınavım var.",
                options: ["heyecanlı", "yorgun", "mutlu"],
                solution: "heyecanlı",
                translation: "Ich fühle mich aufgeregt, weil ich morgen eine Prüfung habe.",
                explanation: "„heyecanlı“ (aufgeregt) passt zur Prüfung; „çünkü“ (weil) begründet das Gefühl.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Heute fühle ich mich glücklich.“",
                tokens: ["Bugün", "kendimi", "mutlu", "hissediyorum."],
                solution: "Bugün kendimi mutlu hissediyorum.",
                translation: "Heute fühle ich mich glücklich.",
                explanation: "„mutlu“ (glücklich, aus A2) im Muster „kendimi … hissediyorum“.",
                audioText: "Bugün kendimi mutlu hissediyorum.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Mach dir keine Sorgen, es geht vorbei.",
                solution: "Merak etme, geçecek",
                altSolutions: ["Merak etme, geçecek.", "Endişelenme, geçecek", "Merak etme geçecek"],
                hint: "keine-Sorge + es-wird-vorbeigehen",
                explanation: "„merak etme“ (keine Sorge) + „geçecek“ (es geht vorbei, Zukunft) – so tröstet man.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bugün çok mutluyum çünkü ailemle buluşacağım.",
                question: "Warum ist die Person glücklich?",
                options: ["Sie trifft ihre Familie", "Sie hat Urlaub", "Sie hat einen neuen Job"],
                correctIndex: 0,
                explanation: "„çünkü ailemle buluşacağım“ = weil ich meine Familie treffen werde. „buluşacağım“ (Futur) recycelt Unit 1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Redewiedergabe & Erzählen (Unit 4).",
                pairs: [
                  { source: "er/sie sagte", target: "dedi" },
                  { source: "er/sie fragte", target: "sordu" },
                  { source: "schließlich", target: "sonunda" },
                  { source: "früher", target: "eskiden" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Elif aradı ve „geliyorum“ dedi. Bana bir haber söyledi. „Ne zaman?“ diye sordum, o da cevap verdi. Eskiden çocukken köyde oyun oynardık.",
                translation: "Elif rief an und sagte: „Ich komme.“ Sie erzählte mir eine Neuigkeit. „Wann?“ fragte ich, und sie antwortete. Früher, als Kinder, spielten wir im Dorf.",
                tip: "🔁 Wiederholung: Redewiedergabe (Lektion 12) + früher (Lektion 11) – „dedi“, „haber“, „söyledi“, „sordu“, „cevap verdi“, „eskiden“, „çocukken“, „köy“, „oyun oynamak“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Ein Freund ist traurig",
                scene: "Dein Freund Barış wirkt niedergeschlagen.",
                turns: [
                  { speaker: "Barış", text: "Bugün kendimi çok kötü hissediyorum.", translation: "Heute fühle ich mich sehr schlecht." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Neden? Bir sorun mu var?", correct: true, feedback: "Perfekt – du fragst einfühlsam nach dem Grund." },
                      { text: "Güle güle!", correct: false, feedback: "Deinen traurigen Freund verabschieden? Frag lieber, was los ist." },
                      { text: "Hesap, lütfen.", correct: false, feedback: "Das passt gar nicht – zeig Anteilnahme." },
                    ],
                  },
                  { speaker: "Barış", text: "İşte çok yoğunum ve endişeliyim.", translation: "Auf der Arbeit habe ich viel zu tun und bin besorgt." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Merak etme, geçecek. Biraz dinlenmelisin.", correct: true, feedback: "Stark! Trösten plus Rat mit -malı (aus Unit 2)." },
                      { text: "Bence en güzel şehir İstanbul.", correct: false, feedback: "Das Thema wechseln hilft nicht – tröste deinen Freund." },
                    ],
                  },
                  { speaker: "Barış", text: "Haklısın, teşekkür ederim. İyi bir arkadaşsın.", translation: "Du hast recht, danke. Du bist ein guter Freund." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u5-l2",
          title: "Wenn du willst …",
          intro:
            "Pläne gemeinsam schmieden: Mach Vorschläge und knüpfe sie an Bedingungen.",
          grammarTip:
            "Bedingung mit -sa/-se (wenn): „İstersen …“ (wenn du willst), „Vaktin varsa …“ (wenn du Zeit hast). Vorschläge mit -alım/-elim mı? (Wollen wir …?): „Yarın buluşalım mı?“ (Wollen wir uns morgen treffen?). Recyceln: Einladungs-Vokabular aus A2.",
          vocab: [
            { source: "wenn du willst", target: "istersen", exampleSource: "Wenn du willst, gehen wir zusammen.", exampleTarget: "İstersen birlikte gideriz." },
            { source: "wenn du Zeit hast", target: "vaktin varsa" },
            { source: "Wollen wir uns treffen?", target: "buluşalım mı?" },
            { source: "lass uns gehen", target: "gidelim" },
            { source: "zusammen", target: "birlikte" },
            { source: "vielleicht", target: "belki" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „İstersen birlikte sinemaya gidelim“?",
                audioText: "İstersen birlikte sinemaya gidelim.",
                options: ["Wenn du willst, lass uns zusammen ins Kino gehen.", "Ich war im Kino.", "Wo ist das Kino?", "Ich will nicht ins Kino."],
                correctIndex: 0,
                explanation: "„istersen“ (wenn du willst) + „gidelim“ (lass uns gehen). „birlikte“ = zusammen, „sinema“ aus A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Vorschlags-Wörter zu.",
                pairs: [
                  { source: "wenn du willst", target: "istersen" },
                  { source: "wenn du Zeit hast", target: "vaktin varsa" },
                  { source: "zusammen", target: "birlikte" },
                  { source: "vielleicht", target: "belki" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Vaktin ___, yarın buluşalım mı?",
                options: ["varsa", "yok", "var"],
                solution: "varsa",
                translation: "Wenn du Zeit hast, wollen wir uns morgen treffen?",
                explanation: "„vaktin varsa“ = wenn du Zeit hast (Konditional -sa). „buluşalım mı?“ = wollen wir uns treffen?",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Vorschlag: „Wollen wir uns am Wochenende treffen?“",
                tokens: ["Hafta sonu", "buluşalım", "mı?"],
                solution: "Hafta sonu buluşalım mı?",
                translation: "Wollen wir uns am Wochenende treffen?",
                explanation: "„buluşalım mı?“ ist der Vorschlag. „hafta sonu“ (Wochenende) recycelt A2.",
                audioText: "Hafta sonu buluşalım mı?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wenn du willst, gehen wir zusammen.",
                solution: "İstersen birlikte gideriz",
                altSolutions: ["İstersen birlikte gideriz.", "İstersen beraber gideriz", "İstersen birlikte gideriz ."],
                hint: "wenn-du-willst + zusammen + wir-gehen",
                explanation: "„istersen“ (Konditional) + „birlikte gideriz“ (wir gehen zusammen).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bu akşam vaktin varsa, birlikte yemek yiyelim mi?",
                question: "Was schlägt die Person vor?",
                options: ["zusammen essen", "ins Kino gehen", "einkaufen"],
                correctIndex: 0,
                explanation: "„birlikte yemek yiyelim mi?“ = wollen wir zusammen essen? „vaktin varsa“ = wenn du Zeit hast.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Einladung & Gefühle (A2 & Lektion 13).",
                pairs: [
                  { source: "die Einladung", target: "davet" },
                  { source: "die Party", target: "parti" },
                  { source: "müde", target: "yorgun" },
                  { source: "aufgeregt", target: "heyecanlı" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bugün kendimi biraz yorgun ve üzgün hissediyorum çünkü endişeliyim. Ama merak etme, yarın heyecanlı olacağım. Elif bana bir haber söyledi ve „geliyorum“ dedi.",
                translation: "Heute fühle ich mich etwas müde und traurig, weil ich besorgt bin. Aber mach dir keine Sorgen, morgen werde ich aufgeregt sein. Elif erzählte mir eine Neuigkeit und sagte: „Ich komme.“",
                tip: "🔁 Wiederholung: Gefühle (Lektion 13) + Redewiedergabe (Lektion 12) – „kendimi … hissediyorum“, „yorgun“, „üzgün“, „endişeli“, „merak etme“, „heyecanlı“, „haber“, „söyledi“, „dedi“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Pläne fürs Wochenende",
                scene: "Deine Freundin Nur schlägt etwas fürs Wochenende vor.",
                turns: [
                  { speaker: "Nur", text: "Hafta sonu boş musun? Bir şeyler yapalım mı?", translation: "Hast du am Wochenende frei? Wollen wir etwas machen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Olur! İstersen birlikte sahile gidelim.", correct: true, feedback: "Perfekt – Zusage plus Vorschlag mit „istersen“ und „gidelim“." },
                      { text: "Dün sahile gittim.", correct: false, feedback: "Das war gestern – macht einen Plan für das kommende Wochenende." },
                      { text: "Sahil nerede?", correct: false, feedback: "Statt zu fragen, wo der Strand ist, schlag gemeinsam etwas vor." },
                    ],
                  },
                  { speaker: "Nur", text: "Harika fikir! Saat kaçta buluşalım?", translation: "Tolle Idee! Um wie viel Uhr treffen wir uns?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Vaktin varsa sabah onda buluşalım.", correct: true, feedback: "Stark! Bedingung „vaktin varsa“ plus Vorschlag mit Uhrzeit." },
                      { text: "Buluşmak istemiyorum.", correct: false, feedback: "Das widerspricht deiner Zusage – schlag eine Uhrzeit vor." },
                    ],
                  },
                  { speaker: "Nur", text: "Tamam, o zaman cumartesi görüşürüz!", translation: "Okay, dann sehen wir uns am Samstag!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u5-l3",
          title: "Höflich Kritik üben",
          intro:
            "Etwas stört dich, aber du willst niemanden verletzen: Übe diplomatische Kritik – eine Kunst für sich.",
          grammarTip:
            "Diplomatisch bleiben: kombiniere ein Lob mit sanfter Kritik. „keşke“ = ich wünschte / wenn doch, „rica etmek“ = (höflich) bitten, „özür dilerim“ = Entschuldigung, „sorun değil“ = kein Problem. Kulturtipp: „kırmamak“ (jemanden nicht verletzen) ist im Türkischen sehr wichtig.",
          vocab: [
            { source: "ich wünschte / wenn doch", target: "keşke", exampleSource: "Ich wünschte, du hättest es früher gesagt.", exampleTarget: "Keşke daha önce söyleseydin." },
            { source: "(höflich) bitten", target: "rica etmek" },
            { source: "Entschuldigung", target: "özür dilerim" },
            { source: "kein Problem", target: "sorun değil" },
            { source: "vorsichtig / achtsam", target: "dikkatli" },
            { source: "ehrlich gesagt", target: "açıkçası" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Yemek güzeldi ama keşke biraz daha sıcak olsaydı“?",
                audioText: "Yemek güzeldi ama keşke biraz daha sıcak olsaydı.",
                options: ["Das Essen war gut, aber ich wünschte, es wäre etwas wärmer gewesen.", "Das Essen war zu heiß.", "Das Essen hat nicht geschmeckt.", "Wo ist das Essen?"],
                correctIndex: 0,
                explanation: "Erst Lob („güzeldi“), dann sanfte Kritik mit „keşke“ (ich wünschte) – so kritisiert man höflich.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Höflichkeits-Wörter zu.",
                pairs: [
                  { source: "ich wünschte / wenn doch", target: "keşke" },
                  { source: "(höflich) bitten", target: "rica etmek" },
                  { source: "Entschuldigung", target: "özür dilerim" },
                  { source: "kein Problem", target: "sorun değil" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Çok güzel oldu, ama ___ biraz daha sessiz olsa.",
                options: ["keşke", "çünkü", "çok"],
                solution: "keşke",
                translation: "Es ist sehr schön geworden, aber ich wünschte, es wäre etwas leiser.",
                explanation: "„keşke“ leitet den Wunsch/die sanfte Kritik ein, nach dem Lob mit „ama“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Entschuldigung, darf ich Sie um etwas bitten?“",
                tokens: ["Özür dilerim,", "bir", "şey", "rica edebilir miyim?"],
                solution: "Özür dilerim, bir şey rica edebilir miyim?",
                translation: "Entschuldigung, darf ich Sie um etwas bitten?",
                explanation: "„özür dilerim“ + „rica edebilir miyim?“ (darf ich bitten? -ebilmek aus Unit 3).",
                audioText: "Özür dilerim, bir şey rica edebilir miyim?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ehrlich gesagt, ich bin anderer Meinung.",
                solution: "Açıkçası, ben katılmıyorum",
                altSolutions: ["Açıkçası, ben katılmıyorum.", "Açıkçası katılmıyorum", "Açıkçası ben aynı fikirde değilim"],
                hint: "ehrlich-gesagt + ich + stimme-nicht-zu",
                explanation: "„açıkçası“ (ehrlich gesagt) + „katılmıyorum“ (ich stimme nicht zu, aus Unit 2).",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Açıkçası çok güzel oldu, ama keşke biraz daha dikkatli olsaydık.",
                translation: "Ehrlich gesagt ist es sehr schön geworden, aber ich wünschte, wir wären etwas achtsamer gewesen.",
                tip: "Lob zuerst, Kritik sanft mit „keşke“ – der Ton macht im Türkischen alles.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Meinung & Vorschlag (Unit 2 & Lektion 14).",
                pairs: [
                  { source: "meiner Meinung nach", target: "bence" },
                  { source: "du hast recht", target: "haklısın" },
                  { source: "wenn du willst", target: "istersen" },
                  { source: "zusammen", target: "birlikte" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İstersen birlikte gidelim. Vaktin varsa yarın buluşalım mı? Belki sinemaya gideriz. Bugün kendimi mutlu hissediyorum, hiç üzgün değilim.",
                translation: "Wenn du willst, lass uns zusammen gehen. Wenn du Zeit hast, wollen wir uns morgen treffen? Vielleicht gehen wir ins Kino. Heute fühle ich mich glücklich, gar nicht traurig.",
                tip: "🔁 Wiederholung: Vorschläge (Lektion 14) + Gefühle (Lektion 13) – „istersen“, „birlikte“, „gidelim“, „vaktin varsa“, „buluşalım mı“, „belki“, „kendimi … hissediyorum“, „üzgün“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Feedback für einen Freund",
                scene: "Dein Freund Kerem hat ein Essen gekocht und fragt nach deiner ehrlichen Meinung.",
                turns: [
                  { speaker: "Kerem", text: "Yemeği nasıl buldun? Açıkça söyle.", translation: "Wie fandest du das Essen? Sag es ehrlich." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Açıkçası çok lezzetliydi, ama keşke biraz daha tuzlu olsaydı.", correct: true, feedback: "Perfekt – erst loben, dann sanft mit „keşke“ kritisieren." },
                      { text: "Yemek çok kötü.", correct: false, feedback: "Zu direkt – im Türkischen lobt man erst und kritisiert dann sanft (kırmamak)." },
                      { text: "Yemek yok.", correct: false, feedback: "„Es gibt kein Essen“ stimmt nicht – gib höfliches Feedback." },
                    ],
                  },
                  { speaker: "Kerem", text: "Haklısın, tuzu az koydum. Başka?", translation: "Du hast recht, ich habe wenig Salz genommen. Sonst noch was?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bence harikaydı, bir dahaki sefere birlikte yapalım mı?", correct: true, feedback: "Wunderbar – Meinung, Vorschlag und Höflichkeit vereint. Tebrikler!" },
                      { text: "Özür dilerim, gelemem.", correct: false, feedback: "Eine Absage passt hier nicht – runde das Gespräch positiv ab." },
                    ],
                  },
                  { speaker: "Kerem", text: "Tabii, çok sevinirim! Ellerine sağlık demeni beklerdim ama bu daha iyi.", translation: "Klar, das würde mich sehr freuen! Ich hatte ein Kompliment erwartet, aber das ist noch besser." },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 6: Duydun mu? – Neuigkeiten & die miş-Vergangenheit
    // ================================================================
    {
      title: "Duydun mu? – Neuigkeiten & Medien",
      description: "Gehörtes weitergeben (-miş), über Fernsehen und soziale Medien sprechen und Nachrichten einordnen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u6-l1",
          title: "Hast du schon gehört?",
          intro:
            "Die Nachbarschaft brodelt: Lerne, Gehörtes mit der miş-Form weiterzugeben – das Klatsch-und-Tratsch-Werkzeug des Türkischen.",
          grammarTip:
            "Die Endung -miş/-mış meldet, was du nur GEHÖRT (nicht selbst erlebt) hast: „Elif evlenmiş“ = Elif hat (wohl) geheiratet – man sagt es. Kontrast: „evlendi“ = ich war dabei / weiß es sicher. Erkenne -miş erst einmal beim Hören und nutze die Chunks.",
          vocab: [
            { source: "hören / erfahren", target: "duymak", exampleSource: "Hast du es gehört?", exampleTarget: "Duydun mu?" },
            { source: "der Klatsch / Tratsch", target: "dedikodu" },
            { source: "vermutlich / wohl", target: "galiba" },
            { source: "heiraten", target: "evlenmek", exampleSource: "Elif hat wohl geheiratet!", exampleTarget: "Elif evlenmiş!" },
            { source: "umziehen", target: "taşınmak", exampleSource: "Sie sind wohl in eine neue Wohnung gezogen.", exampleTarget: "Yeni bir eve taşınmışlar." },
            { source: "glauben", target: "inanmak", exampleSource: "Ich glaube es nicht!", exampleTarget: "İnanmıyorum!" },
            { source: "überrascht sein", target: "şaşırmak", exampleSource: "Ich war sehr überrascht!", exampleTarget: "Çok şaşırdım!" },
            { source: "auf jeden Fall / bestimmt", target: "kesinlikle" },
            { source: "niemand", target: "kimse" },
            { source: "wahr / echt", target: "gerçek", exampleSource: "Ist das wahr?", exampleTarget: "Gerçek mi?" },
            { source: "der Nachbar / die Nachbarin", target: "komşu" },
            { source: "sofort", target: "hemen" },
            { source: "erzählen", target: "anlatmak" },
            { source: "unbedingt", target: "mutlaka" },
            { source: "über (Thema)", target: "hakkında", exampleSource: "Wir sprechen über Elif.", exampleTarget: "Elif hakkında konuşuyoruz." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Elif evlenmiş“?",
                audioText: "Elif evlenmiş!",
                options: ["Elif hat wohl geheiratet (habe ich gehört).", "Elif heiratet gerade.", "Elif wird heiraten.", "Elif war auf einer Hochzeit."],
                correctIndex: 0,
                explanation: "-miş meldet Gehörtes: Du warst nicht dabei, jemand hat es dir erzählt.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Worin unterscheiden sich „evlendi“ und „evlenmiş“?",
                options: [
                  "evlendi = selbst erlebt/sicher, evlenmiş = nur gehört/vermutet",
                  "evlendi = Zukunft, evlenmiş = Vergangenheit",
                  "kein Unterschied",
                  "evlenmiş ist höflicher",
                ],
                correctIndex: 0,
                explanation: "Das ist der Kern der miş-Form: Sie markiert Information aus zweiter Hand.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Neuigkeiten-Wörter zu.",
                pairs: [
                  { source: "der Klatsch", target: "dedikodu" },
                  { source: "vermutlich / wohl", target: "galiba" },
                  { source: "niemand", target: "kimse" },
                  { source: "der Nachbar", target: "komşu" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Duydun mu? Komşular yeni bir eve ___!",
                options: ["taşınmışlar", "taşınacaklar", "oturuyorlar"],
                solution: "taşınmışlar",
                translation: "Hast du gehört? Die Nachbarn sind wohl in eine neue Wohnung gezogen!",
                explanation: "Gehörte Neuigkeit → miş-Form: taşınmışlar (sie sind wohl umgezogen).",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich habe es sofort allen erzählt.“",
                tokens: ["Hemen", "anlattım."],
                solution: "Hemen anlattım.",
                translation: "Ich habe es sofort erzählt.",
                explanation: "„hemen“ = sofort, „anlatmak“ = erzählen → anlattım (ich erzählte).",
                audioText: "Hemen anlattım.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ist das wahr? Ich glaube es nicht!",
                solution: "Gerçek mi? İnanmıyorum",
                altSolutions: ["Gerçek mi? İnanmıyorum!", "Gerçek mi, inanmıyorum", "Bu gerçek mi? İnanmıyorum!"],
                hint: "wahr + Fragepartikel + ich-glaube-nicht",
                explanation: "„gerçek“ = wahr, „inanmıyorum“ = ich glaube (es) nicht – die Klatsch-Reaktion schlechthin.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Duydun mu? Murat yeni bir iş bulmuş, galiba çok mutluymuş.",
                question: "Was hat die Person über Murat gehört?",
                options: ["Er hat wohl einen neuen Job gefunden.", "Er hat geheiratet.", "Er ist umgezogen."],
                correctIndex: 0,
                explanation: "„bulmuş“ = er hat wohl gefunden (-miş = gehört); „galiba“ = vermutlich.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Kritik & Gefühle zu (Unit 5).",
                pairs: [
                  { source: "ich wünschte / wenn doch", target: "keşke" },
                  { source: "(höflich) bitten", target: "rica etmek" },
                  { source: "Entschuldigung", target: "özür dilerim" },
                  { source: "besorgt", target: "endişeli" },
                  { source: "ehrlich gesagt", target: "açıkçası" },
                  { source: "vorsichtig / achtsam", target: "dikkatli" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Komşu hakkında dedikodu yapmak ayıp ama herkes yapıyor. Açıkçası ben de çok şaşırdım, kesinlikle kimseye söylemem!",
                translation: "Über den Nachbarn zu tratschen gehört sich nicht, aber alle tun es. Ehrlich gesagt war ich auch sehr überrascht – ich sage es bestimmt niemandem weiter!",
                tip: "„şaşırdım“ – şa-şır-DIM; „kesinlikle“ – ke-sin-lik-LE. 🔁 „açıkçası“ aus Lektion 15.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Neuigkeiten im Treppenhaus",
                scene: "Deine Nachbarin Fatma hat brandheiße Neuigkeiten.",
                turns: [
                  { speaker: "Fatma", text: "Duydun mu? Üst kattaki komşu evlenmiş!", translation: "Hast du gehört? Der Nachbar von oben hat wohl geheiratet!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Gerçek mi? Çok şaşırdım!", correct: true, feedback: "Perfekt – Nachfrage plus Überraschung, genau die richtige Reaktion." },
                      { text: "Ben dün evlendim.", correct: false, feedback: "DU hast gestern geheiratet? Das wäre die größere Neuigkeit – reagiere auf Fatmas Nachricht." },
                      { text: "Hesap, lütfen.", correct: false, feedback: "Die Rechnung gibt es im Café – hier gibt es Klatsch." },
                    ],
                  },
                  { speaker: "Fatma", text: "Evet! Ve galiba İzmir'e taşınacaklarmış.", translation: "Ja! Und angeblich ziehen sie wohl nach Izmir." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kim söyledi? Belki sadece dedikodu.", correct: true, feedback: "Stark – Quelle erfragt und „dedikodu“ eingeordnet. Gesunder Zweifel!" },
                      { text: "Kesinlikle yanlış, sen yalan söylüyorsun!", correct: false, feedback: "Der Nachbarin direkt Lügen vorwerfen? Zu hart – frag lieber nach der Quelle." },
                    ],
                  },
                  { speaker: "Fatma", text: "Haklısın, ben de duydum sadece. Ama mutlaka doğrudur!", translation: "Du hast recht, ich habe es auch nur gehört. Aber es stimmt bestimmt!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u6-l2",
          title: "Fernsehen & soziale Medien",
          intro:
            "Serien, Nachrichten, Social Media: Sprich über das, was du schaust, teilst und verfolgst.",
          grammarTip:
            "„Ne izliyorsun?“ = Was schaust du? Mit dem Aorist sprichst du über Gewohnheiten: „Her akşam dizi izlerim“ (Ich schaue jeden Abend eine Serie). Recyceln: genelde, bazen, her zaman aus Unit 3.",
          vocab: [
            { source: "die Zeitung", target: "gazete", exampleSource: "Ich lese jeden Morgen Zeitung.", exampleTarget: "Her sabah gazete okurum." },
            { source: "der Fernseher / das Fernsehen", target: "televizyon" },
            { source: "die Serie", target: "dizi" },
            { source: "schauen / verfolgen", target: "izlemek", exampleSource: "Was schaust du?", exampleTarget: "Ne izliyorsun?" },
            { source: "soziale Medien", target: "sosyal medya" },
            { source: "teilen (Post)", target: "paylaşmak" },
            { source: "das Foto", target: "fotoğraf" },
            { source: "das Video", target: "video" },
            { source: "folgen (Account)", target: "takip etmek" },
            { source: "der Kommentar", target: "yorum" },
            { source: "die Werbung", target: "reklam" },
            { source: "unterhaltsam", target: "eğlenceli" },
            { source: "der Sender / Kanal", target: "kanal" },
            { source: "berühmt", target: "ünlü" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Her akşam dizi izlerim“?",
                audioText: "Her akşam dizi izlerim.",
                options: ["Ich schaue jeden Abend eine Serie.", "Ich schaue gerade eine Serie.", "Die Serie läuft jeden Abend.", "Ich mag keine Serien."],
                correctIndex: 0,
                explanation: "Aorist „izlerim“ = Gewohnheit (Unit 3!); „dizi“ = Serie.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Medien-Wörter zu.",
                pairs: [
                  { source: "die Zeitung", target: "gazete" },
                  { source: "die Serie", target: "dizi" },
                  { source: "der Kommentar", target: "yorum" },
                  { source: "die Werbung", target: "reklam" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu fotoğrafı sosyal medyada ___ miyim?",
                options: ["paylaşabilir", "izleyebilir", "okuyabilir"],
                solution: "paylaşabilir",
                translation: "Darf ich dieses Foto in den sozialen Medien teilen?",
                explanation: "„paylaşmak“ = teilen + -ebilir mi (dürfen, Unit 1) – immer erst fragen!",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich folge diesem berühmten Sender.“",
                tokens: ["Bu", "ünlü", "kanalı", "takip", "ediyorum."],
                solution: "Bu ünlü kanalı takip ediyorum.",
                translation: "Ich folge diesem berühmten Sender.",
                explanation: "„takip etmek“ = folgen; „ünlü“ = berühmt; Akkusativ „kanalı“.",
                audioText: "Bu ünlü kanalı takip ediyorum.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Was schaust du? Ist die Serie unterhaltsam?",
                solution: "Ne izliyorsun? Dizi eğlenceli mi",
                altSolutions: ["Ne izliyorsun? Dizi eğlenceli mi?", "Ne izliyorsun, dizi eğlenceli mi?", "Ne izliyorsun? Bu dizi eğlenceli mi?"],
                hint: "was + du-schaust + Serie + unterhaltsam + Fragepartikel",
                explanation: "„eğlenceli“ = unterhaltsam – das wichtigste Serien-Adjektiv.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Televizyonda çok reklam var, o yüzden genelde video izlerim.",
                question: "Warum schaut die Person meistens Videos?",
                options: ["Im Fernsehen gibt es zu viel Werbung.", "Der Fernseher ist kaputt.", "Videos sind kürzer."],
                correctIndex: 0,
                explanation: "„çok reklam var“ = es gibt viel Werbung; „o yüzden“ = deshalb.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Neuigkeiten zu (Lektion 16).",
                pairs: [
                  { source: "der Klatsch", target: "dedikodu" },
                  { source: "hören / erfahren", target: "duymak" },
                  { source: "erzählen", target: "anlatmak" },
                  { source: "wahr / echt", target: "gerçek" },
                  { source: "überrascht sein", target: "şaşırmak" },
                  { source: "glauben", target: "inanmak" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Sosyal medyada ünlü bir kanal takip ediyorum. Dün eğlenceli bir video paylaştım, komşum hemen yorum yazdı: Buna inanmıyorum, gerçek mi?",
                translation: "In den sozialen Medien folge ich einem berühmten Kanal. Gestern habe ich ein unterhaltsames Video geteilt, mein Nachbar schrieb sofort einen Kommentar: Das glaube ich nicht, ist das echt?",
                tip: "🔁 „komşu“, „hemen“, „inanmıyorum“, „gerçek“ (Lektion 16) + die neuen Medien-Wörter.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die neue Lieblingsserie",
                scene: "Dein Kollege Onur schwärmt in der Pause von einer Serie.",
                turns: [
                  { speaker: "Onur", text: "Yeni bir dizi izliyorum, kesinlikle izlemelisin!", translation: "Ich schaue eine neue Serie, du musst sie unbedingt schauen!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Ne hakkında? Eğlenceli mi?", correct: true, feedback: "Perfekt – „ne hakkında“ (worüber?) plus das neue Adjektiv „eğlenceli“." },
                      { text: "Televizyonum bozuk, sorun değil.", correct: false, feedback: "Etwas desinteressiert – frag doch, worum es geht." },
                      { text: "Gazete nerede?", correct: false, feedback: "Die Zeitung hilft dir bei der Serien-Frage nicht weiter." },
                    ],
                  },
                  { speaker: "Onur", text: "Bir gazeteci hakkında. Çok ünlü bir dizi, herkes izliyor!", translation: "Über einen Journalisten. Eine sehr berühmte Serie, alle schauen sie!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Tamam, bu akşam izlerim. Hangi kanalda?", correct: true, feedback: "Stark – Aorist „izlerim“ (Gewohnheit/Zusage) und nach dem Sender gefragt." },
                      { text: "Ben dizi sevmem, reklam izlerim.", correct: false, feedback: "„Ich schaue lieber Werbung“? Das glaubt dir niemand." },
                    ],
                  },
                  { speaker: "Onur", text: "İnternette var, sana linki sosyal medyadan paylaşırım.", translation: "Es gibt sie im Internet, ich teile dir den Link über die sozialen Medien." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u6-l3",
          title: "Stimmt das wirklich?",
          intro:
            "Nicht alles, was man hört, ist wahr: Lerne nachzufragen, einzuordnen und Gerüchte von Fakten zu trennen.",
          grammarTip:
            "„Emin misin?“ = Bist du sicher? „Bence doğru değil“ = Ich finde, das stimmt nicht. Kombiniere die miş-Form mit deiner Meinung (bence, katılıyorum aus Unit 2), um Gehörtes einzuordnen: „Öyle demiş ama bence yanlış.“",
          vocab: [
            { source: "sicher (überzeugt)", target: "emin", exampleSource: "Bist du sicher?", exampleTarget: "Emin misin?" },
            { source: "falsch", target: "yanlış" },
            { source: "offensichtlich / klar", target: "belli", exampleSource: "Es ist nicht klar.", exampleTarget: "Belli değil." },
            { source: "wichtig", target: "önemli" },
            { source: "das Thema", target: "konu" },
            { source: "das Gespräch / der Plausch", target: "sohbet" },
            { source: "ernst", target: "ciddi" },
            { source: "der Witz / Scherz", target: "şaka", exampleSource: "Ist das ein Witz?", exampleTarget: "Şaka mı?" },
            { source: "na ja / wie auch immer", target: "neyse" },
            { source: "die Lüge", target: "yalan" },
            { source: "geheim", target: "gizli" },
            { source: "eigentlich / genau genommen", target: "aslında" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Emin misin? Bence bu yanlış.“",
                audioText: "Emin misin? Bence bu yanlış.",
                options: ["Bist du sicher? Ich finde, das ist falsch.", "Weißt du es? Das ist richtig.", "Bist du fertig? Das ist wichtig.", "Glaubst du mir? Das ist ein Witz."],
                correctIndex: 0,
                explanation: "„emin“ = sicher, „yanlış“ = falsch, „bence“ (Unit 2) = meiner Meinung nach.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Einordnungs-Wörter zu.",
                pairs: [
                  { source: "falsch", target: "yanlış" },
                  { source: "wichtig", target: "önemli" },
                  { source: "ernst", target: "ciddi" },
                  { source: "die Lüge", target: "yalan" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu ciddi bir ___, şaka değil!",
                options: ["konu", "sohbet", "yorum"],
                solution: "konu",
                translation: "Das ist ein ernstes Thema, kein Witz!",
                explanation: "„konu“ = Thema; „ciddi“ = ernst ↔ „şaka“ = Witz.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Eigentlich ist es noch geheim.“",
                tokens: ["Aslında", "bu", "hâlâ", "gizli."],
                solution: "Aslında bu hâlâ gizli.",
                translation: "Eigentlich ist das noch geheim.",
                explanation: "„aslında“ = eigentlich, „gizli“ = geheim, „hâlâ“ = noch (immer).",
                audioText: "Aslında bu hâlâ gizli.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ist das ein Witz? Bist du sicher?",
                solution: "Şaka mı? Emin misin",
                altSolutions: ["Şaka mı? Emin misin?", "Bu şaka mı? Emin misin?", "Şaka mı, emin misin?"],
                hint: "Witz + Fragepartikel + sicher + bist-du",
                explanation: "Zwei kurze Fragen, die jedes Gerücht entlarven.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Neyse, bu konu önemli değil. Sohbet çok güzeldi!",
                question: "Wie beendet die Person das Gespräch?",
                options: ["entspannt – das Thema sei nicht wichtig", "wütend – alles sei eine Lüge", "besorgt – es sei sehr ernst"],
                correctIndex: 0,
                explanation: "„neyse“ = na ja/egal – so wechselt man freundlich das Thema. „sohbet“ = Plauderei.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Medien & Meinung zu (Lektion 17 & Unit 2).",
                pairs: [
                  { source: "schauen / verfolgen", target: "izlemek" },
                  { source: "teilen (Post)", target: "paylaşmak" },
                  { source: "soziale Medien", target: "sosyal medya" },
                  { source: "das Foto", target: "fotoğraf" },
                  { source: "ich stimme nicht zu", target: "katılmıyorum" },
                  { source: "du hast recht", target: "haklısın" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Sosyal medyada her yorum gerçek değil, bazıları yalan. Önemli konularda emin olmalısın: Kaynak belli mi? Aslında en iyisi ciddi bir gazete okumak.",
                translation: "In den sozialen Medien ist nicht jeder Kommentar wahr, manche sind Lügen. Bei wichtigen Themen musst du sicher sein: Ist die Quelle klar? Eigentlich ist es am besten, eine seriöse Zeitung zu lesen.",
                tip: "🔁 „yorum“, „sosyal medya“, „gazete“ (Lektion 17) + „-malısın“ (Unit 2) – Medienkompetenz auf Türkisch.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Gerücht oder Wahrheit?",
                scene: "Fatma hat wieder Neuigkeiten – diesmal fragst du genauer nach.",
                turns: [
                  { speaker: "Fatma", text: "Duydun mu? Mahalledeki market kapanmış!", translation: "Hast du gehört? Der Supermarkt im Viertel hat wohl zugemacht!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Emin misin? Kim anlattı?", correct: true, feedback: "Perfekt – erst die Quelle prüfen, dann glauben." },
                      { text: "Kesinlikle doğru, hemen herkese anlatıyorum!", correct: false, feedback: "Ungeprüft weitererzählen? Genau so entstehen Gerüchte." },
                      { text: "Ben markete gitmem.", correct: false, feedback: "Ob DU einkaufst, ist nicht das Thema – prüfe die Neuigkeit." },
                    ],
                  },
                  { speaker: "Fatma", text: "Komşu söyledi ama açıkçası ben de emin değilim.", translation: "Die Nachbarin hat es gesagt, aber ehrlich gesagt bin ich auch nicht sicher." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Belli değil o zaman. Belki sadece dedikodu, belki şaka.", correct: true, feedback: "Stark – sauber eingeordnet: unklar, vielleicht Klatsch, vielleicht Witz." },
                      { text: "Sen her zaman yalan söylüyorsun!", correct: false, feedback: "„Du lügst immer“ zerstört die Freundschaft – bleib bei der Sache." },
                    ],
                  },
                  { speaker: "Fatma", text: "Haklısın. Neyse, önemli değil – gel, sohbet edelim!", translation: "Du hast recht. Na ja, nicht so wichtig – komm, lass uns plaudern!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 7: Şehir & Doğa – Stadtleben, Natur & Umwelt
    // ================================================================
    {
      title: "Şehir & Doğa – Stadt, Natur & Umwelt",
      description: "Stadt- und Landleben vergleichen, über Umweltschutz sprechen und das eigene Viertel mitgestalten.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u7-l1",
          title: "Stadt oder Land?",
          intro:
            "Großstadt-Trubel oder Dorfruhe? Wäge ab, vergleiche und begründe deine Wahl.",
          grammarTip:
            "Zum Abwägen brauchst du den Vergleich aus Unit 2 (daha, en, -dan) plus neue Wörter: „Şehir hayatı köy hayatından daha kalabalık“ = Das Stadtleben ist voller als das Dorfleben. „tercih etmek“ = bevorzugen: „Ben sakin bir hayatı tercih ederim.“",
          vocab: [
            { source: "das Leben", target: "hayat", exampleSource: "Das Stadtleben ist sehr hektisch.", exampleTarget: "Şehir hayatı çok yoğun." },
            { source: "überfüllt / voll", target: "kalabalık" },
            { source: "ruhig", target: "sakin" },
            { source: "der Lärm", target: "gürültü" },
            { source: "der Verkehr", target: "trafik" },
            { source: "die Natur", target: "doğa" },
            { source: "der Vorteil", target: "avantaj" },
            { source: "der Nachteil", target: "dezavantaj" },
            { source: "bevorzugen", target: "tercih etmek", exampleSource: "Ich bevorzuge ein ruhiges Leben.", exampleTarget: "Sakin bir hayatı tercih ederim." },
            { source: "die Miete", target: "kira" },
            { source: "das Stadtzentrum", target: "şehir merkezi" },
            { source: "zu Fuß gehen", target: "yürümek" },
            { source: "sich entscheiden", target: "karar vermek", exampleSource: "Ich habe mich entschieden.", exampleTarget: "Karar verdim." },
            { source: "die Möglichkeit", target: "imkan" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Şehir hayatı köy hayatından daha kalabalık“?",
                audioText: "Şehir hayatı köy hayatından daha kalabalık.",
                options: ["Das Stadtleben ist voller als das Dorfleben.", "Das Dorf ist größer als die Stadt.", "In der Stadt gibt es keine Menschen.", "Das Dorfleben ist teurer."],
                correctIndex: 0,
                explanation: "Vergleich mit -dan + daha (Unit 2); „kalabalık“ = voll/überfüllt.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Stadt-Land-Wörter zu.",
                pairs: [
                  { source: "überfüllt", target: "kalabalık" },
                  { source: "ruhig", target: "sakin" },
                  { source: "der Lärm", target: "gürültü" },
                  { source: "der Verkehr", target: "trafik" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Şehirde iş ___ var ama kira çok pahalı.",
                options: ["imkanı", "gürültüsü", "trafiği"],
                solution: "imkanı",
                translation: "In der Stadt gibt es Job-Möglichkeiten, aber die Miete ist sehr teuer.",
                explanation: "„imkan“ = Möglichkeit; „kira“ = Miete – der klassische Stadt-Kompromiss.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich bevorzuge ein ruhiges Leben.“",
                tokens: ["Sakin", "bir", "hayatı", "tercih", "ederim."],
                solution: "Sakin bir hayatı tercih ederim.",
                translation: "Ich bevorzuge ein ruhiges Leben.",
                explanation: "„tercih etmek“ + Akkusativ; Aorist „ederim“ für die allgemeine Vorliebe.",
                audioText: "Sakin bir hayatı tercih ederim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Jeder Ort hat Vorteile und Nachteile.",
                solution: "Her yerin avantajları ve dezavantajları var",
                altSolutions: ["Her yerin avantajları ve dezavantajları var.", "Her yerin avantajı ve dezavantajı var", "Her yerin avantajı ve dezavantajı var."],
                hint: "jeder-Ort + Vorteile + und + Nachteile + es-gibt",
                explanation: "„avantaj“ / „dezavantaj“ – internationale Wörter, türkisch dekliniert.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Şehir merkezinde oturuyorum. Her yere yürüyorum, araba lazım değil.",
                question: "Welchen Vorteil nennt die Person?",
                options: ["Sie kann überall zu Fuß hingehen.", "Die Miete ist billig.", "Es gibt keinen Lärm."],
                correctIndex: 0,
                explanation: "„her yere yürüyorum“ = ich gehe überall zu Fuß hin; „şehir merkezi“ = Stadtzentrum.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Gerücht & Einordnung zu (Lektion 18).",
                pairs: [
                  { source: "sicher (überzeugt)", target: "emin" },
                  { source: "falsch", target: "yanlış" },
                  { source: "das Thema", target: "konu" },
                  { source: "eigentlich", target: "aslında" },
                  { source: "die Lüge", target: "yalan" },
                  { source: "na ja / egal", target: "neyse" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Karar verdim: şehir merkezine taşınıyorum! Kira pahalı, trafik ve gürültü var – ama iş imkanı çok. Aslında doğayı seviyorum, neyse, hafta sonu köye giderim.",
                translation: "Ich habe mich entschieden: Ich ziehe ins Stadtzentrum! Die Miete ist teuer, es gibt Verkehr und Lärm – aber viele Job-Möglichkeiten. Eigentlich liebe ich die Natur, na ja, am Wochenende fahre ich ins Dorf.",
                tip: "🔁 „taşınmak“ (Lektion 16), „aslında“/„neyse“ (Lektion 18), „köy“ (Unit 4) – plus der neue Stadt-Wortschatz.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Umziehen – aber wohin?",
                scene: "Dein Freund Cem überlegt, aufs Land zu ziehen.",
                turns: [
                  { speaker: "Cem", text: "Şehir hayatından yoruldum. Köye taşınmak istiyorum. Sence?", translation: "Ich bin das Stadtleben leid. Ich will aufs Dorf ziehen. Was meinst du?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bence köy sakin ve doğa güzel, ama iş imkanı az.", correct: true, feedback: "Perfekt abgewogen – Vorteil UND Nachteil genannt, mit „bence“." },
                      { text: "Kesinlikle hayır! Yanlış karar!", correct: false, feedback: "Zu hart – wäge lieber Vor- und Nachteile ab, statt zu urteilen." },
                      { text: "Dizi izliyor musun?", correct: false, feedback: "Serien? Cem braucht gerade deinen Rat zum Umzug." },
                    ],
                  },
                  { speaker: "Cem", text: "Haklısın. Ama burada trafik, gürültü, kalabalık … Ve kira çok yüksek!", translation: "Du hast recht. Aber hier: Verkehr, Lärm, Menschenmassen … Und die Miete ist sehr hoch!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "O zaman küçük bir şehri tercih et – ikisinin avantajları var.", correct: true, feedback: "Kluger Kompromiss – „tercih etmek“ souverän eingesetzt." },
                      { text: "Parası olan konuşur.", correct: false, feedback: "Ein Spruch hilft Cem nicht – mach einen konstruktiven Vorschlag." },
                    ],
                  },
                  { speaker: "Cem", text: "Çok iyi fikir! Bu hafta sonu karar veririm.", translation: "Sehr gute Idee! Dieses Wochenende entscheide ich mich." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u7-l2",
          title: "Umwelt schützen",
          intro:
            "Müll trennen, Energie sparen, Natur schützen: Sprich über Umweltthemen – auf Türkisch.",
          grammarTip:
            "Verbote/Aufforderungen an Freunde: Verneinter Imperativ mit -ma/-me: „Çöpü yere atma!“ = Wirf den Müll nicht auf den Boden! Ratschläge weiter mit -malı (Unit 2): „Enerji tasarrufu yapmalıyız“ = Wir sollten Energie sparen.",
          vocab: [
            { source: "die Umwelt", target: "çevre", exampleSource: "Wir müssen die Umwelt schützen.", exampleTarget: "Çevreyi korumalıyız." },
            { source: "der Müll", target: "çöp" },
            { source: "das Recycling", target: "geri dönüşüm" },
            { source: "das Plastik", target: "plastik" },
            { source: "schützen", target: "korumak" },
            { source: "schmutzig", target: "kirli" },
            { source: "die Energie", target: "enerji" },
            { source: "sparen", target: "tasarruf etmek" },
            { source: "werfen / wegwerfen", target: "atmak", exampleSource: "Wirf den Müll nicht auf den Boden!", exampleTarget: "Çöpü yere atma!" },
            { source: "natürlich (Natur-)", target: "doğal" },
            { source: "die Luftverschmutzung", target: "hava kirliliği" },
            { source: "das Klima", target: "iklim" },
            { source: "schaden", target: "zarar vermek", exampleSource: "Plastik schadet der Natur.", exampleTarget: "Plastik doğaya zarar veriyor." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Çöpü yere atma!“?",
                audioText: "Çöpü yere atma!",
                options: ["Wirf den Müll nicht auf den Boden!", "Bring den Müll nach unten!", "Der Müll liegt auf dem Boden.", "Wirf den Müll weg!"],
                correctIndex: 0,
                explanation: "„atma“ = wirf nicht (verneinter Imperativ -ma); „yere“ = auf den Boden.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Umwelt-Wörter zu.",
                pairs: [
                  { source: "die Umwelt", target: "çevre" },
                  { source: "der Müll", target: "çöp" },
                  { source: "das Recycling", target: "geri dönüşüm" },
                  { source: "das Klima", target: "iklim" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Plastik doğaya çok ___ veriyor.",
                options: ["zarar", "tasarruf", "enerji"],
                solution: "zarar",
                translation: "Plastik schadet der Natur sehr.",
                explanation: "„zarar vermek“ = schaden (wörtlich: Schaden geben); Dativ „doğaya“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Wir müssen die Umwelt schützen.“",
                tokens: ["Çevreyi", "korumalıyız."],
                solution: "Çevreyi korumalıyız.",
                translation: "Wir müssen die Umwelt schützen.",
                explanation: "„korumak“ + -malıyız (wir müssen, Unit 2) + Akkusativ „çevreyi“.",
                audioText: "Çevreyi korumalıyız.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wir sollten Energie sparen.",
                solution: "Enerji tasarrufu yapmalıyız",
                altSolutions: ["Enerji tasarrufu yapmalıyız.", "Enerjiden tasarruf etmeliyiz", "Enerji tasarruf etmeliyiz"],
                hint: "Energie + Sparen + wir-sollten-machen",
                explanation: "„enerji tasarrufu yapmak“ = Energie sparen – feste Wendung.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Büyük şehirlerde hava kirliliği çok ciddi bir sorun.",
                question: "Welches Problem wird genannt?",
                options: ["Luftverschmutzung in Großstädten", "zu viel Müll im Meer", "teurer Strom"],
                correctIndex: 0,
                explanation: "„hava kirliliği“ = Luftverschmutzung; „ciddi“ (ernst) recycelt Lektion 18.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Stadt & Land zu (Lektion 19).",
                pairs: [
                  { source: "das Leben", target: "hayat" },
                  { source: "die Natur", target: "doğa" },
                  { source: "der Vorteil", target: "avantaj" },
                  { source: "die Miete", target: "kira" },
                  { source: "die Möglichkeit", target: "imkan" },
                  { source: "zu Fuß gehen", target: "yürümek" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dünyamızı korumalıyız: çöpleri geri dönüşüme atmalıyız, plastik kullanmamalıyız, enerji tasarrufu yapmalıyız. Doğal bir hayat, temiz bir çevre – bence en önemli konu bu.",
                translation: "Wir müssen unsere Erde schützen: Müll ins Recycling werfen, kein Plastik benutzen, Energie sparen. Ein natürliches Leben, eine saubere Umwelt – für mich das wichtigste Thema.",
                tip: "🔁 „önemli“, „konu“ (Lektion 18) + dreimal -malı hintereinander – hör dir den Rhythmus an.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Der Müll-Streit",
                scene: "Im Park wirft jemand seinen Müll neben die Bank – Cem schaut dich an.",
                turns: [
                  { speaker: "Cem", text: "Gördün mü? Çöpünü yere attı!", translation: "Hast du das gesehen? Er hat seinen Müll auf den Boden geworfen!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok ayıp. Doğaya zarar veriyor.", correct: true, feedback: "Genau – ruhig benannt, warum es falsch ist." },
                      { text: "Neyse, önemli değil.", correct: false, feedback: "Doch, wichtig – Umweltschutz beginnt im Park." },
                      { text: "Ben de atıyorum bazen.", correct: false, feedback: "Keine gute Beichte – sag lieber, warum das schadet." },
                    ],
                  },
                  { speaker: "Cem", text: "Ona bir şey söyleyelim mi?", translation: "Sollen wir ihm etwas sagen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet ama kibarca: Affedersiniz, çöpü yere atmamalısınız.", correct: true, feedback: "Perfekt – höflich (affedersiniz) plus -malı in der Verneinung." },
                      { text: "Evet: Sen çok kirli bir insansın!", correct: false, feedback: "Beleidigungen eskalieren nur – bleib höflich und sachlich." },
                    ],
                  },
                  { speaker: "Cem", text: "Güzel söyledin. Bak, çöpünü aldı ve geri dönüşüm kutusuna attı!", translation: "Gut gesagt. Schau, er hat seinen Müll genommen und in die Recycling-Tonne geworfen!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u7-l3",
          title: "Unser Viertel gemeinsam",
          intro:
            "Vom Reden ins Tun: Organisiere mit den Nachbarn eine Aktion für euer Viertel.",
          grammarTip:
            "Gemeinsame Pläne schmieden: „-alım/-elim“ (lass uns, Unit 5) + neue Aktions-Wörter: „Bir kampanya düzenleyelim“ = Lass uns eine Kampagne organisieren. Formell schreiben: „Belediyeye mektup yazalım“ = Schreiben wir der Stadtverwaltung einen Brief.",
          vocab: [
            { source: "die Stadtverwaltung", target: "belediye", exampleSource: "Schreiben wir der Stadtverwaltung einen Brief!", exampleTarget: "Belediyeye mektup yazalım!" },
            { source: "das Tier", target: "hayvan" },
            { source: "das Fahrrad", target: "bisiklet" },
            { source: "öffentliche Verkehrsmittel", target: "toplu taşıma" },
            { source: "die Kampagne / Aktion", target: "kampanya" },
            { source: "freiwillig / der Freiwillige", target: "gönüllü" },
            { source: "die Unterschrift", target: "imza", exampleSource: "Wir sammeln Unterschriften.", exampleTarget: "İmza topluyoruz." },
            { source: "organisieren", target: "düzenlemek" },
            { source: "der Vorschlag", target: "öneri" },
            { source: "der Brief", target: "mektup" },
            { source: "sich kennenlernen", target: "tanışmak", exampleSource: "Freut mich, Sie kennenzulernen.", exampleTarget: "Tanıştığımıza memnun oldum." },
            { source: "die Reinigung / das Saubermachen", target: "temizlik", exampleSource: "Wir machen eine Straßenreinigung.", exampleTarget: "Sokak temizliği yapıyoruz." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bir kampanya düzenleyelim“?",
                audioText: "Bir kampanya düzenleyelim.",
                options: ["Lass uns eine Kampagne organisieren.", "Die Kampagne ist vorbei.", "Ich arbeite bei einer Kampagne.", "Die Kampagne war teuer."],
                correctIndex: 0,
                explanation: "„düzenlemek“ = organisieren + -elim (lass uns, Unit 5).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Aktions-Wörter zu.",
                pairs: [
                  { source: "die Stadtverwaltung", target: "belediye" },
                  { source: "die Kampagne", target: "kampanya" },
                  { source: "die Unterschrift", target: "imza" },
                  { source: "der Brief", target: "mektup" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sokak hayvanları için ___ topluyoruz.",
                options: ["imza", "bisiklet", "mektup"],
                solution: "imza",
                translation: "Für die Straßentiere sammeln wir Unterschriften.",
                explanation: "„imza toplamak“ = Unterschriften sammeln; „hayvan“ = Tier.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Mein Vorschlag: mehr Fahrradwege.“",
                tokens: ["Önerim:", "daha", "çok", "bisiklet", "yolu."],
                solution: "Önerim: daha çok bisiklet yolu.",
                translation: "Mein Vorschlag: mehr Fahrradwege.",
                explanation: "„öneri“ + -m = mein Vorschlag; „daha çok“ = mehr (Unit 2).",
                audioText: "Önerim: daha çok bisiklet yolu.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Lass uns der Stadtverwaltung einen Brief schreiben!",
                solution: "Belediyeye mektup yazalım",
                altSolutions: ["Belediyeye mektup yazalım!", "Belediyeye bir mektup yazalım", "Belediyeye bir mektup yazalım!"],
                hint: "Stadtverwaltung-Dativ + Brief + lass-uns-schreiben",
                explanation: "Dativ „belediyeye“ (an die Stadtverwaltung) + „yazalım“ (lass uns schreiben).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Cumartesi gönüllülerle sokak temizliği yapıyoruz, sen de gel!",
                question: "Was ist am Samstag geplant?",
                options: ["eine Straßenreinigung mit Freiwilligen", "ein Fahrradrennen", "ein Besuch bei der Stadtverwaltung"],
                correctIndex: 0,
                explanation: "„gönüllü“ = Freiwillige/r; „sokak temizliği“ = Straßenreinigung.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Umwelt zu (Lektion 20).",
                pairs: [
                  { source: "die Umwelt", target: "çevre" },
                  { source: "der Müll", target: "çöp" },
                  { source: "schützen", target: "korumak" },
                  { source: "die Energie", target: "enerji" },
                  { source: "die Welt", target: "dünya" },
                  { source: "natürlich (Natur-)", target: "doğal" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Mahallede yeni komşularla tanıştık. Gönüllü olarak bir kampanya düzenliyoruz: sokak hayvanları için su, çevre için temizlik. Belediyeye de bir öneri mektubu yazdık – toplu taşıma ve bisiklet yolları için imza topluyoruz.",
                translation: "Im Viertel haben wir neue Nachbarn kennengelernt. Als Freiwillige organisieren wir eine Aktion: Wasser für die Straßentiere, Saubermachen für die Umwelt. Der Stadtverwaltung haben wir auch einen Vorschlagsbrief geschrieben – für öffentliche Verkehrsmittel und Radwege sammeln wir Unterschriften.",
                tip: "🔁 „komşu“ (Lektion 16), „çevre“/„temizlik“-Ideen (Lektion 20) – der ganze Aktions-Wortschatz im Einsatz.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die Nachbarschaftsaktion",
                scene: "Beim Nachbarschaftstreffen stellst du deine Idee vor.",
                turns: [
                  { speaker: "Fatma", text: "Hoş geldin! Yeni komşumuzla tanıştın mı?", translation: "Willkommen! Hast du unseren neuen Nachbarn kennengelernt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, tanıştık. Arkadaşlar, bir önerim var!", correct: true, feedback: "Perfekt – kurz bestätigt und direkt zur Idee („önerim var“)." },
                      { text: "Hayır, kimseyle konuşmam.", correct: false, feedback: "„Ich rede mit niemandem“ – schwieriger Start für eine Nachbarschaftsaktion." },
                      { text: "Kira ne kadar?", correct: false, feedback: "Die Miete des Nachbarn geht dich nichts an – stell deine Idee vor." },
                    ],
                  },
                  { speaker: "Fatma", text: "Tabii, dinliyoruz!", translation: "Klar, wir hören zu!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Cumartesi sokak temizliği düzenleyelim. Gönüllü var mı?", correct: true, feedback: "Stark – konkreter Vorschlag mit -elim plus Freiwilligen-Frage." },
                      { text: "Her şey kötü, kimse bir şey yapmıyor.", correct: false, feedback: "Nur meckern bringt nichts – mach einen konkreten Vorschlag." },
                    ],
                  },
                  { speaker: "Fatma", text: "Harika fikir! Ben gönüllüyüm. Belediyeye de haber verelim, belki çöp kutuları getirirler.", translation: "Tolle Idee! Ich bin dabei. Sagen wir auch der Stadtverwaltung Bescheid, vielleicht bringen sie Mülltonnen." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Süper! Ben de bir mektup yazarım, herkes imza atar.", correct: true, feedback: "Wunderbar – Brief plus Unterschriften: die Aktion steht!" },
                      { text: "Belediye hiçbir şey yapmaz, boş ver.", correct: false, feedback: "So pessimistisch? Ein Brief kostet nichts – versucht es." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        // Wiederhol-/Festigungs-Lektionen (Muster wie A1 u6-l4/l5, A2 u7-l4/l5):
        // recyceln den Wortschatz der Units 6–7 in neuen Kontexten. Kein neuer Stoff.
        {
          slug: "tr-b1-u7-l4",
          title: "Wiederholung I: Neuigkeiten, Medien & Stadt",
          intro:
            "Großer Rückblick, Teil 1: Gerüchte, Serien, Stadtleben und Umwelt – alles noch da?",
          grammarTip:
            "Denk an den Unterschied -di (selbst erlebt) vs. -miş (gehört): „evlendi“ vs. „evlenmiş“. Und an die Meinungs-Werkzeuge: bence, emin misin, bana göre – jetzt alles zusammen im Einsatz.",
          vocab: [
            { source: "der Klatsch", target: "dedikodu" },
            { source: "die Umwelt", target: "çevre" },
            { source: "die Stadtverwaltung", target: "belediye" },
            { source: "die Serie", target: "dizi" },
          ],
          exercises: [
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Medien-Wörter zu.",
                pairs: [
                  { source: "die Zeitung", target: "gazete" },
                  { source: "der Fernseher", target: "televizyon" },
                  { source: "das Video", target: "video" },
                  { source: "die Werbung", target: "reklam" },
                  { source: "der Sender", target: "kanal" },
                  { source: "die Serie", target: "dizi" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Stadt- und Umwelt-Wörter zu.",
                pairs: [
                  { source: "überfüllt", target: "kalabalık" },
                  { source: "der Lärm", target: "gürültü" },
                  { source: "der Verkehr", target: "trafik" },
                  { source: "der Müll", target: "çöp" },
                  { source: "das Plastik", target: "plastik" },
                  { source: "das Fahrrad", target: "bisiklet" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Duydun mu? Ayşe ___ – galiba düğün yazın!",
                options: ["evlenmiş", "taşınmış", "şaşırmış"],
                solution: "evlenmiş",
                translation: "Hast du gehört? Ayşe hat wohl geheiratet – die Hochzeit ist vermutlich im Sommer!",
                explanation: "Gehörte Neuigkeit → miş-Form: evlenmiş. „galiba“ = vermutlich.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Was hältst du von dem Gerücht?",
                audioText: "Bu dedikoduya kimse inanmıyor, kesinlikle yalan – ama sohbet eğlenceliydi.",
                options: [
                  "Niemand glaubt es, es ist sicher gelogen – aber der Plausch war unterhaltsam.",
                  "Alle glauben es sofort.",
                  "Es ist wahr und sehr wichtig.",
                  "Das Gespräch war langweilig.",
                ],
                correctIndex: 0,
                explanation: "„kimse inanmıyor“ = niemand glaubt es; „kesinlikle yalan“ = definitiv gelogen.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Lasst uns der Stadtverwaltung unbedingt einen Vorschlagsbrief schreiben.“",
                tokens: ["Belediyeye", "mutlaka", "bir", "öneri", "mektubu", "yazalım."],
                solution: "Belediyeye mutlaka bir öneri mektubu yazalım.",
                translation: "Lasst uns der Stadtverwaltung unbedingt einen Vorschlagsbrief schreiben.",
                explanation: "„öneri mektubu“ = Vorschlagsbrief; „mutlaka“ = unbedingt.",
                audioText: "Belediyeye mutlaka bir öneri mektubu yazalım.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Şehir hayatının dezavantajı kalabalık ve gürültü; köy ise ___ ve doğal.",
                options: ["sakin", "kirli", "ünlü"],
                solution: "sakin",
                translation: "Der Nachteil des Stadtlebens sind Menschenmassen und Lärm; das Dorf dagegen ist ruhig und natürlich.",
                explanation: "„sakin“ = ruhig – das Gegenprogramm zur Großstadt.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Die Stadtverwaltung sucht Freiwillige für die Straßenreinigung.",
                solution: "Belediye sokak temizliği için gönüllü arıyor",
                altSolutions: ["Belediye sokak temizliği için gönüllü arıyor.", "Belediye, sokak temizliği için gönüllü arıyor", "Belediye sokak temizligi için gönüllü arıyor"],
                hint: "Stadtverwaltung + Straßenreinigung + für + Freiwillige + sucht",
                explanation: "„gönüllü aramak“ = Freiwillige suchen; „temizlik“ = Reinigung.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Ünlü bir kanalı takip ediyorum. Dün sosyal medyada eğlenceli bir video ve birkaç fotoğraf paylaştım, yorumlar harika.",
                question: "Was hat die Person gestern geteilt?",
                options: ["ein unterhaltsames Video und einige Fotos", "einen langen Zeitungsartikel", "nichts – sie schaut nur"],
                correctIndex: 0,
                explanation: "„paylaştım“ = ich teilte; „yorumlar harika“ = die Kommentare sind großartig.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Şehir merkezinde oturmak bir tercih: kira yüksek ama her imkan var, işe yürümek mümkün – ben kararımı verdim. Ve aslında her şey belli: iklim değişiyor, hava kirliliği artıyor, sokaklar kirli. Çevreyi korumak önemli – çöpü yere atmak ayıp, geri dönüşüm şart. Enerji tasarrufu yapmalıyız, plastikten vazgeçmeliyiz, toplu taşıma kullanmalıyız. Bu ciddi bir konu, şaka değil – doğaya zarar vermek yok!",
                translation: "Im Stadtzentrum zu wohnen ist eine Wahl: Die Miete ist hoch, aber es gibt jede Möglichkeit, zur Arbeit kann man laufen – ich habe meine Entscheidung getroffen. Und eigentlich ist alles klar: Das Klima ändert sich, die Luftverschmutzung steigt, die Straßen sind schmutzig. Die Umwelt zu schützen ist wichtig – Müll auf den Boden zu werfen gehört sich nicht, Recycling ist Pflicht. Wir müssen Energie sparen, auf Plastik verzichten, öffentliche Verkehrsmittel nutzen. Das ist ein ernstes Thema, kein Witz – der Natur wird nicht geschadet!",
                tip: "🔁 Der komplette Umwelt-Wortschatz in einem Manifest – lies es mit Nachdruck.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Neue Nachbarn, neue Pläne",
                scene: "Fatma will alles über die neuen Nachbarn wissen – und hat von einer Aktion gehört.",
                turns: [
                  { speaker: "Fatma", text: "Yeni komşularla tanışmak istiyorum. Onlar hakkında ne biliyorsun?", translation: "Ich möchte die neuen Nachbarn kennenlernen. Was weißt du über sie?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Az şey biliyorum ama dedikodu yapmayalım.", correct: true, feedback: "Vorbildlich – neugierig ja, Klatsch nein." },
                      { text: "Her şeyi anlatırım, otur!", correct: false, feedback: "Die komplette Akte der Nachbarn? Das wäre dedikodu in Reinform." },
                    ],
                  },
                  { speaker: "Fatma", text: "Hemen anlat! Gizli mi? Emin misin? Çok şaşırdım şimdi!", translation: "Erzähl sofort! Ist es geheim? Bist du sicher? Jetzt bin ich aber überrascht!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Sakin ol! Neyse, yanlış anlama – sadece önemli bir haber var.", correct: true, feedback: "Gut gebremst – „yanlış anlama“ = versteh es nicht falsch." },
                      { text: "Evet, her şey gizli, güle güle.", correct: false, feedback: "Erst anfüttern, dann gehen? Fatma platzt vor Neugier – kläre es auf." },
                    ],
                  },
                  { speaker: "Fatma", text: "Söyle artık!", translation: "Nun sag schon!" },
                  { speaker: "Fatma", text: "… Sokak hayvanları için bir kampanya düzenlemek istiyorlarmış! İmza toplayacaklarmış. İlk duyduğumda neyse dedim, ama sonra inandım. Şehrin avantajları işte – burada sohbet ve dayanışma hiç bitmiyor.", translation: "… Sie wollen wohl eine Aktion für die Straßentiere organisieren! Sie werden Unterschriften sammeln. Als ich es zuerst hörte, dachte ich „na ja“, aber dann glaubte ich es. Das sind eben die Vorteile der Stadt – Gespräch und Zusammenhalt enden hier nie." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b1-u7-l5",
          title: "Wiederholung II: Alles zusammen",
          intro:
            "Großer Rückblick, Teil 2: von der miş-Form bis zur Nachbarschaftsaktion – dein B1-Wortschatz im Volltest.",
          grammarTip:
            "Letzte Runde: Aorist für Gewohnheiten (izlerim), -miş für Gehörtes (evlenmiş), -elim für Vorschläge (düzenleyelim), -malı für Pflichten (korumalıyız). Vier Endungen, ein souveränes B1.",
          vocab: [
            { source: "das Leben", target: "hayat" },
            { source: "die Kampagne / Aktion", target: "kampanya" },
            { source: "hören / erfahren", target: "duymak" },
            { source: "die Umwelt", target: "çevre" },
          ],
          exercises: [
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Neuigkeiten-Wörter zu.",
                pairs: [
                  { source: "hören / erfahren", target: "duymak" },
                  { source: "vermutlich", target: "galiba" },
                  { source: "heiraten", target: "evlenmek" },
                  { source: "niemand", target: "kimse" },
                  { source: "geheim", target: "gizli" },
                  { source: "der Witz", target: "şaka" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Aktions-Wörter zu.",
                pairs: [
                  { source: "das Recycling", target: "geri dönüşüm" },
                  { source: "das Plastik", target: "plastik" },
                  { source: "sparen", target: "tasarruf etmek" },
                  { source: "das Tier", target: "hayvan" },
                  { source: "freiwillig", target: "gönüllü" },
                  { source: "die Unterschrift", target: "imza" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Televizyonda reklam çok; ___ bir dizi bulamıyorum.",
                options: ["eğlenceli", "kirli", "kalabalık"],
                solution: "eğlenceli",
                translation: "Im Fernsehen ist zu viel Werbung; ich finde keine unterhaltsame Serie.",
                explanation: "„eğlenceli“ = unterhaltsam; „bulamıyorum“ = ich kann nicht finden.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Was hat die Person gemacht?",
                audioText: "Ünlü kanalı takip ediyorum: videoyu izledim ve hemen bir yorum yazdım – mutlaka paylaşın!",
                options: [
                  "Video geschaut, kommentiert und zum Teilen aufgerufen",
                  "den Kanal gelöscht",
                  "eine Beschwerde geschrieben",
                  "die Werbung übersprungen",
                ],
                correctIndex: 0,
                explanation: "„takip ediyorum“ = ich folge; „yorum yazdım“ = ich schrieb einen Kommentar.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Verkehr und Lärm sind der Nachteil des Stadtlebens.“",
                tokens: ["Trafik", "ve", "gürültü", "şehir", "hayatının", "dezavantajı."],
                solution: "Trafik ve gürültü şehir hayatının dezavantajı.",
                translation: "Verkehr und Lärm sind der Nachteil des Stadtlebens.",
                explanation: "Genitiv-Kette: şehir hayatı-nın dezavantajı = der Nachteil DES Stadtlebens.",
                audioText: "Trafik ve gürültü şehir hayatının dezavantajı.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Hava kirliliği sağlığa ___ veriyor, iklim de değişiyor.",
                options: ["zarar", "imza", "destek"],
                solution: "zarar",
                translation: "Die Luftverschmutzung schadet der Gesundheit, und das Klima ändert sich.",
                explanation: "„zarar vermek“ = schaden; „hava kirliliği“ = Luftverschmutzung.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wir wollen eine Kampagne organisieren: Die Natur zu schützen ist Pflicht.",
                solution: "Bir kampanya düzenlemek istiyoruz: doğayı korumak şart",
                altSolutions: ["Bir kampanya düzenlemek istiyoruz: doğayı korumak şart.", "Kampanya düzenlemek istiyoruz, doğayı korumak şart", "Bir kampanya düzenlemek istiyoruz, doğayı korumak şart"],
                hint: "Kampagne + organisieren + wir-wollen + Natur-schützen + Pflicht (şart)",
                explanation: "„düzenlemek“ = organisieren; „korumak şart“ = schützen ist Pflicht.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Belediyeden cevap geldi: mektubumuz ve önerimiz kabul edildi! Sokak temizliği cumartesi – kalabalık bir gönüllü grubu geliyor.",
                question: "Was hat die Stadtverwaltung entschieden?",
                options: ["Brief und Vorschlag wurden angenommen, die Reinigung findet Samstag statt.", "Der Brief wurde abgelehnt.", "Die Aktion wurde verschoben."],
                correctIndex: 0,
                explanation: "„kabul edildi“ = wurde angenommen; „kalabalık bir grup“ = eine große Gruppe.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Komşularla tanışmak çok güzeldi: samimi bir sohbet, çay – dedikodu yok! Aslında herkes çevre konusunda ciddi: çöp atmak yasak, sokaklar kirli değil, bisiklet ve toplu taşıma moda. Şehir merkezine yürümek on dakika, kira uygun, her imkan var – bu mahalleyi tercih ettim, doğru karar. Sakin bir yer, yanlış anlaşılma yok – belli ki burada hayat güzel.",
                translation: "Die Nachbarn kennenzulernen war sehr schön: ein herzliches Gespräch, Tee – kein Klatsch! Eigentlich nehmen alle die Umwelt ernst: Müll wegwerfen ist verboten, die Straßen sind nicht schmutzig, Fahrrad und öffentliche Verkehrsmittel sind in Mode. Ins Stadtzentrum läuft man zehn Minuten, die Miete ist fair, es gibt jede Möglichkeit – ich habe dieses Viertel gewählt, die richtige Entscheidung. Ein ruhiger Ort, keine Missverständnisse – offensichtlich ist das Leben hier schön.",
                tip: "🔁 Der ganze Unit-6+7-Wortschatz in einem Absatz – dein B1-Schlussakkord.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die Aktion hat gewirkt",
                scene: "Wochen später: Fatma strahlt – eure Kampagne zeigt Ergebnisse.",
                turns: [
                  { speaker: "Fatma", text: "Duydun mu? Belediye bahçedeki kediler için su kapları getirmiş – kampanyamız gerçekleşti!", translation: "Hast du gehört? Die Stadtverwaltung hat wohl Wassernäpfe für die Katzen im Garten gebracht – unsere Aktion hat sich erfüllt!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Harika haber! İmzalar ve mektup işe yaradı.", correct: true, feedback: "Genau – Unterschriften plus Brief: Engagement wirkt." },
                      { text: "İnanmıyorum, kesinlikle yalan.", correct: false, feedback: "Diesmal ist es keine dedikodu – Fatma hat es selbst gesehen." },
                    ],
                  },
                  { speaker: "Fatma", text: "Üstelik yeni komşu gönüllü oldu. Galiba iyi arkadaş olacağız – bu mahallede kimse yalnız kalmıyor.", translation: "Obendrein ist der neue Nachbar Freiwilliger geworden. Vermutlich werden wir gute Freunde – in diesem Viertel bleibt niemand allein." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok sevindim! Gelecek ay ne düzenliyoruz – fotoğraf sergisi mi, doğa yürüyüşü mü?", correct: true, feedback: "Perfekt – Freude plus nächster Vorschlag. Die Nachbarschaft lebt!" },
                      { text: "Ben yokum, dizim başlıyor.", correct: false, feedback: "Die Serie kannst du aufnehmen – die Nachbarschaft nicht." },
                    ],
                  },
                  { speaker: "Fatma", text: "İkisini de yapalım! Önerini bir mektupla belediyeye ilet – artık bizi tanıyorlar.", translation: "Machen wir beides! Leite deinen Vorschlag mit einem Brief an die Stadtverwaltung weiter – die kennen uns ja jetzt." },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
