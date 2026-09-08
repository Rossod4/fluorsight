# Fluorsight — context pack for helping with the poster and slides

**Paste or upload this whole file into Claude before asking for help.** It is self-contained:
the assistant reading it has no access to the codebase, the live site, or the competition brief.

**Exported 5 September 2026.** Poster due **11 Sept** (6 days). Slides due **16 Sept** (11 days).
Judging **23 Sept**.

---

## 0. READ THIS FIRST — the one rule that matters

This project has been audited for fabricated claims. An earlier version of the website was
AI-generated and unsigned-off; a check of two of its files found **66 problems in 149 claims — a
44% defect rate**, including a completely invented citation and an invented list of authors that
carried a "verified against primary source" tag.

**So: do not invent anything.** Not a statistic, not a source, not a detection limit, not a
customer quote, not a number that "sounds about right". If a figure isn't in this document, say
you don't have it and ask. A plausible-sounding invented number is the single most damaging thing
you can contribute here, because this is a winner-takes-all competition judged by academics who
can check.

Every figure below is tagged:
- **[MEASURED]** — computed by running the real code, or physically measured
- **[MODELLED]** — derived from an assumption we chose
- **[PUBLISHED]** — from a named external source
- **[UNPROVEN]** — believed but not evidenced

---

## 1. What Fluorsight is

A PFAS water-screening **triage** tool for UK environmental consultancies and local-authority
Part 2A contaminated-land officers.

**The problem.** Confirmatory PFAS analysis by LC-MS/MS is expensive and no UK laboratory
publishes a price. When testing is costly and opaque, investigators only test where they already
suspect a problem — so the samples nobody suspected never get checked.

**The product, two halves:**
1. **A cartridge** — β-cyclodextrin preloaded with the fluorescent dye 2,6-ANS. Water is drawn
   through; PFAS binds the cyclodextrin cavity more strongly than the dye does and displaces it
   into the water, where it goes dark. **The signal falls.** Read wet, in the cartridge, no
   elution step.
2. **A web app** — takes that reading plus site context, produces a transparent 0–100 risk score,
   and recommends whether the sample justifies a lab test. Live at **fluorsight.co.uk**.

**It outputs a rank, never a concentration.** Fluorescence is in arbitrary units so we read the
*change* from a baseline, and one probe measures total hydrophobic-anion binding — surfactants and
humic acids respond too. That is why the output is a risk score escalating to accredited LC-MS/MS,
not a measurement.

**⚠️ THE CENTRAL CAVEAT: no bench experiment has ever been run.** There is no lab access, no
measured detection limit, no real sample data. The software is real and tested; the chemistry is
designed from literature and unproven. **Never write anything implying the device has been built
or tested.**

---

## 2. Marking scheme

> ⚠️ Reproduced from the team's notes, not from the official brief in front of me. **Alex should
> check these against the official document before relying on them.**

**100 marks total.**

| Block | Marks | Breakdown |
|---|---|---|
| **Poster** | 40 | Content 30 · Design 10 |
| **Oral** | 40 | Approach 8 · Development of solution 8 · Feasibility 8 · Next steps 8 · Quality & kept to time 8 |
| **Teamwork** | 20 | Assessed partly via the mentor; judges ask about collaboration during questioning |

**Poster format rules (hard):** A0 portrait, **841 × 1189 mm**, PDF, sans-serif, **32pt minimum
body text**, **18pt minimum captions**. Current build sits at a **800-word budget for body copy**.

**Oral format rules (hard):** **7 minutes, hard cutoff**, then 3 minutes Q&A. **Maximum one slide
per minute** → 7 slides. 16:9.

**Required content** names, among others: literature research, interviews, market surveys, data
analysis, tools used, product testing, iterative refinement, **documentation of team roles and
responsibilities**, and a **SWOT**.

---

## 3. Verified figures — use these exact numbers

### Cost and business case
| Figure | Status |
|---|---|
| £250 per sample for confirmatory PFAS water analysis | **[MODELLED]** — our assumption. **No UK lab publishes a rate card**; seven providers' published pricing was checked, all quote on request |
| £350 per sample | **[PUBLISHED]** Environmental Industries Association evidence to the Commons Environmental Audit Committee, May 2025 — **but this is for SOIL and explicitly excludes water.** It does NOT make £250 "conservative" |
| €175–300 per water sample | **[PUBLISHED]** Measurlabs 2025 list price |
| 500-sample programme: £125,000 all-lab → £50,000 triaged → **£75,000 saved (60%)** | **[MODELLED]** — £5,000 subscription + £20,000 consumables + 100 lab analyses. Always say "modelled" |
| Break-even £62.50/sample | **[MODELLED]** |
| Cyclopure Water Test Kit Pro **$85** | **[PUBLISHED]** — not $79 |

### The prototype and demo data
| Figure | Status |
|---|---|
| 23 samples, 21 screened, 3 lab-confirmed, **5 escalated at threshold 50 = 23.8%** | **[MEASURED]** but on **synthetic data we wrote ourselves** |
| Raising the threshold from 5 to 70 cuts referrals from 21 to 2 with **zero missed exceedances** | **[MEASURED]** on synthetic data |
| Back-test n = **3**. Confirmed samples measured 34, 41 and 1,840 ng/L | **[MEASURED]** |
| **27 unit tests passing**, ~6,200 lines | **[MEASURED]** |
| Weight breakdown points: screening evidence **30%**, airfield **95%**, all others >100% | **[MEASURED]** |

> **Two traps in the above.**
> 1. **Never quote an accuracy or sensitivity rate.** With n = 3 on data we authored it is
>    meaningless. The defensible line is: *"we built the validation protocol and demonstrated it;
>    establishing a real sensitivity figure is the point of a pilot."* Show the method, report the
>    n, refuse the rate.
> 2. **Never present 23.8% escalation as confirming the 20% cost assumption.** We wrote the data
>    and chose the threshold — it is one assumption appearing twice, not corroboration.

### Chemistry
| Figure | Status |
|---|---|
| 2,6-ANS binds β-cyclodextrin at **80–11,700 M⁻¹** vs **50–195 M⁻¹** for 1,8-ANS — **across the hosts tested**, not one host | **[PUBLISHED]** Sueishi et al. 2013 |
| Preconcentration **~250×** (250 mL through, ~1 mL elution); ~2,000× on a 1 L protocol | **[MODELLED]** |
| **No measured detection limit.** Published cyclodextrin fluorescence LODs span 38 ng/L to 45 µg/L | **[PUBLISHED]** range only |
| UK guideline 0.1 µg/L | **[PUBLISHED]** — but this is **non-statutory DWI guidance** in England and Wales. Say "guideline", never "the limit" |

---

## 4. Things you must NEVER write

| Never | Because |
|---|---|
| "Our sensor detects PFAS at X" | Nothing has been built or run |
| "We validated the model" | The back-test runs on data we wrote |
| "500,000× preconcentration" | Category error — that figure is waste-volume reduction from Cyclopure's *water treatment* line. Real figure ~250× |
| "80–11,700 vs 50–195 at the same host" | Those ranges span several hosts |
| "The 0.1 µg/L limit" | Non-statutory guidance. Say "guideline" |
| "No one does decision support" | ESdat, EQuIS and Locus do post-lab screening and sell into UK consultancies |
| "We have no direct competitors" | Verralize is in alpha doing something very close |
| "We approached / wrote to N laboratories" | As of the last check, only Dom's two contacts had been approached. We **checked published pricing** for seven — that is a desk check, not outreach |
| "€2 trillion to clean up Europe" | Advocacy figure. The European Commission's own Jan 2026 study says ~€440bn |
| "300–370 UK authorities" | ~287 English authorities hold Part 2A duties after the May 2026 reorganisation |
| "$439m–$3.6bn market" | Measures different things. Say "$430–540m testing services, four sources converging" |
| "Cyclopure's $79 kit" | It's $85 |
| Any single savings % without "modelled" | Rests on two unresolved assumptions |

---

## 5. Competitors — the correct positioning

Do **not** claim novelty broadly. The defensible framing is specific:

- **FREDsense** (Calgary) — commercial electrochemical field kit, **LOD 1 µg/L**, same-day.
  **They have a measured detection limit and we do not.** Never claim we detect better. The right
  line: *they are a measurement device, we are a decision layer — they tell you a number for one
  sample, they don't tell you which of your sixty samples is worth paying for.* FREDsense could
  in principle be an input to Fluorsight.
- **Cyclopure** (US) — $85 mail-in kit, 55 analytes, 10–14 day turnaround. No stated UK
  availability, which is also a supply-chain risk for us since we'd use their adsorbent class.
- **Verralize / BioLargo** (US) — multiplexed sensor array, **in alpha, our closest direct
  competitor.** Omitting them looks like incomplete homework.
- **ESdat / EQuIS / Locus** — established environmental data platforms that already do exceedance
  screening for UK consultancies. **They are post-lab** — they screen results you already paid
  for. **We are pre-lab** — we decide which samples become results at all. The saving comes from
  analyses never commissioned.
- **The Environment Agency** — building a free national PFAS site-prioritisation map. It ranks
  **sites** for regulatory attention; we triage **samples** within a site during an investigation.
  It is a lead generator for us, not a substitute.

---

## 6. How the scoring works (for diagrams and Q&A)

Weights total exactly 100. Operators can edit them at runtime and every sample re-scores.

| Component | Max points |
|---|---|
| Screening evidence | 35 |
| Firefighting foam / airfield proximity | 10 |
| Repeat positive screens | 10 |
| Receptor sensitivity | 10 |
| Prior lab-confirmed PFAS nearby | 8 |
| Landfill proximity | 6 |
| Industrial activity | 6 |
| Water source exposure pathway | 6 |
| Wastewater treatment proximity | 5 |
| Historical contamination | 4 |

**Thresholds:** <30 Low (no lab test) · 30–49 Medium (monitor/retest) · 50–69 High (send for lab
confirmation) · ≥70 Critical (urgent escalation).

**Two design decisions worth stating:**
1. **The fluorescence signal and the estimated concentration band score as ONE weight — the
   stronger of the two, never both.** They are the same measurement expressed twice (the operator
   reads a response and bins it). Scoring both would double-count one reading.
2. **Uncertainty never relaxes a recommendation.** Confidence (low 0.7 / medium 0.85 / high 1.0)
   multiplies the screening points down — but that alone would mean an uncertain reading gets
   *less* attention, which is backwards. So there is an override: if the result would be "no
   action" **and** confidence is low **and** the raw signal is ≥35/100, it is raised to "monitor".

**One reading caps at 35 points against a lab threshold of 50** — so under the default weights, no
single measurement escalates a sample alone; site context must agree. Say "under the default
weights", because operators can edit them and a judge who opens Settings can check.

---

## 7. Poster — current state and what's needed

**Nine panels:** Which samples are worth a lab test? · The output: an escalation queue · Why this
is different · How the decision is made · What a screen cannot do · Value, and who banks it ·
Development and design evolution · Next steps (dated, owned, with kill criteria) · Where this
could fail.

**A device worth keeping: an evidence key in the header.** Every claim on the sheet carries a
symbol — **● SOURCED OR UNIT-TESTED · ◐ MODELLED BY US · ○ NOT YET EVIDENCED**. This is the most
distinctive thing about the entry. It signals we know exactly which claims are which, and almost
no other team will do it. Keep it in the Canva rebuild.

**The identified gap: there is no diagram.** The highest-value one to add is **the assay
mechanism**, not another software diagram — two of the existing visuals are already app
screenshots, and the entry's biggest risk is reading as *a web app in search of a chemistry*. Four
panels left to right:

1. **LOAD** — 2,6-ANS sits in the β-cyclodextrin cavity and fluoresces. ● Baseline.
2. **DRAW** — 250 mL of sample drawn through.
3. **DISPLACE** — PFAS binds the cavity harder and pushes the dye out into the water, where it
   goes dark. ◐ The signal falls. *(The molecular inset here is the whole diagram: a cup with the
   dye glowing inside, then the same cup with a PFAS chain in it and the dye ejected and grey.)*
4. **READ** — read wet, in the cartridge, no elution step. Signal drop → band + confidence.

Then a short tail: band + confidence → 8 site factors → score /100 → four coloured outcome chips
(<30 no action · 30–49 monitor · 50–69 lab · ≥70 urgent), colours matching the app. Label the
diagram ○ *No bench experiment has been run.*

**Still unclaimed:** adoption/delivered impact, interviews and market surveys are named
sub-criteria currently scoring **zero** — roughly 3 of the poster's 30 marks. Anything Alex can
add about people outside the team using the demo, or responses to outreach, goes here.

---

## 8. Slides — current state

Seven slides exist as HTML (being rebuilt in PowerPoint). Script counted at **6:38** against the
7:00 hard cutoff. Slide plan and speakers:

1. **Approach** (Alex, 0:00–1:00) — "40 samples. Budget for eight. Which eight?"
2. **Development** (Dom → Alex, 1:00–2:15) — the measurement is one input, not the answer. Carries
   the design-evolution story: *we switched the dye from 1,8-ANS to 2,6-ANS in June on binding
   grounds, and a paper published 17 July, testing both, confirmed it.* **Say it in that order —
   decision first, literature second.** It is true and it is much stronger than the reverse.
3. **Development** (Evan, 2:15–3:15) — it is built and live; the app, the reasoning, editable weights
4. **Feasibility** (Alex, 3:15–4:15) — what we can and cannot claim; the 34/41/1,840 ng/L gap
5. **Feasibility** (Alex, 4:15–5:15) — the saving and the two things that could sink it
6. **Next steps** (Evan → Dom → Evan, 5:15–6:15) — every step with a kill criterion
7. **Close** (Alex, 6:15–6:30)

**Design rule that has served this deck well:** *the script carries the words, the slides carry
one idea each.* Dense slides read as a team that could not decide what mattered. Keep slide text
at 20pt minimum — the deck overflowed invisibly once already because content outgrew the frame.

**Dom must take the chemistry questions in Q&A**, not Alex.

---

## 9. Team

Three members: **Dom** (chemistry — sensing method, dye/host chemistry, science claims), **Evan**
(aerospace engineering — outreach, next steps), **Alex** (maths — risk model, cost case,
competition deliverables). Registered as five; two never engaged and the scope was cut to three.

**Strongest process evidence:** weekly meetings since 1 June 2026; fifteen candidate ideas each
scored independently by all three on three axes; the top two were both PFAS and the product is a
merge of them. The scoring resolved a real disagreement using a rule agreed in advance.

**Teamwork is 20 marks and 12–15 of them are currently unclaimed**, because the decision log is
mostly empty. If Alex asks for help here, the useful contribution is structure and prompts — not
invented content. Judges ask "can I see it?" and they do ask.

---

## 10. How to help well

**Do:** use the exact numbers above; keep the ● ◐ ○ evidence key; suggest cuts before additions
(both artefacts have hit their limits); flag when a claim needs a source; ask Alex when something
isn't in this file.

**Don't:** invent statistics, sources, quotes or detection limits; describe the chemistry as
tested; quote an accuracy rate; drop the caveats to make a punchier line. The candour *is* the
pitch — this entry's principal asset is that it states plainly what it hasn't proven, and a judge
who catches one inflated claim next to that stops believing the rest.
