// Cost and pricing assumptions for the business case, defined once so the
// working prototype and the pitch cannot drift apart.
//
// HEALTH WARNING, and it belongs at the top of this file rather than buried in a
// caption: no UK laboratory publishes a PFAS rate card — seven providers were
// checked and all quote only. Every figure derived from the per-sample cost is
// modelled, not measured, and must be presented that way.
//
// What we DO have is a published UK benchmark. The Environmental Industries
// Association told the Commons Environmental Audit Committee in May 2025
// (written evidence PFAS0121, lead author Prof. Paul Nathanail, author of CIRIA
// C819) that PFAS soil analysis costs roughly £350 per sample. We model at £250
// — 29% below it — because water analysis is generally cheaper than soil and
// because understating the saving is the defensible direction to err in.

/** Only published UK per-sample PFAS analysis figure. EIA → EAC, May 2025, evidence PFAS0121. */
export const UK_PUBLISHED_LAB_COST_GBP = 350;

/** The rate we model at. Deliberately below the published UK benchmark. */
export const INDICATIVE_LAB_COST_GBP = 250;

/** How far below the published UK figure we model, as a fraction. */
export const LAB_COST_CONSERVATISM =
  (UK_PUBLISHED_LAB_COST_GBP - INDICATIVE_LAB_COST_GBP) / UK_PUBLISHED_LAB_COST_GBP;

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
