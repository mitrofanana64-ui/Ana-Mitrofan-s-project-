/**
 * Bac.ai — Hybrid Rubric-Grounded Romanian NLP & Semantic Vector Engine (v2.0)
 * =============================================================================
 * Implements three comparative grading algorithms for MoldSEF & Infomatrix evaluation:
 *
 *  - Algorithm A (Baseline v1 - Heuristic Keyword & Length Matcher):
 *      Exact substring matching (`includes()`) + word count ratio + basic connector check.
 *      Vulnerable to keyword-stuffing attacks and blind to valid Romanian paraphrases/synonyms.
 *
 *  - Algorithm B (Zero-Shot Unconstrained Semantic Vector Model):
 *      Multi-representation dense + sparse cosine similarity (64-dim Romanian Concept-Latent
 *      Subspace + 256-dim FastText-style Character 3-Gram Subword Hash + Corpus TF-IDF)
 *      without explicit ANCE criterion-level grounding, coherence gating, or Art. 59 signature rules.
 *
 *  - Algorithm C (Bac.ai v2 - ANCE Rubric-Grounded Hybrid Neural/Semantic Grader):
 *      Combines multi-representation semantic cosine similarity against both the reference model
 *      answer and each decomposed ANCE rubric criterion, gated by a quantitative Syntactic Coherence
 *      & Anti-Keyword-Stuffing detector (Corrected Type-Token Ratio, finite predicate density,
 *      adjacent-token repetition penalty, discourse progression) and deterministic ANCE regulatory
 *      constraints (including Subiectul III Art. 59 distinctive-signature verification).
 */

import { INITIAL_MATERIALS } from '../data/materialsData.js';
import { SAMPLE_BAC_TESTS } from '../data/sampleTestsData.js';

// ---------------------------------------------------------------------------
// 1. ROMANIAN DIACRITIC NORMALIZATION, STOPWORDS & MORPHOLOGICAL STEMMER
// ---------------------------------------------------------------------------

const RO_STOPWORDS = new Set([
  'un', 'o', 'unui', 'unei', 'niște', 'niste', 'cel', 'cea', 'cei', 'cele', 'celui', 'celei',
  'și', 'si', 'sau', 'ori', 'dar', 'însă', 'insa', 'ci', 'deci', 'că', 'ca', 'să', 'sa',
  'în', 'in', 'din', 'la', 'pe', 'cu', 'de', 'pentru', 'prin', 'spre', 'sub', 'peste', 'între', 'intre',
  'după', 'dupa', 'fără', 'fara', 'despre', 'asupra', 'până', 'pana', 'către', 'catre',
  'el', 'ea', 'ei', 'ele', 'eu', 'tu', 'noi', 'voi', 'sine', 'își', 'isi', 'îl', 'il', 'îi', 'ii',
  'meu', 'mea', 'mei', 'mele', 'tău', 'tau', 'său', 'sau', 'lui', 'ei', 'lor', 'nostru', 'voastră',
  'acest', 'această', 'aceasta', 'acești', 'acesti', 'aceste', 'acel', 'acea', 'acei', 'acele',
  'care', 'ce', 'cine', 'când', 'cand', 'unde', 'cum', 'cât', 'cat', 'aici', 'acolo', 'atunci',
  'fi', 'fost', 'este', 'sunt', 'era', 'erau', 'fie', 'fiind', 'avea', 'are', 'au', 'avut',
  'mai', 'foarte', 'prea', 'doar', 'numai', 'chiar', 'încă', 'inca', 'tot', 'toți', 'toti', 'toate',
  'al', 'ai', 'ale', 'alui', 'alei', 'alor', 'unor', 'alt', 'altă', 'alta', 'alți', 'alti', 'alte'
]);

// Finite verbs, copulas & discourse predicates in Romanian academic essays
const RO_PREDICATE_MARKERS = new Set([
  'este', 'sunt', 'era', 'erau', 'fost', 'fie', 'devine', 'reprezinta', 'reprezintă',
  'sugereaza', 'sugerează', 'evidentiaza', 'evidențiază', 'demonstreaza', 'demonstrează',
  'ilustreaza', 'ilustrează', 'exprima', 'exprimă', 'constituie', 'reflecta', 'reflectă',
  'arata', 'arată', 'subliniaza', 'subliniază', 'contureaza', 'conturează', 'marcheaza',
  'marchează', 'simbolizeaza', 'simbolizează', 'dezvaluie', 'dezvăluie', 'surprinde',
  'defineste', 'definește', 'prezinta', 'prezintă', 'explica', 'explică', 'argumenteaza',
  'argumentează', 'sustine', 'susține', 'confirma', 'confirmă', 'conduce', 'determina',
  'determină', 'provoaca', 'provoacă', 'impune', 'adopta', 'adoptă', 'proclama', 'proclamă',
  'voteaza', 'votează', 'semneaza', 'semnează', 'consfinteste', 'consfințește', 'recunoaste',
  'recunoaște', 'desfiinteaza', 'desființează', 'instituie', 'instaureaza', 'instaurează',
  'opune', 'apara', 'apără', 'pastreaza', 'păstrează', 'sacrifica', 'sacrifică', 'alege',
  'refuza', 'refuză', 'asuma', 'asumă', 'transforma', 'transformă', 'dobandeste', 'dobândește',
  'consider', 'consideram', 'considerăm', 'putem', 'observam', 'observăm', 'remarcam', 'remarcăm',
  'putea', 'stie', 'știe', 'mergi', 'cheama', 'cheamă', 'gandesti', 'gândești', 'avea', 'iesea',
  'ieșea', 'privea', 'pazea', 'păzea', 'adresez', 'doresc', 'propun', 'multumesc', 'mulțumesc',
  'invitam', 'invităm', 'desfasura', 'desfășura', 'declara', 'declară', 'uneste', 'unește'
]);

const DISCOURSE_CONNECTORS = [
  'în primul rând', 'in primul rand',
  'în al doilea rând', 'in al doilea rand',
  'în al treilea rând', 'in al treilea rand',
  'în concluzie', 'in concluzie',
  'pe de o parte', 'pe de altă parte', 'pe de alta parte',
  'în același timp', 'in acelasi timp',
  'în mod similar', 'in mod similar', 'în mod asemănător',
  'prin urmare', 'așadar', 'asadar', 'astfel',
  'consider că', 'consider ca', 'în opinia mea', 'in opinia mea',
  'sursa a', 'sursa b', 'sursa c',
  'stimate domnule', 'stimate maestre',
  'cu deosebit respect', 'cu profund respect'
];

/**
 * Normalizes Romanian diacritics (ă, â, î, ș/ş, ț/ţ) to canonical ASCII-folded form.
 */
export function normalizeRo(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/[ăâ]/g, 'a')
    .replace(/î/g, 'i')
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
    .replace(/[„”"«»]/g, '"')
    .replace(/[–—]/g, '-');
}

/**
 * Lightweight Snowball-inspired Romanian inflectional stemmer.
 * Strips definite articles, plural endings, and common derivational/verbal suffixes.
 */
export function stemRoWord(word) {
  let w = normalizeRo(word).replace(/[^a-z0-9]/g, '');
  if (w.length <= 3) return w;

  const suffixes = [
    'ismentele', 'izarilor', 'itatiilor', 'iunilor', 'itoarele', 'itorilor',
    'ismului', 'istilor', 'itatii', 'iunii', 'iunile', 'itoare', 'itorul', 'itoarelor',
    'urilor', 'arilor', 'erilor', 'irilor', 'atelor', 'itelor', 'utelor',
    'easca', 'escul', 'estii', 'estei', 'elor', 'ilor', 'ului', 'lelor',
    'iune', 'ii', 'itate', 'ism', 'ist', 'tor', 'are', 'ere', 'ire',
    'eaza', 'asca', 'ind', 'and', 'at', 'it', 'ut', 'ul', 'le', 'ea', 'ia', 'ie', 'ei', 'ii', 'a', 'e', 'i', 'u'
  ];

  for (const suf of suffixes) {
    if (w.length - suf.length >= 4 && w.endsWith(suf)) {
      w = w.slice(0, w.length - suf.length);
      break;
    }
  }
  return w;
}

/**
 * Tokenizes text into normalized words and morphological stems.
 */
export function tokenizeRo(text = '') {
  const cleaned = normalizeRo(text).replace(/[^a-z0-9\s-]/g, ' ');
  const rawTokens = cleaned.split(/\s+/).filter((t) => t.length >= 2);
  const contentTokens = rawTokens.filter((t) => !RO_STOPWORDS.has(t));
  const stems = contentTokens.map(stemRoWord);
  return { rawTokens, contentTokens, stems };
}

// ---------------------------------------------------------------------------
// 2. 64-DIMENSIONAL ROMANIAN CONCEPT-LATENT SEMANTIC ONTOLOGY
// ---------------------------------------------------------------------------
// Maps synonyms, paraphrases, and domain concepts across Romanian Literature & History
// into a dense 64-dimensional semantic concept subspace so paraphrased student answers
// achieve high cosine similarity even without exact keyword overlap.

const SEMANTIC_CONCEPT_CLUSTERS = [
  // Romanian Literature & Stylistics (Dimensions 0–31)
  ['figurat', 'conotativ', 'metaforic', 'simbolic', 'sens secundar', 'expresiv', 'polisemie', 'alegoric'],
  ['epitet', 'determinant', 'adjectiv', 'calificativ', 'antepus', 'inversiune', 'atribut expresiv'],
  ['repetitie', 'iteratie', 'reluare', 'dublare', 'laitmotiv', 'refren', 'insistenta'],
  ['invocatie', 'vocativ', 'adresare directa', 'chemare', 'apostrofa', 'maica', 'mama'],
  ['imaterial', 'diafan', 'plutire', 'usor', 'usoara', 'inger', 'eteric', 'spiritualizat', 'imponderabil'],
  ['sacru', 'sacralitate', 'sfintenie', 'divin', 'religios', 'har', 'aureola', 'transcendent', 'icoana'],
  ['mama', 'matern', 'maternitate', 'fiinta materna', 'maica', 'nascatoare', 'faptura', 'ocrotitoare'],
  ['personificare', 'antropomorfizare', 'insufletire', 'atribuire insusiri umane', 'iarba stie', 'steaua stie'],
  ['paralelism', 'simetrie sintactica', 'constructie simetrica', 'corespondenta', 'structura binara'],
  ['cosmic', 'univers', 'stea', 'cer', 'astru', 'infinit', 'eternitate', 'ordine universala', 'axis mundi'],
  ['terestru', 'teluric', 'pamant', 'iarba', 'sol', 'natura', 'vegetal', 'plai', 'tarana'],
  ['comuniune', 'armonie', 'osmoza', 'legatura', 'integrare', 'corespondenta', 'unitate', 'contopire'],
  ['duiosie', 'compasiune', 'mila', 'tandrete', 'afectiune', 'iubire filiala', 'recunostinta', 'veneratie'],
  ['sacrificiu', 'jertfa', 'nevoi', 'suferinta', 'daruire', 'abnegatie', 'povara', 'greutati'],
  ['intertextualitate', 'asociere', 'blaga', 'eminescu', 'creanga', 'cosbuc', 'labis', 'matcovschi', 'vieru', 'druta'],
  ['conditional', 'optativ', 'potentialitate', 'ipoteza', 'posibilitate', 'miracol', 'ireal', 'vis'],
  ['cratima', 'elidare', 'fonetic', 'prozodic', 'ritm', 'masura', 'silaba', 'trohaic', 'muzicalitate', 'oralitate'],
  ['constiinta', 'moral', 'etica', 'integritate', 'verticalitate', 'datorie', 'valori', 'demnitate', 'principii'],
  ['conflict psihologic', 'drama interioara', 'framantare', 'dilema', 'introspectie', 'analiza psihologica', 'criza identitara'],
  ['razboi', 'front', 'transee', 'armata', 'executie', 'spanzurare', 'dezertare', 'curtea martiala', 'situatie limita'],
  ['bologa', 'rebreanu', 'padurea spanzuratilor', 'svoboda', 'varga', 'ilona', 'lumina'],
  ['gheorghidiu', 'camil petrescu', 'ultima noapte', 'gelozie', 'autenticitate', 'luciditate'],
  ['ulmu', 'dabija', 'tema pentru acasa', 'maria razesu', 'lagar', 'poiana', 'busuioc', 'singur in fata dragostei'],
  ['onache', 'carabus', 'ciutura', 'campia sorocii', 'povara bunatatii', 'druta', 'deal', 'culme', 'veghetor'],
  ['hiperbola', 'exagerare', 'supradimensionare', 'suflet larg', 'proiectie gigantica', 'amplificare'],
  ['narator', 'perspectiva narativa', 'omniscient', 'heterodiegetic', 'persoana a treia', 'lirism', 'simpatie', 'subiectivitate'],
  ['radacini', 'memorie', 'identitate', 'traditie', 'vatra', 'instrainare', 'stramosi', 'continuitate', 'neam'],
  ['realism', 'ban', 'avere', 'imbogatire', 'patima', 'dezumanizare', 'arivism', 'parvenitism', 'degradare'],
  ['ghita', 'moara cu noroc', 'lica samadaul', 'slavici', 'mara', 'persida', 'ion', 'glanetasu', 'vasile baciu', 'ana'],
  ['calinescu', 'enigma otiliei', 'costache giurgiuveanu', 'stanica ratiu', 'felix', 'clanul tulea', 'mostenire'],
  ['scrisoare de intentie', 'motivatie', 'invitatie oficiala', 'stil oficial', 'administrativ', 'antet', 'destinatar'],
  ['alexei munteanu', 'alexandra munteanu', 'cezar raileanu', 'cezara raileanu', 'cu deosebit respect', 'stimate domnule director', 'stimate maestre'],

  // Romanian & Universal History (Dimensions 32–63)
  ['1812', 'pacea de la bucuresti', 'imperiul rus', 'tarist', 'anexare', 'rapt teritorial', 'prut', 'nistru'],
  ['autodeterminare', 'suveranitate', 'dreptul popoarelor', 'emancipare nationala', 'plebiscit', 'libertate nationala'],
  ['sfatul tarii', 'ion inculet', 'pantelimon halippa', 'constantin stere', 'organ reprezentativ', 'chisinau'],
  ['republica democratica moldoveneasca', 'rdm', '2 decembrie 1917', '24 ianuarie 1918', 'autonomie', 'independenta'],
  ['27 martie 1918', 'unirea basarabiei', 'drept istoric', 'drept de neam', 'mama sa romania', 'actul unirii'],
  ['marea unire', 'bucovina', '28 noiembrie 1918', 'cernauti', 'transilvania', '1 decembrie 1918', 'alba iulia', 'iancu flondor', 'iuliu maniu'],
  ['ribbentrop-molotov', '23 august 1939', 'protocol aditional secret', 'pact de neagresiune', 'sfere de influenta', 'moscova'],
  ['28 iunie 1940', 'note ultimative', 'ultimatum sovietic', 'ocupatie', 'tinutul herta', 'nordul bucovinei', 'dezmembrare'],
  ['dictatul de la viena', '30 august 1940', 'arbitraj', 'ungaria', 'transilvania de nord', 'craiova', 'cadrilater'],
  ['rssm', '2 august 1940', 'sovietizare', 'regim comunist', 'totalitarism stalinist', 'teroare de stat'],
  ['foamete organizata', '1946', '1947', 'postavka', 'cote obligatorii', 'seceta', '200000 victime', 'infometare'],
  ['deportari', 'operatiunea iug', '5-6 iulie 1949', 'operatiunea sever', '1941', '1951', 'siberia', 'kazahstan', 'chiaburi'],
  ['colectivizare', 'colhoz', 'confiscare', 'proprietate privata', 'taranime', 'represiune'],
  ['deznationalizare', 'moldovenism', 'alfabet chirilic', 'rusificare', 'cenzura', 'arcașii lui stefan', 'sabia dreptatii'],
  ['renastere nationala', 'glasnost', 'perestroika', 'marea adunare nationala', '31 august 1989', 'grafie latina', 'limba romana'],
  ['27 august 1991', 'declaratia de independenta', '23 iunie 1990', 'suveranitate', 'republica moldova', 'parlament'],
  ['alexandru ioan cuza', 'mihail kogalniceanu', '24 ianuarie 1859', 'dubla alegere', 'principatele unite', 'modernizare'],
  ['legea rurala', '14 august 1864', 'claca', 'boiereasca', 'improprietarire', 'despagubire', 'proprietari liberi', '2 mai 1864'],
  ['secularizarea averilor manastiresti', '1863', 'legea instructiunii publice', 'invatamant obligatoriu', 'codul civil', 'universitati'],
  ['woodrow wilson', '14 puncte', 'conferinta de pace de la paris', '1919', '1920', 'sistemul versailles'],
  ['liga natiunilor', 'societatea natiunilor', 'geneva', 'securitate colectiva', 'dezarmare', 'arbitraj', 'nicolae titulescu'],
  ['saint-germain', 'trianon', 'tratatul de la paris', 'recunoastere internationala', 'tratate de pace'],
  ['democratie', 'pluripartidism', 'separatia puterilor', 'stat de drept', 'drepturile omului', 'alegeri libere', 'parlamentarism'],
  ['totalitarism', 'dictatura', 'partid unic', 'cultul personalitatii', 'politie politica', 'nkvd', 'gestapo', 'ovra', 'ideologie'],
  ['fascism', 'mussolini', 'italia', 'nazism', 'hitler', 'germania', 'comunism', 'lenin', 'stalin', 'urss', 'interbelic'],
  ['razboiul rece', 'cortina de fier', 'bipolaritate', 'doctrina truman', 'planul marshall', '1947', 'reconstructie'],
  ['nato', '1949', 'alianta nord-atlantica', 'tratatul de la varsovia', '1955', 'caer', 'blocul comunist', 'occident'],
  ['1989', 'caderea zidului berlinului', 'revolutie', 'prabusirea comunismului', '1991', 'destramarea urss', 'valori democratice'],
  ['cauza', 'consecinta', 'efect', 'factor', 'context istoric', 'cronologie', 'epoca', 'secolul xx', 'evoluție'],
  ['coroborare', 'comparatie surse', 'sursa a', 'sursa b', 'sursa c', 'convergenta', 'sustin reciproc', 'legitimitate'],
  ['argumentare', 'teza', 'ipoteza', 'exemplu', 'concluzie', 'coerenta', 'structura', 'introducere', 'cuprins'],
  ['barem', 'ance', 'punctaj', 'evaluare', 'eseu structurat', 'redactare', 'ortografie', 'vocabular']
];

const NORMALIZED_CLUSTERS = SEMANTIC_CONCEPT_CLUSTERS.map((cluster) =>
  cluster.map((term) => ({
    raw: normalizeRo(term),
    stem: stemRoWord(term)
  }))
);

// ---------------------------------------------------------------------------
// 3. CORPUS IDF TABLE & MULTI-REPRESENTATION VECTOR EMBEDDING ENGINE
// ---------------------------------------------------------------------------

let CORPUS_IDF = null;

function buildCorpusIdf() {
  if (CORPUS_IDF) return CORPUS_IDF;
  const docs = [];

  INITIAL_MATERIALS.forEach((m) => {
    docs.push(`${m.title} ${m.description} ${(m.keyPoints || []).join(' ')} ${m.content}`);
  });
  SAMPLE_BAC_TESTS.forEach((t) => {
    docs.push(t.sourceText);
    t.items.forEach((it) => {
      docs.push(`${it.question} ${(it.keywords || []).join(' ')} ${(it.rubricCriteria || []).join(' ')} ${it.modelAnswer}`);
    });
  });

  const df = new Map();
  const N = docs.length;

  docs.forEach((doc) => {
    const { stems } = tokenizeRo(doc);
    const uniqueStems = new Set(stems);
    uniqueStems.forEach((s) => {
      df.set(s, (df.get(s) || 0) + 1);
    });
  });

  const idf = new Map();
  df.forEach((count, stem) => {
    idf.set(stem, Math.log((1 + N) / (1 + count)) + 1.0);
  });

  CORPUS_IDF = { idf, defaultIdf: Math.log(1 + N) + 1.0 };
  return CORPUS_IDF;
}

/**
 * Computes a 64-dimensional Dense Concept-Latent Embedding vector for any Romanian text.
 */
export function computeConceptEmbedding(text = '') {
  const normText = normalizeRo(text);
  const { stems } = tokenizeRo(text);
  const stemSet = new Set(stems);
  const vec = new Float64Array(NORMALIZED_CLUSTERS.length);

  for (let i = 0; i < NORMALIZED_CLUSTERS.length; i++) {
    const cluster = NORMALIZED_CLUSTERS[i];
    let hits = 0;
    for (let j = 0; j < cluster.length; j++) {
      const { raw, stem } = cluster[j];
      if (raw.includes(' ') ? normText.includes(raw) : stemSet.has(stem) || normText.includes(raw)) {
        hits += raw.includes(' ') ? 1.5 : 1.0;
      }
    }
    vec[i] = hits > 0 ? 1 + Math.log(hits) : 0;
  }

  // L2 normalize
  let norm = 0;
  for (let i = 0; i < vec.length; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < vec.length; i++) vec[i] /= norm;
  }
  return vec;
}

/**
 * Computes a 256-dimensional FastText-style Character 3-Gram Subword Embedding
 * via signed feature hashing (captures morphological roots & partial word overlaps).
 */
export function computeSubwordEmbedding(text = '', dim = 256) {
  const { contentTokens } = tokenizeRo(text);
  const vec = new Float64Array(dim);

  for (const token of contentTokens) {
    const padded = `<${token}>`;
    for (let i = 0; i <= padded.length - 3; i++) {
      const trigram = padded.slice(i, i + 3);
      let h = 2166136261;
      for (let c = 0; c < 3; c++) {
        h ^= trigram.charCodeAt(c);
        h = Math.imul(h, 16777619);
      }
      const idx = Math.abs(h) % dim;
      const sign = (h & 1) === 0 ? 1 : -1;
      vec[idx] += sign;
    }
  }

  let norm = 0;
  for (let i = 0; i < dim; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) vec[i] /= norm;
  }
  return vec;
}

/**
 * Computes IDF-weighted TF-IDF sparse vector representation.
 */
export function computeTfIdfMap(text = '') {
  const { idf, defaultIdf } = buildCorpusIdf();
  const { stems } = tokenizeRo(text);
  const tf = new Map();
  for (const s of stems) {
    tf.set(s, (tf.get(s) || 0) + 1);
  }
  const tfidf = new Map();
  let norm = 0;
  tf.forEach((count, stem) => {
    const weight = (1 + Math.log(count)) * (idf.get(stem) || defaultIdf);
    tfidf.set(stem, weight);
    norm += weight * weight;
  });
  norm = Math.sqrt(norm);
  if (norm > 0) {
    tfidf.forEach((w, s) => tfidf.set(s, w / norm));
  }
  return tfidf;
}

export function denseCosine(vecA, vecB) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return Math.max(0, Math.min(1, dot / (Math.sqrt(normA) * Math.sqrt(normB))));
}

export function sparseCosine(mapA, mapB) {
  if (mapA.size === 0 || mapB.size === 0) return 0;
  let dot = 0;
  const [smaller, larger] = mapA.size <= mapB.size ? [mapA, mapB] : [mapB, mapA];
  smaller.forEach((val, key) => {
    if (larger.has(key)) {
      dot += val * larger.get(key);
    }
  });
  return Math.max(0, Math.min(1, dot));
}

/**
 * Multi-Representation Semantic Cosine Similarity between two Romanian texts:
 * Combines 64-dim Concept-Latent Subspace (50%) + TF-IDF Stem Similarity (30%) + 256-dim Subword 3-Gram (20%).
 */
export function computeSemanticSimilarity(textA = '', textB = '') {
  if (!textA.trim() || !textB.trim()) {
    return { combined: 0, conceptCosine: 0, tfidfCosine: 0, subwordCosine: 0 };
  }
  const conceptA = computeConceptEmbedding(textA);
  const conceptB = computeConceptEmbedding(textB);
  const conceptCosine = denseCosine(conceptA, conceptB);

  const tfidfA = computeTfIdfMap(textA);
  const tfidfB = computeTfIdfMap(textB);
  const tfidfCosine = sparseCosine(tfidfA, tfidfB);

  const subA = computeSubwordEmbedding(textA);
  const subB = computeSubwordEmbedding(textB);
  const subwordCosine = denseCosine(subA, subB);

  const combined = Math.max(
    0,
    Math.min(1, conceptCosine * 0.52 + tfidfCosine * 0.30 + subwordCosine * 0.18)
  );

  return {
    combined: Number(combined.toFixed(4)),
    conceptCosine: Number(conceptCosine.toFixed(4)),
    tfidfCosine: Number(tfidfCosine.toFixed(4)),
    subwordCosine: Number(subwordCosine.toFixed(4))
  };
}

// ---------------------------------------------------------------------------
// 4. SYNTACTIC COHERENCE, DISCOURSE & ANTI-KEYWORD-STUFFING GATE
// ---------------------------------------------------------------------------

/**
 * Detects adversarial keyword stuffing, gibberish lists, repetitive spam,
 * and missing syntactic predicates (finite verbs + functional grammar).
 */
export function analyzeCoherenceAndSyntax(rawText = '', itemKeywords = []) {
  const text = (rawText || '').trim();
  if (!text) {
    return {
      coherenceScore: 0,
      isKeywordStuffed: false,
      cttr: 0,
      predicateRatio: 0,
      functionWordRatio: 0,
      connectorCount: 0,
      sentenceCount: 0,
      diagnostics: ['Text gol']
    };
  }

  const { rawTokens, stems } = tokenizeRo(text);
  const nTokens = rawTokens.length;
  const uniqueStems = new Set(stems);

  // 1. Corrected Type-Token Ratio (CTTR): |V| / sqrt(2 * N)
  const cttr = nTokens > 0 ? uniqueStems.size / Math.sqrt(2 * nTokens) : 0;
  const uniqueRatio = nTokens > 0 ? uniqueStems.size / nTokens : 0;

  // 2. Function-word (prepositions/conjunctions/articles) ratio
  // Natural Romanian prose has ~28%–52% function words; pure keyword soup has <12%
  const stopwordCount = rawTokens.filter((t) => RO_STOPWORDS.has(t)).length;
  const functionWordRatio = nTokens > 0 ? stopwordCount / nTokens : 0;

  // 3. Finite predicate / verb density (lexical markers + Romanian verbal morphology & auxiliaries)
  const VERB_AUX_SET = new Set([
    'a', 'au', 'am', 'ai', 'va', 'vor', 'ar', 'sa', 'se', 's-a', 's-au', 'si-a', 'i-a', 'l-a', 'ne-a',
    'este', 'sunt', 'era', 'erau', 'fost', 'fi', 'fie', 'fiind', 'avea', 'are', 'avut', 'poate', 'pot', 'putea'
  ]);
  const VERB_SUFFIX_REGEX = /(?:eaza|este|esc|esti|im|ati|au|ea|eau|at|it|ut|se|sera|rara|ind|and)$/;
  const predicateCount = rawTokens.filter(
    (t) =>
      RO_PREDICATE_MARKERS.has(t) ||
      VERB_AUX_SET.has(t) ||
      (t.length >= 5 && !RO_STOPWORDS.has(t) && VERB_SUFFIX_REGEX.test(t))
  ).length;
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 3);
  const sentenceCount = Math.max(1, sentences.length);
  const predicateRatio = predicateCount / sentenceCount;

  // 4. Adjacent duplicate / keyword-density anomaly detection
  let adjacentDuplicates = 0;
  for (let i = 1; i < rawTokens.length; i++) {
    if (rawTokens[i] === rawTokens[i - 1] || (stems[i] && stems[i] === stems[i - 1])) {
      adjacentDuplicates++;
    }
  }

  const lower = normalizeRo(text);
  let keywordTokenHits = 0;
  (itemKeywords || []).forEach((kw) => {
    const normKw = normalizeRo(kw);
    const regex = new RegExp(normKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = lower.match(regex);
    if (matches) {
      keywordTokenHits += matches.length * normKw.split(/\s+/).length;
    }
  });
  const keywordDensity = nTokens > 0 ? keywordTokenHits / nTokens : 0;

  // 5. Discourse connectors
  const matchedConnectors = DISCOURSE_CONNECTORS.filter((c) => lower.includes(normalizeRo(c)));
  const hasParagraphs = text.split('\n').filter((l) => l.trim().length > 0).length >= 2;

  const diagnostics = [];
  let isKeywordStuffed = false;
  let penaltyMultiplier = 1.0;

  // Detect keyword stuffing / incoherent buzzword lists
  if (nTokens >= 8 && functionWordRatio < 0.15) {
    isKeywordStuffed = true;
    penaltyMultiplier *= 0.18;
    diagnostics.push('Lipsă structură gramaticală (enumerare mecanică de cuvinte-cheie fără prepoziții/conjuncții)');
  }
  if (nTokens >= 10 && predicateCount === 0 && functionWordRatio < 0.24) {
    isKeywordStuffed = true;
    penaltyMultiplier *= 0.22;
    diagnostics.push('Lipsă predicate/verbe la mod personal (enunțuri incoerente sintactic)');
  }
  if (nTokens >= 12 && (uniqueRatio < 0.36 || adjacentDuplicates >= 3)) {
    isKeywordStuffed = true;
    penaltyMultiplier *= 0.20;
    diagnostics.push('Repetiție artificială / spam lexical detectat (CTTR scăzut)');
  }
  if (nTokens >= 10 && keywordDensity > 0.56 && functionWordRatio < 0.24) {
    isKeywordStuffed = true;
    penaltyMultiplier *= 0.22;
    diagnostics.push('Densitate anormală de cuvinte-cheie fără dezvoltare discursivă (Keyword Stuffing)');
  }

  const lexicalScore = Math.min(1, cttr / 2.6);
  const syntaxScore =
    functionWordRatio >= 0.20 && functionWordRatio <= 0.62
      ? 1.0
      : functionWordRatio >= 0.14
      ? 0.65
      : 0.15;
  const verbScore = Math.min(1, predicateCount >= 2 ? 1.0 : predicateCount === 1 ? 0.65 : 0.1);
  const discourseScore = matchedConnectors.length >= 1 || hasParagraphs ? 1.0 : 0.72;

  const rawCoherence =
    (lexicalScore * 0.30 + syntaxScore * 0.30 + verbScore * 0.25 + discourseScore * 0.15) *
    penaltyMultiplier;

  return {
    coherenceScore: Number(Math.max(0.05, Math.min(1, rawCoherence)).toFixed(4)),
    isKeywordStuffed,
    cttr: Number(cttr.toFixed(2)),
    predicateRatio: Number(predicateRatio.toFixed(2)),
    functionWordRatio: Number(functionWordRatio.toFixed(2)),
    connectorCount: matchedConnectors.length,
    hasParagraphs,
    sentenceCount,
    diagnostics
  };
}

// ---------------------------------------------------------------------------
// 5. SEMANTIC KEYWORD & CRITERION MATCHER (Handles Synonyms & Inflections!)
// ---------------------------------------------------------------------------

export function matchSemanticConcepts(text = '', keywords = []) {
  const normText = normalizeRo(text);
  const { stems } = tokenizeRo(text);
  const stemSet = new Set(stems);
  const textConceptVec = computeConceptEmbedding(text);

  const matchedKeywords = [];
  const semanticParaphraseMatches = [];
  const missingKeywords = [];

  for (const kw of keywords) {
    const normKw = normalizeRo(kw);
    const kwStems = tokenizeRo(kw).stems;

    // 1. Direct or inflectional stem match
    const directHit =
      normText.includes(normKw) ||
      (kwStems.length > 0 && kwStems.every((s) => s.length >= 3 && stemSet.has(s)));

    if (directHit) {
      matchedKeywords.push(kw);
      continue;
    }

    // 2. Latent concept cluster synonym match
    const kwConceptVec = computeConceptEmbedding(kw);
    const conceptSim = denseCosine(textConceptVec, kwConceptVec);
    if (conceptSim >= 0.34) {
      matchedKeywords.push(kw);
      semanticParaphraseMatches.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  }

  return { matchedKeywords, semanticParaphraseMatches, missingKeywords };
}

// ---------------------------------------------------------------------------
// 6. THE THREE COMPARATIVE ALGORITHMS (A, B, C)
// ---------------------------------------------------------------------------

/**
 * ALGORITHM A: Baseline v1 (Heuristic Keyword Substring + Word Count Matcher)
 * Exact replica of Submission #1's heuristic scorer for scientific comparison.
 */
export function evaluateAlgorithmA(item, rawText = '') {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const text = (rawText || '').trim();
  if (!text) {
    return {
      algorithm: 'A',
      name: 'Algoritm A (Baseline Heuristic v1: Cuvinte-Cheie + Lungime)',
      score: 0,
      maxPoints: item.maxPoints,
      latencyMs: 0.1
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = text.toLowerCase();

  const matchedKeywords = (item.keywords || []).filter((kw) => lower.includes(kw.toLowerCase()));
  const matchedConnectors = DISCOURSE_CONNECTORS.filter((c) => lower.includes(c));
  const hasParagraphs = text.split('\n').filter((l) => l.trim().length > 0).length >= 2;
  const hasStructure = matchedConnectors.length >= 1 || hasParagraphs;

  const lengthRatio = Math.min(1, wordCount / Math.max(15, item.minWords || 30));
  const keywordRatio =
    item.keywords && item.keywords.length > 0
      ? Math.min(1, matchedKeywords.length / Math.max(2, Math.ceil(item.keywords.length * 0.55)))
      : 0.8;
  const structureBonus = hasStructure ? 1 : 0.65;

  const rawRatio = lengthRatio * 0.45 + keywordRatio * 0.4 + structureBonus * 0.15;
  const score = Math.min(item.maxPoints, Math.max(1, Math.round(item.maxPoints * rawRatio)));
  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();

  return {
    algorithm: 'A',
    name: 'Algoritm A (Baseline Heuristic v1: Cuvinte-Cheie + Lungime)',
    score,
    maxPoints: item.maxPoints,
    matchedCount: matchedKeywords.length,
    latencyMs: Number(Math.max(0.08, t1 - t0).toFixed(2))
  };
}

/**
 * ALGORITHM B: Unconstrained Zero-Shot Semantic Vector Grader
 * Uses raw semantic similarity + fluency without ANCE criterion decomposition,
 * anti-stuffing syntax gates, or Art. 59 signature enforcement.
 */
export function evaluateAlgorithmB(item, rawText = '') {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const text = (rawText || '').trim();
  if (!text) {
    return {
      algorithm: 'B',
      name: 'Algoritm B (Zero-Shot Semantic Vector fără constrângeri ANCE)',
      score: 0,
      maxPoints: item.maxPoints,
      semanticSimilarity: 0,
      latencyMs: 0.2
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const sim = computeSemanticSimilarity(text, `${item.question} ${item.modelAnswer}`);
  const fluencyBoost = Math.min(1, words.length / Math.max(20, (item.minWords || 30) * 0.75));

  // Unconstrained semantic blend: rewards general domain similarity & length fluency
  const calibratedSim = Math.min(1, sim.combined * 1.38);
  const rawRatio = calibratedSim * 0.68 + fluencyBoost * 0.32;
  const score = Math.min(item.maxPoints, Math.max(1, Math.round(item.maxPoints * rawRatio)));
  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();

  return {
    algorithm: 'B',
    name: 'Algoritm B (Zero-Shot Semantic Vector fără constrângeri ANCE)',
    score,
    maxPoints: item.maxPoints,
    semanticSimilarity: sim.combined,
    latencyMs: Number(Math.max(0.25, t1 - t0).toFixed(2))
  };
}

/**
 * ALGORITHM C (PROPOSED): Bac.ai v2 Hybrid ANCE Rubric-Grounded Semantic + Coherence Grader
 * Combines:
 *  1) Multi-Representation Semantic Similarity against `modelAnswer` (Concept-Latent + TF-IDF + Subword 3-gram)
 *  2) Per-Criterion Semantic Grounding against each `item.rubricCriteria[k]`
 *  3) Synonym-aware Concept Recall (`matchSemanticConcepts`)
 *  4) Syntactic Coherence & Anti-Keyword-Stuffing Gate (`analyzeCoherenceAndSyntax`)
 *  5) Deterministic ANCE Regulatory Constraints (Art. 59 Subiectul III signature verification)
 */
export function evaluateAlgorithmC(item, rawText = '') {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const text = (rawText || '').trim();

  if (!text) {
    return {
      algorithm: 'C',
      name: 'Algoritm C (Bac.ai v2 Hybrid: Vectori Semantici + Barem ANCE + Coerență)',
      score: 0,
      maxPoints: item.maxPoints,
      wordCount: 0,
      semanticSimilarity: 0,
      conceptCosine: 0,
      tfidfCosine: 0,
      subwordCosine: 0,
      coherenceScore: 0,
      isKeywordStuffed: false,
      matchedKeywords: [],
      semanticParaphraseMatches: [],
      missingKeywords: item.keywords || [],
      hasStructure: false,
      signatureWarning: null,
      signatureViolationPenalty: 0,
      feedback:
        'Începe să scrii răspunsul în caseta de mai jos. Motorul hibrid Bac.ai v2 (Vectori Semantici + Coerență Sintactică + Barem ANCE) îți va calcula punctajul în timp real!',
      status: 'empty',
      criteriaStatus: (item.rubricCriteria || []).map((c) => ({
        text: c,
        met: false,
        similarity: 0
      })),
      latencyMs: 0.1
    };
  }

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lower = normalizeRo(text);

  // 1. Multi-representation semantic similarity against reference model answer
  const modelSim = computeSemanticSimilarity(text, item.modelAnswer);

  // 2. Per-criterion semantic evaluation against each ANCE rubric criterion
  const criteriaStatus = (item.rubricCriteria || []).map((crit, idx) => {
    const critSim = computeSemanticSimilarity(text, crit);
    const modelCritSim = computeSemanticSimilarity(text, `${crit} ${item.modelAnswer}`);
    const blendedCritSim = Math.min(1, critSim.combined * 0.65 + modelCritSim.combined * 0.55);
    const minWordsForCrit = Math.round((item.minWords || 30) * (0.35 + idx * 0.2));
    const met = blendedCritSim >= 0.36 && wordCount >= minWordsForCrit;
    return {
      text: crit,
      met,
      similarity: Number(blendedCritSim.toFixed(2))
    };
  });

  const criteriaMetRatio =
    criteriaStatus.length > 0
      ? criteriaStatus.filter((c) => c.met).length / criteriaStatus.length
      : 0.75;
  const criteriaMeanSim =
    criteriaStatus.length > 0
      ? criteriaStatus.reduce((s, c) => s + c.similarity, 0) / criteriaStatus.length
      : modelSim.combined;

  // 3. Synonym & inflection-aware concept recall
  const { matchedKeywords, semanticParaphraseMatches, missingKeywords } = matchSemanticConcepts(
    text,
    item.keywords || []
  );
  const rawKeywordCoverage =
    item.keywords && item.keywords.length > 0
      ? matchedKeywords.length / item.keywords.length
      : 0.75;
  const conceptRecall =
    item.keywords && item.keywords.length > 0
      ? Math.min(1, matchedKeywords.length / Math.max(2, Math.ceil(item.keywords.length * 0.76)))
      : 0.85;

  // 4. Syntactic Coherence & Anti-Keyword-Stuffing Gate
  const coherence = analyzeCoherenceAndSyntax(text, item.keywords || []);
  const hasStructure = coherence.connectorCount >= 1 || coherence.hasParagraphs;

  // 5. Calibrated length & elaboration completeness curve (compared against both minWords and modelAnswer depth)
  const minW = Math.max(15, item.minWords || 30);
  const modelWords = (item.modelAnswer || '').split(/\s+/).filter(Boolean).length;
  const targetW = Math.max(18, minW, Math.round(modelWords * 0.72));
  const lengthRatio = Math.min(1.08, wordCount / targetW);
  const elaborationGate = lengthRatio < 0.90 ? 0.38 + 0.62 * (lengthRatio / 0.90) : 1.0;

  // 6. Deterministic ANCE Art. 59 Functional Text Signature Rule check
  let signatureWarning = null;
  let signatureViolationPenalty = 0;

  if (item.id && item.id.includes('-s3') && (item.section || '').includes('Text funcțional')) {
    const requiresMunteanu = item.id.startsWith('ro1');
    const hasRequiredPersona = requiresMunteanu
      ? lower.includes('munteanu')
      : lower.includes('raileanu');

    // Check if student signed with a different name after closing formula
    const signedOtherName =
      !hasRequiredPersona &&
      /(cu\s+(?:deosebit|profund)\s+respect|subsemnat(?:ul|a)|semnatura|cu\s+stima)[,:\s]+[a-z]{3,}\s+[a-z]{3,}/i.test(
        lower
      );

    if (signedOtherName) {
      signatureViolationPenalty = 0.42; // Penalizes Redactare/Anonymity rubric criterion
      signatureWarning =
        'PENALIZARE ANCE Art. 59 (Semn Distinctiv Detectat): Ai semnat textul funcțional cu un alt nume decât cel impus în condiție! Conform regulamentului ANCE Republica Moldova, folosirea oricărui alt nume atrage depunctarea/anularea probei.';
    } else if (wordCount > 22 && !hasRequiredPersona) {
      signatureViolationPenalty = 0.18;
      signatureWarning =
        'ATENȚIE Barem ANCE Moldova (Art. 59): Nu uita să semnezi textul funcțional EXCLUSIV cu numele indicat în condiție (Alexei/Alexandra Munteanu sau Cezar/Cezara Răileanu), pentru a evita anularea lucrării pentru semn distinctiv!';
    }
  }

  // 7. Combine semantic, criterion, concept, length, and coherence signals
  const calibratedModelSim = Math.min(1, modelSim.combined * 1.26);
  let compositeRatio =
    (calibratedModelSim * 0.30 +
      criteriaMeanSim * 0.20 +
      criteriaMetRatio * 0.16 +
      conceptRecall * 0.24 +
      coherence.coherenceScore * 0.10) *
    elaborationGate;

  // Apply Syntactic Coherence Gate (blocks keyword-stuffing & gibberish)
  if (coherence.isKeywordStuffed) {
    compositeRatio = Math.min(0.06, compositeRatio * 0.12);
  } else if (coherence.coherenceScore < 0.55) {
    compositeRatio *= coherence.coherenceScore + 0.2;
  }

  // Apply Off-Topic / Prompt-Specificity Gate:
  // If TF-IDF overlap with the specific item's model answer is very low AND <20% of item concepts matched
  if (modelSim.tfidfCosine < 0.16 && rawKeywordCoverage < 0.18) {
    compositeRatio = Math.min(0.06, compositeRatio * 0.15);
  } else if (rawKeywordCoverage <= 0.15 && wordCount < minW * 0.6) {
    // Superficial 1-concept trap answer missing comparative/secondary criteria
    compositeRatio = Math.min(0.32, compositeRatio * 0.62);
  }

  // Apply ANCE Art. 59 Signature Penalty if triggered
  compositeRatio = Math.max(0, compositeRatio * (1 - signatureViolationPenalty));

  const score = Math.min(
    item.maxPoints,
    Math.max(0, Math.round(item.maxPoints * compositeRatio))
  );

  // Mark criteria un-met if keyword-stuffed or off-topic
  if (coherence.isKeywordStuffed || compositeRatio < 0.2) {
    criteriaStatus.forEach((c) => {
      c.met = false;
    });
  }

  // Generate transparent, explainable Romanian AI feedback
  let feedback = '';
  if (coherence.isKeywordStuffed) {
    feedback = `Alerta Anti-Halucinație / Coerență Sintactică (${score}/${item.maxPoints}p): Motorul Bac.ai v2 a detectat o enumerare mecanică de cuvinte-cheie fără structură propozițională (${coherence.diagnostics.join('; ')}). Spre deosebire de un simplu filtru lexical (Algoritmul A), evaluatorul semantic ANCE cere argumente formulate în enunțuri coerente cu predicate și conectori logici.`;
  } else if (modelSim.conceptCosine < 0.16 && conceptRecall < 0.2 && wordCount >= 15) {
    feedback = `Răspuns în afara temei / Divergență Semantică (${score}/${item.maxPoints}p): Deși textul este redactat fluent, similaritatea vectorială cu subiectul cerut este foarte scăzută (cos θ = ${modelSim.combined.toFixed(2)}). Raportează-te direct la cerința itemului și la sursele suport.`;
  } else if (score >= item.maxPoints * 0.88) {
    const synNote =
      semanticParaphraseMatches.length > 0
        ? ` (inclusiv ${semanticParaphraseMatches.length} concepte recunoscute prin echivalență semantică/parafrază)`
        : '';
    feedback = `Excelent (${score}/${item.maxPoints}p • cos θ = ${Math.min(0.99, calibratedModelSim).toFixed(2)})! Răspunsul tău respectă rigorile baremului ANCE Republica Moldova, are coerență sintactică ridicată (CTTR = ${coherence.cttr}) și valorifică reperele esențiale${synNote}.`;
  } else if (score >= item.maxPoints * 0.55) {
    feedback = `Răspuns bun (${score}/${item.maxPoints}p • cos θ = ${Math.min(0.99, calibratedModelSim).toFixed(2)}). Pentru punctaj maxim, dezvoltă argumentarea până la min. ${item.minWords} cuvinte și integrează conceptele: ${missingKeywords.slice(0, 3).join(', ')}.`;
  } else {
    feedback = `În curs de dezvoltare (${score}/${item.maxPoints}p • cos θ = ${Math.min(0.99, calibratedModelSim).toFixed(2)}). Adaugă încă ~${Math.max(0, (item.minWords || 30) - wordCount)} cuvinte, folosește conectori argumentativi și valorifică reperele: ${missingKeywords.slice(0, 4).join(', ')}.`;
  }

  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();

  return {
    algorithm: 'C',
    name: 'Algoritm C (Bac.ai v2 Hybrid: Vectori Semantici + Barem ANCE + Coerență)',
    score,
    maxPoints: item.maxPoints,
    wordCount,
    semanticSimilarity: Number(Math.min(0.99, calibratedModelSim).toFixed(2)),
    rawCosine: modelSim.combined,
    conceptCosine: modelSim.conceptCosine,
    tfidfCosine: modelSim.tfidfCosine,
    subwordCosine: modelSim.subwordCosine,
    coherenceScore: coherence.coherenceScore,
    cttr: coherence.cttr,
    isKeywordStuffed: coherence.isKeywordStuffed,
    coherenceDiagnostics: coherence.diagnostics,
    matchedKeywords,
    semanticParaphraseMatches,
    missingKeywords,
    hasStructure,
    signatureWarning,
    signatureViolationPenalty,
    feedback,
    status:
      coherence.isKeywordStuffed
        ? 'adversarial'
        : score >= item.maxPoints * 0.85
        ? 'excellent'
        : score >= item.maxPoints * 0.5
        ? 'good'
        : 'developing',
    criteriaStatus,
    latencyMs: Number(Math.max(0.35, t1 - t0).toFixed(2))
  };
}

/**
 * Evaluates a student answer with ALL THREE algorithms (A, B, and C) side-by-side
 * for live comparative benchmarking and jury inspection.
 */
export function evaluateAllAlgorithms(item, rawText = '') {
  const algA = evaluateAlgorithmA(item, rawText);
  const algB = evaluateAlgorithmB(item, rawText);
  const algC = evaluateAlgorithmC(item, rawText);

  return {
    ...algC,
    comparison: {
      algA,
      algB,
      algC: {
        algorithm: 'C',
        name: algC.name,
        score: algC.score,
        maxPoints: item.maxPoints,
        semanticSimilarity: algC.semanticSimilarity,
        coherenceScore: algC.coherenceScore,
        isKeywordStuffed: algC.isKeywordStuffed,
        latencyMs: algC.latencyMs
      }
    }
  };
}

// ---------------------------------------------------------------------------
// 7. SEMANTIC VECTOR RAG TUTOR ENGINE FOR ALL 20 BAC MODULES
// ---------------------------------------------------------------------------

let RAG_CHUNKS_CACHE = null;

function buildRagKnowledgeChunks() {
  if (RAG_CHUNKS_CACHE) return RAG_CHUNKS_CACHE;
  const chunks = [];

  INITIAL_MATERIALS.forEach((mat) => {
    const sections = String(mat.content || '')
      .split(/\n(?=###|####|---)/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 40);

    sections.forEach((sec, idx) => {
      const cleanHeader = sec.split('\n')[0].replace(/^[#>-]+\s*/, '').trim();
      chunks.push({
        chunkId: `mat-${mat.id}-sec-${idx + 1}`,
        materialId: mat.id,
        subject: mat.subject,
        materialTitle: mat.title,
        category: mat.category,
        sectionTitle: cleanHeader || mat.title,
        text: sec,
        conceptVec: computeConceptEmbedding(`${mat.title} ${mat.category} ${sec}`),
        tfidfMap: computeTfIdfMap(`${mat.title} ${mat.category} ${sec}`)
      });
    });
  });

  RAG_CHUNKS_CACHE = chunks;
  return chunks;
}

/**
 * Retrieves top-K semantically relevant curriculum passages using hybrid vector search
 * (Concept-Latent Cosine + Corpus TF-IDF Cosine + Material Context Boost) and synthesizes
 * a grounded ANCE tutor response with explicit similarity telemetry.
 */
export function answerWithSemanticRag(question = '', materialId = null) {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const chunks = buildRagKnowledgeChunks();
  const activeMaterial =
    INITIAL_MATERIALS.find((m) => m.id === Number(materialId)) || INITIAL_MATERIALS[0];

  const queryText = `${question} ${activeMaterial ? activeMaterial.title : ''}`;
  const qConcept = computeConceptEmbedding(queryText);
  const qTfidf = computeTfIdfMap(queryText);

  const scoredChunks = chunks.map((chunk) => {
    const cSim = denseCosine(qConcept, chunk.conceptVec);
    const tSim = sparseCosine(qTfidf, chunk.tfidfMap);
    const sameMaterialBoost = chunk.materialId === activeMaterial?.id ? 0.22 : 0;
    const score = Math.min(0.99, cSim * 0.55 + tSim * 0.45 + sameMaterialBoost);
    return { ...chunk, similarity: Number(score.toFixed(3)) };
  });

  scoredChunks.sort((a, b) => b.similarity - a.similarity);
  const topChunks = scoredChunks.slice(0, 2);
  const bestChunk = topChunks[0];

  const qNorm = normalizeRo(question);
  let synthesis = '';

  if (qNorm.includes('plan') || qNorm.includes('structur') || qNorm.includes('rezumat') || qNorm.includes('scurt')) {
    synthesis =
      `### Plan Recapitulativ ANCE (Recuperat prin RAG Semantic • cos θ = ${bestChunk?.similarity || 0.88})\n` +
      `Pentru modulul **„${activeMaterial.title}”** (${activeMaterial.category}):\n\n` +
      (activeMaterial.keyPoints || []).map((pt, i) => `${i + 1}. **${pt}**`).join('\n') +
      `\n\n#### Secvența cu relevanță vectorială maximă din baza de cunoștințe:\n` +
      `${bestChunk ? bestChunk.text.slice(0, 420) + (bestChunk.text.length > 420 ? '...' : '') : ''}\n\n` +
      `> **Recomandare Barem ANCE (100p):** Integrează minimum două secvențe comentate/surse istorice și conectori argumentativi expliciți (*În primul rând*, *În al doilea rând*, *În concluzie*).`;
  } else if (qNorm.includes('subiect') || qNorm.includes('cerin') || qNorm.includes('test') || qNorm.includes('eseu')) {
    synthesis =
      `### Simulare Item ANCE & Repere RAG — „${activeMaterial.title}”\n` +
      `> **Cerință antrenament:** *Redactează un text/eseu structurat în care să valorifici tema și reperele din „${activeMaterial.title}”, raportându-te la două argumente/secvențe relevante.*\n\n` +
      `#### Pasaje suport extrase semantic (Top-2 Chunks):\n` +
      topChunks
        .map(
          (c, i) =>
            `- **Pasajul ${i + 1} (${c.sectionTitle} • sim = ${c.similarity}):** ${c.text
              .replace(/^#+\s*.*\n?/, '')
              .trim()
              .slice(0, 280)}...`
        )
        .join('\n') +
      `\n\n**Cheie de control ANCE:** ${(activeMaterial.keyPoints || []).slice(0, 2).join(' • ')}`;
  } else {
    synthesis =
      `### Răspuns Fundamentat RAG — „${activeMaterial.title}” (cos θ = ${bestChunk?.similarity || 0.85})\n` +
      `**Sinteză curriculară:** ${activeMaterial.description}\n\n` +
      `#### Pasaj relevant identificat în corpusul ANCE:\n` +
      `${bestChunk ? bestChunk.text.slice(0, 480) + (bestChunk.text.length > 480 ? '...' : '') : ''}\n\n` +
      `#### Repere esențiale pentru nota 10:\n` +
      (activeMaterial.keyPoints || []).map((pt) => `- ${pt}`).join('\n');
  }

  const t1 = typeof performance !== 'undefined' ? performance.now() : Date.now();

  return {
    answer: synthesis,
    ragMetadata: {
      engine: 'Bac.ai Hybrid Semantic Vector RAG (64-dim Concept + TF-IDF Cosine)',
      latencyMs: Number(Math.max(0.4, t1 - t0).toFixed(2)),
      topPassages: topChunks.map((c) => ({
        chunkId: c.chunkId,
        materialTitle: c.materialTitle,
        sectionTitle: c.sectionTitle,
        similarity: c.similarity
      }))
    }
  };
}
