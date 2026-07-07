import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs Deutsch → Türkisch, Level A1.
 * Didaktik nach Babbel-Methode:
 * - thematische Units mit Alltagssituationen
 * - feste Lektions-Dramaturgie: Einführung → kontrolliertes Üben →
 *   aktive Produktion → Dialog → expliziter Grammatik-Tipp
 * - Recycling: spätere Lektionen verwenden Wörter/Strukturen früherer Lektionen
 *
 * Neue Kurse: einfach eine weitere Datei nach diesem Schema anlegen und
 * in prisma/seed.ts registrieren (siehe README).
 */
export const courseDeTrA1: SeedCourse = {
  slug: "tr-a1-alltag",
  title: "Türkisch A1 – Erste Schritte",
  description:
    "Begrüßen, sich vorstellen, bestellen und nach dem Weg fragen – die wichtigsten Alltagssituationen auf Türkisch.",
  level: "A1",
  sourceLang: "de",
  targetLang: "tr",
  isPremium: false,
  units: [
    // ================================================================
    // UNIT 1: Merhaba! – Begrüßen & sich vorstellen
    // ================================================================
    {
      title: "Merhaba! – Begrüßen & sich vorstellen",
      description: "Hallo sagen, nach dem Befinden fragen und dich vorstellen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u1-l1",
          title: "Hallo und Tschüss",
          intro:
            "Du triffst eine Bekannte auf der Straße: Lerne, auf Türkisch zu grüßen, nach dem Befinden zu fragen und dich zu verabschieden.",
          grammarTip:
            "Türkisch kennt keine Artikel und kein grammatisches Geschlecht – „merhaba“ passt immer. „Nasılsın?“ ist das Du, „Nasılsınız?“ die höfliche Sie-Form.",
          cultureTip:
            "Beim Abschied sagt die Person, die geht, „Hoşça kal!“ – die Person, die bleibt, antwortet „Güle güle!“.",
          vocab: [
            { source: "Hallo", target: "merhaba", exampleSource: "Hallo! Wie geht es dir?", exampleTarget: "Merhaba! Nasılsın?" },
            { source: "Guten Morgen", target: "günaydın" },
            { source: "Guten Abend", target: "iyi akşamlar" },
            { source: "Wie geht es dir?", target: "Nasılsın?" },
            { source: "Mir geht es gut", target: "iyiyim", exampleSource: "Mir geht es gut, danke.", exampleTarget: "İyiyim, teşekkürler." },
            { source: "danke", target: "teşekkürler" },
            { source: "Tschüss (wenn man geht)", target: "hoşça kal" },
            { source: "Tschüss (wenn man bleibt)", target: "güle güle" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „merhaba“?",
                audioText: "Merhaba!",
                options: ["Hallo", "Danke", "Tschüss", "Bitte"],
                correctIndex: 0,
                explanation: "„Merhaba“ ist der universelle Gruß – er passt zu jeder Tageszeit und zu jeder Person.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Es ist 8 Uhr morgens. Wie grüßt du?",
                audioText: "Günaydın!",
                options: ["Günaydın!", "İyi akşamlar!", "Güle güle!", "Teşekkürler!"],
                correctIndex: 0,
                explanation: "„Günaydın“ heißt wörtlich „der Tag ist hell“ – Guten Morgen!",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Paare zu.",
                pairs: [
                  { source: "Hallo", target: "merhaba" },
                  { source: "Guten Morgen", target: "günaydın" },
                  { source: "Guten Abend", target: "iyi akşamlar" },
                  { source: "danke", target: "teşekkürler" },
                ],
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie fragst du eine Freundin: „Wie geht es dir?“",
                options: ["Nasılsın?", "Hoşça kal?", "İyiyim?", "Günaydın?"],
                correctIndex: 0,
                explanation: "„Nasılsın?“ = „Wie geht es dir?“ – unter Freunden. Höflich wäre „Nasılsınız?“.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "___, teşekkürler. Sen nasılsın?",
                options: ["İyiyim", "Merhaba", "Güle güle"],
                solution: "İyiyim",
                translation: "Mir geht es gut, danke. Und wie geht es dir?",
                explanation: "„İyiyim“ = „mir geht es gut“ – die Standard-Antwort auf „Nasılsın?“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Mir geht es gut, wie geht es dir?“",
                tokens: ["İyiyim,", "sen", "nasılsın?"],
                solution: "İyiyim, sen nasılsın?",
                translation: "Mir geht es gut, wie geht es dir?",
                explanation: "„sen“ = „du“ betont die Rückfrage: „und DIR?“",
                audioText: "İyiyim, sen nasılsın?",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "İyi akşamlar!",
                question: "Was hörst du?",
                options: ["Guten Abend", "Guten Morgen", "Tschüss"],
                correctIndex: 0,
                explanation: "„İyi akşamlar“ = „Guten Abend“ – wörtlich „gute Abende“.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Merhaba! Nasılsın?",
                translation: "Hallo! Wie geht es dir?",
                tip: "Das türkische ı (ohne Punkt) klingt dumpf wie das e in „bitte“ – „nasılsın“ = na-sɯl-sɯn.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf der Straße",
                scene: "Du triffst deine Nachbarin Ayşe.",
                turns: [
                  { speaker: "Ayşe", text: "Merhaba! Nasılsın?", translation: "Hallo! Wie geht es dir?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "İyiyim, teşekkürler. Sen nasılsın?", correct: true, feedback: "Perfekt! Du antwortest und fragst höflich zurück." },
                      { text: "Güle güle!", correct: false, feedback: "„Güle güle“ ist ein Abschiedsgruß – hier fragt Ayşe nach deinem Befinden." },
                      { text: "Günaydın!", correct: false, feedback: "„Günaydın“ heißt „Guten Morgen“ – Ayşe möchte aber wissen, wie es dir geht." },
                    ],
                  },
                  { speaker: "Ayşe", text: "Ben de iyiyim. Hoşça kal!", translation: "Mir geht es auch gut. Tschüss!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Güle güle!", correct: true, feedback: "Richtig! Ayşe geht, du bleibst – also sagst du „Güle güle!“." },
                      { text: "Hoşça kal!", correct: false, feedback: "„Hoşça kal“ sagt die Person, die geht. Du bleibst – also „Güle güle!“." },
                    ],
                  },
                ],
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Guten Morgen!",
                solution: "Günaydın",
                altSolutions: ["Günaydın!"],
                hint: "Ein einziges Wort reicht.",
                explanation: "„Günaydın“ – aus „gün“ (Tag) und „aydın“ (hell).",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u1-l2",
          title: "Wie heißt du?",
          intro:
            "Erster Tag im Sprachkurs: Lerne, dich vorzustellen und nach dem Namen zu fragen.",
          grammarTip:
            "Die Endung -(i)m bedeutet „mein“, -(i)n „dein“: ad (Name) → adım (mein Name), adın (dein Name). „Benim/senin“ kannst du zur Betonung dazusetzen.",
          vocab: [
            { source: "mein Name (ist)", target: "adım", exampleSource: "Mein Name ist Anna.", exampleTarget: "Benim adım Anna." },
            { source: "Wie heißt du?", target: "Adın ne?" },
            { source: "ich", target: "ben" },
            { source: "du", target: "sen" },
            { source: "Freut mich!", target: "Memnun oldum!" },
            { source: "ich auch", target: "ben de" },
            { source: "ja", target: "evet" },
            { source: "nein", target: "hayır" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Benim adım Emre“?",
                audioText: "Benim adım Emre.",
                options: ["Ich heiße Emre.", "Wie heißt du?", "Freut mich, Emre!", "Emre ist nicht da."],
                correctIndex: 0,
                explanation: "Wörtlich: „Mein Name (ist) Emre.“ – Türkisch braucht dafür kein Verb „sein“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie fragst du nach dem Namen?",
                options: ["Adın ne?", "Nasılsın?", "Memnun oldum?", "Ben de?"],
                correctIndex: 0,
                explanation: "„Adın ne?“ = wörtlich „Dein Name (ist) was?“",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Paare zu.",
                pairs: [
                  { source: "ich", target: "ben" },
                  { source: "du", target: "sen" },
                  { source: "ja", target: "evet" },
                  { source: "nein", target: "hayır" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Benim ___ Anna.",
                options: ["adım", "adın", "ne"],
                solution: "adım",
                translation: "Ich heiße Anna.",
                explanation: "Nach „benim“ (mein) braucht das Nomen die Endung -ım: adım = „mein Name“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Wie heißt du?“",
                tokens: ["Senin", "adın", "ne?"],
                solution: "Senin adın ne?",
                translation: "Wie heißt du?",
                explanation: "Das Fragewort „ne“ (was) steht am Satzende.",
                audioText: "Senin adın ne?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich heiße Deniz.",
                solution: "Benim adım Deniz",
                altSolutions: ["Adım Deniz", "Benim adım Deniz.", "Adım Deniz."],
                hint: "„Benim“ darfst du weglassen.",
                explanation: "„Adım Deniz“ reicht völlig – die Endung -ım zeigt schon „mein“ an.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Memnun oldum!",
                question: "Was hörst du?",
                options: ["Freut mich!", "Wie heißt du?", "Auf Wiedersehen!"],
                correctIndex: 0,
                explanation: "„Memnun oldum“ sagst du, wenn du jemanden kennenlernst – wörtlich „ich bin erfreut geworden“.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Benim adım Anna. Memnun oldum!",
                translation: "Ich heiße Anna. Freut mich!",
                tip: "Betone türkische Wörter leicht auf der letzten Silbe: a-DIM, ol-DUM.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Sprachkurs",
                scene: "Dein Sitznachbar Emre stellt sich vor.",
                turns: [
                  { speaker: "Emre", text: "Merhaba! Benim adım Emre. Senin adın ne?", translation: "Hallo! Ich heiße Emre. Wie heißt du?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Benim adım Lena. Memnun oldum!", correct: true, feedback: "Super! Name plus „Memnun oldum“ – die perfekte Vorstellung." },
                      { text: "Hayır, teşekkürler.", correct: false, feedback: "„Nein, danke“ passt nicht – Emre fragt nach deinem Namen." },
                      { text: "İyiyim, sen nasılsın?", correct: false, feedback: "Das ist die Antwort auf „Nasılsın?“ – Emre fragt aber nach deinem Namen." },
                    ],
                  },
                  { speaker: "Emre", text: "Ben de memnun oldum!", translation: "Freut mich auch!" },
                ],
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Emre sagt „Ben de memnun oldum“. Was heißt „ben de“?",
                options: ["ich auch", "ich nicht", "du auch", "nochmal"],
                correctIndex: 0,
                explanation: "„de“ nach einem Wort bedeutet „auch“: ben de = ich auch, sen de = du auch.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u1-l3",
          title: "Woher kommst du?",
          intro:
            "Beim Kennenlernen geht es weiter: Sag, woher du kommst, wo du wohnst und dass du Türkisch lernst.",
          grammarTip:
            "Die Endung -lI macht aus Orten Herkunft: Almanya → Almanyalı (aus Deutschland), İstanbul → İstanbullu. Der Vokal passt sich an (Vokalharmonie). Mit -(y)ım wird daraus „ich bin“: Almanyalıyım.",
          vocab: [
            { source: "Woher kommst du?", target: "Nerelisin?" },
            { source: "Deutschland", target: "Almanya" },
            { source: "die Türkei", target: "Türkiye" },
            { source: "Ich komme aus Deutschland.", target: "Almanyalıyım." },
            { source: "Wo wohnst du?", target: "Nerede oturuyorsun?" },
            { source: "ich wohne", target: "oturuyorum", exampleSource: "Ich wohne in Berlin.", exampleTarget: "Berlin'de oturuyorum." },
            { source: "Ich lerne Türkisch.", target: "Türkçe öğreniyorum." },
            { source: "ein bisschen", target: "biraz" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Nerelisin?“",
                audioText: "Nerelisin?",
                options: ["Woher kommst du?", "Wie heißt du?", "Wo ist das?", "Wie geht es dir?"],
                correctIndex: 0,
                explanation: "„Nereli“ = „von wo (stammend)“ + „-sin“ (du bist) = „Woher kommst du?“",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du: „Ich komme aus Deutschland“?",
                options: ["Almanyalıyım.", "Almanya nerede?", "Türkiye'de oturuyorum.", "Biraz Almanya."],
                correctIndex: 0,
                explanation: "Almanya + -lı (Herkunft) + -yım (ich bin) = Almanyalıyım.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Paare zu.",
                pairs: [
                  { source: "Deutschland", target: "Almanya" },
                  { source: "die Türkei", target: "Türkiye" },
                  { source: "ein bisschen", target: "biraz" },
                  { source: "ich wohne", target: "oturuyorum" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Berlin'de ___.",
                options: ["oturuyorum", "oturuyorsun", "nerelisin"],
                solution: "oturuyorum",
                translation: "Ich wohne in Berlin.",
                explanation: "-um am Ende zeigt „ich“ an: oturuyorum = ich wohne. „oturuyorsun“ wäre „du wohnst“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich lerne ein bisschen Türkisch.“",
                tokens: ["Biraz", "Türkçe", "öğreniyorum."],
                solution: "Biraz Türkçe öğreniyorum.",
                translation: "Ich lerne ein bisschen Türkisch.",
                explanation: "Das Verb steht im Türkischen am Satzende.",
                audioText: "Biraz Türkçe öğreniyorum.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Woher kommst du?",
                solution: "Nerelisin",
                altSolutions: ["Nerelisin?", "Sen nerelisin?", "Sen nerelisin"],
                hint: "Ein Wort genügt.",
                explanation: "„Nerelisin?“ – kompakt wie so oft im Türkischen: ein Wort, ein ganzer Satz.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "İstanbulluyum.",
                question: "Was sagt die Person?",
                options: ["Ich komme aus Istanbul.", "Ich wohne in Izmir.", "Ich lerne Türkisch."],
                correctIndex: 0,
                explanation: "İstanbul + -lu + -yum = „Ich bin Istanbuler/in“. Achte auf die Vokalharmonie: -lu statt -lı.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Almanyalıyım ama Türkçe öğreniyorum.",
                translation: "Ich komme aus Deutschland, aber ich lerne Türkisch.",
                tip: "ö und ü wie im Deutschen; das ğ (yumuşak g) wird nicht gesprochen, es dehnt nur den Vokal davor.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Neue Bekanntschaft im Café",
                scene: "Zeynep möchte dich kennenlernen. (Erinnerst du dich an Lektion 2?)",
                turns: [
                  { speaker: "Zeynep", text: "Merhaba! Ben Zeynep. Senin adın ne?", translation: "Hallo! Ich bin Zeynep. Wie heißt du?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Benim adım Lena. Memnun oldum!", correct: true, feedback: "Genau wie in Lektion 2 – Wiederholung wirkt!" },
                      { text: "Hesap, lütfen!", correct: false, feedback: "Damit bittest du um die Rechnung – Zeynep fragt nach deinem Namen." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Nerelisin, Lena?", translation: "Woher kommst du, Lena?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Almanyalıyım. Sen nerelisin?", correct: true, feedback: "Sehr gut! Antworten und zurückfragen hält das Gespräch am Laufen." },
                      { text: "Evet, teşekkürler.", correct: false, feedback: "„Ja, danke“ beantwortet die Frage nach der Herkunft nicht." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Ben İstanbulluyum. Türkçen çok iyi!", translation: "Ich komme aus Istanbul. Dein Türkisch ist sehr gut!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkürler! Biraz Türkçe öğreniyorum.", correct: true, feedback: "Perfekter Abschluss – bescheiden und korrekt!" },
                      { text: "Hayır, sen nerelisin?", correct: false, feedback: "Die Frage hast du schon gestellt – bedank dich lieber für das Kompliment." },
                    ],
                  },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Nerede ___? – İzmir'de oturuyorum.",
                options: ["oturuyorsun", "oturuyorum", "adın"],
                solution: "oturuyorsun",
                translation: "Wo wohnst du? – Ich wohne in Izmir.",
                explanation: "In der Frage an das Du gehört -sun: oturuyorsun. Die Antwort hat -um: oturuyorum.",
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 2: Unterwegs im Alltag
    // ================================================================
    {
      title: "Unterwegs im Alltag",
      description: "Im Café bestellen, Preise verhandeln und den Weg finden.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u2-l1",
          title: "Im Café bestellen",
          intro:
            "Du sitzt in einem Café in Istanbul: Bestelle Tee oder Kaffee und bitte um die Rechnung.",
          grammarTip:
            "Türkisch ist eine SOV-Sprache: Das Verb steht am Ende. „Bir çay istiyorum“ = wörtlich „einen Tee ich-möchte“.",
          cultureTip:
            "Auf „Hoş geldiniz!“ (Willkommen!) antwortet man „Hoş bulduk!“. Und Tee wird in kleinen tulpenförmigen Gläsern serviert – çay ist Nationalgetränk.",
          vocab: [
            { source: "der Tee", target: "çay", exampleSource: "Ich möchte einen Tee, bitte.", exampleTarget: "Bir çay istiyorum, lütfen." },
            { source: "der Kaffee", target: "kahve" },
            { source: "das Wasser", target: "su" },
            { source: "die Milch", target: "süt" },
            { source: "bitte", target: "lütfen" },
            { source: "ich möchte", target: "istiyorum" },
            { source: "die Rechnung", target: "hesap" },
            { source: "Guten Appetit!", target: "Afiyet olsun!" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „çay“?",
                audioText: "Çay",
                options: ["Tee", "Kaffee", "Wasser", "Milch"],
                correctIndex: 0,
                explanation: "„Çay“ (sprich: tschai) – das wichtigste Getränk der Türkei.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Der Kellner fragt „Ne istersiniz?“. Was möchte er wissen?",
                audioText: "Ne istersiniz?",
                options: ["Was möchten Sie?", "Wie heißen Sie?", "Woher kommen Sie?", "Wie geht es Ihnen?"],
                correctIndex: 0,
                explanation: "„Ne istersiniz?“ = „Was möchten Sie?“ – die Standardfrage im Café.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Getränke zu.",
                pairs: [
                  { source: "Tee", target: "çay" },
                  { source: "Kaffee", target: "kahve" },
                  { source: "Wasser", target: "su" },
                  { source: "Milch", target: "süt" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bir çay ___, lütfen.",
                options: ["istiyorum", "oturuyorum", "öğreniyorum"],
                solution: "istiyorum",
                translation: "Ich möchte einen Tee, bitte.",
                explanation: "„istiyorum“ = „ich möchte“ – das Verb steht am Satzende (SOV).",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich möchte einen Kaffee, bitte.“",
                tokens: ["Bir", "kahve", "istiyorum,", "lütfen."],
                solution: "Bir kahve istiyorum, lütfen.",
                translation: "Ich möchte einen Kaffee, bitte.",
                explanation: "Reihenfolge: Menge – Objekt – Verb, „lütfen“ ans Ende.",
                audioText: "Bir kahve istiyorum, lütfen.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Die Rechnung, bitte.",
                solution: "Hesap lütfen",
                altSolutions: ["Hesap, lütfen.", "Hesap lütfen.", "Hesap, lütfen"],
                explanation: "„Hesap, lütfen“ – kurz und höflich. Wörter wie „der/die/das“ gibt es nicht.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bir su, lütfen.",
                question: "Was bestellt die Person?",
                options: ["ein Wasser", "einen Tee", "eine Milch"],
                correctIndex: 0,
                explanation: "„su“ = Wasser. „Bir su, lütfen“ = „Ein Wasser, bitte.“",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bir çay istiyorum, lütfen.",
                translation: "Ich möchte einen Tee, bitte.",
                tip: "ç = tsch, ü wie im Deutschen: „lütfen“ = LÜT-fen.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Çay-Garten",
                scene: "Du betrittst ein Café am Bosporus.",
                turns: [
                  { speaker: "Kellner", text: "Hoş geldiniz! Ne istersiniz?", translation: "Willkommen! Was möchten Sie?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bir çay istiyorum, lütfen.", correct: true, feedback: "Perfekt bestellt!" },
                      { text: "Ben Almanyalıyım.", correct: false, feedback: "Deine Herkunft ist hier nicht gefragt – bestell lieber etwas." },
                      { text: "Nasılsın?", correct: false, feedback: "Nett gefragt, aber der Kellner möchte deine Bestellung aufnehmen." },
                    ],
                  },
                  { speaker: "Kellner", text: "Tabii! Buyurun, çayınız. Afiyet olsun!", translation: "Natürlich! Bitte sehr, Ihr Tee. Guten Appetit!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkürler!", correct: true, feedback: "Richtig – ein Dankeschön passt immer." },
                      { text: "Güle güle!", correct: false, feedback: "Das wäre ein Abschied – bedank dich lieber für den Tee." },
                    ],
                  },
                  { speaker: "Kellner", text: "Rica ederim!", translation: "Gern geschehen!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hesap, lütfen!", correct: true, feedback: "Sehr gut – so bittest du um die Rechnung." },
                      { text: "Bir hesap istiyorum, adın ne?", correct: false, feedback: "Den Kellner nach dem Namen zu fragen ist hier unüblich – „Hesap, lütfen“ reicht." },
                    ],
                  },
                ],
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Man bringt dir dein Essen und sagt „Afiyet olsun!“. Was bedeutet das?",
                options: ["Guten Appetit!", "Das macht 5 Lira.", "Kommen Sie wieder!", "Vorsicht, heiß!"],
                correctIndex: 0,
                explanation: "„Afiyet olsun“ hört man vor, während und sogar nach dem Essen – Antwort: „Teşekkürler!“",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u2-l2",
          title: "Zahlen & Einkaufen",
          intro:
            "Auf dem Markt: Lerne die Zahlen 1–5, frag nach dem Preis und handle wie ein Profi.",
          grammarTip:
            "Nach Zahlwörtern steht immer der Singular: „iki çay“ (zwei Tee), niemals „iki çaylar“. Die Zahl macht die Menge schon klar.",
          cultureTip:
            "„Buyurun“ hörst du überall: Es bedeutet je nach Situation „Bitte sehr“, „Kommen Sie!“ oder „Ja, bitte?“.",
          vocab: [
            { source: "eins", target: "bir" },
            { source: "zwei", target: "iki" },
            { source: "drei", target: "üç" },
            { source: "vier", target: "dört" },
            { source: "fünf", target: "beş" },
            { source: "Wie viel (kostet das)?", target: "Ne kadar?" },
            { source: "teuer", target: "pahalı" },
            { source: "günstig", target: "ucuz" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „iki“?",
                audioText: "iki",
                options: ["zwei", "eins", "drei", "fünf"],
                correctIndex: 0,
                explanation: "bir = 1, iki = 2, üç = 3, dört = 4, beş = 5.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Zahlen zu.",
                pairs: [
                  { source: "eins", target: "bir" },
                  { source: "zwei", target: "iki" },
                  { source: "drei", target: "üç" },
                  { source: "fünf", target: "beş" },
                ],
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Üç çay, lütfen.",
                question: "Wie viele Tees werden bestellt?",
                options: ["drei", "zwei", "fünf"],
                correctIndex: 0,
                explanation: "„üç“ = drei. Und wieder: „üç çay“, nicht „üç çaylar“ – Singular nach Zahlen!",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu ne ___?",
                options: ["kadar", "istiyorum", "nerede"],
                solution: "kadar",
                translation: "Wie viel kostet das?",
                explanation: "„Bu ne kadar?“ = wörtlich „Das wie-viel?“ – die wichtigste Frage beim Einkaufen.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Der Verkäufer nennt den Preis und du findest ihn zu hoch. Was sagst du?",
                options: ["Çok pahalı!", "Çok ucuz!", "Afiyet olsun!", "Memnun oldum!"],
                correctIndex: 0,
                explanation: "„Çok pahalı“ = „sehr teuer“. „Çok“ verstärkt: çok ucuz = sehr günstig, çok iyi = sehr gut.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Wie viel kostet das?“",
                tokens: ["Bu", "ne", "kadar?"],
                solution: "Bu ne kadar?",
                translation: "Wie viel kostet das?",
                audioText: "Bu ne kadar?",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Zwei Tees, bitte.",
                solution: "İki çay lütfen",
                altSolutions: ["İki çay, lütfen.", "İki çay lütfen.", "İki çay, lütfen"],
                hint: "Denk an die Regel: Singular nach Zahlen!",
                explanation: "„İki çay, lütfen“ – niemals „çaylar“ nach einer Zahl.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bir, iki, üç, dört, beş.",
                translation: "Eins, zwei, drei, vier, fünf.",
                tip: "ş = sch („beş“ = besch), ç = tsch („üç“ = ütsch).",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf dem Wochenmarkt",
                scene: "Ein Verkäufer bietet Granatäpfel (nar) an.",
                turns: [
                  { speaker: "Verkäufer", text: "Buyurun! Taze nar!", translation: "Bitte sehr! Frische Granatäpfel!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Merhaba! Bu ne kadar?", correct: true, feedback: "Genau – erst grüßen, dann nach dem Preis fragen." },
                      { text: "Hesap, lütfen!", correct: false, feedback: "Die Rechnung gibt es im Café – auf dem Markt fragst du: „Bu ne kadar?“" },
                    ],
                  },
                  { speaker: "Verkäufer", text: "Beş lira.", translation: "Fünf Lira." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok ucuz! İki tane istiyorum, lütfen.", correct: true, feedback: "Stark! „tane“ = Stück: „iki tane“ = zwei Stück." },
                      { text: "Çok pahalı! Güle güle!", correct: false, feedback: "Fünf Lira sind wirklich günstig – und so abrupt geht man nicht." },
                    ],
                  },
                  { speaker: "Verkäufer", text: "Tabii, buyurun. Teşekkürler!", translation: "Natürlich, bitte sehr. Danke!" },
                ],
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Was ist das Gegenteil von „pahalı“?",
                options: ["ucuz", "çok", "kadar", "taze"],
                correctIndex: 0,
                explanation: "pahalı (teuer) ↔ ucuz (günstig).",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u2-l3",
          title: "Nach dem Weg fragen",
          intro:
            "Du suchst die Bushaltestelle: Sprich Passanten höflich an und verstehe einfache Wegbeschreibungen.",
          grammarTip:
            "Die Endung -da/-de bedeutet „in/an/auf“: sağda = rechts, solda = links. Für „Wo ist …?“ brauchst du kein Verb: „Durak nerede?“ genügt.",
          vocab: [
            { source: "Wo?", target: "Nerede?" },
            { source: "die Bushaltestelle", target: "otobüs durağı" },
            { source: "rechts", target: "sağda" },
            { source: "links", target: "solda" },
            { source: "geradeaus", target: "düz" },
            { source: "weit", target: "uzak" },
            { source: "nah", target: "yakın" },
            { source: "Entschuldigung", target: "affedersiniz" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Du möchtest jemanden auf der Straße ansprechen. Wie beginnst du?",
                audioText: "Affedersiniz!",
                options: ["Affedersiniz!", "Hesap, lütfen!", "Güle güle!", "Afiyet olsun!"],
                correctIndex: 0,
                explanation: "„Affedersiniz“ = „Entschuldigung“ – der höfliche Gesprächseinstieg.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Otobüs durağı nerede?“",
                audioText: "Otobüs durağı nerede?",
                options: ["Wo ist die Bushaltestelle?", "Wann kommt der Bus?", "Wie viel kostet der Bus?", "Ist der Bus weit?"],
                correctIndex: 0,
                explanation: "„nerede“ = wo. Kein Verb nötig: „Durak nerede?“ = „Wo ist die Haltestelle?“",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Richtungen zu.",
                pairs: [
                  { source: "rechts", target: "sağda" },
                  { source: "links", target: "solda" },
                  { source: "geradeaus", target: "düz" },
                  { source: "nah", target: "yakın" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Otobüs durağı ___?",
                options: ["nerede", "ne kadar", "nasılsın"],
                solution: "nerede",
                translation: "Wo ist die Bushaltestelle?",
                explanation: "„nerede“ fragt nach dem Ort, „ne kadar“ nach dem Preis.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Entschuldigung, wo ist die Bushaltestelle?“",
                tokens: ["Affedersiniz,", "otobüs", "durağı", "nerede?"],
                solution: "Affedersiniz, otobüs durağı nerede?",
                translation: "Entschuldigung, wo ist die Bushaltestelle?",
                audioText: "Affedersiniz, otobüs durağı nerede?",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Müze solda.",
                question: "Wo ist das Museum?",
                options: ["links", "rechts", "geradeaus"],
                correctIndex: 0,
                explanation: "„solda“ = links (sol + -da). „Müze solda“ = „Das Museum ist links.“",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Entschuldigung, wo ist die Bushaltestelle?",
                solution: "Affedersiniz otobüs durağı nerede",
                altSolutions: [
                  "Affedersiniz, otobüs durağı nerede?",
                  "Affedersiniz otobüs durağı nerede?",
                ],
                explanation: "Höflich fragen: „Affedersiniz“ + Ort + „nerede?“",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Affedersiniz, otobüs durağı nerede?",
                translation: "Entschuldigung, wo ist die Bushaltestelle?",
                tip: "„durağı“: das ğ dehnt nur das a – sprich „dura-ə“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf der Straße in Kadıköy",
                scene: "Du suchst die Bushaltestelle und sprichst eine Passantin an.",
                turns: [
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Affedersiniz, otobüs durağı nerede?", correct: true, feedback: "Höflich und präzise – genau richtig!" },
                      { text: "Sen nerelisin?", correct: false, feedback: "Nach der Herkunft fragst du Fremde besser nicht als Erstes – du suchst die Haltestelle!" },
                    ],
                  },
                  { speaker: "Passantin", text: "Düz gidin, sonra sağda.", translation: "Gehen Sie geradeaus, dann rechts." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Uzak mı?", correct: true, feedback: "Gute Nachfrage! „mı“ macht daraus eine Ja/Nein-Frage: „Ist es weit?“" },
                      { text: "Çok pahalı!", correct: false, feedback: "„Sehr teuer“ passt beim Einkaufen – hier willst du wissen, ob es weit ist." },
                    ],
                  },
                  { speaker: "Passantin", text: "Hayır, çok yakın. Beş dakika.", translation: "Nein, sehr nah. Fünf Minuten." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok teşekkürler! Hoşça kalın!", correct: true, feedback: "Perfekt! Du gehst weiter, also „Hoşça kalın“ (höfliche Form)." },
                      { text: "Afiyet olsun!", correct: false, feedback: "„Guten Appetit“ passt beim Essen – hier bedankst du dich und verabschiedest dich." },
                    ],
                  },
                ],
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "„Beş dakika“ – wie lange dauert der Weg? (Erinnerst du dich an die Zahlen?)",
                options: ["fünf Minuten", "drei Minuten", "zwei Stunden", "vier Tage"],
                correctIndex: 0,
                explanation: "„beş“ = fünf (Lektion 5!), „dakika“ = Minute.",
              },
            },
          ],
        },
      ],
    },
  ],
};

