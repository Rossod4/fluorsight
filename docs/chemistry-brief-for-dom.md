# Chemistry brief for Dom — the ANS/cyclodextrin question

*Prepared 2 August 2026. **Substantially corrected 3 August 2026** after Dom confirmed the actual probe.*

> # 🟢 CORRECTION — THE PROBLEM THIS BRIEF DESCRIBED DOES NOT EXIST
>
> **This brief was written on the assumption that the probe is 1,8-ANS. It is not. Dom confirmed
> the team is using 2,6-ANS, and that changes the conclusion completely — in your favour.**
>
> The wrong isomer entered the project record in `research-factsheet.md` on 9 July and every
> document downstream inherited it, including the message asking Dom to reconsider his design.
> Nobody on the team got this wrong; the documentation did.
>
> **What the 17 July 2026 paper actually says**, verified against the published abstract:
>
> > "Fluorescence titrations indicated that **2,6-ANS binds most strongly to β-CD**, whereas
> > 8,1-ANS binds most strongly to γ-CD, while ITC places the 8,1-ANS γ-CD interaction among the
> > weakest of the complexes studied."
>
> So the paper that this brief presented as a threat is, for the probe you are actually using, an
> **endorsement**. 2,6-ANS + β-cyclodextrin is the strongest native-host pairing the paper
> identifies, and DEXSORB+ is a β-cyclodextrin polymer. Sueishi et al. (2013) agree: **2,6-ANS
> K = 80–11,700 M⁻¹** against **1,8-ANS K = 50–195 M⁻¹**, roughly two orders of magnitude apart.
>
> **Consequences:**
> - §1–§3 below describe a mismatch that does not apply to your design. Read them only to
>   understand why 1,8-ANS would have been the wrong choice — which is now a point in your favour
>   and worth one line on the poster.
> - "Option A" was to switch to 2,6-ANS. You are already there. There is nothing to switch.
> - The dynamic-range, reproducibility and LOD concerns in §2 were premised on
>   Ka ≈ 50–195 M⁻¹. At up to 11,700 M⁻¹ they are materially reduced, though not zero — see the
>   note on the width of that range below.
> - **§4 (preconcentration), §5 (selectivity) and §6 (supply chain) are unaffected and still
>   stand.** Those are the real open issues.
>
> **The one caveat worth keeping.** Sueishi's 2,6-ANS range spans 80–11,700 M⁻¹ — about 150-fold,
> depending on which cyclodextrin and what conditions. The top of that range is for the modified
> hosts (2,6-di-O-methyl-β-CD and CB[7]), not native β-CD. So "2,6-ANS binds β-CD well" is right,
> but pin down the figure for *native* β-CD specifically before putting a number on a poster.
>
> **Dom's proposed improvement path is confirmed and stronger than he stated** — see the new §9.

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

> ### 🔴 CORRECTION — 3 August 2026. Read this before using the 500,000× figure anywhere.
>
> An earlier version of this brief, and the research pack, cited Cyclopure's "**up to ~500,000×
> concentration**" as the preconcentration factor. **That is the wrong number for this argument
> and using it in front of a chemist would be badly damaging.**
>
> - The 500,000× figure comes from Cyclopure's **water treatment / remediation** line. It
>   describes how far the *waste volume* is reduced when concentrating PFAS out of a large volume
>   of contaminated water for destruction. It is not an analytical preconcentration factor.
> - The **Water Test Kit** passes **250 mL** through the DEXSORB disc. Analytical preconcentration
>   is the load volume divided by the elution volume: 250 mL into roughly 1 mL is about **250×**.
>   A purpose-built 1 L field protocol eluted into 0.5 mL would give about **2,000×**.
>
> **Do not say 500,000×.** Say: *"250 mL through the disc, eluted into about a millilitre — call it
> a few hundred fold, and up to a couple of thousand if we design the field protocol around a
> larger sample volume."* Then state the volumes, because a chemist will ask for them.
>
> The argument still works at 250–2,000×; see the recalculated numbers below. It is a weaker claim
> than the one we started with, but it is a true one, and it is checkable.

**DEXSORB's job in the architecture is preconcentration, not just hosting.** A realistic analytical
preconcentration factor of **250–2,000×** (see the correction above) is the step that plausibly
bridges part of the sensitivity gap between "what a fluorescent dye can resolve in solution" and "what the DWI's non-statutory guideline (0.1 µg/L) requires you to distinguish." Look at the comparison table in `docs/research-2026-08.md` §2.2: almost every published fluorescence PFAS sensor sits *above* the 0.1 µg/L threshold — the leading 2025 on-site system (BODIPY-MIP microfluidic, *Nat. Commun.* 2025) is **455× above it**. The two systems that do reach below the threshold (the Zha et al. β-CD dye array at 31–38 ng/L, and an amplifying-fluorescent-polymer system at 0.08 ppb) do it with fundamentally more elaborate instrumentation than a single dye in a cuvette.

### The arithmetic, done honestly

Work it forwards from the guideline rather than backwards from a marketing number. The EU/DWI
value is **0.1 µg/L = 100 ng/L**. Preconcentration multiplies what arrives at the detector:

| Preconcentration | 100 ng/L becomes | Detector sensitivity you then need |
|---|---|---|
| 250× (250 mL → 1 mL, the actual kit) | 25 µg/L | Must resolve ~25 µg/L |
| 1,000× (1 L → 1 mL) | 100 µg/L | Must resolve ~100 µg/L |
| 2,000× (1 L → 0.5 mL) | 200 µg/L | Must resolve ~200 µg/L |

Now compare against what fluorescence actually achieves:

- **FREDsense** commercial field kit, ~1 µg/L → clears the guideline at only ~10× preconcentration.
  At 250× you would have roughly two orders of magnitude of headroom.
- **BODIPY-MIP microfluidic** (*Nat. Commun.* 2025), ~45 µg/L → needs ~450×, i.e. a **1 L** field
  protocol, not the 250 mL kit.
- A **single dye in a cuvette** with a weak host–guest Ka is the least sensitive option of all, and
  we have no measured figure for it. This is the honest gap.

**Two conclusions to take to the mentor.** First, the sample volume is a design parameter that
buys sensitivity linearly and cheaply — it deserves to be stated explicitly rather than inherited
from Cyclopure's kit. Second, and more strategically: if the achievable detector sensitivity is
poor, the defensible product is **not** a guideline-level screen but an **AFFF source-zone screen**
operating at 10 µg/L to mg/L, where concentrations are orders of magnitude higher. That is worth
raising on Wednesday — it also happens to be exactly where the risk engine already puts its
heaviest site weight (firefighting foam / airfield, 10 points).

**No published academic sensor in this space includes a preconcentration step like DEXSORB's.** That is genuinely novel to your design, and it's the honest reason a cheap, simple dye-based readout might still get somewhere near a useful detection limit even though the dye chemistry alone, on the numbers above, would not. Frame it this way to the mentor and in any write-up: *the dye is a solved-elsewhere, swappable component; the preconcentration step is the actual engineering contribution.* That framing survives the 1,8-ANS problem intact, because it was never resting on the dye being special.

---

## 5. The selectivity problem — state it plainly, don't dodge it

PFAS are anionic surfactants. So is a sulfonated dye like ANS being displaced by *any* hydrophobic anion — including things you don't want to be measuring: **SDS (sodium dodecyl sulfate), SDBS (sodium dodecylbenzenesulfonate), and humic acids** are all plausible false-positive drivers in real environmental samples, and none of that is specific to your dye choice — it's a property of a single-dye displacement assay full stop.

Every published system that has actually achieved chemical selectivity for PFAS over other anionic surfactants uses **an array of multiple dyes plus pattern-recognition/machine-learning classification**, not one dye read at one wavelength. The clearest example: **Zha et al., *Analytica Chimica Acta*, 2025, 1377, 344680** — a β-cyclodextrin-polymer sensor using **four dyes** (NPN, AFR, CC, PR — NPN being N-phenyl-1-naphthylamine, an anilinonaphthalene in the same chromophore family as ANS) combined with a trained classifier, reaching an LOD of **31–38 ng/L** for PFOA/PFOS specifically, distinguishing them from interferents by the *pattern* of response across the four dyes, not the absolute signal from any one.

**A single-dye assay cannot do that.** What it measures is closer to total hydrophobic-anion burden in the sample than PFAS concentration specifically.

**This is why "risk score" rather than "concentration" is the correct framing, not a hedge.** If the output claims to be a PFAS concentration, the SDS/humic-acid interference is a fatal flaw a chemistry academic will find in one question. If the output is explicitly a *screening risk score* — "this sample shows elevated hydrophobic-anion displacement activity and is prioritised for LC-MS/MS confirmation" — then cross-reactivity with other surfactants is an expected, disclosed property of a triage instrument, not a hidden defect. The escalation to accredited lab analysis is exactly what catches a false positive before anyone acts on it. Own this distinction actively in how you describe the product; don't wait for it to be raised.

---

## 6. The supply-chain issue

DEXSORB/DEXSORB+ is a single-source product from **Cyclopure**, a US company. There is **no evidence anywhere on Cyclopure's product pages of UK or international distribution or availability** (checked directly — see `docs/research-2026-08.md` §2.4). If the plan depends on sourcing DEXSORB+ from the US for a UK-based competition entry (and eventually product), that's a live, unaddressed logistics and cost risk — shipping, import/customs handling of a chemical adsorbent product, lead time, and no local support.

Separately, worth knowing for the mentor call: **Wilfred Dichtel**, the academic behind the underlying β-cyclodextrin polymer chemistry (Wang, Lin, Klemes, Ateia, Trang, Wang, Ching, Helbling, Dichtel, *ACS Cent. Sci.* 2022, 8(5), 663–669 — the peer-reviewed foundation, which is genuinely solid science), **holds disclosed equity in Cyclopure**. That's not a reason to distrust the underlying chemistry — the *ACS Cent. Sci.* paper stands on its own peer-reviewed merits — but it does mean "DEXSORB" as a brand is not itself a scientific claim, and it's worth being able to say so if asked.

**The practical point: generic β-cyclodextrin polymers are commercially available from multiple suppliers, not just Cyclopure.** The underlying chemistry (porous β-CD polymer for anionic-surfactant/PFAS adsorption) is documented in the open literature independent of the DEXSORB brand. Worth naming a generic alternative supplier as a backup in any risk-register slide, so the answer to "what if you can't get DEXSORB in the UK" isn't a blank.

---

## 9. Added 4 August 2026 — answers to Dom's reply

### 9.1 Your positioning call is right, and now better supported than when you made it

You said: don't reposition wholesale to AFFF source-zone, keep the guideline-level goal, name AFFF
as a fallback market that is feasible today, and propose specific improvements to reach lower
detection limits. **Agreed, and the isomer correction strengthens that.** The sensitivity argument
against you was built on Ka ≈ 50–195 M⁻¹, which was the wrong compound. It also fits the challenge
brief, which asks teams to "demonstrate a tangible path toward real-world impact, even if not
market-ready" — a credible improvement path is the deliverable, not a finished instrument.

Structure it on the poster as: **where we are → the path to the guideline → the market that works
even if we don't get there.** That reads as risk-managed rather than hedged.

### 9.2 Your methylation claim is confirmed, and it's bigger than you said

Verified against two primary sources:

- **Methyl-β-CD enhances ANS fluorescence ~120-fold, against ~8.4-fold for unmodified β-CD**
  ([Sci. Direct, modified β-CDs](https://www.sciencedirect.com/science/article/abs/pii/S101060309800210X)).
  That is roughly a **14× improvement in enhancement factor**, not just 80–120× in absolute terms.
- **Sueishi et al. 2013** ([PubMed 23786974](https://pubmed.ncbi.nlm.nih.gov/23786974/)):
  *"The Φ values of 1,8- and 2,6-ANSs were largely enhanced by the inclusion of methylated β-CDs"*
  — so it applies to your isomer — and *"the highest stability constants were observed for 2,6-ANS
  with **CB[7]** and **2,6-di-O-methylated β-CD**"*. Your proposed modification is simultaneously
  the best-binding and among the brightest options in that study.

**One subtlety worth having ready, because it's the kind of thing a chemist tests you on.** The same
paper notes the quantum-yield enhancement *"did not correlate with the degree of stability (K)"* —
brightness and binding strength improve independently. So you cannot argue "tighter binding,
therefore better signal"; they are two separate wins from the same modification. Saying that
unprompted signals you read the paper properly.

**Also worth a line:** cucurbit[7]uril (CB[7]) is the other high-affinity host in that study, and
there is literature on β-CD *dimers* showing cooperative inclusion of 2,6-ANS specifically
([Beilstein J. Org. Chem. 2015, 11, 58](https://www.beilstein-journals.org/bjoc/articles/11/58)).
Three named modification routes is a stronger "next steps" panel than one.

**Temperature** — your other suggestion — is real and doubly useful. Lower temperature raises
fluorescence quantum yield (less non-radiative decay) *and* generally strengthens host–guest
association. It also connects to Evan's note that temperature should be a recorded input: it is
both a **correction factor** for field variability and a **controllable design parameter**. Worth
saying explicitly, because it shows the software and the chemistry were designed together.

### 9.3 The machine learning question — how those arrays actually work

You asked. Here it is, and I think it is the strongest "next steps" material you have.

**The principle is cross-reactive sensing.** You do not build one probe that is specific to PFOA.
You build several probes that are each *non*-specific but respond *differently* — and identify the
analyte from the **pattern** across the array rather than from any single reading. It is closer to
how smell works than to how a titration works: no single receptor identifies coffee, but the
combination across many receptors does.

**What Zha et al. built** ([Anal. Chim. Acta 2025, 1377, 344680](https://doi.org/10.1016/j.aca.2025.344680)):

- A **4 × 6 array** — four β-CD-polymer/dye complexes (β-CDP-NPN, β-CDP-CC, β-CDP-AFR, β-CDP-PR)
  against six PFAS.
- Mechanism is **static fluorescence quenching** on adsorption; each PFAS quenches the four dyes in
  different proportions because of differing adsorption affinities. That ratio *is* the fingerprint.
- **Linear discriminant analysis (LDA)** for discrimination and quantification — LDA finds the axes
  that best separate known classes, so a 4-number response vector collapses onto a plot where each
  PFAS forms its own cluster.
- Plus a **modular deep-learning platform** for quantification, reported at **0.66% relative error
  against LC-MS** in surface water.
- **LOD 38 ng/L PFOA, 31 ng/L PFOS**; classifies binary to quaternary mixtures at µg/L.

Note the modest ambition of the maths. **LDA is a classical statistical method, not a neural
network** — it needs tens of training samples, not thousands. That matters: the credible version of
this is reachable by a student team, and you should say so rather than gesturing at "AI".

### 9.4 Why this fits Aegis specifically — and it does, unusually well

Most teams proposing a sensor array have nowhere to put the classifier. **You already have the
software layer**, with a working explainable scoring engine, a data model and an audit trail. The
array is a natural extension of a thing you have already built and can demonstrate.

The roadmap writes itself:

| | Today | Next |
|---|---|---|
| Chemistry | One probe (2,6-ANS + β-CD) | 3–4 probes on modified β-CDs |
| Output | Total hydrophobic-anion burden | Response pattern per sample |
| Interpretation | Risk score | LDA classification → substance, then risk score |
| Substance identity | Prior from public contamination maps | Measured from the array |
| Selectivity | None claimed — that is why we escalate | Discrimination from pattern, cited precedent |

This also resolves the tension in Evan's "type of PFAS" idea honestly. Today you infer likely
substance from what public records show is *in the area*. With an array you would eventually
*measure* it. Same destination, two credible stages, and you are explicit about which one you are
at.

**Keep the caveats visible.** Zha et al. used lab-prepared samples, four purpose-built probe
complexes, and a trained model per analyte set; matrix effects in real groundwater are unaddressed;
and their LOD is the single best result in the field, so do not adopt it as your expected
performance. The claim to make is *"there is a published route from a single non-specific probe to
substance discrimination, and our software architecture is already the half of it that most sensor
projects lack"* — not that you will match 31 ng/L.

### 9.5 Your answers to the six questions

- **Q1, Q2 (binding strength, 2,6 substitution):** superseded — you are on 2,6-ANS and the 2026
  paper endorses it with β-CD. Ask the mentor instead to pin the Ka for **native** β-CD
  specifically, since Sueishi's 80–11,700 M⁻¹ range spans modified hosts too.
- **Q3 (preconcentration):** was built on the wrong 500,000× figure. The real question is now:
  *"is 250–2,000× preconcentration enough to bring a source-zone concentration into range for a
  single-probe fluorescence readout?"*
- **Q4 (cheap pretreatment for surfactant interference):** you said you'd look into this — agreed,
  it is the most valuable of the six. A selective wash or pH adjustment that suppresses SDS/humic
  response would be a real contribution and is cheap to propose.
- **Q5 (methylated β-CD):** answered above, and confirmed. Now a "next steps" item, not a question.
- **Q6 (bench experiment):** you said no, Evan needs to build first. Fine — but see
  `highest-value-actions.md`. Getting five people outside the team to *use the prototype* is the
  cheap substitute and closes a rubric criterion that currently scores zero.

---

## 7. Six questions for the mentor on Wednesday

Phrased so a chemistry academic can answer usefully in the time available:

1. **"Given Ka ≈ 50–195 M⁻¹ for 1,8-ANS/β-CD (Sueishi et al. 2013), is that binding strength usable at all for a displacement assay, or does it put us below a threshold where the signal-to-noise is simply not workable in an aqueous environmental matrix?"** — you want a gut-check on whether this is "harder but doable" or "not viable as specified," from someone who's run binding assays.

2. **"If we switch to 2,6-ANS with β-CD/DEXSORB+, is there anything about the 2,6 substitution pattern that would make it behave differently toward PFAS specifically, versus just binding the cavity more tightly in general?"** — i.e., does tighter baseline binding to the *cavity* actually guarantee better PFAS-driven *displacement*, or could a too-tight complex be harder to displace and therefore less sensitive in the other direction?

3. **"Is there a rough way to estimate, even to an order of magnitude, whether DEXSORB's preconcentration factor (claimed ~500,000×) is plausibly enough to offset a weak Ka at the sensing step, or is that comparing two things that don't actually trade off against each other the way we're assuming?"** — this tests the load-bearing assumption in §4 before you put it on a poster.

4. **"For an anionic-surfactant interference problem (SDS, SDBS, humic acids) in a single-dye assay, is there a cheap sample-pretreatment step (e.g. a selective wash, pH adjustment, or a simple counter-adsorbent) that could reduce cross-reactivity without needing a full multi-dye array?"** — looking for a low-cost partial mitigation short of Zha et al.'s four-dye/ML approach.

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

6. **Do not attempt to build or claim a multi-dye array before September.** Zha et al.'s four-dye/deep-learning system is the state of the art and is out of scope for a solo undergraduate chemist with no lab time. The correct move is to *name* it as the field's answer to selectivity (§5) and explain why Aegis's single-dye risk-score framing is the appropriate simplification for a triage tool rather than a compliance instrument — not to attempt to replicate it.

**The strongest outcome for Wednesday and for the competition is the same thing: walk in already having changed the dye, already reframed the sensitivity story around preconcentration, and already reframed the output as a risk score.** That's a design that visibly responded to a paper published two weeks ago — which is a better story than a design that happened to be right, and much better than one defended without having read the literature.
