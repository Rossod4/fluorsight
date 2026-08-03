// Cost and pricing assumptions for the business case, defined once so the
// working prototype and the pitch cannot drift apart.
//
// HEALTH WARNING, and it belongs at the top of this file rather than buried in a
// caption: no UK laboratory publishes a PFAS rate card — seven providers were
// checked and all quote only. Every figure derived from the per-sample cost is
// modelled, not measured, and must be presented that way.
//
// The nearest published UK benchmark is £350/sample, from the Environmental
// Industries Association's written evidence to the Commons Environmental Audit
// Committee (May 2025, PFAS0121, lead author Prof. Paul Nathanail, author of
// CIRIA C819).
//
// IMPORTANT SCOPE LIMIT: that £350 is a rough figure for PFAS analysis of SOIL,
// and the evidence explicitly excludes water. Aegis's workflow is water. So
// £350 is NOT a benchmark our £250 can be called conservative against — we do
// not know whether water analysis costs more or less. An earlier version of
// this file claimed £250 was "29% below the published UK figure"; that was a
// scope error and has been removed. £250 is a modelling assumption whose
// direction of error is unknown, and must be presented that way.

/**
 * Nearest published UK per-sample PFAS figure — but for SOIL, not water.
 * EIA → EAC, May 2025, evidence PFAS0121. Quote for scale only; do not use it
 * to characterise the water-matrix assumption below as conservative.
 */
export const UK_PUBLISHED_SOIL_LAB_COST_GBP = 350;

/**
 * The rate we model at, for water. An assumption. No UK laboratory publishes a
 * PFAS rate card — seven providers were approached and all quote on request.
 */
export const INDICATIVE_LAB_COST_GBP = 250;

/** Size of the illustrative annual portfolio the business case is modelled on. */
export const MODELLED_PORTFOLIO_SAMPLES = 500;

/**
 * Share of screened samples Aegis escalates to the laboratory.
 *
 * This is an assumption and it is the model's weakest joint, so it is presented
 * as a range rather than a point estimate. Note deliberately NOT justified by
 * the DWI's "4.3% of treatment works reached Tier 2+" statistic — that concerns
 * public water supply monitoring, not contaminated-land sample triage, and
 * using it here would be a category error.
 */
export const MODELLED_ESCALATION_RATE = 0.2;
export const ESCALATION_RATE_RANGE = [0.1, 0.2, 0.4] as const;

// ---------------------------------------------------------------------------
// What the customer pays us.
//
// Split deliberately into a software subscription and a per-sample consumable,
// because those are different things with different margins — and because a
// single blended "platform cost" made the savings model and the revenue model
// contradict each other. Priced by programme scale rather than by customer
// type, so there is no need to explain why a council would pay more than a
// consultancy for identical software.
// ---------------------------------------------------------------------------

/** Annual software subscription, standard single-programme tier. */
export const SUBSCRIPTION_STANDARD_GBP = 5_000;

/** Annual software subscription, large multi-site programme tier. */
export const SUBSCRIPTION_PROGRAMME_GBP = 15_000;

/**
 * Screening consumables per sample — dye, adsorbent cartridge, calibration.
 * Assumed passed through at cost initially; consumable margin is a second
 * revenue line once volume justifies our own supply, not something we count on.
 * Benchmark: Cyclopure's DEXSORB-based Water Test Kit Pro retails at $85.
 */
export const CONSUMABLE_COST_PER_SAMPLE_GBP = 40;

/** Annual consumables spend across the modelled portfolio. */
export const CONSUMABLES_ANNUAL_GBP =
  MODELLED_PORTFOLIO_SAMPLES * CONSUMABLE_COST_PER_SAMPLE_GBP;

/** Total annual Aegis cost to the customer: subscription plus consumables. */
export const AEGIS_ANNUAL_COST_GBP = SUBSCRIPTION_STANDARD_GBP + CONSUMABLES_ANNUAL_GBP;

// ---------------------------------------------------------------------------
// Derived cost model.
// ---------------------------------------------------------------------------

/** Cost of sending every sample in the portfolio for lab analysis. */
export const ALL_LAB_COST_GBP = MODELLED_PORTFOLIO_SAMPLES * INDICATIVE_LAB_COST_GBP;

/** Samples escalated to the lab under triage. */
export const ESCALATED_SAMPLES = Math.round(MODELLED_PORTFOLIO_SAMPLES * MODELLED_ESCALATION_RATE);

/** Lab spend under triage, before Aegis costs. */
export const TRIAGED_LAB_COST_GBP = ESCALATED_SAMPLES * INDICATIVE_LAB_COST_GBP;

/** Total cost under triage, including subscription and consumables. */
export const TRIAGED_TOTAL_COST_GBP = TRIAGED_LAB_COST_GBP + AEGIS_ANNUAL_COST_GBP;

/** Net annual saving on the modelled portfolio, after paying for Aegis. */
export const MODELLED_ANNUAL_SAVING_GBP = ALL_LAB_COST_GBP - TRIAGED_TOTAL_COST_GBP;

/** Net saving as a share of the all-lab cost. */
export const MODELLED_COST_REDUCTION = MODELLED_ANNUAL_SAVING_GBP / ALL_LAB_COST_GBP;

/** Analyses not run under triage. */
export const LAB_SAMPLES_AVOIDED = MODELLED_PORTFOLIO_SAMPLES - ESCALATED_SAMPLES;

/**
 * Net saving at a given escalation rate — used to show the model's sensitivity
 * to its weakest assumption rather than hiding behind a single figure.
 */
export function savingAtEscalationRate(rate: number): number {
  const escalated = Math.round(MODELLED_PORTFOLIO_SAMPLES * rate);
  return ALL_LAB_COST_GBP - (escalated * INDICATIVE_LAB_COST_GBP + AEGIS_ANNUAL_COST_GBP);
}

export const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;
