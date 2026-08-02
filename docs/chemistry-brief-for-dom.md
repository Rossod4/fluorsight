# Chemistry brief for Dom — the ANS/cyclodextrin problem

*Prepared 2 August 2026, ahead of the mentor call on Wednesday 5 August 2026.*

A paper landed two weeks ago that speaks directly to the core of your sensing design. This brief lays out what it says, what it means for the assay as currently specified, the realistic options, and what to do about it before September. Nothing here is a reason to abandon the concept — but the current pairing (1,8-ANS + DEXSORB+, a β-cyclodextrin polymer) needs to change or be defended with eyes open, and you should walk into Wednesday's call already knowing which.

---

## 1. What the new paper says

**Chatzigiannis et al., "Weakly interacting cyclodextrin complexes: an experimental and theoretical methodological assessment using two fluorescent anilinonaphthalenes,"** *Journal of Inclusion Phenomena and Macrocyclic Chemistry*, published **17 July 2026**, open access. DOI: [10.1007/s10847-026-01361-0](https://doi.org/10.1007/s10847-026-01361-0). (Full author list didn't render in the fetched HTML — pull the PDF before citing this formally in writing.)

Three findings matter to us:

1. **γ-cyclodextrin is the best host for 8,1-ANS, not β.** The paper states γ-CD is "the only host, among those examined, that can fully accommodate the naphthalene group within its cavity." 1,8-ANS's extended, angular geometry (the anilino and sulfonate groups sit at the 1 and 8 positions of the naphthalene, close together) means it doesn't fold neatly into the smaller β-CD cavity (internal diameter ~6.0–6.5 Å) the way it does into γ-CD (~7.5–8.3 Å).

2. **The β-CD binding that does occur is weak** — association constants (Ka) on the order of 10²–10³ M⁻¹, a regime the authors describe as intrinsically hard to measure reliably. This is corroborated independently by **Sueishi et al., *Spectrochimica Acta Part A*, 2013**, DOI: [10.1016/j.saa.2013.05.052](https://doi.org/10.1016/j.saa.2013.05.052), who report:
   - **1,8-ANS + β-CD: Ka ≈ 50–195 M⁻¹**
   - **2,6-ANS + β-CD: Ka ≈ 80–11,700 M⁻¹**

   That's roughly a **60–100× difference in binding strength between the two ANS isomers at the same host**, purely from where the sulfonate and anilino substituents sit on the ring system. You picked the weaker isomer for the host you're using.

3. **Weak, poorly-fitted binding distorts the fluorescence signal itself.** Partial solvent exposure of a badly-fitting guest "can lead to … distorted fluorescence readouts," and the paper warns fluorescence-based Ka determinations "may over- or underestimate Ka if experiments are not carefully controlled." This isn't just a sensitivity problem — it's a measurement-reliability problem.

**Bottom line, stated plainly:** the most current, most on-point literature says the dye you chose is a poor structural match for the host you chose, is bound roughly two orders of magnitude more weakly than an isomer you didn't choose, and the weak binding itself makes the fluorescence signal harder to trust.

---

## 2. Why it matters for a displacement assay specifically

The whole mechanism depends on step zero: **the dye has to be sitting in the cavity before PFAS shows up to evict it.** If occupancy is low and equilibrium-limited (which is what Ka ≈ 50–195 M⁻¹ implies at plausible working concentrations), three things degrade together:

- **Dynamic range.** Displacement signal is proportional to the *change* in bound dye fraction. If baseline occupancy is already low, there's less bound dye to displace, and the fluorescence-on baseline is close to the fluorescence-off (all-displaced) endpoint. You lose headroom.
- **Reproducibility.** A weak, easily-perturbed equilibrium is sensitive to small variations in temperature, ionic strength, pH, and trace competing solutes — all of which vary between real environmental water/soil-eluate samples. A tightly-bound complex is comparatively robust to this noise; a Ka ≈ 100 M⁻¹ complex is not.
- **Limit of detection.** LOD in a displacement assay is set by how small a change in bound fraction you can resolve above baseline noise. Weak baseline binding plus a noisy signal (point 3 above) pushes your LOD up, not down — the opposite of what a screening tool for ppt-to-ppb-level contamination needs.

So this isn't a cosmetic issue. It sits directly under the number that will end up on the poster next to "limit of detection."

**The counterpoint, and it's real:** the same paper notes that 8,1-ANS "shows little to no fluorescence in water but becomes highly fluorescent inside the cavity," so "even a small bound fraction of ANS produces a noticeable increase in emission, so very weak complexes that might go undetected by other methods can be observed." In other words, ANS's large on/off fluorescence contrast is forgiving of weak binding in a way many other dyes wouldn't be. Weak binding is detectable — it's just noisier and lower-range than strong binding would give you. Don't let this counterpoint talk you out of taking the core finding seriously; it softens the problem, it doesn't remove it.

---

## 3. Design options and trade-offs

Four live options. None is free.

### Option A — Switch dye: 1,8-ANS → 2,6-ANS, keep β-CD/DEXSORB+
- **What changes:** Ka rises from ~50–195 M⁻¹ to ~80–11,700 M⁻¹ (Sueishi et al.) — up to two orders of magnitude tighter binding, directly addressing the dynamic-range and reproducibility problem, with no change to the adsorbent (DEXSORB+ stays as-is).
- **New uncertainty:** 2,6-ANS's PFAS-displacement behaviour is, like 1,8-ANS's, unprecedented in the literature (§5 below) — you'd be trading one untested pairing for another, just a better-bound one. You'd also want to re-confirm the 2,6-ANS Ka range isn't itself matrix-dependent (Sueishi's range spans ~150-fold depending on conditions, which is a flag worth reading the paper on, not just the headline number).
- **Cost to switch:** low. 2,6-ANS is commercially available (Sigma-Aldrich and equivalents) at similar cost to 1,8-ANS. This is the cheapest option to execute and the one that keeps DEXSORB+ — and therefore the preconcentration story (§4) — untouched.

### Option B — Switch host: β-CD/DEXSORB+ → γ-CD or methylated β-CD
- **What changes:** γ-CD is the host the July 2026 paper identifies as the best structural fit for 1,8-ANS specifically — you'd keep the dye you already picked and designed the story around.
- **New uncertainty:** this means leaving DEXSORB+ behind, since it is a β-cyclodextrin polymer product, not γ-CD. You'd need either a different commercial adsorbent (methylated β-CD polymers exist, e.g. from Cyclolab or custom-synthesised, but check PFAS-adsorption performance — DEXSORB's PFAS affinity has its own dedicated literature, see §4, that doesn't automatically carry over to a different CD host) or accept that host and adsorbent are now two different materials in the workflow (γ-CD as the optical reporter host, DEXSORB+ as a separate preconcentration step). That second structure is arguably fine — displacement doesn't strictly require the sensing host and the concentrating adsorbent to be the same material — but it's a bigger architectural change than swapping a dye, and it forfeits the "off-the-shelf DEXSORB+ does both jobs" simplicity.
- **Cost to switch:** moderate to high, mainly in re-justifying the adsorbent choice from scratch with no bench time available before September.

### Option C — Keep 1,8-ANS + β-CD/DEXSORB+, compensate elsewhere
- **What changes:** nothing chemically. You lean on the fluorescence on/off contrast point (§2 counterpoint) and on preconcentration (§4) to argue the weak binding is survivable.
- **New uncertainty:** you are explicitly defending a design that the most current literature calls a poor fit, with no bench data of your own to counter it. This is the highest-risk option in a judged setting — it invites exactly the question in §7 Q1, and "we read the paper and decided to keep it anyway, unverified" is a much weaker answer than "we read the paper and changed the design."
- **When this is still defensible:** only if you can point to a specific reason DEXSORB+'s preconcentration (§4) is expected to compensate for a Ka this low — and currently there's no calculation or citation that shows that. Don't use this option unless you can back it with arithmetic, even rough.

### Recommendation
**Option A (2,6-ANS, keep DEXSORB+) is the strongest choice for a design-stage entry with no lab access.** It's cheap, it's a direct response to a named paper, it keeps the preconcentration architecture (your actual sensitivity argument, see §4) intact, and it's the one every source in the research pack points toward as the "best" response (see docs/research-2026-08.md §2.3, §9 Q2). Flag Option B as the scientifically purer answer but the one you'd only pursue with real lab time and a supply chain for a γ-CD or methylated-β-CD adsorbent — worth raising with the mentor as a "if we had six more months" question, not a September deliverable.

---

## 4. The preconcentration argument — this should lead, regardless of dye choice

Whichever dye/host pairing you land on, this is the point that should open the technical narrative, not the dye chemistry:

**DEXSORB's job in the architecture is preconcentration, not just hosting.** Cyclopure (the maker) claims up to **~500,000× concentration** of PFAS from a sample onto the adsorbent. That is the step that plausibly bridges the sensitivity gap between "what a fluorescent dye can resolve in solution" and "what the DWI's non-statutory guideline (0.1 µg/L) requires you to distinguish." Look at the comparison table in `docs/research-2026-08.md` §2.2: almost every published fluorescence PFAS sensor sits *above* the 0.1 µg/L threshold — the leading 2025 on-site system (BODIPY-MIP microfluidic, *Nat. Commun.* 2025) is **455× above it**. The two systems that do reach below the threshold (the Han et al. β-CD dye array at 31–38 ng/L, and an amplifying-fluorescent-polymer system at 0.08 ppb) do it with fundamentally more elaborate instrumentation than a single dye in a cuvette.

**No published academic sensor in this space includes a preconcentration step like DEXSORB's.** That is genuinely novel to your design, and it's the honest reason a cheap, simple dye-based readout might still get somewhere near a useful detection limit even though the dye chemistry alone, on the numbers above, would not. Frame it this way to the mentor and in any write-up: *the dye is a solved-elsewhere, swappable component; the preconcentration step is the actual engineering contribution.* That framing survives the 1,8-ANS problem intact, because it was never resting on the dye being special.

---

## 5. The selectivity problem — state it plainly, don't dodge it

PFAS are anionic surfactants. So is a sulfonated dye like ANS being displaced by *any* hydrophobic anion — including things you don't want to be measuring: **SDS (sodium dodecyl sulfate), SDBS (sodium dodecylbenzenesulfonate), and humic acids** are all plausible false-positive drivers in real environmental samples, and none of that is specific to your dye choice — it's a property of a single-dye displacement assay full stop.

Every published system that has actually achieved chemical selectivity for PFAS over other anionic surfactants uses **an array of multiple dyes plus pattern-recognition/machine-learning classification**, not one dye read at one wavelength. The clearest example: **Han et al., *Analytica Chimica Acta*, 2025, 1377, 344680** — a β-cyclodextrin-polymer sensor using **four dyes** (NPN, AFR, CC, PR — NPN being N-phenyl-1-naphthylamine, an anilinonaphthalene in the same chromophore family as ANS) combined with a trained classifier, reaching an LOD of **31–38 ng/L** for PFOA/PFOS specifically, distinguishing them from interferents by the *pattern* of response across the four dyes, not the absolute signal from any one.

**A single-dye assay cannot do that.** What it measures is closer to total hydrophobic-anion burden in the sample than PFAS concentration specifically.

**This is why "risk score" rather than "concentration" is the correct framing, not a hedge.** If the output claims to be a PFAS concentration, the SDS/humic-acid interference is a fatal flaw a chemistry academic will find in one question. If the output is explicitly a *screening risk score* — "this sample shows elevated hydrophobic-anion displacement activity and is prioritised for LC-MS/MS confirmation" — then cross-reactivity with other surfactants is an expected, disclosed property of a triage instrument, not a hidden defect. The escalation to accredited lab analysis is exactly what catches a false positive before anyone acts on it. Own this distinction actively in how you describe the product; don't wait for it to be raised.

---

## 6. The supply-chain issue

DEXSORB/DEXSORB+ is a single-source product from **Cyclopure**, a US company. There is **no evidence anywhere on Cyclopure's product pages of UK or international distribution or availability** (checked directly — see `docs/research-2026-08.md` §2.4). If the plan depends on sourcing DEXSORB+ from the US for a UK-based competition entry (and eventually product), that's a live, unaddressed logistics and cost risk — shipping, import/customs handling of a chemical adsorbent product, lead time, and no local support.

Separately, worth knowing for the mentor call: **Wilfred Dichtel**, the academic behind the underlying β-cyclodextrin polymer chemistry (Wang, Lin, Klemes, Ateia, Trang, Wang, Ching, Helbling, Dichtel, *ACS Cent. Sci.* 2022, 8(5), 663–669 — the peer-reviewed foundation, which is genuinely solid science), **holds disclosed equity in Cyclopure**. That's not a reason to distrust the underlying chemistry — the *ACS Cent. Sci.* paper stands on its own peer-reviewed merits — but it does mean "DEXSORB" as a brand is not itself a scientific claim, and it's worth being able to say so if asked.

**The practical point: generic β-cyclodextrin polymers are commercially available from multiple suppliers, not just Cyclopure.** The underlying chemistry (porous β-CD polymer for anionic-surfactant/PFAS adsorption) is documented in the open literature independent of the DEXSORB brand. Worth naming a generic alternative supplier as a backup in any risk-register slide, so the answer to "what if you can't get DEXSORB in the UK" isn't a blank.

---

## 7. Six questions for the mentor on Wednesday

Phrased so a chemistry academic can answer usefully in the time available:

1. **"Given Ka ≈ 50–195 M⁻¹ for 1,8-ANS/β-CD (Sueishi et al. 2013), is that binding strength usable at all for a displacement assay, or does it put us below a threshold where the signal-to-noise is simply not workable in an aqueous environmental matrix?"** — you want a gut-check on whether this is "harder but doable" or "not viable as specified," from someone who's run binding assays.

2. **"If we switch to 2,6-ANS with β-CD/DEXSORB+, is there anything about the 2,6 substitution pattern that would make it behave differently toward PFAS specifically, versus just binding the cavity more tightly in general?"** — i.e., does tighter baseline binding to the *cavity* actually guarantee better PFAS-driven *displacement*, or could a too-tight complex be harder to displace and therefore less sensitive in the other direction?

3. **"Is there a rough way to estimate, even to an order of magnitude, whether DEXSORB's preconcentration factor (claimed ~500,000×) is plausibly enough to offset a weak Ka at the sensing step, or is that comparing two things that don't actually trade off against each other the way we're assuming?"** — this tests the load-bearing assumption in §4 before you put it on a poster.

4. **"For an anionic-surfactant interference problem (SDS, SDBS, humic acids) in a single-dye assay, is there a cheap sample-pretreatment step (e.g. a selective wash, pH adjustment, or a simple counter-adsorbent) that could reduce cross-reactivity without needing a full multi-dye array?"** — looking for a low-cost partial mitigation short of Han et al.'s four-dye/ML approach.

5. **"Is methylated β-cyclodextrin (e.g. heptakis-methyl-β-CD) likely to accommodate 1,8-ANS meaningfully better than native β-CD, given the paper's finding that cavity size/geometry is the limiting factor — or is the naphthalene simply too large for any β-CD-family cavity regardless of methylation?"** — resolves whether Option B's "methylated β-CD" branch is worth pursuing at all.

6. **"Realistically, for a September design-stage deliverable with no lab access, is the strongest scientific story 'we identified the mismatch and specified a corrected design' or is there a fast, low-cost bench experiment (departmental access, an afternoon) that could give us even one real fluorescence measurement to anchor the story in data rather than literature alone?"** — this is the highest-value practical question; see §8.

---

## 8. What to actually do before September

Ordered by value, given no lab access and no bench data currently exists. This is a design-stage competition entry — the standard here is "did you identify the right problem and specify a defensible response," not "did you generate original binding constants."

1. **Update the design spec now: switch to 2,6-ANS as the primary reporter dye, keep DEXSORB+.** This costs nothing but a document edit and is the single highest-value change available before Wednesday. Cite the mechanism: Sueishi et al. 2013 Ka values, and the July 2026 paper's geometric explanation for why. Do this before the mentor call so you're presenting a decision, not a problem.

2. **Rewrite the "science" section/slide to lead with preconcentration (§4), not dye affinity.** This is the actual novel engineering claim and it survives scrutiny of the dye chemistry entirely. Right now (per the factsheet and research pack) the framing under-emphasises this.

3. **Reframe every mention of assay output from "PFAS concentration" to "risk score" / "screening priority."** This is a documentation and framing change, costs nothing, and closes the selectivity objection (§5) before anyone raises it. Check this is consistent across the site copy and any pitch deck language — Aegis's own `Why.tsx` page apparently already does this correctly in places (per the research pack), so make sure the chemistry pages match.

4. **Ask if there's a same-department fluorimeter and five minutes of instrument time.** You don't need a full validation study — even one qualitative measurement (does 2,6-ANS + β-CD show a visible fluorescence shift on adding a PFAS surrogate like PFOA, versus 1,8-ANS under the same conditions) would be actual primary data, and "we ran one comparative measurement" beats "we read two papers" in a judged setting. This is Q6 above — ask the mentor if this is remotely feasible on their kit. If genuinely not possible, don't force it; the literature-based redesign in point 1 is a legitimate and creditable answer on its own.

5. **Add a one-paragraph risk-register entry for the DEXSORB supply chain (§6)**, including the generic-β-CD-polymer fallback. Cheap, closes an obvious gap, shows you've thought about productionisation beyond the chemistry.

6. **Do not attempt to build or claim a multi-dye array before September.** Han et al.'s four-dye/deep-learning system is the state of the art and is out of scope for a solo undergraduate chemist with no lab time. The correct move is to *name* it as the field's answer to selectivity (§5) and explain why Aegis's single-dye risk-score framing is the appropriate simplification for a triage tool rather than a compliance instrument — not to attempt to replicate it.

**The strongest outcome for Wednesday and for the competition is the same thing: walk in already having changed the dye, already reframed the sensitivity story around preconcentration, and already reframed the output as a risk score.** That's a design that visibly responded to a paper published two weeks ago — which is a better story than a design that happened to be right, and much better than one defended without having read the literature.
