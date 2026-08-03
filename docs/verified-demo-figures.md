# Verified figures from the prototype

Computed directly from the seed dataset and the risk engine on **3 August 2026**, after the
screening-evidence model change. Default thresholds 30 / 50 / 70. Anything quoted on the poster or
in the deck must match this file. Recompute if the seed data or the default weights change.

> **Model change, 3 August 2026.** `screeningSignal` (30) and `concentrationBand` (15) were merged
> into a single **`screeningEvidence` (35)**. They were the same measurement counted twice — the
> operator reads a fluorescence response and bins it, and in the seed data the band literally
> generates the signal — which put 45 of 100 points behind one reading. The engine now scores the
> **stronger of the two, never both**. Two consequences worth saying out loud:
> - **The weights now total exactly 100**, so the score cap is no longer load-bearing.
> - **A single screening reading can no longer escalate a sample on its own.** The strongest
>   possible read at a site with no risk factors scores 35 and the lab-referral threshold is 50 —
>   site context has to agree. There is a unit test enforcing this.
>
> Thresholds were re-derived to preserve their proportions of the maximum achievable score
> (27%/50%/68% of 110 → 30/50/70 of 100), not retuned to flatter the demo.

---

## The dataset

| | |
|---|---|
| Projects / sites / samples | 3 / 11 / **23** |
| Samples with a field screening result | **21** |
| Samples with confirmatory laboratory results | **3** |
| Escalated at the operating threshold (50) | **5** of 21 screened = **23.8%** |
| Band distribution | Low 11 · Medium 7 · High 3 · Critical 2 |
| Highest-scoring samples | RM-FTG-001 **72** · RV-MC-001 **71** · RM-FTG-002 **69** |

**All of this data is synthetic.** It was authored to demonstrate the workflow. It is not measured,
and it is not a sample of anything real.

---

## Back-test against laboratory results

n = 3 confirmed samples.

| | Lab confirmed exceedance | Lab clean |
|---|---|---|
| **Escalated** | 1 (true positive) | 0 (false positive) |
| **Not escalated** | 0 (false negative) | 2 (true negative) |

The one confirmed exceedance is **RM-FTG-001**: scored **72**, escalated for lab confirmation, and
the laboratory returned **1,840 ng/L — 18× the 100 ng/L guideline**. That is a correct call and it
is fair to describe it as one. It is not a performance claim.

> ### 🔴 Do not put "100% sensitivity" on the poster.
> With n = 3 on synthetic data this number is meaningless, and quoting it invites the one question
> that would expose it. The defensible statement is: *"we have built the validation protocol and
> demonstrated it; with three confirmed samples on synthetic data it tells us nothing yet, and
> establishing a real sensitivity figure against paired LC-MS/MS results is the point of a pilot."*
> Show the **method**, report the **n**, refuse the **rate**.

---

## Threshold sweep — the strongest honest figure available

| Threshold | Escalated | Rate | Missed exceedances |
|---|---|---|---|
| 5 | 21 | 100% | 0 |
| 20 | 17 | 81.0% | 0 |
| 30 | 10 | 47.6% | 0 |
| 40 | 6 | 28.6% | 0 |
| **50 (operating)** | **5** | **23.8%** | **0** |
| 60 | 4 | 19.0% | 0 |
| 70 | 2 | 9.5% | 0 |
| 75+ | 0 | 0% | **1** |

**The story this supports:** the threshold can be raised from 5 to 70 — cutting laboratory
referrals from 21 samples to 2 — without missing a single confirmed exceedance. The operating
point sits inside that safe band, not at its edge. This is the trade-off a consultancy actually
has to make, and Aegis makes it explicit and adjustable rather than fixed and hidden.

**What it does not support:** any claim about accuracy. The curve describes the *structure* of the
scoring model. On real data the shape would differ and the safe band would almost certainly be
narrower.

---

## Weight sensitivity — corrected 4 August 2026

> ### 🔴 The previous version of this section was wrong, and the error was mine.
>
> It reported that **nine of ten weights change no decision under ±25%** and read that as evidence
> the model is over-parameterised. **That was an arithmetic artefact, not a finding.** A ±25%
> change to a weight of *w* moves any score by at most 0.25·*w*. The closest sample to the
> threshold sits **4 points** away (RM-RW-001, score 54). So every weight below 16 was
> *arithmetically incapable* of flipping anything — the result was fixed before the code ran.
>
> The old implementation also **failed to renormalise**: it scaled one weight and left the rest, so
> the achievable maximum drifted away from 100 and a flipped decision was ambiguous between "this
> factor matters" and "the whole scale moved". Both are fixed in `src/lib/validation.ts`.

The right statistic is the **breakdown point** — the smallest change to a weight that flips any
escalate/hold decision, with the other weights renormalised so the total stays at 100.

| Weight | Max points | Breakdown point |
|---|---|---|
| Screening evidence | 35 | **30%** |
| Firefighting foam / airfield | 10 | **95%** |
| Repeat positives, landfill, industrial, wastewater treatment, historical contamination, prior lab-confirmed nearby, receptor sensitivity, source type | 4–10 | **over 100%** |

**The defensible sentence:** *"No site factor other than airfield history changes a decision until
its weight moves by more than 95%. Screening evidence changes one at 30%."* That survives
cross-examination; the old version does not.

---

## ⚠️ The back-test contains no information about the threshold

The three lab-confirmed samples measured **34, 41 and 1,840 ng/L**, scoring 22, 22 and 72.
There is nothing between 41 and 1,840 ng/L.

Because of that gap, the confusion matrix is constant across a huge range of thresholds:

| Threshold | TP / FP / FN / TN |
|---|---|
| 1–22 | 1 / 2 / 0 / 0 |
| **23–72** | **1 / 0 / 0 / 2** |
| 73–100 | 0 / 0 / 1 / 2 |

**Every threshold from 23 to 72 gives an identical result.** The operating point of 50 is therefore
not supported by the back-test in any way — and claiming it "sits inside the safe band, not at its
edge" would be unsupportable if a judge checked.

**Say this instead:** *"No confirmed sample falls between 50 and 200 ng/L — the region triage
actually decides. Our back-test cannot locate the threshold, and the pilot is stratified to fill
that gap."* It converts the weakest part of the analysis into the clearest argument for the pilot.

---

## ⚠️ The circularity trap

The prototype escalates **23.8%** of screened samples. The cost model assumes **20%**.

These are close, and it is tempting to present that as the model corroborating the business case.
**Do not.** The seed data was hand-authored, the weights were chosen by us, and the threshold was
set by us. The agreement is an artefact of how the demo was written, not evidence about the world.
A judge who spots the circular reasoning will discount everything else on the poster.

If the closeness comes up, the correct answer is: *"that's the same assumption appearing twice, not
a confirmation — the demo data is synthetic and we wrote it."*
