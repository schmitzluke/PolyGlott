import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs Deutsch → Türkisch, Level A1.
 * Didaktik nach PolyGlott-Methode:
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
    // ================================================================
    // UNIT 3: Ailem – Familie & Menschen
    // Neu: Possessiv-Suffix (-m/-im „mein“) und Besitz mit var/yok.
    // ================================================================
    {
      title: "Ailem – Familie & Menschen",
      description: "Über Familie sprechen, Menschen beschreiben und sagen, was du hast.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u3-l1",
          title: "Meine Familie",
          intro:
            "Deniz zeigt dir ein Familienfoto. Lerne die wichtigsten Familienwörter – und wie aus „Mutter“ „meine Mutter“ wird.",
          grammarTip:
            "„Mein“ steckt als Endung im Wort: an ein Wort auf Vokal hängst du nur -m (anne → annem = meine Mutter, baba → babam = mein Vater). Das Wort „benim“ (mein) davor betont zusätzlich: „benim annem“.",
          cultureTip:
            "Ältere Geschwister und Respektspersonen spricht man mit „abi“ (großer Bruder) oder „abla“ (große Schwester) an – oft auch Fremde. Das ist ein Zeichen von Respekt.",
          vocab: [
            { source: "Familie", target: "aile", exampleSource: "Meine Familie ist groß.", exampleTarget: "Ailem büyük." },
            { source: "Mutter", target: "anne", exampleSource: "Das ist meine Mutter.", exampleTarget: "Bu benim annem." },
            { source: "Vater", target: "baba", exampleSource: "Mein Vater ist zu Hause.", exampleTarget: "Babam evde." },
            { source: "Kind", target: "çocuk" },
            { source: "Geschwister", target: "kardeş", exampleSource: "Ich habe ein Geschwister.", exampleTarget: "Bir kardeşim var." },
            { source: "große Schwester", target: "abla" },
            { source: "großer Bruder", target: "abi" },
            { source: "Ehepartner/-in", target: "eş" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „anne“?",
                audioText: "anne",
                options: ["Mutter", "Vater", "Kind", "Schwester"],
                correctIndex: 0,
                explanation: "„Anne“ = Mutter. „Meine Mutter“ heißt „annem“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „mein Vater“?",
                options: ["babam", "baba", "annem", "benim"],
                correctIndex: 0,
                explanation: "„Baba“ endet auf Vokal → nur -m anhängen: „babam“ = mein Vater.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Familienwörter zu.",
                pairs: [
                  { source: "Familie", target: "aile" },
                  { source: "Mutter", target: "anne" },
                  { source: "Vater", target: "baba" },
                  { source: "Kind", target: "çocuk" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu benim ___.",
                options: ["annem", "baba", "çocuk"],
                solution: "annem",
                translation: "Das ist meine Mutter.",
                explanation: "„benim“ (mein) verlangt die Endung -m am Wort: „annem“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Das ist mein Vater.“",
                tokens: ["Bu", "benim", "babam."],
                solution: "Bu benim babam.",
                translation: "Das ist mein Vater.",
                explanation: "„Bu“ = das/dies, „benim babam“ = mein Vater.",
                audioText: "Bu benim babam.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bu benim ailem.",
                question: "Was hörst du?",
                options: ["Das ist meine Familie.", "Das ist mein Vater.", "Das ist mein Kind."],
                correctIndex: 0,
                explanation: "„aile“ = Familie → „ailem“ = meine Familie.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bu benim annem.",
                translation: "Das ist meine Mutter.",
                tip: "Das ç in „çocuk“ klingt wie „tsch“. In „annem“ liegt die Betonung hinten: an-NEM.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Familienfoto",
                scene: "Deniz zeigt dir ein Foto ihrer Familie.",
                turns: [
                  { speaker: "Deniz", text: "Bak, bu benim ailem.", translation: "Schau, das ist meine Familie." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bu kim?", correct: true, feedback: "Gute Frage! „Bu kim?“ = „Wer ist das?“" },
                      { text: "Hoşça kal!", correct: false, feedback: "Das ist ein Abschiedsgruß – hier schaut ihr euch das Foto an." },
                    ],
                  },
                  { speaker: "Deniz", text: "Bu annem, bu da babam.", translation: "Das ist meine Mutter, und das ist mein Vater." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok güzel!", correct: true, feedback: "„Çok güzel!“ = „Sehr schön!“ – eine nette Reaktion." },
                      { text: "Çok pahalı!", correct: false, feedback: "„Sehr teuer“ passt beim Einkaufen, nicht zum Familienfoto." },
                    ],
                  },
                ],
              },
            },
            {
              type: "translation",
              content: {
                prompt: "meine Mutter",
                solution: "annem",
                altSolutions: ["benim annem"],
                hint: "Endung -m anhängen.",
                explanation: "„anne“ + -m = „annem“ = meine Mutter.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u3-l2",
          title: "Menschen beschreiben",
          intro:
            "Auf einer Feier lernst du neue Leute kennen. Beschreibe Menschen: Mann, Frau, jung, alt – und frage nach dem Namen.",
          grammarTip:
            "Das Adjektiv steht immer VOR dem Nomen und bekommt keine Endung: „genç adam“ = junger Mann, „yaşlı kadın“ = alte Frau. Reihenfolge wie im Deutschen.",
          cultureTip:
            "„Arkadaş“ (Freund/-in) ist geschlechtsneutral – dasselbe Wort für Freund und Freundin.",
          vocab: [
            { source: "Mann", target: "adam", exampleSource: "Wer ist der Mann?", exampleTarget: "O adam kim?" },
            { source: "Frau", target: "kadın" },
            { source: "Mädchen", target: "kız" },
            { source: "Junge", target: "erkek çocuk" },
            { source: "Freund/-in", target: "arkadaş", exampleSource: "Das ist mein Freund.", exampleTarget: "Bu benim arkadaşım." },
            { source: "Name", target: "isim", exampleSource: "Wie heißt du?", exampleTarget: "İsmin ne?" },
            { source: "jung", target: "genç" },
            { source: "alt (Person)", target: "yaşlı" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „kadın“?",
                audioText: "kadın",
                options: ["Frau", "Mann", "Kind", "Freund"],
                correctIndex: 0,
                explanation: "„Kadın“ = Frau. „Adam“ = Mann.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „junger Mann“?",
                options: ["genç adam", "adam genç", "yaşlı adam", "genç kadın"],
                correctIndex: 0,
                explanation: "Adjektiv vor dem Nomen: „genç adam“ = junger Mann.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne zu.",
                pairs: [
                  { source: "Mann", target: "adam" },
                  { source: "Frau", target: "kadın" },
                  { source: "Freund/-in", target: "arkadaş" },
                  { source: "jung", target: "genç" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "O ___ çok yaşlı.",
                options: ["adam", "genç", "isim"],
                solution: "adam",
                translation: "Der Mann ist sehr alt.",
                explanation: "„O adam“ = der/dieser Mann, „çok yaşlı“ = sehr alt.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Das ist mein Freund.“",
                tokens: ["Bu", "benim", "arkadaşım."],
                solution: "Bu benim arkadaşım.",
                translation: "Das ist mein Freund.",
                explanation: "„arkadaş“ + -ım = „arkadaşım“ = mein Freund.",
                audioText: "Bu benim arkadaşım.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "O genç bir kadın.",
                question: "Was hörst du?",
                options: ["Sie ist eine junge Frau.", "Er ist ein alter Mann.", "Das ist mein Freund."],
                correctIndex: 0,
                explanation: "„genç bir kadın“ = eine junge Frau. „bir“ = ein/eine.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "der Mann",
                solution: "adam",
                altSolutions: ["o adam"],
                hint: "Ein Wort reicht.",
                explanation: "„Adam“ = Mann. Türkisch hat keinen Artikel – „adam“ heißt „Mann“ und „der Mann“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Wer ist das?",
                scene: "Auf einer Feier fragst du Mert nach einem Gast.",
                turns: [
                  { speaker: "Mert", text: "Bak, bu benim arkadaşım.", translation: "Schau, das ist mein Freund." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "İsmi ne?", correct: true, feedback: "„İsmi ne?“ = „Wie heißt er?“ (ismi = sein Name)." },
                      { text: "Kaç lira?", correct: false, feedback: "„Wie viel Lira?“ passt beim Einkaufen." },
                    ],
                  },
                  { speaker: "Mert", text: "İsmi Can. Çok genç.", translation: "Er heißt Can. Sehr jung." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kaç yaşında?", correct: true, feedback: "„Kaç yaşında?“ = „Wie alt ist er?“" },
                      { text: "Nerede?", correct: false, feedback: "„Wo?“ – aber ihr sprecht gerade über sein Alter." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bu benim arkadaşım.",
                translation: "Das ist mein Freund.",
                tip: "ş klingt wie „sch“: „arkadaşım“ = ar-ka-da-schım.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u3-l3",
          title: "Ich habe … (var / yok)",
          intro:
            "Elif fragt dich nach Haustieren und deinem Auto. Lerne, mit „var“ (haben) und „yok“ (nicht haben) über Besitz zu sprechen.",
          grammarTip:
            "Besitz drückt Türkisch mit var/yok aus: „Benim bir arabam var.“ heißt wörtlich „mein ein Auto existiert“ = „Ich habe ein Auto.“ Verneinung mit yok: „Arabam yok.“ = „Ich habe kein Auto.“ Frage mit „var mı?“: „Araban var mı?“ = „Hast du ein Auto?“",
          vocab: [
            { source: "es gibt / vorhanden", target: "var", exampleSource: "Ich habe ein Auto.", exampleTarget: "Bir arabam var." },
            { source: "nicht da / kein", target: "yok", exampleSource: "Ich habe kein Geld.", exampleTarget: "Param yok." },
            { source: "mein", target: "benim" },
            { source: "dein", target: "senin" },
            { source: "Haus / Zuhause", target: "ev" },
            { source: "Auto", target: "araba" },
            { source: "Katze", target: "kedi", exampleSource: "Ich habe eine Katze.", exampleTarget: "Bir kedim var." },
            { source: "gibt es? / hast du?", target: "var mı?" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „var“?",
                audioText: "var",
                options: ["es gibt / vorhanden", "nicht da", "mein", "Haus"],
                correctIndex: 0,
                explanation: "„Var“ = vorhanden/es gibt – so drückt man Besitz aus.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „Ich habe kein Auto“?",
                options: ["Arabam yok.", "Arabam var.", "Araba nerede?", "Bir araba."],
                correctIndex: 0,
                explanation: "„yok“ verneint den Besitz: „Arabam yok.“ = „Ich habe kein Auto.“",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne zu.",
                pairs: [
                  { source: "Haus", target: "ev" },
                  { source: "Auto", target: "araba" },
                  { source: "mein", target: "benim" },
                  { source: "dein", target: "senin" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Benim bir kedim ___.",
                options: ["var", "yok", "benim"],
                solution: "var",
                translation: "Ich habe eine Katze.",
                explanation: "„var“ = vorhanden → „kedim var“ = ich habe eine Katze.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich habe ein Auto.“",
                tokens: ["Benim", "bir", "arabam", "var."],
                solution: "Benim bir arabam var.",
                translation: "Ich habe ein Auto.",
                explanation: "Wörtlich „mein ein Auto existiert“ – so funktioniert Besitz auf Türkisch.",
                audioText: "Benim bir arabam var.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Senin evin var mı?",
                question: "Was hörst du?",
                options: ["Hast du ein Haus?", "Ich habe ein Auto.", "Wo ist das Haus?"],
                correctIndex: 0,
                explanation: "„var mı?“ macht daraus eine Frage: „Hast du ein Haus?“",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich habe eine Katze.",
                solution: "Bir kedim var.",
                altSolutions: ["Benim bir kedim var.", "Kedim var."],
                hint: "Besitz mit „var“.",
                explanation: "„kedi“ + -m = „kedim“ (meine Katze), dazu „var“ = ich habe eine Katze.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Haustiere",
                scene: "Elif fragt dich nach Haustieren und deinem Auto.",
                turns: [
                  { speaker: "Elif", text: "Senin kedin var mı?", translation: "Hast du eine Katze?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, bir kedim var.", correct: true, feedback: "Perfekt! „Evet“ (ja) + Besitz mit „var“." },
                      { text: "Hayır, teşekkürler.", correct: false, feedback: "„Nein danke“ passt zu einem Angebot, nicht zur Frage nach der Katze." },
                    ],
                  },
                  { speaker: "Elif", text: "Ya araban? Araban var mı?", translation: "Und dein Auto? Hast du ein Auto?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hayır, arabam yok.", correct: true, feedback: "Richtig! „yok“ verneint den Besitz." },
                      { text: "Araba çok güzel.", correct: false, feedback: "„Das Auto ist schön“ – aber Elif fragt, OB du eins hast." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Benim bir kedim var.",
                translation: "Ich habe eine Katze.",
                tip: "Die Betonung liegt meist auf der letzten Silbe: ke-DİM.",
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 4: Afiyet olsun! – Essen & Trinken
    // Neu: Plural -lar/-ler, Frage-Partikel mı/mi, sevmek/istemek + leichter Akkusativ.
    // ================================================================
    {
      title: "Afiyet olsun! – Essen & Trinken",
      description: "Lebensmittel benennen, über Mahlzeiten und Hunger sprechen und sagen, was dir schmeckt.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u4-l1",
          title: "Lebensmittel",
          intro:
            "Auf dem Wochenmarkt kaufst du ein. Lerne die wichtigsten Lebensmittel – und wie man auf Türkisch die Mehrzahl bildet.",
          grammarTip:
            "Mehrzahl mit -ler oder -lar (Vokalharmonie): nach hellem Vokal (e, i, ö, ü) → -ler, nach dunklem (a, ı, o, u) → -lar. „elma“ → „elmalar“ (Äpfel), „ev“ → „evler“ (Häuser). Wichtig: Nach einer Zahl bleibt das Wort im Singular – „iki elma“ = zwei Äpfel.",
          cultureTip:
            "Brot („ekmek“) gilt als heilig – man wirft es nicht in den Müll. Altes Brot legt man separat ab oder hängt es an einen Haken an der Straße.",
          vocab: [
            { source: "Brot", target: "ekmek", exampleSource: "Wo ist das Brot?", exampleTarget: "Ekmek nerede?" },
            { source: "Käse", target: "peynir", exampleSource: "Brot und Käse.", exampleTarget: "Ekmek ve peynir." },
            { source: "Ei", target: "yumurta" },
            { source: "Apfel", target: "elma", exampleSource: "zwei Äpfel", exampleTarget: "iki elma" },
            { source: "Tomate", target: "domates" },
            { source: "Fleisch", target: "et" },
            { source: "Fisch", target: "balık" },
            { source: "Obst", target: "meyve" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „ekmek“?",
                audioText: "ekmek",
                options: ["Brot", "Käse", "Ei", "Fisch"],
                correctIndex: 0,
                explanation: "„Ekmek“ = Brot – das Grundnahrungsmittel schlechthin.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie heißt „Äpfel“ (Mehrzahl)?",
                options: ["elmalar", "elma", "elmaler", "elmalık"],
                correctIndex: 0,
                explanation: "„elma“ endet auf dunklem Vokal a → Plural mit -lar: „elmalar“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Lebensmittel zu.",
                pairs: [
                  { source: "Brot", target: "ekmek" },
                  { source: "Käse", target: "peynir" },
                  { source: "Ei", target: "yumurta" },
                  { source: "Apfel", target: "elma" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İki ___ lütfen.",
                options: ["elma", "elmalar", "et"],
                solution: "elma",
                translation: "Zwei Äpfel, bitte.",
                explanation: "Nach der Zahl „iki“ (zwei) bleibt das Wort im Singular: „iki elma“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Brot und Käse.“",
                tokens: ["Ekmek", "ve", "peynir."],
                solution: "Ekmek ve peynir.",
                translation: "Brot und Käse.",
                explanation: "„ve“ = und – verbindet zwei Wörter.",
                audioText: "Ekmek ve peynir.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Balık ve et.",
                question: "Was hörst du?",
                options: ["Fisch und Fleisch", "Brot und Käse", "Ei und Apfel"],
                correctIndex: 0,
                explanation: "„balık“ = Fisch, „et“ = Fleisch.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Ekmek, peynir, yumurta.",
                translation: "Brot, Käse, Ei.",
                tip: "Das y in „yumurta“ klingt wie das deutsche j: ju-mur-ta.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf dem Markt",
                scene: "Du stehst am Obststand. Der Verkäufer begrüßt dich.",
                turns: [
                  { speaker: "Satıcı", text: "Buyurun! Ne istersiniz?", translation: "Bitte! Was möchten Sie?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "İki elma lütfen.", correct: true, feedback: "Richtig – „iki elma“ = zwei Äpfel, nach der Zahl kein Plural!" },
                      { text: "Merhaba, nasılsın?", correct: false, feedback: "Nett, aber der Verkäufer fragt, was du kaufen möchtest." },
                    ],
                  },
                  { speaker: "Satıcı", text: "Başka?", translation: "Sonst noch etwas?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bir ekmek, teşekkürler.", correct: true, feedback: "Perfekt – ein Brot, danke." },
                      { text: "Güle güle.", correct: false, feedback: "Der Abschied kommt am Ende – bestell erst zu Ende." },
                    ],
                  },
                ],
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Fisch",
                solution: "balık",
                altSolutions: ["balik"],
                hint: "Ein Wort.",
                explanation: "„Balık“ = Fisch. Das ı (ohne Punkt) klingt dumpf.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u4-l2",
          title: "Mahlzeiten & Hunger",
          intro:
            "Am Esstisch: Sprich über Mahlzeiten, sag ob du hungrig oder satt bist – und lerne, Ja/Nein-Fragen zu bilden.",
          grammarTip:
            "Ja/Nein-Fragen bildet ein eigenes Fragewort „mı/mi/mu/mü“ (Vokalharmonie): „Aç mısın?“ = Bist du hungrig? „Tok musun?“ = Bist du satt? Das Fragewort steht getrennt, aber wird angehängt gesprochen.",
          cultureTip:
            "Vor dem Essen wünscht man „Afiyet olsun!“ (Guten Appetit) – auch Fremden im Restaurant. Nach dem Essen dankt man dem Koch mit „Elinize sağlık“ (Gesundheit für Ihre Hände).",
          vocab: [
            { source: "Frühstück", target: "kahvaltı" },
            { source: "Mittagessen", target: "öğle yemeği" },
            { source: "Abendessen", target: "akşam yemeği" },
            { source: "essen", target: "yemek" },
            { source: "trinken", target: "içmek" },
            { source: "hungrig", target: "aç", exampleSource: "Ich bin hungrig.", exampleTarget: "Açım." },
            { source: "satt", target: "tok" },
            { source: "Guten Appetit", target: "afiyet olsun" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „kahvaltı“?",
                audioText: "kahvaltı",
                options: ["Frühstück", "Mittagessen", "Abendessen", "Hunger"],
                correctIndex: 0,
                explanation: "„Kahvaltı“ = Frühstück – wörtlich „vor dem Kaffee“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du bist hungrig. Was sagst du?",
                options: ["Açım.", "Tokum.", "Afiyet olsun.", "İçmek."],
                correctIndex: 0,
                explanation: "„Açım“ = ich bin hungrig („aç“ + Endung -ım = ich bin).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne zu.",
                pairs: [
                  { source: "Frühstück", target: "kahvaltı" },
                  { source: "essen", target: "yemek" },
                  { source: "trinken", target: "içmek" },
                  { source: "hungrig", target: "aç" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sen ___ mısın?",
                options: ["aç", "tok", "yemek"],
                solution: "aç",
                translation: "Bist du hungrig?",
                explanation: "„Aç mısın?“ = Bist du hungrig? Das Fragewort „mısın“ macht die Frage.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Ich bin sehr hungrig.“",
                tokens: ["Ben", "çok", "açım."],
                solution: "Ben çok açım.",
                translation: "Ich bin sehr hungrig.",
                explanation: "„çok“ = sehr, „açım“ = ich bin hungrig.",
                audioText: "Ben çok açım.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Afiyet olsun!",
                question: "Was hörst du?",
                options: ["Guten Appetit!", "Guten Morgen!", "Bist du satt?"],
                correctIndex: 0,
                explanation: "„Afiyet olsun!“ = Guten Appetit! – vor jedem Essen.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich bin hungrig.",
                solution: "Açım.",
                altSolutions: ["Ben açım.", "acim"],
                hint: "„aç“ + Endung -ım (ich bin).",
                explanation: "„Açım“ – die Endung -ım heißt „ich bin“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Am Esstisch",
                scene: "Deine Gastmutter deckt den Tisch.",
                turns: [
                  { speaker: "Anne", text: "Afiyet olsun! Aç mısın?", translation: "Guten Appetit! Bist du hungrig?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok açım.", correct: true, feedback: "Richtig! „Evet, çok açım“ = Ja, ich bin sehr hungrig." },
                      { text: "Hayır, günaydın.", correct: false, feedback: "„Nein, guten Morgen“ passt nicht – sie fragt nach deinem Hunger." },
                    ],
                  },
                  { speaker: "Anne", text: "Buyur, ekmek ve peynir.", translation: "Bitte, Brot und Käse." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkürler, çok lezzetli!", correct: true, feedback: "„Çok lezzetli!“ = sehr lecker – eine nette Reaktion." },
                      { text: "Tokum.", correct: false, feedback: "„Ich bin satt“ passt nicht, wenn du gerade hungrig warst." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Aç mısın?",
                translation: "Bist du hungrig?",
                tip: "„mısın“ wird ans Wort angehängt gesprochen: aç-mı-sın.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u4-l3",
          title: "Was ich mag (sevmek / istemek)",
          intro:
            "Im Restaurant bestellst du und sagst, was dir schmeckt. Lerne den Unterschied zwischen „mögen“ und „möchten“.",
          grammarTip:
            "„sevmek“ = mögen/lieben, „istemek“ = wollen/möchten. Beim Mögen bekommt das Objekt die Akkusativ-Endung -ı/-i/-u/-ü: „Çayı seviyorum.“ = Ich mag (den) Tee. Beim Möchten bleibt das unbestimmte Objekt ohne Endung: „Su istiyorum.“ = Ich möchte Wasser.",
          vocab: [
            { source: "mögen / lieben", target: "sevmek", exampleSource: "Ich mag Tee.", exampleTarget: "Çayı seviyorum." },
            { source: "wollen / möchten", target: "istemek", exampleSource: "Ich möchte Wasser.", exampleTarget: "Su istiyorum." },
            { source: "lecker", target: "lezzetli" },
            { source: "süß", target: "tatlı" },
            { source: "scharf", target: "acı" },
            { source: "kalt", target: "soğuk" },
            { source: "heiß / warm", target: "sıcak" },
            { source: "Wasser", target: "su" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „seviyorum“?",
                audioText: "seviyorum",
                options: ["ich mag", "ich möchte", "lecker", "Wasser"],
                correctIndex: 0,
                explanation: "„seviyorum“ (von „sevmek“) = ich mag / ich liebe.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „Ich möchte Wasser“?",
                options: ["Su istiyorum.", "Su seviyorum.", "Su soğuk.", "Su yok."],
                correctIndex: 0,
                explanation: "„istemek“ = möchten → „Su istiyorum.“ Das unbestimmte Objekt bleibt ohne Endung.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Geschmäcker zu.",
                pairs: [
                  { source: "lecker", target: "lezzetli" },
                  { source: "süß", target: "tatlı" },
                  { source: "kalt", target: "soğuk" },
                  { source: "heiß / warm", target: "sıcak" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Çayı ___.",
                options: ["seviyorum", "istiyorum", "lezzetli"],
                solution: "seviyorum",
                translation: "Ich mag Tee.",
                explanation: "„sevmek“ verlangt die Akkusativ-Endung: „çay“ → „çayı seviyorum“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Ich möchte kaltes Wasser.“",
                tokens: ["Soğuk", "su", "istiyorum."],
                solution: "Soğuk su istiyorum.",
                translation: "Ich möchte kaltes Wasser.",
                explanation: "Das Adjektiv „soğuk“ steht vor dem Nomen „su“.",
                audioText: "Soğuk su istiyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bu çok tatlı.",
                question: "Was hörst du?",
                options: ["Das ist sehr süß.", "Das ist scharf.", "Ich mag Tee."],
                correctIndex: 0,
                explanation: "„tatlı“ = süß. „Bu çok tatlı.“ = Das ist sehr süß.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich möchte Wasser.",
                solution: "Su istiyorum.",
                altSolutions: ["Ben su istiyorum."],
                hint: "„istemek“ = möchten.",
                explanation: "„Su istiyorum.“ – unbestimmtes Objekt „su“ ohne Endung.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Restaurant",
                scene: "Der Kellner nimmt deine Bestellung auf.",
                turns: [
                  { speaker: "Garson", text: "Ne içmek istersiniz?", translation: "Was möchten Sie trinken?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Soğuk su istiyorum.", correct: true, feedback: "Klar bestellt: „Soğuk su istiyorum“ = Ich möchte kaltes Wasser." },
                      { text: "Çok pahalı.", correct: false, feedback: "„Sehr teuer“ passt nicht – der Kellner fragt, was du trinken willst." },
                    ],
                  },
                  { speaker: "Garson", text: "Tatlı ister misiniz?", translation: "Möchten Sie einen Nachtisch?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok severim!", correct: true, feedback: "„Çok severim“ = ich mag das sehr – gerne!" },
                      { text: "Hayır, açım.", correct: false, feedback: "„Nein, ich bin hungrig“ widerspricht sich – dann nimm den Nachtisch!" },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Çayı seviyorum.",
                translation: "Ich mag Tee.",
                tip: "„seviyorum“ – se-vi-yo-rum, Betonung auf der letzten Silbe.",
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 5: Saat kaç? – Zeit & Tagesablauf
    // Neu: Uhrzeit fragen/sagen, Tageszeiten & Wochentage, Präsens -iyor.
    // ================================================================
    {
      title: "Saat kaç? – Zeit & Tagesablauf",
      description: "Nach der Uhrzeit fragen, Tage und Tageszeiten benennen und deinen Tagesablauf beschreiben.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u5-l1",
          title: "Wie spät ist es?",
          intro:
            "Du bist verabredet und fragst nach der Uhrzeit. Lerne, die Zeit zu erfragen und anzugeben.",
          grammarTip:
            "„Saat kaç?“ heißt „Wie spät ist es?“ (wörtlich „Uhr wie-viel?“). Die Antwort ist „Saat + Zahl“: „Saat üç.“ = Es ist drei Uhr. Achtung: „üç saat“ (Zahl zuerst) heißt dagegen „drei Stunden“ (Dauer). „buçuk“ = halb, steht nach der vollen Stunde: „üç buçuk“ = 3:30.",
          cultureTip:
            "Das Wort „saat“ bedeutet gleichzeitig „Uhr“, „Stunde“ und „Uhrzeit“ – der Kontext klärt, was gemeint ist.",
          vocab: [
            { source: "Uhr / Stunde", target: "saat", exampleSource: "Wie spät ist es?", exampleTarget: "Saat kaç?" },
            { source: "Wie spät ist es?", target: "saat kaç?" },
            { source: "jetzt", target: "şimdi" },
            { source: "Minute", target: "dakika" },
            { source: "halb", target: "buçuk", exampleSource: "Es ist halb vier.", exampleTarget: "Saat üç buçuk." },
            { source: "früh", target: "erken" },
            { source: "spät", target: "geç" },
            { source: "Zeit", target: "zaman" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Saat kaç?“",
                audioText: "Saat kaç?",
                options: ["Wie spät ist es?", "Wie geht es dir?", "Wo ist die Uhr?", "Wie viel kostet es?"],
                correctIndex: 0,
                explanation: "„Saat kaç?“ = Wie spät ist es? – wörtlich „Uhr wie-viel?“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „Es ist drei Uhr“?",
                options: ["Saat üç.", "Üç saat.", "Saat kaç?", "Saat buçuk."],
                correctIndex: 0,
                explanation: "„Saat üç“ = drei Uhr. „Üç saat“ (Zahl zuerst) hieße „drei Stunden“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne zu.",
                pairs: [
                  { source: "Uhr / Stunde", target: "saat" },
                  { source: "jetzt", target: "şimdi" },
                  { source: "Minute", target: "dakika" },
                  { source: "spät", target: "geç" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "___ kaç?",
                options: ["Saat", "Şimdi", "Geç"],
                solution: "Saat",
                translation: "Wie spät ist es?",
                explanation: "„Saat kaç?“ – die Standardfrage nach der Uhrzeit.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Es ist halb vier.“",
                tokens: ["Saat", "üç", "buçuk."],
                solution: "Saat üç buçuk.",
                translation: "Es ist halb vier.",
                explanation: "„üç buçuk“ = 3:30. Türkisch nennt die volle Stunde (üç = drei) + „buçuk“ (halb).",
                audioText: "Saat üç buçuk.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Şimdi saat geç.",
                question: "Was hörst du?",
                options: ["Es ist jetzt spät.", "Es ist noch früh.", "Wie spät ist es?"],
                correctIndex: 0,
                explanation: "„şimdi“ = jetzt, „geç“ = spät.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wie spät ist es?",
                solution: "Saat kaç?",
                altSolutions: ["saat kac"],
                hint: "wörtlich: Uhr wie-viel?",
                explanation: "„Saat kaç?“ – die feste Frage nach der Uhrzeit.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Verabredung",
                scene: "Du wartest mit einer Freundin und sie fragt nach der Zeit.",
                turns: [
                  { speaker: "Arkadaş", text: "Şimdi saat kaç?", translation: "Wie spät ist es jetzt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Saat iki.", correct: true, feedback: "„Saat iki“ = Es ist zwei Uhr." },
                      { text: "İki saat.", correct: false, feedback: "„İki saat“ = zwei Stunden (Dauer). Uhrzeit: „Saat iki“." },
                    ],
                  },
                  { speaker: "Arkadaş", text: "Çok geç mi?", translation: "Ist es sehr spät?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hayır, erken.", correct: true, feedback: "„Hayır, erken“ = Nein, es ist früh." },
                      { text: "Evet, teşekkürler.", correct: false, feedback: "„Ja, danke“ passt nicht zur Frage nach der Zeit." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Saat kaç?",
                translation: "Wie spät ist es?",
                tip: "„kaç“ endet auf ç = „tsch“: gesprochen „katsch“.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u5-l2",
          title: "Tageszeiten & Wochentage",
          intro:
            "Plane die Woche: Lerne Tageszeiten, die Wochentage und wie man nach dem Tag fragt.",
          grammarTip:
            "Tageszeiten: „sabah“ (Morgen), „öğle“ (Mittag), „akşam“ (Abend), „gece“ (Nacht). „bugün“ = heute (bu = dieser + gün = Tag), „yarın“ = morgen, „dün“ = gestern. Wochentage: Pazartesi (Mo), Salı (Di), … Pazar (So).",
          cultureTip:
            "„İyi geceler“ (Gute Nacht) sagt man beim Schlafengehen; „iyi akşamlar“ (Guten Abend) zur Begrüßung am Abend.",
          vocab: [
            { source: "Morgen(s)", target: "sabah" },
            { source: "Mittag", target: "öğle" },
            { source: "Abend", target: "akşam" },
            { source: "Nacht", target: "gece" },
            { source: "Tag", target: "gün" },
            { source: "Woche", target: "hafta" },
            { source: "heute", target: "bugün" },
            { source: "morgen (Tag)", target: "yarın" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „sabah“?",
                audioText: "sabah",
                options: ["Morgen", "Abend", "Nacht", "Woche"],
                correctIndex: 0,
                explanation: "„Sabah“ = Morgen / morgens.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie heißt „heute“?",
                options: ["bugün", "yarın", "gece", "hafta"],
                correctIndex: 0,
                explanation: "„bugün“ = heute – aus „bu“ (dieser) + „gün“ (Tag).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Tageszeiten zu.",
                pairs: [
                  { source: "Morgen(s)", target: "sabah" },
                  { source: "Abend", target: "akşam" },
                  { source: "Nacht", target: "gece" },
                  { source: "Tag", target: "gün" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İyi ___!",
                options: ["geceler", "gece", "gün"],
                solution: "geceler",
                translation: "Gute Nacht!",
                explanation: "„İyi geceler!“ = Gute Nacht! Feste Grußformel mit Plural „geceler“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Heute ist Montag.“",
                tokens: ["Bugün", "Pazartesi."],
                solution: "Bugün Pazartesi.",
                translation: "Heute ist Montag.",
                explanation: "„Pazartesi“ = Montag. Türkisch braucht hier kein „ist“.",
                audioText: "Bugün Pazartesi.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bugün Cuma.",
                question: "Was hörst du?",
                options: ["Heute ist Freitag.", "Heute ist Montag.", "Morgen ist Samstag."],
                correctIndex: 0,
                explanation: "„Cuma“ = Freitag.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "heute",
                solution: "bugün",
                altSolutions: ["bu gün"],
                hint: "bu + gün.",
                explanation: "„bugün“ = heute.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Welcher Tag?",
                scene: "Ihr plant etwas und redet über die Tage.",
                turns: [
                  { speaker: "Arkadaş", text: "Bugün günlerden ne?", translation: "Welcher Tag ist heute?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bugün Pazartesi.", correct: true, feedback: "„Bugün Pazartesi“ = Heute ist Montag." },
                      { text: "Saat üç.", correct: false, feedback: "„Es ist drei Uhr“ – aber gefragt ist der Wochentag." },
                    ],
                  },
                  { speaker: "Arkadaş", text: "Yarın?", translation: "Und morgen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Yarın Salı.", correct: true, feedback: "„Yarın Salı“ = Morgen ist Dienstag." },
                      { text: "Dün Pazar.", correct: false, feedback: "„Gestern Sonntag“ – aber gefragt ist morgen." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İyi geceler.",
                translation: "Gute Nacht.",
                tip: "Das c in „gece“ klingt wie „dsch“: ge-dsche.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u5-l3",
          title: "Mein Tag (Präsens)",
          intro:
            "Beschreibe deinen Tagesablauf: aufstehen, zur Schule gehen, schlafen. Lerne die Gegenwartsform auf -iyor.",
          grammarTip:
            "Gegenwart bildet die Endung -iyor (Vokalharmonie: -ıyor/-iyor/-uyor/-üyor) + Person. „kalkmak“ (aufstehen) → „kalkıyorum“ = ich stehe auf. „gitmek“ (gehen) → „gidiyorum“ (das t wird zu d). Die Endung -um/-ım/-yorum heißt „ich“.",
          vocab: [
            { source: "aufstehen", target: "kalkmak", exampleSource: "Morgens stehe ich auf.", exampleTarget: "Sabah kalkıyorum." },
            { source: "gehen", target: "gitmek", exampleSource: "Ich gehe zur Schule.", exampleTarget: "Okula gidiyorum." },
            { source: "kommen", target: "gelmek" },
            { source: "schlafen", target: "uyumak" },
            { source: "arbeiten", target: "çalışmak" },
            { source: "Schule", target: "okul" },
            { source: "Arbeit", target: "iş" },
            { source: "nach Hause / Haus", target: "ev" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „kalkmak“?",
                audioText: "kalkmak",
                options: ["aufstehen", "schlafen", "gehen", "kommen"],
                correctIndex: 0,
                explanation: "„kalkmak“ = aufstehen. „Ich stehe auf“ = „kalkıyorum“.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „Ich gehe“?",
                options: ["Gidiyorum.", "Gitmek.", "Geliyorum.", "Kalkıyorum."],
                correctIndex: 0,
                explanation: "„gitmek“ → „gidiyorum“ (t wird zu d) = ich gehe.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Verben zu.",
                pairs: [
                  { source: "aufstehen", target: "kalkmak" },
                  { source: "gehen", target: "gitmek" },
                  { source: "schlafen", target: "uyumak" },
                  { source: "arbeiten", target: "çalışmak" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sabah erken ___.",
                options: ["kalkıyorum", "uyuyorum", "okul"],
                solution: "kalkıyorum",
                translation: "Morgens stehe ich früh auf.",
                explanation: "„kalkmak“ + -ıyorum = „kalkıyorum“ = ich stehe auf.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Ich gehe zur Schule.“",
                tokens: ["Okula", "gidiyorum."],
                solution: "Okula gidiyorum.",
                translation: "Ich gehe zur Schule.",
                explanation: "„okul“ + -a (nach/zu) = „okula“ (Richtung).",
                audioText: "Okula gidiyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Gece uyuyorum.",
                question: "Was hörst du?",
                options: ["Nachts schlafe ich.", "Morgens stehe ich auf.", "Ich arbeite."],
                correctIndex: 0,
                explanation: "„gece“ = nachts, „uyuyorum“ = ich schlafe.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich gehe zur Schule.",
                solution: "Okula gidiyorum.",
                altSolutions: ["Ben okula gidiyorum."],
                hint: "okul + a = okula.",
                explanation: "„Okula gidiyorum.“ – Richtung mit -a, Gegenwart mit -iyor.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Tagesablauf",
                scene: "Eine Freundin fragt dich nach deinem Morgen.",
                turns: [
                  { speaker: "Arkadaş", text: "Sabah kaçta kalkıyorsun?", translation: "Um wie viel Uhr stehst du morgens auf?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Saat yedide kalkıyorum.", correct: true, feedback: "„Saat yedide“ = um sieben Uhr, „kalkıyorum“ = ich stehe auf." },
                      { text: "İki elma.", correct: false, feedback: "„Zwei Äpfel“ passt nicht – gefragt ist deine Aufstehzeit." },
                    ],
                  },
                  { speaker: "Arkadaş", text: "Sonra ne yapıyorsun?", translation: "Was machst du dann?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Okula gidiyorum.", correct: true, feedback: "„Okula gidiyorum“ = Ich gehe zur Schule." },
                      { text: "İyi geceler.", correct: false, feedback: "„Gute Nacht“ passt zum Schlafengehen, nicht zum Morgen." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Okula gidiyorum.",
                translation: "Ich gehe zur Schule.",
                tip: "„gidiyorum“ – gi-di-yo-rum; das t von „gitmek“ wird zu d.",
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 6: Evde – Wohnen  (Voll-Abdeckungs-Modell, siehe curriculum-design-model)
    // Sprechakt-Inventar: wo man wohnt · Wohnungstyp · Zimmer benennen/erfragen ·
    //   Möbel · beschreiben · Position · was es gibt · Problem melden · Gast empfangen.
    // Lektionen: L1 Wo wohnst du? · L2 Zimmer · L3 Möbel & beschreiben ·
    //   [folgt] L4 Position · L5 Probleme & Gäste · L6 Capstone-Dialog (Besuch).
    // ================================================================
    {
      title: "Evde – Wohnen",
      description: "Sagen wo du wohnst, Zimmer und Möbel benennen und deine Wohnung beschreiben.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u6-l1",
          title: "Wo wohnst du?",
          intro:
            "Du triffst eine neue Nachbarin. Lerne zu sagen, wo und wie du wohnst.",
          grammarTip:
            "„Nerede oturuyorsun?“ = Wo wohnst du? („oturmak“ = wohnen/sitzen). Der Ort bekommt die Lokativ-Endung -de/-da (in/an): „şehirde“ (in der Stadt), „evde“ (zu Hause). Nach stimmlosem Konsonant (k, t, p, ç, ş, s, h, f) wird es -te/-ta: „sokakta“ (auf der Straße).",
          cultureTip:
            "In Städten wohnt man meist in einem „apartman“ (Mehrfamilienhaus) in einer „daire“ (Wohnung). Man nennt oft den Stockwerk: „üçüncü kat“ = dritter Stock.",
          vocab: [
            { source: "wohnen", target: "oturmak", exampleSource: "Wo wohnst du?", exampleTarget: "Nerede oturuyorsun?" },
            { source: "Haus", target: "ev" },
            { source: "Wohnung", target: "daire" },
            { source: "Zimmer", target: "oda" },
            { source: "Stadt", target: "şehir", exampleSource: "Ich wohne in der Stadt.", exampleTarget: "Şehirde oturuyorum." },
            { source: "Dorf", target: "köy" },
            { source: "Straße", target: "sokak" },
            { source: "Adresse", target: "adres" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „ev“?",
                audioText: "ev",
                options: ["Haus", "Zimmer", "Stadt", "Straße"],
                correctIndex: 0,
                explanation: "„Ev“ = Haus / Zuhause.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie fragst du „Wo wohnst du?“",
                options: ["Nerede oturuyorsun?", "Nasılsın?", "Ev nerede?", "Kaç lira?"],
                correctIndex: 0,
                explanation: "„Nerede oturuyorsun?“ = Wo wohnst du? („oturmak“ + -iyorsun = du wohnst).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne zu.",
                pairs: [
                  { source: "Haus", target: "ev" },
                  { source: "Wohnung", target: "daire" },
                  { source: "Zimmer", target: "oda" },
                  { source: "Stadt", target: "şehir" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Ben bir ___ oturuyorum.",
                options: ["evde", "ev", "oda"],
                solution: "evde",
                translation: "Ich wohne in einem Haus.",
                explanation: "Lokativ -de: „ev“ → „evde“ = in einem Haus.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Ich wohne in der Stadt.“",
                tokens: ["Şehirde", "oturuyorum."],
                solution: "Şehirde oturuyorum.",
                translation: "Ich wohne in der Stadt.",
                explanation: "„şehir“ + -de = „şehirde“ (in der Stadt).",
                audioText: "Şehirde oturuyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Köyde oturuyorum.",
                question: "Was hörst du?",
                options: ["Ich wohne im Dorf.", "Ich wohne in der Stadt.", "Wo wohnst du?"],
                correctIndex: 0,
                explanation: "„köy“ = Dorf → „köyde“ = im Dorf.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wo wohnst du?",
                solution: "Nerede oturuyorsun?",
                altSolutions: ["nerede oturuyorsun"],
                hint: "„nerede“ = wo.",
                explanation: "„Nerede oturuyorsun?“ – die Standardfrage nach dem Wohnort.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Neue Nachbarn",
                scene: "Eine Nachbarin spricht dich im Treppenhaus an.",
                turns: [
                  { speaker: "Komşu", text: "Merhaba! Nerede oturuyorsun?", translation: "Hallo! Wo wohnst du?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bu apartmanda oturuyorum.", correct: true, feedback: "„Bu apartmanda“ = in diesem Mehrfamilienhaus." },
                      { text: "İki elma.", correct: false, feedback: "„Zwei Äpfel“ passt nicht – sie fragt, wo du wohnst." },
                    ],
                  },
                  { speaker: "Komşu", text: "Kaçıncı katta?", translation: "In welchem Stock?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Üçüncü katta.", correct: true, feedback: "„Üçüncü katta“ = im dritten Stock (kat = Stock)." },
                      { text: "Saat üç.", correct: false, feedback: "„Es ist drei Uhr“ – aber gefragt ist das Stockwerk." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Nerede oturuyorsun?",
                translation: "Wo wohnst du?",
                tip: "„oturuyorsun“ – o-tu-ru-yor-sun, gleichmäßig, Betonung leicht hinten.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u6-l2",
          title: "Zimmer im Haus",
          intro:
            "Eine Wohnungsbesichtigung: Lerne die Räume zu benennen und zu fragen, wo welcher Raum ist.",
          grammarTip:
            "„… nerede?“ fragt nach dem Ort eines Raums: „Mutfak nerede?“ = Wo ist die Küche? Antworten: „solda“ (links), „sağda“ (rechts), „burada“ (hier), „orada“ (dort).",
          cultureTip:
            "Am Wohnungseingang zieht man die Schuhe aus. Meist stehen Hausschuhe („terlik“) für Gäste bereit.",
          vocab: [
            { source: "Küche", target: "mutfak" },
            { source: "Bad", target: "banyo" },
            { source: "Toilette", target: "tuvalet" },
            { source: "Schlafzimmer", target: "yatak odası" },
            { source: "Wohnzimmer", target: "salon" },
            { source: "Garten", target: "bahçe" },
            { source: "Tür", target: "kapı" },
            { source: "Fenster", target: "pencere" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „mutfak“?",
                audioText: "mutfak",
                options: ["Küche", "Bad", "Garten", "Tür"],
                correctIndex: 0,
                explanation: "„Mutfak“ = Küche.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wo wäscht man sich?",
                options: ["banyo", "mutfak", "salon", "bahçe"],
                correctIndex: 0,
                explanation: "„Banyo“ = Bad.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Räume zu.",
                pairs: [
                  { source: "Küche", target: "mutfak" },
                  { source: "Bad", target: "banyo" },
                  { source: "Tür", target: "kapı" },
                  { source: "Fenster", target: "pencere" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "___ nerede?",
                options: ["Tuvalet", "Sağda", "Bahçe"],
                solution: "Tuvalet",
                translation: "Wo ist die Toilette?",
                explanation: "„Tuvalet nerede?“ – eine der nützlichsten Fragen überhaupt.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Die Küche ist links.“",
                tokens: ["Mutfak", "solda."],
                solution: "Mutfak solda.",
                translation: "Die Küche ist links.",
                explanation: "„sol“ (links) + -da = „solda“.",
                audioText: "Mutfak solda.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Banyo sağda.",
                question: "Was hörst du?",
                options: ["Das Bad ist rechts.", "Die Küche ist links.", "Wo ist die Toilette?"],
                correctIndex: 0,
                explanation: "„sağ“ (rechts) + -da = „sağda“.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "die Küche",
                solution: "mutfak",
                altSolutions: [],
                hint: "Ein Wort.",
                explanation: "„Mutfak“ = Küche.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Wohnungsbesichtigung",
                scene: "Der Vermieter zeigt dir die Wohnung.",
                turns: [
                  { speaker: "Ev sahibi", text: "Buyurun, bu salon.", translation: "Bitte, das ist das Wohnzimmer." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok güzel! Mutfak nerede?", correct: true, feedback: "Gute Frage – „Mutfak nerede?“ = Wo ist die Küche?" },
                      { text: "Kaç yaşında?", correct: false, feedback: "„Wie alt?“ passt zu Personen, nicht zu Räumen." },
                    ],
                  },
                  { speaker: "Ev sahibi", text: "Mutfak burada, solda.", translation: "Die Küche ist hier, links." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Banyo da var mı?", correct: true, feedback: "„Banyo da var mı?“ = Gibt es auch ein Bad? (var/yok recycelt)." },
                      { text: "Afiyet olsun.", correct: false, feedback: "„Guten Appetit“ passt beim Essen." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Mutfak nerede?",
                translation: "Wo ist die Küche?",
                tip: "„mutfak“ endet stimmlos: mut-FAK.",
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a1-u6-l3",
          title: "Möbel & beschreiben",
          intro:
            "Beschreibe dein Zimmer: welche Möbel es gibt und wie sie sind – groß, klein, neu.",
          grammarTip:
            "Beschreiben mit „var“ (es gibt) + Adjektiv vor dem Nomen: „Odada büyük bir masa var.“ = Im Zimmer ist ein großer Tisch. Aufbau: Ort (Lokativ) + Adjektiv + „bir“ + Nomen + „var“.",
          vocab: [
            { source: "Tisch", target: "masa" },
            { source: "Stuhl", target: "sandalye" },
            { source: "Bett", target: "yatak" },
            { source: "Schrank", target: "dolap" },
            { source: "Sofa / Sessel", target: "koltuk" },
            { source: "Lampe", target: "lamba" },
            { source: "groß", target: "büyük" },
            { source: "klein", target: "küçük" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „yatak“?",
                audioText: "yatak",
                options: ["Bett", "Tisch", "Stuhl", "Schrank"],
                correctIndex: 0,
                explanation: "„Yatak“ = Bett.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „großer Tisch“?",
                options: ["büyük masa", "masa büyük", "küçük masa", "büyük yatak"],
                correctIndex: 0,
                explanation: "Adjektiv vor dem Nomen: „büyük masa“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Möbel zu.",
                pairs: [
                  { source: "Tisch", target: "masa" },
                  { source: "Stuhl", target: "sandalye" },
                  { source: "Bett", target: "yatak" },
                  { source: "Schrank", target: "dolap" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Odada bir ___ var.",
                options: ["koltuk", "büyük", "nerede"],
                solution: "koltuk",
                translation: "Im Zimmer ist ein Sofa.",
                explanation: "„var“ = es gibt: „bir koltuk var“ = es gibt ein Sofa.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde: „Im Zimmer ist ein großer Tisch.“",
                tokens: ["Odada", "büyük", "bir", "masa", "var."],
                solution: "Odada büyük bir masa var.",
                translation: "Im Zimmer ist ein großer Tisch.",
                explanation: "Ort + Adjektiv + „bir“ + Nomen + „var“.",
                audioText: "Odada büyük bir masa var.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Yatak odasında küçük bir lamba var.",
                question: "Was hörst du?",
                options: ["Im Schlafzimmer ist eine kleine Lampe.", "Im Wohnzimmer ist ein großer Tisch.", "Wo ist das Bett?"],
                correctIndex: 0,
                explanation: "„küçük“ = klein, „lamba“ = Lampe.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Im Zimmer ist ein Bett.",
                solution: "Odada bir yatak var.",
                altSolutions: ["Odada yatak var."],
                hint: "Ort-da + bir + Nomen + var.",
                explanation: "„Odada bir yatak var.“ – Lokativ „odada“ + „var“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das neue Zimmer",
                scene: "Eine Freundin fragt nach deinem neuen Zimmer.",
                turns: [
                  { speaker: "Arkadaş", text: "Yeni odan nasıl?", translation: "Wie ist dein neues Zimmer?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Küçük ama güzel.", correct: true, feedback: "„Küçük ama güzel“ = klein, aber schön („ama“ = aber)." },
                      { text: "Çok pahalı.", correct: false, feedback: "„Sehr teuer“ passt zum Preis, nicht zur Beschreibung." },
                    ],
                  },
                  { speaker: "Arkadaş", text: "İçinde ne var?", translation: "Was ist drin?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bir yatak ve bir masa var.", correct: true, feedback: "„Bir yatak ve bir masa var“ = Es gibt ein Bett und einen Tisch." },
                      { text: "Okula gidiyorum.", correct: false, feedback: "„Ich gehe zur Schule“ passt nicht zur Zimmerbeschreibung." },
                    ],
                  },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Odada büyük bir masa var.",
                translation: "Im Zimmer ist ein großer Tisch.",
                tip: "„odada“ – o-da-DA; das ü in „büyük“ wie in „für“: bü-YÜK.",
              },
            },
          ],
        },
      ],
    },
  ],
};

