# Verified figures from the prototype

Computed directly from the seed dataset and the risk engine on **2 August 2026**, at the default
settings (escalation threshold 55). Anything quoted on the poster or in the deck must match this
file. Recompute if the seed data or the default weights change.

---

## The dataset

| | |
|---|---|
| Projects / sites / samples | 3 / 11 / **23** |
| Samples with a field screening result | **21** |
| Samples with confirmatory laboratory results | **3** |
| Escalated at the operating threshold (55) | **5** of 21 screened = **23.8%** |

**All of this data is synthetic.** It was authored to demonstrate the workflow. It is not measured,
and it is not a sample of anything real.

---

## Back-test against laboratory results

n = 3 confirmed samples.

| | Lab confirmed exceedance | Lab clean |
|---|---|---|
| **Escalated** | 1 (true positive) | 0 (false positive) |
| **Not escalated** | 0 (false negative) | 2 (true negative) |

Sensitivity 100%, specificity 100%, precision 100%.

> ### 🔴 Do not put "100% sensitivity" on the poster.
> With n = 3 on synthetic data this number is meaningless, and quoting it invites a judge to ask
> the one question that would expose it. The defensible statement is: *"we have built the
> validation protocol and demonstrated it; with three confirmed samples on synthetic data it tells
> us nothing yet, and establishing a real sensitivity figure against paired LC-MS/MS results is the
> point of a pilot."* Show the **method**, report the **n**, refuse the **rate**.

---

## Threshold sweep — the strongest honest figure available

Escalation rate and missed exceedances as the escalation threshold moves.

| Threshold | Escalated | Rate | Missed exceedances |
|---|---|---|---|
| 5 | 21 | 100% | 0 |
| 20 | 16 | 76.2% | 0 |
| 30 | 10 | 47.6% | 0 |
| 40 | 7 | 33.3% | 0 |
| 50 | 5 | 23.8% | 0 |
| **55 (operating)** | **5** | **23.8%** | **0** |
| 70 | 3 | 14.3% | 0 |
| 75 | 1 | 4.8% | 0 |
| 80+ | 0 | 0% | **1** |

**The story this supports:** the threshold can be raised from 5 to 75 — cutting laboratory
referrals from 21 to 1 — without missing a single confirmed exceedance. The operating point sits
in the middle of that safe band, not at its edge. This is the trade-off a consultancy actually has
to make, and Aegis makes it explicit and adjustable rather than fixed and hidden.

**What it does not support:** any claim about accuracy. The curve describes the *structure* of the
scoring model. On real data the shape would differ, and the safe band would almost certainly be
narrower.

---

## Weight sensitivity (±25%, one at a time)

| Weight | Decisions changed |
|---|---|
| Screening signal strength | 1 |
| Estimated concentration band | 1 |
| Repeat positive screens | 1 |
| Firefighting foam / airfield | 1 |
| Receptor sensitivity | 1 |
| Landfill, industrial, wastewater, historical contamination, prior lab-confirmed nearby, source type | **0** |

**Six of the eleven weights change no decision at all on this dataset.**

Do not hide this — it is a genuinely sophisticated point and a data-literate judge will respect it
far more than a claim of precision. The honest reading is that **the model is over-parameterised
for the evidence available**, and this analysis is exactly how you would identify which weights
earn their place. It also tells you where calibration effort should go first: the five that move
decisions, led by screening signal strength.

---

## ⚠️ The circularity trap

The prototype escalates **23.8%** of screened samples. The cost model assumes **20%**.

These are close, and it is tempting to present that as the model corroborating the business case.
**Do not.** The seed data was hand-authored, so the agreement is an artefact of how the demo was
written, not evidence about the world. A judge who spots the circular reasoning will discount
everything else on the poster.

If the closeness comes up, the correct answer is: *"that's the same assumption appearing twice, not
a confirmation — the demo data is synthetic and we wrote it."*
