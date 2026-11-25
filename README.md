# Bac.ai v2.0 — Platformă R&D AI pentru Examenul Național de Bacalaureat (Republica Moldova • ANCE 100p)

**Bac.ai v2.0** este un proiect individual de cercetare științifică și inginerie software (**Autor: Ana Mitrofan**, aliniat la standardele **MoldSEF** și **Infomatrix**) dedicat pregătirii și evaluării automate a probelor scrise de la Examenul Național de Bacalaureat din Republica Moldova la disciplinele **Limba și literatura română** și **Istoria românilor și universală** (sistemul oficial de notare ANCE – 100 de puncte).

---

## 🔬 1. Ipoteza Științifică & Validare Experimentală Dublă ($N_{\text{total}} = 150$: $N_{\text{clasă}} = 30$ + $N_{\text{stres}} = 120$)

> **Ipoteza $H_1$:** *Cuplarea reprezentărilor vectoriale semantice multi-nivel pentru limba română (Subspațiu Conceptual Latent 64-dim + Subword Character 3-Gram 256-dim + TF-IDF ponderat IDF pe corpusul ANCE) cu descompunerea pe criterii a baremului oficial și un filtru sintactic de coerență (**Algoritmul C – Bac.ai v2 Hybrid**) reduce **Eroarea Medie Absolută (MAE)** față de nota profesorului evaluator cu **$>40\%$** pe răspunsuri reale, neasistate, ale elevilor de clasa a XII-a ($N_{\text{clasă}} = 30$, evaluate orb de 2 profesori BAC, $r_{\text{inter-evaluator}} = 0.9711$) și cu **$>65\%$** pe lotul stratificat de stres ($N_{\text{stres}} = 120$), eliminând 100% din scorurile fals-pozitive la atacurile keyword-stuffing.*

### Rezultate Experimentale Obținute (`node scripts/run_benchmark.js`)

| Lot Experimental & Indicator ($N_{\text{total}} = 150$) | Algoritm A (Baseline Heuristic v1) | Algoritm B (Zero-Shot Semantic) | Algoritm C (Bac.ai v2 Hybrid ANCE) | Îmbunătățire (Alg C vs. A / B) |
| :--- | :---: | :---: | :---: | :---: |
| **[Validare în Clasă $N=30$] MAE (%) față de 2 Profesori** | `12.53%` | `14.71%` | **`7.03%`** | **-43.9% vs. A / -52.2% vs. B** |
| **[Validare în Clasă $N=30$] Eroare Medie în Puncte Barem** | `3.17 p` | `4.00 p` | **`1.50 p`** | **-52.7% reducere eroare în puncte** |
| **[Validare în Clasă $N=30$] Corelația Pearson ($r$)** | `0.6264` | `0.6836` | **`0.8872`** ($R^2 = 0.7871$) | **+0.2608 câștig corelație** |
| **[Validare în Clasă $N=30$] Acuratețe în pragul $\le 10\%$** | `60.0%` | `60.0%` | **`76.7%`** | **+16.7 pp câștig acuratețe** |
| **[Lot Stres Stratificat $N=120$] MAE (%) pe 6 Categorii** | `35.86%` | `39.08%` | **`9.79%`** (`2.06 p`) | **-72.7% vs. A / -74.9% vs. B** |
| **[Lot Stres Stratificat $N=120$] Corelația Pearson ($r$)** | `0.4189` | `0.6001` | **`0.9360`** ($R^2 = 0.8761$) | **+0.5171 câștig corelație** |
| **[Lot Stres Stratificat $N=120$] Atac Keyword-Stuffing** | `91.0%` ❌ | `88.6%` ❌ | **`6.6%` ✅ (0% FP)** | **-84.4 pp reducere halucinație** |
| **Latență Medie Inferență CPU Local (ms)** | `0.08 ms` | `1.31 ms` | **`5.75 ms`** (`6.23 ms` clasă) | **Timp real (<14 ms P95)** |

---

## 💰 2. Impact Economic & ROI în Republica Moldova (MDL & EUR)

- **Cost Meditații Private în R. Moldova (2 discipline × 36 săptămâni × 250 MDL/ședință):** `18.000 MDL / elev / an` ($\approx$ `935 EUR / an`).
- **Cost Bac.ai v2 (Inferență 100% locală pe CPU = 0 MDL cost API; ~350 MDL/an cost amortizat infrastructură):**
  - **Economie Netă Anuală per Familie:** **`17.650 MDL / an` ($\approx$ `917 EUR / elev / an` — reducere de cost de `98.1%`)**.
  - **Economie la Nivel de Clasă (30 elevi):** **`529.500 MDL / an` ($\approx$ `27.506 EUR / an`)**.
  - **Economie de Timp pentru Profesori:** Pre-evaluarea unui test complet de 100p scade de la **22 minute** (manual) la **5.75 ms AI + 3 minute validare profesor** (**`86.4%` timp economisit**, respectiv **76 ore/an** pentru un profesor cu 60 de elevi).

---

## 📄 3. Pachetul Oficial de Documentație MoldSEF & Infomatrix (`docs/`)

1. **Template A — Fișierul 1 Separat (Abstract Științific 2 Pagini + Bibliografie, Times New Roman 12pt, `< 1 MB`):**
   - Markdown: [`docs/MoldSEF_Template_A_2Page_Abstract.md`](docs/MoldSEF_Template_A_2Page_Abstract.md)
   - Print-Ready HTML/PDF (Times New Roman 12pt): [`docs/MoldSEF_Template_A_2Page_Abstract.html`](docs/MoldSEF_Template_A_2Page_Abstract.html)
2. **Template A — Fișierul 2 Separat (Anexă Vizuală 1 Pagină, `< 1 MB`):**
   - Markdown: [`docs/MoldSEF_Template_A_1Page_Visual_Annex.md`](docs/MoldSEF_Template_A_1Page_Visual_Annex.md)
   - Print-Ready HTML/PDF: [`docs/MoldSEF_Template_A_1Page_Visual_Annex.html`](docs/MoldSEF_Template_A_1Page_Visual_Annex.html)
3. **Template A — Ediția Combinată:** [`docs/MoldSEF_Template_A_Abstract_and_Visual_Annex.md`](docs/MoldSEF_Template_A_Abstract_and_Visual_Annex.md)
4. **Template B — Jurnal de Laborator Datat:** [`docs/MoldSEF_Template_B_Laboratory_Logbook.md`](docs/MoldSEF_Template_B_Laboratory_Logbook.md)
5. **Machetă Panou Stand (3 Panouri) & Discurs Juriu Bilingv (Română MoldSEF + Engleză Infomatrix București):** [`docs/MoldSEF_Stand_Poster_and_Jury_Pitch.md`](docs/MoldSEF_Stand_Poster_and_Jury_Pitch.md)

---

## 🚀 4. Cum se rulează local și cum se re-execută Benchmark-ul Dublu ($N = 150$)

```bash
# 1. Instalare dependențe
npm install

# 2. Rularea reproductibilă a benchmark-ului dublu (N_clasă = 30 + N_stres = 120 => N_total = 150)
node scripts/run_benchmark.js

# 3. Compilare frontend și pornire server persistent SQLite + Express API
npm run build
node server.js
```

Aplicația este disponibilă la adresa: **[http://localhost:5173](http://localhost:5173)**
