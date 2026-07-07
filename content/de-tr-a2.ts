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
  ],
};
