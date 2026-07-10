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
            "Etwas stört dich, aber du willst niemanden verletzen: Übe diplomatische Kritik – der B1-Abschluss.",
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
              type: "dialogue",
              content: {
                title: "Feedback für einen Freund",
                scene: "Dein Freund Kerem hat ein Essen gekocht und fragt nach deiner ehrlichen Meinung – der B1-Abschluss.",
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
                      { text: "Bence harikaydı, bir dahaki sefere birlikte yapalım mı?", correct: true, feedback: "Wunderbarer B1-Abschluss – Meinung, Vorschlag und Höflichkeit vereint. Tebrikler!" },
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
  ],
};
