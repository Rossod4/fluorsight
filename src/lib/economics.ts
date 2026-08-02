// Cost assumptions for the business case, defined once so the working prototype
// and the pitch cannot drift apart.
//
// HEALTH WARNING, and it belongs at the top of this file rather than buried in a
// caption: the per-sample laboratory cost below is an ASSUMPTION, not a quote.
// UK PFAS rate cards are quote-only and we have not yet obtained a real one.
// Every figure derived from it inherits that uncertainty, and the derived values
// must always be presented as modelled rather than measured.

/** Indicative cost of one confirmatory LC-MS/MS PFAS analysis. Assumption, not a quote. */
export const INDICATIVE_LAB_COST_GBP = 250;

/** Size of the illustrative annual portfolio the business case is modelled on. */
export const MODELLED_PORTFOLIO_SAMPLES = 500;

/**
 * Share of screened samples Aegis escalates to the laboratory. Conservative
 * relative to the DWI finding that only 4.3% of monitored treatment works
 * reached Tier 2+ monitoring.
 */
export const MODELLED_ESCALATION_RATE = 0.2;

/** Assumed annual cost of the Aegis platform and screening consumables. */
export const MODELLED_PLATFORM_COST_GBP = 25_000;

/** Cost of sending every sample in the portfolio for lab analysis. */
export const ALL_LAB_COST_GBP = MODELLED_PORTFOLIO_SAMPLES * INDICATIVE_LAB_COST_GBP;

/** Samples escalated to the lab under triage. */
export const ESCALATED_SAMPLES = Math.round(MODELLED_PORTFOLIO_SAMPLES * MODELLED_ESCALATION_RATE);

/** Lab spend under triage, before the platform cost. */
export const TRIAGED_LAB_COST_GBP = ESCALATED_SAMPLES * INDICATIVE_LAB_COST_GBP;

/** Total cost under triage, including the platform. */
export const TRIAGED_TOTAL_COST_GBP = TRIAGED_LAB_COST_GBP + MODELLED_PLATFORM_COST_GBP;

/** Net annual saving on the modelled portfolio, after paying for the platform. */
export const MODELLED_ANNUAL_SAVING_GBP = ALL_LAB_COST_GBP - TRIAGED_TOTAL_COST_GBP;

/** Net saving as a share of the all-lab cost. */
export const MODELLED_COST_REDUCTION = MODELLED_ANNUAL_SAVING_GBP / ALL_LAB_COST_GBP;

/** Analyses not run under triage. */
export const LAB_SAMPLES_AVOIDED = MODELLED_PORTFOLIO_SAMPLES - ESCALATED_SAMPLES;

export const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;
