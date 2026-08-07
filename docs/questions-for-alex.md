# Questions for Alex — things I would not decide on your behalf

**Written 7 August 2026.** You said you didn't want anything made up on your behalf. These are the
points where the honest answer is "we don't know" or "only Alex can say." Nothing here is blocking
the poster or the deck; all of it is answerable in a few minutes each.

Ranked by what a judge is most likely to probe.

---

## 1. The unit-test count is now 27. Is that the number you want to claim?

The poster said 25, the README said 21, the design log said 21. The real count is **27** (12 in
`riskEngine.test.ts`, 15 in `validation.test.ts`) and everything now says 27.

**But mutation testing found three of them are not doing the work they appear to do.** I can change
`DEFAULT_SETTINGS.thresholds.medium` from 30 to 15, flip the Critical band comparison, or halve the
100 ng/L guideline the whole back-test rests on — and all 27 still pass. The suite tests the
scoring arithmetic well and the *decision boundaries* not at all.

**Question:** do you want me to write the missing tests before submission? It is maybe an hour, it
makes "27 unit tests" a stronger claim, and if a judge asks "what do your tests actually check?"
you would have a real answer. I have not done it because it changes code and you asked to approve
that.

## 2. "Two contacts approached, no reply yet" — is that still accurate?

It's on the poster now, based on you telling me Dom emailed two environmental contacts. If either
has replied since, that changes from an admission into evidence, and *interviews* is a named
sub-criterion currently scoring zero.

**Question:** any reply? And do you want the poster to name what kind of organisations they were
(consultancy? lab? regulator?) — that's more credible than "two contacts."

## 3. Who actually does the printing, and by when?

Nobody owns this. The SPO offers free printing if the PDF arrives by 11 September. A poster that
fits at 99.9% on screen can still come back with clipped edges, wrong colour, or a visible white
margin if the printer's bleed settings differ.

**Question:** can you get one proof printed by ~8 September and look at it from 1 m? If free
printing has a lead time, I need to know it now so the content freeze lands before it.

## 4. The £250/sample assumption is still the largest hole in the business case

Break-even is £62.50, so the model is **four times more sensitive to lab price than to escalation
rate** — and it is the one number you have no quote for. Everything now says this honestly.

**Question:** is anyone actually going to send the lab emails this week? If not, tell me and I'll
reframe the business case around the sensitivity rather than the point estimate — which is
defensible, but weaker than one real quote.

## 5. Does the £11.5m UK market figure hold up?

The poster footer cites "UK PFAS testing market $11.5m (~£9m), Fortune Business Insights 2025."
I could not reconcile that against the same source's global figure ($439m for 2026) anywhere in
your research documents, and the claim register flagged it as **cited but not locatable**.

**Question:** do you remember where the $11.5m came from? If not, I'd rather cut it than leave a
number on the poster that neither of us can trace. It is doing very little work there.

## 6. AFFF source zones "arrive at 2,500 µg/L" — where is that from?

On the poster, uncited. `chemistry-brief-for-dom.md` gives a *range* for AFFF source zones —
10 µg/L to mg/L — and 2,500 µg/L sits inside it, but the specific figure isn't derived anywhere.

**Question:** did Dom get this from somewhere specific? If it's an illustrative midpoint, I'd
rather say "AFFF source zones run from tens of µg/L into the mg/L range" — same argument, fully
supported.

## 7. Does the poster's evidence key work at 1 m?

The ●◐○ marks (sourced / modelled / not evidenced) are genuinely distinctive and I think they're
one of the best things on the sheet. But they're doing all the epistemic work at paragraph level,
while the sentences inside those paragraphs are still written in the indicative — "the dye
fluoresces," "the signal falls" — for a mechanism with no bench data. **The deck has no marks at
all**, so a listener gets those sentences unqualified.

**Question:** two options, your call. (a) Leave it — the deck's slide 4 already says plainly that
no bench experiments have been run, which covers it. (b) Have Dom add three words on slide 2 — "on
the design, the signal falls" — so the mechanism is explicitly stated as designed rather than
observed. I lean (a); the candour is already carried elsewhere and (b) risks sounding hedged.

## 8. Is the candour now at the right level?

Not a factual question — a judgement one, and yours.

The poster carries roughly ten explicit admissions: no bench data, no measured detection limit,
synthetic demo data, no laboratory access, the back-test cannot locate the threshold, outreach has
returned nothing, who banks the saving is unconfirmed, £250 is an assumption. Every one is true and
individually correct — the plan's own guidance is that an admission plus a mitigation reads as
maturity, and most of yours do have the mitigation attached.

**The risk is cumulative, not individual.** A judge reading carefully will be impressed. A judge
skimming for sixty seconds might come away with "these people have a spreadsheet and no product."

**Question:** do you want me to try a version that keeps every admission but front-loads what you
*do* have — a working, publicly reachable prototype, a validated scoring model, a real design
change confirmed by literature — so the first ten seconds land on capability and the candour reads
as confidence rather than apology? I would not change a single fact. Only the order.
