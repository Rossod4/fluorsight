// CSV export + screening-batch import.
// No external dependency: files are small and the format is under our control.

import type { ConcentrationBand, Confidence } from '../types';

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

function escapeCell(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const head = columns.map((c) => escapeCell(c.header)).join(',');
  const body = rows.map((r) => columns.map((c) => escapeCell(c.value(r))).join(','));
  return [head, ...body].join('\r\n');
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ---- Screening batch import ----
// Expected columns (header row required, order-independent):
//   site_name, sample_code, collected_at, signal, estimated_band, confidence, operator, notes
// estimated_band: nd | trace | elevated | high | very_high
// confidence:     low | medium | high

export interface ScreeningImportRow {
  siteName: string;
  sampleCode: string;
  collectedAt: string;
  signal: number;
  estimatedBand: ConcentrationBand;
  confidence: Confidence;
  operator?: string;
  notes?: string;
}

export interface ScreeningImportResult {
  rows: ScreeningImportRow[];
  errors: string[];
}

const BANDS: ConcentrationBand[] = ['nd', 'trace', 'elevated', 'high', 'very_high'];
const CONFIDENCES: Confidence[] = ['low', 'medium', 'high'];

/** Minimal RFC-4180-ish parser: handles quoted cells, escaped quotes, CRLF. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell);
      cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else {
      cell += ch;
    }
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

export function parseScreeningCsv(text: string): ScreeningImportResult {
  const errors: string[] = [];
  const table = parseCsv(text);
  if (table.length < 2) {
    return { rows: [], errors: ['File is empty or has no data rows.'] };
  }
  const header = table[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const required = ['site_name', 'sample_code', 'collected_at', 'signal', 'estimated_band', 'confidence'];
  const missing = required.filter((r) => col(r) === -1);
  if (missing.length > 0) {
    return { rows: [], errors: [`Missing required column(s): ${missing.join(', ')}.`] };
  }

  const rows: ScreeningImportRow[] = [];
  table.slice(1).forEach((cells, idx) => {
    const line = idx + 2;
    const get = (name: string) => (cells[col(name)] ?? '').trim();
    const signal = Number(get('signal'));
    const band = get('estimated_band').toLowerCase() as ConcentrationBand;
    const confidence = get('confidence').toLowerCase() as Confidence;
    const rowErrors: string[] = [];
    if (!get('site_name')) rowErrors.push('site_name is empty');
    if (!get('sample_code')) rowErrors.push('sample_code is empty');
    if (!Number.isFinite(signal) || signal < 0 || signal > 100)
      rowErrors.push(`signal "${get('signal')}" must be a number 0–100`);
    if (!BANDS.includes(band)) rowErrors.push(`estimated_band "${get('estimated_band')}" invalid`);
    if (!CONFIDENCES.includes(confidence)) rowErrors.push(`confidence "${get('confidence')}" invalid`);
    if (rowErrors.length > 0) {
      errors.push(`Line ${line}: ${rowErrors.join('; ')}.`);
      return;
    }
    rows.push({
      siteName: get('site_name'),
      sampleCode: get('sample_code'),
      collectedAt: get('collected_at') || new Date().toISOString(),
      signal,
      estimatedBand: band,
      confidence,
      operator: get('operator') || undefined,
      notes: get('notes') || undefined,
    });
  });
  return { rows, errors };
}
