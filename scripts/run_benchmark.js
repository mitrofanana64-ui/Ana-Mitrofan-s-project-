import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { runEmpiricalBenchmark } from '../src/ai/benchmarkRunner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const results = runEmpiricalBenchmark();
const outPath = path.join(__dirname, '..', 'src', 'data', 'benchmarkResults.json');

fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');

console.log('======================================================================');
console.log(
  `Bac.ai Dual Empirical Benchmark Complete (N_synthetic = ${results.nTrials} + N_classroom = ${results.nClassroomTrials} => N_total = ${results.nTotalCombinedTrials})`
);
console.log('======================================================================');
console.log('1) SYNTHETIC & ADVERSARIAL STRESS-TEST (N = 120):');
console.log('   Algorithm A (Heuristic Keyword Baseline):', results.algorithms.algA);
console.log('   Algorithm B (Zero-Shot Semantic Vector): ', results.algorithms.algB);
console.log('   Algorithm C (Bac.ai v2 Hybrid ANCE AI):  ', results.algorithms.algC);
console.log('----------------------------------------------------------------------');
console.log('2) REAL-WORLD 12TH-GRADE CLASSROOM FIELD VALIDATION (N_classroom = 30):');
console.log('   Inter-Teacher Blind Agreement (Pearson r):', results.classroomValidation.interTeacherPearsonR);
console.log('   Classroom MAE Reduction vs Alg A (%):     ', results.classroomValidation.maeReductionVsBaselineAPct);
console.log('   Classroom MAE Reduction vs Alg B (%):     ', results.classroomValidation.maeReductionVsZeroShotBPct);
console.log('   Classroom Alg A:', results.classroomValidation.algorithms.algA);
console.log('   Classroom Alg B:', results.classroomValidation.algorithms.algB);
console.log('   Classroom Alg C:', results.classroomValidation.algorithms.algC);
console.log('----------------------------------------------------------------------');
console.log('Category Breakdown (N = 120):');
console.table(results.categoryBreakdown);
