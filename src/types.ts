// Core domain model for Aegis.
// All concentration language refers to the sum-of-PFAS estimate in ng/L,
// anchored to the UK DWI / EU DWD guideline of 0.1 µg/L (= 100 ng/L).

export type RiskBand = 'Low' | 'Medium' | 'High' | 'Critical';

export type SampleStatus =
  | 'new'
  | 'screened'
  | 'flagged'
  | 'sent_to_lab'
  | 'lab_received'
  | 'closed';

export type RecommendedActionId =
  | 'screen' // no screening data yet
  | 'no_action'
  | 'monitor'
  | 'lab_confirm'
  | 'urgent';

export type Confidence = 'low' | 'medium' | 'high';

/**
 * Estimated sum-of-PFAS concentration band derived from the screening signal.
 *  nd        < 10 ng/L   below screening quantitation
 *  trace     10–50 ng/L
 *  elevated  50–100 ng/L approaching the 0.1 µg/L guideline
 *  high      100–500 ng/L exceeds UK DWI / EU DWD sum-of-PFAS guideline
 *  very_high > 500 ng/L  exceeds EU DWD "PFAS Total" parametric value
 */
export type ConcentrationBand = 'nd' | 'trace' | 'elevated' | 'high' | 'very_high';

export type SourceType =
  | 'treated_drinking_water'
  | 'private_supply'
  | 'groundwater'
  | 'surface_water'
  | 'wastewater_effluent'
  | 'leachate';

export type Sensitivity = 'low' | 'medium' | 'high';

export interface SiteRiskFactors {
  fireTrainingOrAirport: boolean; // AFFF firefighting foam use — dominant UK point source
  landfill: boolean;
  industrial: boolean;
  wastewaterTreatment: boolean;
  historicalContamination: boolean;
  priorLabConfirmedNearby: boolean;
}

export interface Project {
  id: string;
  name: string;
  client?: string;
  description?: string;
  createdAt: string;
}

export interface Site {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  sourceType: SourceType;
  sensitivity: Sensitivity;
  riskFactors: SiteRiskFactors;
  createdAt: string;
}

export interface ScreeningResult {
  id: string;
  takenAt: string;
  /** Relative fluorescence response, 0–100 (% of calibration maximum). */
  signal: number;
  estimatedBand: ConcentrationBand;
  confidence: Confidence;
  operator?: string;
  notes?: string;
}

export interface LabResult {
  receivedAt: string;
  sumPfasNgL: number;
  method: string; // e.g. "LC-MS/MS (EPA 537.1)"
  laboratory?: string;
  notes?: string;
}

export interface StatusEvent {
  status: SampleStatus;
  at: string;
  note?: string;
}

export interface Sample {
  id: string;
  siteId: string;
  code: string;
  collectedAt: string;
  status: SampleStatus;
  history: StatusEvent[];
  screenings: ScreeningResult[];
  labResult?: LabResult;
  notes?: string;
}

// ---- Risk model configuration (user-editable in Settings) ----

export interface RiskWeights {
  /**
   * One screening reading, scored once. The fluorescence signal and the
   * estimated concentration band are the same measurement expressed two ways —
   * the operator reads a response and bins it — so they share a single weight
   * rather than contributing separately.
   */
  screeningEvidence: number;
  repeatPositives: number;
  fireTrainingOrAirport: number;
  landfill: number;
  industrial: number;
  wastewaterTreatment: number;
  historicalContamination: number;
  priorLabConfirmedNearby: number;
  sensitivity: number;
  sourceType: number;
}

export interface RiskThresholds {
  /** score >= medium -> Medium band */
  medium: number;
  /** score >= high -> High band */
  high: number;
  /** score >= critical -> Critical band */
  critical: number;
}

export interface Settings {
  weights: RiskWeights;
  thresholds: RiskThresholds;
}

// ---- Risk engine output ----

export interface RiskDriver {
  key: string;
  label: string;
  /** Points contributed to the 0–100 score. */
  points: number;
  /** Maximum points this driver could contribute under current weights. */
  max: number;
  detail: string;
}

export interface RiskAssessment {
  score: number;
  band: RiskBand;
  action: RecommendedActionId;
  actionLabel: string;
  drivers: RiskDriver[];
  summary: string;
  /** Present when screening uncertainty changed or qualified the recommendation. */
  uncertaintyNote?: string;
}

export interface AppState {
  projects: Project[];
  sites: Site[];
  samples: Sample[];
  settings: Settings;
}
