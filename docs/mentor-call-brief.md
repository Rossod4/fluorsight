# Mentor call #1 — brief

**Wednesday 5 August 2026 · Aegis Innovation Competition · Team Fluorsight (PFAS screening triage)**

> ## ⚠️ REWRITTEN 4 August 2026 — the mentor is a statistician
>
> This brief was originally written assuming a subject specialist and led with chemistry. **The
> mentor is a statistics lecturer in the School of Maths.** Chemistry questions are largely wasted
> on them, and asking a statistician to adjudicate cyclodextrin binding will produce a polite
> non-answer and a mentor who feels they weren't much use — which matters, because their feedback
> is worth a large share of 20 marks.
>
> **This is better news than it looks.** The chemistry belongs to Dom. What Fluorsight actually
> *contributes* is a decision model — and every serious open question about it is a statistics
> question:
>
> - The **ten** scoring weights are **asserted, not calibrated**. Nobody has fitted them to anything.
> - Only **two** weights can change a decision at all on this dataset: screening evidence has to
>   move about **30%**, and the airfield factor about **95%**. Every other weight would have to
>   move more than **100%** before any sample crossed the threshold.
> - The escalation threshold is a **cost-sensitive classification problem with asymmetric errors**
>   (a missed exceedance is far worse than a wasted test) and it was set to a round number.
> - The back-test runs at **n = 3, on synthetic data we wrote ourselves**.
> - Dom's proposed next step is a **4-probe array classified by linear discriminant analysis** —
>   textbook multivariate statistics.
>
> Go in on that ground. A mentor who spends the call doing something only they can do writes
> markedly better feedback than one who was shown a demo and asked to approve it.
>
> **One gap to note and solve elsewhere:** the panel will include at least one academic who can
> attack the chemistry, and this mentor cannot rehearse you against that. Dom should find a
> separate chemistry sense-check — a lecturer, a demonstrator, one of his outstanding contacts.

---

## Why this call matters more than it looks

Effective teamwork is **20 of the 100 available marks**, and the criteria say it is assessed
on "feedback from mentors" plus your answer to a team-working question during the oral.
That makes your mentor a scorer, not just an advisor — and they have known you for two weeks
against a summer of work they did not see.

The goal of this call is therefore **not** to impress them with a demo. It is to convert them
from an assigned contact into someone with a stake in the outcome, who can speak
specifically about how this team works.

A mentor who has given you advice that visibly changed the product writes far stronger
feedback than one who was shown a finished thing and asked to approve it.

---

## Send 24 hours ahead (Tuesday, after your team meeting)

Short email, three things only:

1. **One paragraph** on what Fluorsight is — PFAS screening triage, not a lab replacement.
2. **The live link** to the prototype, pointing at the guided demo (`/#/demo`) so they can
   form a view before the call rather than watching you drive.
3. **Three questions you want their help on** (below), stated up front. This is the single
   highest-value line in the email: it tells them the call has a purpose and lets them
   arrive with answers.

Keep it under 200 words. Do not attach a deck.

---

## Agenda (aim for 30–40 minutes)

| Time | What | Why |
|---|---|---|
| 0–3 min | Introductions — one line each on discipline and what you own | Establishes that this is three people with distinct roles, not a blob |
| 3–8 min | The problem and who the customer is. **Not** the product yet | Judges score "scope and impact" first; check your framing survives an expert |
| 8–15 min | Live prototype — one pass through the demo path | Show, don't narrate |
| 15–30 min | **The three questions.** This is the real call | Where they add value and become invested |
| 30–35 min | Agree what happens next and when you meet again | Locks in the relationship |

Whoever is not talking takes notes. Circulate them the same evening.

---

## The questions to actually ask — statistics version

**Use these five.** The four below them were written for a subject specialist and are kept only for
reference; the chemistry ones should go to Dom's own contacts instead.

Send two or three of these in advance. A statistician will enjoy them, and will arrive having
thought about them — which is exactly the outcome you want.

**S1. "Our weights are asserted. How would you calibrate them with almost no labelled data?"**
> The risk engine scores each sample from eleven weighted factors. We chose the weights ourselves
> from domain reasoning — nothing is fitted. We have three lab-confirmed samples, and they're
> synthetic. Is there a defensible way to set weights in that situation — expert elicitation, an
> ordinal or rank-based model, something Bayesian with an informative prior — or is the honest
> answer that you cannot, and we should say so and show the sensitivity instead?

The single most valuable question on the list. It targets the exact criticism a data-literate judge
will make, and it is squarely their expertise.

**S2. "Nine of our ten weights change no decision at all. What does that actually tell us?"**
> We ran a one-at-a-time ±25% perturbation across the whole portfolio. Only the screening-evidence
> weight flips any escalate/don't-escalate decision; the other nine flip none. Is that
> over-parameterisation, or just an artefact of a 23-sample dataset where most points sit far from
> the threshold? And is one-at-a-time the right sensitivity analysis, or should we be doing
> something joint?

Shows you did the analysis and are reading it sceptically. The one-at-a-time-versus-joint point is
a real methodological weakness they will likely raise unprompted — better that you ask first.

**S3. "How should we choose the escalation threshold?"**
> Escalation is a binary decision with asymmetric costs: a false negative is a missed contamination,
> a false positive is a wasted £250 test. Our threshold is currently a round number. Is there a
> principled way to set it — an explicit cost ratio, a Neyman–Pearson style constraint on the
> false-negative rate — and how would you present that trade-off to a customer who is not
> statistical?

Turns the weakest part of the model into the most rigorous part. If they give you a method, that
goes straight onto the poster as a next step.

**S4. "What sample size do we actually need before any accuracy claim is meaningful?"**
> Our validation plan is to back-test against paired LC-MS/MS results. At maybe 10–20% prevalence,
> how many samples do we need for a sensitivity estimate with a confidence interval narrow enough
> to be worth quoting? And is there anything smarter than simple random sampling — enrichment,
> stratification by site type — given every confirmatory analysis costs real money?

Directly strengthens the "next steps" panel, which is worth disproportionate marks and is currently
underspecified about power and cost.

**S5. "Is linear discriminant analysis on a four-probe array realistic for us?"**
> The published route to distinguishing PFAS types uses four fluorescent probes and LDA on the
> response pattern rather than one probe read once. We want to propose that as our improvement
> path. How much training data does LDA realistically need for four predictors and a handful of
> classes, and what would you watch out for — collinearity between probes, overfitting, class
> imbalance?

Dom raised this and it is genuinely their subject. It also lets the mentor contribute to the
*chemistry* roadmap through the statistics door, which is a good feeling to give them.

**If there is time, the one non-statistical question that matters most:**
> When a consultancy runs a site investigation, is the lab spend inside a fixed fee they bid, or
> passed through to the client with a margin? If it's passed through, we're asking them to shrink
> their own invoice.

Not their field, but they may simply know, and it decides who our customer is. See `qa-bank.md` B4.

---

## ⚠️ Also worth raising, because it is a genuine methodological trap

Tell them this before they find it: **our demo portfolio escalates 23.8% and our cost model assumes
20%.** Those look like mutual confirmation and they are not — we wrote the seed data, chose the
weights and set the threshold, so it is the same assumption appearing twice. Ask them how to
present the demo without implying it validates anything.

Volunteering a circularity problem to a statistician is the fastest way to establish that you are
serious. It is also exactly the kind of thing they will write approvingly about afterwards.

---

## The four original questions — kept for reference only

Chosen because they target the weakest points of the entry, and because a mentor is
genuinely better placed to answer them than you are.

**1. "Is the customer right?"**
> We've aimed this at environmental consultancies first, with local authorities under
> Part 2A as a second wave, and deliberately excluded water companies because screening
> isn't regulatory-grade. Does that match how the sector actually buys?

Tests the entire market thesis in one question. If they disagree, you want to know in
August, not September.

**2. "What concentration range should we honestly be claiming?"**
> Working the preconcentration maths forwards: 250 mL through the cartridge eluted into about
> a millilitre is roughly 250×, maybe 2,000× if we design around a litre. That turns the
> 0.1 µg/L guideline into 25–200 µg/L at the detector. Given a weak host–guest binding
> constant, we're not confident a single-dye readout resolves that. Should we stop positioning
> this as a guideline-level screen and position it as an **AFFF source-zone screen at
> 10 µg/L to mg/L** instead?

**⚠️ This is now the most important question on the call — Dom decides the answer and the whole
poster follows from it.** It is a genuine repositioning, and the argument for saying yes is that
it is the only claim the thermodynamics supports, it is *stronger* rather than weaker (it explains
why firefighting foam / airfield is the heaviest weight in our risk model), and conceding a
narrower true claim beats defending a broad one that a chemist can dismantle.

**Before this call, Dom must read the correction in `chemistry-brief-for-dom.md` §4.** We had been
citing Cyclopure's "500,000× preconcentration". That figure is from their water *treatment* line
and describes waste-volume reduction during remediation — it is not an analytical preconcentration
factor, and the real number is ~250×. Do not say 500,000× to a chemist.

Also still worth asking, if time allows: the dye/host pairing has no published precedent for PFAS,
and a paper published 17 July 2026 indicates 1,8-ANS is a poor match for the β-cyclodextrin in
DEXSORB+. Is moving to 2,6-ANS or a γ-CD host the right response?

**3. "What would make this credible to someone who does this for a living?"**
> Everything in our cost model is currently modelled, not measured — we've assumed £250 per
> sample for LC-MS/MS and a 20% escalation rate. We're emailing labs and consultancies for
> real figures. Is there anyone you'd point us at, and what one piece of evidence would
> change your mind about this?

Asks for an introduction without demanding one. Mentors often know exactly the right person,
and a warm introduction converts vastly better than a cold email.

**4. "Who actually pays for the lab analysis?"**
> When a consultancy runs a site investigation, is the lab spend usually inside a fixed fee they
> bid, or passed through to the client with a margin? We need to know because if it's passed
> through with a margin, we're asking a consultancy to pay us to shrink their own invoice.

**Ask this one even if you run out of time for the others.** It is the single sharpest commercial
objection to the whole business — a judge from the sector will raise it, it is not answered
anywhere in our research, and no amount of desk work will settle it. A practitioner can answer it
in one sentence. Depending on the answer, our customer may not be the consultancy at all but the
developer or council paying the bill. See `qa-bank.md` question B4 for the current holding answer.

---

## What to ask them directly, before you hang up

- **"What would you want to see from us by the Celebration Day?"** — tells you their
  standard, in their words. Write it down verbatim and build toward it.
- **"Can we send you the poster draft in early September for comment?"** — gives them a
  second, concrete touchpoint and makes their feedback part of the process rather than a
  verdict on it.
- **"How would you prefer we keep you updated — a short email every fortnight?"** — let
  them choose the cadence. Then actually keep to it.

---

## Cadence to propose

Three more contacts before the Celebration Day, which is enough to be substantive without
burning goodwill:

- **Mid-August** — short written update: what changed after this call
- **Early September** — poster draft for comment (before the 11 Sept deadline)
- **Mid-September** — presentation run-through, if they'll sit for 10 minutes

---

## Things to say, and things not to say

**Say:**
- That you have met weekly since the start of June. Most teams cannot claim this and it is
  direct evidence for the teamwork criterion.
- What each of you owns: chemistry and method, engineering and product, modelling and
  business case.
- Where you changed your mind and why. Design evolution is explicitly assessed — a mentor
  who has heard you describe a reversal can vouch for your process.

**Don't:**
- Apologise for the timing of this first call. You waited deliberately so you had something
  substantial to react to — that is a defensible choice, so state it as one if it comes up.
- Oversell. The honesty about the chemistry limitation is a genuine asset with expert
  audiences; do not talk yourself out of it.
- Ask them to do work for you. Ask for judgement, contacts, and a sense check.

---

## After the call — same day

1. Circulate notes to the team; log the decisions in your Tuesday meeting record.
2. Send a short thank-you naming **one specific thing** you'll change because of the call.
   This is what makes a mentor feel their time mattered.
3. Diarise the mid-August update now, before it slips.
4. Add anything that changed to the design-evolution narrative — that material feeds the
   8-point "development of the solution" oral criterion as well as the teamwork score.
