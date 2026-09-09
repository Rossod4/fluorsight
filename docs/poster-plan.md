# Poster plan — panel by panel

**Written 9 September 2026.** A0 portrait, 841 × 1189 mm. **32pt body floor, 18pt caption floor,
~800 words of body copy.** Three columns; a reader goes down column 1, then 2, then 3.

Decisions taken: customer is **the EA as an anchor, consultancies as the market**; the problem stat
is the **£1.8–2.7m vs ~£300k** investigation-budget mismatch; the **consumer survey (70 responses)**
is evidence of public concern and of process, not of demand.

---

## Header

**Fluorsight** — one line: *"Which water samples are worth a lab test?"*

Keep the **evidence key**: ● SOURCED OR UNIT-TESTED · ◐ MODELLED BY US · ○ NOT YET EVIDENCED.
It is the most distinctive thing on the sheet and almost no other entry will grade its own claims.

---

## Column 1 — the problem

### 1 · PFAS, and why now
- What PFAS are, in two sentences. Persistent, mobile, regulated.
- ● DWI revised guidance March 2025: 48 PFAS, 0.1 µg/L — **guidance, not a statutory limit**.
- ● Defra's 2026 PFAS Plan; the EA's national prioritisation map reaches public bodies end 2026.
- ● **70 people surveyed** — use for public concern only. It does not evidence demand.

### 2 · The problem: testing is rationed, not targeted
- ● Investigating **four known sites** was costed at **£1.8–2.7m** against an EA budget of
  **~£300k**. *(Secondary source — ENDS/IFSJ. Label it, or replace with the primary if we find one.)*
- ● **No UK laboratory publishes a price.** We approached five; none would quote.
- ◐ So you test where you already suspect. The samples nobody suspected are never looked at.

> This panel is the whole argument. If a judge reads only one, make it this one.

---

## Column 2 — the solution

### 3 · How it works  ← **the assay diagram goes here, not at the bottom**
Four steps, left to right, with the molecular inset at step 3:
1. **LOAD** — β-cyclodextrin cartridge preloaded with 2,6-ANS. The dye sits in the cavity and
   fluoresces. ● Baseline.
2. **DRAW** — 250 mL of sample through the cartridge.
3. **DISPLACE** — PFAS binds the cavity harder and pushes the dye out into the water, where it
   goes dark. ◐ The signal falls.
4. **READ** — read wet, in the cartridge. No elution step. Signal drop → band + confidence.

○ *No bench experiment has been run.*

### 4 · How the decision is made
- ● **35** screening evidence + **55** site context + **10** repeat positives = 100.
- ● Thresholds 30 / 50 / 70 → monitor / lab / urgent.
- ● **One reading caps at 35 against a lab threshold of 50**, so site context has to agree.
- ● Every point attributed to a named driver. Operators edit the weights. 44 unit tests.

### 5 · The output: an escalation queue
- Screenshot of the real queue.
- ● Raising the threshold from 5 to 70 cuts referrals from 21 samples to 2 without missing a
  confirmed exceedance.
- ◐ Demo data is synthetic — we wrote it, so the 23.8% escalated and the 20% assumed in the cost
  model are one assumption twice, not corroboration.

---

## Column 3 — value, limits, and what happens next

### 6 · Who it is for, and what it saves
- **Anchor customer: the Environment Agency.** They monitor thousands of freshwater PFAS samples a
  year and have said they are under-resourced for the monitoring needed.
- **The market: environmental consultancies and ~287 Part 2A authorities.**
- ◐ 500-sample programme: **£125,000 → £50,000**. Tiered pricing, ~£50 a screen.
- ● **Two ways it stops paying, and we know both:** if the lab drops below **£62.50** a sample, or
  if more than **80%** of screens escalate anyway. We assume £250 and 20%.

> ⚠️ **Have this answer ready.** The EA is building its own national site-prioritisation map. The
> answer: their map ranks *sites* from desk data; we triage *samples within* a site using a new
> measurement. The map is a lead generator for us, not a substitute. Say it before you are asked.

### 7 · What a screen cannot do
- ○ **No bench experiment has been run.** The chemistry is specified from literature.
- ○ **No measured detection limit.** Published cyclodextrin LODs span 38 ng/L to 45 µg/L.
- ◐ One probe reads **total hydrophobic-anion binding, not PFAS** — surfactants and humic acids
  respond, and preconcentration lifts them too. Hence a risk score, never a concentration.
- ◐ Back-test is **n = 3**, on data we authored.

### 8 · How we got here
- **June 2026** — switched the probe from 1,8-ANS to 2,6-ANS on binding grounds. **17 July** — a
  paper testing both isomers across all three native cyclodextrins independently confirmed it.
  *Decision first, literature second. Say it in that order; it is the true one and the stronger one.*
- **August** — dropped "nobody does decision support" once we found ESdat, EQuIS and Locus. They
  are post-lab; we are pre-lab. A weaker claim replaced by a truer one.
- **September** — surveyed the public (70 responses), found concern but no purchaser, and
  re-scoped to the people who hold analytical budgets.

### 9 · SWOT
Four quadrants, three bullets each. Full copy in `docs/swot-box.md`. **Do not soften the
Weaknesses quadrant** — four specific technical weaknesses is what makes the Strengths believable.

### 10 · Next steps — dated, owned, with kill criteria
- Sept · Evan — five discovery interviews. *Kill: if none confirms budget forces under-sampling,
  our problem is wrong.*
- Sept · Alex — design the paired validation study with our mentor.
- ● Five laboratories approached, none quoted. Chasing, and widening to ten.

---

## Word budget — this will not fit as drafted

The current poster is **682 words** against an 800 budget. Adding SWOT (~130) and a fuller
problem panel takes this to roughly **900**. Something has to give before layout:

1. Cut the SWOT to **three bullets per quadrant, six words each** (~90 words).
2. Let the assay diagram carry the chemistry — its labels replace the prose that currently
   describes the mechanism (~60 words back).
3. Merge SWOT and Next Steps into one bottom-right panel if still over.

Run `poster/measure.js` after drafting. It counts body words and flags any element under the
32pt / 18pt floors.

---

## Open questions

1. **What did the 70-response survey actually ask?** I need the questions before drafting the
   public-concern line — the claim has to match what was asked, not what would be convenient.
2. **Which five labs, and when?** The "approached five, none quoted" line needs a date and a
   count that matches the outreach log.
3. **Is the EA-as-anchor-customer framing something a mentor or contact suggested**, or a
   positioning call? If someone external suggested it, that is citable and worth saying.
