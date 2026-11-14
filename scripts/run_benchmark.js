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
console.log(`Bac.ai Empirical Benchmark Complete (N = ${results.nTrials} Stratified ANCE Trials)`);
console.log('======================================================================');
console.log('Algorithm A (Heuristic Keyword Baseline):', results.algorithms.algA);
console.log('Algorithm B (Zero-Shot Semantic Vector): ', results.algorithms.algB);
console.log('Algorithm C (Bac.ai v2 Hybrid ANCE AI):  ', results.algorithms.algC);
console.log('----------------------------------------------------------------------');
console.log('Summary Comparison:', results.summaryComparison);
console.log('Category Breakdown:');
console.table(results.categoryBreakdown);
