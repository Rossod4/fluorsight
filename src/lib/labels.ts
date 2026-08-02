// Shared display labels and styling tokens so every page renders domain
// values consistently.

import type { RiskBand, RiskWeights, SampleStatus, Sensitivity, SourceType } from '../types';

export const STATUS_LABELS: Record<SampleStatus, string> = {
  new: 'New',
  screened: 'Screened',
  flagged: 'Flagged',
  sent_to_lab: 'Sent to lab',
  lab_received: 'Lab results received',
  closed: 'Closed',
};

export const STATUS_ORDER: SampleStatus[] = [
  'new',
  'screened',
  'flagged',
  'sent_to_lab',
  'lab_received',
  'closed',
];

export const STATUS_BADGE_CLASSES: Record<SampleStatus, string> = {
  new: 'bg-slate-100 text-slate-700 ring-slate-300',
  screened: 'bg-sky-50 text-sky-800 ring-sky-300',
  flagged: 'bg-amber-50 text-amber-800 ring-amber-300',
  sent_to_lab: 'bg-violet-50 text-violet-800 ring-violet-300',
  lab_received: 'bg-teal-50 text-teal-800 ring-teal-300',
  closed: 'bg-slate-100 text-slate-500 ring-slate-200',
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  treated_drinking_water: 'Treated drinking water',
  private_supply: 'Private drinking-water supply',
  groundwater: 'Groundwater',
  surface_water: 'Surface water',
  wastewater_effluent: 'Wastewater effluent',
  leachate: 'Leachate',
};

export const SENSITIVITY_LABELS: Record<Sensitivity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const RISK_BADGE_CLASSES: Record<RiskBand, string> = {
  Low: 'bg-emerald-50 text-emerald-800 ring-emerald-300',
  Medium: 'bg-amber-50 text-amber-800 ring-amber-300',
  High: 'bg-orange-50 text-orange-800 ring-orange-300',
  Critical: 'bg-red-50 text-red-800 ring-red-300',
};

/** Solid colours for map markers and charts. */
export const RISK_COLORS: Record<RiskBand, string> = {
  Low: '#059669',
  Medium: '#d97706',
  High: '#ea580c',
  Critical: '#dc2626',
};

export const RISK_FACTOR_LABELS: Record<string, string> = {
  fireTrainingOrAirport: 'Firefighting foam / airfield',
  landfill: 'Landfill proximity',
  industrial: 'Industrial activity',
  wastewaterTreatment: 'Wastewater treatment proximity',
  historicalContamination: 'Historical contamination',
  priorLabConfirmedNearby: 'Prior lab-confirmed PFAS nearby',
};

/** Short label for each scoring weight. Mirrors the driver labels in riskEngine. */
export const WEIGHT_LABELS: Record<keyof RiskWeights, string> = {
  screeningSignal: 'Screening signal strength',
  concentrationBand: 'Estimated concentration band',
  repeatPositives: 'Repeat positive screens',
  fireTrainingOrAirport: 'Firefighting foam / airfield',
  landfill: 'Landfill proximity',
  industrial: 'Industrial activity',
  wastewaterTreatment: 'Wastewater treatment proximity',
  historicalContamination: 'Historical contamination',
  priorLabConfirmedNearby: 'Prior lab-confirmed PFAS nearby',
  sensitivity: 'Receptor sensitivity',
  sourceType: 'Water source exposure pathway',
};

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
