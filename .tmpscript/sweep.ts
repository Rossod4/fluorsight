import { SEED_SAMPLES, SEED_SITES } from '../src/data/seed';
import { DEFAULT_SETTINGS } from '../src/lib/riskEngine';
import { thresholdSweep, backtest, weightSensitivity, scoreAll } from '../src/lib/validation';
const sc = scoreAll(SEED_SAMPLES, SEED_SITES, DEFAULT_SETTINGS);
console.log('n samples', SEED_SAMPLES.length, 'sites', SEED_SITES.length, 'screened', sc.filter(s=>s.score>0).length);
console.log('backtest', JSON.stringify(backtest(SEED_SAMPLES, SEED_SITES, DEFAULT_SETTINGS).matrix), 'n=', backtest(SEED_SAMPLES, SEED_SITES, DEFAULT_SETTINGS).n);
console.table(thresholdSweep(SEED_SAMPLES, SEED_SITES, DEFAULT_SETTINGS));
console.table(weightSensitivity(SEED_SAMPLES, SEED_SITES, DEFAULT_SETTINGS));
