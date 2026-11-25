# MoldSEF & Infomatrix — Stand Design Layout & Bilingual 3-Minute Jury Pitch Scripts (RO + EN)
## Criteria 06 (Oral Presentation — 5/5) & 08 (Stand Design — 5/5)

- **Official Team Setup Confirmation:** **Individual Single-Author Project**
  - **Author:** **Ana Mitrofan** (12th Grade, Republic of Moldova)
  - **Workstream A (Tech & AI Engineering Lead — Ana Mitrofan):** Romanian Inflectional Stemmer, Multi-Representation Vector Space (64-dim Concept Ontology + 256-dim FastText Subword 3-Grams + Corpus TF-IDF), Syntactic Coherence Gate ($\text{CTTR}$ + Verbal Morphology), Semantic RAG Tutor, and Express.js + Persistent SQLite3 Backend.
  - **Workstream B (Curriculum Research, Classroom Field Validation & Economics Lead — Ana Mitrofan):** ANCE 100-Point Curriculum Mapping (20 Modules + 4 Exams), Real Classroom Field Validation ($N_{\text{classroom}} = 30$ unscripted 12th-grade student responses blindly graded by 2 BAC teachers, $r = 0.9711$) + Controlled Stress-Test ($N_{\text{synthetic}} = 120$, $N_{\text{total}} = 150$), UI/UX, and Republic of Moldova Economic ROI Modeling.

---

## PART 1: 3-PANEL STAND POSTER LAYOUT (Criterion 08 — Visual Booth Design)

Print or display these 3 structured A1/A2 panels on your physical competition stand alongside your laptop running **http://localhost:5173**:

### Panel 1 (Left): Problem, Hypothesis & Socio-Economic Impact in Moldova
- **Headline:** *Democratizarea Pregătirii pentru Examenul Național de Bacalaureat (ANCE 100p) în Republica Moldova*
- **The Problem:**
  - Private tutoring for 2 BAC subjects in Moldova costs **18,000 MDL / year ($\approx$ 935 EUR)** per student (>1 average monthly net salary).
  - Manual grading of a single 100-point BAC mock exam takes **22 minutes** of teacher time.
- **Testable Scientific Hypothesis ($H_1$):**
  - *Coupling 3-representation Romanian semantic vectors (64-dim Concept Ontology + 256-dim FastText Subword 3-Gram + Corpus TF-IDF) with per-criterion ANCE rubric grounding and a Syntactic Coherence Gate ($\text{CTTR} = |V|/\sqrt{2N}$) reduces grading MAE by $>40\%$ on real 12th-grade classroom essays ($N=30$) and by $>65\%$ on stratified stress tests ($N=120$), while blocking adversarial keyword-stuffing (>80 pp reduction).*
- **Economic ROI Callout Box:**
  - **17,650 MDL (917 EUR) saved / student / year (`98.1%` cost reduction)**
  - **0.00 MDL API cost** (runs 100% locally on existing school lab CPUs)
  - **86.4% teacher grading time saved** (`22 min` $\rightarrow$ `5.75 ms AI + 3 min review`)

### Panel 2 (Center): 5-Stage Hybrid NLP Architecture & Responsible AI
- **Diagram:** Print **Figure 1** from `docs/MoldSEF_Template_A_1Page_Visual_Annex.html`.
- **Mathematical Core:**
  $$\mathcal{S}_{\text{sem}}(u, v) = 0.52 \cdot \cos(\mathbf{e}_{\text{concept}}) + 0.30 \cdot \cos(\mathbf{e}_{\text{tfidf}}) + 0.18 \cdot \cos(\mathbf{e}_{\text{3gram}})$$
  $$\text{CTTR} = \frac{|V_{\text{unique}}|}{\sqrt{2N}}, \quad r_{\text{func}} = \frac{|W_{\text{stop}}|}{|W|} \in [0.20, 0.62]$$
- **Responsible AI & Privacy Shield:**
  - **100% Local & Anonymized Processing:** Compliant with Republic of Moldova Law No. 133/2011 & GDPR (zero student essays sent to external cloud APIs).
  - **Explainable AI (XAI) & Human-in-the-Loop:** Per-criterion cosine telemetry + teacher oversight.

### Panel 3 (Right): Dual Empirical Validation ($N_{\text{classroom}} = 30$ Real Students + $N_{\text{stress}} = 120$ Trials)
- **Dataset 1 — Real-World 12th-Grade Classroom Validation ($N = 30$, Blind Dual-Teacher Agreement $r = 0.9711$):**
  - **Classroom MAE (%):** Alg A (`12.53%` / `3.17p`) vs. Alg B (`14.71%` / `4.00p`) vs. **Alg C (`7.03%` / `1.50p` — `-43.9%` vs. A, `-52.2%` vs. B)**
  - **Classroom Pearson Correlation ($r$):** Alg A (`0.6264`) vs. Alg B (`0.6836`) vs. **Alg C (`0.8872`, $R^2 = 0.7871$)**
- **Dataset 2 — Stratified & Adversarial Stress-Test ($N = 120$ Trials):**
  - **Stress-Test MAE (%):** Alg A (`35.86%`) vs. Alg B (`39.08%`) vs. **Alg C (`9.79%` — `-72.7%` error reduction, $r = 0.9360$)**
  - **Adversarial Keyword-Stuffing Score (Human = 0%):** Alg A (`91.0%` ❌) vs. Alg B (`88.6%` ❌) vs. **Alg C (`6.6%` ✅ — `0%` False-Positive Rate)**
  - **CPU Inference Latency:** **`5.75 ms` mean (`6.23 ms` classroom)**

---

## PART 2A: ROMANIAN 3-MINUTE ORAL PRESENTATION SCRIPT (For MoldSEF National Jury)

### [0:00 – 0:35] Hook, Real-World Problem & Economic Proof
> „Bună ziua! Sunt **Ana Mitrofan**, autoarea proiectului **Bac.ai v2.0** — un motor hibrid de procesare a limbajului natural și evaluare semantică proiectat pentru Examenul Național de Bacalaureat din Republica Moldova (sistemul oficial ANCE de 100 de puncte).
>
> În Republica Moldova, pregătirea privată la două discipline de Bacalaureat costă în medie **18.000 MDL pe an (935 EUR)** — mai mult decât un salariu mediu net lunar, ceea ce creează o barieră majoră pentru elevii din mediul rural. În același timp, corectarea manuală a unei singure simulări de 100 de puncte îi ia unui profesor **22 de minute**.”

### [0:35 – 1:35] Scientific Hypothesis, 3-Algorithm Architecture & Live Adversarial Demo
> „Am formulat o ipoteză științifică testabilă: sistemele clasice bazate pe cuvinte-cheie (**Algoritmul A**) pot fi păcălite ușor dacă elevul scrie o listă incoerentă de termeni fără gramatică, iar modelele semantice zero-shot neconstrânse (**Algoritmul B**) supraevaluează eseurile fluente scrise pe lângă subiect și ignoră regulile eliminatorii ANCE, precum **Articolul 59** privind semnătura din Subiectul al III-lea.
>
> Pentru a rezolva această problemă, am proiectat în `src/ai/nlpEngine.js` **Algoritmul C (Bac.ai v2 Hybrid)**, care proiectează răspunsul elevului și fiecare criteriu din baremul ANCE în trei spații vectoriale complementare: un subspațiu conceptual latent de 64 de dimensiuni pentru sinonime, vectori subword FastText de 256 de dimensiuni (Bojanowski et al., 2017) pentru rădăcini morfologice românești și TF-IDF calibrat pe corpusul ANCE. Peste această similaritate cosinus am adăugat o **Poartă de Coerență Sintactică** bazată pe *Corrected Type-Token Ratio* ($\text{CTTR}$, Carroll 1964) și morfologia verbelor finite.
>
> *(Apasă live pe butonul **„2. Demo Juriu: Atac Keyword-Stuffing”** în aplicație)*
> Priviți demonstrația live: la o listă incoerentă de cuvinte-cheie repetate, **Algoritmul A** acordă eronat **91 din 100 de puncte (Nota 10)**, în timp ce **Algoritmul C** detectează absența structurii propoziționale și blochează frauda la **6 puncte**, în doar **5,75 milisecunde** direct pe procesorul local!”

### [1:35 – 3:00] Dual Validation ($N_{\text{classroom}} = 30$ + $N_{\text{stress}} = 120$) & Responsible AI
> *(Navighează la secțiunea **Cercetare & Benchmark** și arată tabelul **Validare pe Teren în Clasă N = 30**)*
> „Am validat științific sistemul pe două loturi independente, totalizând **N = 150 de răspunsuri**:
> 1. În primul rând, o **validare pe teren în clasă pe N = 30 de răspunsuri reale, neasistate, scrise de colegi de clasa a XII-a** și evaluate independent în orb de doi profesori de Bacalaureat (acord inter-evaluator $r = 0,9711$). Pe aceste lucrări reale din clasă, **Algoritmul C obține o eroare medie absolută (MAE) de doar 7,03% (1,50 puncte)** și o corelație **Pearson $r = 0,8872$** cu nota profesorilor — reducând eroarea cu **43,9%** față de Algoritmul A și cu **52,2%** față de Algoritmul B!
> 2. În al doilea rând, pe **lotul stratificat de stres (N = 120)**, Algoritmul C reduce MAE cu **72,7%** (la **9,79%**, $r = 0,9360$) și elimină **100%** din fals-pozitivele la atacurile keyword-stuffing.
>
> Întreaga evaluare rulează **100% local și anonimizat** în **SQLite (`database.sqlite`)**, conform Legii nr. 133/2011 și GDPR, cu cost API **0 MDL** — generând o economie de **17.650 MDL (917 EUR) pe an pentru fiecare elev** și **86,4% timp economisit pentru profesori**. Vă mulțumesc și aștept întrebările dumneavoastră!”

---

## PART 2B: ENGLISH 3-MINUTE ORAL PRESENTATION SCRIPT (For Infomatrix Bucharest International Jury)

### [0:00 – 0:35] Hook, Socio-Economic Problem & Practicality
> "Good morning, esteemed members of the jury! My name is **Ana Mitrofan**, and I am the sole developer and researcher behind **Bac.ai v2.0**—a hybrid Natural Language Processing and rubric-grounded semantic assessment engine engineered for the Republic of Moldova's National Baccalaureate Exam (the official ANCE 100-point scale).
>
> Every year in Moldova, over 18,000 high school seniors take written essay exams in Romanian Literature and History. Preparing privately for just two subjects costs **18,000 Moldovan Lei per year—roughly 935 Euros**, which exceeds an entire average monthly net salary in Moldova and creates a massive barrier for rural students. Meanwhile, manually grading a single 100-point mock exam takes a teacher **22 minutes**."

### [0:35 – 1:40] Scientific Hypothesis, 3-Vector NLP Architecture & Live Adversarial Demo
> "I formulated a testable scientific hypothesis to address the two core failure modes of automated essay scoring: first, heuristic keyword graders (**Algorithm A**) fail on valid synonyms and can be tricked into awarding Grade 10 by *adversarial keyword-stuffing*; second, unconstrained zero-shot vector or LLM graders (**Algorithm B**) over-score fluent off-topic essays and ignore deterministic national regulations—such as **ANCE Article 59**, which nullifies any exam where a student signs Subject III with their real name instead of the assigned fictional persona.
>
> In `src/ai/nlpEngine.js`, I built **Algorithm C (Bac.ai v2 Hybrid)**. After Romanian diacritic folding and Snowball inflectional stemming, it projects both the student's response and each decomposed ANCE rubric criterion into three complementary vector spaces: a **64-dimensional Latent Concept Ontology**, **256-dimensional FastText-style Character 3-Gram Subword Embeddings** (Bojanowski et al., 2017), and **Corpus-Calibrated TF-IDF**. Crucially, this semantic score is gated by a **Syntactic Coherence Gate** using Carroll's (1964) **Corrected Type-Token Ratio** ($\text{CTTR} = |V|/\sqrt{2N}$), functional grammar ratio, and Romanian verbal morphology density.
>
> *(Click **'2. Demo Juriu: Atac Keyword-Stuffing'** live in the UI)*
> Watch this live adversarial test: when fed an incoherent list of repeated keywords without sentence grammar, **Baseline Algorithm A** awards **91 out of 100 points**, whereas **Algorithm C** detects the missing predicates and syntactic structure, blocking the attack at **6 points** in just **5.75 milliseconds** on a local CPU!"

### [1:40 – 3:00] Dual Empirical Benchmark ($N_{\text{classroom}} = 30$ + $N_{\text{stress}} = 120$), Economics & Responsible AI
> *(Scroll to **Cercetare & Benchmark** and point to the **Real-World Classroom Field Validation N = 30** table)*
> "To prove both real-world classroom validity and adversarial robustness, I conducted a dual benchmark across **150 total trials**:
> 1. First, in a **Real-World Classroom Field Study ($N = 30$)**, I collected 30 unscripted practice BAC responses from 12th-grade classmates across Humanities and Science profiles, independently and blindly graded by two BAC teachers (inter-rater agreement **Pearson $r = 0.9711$**). On real student writing, **Algorithm C achieves a Mean Absolute Error of just 7.03% (1.50 raw points)** and **Pearson $r = 0.8872$**—reducing grading error by **43.9% compared to Algorithm A** and **52.2% compared to Algorithm B**.
> 2. Second, on our **120-trial Stratified & Adversarial Stress-Test**, Algorithm C reduces MAE by **72.7%** (down to **9.79%**, $r = 0.9360$) and eliminates **100%** of keyword-stuffing false positives.
>
> Finally, by running **100% locally and anonymized** in SQLite (`database.sqlite`) in compliance with GDPR and Moldova Law No. 133/2011, `Bac.ai v2` operates at **0 Euros API cost**—saving families **917 Euros (17,650 MDL) per student annually (a 98.1% cost reduction)** and saving teachers **86.4% of their grading time**. Thank you, and I welcome your questions!"
