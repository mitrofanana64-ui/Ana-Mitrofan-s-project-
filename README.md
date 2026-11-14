# Bac.ai v2.0 — Platformă R&D AI pentru Examenul Național de Bacalaureat (Republica Moldova • ANCE 100p)

**Bac.ai v2.0** este un proiect de cercetare științifică și inginerie software (aliniat la standardele **MoldSEF** și **Infomatrix**) dedicat pregătirii și evaluării automate a probelor scrise de la Examenul Național de Bacalaureat din Republica Moldova la disciplinele **Limba și literatura română** și **Istoria românilor și universală** (sistemul oficial de notare ANCE – 100 de puncte).

---

## 🔬 1. Ipoteza Științifică & Benchmark Experimental ($N = 120$ Răspunsuri)

> **Ipoteza $H_1$:** *Cuplarea reprezentărilor vectoriale semantice multi-nivel pentru limba română (Subspațiu Conceptual Latent 64-dim + Subword Character 3-Gram 256-dim + TF-IDF ponderat IDF pe corpusul ANCE) cu descompunerea pe criterii a baremului oficial și un filtru sintactic de coerență (**Algoritmul C – Bac.ai v2 Hybrid**) reduce **Eroarea Medie Absolută (MAE)** față de nota profesorului evaluator cu **$>50\%$** comparativ cu potrivirea euristică de cuvinte-cheie (**Algoritmul A**) și cu modelul semantic zero-shot neconstrâns (**Algoritmul B**), reducând scorurile fals-pozitive la atacurile de tip keyword-stuffing cu **$>80$ puncte procentuale** pe un eșantion stratificat de **$N = 120$ răspunsuri**.*

### Rezultate Experimentale Obținute (`node scripts/run_benchmark.js`)

| Indicator de Performanță ($N = 120$) | Algoritm A (Baseline Heuristic v1) | Algoritm B (Zero-Shot Semantic) | Algoritm C (Bac.ai v2 Hybrid ANCE) | Îmbunătățire (Alg C vs. A / B) |
| :--- | :---: | :---: | :---: | :---: |
| **Eroarea Medie Absolută — MAE (%)** | `35.86%` | `39.08%` | **`12.66%`** | **-64.7% vs. A / -67.6% vs. B** |
| **Eroarea Medie în Puncte Barem (MAE)** | `7.39 p` | `8.35 p` | **`2.66 p`** | **-64.0% reducere eroare** |
| **RMSE (%)** | `47.74%` | `49.26%` | **`18.75%`** | **-60.7% vs. A** |
| **Corelația Pearson ($r$) cu Profesorii** | `0.4189` | `0.6001` | **`0.8909`** | **+0.4720 câștig corelație** |
| **Coeficientul de Determinare ($R^2$)** | `0.1755` | `0.3602` | **`0.7936`** | **4.5x varianță explicată** |
| **Scor Mediu Atac Keyword-Stuffing (Uman = 0%)** | `91.0%` ❌ | `88.6%` ❌ | **`6.9%` ✅** | **-84.1 pp reducere halucinație** |
| **Rată Fals-Pozitivă la Fraudă ($\ge 25\%$)** | `100.0%` | `100.0%` | **`0.0%`** | **100% blocare atac** |
| **Latență Medie Inferență CPU (ms)** | `0.08 ms` | `1.41 ms` | **`6.18 ms`** | **Timp real (<16 ms P95)** |

---

## 💰 2. Impact Economic & ROI în Republica Moldova (MDL & EUR)

- **Cost Meditații Private în R. Moldova (2 discipline × 36 săptămâni × 250 MDL/ședință):** `18.000 MDL / elev / an` ($\approx$ `935 EUR / an`).
- **Cost Bac.ai v2 (Inferență 100% locală pe CPU = 0 MDL cost API; ~350 MDL/an cost amortizat infrastructură):**
  - **Economie Netă Anuală per Familie:** **`17.650 MDL / an` ($\approx$ `917 EUR / elev / an` — reducere de cost de `98.1%`)**.
  - **Economie la Nivel de Clasă (30 elevi):** **`529.500 MDL / an` ($\approx$ `27.506 EUR / an`)**.
  - **Economie de Timp pentru Profesori:** Pre-evaluarea unui test complet de 100p scade de la **22 minute** (manual) la **6.18 ms AI + 3 minute validare profesor** (**`86.4%` timp economisit**, respectiv **76 ore/an** pentru un profesor cu 60 de elevi).

---

## ✨ 3. Funcționalități Principale & Arhitectură

1. **Motor Hibrid NLP & Vectori Semantici (`src/ai/nlpEngine.js`)**:
   - Stemmer morfologic pentru limba română și normalizare diacritice.
   - Proiecție în 3 spații vectoriale: **64-dim Concept-Latent Ontology**, **256-dim FastText Character 3-Gram** și **TF-IDF ponderat IDF**.
   - **Poartă de Coerență Sintactică (Anti-Keyword-Stuffing):** Calculează *Corrected Type-Token Ratio* ($\text{CTTR} = |V|/\sqrt{2N}$), proporția cuvintelor funcționale și densitatea predicatelor finite.
   - **Verificare Deterministă ANCE Art. 59:** Detectează semnăturile neregulamentare în Subiectul al III-lea (texte funcționale).
2. **Simulare BAC 100p cu Comparație Live pe 3 Algoritmi (`src/components/SampleTests.jsx`)**:
   - Afișează simultan scorul **Algoritmului A (Heuristic v1)**, **Algoritmului B (Zero-Shot)** și **Algoritmului C (Bac.ai v2 Hybrid)**, plus butoane **1-Click Jury Demo** pentru testarea atacurilor *keyword-stuffing* și a regulii Art. 59.
3. **Persistență SQLite Fără Pierdere de Date (`server.js` & `database.sqlite`)**:
   - Tabele persistente: `materials` (20 module), `test_attempts` (istoricul simulărilor elevilor), `benchmark_runs` și `feedback_messages`.
4. **Pachetul Oficial de Documentație MoldSEF & Infomatrix (`docs/`)**:
   - [`docs/MoldSEF_Template_A_Abstract_and_Visual_Annex.md`](docs/MoldSEF_Template_A_Abstract_and_Visual_Annex.md) — Abstract Științific (2 pagini) + Anexă Vizuală (Diagramă Arhitectură, Tabele $N=120$ & Calcul Economic ROI).
   - [`docs/MoldSEF_Template_B_Laboratory_Logbook.md`](docs/MoldSEF_Template_B_Laboratory_Logbook.md) — Jurnal de Laborator datat + Diviziunea Pilonilor R&D.

---

## 🚀 4. Cum se rulează local și cum se re-execută Benchmark-ul Științific

```bash
# 1. Instalare dependențe
npm install

# 2. Rularea reproductibilă a benchmark-ului științific (N = 120 încercări)
node scripts/run_benchmark.js

# 3. Compilare frontend și pornire server persistent SQLite + Express API
npm run build
node server.js
```

Aplicația este disponibilă la adresa: **[http://localhost:5173](http://localhost:5173)**
