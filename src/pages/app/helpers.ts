// Small shared helpers for the app-side pages. Kept dependency-free and pure
// so they can be unit-tested in isolation from the store/UI if needed.

import type { RiskBand } from '../../types';

export const BAND_RANK: Record<RiskBand, number> = { Low: 0, Medium: 1, High: 2, Critical: 3 };

/** Returns the most severe band in a list, or undefined for an empty list. */
export function worstBand(bands: RiskBand[]): RiskBand | undefined {
  if (bands.length === 0) return undefined;
  return bands.reduce((worst, b) => (BAND_RANK[b] > BAND_RANK[worst] ? b : worst));
}

/** URL/filename-safe slug from a free-text name. */
export function slugify(s: string): string {
  const slug = s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
  return slug || 'export';
}

/**
 * Suggest the next sample code by incrementing the trailing number of the
 * alphabetically-last existing code (e.g. "KV-LM-002" -> "KV-LM-003").
 * Returns an empty string when no pattern can be inferred.
 */
export function suggestNextCode(existingCodes: string[]): string {
  if (existingCodes.length === 0) return '';
  const sorted = [...existingCodes].sort();
  const last = sorted[sorted.length - 1];
  const m = last.match(/^(.*?)(\d+)$/);
  if (!m) return '';
  const [, prefix, digits] = m;
  const next = (Number(digits) + 1).toString().padStart(digits.length, '0');
  return `${prefix}${next}`;
}

export function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
