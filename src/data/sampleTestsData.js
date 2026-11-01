export const MOLDOVA_GRADE_SCALE = [
  { min: 90, max: 100, grade: 10, label: 'Excelent (Nota 10)', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { min: 79, max: 89, grade: 9, label: 'Foarte Bine (Nota 9)', color: 'text-teal-400', bg: 'bg-teal-500/20' },
  { min: 66, max: 78, grade: 8, label: 'Bine (Nota 8)', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { min: 51, max: 65, grade: 7, label: 'Satisfăcător+ (Nota 7)', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { min: 37, max: 50, grade: 6, label: 'Satisfăcător (Nota 6)', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { min: 25, max: 36, grade: 5, label: 'Promovat Minim (Nota 5)', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { min: 0, max: 24, grade: 4, label: 'Sub pragul de promovare (< 25p)', color: 'text-rose-400', bg: 'bg-rose-500/20' }
];

export const getMoldovaGrade = (score) => {
  const s = Math.max(0, Math.min(100, Math.round(score)));
  return MOLDOVA_GRADE_SCALE.find((g) => s >= g.min && s <= g.max) || MOLDOVA_GRADE_SCALE[MOLDOVA_GRADE_SCALE.length - 1];
};

export const SAMPLE_BAC_TESTS = [
  // =========================================================================
  // TESTUL 1 - LIMBA SI LITERATURA ROMANA (REPUBLICA MOLDOVA - ANCE 100p)
  // =========================================================================
  {
    id: 'ro-bac-1',
    subject: 'Romanian',
    code: 'TESTUL NR. 1 • ANCE R. MOLDOVA',
    title: 'Simulare BAC Limba și Literatura Română – Grigore Vieru & Condiția Intelectualului',
    profile: 'Profil Umanist & Real • 180 minute • 100 puncte (80p itemi + 20p redactare)',
    difficulty: 'Nivel Oficial BAC',
    sourceTitle: 'Grigore Vieru – „Făptura mamei”',
    sourceText: `Ușoară, maică, ușoară,
C-ai putea să mergi călcând
Pe semințele ce zboară
Între ceruri și pământ!

În priviri c-un fel de teamă,
Fericită totuși ești –
Iarba știe cum te cheamă,
Steaua știe ce gândești.

Milă mi-i de-a ta făptură
Încercată de nevoi,
Și de pruncii de pe gură,
Rămași încă pe la noi.`,
    items: [
      {
        id: 'ro1-s1-1',
        section: 'Subiectul I (40 puncte) – Analiza textului literar la prima vedere',
        number: 'Itemul 1',
        maxPoints: 8,
        question: 'Alcătuiește câte un enunț în care cuvintele „cer” și „stea” să fie utilizate cu sens figurat (conotativ), diferit de cel din text, și explică rolul epitetului dublu „Ușoară, maică, ușoară” din prima strofă.',
        keywords: ['sens figurat', 'conotativ', 'epitet', 'repetiție', 'invocație', 'imaterial', 'sacru', 'mamă', 'plutire', 'puritate'],
        minWords: 20,
        rubricCriteria: [
          'Câte 2p pentru fiecare enunț corect cu sens figurat pentru „cer” și „stea” (4p)',
          'Identificarea inversiunii/repetiției epitetului și a vocativului afectiv „maică” (2p)',
          'Explicarea sugestiei de imaterialitate, sfințenie și fragilitate a ființei materne (2p)'
        ],
        modelAnswer: 'Enunțuri cu sens figurat: 1. Privirea ei senină mi-a deschis un cer de speranță în suflet. 2. Mihai Eminescu rămâne steaua călăuzitoare a liricii românești.\nÎn prima strofă, epitetul antepus și repetat „Ușoară, maică, ușoară”, asociat cu substantivul în vocativ „maică”, conturează imaginea aproape imaterială, diafană și sacralizată a mamei, a cărei ființă pare să plutească între terestru și cosmic.'
      },
      {
        id: 'ro1-s1-2',
        section: 'Subiectul I (40 puncte) – Analiza textului literar la prima vedere',
        number: 'Itemul 2',
        maxPoints: 12,
        question: 'Comentează, în 6–8 rânduri, semnificația versurilor „Iarba știe cum te cheamă, / Steaua știe ce gândești”, evidențiind două figuri de stil diferite și relația dintre mamă și univers.',
        keywords: ['personificare', 'paralelism', 'iarba', 'steaua', 'cosmic', 'terestru', 'comuniune', 'natură', 'sacralitate', 'eternitate'],
        minWords: 35,
        rubricCriteria: [
          'Numirea a două figuri de stil (personificarea „iarba știe / steaua știe”, paralelismul sintactic, antiteza/simetria terestru–cosmic) (4p)',
          'Comentarea nuanțată a comuniunii mamei cu întreaga natură – de la firul de iarbă (teluricul) până la stea (cosmicul) (6p)',
          'Respectarea limitei de întindere și coerența exprimării (2p)'
        ],
        modelAnswer: 'Versurile „Iarba știe cum te cheamă, / Steaua știe ce gândești” sunt construite pe baza paralelismului sintactic și a unei duble personificări („iarba știe”, „steaua știe”). Cele două simboluri – „iarba” (elementul teluric, al pământului natal) și „steaua” (elementul cosmic, al eternității și destinului) – sugerează integrarea deplină a mamei în ordinea sacră a universului. Mama devine axul lumii (axis mundi), o ființă căreia natura îi cunoaște atât numele pământesc, cât și tainele gândului.'
      },
      {
        id: 'ro1-s1-3',
        section: 'Subiectul I (40 puncte) – Analiza textului literar la prima vedere',
        number: 'Itemul 3',
        maxPoints: 10,
        question: 'Exprimă-ți, în 8–10 rânduri, punctul de vedere argumentat despre starea de spirit a eului liric din strofa finală și asociază poezia lui Grigore Vieru cu un alt text din literatura română care abordează motivul mamei sau al dorului de casă.',
        keywords: ['duioșie', 'compasiune', 'venerație', 'sacrificiu', 'dor', 'blaga', 'eminescu', 'creangă', 'matcovschi', 'labiș'],
        minWords: 40,
        rubricCriteria: [
          'Identificarea stării de duioșie, compasiune filială și venerație („Milă mi-i de-a ta făptură”) (4p)',
          'Asocierea pertinentă cu un alt text din literatura română (ex. „Mama” de G. Coșbuc / N. Labiș, „Amintiri din copilărie” de I. Creangă, „Autoportret” de L. Blaga sau alt poem de Gr. Vieru) (4p)',
          'Claritatea argumentării (2p)'
        ],
        modelAnswer: 'În strofa finală, starea de spirit a eului liric îmbină duioșia profundă, compasiunea filială („Milă mi-i de-a ta făptură / Încercată de nevoi”) și recunoștința față de sacrificiul neîncetat al mamei pentru copiii săi. Această ipostază a maternității jertfelnice poate fi asociată cu poemul „Autoportret” sau „Cântecul spicelor” de Lucian Blaga, ori cu evocarea Smarandei Creangă din „Amintiri din copilărie” de Ion Creangă, unde mama reprezintă centrul protector și luminos al universului infantil.'
      },
      {
        id: 'ro1-s1-4',
        section: 'Subiectul I (40 puncte) – Analiza textului literar la prima vedere',
        number: 'Itemul 4',
        maxPoints: 10,
        question: 'Explică valoarea stilistică a modului condițional-optativ („ai putea”) din prima strofă și rolul cratimei din structura „Milă mi-i”.',
        keywords: ['condițional', 'optativ', 'potențialitate', 'ipoteză', 'cratimă', 'elidare', 'ritm', 'muzicalitate', 'oralitate'],
        minWords: 25,
        rubricCriteria: [
          'Explicarea rolului modului condițional-optativ (exprimarea unei potențialități miraculoase, a grației aproape ireale) (5p)',
          'Explicarea rolului fonetic, prozodic (păstrarea măsurii de 7–8 silabe și a ritmului trohaic) și stilistic al cratimei (5p)'
        ],
        modelAnswer: 'Verbul la modul condițional-optativ „ai putea” exprimă o ipoteză lirică și o potențialitate miraculoasă, accentuând plutirea imaterială a mamei deasupra legilor gravitației. Cratima din secvența „Milă mi-i” marchează rostirea într-o singură silabă a două părți de vorbire diferite (pronumele neaccentuat „îmi” și forma populară a verbului „e”), având rol prozodic (menținerea ritmului trohaic și a măsurii de 8 silabe) și stilistic, conferind tonului o notă de confesiune intimă, populară.'
      },
      {
        id: 'ro1-s2',
        section: 'Subiectul al II-lea (28 puncte) – Eseu argumentativ / structurat',
        number: 'Subiectul II (Eseu 28p)',
        maxPoints: 28,
        question: 'Pornind de la afirmația criticului Eugen Simion: „Adevărata dramă a omului modern este căutarea propriei identități morale într-o lume ostilă”, redactează un eseu structurat (introducere, cuprins, încheiere) în care să-ți exprimi opinia, aducând două argumente și referindu-te la două opere studiate din literatura română (ex. „Pădurea spânzuraților” de Liviu Rebreanu, „Ultima noapte de dragoste, întâia noapte de război” de Camil Petrescu, „Singur în fața dragostei” de Aureliu Busuioc sau „Tema pentru acasă” de Nicolae Dabija).',
        keywords: ['în primul rând', 'în al doilea rând', 'concluzie', 'conștiință', 'moral', 'apostol bologa', 'gheorghidiu', 'ulmu', 'negrescu', 'rebreanu', 'petrescu', 'dabija', 'busuioc', 'conflict interior'],
        minWords: 120,
        rubricCriteria: [
          'Exprimarea clară a opiniei și racordarea la aserțiunea lui Eugen Simion (4p)',
          'Dezvoltarea a două argumente distincte cu conectori logici („În primul rând”, „În al doilea rând”) (8p)',
          'Ilustrarea argumentelor prin referințe concrete la două texte din literatura română (personaje, secvențe narative, conflict interior) (10p)',
          'Valorificarea conceptelor literare (conflict psihologic, introspecție, personaj rotund/tragic) și respectarea structurii eseului (6p)'
        ],
        modelAnswer: 'Afirmația criticului Eugen Simion surprinde esența literaturii moderne: mutarea accentului de pe conflictele exterioare pe frământarea lăuntrică a individului care încearcă să-și apere integritatea morală în fața unei istorii sau societăți agresive. Consider că această căutare a identității morale constituie axul marilor romane psihologice românești.\n\nÎn primul rând, criza identitară se manifestă cu intensitate maximă în situații-limită, precum războiul, care îl silește pe intelectual să aleagă între legea exterioară a statului și legea interioară a conștiinței. Un exemplu elocvent este Apostol Bologa, protagonistul romanului „Pădurea spânzuraților” de Liviu Rebreanu. Ofițer român în armata austro-ungară, Bologa pornește de la o concepție rigidă despre datorie (participând la execuția cehului Svoboda), dar lumina din ochii condamnatului și mutarea pe frontul din Transilvania îi declanșează o dramă de conștiință. Refuzând să-și judece frații de sânge în Curtea Marțială, el încearcă să dezerteze și își asumă moartea prin spânzurare ca pe o purificare morală în numele iubirii și al credinței.\n\nÎn al doilea rând, demnitatea morală poate fi pusă la încercare de teroarea regimurilor totalitare sau de conformismul social. În romanul „Tema pentru acasă” de Nicolae Dabija, profesorul Mihai Ulmu își păstrează verticalitatea morală și umanitatea în infernul lagărului stalinist de la Poiana, fiind salvat spiritual de iubirea jertfelnică a fostei sale eleve, Maria Răzeșu. În mod similar, Ștefan Gheorghidiu din „Ultima noapte de dragoste, întâia noapte de război” de Camil Petrescu își descoperă adevărata scară de valori abia în fața tragediei colective a frontului, care relativizează drama geloziei.\n\nÎn concluzie, fie că se confruntă cu absurdul războiului sau cu opresiunea istoriei, personajele literaturii române demonstrează că salvarea ființei umane stă în fidelitatea față de propria conștiință morală.'
      },
      {
        id: 'ro1-s3',
        section: 'Subiectul al III-lea (12 puncte) + Redactare (20 puncte) – Text funcțional',
        number: 'Subiectul III (Text funcțional 12p + 20p Redactare)',
        maxPoints: 32,
        question: 'Ești elev(ă) în clasa a XII-a și te numești Alexei / Alexandra Munteanu (ATENȚIE conform regulamentului ANCE Moldova: folosește EXCLUSIV acest nume din condiție, nu numele tău real!). Redactează o SCRISOARE DE INTENȚIE (motivațională), adresată directorului Centrului Național de Excelență Literară „Mihai Eminescu” din Chișinău, dlui Victor Rusu, pentru a participa la Școala de Vară de Jurnalism și Scriere Creativă (15–25 iulie). Menționează: scopul scrisorii, două realizări/competențe relevante, motivația participării și formula de încheiere.',
        keywords: ['stimate domnule director', 'scrisoare', 'intenție', 'școala de vară', 'jurnalism', 'competențe', 'motivație', 'cu deosebit respect', 'alexei munteanu', 'alexandra munteanu'],
        minWords: 60,
        rubricCriteria: [
          'Respectarea structurii și paginării scrisorii de intenție: formulă de adresare („Stimate Domnule Director,”), paragraf introductiv, cuprins (competențe + motivație), formulă de încheiere, dată și semnătura din condiție (6p)',
          'Adecvarea la stilul oficial-administrativ și prezentarea convingătoare a celor două argumente/realizări (6p)',
          'Punctajul pentru Redactare și corectitudine lingvistică (20p): ortografie, punctuație, vocabular și absența semnelor distinctive (folosirea numelui Alexei/Alexandra Munteanu)'
        ],
        modelAnswer: 'Stimate Domnule Director Victor Rusu,\n\nSubsemnatul, Alexei Munteanu, elev în clasa a XII-a, profil umanist, vă adresez această scrisoare de intenție în vederea admiterii la Școala de Vară de Jurnalism și Scriere Creativă, organizată de Centrul Național de Excelență Literară „Mihai Eminescu” din Chișinău în perioada 15–25 iulie.\n\nPe parcursul anilor de liceu, mi-am cultivat constant pasiunea pentru literatură și publicistică. Am activat în calitate de redactor-șef al revistei școlare și am obținut premiul al II-lea la Olimpiada Republicană de Limba și Literatura Română, experiențe care mi-au dezvoltat gândirea critică, capacitatea de argumentare și rigoarea stilistică.\n\nDoresc să particip la acest program deoarece îmi propun să urmez studii universitare în domeniul științelor comunicării, iar atelierele susținute de scriitori și jurnaliști consacrați reprezintă o oportunitate excepțională de perfecționare. La această scrisoare anexez portofoliul meu de articole și CV-ul.\n\nVă mulțumesc pentru timpul acordat și rămân la dispoziția Dumneavoastră pentru un eventual interviu.\n\nData: 17 octombrie 2026\nCu deosebit respect,\nAlexei Munteanu'
      }
    ]
  },

  // =========================================================================
  // TESTUL 2 - LIMBA SI LITERATURA ROMANA (ION DRUTA & ROMANUL REALIST)
  // =========================================================================
  {
    id: 'ro-bac-2',
    subject: 'Romanian',
    code: 'TESTUL NR. 2 • ANCE R. MOLDOVA',
    title: 'Simulare BAC Limba și Literatura Română – Ion Druță („Povara bunătății noastre”) & Familia',
    profile: 'Profil Umanist & Real • 180 minute • 100 puncte',
    difficulty: 'Nivel Oficial BAC',
    sourceTitle: 'Ion Druță – „Povara bunătății noastre” (fragment)',
    sourceText: `Onache Cărăbuș își pusese casa chiar pe culmea dealului cel mare din Ciutura, acolo unde vânturile se întâlneau din patru părți, iar soarele răsărea mai devreme cu o palmă de loc decât peste restul satului. Nu avea averi mari, dar avea un suflet larg cât toată Câmpia Sorocii și o vorbă șugubeață care îi ținea de cald în iernile grele.
Când se lăsa amurgul peste Ciutura, bătrânul ieșea la poartă, își aprindea țigara și privea lung spre vale, de parcă ar fi păzit întreaga vatră a neamului său de uitare și de înstrăinare.`,
    items: [
      {
        id: 'ro2-s1-1',
        section: 'Subiectul I (40 puncte) – Analiza textului epic la prima vedere',
        number: 'Itemul 1',
        maxPoints: 12,
        question: 'Relevă, în baza fragmentului, două trăsături morale ale personajului Onache Cărăbuș și comentează semnificația simbolică a amplasării casei sale „pe culmea dealului cel mare din Ciutura”.',
        keywords: ['onache', 'cărăbuș', 'generos', 'optimist', 'deal', 'culme', 'lumină', 'verticalitate', 'ciutura', 'păzitor'],
        minWords: 30,
        rubricCriteria: [
          'Identificarea a două trăsături morale (generozitatea/bunătatea sufletească, spiritul jovial/optimismul, atașamentul față de tradiție) (6p)',
          'Comentarea simbolului dealului/culmii ca spațiu al verticalității morale și al apropierii de soare/sacru (6p)'
        ],
        modelAnswer: 'Din fragment se desprind două trăsături morale definitorii ale lui Onache Cărăbuș: bunătatea sufletească nemărginită, sugerată de hiperbola „avea un suflet larg cât toată Câmpia Sorocii”, și umorul tonic, înțelept („o vorbă șugubeață care îi ținea de cald”). Amplasarea casei pe culmea dealului cel mare din Ciutura are o profundă valoare simbolică: piscul marchează verticalitatea morală a eroului druțian, aspirația spre lumină și statutul său de veghetor spiritual al vetrei strămoșești.'
      },
      {
        id: 'ro2-s1-2',
        section: 'Subiectul I (40 puncte) – Analiza textului epic la prima vedere',
        number: 'Itemul 2',
        maxPoints: 14,
        question: 'Comentează hiperbola „avea un suflet larg cât toată Câmpia Sorocii” și explică rolul perspectivei narative din fragment.',
        keywords: ['hiperbolă', 'comparație', 'câmpia sorocii', 'narator', 'omniscient', 'persoana a iii-a', 'simpatie', 'lirism'],
        minWords: 30,
        rubricCriteria: [
          'Comentarea hiperbolei care proiectează bunătatea personajului la dimensiuni cosmice/geografice (7p)',
          'Precizarea perspectivei narative la persoana a III-a, cu accente lirice și afective specifice prozei lui Ion Druță (7p)'
        ],
        modelAnswer: 'Hiperbola „avea un suflet larg cât toată Câmpia Sorocii” asociază universul interior al țăranului cu geografia sacră a plaiului natal, sugerând că adevărata bogăție a lui Onache nu este materială, ci spirituală. Perspectiva narativă este heterodiegetică (narațiune la persoana a III-a), însă naratorul nu este rece și detașat, ci învăluie personajul într-o aură de simpatie caldă și lirism specific prozei poetice a lui Ion Druță.'
      },
      {
        id: 'ro2-s1-3',
        section: 'Subiectul I (40 puncte) – Analiza textului epic la prima vedere',
        number: 'Itemul 3',
        maxPoints: 14,
        question: 'Argumentează, în 8–10 rânduri, de ce păstrarea rădăcinilor și a memoriei locului natal este esențială pentru identitatea unei comunități, raportându-te la fragment și la experiența culturală.',
        keywords: ['rădăcini', 'memorie', 'identitate', 'tradiție', 'vatră', 'înstrăinare', 'valori'],
        minWords: 35,
        rubricCriteria: [
          'Formularea tezei despre rolul memoriei colective și al tradiției (4p)',
          'Argumentarea prin raportare la gestul simbolic al lui Onache de a păzi vatra satului de uitare și înstrăinare (6p)',
          'Coerența și rigoarea stilistică (4p)'
        ],
        modelAnswer: 'Consider că păstrarea rădăcinilor și a memoriei locului natal constituie fundamentul identității oricărei comunități, deoarece fără conștiința originilor omul devine vulnerabil în fața înstrăinării. În fragmentul dat, Onache Cărăbuș apare în amurg ca un adevărat străjer al satului Ciutura, veghea sa la poartă simbolizând datoria morală de a apăra valorile strămoșești în fața tăvălugului istoriei.'
      },
      {
        id: 'ro2-s2',
        section: 'Subiectul al II-lea (28 puncte) – Eseu structurat',
        number: 'Subiectul II (Eseu 28p)',
        maxPoints: 28,
        question: 'Redactează un eseu structurat pe tema: „Banul și ambiția socială – între împlinire și dezumanizare în romanul/nuvela realistă”. În susținerea opiniei tale, adu două argumente și raportează-te la două texte din literatura română (ex. „Enigma Otiliei” de G. Călinescu, „Mara” sau „Moara cu noroc” de Ioan Slavici, „Ion” de Liviu Rebreanu).',
        keywords: ['în primul rând', 'în al doilea rând', 'concluzie', 'ban', 'avere', 'dezumanizare', 'mara', 'ghiță', 'ion', 'costache', 'stănică', 'slavici', 'rebreanu', 'călinescu'],
        minWords: 110,
        rubricCriteria: [
          'Raportarea la temă și formularea a două argumente clare (8p)',
          'Analiza comparativă a două opere realiste (ex. Ghiță din „Moara cu noroc” / Ion din „Ion” / Mara / Stănică Rațiu) (12p)',
          'Utilizarea conceptelor literare (realism, conflict social și psihologic, dezumanizare, tipologie) și structura eseului (8p)'
        ],
        modelAnswer: 'În literatura realistă românească, banul și setea de avere reprezintă forțe sociale și psihologice capabile să modifice radical destinul uman, oscilând între ambiția legitimă de afirmare și degradarea morală ireversibilă.\n\nÎn primul rând, atunci când dorința de îmbogățire devine o patimă oarbă, ea provoacă dezumanizarea individului și destrămarea familiei. Acest proces este ilustrat magistral în nuvela psihologică „Moara cu noroc” de Ioan Slavici și în romanul „Ion” de Liviu Rebreanu. Ghiță, cârciumarul de la Moara cu noroc, încalcă avertismentul etic al bătrânei din incipit și devine complicele lui Lică Sămădăul, ajungând să-și înstrăineze și, în final, să-și ucidă soția. În mod asemănător, Ion Pop al Glanetașului își sacrifică iubirea pentru Florica și o seduce pe Ana doar pentru a obține pământurile lui Vasile Baciu, sfârșind tragic.\n\nÎn al doilea rând, în alte opere realiste, acumularea banului reflectă fie o formă de iubire maternă și emancipare socială, fie parvenitismul burghez. În romanul „Mara” de Ioan Slavici, precupeața din Radna strânge zilnic bani în cei trei ciorapi pentru a le oferi copiilor ei, Persida și Trică, un statut respectat. Pe de altă parte, în „Enigma Otiliei” de George Călinescu, lupta pentru moștenirea bătrânului avar Costache Giurgiuveanu dezvăluie rapacitatea clanului Tulea și arivismul cinic al lui Stănică Rațiu.\n\nÎn concluzie, proza realistă demonstrează că averea nu aduce fericirea atunci când este dobândită prin sacrificarea legii morale și a iubirii.'
      },
      {
        id: 'ro2-s3',
        section: 'Subiectul al III-lea (12 puncte) + Redactare (20 puncte) – Text funcțional',
        number: 'Subiectul III (Invitație oficială 12p + 20p Redactare)',
        maxPoints: 32,
        question: 'În calitate de președinte al Consiliului Elevilor din Liceul Teoretic „Prometeu” (numele din condiție: Cezar / CezaraRăileanu), redactează o INVITAȚIE OFICIALĂ adresată scriitorului Nicolae Dabija / unui scriitor contemporan, pentru a participa la cenaclul literar „Dialogul Generațiilor”, care va avea loc pe data de 15 noiembrie, ora 14:00, în Sala de Festivități a liceului.',
        keywords: ['stimate maestre', 'invitație', 'consiliul elevilor', 'liceul teoretic', 'cenaclu', '15 noiembrie', 'ora 14:00', 'cu profund respect', 'cezar răileanu', 'cezara răileanu'],
        minWords: 50,
        rubricCriteria: [
          'Structura invitației oficiale: antetul/expeditorul, formula de adresare, scopul evenimentului, coordonatele exacte de timp și loc, formula de încheiere și semnătura din condiție (6p)',
          'Stilul oficial, politicos și solemn (6p)',
          'Redactare și corectitudine ortografică/punctuație (20p)'
        ],
        modelAnswer: 'Liceul Teoretic „Prometeu” – Consiliul Elevilor\n\nINVITAȚIE\n\nStimate Maestre,\n\nConsiliul Elevilor din cadrul Liceului Teoretic „Prometeu” are deosebita onoare de a Vă invita ca oaspete de seamă la ediția aniversară a cenaclului literar „Dialogul Generațiilor”, dedicată valorilor literaturii contemporane din Republica Moldova.\n\nEvenimentul se va desfășura pe data de 15 noiembrie, începând cu ora 14:00, în Sala de Festivități a liceului (str. Mihai Eminescu, nr. 10). În cadrul întâlnirii, elevii claselor liceale își doresc să poarte un dialog deschis cu Dumneavoastră despre rolul lecturii și al memoriei istorice în formarea tinerilor.\n\nPrezența Dumneavoastră în mijlocul nostru ar constitui un prilej de aleasă bucurie spirituală. Vă rugăm să ne confirmați participarea până la data de 10 noiembrie.\n\nCu profund respect și aleasă prețuire,\nCezar Răileanu,\nPreședintele Consiliului Elevilor'
      }
    ]
  },

  // =========================================================================
  // TESTUL 3 - ISTORIA ROMANILOR SI UNIVERSALA (MODEL ANCE MOLDOVA 100p)
  // =========================================================================
  {
    id: 'hi-bac-1',
    subject: 'History',
    code: 'TESTUL NR. 3 • ANCE R. MOLDOVA (ISTORIE)',
    title: 'Simulare BAC Istoria Românilor și Universală – Unirea din 1918 & Regimul Comunist în RSSM',
    profile: 'Profil Umanist & Real • 180 minute • 100 puncte (Subiectul I: 30p, II: 30p, III: 40p)',
    difficulty: 'Nivel Oficial BAC',
    sourceTitle: 'Surse Istorice Oficiale (Sfatul Țării – 27 martie 1918 & Pactul Ribbentrop-Molotov – 1939)',
    sourceText: `SURSA A (Din Declarația Sfatului Țării din Chișinău, 27 martie 1918):
„În numele poporului Basarabiei, Sfatul Țării declară: Republica Democratică Moldovenească (Basarabia), în hotarele ei dintre Prut, Nistru, Marea Neagră și vechile granițe cu Austria, ruptă de Rusia acum o sută și mai bine de ani din trupul vechii Moldove, în puterea dreptului istoric și a dreptului de neam, pe baza principiului ca noroadele singure să-și hotărască soarta lor, de azi înainte și pentru totdeauna SE UNEȘTE CU MAMA SA, ROMÂNIA.”

SURSA B (Din memoriile lui Constantin Stere despre actul de la 27 martie 1918):
„Actul de la 27 martie 1918 n-a fost o improvizație politică, ci încununarea firească a luptei de emancipare națională a românilor basarabeni, declanșată pe fondul prăbușirii Imperiului Țarist și al afirmării dreptului popoarelor la autodeterminare.”

SURSA C (Din Protocolul adițional secret al Pactului Ribbentrop-Molotov, Moscova, 23 august 1939):
„Art. 3. În privința Europei de Sud-Est, din partea sovietică este subliniat interesul URSS pentru Basarabia. Partea germană își declară dezinteresul politic total față de aceste teritorii.”`,
    items: [
      {
        id: 'hi1-s1-1',
        section: 'Subiectul I (30 puncte) – Studiul surselor istorice: Unirea Basarabiei cu România (1918)',
        number: 'Subiectul I • Itemii 1–3',
        maxPoints: 16,
        question: '1) Precizează, în baza Sursei A, anul anexării Basarabiei de către Imperiul Rus la care face trimitere expresia „acum o sută și mai bine de ani” și explică termenul „autodeterminare națională”.\n2) Compară opiniile din Sursa A și Sursa B, arătând cum se susțin reciproc în argumentarea legitimității Unirii de la 27 martie 1918.',
        keywords: ['1812', 'pacea de la bucurești', 'autodeterminare', 'drept istoric', 'sfatul țării', 'constantin stere', 'ion inculeț', 'coroborare', 'legitimitate'],
        minWords: 35,
        rubricCriteria: [
          'Precizarea anului 1812 (Pacea ruso-turcă de la București din 16 mai 1812) și definirea corectă a principiului autodeterminării naționale (6p)',
          'Compararea Sursei A și a Sursei B: ambele surse demonstrează că Unirea din 27 martie 1918 s-a bazat pe dreptul istoric și pe dreptul popoarelor la autodeterminare (10p)'
        ],
        modelAnswer: '1) Expresia „ruptă de Rusia acum o sută și mai bine de ani” se referă la anexarea Basarabiei de către Imperiul Țarist la 16 mai 1812, prin Pacea de la București. Termenul „autodeterminare națională” desemnează principiul de drept internațional potrivit căruia fiecare popor sau națiune are dreptul suveran de a-și decide liber statutul politic și destinul istoric.\n2) Sursa A (documentul oficial al Sfatului Țării) și Sursa B (memoriile lui Constantin Stere) se completează reciproc: în timp ce Sursa A invocă explicit „dreptul istoric și dreptul de neam” și principiul autodeterminării pentru proclamarea Unirii Republicii Democratice Moldovenești cu România, Sursa B confirmă că acest act a fost rezultatul firesc al mișcării de emancipare națională a basarabenilor după destrămarea Imperiului Rus.'
      },
      {
        id: 'hi1-s1-2',
        section: 'Subiectul I (30 puncte) – Studiul surselor istorice: Etapele Marii Uniri (1917–1918)',
        number: 'Subiectul I • Itemii 4–5',
        maxPoints: 14,
        question: 'Formulează două argumente care să demonstreze rolul Sfatului Țării (Ion Inculeț, Pantelimon Halippa, Constantin Stere) în parcursul Basarabiei de la autonomie la Unire (noiembrie 1917 – martie 1918) și menționează celelalte două provincii care s-au unit cu România în toamna anului 1918.',
        keywords: ['sfatul țării', 'ion inculeț', '2 decembrie 1917', '24 ianuarie 1918', '27 martie 1918', 'bucovina', '28 noiembrie', 'transilvania', '1 decembrie', 'alba iulia', 'cernăuți'],
        minWords: 35,
        rubricCriteria: [
          'Prezentarea etapelor parcurse de Sfatul Țării: 2 decembrie 1917 (proclamarea RDM), 24 ianuarie 1918 (proclamarea independenței RDM) și 27 martie 1918 (votarea Unirii cu România) (8p)',
          'Menționarea unirii Bucovinei (28 noiembrie 1918, Cernăuți) și a Transilvaniei (1 decembrie 1918, Alba Iulia) (6p)'
        ],
        modelAnswer: 'Sfatul Țării, constituit la 21 noiembrie 1917 sub președinția lui Ion Inculeț, a fost organul reprezentativ legitim care a condus Basarabia spre autodeterminare. În primul rând, la 2 decembrie 1917, Sfatul Țării a proclamat Republica Democratică Moldovenească, iar la 24 ianuarie 1918 a votat independența deplină a RDM față de Rusia. În al doilea rând, la 27 martie 1918, cu sprijinul decisiv al lui Constantin Stere, Sfatul Țării a votat Unirea Basarabiei cu România, deschizând procesul Marii Uniri, desăvârșit ulterior prin unirea Bucovinei (28 noiembrie 1918, la Cernăuți) și a Transilvaniei, Banatului, Crișanei și Maramureșului (1 decembrie 1918, la Alba Iulia).'
      },
      {
        id: 'hi1-s2',
        section: 'Subiectul al II-lea (30 puncte) – Pactul Ribbentrop-Molotov și Anul 1940',
        number: 'Subiectul II (Analiză Cauzală 30p)',
        maxPoints: 30,
        question: 'Analizând Sursa C și cunoștințele obținute anterior:\n1) Explică natura Pactului Ribbentrop-Molotov (23 august 1939) și semnificația art. 3 din Protocolul adițional secret.\n2) Prezintă două consecințe directe ale acestui pact asupra României în vara anului 1940 (26–28 iunie 1940 și 30 august 1940).',
        keywords: ['23 august 1939', 'pact', 'neagresiune', 'sfere de influență', 'germania', 'urss', '28 iunie 1940', 'note ultimative', 'basarabia', 'bucovina de nord', 'rssm', '30 august 1940', 'dictatul de la viena'],
        minWords: 50,
        rubricCriteria: [
          'Explicarea dublului caracter al Pactului din 23 august 1939 (tratat public de neagresiune germano-sovietic + protocol adițional secret de împărțire a sferelor de influență în Europa de Est) (12p)',
          'Prezentarea consecințelor din 1940: notele ultimative sovietice din 26–28 iunie 1940 (anexarea Basarabiei, nordului Bucovinei și Ținutului Herța; crearea RSSM la 2 august 1940) și Arbitrajul/Dictatul de la Viena din 30 august 1940 (cedarea nord-vestului Transilvaniei către Ungaria) (18p)'
        ],
        modelAnswer: '1) Pactul Ribbentrop-Molotov, semnat la Moscova la 23 august 1939 între Germania nazistă și URSS, a fost în aparență un tratat de neagresiune, dar a conținut un Protocol adițional secret prin care cele două puteri totalitare își împărțeau sferele de influență în Europa Răsăriteană. Articolul 3 consfințea pretențiile anexioniste ale URSS asupra Basarabiei, cu acceptul Germaniei.\n2) Consecințele directe pentru România în vara anului 1940 au fost dramatice: în primul rând, prin notele ultimative din 26 și 27 iunie 1940, URSS a ocupat la 28 iunie 1940 Basarabia, nordul Bucovinei și Ținutul Herța (proclamând la 2 august 1940 RSS Moldovenească, în timp ce sudul Basarabiei și nordul Bucovinei au fost atribuite RSS Ucrainene). În al doilea rând, izolată diplomatic, România a fost silită prin Dictatul de la Viena (30 august 1940) să cedeze Ungariei nord-vestul Transilvaniei, iar prin Tratatul de la Craiova (7 septembrie 1940) să cedeze Cadrilaterul către Bulgaria.'
      },
      {
        id: 'hi1-s3',
        section: 'Subiectul al III-lea (40 puncte) – Eseu istoric structurat (Barem ANCE)',
        number: 'Subiectul III (Eseu Istoric 40p)',
        maxPoints: 40,
        question: 'Redactează un eseu istoric de 1–1,5 pagini cu tema: „Regimul totalitar comunist în RSS Moldovenească și lupta pentru Renaștere Națională și Independență (1944–1991)”. În elaborarea eseului, integrează următoarele repere:\n• Instaurarea regimului sovietic, foametea organizată din 1946–1947 și deportările staliniste (Operațiunea „Iug” – 5–6 iulie 1949);\n• Politica de deznaționalizare (alfabetul chirilic, teoria „moldovenismului”) și colectivizarea forțată;\n• Mișcarea de Renaștere Națională (1988–1989), legislația lingvistică din 31 august 1989 și proclamarea Independenței Republicii Moldova la 27 august 1991.',
        keywords: ['rssm', 'foamete', '1946', '1947', 'deportări', '1949', 'operațiunea iug', 'colectivizare', 'deznaționalizare', 'renaștere națională', '31 august 1989', 'grafie latină', '27 august 1991', 'independența'],
        minWords: 120,
        rubricCriteria: [
          'Structurarea discursului istoric (introducere, cuprins, încheiere) și încadrarea cronologică/spațială corectă (8p)',
          'Analiza metodelor de teroare stalinistă în RSSM: cote agricole abuzive și foametea organizată (1946–1947, peste 200.000 de victime), valurile de deportări în Siberia și Kazahstan (1941, 5–6 iulie 1949 – Operațiunea „Iug”, 1951 – Operațiunea „Sever”) și colectivizarea forțată (12p)',
          'Explicarea politicii de deznaționalizare culturală și a rezistenței antisovietice (organizațiile „Sabia Dreptății”, „Arcașii lui Ștefan”) (8p)',
          'Argumentarea rolului Mișcării de Renaștere Națională: Marea Adunare Națională, legile din 31 august 1989 (limba română și alfabetul latin), Declarația de Suveranitate (23 iunie 1990) și Declarația de Independență a Republicii Moldova (27 august 1991) (12p)'
        ],
        modelAnswer: 'După reanexarea Basarabiei de către URSS în 1944, în Republica Sovietică Socialistă Moldovenească (RSSM) a fost instaurat un regim totalitar stalinist bazat pe teroare de stat, sovietizare forțată și deznaționalizare sistematică, căruia populația românească i-a opus o rezistență curajoasă, încununată prin proclamarea Independenței la 27 august 1991.\n\nÎn primul rând, consolidarea puterii sovietice în primii ani postbelici s-a realizat prin metode represive extreme menite să înfrângă opoziția țărănească față de colectivizare. Între anii 1946 și 1947, pe fondul secetei, dar mai ales al cotelor obligatorii de cereale („postavka”) impuse abuziv de regimul de la Moscova, în RSSM s-a declanșat o foamete organizată care a provocat moartea a peste 200.000 de oameni. Această tragedie a fost urmată de cel mai amplu val de deportări staliniste din noaptea de 5 spre 6 iulie 1949, cunoscut sub numele de cod Operațiunea „Iug” („Sud”), când peste 35.000 de gospodari („chiaburi”) și intelectuali basarabeni au fost îmbarcați în vagoane de vite și deportați în Siberia și Kazahstan, urmat în 1951 de Operațiunea „Sever” împotriva confesiunilor religioase.\n\nÎn al doilea rând, pe plan cultural și identitar, regimul comunist a promovat politica „moldovenismului” sovietic, impunând alfabetul chirilic, rescriind istoria și colonizând masiv orașele. Cu toate acestea, conștiința națională a supraviețuit prin organizații antisovietice clandestine (precum „Arcașii lui Ștefan” sau „Sabia Dreptății”) și prin creația scriitorilor șaizeciști (Grigore Vieru, Ion Druță, Liviu Damian, Dumitru Matcovschi).\n\nÎn al treilea rând, pe fondul politicii de „glasnost” și „perestroika” din a doua jumătate a anilor ’80, în RSSM a izbucnit o puternică Mișcare de Renaștere și Eliberare Națională. În urma Marii Adunări Naționale de la Chișinău (27 august 1989), Sovietul Suprem a adoptat la 31 august 1989 legislația lingvistică prin care limba română (denumită atunci moldovenească) redevenea limbă de stat și se revenea la grafia latină. Procesul de emancipare a continuat prin adoptarea Declarației de Suveranitate (23 iunie 1990) și a culminat la 27 august 1991 cu adoptarea de către Parlament a Declarației de Independență a Republicii Moldova.\n\nÎn concluzie, istoria postbelică a spațiului dintre Prut și Nistru demonstrează că nici teroarea deportărilor și a foametei, nici cenzura ideologică nu au putut suprima definitiv aspirația spre libertate, limbă și demnitate națională.'
      }
    ]
  },

  // =========================================================================
  // TESTUL 4 - ISTORIA ROMANILOR SI UNIVERSALA (SISTEMUL VERSAILLES & CUZA)
  // =========================================================================
  {
    id: 'hi-bac-2',
    subject: 'History',
    code: 'TESTUL NR. 4 • ANCE R. MOLDOVA (ISTORIE)',
    title: 'Simulare BAC Istorie – Reformele lui Al. I. Cuza, Sistemul Versailles și Războiul Rece',
    profile: 'Profil Umanist & Real • 180 minute • 100 puncte (Subiectul I: 30p, II: 30p, III: 40p)',
    difficulty: 'Nivel Oficial BAC',
    sourceTitle: 'Surse Istorice (Proclamația lui Al. I. Cuza din 1864 & Cele 14 Puncte ale lui Woodrow Wilson – 1918)',
    sourceText: `SURSA A (Din Proclamația domnitorului Alexandru Ioan Cuza către țărani, 14 august 1864):
„Locuitori săteni! Claca (boiereasca) este desființată pentru de-a pururea și de astăzi voi sunteți proprietari liberi pe locurile supuse stăpânirii voastre, în întinderea hotărâtă prin legile în ființă.”

SURSA B (Din mesajul președintelui SUA, Woodrow Wilson, „Cele 14 puncte”, 8 ianuarie 1918):
„X. Popoarelor Austro-Ungariei, al căror loc între națiuni dorim să-l vedem ocrotit și asigurat, trebuie să li se acorde cea mai liberă posibilitate de dezvoltare autonomă.
XIV. Trebuie să se creeze o asociație generală a națiunilor, în virtutea unor convenții speciale, având drept scop să ofere garanții reciproce de independență politică și integritate teritorială atât statelor mari, cât și celor mici.”`,
    items: [
      {
        id: 'hi2-s1-1',
        section: 'Subiectul I (30 puncte) – Reformele democratice ale lui Alexandru Ioan Cuza',
        number: 'Subiectul I • Itemii 1–3',
        maxPoints: 30,
        question: '1) Explică, în baza Sursei A și a cunoștințelor anterioare, două prevederi și două consecințe ale Legii rurale din 14 august 1864.\n2) Formulează două argumente care să demonstreze importanța domniei lui Alexandru Ioan Cuza (1859–1866) și a prim-ministrului Mihail Kogălniceanu pentru modernizarea statului român.',
        keywords: ['1864', 'legea rurală', 'clacă', 'împroprietărire', 'cuza', 'kogălniceanu', 'secularizarea', 'învățământ', 'codul civil', '24 ianuarie 1859'],
        minWords: 45,
        rubricCriteria: [
          'Explicarea prevederilor și consecințelor Legii rurale din 1864 (desființarea clăcii/boiereștii, împroprietărirea țăranilor în funcție de numărul de vite, plata despăgubirilor, formarea micii proprietăți țărănești) (15p)',
          'Argumentarea rolului lui Al. I. Cuza și M. Kogălniceanu (unificarea instituțională după 24 ianuarie 1859, secularizarea averilor mănăstirești – 1863, Legea instrucțiunii publice – 1864, Codul Civil) (15p)'
        ],
        modelAnswer: '1) Legea rurală din 14 august 1864, promulgată de domnitorul Alexandru Ioan Cuza în urma loviturii de stat de la 2 mai 1864, prevedea abolirea definitivă a clăcii (boiereștii) și a servituților feudale, precum și împroprietărirea țăranilor pe loturile aflate în folosința lor, în funcție de puterea economică (numărul de vite), cu plata unei despăgubiri pe 15 ani. Ca urmare, peste 400.000 de familii de țărani au devenit proprietari liberi, punându-se bazele relațiilor capitaliste în agricultură.\n2) Domnia lui Al. I. Cuza (1859–1866), secondat de Mihail Kogălniceanu, a fost decisivă pentru modernizarea statului român: în primul rând, prin dubla alegere de la 5 și 24 ianuarie 1859 și recunoașterea Unirii depline (1861–1862), s-au unificat Guvernul, Parlamentul și capitala la București; în al doilea rând, pachetul de reforme din 1863–1865 (secularizarea averilor mănăstirești, Legea instrucțiunii publice care introducea învățământul primar obligatoriu și gratuit, Codul Civil de inspirație napoleoniană și înființarea Universităților din Iași și București) a așezat România pe temelii europene moderne.'
      },
      {
        id: 'hi2-s2',
        section: 'Subiectul al II-lea (30 puncte) – Sistemul Versailles-Washington și Liga Națiunilor',
        number: 'Subiectul II (Analiza Sursei B – 30p)',
        maxPoints: 30,
        question: 'În baza Sursei B și a cunoștințelor din istoria universală:\n1) Numește organizația internațională creată în 1919 la Conferința de Pace de la Paris conform punctului XIV din mesajul lui Woodrow Wilson și precizează două obiective ale acesteia.\n2) Menționează tratatele de pace din 1919–1920 prin care a fost recunoscută pe plan internațional Marea Unire a românilor din 1918.',
        keywords: ['liga națiunilor', 'societatea națiunilor', 'securitate colectivă', 'dezarmare', 'pace', 'saint-germain', 'trianon', '1919', '1920', 'nicolae titulescu'],
        minWords: 45,
        rubricCriteria: [
          'Numirea Societății (Ligii) Națiunilor cu sediul la Geneva și prezentarea obiectivelor (menținerea păcii prin securitate colectivă, dezarmarea, arbitrajul internațional) (15p)',
          'Precizarea tratatelor din Sistemul de la Paris-Versailles care au recunoscut Marea Unire: Tratatul de la Saint-Germain cu Austria (10 septembrie 1919 – Bucovina), Tratatul de la Trianon cu Ungaria (4 iunie 1920 – Transilvania) și Tratatul de la Paris (28 octombrie 1920 – Basarabia) (15p)'
        ],
        modelAnswer: '1) Organizația internațională creată în 1919 la Conferința de Pace de la Paris este Societatea (Liga) Națiunilor, cu sediul la Geneva (al cărei președinte a fost ales, în 1930 și 1931, diplomatul român Nicolae Titulescu). Două obiective fundamentale ale acesteia au fost garantarea păcii mondiale prin principiul securității colective și soluționarea pașnică, prin arbitraj diplomatic, a diferendelor dintre state.\n2) Actele Marii Uniri din 1918 au fost recunoscute internațional prin tratatele sistemului de la Versailles: Tratatul de la Saint-Germain-en-Laye cu Austria (10 septembrie 1919, care recunoștea unirea Bucovinei cu România), Tratatul de la Trianon cu Ungaria (4 iunie 1920, care consfințea unirea Transilvaniei, Banatului, Crișanei și Maramureșului) și Tratatul de la Paris din 28 octombrie 1920, prin care Marea Britanie, Franța, Italia și Japonia recunoșteau suveranitatea României asupra Basarabiei.'
      },
      {
        id: 'hi2-s3',
        section: 'Subiectul al III-lea (40 puncte) – Eseu istoric structurat',
        number: 'Subiectul III (Eseu Istoric 40p)',
        maxPoints: 40,
        question: 'Redactează un eseu istoric structurat pe tema: „Confruntarea dintre democrație și totalitarism în Europa secolului al XX-lea (Perioada interbelică și Războiul Rece)”. Integrează următoarele repere:\n• Caracteristicile regimurilor totalitare interbelice (comunismul sovietic, fascismul italian, nazismul german) în opoziție cu democrațiile parlamentare;\n• Scindarea Europei după Al Doilea Război Mondial („Cortina de Fier”, Planul Marshall, NATO vs. Tratatul de la Varșovia);\n• Prăbușirea regimurilor comuniste în anul 1989 și semnificația istorică a revenirii la valorile democratice.',
        keywords: ['totalitarism', 'democrație', 'comunism', 'fascism', 'nazism', 'partid unic', 'cultul personalității', 'războiul rece', 'cortina de fier', 'planul marshall', 'nato', 'tratatul de la varșovia', '1989'],
        minWords: 110,
        rubricCriteria: [
          'Respectarea structurii eseului (introducere, cuprins, încheiere) și utilizarea adecvată a terminologiei istorice (8p)',
          'Analiza comparativă democrație (pluripartidism, separația puterilor, drepturile omului) vs. totalitarism (partid unic, poliție politică – NKVD/Gestapo, cenzură, ideologie oficială) (12p)',
          'Prezentarea bipolarității din timpul Războiului Rece: Doctrina Truman și Planul Marshall (1947), crearea NATO (1949) vs. CAER (1949) și Tratatul de la Varșovia (1955) (10p)',
          'Explicarea cauzelor și consecințelor căderii blocului comunist în 1989–1991 (10p)'
        ],
        modelAnswer: 'Secolul al XX-lea a fost marcat de o confruntare dramatică între modelul democrației liberale – întemeiat pe pluripartidism, separația puterilor în stat și garantarea drepturilor cetățenești – și regimurile totalitare de extremă stângă și de extremă dreaptă.\n\nÎn primul rând, în perioada interbelică, pe fondul crizei economice și al nemulțumirilor postbelice, în Europa s-au instaurat trei mari regimuri totalitare: comunismul bolșevic în URSS (sub Lenin și Stalin), fascismul corporatist în Italia (Benito Mussolini, 1922) și național-socialismul în Germania (Adolf Hitler, 1933). Deși aveau ideologii diferite (lupta de clasă în comunism vs. rasismul și antisemitismul în nazism), toate regimurile totalitare au suprimat opoziția, au instituit monopolul partidului unic, cultul personalității dictatorului și teroarea poliției politice (NKVD, OVRA, Gestapo).\n\nÎn al doilea rând, după înfrângerea Axei în Al Doilea Război Mondial (1945), Europa a fost divizată de „Cortina de Fier” în cadrul Războiului Rece (1947–1991). În timp ce Europa Occidentală s-a reconstruit democratic și economic cu sprijinul SUA prin Doctrina Truman și Planul Marshall (1947), constituind alianța defensivă NATO (1949), Europa Centrală și de Est (inclusiv România și RSSM) a fost sovietizată forțat și integrată în CAER (1949) și în Tratatul de la Varșovia (1955).\n\nÎn concluzie, falimentul economic al economiei centralizate și aspirația popoarelor spre libertate au dus la Revoluțiile anticomuniste din anul 1989 (căderea Zidului Berlinului, Revoluția din România) și la destrămarea URSS în 1991, confirmând superioritatea democrației și a statului de drept.'
      }
    ]
  }
];

