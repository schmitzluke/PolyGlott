import type { SeedCourse } from "../src/lib/types";

/**
 * Kurs Deutsch → Türkisch, Level B2 (Premium).
 * Baut auf A1–B1 auf. Neue Grammatik u. a.: miş-Vergangenheit aktiv,
 * Passiv -il/-in, Relativpartizipien (-an/-en, -dığı), Nominalisierung,
 * irrealer Konditional -seydi, Konnektoren (rağmen, oysa, üstelik),
 * formelles Register für Beruf & Korrespondenz. Handgeschrieben (SeedCourse).
 */
export const courseDeTrB2: SeedCourse = {
  slug: "tr-b2-fortgeschritten",
  title: "Türkisch B2 – Fließend & Souverän",
  description:
    "Komplexe Texte, Fachdiskussionen und spontane Gespräche – auf dem Weg zur echten Sprachbeherrschung.",
  level: "B2",
  sourceLang: "de",
  targetLang: "tr",
  isPremium: true,
  units: [
    // ================================================================
    // UNIT 1: Medya & Gündem – Nachrichten verstehen & hinterfragen
    // ================================================================
    {
      title: "Medya & Gündem – Nachrichten & Meinung",
      description: "Schlagzeilen verstehen, Medienkonsum diskutieren und die eigene Meinung fundiert vertreten.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u1-l1",
          title: "Schlagzeilen verstehen",
          intro:
            "Zeitung, Newsfeed, Eilmeldung: Lerne den Wortschatz, mit dem du türkische Nachrichten wirklich verstehst.",
          grammarTip:
            "Nachrichten lieben das Passiv -il/-in: „Haber dün yayınlandı“ = Die Nachricht wurde gestern veröffentlicht. „açıklandı“ = wurde bekannt gegeben. Wer es tat, bleibt oft ungenannt – genau wie im Deutschen.",
          vocab: [
            { source: "die Schlagzeile / Überschrift", target: "başlık" },
            { source: "der Journalist / die Journalistin", target: "gazeteci" },
            { source: "das Interview / die Reportage", target: "röportaj" },
            { source: "erklären / bekannt geben", target: "açıklamak", exampleSource: "Das neue Projekt wurde bekannt gegeben.", exampleTarget: "Yeni proje açıklandı." },
            { source: "die Sendung / Veröffentlichung", target: "yayın" },
            { source: "die Presse", target: "basın" },
            { source: "die Quelle", target: "kaynak", exampleSource: "Ist die Quelle vertrauenswürdig?", exampleTarget: "Kaynak güvenilir mi?" },
            { source: "vertrauenswürdig / zuverlässig", target: "güvenilir" },
            { source: "die Behauptung", target: "iddia" },
            { source: "bestätigen / verifizieren", target: "doğrulamak" },
            { source: "gefälscht / unecht", target: "sahte", exampleSource: "Das ist eine gefälschte Nachricht.", exampleTarget: "Bu sahte bir haber." },
            { source: "veröffentlicht werden", target: "yayınlanmak", exampleSource: "Das Interview wird morgen veröffentlicht.", exampleTarget: "Röportaj yarın yayınlanacak." },
            { source: "die Tagesthemen / Agenda", target: "gündem" },
            { source: "das Ereignis", target: "olay" },
            { source: "das Detail / die Einzelheit", target: "ayrıntı" },
            { source: "neutral / unparteiisch", target: "tarafsız" },
            { source: "übertreiben", target: "abartmak", exampleSource: "Die Presse übertreibt manchmal.", exampleTarget: "Basın bazen abartıyor." },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Yeni proje açıklandı“?",
                audioText: "Yeni proje açıklandı.",
                options: ["Das neue Projekt wurde bekannt gegeben.", "Das Projekt ist unklar.", "Jemand erklärt das Projekt gerade.", "Das Projekt wird bekannt gegeben werden."],
                correctIndex: 0,
                explanation: "Passiv Vergangenheit: açıklamak → açıklandı (wurde bekannt gegeben). Typischer Nachrichtenstil.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Presse-Wörter zu.",
                pairs: [
                  { source: "die Schlagzeile", target: "başlık" },
                  { source: "der Journalist", target: "gazeteci" },
                  { source: "die Quelle", target: "kaynak" },
                  { source: "die Presse", target: "basın" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu iddia henüz ___ – belki sahte.",
                options: ["doğrulanmadı", "yayınlandı", "abartıldı"],
                solution: "doğrulanmadı",
                translation: "Diese Behauptung wurde noch nicht bestätigt – vielleicht ist sie falsch.",
                explanation: "„doğrulanmadı“ = wurde nicht bestätigt (Passiv + Verneinung). „iddia“ = Behauptung.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Das Interview wird morgen veröffentlicht.“",
                tokens: ["Röportaj", "yarın", "yayınlanacak."],
                solution: "Röportaj yarın yayınlanacak.",
                translation: "Das Interview wird morgen veröffentlicht.",
                explanation: "Passiv Futur: yayınlanmak + -acak. „yarın“ kennst du aus B1.",
                audioText: "Röportaj yarın yayınlanacak.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ist die Quelle vertrauenswürdig?",
                solution: "Kaynak güvenilir mi",
                altSolutions: ["Kaynak güvenilir mi?", "Bu kaynak güvenilir mi?", "Bu kaynak güvenilir mi"],
                hint: "Quelle + vertrauenswürdig + Fragepartikel",
                explanation: "DIE Frage der Medienkompetenz: „Kaynak güvenilir mi?“",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bugünün gündemi: Yeni müze açıldı, ayrıntılar ana haberde.",
                question: "Was ist heute Thema?",
                options: ["Ein neues Museum wurde eröffnet.", "Ein Journalist wurde interviewt.", "Eine Zeitung wurde geschlossen."],
                correctIndex: 0,
                explanation: "„gündem“ = Tagesthemen; „açıldı“ = wurde eröffnet (Passiv); „ayrıntı“ = Detail.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Ein Bericht soll „tarafsız“ sein. Was heißt das?",
                options: ["neutral / unparteiisch", "spannend", "kurz", "exklusiv"],
                correctIndex: 0,
                explanation: "„taraf“ = Seite/Partei → „tarafsız“ = ohne Partei, neutral. Das Ideal guter Presse.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Gazeteci tarafsız olmalı: iddiaları doğrulamalı, kaynakları açıklamalı ve olayları abartmamalı.",
                translation: "Ein Journalist muss neutral sein: Behauptungen prüfen, Quellen offenlegen und Ereignisse nicht übertreiben.",
                tip: "Dreimal -malı (B1!) in einem Satz – der Rhythmus trägt dich durch.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Eilmeldung am Frühstückstisch",
                scene: "Dein Mitbewohner Emre liest eine reißerische Schlagzeile vor.",
                turns: [
                  { speaker: "Emre", text: "Şu başlığa bak: „Şehirde büyük olay!“ Ama ayrıntı yok.", translation: "Schau dir diese Schlagzeile an: „Großes Ereignis in der Stadt!“ Aber keine Details." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kaynak ne? Güvenilir bir gazete mi?", correct: true, feedback: "Perfekt – erst die Quelle prüfen, dann aufregen." },
                      { text: "Vay, hemen herkese gönderiyorum!", correct: false, feedback: "Ungeprüft weiterleiten? So verbreiten sich sahte haber." },
                      { text: "Başlık çok lezzetli.", correct: false, feedback: "„Lecker“ passt weiterhin nur zum Essen – auch auf B2." },
                    ],
                  },
                  { speaker: "Emre", text: "Bilmiyorum, sosyal medyada gördüm. Belki abartıyorlar.", translation: "Weiß ich nicht, habe ich in den sozialen Medien gesehen. Vielleicht übertreiben sie." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bekleyelim: iddia doğrulanmadan inanmam.", correct: true, feedback: "Stark – „doğrulanmadan inanmam“ = ohne Bestätigung glaube ich es nicht." },
                      { text: "Sosyal medya her zaman doğru söyler.", correct: false, feedback: "Mutige These – genau das Gegenteil ist der Punkt dieser Lektion." },
                    ],
                  },
                  { speaker: "Emre", text: "Haklısın. Akşam ana haber yayınında ayrıntılar açıklanır.", translation: "Du hast recht. In den Abendnachrichten werden die Details bekannt gegeben." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u1-l2",
          title: "Zu viel Bildschirm? – Diskutieren mit Stil",
          intro:
            "Handy weglegen oder weiterscrollen? Diskutiere über Medienkonsum – mit den Konnektoren, die B2 ausmachen.",
          grammarTip:
            "Die B2-Konnektoren: „rağmen“ = trotz (buna rağmen = trotzdem), „oysa“ = dabei/jedoch, „üstelik“ = obendrein, „ayrıca“ = außerdem. „hem … hem de“ = sowohl … als auch, „ne … ne de“ = weder … noch. Damit baust du echte Argumente.",
          vocab: [
            { source: "trotz / obwohl", target: "rağmen", exampleSource: "Trotzdem schaue ich es.", exampleTarget: "Buna rağmen izliyorum." },
            { source: "dabei / jedoch", target: "oysa" },
            { source: "obendrein / noch dazu", target: "üstelik" },
            { source: "außerdem", target: "ayrıca" },
            { source: "leider (formell)", target: "ne yazık ki" },
            { source: "sowohl … als auch", target: "hem … hem de" },
            { source: "weder … noch", target: "ne … ne de" },
            { source: "beeinflussen", target: "etkilemek", exampleSource: "Soziale Medien beeinflussen uns sehr.", exampleTarget: "Sosyal medya bizi çok etkiliyor." },
            { source: "die Abhängigkeit / Sucht", target: "bağımlılık" },
            { source: "der Bildschirm", target: "ekran", exampleSource: "die Bildschirmzeit", exampleTarget: "ekran süresi" },
            { source: "die Dauer / Zeitspanne", target: "süre" },
            { source: "reduzieren / verringern", target: "azaltmak" },
            { source: "bemerken", target: "fark etmek" },
            { source: "die Information / das Wissen", target: "bilgi" },
            { source: "die Gewohnheit", target: "alışkanlık" },
            { source: "begrenzen", target: "sınırlamak" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Buna rağmen izliyorum“?",
                audioText: "Buna rağmen izliyorum.",
                options: ["Trotzdem schaue ich es.", "Deshalb höre ich auf.", "Ich schaue es zum ersten Mal.", "Ich schaue nie fern."],
                correctIndex: 0,
                explanation: "„buna rağmen“ = trotzdem; „izlemek“ recycelt B1.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Konnektoren zu.",
                pairs: [
                  { source: "dabei / jedoch", target: "oysa" },
                  { source: "obendrein", target: "üstelik" },
                  { source: "außerdem", target: "ayrıca" },
                  { source: "leider (formell)", target: "ne yazık ki" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Ekran süremi ___ istiyorum çünkü bağımlılık başladı.",
                options: ["azaltmak", "abartmak", "açıklamak"],
                solution: "azaltmak",
                translation: "Ich will meine Bildschirmzeit reduzieren, weil die Abhängigkeit begonnen hat.",
                explanation: "„azaltmak“ = reduzieren; „ekran süresi“ = Bildschirmzeit; „bağımlılık“ = Sucht.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Er liest weder Zeitung, noch schaut er Nachrichten.“",
                tokens: ["Ne", "gazete", "okuyor,", "ne", "de", "haber", "izliyor."],
                solution: "Ne gazete okuyor, ne de haber izliyor.",
                translation: "Er liest weder Zeitung, noch schaut er Nachrichten.",
                explanation: "„ne … ne de“ = weder … noch. Achtung: Das Verb bleibt dabei positiv!",
                audioText: "Ne gazete okuyor, ne de haber izliyor.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Soziale Medien sind sowohl nützlich als auch gefährlich.",
                solution: "Sosyal medya hem faydalı hem de tehlikeli",
                altSolutions: ["Sosyal medya hem faydalı hem de tehlikeli.", "Sosyal medya hem yararlı hem de tehlikeli", "Sosyal medya hem yararlı hem de tehlikeli."],
                hint: "sowohl (hem) + nützlich (faydalı) + als-auch (hem de) + gefährlich (tehlikeli)",
                explanation: "„hem … hem de“ verbindet zwei gleichrangige Eigenschaften.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Telefonuma günde beş saat bakıyorum. Bunu ancak dün fark ettim – üstelik gece de bakıyorum.",
                question: "Was hat die Person erst gestern bemerkt?",
                options: ["dass sie täglich fünf Stunden aufs Handy schaut", "dass ihr Handy kaputt ist", "dass sie eine neue App hat"],
                correctIndex: 0,
                explanation: "„fark etmek“ = bemerken; „üstelik“ = obendrein – sogar nachts schaut sie drauf.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne die Nachrichten-Wörter zu (Lektion 1).",
                pairs: [
                  { source: "die Quelle", target: "kaynak" },
                  { source: "vertrauenswürdig", target: "güvenilir" },
                  { source: "gefälscht", target: "sahte" },
                  { source: "die Behauptung", target: "iddia" },
                  { source: "das Detail", target: "ayrıntı" },
                  { source: "neutral", target: "tarafsız" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Bilgiye hızlı ulaşıyoruz, oysa her bilgi güvenilir değil. Üstelik sahte haberler gündemi etkiliyor. Ne yazık ki eski alışkanlıklar çabuk değişmiyor – buna rağmen ekran süremi sınırlıyorum.",
                translation: "Wir erreichen Informationen schnell, jedoch ist nicht jede Information zuverlässig. Obendrein beeinflussen Fake News die Tagesthemen. Leider ändern sich alte Gewohnheiten nicht leicht – trotzdem begrenze ich meine Bildschirmzeit.",
                tip: "Vier Konnektoren in vier Sätzen – genau so klingt B2.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das Handy-Gespräch",
                scene: "Deine Freundin Selin macht sich Sorgen um ihren Medienkonsum.",
                turns: [
                  { speaker: "Selin", text: "Günde altı saat ekrana bakıyorum. Bu bir bağımlılık mı?", translation: "Ich schaue täglich sechs Stunden auf den Bildschirm. Ist das eine Sucht?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Belki. Ama fark ettin – bu önemli bir ilk adım.", correct: true, feedback: "Einfühlsam und klug: „fark etmek“ als erster Schritt." },
                      { text: "Kesinlikle, telefonunu hemen çöpe at!", correct: false, feedback: "Das Handy wegwerfen? Etwas radikal – hilf ihr lieber beim Reduzieren." },
                      { text: "Ben günde on saat bakıyorum, normal.", correct: false, feedback: "Das macht es nicht besser – geh auf ihre Sorge ein." },
                    ],
                  },
                  { speaker: "Selin", text: "Azaltmak istiyorum ama nasıl? Üstelik işim de telefonda.", translation: "Ich will es reduzieren, aber wie? Obendrein ist auch meine Arbeit auf dem Handy." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Süreyi sınırla: akşam dokuzdan sonra ekran yok.", correct: true, feedback: "Konkreter Plan mit „sınırlamak“ – genau so ändert man alışkanlıklar." },
                      { text: "O zaman yapacak bir şey yok, boş ver.", correct: false, feedback: "Aufgeben ist keine Strategie – schlag eine konkrete Grenze vor." },
                    ],
                  },
                  { speaker: "Selin", text: "Güzel fikir! Hem daha iyi uyurum, hem de sabah gazete okurum.", translation: "Gute Idee! Dann schlafe ich sowohl besser, als auch lese ich morgens Zeitung." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u1-l3",
          title: "Deine Meinung zählt – Argumentieren",
          intro:
            "Behaupten kann jeder: Lerne, deine Ansicht mit Beispielen und Beweisen zu verteidigen – und andere zu überzeugen.",
          grammarTip:
            "Das Relativpartizip -dığı/-diği macht aus Verben Attribute: „izlediğim dizi“ = die Serie, DIE ICH SCHAUE, „okuduğum haber“ = die Nachricht, die ich las. Lern es zunächst in festen Mustern: gördüğüm, bildiğim, sevdiğim.",
          vocab: [
            { source: "die Ansicht / Auffassung", target: "görüş" },
            { source: "die Diskussion / der Streit", target: "tartışma" },
            { source: "verteidigen", target: "savunmak", exampleSource: "Ich verteidige meine Ansicht.", exampleTarget: "Görüşümü savunuyorum." },
            { source: "widersprechen / dagegen sein", target: "karşı çıkmak" },
            { source: "überzeugen", target: "ikna etmek" },
            { source: "das Beispiel", target: "örnek", exampleSource: "Das ist ein gutes Beispiel.", exampleTarget: "Bu iyi bir örnek." },
            { source: "der Beweis", target: "kanıt" },
            { source: "der Respekt", target: "saygı", exampleSource: "Ich respektiere deine Ansicht.", exampleTarget: "Görüşüne saygı duyuyorum." },
            { source: "kritisieren", target: "eleştirmek" },
            { source: "der Abonnent / abonniert", target: "abone", exampleSource: "Ich habe diesen Kanal abonniert.", exampleTarget: "Bu kanala aboneyim." },
            { source: "der Inhalt / Content", target: "içerik" },
            { source: "vertrauen", target: "güvenmek", exampleSource: "Ich vertraue dieser Quelle nicht.", exampleTarget: "Bu kaynağa güvenmiyorum." },
            { source: "die Serie, die ich schaue", target: "izlediğim dizi", exampleSource: "Die Serie, die ich schaue, ist sehr gut.", exampleTarget: "İzlediğim dizi çok güzel." },
            { source: "die Freiheit", target: "özgürlük", exampleSource: "die Pressefreiheit", exampleTarget: "basın özgürlüğü" },
            { source: "verantwortlich", target: "sorumlu" },
            { source: "der Beitrag / Post", target: "paylaşım" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „İzlediğim dizi çok güzel“?",
                audioText: "İzlediğim dizi çok güzel.",
                options: ["Die Serie, die ich schaue, ist sehr gut.", "Ich schaue eine schöne Serie an.", "Schau diese Serie!", "Die Serie war früher besser."],
                correctIndex: 0,
                explanation: "-diğim = „die/das ich …“ – das Relativpartizip macht das Verb zum Attribut.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Argumentations-Wörter zu.",
                pairs: [
                  { source: "die Ansicht", target: "görüş" },
                  { source: "das Beispiel", target: "örnek" },
                  { source: "der Beweis", target: "kanıt" },
                  { source: "der Respekt", target: "saygı" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Kanıt yoksa iddiana kimseyi ___ edemezsin.",
                options: ["ikna", "abone", "fark"],
                solution: "ikna",
                translation: "Ohne Beweis kannst du niemanden von deiner Behauptung überzeugen.",
                explanation: "„ikna etmek“ = überzeugen; „kanıt“ = Beweis – das Herz jeder Argumentation.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich respektiere deine Ansicht, aber ich widerspreche.“",
                tokens: ["Görüşüne", "saygı", "duyuyorum", "ama", "karşı", "çıkıyorum."],
                solution: "Görüşüne saygı duyuyorum ama karşı çıkıyorum.",
                translation: "Ich respektiere deine Ansicht, aber ich widerspreche.",
                explanation: "„saygı duymak“ + „karşı çıkmak“ – höflich UND klar. So diskutiert man auf B2.",
                audioText: "Görüşüne saygı duyuyorum ama karşı çıkıyorum.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich vertraue dieser Quelle nicht.",
                solution: "Bu kaynağa güvenmiyorum",
                altSolutions: ["Bu kaynağa güvenmiyorum.", "Bu kaynaga güvenmiyorum", "Kaynağa güvenmiyorum"],
                hint: "diese + Quelle-Dativ + ich-vertraue-nicht",
                explanation: "„güvenmek“ verlangt den Dativ: kaynağa (der Quelle) güvenmek.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Okuduğum haber beni çok etkiledi, hemen bir paylaşım yazdım. Ama önce kaynağı doğruladım!",
                question: "Was tat die Person, BEVOR sie den Beitrag schrieb?",
                options: ["Sie prüfte die Quelle.", "Sie fragte einen Journalisten.", "Sie löschte ihr Konto."],
                correctIndex: 0,
                explanation: "„önce kaynağı doğruladım“ = zuerst habe ich die Quelle verifiziert. Vorbildlich!",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Konnektoren & Medien zu (Lektion 2).",
                pairs: [
                  { source: "trotz", target: "rağmen" },
                  { source: "dabei / jedoch", target: "oysa" },
                  { source: "beeinflussen", target: "etkilemek" },
                  { source: "die Gewohnheit", target: "alışkanlık" },
                  { source: "reduzieren", target: "azaltmak" },
                  { source: "die Information", target: "bilgi" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Eleştirmek basit, savunmak zor. Görüşünü örneklerle ve kanıtlarla savun; karşı çıkarken saygılı ol. Abone olduğum kanalların içeriğini de eleştiriyorum – basın özgürlüğü sorumlu paylaşımla başlar.",
                translation: "Kritisieren ist einfach, verteidigen schwer. Verteidige deine Ansicht mit Beispielen und Beweisen; sei respektvoll, wenn du widersprichst. Auch den Inhalt der Kanäle, die ich abonniert habe, kritisiere ich – Pressefreiheit beginnt mit verantwortungsvollem Teilen.",
                tip: "„abone olduğum kanallar“ = die Kanäle, die ich abonniert habe – das -dığı-Muster in Aktion.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die große Serien-Debatte",
                scene: "Emre findet deine Lieblingsserie schrecklich – verteidige sie!",
                turns: [
                  { speaker: "Emre", text: "İzlediğin dizi çok kötü! Zaman kaybı.", translation: "Die Serie, die du schaust, ist ganz schlecht! Zeitverschwendung." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Görüşüne saygı duyuyorum ama katılmıyorum. Bir örnek vereyim …", correct: true, feedback: "Perfekt – Respekt, Widerspruch, Beispiel: die B2-Formel." },
                      { text: "Sen hiçbir şey bilmiyorsun!", correct: false, feedback: "Persönlicher Angriff statt Argument – so gewinnt man keine tartışma." },
                      { text: "Tamam, haklısın, her şey kötü.", correct: false, feedback: "Sofort aufgeben? Verteidige deine Ansicht – mit Beispielen." },
                    ],
                  },
                  { speaker: "Emre", text: "Peki, dinliyorum. Ama beni ikna etmek zor!", translation: "Gut, ich höre zu. Aber mich zu überzeugen ist schwer!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Senaryo harika, üstelik oyuncular ödül aldı – işte kanıt.", correct: true, feedback: "Stark – Argument plus „üstelik“ plus Beweis. Emre wackelt schon." },
                      { text: "Çünkü ben seviyorum, yeter.", correct: false, feedback: "„Weil ich sie mag“ ist Geschmack, kein Argument – nenn Beispiele und Beweise." },
                    ],
                  },
                  { speaker: "Emre", text: "Hmm … Ödül aldıklarını bilmiyordum. Belki bir bölüm izlerim.", translation: "Hmm … Dass sie Preise bekommen haben, wusste ich nicht. Vielleicht schaue ich eine Folge." },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 2: İş Dünyası – Präsentation, Korrespondenz, Verhandlung
    // ================================================================
    {
      title: "İş Dünyası – Beruf & Formalität",
      description: "Präsentationen halten, formelle E-Mails schreiben und souverän verhandeln – Türkisch fürs Büro.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u2-l1",
          title: "Die Präsentation",
          intro:
            "Alle Augen auf dich: Präsentiere Zahlen, Ziele und Ergebnisse – strukturiert und souverän.",
          grammarTip:
            "Präsentationssprache lebt von Nominalisierungen: „satışlardaki artış“ = der Anstieg bei den Verkäufen. Struktur-Chunks: „İlk olarak …“ (zunächst), „Sonuç olarak …“ (im Ergebnis), „Özetlemek gerekirse …“ (zusammenfassend).",
          vocab: [
            { source: "die Präsentation", target: "sunum", exampleSource: "Morgen halte ich eine Präsentation.", exampleTarget: "Yarın sunum yapıyorum." },
            { source: "der Redner / die Rednerin", target: "konuşmacı" },
            { source: "der Zuhörer / das Publikum", target: "dinleyici" },
            { source: "die Folie", target: "slayt" },
            { source: "die Grafik / das Diagramm", target: "grafik" },
            { source: "die Daten", target: "veri" },
            { source: "das Ergebnis / Fazit", target: "sonuç" },
            { source: "die Zusammenfassung", target: "özet" },
            { source: "das Ziel", target: "hedef", exampleSource: "Wir haben das Ziel erreicht.", exampleTarget: "Hedefe ulaştık." },
            { source: "die Strategie", target: "strateji" },
            { source: "entwickeln", target: "geliştirmek" },
            { source: "der Erfolg", target: "başarı" },
            { source: "der Anstieg", target: "artış" },
            { source: "der Rückgang", target: "düşüş" },
            { source: "der Anteil / die Rate", target: "oran" },
            { source: "das Prozent", target: "yüzde", exampleSource: "zwanzig Prozent", exampleTarget: "yüzde yirmi" },
            { source: "Aufmerksamkeit erregen", target: "dikkat çekmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Satışlarda yüzde yirmi artış var“?",
                audioText: "Satışlarda yüzde yirmi artış var.",
                options: ["Bei den Verkäufen gibt es einen Anstieg von zwanzig Prozent.", "Die Verkäufe sind um zwanzig Prozent gefallen.", "Zwanzig Produkte wurden verkauft.", "Der Umsatz ist unklar."],
                correctIndex: 0,
                explanation: "„yüzde yirmi“ = 20 % (wörtlich: von Hundert zwanzig); „artış“ = Anstieg.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Präsentations-Wörter zu.",
                pairs: [
                  { source: "die Folie", target: "slayt" },
                  { source: "die Grafik", target: "grafik" },
                  { source: "die Daten", target: "veri" },
                  { source: "die Zusammenfassung", target: "özet" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu grafikte ___ görüyorsunuz: satışlar düştü.",
                options: ["düşüşü", "artışı", "hedefi"],
                solution: "düşüşü",
                translation: "In dieser Grafik sehen Sie den Rückgang: Die Verkäufe sind gefallen.",
                explanation: "„düşüş“ = Rückgang ↔ „artış“ = Anstieg – das Grundvokabular jeder Zahlenfolie.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Wir haben eine neue Strategie entwickelt.“",
                tokens: ["Yeni", "bir", "strateji", "geliştirdik."],
                solution: "Yeni bir strateji geliştirdik.",
                translation: "Wir haben eine neue Strategie entwickelt.",
                explanation: "„geliştirmek“ = entwickeln → geliştirdik (wir entwickelten).",
                audioText: "Yeni bir strateji geliştirdik.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Wir haben das Ziel erreicht.",
                solution: "Hedefe ulaştık",
                altSolutions: ["Hedefe ulaştık.", "Hedefimize ulaştık", "Hedefimize ulaştık."],
                hint: "Ziel-Dativ + wir-erreichten",
                explanation: "„ulaşmak“ (erreichen) verlangt den Dativ: hedefe ulaşmak.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Değerli dinleyiciler, sunumuma hoş geldiniz. İlk slaytta bu yılın verilerini göreceksiniz.",
                question: "Wie beginnt die Präsentation?",
                options: ["mit einer Begrüßung und der ersten Datenfolie", "mit einer Kaffeepause", "mit dem Fazit"],
                correctIndex: 0,
                explanation: "„Değerli dinleyiciler“ = werte Zuhörer – die formelle Eröffnung; „veri“ = Daten.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Argumentieren zu (Unit 1).",
                pairs: [
                  { source: "die Ansicht", target: "görüş" },
                  { source: "überzeugen", target: "ikna etmek" },
                  { source: "der Beweis", target: "kanıt" },
                  { source: "das Beispiel", target: "örnek" },
                  { source: "verteidigen", target: "savunmak" },
                  { source: "der Inhalt", target: "içerik" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Sonuç olarak: hedefe ulaştık, başarı oranı yüzde doksan. Bu sonuç dikkat çekiyor – veriler ve grafikler kanıt. Özetle: stratejimiz çalışıyor.",
                translation: "Im Ergebnis: Wir haben das Ziel erreicht, die Erfolgsquote liegt bei neunzig Prozent. Dieses Ergebnis erregt Aufmerksamkeit – die Daten und Grafiken sind der Beweis. Kurzum: Unsere Strategie funktioniert.",
                tip: "„Sonuç olarak“ und „Özetlemek gerekirse“ – die beiden Abschluss-Chunks jeder Präsentation.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Nach der Präsentation",
                scene: "Deine Chefin Frau Yıldız kommt nach deiner Präsentation auf dich zu.",
                turns: [
                  { speaker: "Yıldız Hanım", text: "Sunumunuz dikkat çekti. Verileri nereden aldınız?", translation: "Ihre Präsentation hat Aufmerksamkeit erregt. Woher haben Sie die Daten?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teşekkür ederim. Veriler satış raporundan, kaynak son slaytta.", correct: true, feedback: "Souverän – Dank plus Quellenangabe. „kaynak“ aus Unit 1 recycelt." },
                      { text: "İnternetten buldum, kaynak bilmiyorum.", correct: false, feedback: "„Quelle unbekannt“ ruiniert jede Präsentation – Unit 1 lässt grüßen." },
                      { text: "Sorularınıza cevap vermem.", correct: false, feedback: "Der Chefin die Antwort verweigern? Mutig, aber karriereschädlich." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Güzel. Peki gelecek yıl için hedefiniz ne?", translation: "Schön. Und was ist Ihr Ziel für nächstes Jahr?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Satışlarda yüzde on artış. Stratejiyi geliştiriyoruz.", correct: true, feedback: "Perfekt – konkretes Ziel mit „yüzde“ und „artış“." },
                      { text: "Hedef yok, göreceğiz.", correct: false, feedback: "„Kein Ziel“ ist im Meeting keine Option – nenn eine Zahl." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Bu başarıyı ekiple kutlayın – tebrikler!", translation: "Feiern Sie diesen Erfolg mit dem Team – Glückwunsch!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u2-l2",
          title: "Die formelle E-Mail",
          intro:
            "„Sayın …“ statt „Merhaba“: Schreib E-Mails, die im türkischen Berufsleben ankommen.",
          grammarTip:
            "Formelle Anrede: „Sayın Yılmaz“ (Sehr geehrte/r …), Schluss: „Saygılarımla“ (Mit freundlichen Grüßen). Anhang: „ekte“ (im Anhang): „Raporu ekte bulabilirsiniz“ = Den Bericht finden Sie im Anhang. Durchgehend Sie-Formen!",
          vocab: [
            { source: "Sehr geehrte/r (Anrede)", target: "sayın", exampleSource: "Sehr geehrte Frau Yılmaz,", exampleTarget: "Sayın Yılmaz," },
            { source: "mit freundlichen Grüßen", target: "saygılarımla" },
            { source: "im Anhang", target: "ekte", exampleSource: "Den Bericht finden Sie im Anhang.", exampleTarget: "Raporu ekte bulabilirsiniz." },
            { source: "die Anfrage / Forderung", target: "talep", exampleSource: "Ich fordere Informationen an.", exampleTarget: "Bilgi talep ediyorum." },
            { source: "das Angebot", target: "teklif" },
            { source: "der Vertrag", target: "sözleşme" },
            { source: "unterschreiben", target: "imzalamak" },
            { source: "bestätigen / genehmigen", target: "onaylamak", exampleSource: "Können Sie den Termin bestätigen?", exampleTarget: "Randevuyu onaylayabilir misiniz?" },
            { source: "weiterleiten", target: "iletmek" },
            { source: "informieren", target: "bilgilendirmek" },
            { source: "die Verspätung / Verzögerung", target: "gecikme", exampleSource: "Entschuldigen Sie die Verspätung.", exampleTarget: "Gecikme için özür dilerim." },
            { source: "schnellstmöglich", target: "en kısa zamanda" },
            { source: "der Kunde / die Kundin", target: "müşteri" },
            { source: "die Rechnung (geschäftlich)", target: "fatura" },
            { source: "der Termin", target: "randevu" },
            { source: "stornieren / absagen", target: "iptal etmek" },
            { source: "die Zufriedenheit", target: "memnuniyet", exampleSource: "gerne / mit Vergnügen", exampleTarget: "memnuniyetle" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Wie beginnt eine formelle türkische E-Mail?",
                audioText: "Sayın Yılmaz,",
                options: ["Sayın Yılmaz,", "Selam Yılmaz!", "Alo Yılmaz?", "Hey!"],
                correctIndex: 0,
                explanation: "„Sayın + Nachname“ = Sehr geehrte/r – die einzige richtige Wahl im Berufskontext.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Geschäfts-Wörter zu.",
                pairs: [
                  { source: "das Angebot", target: "teklif" },
                  { source: "der Vertrag", target: "sözleşme" },
                  { source: "die Rechnung", target: "fatura" },
                  { source: "der Kunde", target: "müşteri" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sözleşmeyi ___ bulabilirsiniz, lütfen imzalayın.",
                options: ["ekte", "sayın", "talep"],
                solution: "ekte",
                translation: "Den Vertrag finden Sie im Anhang, bitte unterschreiben Sie ihn.",
                explanation: "„ekte“ = im Anhang; „imzalamak“ = unterschreiben.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich werde Sie schnellstmöglich informieren.“",
                tokens: ["Sizi", "en", "kısa", "zamanda", "bilgilendireceğim."],
                solution: "Sizi en kısa zamanda bilgilendireceğim.",
                translation: "Ich werde Sie schnellstmöglich informieren.",
                explanation: "„en kısa zamanda“ = schnellstmöglich; „bilgilendirmek“ = informieren.",
                audioText: "Sizi en kısa zamanda bilgilendireceğim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Entschuldigen Sie die Verspätung.",
                solution: "Gecikme için özür dilerim",
                altSolutions: ["Gecikme için özür dilerim.", "Gecikme için özür dileriz", "Geciktiğim için özür dilerim"],
                hint: "Verspätung + für + ich-entschuldige-mich (B1!)",
                explanation: "„özür dilerim“ kennst du aus B1 – jetzt im formellen E-Mail-Kontext.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Sayın müşterimiz, randevunuz onaylandı. Faturayı ekte iletiyoruz. Saygılarımızla.",
                question: "Was teilt die E-Mail mit?",
                options: ["Der Termin ist bestätigt, die Rechnung ist im Anhang.", "Der Termin wurde storniert.", "Der Vertrag ist ungültig."],
                correctIndex: 0,
                explanation: "„onaylandı“ = wurde bestätigt (Passiv!); „ekte iletiyoruz“ = wir übermitteln im Anhang.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Präsentation zu (Lektion 4).",
                pairs: [
                  { source: "das Ziel", target: "hedef" },
                  { source: "der Anstieg", target: "artış" },
                  { source: "die Daten", target: "veri" },
                  { source: "das Prozent", target: "yüzde" },
                  { source: "der Erfolg", target: "başarı" },
                  { source: "entwickeln", target: "geliştirmek" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Sayın Demir, teklifinizi memnuniyetle aldık. Sözleşmeyi ekte bulabilirsiniz; lütfen imzalayıp iletin. Gecikme olursa bizi en kısa zamanda bilgilendirin. Saygılarımla.",
                translation: "Sehr geehrter Herr Demir, Ihr Angebot haben wir mit Freude erhalten. Den Vertrag finden Sie im Anhang; bitte unterschreiben und zurücksenden. Bei Verzögerung informieren Sie uns schnellstmöglich. Mit freundlichen Grüßen.",
                tip: "Eine komplette formelle E-Mail – von „Sayın“ bis „Saygılarımla“.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Der verärgerte Kunde",
                scene: "Ein Kunde ruft an: Seine Bestellung ist zu spät. Bleib formell und lösungsorientiert.",
                turns: [
                  { speaker: "Müşteri", text: "İki haftadır bekliyorum! Bu gecikme hiç profesyonel değil.", translation: "Ich warte seit zwei Wochen! Diese Verzögerung ist überhaupt nicht professionell." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Haklısınız, gecikme için özür dileriz. Hemen kontrol ediyorum.", correct: true, feedback: "Perfekt – Verständnis, Entschuldigung, Handlung. Kundenservice-Dreiklang." },
                      { text: "Ben ne yapayım? Kargo firması suçlu.", correct: false, feedback: "Schuld abschieben beruhigt keinen Kunden – übernimm Verantwortung." },
                      { text: "Sakin ol kardeşim!", correct: false, feedback: "„Beruhig dich, Bruder“ – falsches Register! Beim Kunden immer Sie-Form." },
                    ],
                  },
                  { speaker: "Müşteri", text: "Peki. Sipariş ne zaman gelir?", translation: "Gut. Wann kommt die Bestellung?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Yarın kargoda. Fatura ile birlikte bilgileri e-postayla iletiyorum.", correct: true, feedback: "Stark – konkrete Antwort plus schriftliche Bestätigung („iletmek“)." },
                      { text: "Bilmiyorum, belki gelecek ay.", correct: false, feedback: "„Vielleicht nächsten Monat“ – so verlierst du den Kunden endgültig." },
                    ],
                  },
                  { speaker: "Müşteri", text: "Teşekkür ederim. Memnuniyetle bekliyorum.", translation: "Danke. Ich warte gerne." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u2-l3",
          title: "Verhandeln & Gehalt",
          intro:
            "Mehr Gehalt, bessere Bedingungen: Verhandle hart in der Sache, weich im Ton.",
          grammarTip:
            "Höflicher Nachdruck mit Nominalisierung: „Zam talep etmek istiyorum“ = Ich möchte eine Gehaltserhöhung fordern. „Teklifinizi kabul ediyorum / reddetmek zorundayım“ = Ich nehme Ihr Angebot an / muss es ablehnen. Immer erst würdigen, dann fordern.",
          vocab: [
            { source: "die Einigung / Vereinbarung", target: "anlaşma" },
            { source: "die Bedingung", target: "şart" },
            { source: "annehmen / akzeptieren", target: "kabul etmek", exampleSource: "Ich akzeptiere das Angebot.", exampleTarget: "Teklifi kabul ediyorum." },
            { source: "ablehnen", target: "reddetmek" },
            { source: "vorschlagen", target: "önermek" },
            { source: "das Zugeständnis", target: "taviz", exampleSource: "Zugeständnisse machen", exampleTarget: "taviz vermek" },
            { source: "die Gehaltserhöhung", target: "zam", exampleSource: "Ich möchte eine Gehaltserhöhung.", exampleTarget: "Zam istiyorum." },
            { source: "das Gehalt", target: "maaş" },
            { source: "die Beförderung", target: "terfi" },
            { source: "kündigen (selbst)", target: "istifa etmek" },
            { source: "der Druck", target: "baskı" },
            { source: "die Unterstützung", target: "destek" },
            { source: "fair / gerecht", target: "adil" },
            { source: "Ich bitte Sie zu kommen. (formell)", target: "Gelmenizi rica ediyorum." },
            { source: "die Karriere", target: "kariyer" },
            { source: "erfahren (Adjektiv)", target: "deneyimli" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Gelmenizi rica ediyorum“?",
                audioText: "Gelmenizi rica ediyorum.",
                options: ["Ich bitte Sie (höflich) zu kommen.", "Ich verbiete Ihnen zu kommen.", "Kommen Sie sofort!", "Sie dürfen gehen."],
                correctIndex: 0,
                explanation: "Nominalisierung: gelme (das Kommen) + -nizi + rica etmek (B1) = die formelle Bitte.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Verhandlungs-Wörter zu.",
                pairs: [
                  { source: "das Gehalt", target: "maaş" },
                  { source: "die Gehaltserhöhung", target: "zam" },
                  { source: "die Beförderung", target: "terfi" },
                  { source: "die Bedingung", target: "şart" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Beş yıldır zam almadım, bu ___ değil.",
                options: ["adil", "deneyimli", "kabul"],
                solution: "adil",
                translation: "Seit fünf Jahren habe ich keine Erhöhung bekommen, das ist nicht fair.",
                explanation: "„adil“ = fair/gerecht – das stärkste Wort in jeder Gehaltsverhandlung.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich muss dieses Angebot leider ablehnen.“",
                tokens: ["Ne yazık ki", "bu", "teklifi", "reddetmek", "zorundayım."],
                solution: "Ne yazık ki bu teklifi reddetmek zorundayım.",
                translation: "Ich muss dieses Angebot leider ablehnen.",
                explanation: "„-mek zorundayım“ = ich bin gezwungen zu; „ne yazık ki“ (Unit 1) macht es diplomatisch.",
                audioText: "Ne yazık ki bu teklifi reddetmek zorundayım.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich bin erfahren und möchte eine Gehaltserhöhung.",
                solution: "Deneyimliyim ve zam istiyorum",
                altSolutions: ["Deneyimliyim ve zam istiyorum.", "Ben deneyimliyim ve zam istiyorum", "Deneyimliyim, zam istiyorum"],
                hint: "erfahren-ich-bin + und + Erhöhung + ich-möchte",
                explanation: "„deneyimli“ (erfahren) + Personalendung – dein stärkstes Argument zuerst.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Anlaşma şartlarını kabul ediyorum ama bir önerim var: maaş yüzde on artmalı.",
                question: "Welche Bedingung stellt die Person?",
                options: ["Das Gehalt soll um zehn Prozent steigen.", "Der Vertrag soll kürzer werden.", "Sie will sofort kündigen."],
                correctIndex: 0,
                explanation: "„kabul ediyorum ama …“ – erst annehmen, dann nachverhandeln. „yüzde on“ recycelt Lektion 4.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne E-Mail-Formeln zu (Lektion 5).",
                pairs: [
                  { source: "Sehr geehrte/r", target: "sayın" },
                  { source: "mit freundlichen Grüßen", target: "saygılarımla" },
                  { source: "im Anhang", target: "ekte" },
                  { source: "bestätigen", target: "onaylamak" },
                  { source: "der Termin", target: "randevu" },
                  { source: "schnellstmöglich", target: "en kısa zamanda" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Kariyerimde yeni bir hedefim var: terfi. Deneyimliyim, ekibe destek veriyorum ve baskı altında çalışabiliyorum. Adil bir maaş talep ediyorum – yoksa istifa etmek zorundayım.",
                translation: "In meiner Karriere habe ich ein neues Ziel: die Beförderung. Ich bin erfahren, unterstütze das Team und kann unter Druck arbeiten. Ich fordere ein faires Gehalt – sonst muss ich kündigen.",
                tip: "„baskı altında“ = unter Druck; „talep ediyorum“ (Lektion 5) – die Verhandlung auf den Punkt.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das Gehaltsgespräch",
                scene: "Termin bei Frau Yıldız: Du willst eine Gehaltserhöhung – sie ist skeptisch.",
                turns: [
                  { speaker: "Yıldız Hanım", text: "Buyurun, sizi dinliyorum. Konu neydi?", translation: "Bitte, ich höre. Worum ging es?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Üç yıldır buradayım, projelerim başarılı. Zam talep ediyorum.", correct: true, feedback: "Perfekt – erst Leistung, dann Forderung. So verhandelt man." },
                      { text: "Para verin yoksa giderim!", correct: false, feedback: "Erpressung ist keine Verhandlung – Argumente statt Drohungen." },
                      { text: "Şey … aslında … önemli değil, pardon.", correct: false, feedback: "Rückzieher vor dem ersten Satz? Trag dein Anliegen selbstbewusst vor." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Bütçemiz dar. Yüzde üç önerebilirim.", translation: "Unser Budget ist knapp. Ich kann drei Prozent anbieten." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Teklifinize teşekkürler, ama adil değil. Önerim: yüzde sekiz ve terfi görüşmesi.", correct: true, feedback: "Stark – würdigen, ablehnen, Gegenvorschlag. Lehrbuch-Verhandlung!" },
                      { text: "Tamam, kabul ediyorum.", correct: false, feedback: "Das erste Angebot sofort annehmen? Ein Gegenvorschlag gehört dazu." },
                    ],
                  },
                  { speaker: "Yıldız Hanım", text: "Zor pazarlık yapıyorsunuz … Yüzde altı ve altı ay sonra terfi görüşmesi. Anlaştık mı?", translation: "Sie verhandeln hart … Sechs Prozent und in sechs Monaten ein Beförderungsgespräch. Sind wir uns einig?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Anlaştık! Desteğiniz için teşekkür ederim.", correct: true, feedback: "Einigung mit Dank besiegelt – „anlaşma“ gelebt. Tebrikler!" },
                      { text: "Hayır, istifa ediyorum!", correct: false, feedback: "Bei einem fairen Kompromiss kündigen? Nimm den Erfolg mit." },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 3: Duygular & İlişkiler – Nuancen, Empathie, Irreales
    // ================================================================
    {
      title: "Duygular & İlişkiler – Gefühle & Beziehungen",
      description: "Über Verpasstes und Erträumtes sprechen (-seydi), Beziehungen pflegen und Kultur-Codes verstehen.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u3-l1",
          title: "Hätte ich doch … (-seydi)",
          intro:
            "Verpasste Chancen, alte Träume: Sprich über das, was hätte sein können – der irreale Konditional.",
          grammarTip:
            "Irreales mit -seydi/-saydı: „Bilseydim gelirdim“ = Hätte ich es gewusst, wäre ich gekommen. Muster: Bedingung mit -seydi + Folge mit Aorist-Vergangenheit (-irdim). Mit „keşke“ (B1) wird daraus der Stoßseufzer: „Keşke daha erken başlasaydım!“",
          vocab: [
            { source: "Hätte ich es gewusst, wäre ich gekommen.", target: "Bilseydim gelirdim." },
            { source: "bereuen / es bereuen", target: "pişman olmak", exampleSource: "Ich bereue es sehr.", exampleTarget: "Çok pişmanım." },
            { source: "träumen / sich vorstellen", target: "hayal etmek" },
            { source: "die Enttäuschung", target: "hayal kırıklığı" },
            { source: "die Gelegenheit / Chance", target: "fırsat" },
            { source: "verpassen", target: "kaçırmak", exampleSource: "Ich habe die Gelegenheit verpasst.", exampleTarget: "Fırsatı kaçırdım." },
            { source: "das Glück / die Chance", target: "şans" },
            { source: "der Mut", target: "cesaret" },
            { source: "unentschlossen", target: "kararsız" },
            { source: "aufgeben / verzichten", target: "vazgeçmek" },
            { source: "die Hoffnung", target: "umut" },
            { source: "in Erfüllung gehen / wahr werden", target: "gerçekleşmek", exampleSource: "Mein Traum wurde wahr.", exampleTarget: "Hayalim gerçekleşti." },
            { source: "ändern / verändern", target: "değiştirmek" },
            { source: "Hätte ich doch früher angefangen!", target: "Keşke daha erken başlasaydım!" },
            { source: "gestehen / zugeben", target: "itiraf etmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bilseydim gelirdim“?",
                audioText: "Bilseydim gelirdim.",
                options: ["Hätte ich es gewusst, wäre ich gekommen.", "Ich weiß, dass ich komme.", "Wenn ich es weiß, komme ich.", "Ich wusste, dass er kommt."],
                correctIndex: 0,
                explanation: "-seydi = irreale Bedingung (war nicht so); gelirdim = ich wäre gekommen.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Gefühls-Wörter zu.",
                pairs: [
                  { source: "die Gelegenheit", target: "fırsat" },
                  { source: "der Mut", target: "cesaret" },
                  { source: "die Hoffnung", target: "umut" },
                  { source: "die Enttäuschung", target: "hayal kırıklığı" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İş teklifini reddettim, şimdi çok ___.",
                options: ["pişmanım", "kararsızım", "cesurum"],
                solution: "pişmanım",
                translation: "Ich habe das Jobangebot abgelehnt, jetzt bereue ich es sehr.",
                explanation: "„pişman olmak“ = bereuen; „reddetmek“ recycelt Unit 2.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Hätte ich doch früher angefangen!“",
                tokens: ["Keşke", "daha", "erken", "başlasaydım!"],
                solution: "Keşke daha erken başlasaydım!",
                translation: "Hätte ich doch früher angefangen!",
                explanation: "„keşke“ (B1) + -saydım = der klassische Stoßseufzer über Verpasstes.",
                audioText: "Keşke daha erken başlasaydım!",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich habe die Gelegenheit verpasst.",
                solution: "Fırsatı kaçırdım",
                altSolutions: ["Fırsatı kaçırdım.", "Şansı kaçırdım", "Bu fırsatı kaçırdım"],
                hint: "Gelegenheit-Akkusativ + ich-verpasste",
                explanation: "„kaçırmak“ = verpassen (auch: Bus, Flug, Chance – alles Verpassbare).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Gençken yurt dışında yaşamayı hayal ederdim. Cesaretim yoktu, vazgeçtim. Şimdi düşünüyorum: yapsaydım, hayatım nasıl olurdu?",
                question: "Was bereut die Person?",
                options: ["dass sie nie im Ausland gelebt hat", "dass sie zu lange im Ausland war", "dass sie zu mutig war"],
                correctIndex: 0,
                explanation: "„hayal ederdim“ = ich träumte immer davon; „vazgeçtim“ = ich gab es auf; „yapsaydım …“ = hätte ich es getan …",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Verhandlung zu (Lektion 6).",
                pairs: [
                  { source: "annehmen", target: "kabul etmek" },
                  { source: "ablehnen", target: "reddetmek" },
                  { source: "das Gehalt", target: "maaş" },
                  { source: "fair", target: "adil" },
                  { source: "die Unterstützung", target: "destek" },
                  { source: "die Karriere", target: "kariyer" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İtiraf ediyorum: geçmişte çok fırsat kaçırdım ve bazen pişmanım. Ama geçmişi değiştiremem. Gelecek için umudum var – bu hayal de gerçekleşecek.",
                translation: "Ich gestehe: In der Vergangenheit habe ich viele Chancen verpasst und manchmal bereue ich es. Aber die Vergangenheit kann ich nicht ändern. Für die Zukunft habe ich Hoffnung – auch dieser Traum wird wahr.",
                tip: "„değiştiremem“ = ich kann nicht ändern (-eme = nicht können, aus B1 „gelemem“).",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das Eingeständnis",
                scene: "Selin erzählt dir von einer verpassten Chance – und du von deiner.",
                turns: [
                  { speaker: "Selin", text: "Sana bir şey itiraf edeyim: Berlin'deki işi kabul etseydim, hayatım bambaşka olurdu.", translation: "Ich gestehe dir etwas: Hätte ich den Job in Berlin angenommen, wäre mein Leben völlig anders." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Pişman mısın? Neden vazgeçtin?", correct: true, feedback: "Einfühlsam nachgefragt – „pişman“ und „vazgeçmek“ sitzen." },
                      { text: "Berlin çok soğuk, iyi ki gitmedin.", correct: false, feedback: "Das Wetter ist nicht der Punkt – geh auf ihr Gefühl ein." },
                      { text: "Fırsatlar önemli değil.", correct: false, feedback: "„Chancen sind unwichtig“ – das Gegenteil dessen, was sie fühlt." },
                    ],
                  },
                  { speaker: "Selin", text: "Cesaretim yoktu. O zamanlar çok kararsızdım.", translation: "Ich hatte nicht den Mut. Damals war ich sehr unentschlossen." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Anlıyorum. Ben de bir fırsat kaçırdım – bilseydim, farklı yapardım.", correct: true, feedback: "Perfekt – geteiltes Bedauern mit sauberem -seydi-Satz." },
                      { text: "Ben hiç hata yapmam.", correct: false, feedback: "„Ich mache nie Fehler“ – charmant wie ein Steuerbescheid. Teile lieber deine Erfahrung." },
                    ],
                  },
                  { speaker: "Selin", text: "Neyse! Geçmiş geçmişte kaldı. Gelecekte yeni fırsatlar var – bu sefer kaçırmayacağım!", translation: "Na ja! Die Vergangenheit ist vorbei. In der Zukunft gibt es neue Chancen – diesmal verpasse ich sie nicht!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u3-l2",
          title: "Beziehungen pflegen",
          intro:
            "Vermissen, verzeihen, versöhnen: der Wortschatz für alles, was zwischen Menschen passiert.",
          grammarTip:
            "„Seni özledim“ = Ich habe dich vermisst – DER Beziehungssatz. „küsmek” (eingeschnappt den Kontakt abbrechen) und „barışmak“ (sich versöhnen) sind ein sehr türkisches Begriffspaar – im Deutschen gibt es dafür kein eigenes Verb.",
          vocab: [
            { source: "die Beziehung", target: "ilişki" },
            { source: "das Verständnis", target: "anlayış", exampleSource: "Danke für dein Verständnis.", exampleTarget: "Anlayışın için teşekkürler." },
            { source: "der enge Freund / die enge Freundin", target: "dost" },
            { source: "beneiden / eifersüchtig sein", target: "kıskanmak" },
            { source: "vermissen", target: "özlemek", exampleSource: "Ich habe dich sehr vermisst.", exampleTarget: "Seni çok özledim." },
            { source: "verzeihen", target: "affetmek", exampleSource: "Verzeih mir.", exampleTarget: "Beni affet." },
            { source: "eingeschnappt sein / den Kontakt abbrechen", target: "küsmek" },
            { source: "sich versöhnen", target: "barışmak" },
            { source: "ehrlich / aufrichtig", target: "dürüst" },
            { source: "sich beschweren", target: "şikayet etmek" },
            { source: "würdigen / anerkennen", target: "takdir etmek" },
            { source: "das Gefühl", target: "duygu" },
            { source: "das Verhalten", target: "davranış" },
            { source: "geduldig", target: "sabırlı" },
            { source: "allein / einsam", target: "yalnız" },
            { source: "herzlich / aufrichtig", target: "samimi" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Küstüler ama sonra barıştılar“?",
                audioText: "Küstüler ama sonra barıştılar.",
                options: ["Sie waren zerstritten, aber dann versöhnten sie sich.", "Sie lachten und feierten.", "Sie trafen sich zum ersten Mal.", "Sie zogen zusammen."],
                correctIndex: 0,
                explanation: "„küsmek“ = eingeschnappt brechen, „barışmak“ = sich versöhnen – das türkische Beziehungspaar.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Beziehungs-Wörter zu.",
                pairs: [
                  { source: "die Beziehung", target: "ilişki" },
                  { source: "der enge Freund", target: "dost" },
                  { source: "das Gefühl", target: "duygu" },
                  { source: "das Verhalten", target: "davranış" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Uzun zamandır görüşmedik, seni çok ___.",
                options: ["özledim", "kıskandım", "affettim"],
                solution: "özledim",
                translation: "Wir haben uns lange nicht gesehen, ich habe dich sehr vermisst.",
                explanation: "„özlemek“ = vermissen – nach langer Zeit die erste Botschaft.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Sei ehrlich zu mir, ich verzeihe dir.“",
                tokens: ["Bana", "dürüst", "ol,", "seni", "affederim."],
                solution: "Bana dürüst ol, seni affederim.",
                translation: "Sei ehrlich zu mir, ich verzeihe dir.",
                explanation: "„dürüst olmak“ = ehrlich sein; „affetmek“ + Aorist = Versprechen.",
                audioText: "Bana dürüst ol, seni affederim.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Danke für dein Verständnis.",
                solution: "Anlayışın için teşekkürler",
                altSolutions: ["Anlayışın için teşekkürler.", "Anlayışınız için teşekkürler", "Anlayışın için teşekkür ederim"],
                hint: "Verständnis-dein + für + danke",
                explanation: "„anlayış“ = Verständnis – unverzichtbar in jeder Entschuldigung.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Dostum bana küsmüş – duydum ama nedenini bilmiyorum. Belki davranışım onu üzdü. Sabırlı olacağım ve samimi bir mektup yazacağım.",
                question: "Was plant die Person?",
                options: ["geduldig sein und einen aufrichtigen Brief schreiben", "den Freund für immer vergessen", "sich bei der Stadtverwaltung beschweren"],
                correctIndex: 0,
                explanation: "„küsmüş“ – die miş-Form (B1!): Er ist wohl eingeschnappt, sie hat es nur gehört.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Verpasstes & Gefühle zu (Lektion 7).",
                pairs: [
                  { source: "bereuen", target: "pişman olmak" },
                  { source: "verpassen", target: "kaçırmak" },
                  { source: "die Hoffnung", target: "umut" },
                  { source: "aufgeben", target: "vazgeçmek" },
                  { source: "gestehen", target: "itiraf etmek" },
                  { source: "die Vergangenheit", target: "geçmiş" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İyi bir ilişkinin sırrı: dürüst ol, sabırlı ol, samimi ol. Duygularını söyle, davranışını takdir et, hatalarını affet. Kıskanma – ve yalnız bırakma.",
                translation: "Das Geheimnis einer guten Beziehung: Sei ehrlich, sei geduldig, sei aufrichtig. Sprich deine Gefühle aus, würdige sein/ihr Verhalten, verzeih die Fehler. Sei nicht eifersüchtig – und lass den anderen nicht allein.",
                tip: "Imperative im Sekundentakt – so klingen türkische Lebensweisheiten.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die Versöhnung",
                scene: "Dein Freund Baran ist dir seit Wochen aus dem Weg gegangen. Jetzt steht er vor der Tür.",
                turns: [
                  { speaker: "Baran", text: "Merhaba … Uzun zaman oldu. Sana küstüm, biliyorum.", translation: "Hallo … Es ist lange her. Ich war eingeschnappt, ich weiß." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Seni özledim, dostum. Ne oldu? Bana dürüst ol.", correct: true, feedback: "Perfekt – Herz auf („özledim“) und ehrliches Gespräch eingefordert." },
                      { text: "Kim olduğunu hatırlamıyorum.", correct: false, feedback: "„Ich erinnere mich nicht an dich“ – autsch. Er will sich versöhnen." },
                      { text: "Şikayet etmek istiyorum!", correct: false, feedback: "Eine Beschwerde einreichen? Das ist dein Freund, kein Kundenservice." },
                    ],
                  },
                  { speaker: "Baran", text: "Terfi aldığında beni aramadın. Açıkçası seni kıskandım ve üzüldüm.", translation: "Als du befördert wurdest, hast du mich nicht angerufen. Ehrlich gesagt war ich neidisch und verletzt." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Anlıyorum, davranışım yanlıştı. Beni affet.", correct: true, feedback: "Stark – Verständnis, Eingeständnis, Bitte um Verzeihung. Alles drin." },
                      { text: "Kıskanmak senin sorunun.", correct: false, feedback: "Technisch wahr, menschlich fatal – zeig „anlayış“." },
                    ],
                  },
                  { speaker: "Baran", text: "Tabii ki affediyorum. Barıştık mı?", translation: "Natürlich verzeihe ich dir. Sind wir versöhnt?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Barıştık! Hadi çay içelim, çok şey anlatacağım.", correct: true, feedback: "„Barıştık!“ – versöhnt, und der Tee besiegelt es. Sehr türkisch, sehr richtig." },
                      { text: "Bilmiyorum, düşüneceğim.", correct: false, feedback: "Jetzt noch zögern? Er hat sich entschuldigt – nimm die Versöhnung an." },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u3-l3",
          title: "Kultur-Codes & Redewendungen",
          intro:
            "„Kolay gelsin!“, „Nazar değmesin!“: Die kleinen Formeln, die dich von der Touristin zum Insider machen.",
          grammarTip:
            "Diese Formeln hast du seit A1 passiv gehört – jetzt setzt du sie aktiv ein. „Kolay gelsin“ sagst du JEDEM, der gerade arbeitet. „İnşallah“ = hoffentlich, „Maşallah“ = Anerkennung (gegen den bösen Blick). Falsche Formel zur falschen Zeit wirkt komisch – die richtige öffnet Herzen.",
          vocab: [
            { source: "die Redewendung", target: "deyim" },
            { source: "das Sprichwort", target: "atasözü" },
            { source: "Möge es leicht fallen! (Arbeitsgruß)", target: "Kolay gelsin!" },
            { source: "Kein böser Blick! (Anerkennung)", target: "Nazar değmesin!" },
            { source: "Maschallah (Bewunderung)", target: "Maşallah!" },
            { source: "hoffentlich / so Gott will", target: "İnşallah" },
            { source: "gastfreundlich", target: "misafirperver" },
            { source: "die Tradition", target: "gelenek" },
            { source: "bewirten / anbieten", target: "ikram etmek", exampleSource: "Sie bot uns Tee an.", exampleTarget: "Bize çay ikram etti." },
            { source: "die Schande / unhöflich", target: "ayıp", exampleSource: "Das gehört sich nicht!", exampleTarget: "Ayıp!" },
            { source: "der Humor", target: "mizah" },
            { source: "die Bedeutung", target: "anlam", exampleSource: "Was bedeutet das?", exampleTarget: "Bu ne anlama geliyor?" },
            { source: "Viel Freude damit! (bei Neuem)", target: "Güle güle kullan!" },
            { source: "besuchen", target: "ziyaret etmek" },
            { source: "unangekündigt vorbeikommen", target: "çat kapı gelmek" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Dein Nachbar repariert schwitzend sein Auto. Was sagst du im Vorbeigehen?",
                audioText: "Kolay gelsin!",
                options: ["Kolay gelsin!", "Afiyet olsun!", "Güle güle kullan!", "Nazar değmesin!"],
                correctIndex: 0,
                explanation: "„Kolay gelsin“ = Möge es leicht fallen – der Gruß an alle, die gerade arbeiten.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Kultur-Wörter zu.",
                pairs: [
                  { source: "die Redewendung", target: "deyim" },
                  { source: "das Sprichwort", target: "atasözü" },
                  { source: "die Tradition", target: "gelenek" },
                  { source: "der Humor", target: "mizah" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Yeni araban çok güzel – ___ kullan!",
                options: ["güle güle", "kolay gelsin", "ayıp"],
                solution: "güle güle",
                translation: "Dein neues Auto ist sehr schön – viel Freude damit!",
                explanation: "„Güle güle kullan!“ sagst du zu allem Neugekauften – wörtlich „benutze es lachend“.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Die Türken sind sehr gastfreundlich, das ist eine Tradition.“",
                tokens: ["Türkler", "çok", "misafirperver,", "bu", "bir", "gelenek."],
                solution: "Türkler çok misafirperver, bu bir gelenek.",
                translation: "Die Türken sind sehr gastfreundlich, das ist eine Tradition.",
                explanation: "„misafirperver“ = gastfreundlich (misafir kennst du aus A2!).",
                audioText: "Türkler çok misafirperver, bu bir gelenek.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Was bedeutet dieses Sprichwort?",
                solution: "Bu atasözü ne anlama geliyor",
                altSolutions: ["Bu atasözü ne anlama geliyor?", "Bu atasözünün anlamı ne?", "Bu atasözünün anlamı ne"],
                hint: "dieses + Sprichwort + was + zur-Bedeutung + kommt",
                explanation: "„ne anlama geliyor?“ = was bedeutet es? – deine Tür zu jeder Redewendung.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Komşum çat kapı geldi ama sorun değil: çay ikram ettim, iki saat sohbet ettik. Misafir kısmetiyle gelir, derler.",
                question: "Wie reagierte die Person auf den unangekündigten Besuch?",
                options: ["Sie bot Tee an und plauderte zwei Stunden.", "Sie öffnete die Tür nicht.", "Sie beschwerte sich bei der Stadtverwaltung."],
                correctIndex: 0,
                explanation: "„çat kapı“ = unangekündigt; „ikram etmek“ = bewirten – Gastfreundschaft schlägt Terminkalender.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Beziehungen zu (Lektion 8).",
                pairs: [
                  { source: "vermissen", target: "özlemek" },
                  { source: "verzeihen", target: "affetmek" },
                  { source: "sich versöhnen", target: "barışmak" },
                  { source: "ehrlich", target: "dürüst" },
                  { source: "herzlich / aufrichtig", target: "samimi" },
                  { source: "geduldig", target: "sabırlı" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Dostum yeni bir işe başladı: Kolay gelsin! Evi de çok güzel olmuş: Maşallah, nazar değmesin! İnşallah her hayali gerçekleşir – onu yakında ziyaret edeceğim.",
                translation: "Mein Freund hat eine neue Arbeit angefangen: Möge sie leicht fallen! Sein Haus ist auch sehr schön geworden: Maschallah, kein böser Blick! Hoffentlich gehen alle seine Träume in Erfüllung – ich besuche ihn bald.",
                tip: "Drei Formeln, ein Absatz – genau so dicht streuen Muttersprachler sie ein. „olmuş“ = miş-Form!",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Zu Besuch bei Barans Familie",
                scene: "Nach der Versöhnung lädt Baran dich zu seiner Familie ein – Kultur-Codes im Praxistest.",
                turns: [
                  { speaker: "Baran'ın annesi", text: "Hoş geldin, evladım! Buyur, otur. Hemen çay ikram edeyim.", translation: "Willkommen, mein Kind! Bitte, setz dich. Ich biete dir gleich Tee an." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Hoş bulduk! Eviniz çok güzel, Maşallah!", correct: true, feedback: "Perfekt – „Hoş bulduk“ (A1!) plus „Maşallah“ fürs Haus. Insider-Level." },
                      { text: "Çay istemiyorum, acelem var.", correct: false, feedback: "Tee ablehnen UND Eile? Doppelter Kulturbruch – nimm den Tee." },
                      { text: "Kaç para bu ev?", correct: false, feedback: "Nach dem Preis des Hauses fragen? „Ayıp!“ – das gehört sich nicht." },
                    ],
                  },
                  { speaker: "Baran'ın annesi", text: "Sağ ol! Baran yeni işine başladı, duydun mu?", translation: "Danke! Baran hat seine neue Arbeit angefangen, hast du es gehört?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Evet! Kolay gelsin, İnşallah çok başarılı olur.", correct: true, feedback: "Beide Formeln perfekt platziert – die Familie ist begeistert." },
                      { text: "Evet, maaşı ne kadar?", correct: false, feedback: "Das Gehalt geht nur Baran etwas an – wünsch ihm lieber Erfolg." },
                    ],
                  },
                  { speaker: "Baran", text: "Sağ ol dostum! Bak, annem senin için sarma yapmış.", translation: "Danke, mein Freund! Schau, meine Mutter hat für dich Sarma gemacht." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Ellerinize sağlık! Türk misafirperverliği bir başka.", correct: true, feedback: "„Ellerinize sağlık“ (A2, Sie-Form!) plus Kompliment an die Gastfreundschaft. Tebrikler!" },
                      { text: "Ben tokum, eve gidiyorum.", correct: false, feedback: "Vor dem Essen gehen? Die Sarma wurde FÜR DICH gemacht – das wäre „ayıp“." },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    // ================================================================
    // UNIT 4: Türkiye Derinlemesine – Geschichte, Regionen, Abschluss
    // ================================================================
    {
      title: "Türkiye Derinlemesine – Land & Sprache meistern",
      description: "Über Geschichte und Regionen sprechen, Küche entdecken und im Capstone frei präsentieren.",
      lessons: [
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u4-l1",
          title: "Steine erzählen Geschichte",
          intro:
            "Paläste, Brücken, Jahrhunderte: Sprich über Geschichte – mit dem Passiv, das jeder Reiseführer benutzt.",
          grammarTip:
            "Geschichts-Passiv: „kuruldu“ = wurde gegründet, „inşa edildi“ = wurde erbaut, „restore edildi“ = wurde restauriert. Jahreszahlen mit Lokativ: „1973'te“ = im Jahr 1973. So liest sich jede Museumstafel.",
          vocab: [
            { source: "gegründet werden", target: "kurulmak", exampleSource: "Die Republik wurde 1923 gegründet.", exampleTarget: "Cumhuriyet 1923'te kuruldu." },
            { source: "bauen / errichten", target: "inşa etmek" },
            { source: "das Jahrhundert", target: "yüzyıl" },
            { source: "die Geschichte / das Datum", target: "tarih" },
            { source: "das Reich / Imperium", target: "imparatorluk" },
            { source: "die Epoche / Periode", target: "dönem" },
            { source: "das Werk / Bauwerk", target: "eser" },
            { source: "die Moschee", target: "cami" },
            { source: "der Palast", target: "saray" },
            { source: "die Brücke", target: "köprü" },
            { source: "restaurieren", target: "restore etmek" },
            { source: "berühmt / bekannt", target: "meşhur" },
            { source: "eröffnet werden", target: "açılmak", exampleSource: "Das Museum wurde 1984 eröffnet.", exampleTarget: "Müze 1984'te açıldı." },
            { source: "zerstört werden / einstürzen", target: "yıkılmak" },
            { source: "das Erbe", target: "miras", exampleSource: "das Kulturerbe", exampleTarget: "kültürel miras" },
            { source: "die Legende", target: "efsane" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bu saray 16. yüzyılda inşa edildi“?",
                audioText: "Bu saray on altıncı yüzyılda inşa edildi.",
                options: ["Dieser Palast wurde im 16. Jahrhundert erbaut.", "Dieser Palast hat 16 Zimmer.", "Der Palast wird gerade gebaut.", "Der Palast stürzte im 16. Jahrhundert ein."],
                correctIndex: 0,
                explanation: "„inşa edildi“ = wurde erbaut (Passiv); „yüzyıl“ = Jahrhundert.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Geschichts-Wörter zu.",
                pairs: [
                  { source: "das Jahrhundert", target: "yüzyıl" },
                  { source: "das Reich", target: "imparatorluk" },
                  { source: "der Palast", target: "saray" },
                  { source: "das Erbe", target: "miras" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu eski cami geçen yıl ___ edildi, şimdi çok güzel.",
                options: ["restore", "inşa", "iptal"],
                solution: "restore",
                translation: "Diese alte Moschee wurde letztes Jahr restauriert, jetzt ist sie sehr schön.",
                explanation: "„restore etmek“ = restaurieren – für Altes; „inşa etmek“ = neu bauen.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Diese Brücke ist ein sehr berühmtes Werk.“",
                tokens: ["Bu", "köprü", "çok", "meşhur", "bir", "eser."],
                solution: "Bu köprü çok meşhur bir eser.",
                translation: "Diese Brücke ist ein sehr berühmtes Werk.",
                explanation: "„eser“ = Werk/Bauwerk; „meşhur“ = berühmt (Synonym zu ünlü aus B1).",
                audioText: "Bu köprü çok meşhur bir eser.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Das Museum wurde 1984 eröffnet.",
                solution: "Müze 1984'te açıldı",
                altSolutions: ["Müze 1984'te açıldı.", "Müze 1984 yılında açıldı", "Müze 1984 yılında açıldı."],
                hint: "Museum + Jahr-Lokativ + wurde-eröffnet",
                explanation: "„açılmak“ = eröffnet werden; Jahreszahl + -te/-ta = im Jahr …",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Efsaneye göre bu kule bir aşk hikayesi için inşa edildi. Osmanlı döneminde iki kez yıkıldı ve tekrar kuruldu.",
                question: "Was erzählt die Legende über den Turm?",
                options: ["Er wurde für eine Liebesgeschichte erbaut.", "Er war ein Gefängnis.", "Er wurde nie fertiggestellt."],
                correctIndex: 0,
                explanation: "„efsaneye göre“ = der Legende nach; „yıkıldı ve tekrar kuruldu“ = wurde zerstört und wieder errichtet.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Kultur-Codes zu (Lektion 9).",
                pairs: [
                  { source: "die Tradition", target: "gelenek" },
                  { source: "gastfreundlich", target: "misafirperver" },
                  { source: "die Redewendung", target: "deyim" },
                  { source: "die Bedeutung", target: "anlam" },
                  { source: "bewirten", target: "ikram etmek" },
                  { source: "besuchen", target: "ziyaret etmek" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "İstanbul'u ziyaret ettim: sarayları, camileri ve meşhur köprüyü gördüm. Bu eserler farklı dönemlerde inşa edildi – hepsi bizim kültürel mirasımız. Tarih burada yaşıyor.",
                translation: "Ich habe Istanbul besucht: die Paläste, die Moscheen und die berühmte Brücke gesehen. Diese Bauwerke wurden in verschiedenen Epochen errichtet – alle sind unser Kulturerbe. Die Geschichte lebt hier.",
                tip: "„kültürel miras“ = Kulturerbe – der Schlüsselbegriff jeder Stadtführung.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die private Stadtführung",
                scene: "Baran zeigt dir sein Lieblingsviertel in Istanbul.",
                turns: [
                  { speaker: "Baran", text: "Bak, bu cami 400 yıllık. Mimar Sinan'ın eseri!", translation: "Schau, diese Moschee ist 400 Jahre alt. Ein Werk von Mimar Sinan!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "İnanılmaz! Hangi dönemde inşa edildi?", correct: true, feedback: "Perfekt – echtes Interesse plus Passiv-Frage wie aus dem Reiseführer." },
                      { text: "Eski binalar sıkıcı.", correct: false, feedback: "„Alte Gebäude sind langweilig“ – zu einem 400-jährigen Meisterwerk? Ayıp!" },
                      { text: "Kaç para bu cami?", correct: false, feedback: "Moscheen stehen nicht zum Verkauf – frag nach der Geschichte." },
                    ],
                  },
                  { speaker: "Baran", text: "Osmanlı İmparatorluğu döneminde, 16. yüzyılda. Geçen yıl restore edildi.", translation: "In der Zeit des Osmanischen Reichs, im 16. Jahrhundert. Letztes Jahr wurde sie restauriert." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bu eserler korunmalı – gerçek bir kültürel miras.", correct: true, feedback: "Stark – „korunmalı“ (Passiv + -malı!) und „kültürel miras“ im echten Einsatz." },
                      { text: "Neyse, hadi alışverişe gidelim.", correct: false, feedback: "Mitten in der Führung zum Shoppen? Baran gibt sich gerade Mühe." },
                    ],
                  },
                  { speaker: "Baran", text: "Aynen! Şimdi sana bir efsane anlatacağım – Kız Kulesi'nin hikayesini.", translation: "Genau! Jetzt erzähle ich dir eine Legende – die Geschichte des Mädchenturms." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u4-l2",
          title: "Von Küste zu Küste – Regionen & Küche",
          intro:
            "Vier Himmelsrichtungen, tausend Geschmäcker: Sprich über Regionen, Klima und die legendäre türkische Küche.",
          grammarTip:
            "Regionen beschreiben mit Vergleich (B1) + neuem Wortschatz: „Doğu daha dağlık, batı daha ılık“ = Der Osten ist gebirgiger, der Westen milder. „yöresel“ = regional: „yöresel yemekler“ = regionale Gerichte – das Zauberwort jeder Speisekarte.",
          vocab: [
            { source: "die Region", target: "bölge" },
            { source: "der Osten", target: "doğu" },
            { source: "der Westen", target: "batı" },
            { source: "der Norden", target: "kuzey" },
            { source: "der Süden", target: "güney" },
            { source: "die Küste", target: "kıyı" },
            { source: "der Berg", target: "dağ" },
            { source: "der See", target: "göl" },
            { source: "das Klima", target: "iklim" },
            { source: "regional / lokal", target: "yöresel", exampleSource: "Regionale Gerichte muss man probieren.", exampleTarget: "Yöresel yemekleri denemek lazım." },
            { source: "die Meze (Vorspeisen)", target: "meze" },
            { source: "die Mantı (türkische Teigtaschen)", target: "mantı" },
            { source: "der Geschmack", target: "lezzet" },
            { source: "das Rezept", target: "tarif" },
            { source: "probieren / kosten", target: "tadına bakmak", exampleSource: "Probier mal!", exampleTarget: "Tadına bak!" },
            { source: "bewirten / (Gäste) empfangen", target: "ağırlamak", exampleSource: "Gäste zu bewirten ist eine Kunst.", exampleTarget: "Misafir ağırlamak bir sanat." },
            { source: "die Sorte / Vielfalt", target: "çeşit" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Karadeniz bölgesinde iklim yağmurlu“?",
                audioText: "Karadeniz bölgesinde iklim yağmurlu.",
                options: ["In der Schwarzmeerregion ist das Klima regnerisch.", "Am Schwarzen Meer regnet es nie.", "Die Region liegt im Süden.", "Das Meer ist schwarz vor Regen."],
                correctIndex: 0,
                explanation: "„bölge“ = Region; „iklim“ = Klima; „yağmurlu“ kennst du aus A2.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Himmelsrichtungen zu.",
                pairs: [
                  { source: "der Osten", target: "doğu" },
                  { source: "der Westen", target: "batı" },
                  { source: "der Norden", target: "kuzey" },
                  { source: "der Süden", target: "güney" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu restoranda her ___ meze var – hangisini seçeceğimi bilmiyorum!",
                options: ["çeşit", "bölge", "tarif"],
                solution: "çeşit",
                translation: "In diesem Restaurant gibt es jede Sorte Meze – ich weiß nicht, welche ich wählen soll!",
                explanation: "„çeşit“ = Sorte/Vielfalt; „her çeşit“ = jede Art von.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Im Osten gibt es Berge, im Süden Küste.“",
                tokens: ["Doğuda", "dağlar,", "güneyde", "kıyı", "var."],
                solution: "Doğuda dağlar, güneyde kıyı var.",
                translation: "Im Osten gibt es Berge, im Süden Küste.",
                explanation: "Lokativ + var – die Landkarte der Türkei in einem Satz.",
                audioText: "Doğuda dağlar, güneyde kıyı var.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Probier mal! Der Geschmack ist großartig.",
                solution: "Tadına bak! Lezzeti harika",
                altSolutions: ["Tadına bak! Lezzeti harika.", "Tadına bak, lezzeti harika", "Tadına bak, lezzeti harika."],
                hint: "Geschmack-seinen + schau + Geschmack + großartig",
                explanation: "„tadına bakmak“ = probieren (wörtlich: auf seinen Geschmack schauen).",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Bu mantı tarifi anneannemden. Yöresel bir lezzet – sadece bizim bölgede böyle yapılır.",
                question: "Woher stammt das Mantı-Rezept?",
                options: ["von der Großmutter", "aus dem Internet", "aus einem Restaurant"],
                correctIndex: 0,
                explanation: "„anneanne“ = Großmutter (mütterlicherseits); „yapılır“ = wird gemacht (Passiv!).",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Geschichte zu (Lektion 10).",
                pairs: [
                  { source: "das Jahrhundert", target: "yüzyıl" },
                  { source: "die Moschee", target: "cami" },
                  { source: "die Brücke", target: "köprü" },
                  { source: "berühmt", target: "meşhur" },
                  { source: "die Legende", target: "efsane" },
                  { source: "das Werk", target: "eser" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Türkiye'nin her bölgesi bir başka: kuzeyde yeşil dağlar, güneyde sıcak kıyılar, doğuda büyük göller. Ve her yörenin kendi lezzeti var – mezeler, mantı, yöresel tarifler. Misafir ağırlamak burada bir sanat.",
                translation: "Jede Region der Türkei ist anders: im Norden grüne Berge, im Süden warme Küsten, im Osten große Seen. Und jede Gegend hat ihren eigenen Geschmack – Mezes, Mantı, regionale Rezepte. Gäste zu bewirten ist hier eine Kunst.",
                tip: "„bir başka“ = etwas ganz Eigenes – ein sehr türkisches Kompliment.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Im Lokanta",
                scene: "Mit Selin in einem Lokal mit regionaler Küche – die Karte ist riesig.",
                turns: [
                  { speaker: "Selin", text: "Bu lokanta güneydoğu mutfağı yapıyor. Ne yiyelim?", translation: "Dieses Lokal macht südostanatolische Küche. Was sollen wir essen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Yöresel bir şey deneyelim – sen ne önerirsin?", correct: true, feedback: "Perfekt – „yöresel“ plus Empfehlungsfrage: So isst man richtig." },
                      { text: "Hamburger var mı?", correct: false, feedback: "Hamburger im Regionallokal? Selin ist den Tränen nah – probier die yöresel Küche." },
                      { text: "Ben tokum, sen ye.", correct: false, feedback: "Satt VOR dem Essen im Lokanta? Unmöglich – lass dich auf die Karte ein." },
                    ],
                  },
                  { speaker: "Selin", text: "Önce çeşit çeşit meze, sonra mantı. Tadına bakmadan karar verme!", translation: "Zuerst allerlei Mezes, dann Mantı. Entscheide nicht, ohne zu probieren!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Tamam! Bu lezzet gerçekten bir başka – tarifi kim bilir?", correct: true, feedback: "Stark – probiert, gelobt und nach dem Rezept gefragt. Der Koch strahlt schon." },
                      { text: "Çok acı, hiç sevmedim, gidelim.", correct: false, feedback: "Nach einem Bissen alles abbrechen? Gib den Mezes eine Chance." },
                    ],
                  },
                  { speaker: "Selin", text: "Şefin annesinin tarifi! Bak, sana özel bir tatlı da ikram etti – misafir ağırlamak bizim geleneğimiz.", translation: "Das Rezept der Mutter des Chefs! Schau, er hat dir auch einen besonderen Nachtisch spendiert – Gäste bewirten ist unsere Tradition." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u4-l3",
          title: "Capstone: Deine Präsentation",
          intro:
            "Das Finale: Halte eine freie Präsentation über die Türkei – und über deinen eigenen Weg zu B2.",
          grammarTip:
            "Struktur-Wörter für freies Sprechen: „özetle“ (zusammengefasst), „kısaca“ (kurz gesagt), „mesela“ (zum Beispiel), „bana göre“ (aus meiner Sicht), „sonuç olarak“ (im Ergebnis). Damit klingt auch Improvisiertes souverän – der Rest ist Übung.",
          vocab: [
            { source: "zusammenfassend / um zusammenzufassen", target: "özetlemek gerekirse" },
            { source: "kurz gesagt", target: "kısaca" },
            { source: "zum Beispiel (informell)", target: "mesela" },
            { source: "vergleichen", target: "karşılaştırmak", exampleSource: "Vergleichen wir Ost und West.", exampleTarget: "Doğu ile batıyı karşılaştıralım." },
            { source: "bewerten / einschätzen", target: "değerlendirmek" },
            { source: "betonen / hervorheben", target: "vurgulamak", exampleSource: "Ich möchte einen Punkt betonen.", exampleTarget: "Bir noktayı vurgulamak istiyorum." },
            { source: "das Selbstvertrauen", target: "özgüven" },
            { source: "fließend", target: "akıcı", exampleSource: "fließend sprechen", exampleTarget: "akıcı konuşmak" },
            { source: "das Niveau / die Stufe", target: "seviye" },
            { source: "Fortschritte machen", target: "ilerlemek" },
            { source: "erreichen", target: "ulaşmak", exampleSource: "Ich habe mein Ziel erreicht.", exampleTarget: "Hedefime ulaştım." },
            { source: "weitermachen", target: "devam etmek", exampleSource: "Mach weiter so!", exampleTarget: "Böyle devam et!" },
          ],
          exercises: [
            {
              type: "multiple_choice",
              content: {
                question: "Was bedeutet „Bir noktayı vurgulamak istiyorum“?",
                audioText: "Bir noktayı vurgulamak istiyorum.",
                options: ["Ich möchte einen Punkt betonen.", "Ich habe einen Punkt vergessen.", "Ich male einen Punkt.", "Der Punkt ist unwichtig."],
                correctIndex: 0,
                explanation: "„vurgulamak“ = betonen – damit lenkst du jede Präsentation.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Struktur-Wörter zu.",
                pairs: [
                  { source: "zusammenfassend", target: "özetlemek gerekirse" },
                  { source: "kurz gesagt", target: "kısaca" },
                  { source: "zum Beispiel", target: "mesela" },
                  { source: "betonen", target: "vurgulamak" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "İki yıl önce başladım, şimdi B2 seviyesine ___.",
                options: ["ulaştım", "vurguladım", "karşılaştırdım"],
                solution: "ulaştım",
                translation: "Vor zwei Jahren habe ich angefangen, jetzt habe ich das B2-Niveau erreicht.",
                explanation: "„seviyeye ulaşmak“ = ein Niveau erreichen – dein Satz, wörtlich.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Aus meiner Sicht ist Türkisch eine sehr logische Sprache.“",
                tokens: ["Bana göre", "Türkçe", "çok", "mantıklı", "bir", "dil."],
                solution: "Bana göre Türkçe çok mantıklı bir dil.",
                translation: "Aus meiner Sicht ist Türkisch eine sehr logische Sprache.",
                explanation: "„bana göre“ = aus meiner Sicht; „mantıklı“ = logisch – und es stimmt sogar.",
                audioText: "Bana göre Türkçe çok mantıklı bir dil.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Zusammengefasst: Ich habe mein Ziel erreicht und mache weiter.",
                solution: "Özetle: hedefime ulaştım ve devam ediyorum",
                altSolutions: ["Özetle: hedefime ulaştım ve devam ediyorum.", "Özetle hedefime ulaştım ve devam ediyorum", "Özetle: Hedefime ulaştım ve devam ediyorum."],
                hint: "zusammengefasst + Ziel-erreicht (Lektion 4!) + und + weitermachen",
                explanation: "„hedefe ulaşmak“ (Lektion 4) + „devam etmek“ – dein B2-Fazit.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Konuşmacımız Türkiye'nin bölgelerini karşılaştırdı, yöresel mutfağı vurguladı ve sonuç olarak dedi ki: Bu ülkeyi anlamak için gezmek lazım.",
                question: "Was war das Fazit des Redners?",
                options: ["Um das Land zu verstehen, muss man es bereisen.", "Die Küche ist überall gleich.", "Der Osten ist schöner als der Westen."],
                correctIndex: 0,
                explanation: "„karşılaştırdı“, „vurguladı“, „sonuç olarak“ – die komplette Präsentations-Grammatik in einem Satz.",
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "🔁 Wiederholung: Ordne Regionen & Küche zu (Lektion 11).",
                pairs: [
                  { source: "die Region", target: "bölge" },
                  { source: "das Klima", target: "iklim" },
                  { source: "regional", target: "yöresel" },
                  { source: "der Geschmack", target: "lezzet" },
                  { source: "probieren", target: "tadına bakmak" },
                  { source: "die Sorte / Vielfalt", target: "çeşit" },
                ],
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Kısaca yolculuğumu anlatayım: Merhaba demekle başladım, şimdi akıcı konuşuyorum. Mesela dün bir sunum yaptım – Türkçe! Özgüvenim arttı çünkü her gün ilerledim. Sonuç olarak: hedefime ulaştım ama burada durmayacağım, devam edeceğim.",
                translation: "Kurz gesagt, meine Reise: Ich habe mit „Merhaba“ angefangen, jetzt spreche ich fließend. Zum Beispiel habe ich gestern eine Präsentation gehalten – auf Türkisch! Mein Selbstvertrauen ist gewachsen, weil ich jeden Tag Fortschritte gemacht habe. Im Ergebnis: Ich habe mein Ziel erreicht, aber ich höre hier nicht auf, ich mache weiter.",
                tip: "Deine Geschichte, dein Text – lies ihn laut, als wäre es deine Abschlussrede. Denn das ist sie.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Die Abschlusspräsentation",
                scene: "Der große Moment: Du präsentierst im Kurs frei über die Türkei – Publikum inklusive.",
                turns: [
                  { speaker: "Kurs lideri", text: "Sıra sende! Konun neydi?", translation: "Du bist dran! Was war dein Thema?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Türkiye'nin bölgeleri. Kısaca doğu ile batıyı karşılaştıracağım, sonra yöresel mutfağı vurgulayacağım.", correct: true, feedback: "Perfekte Eröffnung – Thema, Struktur, Struktur-Wörter. Das Publikum lehnt sich zurück." },
                      { text: "Şey … bilmiyorum … zor bir soru.", correct: false, feedback: "Blackout beim eigenen Thema? Atme durch – du hast die Struktur-Wörter dafür gelernt." },
                      { text: "Konu önemli değil, hemen bitiririm.", correct: false, feedback: "„Ich mach's schnell fertig“ – so gewinnt man kein Publikum." },
                    ],
                  },
                  { speaker: "Kurs lideri", text: "Çok akıcıydı! Peki en çok neyi öğrenmek zordu?", translation: "Das war sehr flüssig! Und was war am schwersten zu lernen?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Bana göre miş'li geçmiş. Mesela „gelmiş mi gelmemiş mi“ – ama artık seviyorum!", correct: true, feedback: "Ehrlich, konkret, mit Beispiel („mesela“) – und Humor. Genau richtig." },
                      { text: "Hiçbir şey zor değildi, ben mükemmelim.", correct: false, feedback: "„Ich bin perfekt“ – Selbstvertrauen ja, Größenwahn nein." },
                    ],
                  },
                  { speaker: "Kurs lideri", text: "Harika bir sunumdu. Sonuç olarak: B2 seviyesine ulaştın. Tebrikler – böyle devam et!", translation: "Das war eine großartige Präsentation. Im Ergebnis: Du hast das B2-Niveau erreicht. Herzlichen Glückwunsch – mach weiter so!" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok teşekkür ederim! Özetle: iki yılda merhabadan sunuma. Devam edeceğim – İnşallah C1!", correct: true, feedback: "Was für ein Abschluss – Rückblick, Dank und das nächste Ziel. Şerefe, tebrikler! 🎉" },
                      { text: "Neyse, bitti işte.", correct: false, feedback: "„Na ja, vorbei halt“ – nach zwei Jahren Arbeit? Genieß deinen Moment!" },
                    ],
                  },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        // Wiederhol-/Festigungs-Lektionen (Muster wie A1/A2/B1): recyceln den
        // B2-Wortschatz in neuen Kontexten. Kein neuer Stoff.
        {
          slug: "tr-b2-u4-l4",
          title: "Wiederholung I: Medien & Beruf",
          intro:
            "Großer Rückblick, Teil 1: Nachrichten, Präsentationen, E-Mails und Verhandlungen – das Berufs-Türkisch im Volltest.",
          grammarTip:
            "Passiv für Nachrichten (yayınlandı, açıklandı), Nominalisierung für Höflichkeit (Gelmenizi rica ediyorum), Konnektoren fürs Argument (rağmen, üstelik, ayrıca). Drei Werkzeuge, ein professioneller Auftritt.",
          vocab: [
            { source: "die Quelle", target: "kaynak" },
            { source: "die Präsentation", target: "sunum" },
            { source: "das Gehalt", target: "maaş" },
            { source: "die Gelegenheit", target: "fırsat" },
          ],
          exercises: [
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Presse-Wörter zu.",
                pairs: [
                  { source: "die Schlagzeile", target: "başlık" },
                  { source: "der Journalist", target: "gazeteci" },
                  { source: "das Interview", target: "röportaj" },
                  { source: "die Sendung", target: "yayın" },
                  { source: "die Presse", target: "basın" },
                  { source: "die Tagesthemen", target: "gündem" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Büro-Wörter zu.",
                pairs: [
                  { source: "die Folie", target: "slayt" },
                  { source: "die Grafik", target: "grafik" },
                  { source: "der Vertrag", target: "sözleşme" },
                  { source: "die Rechnung", target: "fatura" },
                  { source: "der Kunde", target: "müşteri" },
                  { source: "der Termin", target: "randevu" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sunumda başarı ___ yüzde doksan: artış var, düşüş yok.",
                options: ["oranı", "özeti", "stratejisi"],
                solution: "oranı",
                translation: "In der Präsentation liegt die Erfolgsquote bei neunzig Prozent: Es gibt einen Anstieg, keinen Rückgang.",
                explanation: "„oran“ = Quote/Anteil; „artış“ ↔ „düşüş“ – die Zahlen-Grundausstattung.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Konuşmacı slaytları açtı, dinleyicilere yeni stratejiyi anlattı ve kısa bir özet verdi: hedefe ulaşıldı.",
                question: "Wie endete der Vortrag?",
                options: ["mit einer kurzen Zusammenfassung: Das Ziel wurde erreicht.", "mit einer langen Pause", "ohne Ergebnis"],
                correctIndex: 0,
                explanation: "„özet verdi“ = gab eine Zusammenfassung; „ulaşıldı“ = wurde erreicht (Passiv).",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Sehr geehrter Kunde, die Rechnung übermittle ich im Anhang.“",
                tokens: ["Sayın", "müşterimiz,", "faturayı", "ekte", "iletiyorum."],
                solution: "Sayın müşterimiz, faturayı ekte iletiyorum.",
                translation: "Sehr geehrter Kunde, die Rechnung übermittle ich im Anhang.",
                explanation: "„sayın“, „ekte“, „iletmek“ – der formelle E-Mail-Dreiklang.",
                audioText: "Sayın müşterimiz, faturayı ekte iletiyorum.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sözleşmeyi bugün ___, sonra ekte iletin – randevuyu da onaylıyorum, iptal yok.",
                options: ["imzalayın", "reddedin", "unutun"],
                solution: "imzalayın",
                translation: "Unterschreiben Sie den Vertrag heute und senden Sie ihn dann im Anhang – den Termin bestätige ich auch, keine Absage.",
                explanation: "„imzalamak“ = unterschreiben; „onaylamak“ = bestätigen; „iptal“ = Stornierung.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich fordere eine faire Gehaltserhöhung, sonst kündige ich.",
                solution: "Adil bir zam talep ediyorum, yoksa istifa ederim",
                altSolutions: ["Adil bir zam talep ediyorum, yoksa istifa ederim.", "Adil bir zam talep ediyorum yoksa istifa ederim", "Adil zam talep ediyorum, yoksa istifa ederim"],
                hint: "fair + Erhöhung + ich-fordere + sonst + ich-kündige",
                explanation: "„talep etmek“, „zam“, „istifa etmek“ – die Verhandlung in einem Satz.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "Warum lehnte die Person das Angebot ab?",
                audioText: "Teklifi reddettim çünkü şartlar adil değildi; yeni bir anlaşma önerdim, taviz vermedim.",
                options: [
                  "Die Bedingungen waren nicht fair – sie schlug eine neue Vereinbarung vor.",
                  "Das Angebot kam zu spät.",
                  "Sie hatte kein Interesse an der Stelle.",
                  "Der Vertrag war schon unterschrieben.",
                ],
                correctIndex: 0,
                explanation: "„şartlar adil değildi“ = die Bedingungen waren unfair; „taviz vermedim“ = ich machte keine Zugeständnisse.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Die Firma will ihr neues Ziel bekannt geben.“",
                tokens: ["Şirket", "yeni", "hedefini", "açıklamak", "istiyor."],
                solution: "Şirket yeni hedefini açıklamak istiyor.",
                translation: "Die Firma will ihr neues Ziel bekannt geben.",
                explanation: "„açıklamak“ = bekannt geben; „hedef“ = Ziel – Wirtschaftsnachrichten pur.",
                audioText: "Şirket yeni hedefini açıklamak istiyor.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sosyal medya kötü bir alışkanlık, hatta ___ oldu; süreyi sınırlamak şart.",
                options: ["bağımlılık", "gelenek", "deyim"],
                solution: "bağımlılık",
                translation: "Soziale Medien sind eine schlechte Gewohnheit, sogar eine Sucht geworden; die Zeit zu begrenzen ist Pflicht.",
                explanation: "„alışkanlık“ → „bağımlılık“ – wenn die Gewohnheit zur Sucht wird; „sınırlamak“ = begrenzen.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Kariyerimde büyük bir fırsat çıktı: terfi ve daha iyi maaş. Baskı vardı ama deneyimli bir ekip bana destek verdi. Gecikme için özür diledim, müdürü memnuniyetle bilgilendirdim ve teklifi kabul ettim – bu kararı asla değiştirmem. En kısa zamanda yeni göreve başlıyorum, İnşallah başarılı olurum.",
                translation: "In meiner Karriere ergab sich eine große Chance: Beförderung und besseres Gehalt. Es gab Druck, aber ein erfahrenes Team unterstützte mich. Für die Verzögerung entschuldigte ich mich, informierte den Chef mit Freude und nahm das Angebot an – diese Entscheidung ändere ich nie. Schnellstmöglich beginne ich die neue Aufgabe, hoffentlich werde ich erfolgreich.",
                tip: "🔁 Der komplette Berufs-Wortschatz in einer Erfolgsgeschichte – deiner.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Der Medien-Abend",
                scene: "Emre hat das große Interview gesehen – ihr diskutiert wie Profis.",
                turns: [
                  { speaker: "Emre", text: "Dün canlı yayında ünlü bir gazeteciyle röportaj vardı – konular gündem, sahte haberler ve basın özgürlüğüydü. Tamamı yarın yayınlanacak.", translation: "Gestern gab es in der Live-Sendung ein Interview mit einem berühmten Journalisten – Themen waren die Tagesthemen, Fake News und die Pressefreiheit. Das Ganze wird morgen veröffentlicht." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kaçırdım! Ne dedi?", correct: true, feedback: "„Kaçırdım“ – verpasst! Aber Emre erzählt es dir gleich." },
                      { text: "Röportajlar sıkıcı.", correct: false, feedback: "„Interviews sind langweilig“ – bei DEM Thema? Hör lieber zu." },
                    ],
                  },
                  { speaker: "Emre", text: "Şunu dedi: Her iddia doğrulanmalı, kaynak güvenilir olmalı, tarafsız yazılmalı – bazen abartıyorlar ama ayrıntılar her şeydir.", translation: "Er sagte: Jede Behauptung muss verifiziert, die Quelle vertrauenswürdig, neutral geschrieben werden – manchmal übertreiben sie, aber die Details sind alles." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Katılıyorum – güvenilir kaynak her şeyin temeli.", correct: true, feedback: "Genau – Unit 1 sitzt: Quelle prüfen, dann glauben." },
                      { text: "Ben her habere inanırım, pratik oluyor.", correct: false, feedback: "Alles glauben ist bequem – und genau so verbreiten sich sahte haberler." },
                    ],
                  },
                  { speaker: "Emre", text: "Ben de olayı bir yorumla anlattım ve paylaştım: ekranda hem bilgi hem mizah istiyorum – dizi gibi ama gerçek!", translation: "Ich habe das Ereignis mit einem Kommentar beschrieben und geteilt: Auf dem Bildschirm will ich sowohl Information als auch Humor – wie eine Serie, aber echt!" },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u4-l5",
          title: "Wiederholung II: Gefühle, Kultur & Türkiye",
          intro:
            "Großer Rückblick, Teil 2: Irreales, Beziehungen, Kultur-Codes und die Türkei-Tour – dein B2 im Finale.",
          grammarTip:
            "Letzte Runde: -seydi für Irreales (bilseydim), -miş für Gehörtes (gelmiş), Passiv für Geschichte (kuruldu), Formeln für Herzen (Maşallah, Kolay gelsin). Vier Register, ein souveränes B2.",
          vocab: [
            { source: "die Gelegenheit", target: "fırsat" },
            { source: "der enge Freund", target: "dost" },
            { source: "die Tradition", target: "gelenek" },
            { source: "die Region", target: "bölge" },
          ],
          exercises: [
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Gefühls-Wörter zu.",
                pairs: [
                  { source: "der Mut", target: "cesaret" },
                  { source: "die Hoffnung", target: "umut" },
                  { source: "das Gefühl", target: "duygu" },
                  { source: "die Beziehung", target: "ilişki" },
                  { source: "das Verständnis", target: "anlayış" },
                  { source: "sich beschweren", target: "şikayet etmek" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Ordne die Türkei-Wörter zu.",
                pairs: [
                  { source: "der Norden", target: "kuzey" },
                  { source: "der Süden", target: "güney" },
                  { source: "der Berg", target: "dağ" },
                  { source: "der See", target: "göl" },
                  { source: "die Küste", target: "kıyı" },
                  { source: "das Rezept", target: "tarif" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "___ gelirdim – keşke daha erken söyleseydin!",
                options: ["Bilseydim", "Bildiğim", "Bilirim"],
                solution: "Bilseydim",
                translation: "Hätte ich es gewusst, wäre ich gekommen – hättest du es doch früher gesagt!",
                explanation: "-seydi = irreale Bedingung; „keşke“ macht den Stoßseufzer perfekt.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Cesaretim yoktu, şansı kaçırdım. Pişman olmak kötü bir duygu ama vazgeçmedim: hayalim gerçekleşti, hayal kırıklığı yok.",
                question: "Wie endet die Geschichte?",
                options: ["Der Traum wurde trotzdem wahr – keine Enttäuschung.", "Die Person gab endgültig auf.", "Die Chance kam nie wieder."],
                correctIndex: 0,
                explanation: "„vazgeçmedim“ = ich gab nicht auf; „gerçekleşti“ = wurde wahr.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Ich war mit meinem Freund zerstritten, aber wir versöhnten uns sofort.“",
                tokens: ["Dostuma", "küstüm", "ama", "hemen", "barıştık."],
                solution: "Dostuma küstüm ama hemen barıştık.",
                translation: "Ich war mit meinem Freund zerstritten, aber wir versöhnten uns sofort.",
                explanation: "„küsmek“ und „barışmak“ – das türkische Beziehungspaar aus Lektion 8.",
                audioText: "Dostuma küstüm ama hemen barıştık.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Kıskanma, ___ ol – ilişkide anlayış ve saygı şart, davranış her şeyi gösterir.",
                options: ["dürüst", "meşhur", "akıcı"],
                solution: "dürüst",
                translation: "Sei nicht eifersüchtig, sei ehrlich – in einer Beziehung sind Verständnis und Respekt Pflicht, das Verhalten zeigt alles.",
                explanation: "„dürüst“ = ehrlich; „davranış“ = Verhalten – Beziehungsweisheit aus Lektion 8.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Ich habe dich vermisst – verzeih mir, ich gestehe meinen Fehler.",
                solution: "Seni özledim – beni affet, hatamı itiraf ediyorum",
                altSolutions: ["Seni özledim – beni affet, hatamı itiraf ediyorum.", "Seni özledim, beni affet, hatamı itiraf ediyorum", "Seni özledim. Beni affet, hatamı itiraf ediyorum."],
                hint: "vermissen + verzeihen + gestehen – drei Verben aus Unit 3",
                explanation: "„özlemek“, „affetmek“, „itiraf etmek“ – die Versöhnung in einem Satz.",
              },
            },
            {
              type: "multiple_choice",
              content: {
                question: "In welcher Situation hörst du diese Sätze?",
                audioText: "Maşallah, eviniz çok güzel olmuş – Nazar değmesin! Güle güle kullanın!",
                options: [
                  "Beim Besuch einer neu eingerichteten Wohnung",
                  "Bei einer Beschwerde im Geschäft",
                  "Bei einer Beerdigung",
                  "Im Vorstellungsgespräch",
                ],
                correctIndex: 0,
                explanation: "Bewunderung (Maşallah), Schutzformel (Nazar değmesin), Glückwunsch zum Neuen (Güle güle kullanın) – das volle Formel-Paket.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Bu atasözünün ___ çok derin – içinde mizah da var.",
                options: ["anlamı", "tarifi", "faturası"],
                solution: "anlamı",
                translation: "Die Bedeutung dieses Sprichworts ist sehr tief – es steckt auch Humor darin.",
                explanation: "„anlam“ = Bedeutung; „mizah“ = Humor – so liest man atasözleri.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Dieser Palast wurde in einer Epoche des Reichs erbaut.“",
                tokens: ["Bu", "saray", "imparatorluk", "döneminde", "inşa", "edildi."],
                solution: "Bu saray imparatorluk döneminde inşa edildi.",
                translation: "Dieser Palast wurde in einer Epoche des Reichs erbaut.",
                explanation: "Geschichts-Passiv „inşa edildi“ + „dönem“ – Museumstafel-Türkisch.",
                audioText: "Bu saray imparatorluk döneminde inşa edildi.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Türkiye turu planım hazır: kuzeyde yaylalar, güneyde kıyılar, doğuda göller ve dağlar. Her bölgede tarihi eserler var: camiler, köprüler – bir yüzyıl önce restore edildi, bazıları yıkıldı ve tekrar kuruldu; hepsi kültürel miras. Yolda meze ve mantı – tadına bakmadan geçmem, her yöresel tarif bir lezzet. Meşhur efsaneleri dinleyeceğim, tarih ve iklim hakkında notlar alacağım. Kararsız değilim, yalnız da değilim – misafir ağırlamak isteyen dostlar her şehirde var. Çat kapı gitmek ayıp ama ben davetliyim. Çalışanlara Kolay gelsin diyeceğim – İnşallah her şey güzel olacak!",
                translation: "Mein Türkei-Tour-Plan steht: im Norden Hochweiden, im Süden Küsten, im Osten Seen und Berge. In jeder Region historische Bauwerke: Moscheen, Brücken – vor einem Jahrhundert restauriert, manche zerstört und wieder errichtet; alles Kulturerbe. Unterwegs Meze und Mantı – ohne zu probieren gehe ich nicht vorbei, jedes regionale Rezept ein Genuss. Ich werde berühmte Legenden hören und mir Notizen über Geschichte und Klima machen. Ich bin nicht unentschlossen und nicht allein – Freunde, die Gäste bewirten wollen, gibt es in jeder Stadt. Unangekündigt zu kommen gehört sich nicht, aber ich bin eingeladen. Den Arbeitenden sage ich „Kolay gelsin“ – hoffentlich wird alles schön!",
                tip: "🔁 Die komplette Türkei-Tour als Sprechtraining – dein längster Text bisher. Du schaffst ihn.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Das große Finale",
                scene: "Selin hat Neuigkeiten über deine Karriere – und einen Rückblick auf deinen Weg.",
                turns: [
                  { speaker: "Selin", text: "Sunum nasıl geçti? Slaytlar, grafikler, konuşmacı olarak sen – dinleyiciler memnun muydu?", translation: "Wie lief die Präsentation? Folien, Grafiken, du als Redner – waren die Zuhörer zufrieden?" },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Çok iyi geçti – sorular bile Türkçeydi ve hepsine cevap verdim!", correct: true, feedback: "Fragen auf Türkisch beantwortet – der wahre Test bestanden." },
                      { text: "Sorma, slaytları evde unuttum.", correct: false, feedback: "Die Folien vergessen? Zum Glück nur eine falsche Antwortoption." },
                    ],
                  },
                  { speaker: "Selin", text: "Müthiş! Müşteri sözleşmeyi imzalamak istemiş – fatura ve randevu ayrıntıları iletildi, gecikme yok.", translation: "Großartig! Der Kunde will wohl den Vertrag unterschreiben – Rechnungs- und Termindetails wurden übermittelt, keine Verzögerung." },
                  { speaker: "Selin", text: "Üstelik terfi de gelmiş – Maşallah! Ayrıca yeni bir fırsat var: yurt dışında bir dönem çalışmak. Tek şart: sunumlar Türkçe.", translation: "Obendrein kommt wohl auch die Beförderung – Maschallah! Außerdem gibt es eine neue Gelegenheit: eine Zeit lang im Ausland arbeiten. Einzige Bedingung: Die Präsentationen sind auf Türkisch." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Kabul! Bu şansı kaçırmam – iki yıl önce olsaydı cesaretim yoktu, şimdi hazırım.", correct: true, feedback: "Perfekt – Chance ergriffen, mit -seydi zurückgeblickt. Gänsehaut." },
                      { text: "Türkçe sunum mu? Asla, istifa ederim.", correct: false, feedback: "Du hast GERADE eine gehalten – dein einziger Gegner ist die Nervosität." },
                    ],
                  },
                  { speaker: "Selin", text: "Sen başarırsın: özgüvenin yüksek, akıcı konuşuyorsun, yeni seviye sana yakışıyor. Mesela dünkü sunumun – kısaca mükemmel! Karşılaştırmak gerekirse: bir yıl önce cümle kuramıyordun, şimdi her hedefe ulaşıyorsun. Değerlendirmek kolay, vurgulamak istiyorum: ilerlemek senin doğanda var – devam et, asla vazgeçme! Özetlemek gerekirse: gerçek bir başarı hikayesi.", translation: "Du schaffst das: Dein Selbstvertrauen ist hoch, du sprichst fließend, das neue Niveau steht dir. Zum Beispiel deine gestrige Präsentation – kurz gesagt: perfekt! Wenn man vergleicht: Vor einem Jahr konntest du keinen Satz bilden, jetzt erreichst du jedes Ziel. Die Bewertung fällt leicht, ich möchte es betonen: Fortschritt liegt in deiner Natur – mach weiter, gib niemals auf! Zusammenfassend: eine echte Erfolgsgeschichte." },
                ],
              },
            },
          ],
        },
        // ------------------------------------------------------------
        {
          slug: "tr-b2-u4-l6",
          title: "Finale: Der Wortschatz-Marathon",
          intro:
            "Die allerletzte Runde: der komplette B2-Wortschatz in einem Durchlauf – Medien, Beruf, Gefühle, Kultur, Türkei.",
          grammarTip:
            "Kein neuer Stoff mehr – nur noch Tempo. Wenn du diese Lektion flüssig schaffst, bist du B2: Passiv, -seydi, -miş, Nominalisierung und die Formeln sitzen. Kolay gelsin!",
          vocab: [
            { source: "die Ansicht", target: "görüş" },
            { source: "die Einigung", target: "anlaşma" },
            { source: "die Redewendung", target: "deyim" },
            { source: "der Geschmack", target: "lezzet" },
          ],
          exercises: [
            {
              type: "vocab_match",
              content: {
                prompt: "Runde 1 – Medien: Ordne zu.",
                pairs: [
                  { source: "die Schlagzeile", target: "başlık" },
                  { source: "der Journalist", target: "gazeteci" },
                  { source: "das Interview", target: "röportaj" },
                  { source: "veröffentlicht werden", target: "yayınlanmak" },
                  { source: "übertreiben", target: "abartmak" },
                  { source: "verifizieren", target: "doğrulamak" },
                  { source: "der Bildschirm", target: "ekran" },
                  { source: "der Inhalt", target: "içerik" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Runde 2 – Beruf: Ordne zu.",
                pairs: [
                  { source: "der Rückgang", target: "düşüş" },
                  { source: "der Anteil", target: "oran" },
                  { source: "die Strategie", target: "strateji" },
                  { source: "entwickeln", target: "geliştirmek" },
                  { source: "informieren", target: "bilgilendirmek" },
                  { source: "weiterleiten", target: "iletmek" },
                  { source: "stornieren", target: "iptal etmek" },
                  { source: "das Zugeständnis", target: "taviz" },
                  { source: "reduzieren", target: "azaltmak" },
                  { source: "unterschreiben", target: "imzalamak" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Runde 3 – Geschichte: Ordne zu.",
                pairs: [
                  { source: "die Epoche", target: "dönem" },
                  { source: "das Reich", target: "imparatorluk" },
                  { source: "der Palast", target: "saray" },
                  { source: "gegründet werden", target: "kurulmak" },
                  { source: "zerstört werden", target: "yıkılmak" },
                  { source: "restaurieren", target: "restore etmek" },
                  { source: "bauen", target: "inşa etmek" },
                  { source: "die Moschee", target: "cami" },
                  { source: "die Brücke", target: "köprü" },
                  { source: "das Jahrhundert", target: "yüzyıl" },
                ],
              },
            },
            {
              type: "vocab_match",
              content: {
                prompt: "Runde 4 – Landkarte & Küche: Ordne zu.",
                pairs: [
                  { source: "der Westen", target: "batı" },
                  { source: "der Osten", target: "doğu" },
                  { source: "der Norden", target: "kuzey" },
                  { source: "der Süden", target: "güney" },
                  { source: "die Küste", target: "kıyı" },
                  { source: "der Berg", target: "dağ" },
                  { source: "der See", target: "göl" },
                  { source: "die Meze", target: "meze" },
                ],
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Eleştirmek kolay ama önce dinle: herkesin görüşüne ___ göster.",
                options: ["saygı", "baskı", "taviz"],
                solution: "saygı",
                translation: "Kritisieren ist leicht, aber hör erst zu: Zeig Respekt vor der Ansicht jedes Menschen.",
                explanation: "„saygı göstermek“ = Respekt zeigen – die Grundregel jeder Debatte.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Tartışma büyüdü: o karşı çıkmak istedi, ben ___ etmek istedim – sonunda anlaşma sağlandı.",
                options: ["ikna", "iptal", "istifa"],
                solution: "ikna",
                translation: "Die Diskussion wurde größer: Er wollte widersprechen, ich wollte überzeugen – am Ende wurde eine Einigung erzielt.",
                explanation: "„ikna etmek“ vs. „karşı çıkmak“ – die zwei Pole jeder Verhandlung.",
              },
            },
            {
              type: "sentence_order",
              content: {
                prompt: "Bilde den Satz: „Dieses Verhalten muss man würdigen.“",
                tokens: ["Bu", "davranışı", "takdir", "etmek", "gerekiyor."],
                solution: "Bu davranışı takdir etmek gerekiyor.",
                translation: "Dieses Verhalten muss man würdigen.",
                explanation: "„takdir etmek“ = würdigen; „-mek gerekiyor“ = man muss.",
                audioText: "Bu davranışı takdir etmek gerekiyor.",
              },
            },
            {
              type: "gap_fill",
              content: {
                sentence: "Sunumun sonunda dinleyiciler soru sordu; konuşmacı örnek ve ___ gösterdi.",
                options: ["kanıt", "mizah", "şans"],
                solution: "kanıt",
                translation: "Am Ende der Präsentation stellten die Zuhörer Fragen; der Redner zeigte Beispiele und Beweise.",
                explanation: "„örnek ve kanıt“ – das Fundament jeder überzeugenden Antwort.",
              },
            },
            {
              type: "translation",
              content: {
                prompt: "Hätte ich es gewusst, wäre ich gekommen! Wenn ich doch früher angefangen hätte – aber Aufgeben gibt es nicht.",
                solution: "Bilseydim gelirdim! Keşke daha erken başlasaydım – ama vazgeçmek yok",
                altSolutions: ["Bilseydim gelirdim! Keşke daha erken başlasaydım – ama vazgeçmek yok.", "Bilseydim gelirdim! Keşke daha erken başlasaydım, ama vazgeçmek yok", "Bilseydim gelirdim. Keşke daha erken başlasaydım ama vazgeçmek yok"],
                hint: "-seydi zweimal, dann das Anti-Aufgeben-Motto",
                explanation: "„bilseydim“, „başlasaydım“, „vazgeçmek yok“ – Irreales plus Entschlossenheit.",
              },
            },
            {
              type: "listening",
              content: {
                audioText: "Yeni müze dün açıldı; kapıdaki uzun kuyruk dikkat çekmek için yeterliydi. Şehrin gündemi artık bu olaylar.",
                question: "Was geschah gestern?",
                options: ["Ein neues Museum wurde eröffnet – mit langer Schlange.", "Ein Museum wurde geschlossen.", "Ein Konzert wurde abgesagt."],
                correctIndex: 0,
                explanation: "„açıldı“ = wurde eröffnet; „dikkat çekmek“ = Aufmerksamkeit erregen; „olaylar“ = die Ereignisse.",
              },
            },
            {
              type: "pronunciation",
              content: {
                text: "Kariyerimde bu seviyeye ulaşmak kolay olmadı ama ne yazık ki demiyorum – rağmen, oysa, üstelik, ayrıca, mesela, kısaca, özetlemek gerekirse: hepsi cebimde. Duygular önemli: sabırlı ve samimi kaldım; kıskanmak yok, güvenmek var, küsmek yok, barışmak var, dürüst olmak şart. Pişman olmak yok: fikrimi değiştirmek istedim, kendimi geliştirmek için çalıştım – baskı altında bile sakin, kararsız değilim, yalnız değilim; dostlar yanımda, maaş arttı, zam ve terfi geldi, şansım da vardı, cesaretim de. Sosyal medyada süreyi sınırlamak işe yaradı, bağımlılık bitti; insanları etkilemek değil, hem bilgi hem duygu paylaşmak istiyorum – farkı hemen fark ettim. Sonuç: hayal etmek serbest, hayal kırıklığı geride, umutlar gerçekleşmek üzere ve devam ediyorum. Tarih benim yeni aşkım, bu dil bir kültürel miras. Akıcı konuşuyorum, deneyimli biriyim artık – misafirperver bu ülkede her kapı açık: Maşallah, Nazar değmesin, Kolay gelsin, İnşallah – ve Güle güle kullan!",
                translation: "In meiner Karriere war es nicht leicht, dieses Niveau zu erreichen, aber ich sage nicht „leider“ – trotz, jedoch, obendrein, außerdem, zum Beispiel, kurz gesagt, zusammenfassend: alles sitzt. Gefühle sind wichtig: Ich blieb geduldig und aufrichtig; kein Neid, sondern Vertrauen, kein Schmollen, sondern Versöhnung, Ehrlichkeit ist Pflicht. Kein Bereuen: Ich wollte meine Meinung ändern, arbeitete daran, mich weiterzuentwickeln – selbst unter Druck ruhig, nicht unentschlossen, nicht allein; Freunde an meiner Seite, das Gehalt stieg, Erhöhung und Beförderung kamen, ich hatte Glück und Mut. In den sozialen Medien half es, die Zeit zu begrenzen, die Sucht ist vorbei; ich will Menschen nicht beeinflussen, sondern sowohl Wissen als auch Gefühl teilen – den Unterschied bemerkte ich sofort. Fazit: Träumen ist frei, die Enttäuschung liegt hinter mir, die Hoffnungen werden gerade wahr, und ich mache weiter. Geschichte ist meine neue Liebe, diese Sprache ein Kulturerbe. Ich spreche fließend, bin inzwischen erfahren – in diesem gastfreundlichen Land steht jede Tür offen: Maschallah, kein böser Blick, möge es leicht fallen, hoffentlich – und viel Freude damit!",
                tip: "Dein B2-Manifest – der längste Text des Kurses. Lies ihn zweimal: erst langsam, dann im Sprechtempo.",
              },
            },
            {
              type: "dialogue",
              content: {
                title: "Auf Wiedersehen – görüşürüz!",
                scene: "Abschiedsessen bei Selin: Rückblick, Mantı und ein letzter Kultur-Test.",
                turns: [
                  { speaker: "Selin", text: "Hoş geldin! Mantı yaptım, yöresel bir tarif – hadi, tadına bak! Meşhur bir atasözü der ki: paylaşılan lezzet çeşit çeşit dosttur.", translation: "Willkommen! Ich habe Mantı gemacht, ein regionales Rezept – los, probier! Ein berühmtes Sprichwort sagt: Geteilter Genuss ist Freundschaft in vielen Sorten." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Ellerine sağlık – efsane gibi kokuyor!", correct: true, feedback: "„Ellerine sağlık“ plus Kompliment – kulturell fehlerfrei." },
                      { text: "Ben mantı sevmem, pizza yok mu?", correct: false, feedback: "Selbstgemachte Mantı ablehnen? Das wäre ayıp – probier wenigstens." },
                    ],
                  },
                  { speaker: "Selin", text: "Gelecek ay bir veda töreni var – gelmenizi rica ediyorum, ayıp olmasın! Görüşünü de savun orada: hangi bölge en güzel? Kuzey mi, güney mi? Mizah da lazım tabii.", translation: "Nächsten Monat gibt es eine Abschiedsfeier – ich bitte Sie zu kommen, nicht dass es unhöflich wirkt! Verteidige dort auch deine Ansicht: Welche Region ist die schönste? Der Norden oder der Süden? Humor braucht es natürlich auch." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Memnuniyetle gelirim! Yarın randevu var ama en kısa zamanda haber veririm.", correct: true, feedback: "Formell zugesagt („memnuniyetle“) und organisiert gedacht – B2 komplett." },
                      { text: "Belki gelirim, belki gelmem, kim bilir.", correct: false, feedback: "Auf eine „rica ediyorum“-Einladung so vage? Sag verbindlich zu oder ab." },
                    ],
                  },
                  { speaker: "Selin", text: "Harika! Desteğin için teşekkürler – anlayışın, ziyaret etmen, çat kapı bile gelmen… İlişkiler böyle güzelleşiyor, gelenek bu! Seni ağırlamak her zaman keyif.", translation: "Großartig! Danke für deine Unterstützung – dein Verständnis, deine Besuche, sogar dein unangekündigtes Vorbeikommen … So werden Beziehungen schöner, das ist die Tradition! Dich zu bewirten ist immer eine Freude." },
                  {
                    speaker: "Du",
                    choices: [
                      { text: "Ben teşekkür ederim! Karşılaştırmak gerekirse: en çok ilerlemek burada, bu sofrada oldu. Fırsat kaçırmak yok – görüşürüz!", correct: true, feedback: "Rückblick, Dank und Abschiedsformel – der perfekte Schlusssatz eines B2-Absolventen. ŞEREFE! 🎓" },
                      { text: "Tamam, kapı nerede?", correct: false, feedback: "„Wo ist die Tür?“ – nach diesem Essen? Würdige den Moment." },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
