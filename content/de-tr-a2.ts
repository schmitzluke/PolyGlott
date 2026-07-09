import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs Deutsch → Türkisch, Level A2 (Premium).
 * Baut auf A1 auf und recycelt dessen Wortschatz (istiyorum, ne kadar,
 * nerede, Zahlen, Begrüßungen). Neue Grammatik: Vergangenheit (-di),
 * Uhrzeiten, var/yok, -meyi sevmek, Frage-Partikel mı/mi.
 */
export const courseDeTrA2: SeedCourse = {
  slug: "tr-a2-alltag-reisen",
  title: "Türkisch A2 – Alltag & Reisen",
  description:
    "Erzähl von gestern, plane deinen Tag und meistere Hotel, Bahn und Arztbesuch – der nächste Schritt Richtung B1.",
  level: "A2",
  sourceLang: "de",
  targetLang: "tr",
  isPremium: true,
  units: [
    // ================================================================
    // UNIT 1: Mein Alltag – erzählen, was war und was ansteht
    // ================================================================
    {
      title: "Mein Alltag",
      description: "Über gestern sprechen, den Tagesablauf beschreiben, Hobbys teilen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u1-l1",
          title: "Was hast du gestern gemacht?",
          intro:
            "Deine Freundin fragt, was du gestern gemacht hast: Lerne die Vergangenheit, um von deinem Tag zu erzählen.",
          grammarTip:
            "Die Vergangenheit bildet sich mit -di (nach Vokalharmonie -dı/-du/-dü): gitmek → gittim (ich ging), yapmak → yaptım (ich machte). Die Endung -m zeigt „ich“, -n „du“: gittin = du gingst.",
          vocab: [
            { source: "gestern", target: "dün", exampleSource: "Was hast du gestern gemacht?", exampleTarget: "Dün ne yaptın?" },
            { source: "heute", target: "bugün" },
            { source: "ich ging / bin gegangen", target: "gittim", exampleSource: "Ich bin ins Kino gegangen.", exampleTarget: "Sinemaya gittim." },
            { source: "ich habe gemacht", target: "yaptım" },
            { source: "ich habe gegessen", target: "yedim" },
            { source: "ich habe getrunken", target: "içtim" },
            { source: "das Kino", target: "sinema" },
            { source: "sehr schön", target: "çok güzel" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Dün ne yaptın?“",
                audioText: "Dün ne yaptın?",
                options: ["Was hast du gestern gemacht?", "Was machst du heute?", "Wohin gehst du?", "Was möchtest du essen?"],
                correctIndex: 0,
                explanation: "„dün“ = gestern, „yaptın“ = du hast gemacht. Das -n am Ende zeigt „du“ an.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du: „Ich bin ins Kino gegangen“?",
                options: ["Sinemaya gittim.", "Sinemaya gidiyorum.", "Sinemaya gittin.", "Sinema nerede?"],
                correctIndex: 0,
                explanation: "gittim = ich ging (Vergangenheit). „gidiyorum“ wäre Gegenwart: ich gehe (gerade).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Vergangenheitsformen zu.",
                pairs: [
                  { source: "ich ging", target: "gittim" },
                  { source: "ich machte", target: "yaptım" },
                  { source: "ich aß", target: "yedim" },
                  { source: "ich trank", target: "içtim" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Dün çay ___.",
                options: ["içtim", "içiyorum", "yedim"],
                solution: "içtim",
                translation: "Gestern habe ich Tee getrunken.",
                explanation: "„dün“ verlangt Vergangenheit: içtim. „içiyorum“ (ich trinke gerade) passt nicht zu gestern.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Gestern bin ich ins Kino gegangen.“",
                tokens: ["Dün", "sinemaya", "gittim."],
                solution: "Dün sinemaya gittim.",
                translation: "Gestern bin ich ins Kino gegangen.",
                explanation: "Zeitangabe zuerst, Verb am Ende – wie immer im Türkischen.",
                audioText: "Dün sinemaya gittim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Was hast du gestern gemacht?",
                solution: "Dün ne yaptın",
                altSolutions: ["Dün ne yaptın?", "Sen dün ne yaptın?", "Sen dün ne yaptın"],
                hint: "gestern + was + du-machtest",
                explanation: "„Dün ne yaptın?“ – die wichtigste Smalltalk-Frage im A2.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Dün çok güzel bir film izledim.",
                question: "Was hat die Person gestern gemacht?",
                options: ["einen Film gesehen", "Tee getrunken", "Fußball gespielt"],
                correctIndex: 0,
                explanation: "„izledim“ = ich habe geschaut, „film“ hilft dir als internationales Wort.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dün sinemaya gittim. Film çok güzeldi.",
                translation: "Gestern war ich im Kino. Der Film war sehr schön.",
                tip: "„güzeldi“ = war schön: auch „sein“ bekommt die -di-Vergangenheit.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Montagmorgen-Smalltalk",
                scene: "Deine Kollegin Elif fragt nach deinem Wochenende.",
                turns: [
                  { speaker: "Elif", text: "Günaydın! Dün ne yaptın?", translation: "Guten Morgen! Was hast du gestern gemacht?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Sinemaya gittim. Film çok güzeldi!", correct: true, feedback: "Perfekt – Vergangenheit richtig eingesetzt!" },
                      { text: "Sinemaya gidiyorum.", correct: false, feedback: "Das ist Gegenwart („ich gehe gerade“) – Elif fragt nach gestern: gittim." },
                      { text: "Bir çay istiyorum, lütfen.", correct: false, feedback: "Die Bestellung aus A1 passt hier nicht – erzähl von gestern." },
                    ],
                  },
                  { speaker: "Elif", text: "Ne güzel! Ben de dün arkadaşlarımla yemek yedim.", translation: "Wie schön! Ich habe gestern mit Freunden gegessen." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Afiyet olsun! Ne yedin?", correct: true, feedback: "Stark! „Ne yedin?“ = Was hast du gegessen? – du führst das Gespräch weiter." },
                      { text: "Hoşça kal!", correct: false, feedback: "So abrupt beendet man kein nettes Gespräch – frag nach!" },
                    ],
                  },
                  { speaker: "Elif", text: "Pide yedik, çok lezzetliydi!", translation: "Wir haben Pide gegessen, es war sehr lecker!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u1-l2",
          title: "Mein Tag & die Uhrzeit",
          intro:
            "Ein neuer Bekannter fragt nach deinem Alltag: Beschreibe deinen Tagesablauf mit Uhrzeiten.",
          grammarTip:
            "Uhrzeit + -de/-da = „um“: saat yedi (7 Uhr) → saat yedide (um 7 Uhr). „Saat kaç?“ fragt nach der Uhrzeit, „Saat kaçta?“ nach dem Zeitpunkt („um wie viel Uhr?“).",
          vocab: [
            { source: "Wie spät ist es?", target: "Saat kaç?" },
            { source: "Um wie viel Uhr?", target: "Saat kaçta?" },
            { source: "ich stehe auf", target: "kalkıyorum", exampleSource: "Ich stehe jeden Tag um 7 auf.", exampleTarget: "Her gün saat yedide kalkıyorum." },
            { source: "jeden Tag", target: "her gün" },
            { source: "ich frühstücke", target: "kahvaltı yapıyorum" },
            { source: "ich gehe zur Arbeit", target: "işe gidiyorum" },
            { source: "zuerst … danach", target: "önce … sonra" },
            { source: "ich komme nach Hause", target: "eve dönüyorum" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Jemand fragt „Saat kaç?“ – was möchte die Person wissen?",
                audioText: "Saat kaç?",
                options: ["Wie spät es ist", "Um wie viel Uhr du aufstehst", "Wie viele Uhren du hast", "Wie lange es dauert"],
                correctIndex: 0,
                explanation: "„Saat kaç?“ = Wie spät ist es? Mit -ta („Saat kaçta?“) wird daraus „um wie viel Uhr?“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne den Tagesablauf zu.",
                pairs: [
                  { source: "ich stehe auf", target: "kalkıyorum" },
                  { source: "ich frühstücke", target: "kahvaltı yapıyorum" },
                  { source: "ich gehe zur Arbeit", target: "işe gidiyorum" },
                  { source: "ich komme nach Hause", target: "eve dönüyorum" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Her gün saat yedi___ kalkıyorum.",
                options: ["de", "ye", "den"],
                solution: "de",
                translation: "Ich stehe jeden Tag um sieben auf.",
                explanation: "-de macht aus „saat yedi“ (7 Uhr) „um 7 Uhr“ – der Lokativ aus A1, jetzt für Zeiten.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Zuerst frühstücke ich, danach gehe ich zur Arbeit.“",
                tokens: ["Önce", "kahvaltı", "yapıyorum,", "sonra", "işe", "gidiyorum."],
                solution: "Önce kahvaltı yapıyorum, sonra işe gidiyorum.",
                translation: "Zuerst frühstücke ich, danach gehe ich zur Arbeit.",
                explanation: "„önce … sonra“ strukturiert jede Tagesbeschreibung.",
                audioText: "Önce kahvaltı yapıyorum, sonra işe gidiyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Saat sekizde işe gidiyorum.",
                question: "Um wie viel Uhr geht die Person zur Arbeit?",
                options: ["um acht", "um sieben", "um fünf"],
                correctIndex: 0,
                explanation: "„sekiz“ = acht (die Zahlen 6–10: altı, yedi, sekiz, dokuz, on).",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie fragst du: „Um wie viel Uhr stehst du auf?“",
                options: ["Saat kaçta kalkıyorsun?", "Saat kaç kalkıyorsun?", "Kaç saat kalkıyorsun?", "Ne zaman saat?"],
                correctIndex: 0,
                explanation: "Zeitpunkt = „saat kaçta“. „Kaç saat“ würde „wie viele Stunden“ bedeuten.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich stehe jeden Tag um sieben auf.",
                solution: "Her gün saat yedide kalkıyorum",
                altSolutions: ["Her gün saat yedide kalkıyorum.", "Her gün yedide kalkıyorum.", "Her gün yedide kalkıyorum"],
                hint: "jeden Tag + um sieben + ich-stehe-auf",
                explanation: "Zeitangaben stehen vor dem Verb: Her gün saat yedide kalkıyorum.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Önce kahvaltı yapıyorum, sonra işe gidiyorum.",
                translation: "Zuerst frühstücke ich, danach gehe ich zur Arbeit.",
                tip: "„kahvaltı“ = kah-val-TI, Betonung hinten; das h wird gehaucht mitgesprochen.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne die Wörter von gestern zu.",
                pairs: [
                  { source: "gestern", target: "dün" },
                  { source: "heute", target: "bugün" },
                  { source: "ich habe getrunken", target: "içtim" },
                  { source: "das Kino", target: "sinema" },
                  { source: "ich bin gegangen", target: "gittim" },
                  { source: "ich habe gegessen", target: "yedim" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dün sinemaya gittim ve çay içtim. Bugün de sinemaya gidiyorum.",
                translation: "Gestern bin ich ins Kino gegangen und habe Tee getrunken. Heute gehe ich auch ins Kino.",
                tip: "🔁 Wiederholung: „dün“ (gestern), „bugün“ (heute), „içtim“, „sinema“ im Zusammenhang.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Sprachcafé",
                scene: "Murat möchte deinen Alltag kennenlernen.",
                turns: [
                  { speaker: "Murat", text: "Her gün saat kaçta kalkıyorsun?", translation: "Um wie viel Uhr stehst du jeden Tag auf?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Saat yedide kalkıyorum.", correct: true, feedback: "Genau – Uhrzeit mit -de, Verb am Ende." },
                      { text: "Saat yedi.", correct: false, feedback: "„Saat yedi“ heißt nur „7 Uhr“ – für „um 7“ brauchst du „yedide“ plus Verb." },
                    ],
                  },
                  { speaker: "Murat", text: "Sonra ne yapıyorsun?", translation: "Was machst du danach?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kahvaltı yapıyorum, sonra işe gidiyorum.", correct: true, feedback: "Perfekt strukturiert mit „sonra“!" },
                      { text: "Dün sinemaya gittim.", correct: false, feedback: "Das war gestern (Lektion 7!) – Murat fragt nach deiner Routine." },
                    ],
                  },
                  { speaker: "Murat", text: "Çok düzenlisin! Ben genelde geç kalkıyorum.", translation: "Du bist sehr organisiert! Ich stehe meistens spät auf." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u1-l3",
          title: "Hobbys & Wochenende",
          intro:
            "Beim Kennenlernen kommt immer die Frage nach Hobbys: Sag, was du gern machst – und frag zurück.",
          grammarTip:
            "„Gern etwas tun“ = Verb + -meyi/-mayı + sevmek: okumak → okumayı seviyorum (ich lese gern), yüzmek → yüzmeyi seviyorum. Die Frage-Partikel „mu/mü“ steht getrennt: Seviyor musun? = Magst du?",
          vocab: [
            { source: "das Wochenende", target: "hafta sonu" },
            { source: "das Hobby", target: "hobi" },
            { source: "Ich lese gern.", target: "Kitap okumayı seviyorum." },
            { source: "schwimmen", target: "yüzmek" },
            { source: "Sport machen", target: "spor yapmak" },
            { source: "Musik hören", target: "müzik dinlemek" },
            { source: "kochen", target: "yemek yapmak" },
            { source: "Magst du …?", target: "… seviyor musun?" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Kitap okumayı seviyorum“?",
                audioText: "Kitap okumayı seviyorum.",
                options: ["Ich lese gern.", "Ich habe ein Buch gelesen.", "Liest du gern?", "Ich suche ein Buch."],
                correctIndex: 0,
                explanation: "okumak (lesen) + -mayı + seviyorum (ich liebe) = „ich lese gern“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Hobbys zu.",
                pairs: [
                  { source: "schwimmen", target: "yüzmek" },
                  { source: "Sport machen", target: "spor yapmak" },
                  { source: "Musik hören", target: "müzik dinlemek" },
                  { source: "kochen", target: "yemek yapmak" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Yüzme___ seviyorum.",
                options: ["yi", "de", "ye"],
                solution: "yi",
                translation: "Ich schwimme gern.",
                explanation: "yüzmek → yüzme + -yi + seviyorum. Nach e/i kommt -meyi/-yi (Vokalharmonie).",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie fragst du: „Magst du Sport?“",
                options: ["Spor yapmayı seviyor musun?", "Spor yapmayı seviyorsun.", "Spor ne kadar?", "Spor yaptın mı dün?"],
                correctIndex: 0,
                explanation: "Die Frage-Partikel „musun“ steht getrennt hinter dem Verb: seviyor musun?",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Am Wochenende mache ich gern Sport.“",
                tokens: ["Hafta", "sonu", "spor", "yapmayı", "seviyorum."],
                solution: "Hafta sonu spor yapmayı seviyorum.",
                translation: "Am Wochenende mache ich gern Sport.",
                audioText: "Hafta sonu spor yapmayı seviyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Hafta sonu müzik dinlemeyi ve yemek yapmayı seviyorum.",
                question: "Welche zwei Hobbys nennt die Person?",
                options: ["Musik hören und kochen", "Schwimmen und lesen", "Sport und Kino"],
                correctIndex: 0,
                explanation: "„müzik dinlemek“ = Musik hören, „yemek yapmak“ = kochen. „ve“ = und.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich lese gern.",
                solution: "Kitap okumayı seviyorum",
                altSolutions: ["Kitap okumayı seviyorum.", "Okumayı seviyorum", "Okumayı seviyorum."],
                explanation: "„kitap okumak“ = wörtlich „Buch lesen“ – so sagt man „lesen“ als Hobby.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hafta sonu yüzmeyi ve kitap okumayı seviyorum.",
                translation: "Am Wochenende schwimme und lese ich gern.",
                tip: "ü wie im Deutschen „über“: yüz-me-yi.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne den Tagesablauf zu.",
                pairs: [
                  { source: "ich stehe auf", target: "kalkıyorum" },
                  { source: "ich frühstücke", target: "kahvaltı yapıyorum" },
                  { source: "ich gehe zur Arbeit", target: "işe gidiyorum" },
                  { source: "ich komme nach Hause", target: "eve dönüyorum" },
                  { source: "zuerst … danach", target: "önce … sonra" },
                  { source: "jeden Tag", target: "her gün" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Önce kalkıyorum, kahvaltı yapıyorum, sonra işe gidiyorum. Akşam eve dönüyorum.",
                translation: "Zuerst stehe ich auf, frühstücke, danach gehe ich zur Arbeit. Abends komme ich nach Hause.",
                tip: "🔁 Wiederholung: der ganze Tagesablauf mit „önce … sonra“ am Stück.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Neue Freunde",
                scene: "Zeynep (aus A1!) fragt nach deinen Hobbys.",
                turns: [
                  { speaker: "Zeynep", text: "Hafta sonu ne yapmayı seviyorsun?", translation: "Was machst du am Wochenende gern?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Spor yapmayı ve kitap okumayı seviyorum. Sen?", correct: true, feedback: "Super – zwei Hobbys verbunden mit „ve“ und zurückgefragt!" },
                      { text: "Saat yedide kalkıyorum.", correct: false, feedback: "Deine Aufstehzeit war Lektion 8 – Zeynep fragt nach Hobbys." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Ben yüzmeyi seviyorum. Yarın havuza gidiyorum, gelmek ister misin?", translation: "Ich schwimme gern. Morgen gehe ich ins Schwimmbad, möchtest du mitkommen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok isterim! Saat kaçta?", correct: true, feedback: "„Çok isterim“ = sehr gern! Und du fragst gleich nach der Uhrzeit – alles verknüpft." },
                      { text: "Hayır, sen nerelisin?", correct: false, feedback: "Die Herkunftsfrage kennt ihr schon aus A1 – hier passt Zusage + Uhrzeit-Frage." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Saat onda! Harika olacak.", translation: "Um zehn! Das wird großartig." },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 2: Unterwegs & Reisen
    // ================================================================
    {
      title: "Unterwegs & Reisen",
      description: "Hotel, Bus und Bahn, Arztbesuch – souverän unterwegs in der Türkei.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u2-l1",
          title: "Im Hotel",
          intro:
            "Ankunft im Hotel in Antalya: Check ein, frag nach dem Frühstück und kläre Details.",
          grammarTip:
            "„var“ = es gibt / vorhanden, „yok“ = es gibt nicht: „Boş oda var mı?“ (Gibt es ein freies Zimmer?) – „Maalesef yok.“ (Leider nicht.) Mit Possessiv: „Rezervasyonum var“ = Ich habe eine Reservierung.",
          vocab: [
            { source: "die Reservierung", target: "rezervasyon", exampleSource: "Ich habe eine Reservierung.", exampleTarget: "Rezervasyonum var." },
            { source: "das Zimmer", target: "oda" },
            { source: "frei / leer", target: "boş" },
            { source: "es gibt", target: "var" },
            { source: "es gibt nicht", target: "yok" },
            { source: "der Schlüssel", target: "anahtar" },
            { source: "die Nacht", target: "gece" },
            { source: "inklusive", target: "dahil", exampleSource: "Ist Frühstück inklusive?", exampleTarget: "Kahvaltı dahil mi?" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Rezervasyonum var“?",
                audioText: "Rezervasyonum var.",
                options: ["Ich habe eine Reservierung.", "Ich möchte reservieren.", "Die Reservierung ist weg.", "Wo ist die Rezeption?"],
                correctIndex: 0,
                explanation: "„var“ = existiert, -um = mein: „Meine Reservierung existiert“ = Ich habe eine Reservierung.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du hast NICHT reserviert. Wie fragst du nach einem freien Zimmer?",
                options: ["Boş oda var mı?", "Boş oda yok.", "Oda nerede?", "Rezervasyonum var."],
                correctIndex: 0,
                explanation: "„Boş oda var mı?“ = Gibt es ein freies Zimmer? Die Partikel „mı“ macht die Frage.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Hotel-Wörter zu.",
                pairs: [
                  { source: "Zimmer", target: "oda" },
                  { source: "Schlüssel", target: "anahtar" },
                  { source: "Nacht", target: "gece" },
                  { source: "frei", target: "boş" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İki ___ için bir oda istiyorum.",
                options: ["gece", "geceler", "saat"],
                solution: "gece",
                translation: "Ich möchte ein Zimmer für zwei Nächte.",
                explanation: "Singular nach Zahlen – die A1-Regel gilt weiter: iki gece, nicht „geceler“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Ist Frühstück inklusive?“",
                tokens: ["Kahvaltı", "dahil", "mi?"],
                solution: "Kahvaltı dahil mi?",
                translation: "Ist Frühstück inklusive?",
                explanation: "„mi“ steht als eigenes Wort am Ende und macht aus der Aussage eine Frage.",
                audioText: "Kahvaltı dahil mi?",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Maalesef boş oda yok.",
                question: "Was sagt die Rezeption?",
                options: ["Es gibt leider kein freies Zimmer.", "Das Zimmer ist sehr schön.", "Der Schlüssel ist weg."],
                correctIndex: 0,
                explanation: "„maalesef“ = leider, „yok“ = gibt es nicht – das Gegenteil von „var“.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich habe eine Reservierung.",
                solution: "Rezervasyonum var",
                altSolutions: ["Rezervasyonum var.", "Bir rezervasyonum var", "Bir rezervasyonum var."],
                explanation: "Kein Verb „haben“ nötig – Possessiv + var erledigt das.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Merhaba, rezervasyonum var. Kahvaltı dahil mi?",
                translation: "Hallo, ich habe eine Reservierung. Ist Frühstück inklusive?",
                tip: "„dahil“ = da-HIL, das h deutlich sprechen.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Hobbys & Alltag zu.",
                pairs: [
                  { source: "das Wochenende", target: "hafta sonu" },
                  { source: "schwimmen", target: "yüzmek" },
                  { source: "Sport machen", target: "spor yapmak" },
                  { source: "Musik hören", target: "müzik dinlemek" },
                  { source: "kochen", target: "yemek yapmak" },
                  { source: "das Kino", target: "sinema" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dün spor yaptım, bugün yüzmeyi seviyorum. Hobim müzik. Akşam yemek yaptım ve çay içtim.",
                translation: "Gestern habe ich Sport gemacht, heute schwimme ich gern. Mein Hobby ist Musik. Abends habe ich gekocht und Tee getrunken.",
                tip: "🔁 Wiederholung: Hobbys & Vergangenheit – „spor“, „yüzmek“, „müzik“, „yemek yapmak“, „dün“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Check-in in Antalya",
                scene: "Du kommst abends im Hotel an.",
                turns: [
                  { speaker: "Rezeption", text: "İyi akşamlar! Hoş geldiniz.", translation: "Guten Abend! Willkommen." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "İyi akşamlar! Rezervasyonum var, iki gece için.", correct: true, feedback: "Souverän: Gruß, Reservierung, Dauer – alles drin." },
                      { text: "Boş oda yok!", correct: false, feedback: "„Es gibt kein freies Zimmer“ sagt eher die Rezeption – du hast ja reserviert." },
                    ],
                  },
                  { speaker: "Rezeption", text: "Tabii! Buyurun, anahtarınız. Oda üçüncü katta.", translation: "Natürlich! Bitte, Ihr Schlüssel. Das Zimmer ist im dritten Stock." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkürler! Kahvaltı dahil mi?", correct: true, feedback: "Die wichtigste Hotel-Frage – und „mi“ sitzt!" },
                      { text: "Bu ne kadar? Çok pahalı!", correct: false, feedback: "Über den Preis verhandelt man beim Einchecken mit Reservierung nicht mehr – frag lieber nach dem Frühstück." },
                    ],
                  },
                  { speaker: "Rezeption", text: "Evet, dahil. Saat yedi ile on arasında.", translation: "Ja, inklusive. Zwischen sieben und zehn Uhr." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Harika, teşekkürler! İyi geceler.", correct: true, feedback: "„İyi geceler“ = Gute Nacht – der perfekte Abschluss am Abend." },
                      { text: "Güle güle!", correct: false, feedback: "„Güle güle“ sagt, wer bleibt, zu dem, der geht – hier passt „İyi geceler“." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u2-l2",
          title: "Mit Bus & Bahn",
          intro:
            "Du willst von Istanbul nach Izmir: Kauf ein Ticket und finde heraus, wann der Bus fährt.",
          grammarTip:
            "Richtung = -(y)a/-(y)e: İzmir'e = nach Izmir, İstanbul'a = nach Istanbul (bei Eigennamen mit Apostroph). „Ne zaman?“ = wann?, „kalkıyor“ = fährt ab (wörtlich: steht auf – wie beim Aufstehen!).",
          vocab: [
            { source: "das Ticket", target: "bilet", exampleSource: "Ein Ticket nach Izmir, bitte.", exampleTarget: "İzmir'e bir bilet, lütfen." },
            { source: "der Bus (Fernbus)", target: "otobüs" },
            { source: "der Zug", target: "tren" },
            { source: "Wann?", target: "Ne zaman?" },
            { source: "fährt ab", target: "kalkıyor" },
            { source: "kommt an", target: "varıyor" },
            { source: "Wie lange dauert es?", target: "Ne kadar sürüyor?" },
            { source: "der Bahnsteig / Steig", target: "peron" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Otobüs ne zaman kalkıyor?“",
                audioText: "Otobüs ne zaman kalkıyor?",
                options: ["Wann fährt der Bus ab?", "Wo hält der Bus?", "Wie viel kostet der Bus?", "Wann kommt der Bus an?"],
                correctIndex: 0,
                explanation: "„kalkıyor“ = fährt ab. „varıyor“ wäre „kommt an“ – beide brauchst du am Busbahnhof.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Reise-Wörter zu.",
                pairs: [
                  { source: "Ticket", target: "bilet" },
                  { source: "Zug", target: "tren" },
                  { source: "fährt ab", target: "kalkıyor" },
                  { source: "kommt an", target: "varıyor" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İzmir'___ bir bilet, lütfen.",
                options: ["e", "de", "den"],
                solution: "e",
                translation: "Ein Ticket nach Izmir, bitte.",
                explanation: "-e = Richtung (nach). -de wäre „in“, -den „von/aus“. Drei kleine Endungen, drei Bedeutungen!",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde die Frage: „Wann fährt der Bus nach Izmir ab?“",
                tokens: ["İzmir", "otobüsü", "ne", "zaman", "kalkıyor?"],
                solution: "İzmir otobüsü ne zaman kalkıyor?",
                translation: "Wann fährt der Izmir-Bus ab?",
                audioText: "İzmir otobüsü ne zaman kalkıyor?",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Otobüs saat onda kalkıyor, beşinci perondan.",
                question: "Um wie viel Uhr fährt der Bus?",
                options: ["um zehn", "um fünf", "um acht"],
                correctIndex: 0,
                explanation: "„saat onda“ = um zehn. „Beşinci peron“ = Steig fünf – dahin musst du!",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du willst wissen, wie lange die Fahrt dauert. Was fragst du?",
                options: ["Ne kadar sürüyor?", "Ne kadar?", "Saat kaç?", "Nerede sürüyor?"],
                correctIndex: 0,
                explanation: "„Ne kadar sürüyor?“ = Wie lange dauert es? Ohne „sürüyor“ fragst du nach dem Preis (A1!).",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ein Ticket nach Izmir, bitte.",
                solution: "İzmir'e bir bilet lütfen",
                altSolutions: ["İzmir'e bir bilet, lütfen.", "İzmir'e bir bilet lütfen.", "İzmir'e bir bilet, lütfen"],
                hint: "Richtung mit -e, dann wie beim Çay-Bestellen aus A1.",
                explanation: "Gleiche Struktur wie „Bir çay, lütfen“ – nur mit Richtungsangabe davor.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Affedersiniz, İzmir otobüsü ne zaman kalkıyor?",
                translation: "Entschuldigung, wann fährt der Bus nach Izmir?",
                tip: "„Affedersiniz“ kennst du aus A1 – höflicher Einstieg vor jeder Frage an Fremde.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne die Hotel-Wörter zu.",
                pairs: [
                  { source: "die Reservierung", target: "rezervasyon" },
                  { source: "das Zimmer", target: "oda" },
                  { source: "frei / leer", target: "boş" },
                  { source: "der Schlüssel", target: "anahtar" },
                  { source: "die Nacht", target: "gece" },
                  { source: "inklusive", target: "dahil" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Önce kahvaltı yapıyorum, sonra işe gidiyorum. Otelde boş oda var, iki gece için anahtar aldım. Akşam eve dönüyorum.",
                translation: "Zuerst frühstücke ich, danach gehe ich zur Arbeit. Im Hotel gibt es ein freies Zimmer, für zwei Nächte habe ich den Schlüssel bekommen. Abends komme ich nach Hause.",
                tip: "🔁 Wiederholung: Alltag & Hotel – „kahvaltı“, „boş“, „oda“, „gece“, „anahtar“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Am Busbahnhof (Otogar)",
                scene: "Du stehst am Schalter des großen Busbahnhofs.",
                turns: [
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Merhaba! İzmir'e bir bilet, lütfen.", correct: true, feedback: "Gruß + Ziel + bitte – die perfekte Bestellung." },
                      { text: "Merhaba! İzmir nerede?", correct: false, feedback: "„Wo ist Izmir?“ weiß der Schalter auch nicht besser – du willst ein Ticket!" },
                    ],
                  },
                  { speaker: "Schalter", text: "Tabii. Tek yön mü, gidiş dönüş mü?", translation: "Natürlich. Einfach oder hin und zurück?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Tek yön, lütfen. Ne zaman kalkıyor?", correct: true, feedback: "„Tek yön“ = einfach – und gleich die Abfahrtszeit erfragt." },
                      { text: "Evet, lütfen.", correct: false, feedback: "Das war eine Entweder-oder-Frage – „evet“ reicht nicht. Wähle: tek yön oder gidiş dönüş." },
                    ],
                  },
                  { speaker: "Schalter", text: "Saat on birde, üçüncü perondan. Yolculuk sekiz saat sürüyor.", translation: "Um elf Uhr, von Steig drei. Die Fahrt dauert acht Stunden." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkürler! İyi günler.", correct: true, feedback: "„İyi günler“ = Schönen Tag – höflicher Abschluss tagsüber." },
                      { text: "Çok pahalı! Güle güle.", correct: false, feedback: "Der Preis war gar nicht Thema – bedank dich und verabschiede dich freundlich." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u2-l3",
          title: "Beim Arzt",
          intro:
            "Auf Reisen krank geworden: Beschreib dem Arzt, was dir fehlt, und versteh seine Anweisungen.",
          grammarTip:
            "Körperteil + Possessiv + ağrıyor = „… tut mir weh“: baş (Kopf) → başım ağrıyor (mein Kopf schmerzt), boğaz (Hals) → boğazım ağrıyor. Der Arzt fragt: „Neyiniz var?“ – wörtlich „Was haben Sie?“.",
          vocab: [
            { source: "krank", target: "hasta", exampleSource: "Ich bin krank.", exampleTarget: "Hastayım." },
            { source: "der Arzt / die Ärztin", target: "doktor" },
            { source: "Was fehlt Ihnen?", target: "Neyiniz var?" },
            { source: "Mein Kopf tut weh.", target: "Başım ağrıyor." },
            { source: "mein Hals", target: "boğazım" },
            { source: "das Fieber", target: "ateş", exampleSource: "Ich habe Fieber.", exampleTarget: "Ateşim var." },
            { source: "das Medikament", target: "ilaç" },
            { source: "Gute Besserung!", target: "Geçmiş olsun!" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Der Arzt fragt „Neyiniz var?“ – was möchte er wissen?",
                audioText: "Neyiniz var?",
                options: ["Was Ihnen fehlt", "Wie Sie heißen", "Ob Sie versichert sind", "Wann Sie gekommen sind"],
                correctIndex: 0,
                explanation: "Wörtlich „Was haben Sie?“ – die Standardfrage beim Arzt. Antwort: Symptom + ağrıyor / var.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du: „Mein Kopf tut weh“?",
                options: ["Başım ağrıyor.", "Başın ağrıyor.", "Baş ağrı.", "Başım var."],
                correctIndex: 0,
                explanation: "başım = mein Kopf (-ım wie in „adım“ aus A1!), ağrıyor = schmerzt.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Arzt-Wörter zu.",
                pairs: [
                  { source: "krank", target: "hasta" },
                  { source: "Fieber", target: "ateş" },
                  { source: "Medikament", target: "ilaç" },
                  { source: "Arzt", target: "doktor" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Ateş___ var ve boğazım ağrıyor.",
                options: ["im", "in", "e"],
                solution: "im",
                translation: "Ich habe Fieber und mein Hals tut weh.",
                explanation: "ateşim var = „mein Fieber existiert“ – dieselbe var-Konstruktion wie „rezervasyonum var“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich bin krank, mein Kopf tut weh.“",
                tokens: ["Hastayım,", "başım", "ağrıyor."],
                solution: "Hastayım, başım ağrıyor.",
                translation: "Ich bin krank, mein Kopf tut weh.",
                explanation: "hasta + -yım = ich bin krank (wie „Almanyalıyım“ aus A1).",
                audioText: "Hastayım, başım ağrıyor.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Günde üç kere bu ilacı alın.",
                question: "Was sagt der Arzt?",
                options: ["Nimm dieses Medikament dreimal täglich.", "Trink drei Tees am Tag.", "Komm in drei Tagen wieder."],
                correctIndex: 0,
                explanation: "„günde üç kere“ = dreimal am Tag, „ilacı alın“ = nehmen Sie das Medikament.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich habe Fieber.",
                solution: "Ateşim var",
                altSolutions: ["Ateşim var.", "Benim ateşim var", "Benim ateşim var."],
                explanation: "Possessiv + var – zum dritten Mal dieselbe Struktur. Jetzt sitzt sie.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hastayım. Başım ağrıyor ve ateşim var.",
                translation: "Ich bin krank. Mein Kopf tut weh und ich habe Fieber.",
                tip: "„ağrıyor“: das ğ dehnt das a – „aa-rı-yor“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne die Reise-Wörter zu.",
                pairs: [
                  { source: "das Ticket", target: "bilet" },
                  { source: "der Bus (Fernbus)", target: "otobüs" },
                  { source: "der Zug", target: "tren" },
                  { source: "fährt ab", target: "kalkıyor" },
                  { source: "der Bahnsteig", target: "peron" },
                  { source: "schwimmen", target: "yüzmek" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hafta sonu spor yapıyorum, müzik dinliyorum ve yemek yapıyorum. Yüzmek en sevdiğim hobi.",
                translation: "Am Wochenende mache ich Sport, höre Musik und koche. Schwimmen ist mein liebstes Hobby.",
                tip: "🔁 Wiederholung: „hafta sonu“, „spor“, „müzik“, „yemek yapmak“, „yüzmek“, „hobi“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "In der Praxis",
                scene: "Du sitzt beim Arzt in Izmir.",
                turns: [
                  { speaker: "Doktor", text: "Buyurun, neyiniz var?", translation: "Bitte, was fehlt Ihnen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hastayım. Başım ağrıyor ve ateşim var.", correct: true, feedback: "Klare Symptombeschreibung – genau das braucht der Arzt." },
                      { text: "İyiyim, teşekkürler!", correct: false, feedback: "„Mir geht es gut“ – dann wärst du kaum beim Arzt. Beschreib deine Symptome." },
                    ],
                  },
                  { speaker: "Doktor", text: "Ne zamandan beri hastasınız?", translation: "Seit wann sind Sie krank?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Dünden beri.", correct: true, feedback: "„Dünden beri“ = seit gestern – kurz und korrekt (dün kennst du aus Lektion 7)." },
                      { text: "Saat yedide kalkıyorum.", correct: false, feedback: "Deine Aufstehzeit hilft hier nicht – der Arzt fragt, seit wann du krank bist." },
                    ],
                  },
                  { speaker: "Doktor", text: "Grip olmuşsunuz. Bu ilacı günde üç kere alın ve çok su için.", translation: "Sie haben eine Grippe. Nehmen Sie dieses Medikament dreimal täglich und trinken Sie viel Wasser." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkür ederim, doktor bey.", correct: true, feedback: "„Doktor bey“ = höfliche Anrede für den Arzt. Er antwortet dir sicher: „Geçmiş olsun!“" },
                      { text: "Afiyet olsun!", correct: false, feedback: "„Guten Appetit“ zum Rezept? „Teşekkür ederim“ passt – der Arzt wünscht DIR dann „Geçmiş olsun“." },
                    ],
                  },
                  { speaker: "Doktor", text: "Rica ederim. Geçmiş olsun!", translation: "Gern geschehen. Gute Besserung!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 3: Wohnen & Stadt – die eigene Wohnung, das Viertel, Wege
    // ================================================================
    {
      title: "Wohnen & Stadt",
      description: "Die eigene Wohnung beschreiben, Orte im Viertel benennen und Wege erklären.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u3-l1",
          title: "Meine Wohnung",
          intro:
            "Eine neue Bekannte will wissen, wie du wohnst: Beschreibe deine Wohnung und ihre Zimmer.",
          grammarTip:
            "„var“ = es gibt, „yok“ = es gibt nicht (kennst du aus A1). Mit dem Lokativ -de/-da sagst du, WO etwas ist: mutfak → mutfakta (in der Küche), salon → salonda (im Wohnzimmer). „Evimde üç oda var“ = In meiner Wohnung gibt es drei Zimmer.",
          vocab: [
            { source: "das Haus / Zuhause", target: "ev", exampleSource: "Mein Zuhause ist klein.", exampleTarget: "Evim küçük." },
            { source: "die Wohnung", target: "daire" },
            { source: "das Zimmer", target: "oda", exampleSource: "In der Wohnung gibt es drei Zimmer.", exampleTarget: "Dairede üç oda var." },
            { source: "die Küche", target: "mutfak" },
            { source: "das Bad", target: "banyo" },
            { source: "das Wohnzimmer", target: "salon" },
            { source: "der Balkon", target: "balkon", exampleSource: "Es gibt einen Balkon.", exampleTarget: "Balkon var." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Evimde üç oda var“?",
                audioText: "Evimde üç oda var.",
                options: ["In meiner Wohnung gibt es drei Zimmer.", "Mein Haus ist neu.", "Ich gehe nach Hause.", "Wo ist das Zimmer?"],
                correctIndex: 0,
                explanation: "„ev“ = Zuhause, „-imde“ = in meinem, „oda“ = Zimmer, „var“ = es gibt. Die Zahl „üç“ (drei) kennst du aus A1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Räume zu.",
                pairs: [
                  { source: "die Küche", target: "mutfak" },
                  { source: "das Bad", target: "banyo" },
                  { source: "das Wohnzimmer", target: "salon" },
                  { source: "der Balkon", target: "balkon" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Çay ___ hazır.",
                options: ["mutfakta", "mutfak", "salon"],
                solution: "mutfakta",
                translation: "Der Tee ist in der Küche fertig.",
                explanation: "Lokativ -ta: mutfak → mutfakta (in der Küche). „Çay“ und der Lokativ kennst du schon.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Deine Wohnung hat KEINEN Balkon. Wie sagst du das?",
                options: ["Balkon yok.", "Balkon var.", "Balkon nerede?", "Balkon büyük."],
                correctIndex: 0,
                explanation: "„yok“ = es gibt nicht (Gegenteil von „var“). „büyük“ (groß) kennst du aus A1.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Meine Küche ist klein, aber das Wohnzimmer ist groß.“",
                tokens: ["Mutfağım", "küçük,", "ama", "salon", "büyük."],
                solution: "Mutfağım küçük, ama salon büyük.",
                translation: "Meine Küche ist klein, aber das Wohnzimmer ist groß.",
                explanation: "„büyük/küçük“ (groß/klein) und „ama“ (aber) recyceln A1-Wortschatz.",
                audioText: "Mutfağım küçük, ama salon büyük.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "In meiner Wohnung gibt es zwei Zimmer.",
                solution: "Dairemde iki oda var",
                altSolutions: ["Dairemde iki oda var.", "Evimde iki oda var", "Evimde iki oda var."],
                hint: "in-meiner-Wohnung + zwei + Zimmer + es-gibt",
                explanation: "„daire“ = Wohnung, „oda“ = Zimmer, „var“ = es gibt. „iki“ (zwei) ist A1.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Balkonda küçük bir masa var.",
                question: "Wo steht der kleine Tisch?",
                options: ["auf dem Balkon", "in der Küche", "im Bad"],
                correctIndex: 0,
                explanation: "„balkonda“ = auf dem Balkon (Lokativ). „masa“ (Tisch) und „küçük“ kennst du.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne die Arzt- & Hotel-Wörter zu.",
                pairs: [
                  { source: "krank", target: "hasta" },
                  { source: "der Arzt", target: "doktor" },
                  { source: "das Fieber", target: "ateş" },
                  { source: "das Medikament", target: "ilaç" },
                  { source: "mein Hals", target: "boğazım" },
                  { source: "die Nacht", target: "gece" },
                  { source: "der Schlüssel", target: "anahtar" },
                  { source: "die Reservierung", target: "rezervasyon" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hastayım, başım ağrıyor ve ateşim var. Doktor bana ilaç verdi. Geçmiş olsun!",
                translation: "Ich bin krank, mein Kopf tut weh und ich habe Fieber. Der Arzt hat mir ein Medikament gegeben. Gute Besserung!",
                tip: "🔁 Wiederholung: „hasta“, „başım ağrıyor“, „ateş“, „doktor“, „ilaç“, „Geçmiş olsun“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Zu Besuch bei dir",
                scene: "Deine Nachbarin Ayşe kommt zum ersten Mal in deine Wohnung.",
                turns: [
                  { speaker: "Ayşe", text: "Ne güzel bir daire! Kaç oda var?", translation: "Was für eine schöne Wohnung! Wie viele Zimmer gibt es?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Üç oda var: salon, yatak odası ve çocuk odası.", correct: true, feedback: "Perfekt – „var“ mit Zimmerzahl, genau richtig!" },
                      { text: "Oda nerede?", correct: false, feedback: "Du wohnst hier – SIE fragt dich, wie viele Zimmer es gibt. Antworte mit „var“." },
                      { text: "Mutfakta çay var.", correct: false, feedback: "Das beantwortet die Zimmerfrage nicht – sag, wie viele Zimmer du hast." },
                    ],
                  },
                  { speaker: "Ayşe", text: "Balkon da var mı?", translation: "Gibt es auch einen Balkon?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, küçük bir balkon var.", correct: true, feedback: "Stark! „Evet … var“ – klare Antwort mit recyceltem „evet“ aus A1." },
                      { text: "Hayır, balkonda oturuyorum.", correct: false, feedback: "Widersprüchlich – erst „nein“, dann „auf dem Balkon“. Sag „Evet, … var“." },
                    ],
                  },
                  { speaker: "Ayşe", text: "Çok güzel! Balkonda çay içelim mi?", translation: "Sehr schön! Sollen wir auf dem Balkon Tee trinken?" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u3-l2",
          title: "In meinem Viertel",
          intro:
            "Du zeigst Ayşe dein Viertel: Benenne Geschäfte und Orte und sag, was neben deinem Haus liegt.",
          grammarTip:
            "„yanında“ = neben, „karşısında“ = gegenüber – lern sie als feste Chunks: „Evimin yanında bir market var“ = Neben meinem Haus gibt es einen Supermarkt. „nerede“ (wo) und „var“ recyceln wir aus A1.",
          vocab: [
            { source: "das Viertel", target: "mahalle", exampleSource: "Mein Viertel ist sehr schön.", exampleTarget: "Mahallem çok güzel." },
            { source: "der Supermarkt", target: "market", exampleSource: "Neben dem Haus gibt es einen Supermarkt.", exampleTarget: "Evin yanında market var." },
            { source: "die Apotheke", target: "eczane" },
            { source: "der Park", target: "park" },
            { source: "die Bank", target: "banka" },
            { source: "die Post", target: "postane" },
            { source: "neben", target: "yanında", exampleSource: "neben dem Park", exampleTarget: "parkın yanında" },
            { source: "gegenüber", target: "karşısında" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Evimin yanında bir market var“?",
                audioText: "Evimin yanında bir market var.",
                options: ["Neben meinem Haus gibt es einen Supermarkt.", "Mein Haus ist groß.", "Der Supermarkt ist zu.", "Wo ist die Bank?"],
                correctIndex: 0,
                explanation: "„ev“ (Haus, aus Lektion 10), „yanında“ = neben, „market“ = Supermarkt, „var“ = es gibt.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Orte im Viertel zu.",
                pairs: [
                  { source: "die Apotheke", target: "eczane" },
                  { source: "der Park", target: "park" },
                  { source: "die Bank", target: "banka" },
                  { source: "die Post", target: "postane" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Eczane, marketin ___.",
                options: ["karşısında", "yanında", "nerede"],
                solution: "karşısında",
                translation: "Die Apotheke ist gegenüber dem Supermarkt.",
                explanation: "„karşısında“ = gegenüber. „market“ recyceln wir aus dieser Lektion.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wo ist die Bank?",
                solution: "Banka nerede",
                altSolutions: ["Banka nerede?", "Banka nerededir", "Banka nerededir?"],
                hint: "Bank + wo",
                explanation: "„nerede“ (wo) kennst du aus A1 – hier mit dem neuen Wort „banka“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Neben dem Park gibt es eine Post.“",
                tokens: ["Parkın", "yanında", "bir", "postane", "var."],
                solution: "Parkın yanında bir postane var.",
                translation: "Neben dem Park gibt es eine Post.",
                explanation: "„yanında“ (neben) mit „park“ und „var“ – dieselbe Struktur wie vorhin.",
                audioText: "Parkın yanında bir postane var.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Mahallemde büyük bir park var.",
                question: "Was gibt es im Viertel?",
                options: ["einen großen Park", "eine kleine Apotheke", "keine Bank"],
                correctIndex: 0,
                explanation: "„mahallemde“ = in meinem Viertel, „park“, „var“. „büyük“ (groß) recycelt A1.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du brauchst Medikamente. Wohin gehst du?",
                options: ["eczaneye", "postaneye", "bankaya", "parka"],
                correctIndex: 0,
                explanation: "„eczane“ = Apotheke → „eczaneye“ (zur Apotheke). Die anderen Orte kennst du jetzt auch.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Wohnung & Reise zu.",
                pairs: [
                  { source: "das Haus / Zuhause", target: "ev" },
                  { source: "die Wohnung", target: "daire" },
                  { source: "die Küche", target: "mutfak" },
                  { source: "das Bad", target: "banyo" },
                  { source: "das Wohnzimmer", target: "salon" },
                  { source: "der Balkon", target: "balkon" },
                  { source: "der Bus", target: "otobüs" },
                  { source: "der Zug", target: "tren" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Evde mutfak, banyo, salon ve balkon var. Otobüs biletim var, tren beşinci perondan kalkıyor.",
                translation: "Zu Hause gibt es Küche, Bad, Wohnzimmer und Balkon. Ich habe ein Busticket, der Zug fährt von Steig fünf ab.",
                tip: "🔁 Wiederholung: Wohnung & Reise – „mutfak“, „banyo“, „salon“, „balkon“, „bilet“, „tren“, „peron“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Spaziergang durchs Viertel",
                scene: "Ayşe ist neu im Viertel und fragt dich nach dem Weg zu Geschäften.",
                turns: [
                  { speaker: "Ayşe", text: "Affedersiniz, yakında market var mı?", translation: "Entschuldigung, gibt es in der Nähe einen Supermarkt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, parkın yanında bir market var.", correct: true, feedback: "Perfekt – „yanında“ mit Ortsangabe, genau wie geübt!" },
                      { text: "Market yok, ama oda var.", correct: false, feedback: "„oda“ (Zimmer) passt hier nicht – es geht um Orte im Viertel." },
                      { text: "Marketa gittim.", correct: false, feedback: "Das ist Vergangenheit („ich ging“). Sie fragt, WO der Markt ist – nutz „var“ + „yanında“." },
                    ],
                  },
                  { speaker: "Ayşe", text: "Teşekkürler! Peki eczane nerede?", translation: "Danke! Und wo ist die Apotheke?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Eczane, marketin karşısında.", correct: true, feedback: "Stark! „karşısında“ (gegenüber) sauber eingesetzt." },
                      { text: "Eczane çok lezzetli.", correct: false, feedback: "„lecker“ passt zu Essen, nicht zu einer Apotheke – sag, wo sie liegt." },
                    ],
                  },
                  { speaker: "Ayşe", text: "Çok teşekkür ederim, çok yardımcı oldunuz!", translation: "Vielen Dank, Sie haben mir sehr geholfen!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u3-l3",
          title: "Wege beschreiben",
          intro:
            "Ein Tourist fragt dich nach dem Weg: Lerne, aktiv eine Wegbeschreibung zu geben.",
          grammarTip:
            "Höfliche Aufforderungen (Sie-Form) enden auf -in/-ın: gitmek → gidin (gehen Sie), dönmek → dönün (biegen Sie ab). „Ablativ -dan/-den“ = von: buradan = von hier. Recyceln: affedersiniz, nerede, market.",
          vocab: [
            { source: "gehen Sie geradeaus", target: "düz gidin", exampleSource: "Gehen Sie geradeaus.", exampleTarget: "Düz gidin." },
            { source: "biegen Sie rechts ab", target: "sağa dönün" },
            { source: "biegen Sie links ab", target: "sola dönün" },
            { source: "die Straße", target: "sokak" },
            { source: "die zweite Straße", target: "ikinci sokak" },
            { source: "die Ecke", target: "köşe", exampleSource: "an der Ecke", exampleTarget: "köşede" },
            { source: "von hier", target: "buradan" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Düz gidin, sonra sağa dönün“?",
                audioText: "Düz gidin, sonra sağa dönün.",
                options: ["Gehen Sie geradeaus, dann biegen Sie rechts ab.", "Gehen Sie nach Hause.", "Der Weg ist lang.", "Wo ist die Straße?"],
                correctIndex: 0,
                explanation: "„düz gidin“ = gehen Sie geradeaus, „sonra“ (dann, aus A2 Lektion 8), „sağa dönün“ = biegen Sie rechts ab.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Wegbeschreibungen zu.",
                pairs: [
                  { source: "geradeaus gehen", target: "düz gidin" },
                  { source: "rechts abbiegen", target: "sağa dönün" },
                  { source: "links abbiegen", target: "sola dönün" },
                  { source: "die Ecke", target: "köşe" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Market, ikinci ___ köşede.",
                options: ["sokakta", "sokak", "buradan"],
                solution: "sokakta",
                translation: "Der Supermarkt ist an der Ecke der zweiten Straße.",
                explanation: "„sokak“ → „sokakta“ (in der Straße, Lokativ). „market“ und „köşe“ recyceln wir.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Biegen Sie an der Ecke links ab.“",
                tokens: ["Köşede", "sola", "dönün."],
                solution: "Köşede sola dönün.",
                translation: "Biegen Sie an der Ecke links ab.",
                explanation: "„köşede“ (an der Ecke) + „sola dönün“ (biegen Sie links ab).",
                audioText: "Köşede sola dönün.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Entschuldigung, wo ist die Apotheke?",
                solution: "Affedersiniz, eczane nerede",
                altSolutions: ["Affedersiniz, eczane nerede?", "Affedersiniz eczane nerede", "Pardon, eczane nerede?"],
                hint: "Entschuldigung + Apotheke + wo",
                explanation: "„affedersiniz“ und „nerede“ sind A1-Recycling; „eczane“ kam in Lektion 11.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Buradan düz gidin, eczane sağda.",
                question: "Wo ist die Apotheke?",
                options: ["geradeaus, auf der rechten Seite", "links um die Ecke", "gegenüber der Post"],
                correctIndex: 0,
                explanation: "„buradan“ = von hier, „düz gidin“ = geradeaus, „sağda“ (rechts) recycelt A1.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Düz gidin, köşede sağa dönün. Market solda.",
                translation: "Gehen Sie geradeaus, biegen Sie an der Ecke rechts ab. Der Supermarkt ist links.",
                tip: "„sağ“ (rechts) und „sol“ (links) klingen kurz – achte auf das weiche „ğ“ in „sağa“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Viertel & Arzt zu.",
                pairs: [
                  { source: "das Viertel", target: "mahalle" },
                  { source: "der Park", target: "park" },
                  { source: "die Bank", target: "banka" },
                  { source: "neben", target: "yanında" },
                  { source: "gegenüber", target: "karşısında" },
                  { source: "der Arzt", target: "doktor" },
                  { source: "das Medikament", target: "ilaç" },
                  { source: "das Fieber", target: "ateş" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Hastayım, boğazım ve başım ağrıyor. Doktora gittim, ilaç aldım. Doktor: Geçmiş olsun!",
                translation: "Ich bin krank, mein Hals und mein Kopf tun weh. Ich war beim Arzt, habe Medikamente geholt. Der Arzt: Gute Besserung!",
                tip: "🔁 Wiederholung: „hasta“, „boğazım“, „başım ağrıyor“, „doktor“, „ilaç“, „Geçmiş olsun“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Ein Tourist fragt nach dem Weg",
                scene: "Am Parkeingang spricht dich ein Tourist an.",
                turns: [
                  { speaker: "Turist", text: "Affedersiniz, postane nerede?", translation: "Entschuldigung, wo ist die Post?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Buradan düz gidin, sonra sola dönün.", correct: true, feedback: "Perfekt – klare Wegbeschreibung mit „düz gidin“ und „sola dönün“!" },
                      { text: "Postane çok güzel.", correct: false, feedback: "„schön“ hilft nicht beim Weg – erklär, wie er hinkommt." },
                      { text: "Postaneye gittim.", correct: false, feedback: "Vergangenheit passt nicht – gib eine Anweisung mit „gidin“." },
                    ],
                  },
                  { speaker: "Turist", text: "Uzak mı?", translation: "Ist es weit?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hayır, yakın. İkinci sokakta.", correct: true, feedback: "Stark! „yakın“ (nah, A1) plus „ikinci sokakta“ – präzise!" },
                      { text: "Evet, mutfakta.", correct: false, feedback: "„in der Küche“ ergibt hier keinen Sinn – sag, ob die Post nah oder weit ist." },
                    ],
                  },
                  { speaker: "Turist", text: "Çok teşekkür ederim!", translation: "Vielen Dank!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 4: Arbeit & Schule – Job, Lernen, Telefonieren
    // ================================================================
    {
      title: "Arbeit & Schule",
      description: "Über den Arbeitstag sprechen, übers Türkischlernen reden und am Telefon zurechtkommen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u4-l1",
          title: "Mein Arbeitstag",
          intro:
            "Ein Kollege fragt nach deinem Job: Erzähle von deinem Arbeitstag und wie viel los ist.",
          grammarTip:
            "„yoğun“ = beschäftigt/viel los: „İşte çok yoğunum“ = Auf der Arbeit habe ich viel zu tun. Gewohnheiten drückst du mit dem Präsens auf -yorum aus (başlıyorum = ich fange an). Recyceln: her gün, saat kaçta, önce/sonra.",
          vocab: [
            { source: "die Arbeit / der Job", target: "iş", exampleSource: "Ich gehe zur Arbeit.", exampleTarget: "İşe gidiyorum." },
            { source: "das Büro", target: "ofis" },
            { source: "das Meeting", target: "toplantı", exampleSource: "Um zehn Uhr habe ich ein Meeting.", exampleTarget: "Saat onda toplantı var." },
            { source: "der/die Arbeitskolleg:in", target: "iş arkadaşı" },
            { source: "das Projekt", target: "proje" },
            { source: "viel zu tun / beschäftigt", target: "yoğun" },
            { source: "ich fange an", target: "başlıyorum" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „İşte çok yoğunum“?",
                audioText: "İşte çok yoğunum.",
                options: ["Auf der Arbeit habe ich viel zu tun.", "Ich gehe nicht zur Arbeit.", "Mein Büro ist groß.", "Das Meeting ist morgen."],
                correctIndex: 0,
                explanation: "„iş“ = Arbeit → „işte“ (auf der Arbeit, Lokativ), „yoğun“ = viel zu tun, „-um“ = ich bin.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Arbeitswörter zu.",
                pairs: [
                  { source: "das Büro", target: "ofis" },
                  { source: "das Meeting", target: "toplantı" },
                  { source: "das Projekt", target: "proje" },
                  { source: "der/die Kolleg:in", target: "iş arkadaşı" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Her gün saat dokuzda ___.",
                options: ["başlıyorum", "başladım", "başlar"],
                solution: "başlıyorum",
                translation: "Jeden Tag fange ich um neun Uhr an.",
                explanation: "„her gün“ (jeden Tag) und „saat … da“ recyceln A2 Lektion 8; „başlıyorum“ = ich fange an.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Um zehn Uhr habe ich ein Meeting.“",
                tokens: ["Saat", "onda", "toplantı", "var."],
                solution: "Saat onda toplantı var.",
                translation: "Um zehn Uhr habe ich ein Meeting.",
                explanation: "„saat onda“ (um zehn Uhr) recycelt die Uhrzeit; „toplantı var“ = es gibt ein Meeting.",
                audioText: "Saat onda toplantı var.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Meine Arbeit ist heute anstrengend.",
                solution: "İşim bugün yoğun",
                altSolutions: ["İşim bugün yoğun.", "Bugün işim yoğun", "Bugün işim çok yoğun"],
                hint: "meine-Arbeit + heute + viel-zu-tun",
                explanation: "„iş“ → „işim“ (meine Arbeit), „bugün“ (heute, A2 Lektion 7), „yoğun“.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Önce toplantı var, sonra projeye başlıyorum.",
                question: "Was passiert zuerst?",
                options: ["das Meeting", "das Projekt", "die Mittagspause"],
                correctIndex: 0,
                explanation: "„önce“ (zuerst) und „sonra“ (danach) recyceln A2; „toplantı“ kommt zuerst.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Wie sagst du „mit meinem Kollegen“?",
                options: ["iş arkadaşımla", "iş arkadaşı", "ofiste", "toplantıda"],
                correctIndex: 0,
                explanation: "„iş arkadaşı“ + „-mla“ = mit meinem Kollegen. „-la/-le“ (mit) kennst du aus „arkadaşlarımla“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Wohnung & Wegbeschreibung zu.",
                pairs: [
                  { source: "das Haus / Zuhause", target: "ev" },
                  { source: "die Küche", target: "mutfak" },
                  { source: "das Wohnzimmer", target: "salon" },
                  { source: "der Balkon", target: "balkon" },
                  { source: "gehen Sie geradeaus", target: "düz gidin" },
                  { source: "biegen Sie rechts ab", target: "sağa dönün" },
                  { source: "biegen Sie links ab", target: "sola dönün" },
                  { source: "die Ecke", target: "köşe" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dairemde banyo ve balkon var. Buradan düz gidin, ikinci sokakta sağa dönün, köşede market var.",
                translation: "In meiner Wohnung gibt es Bad und Balkon. Gehen Sie von hier geradeaus, biegen Sie in der zweiten Straße rechts ab, an der Ecke ist ein Supermarkt.",
                tip: "🔁 Wiederholung: Wohnung & Wege – „daire“, „banyo“, „buradan“, „sokak“, „sağa dönün“, „köşe“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Kaffeepause im Büro",
                scene: "Dein Kollege Murat fragt, wie dein Arbeitstag läuft.",
                turns: [
                  { speaker: "Murat", text: "Bugün nasıl, yoğun musun?", translation: "Wie ist es heute, hast du viel zu tun?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, çok yoğunum. Saat onda toplantı var.", correct: true, feedback: "Perfekt – „yoğunum“ plus Uhrzeit-Recycling, klingt sehr natürlich!" },
                      { text: "Hayır, mutfaktayım.", correct: false, feedback: "„in der Küche“ passt nicht zum Arbeitstag – sag, ob du viel zu tun hast." },
                      { text: "Dün sinemaya gittim.", correct: false, feedback: "Das war gestern – Murat fragt nach HEUTE auf der Arbeit." },
                    ],
                  },
                  { speaker: "Murat", text: "Ben de. Yeni projeye başladın mı?", translation: "Ich auch. Hast du mit dem neuen Projekt angefangen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, bu sabah başladım.", correct: true, feedback: "Stark! „bu sabah“ (heute Morgen) plus Vergangenheit „başladım“." },
                      { text: "Proje çok lezzetli.", correct: false, feedback: "Ein Projekt ist nicht „lecker“ – erzähl, ob du angefangen hast." },
                    ],
                  },
                  { speaker: "Murat", text: "Kolay gelsin! İyi çalışmalar.", translation: "Gute Arbeit! Viel Erfolg." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u4-l2",
          title: "Türkisch lernen",
          intro:
            "Im Sprachkurs redest du übers Lernen selbst – und über die wichtigsten Notfallsätze.",
          grammarTip:
            "„anlamadım“ = ich habe nicht verstanden – dein wichtigster Notfallsatz! „çünkü“ = weil verbindet zwei Sätze: „Türkçe öğreniyorum çünkü Türkiye’yi seviyorum.“ Recyceln: biraz, öğreniyorum.",
          vocab: [
            { source: "der Unterricht / die Lektion", target: "ders", exampleSource: "Der Unterricht ist schön.", exampleTarget: "Ders güzel." },
            { source: "der Kurs", target: "kurs" },
            { source: "das Wort", target: "kelime" },
            { source: "der Satz", target: "cümle" },
            { source: "wiederholen", target: "tekrar etmek" },
            { source: "verstehen", target: "anlamak" },
            { source: "ich habe nicht verstanden", target: "anlamadım", exampleSource: "Ich habe nicht verstanden, können Sie es wiederholen?", exampleTarget: "Anlamadım, tekrar eder misiniz?" },
            { source: "weil", target: "çünkü" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was sagst du, wenn du etwas nicht verstanden hast?",
                audioText: "Anlamadım, tekrar eder misiniz?",
                options: ["Anlamadım, tekrar eder misiniz?", "Çok lezzetli!", "Sağa dönün.", "Toplantı var."],
                correctIndex: 0,
                explanation: "„Anlamadım“ = ich habe nicht verstanden, „tekrar eder misiniz?“ = können Sie es wiederholen?",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Lern-Wörter zu.",
                pairs: [
                  { source: "das Wort", target: "kelime" },
                  { source: "der Satz", target: "cümle" },
                  { source: "der Kurs", target: "kurs" },
                  { source: "verstehen", target: "anlamak" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu ___ zor, tekrar eder misiniz?",
                options: ["kelime", "kurs", "cümle"],
                solution: "kelime",
                translation: "Dieses Wort ist schwer, können Sie es wiederholen?",
                explanation: "„kelime“ = Wort; „tekrar eder misiniz“ recyceln wir aus dieser Lektion.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich lerne Türkisch, weil ich die Türkei liebe.",
                solution: "Türkçe öğreniyorum çünkü Türkiye’yi seviyorum",
                altSolutions: ["Türkçe öğreniyorum çünkü Türkiye'yi seviyorum", "Türkçe öğreniyorum çünkü Türkiye’yi seviyorum."],
                hint: "Türkisch + ich-lerne + weil + Türkei + ich-liebe",
                explanation: "„öğreniyorum“ recycelt A1; „çünkü“ (weil) verbindet die zwei Sätze.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich verstehe dieses Wort nicht.“",
                tokens: ["Bu", "kelimeyi", "anlamıyorum."],
                solution: "Bu kelimeyi anlamıyorum.",
                translation: "Ich verstehe dieses Wort nicht.",
                explanation: "„kelime“ → „kelimeyi“ (Akkusativ), „anlamıyorum“ = ich verstehe nicht.",
                audioText: "Bu kelimeyi anlamıyorum.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Her gün beş yeni kelime öğreniyorum.",
                question: "Wie viele neue Wörter lernt die Person täglich?",
                options: ["fünf", "zwei", "zehn"],
                correctIndex: 0,
                explanation: "„her gün“ (jeden Tag), „beş“ (fünf, A1), „kelime“ (Wort), „öğreniyorum“ (ich lerne).",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Anlamadım. Bu cümleyi tekrar eder misiniz?",
                translation: "Ich habe nicht verstanden. Können Sie diesen Satz wiederholen?",
                tip: "„anlamadım“ betonst du am Ende: an-la-ma-DIM. „cümle“ hat ein weiches „c“ wie „dsch“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Viertel & Arbeit zu.",
                pairs: [
                  { source: "der Supermarkt", target: "market" },
                  { source: "die Apotheke", target: "eczane" },
                  { source: "die Post", target: "postane" },
                  { source: "das Viertel", target: "mahalle" },
                  { source: "die Arbeit / der Job", target: "iş" },
                  { source: "das Büro", target: "ofis" },
                  { source: "das Meeting", target: "toplantı" },
                  { source: "das Projekt", target: "proje" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Mahallemde market, eczane ve banka var; park karşısında. İş arkadaşımla ofiste toplantıya başlıyorum.",
                translation: "In meinem Viertel gibt es Supermarkt, Apotheke und Bank; der Park ist gegenüber. Mit meinem Kollegen fange ich im Büro ein Meeting an.",
                tip: "🔁 Wiederholung: Viertel & Arbeit – „mahalle“, „park“, „banka“, „karşısında“, „iş arkadaşı“, „başlıyorum“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Sprachkurs",
                scene: "Die Lehrerin Zeynep spricht schnell – du kommst nicht ganz mit.",
                turns: [
                  { speaker: "Zeynep", text: "Şimdi bu cümleyi Türkçe söyleyin.", translation: "Sagen Sie diesen Satz jetzt auf Türkisch." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Anlamadım, tekrar eder misiniz?", correct: true, feedback: "Perfekt – genau der Notfallsatz, den du brauchst!" },
                      { text: "Çok lezzetli, teşekkürler.", correct: false, feedback: "„lecker“ passt nicht in den Unterricht – sag, dass du es nicht verstanden hast." },
                      { text: "Sağa dönün.", correct: false, feedback: "Das ist eine Wegbeschreibung – hier geht es um den Satz." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Tabii. „Ben her gün Türkçe çalışıyorum.“ Anladınız mı?", translation: "Natürlich. „Ich lerne jeden Tag Türkisch.“ Haben Sie verstanden?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet, şimdi anladım. Teşekkürler!", correct: true, feedback: "Stark! „şimdi anladım“ = jetzt habe ich verstanden." },
                      { text: "Hayır, markete gittim.", correct: false, feedback: "Das ergibt keinen Sinn – sag, ob du es jetzt verstanden hast." },
                    ],
                  },
                  { speaker: "Zeynep", text: "Aferin! Çok iyi öğreniyorsunuz.", translation: "Bravo! Sie lernen sehr gut." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u4-l3",
          title: "Am Telefon",
          intro:
            "Dein Kollege ruft an, aber du bist beschäftigt: Lerne die wichtigsten Sätze fürs Telefonieren.",
          grammarTip:
            "Am Telefon: „Alo?“ (Hallo?), „…-i arıyorum“ = ich rufe … an, „meşgulüm“ = ich bin beschäftigt, „sonra ararım“ = ich rufe später an. Recyceln: merhaba, teşekkürler, aradım (ich rief an).",
          vocab: [
            { source: "Hallo? (am Telefon)", target: "alo", exampleSource: "Hallo? Wer spricht?", exampleTarget: "Alo? Kim arıyor?" },
            { source: "ich rufe an", target: "arıyorum" },
            { source: "die Nachricht", target: "mesaj" },
            { source: "beschäftigt / besetzt", target: "meşgul", exampleSource: "Ich bin gerade beschäftigt.", exampleTarget: "Şu an meşgulüm." },
            { source: "ich rufe später an", target: "sonra ararım" },
            { source: "sprechen / sich treffen", target: "görüşmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Şu an meşgulüm, sonra ararım“?",
                audioText: "Şu an meşgulüm, sonra ararım.",
                options: ["Ich bin gerade beschäftigt, ich rufe später an.", "Ich habe eine Nachricht bekommen.", "Wer ruft an?", "Ich gehe zur Arbeit."],
                correctIndex: 0,
                explanation: "„şu an“ = gerade, „meşgulüm“ = ich bin beschäftigt, „sonra ararım“ = ich rufe später an.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Telefon-Wörter zu.",
                pairs: [
                  { source: "Hallo? (am Telefon)", target: "alo" },
                  { source: "die Nachricht", target: "mesaj" },
                  { source: "beschäftigt", target: "meşgul" },
                  { source: "ich rufe an", target: "arıyorum" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Şu an ___, sonra ararım.",
                options: ["meşgulüm", "meşgul", "mesaj"],
                solution: "meşgulüm",
                translation: "Ich bin gerade beschäftigt, ich rufe später an.",
                explanation: "„meşgul“ + „-üm“ = ich bin beschäftigt. „sonra“ (danach) recycelt A2.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich rufe später an, ich schicke dir eine Nachricht.“",
                tokens: ["Sonra", "ararım,", "sana", "mesaj", "atarım."],
                solution: "Sonra ararım, sana mesaj atarım.",
                translation: "Ich rufe später an, ich schicke dir eine Nachricht.",
                explanation: "„sonra ararım“ und „mesaj“ recyceln wir; „sana“ (dir) kennst du aus A1.",
                audioText: "Sonra ararım, sana mesaj atarım.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Hallo? Wer ruft an?",
                solution: "Alo? Kim arıyor",
                altSolutions: ["Alo? Kim arıyor?", "Alo, kim arıyor?", "Alo kim arıyor"],
                hint: "Hallo + wer + ruft-an",
                explanation: "„alo“ am Telefon, „kim“ (wer, A1), „arıyor“ (ruft an).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Merhaba, ben Ali. Murat’la görüşebilir miyim?",
                question: "Mit wem möchte Ali sprechen?",
                options: ["mit Murat", "mit Ayşe", "mit dem Kollegen"],
                correctIndex: 0,
                explanation: "„görüşmek“ = sprechen, „Murat’la“ = mit Murat. „merhaba“ recycelt A1.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du hast keine Zeit zu reden. Was sagst du höflich?",
                options: ["Şu an meşgulüm, sonra ararım.", "Alo, kim arıyor?", "Mesaj yok.", "Görüşürüz!"],
                correctIndex: 0,
                explanation: "Höflich vertagen: „meşgulüm, sonra ararım“ – erst der Grund, dann das Versprechen zurückzurufen.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Lernen & Wege zu.",
                pairs: [
                  { source: "der Unterricht / die Lektion", target: "ders" },
                  { source: "der Kurs", target: "kurs" },
                  { source: "das Wort", target: "kelime" },
                  { source: "der Satz", target: "cümle" },
                  { source: "verstehen", target: "anlamak" },
                  { source: "die Ecke", target: "köşe" },
                  { source: "die Straße", target: "sokak" },
                  { source: "gehen Sie geradeaus", target: "düz gidin" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Buradan düz gidin, köşede sağa dönün, sonra sola dönün. Derste yeni kelime öğrendim ama anlamadım, çünkü zor. Tekrar ediyorum.",
                translation: "Gehen Sie von hier geradeaus, biegen Sie an der Ecke rechts ab, dann links. Im Unterricht habe ich ein neues Wort gelernt, aber nicht verstanden, weil es schwer ist. Ich wiederhole.",
                tip: "🔁 Wiederholung: Wege & Lernen – „buradan“, „köşe“, „sağa/sola dönün“, „ders“, „kelime“, „anlamadım“, „çünkü“, „tekrar“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Ein Anruf zur falschen Zeit",
                scene: "Dein Kollege Ali ruft an, während du in einem Meeting bist.",
                turns: [
                  { speaker: "Ali", text: "Alo, merhaba! Müsait misin?", translation: "Hallo! Hast du kurz Zeit?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Şu an meşgulüm, toplantıdayım. Sonra ararım.", correct: true, feedback: "Perfekt – Grund („toplantıdayım“, recycelt) plus höfliches „sonra ararım“!" },
                      { text: "Evet, sinemaya gittim.", correct: false, feedback: "Das war gestern – sag, ob du JETZT Zeit hast." },
                      { text: "Eczane nerede?", correct: false, feedback: "Die Wegfrage passt nicht ans Telefon – sag, dass du beschäftigt bist." },
                    ],
                  },
                  { speaker: "Ali", text: "Tabii, sorun değil. Bir mesaj atarım.", translation: "Klar, kein Problem. Ich schreibe dir eine Nachricht." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Tamam, teşekkürler. Sonra görüşürüz!", correct: true, feedback: "Stark! „sonra görüşürüz“ = wir sprechen später – natürlicher Abschluss." },
                      { text: "Anlamadım, tekrar eder misiniz?", correct: false, feedback: "Hier hast du alles verstanden – ein freundlicher Abschluss reicht." },
                    ],
                  },
                  { speaker: "Ali", text: "Görüşürüz, iyi çalışmalar!", translation: "Bis später, viel Erfolg bei der Arbeit!" },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 5: Feste & Einladungen – einladen, gratulieren, zu Gast sein
    // ================================================================
    {
      title: "Feste & Einladungen",
      description: "Einladen, zu- und absagen, gratulieren und sich als Gast richtig verhalten.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u5-l1",
          title: "Kommst du zu meiner Party?",
          intro:
            "Du planst eine Geburtstagsfeier: Lade Freunde ein und lerne, zu- oder abzusagen.",
          grammarTip:
            "Höfliche Einladung als Chunk: „Partime gelir misin?“ = Kommst du zu meiner Party? Zusagen: „Tabii, gelirim!“ (Klar, ich komme!), absagen: „Maalesef gelemem“ (Leider kann ich nicht kommen). Recyceln: hafta sonu, saat kaçta.",
          vocab: [
            { source: "die Einladung", target: "davet", exampleSource: "Danke für die Einladung!", exampleTarget: "Davet için teşekkürler!" },
            { source: "die Party / Feier", target: "parti" },
            { source: "der Geburtstag", target: "doğum günü", exampleSource: "Am Samstag ist mein Geburtstag.", exampleTarget: "Cumartesi doğum günüm." },
            { source: "das Geschenk", target: "hediye" },
            { source: "Klar, ich komme!", target: "Tabii, gelirim!" },
            { source: "Leider kann ich nicht kommen.", target: "Maalesef gelemem." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Partime gelir misin?“",
                audioText: "Partime gelir misin?",
                options: ["Kommst du zu meiner Party?", "Wo ist die Party?", "Wann ist dein Geburtstag?", "Magst du Geschenke?"],
                correctIndex: 0,
                explanation: "„parti“ → „partime“ (zu meiner Party), „gelir misin?“ = kommst du? – eine höfliche Einladung.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Feier-Wörter zu.",
                pairs: [
                  { source: "die Einladung", target: "davet" },
                  { source: "die Party", target: "parti" },
                  { source: "das Geschenk", target: "hediye" },
                  { source: "der Geburtstag", target: "doğum günü" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Cumartesi ___ günüm, partime gel!",
                options: ["doğum", "hediye", "davet"],
                solution: "doğum",
                translation: "Am Samstag ist mein Geburtstag, komm zu meiner Party!",
                explanation: "„doğum günü“ = Geburtstag. „Cumartesi“ (Samstag) und „parti“ recyceln wir.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Du willst zusagen. Was sagst du?",
                options: ["Tabii, gelirim!", "Maalesef gelemem.", "Parti nerede?", "Hediye yok."],
                correctIndex: 0,
                explanation: "„Tabii, gelirim!“ = Klar, ich komme! „gelmek“ (kommen) in der Ich-Form.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Leider kann ich am Wochenende nicht kommen.“",
                tokens: ["Maalesef", "hafta sonu", "gelemem."],
                solution: "Maalesef hafta sonu gelemem.",
                translation: "Leider kann ich am Wochenende nicht kommen.",
                explanation: "„maalesef“ (leider), „hafta sonu“ (Wochenende, recycelt aus A2), „gelemem“ (ich kann nicht kommen).",
                audioText: "Maalesef hafta sonu gelemem.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Danke für die Einladung!",
                solution: "Davet için teşekkürler",
                altSolutions: ["Davet için teşekkürler!", "Davet için teşekkür ederim", "Davet için teşekkür ederim."],
                hint: "Einladung + für + danke",
                explanation: "„davet“ = Einladung, „için“ = für, „teşekkürler“ recycelt A1.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Doğum günü partisi saat sekizde başlıyor.",
                question: "Wann beginnt die Geburtstagsparty?",
                options: ["um acht Uhr", "um sechs Uhr", "am Wochenende"],
                correctIndex: 0,
                explanation: "„saat sekizde“ (um acht Uhr) recycelt die Uhrzeit; „başlıyor“ (beginnt) kam in Unit 4.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Arbeit & Telefon zu.",
                pairs: [
                  { source: "Hallo? (am Telefon)", target: "alo" },
                  { source: "ich rufe an", target: "arıyorum" },
                  { source: "die Nachricht", target: "mesaj" },
                  { source: "beschäftigt", target: "meşgul" },
                  { source: "sprechen / sich treffen", target: "görüşmek" },
                  { source: "die Arbeit / der Job", target: "iş" },
                  { source: "das Büro", target: "ofis" },
                  { source: "das Meeting", target: "toplantı" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Ofiste iş arkadaşımla projeye başladım, çok meşgulüm. Alo? Şimdi toplantıdayım, sonra ararım.",
                translation: "Im Büro habe ich mit meinem Kollegen am Projekt angefangen, ich bin sehr beschäftigt. Hallo? Ich bin gerade im Meeting, ich rufe später an.",
                tip: "🔁 Wiederholung: Arbeit & Telefon – „ofis“, „iş arkadaşı“, „proje“, „meşgul“, „alo“, „toplantı“, „sonra ararım“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die Einladung",
                scene: "Du rufst deine Freundin Deniz an und lädst sie zu deiner Geburtstagsfeier ein.",
                turns: [
                  { speaker: "Du", text: "Deniz, cumartesi doğum günüm. Partime gelir misin?", translation: "Deniz, am Samstag ist mein Geburtstag. Kommst du zu meiner Party?" },
                  { speaker: "Deniz", text: "Tabii, çok isterim! Saat kaçta?", translation: "Klar, sehr gern! Um wie viel Uhr?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Saat sekizde. Adres için mesaj atarım.", correct: true, feedback: "Perfekt – Uhrzeit plus „mesaj atarım“ (aus Unit 4) sauber recycelt!" },
                      { text: "Doğum günü yok.", correct: false, feedback: "Widersprüchlich – du hast doch gerade eingeladen! Nenn die Uhrzeit." },
                      { text: "Anlamadım.", correct: false, feedback: "Du verstehst die Frage doch – sag ihr einfach die Uhrzeit." },
                    ],
                  },
                  { speaker: "Deniz", text: "Harika! Sana güzel bir hediye alırım.", translation: "Super! Ich bringe dir ein schönes Geschenk mit." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Gerek yok, sadece gel yeter!", correct: true, feedback: "Sehr sympathisch! „gerek yok“ = nicht nötig – du freust dich einfach über ihr Kommen." },
                      { text: "Hediye nerede?", correct: false, feedback: "Etwas fordernd – bedank dich lieber, statt nach dem Geschenk zu fragen." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u5-l2",
          title: "Herzlichen Glückwunsch!",
          intro:
            "Auf der Feier gratulierst du und lernst die wichtigsten Glückwünsche und Festtags-Grüße.",
          grammarTip:
            "Feste Glückwunsch-Formeln: „Doğum günün kutlu olsun!“ = Herzlichen Glückwunsch zum Geburtstag! „İyi bayramlar!“ = Frohe Feiertage! Lern sie als Chunks. Recyceln: çok güzel, teşekkür ederim.",
          vocab: [
            { source: "das Fest / der Feiertag", target: "bayram", exampleSource: "Frohe Feiertage!", exampleTarget: "İyi bayramlar!" },
            { source: "feiern", target: "kutlamak" },
            { source: "Herzlichen Glückwunsch! (wörtl. es sei gesegnet)", target: "kutlu olsun", exampleSource: "Herzlichen Glückwunsch zum Geburtstag!", exampleTarget: "Doğum günün kutlu olsun!" },
            { source: "glücklich", target: "mutlu" },
            { source: "die Gesundheit", target: "sağlık" },
            { source: "Frohe Feiertage!", target: "İyi bayramlar!" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Doğum günün kutlu olsun!“?",
                audioText: "Doğum günün kutlu olsun!",
                options: ["Herzlichen Glückwunsch zum Geburtstag!", "Frohe Feiertage!", "Gute Besserung!", "Guten Appetit!"],
                correctIndex: 0,
                explanation: "„doğum günün“ (dein Geburtstag, aus Lektion 16) + „kutlu olsun“ (Glückwunsch-Formel).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Fest-Wörter zu.",
                pairs: [
                  { source: "das Fest", target: "bayram" },
                  { source: "feiern", target: "kutlamak" },
                  { source: "glücklich", target: "mutlu" },
                  { source: "die Gesundheit", target: "sağlık" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Doğum günün ___ olsun!",
                options: ["kutlu", "mutlu", "sağlık"],
                solution: "kutlu",
                translation: "Herzlichen Glückwunsch zum Geburtstag!",
                explanation: "„kutlu olsun“ ist die feste Glückwunsch-Formel; „doğum günü“ recyceln wir aus Lektion 16.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Frohe Feiertage!",
                solution: "İyi bayramlar",
                altSolutions: ["İyi bayramlar!", "iyi bayramlar", "İyi bayramlar."],
                hint: "gute + Feste",
                explanation: "„bayram“ = Fest → „iyi bayramlar“ ist der Standard-Gruß zu Feiertagen.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Wir feiern deinen Geburtstag zusammen.“",
                tokens: ["Doğum gününü", "birlikte", "kutlarız."],
                solution: "Doğum gününü birlikte kutlarız.",
                translation: "Wir feiern deinen Geburtstag zusammen.",
                explanation: "„kutlamak“ (feiern) → „kutlarız“ (wir feiern); „birlikte“ = zusammen.",
                audioText: "Doğum gününü birlikte kutlarız.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Sana sağlık ve mutluluk dilerim.",
                question: "Was wünscht die Person?",
                options: ["Gesundheit und Glück", "ein Geschenk", "eine Party"],
                correctIndex: 0,
                explanation: "„sağlık“ (Gesundheit) und „mutluluk“ (Glück, von „mutlu“) – klassische Wünsche.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Doğum günün kutlu olsun! Sana sağlık ve mutluluk dilerim.",
                translation: "Herzlichen Glückwunsch zum Geburtstag! Ich wünsche dir Gesundheit und Glück.",
                tip: "„kutlu olsun“ fließt zusammen: kut-lu-ol-sun. Das „ğ“ in „doğum“ wird kaum gesprochen: do-um.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Lernen & Einladung zu.",
                pairs: [
                  { source: "die Einladung", target: "davet" },
                  { source: "die Party", target: "parti" },
                  { source: "das Geschenk", target: "hediye" },
                  { source: "das Wort", target: "kelime" },
                  { source: "der Satz", target: "cümle" },
                  { source: "der Unterricht", target: "ders" },
                  { source: "verstehen", target: "anlamak" },
                  { source: "weil", target: "çünkü" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Türkçe kursunda yeni cümle öğrendim, anlamadım ama tekrar ettim. Partiye davet için: Tabii, gelirim!",
                translation: "Im Türkischkurs habe ich einen neuen Satz gelernt, nicht verstanden, aber wiederholt. Auf die Party-Einladung: Klar, ich komme!",
                tip: "🔁 Wiederholung: Lernen & Einladung – „kurs“, „cümle“, „anlamadım“, „tekrar“, „parti“, „davet“, „Tabii, gelirim“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf der Geburtstagsfeier",
                scene: "Du kommst bei Deniz’ Feier an und gratulierst ihr.",
                turns: [
                  { speaker: "Du", text: "Deniz, doğum günün kutlu olsun!", translation: "Deniz, herzlichen Glückwunsch zum Geburtstag!" },
                  { speaker: "Deniz", text: "Çok teşekkür ederim! Hoş geldin.", translation: "Vielen Dank! Willkommen." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bu küçük bir hediye. Sana sağlık ve mutluluk dilerim!", correct: true, feedback: "Perfekt – „hediye“ (aus Lektion 16) plus herzlicher Wunsch!" },
                      { text: "Parti nerede?", correct: false, feedback: "Du bist doch schon da – überreich lieber dein Geschenk und gratuliere." },
                      { text: "Maalesef gelemem.", correct: false, feedback: "Du bist bereits auf der Party – „ich kann nicht kommen“ passt nicht mehr." },
                    ],
                  },
                  { speaker: "Deniz", text: "Ay, çok naziksin! Çok mutlu oldum.", translation: "Oh, wie nett von dir! Ich habe mich sehr gefreut." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Ben de çok mutluyum. İyi ki doğdun!", correct: true, feedback: "Wunderbar! „İyi ki doğdun“ = schön, dass du geboren wurdest – ein liebevoller Geburtstagsgruß." },
                      { text: "Görüşürüz, meşgulüm.", correct: false, feedback: "So früh gehen? Bleib und feiere mit – das passt nicht zum Anlass." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-a2-u5-l3",
          title: "Beim Abendessen zu Gast",
          intro:
            "Du bist zum Essen eingeladen: Lerne, dich als Gast höflich zu verhalten – der A2-Abschluss-Dialog.",
          grammarTip:
            "Als Gast wichtig: „Buyurun“ (Bitte sehr / greifen Sie zu), „Eline sağlık“ (Kompliment an den Koch), „Doydum“ (ich bin satt), „biraz daha“ (noch ein bisschen). Recyceln: afiyet olsun, çok lezzetli, yedim/içtim.",
          vocab: [
            { source: "der Gast", target: "misafir", exampleSource: "Du bist mein Gast.", exampleTarget: "Sen benim misafirimsin." },
            { source: "Gesegnet seien deine Hände (Lob an den Koch)", target: "eline sağlık" },
            { source: "ich bin satt", target: "doydum", exampleSource: "Danke, ich bin satt.", exampleTarget: "Teşekkürler, doydum." },
            { source: "noch ein bisschen", target: "biraz daha" },
            { source: "lecker", target: "lezzetli" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Die Gastgeberin sagt „Buyurun!“ – was meint sie?",
                audioText: "Buyurun, afiyet olsun!",
                options: ["Bitte, greifen Sie zu!", "Ich bin satt.", "Wo ist die Küche?", "Frohe Feiertage!"],
                correctIndex: 0,
                explanation: "„Buyurun“ ist die höfliche Einladung zuzugreifen; „afiyet olsun“ (guten Appetit) recyceln wir aus A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Gast-Wörter zu.",
                pairs: [
                  { source: "der Gast", target: "misafir" },
                  { source: "ich bin satt", target: "doydum" },
                  { source: "noch ein bisschen", target: "biraz daha" },
                  { source: "lecker", target: "lezzetli" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Yemek çok ___, eline sağlık!",
                options: ["lezzetli", "meşgul", "yoğun"],
                solution: "lezzetli",
                translation: "Das Essen ist sehr lecker, gesegnet seien deine Hände!",
                explanation: "„lezzetli“ (lecker) plus „eline sağlık“ – das perfekte Kompliment an den Koch.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Die Gastgeberin fragt „Biraz daha?“ – du bist satt. Was sagst du höflich?",
                options: ["Teşekkürler, doydum.", "Evet, çok yoğun.", "Maalesef gelemem.", "Sağa dönün."],
                correctIndex: 0,
                explanation: "„Teşekkürler, doydum“ = Danke, ich bin satt – die höfliche Art, weiteres Essen abzulehnen.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Danke, das Essen war sehr lecker.“",
                tokens: ["Teşekkürler,", "yemek", "çok", "lezzetliydi."],
                solution: "Teşekkürler, yemek çok lezzetliydi.",
                translation: "Danke, das Essen war sehr lecker.",
                explanation: "„lezzetli“ + „-ydi“ = war lecker (Vergangenheit von „sein“, wie „güzeldi“).",
                audioText: "Teşekkürler, yemek çok lezzetliydi.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Du bist mein Gast, bitte greif zu!",
                solution: "Sen benim misafirimsin, buyurun",
                altSolutions: ["Sen benim misafirimsin, buyurun!", "Misafirimsin, buyurun", "Sen misafirimsin, buyurun"],
                hint: "du + mein-Gast-bist + greif-zu",
                explanation: "„misafir“ = Gast → „misafirimsin“ (du bist mein Gast); „buyurun“ lädt zum Zugreifen ein.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Eline sağlık! Yemek çok lezzetliydi, doydum.",
                translation: "Gesegnet seien deine Hände! Das Essen war sehr lecker, ich bin satt.",
                tip: "„eline sağlık“ ist DAS Kompliment nach dem Essen – sprich es warm und mit Betonung auf „sağ-LIK“.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Telefon & Fest zu.",
                pairs: [
                  { source: "das Fest / der Feiertag", target: "bayram" },
                  { source: "feiern", target: "kutlamak" },
                  { source: "glücklich", target: "mutlu" },
                  { source: "Frohe Feiertage!", target: "İyi bayramlar!" },
                  { source: "die Nachricht", target: "mesaj" },
                  { source: "beschäftigt", target: "meşgul" },
                  { source: "sprechen / sich treffen", target: "görüşmek" },
                  { source: "ich rufe an", target: "arıyorum" },
                  { source: "die Einladung", target: "davet" },
                  { source: "die Party", target: "parti" },
                  { source: "das Geschenk", target: "hediye" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Alo? Şu an meşgulüm, sonra ararım. Bayramda seni arıyorum: İyi bayramlar, doğum günün kutlu olsun, çok mutluyum!",
                translation: "Hallo? Ich bin gerade beschäftigt, ich rufe später an. Am Fest rufe ich dich an: Frohe Feiertage, herzlichen Glückwunsch zum Geburtstag, ich bin sehr glücklich!",
                tip: "🔁 Wiederholung: Telefon & Fest – „alo“, „meşgul“, „sonra ararım“, „bayram“, „arıyorum“, „İyi bayramlar“, „kutlu olsun“, „mutlu“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Zu Gast bei Familie Yılmaz",
                scene: "Der A2-Abschluss: Du bist zum Abendessen eingeladen und meisterst den ganzen Besuch.",
                turns: [
                  { speaker: "Ev sahibi", text: "Hoş geldin! Buyurun, sofraya oturun.", translation: "Willkommen! Bitte, setzen Sie sich an den Tisch." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hoş bulduk! Çok teşekkür ederim, davet için sağ olun.", correct: true, feedback: "Perfekt – „Hoş bulduk“ ist die richtige Antwort auf „Hoş geldin“, plus Dank für die Einladung!" },
                      { text: "Meşgulüm, sonra ararım.", correct: false, feedback: "Du bist doch schon da – die Telefon-Floskel passt hier nicht." },
                      { text: "Eczane nerede?", correct: false, feedback: "Keine Wegfrage beim Essen – bedank dich für die Einladung." },
                    ],
                  },
                  { speaker: "Ev sahibi", text: "Afiyet olsun! Yemek nasıl?", translation: "Guten Appetit! Wie schmeckt das Essen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok lezzetli, eline sağlık!", correct: true, feedback: "Stark! Genau das Kompliment, das man in der Türkei erwartet." },
                      { text: "Doydum, gelemem.", correct: false, feedback: "Widersprüchlich und unhöflich früh – lob lieber erst das Essen." },
                    ],
                  },
                  { speaker: "Ev sahibi", text: "Ellerine sağlık, ye ye! Biraz daha pilav?", translation: "Danke dir, iss, iss! Noch ein bisschen Reis?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok teşekkürler, doydum. Her şey çok güzeldi.", correct: true, feedback: "Perfekter A2-Abschluss – höflich abgelehnt, gelobt und bedankt. Tebrikler!" },
                      { text: "Evet, sola dönün.", correct: false, feedback: "Die Wegbeschreibung gehört nicht an den Esstisch – lehn höflich mit „doydum“ ab." },
                    ],
                  },
                  { speaker: "Ev sahibi", text: "Ne güzel! Yine bekleriz, kapımız her zaman açık.", translation: "Wie schön! Kommen Sie wieder, unsere Tür steht immer offen." },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
