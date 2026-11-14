# MoldSEF & Infomatrix — Stand Design Layout & 3-Minute Jury Pitch Script
## Criteria 06 (Oral Presentation — 5/5) & 08 (Stand Design — 5/5)

---

## PART 1: 3-PANEL STAND POSTER LAYOUT (Criterion 08 — Visual Booth Design)

Print or display these 3 structured A1/A2 panels on your physical competition stand alongside your laptop running **http://localhost:5173**:

### Panel 1 (Left): Problem, Hypothesis & Socio-Economic Impact in Moldova
- **Headline:** *Democratizarea Pregătirii pentru Examenul Național de Bacalaureat (ANCE 100p) în Republica Moldova*
- **The Problem:**
  - Private tutoring for 2 BAC subjects in Moldova costs **18,000 MDL / year ($\approx$ 935 EUR)** per student (>1 average monthly net salary).
  - Manual grading of a single 100-point BAC mock exam takes **22 minutes** of teacher time.
- **Testable Scientific Hypothesis ($H_1$):**
  - *Coupling 3-representation Romanian semantic vectors (64-dim Concept Ontology + 256-dim FastText Subword 3-Gram + Corpus TF-IDF) with per-criterion ANCE rubric grounding and a Syntactic Coherence Gate ($\text{CTTR} = |V|/\sqrt{2N}$) reduces grading MAE by $>50\%$ and blocks adversarial keyword-stuffing (>80 pp reduction) across $N = 120$ trials.*
- **Economic ROI Callout Box:**
  - **17,650 MDL (917 EUR) saved / student / year (`98.1%` cost reduction)**
  - **0.00 MDL API cost** (runs 100% locally on existing school lab CPUs)
  - **86.4% teacher grading time saved** (`22 min` $\rightarrow$ `6.18 ms AI + 3 min review`)

### Panel 2 (Center): 5-Stage Hybrid NLP Architecture & Responsible AI
- **Diagram:** Print **Figure 1** from `docs/MoldSEF_Template_A_Abstract_and_Visual_Annex.md`.
- **Mathematical Core:**
  $$\mathcal{S}_{\text{sem}}(u, v) = 0.52 \cdot \cos(\mathbf{e}_{\text{concept}}) + 0.30 \cdot \cos(\mathbf{e}_{\text{tfidf}}) + 0.18 \cdot \cos(\mathbf{e}_{\text{3gram}})$$
  $$\text{CTTR} = \frac{|V_{\text{unique}}|}{\sqrt{2N}}, \quad r_{\text{func}} = \frac{|W_{\text{stop}}|}{|W|} \in [0.20, 0.62]$$
- **Responsible AI & Privacy Shield:**
  - **100% Local & Anonymized Processing:** Compliant with Republic of Moldova Law No. 133/2011 & GDPR (zero student essays sent to external cloud APIs).
  - **Explainable AI (XAI) & Human-in-the-Loop:** Per-criterion cosine telemetry + teacher oversight.

### Panel 3 (Right): Empirical Validation ($N = 120$ Trials — Algorithms A vs. B vs. C)
- **Key Experimental Charts:**
  - **Mean Absolute Error (MAE %):** Alg A (`35.86%`) vs. Alg B (`39.08%`) vs. **Alg C (`12.66%` — `-64.7%` error reduction)**
  - **Pearson Correlation ($r$):** Alg A (`0.4189`) vs. Alg B (`0.6001`) vs. **Alg C (`0.8909`, $R^2 = 0.7936$)**
  - **Adversarial Keyword-Stuffing Score (Human = 0%):** Alg A (`91.0%` ❌) vs. Alg B (`88.6%` ❌) vs. **Alg C (`6.9%` ✅ — `0%` False-Positive Rate)**
  - **CPU Inference Latency:** **`6.18 ms` mean (`15.57 ms` P95)**

---

## PART 2: 3-MINUTE ORAL PRESENTATION SCRIPT (Criterion 06 — Jury Pitch)

### [0:00 – 0:35] Hook, Real-World Problem & Economic Proof
> „Bună ziua! Sunt **Ana Mitrofan** și vă prezint **Bac.ai v2.0** — un motor hibrid de procesare a limbajului natural și evaluare semantică creat special pentru Examenul Național de Bacalaureat din Republica Moldova (sistemul oficial ANCE de 100 de puncte).
>
> În Republica Moldova, pregătirea privată la două discipline de Bacalaureat costă în medie **18.000 MDL pe an (935 EUR)** — mai mult decât un salariu mediu net lunar, ceea ce creează o barieră majoră pentru elevii din mediul rural. În același timp, corectarea manuală a unei singure simulări de 100 de puncte îi ia unui profesor **22 de minute**.”

### [0:35 – 1:35] Scientific Hypothesis, 3-Algorithm Architecture & Live Adversarial Demo
> „Am formulat o ipoteză științifică testabilă: sistemele clasice bazate pe cuvinte-cheie (**Algoritmul A**) pot fi păcălite ușor dacă elevul scrie o listă incoerentă de termeni fără gramatică, iar modelele semantice zero-shot neconstrânse (**Algoritmul B**) supraevaluează eseurile fluente scrise pe lângă subiect și ignoră regulile eliminatorii ANCE, precum **Articolul 59** privind semnătura din Subiectul al III-lea.
>
> Pentru a rezolva această problemă, am proiectat în `src/ai/nlpEngine.js` **Algoritmul C (Bac.ai v2 Hybrid)**, care proiectează răspunsul elevului și fiecare criteriu din baremul ANCE în trei spații vectoriale complementare: un subspațiu conceptual latent de 64 de dimensiuni pentru sinonime, vectori subword FastText de 256 de dimensiuni pentru rădăcini morfologice românești și TF-IDF calibrat pe corpusul ANCE. Peste această similaritate cosinus am adăugat o **Poartă de Coerență Sintactică** bazată pe *Corrected Type-Token Ratio* ($\text{CTTR}$) și densitatea predicatelor finite.
>
> *(Apasă live pe butonul **„2. Demo Juriu: Atac Keyword-Stuffing”** în aplicație)*
> Priviți demonstrația live: la o listă incoerentă de cuvinte-cheie repetate, **Algoritmul A** acordă eronat **91 din 100 de puncte (Nota 10)**, în timp ce **Algoritmul C** detectează absența structurii propoziționale și blochează frauda la **6 puncte**, în doar **6,18 milisecunde** direct pe procesorul local!”

### [1:35 – 2:30] Empirical Benchmark ($N = 120$), Persistent SQLite & Responsible AI
> *(Navighează la secțiunea **Cercetare & Benchmark** și apasă **„Rulează Live Experimentul (N = 120)”**)*
> „Am validat științific cele trei algoritme pe un eșantion stratificat de **N = 120 de răspunsuri** împărțite în 6 categorii: răspunsuri parafrazate cu sinonime, răspunsuri parțiale, atacuri keyword-stuffing, eseuri fluente off-topic și capcane de barem ANCE Art. 59.
>
> Rezultatele confirmă ipoteza: **Algoritmul C reduce Eroarea Medie Absolută (MAE) cu 64,7%** față de Algoritmul A (scăzând de la **35,86%** la **12,66%**, adică doar **2,66 puncte** abatere medie pe item) și atinge o **corelație Pearson $r = 0,8909$** cu nota profesorilor evaluatori, reducând rata fals-pozitivă la fraudă de la **100% la 0%**.
>
> Din perspectiva **Responsible AI și GDPR (Legea nr. 133/2011 RM)**, întreaga evaluare rulează **100% local și anonimizat**, cu stocare persistentă în **SQLite (`database.sqlite`)**, cost API **0 MDL** (economie de **98,1% / 17.650 MDL per elev anual**) și explicabilitate completă pentru profesor.”
