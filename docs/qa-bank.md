# Aegis — Hostile Q&A Bank and Rehearsal Guide

**For:** Celebration Day, 23 September 2026 · 7-minute oral (hard cutoff) + **3-minute Q&A** · poster session
**Compiled:** 2 August 2026 · Sources: `research-2026-08.md`, `research-factsheet.md`, `Why.tsx`, `riskEngine.ts`, `validation.ts`

---

## How to use this document

Three minutes of questions is **four to six questions**, not ten. Every answer here is built to
land in **30–45 seconds**. If you go longer you are stealing a question from a judge who wants
to ask one, and judges notice.

**The one rule that governs every answer in here:** every limitation you admit must be followed
immediately by a mitigation, in the same breath. A bare admission reads as weakness. An
admission plus a plan reads as rigour. The pattern is:

> **Concede → why it doesn't sink the concept → what you'd do about it → when.**

**Notation:**
- ⭐ = one of the eight most likely questions. Rehearse these until they're automatic.
- 🔴 = also expanded in full in Part 2.
- `[SQUARE BRACKETS]` = you must substitute something true about your team. Do not read the
  bracket text aloud. If you cannot fill it truthfully, cut the sentence.
- Speakers are written as **DOM** (chemistry), **ENG** (aerospace engineering), **MATHS**
  (maths/modelling). Swap in real names.

**Non-negotiable:** you have run **zero bench experiments**. Nothing in this document lets you
imply otherwise, and nothing should. Your candour is worth more marks with this panel than any
number you could invent — but only when it's paired with a plan.

---

## Table of contents

- [Part 1 — The question bank](#part-1--the-question-bank)
  - [1a. The chemist](#1a-the-chemist)
  - [1b. The commercial / industry judge](#1b-the-commercial--industry-judge)
  - [1c. The data / modelling judge](#1c-the-data--modelling-judge)
  - [1d. The regulatory / environmental judge](#1d-the-regulatory--environmental-judge)
  - [1e. The generalist](#1e-the-generalist)
- [Part 2 — The five killer questions](#part-2--the-five-killer-questions)
- [Part 3 — The team-working answer](#part-3--the-team-working-answer)
- [Part 4 — Rules of engagement](#part-4--rules-of-engagement)
- [Part 5 — Drill sheet (printable)](#part-5--drill-sheet-printable)
- [Appendix A — The eight most likely questions, in order](#appendix-a--the-eight-most-likely-questions-in-order)
- [Appendix B — Where you have no good answer](#appendix-b--where-you-have-no-good-answer)
- [Appendix C — Things you must never say](#appendix-c--things-you-must-never-say)

---

# Part 1 — The question bank

## 1a. The chemist

Expect one academic chemist minimum. They will not be impressed by the market chart. They will
go straight at the mechanism, and they will be able to tell within one answer whether you have
read the literature or skimmed it. **Your defence is that you have read it recently and changed
your design because of it.**

---

### ⭐🔴 C1. "How many samples have you actually run?"

**Why they're asking.** It is the fastest way to find out whether this is a project or a claim.
Everything else you've said is downstream of the answer.

**Answer (35s).**
> None. We haven't run a single bench experiment. This is a design-stage concept plus a working
> software prototype, and we've been explicit about that everywhere rather than dressing it up.
> What we did build is the part that doesn't need a lab: the decision layer. A transparent risk
> engine that takes a screening signal and site context and produces a ranked escalation list,
> with a written rationale for every point of every score. The validation plan is a paired
> study — run the screen and LC-MS/MS on the same samples and back-test the engine's calls
> against the lab result. Until we've done that, any performance number we gave you would be
> invented, so there isn't one on the poster.

**Trap.** Hesitating, hedging, or answering a different question. "Well, we've modelled…" is
fatal — they asked a yes/no-shaped question and you dodged it. Say **"None"** as the first
word, then pivot. Also fatal: sounding apologetic. This is a design-stage entry in a
competition that accepts design-stage entries.

---

### ⭐🔴 C2. "PFAS are surfactants. So is your dye an anion. What stops SDS, or humic acid, or detergent residue producing exactly the same displacement?"

**Why they're asking.** Because this is the real hole and they know it. Selectivity in every
published cyclodextrin system comes from the array, not from any single dye.

**Answer (40s).**
> Nothing does, at the level of one dye. You're right. A single-dye displacement assay measures
> hydrophobic-anion burden, not PFAS. Han's group needed four dyes and a deep-learning
> classifier to get selectivity, and we don't have that. So what we've built is a non-specific
> screen, and we say that on the poster. It's exactly why the output is a risk score and not a
> concentration, and why anything above threshold goes to LC-MS/MS. A false positive costs us a
> lab test we were already considering. If we claimed specificity we'd be overselling, and
> you'd find out in about a minute.

**Trap.** Trying to argue that DEXSORB's selectivity rescues you. It helps — it enriches
anionic PFAS before the dye sees the sample — but it does not make the assay specific, and a
chemist will push back hard if you imply it does. Mention it as a base-rate shift, not a fix.

---

### ⭐ C3. "Your dye barely binds β-cyclodextrin. How can a displacement assay work when the dye isn't in the cavity to begin with?"

> ### ✅ CORRECTED 4 August 2026 — this question is now a gift, not a threat.
> The earlier answer here conceded the premise, because the project documents wrongly recorded the
> probe as **1,8-ANS**. It is **2,6-ANS**, and that reverses the finding entirely. Do not concede.

**Why they're asking.** They know the ANS–cyclodextrin literature and are testing whether you do.
They may be assuming 1,8-ANS, which is the isomer most people know.

**Answer (35s).**
> That's true of 1,8-ANS, which is the isomer most people mean by "ANS" — Sueishi puts it with
> β-cyclodextrin at about 50 to 195 per molar. We use the 2,6 isomer, which reaches around
> 11,700 at the same host. And a paper published on 17 July this year, using both isomers,
> found 2,6-ANS binds β-cyclodextrin most strongly of the native hosts while 8,1-ANS prefers
> gamma. Our sorbent is a β-cyclodextrin polymer, so the probe and the host are matched
> deliberately.

**Follow-up you should expect: "so where does that 11,700 come from?"**
> Honestly, the top of Sueishi's range is for the modified hosts — 2,6-di-O-methyl-β-CD and
> cucurbit[7]uril — not native β-CD. We haven't pinned the native figure yet. That's one of the
> first things we're taking to our mentor.

**Trap.** Over-claiming the 11,700. It is the top of a 150-fold range measured across several
hosts, and a specialist will know that. Concede the range and you keep the win.

---

### C4. "Han needed four dyes and a neural network. Why do you think one dye is enough?"

**Why they're asking.** Testing whether you understand what the precedent actually proves.

**Answer (30s).**
> For speciation, one dye almost certainly isn't enough, and we don't claim it is. What one dye
> may be enough for is a total hydrophobic-anion burden proxy — a number that correlates with
> PFAS presence well enough to rank samples. Ranking is a lower bar than measuring, and ranking
> is all a triage decision needs. Whether the correlation is strong enough is an empirical
> question and it's the one our first study is designed to answer. If it isn't, the array route
> is the fallback and it's well-documented.

**Trap.** Claiming an array is "future work" as if it's a small step. It's a different product.
Say it's the fallback architecture, not the roadmap.

---

### C5. "Fluorescence sensors can't reach 0.1 micrograms per litre. So what's the point?"

**Why they're asking.** Checking whether you know your own sensitivity ceiling, and whether
you'll bluff.

**Answer (40s).**
> Mostly they can't, and the numbers are worse than people assume. The 2025 Nature
> Communications on-site sensor is about 45 micrograms per litre — 455 times above the limit.
> The best commercial field kit, FREDsense, is ten times above it. The best cyclodextrin array
> gets to 31–38 nanograms per litre, below the limit, but that's a 300-fold outlier and we
> don't assume we'll match it. Two answers. First, what bridges the gap isn't the dye, it's
> preconcentration — you pass 250 millilitres through the cartridge and elute into about a
> millilitre, so a few hundred fold, and up to a couple of thousand if we size the field protocol
> around a litre. None of those academic sensors include that step at all. Second, we don't need
> to measure the limit. We need to rank samples well enough to decide which ones to pay a lab for.

**Trap.** Quoting the 31–38 ng/L array as if it's your expected performance. If you do, someone
will ask you to justify matching the single best result in the field.

> 🔴 **Never say "500,000×".** Cyclopure's 500,000× figure is from their *water treatment* line and
> describes waste-volume reduction during remediation — it is not an analytical preconcentration
> factor. The kit is 250 mL. A chemist who knows the product will catch this instantly and you
> will lose the room. Quote the volumes, not a vendor headline. See `chemistry-brief-for-dom.md` §4.

---

### C6. "Every LOD you've quoted is from clean or spiked water. Your matrix is groundwater at a contaminated site — high dissolved organic carbon, high ionic strength. What happens to your signal?"

**Why they're asking.** Matrix effects are the standard failure mode for field sensors and they
have seen a lot of projects die here.

**Answer (35s).**
> It probably degrades badly, and we can't tell you by how much. Dissolved organic carbon is
> the specific worry — humic and fulvic acids are hydrophobic anions and they'll compete
> directly with the dye. Ionic strength changes the binding equilibrium too. This is the
> single biggest experimental unknown we have and it's why the interference study comes before
> anything else in our plan: PFOA spike-recovery in real site water against DI water, with
> humic acid and SDS at environmentally realistic concentrations. If the screen can't survive a
> real matrix, the honest outcome is that the screening layer fails and the decision layer gets
> a different front end.

**Trap.** Hand-waving with "we'd optimise the protocol". Name the specific interferents and the
specific experiment.

---

### C7. "Walk me through one sample. What does the operator physically do?"

**Why they're asking.** Concept-to-practice check. Many student entries have never thought past
the diagram.

**Answer (40s, ENG or DOM).**
> Take the water sample. Pass it through a DEXSORB cartridge, which retains and concentrates
> the anionic PFAS. Elute into a small fixed volume — that's where the concentration factor
> comes from. Add the dye solution and read fluorescence on a portable fluorimeter, against a
> blank from the same site. The instrument gives you a relative signal, not a concentration.
> That signal plus a confidence rating goes into the app with the site context, and the app
> returns a score, a band and a recommendation. Target is under fifteen minutes a sample in the
> field. **All of those timings are design targets, not measurements.**

**Trap.** Quoting a time or a volume as if it's been measured. Append "design target, not
measured" out loud. It costs you two seconds and buys you the room.

---

### C8. "DEXSORB is one company, in the United States, with no stated UK distribution. What happens if you can't buy it?"

**Why they're asking.** Supply chain is where chemistry meets commercial, and a judge who
straddles both will love this question.

**Answer (30s).**
> That's a real risk and it's on our risk list. Cyclopure doesn't state UK availability
> anywhere on its product pages — we checked. The mitigation is that DEXSORB is a brand, not a
> mechanism. The underlying science is Dichtel's β-cyclodextrin polymer platform, published in
> ACS Central Science in 2022, and generic β-cyclodextrin polymers are commercially available.
> We'd expect worse performance from a generic and we'd have to characterise it. But we're not
> dependent on one supplier for the concept to stand.

**Trap.** Not knowing that Dichtel holds equity in Cyclopure. If they raise it: acknowledge the
disclosure exists and note the ACS Cent. Sci. paper is peer-reviewed regardless.

---

### C9. "Is this an indicator-displacement assay or a turn-on assay? Which direction does the signal go?"

**Why they're asking.** A five-second competence test. Get it wrong and everything after is
discounted.

**Answer (25s, DOM).**
> Displacement, so turn-off. ANS is weakly fluorescent in water and strongly fluorescent inside
> a hydrophobic cavity. Dye occupies the cyclodextrin, PFAS competes it out, the dye returns to
> water and emission drops. The measured quantity is the decrease. That's also why weak binding
> hurts us — a small bound fraction means a small signal to lose, which is the point in
> question C3.

**Trap.** Getting the direction wrong under pressure. DOM should be able to say this in their
sleep.

---

### C10. "How do you convert a fluorescence reading into one of your concentration bands without a calibration curve?"

**Why they're asking.** Your app displays bands like "50–100 ng/L". That implies calibration
you do not have.

**Answer (35s).**
> Right now we don't — the bands in the prototype are populated from seeded demonstration data,
> not from a calibration. In the real workflow they'd come from a standard curve built with
> PFOA and PFOS standards in matrix-matched water, run per batch with a site blank, and the
> band would carry an uncertainty rather than a point value. That's why the engine takes a
> confidence flag alongside the signal and multiplies the evidence weight down for low
> confidence. It's honest about not knowing. It isn't a substitute for a calibration and we
> wouldn't pretend it is.

**Trap.** Letting a judge believe the displayed bands are measured. If they're looking at the
demo on your laptop, say "seeded demonstration data" before they ask.

---

## 1b. The commercial / industry judge

They will not test your chemistry. They will test whether you know what you are selling, to
whom, for how much, and why that person would hand over money. **The most dangerous commercial
question in this section is B5, and it is not in any of your research documents.**

---

### ⭐🔴 B1. "Where did two hundred and fifty pounds a sample come from?"

**Why they're asking.** It's the load-bearing number under your entire savings claim, and they
suspect you made it up. They're right — but you have a good answer now.

**Answer (35s).**
> It's our assumption and we can't source it. No UK laboratory publishes a PFAS rate card — we
> approached seven and every one quotes on request. The nearest published UK figure is £350 a
> sample, from the Environmental Industries Association's evidence to the Environmental Audit
> Committee last year, but that's a soil figure and it explicitly excludes water. Ours is a
> water workflow, so it sets scale and nothing more. What we can tell you is where it stops
> mattering: break-even is £62.50 a sample, and the model is four times more sensitive to that
> number than to our escalation rate.

> ### 🔴 CORRECTED 4 August 2026 — do not call £250 "conservative".
> The previous answer said £250 was "29% below the only published UK figure, so we'd rather
> understate the saving." **That was itself a scope error.** The £350 is for *soil*; we model
> *water*, and we do not know which costs more. Claiming conservatism we cannot support, in the
> answer about a number we invented, is the worst possible place to be caught.

**Trap.** Any framing that implies £250 is validated. It is an assumption. Volunteering the
break-even instead converts the weakest number on the sheet into a demonstration of rigour.

---

### ⭐ B2. "What are you actually selling? Software, a test kit, or a service?"

**Why they're asking.** You have described two things — a chemistry and an app. They want to
know which one is the business, because the answers have completely different economics.

**Answer (35s).**
> Software, with a consumables path. The product we've built and can show you is the decision
> layer — a subscription platform that a consultancy uses to triage samples and produce an
> auditable escalation rationale. The screening chemistry is the input that makes triage
> possible, and we'd expect to sell the consumable alongside it, but the platform is
> deliberately method-agnostic. If someone else's screen turns out better than ours, we sit
> behind theirs. That's a design decision, not a hedge — it's why the risk engine has no
> dependency on the sensor in the code.

**Trap.** Saying "both" without a hierarchy. Pick software-first and mean it.

---

### 🔴 B3. "Your savings chart charges the customer twenty-five thousand a year and your revenue chart says five thousand. Which is it?"

**Why they're asking.** Because they read both captions. This is the single most damaging
question on the list because it's unanswerable if unfixed and it discredits every other number.

> 🔴 **FIX THE SITE BEFORE 23 SEPTEMBER.** See Appendix B. Until it's fixed, this question has
> no honest answer other than "that's an error."

**Answer if it is fixed to £5,000 (30s).**
> Five thousand. That was an inconsistency on an earlier version of the page and we corrected
> it — the savings model now uses the same price as the revenue model. At £5,000 on a
> five-hundred-sample portfolio and a twenty per cent escalation rate, you spend £30,000
> instead of £125,000. And because the platform cost is small relative to the analysis spend,
> the saving is driven almost entirely by the escalation rate, not by our price.

**Answer if it is not fixed (25s).**
> That's an error on our page and you've found it. The revenue figure is the real one — five
> thousand. The savings chart is using an older platform-cost assumption we didn't propagate.
> The correction makes the savings story better, not worse, which is why it's embarrassing
> rather than damaging.

**Trap.** Trying to reconcile them ("well, £25,000 includes consumables…"). If you improvise a
reconciliation, they will ask for the breakdown and you will not have one.

---

### ⭐ B4. "Consultancies bill lab analysis to their clients, often with a margin. Why would one of them pay you to reduce their own invoice?"

**Why they're asking.** Because they have worked in or bought from consultancies, and this is
the actual commercial objection. It is not in your research pack. **This is the question most
likely to catch you cold.**

**Answer (40s, MATHS).**
> That's the sharpest objection we've had and we don't think it's fatal, for three reasons.
> First, it depends on the contract — where a site investigation is bid at a fixed fee,
> unnecessary lab spend is the consultancy's cost, not the client's. Second, the pain the
> sector actually described to Parliament isn't cost, it's rejection: planning authorities
> refusing to accept PFAS risk assessments at named developments — Cambridge East, Dunsfold
> Park, RAF Abingdon. A documented, defensible prioritisation is what gets a report accepted.
> Third, if the pass-through model dominates, the buyer changes — it's the developer or the
> council paying the bill, and we sell to them. We'd rather tell you we're not sure who signs
> than pretend we are.

**Trap.** Waving it off with "they want to be efficient". No, they want to be paid.
Consultancies are not charities and this judge knows it.

> ⚠️ **Unverified premise.** Nobody has confirmed what share of UK site investigations are bid
> fixed-fee versus cost-plus. Say "it depends on the contract" — do not assert that fixed-fee
> dominates. **Ask the mentor on 5 August; it is a one-sentence answer for a practitioner and
> it decides whether this objection is survivable.**

---

### B5. "Year three is twenty-five councils. You've also told me local authority procurement is slow and fragmented. Which of those do you believe?"

**Why they're asking.** They found an internal contradiction between your projection and your
own risk list.

**Answer (30s).**
> Fair hit. The whole projection is a labelled illustration, not a forecast — none of it is
> based on a signed customer, because we have none. If we had to defend one number, year three
> is the weakest and we'd revise it down. What we'd stand behind is the shape: consultancies
> first because they buy on a normal commercial cycle, councils second and slowly, gated on the
> statutory limit consultation and the updated Part 2A guidance landing.

**Trap.** Defending the number. Defend the shape, concede the number. You lose nothing.

---

### B6. "What stops one of the big labs — SOCOTEC, Eurofins — just building this in six months?"

**Why they're asking.** Barriers to entry. Standard, and you must not answer "nothing".

**Answer (35s).**
> The software isn't the barrier — you're right that a lab could build a scoring tool. Two
> things sit in the way. One is incentive: a lab's revenue is the analyses we're trying to
> avoid, so a triage tool that reduces sample throughput is a strange product for them to
> launch. The other is that the defensible asset here is the calibration — the paired dataset
> linking screening signal to confirmed LC-MS/MS results across real matrices. Whoever builds
> that first owns the thing that's actually hard. We don't have it yet either. That's the race.

**Trap.** Claiming IP you don't have. You have no patent, no filing, no trade secret.

---

### B7. "Have you spoken to a single potential customer?"

**Why they're asking.** Same instinct as C1, aimed at the business rather than the bench.

**Answer (30s).**
> Not yet, in the sense you mean — we've had no customer conversation that has changed the
> product. We've written to four labs for pricing and to consultancies for a discovery call,
> and our mentor call is on 5 August with an introduction as one of our three asks. What we
> haven't done is claim validation we don't have. The one thing we most want before September
> is what a consultancy actually pays for PFAS analysis and how they price it on, because
> there's no public data on it at all.

**Trap.** Counting your mentor as a customer. They aren't.

---

### B8. "Who owns this? Is there a company?"

**Answer (20s).**
> No company, no filings, no IP position. Three undergraduates and a prototype. If this goes
> further the first two things to sort are the entity and whether there's anything patentable
> in the screening workflow — the software almost certainly isn't.

**Trap.** Vagueness. A one-word answer is fine here.

---

### B9. "Your market is four hundred and thirty-nine million dollars globally. What's your realistic share of that?"

**Answer (30s).**
> The global testing-services market isn't the right anchor for us and we'd rather give you the
> UK one. Four independent research houses converge on $430–540 million globally for testing
> services, growing 11 to 14.5 per cent — but we don't sell testing. The number that matters is
> the UK environment and sustainability consulting market at £4.1 billion, of which contaminated
> land assessment is a several-hundred-million-pound segment. That's our serviceable market.
> Our share of it in year one is zero, and everything after that is illustrative.

**Trap.** Quoting "$439m to $3.6bn" as a range. It isn't a range — those two figures measure
different things and one includes instrument sales. A market analyst will know.

---

## 1c. The data / modelling judge

They will open the app. They may well ask to see the settings page. Their instinct is that a
weighted sum with hand-picked weights is a spreadsheet with ambitions. **Your defence is that
you already built the tools that expose exactly that, and you know what they show.**

---

### ⭐ D1. "Where did the weights come from? Who decided that firefighting foam is worth ten points and landfill is worth six?"

**Why they're asking.** It's the first thing anyone technical looks at, and the honest answer
is "we chose them", which sounds bad unless you frame it properly.

**Answer (40s, MATHS).**
> We chose them. They're a hand-tuned expert prior, informed by which PFAS source types the
> Environment Agency's own mapping treats as high-risk — AFFF at airfields and fire training
> grounds is the dominant UK point source, so it carries the most weight. They are not
> calibrated and we say so in the code comments. Three things make that acceptable rather than
> arbitrary. Every weight is exposed in the settings and a user can change it. Every point
> contributed is reported as a named driver, so a score is never a black box. And we built a
> sensitivity analysis that perturbs each weight by twenty-five per cent and counts how many
> escalation decisions flip — so we can show you which weights are actually doing work and
> which are decorative.

**Trap.** Implying the weights came from data. They came from you. Say so first.

---

### D2. "What's your false-negative rate?"

**Why they're asking.** In a triage product it is the only number that matters. A false
positive costs money. A false negative is a missed exceedance.

**Answer (35s).**
> We don't know it, and we won't put a number on a poster that we haven't measured.
> Establishing it is the entire point of the pilot: score samples with the screen, send all of
> them to LC-MS/MS regardless of score, and count how many exceedances fell below our
> threshold. What we can show you today is the structural trade-off — the app sweeps the
> escalation threshold and reports, for each value, how many samples you'd pay for and how many
> confirmed exceedances you'd miss. That curve is a property of the model and it's informative
> before you have any data. It just isn't a rate.

**Trap.** Quoting sensitivity/specificity from the app's back-test. It runs on seeded data (see
D3) and the numbers mean nothing.

---

### D3. "Your app has a back-test screen. What data is it running on?"

**Why they're asking.** They've spotted a validation feature and they want to know if it's
theatre.

**Answer (30s).**
> Seeded demonstration data that we wrote. It proves the pipeline works, not that the model
> works. The code says so — the function requires the caller to report the sample count
> alongside any rate, precisely so nobody quotes a percentage off six invented samples. Two of
> the three tools on that screen are honest regardless of data: the threshold sweep and the
> weight sensitivity are structural properties of the scoring model. The confusion matrix is
> the one that needs real lab results, and it's empty of meaning until we have them.

**Trap.** Letting them discover the data is synthetic. Volunteer it in the first sentence.

> ⚠️ **Amended 4 August 2026.** The line "the threshold sweep and the weight sensitivity are
> structural properties" is only half right — see D3b and D3c, both added below after we found
> problems with each. Do not use it unqualified.

---

### ⭐🔴 D3b. "Your operating threshold is 50. Why 50?"

**Why they're asking.** It is the single number that determines every decision the tool makes, and
they suspect it was chosen because it is round. **A statistician will ask this first.**

**Answer (35s).**
> Because we couldn't derive it, and I'd rather show you why than defend the number.
>
> We have three lab-confirmed samples. They came back at thirty-four, forty-one and eighteen
> hundred nanograms per litre — nothing in between. So every threshold from twenty-three to
> seventy-two produces an identical confusion matrix on our data. Our own back-test contains no
> information about where the line belongs.
>
> Fifty is a placeholder. What it should be is a cost-sensitive decision — an explicit ratio
> between a missed exceedance and a wasted test — and the pilot is stratified specifically to
> sample the region between fifty and two hundred nanograms per litre, which is where triage
> actually decides anything.

**Trap.** Saying the operating point "sits inside the safe band, not at its edge." It is true of
the arithmetic and meaningless as evidence, and a judge who works it out has caught you dressing a
placeholder as a finding.

---

### D3c. "You say most of your weights don't matter. How did you establish that?"

**Why they're asking.** It sounds like a sophisticated self-criticism, which makes them want to
check it.

**Answer (30s).**
> We got that wrong at first and corrected it. We were reporting how many decisions each weight
> flips under a ±25% perturbation, and most flipped none — which we read as over-parameterisation.
>
> It's an artefact. A twenty-five per cent change to a weight of *w* moves a score by at most a
> quarter of *w*, and our closest sample sits four points from the threshold. So every weight
> below sixteen was arithmetically incapable of flipping anything before the code ran.
>
> What we report now is the breakdown point — how far each weight has to move before any decision
> changes. Screening evidence, thirty per cent. Airfield history, ninety-five. Everything else,
> more than a hundred. The old version also failed to renormalise, so the total drifted off a
> hundred while the threshold stayed fixed. Both are fixed.

**Delivery note.** This is the strongest thing you can say to a statistician, because it is a
methodological error you found and fixed yourselves. Do not rush it.

---

### D4. "Why a linear weighted sum? Why not machine learning?"

**Answer (30s).**
> Because we have no training data, and with none, a model you can't explain is worse than one
> you can. The engine is deliberately a pure module with no UI or storage dependencies so it
> can be swapped for a calibrated or learned model without touching anything else. But the
> reason to keep it interpretable isn't only the data. The customer has to defend an escalation
> decision to a planning authority. "The model said so" doesn't survive that. "Airfield
> proximity, prior confirmed detection nearby, and a signal of 62 at medium confidence"
> does.

**Trap.** Sounding defensive about not using ML. Interpretability is the correct choice here
and you should say it like you chose it.

---

### D5. "Twenty per cent escalation rate. Where's that from?"

**Why they're asking.** It's the second load-bearing assumption and the research pack flags it
as the model's weakest joint.

**Answer (35s).**
> It's an assumption, not a measurement, and we've stopped trying to justify it with a
> statistic that doesn't apply. What we do instead is show the range. On a five-hundred-sample
> portfolio at £250 a sample, testing everything costs £125,000. At ten per cent escalation you
> spend about £17,500, at twenty per cent £30,000, at forty per cent £55,000 — so between 56
> and 86 per cent saved. The conclusion holds across the whole range, and if the true rate is
> so high that triage stops paying, that's a finding we'd want to publish rather than hide.

*(Arithmetic, £5,000 platform: 10% → save £107,500 / 86%. 20% → save £95,000 / 76%. 40% → save
£70,000 / 56%. If the platform cost stays at £25,000: 70% / 60% / 40%. Know which set matches
the live site before you speak.)*

**Trap.** Using the DWI 4.3% figure to justify it. That statistic is about treatment works
reaching Tier 2 in public water supply, not about contaminated-land samples escalating after a
screen. It is the wrong number for the claim and a regulatory judge will say so.

---

### D6. "Design me the validation study. What would convince you?"

**Why they're asking.** Best question you can get. It's an invitation.

**Answer (40s).**
> Paired samples. Take sixty to a hundred water samples across a range of site types — an
> airfield, a landfill, and clean controls. Run the screen on all of them, and send all of them
> to accredited LC-MS/MS regardless of what the screen said, because you can only measure false
> negatives on the samples you'd otherwise have skipped. Then back-test: for each escalation
> threshold, how many exceedances did we miss and how much analysis did we avoid. Pre-register
> the threshold before looking at the results. The number that would change our mind is
> sensitivity below about ninety per cent at any threshold that saves meaningful money — at
> that point the screen isn't safe enough to triage on and we'd say so.

**Trap.** Not stating a kill criterion. Naming the result that would make you abandon it is the
single most credible thing you can say to a scientist.

---

### D7. "Can the user override the recommendation?"

**Answer (25s).**
> Yes, and the design assumes they will. Aegis never removes a sample from the workflow — it
> produces a priority ordering and a documented rationale. Escalation is the consultant's
> professional judgement, and the audit trail exists precisely so that judgement is defensible
> either way. A tool that took the decision away would be unsellable and, honestly, wrong.

---

### D8. "Which of your weights actually matter?"

**Answer (25s).**
> We can tell you exactly, because the app computes it — it perturbs each weight by twenty-five
> per cent and counts how many escalate/don't-escalate decisions flip. On our seeded data the
> screening signal and the thresholds dominate and several of the site-context weights flip
> nothing at all. On synthetic data that's a statement about our seed, not about reality. But
> the diagnostic is built and it'll run on the first real dataset the day we have one.

**Trap.** Quoting a specific ranking as if it's a finding. Caveat it in the same sentence.

---

### D9. "Isn't this just a spreadsheet with a nice front end?"

**Answer (30s).**
> The maths is a weighted sum, yes — deliberately, so it's explainable. What a spreadsheet
> doesn't give you is the thing being sold: a consistent, versioned scoring rule applied across
> a whole portfolio, an audit record of why each sample was or wasn't escalated, and a
> threshold you can defend to a regulator. The value isn't the arithmetic. It's that every
> investigator in a firm makes the same call from the same evidence, and can prove it six
> months later.

---

## 1d. The regulatory / environmental judge

They know the sector. They will know the EAC report and probably the Defra PFAS Plan.
**Cite the primary documents by name and date — it's the cheapest credibility you can buy.**

---

### ⭐🔴 R1. "The Environment Agency has built a national PFAS risk-screening and site-prioritisation programme and is giving it to every public body at the end of this year. What are you selling?"

**Answer (40s).**
> The EA's programme ranks sites. It combines monitoring data with source and receptor
> information to produce a prioritised list of facilities needing further assessment, so the
> regulator can target its own resources. It tells a council where to look. It doesn't help the
> investigator standing on one of those sites with sixty samples in a cool box and a fixed
> analysis budget, deciding which twelve go to the lab. That's a sample-level decision made
> during the investigation, using a measurement that doesn't exist in their dataset. We work a
> layer below the map. Honestly, the map is the best thing that could happen to us — it
> generates exactly the queue of sites that then need sample-level triage.

**Trap.** Not knowing about the programme. If a judge has to explain it to you, you've lost the
regulatory judge entirely. Know: **PFAS Risk Screening Programme**, cited in the Government
Response of 6 July 2026; **prioritisation map to public bodies end 2026, public Q3 2027**.

---

### ⭐🔴 R2. "You tell someone a sample isn't worth testing. It was contaminated. Who's liable?"

**Answer (35s).**
> The consultant, and we've designed it that way. Aegis never removes a sample — it produces a
> priority ordering with a written rationale for every score, and the escalation call stays
> with the professional making it. That's not us dodging: it's the only structure that works,
> because a screening tool with no accreditation cannot carry regulatory liability and
> shouldn't pretend to. What we owe them in exchange is the audit trail, so that when a
> decision is questioned two years later there's a record of exactly what was known and what
> rule was applied. And we would never sell this as a basis for compliance reporting.

**Trap.** Sounding like you're disclaiming your way out. Lead with the design rationale, not the
liability transfer.

---

### R3. "What are you scoring against? There are no UK soil screening values for PFAS."

**Why they're asking.** They know this and want to see if you do. The EIA said exactly this to
Parliament.

**Answer (35s).**
> Correct, and the Environmental Industries Association told the Environmental Audit Committee
> the same thing — the absence of regulatory thresholds beyond the PFOS EQS actively impedes
> screening and risk assessment. Our scoring runs against the 0.1 microgram per litre
> drinking-water guideline value, which is the DWI's non-statutory figure, not a soil or
> groundwater standard. That's a genuine limitation. It also cuts the other way: when there's
> no threshold to compare against, a transparent, documented prioritisation rule is more
> valuable, not less, because it's the only defensible thing an investigator has.

**Trap.** Describing 0.1 µg/L as a legal limit. It is non-statutory DWI guidance in England and
Wales; the statutory consultation is a 2026 commitment. Do not let anyone — including your own
slides — round that off.

---

### R4. "The EAC found no evidence that Part 2A is being enforced, and there's no PFAS trigger threshold for determining a site. Why would a council buy this?"

**Answer (35s).**
> They probably wouldn't, today, and that's why consultancies are our first customer and
> councils are our second wave. You're quoting the EAC accurately. The council case depends on
> two things landing: the statutory drinking-water limit consultation and the updated Part 2A
> guidance Defra has committed to. Until those exist, a council with no enforcement pressure
> and no threshold has no reason to spend. Consultancies have a commercial driver now,
> independent of enforcement.

**Trap.** Leading with councils because the public-good story sounds better. The evidence says
consultancies first. Follow the evidence.

---

### R5. "Would a consultant be allowed to put a non-accredited screening result in a report to a planning authority?"

**Why they're asking.** MCERTS and UKAS accreditation gate what goes into regulatory
submissions. This is a serious practical objection.

**Answer (35s).**
> Not as a result, no — and we wouldn't want them to. The screening number never appears as a
> reported concentration and never supports a compliance statement. It's an internal
> prioritisation input. What goes in the report is the accredited LC-MS/MS result on the
> samples we escalated. Where Aegis appears in the report, if at all, is as the documented
> rationale for the sampling and analysis strategy — which is exactly the part planning
> authorities have been rejecting. So it strengthens the submission without entering the
> compliance chain.

**Trap.** Not having thought about accreditation at all. If you're unsure of the detail, say
"we'd need to check exactly how MCERTS treats screening data, and that's a question for our
mentor" — that's a legitimate answer here.

---

### R6. "ESdat and EQuIS already screen results against UK guideline values and flag exceedances. What's new?"

**Answer (30s).**
> They solve a different problem, and we should have said so on the site earlier than we did.
> ESdat and EQuIS are post-lab: they ingest results you've already paid for and compare them to
> guideline values. We're pre-lab — we decide which samples become lab results in the first
> place. The saving comes from analyses never commissioned. We'd expect to sit alongside ESdat
> and hand off to it, not replace it.

**Trap.** Claiming "nobody does decision support". That claim is not defensible and someone who
uses ESdat daily may be in the room.

---

### R7. "The REACH restriction could redefine what counts as PFAS across ten thousand substances. What happens to your product?"

**Answer (25s).**
> Very little, and that's an accident of being non-specific. We don't measure named analytes —
> we measure a hydrophobic-anion response, so a widening definition doesn't invalidate the
> screen the way it would invalidate a targeted method. What changes is the lab step
> downstream, and the analyte list the consultant orders. If anything a broader restriction
> increases sample volumes, which is our demand driver.

---

### R8. "Whose data is it? If a consultancy puts site sampling data into your platform, who owns it?"

**Answer (20s).**
> The customer's, unambiguously. Site investigation data is commercially sensitive and often
> legally disclosable — a platform that claimed rights over it would not get through a single
> procurement review. We haven't drafted terms because there's no company yet, but the
> aggregated-calibration question is one we'd have to answer contractually and opt-in, not by
> default.

---

## 1e. The generalist

Non-specialist judges, and often the ones who decide. They score clarity, ambition and whether
you seem like people who will actually do this. **Do not use jargon with them.**

---

### ⭐ G1. "What's your next step? If we gave you funding tomorrow, what would you spend it on?"

**Why they're asking.** Near-guaranteed at an innovation competition. It's also the easiest
question to answer badly, by listing everything.

**Answer (30s).**
> Bench access and one experiment. Specifically, the interference study: does the screen still
> work in real site water with humic acid and detergent in it. That's the result that decides
> whether any of the rest matters, it's cheap, and it can be done in a week with a fluorimeter.
> After that, the paired study — around sixty samples run through both our screen and
> accredited LC-MS/MS, which at £350 a sample is where the money actually goes. We'd rather
> spend on the experiment that could kill the idea than the one that flatters it.

**Trap.** Answering "marketing" or "build the team". Name one experiment.

---

### G2. "This seems obvious. Why hasn't anyone done it?"

**Answer (30s).**
> Parts of it exist. Cyclopure sells a mail-in kit. FREDsense sells a field kit. Academic groups
> have built cyclodextrin sensor arrays. What nobody has put together is a cheap screen plus a
> decision layer aimed at the specific moment when someone chooses which samples to pay for.
> And the reason is timing — the regulatory pressure that makes triage necessary in the UK
> only arrived this year: the EU limit came into force in January, Defra published the first
> national PFAS plan in February, the EAC reported in April. The problem is about eighteen
> months old.

---

### ⭐ G3. "What's the one thing most likely to kill this?"

**Why they're asking.** Testing self-awareness. Answering "nothing really" is a scoring
disaster.

**Answer (30s).**
> Selectivity. A single dye can't tell PFAS from any other hydrophobic anion, so if real site
> water is full of interferents the screen flags everything and triage saves nothing. That's
> above the commercial risks and above the competition, and it's why the interference study is
> our first experiment rather than our fifth. The second-biggest is that the Environment Agency
> extends its own prioritisation programme down to sample level and gives it away.

**Trap.** Naming a soft risk (funding, time, competition) to avoid naming a hard one. Judges
read that instantly.

---

### G4. "Explain what this does to someone who isn't a scientist."

**Answer (30s).**
> Testing water for PFAS in a proper lab costs a few hundred pounds a sample and takes weeks.
> A site investigation might have sixty samples and budget for twenty. At the moment which
> twenty is a judgement call, made on the day, undocumented. We do a cheap on-site test that
> gives a rough indication, combine it with what's known about the site — was there an airfield,
> a landfill, a previous detection nearby — and produce a ranked list with the reasoning
> written down. It doesn't replace the lab. It decides what goes to the lab.

**Trap.** Saying "fluorescence", "cyclodextrin" or "displacement assay". Not one of those words
belongs in this answer.

---

### G5. "What did you get wrong? What's changed since you started?"

**Why they're asking.** Design evolution is explicitly assessed. This is a gift.

**Answer (35s).**
> Two things. We started out describing this as a PFAS detector, and it isn't — it can't reach
> the regulatory limit and it can't tell you which PFAS. Reframing it as triage, explicitly not
> a lab replacement, changed the product and the customer. And more recently, a paper published
> on 17 July said our specific dye is a poor fit for the cyclodextrin we'd chosen, so we
> changed the dye. [`ADD ONE MORE IF TRUE — e.g. a customer or scope reversal you actually
> made`]. Neither of those was comfortable but both made the entry better.

---

### G6. "Is this a real business, or does it stop on the 23rd of September?"

**Answer (25s).**
> Honestly, that depends on the interference experiment. If the screen works in real water this
> is worth pursuing and [`STATE WHAT YOU'D ACTUALLY DO — e.g. we'd look for lab access through
> the department in the autumn`]. If it doesn't, the decision layer still has value behind
> somebody else's chemistry, and that's a smaller but real thing. What we won't do is keep it
> alive on the strength of a pitch.

**Trap.** Overclaiming commitment you don't have. Judges have heard "we're definitely doing a
startup" from teams who weren't.

---

### G7. "Who's your competition?"

**Answer (30s).**
> Three groups. Screening products — Cyclopure's $85 mail-in kit, FREDsense's field kit, and
> Verralize, who are in alpha and are the closest thing to a direct competitor. Data platforms
> — ESdat, EQuIS, Locus — but they're post-lab and we're pre-lab. And the Environment Agency,
> in the sense that they're building a free national site-prioritisation system that operates
> one layer above us. The honest summary is that nobody is doing exactly this, and that's
> either an opportunity or a warning.

**Trap.** Saying "no direct competitors". You have Verralize, and omitting them looks like
incomplete homework.

---

# Part 2 — The five killer questions

These decide the outcome. Learn these five to the point where you don't think about the words.

---

## Killer 1 — "How many samples have you actually run?"

### The scripted answer (35s)

> **None.**
>
> We haven't run a single bench experiment. This is a design-stage concept with a working
> software prototype, and we've been explicit about that everywhere rather than dressing it up.
>
> What we did build is the half that doesn't need a lab. The decision layer takes a screening
> signal and site context and produces a ranked escalation list, with a written rationale for
> every point of every score. That's the part that stays useful even if the chemistry changes.
>
> And we know exactly what the first experiment is: does the screen survive real site water
> with humic acid and detergent in it. Until we've run it, any performance number we gave you
> would be invented — so there isn't one on our poster.

**Delivery notes.** "None" is the whole first sentence. Stop. Breathe. Then continue. If you
run the word into a qualifier it sounds like you're ashamed of it, and the panel will treat it
as a weakness rather than a fact.

### The follow-up that will come next

**"So what have you actually done since June?"** — or the sharper version, **"Why not? You've
had two months."**

### The answer to the follow-up (35s)

> Three of us, no lab access over the summer, and no budget for the LC-MS/MS confirmation that
> makes a paired study meaningful — that's about £350 a sample.
>
> So we spent the time on what we could do properly: the literature, including the two papers
> that changed our design; the risk model and its validation tooling; the product; and the
> business case, where we replaced our own invented lab price with the only published UK figure.
>
> We'd rather show you a real prototype and no data than a little data with no method behind
> it. The first experiment needs a fluorimeter and about a week, and it's the first thing we'd
> do with access.

**Second possible follow-up: "What would the first experiment be, precisely?"**

> Binding first — a titration of 1,8-ANS and 2,6-ANS against β and γ-cyclodextrin, to establish
> which pairing actually gives usable dynamic range. Then PFOA spike-recovery in deionised
> water to get a working curve. Then the one that matters: repeat that recovery in real site
> water, and against SDS and humic acid at environmentally realistic concentrations. If the
> third one fails, the screening layer fails, and we'd report that.

---

## Killer 2 — "A single dye can't distinguish PFAS from any other anionic surfactant."

### The scripted answer (40s)

> You're right, and there's no clean answer to it. One dye cannot tell PFOA from SDS or from
> humic acid. Both are hydrophobic anions and both will displace it.
>
> Every published system that achieves selectivity does it with an array — Han's group used
> four dyes and a deep-learning classifier, not one dye. So what we actually have is a
> non-specific hydrophobic-anion sensor, and we say that on the poster in those words.
>
> That's precisely why the output is a risk score and not a concentration, and why anything
> above threshold goes to accredited LC-MS/MS. A false positive costs us a lab test we were
> already considering. If we claimed specificity, we'd be overselling — and you'd catch it.

### The follow-up

**"Then what's the point? If it flags everything with detergent in it, you've saved nothing."**

### The answer to the follow-up (40s)

> That's the question the pilot has to answer, and if the answer is "it flags everything", the
> screen fails and we'd say so.
>
> Two reasons we don't think it will. First, the chemistry is only part of the score — site
> context is independent of it. A strong signal at a site with no airfield, no landfill and no
> prior detection scores differently from the same signal at a fire training ground. The model
> is designed so the dye isn't carrying the decision alone.
>
> Second, DEXSORB is doing selection before the dye ever sees the sample. It's a
> β-cyclodextrin polymer developed specifically for anionic PFAS capture, so what reaches the
> reporter is already enriched.
>
> Neither of those makes it specific. They shift the base rate. And the number that decides
> whether that's enough is the interference study.

**Third-level follow-up, if the chemist is really pushing: "How much enrichment do you actually
get for PFAS versus humic acid on that resin?"**

> We don't know. What's published on DEXSORB is PFAS capture performance, not a selectivity
> ratio against dissolved organic carbon — and we're not aware of a number for it either way.
> That's a measurement, and it's on the list.

---

## Killer 3 — "Where did £250 a sample come from?"

### The scripted answer (35s)

> It started as our own placeholder — and then we went and found the real number.
>
> The only published UK figure is £350 per PFAS soil sample. That's the Environmental
> Industries Association's written evidence to the Environmental Audit Committee in May 2025,
> lead author Paul Nathanail, who wrote the CIRIA good-practice guidance on PFAS in soil and
> water.
>
> We've kept the model at £250 — twenty-nine per cent below it — because water is generally
> cheaper than soil, and because we'd rather understate the saving than overstate it.
>
> No UK lab publishes a rate card. We checked seven and they're all quote-only. We've written
> to four for real quotes, and that's the number we actually want.

### The follow-up

**"So your entire savings figure rests on an assumption."**

### The answer to the follow-up (40s)

> Two assumptions, and both are labelled as assumptions: the price and the escalation rate.
>
> So rather than defend a single number, we show the range. On five hundred samples at £250,
> testing everything costs £125,000. Escalate ten per cent and you spend about £17,500.
> Twenty per cent, £30,000. Forty per cent, £55,000. That's a saving of between 56 and 86 per
> cent, and the conclusion holds across all of it.
>
> There's also something slightly counterintuitive worth saying: because the platform cost is
> small relative to analysis spend, the saving percentage is driven almost entirely by the
> escalation rate, not by the lab price. So the price being wrong matters much less than the
> escalation rate being wrong — and the escalation rate is exactly what the pilot measures.

*(Check which platform-cost figure the live site uses before you quote these. £5,000 platform →
86% / 76% / 56%. £25,000 platform → 70% / 60% / 40%.)*

---

## Killer 4 — "The EA is building a national PFAS site-prioritisation system and giving it to councils free. What are you selling?"

### The scripted answer (40s)

> The EA's PFAS Risk Screening Programme ranks **sites**. It combines monitoring data with
> source and receptor information to produce a prioritised ranking of facilities needing
> further assessment, so the regulator can target its own resources. It reaches all public
> bodies at the end of this year and goes public in Q3 2027.
>
> It tells a council where to look.
>
> It doesn't help the investigator standing on one of those sites with sixty samples in a cool
> box and budget for twenty, deciding which twenty. That's a sample-level decision, made during
> the investigation, using a measurement that doesn't exist in the EA's dataset because nobody
> takes it.
>
> We work one layer below the map. Genuinely, it's the best thing that could happen to us — it
> generates the exact queue of sites that then need sample-level triage.

### The follow-up

**"So why wouldn't the EA simply extend their system downwards?"**

### The answer to the follow-up (35s)

> They might, and if they did and gave it away, we'd be finished. It's on our risk list.
>
> Two things make it unlikely near-term. Their programme exists to allocate regulatory
> attention — it isn't in the business of running someone else's commercial site investigation.
> And it works from data that already exists, whereas ours depends on a field measurement
> nobody currently makes; you can't extend a desk-based model into sample-level triage without
> a new input.
>
> If they did move down a layer, the honest position is that the risk engine is the easier half
> to replicate. The defensible asset would be the screening method and the paired calibration
> dataset — and we don't have that yet either.

---

## Killer 5 — "Your dye barely binds β-cyclodextrin."

> ### ✅ REWRITTEN 4 August 2026. The old answer conceded a premise that is false for our probe.

### The scripted answer (35s)

> That's true of 1,8-ANS — which is what most people mean by "ANS", so it's a fair assumption.
> Sueishi puts that isomer with β-cyclodextrin at around 50 to 195 per molar.
>
> We use 2,6-ANS. Same paper puts it up to about 11,700 at the same host. And a study published
> on 17 July this year, which measured both isomers against all three native cyclodextrins,
> found 2,6-ANS binds β most strongly while 8,1-ANS prefers gamma.
>
> Our sorbent is a β-cyclodextrin polymer. The probe and the host are matched on purpose.

**Delivery note.** Say it evenly, not triumphantly. You are correcting a specialist on their own
ground and the way to survive that is to grant why they assumed it before you correct it.

### The follow-up

**"Where in that range does native β-CD actually sit?"** — expect this from anyone who knows the
paper, because 80–11,700 M⁻¹ is a 150-fold spread.

### The answer to the follow-up (20s)

> Honestly, the top of that range is the modified hosts — 2,6-di-O-methyl-β-CD and cucurbit[7]uril
> — not native β-cyclodextrin. We haven't pinned the native number down yet, and it's one of the
> first things we're asking our mentor. The October titration measures it directly.

### The second follow-up

**"Have you tested any of this?"**

> No. We've run no experiments at all. What we did was find that our own written spec had recorded
> the wrong isomer, and a paper published three weeks ago caught it. The titration is a plate
> reader and about a day, and it's first on the October list.

**Why this version is stronger.** The old answer offered "we read a paper and changed our design",
which sounds good but was not true — the design was always 2,6-ANS; the *documentation* was wrong.
The true story is less flattering and more defensible, and if a judge later reads the paper they
will find it says exactly what you said it says.

**Second likely follow-up: "Then isn't the preconcentration doing all the work? What's the dye
even for?"**

> Preconcentration is doing most of the sensitivity work, yes, and we lead with that rather
> than with the dye. It's a few hundred fold — 250 millilitres onto the cartridge, eluted into
> about a millilitre — and that step is missing from every academic sensor in the comparison
> table, which is part of why their LODs sit above the regulatory limit. The dye's job is only to
> turn what's on the resin into a number a field instrument can read. It doesn't have to be
> sensitive. It has to be reproducible.

---

# Part 3 — The team-working answer

**Worth real marks.** Teamwork is 20 of 100, assessed on mentor feedback plus this answer.
It is asked during the oral, every year.

## What the answer must contain

1. **Process, evidenced.** Weekly Tuesday meetings since the start of June, with a written
   record. Most teams cannot claim this.
2. **Division of labour by discipline** — and crucially, why three different subjects was an
   advantage rather than a coordination cost.
3. **The two who disengaged**, handled without bitterness.
4. **A specific disagreement and how it resolved.** Specific. Not "we discuss things openly."
5. **What you'd do differently.**

## ⚠️ Before you use this

Everything in `[BRACKETS]` must be replaced with something that actually happened. If you can't
fill a bracket truthfully, delete the sentence — the answer works shorter. **Judges ask
follow-ups about the specific example.** An invented disagreement collapses on the second
question and takes your credibility on everything else with it.

**For the disagreement, pick a real one.** Candidates that plausibly happened, but only use one
if it did:
- Whether Aegis is a chemistry project or a software product — and which one leads the pitch.
- Whether to target councils first (bigger public need) or consultancies first (faster sale).
- Whether to state the chemistry limitations openly on the site or keep them in the risk
  section where they'd be less prominent.
- Whether to formally remove the two non-contributing members, or keep waiting.
- How much of the risk engine's complexity to expose in the UI.

---

## The 45-second version (for the oral)

> There are three of us and we're three different subjects — [`DOM`] does chemistry, [`ENG`]
> aerospace engineering, [`MATHS`] maths. We've met every Tuesday since the start of June and
> we write down what we decided each week, which turned out to matter more than we expected.
>
> The split follows the disciplines. [`DOM`] owns the chemistry and the method. [`ENG`] owns
> the product and how it'd actually get used on site. [`MATHS`] owns the risk model and the
> cost case.
>
> We registered as five. Two people never engaged and were formally removed [`WHEN`]. Three
> people absorbing a five-person scope meant cutting things rather than doing everything badly
> — [`NAME THE THING YOU CUT`]. Meeting weekly is the only reason we spotted it early enough to
> make that a decision instead of a failure.
>
> The thing we'd do differently is [`ONE THING — see below`].

**Timing:** roughly 130 words at speaking pace. Rehearse it to 45 seconds. If you're over, cut
the discipline list, not the specific example.

---

## The 90-second version (for the poster stand)

> There are three of us, from three different subjects — [`DOM`] is chemistry, [`ENG`] is
> aerospace engineering, [`MATHS`] is maths. We've met every Tuesday since the start of June,
> without missing one, and we keep a written record of what we decided each week. That sounds
> bureaucratic for three people but it's the reason we can point at when each design decision
> changed and why.
>
> The work split naturally along the disciplines and we kept it that way deliberately, because
> three people trying to do everything means nobody owns anything. [`DOM`] owns the chemistry —
> the dye, the adsorbent, the literature. [`ENG`] owns the product: what the operator actually
> does in the field, and how the app has to work for that to be realistic. [`MATHS`] owns the
> risk model, the validation tooling and the cost case. Where it gets interesting is the
> boundaries — the scoring weights are a modelling question but they encode chemistry
> assumptions, so those got argued out together rather than assigned.
>
> We registered as a team of five. Two of the five never contributed and were formally removed
> [`WHEN`]. That left three of us with a five-person scope, and the way we handled it was to
> cut rather than spread thinner: [`NAME THE THING YOU CUT AND WHY`]. It was uncomfortable but
> it's why the parts that remain are finished rather than half-built.
>
> The disagreement I'd point at is [`THE REAL ONE`]. [`WHO WANTED WHAT`]. What resolved it was
> [`THE MECHANISM — evidence, a test, a deadline, a vote, the mentor`], and honestly the reason
> we could resolve it is that we'd already agreed who owned the final call in that area.
>
> What we'd do differently: [`ONE THING, SEE BELOW`].

---

## Candidate "what we'd do differently" answers

Pick one and only one. Say it without qualification.

- **"Deal with the two non-contributors weeks earlier."** We spent June assuming they'd
  engage and July deciding they wouldn't. That's a month of planning around capacity that
  didn't exist. The lesson is that the kind thing and the right thing were the same thing, and
  we did neither quickly.
- **"Get the mentor involved before the design was settled."** Ours was assigned in mid-July.
  We could have pushed for contact sooner, and some of the questions we're only answering now
  are ones an expert would have asked us in June.
- **"Write things down properly the first time."** Our own project documents recorded the wrong
  ANS isomer for weeks. Nobody on the team was confused — Dom always knew which probe we were
  using — but everything written *around* the chemistry inherited the error, and we only caught it
  when a new paper made us go back to the source. We now check technical claims against the person
  who owns them before they go anywhere.

**The third is the strongest** if it's true, because it's a technical self-criticism rather than
an interpersonal one, it is specific, and the fix is a process anyone can see you now follow.

> ⚠️ **Corrected 4 August 2026.** This bullet previously said *"we picked 1,8-ANS early and found
> out in July it was a poor fit."* That never happened — the probe was always 2,6-ANS and the
> 17 July paper endorses it. Do not use the old version; it invents a mistake, and a judge who
> reads the paper will find it says the opposite.

## How to make it sound like students, not a corporate answer

- Say **"we argued about"** not "we experienced a difference of opinion".
- Say **"it was uncomfortable"** if it was.
- Use one concrete noun the judges can picture — a Tuesday, a shared doc, a specific paper.
- Do not say: synergy, leveraged, stakeholder, aligned, agile, pivot, deliverable, workstream.
- Do not claim the removal of two members was fine. It cost you. Say what it cost and what you
  did about it.
- **Whoever answers should not be the person who spoke most in the oral.** It signals that the
  team is genuinely distributed rather than one confident person plus two others.

---

# Part 4 — Rules of engagement

## The arithmetic of three minutes

Three minutes at 35 seconds an answer is **five questions**. At 60 seconds it's three, and the
two judges who didn't get to ask will score you on what they didn't hear.

**Discipline rules:**
- First sentence answers the question. Context second. Never the reverse.
- If you're still talking at 45 seconds, land the next sentence and stop.
- Never answer a question that wasn't asked because you prepared for it.
- Never say "as I mentioned in the presentation". They know. It reads as defensive.

## When nobody knows the answer

There is a right way to do this and it scores better than a bluff every single time.

**The three-part structure — use it verbatim:**

1. **"I don't know."** (Say the words. Not "that's a great question", not "so, essentially".)
2. **"Here's how we'd find out."** — a specific method, source or experiment.
3. **"And here's what we'd do with the answer."** — what decision it would change.

**Worked example:**
> "I don't know what a consultancy currently pays per PFAS sample — there's no public data and
> we've looked. We'd find out by getting quotes from the four labs we've written to and asking
> our mentor for an introduction to a consultancy. And it matters because if the real price is
> a lot lower than £250, our savings case weakens and we'd need to lead on defensibility rather
> than cost."

Step 3 is what turns an admission into a demonstration of judgement. Most teams stop at step 2.

**What makes this fail:** using it more than twice in a three-minute Q&A. Twice reads as
honest. Three times reads as unprepared. If you're heading for a third, answer the part of the
question you *can* answer first, then flag the unknown part.

## When a judge is factually wrong

They will be, occasionally, and they will be senior. **Correct them — but never contradict the
person, only the fact, and always give them the exit.**

**The formula:** *acknowledge the reasonable version of what they said → give the specific
correction with its source → hand the point back.*

> **Judge:** "But the drinking water limit is legally binding in the UK now."
> **You:** "It is in the EU — the Drinking Water Directive came into force in January. In
> England and Wales the 0.1 microgram figure is still DWI guidance rather than statute; the
> Government committed to consult on a statutory limit in the PFAS Plan in February. It's an
> easy one to conflate and it's a distinction that actually matters to our customer, because
> without a statutory limit a council has no trigger to act on."

Note what that does: it gives them the half they were right about, corrects with a date and a
document, and ends by making their point useful to you.

**Never:** "No, that's wrong." / "Actually…" / a correction with no source. And if you're not
certain they're wrong, don't fight it — say "that's not my understanding, but I'd want to check
the exact wording" and move on. **Losing a small factual argument you shouldn't have started
costs more than the point is worth.**

## Multi-part questions

Judges ask three questions in one sentence. You have 40 seconds.

**Do this:** *"There are three things there — let me take the [X] one because I think it's the
one that matters, and we can come back to the others."*

Then answer one thing well. Answering three things badly is worse than answering one well, and
if they want the others they'll ask. On the poster stand you have time to do all three; in the
oral you almost never do.

**If two of the three parts are easy and one is hard,** answer the hard one. They asked it for
a reason and the easy ones are cover.

## Who fields what

| Category | Lead | Backup | Never |
|---|---|---|---|
| Mechanism, dye, cyclodextrin, matrix effects | **DOM** | — | Don't let a non-chemist answer chemistry. It shows in one sentence. |
| Field workflow, operator experience, product | **ENG** | DOM | — |
| Risk model, weights, validation, statistics | **MATHS** | — | Don't let DOM defend the weights. |
| Lab pricing, savings model, market | **MATHS** | ENG | — |
| Business model, customer, competition | **ENG** or **MATHS** | — | Agree in advance which. Don't decide on the day. |
| Regulation, EA, Part 2A, DWI | Whoever has read the EAC report | — | — |
| Teamwork question | **The person who spoke least in the oral** | — | Not the main presenter. |
| "What's next / what would you fund" | Anyone | — | — |

**Two rules that override the table:**
1. **Whoever is asked directly, answers.** If a judge makes eye contact with DOM and asks about
   the business model, DOM starts. Deflecting immediately looks like the team can't function
   outside its lanes.
2. **One person answers, one person adds at most.** Never three voices on one question.

## Handoffs that don't sound rehearsed

**What sounds rehearsed:** "I'll pass that to our chemistry lead." "That's [name]'s area."
Judges hear a script.

**What works:**
- **Answer first, then hand over.** "The short answer is no, one dye can't. [`DOM`] can tell
  you what the literature does instead." You've paid the question before passing it, so the
  pass reads as depth rather than avoidance.
- **Add, don't relay.** The second speaker adds a *different* fact, not a restatement. If they
  have nothing to add, they say nothing.
- **Use names naturally, not titles.** "Dom's been through the binding constants on this" is
  fine. "Our head of chemistry" is not — there are three of you.
- **Physically:** the person answering steps a half-pace forward or takes the clicker. The
  panel's eyes follow movement, and it does the handoff work without words.

**Agree one signal in advance** for "I'm stuck, take this" — a glance and a half-turn is
enough. Rehearse it twice so it doesn't look like panic.

## The poster session is a different game

- **Less time-boxed.** You can use the 90-second teamwork answer and the full follow-up chains.
- **Judges arrive mid-thought.** Have one 20-second opener ready that works with no context:
  *"PFAS lab testing is a few hundred pounds a sample. We do a cheap on-site screen and score
  which samples are worth paying for."*
- **Point at the poster, don't recite it.** The precedent LOD table from the research is the
  single most persuasive object you have with a technical judge — use it as the thing you point
  at when explaining why triage is the honest positioning.
- **Ask them questions.** "Have you worked with contaminated land?" changes the register from
  examination to conversation and lets you pitch at the right level. It also produces genuinely
  useful feedback.
- **The laptop is a liability if you don't drive it well.** If you show the app, show one path:
  a sample, its drivers, its recommendation. Do not tour the settings page unless asked.

## Using "I don't know" as a strength

The reason it works with *this* panel: they know what a design-stage undergraduate project
looks like. They have seen teams claim performance figures that couldn't exist. A team that
volunteers its own limitations before being asked is signalling that everything else it said
can be trusted — and that is the actual currency in a 3-minute Q&A where nothing can be
verified.

**Volunteer at least one limitation unprompted during the oral.** One sentence, early:
*"We should say up front — we've run no bench experiments, and the screen can't distinguish
PFAS from other anionic surfactants."* It costs seven seconds. It changes how every subsequent
answer is heard, and it takes the two best attacks off the table by pre-empting them.

---

# Part 5 — Drill sheet (printable)

**How to run it.** One person reads questions in random order. The answerer has **40 seconds**,
timed and enforced. Cut them off mid-sentence at 40 — the point is to feel the limit. Score
each answer 0–2:

- **0** — didn't answer the question, or said something untrue
- **1** — answered, but too long, hedged, or no mitigation after the admission
- **2** — first sentence answered it, and every concession was followed by a plan

**Target: 2s on all eight starred questions before you rehearse anything else.**
Run the eight starred ones every session. Rotate the rest.

---

### ⭐ Starred — must be automatic

1. How many samples have you actually run?
2. What stops SDS, or humic acid, or detergent residue producing the same displacement?
3. Where did £250 a sample come from?
4. What are you actually selling — software, a kit, or a service?
5. Where did the weights come from? Who decided firefighting foam is worth ten points?
6. The EA is giving councils a free national prioritisation system. What are you selling?
7. You tell someone not to test a sample. It was contaminated. Who's liable?
8. If we funded you tomorrow, what would you spend it on?

Plus the two that are guaranteed but sit elsewhere in this document:
- Tell us how you worked as a team.
- Consultancies bill lab analysis to their clients. Why would they pay you to reduce their own invoice?

---

### Chemistry

11. Your dye barely binds β-cyclodextrin. How can a displacement assay work?
12. Han needed four dyes and a neural network. Why is one enough?
13. Fluorescence can't reach 0.1 µg/L. So what's the point?
14. Every LOD you quoted is from clean water. What happens in real groundwater?
15. Walk me through one sample. What does the operator physically do?
16. DEXSORB is one US supplier with no UK distribution. Then what?
17. Is this displacement or turn-on? Which way does the signal go?
18. How do you get a concentration band without a calibration curve?

### Commercial

19. Your savings chart says £25,000 and your revenue chart says £5,000. Which is it?
20. Year three is 25 councils, but you say council procurement is slow. Which do you believe?
21. What stops Eurofins building this in six months?
22. Have you spoken to a single potential customer?
23. Who owns this? Is there a company?
24. What's your realistic share of a $439m market?

### Data and modelling

25. What's your false-negative rate?
26. Your app has a back-test screen. What data is it running on?
27. Why a weighted sum and not machine learning?
28. Twenty per cent escalation rate — where's that from?
29. Design me the validation study. What result would convince you?
30. Can the user override the recommendation?
31. Which of your weights actually matter?
32. Isn't this just a spreadsheet with a nice front end?

### Regulatory and environmental

33. What are you scoring against? There are no UK soil screening values for PFAS.
34. The EAC found no evidence Part 2A is enforced. Why would a council buy this?
35. Would a consultant be allowed to put a non-accredited screening result in a report?
36. ESdat and EQuIS already flag exceedances. What's new?
37. REACH could redefine what counts as PFAS. What happens to your product?
38. Whose data is it, if a consultancy loads its site data into your platform?

### Generalist

39. This seems obvious. Why hasn't anyone done it?
40. What's the one thing most likely to kill this?
41. Explain what this does to someone who isn't a scientist.
42. What did you get wrong? What's changed since you started?
43. Is this a real business, or does it stop on 23 September?
44. Who's your competition?

---

### Killer-question drill (run separately, weekly)

For each of the five, the reader asks the question, listens to the answer, **then asks the
follow-up without pausing.** The follow-up is where teams fall apart, because they've rehearsed
the first answer only.

1. How many samples have you run? → *So what have you actually done since June?*
2. One dye can't distinguish PFAS from other surfactants. → *Then what's the point?*
3. Where did £250 come from? → *So the whole savings figure is an assumption.*
4. The EA is giving it away free. → *Why wouldn't they just extend it downwards?*
5. Your dye barely binds β-CD. → *Have you tested 2,6-ANS?*

---

# Appendix A — The eight most likely questions, in order

Ranked by probability of being asked at least once across the oral Q&A and the poster session.

| # | Question | Why it's near-certain |
|---|---|---|
| 1 | **How many samples have you actually run?** | The fastest test of whether an entry is real. Asked of every design-stage project, by every panel. |
| 2 | **Tell us how you worked as a team.** | Formally part of the assessment — asked every year, of every team. |
| 3 | **Where did £250 a sample come from?** | The load-bearing number in the savings claim, and it is visibly round. A commercial judge will go straight to it. |
| 4 | **What stops another anionic surfactant giving the same signal?** | The first thing any chemist thinks when they see one dye and a surfactant analyte. |
| 5 | **What are you selling, and to whom?** | The default commercial question, and your entry genuinely straddles two answers. |
| 6 | **If we funded you tomorrow, what would you do?** | Standard closing question at innovation competitions. |
| 7 | **Where did the weights come from?** | Any judge who opens the app sees hand-set numbers within ten seconds. |
| 8 | **The EA is building this and giving it away — what are you selling?** | Only from a sector judge, but a sector judge will *certainly* ask it, and the panel includes industry professionals. |

**Just outside the eight, and dangerous:** *"Why would a consultancy pay you to reduce its own
invoice?"* — lower probability than the eight above, but it is the question you are least
prepared for and the one most likely to produce a visibly poor answer. Rehearse it with the
starred set.

---

# Appendix B — Where you have no good answer

Honest inventory. Three of these are fixable before 23 September; two are not.

### 🔴 Fixable, and must be fixed

**1. The £25,000 vs £5,000 contradiction on the Why page.**
The savings chart charges the customer £25,000/year; the revenue model says £5,000/year per
consultancy. Both are on the same page. There is no honest answer to a judge who reads both
except "that's an error". Pick one figure and propagate it through
`src/lib/economics.ts` and `Why.tsx`. Fixing it to £5,000 *improves* the savings story.
**Until it's fixed, the team must not present any savings percentage aloud**, because they
cannot know which number the judge is looking at.

**2. Concentration bands displayed without a calibration.**
The app shows bands like "50–100 ng/L (approaching guideline)". Those are seeded demo values.
A chemist looking at the laptop will read them as measurements. Either label them as
demonstration data in the UI, or be certain to say "seeded demonstration data" *before* showing
that screen. Currently the honesty depends on someone remembering to say a sentence.

**3. The MCERTS / UKAS accreditation question (R5).**
Nobody has checked how MCERTS treats screening data used to select samples for accredited
analysis. The answer in this document is reasoned, not researched. If the regulatory judge
knows the framework in detail, the team is improvising. **One hour of research, or one question
to the mentor on 5 August, closes this.**

### ⚠️ Not fixable before September — manage, don't solve

**4. Selectivity.**
There is no answer that makes a single-dye assay selective. The honest framing — non-specific
screen, risk score not concentration, LC-MS/MS confirms — is the *best available* answer, not a
good one. If a chemist presses to a third level ("what's your enrichment ratio for PFAS versus
DOC on that resin?"), the answer is "we don't know and it isn't published", and there is
nowhere further to go. Accept this. The mitigation is to reach that admission having already
banked credibility, not to avoid it.

**5. No customer contact of any kind.**
No consultancy has seen this, no lab has quoted, no council has been approached. Every
statement about customer need is inferred from published evidence — good published evidence,
including the EIA's evidence to Parliament about planning refusals at Cambridge East, Dunsfold
Park and RAF Abingdon, but inference nonetheless. **A single 20-minute conversation with one
environmental consultant before 23 September would change the answer to question B7 from a
concession into a finding, and is worth more than any further desk research.** The mentor call
on 5 August is the obvious route. It is the highest-value action left on the calendar.

**6. Related, and worth naming:** the team cannot say what a consultancy currently pays for
PFAS analysis or how they price it on to clients. That single unknown sits underneath the
savings model, the pricing model, and question B4. It is unpublished anywhere and only a
practitioner can answer it.

---

# Appendix C — Things you must never say

| Never say | Because |
|---|---|
| "Our sensor detects PFAS at X" | It doesn't detect anything yet. Nothing has been built or run. |
| "We've validated the model" | The back-test runs on data you wrote. |
| "Our savings are 60%" (or any single %) | Depends on two unresolved assumptions and one unfixed page contradiction. Give the range. |
| "The 0.1 µg/L limit" (unqualified, of the UK) | It is non-statutory DWI guidance in England and Wales. Say "guideline". |
| "No one else does decision support" | ESdat, EQuIS and Locus do post-lab screening and sell into UK consultancies. |
| "We have no direct competitors" | Verralize is in alpha doing something very close. |
| "€2 trillion to clean up Europe" | Advocacy figure. The European Commission's own January 2026 study says ~€440bn. Use the official one. |
| "Around 300–370 UK authorities" | ~287 English authorities hold Part 2A duties, after the May 2026 reorganisation. Precision is free. |
| "$439m to $3.6bn market" | Those measure different things; one includes instrument sales. Say "$430–540m testing services, four sources converging." |
| "Cyclopure's $79 kit" | It's $85. |
| "We're definitely doing a startup" | Only if true. |
| "That's a great question" | Wastes two of your forty seconds and signals stalling. |
