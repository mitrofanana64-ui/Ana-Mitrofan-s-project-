# MoldSEF & Infomatrix Official Documentation — Template A (Part 1 of 2: Separate File)
## 2-Page Scientific Abstract (Times New Roman 12pt Specification • < 1 MB)

- **Project Title:** **Bac.ai v2.0 — Hybrid Rubric-Grounded Semantic Vector & Syntactic Coherence Engine for Automated Assessment of the National Baccalaureate Exam in the Republic of Moldova (ANCE 100-Point Scale)**
- **Competition Category:** Computer Science, Artificial Intelligence & Educational Technology (MoldSEF & Infomatrix Unified Standard)
- **Team Setup & Role Confirmation:** **Individual Project (Single Author: Ana Mitrofan, 12th Grade, Republic of Moldova)**
  - **Workstream A (Tech & AI Engineering Lead — Ana Mitrofan):** Romanian Inflectional Stemmer, Multi-Representation Vector Space (64-dim Concept-Latent + 256-dim FastText Subword 3-Gram + Corpus TF-IDF), Syntactic Coherence Gate ($\text{CTTR}$ & Verbal Morphology Predicate Density), Semantic RAG Tutor, and Express.js + Persistent SQLite3 Architecture.
  - **Workstream B (Curriculum Research, Classroom Field Validation & Economics Lead — Ana Mitrofan):** ANCE 100-Point Rubric Formalization (20 Modules + 4 Official Exams), Classroom Field Study Collection ($N_{\text{classroom}} = 30$ real 12th-grade student answers blindly graded by 2 BAC teachers) + Controlled Stress-Test ($N_{\text{synthetic}} = 120$, $N_{\text{total}} = 150$), Statistical Validation, UI/UX, and Republic of Moldova Socio-Economic ROI Modeling.

---

## PAGE 1: PROBLEM DEFINITION, SCIENTIFIC HYPOTHESIS & METHODOLOGY

### 1. Problem Definition & Socio-Educational Context
In the Republic of Moldova, over 18,000 high school seniors sit the National Baccalaureate Exam (administered by ANCE) annually in **Romanian Language & Literature** and **Romanian & Universal History**. The ANCE 100-point examination requires complex structured essays, comparative historical source analysis, and functional texts governed by strict regulatory rules—such as **Article 59**, which invalidates any exam paper containing a personal signature instead of the designated fictional persona in Subject III.

Students and teachers currently face two systemic challenges:
1. **Economic Inequality in Exam Preparation:** Private tutoring in the Republic of Moldova costs an average of **250 MDL ($\approx$ 13.00 EUR) per 90-minute session**. Preparing for two mandatory humanities subjects across a 36-week school year requires **18,000 MDL ($\approx$ 935 EUR) per student annually**—exceeding an average monthly net salary in Moldova and creating a severe rural-urban achievement gap.
2. **Failure Modes of Existing Automated Essay Graders:**
   - **Heuristic Keyword Graders (Algorithm A):** Rely on exact substring matching (`includes()`) and word counts. They fail to recognize valid Romanian synonyms/paraphrases and are trivially exploited by *adversarial keyword-stuffing* (awarding >90% to incoherent lists of buzzwords without grammar).
   - **Unconstrained Zero-Shot Semantic / LLM Graders (Algorithm B):** Reward surface fluency and general domain vocabulary while ignoring specific ANCE point allocations, multi-source corroboration requirements, and mandatory regulatory constraints (Art. 59).

### 2. Testable Scientific Hypothesis ($X \rightarrow Y$ by $Z\%$)
> **Hypothesis ($H_1$):** *We hypothesize that coupling a multi-representation Romanian semantic vector space (64-dimensional Latent Concept Ontology + 256-dimensional Character 3-Gram Subword Embeddings + IDF-weighted Corpus TF-IDF) with per-criterion ANCE rubric decomposition and a quantitative Syntactic Coherence Gate (**Algorithm C — Bac.ai v2 Hybrid**) reduces grading **Mean Absolute Error (MAE)** relative to human expert ANCE teacher scores by **$>40\%$** on real, unscripted 12th-grade classroom responses ($N_{\text{classroom}} = 30$) and by **$>65\%$** on stratified adversarial stress-test trials ($N_{\text{synthetic}} = 120$), while reducing keyword-stuffing false-positive scores by **$>80$ percentage points**, at a sub-10 ms local CPU inference latency.*

### 3. Mathematical Formulation & Multi-Algorithm Architecture
For any student response $T_s$, reference model answer $T_m$, and decomposed ANCE rubric criteria $\{C_1, \dots, C_K\}$, `Bac.ai v2` (`src/ai/nlpEngine.js`) executes a 5-stage pipeline:
1. **Romanian Diacritic Normalization & Inflectional Stemming:** Normalizes diacritics (`ă, â, î, ș, ț`), filters functional stopwords ($W_{\text{stop}}$), and strips Romanian nominal/verbal inflectional suffixes (Porter/Snowball Romanian standard) to extract canonical stems.
2. **Multi-Representation Semantic Similarity ($\mathcal{S}_{\text{sem}}$):** Projects texts into three complementary vector spaces and computes a convex combination of L2-normalized cosine similarities:
   $$\mathcal{S}_{\text{sem}}(u, v) = 0.52 \cdot \cos\left(\mathbf{e}_{\text{concept}}(u), \mathbf{e}_{\text{concept}}(v)\right) + 0.30 \cdot \cos\left(\mathbf{e}_{\text{tfidf}}(u), \mathbf{e}_{\text{tfidf}}(v)\right) + 0.18 \cdot \cos\left(\mathbf{e}_{\text{3gram}}(u), \mathbf{e}_{\text{3gram}}(v)\right)$$
   where $\mathbf{e}_{\text{concept}} \in \mathbb{R}^{64}$ encodes 64 domain-specific literary and historical synonym clusters, $\mathbf{e}_{\text{tfidf}} \in \mathbb{R}^{|V|}$ applies sublinear TF $(1 + \ln \text{tf})$ and smoothed corpus IDF (Salton & Buckley, 1988), and $\mathbf{e}_{\text{3gram}} \in \mathbb{R}^{256}$ applies signed character trigram hashing (Bojanowski et al., 2017).
3. **Syntactic Coherence & Anti-Keyword-Stuffing Gate ($\mathcal{G}_{\text{coh}}$):** Computes Carroll's (1964) **Corrected Type-Token Ratio** $\text{CTTR} = \frac{|V_{\text{unique}}|}{\sqrt{2N}}$, the functional grammar ratio $r_{\text{func}} = \frac{|W_{\text{stop}}|}{|W|}$ (natural Romanian prose: $0.20 \le r_{\text{func}} \le 0.62$; keyword soup: $r_{\text{func}} < 0.15$), and finite Romanian verbal predicate density per sentence.
4. **Elaboration Completeness & Deterministic ANCE Art. 59 Constraint:** Scales criterion coverage by target depth ($0.72 \cdot |W_{\text{model}}|$) and enforces Subject III persona compliance (`Alexei/Alexandra Munteanu` or `Cezar/Cezara Răileanu`).

---

## PAGE 2: DUAL EMPIRICAL BENCHMARK ($N_{\text{total}} = 150$), ECONOMIC ROI & BIBLIOGRAPHY

### 4. Dual Experimental Validation: Classroom Field Study ($N = 30$) & Stress-Test ($N = 120$)
To ensure both ecological validity and adversarial robustness, we evaluated **Algorithms A, B, and C** on two distinct datasets (`node scripts/run_benchmark.js`, total $N_{\text{total}} = 150$):
- **Dataset 1 — Real-World 12th-Grade Classroom Field Validation ($N_{\text{classroom}} = 30$, `src/data/classroomValidationData.js`):** 30 unscripted practice BAC responses written by 12th-grade classmates (Humanities & Science profiles) across all 18 official items, independently and blindly graded by two BAC teachers (**Inter-Teacher Blind Agreement: Pearson $r = 0.9711$**).
- **Dataset 2 — Controlled Stratified & Adversarial Stress-Test ($N_{\text{synthetic}} = 120$, `src/data/benchmarkDataset.js`):** 120 trials stratified across 6 categories (*Exemplary Paraphrased, Solid Good, Partial Developing, Adversarial Keyword-Stuffing, Fluent Off-Topic, and ANCE Art. 59 Trap*).

| Benchmark Dataset & Metric | Algorithm A (Heuristic v1) | Algorithm B (Zero-Shot Vector) | Algorithm C (Bac.ai v2 Hybrid) | Scientific Improvement (Alg C) |
| :--- | :---: | :---: | :---: | :---: |
| **[Classroom $N=30$] MAE (%) vs. Blind Teachers** | $12.53\%$ | $14.71\%$ | **$7.03\%$** | **$-43.9\%$ vs. A / $-52.2\%$ vs. B** |
| **[Classroom $N=30$] Raw Item MAE (Points)** | $3.17\text{ p}$ | $4.00\text{ p}$ | **$1.50\text{ p}$** | **$-52.7\%$ point error reduction** |
| **[Classroom $N=30$] Pearson Correlation ($r$)** | $0.6264$ | $0.6836$ | **$0.8872$** ($R^2 = 0.7871$) | **$+0.2608$ correlation gain** |
| **[Classroom $N=30$] Accuracy Within $\le 10\%$ Error** | $60.0\%$ | $60.0\%$ | **$76.7\%$** | **$+16.7\text{ pp}$ accuracy gain** |
| **[Stress-Test $N=120$] MAE (%) Across 6 Categories** | $35.86\%$ | $39.08\%$ | **$9.79\%$** (`2.06 p`) | **$-72.7\%$ vs. A / $-74.9\%$ vs. B** |
| **[Stress-Test $N=120$] Pearson Correlation ($r$)** | $0.4189$ | $0.6001$ | **$0.9360$** ($R^2 = 0.8761$) | **$+0.5171$ correlation gain** |
| **[Stress-Test $N=120$] Adversarial Stuffing Score** | $91.0\%$ (100% FP) | $88.6\%$ (100% FP) | **$6.6\%$ (0.0% FP)** | **$-84.4\text{ pp}$ hallucination drop** |
| **Mean Local CPU Inference Latency (ms)** | $0.08\text{ ms}$ | $1.31\text{ ms}$ | **$5.75\text{ ms}$** (`6.23 ms` class) | **Real-time ($<14\text{ ms}$ P95)** |

### 5. Economic Benefit (ROI) & Responsible AI Governance
- **Financial Savings in Moldova:** Replaces **18,000 MDL/year ($\approx$ 935 EUR)** in private tutoring (2 subjects $\times$ 36 weeks $\times$ 250 MDL) with **0 MDL local CPU API cost** ($\sim$350 MDL/18 EUR amortized school hosting/year), saving **17,650 MDL (917 EUR) per student annually (`98.1%` cost reduction)** and **529,500 MDL (27,506 EUR)/year per classroom of 30 students**.
- **Teacher Productivity & Responsible AI:** Pre-grading a 100p exam drops from **22 minutes** (manual) to **5.75 ms AI + 3 minutes Human-in-the-Loop teacher review (`86.4%` time saved / 76 hours/year)**. All processing is **100% local and anonymized** in SQLite (`database.sqlite`), complying with Moldova Law No. 133/2011 and GDPR.

### 6. BIBLIOGRAPHY
1. **Bojanowski, P., Grave, E., Joulin, A., & Mikolov, T. (2017).** *Enriching Word Vectors with Subword Information.* Transactions of the Association for Computational Linguistics (TACL), 5, 135–146. (Foundation for the 256-dimensional character 3-gram subword representation).
2. **Carroll, J. B. (1964).** *Language and Thought.* Englewood Cliffs, NJ: Prentice-Hall. (Formulation of the Corrected Type-Token Ratio $\text{CTTR} = |V|/\sqrt{2N}$ used in our Syntactic Coherence Gate).
3. **Salton, G., & Buckley, C. (1988).** *Term-weighting approaches in automatic text retrieval.* Information Processing & Management, 24(5), 513–523. (Sublinear TF and smoothed corpus IDF cosine similarity weighting).
4. **Porter, M. F. (2001).** *Snowball: A language for stemming algorithms (Romanian Inflectional Stemmer Specification).* Snowball Tartarus Corpus.
5. **Agenția Națională pentru Curriculum și Evaluare (ANCE) — Ministerul Educației și Cercetării al Republicii Moldova (2025/2026).** *Regulamentul cu privire la examenul național de bacalaureat (Art. 59 privind interzicerea semnelor distinctive) & Programele de examen la Limba și literatura română și Istoria românilor și universală.* Chișinău.
6. **Parlamentul Republicii Moldova (2011).** *Legea nr. 133 din 08.07.2011 privind protecția datelor cu caracter personal* (Aligned with EU Regulation 2016/679 GDPR for anonymized local educational data processing).
