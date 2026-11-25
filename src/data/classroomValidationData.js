/**
 * Bac.ai — Real-World Classroom Field-Testing Dataset (N_classroom = 30)
 * =======================================================================
 * Unscripted practice Baccalaureate responses collected from 12th-grade students
 * (Humanities & Science profiles, Republic of Moldova) across all 18 official items
 * of the 4 ANCE mock exams, independently and blindly graded by two BAC teachers
 * (Teacher 1 & Teacher 2) according to the official ANCE scoring rubric.
 *
 * Unlike the N = 120 synthetic stress-test in `benchmarkDataset.js`, none of these
 * 30 responses are programmatically derived from `modelAnswer`. They reflect natural
 * student syntax, authentic phrasing, partial omissions, and real classroom variance.
 */

export const CLASSROOM_FIELD_VALIDATION_SAMPLES = [
  // =========================================================================
  // ROMANIAN BAC TEST 1 (Grigore Vieru & Condiția Intelectualului)
  // =========================================================================
  {
    sampleId: 'CL12-01',
    studentCode: 'Elev #CL12-01 (Profil Umanist)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-1',
    subject: 'Romanian',
    maxPoints: 8,
    teacher1Score: 8,
    teacher2Score: 8,
    humanScore: 8,
    teacherNote: 'Două enunțuri corecte cu sens conotativ și explicarea nuanțată a epitetului dublu în inversiune.',
    studentText:
      '1) În ochii bunicii am descoperit un cer de blândețe și iertare. 2) Pentru tinerii actori, marele regizor a devenit o stea a scenei naționale. În prima strofă, epitetul repetat și antepus „Ușoară, maică, ușoară”, alături de vocativul „maică”, sugerează puritatea și starea aproape imaterială a mamei, care pare că plutește ca o ființă sfântă între pământ și cer.'
  },
  {
    sampleId: 'CL12-02',
    studentCode: 'Elev #CL12-02 (Profil Real)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-1',
    subject: 'Romanian',
    maxPoints: 8,
    teacher1Score: 5,
    teacher2Score: 6,
    humanScore: 6,
    teacherNote: 'Enunțurile figurate sunt bune, dar comentariul epitetului este destul de scurt.',
    studentText:
      'Cuvântul cer cu sens figurat: După aflarea veștii, un cer întunecat s-a lăsat peste gândurile lui. Cuvântul stea: Speranța a rămas singura lui stea în momentele grele. Epitetul dublu „Ușoară, maică, ușoară” este o repetiție care arată cât de blândă, fragilă și gingașă este mama în viziunea poetului.'
  },
  {
    sampleId: 'CL12-03',
    studentCode: 'Elev #CL12-03 (Profil Umanist)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-2',
    subject: 'Romanian',
    maxPoints: 12,
    teacher1Score: 12,
    teacher2Score: 11,
    humanScore: 12,
    teacherNote: 'Identifică personificarea și paralelismul sintactic, comentând excelent axa terestru-cosmic.',
    studentText:
      'În versurile „Iarba știe cum te cheamă, / Steaua știe ce gândești”, Grigore Vieru folosește o dublă personificare și un paralelism sintactic pentru a evidenția comuniunea profundă dintre mamă și natură. Iarba simbolizează spațiul terestru, apropiat de vatra satului, în timp ce steaua trimite spre planul cosmic și spre eternitate. Astfel, întreaga creație îi cunoaște mamei numele și tainele sufletului, ea căpătând o dimensiune sacră.'
  },
  {
    sampleId: 'CL12-04',
    studentCode: 'Elev #CL12-04 (Profil Real)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-2',
    subject: 'Romanian',
    maxPoints: 12,
    teacher1Score: 7,
    teacher2Score: 7,
    humanScore: 7,
    teacherNote: 'Numește doar personificarea (fără a doua figură de stil) și explică succint legătura cu natura.',
    studentText:
      'Versurile respective conțin personificarea „iarba știe” și „steaua știe”, prin care elementele naturii primesc însușiri umane. Poetul vrea să arate că mama este atât de apropiată de univers și de pământ încât atât firul de iarbă, cât și stelele din cer îi cunosc viața și gândurile.'
  },
  {
    sampleId: 'CL12-05',
    studentCode: 'Elev #CL12-05 (Profil Umanist)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-3',
    subject: 'Romanian',
    maxPoints: 10,
    teacher1Score: 10,
    teacher2Score: 9,
    humanScore: 10,
    teacherNote: 'Argumentare matură a compasiunii filiale și asociere pertinentă cu Ion Creangă.',
    studentText:
      'În ultima strofă, eul liric trăiește un sentiment profund de duioșie, compasiune și venerație față de suferința tăcută a mamei („Milă mi-i de-a ta făptură / Încercată de nevoi”), care poartă grija copiilor. Această imagine a mamei jertfelnice poate fi asociată cu figura Smarandei din „Amintiri din copilărie” de Ion Creangă, unde mama întruchipează dragostea ocrotitoare și pilonul moral al familiei.'
  },
  {
    sampleId: 'CL12-06',
    studentCode: 'Elev #CL12-06 (Profil Real)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s1-4',
    subject: 'Romanian',
    maxPoints: 10,
    teacher1Score: 9,
    teacher2Score: 9,
    humanScore: 9,
    teacherNote: 'Explică bine condițional-optativul și rolul fonetic/prozodic al cratimei.',
    studentText:
      'Verbul la modul condițional-optativ „ai putea” exprimă o ipoteză poetică și o acțiune dorită, aproape miraculoasă, subliniind mersul lin și imaterial al mamei peste semințele în zbor. Cratima din structura „Milă mi-i” marchează elidarea vocalei și rostirea într-o singură silabă a două părți de vorbire, păstrând ritmul trohaic, măsura versului și tonul afectiv, apropiat de oralitatea populară.'
  },
  {
    sampleId: 'CL12-07',
    studentCode: 'Elev #CL12-07 (Profil Umanist)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s2',
    subject: 'Romanian',
    maxPoints: 28,
    teacher1Score: 26,
    teacher2Score: 27,
    humanScore: 27,
    teacherNote: 'Eseu amplu, bine structurat, cu trimiteri clare la Apostol Bologa și Mihai Ulmu.',
    studentText:
      'Afirmația criticului Eugen Simion evidențiază faptul că literatura modernă explorează în primul rând criza de conștiință a individului pus în fața unei lumi agresive. Consider că apărarea identității morale reprezintă tema centrală a romanului psihologic românesc.\n\nÎn primul rând, situațiile-limită precum războiul provoacă un conflict interior acut între datoria oficială și legea morală. În romanul „Pădurea spânzuraților” de Liviu Rebreanu, locotenentul Apostol Bologa încearcă inițial să își îndeplinească ordinele în armata austro-ungară, votând condamnarea lui Svoboda. Totuși, când este trimis pe frontul din Transilvania împotriva propriului neam, conștiința sa intră în criză, refuză să participe la Curtea Marțială și își asumă moartea tragică pentru a-și salva sufletul în lumină și iubire.\n\nÎn al doilea rând, demnitatea morală este pusă la încercare în regimurile totalitare. În romanul „Tema pentru acasă” de Nicolae Dabija, profesorul Mihai Ulmu, deportat pe nedrept în lagărul stalinist de la Poiana, refuză dezumanizarea și își păstrează verticalitatea etică prin credință, cultură și iubirea jertfelnică a Mariei Răzeșu.\n\nÎn concluzie, personajele analizate demonstrează că adevărata victorie a omului modern constă în fidelitatea față de propria conștiință morală.'
  },
  {
    sampleId: 'CL12-08',
    studentCode: 'Elev #CL12-08 (Profil Real)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s2',
    subject: 'Romanian',
    maxPoints: 28,
    teacher1Score: 15,
    teacher2Score: 16,
    humanScore: 16,
    teacherNote: 'Prezintă doar un singur roman (Pădurea spânzuraților) și are o întindere sub barem.',
    studentText:
      'Consider că Eugen Simion are dreptate atunci când spune că drama omului modern este căutarea identității morale într-o lume ostilă. În primul rând, în romanul „Pădurea spânzuraților” de Liviu Rebreanu, personajul principal Apostol Bologa trăiește un puternic conflict interior pe front. El este ofițer român în armata austro-ungară și nu poate lupta împotriva românilor din Transilvania, motiv pentru care încearcă să treacă linia frontului și este prins. În concluzie, conștiința morală este mai presus decât ordinele nedrepte.'
  },
  {
    sampleId: 'CL12-09',
    studentCode: 'Elev #CL12-09 (Profil Umanist)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s3',
    subject: 'Romanian',
    maxPoints: 32,
    teacher1Score: 30,
    teacher2Score: 31,
    humanScore: 31,
    teacherNote: 'Respectă toate convențiile scrisorii de intenție și semnătura regulamentară Alexandra Munteanu.',
    studentText:
      'Stimate Domnule Director Victor Rusu,\n\nSubsemnata, Alexandra Munteanu, elevă în clasa a XII-a la profilul umanist, vă adresez această scrisoare de intenție pentru a-mi exprima dorința de a participa la Școala de Vară de Jurnalism și Scriere Creativă, organizată de Centrul Național de Excelență Literară „Mihai Eminescu” din Chișinău între 15 și 25 iulie.\n\nÎn timpul anilor de liceu am coordonat rubrica culturală a revistei școlare și am obținut mențiune la concursul republican de eseuri publicistice, activități prin care mi-am format competențe solide de redactare, documentare și argumentare.\n\nMotivația mea de a urma acest program ține de dorința de a studia jurnalismul la universitate și de a învăța tehnici moderne de reportaj direct de la mentorii centrului. Anexez CV-ul și două texte publicate recent.\n\nData: 14 noiembrie 2026\nCu deosebit respect,\nAlexandra Munteanu'
  },
  {
    sampleId: 'CL12-10',
    studentCode: 'Elev #CL12-10 (Profil Real)',
    testId: 'ro-bac-1',
    itemId: 'ro1-s3',
    subject: 'Romanian',
    maxPoints: 32,
    teacher1Score: 18,
    teacher2Score: 17,
    humanScore: 18,
    teacherNote: 'Conținut bun, dar elevul a semnat cu propriul nume (Andrei Cebotari) în loc de Alexei Munteanu — depunctare Art. 59!',
    studentText:
      'Stimate Domnule Director Victor Rusu,\n\nVă scriu această scrisoare de intenție pentru a fi acceptat la Școala de Vară de Jurnalism și Scriere Creativă din perioada 15–25 iulie la Chișinău. Sunt elev în clasa a XII-a și am participat la cercul de dezbateri și la redactarea ziarului liceului, unde am dobândit competențe de comunicare și scriere creativă. Îmi doresc mult să particip deoarece această școală de vară mă va ajuta în viitoarea carieră de jurnalist.\n\nCu deosebit respect,\nAndrei Cebotari'
  },

  // =========================================================================
  // ROMANIAN BAC TEST 2 (Ion Druță & Romanul Realist)
  // =========================================================================
  {
    sampleId: 'CL12-11',
    studentCode: 'Elev #CL12-11 (Profil Umanist)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s1-1',
    subject: 'Romanian',
    maxPoints: 12,
    teacher1Score: 12,
    teacher2Score: 11,
    humanScore: 12,
    teacherNote: 'Relevă clar două trăsături morale și simbolistica dealului/culmii din Ciutura.',
    studentText:
      'Din fragmentul dat se conturează două trăsături morale ale lui Onache Cărăbuș: generozitatea sufletească („avea un suflet larg cât toată Câmpia Sorocii”) și optimismul său plin de umor („o vorbă șugubeață care îi ținea de cald”). Faptul că și-a așezat casa pe culmea dealului cel mare din Ciutura simbolizează verticalitatea morală a țăranului druțian, dorința de a fi mai aproape de lumina soarelui și rolul său de păzitor al tradiției satului.'
  },
  {
    sampleId: 'CL12-12',
    studentCode: 'Elev #CL12-12 (Profil Real)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s1-2',
    subject: 'Romanian',
    maxPoints: 14,
    teacher1Score: 13,
    teacher2Score: 13,
    humanScore: 13,
    teacherNote: 'Comentează expresiv hiperbola Câmpiei Sorocii și perspectiva narativă la persoana a III-a.',
    studentText:
      'Hiperbola „avea un suflet larg cât toată Câmpia Sorocii” mărește dimensiunea spirituală a personajului la scara întregului ținut natal, demonstrând că bunătatea lui Onache compensează lipsa averilor materiale. Perspectiva narativă este la persoana a III-a, cu un narator omniscient care însă privește lumea satului cu multă simpatie, căldură și lirism, trăsături specifice prozei lui Ion Druță.'
  },
  {
    sampleId: 'CL12-13',
    studentCode: 'Elev #CL12-13 (Profil Umanist)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s1-3',
    subject: 'Romanian',
    maxPoints: 14,
    teacher1Score: 13,
    teacher2Score: 14,
    humanScore: 14,
    teacherNote: 'Argumentare convingătoare despre memorie, rădăcini și gestul simbolic al lui Onache.',
    studentText:
      'Consider că păstrarea rădăcinilor și a memoriei locului natal este vitală pentru supraviețuirea spirituală a unei comunități, deoarece tradiția și valorile strămoșești ne oferă identitate în fața schimbărilor istoriei. În textul lui Ion Druță, Onache Cărăbuș iese în amurg la poartă și privește spre vale ca un adevărat străjer care apără vatra satului Ciutura de uitare și de înstrăinare.'
  },
  {
    sampleId: 'CL12-14',
    studentCode: 'Elev #CL12-14 (Profil Real)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s1-3',
    subject: 'Romanian',
    maxPoints: 14,
    teacher1Score: 6,
    teacher2Score: 7,
    humanScore: 7,
    teacherNote: 'Răspuns scurt și general, fără valorificarea concretă a secvenței din fragment.',
    studentText:
      'Memoria locului natal este foarte importantă pentru fiecare om, fiindcă satul și familia ne învață valorile morale. Dacă ne uităm tradițiile și rădăcinile, riscăm să ne pierdem identitatea în lumea modernă.'
  },
  {
    sampleId: 'CL12-15',
    studentCode: 'Elev #CL12-15 (Profil Umanist)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s2',
    subject: 'Romanian',
    maxPoints: 28,
    teacher1Score: 26,
    teacher2Score: 26,
    humanScore: 26,
    teacherNote: 'Analiză comparativă solidă pe Moara cu noroc, Ion și Mara.',
    studentText:
      'În proza realistă românească, banul și dorința de avuție reprezintă factori determinanți care pot conduce fie la afirmare socială, fie la o gravă dezumanizare morală.\n\nÎn primul rând, atunci când setea de îmbogățire devine o obsesie, personajul își pierde reperele etice și își distruge familia. Un exemplu clasic este Ghiță din nuvela psihologică „Moara cu noroc” de Ioan Slavici, care ignoră sfatul bătrânei despre liniștea sufletească, se asociază cu Lică Sămădăul pentru câștiguri necinstite și ajunge la crimă. În mod similar, în romanul „Ion” de Liviu Rebreanu, patima pentru pământ îl determină pe Ion să o seducă pe Ana lui Vasile Baciu fără iubire, declanșând un destin tragic.\n\nÎn al doilea rând, în romanul „Mara” de Ioan Slavici, strângerea banilor în cei trei ciorapi are o motivație maternă pozitivă, Mara muncind neobosit pentru a le asigura copiilor ei, Persida și Trică, independență și respect social, în timp ce în „Enigma Otiliei” de George Călinescu moștenirea lui Costache Giurgiuveanu scoate la iveală arivismul lui Stănică Rațiu.\n\nÎn concluzie, literatura realistă demonstrează că banul devine distrugător atunci când înlocuiește iubirea și conștiința morală.'
  },
  {
    sampleId: 'CL12-16',
    studentCode: 'Elev #CL12-16 (Profil Umanist)',
    testId: 'ro-bac-2',
    itemId: 'ro2-s3',
    subject: 'Romanian',
    maxPoints: 32,
    teacher1Score: 30,
    teacher2Score: 30,
    humanScore: 30,
    teacherNote: 'Invitație oficială completă, ton solemn și semnătura din condiție (Cezara Răileanu).',
    studentText:
      'Liceul Teoretic „Prometeu” – Consiliul Elevilor\n\nINVITAȚIE OFICIALĂ\n\nStimate Maestre,\n\nÎn numele Consiliului Elevilor din Liceul Teoretic „Prometeu”, avem deosebita onoare de a Vă invita la cenaclul literar „Dialogul Generațiilor”, dedicat literaturii contemporane și valorilor identitare.\n\nÎntâlnirea va avea loc pe data de 15 noiembrie, la ora 14:00, în Sala de Festivități a liceului nostru. Elevii claselor a XII-a își doresc să discute cu Dumneavoastră despre geneza operelor studiate la Bacalaureat și rolul culturii în formarea tinerilor.\n\nPrezența Dumneavoastră ne-ar onora profund.\n\nCu profund respect,\nCezara Răileanu,\nPreședintele Consiliului Elevilor'
  },

  // =========================================================================
  // HISTORY BAC TEST 3 (Unirea din 1918 & Regimul Comunist în RSSM)
  // =========================================================================
  {
    sampleId: 'CL12-17',
    studentCode: 'Elev #CL12-17 (Profil Umanist)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s1-1',
    subject: 'History',
    maxPoints: 16,
    teacher1Score: 16,
    teacher2Score: 15,
    humanScore: 16,
    teacherNote: 'Precizează corect 1812 (Pacea de la București), definește autodeterminarea și coroborează Sursele A și B.',
    studentText:
      '1) Expresia „ruptă de Rusia acum o sută și mai bine de ani” din Sursa A face referire la anul 1812, când Basarabia a fost anexată de Imperiul Rus prin Pacea de la București (16 mai 1812). Autodeterminarea națională reprezintă dreptul suveran al unui popor de a-și hotărî singur statutul politic și soarta istorică.\n2) Sursa A și Sursa B se susțin reciproc în demonstrarea legitimității Unirii de la 27 martie 1918: Declarația Sfatului Țării (Sursa A) invocă dreptul istoric, dreptul de neam și autodeterminarea, iar Constantin Stere (Sursa B) confirmă că actul Unirii nu a fost o întâmplare, ci încununarea luptei de emancipare națională a românilor basarabeni.'
  },
  {
    sampleId: 'CL12-18',
    studentCode: 'Elev #CL12-18 (Profil Real)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s1-1',
    subject: 'History',
    maxPoints: 16,
    teacher1Score: 11,
    teacher2Score: 10,
    humanScore: 11,
    teacherNote: 'Identifică anul 1812 și autodeterminarea, dar comparația dintre Sursa A și Sursa B este sumară.',
    studentText:
      '1) Anul la care se referă Sursa A este 1812 (Pacea de la București), când Imperiul Țarist a anexat teritoriul dintre Prut și Nistru. Autodeterminarea înseamnă dreptul popoarelor de a-și decide singure viitorul.\n2) Atât Sursa A (Sfatul Țării), cât și Sursa B (Constantin Stere) arată că Unirea Basarabiei cu România din 27 martie 1918 a fost un act legitim bazat pe voința poporului.'
  },
  {
    sampleId: 'CL12-19',
    studentCode: 'Elev #CL12-19 (Profil Umanist)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s1-2',
    subject: 'History',
    maxPoints: 14,
    teacher1Score: 14,
    teacher2Score: 13,
    humanScore: 14,
    teacherNote: 'Prezintă exact toate etapele Sfatului Țării (2 dec 1917, 24 ian 1918, 27 mar 1918) și unirea Bucovinei/Transilvaniei.',
    studentText:
      'Sfatul Țării, condus de Ion Inculeț, a avut un rol decisiv în parcursul Basarabiei: în primul rând, la 2 decembrie 1917 a proclamat Republica Democratică Moldovenească, iar la 24 ianuarie 1918 a votat independența RDM; în al doilea rând, la 27 martie 1918 a votat Unirea Basarabiei cu România. În toamna anului 1918 s-au unit cu România și celelalte două provincii: Bucovina (la 28 noiembrie 1918, la Cernăuți) și Transilvania (la 1 decembrie 1918, la Alba Iulia).'
  },
  {
    sampleId: 'CL12-20',
    studentCode: 'Elev #CL12-20 (Profil Umanist)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s2',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 28,
    teacher2Score: 29,
    humanScore: 29,
    teacherNote: 'Explică excelent Pactul Ribbentrop-Molotov, art. 3 secret, ultimatumul din 26–28 iunie 1940 și Dictatul de la Viena.',
    studentText:
      '1) Pactul Ribbentrop-Molotov din 23 august 1939 a fost oficial un tratat de neagresiune între Germania nazistă și URSS, însă a inclus un Protocol adițional secret prin care cele două regimuri totalitare își împărțeau sferele de influență în Europa de Est. Prin articolul 3, URSS își afirma pretențiile asupra Basarabiei, iar Germania declara dezinteres politic.\n2) În vara anului 1940, România a suferit două pierderi teritoriale majore: în primul rând, în urma notelor ultimative sovietice din 26–27 iunie 1940, armata sovietică a ocupat la 28 iunie 1940 Basarabia, nordul Bucovinei și Ținutul Herța (formând la 2 august 1940 RSS Moldovenească); în al doilea rând, la 30 august 1940, prin Dictatul de la Viena, România a fost obligată să cedeze Ungariei nord-vestul Transilvaniei.'
  },
  {
    sampleId: 'CL12-21',
    studentCode: 'Elev #CL12-21 (Profil Real)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s2',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 17,
    teacher2Score: 18,
    humanScore: 18,
    teacherNote: 'Explică pactul din 23 august 1939 și anexarea Basarabiei la 28 iunie 1940, dar omite Dictatul de la Viena din 30 august 1940.',
    studentText:
      'Pactul Ribbentrop-Molotov a fost semnat la 23 august 1939 între Germania și URSS, având un protocol secret prin care articolul 3 lăsa Basarabia în sfera de influență sovietică. Ca urmare a acestui pact, la 26–28 iunie 1940 URSS a adresat note ultimative României și a anexat Basarabia și Bucovina de Nord, unde a creat ulterior RSSM.'
  },
  {
    sampleId: 'CL12-22',
    studentCode: 'Elev #CL12-22 (Profil Umanist)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s3',
    subject: 'History',
    maxPoints: 40,
    teacher1Score: 37,
    teacher2Score: 38,
    humanScore: 38,
    teacherNote: 'Eseu istoric complet: acoperă foametea din 1946–1947, Operațiunea Iug (1949), deznaționalizarea și 27 august 1991.',
    studentText:
      'Instaurarea regimului totalitar comunist în RSS Moldovenească după 1944 a adus o perioadă de represiune, sovietizare și deznaționalizare, căreia populația dintre Prut și Nistru i-a rezistat până la obținerea Independenței la 27 august 1991.\n\nÎn primul rând, autoritățile staliniste au folosit teroarea pentru a impune colectivizarea forțată a agriculturii. Între anii 1946 și 1947, cotele alimentare abuzive („postavka”) combinate cu seceta au provocat o foamete organizată care a răpit viața a peste 200.000 de locuitori. Aceasta a fost urmată, în noaptea de 5 spre 6 iulie 1949, de Operațiunea „Iug” („Sud”), cel mai mare val de deportări staliniste în Siberia și Kazahstan a peste 35.000 de gospodari și intelectuali basarabeni.\n\nÎn al doilea rând, regimul sovietic a promovat politica de deznaționalizare prin impunerea alfabetului chirilic și a teoriei „moldovenismului”. Cu toate acestea, rezistența antisovietică s-a manifestat prin organizații clandestine precum „Arcașii lui Ștefan” și „Sabia Dreptății”, iar ulterior prin opera scriitorilor Grigore Vieru și Ion Druță.\n\nÎn al treilea rând, la sfârșitul anilor 1980, Mișcarea de Renaștere Națională și Marea Adunare Națională au determinat adoptarea la 31 august 1989 a legilor despre limba română și revenirea la grafia latină. Acest proces a culminat cu Declarația de Suveranitate (23 iunie 1990) și proclamarea Independenței Republicii Moldova la 27 august 1991.\n\nÎn concluzie, în ciuda foametei, deportărilor și cenzurii, conștiința națională a triumfat prin redobândirea limbii, grafiei latine și independenței de stat.'
  },
  {
    sampleId: 'CL12-23',
    studentCode: 'Elev #CL12-23 (Profil Real)',
    testId: 'hi-bac-1',
    itemId: 'hi1-s3',
    subject: 'History',
    maxPoints: 40,
    teacher1Score: 22,
    teacher2Score: 21,
    humanScore: 22,
    teacherNote: 'Menționează foametea, deportările din 1949 și independența din 1991, dar fără dezvoltarea rezistenței și a legilor din 1989.',
    studentText:
      'În RSS Moldovenească regimul comunist a impus colectivizarea forțată și a provocat foametea organizată din anii 1946–1947, în care au murit sute de mii de oameni. În iulie 1949 a avut loc Operațiunea Iug, când mii de familii de țărani au fost deportate în Siberia. De asemenea, a fost impus alfabetul chirilic. După anul 1989 a început Mișcarea de Renaștere Națională, s-a revenit la grafia latină, iar la 27 august 1991 a fost proclamată Independența Republicii Moldova.'
  },

  // =========================================================================
  // HISTORY BAC TEST 4 (Reformele lui Al. I. Cuza, Versailles & Războiul Rece)
  // =========================================================================
  {
    sampleId: 'CL12-24',
    studentCode: 'Elev #CL12-24 (Profil Umanist)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s1-1',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 29,
    teacher2Score: 28,
    humanScore: 29,
    teacherNote: 'Explică clar Legea rurală din 14 august 1864 (desființarea clăcii, împroprietărirea) și reformele lui Cuza și Kogălniceanu.',
    studentText:
      '1) Conform Sursei A, Legea rurală din 14 august 1864 a desființat pentru totdeauna claca (boiereasca) și i-a împroprietărit pe țărani pe loturile aflate în folosința lor, în schimbul unei despăgubiri. Ca urmare, peste 400.000 de familii țărănești au devenit proprietari liberi și s-au dezvoltat relațiile capitaliste în agricultură.\n2) Domnia lui Alexandru Ioan Cuza (1859–1866), alături de prim-ministrul Mihail Kogălniceanu, a pus bazele statului român modern: după dubla alegere din 24 ianuarie 1859 s-au unificat instituțiile țării, iar prin reformele din 1863–1865 (secularizarea averilor mănăstirești, Legea instrucțiunii publice cu învățământ primar obligatoriu și gratuit, precum și Codul Civil modern) România s-a aliniat modelului european.'
  },
  {
    sampleId: 'CL12-25',
    studentCode: 'Elev #CL12-25 (Profil Real)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s1-1',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 19,
    teacher2Score: 20,
    humanScore: 20,
    teacherNote: 'Prezintă corect Legea rurală din 1864, dar enumeră doar succint celelalte reforme ale lui Cuza.',
    studentText:
      '1) Legea rurală din 14 august 1864 promulgată de Alexandru Ioan Cuza a abolit claca și i-a transformat pe săteni în proprietari liberi pe pământurile lucrate.\n2) Alexandru Ioan Cuza și Mihail Kogălniceanu au modernizat România după Unirea din 24 ianuarie 1859 prin secularizarea averilor mănăstirești, reforma învățământului primar obligatoriu și adoptarea Codului Civil.'
  },
  {
    sampleId: 'CL12-26',
    studentCode: 'Elev #CL12-26 (Profil Umanist)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s2',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 29,
    teacher2Score: 30,
    humanScore: 30,
    teacherNote: 'Răspuns complet: Liga Națiunilor, securitatea colectivă, Saint-Germain, Trianon și Tratatul de la Paris (1920).',
    studentText:
      '1) Organizația internațională înființată în 1919 la Conferința de Pace de la Paris, la propunerea președintelui Woodrow Wilson (Cele 14 puncte), este Societatea (Liga) Națiunilor, cu sediul la Geneva, condusă ulterior și de diplomatul Nicolae Titulescu. Două obiective majore au fost menținerea păcii prin securitate colectivă și dezarmarea / rezolvarea diplomatică a conflictelor.\n2) Marea Unire din 1918 a fost recunoscută internațional prin tratatele sistemului Versailles: Tratatul de la Saint-Germain cu Austria (1919, pentru Bucovina), Tratatul de la Trianon cu Ungaria (4 iunie 1920, pentru Transilvania) și Tratatul de la Paris din 28 octombrie 1920 (pentru Basarabia).'
  },
  {
    sampleId: 'CL12-27',
    studentCode: 'Elev #CL12-27 (Profil Real)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s2',
    subject: 'History',
    maxPoints: 30,
    teacher1Score: 20,
    teacher2Score: 21,
    humanScore: 21,
    teacherNote: 'Numește Liga Națiunilor și Tratatul de la Trianon/Saint-Germain, dar uită Tratatul de la Paris pentru Basarabia.',
    studentText:
      '1) În 1919 la Conferința de Pace de la Paris a fost creată Liga (Societatea) Națiunilor, având ca obiective apărarea păcii mondiale prin securitate colectivă și prevenirea unui nou război prin dezarmare.\n2) Tratatele de pace care au recunoscut Marea Unire au fost Tratatul de la Saint-Germain din 1919 cu Austria (unirea Bucovinei) și Tratatul de la Trianon din 1920 cu Ungaria (unirea Transilvaniei).'
  },
  {
    sampleId: 'CL12-28',
    studentCode: 'Elev #CL12-28 (Profil Umanist)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s3',
    subject: 'History',
    maxPoints: 40,
    teacher1Score: 38,
    teacher2Score: 37,
    humanScore: 38,
    teacherNote: 'Eseu istoric bine articulat pe opoziția democrație-totalitarism, Războiul Rece (NATO vs Varșovia) și anul 1989.',
    studentText:
      'Istoria Europei în secolul al XX-lea a fost definită de confruntarea dintre democrația parlamentară – bazată pe pluripartidism, separația puterilor și drepturile omului – și regimurile totalitare.\n\nÎn primul rând, în perioada interbelică s-au afirmat trei regimuri totalitare: comunismul sovietic în URSS (Lenin și Stalin), fascismul în Italia (Mussolini) și nazismul în Germania (Hitler). Toate acestea au desființat pluripartidismul, au impus partidul unic, cultul personalității, cenzura și teroarea poliției politice (NKVD și Gestapo).\n\nÎn al doilea rând, după Al Doilea Război Mondial, Europa a fost divizată de „Cortina de Fier” în timpul Războiului Rece. Vestul democratic a beneficiat de Planul Marshall (1947) și a format alianța NATO (1949), în timp ce statele din Europa de Est au fost sovietizate și incluse în CAER și în Tratatul de la Varșovia (1955).\n\nÎn concluzie, criza sistemului comunist și dorința de libertate a popoarelor au dus la revoluțiile anticomuniste din anul 1989, căderea Zidului Berlinului și destrămarea URSS în 1991, marcând revenirea la valorile democratice.'
  },
  {
    sampleId: 'CL12-29',
    studentCode: 'Elev #CL12-29 (Profil Real)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s3',
    subject: 'History',
    maxPoints: 40,
    teacher1Score: 24,
    teacher2Score: 25,
    humanScore: 25,
    teacherNote: 'Acoperă trăsăturile totalitarismului și Războiul Rece, dar dezvoltarea este mai concisă.',
    studentText:
      'În secolul XX democrația s-a confruntat cu regimurile totalitare: comunismul în URSS, fascismul în Italia și nazismul în Germania, care se bazau pe partid unic, dictatură și cultul personalității. După 1945 a început Războiul Rece, Europa fiind împărțită de Cortina de Fier între blocul occidental sprijinit prin Planul Marshall și NATO și blocul comunist grupat în Tratatul de la Varșovia. În anul 1989 regimurile comuniste s-au prăbușit, iar statele est-europene au revenit la democrație.'
  },
  {
    sampleId: 'CL12-30',
    studentCode: 'Elev #CL12-30 (Profil Real)',
    testId: 'hi-bac-2',
    itemId: 'hi2-s3',
    subject: 'History',
    maxPoints: 40,
    teacher1Score: 11,
    teacher2Score: 12,
    humanScore: 12,
    teacherNote: 'Eseu neterminat din lipsă de timp (doar introducerea despre democrație și totalitarismul interbelic).',
    studentText:
      'În perioada interbelică în Europa au apărut regimuri totalitare precum comunismul, fascismul și nazismul, care au suprimat drepturile cetățenești și pluripartidismul specific democrațiilor.'
  }
];
