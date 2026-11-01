# Bac.ai — Platformă AI pentru Examenul Național de Bacalaureat (Republica Moldova • ANCE)

**Bac.ai** este o aplicație web full-stack modernă dedicată pregătirii elevilor de clasa a XII-a pentru Examenul Național de Bacalaureat din Republica Moldova la disciplinele **Limba și literatura română** și **Istoria românilor și universală** (sistemul oficial de notare ANCE – 100 de puncte).

## ✨ Funcționalități Principale

- **Bibliotecă Interactivă de Studiu (20 de Module Complete)**:
  - **Limba și literatura română**: Autori din Republica Moldova (*Grigore Vieru, Ion Druță, Nicolae Dabija, Aureliu Busuioc*) și autori canonici (*Mihai Eminescu, Ion Luca Caragiale, Ioan Slavici, Liviu Rebreanu, George Călinescu, Camil Petrescu, George Bacovia, Lucian Blaga*), plus ghid complet pentru **Subiectul al III-lea (Texte funcționale – 12p)**.
  - **Istoria românilor și universală**: *Basarabia în Imperiul Rus (1812–1917), Sfatul Țării și Unirea de la 27 martie 1918, RSS Moldovenească (foametea organizată din 1946–1947, deportările staliniste – Operațiunea „Iug” din 1949), Mișcarea de Renaștere Națională și Independența Republicii Moldova (27 august 1991)*, *Statul Român Modern* și *Relațiile Internaționale în Secolul XX*.
- **Simulare Teste BAC (100 Puncte) & Corector AI în Timp Real**:
  - Rezolvare interactivă pe **Subiectul I, Subiectul II și Subiectul III** cu cronometru oficial de **180 de minute**.
  - Evaluare AI instantanee în timp real pe măsură ce scrii: contorizare cuvinte, identificare concepte-cheie și conectori argumentativi, verificarea regulii eliminatorii ANCE privind semnătura din condiție și calcularea automată a notei de la **1 la 10**.
- **Bază de Date SQLite & Server Express API**:
  - Stocarea și servirea structurată a materialelor de studiu, quiz-urilor grilă și a asistentului conversațional AI (`/api/materials`, `/api/ai-tutor`).

## 🛠️ Tehnologii Utilizate

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios
- **Backend & Database**: Node.js, Express.js, SQLite3

## 🚀 Cum se rulează local

```bash
npm install
npm run build
node server.js
```

Aplicația va fi disponibilă la adresa: **[http://localhost:5173](http://localhost:5173)**
