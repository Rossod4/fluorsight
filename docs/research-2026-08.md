# Aegis Research Refresh — August 2026

*Compiled 2 August 2026. Supersedes nothing; supplements `research-factsheet.md` (9 July 2026). Every claim tagged:*

- **[P]** verified against a primary source (legislation, regulator/parliament publication, peer-reviewed paper, company's own site)
- **[S]** verified against a secondary source only (trade press, market-research summary)
- **[C]** sources conflict
- **[NV]** NOT VERIFIED — what was tried is stated

**Two things to read first if you read nothing else:** §7 (audit) lists a hard internal contradiction between the cost model and the revenue model that a judge will find in about thirty seconds. §2.3 contains a chemistry finding published **17 July 2026** — eight days after the last factsheet — that directly undermines the specific 1,8-ANS + β-cyclodextrin pairing.

---

## 1. UK PFAS lab pricing

### 1.1 The headline result

**A real UK GBP per-sample figure exists, and it is higher than the £250 the model assumes.**

> "Taking the 1.5 million homes target over the life of this parliament and assuming ⅔ are on land potentially affected by PFAS contamination and 1 soil sample being tested per house would require 1,000,000 samples at a rough cost of **£350 per sample** — a total of £350,000,000 just for the soil analysis — no allowance made for water pollution or risk assessment let alone remediation or the extra effort to avoid cross-contamination and to decontaminate between sample locations that **adds 25% to the time for a site investigation**."

— **Environmental Industries Association**, written evidence **PFAS0121** to the House of Commons Environmental Audit Committee inquiry *Addressing the risks from PFAS*, **May 2025**. Lead author **Prof. Paul Nathanail** (author of CIRIA C819, the UK good-practice guidance on PFAS in soil and water), with Dr Ken Scally, Matthew Lawman, Michael Lunn, Peter Atchison. **[P]**
https://committees.parliament.uk/writtenevidence/142255/html/

Why this is the best available source:
- It is **UK**, in **GBP**, **dated**, and **publicly citable** with a parliamentary evidence reference.
- It comes from the **trade body for the remediation and environmental-testing sector** — i.e. the exact buyers Aegis is targeting — not from a lab's marketing page.
- It is a **soil** figure. Water is typically cheaper than soil, so £350 is an upper bound for the Aegis use case, not a lower one.

Caveats to state openly: the author calls it a "rough cost"; it is a planning-level figure used to make a policy argument about laboratory capacity, not a rate card; and it is a single trade-body estimate, not a market survey.

### 1.2 Supporting UK cost context (all primary)

| Figure | Value | Source |
|---|---|---|
| Lab capital to add PFAS LC-MS/MS capability | **~£250,000** | EIA, PFAS0121, May 2025 **[P]** |
| Lab capital for high-resolution MS (non-targeted PFAS) | **~£500,000** | EIA, PFAS0121, May 2025 **[P]** |
| Site-investigation time penalty from PFAS anti-cross-contamination protocols | **+25%** | EIA, PFAS0121, May 2025 **[P]** |
| Private PFAS **blood** test (individual, not environmental) | **~£750/test** | EAC report, Bentham roundtable note, Apr 2026 **[P]** |
| Advanced contaminated-land soil sample (heavy metals/hydrocarbons — *not* PFAS) | £100–£300 | MyBuilder price guide, 2026 **[S]** — useful only to show PFAS carries a premium |

### 1.3 What was tried and failed — state this if challenged

- **No UK lab publishes a PFAS rate card.** Checked ALS, SOCOTEC, Eurofins, RPS, Normec DETS, Veritas, Marchwood/Cawood. All quote-only. **[P — verified by absence across seven providers]**
- **Environment Agency National Laboratory Service** price list: not publicly published. **[NV]**
- **Water-company PR24 submissions to Ofwat** (Anglian Water `ANH_DD_060 PFAS Uncertainty at PR24`; Affinity Water `AFW135`): both discuss "additional analytical costs per sample" as a named cost pressure but **give no per-sample GBP rate**. Full text of both PDFs extracted and searched. **[P — verified absent]**
  - Affinity Water does give **treatment** economics: **£2m per Ml/d**, average **£13m per site** across its 67 remaining Tier 1 sites. **[P]** Useful as "cost of being wrong" framing.
- **Private water supply statutory fee schedules** (Lancaster, Darlington, Dorset, West Devon, Cumberland): these publish real GBP analysis charges, but **PFAS is specifically excluded from cost recovery** — Schedule 5 of the Private Water Supplies Regulations only covers Schedule 1 Parts 1 and 2 parameters. **[S]** **This is a genuinely useful finding for §5**: a council that tests a private supply for PFAS **cannot recover the cost**, so every PFAS sample is a direct hit to the environmental-health budget. That is a sharper economic argument than anything currently on the site.
- **Contracts Finder / Find a Tender**: the only PFAS-specific award located is EA *Landfill Gas Sampling Methodology Development (PFAS) WP2*, **£108,770.75 ex VAT**, signed 24 Oct 2025 — a methodology R&D contract with no per-sample breakdown. **[P]** https://www.find-tender.service.gov.uk/Notice/071958-2025

### 1.4 Recommendation

Replace the €175–300 Measurlabs proxy as the headline with **£350/sample (EIA to Parliament, May 2025)**, and keep the EU figure as a cross-check. Then either:
- **(a)** raise the model to £350 and state it is the only public UK figure; or
- **(b)** keep £250 and say explicitly *"we model at £250, which is **29% below** the only published UK figure (£350, Environmental Industries Association to the Environmental Audit Committee, May 2025), so our savings estimate is deliberately conservative."*

**(b) is the stronger pitch move** — it converts an unsourced number into a demonstrably conservative one. Do not leave "€175–300" and "£250" side by side; they disagree and it looks careless.

---

## 2. The science

### 2.1 Does 1,8-ANS + cyclodextrin for PFAS have precedent? No — confirmed rigorously

Searched: ANS/PFAS displacement, cyclodextrin PFAS sensing, indicator-displacement assays for PFAS, DEXSORB/CycloPure publications, ANS–cyclodextrin binding literature. **There is no peer-reviewed paper using 1,8-ANS as the reporter dye for PFAS detection.** The factsheet's original claim stands. **[P — verified by absence]**

But the gap is narrower and more defensible than "no precedent":

**The closest precedent uses a near-structural-analogue of your dye.** Zha et al.'s β-cyclodextrin-polymer sensor array uses four dyes — **NPN (N-phenyl-1-naphthylamine)**, AFR, CC, PR. NPN is an **anilinonaphthalene**, the same chromophore family as 1,8-ANS, working by the same solvatochromic hydrophobic-cavity mechanism. So the honest framing is not "our dye is untested" but **"the published β-CD array already uses an anilinonaphthalene reporter; we are proposing a sulfonated member of the same family."** That is a materially stronger sentence than what is on the site today.

### 2.2 The precedent table — with LODs converted to regulatory units

This is the single most useful artefact in this document. Build it into the poster.

| System | Reporter / mechanism | Reported LOD | **In µg/L** | vs DWI 0.1 µg/L | Citation |
|---|---|---|---|---|---|
| β-CD polymer + 4-dye array + deep learning | NPN, AFR, CC, PR — competitive displacement | 38 ng/L PFOA; 31 ng/L PFOS | **0.038 / 0.031** | **Below limit** ✓ | Zha J, Liu F, Ma M, Zhou Y, Shen Y, Sun L, Su J, Hu C, Wang S, Cui P. "Integrating cyclodextrin fluorescence sensing array and machine learning for rapid screening and detection of perfluoroalkyl substances." *Anal. Chim. Acta* **2025**, 1377, 344680. DOI [10.1016/j.aca.2025.344680](https://doi.org/10.1016/j.aca.2025.344680) **[P — author list re-verified 3 Aug 2026; an earlier version of this table carried a FABRICATED author list ("Han Z, Rushlow J, Yang Y, Huo J, Zhou H-C"), which was wrong. Probes are β-CDP-NPN, β-CDP-CC, β-CDP-AFR, β-CDP-PR.]** |
| FREDsense FRED-PFAS field kit (**commercial**) | Electrochemical biosensor | 1,000 ppt | **1.0** | 10× above | [fredsense.com](https://fredsense.com/pfas-home/pfas-field-kit/) **[P]** |
| Guanidinocalix[5]arene + fluorescein IDA | Indicator displacement | 26.4 nM PFOA; 21.4 nM PFOS | **~10.9 / ~10.7** | ~110× above | Nat. Commun. **2019**, 10, 5762. DOI [10.1038/s41467-019-13775-1](https://doi.org/10.1038/s41467-019-13775-1) **[P]** |
| Guanidine-BODIPY MIP + microfluidic (**2025 state of the art, on-site**) | Ion-pairing/H-bond turn-on, ratiometric | 0.11 µM PFOA | **~45.5** | ~455× above | Nat. Commun. **2025**. DOI [10.1038/s41467-025-66872-9](https://doi.org/10.1038/s41467-025-66872-9) **[P]** |
| Amplifying fluorescent polymers | Conjugated polymer | 0.08 ppb PFOA | **0.08** | Marginal ✓ | *JACS* **2023**. DOI [10.1021/jacs.3c03125](https://pubs.acs.org/doi/10.1021/jacs.3c03125) **[P]** |
| Accredited LC-MS/MS | — | ~0.7–2.8 ng/L (EPA 537.1) | **~0.001–0.003** | 30–100× below | Method spec **[S]** |

*(Molar→mass conversions computed here using PFOA 414.07 and PFOS 500.13 g/mol. Show the working if asked.)*

**What this table proves, and it is the strongest honest argument the team has:** almost every fluorescence sensor in the literature sits *above* the regulatory threshold — the 2025 Nature Communications on-site system is 455× above it. The two exceptions cluster right at the limit. **Therefore a fluorescence sensor cannot be a compliance instrument, and any product that claims otherwise is overselling.** That is precisely why the correct product is a triage layer, and why the preconcentration step matters more than the dye.

**Corollary the team must own:** the Zha et al. array is ~300× more sensitive than the next-best comparable system. Treat it as a promising outlier, not as your expected performance. If your pitch quietly assumes you will land at 38 ng/L, you are betting on the single most optimistic result in the field.

### 2.3 ⚠ The finding that most threatens the specific chemistry

**Chatzigiannis et al. (?)*, "Weakly interacting cyclodextrin complexes: an experimental and theoretical methodological assessment using two fluorescent anilinonaphthalenes", *Journal of Inclusion Phenomena and Macrocyclic Chemistry*, **published 17 July 2026, open access**, DOI [10.1007/s10847-026-01361-0](https://doi.org/10.1007/s10847-026-01361-0). **[P]**
*(Author list not rendered in the fetched HTML — retrieve before citing formally.)*

Findings that bear directly on the Aegis design:

1. **8,1-ANS binds most strongly to γ-cyclodextrin, not β.** "γ-CD [is] the only host, among those examined, that can fully accommodate the naphthalene group within its cavity." 8,1-ANS's extended geometry makes full inclusion in the smaller cavities unlikely.
2. **The binding is weak in absolute terms** — Ka on the order of 10²–10³ M⁻¹, in a regime the paper explicitly calls hard to measure. Corroborated by Sueishi et al., *Spectrochim. Acta A* **2013**, DOI [10.1016/j.saa.2013.05.052](https://doi.org/10.1016/j.saa.2013.05.052), which reports **1,8-ANS with β-CD at only ~50–195 M⁻¹**, versus 2,6-ANS at ~80–11,700 M⁻¹. **[P]**
3. **Weak binding distorts fluorescence readouts** — partial solvent exposure of a poorly-fitting guest "can lead to … distorted fluorescence readouts", and fluorescence "may over- or underestimate Ka if experiments are not carefully controlled."

**Why this matters:** DEXSORB/DEXSORB+ is a **β-cyclodextrin** polymer. The current, most-on-point literature says 1,8-ANS is a *poor* fit for β-CD and an order of magnitude weaker there than its 2,6 isomer. A displacement assay works by PFAS evicting the dye from the cavity; if the dye barely occupies the cavity to begin with, dynamic range and reproducibility both suffer.

**Three honest responses, in order of strength:**
- **Best:** treat this as a design input, not a defeat. Say the dye is a swappable parameter and that the July 2026 paper points to **2,6-ANS** (β-CD, up to ~11,700 M⁻¹) or a **γ-CD/methylated-β-CD** host as the better-matched pairing. Showing you read a paper published two weeks ago and changed your design because of it is a *strong* judging moment.
- **Good:** note the same paper's counterpoint — 8,1-ANS "shows little to no fluorescence in water but becomes highly fluorescent inside the cavity", and "even a small bound fraction of ANS produces a noticeable increase in emission, so very weak complexes that might go undetected by other methods can be observed." Weak binding is detectable; it is just noisy.
- **Necessary regardless:** DEXSORB's role in the architecture is **preconcentration**, not just hosting. Preconcentration, not dye affinity, is what plausibly bridges part of the sensitivity gap in the table above — and it is a step every one of those academic sensors lacks. Lead with this.
  > 🔴 **CORRECTED 3 Aug 2026.** This bullet previously cited Cyclopure's "~500,000× concentration". **That figure is from Cyclopure's water *treatment* line and describes waste-volume reduction during remediation — it is not an analytical preconcentration factor, and applying it here is a category error.** The Water Test Kit passes **250 mL** through the disc; eluted into ~1 mL that is **~250×**, or ~2,000× for a purpose-built 1 L protocol. The corrected arithmetic against real sensor LODs is in `chemistry-brief-for-dom.md` §4. At 250× the guideline (100 ng/L) presents as 25 µg/L, which a FREDsense-class sensitivity clears comfortably but the 2025 BODIPY-MIP system (~45 µg/L) does not — that one needs a 1 L protocol.

### 2.4 DEXSORB — supporting literature and supply reality

- Peer-reviewed foundation is solid: Wang R, Lin Z-W, Klemes MJ, Ateia M, Trang B, Wang J, Ching C, Helbling DE, **Dichtel WR**. "A Tunable Porous β-Cyclodextrin Polymer Platform to Understand and Improve Anionic PFAS Removal." *ACS Cent. Sci.* **2022**, 8(5), 663–669. **[P]** Also Ching et al., *Environ. Sci. Technol.* **2020**. Dichtel holds equity in Cyclopure (disclosed) — note this if a judge asks about independence.
- **Cyclopure Water Test Kit Pro is now $85, not $79** — 55 PFAS analytes incl. all 40 EPA Method 1633 compounds, LOQ 1.0 ppt, **10–14 business days** turnaround, DEXSORB extraction disc. **[P]** https://cyclopure.com/product/wtk/
- **No UK or international availability is stated anywhere on Cyclopure's product pages.** **[P — verified absent]** **This is a live supply-chain risk for Aegis** and nobody has flagged it: the adsorbent at the centre of the method is a single-source US product with no evidenced UK distribution. Have an answer ready, and ideally a named alternative (generic β-CD polymers are commercially available; the *Cyclopure* branding is not the science).

### 2.5 Sharpest questions a chemistry academic will ask

1. *"Your dye barely binds β-cyclodextrin — Ka around 50–195 M⁻¹. What is your dynamic range?"* → §2.3. Concede, cite the July 2026 paper, name 2,6-ANS/γ-CD as the design response.
2. *"PFAS are surfactants. So is your dye an anion. What stops any other anionic surfactant — SDS, SDBS, humic acids, detergent residues — producing the same displacement?"* → **This is the hardest question and there is no clean answer.** Selectivity in every published system comes from the array (multiple dyes + pattern recognition), not from one dye. A single-dye assay is a *non-specific hydrophobic-anion* sensor. Correct answer: Aegis is explicitly a **non-specific screen**, and its output is a *risk score*, not a concentration — which is exactly why the escalation decision goes to LC-MS/MS.
3. *"Zha et al. needed four dyes and deep learning to get selectivity. Why do you think one dye is enough?"* → It probably is not, for speciation. It may be enough for a total-hydrophobic-anion burden proxy. Say that.
4. *"What are you scoring against? There are no UK soil screening values for PFAS."* → Confirmed by the EIA itself: *"The absence of regulatory thresholds for PFAS (beyond the EQS for PFOS) in surface water impedes risk assessment and screening of PFAS."* **[P]** This is a real gap and it cuts both ways — it is a weakness in the scoring model *and* the clearest statement of why decision-support tooling is needed.
5. *"Your matrix is soil and groundwater at contaminated sites — high organic carbon, high ionic strength. Every LOD you quoted is from clean or spiked water."* → Concede. Matrix effects are the standard failure mode; this is what a pilot must test.
6. *"What is your false-negative rate, and who is liable for a missed exceedance?"* → See §7; this is a commercial-risk question dressed as chemistry.

---

## 3. Market sizing — what each number actually measures

### 3.1 Reconciling the four estimates

The order-of-magnitude spread is a **scope** artefact, as suspected:

| Source | Figure | What it actually measures |
|---|---|---|
| Fortune Business Insights | $439m (2026) → $1,037m (2034), 11.3% CAGR **[S]** | PFAS **testing services** — lab analysis revenue |
| MarketsandMarkets | $429.2m (2024) → $969.5m (2030), 14.5% CAGR **[S]** | PFAS **testing** — near-identical scope |
| Roots Analysis | $249m (2025) → $1,210m (2040) **[S]** | Testing, narrower analyte/region scope |
| Towards Healthcare | $538m (2025) → $2,091m (2035), 14.5% **[S]** | Testing, broader |
| Research and Markets | $3.23bn (2025) → $5.75bn (2030) **[S]** | **Testing + instrumentation + consumables** — includes LC-MS/MS hardware sales |

**Verdict:** the four "testing services" estimates actually converge well — **$430m–$540m for 2025/26, growing at 11–14.5% CAGR**. The $3.23bn outlier is a different thing entirely (it includes instrument sales). **The current site framing of "$439m–$3.6bn" is therefore misleading** — it presents a scope difference as if it were genuine uncertainty about the same quantity.

**Recommended replacement:** *"Global PFAS testing-services market: ~$430–540m (2025/26), 11–14.5% CAGR, converging across four independent houses. A fifth estimate of $3.23bn (2025) is not comparable — it includes instrumentation."* That is both more honest and more useful.

**Independent-corroboration note:** FBI ($439m/2026) and MarketsandMarkets ($429.2m/2024) agreeing to within ~2% is a genuinely good sign and worth saying out loud.

### 3.2 PFAS treatment/remediation market — now verified

The factsheet's 403 is resolved. **[S]** — Grand View Research press release, accessible:
- **PFAS Treatment Market: $2.8bn (2025) → $4.8bn (2033), CAGR 7.1%.** Separation & concentration = 75.1% of 2025 revenue; municipal segment 59.8%; North America 41.9%.
https://www.grandviewresearch.com/industry-analysis/pfas-treatment-market-report

**[C] Conflict flagged:** the same publisher's press release states **$3,859.4m by 2033 at 7.2% CAGR** — inconsistent with the $4.8bn figure on the report page. Cite the range and note the publisher disagrees with itself, or avoid this number; it is not load-bearing for Aegis.

### 3.3 The market numbers that actually matter for Aegis

Consultancy-relevant UK figures beat global testing-market figures for this pitch:

- **UK Environment & Sustainability consulting market: £4.1bn (2024), growing 8.9%, forecast £5.8bn by 2029; 10.7% five-year CAGR, outpacing Western Europe (7.4%) and global (8.3%).** — Environment Analyst, *UK E&S Consulting Market Assessment*, Nov 2025 edition **[S]** https://environment-analyst.com/uk/111068/
- **RSK is the largest UK E&S consultancy: £541m revenue, 13.2% share**; ~17–18% share of contaminated site assessment/remediation. **[S]** **[C]** — RSK's own newsroom carries both "largest" and "second largest" claims from different years; check the year before citing.
- Implied: the UK contaminated-land consulting segment is a **several-hundred-£m** market. That is the honest SAM anchor, not a headcount.

---

## 4. UK/EU regulatory state as at 2 August 2026

### 4.1 Confirmed unchanged

| Item | Status | Source |
|---|---|---|
| EU DWD (EU) 2020/2184: **Sum of PFAS 0.10 µg/L** (20 named PFAAs — 10 PFCAs + 10 PFSAs, C4–C13, Annex III) and **PFAS Total 0.50 µg/L** | Correct as stated | EUR-Lex **[P]** / **[S]** for the 20-substance breakdown |
| Compliance deadline **12 January 2026** | Correct — in force | European Commission **[P]** |
| **DWI revised PFAS guidance, March 2025**, 48 PFAS, 0.1 µg/L, non-statutory | Correct | DWI **Information Letter 03/2025** **[P]** — cite this, not the landing page: https://dwi-production-files.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/03/24141819/Information-Letter-03_2025_revised-PFAS-guidance.pdf |
| **Defra PFAS Plan, 3 February 2026** | Correct | GOV.UK **[P]**; confirmed again in the Government Response, June 2026 **[P]** |
| EA prioritisation map to all public bodies **end 2026**, public Q3 2027 | Consistent with Government Response | **[S]**/**[P]** |
| ECHA REACH restriction: RAC final 2 Mar 2026, SEAC draft 10 Mar 2026, final restriction unlikely before 2027 | Correct | **[S]** |

### 4.2 Corrections and additions — **things the current site gets wrong or misses**

**(a) Pin the DWI tier boundaries — they are currently vague on the site. [S]**
- **Tier 1: <0.01 µg/L. Tier 2: 0.01 to <0.1 µg/L. Tier 3: ≥0.1 µg/L.**
- **Implication the team has not confronted:** the Tier 1/Tier 2 boundary is **10 ng/L**, which is *below* the best cyclodextrin fluorescence array in the literature (31–38 ng/L). For drinking water, a fluorescence screen cannot distinguish Tier 1 from Tier 2. This is survivable — the target customer is contaminated land, not water companies — but do not let a judge discover it first.

**(b) ⚠ MISSING: the Environmental Audit Committee PFAS report. [P]**
*Addressing the risks from Perfluoroalkyl and Polyfluoroalkyl Substances (PFAS)*, **Ninth Report of Session 2024–26, HC 852, published 23 April 2026.**
https://publications.parliament.uk/pa/cm5901/cmselect/cmenvaud/852/report.html
This is the most authoritative UK PFAS document in existence and predates the last factsheet by 11 weeks. It is not cited anywhere in the app. Fix this — a judge from the sector will know it.

**(c) ⚠ MISSING: the Government Response. [P]**
*Second Special Report of Session 2026–27*, **published 6 July 2026**; response received 15 June 2026.
https://publications.parliament.uk/pa/cm5902/cmselect/cmenvaud/519/report.html

**(d) ⚠ MISSING and important — the EA already runs a PFAS risk-screening and site-prioritisation programme.** From the Government Response:
> "The **PFAS Risk Screening Programme** has provided a structured mechanism for combining monitoring data with information on potential source sites and sensitive environmental receptors. This has enabled the development of a national picture … alongside **a prioritised ranking of facilities requiring further assessment**. The overarching aim is to support the **targeted allocation of regulatory resources** towards those sites where intervention is most likely to effectively address contamination risks." **[P]**

This is close enough to Aegis's stated value proposition that it must be addressed head-on. See §6.3.

**(e) New/updated funding and liability facts [P]:**
- **£80 million fund** available to local government where no liable party can be identified (Minister, oral evidence Q280) — set against the **£31bn–£121bn** remediation estimate.
- **Land Remediation Pathfinder Scheme**, announced Autumn 2025: grants to local, combined and mayoral authorities covering unaffordable Landfill Tax costs where the tax is a determinative barrier to remediation.
- EA is developing **technical guidance on investigation, assessment and management of PFAS contamination** across planning, permitting and contaminated land — "will support risk-based decision making." Direct tailwind; cite it.

**(f) ⚠ Replace the €2 trillion cleanup figure. [P]**
The factsheet uses the **Forever Pollution Project's ~€2tn/20yr** estimate — an advocacy-consortium number. The **European Commission's own study**, *The cost of PFAS pollution for our society*, **published 29 January 2026**, estimates **~€440 billion by 2050** without action; source-control by 2040 saves **€110bn**; treating polluted water alone would cost **>€1 trillion**.
https://environment.ec.europa.eu/news/new-study-confirms-huge-and-growing-costs-pfas-pollution-2026-01-29_en
The official figure is roughly a fifth of the advocacy figure. **Citing the larger NGO number when the Commission has published its own is an easy credibility hit. Switch.**

**(g) Statutory UK drinking-water limit: still not law. [S]**
Consultation commitment confirmed (PFAS Plan Action 3.6); a Dec 2024 DWI advisory group recommended 0.1 µg/L. As of Aug 2026 no statutory instrument has been located. Keep describing the 0.1 µg/L value as **non-statutory guidance**. The site does this correctly — do not let anyone "tidy" it into sounding binding.

**(h) The EAC's own scepticism about Part 2A — quote it before a judge does. [P]**
> "[Part 2A] does not include an emissions levy, contribute to the cost of removing PFAS from drinking water **or detail the level of PFAS contamination to be a viable Part 2A site**. **We have also not heard any evidence of it being enforced.**"

A statutory duty that is unenforced, with no PFAS trigger threshold, is a weak foundation for a local-authority sales thesis. See §5.3 and Q6 in §9.

---

## 5. Customer economics

### 5.1 Environmental consultancies

- **UK E&S consulting market £4.1bn (2024) → £5.8bn (2029)** — Environment Analyst **[S]**
- Largest player RSK: **£541m revenue, 13.2% share**, ~17–18% of contaminated site assessment/remediation **[S]** **[C]**
- **[NV] Total count of UK environmental consultancies.** Firmbase lists 275 environmental consulting companies in **London alone**; no reliable national count located. The ENDS Directory is the authoritative register but is paywalled. **Do not put a national firm count on the poster** — say "a £4.1bn UK sector led by RSK, WSP, Arcadis, AECOM and SOCOTEC" instead.
- **[NV] What consultancies currently pay for PFAS work, or how they price it to clients.** No public data. This is the single highest-value thing a mentor call or a consultancy conversation could produce, and it is worth more to the pitch than any further desk research.

**Best available demand evidence, and it is good [P]:** the EIA told Parliament that planning on PFAS-impacted sites faces "a potential blockage" created by planning authorities' "unwillingness to accept risk assessments and remedial strategies in light of the increasing range of PFAS that can be detected … the lack of regulatory standards for these compounds and level of understanding of toxicity/fate." Named at-risk developments: **Cambridge East, Dunsfold Park, RAF Abingdon.** That is a concrete, named, commercially painful bottleneck — far more persuasive than a market-size chart.

### 5.2 Local authorities — pin down the count

**Use 307 and 287, and show the derivation. [P]**
- **307 local authorities in England as of May 2026** — 20 county councils, 153 district councils, 134 single-tier authorities. House of Commons Library, *Local government reorganisation 2026*, CBP-10494. https://commonslibrary.parliament.uk/research-briefings/cbp-10494/
- **County councils are not Part 2A regulators.** The duty sits with district, borough, city and unitary councils (and London boroughs). **[S]**
- **⇒ ~287 English authorities hold Part 2A duties** (153 + 134).
- The widely-quoted **326** comes from Defra's *State of contaminated land* report and predates reorganisation. **The site's current "~300–370" range is too wide and too vague. Say "~287 English authorities, following the May 2026 reorganisation (307 councils, of which 20 are county councils without Part 2A duties)."** Precision here is cheap and reads as competence.
- Reorganisation is live: 134 councils are being replaced by 38 unitaries; East and West Surrey already elected in May 2026. Fewer, larger buyers — arguably *better* for Aegis procurement. Make that point rather than treating reorganisation as a caveat.

### 5.3 Local authority budgets

- **[NV] Aggregated LA contaminated-land budgets for PFAS.** No public dataset. Defra's capital grant for contaminated land was withdrawn years ago; nothing has replaced it at scale.
- What *can* be said **[P]**: councils are payer of last resort; the central fund for orphan sites is **£80m** against a **£31–121bn** estimated liability; the Land Remediation Pathfinder Scheme (Autumn 2025) covers only Landfill Tax relief; and per §1.3, **PFAS analysis on private water supplies is not cost-recoverable**, so it comes straight out of environmental-health budgets.
- Counter-evidence to hold honestly: the EAC found **no evidence of Part 2A being enforced**, and there is **no PFAS trigger threshold** for determining a Part 2A site. A council with no enforcement pressure and no threshold has a weak reason to buy anything. **The consultancy-first sequencing is therefore correct and should be defended on this evidence rather than on procurement speed alone.**

---

## 6. Competitors

### 6.1 Screening/sensing — updated

| Player | What it is | Key numbers | Status |
|---|---|---|---|
| **Cyclopure** (US) | DEXSORB extraction disc + mail-in LC-MS | **$85**/kit (was $79), 55 PFAS, LOQ 1.0 ppt, **10–14 business days** | Commercial US; **no stated UK availability** **[P]** |
| **FREDsense** (Calgary) | Electrochemical biosensor field kit | **LOD 1,000 ppt (1 µg/L)**, same-day | Commercial **[P]** |
| **Verralize / BioLargo** (US) | "Lab-on-a-sensor" — multiplexed nanocarbon array with PFAS-selective ligands | Not disclosed | **Alpha testing** — new entrant, closest to Aegis's screening concept **[S]** |
| Academic arrays (Han/Zhou et al.) | β-CD polymer + 4 dyes + deep learning | 31–38 ng/L, <10 min | Lab prototype **[P]** |
| Oxyle, Enspired Solutions | PFAS **destruction** | — | Not competitors — different problem **[S]** |

**Add Verralize to the competitor table.** It is the closest thing to a direct competitor and its omission would look like incomplete homework.

### 6.2 ⚠ The competitor category the team has missed entirely

The site states: *"Existing PFAS screening products validate market appetite … but none of them offer a decision-support and triage layer."* **This claim is not defensible as written.**

Established environmental data management systems already do risk-based screening, threshold comparison, exceedance flagging and audit trails for contaminated-land sampling, and already sell into UK consultancies:

- **ESdat** — purpose-built for contaminated land, groundwater, soil vapour. **"US, Canadian, Australian, NZ, UK and other regulatory guidelines are pre-loaded."** Generates **Exceedance Tables** and "provides notifications of exceedances as soon as results are loaded." https://esdat.net/ **[P]**
- **EarthSoft EQuIS** — enterprise platform for sampling, lab data, QA/QC and regulatory reporting across large monitoring programmes. **[S]**
- **Locus EIM** — since 1999; Fortune 500, water utilities, US DoE. **[S]**

**How to fix the differentiation claim (this is a strengthening, not a retreat):** those tools are **post-lab** — they ingest results you have already paid for and check them against guideline values. Aegis is **pre-lab** — it uses a cheap screening measurement to decide *which samples get sent to the lab at all*. The savings come from samples never analysed. Reframed that way the differentiation is real, specific, and survives contact with someone who uses ESdat daily. Left as "nobody does decision support", it does not.

### 6.3 ⚠ The Environment Agency is, in a sense, a competitor

Per §4.2(d), the EA's **PFAS Risk Screening Programme** already produces "a prioritised ranking of facilities requiring further assessment" to "support the targeted allocation of regulatory resources", and the EA **publishes its PFAS data openly**. A judge may reasonably ask: *"The regulator has built a national site-prioritisation system and is giving it to councils for free at the end of this year. What are you selling?"*

**The answer — and it is a good one, but it must be rehearsed:** the EA map ranks **sites** using existing desk data and historical monitoring, to allocate *regulatory* attention. It tells a council *where to look*. It does not tell an investigator, standing on a site with 60 samples in front of them and a fixed budget, *which of those samples to send to the lab*. Aegis operates one layer down, at sample level, during the investigation, using a new measurement. **The EA map is a lead generator for Aegis, not a substitute** — it produces exactly the queue of sites that then need sample-level triage. Say this proactively in the GTM section rather than waiting to be asked.

---

## 7. Audit of every quantitative claim in `Why.tsx`

### 7.1 🔴 The internal contradiction to fix before anything else

`src/pages/Why.tsx:314` — cost model: *"Aegis platform & consumables assumed at **£25,000/year**"* (for a 500-sample portfolio).
`src/pages/Why.tsx:478-481` — revenue model: *"~**£5,000/year** per consultancy customer … ~**£15,000/year** per local-authority customer."*

**Aegis charges the customer £25,000 in the savings chart and £5,000–£15,000 in the revenue chart.** Both cannot be true. A judge who reads both captions has an immediate, unanswerable question, and it undermines every other number on the page.

Pick one and propagate. If the real price is £5,000, the savings chart *improves* (£125,000 → £30,000; saving £95,000, 76%) — so this is likely a free win, not a painful correction. But the revenue projection then needs to justify why councils pay 3× consultancies for the same platform.

### 7.2 Claim-by-claim

| # | Claim | Location | Status | Verdict |
|---|---|---|---|---|
| 1 | **£250/sample** lab cost | `Why.tsx:88, 311-313` | **Founder-invented**; now supportable | Reframe as conservative vs **£350** (EIA→EAC, May 2025). Best single fix on the page. |
| 2 | **"€175–300"** headline stat card | `Why.tsx:247` | Sourced but **inconsistent with claim 1** | Two different prices for the same thing, 30cm apart. Replace headline with £350 UK. |
| 3 | **20% escalation rate** | `Why.tsx:89, 313-314` | **Founder-invented**; justification is a category error | Keep as an assumption, **drop the DWI 4.3% justification** — that statistic is about *treatment works* reaching Tier 2+ in public water supply, not about *contaminated-land samples* escalating after a screen. Replace with a **sensitivity range (10/20/40%)**. This is the model's weakest joint and it is currently defended with the wrong number. |
| 4 | **£25,000/yr** platform cost | `Why.tsx:89, 314` | **Founder-invented** and **self-contradicting** | See §7.1. Must change. |
| 5 | 60% / £75,000 / 400 samples avoided | `Why.tsx:318-320` | Arithmetic correct given 1+3+4 | Recompute after fixing 1 and 4. |
| 6 | **3-year projection** (£15k / £150k / £575k) | `Why.tsx:104-108, 476-482` | **Founder-invented**; internally consistent | Labelled honestly — acceptable. But Y2→Y3 going 5→25 councils contradicts your own stated risk that LA procurement is "slow and fragmented". Soften Y3 or justify. |
| 7 | **MARKET_DATA 2027–2033** | `Why.tsx:92-102` | **Interpolated**, presented as "single clearly-sourced series" | Only 2026 ($439m) and 2034 ($1,037m) are published; the seven middle points are geometric interpolation at 11.3%. Caption must say "endpoints sourced; intermediate years interpolated at the stated CAGR." |
| 8 | **TAM "$439m–$3.6bn"** | `Why.tsx:332, 380` | **$3.6bn is interpolated** (R&M publishes $3.23bn for 2025) **and scope-incompatible** | Replace per §3.1: "$430–540m testing services, four sources converging." |
| 9 | **SAM "~300–370 UK bodies"** | `Why.tsx:385-386` | **Mislabelled** | Described as "consultancies **plus** local authorities" but the number is only councils. Use **~287 Part 2A authorities** + **£4.1bn UK E&S consulting market**. |
| 10 | **"10,000+ potential source sites"** | `Why.tsx:251-252` | Verified, but weakly sourced (ENDS) | Upgrade to primary: **2,900–10,200 high-risk sites** from >40,000 mapped — EA/Jacobs, *PFAS – Evaluating the economic burden of remediating high-risk sites*, B2382404/REP/001. |
| 11 | **"EA budget mismatch £1.8–2.7m vs ~£300k"** | `Why.tsx:260-262` | Secondary (ENDS/IFSJ) | **Replace** with the far stronger primary pair: **£31bn–£121bn** remediation liability vs **£80m** central fund for orphan sites (EAC, Apr 2026). |
| 12 | **770,000+ analyses in 2024; 46/1,067 works (4.3%)** | `Why.tsx:255-257` | **[P]** DWI | Accurate. But see claim 3 — do not reuse 4.3% as a triage-rate justification. |
| 13 | **Cyclopure "$79/kit"** | `Why.tsx:113` | **Out of date** | Now **$85**. Also add: 10–14 business days, no stated UK availability. |
| 14 | **"LOD 31–38 ng/L"** academic array | `Why.tsx:127` | **[P]** | Correct. Add the full citation (Zha et al., *Anal. Chim. Acta* 2025, 1377, 344680) — currently only a bare ScienceDirect link. |
| 15 | **"~1,000× below LC-MS/MS"** | `Why.tsx:135` | Defensible, imprecise | True of commercial field kits (FREDsense 1 µg/L). The best arrays are ~30× off. Errs conservative — acceptable, but §2.2's table is more impressive *and* more honest. |
| 16 | **"~300+ fragmented authorities"** | `Why.tsx:138, 417` | Vague | Use 287. Add that reorganisation is *reducing* the buyer count (134 → 38 unitaries). |
| 17 | **"none … offer a decision-support and triage layer"** | `Why.tsx:490-493` | **Not defensible** | See §6.2. Reframe as pre-lab vs post-lab. |
| 18 | Milestones (DWD, DWI, PFAS Plan, REACH) | `Why.tsx:28-85` | **[P]** all correct and correctly dated | No changes needed — this section is the strongest on the page. Add EAC Apr 2026 + Gov Response Jul 2026. |

### 7.3 Summary: what is founder-invented

Genuinely invented, not sourced: **£250/sample**, **20% escalation**, **£25,000/yr platform cost**, **£5,000 / £15,000 per-customer pricing**, **all customer counts**, **the entire 3-year revenue projection**, **MARKET_DATA intermediate years**, **the $3.6bn TAM endpoint**.

Of these, three are fine as labelled assumptions (revenue projection, customer counts, pricing — every startup pitch has these). Three must change: **£25,000 vs £5,000 contradiction** (fatal), **$3.6bn** (presented as sourced when interpolated), **20% escalation justified by the 4.3% statistic** (wrong statistic for the claim). One should change for advantage: **£250 → framed against £350**.

---

## 8. Prioritised list of changes before the poster is built

1. **Resolve the £25,000 vs £5,000/£15,000 contradiction.** Fatal if unfixed; likely improves the savings story. *(§7.1)*
2. **Re-anchor lab cost on £350/sample (EIA→EAC, May 2025)** and present £250 as deliberately conservative. Removes the biggest "unsourced" vulnerability. *(§1)*
3. **Drop the DWI 4.3% as justification for the 20% escalation rate**; replace with an explicit 10/20/40% sensitivity range. *(§7.2 #3)*
4. **Rewrite the competitor claim** from "nobody does decision support" to "pre-lab triage vs post-lab data management", and add **ESdat/EQuIS/Locus** and **Verralize**. *(§6.2)*
5. **Pre-empt the EA PFAS Risk Screening Programme** in the GTM section — position the EA map as lead generation, not competition. *(§6.3)*
6. **Add the EAC report (23 Apr 2026) and Government Response (6 Jul 2026)** to milestones and sources. Replace the ENDS budget stat with **£31–121bn vs £80m**. *(§4.2)*
7. **Swap the €2tn Forever Pollution figure for the Commission's €440bn (29 Jan 2026)** wherever it appears in deck material. *(§4.2f)*
8. **Fix market sizing**: "$430–540m testing services (4 sources converging)"; label MARKET_DATA interpolation; drop $3.6bn. *(§3.1, §7.2 #7-8)*
9. **Fix SAM**: ~287 Part 2A authorities + £4.1bn UK E&S consulting market; stop counting bodies as if that were the market. *(§5.2)*
10. **Address the 1,8-ANS/β-CD mismatch in the risks section** — name 2,6-ANS or γ-CD as the design response, citing the 17 July 2026 paper. Turns a vulnerability into evidence of rigour. *(§2.3)*
11. **Update Cyclopure to $85**, add turnaround and the UK-availability gap. *(§2.4)*
12. **Add a supply-chain risk line**: DEXSORB is single-source US with no evidenced UK distribution. *(§2.4)*

---

## 9. Top 10 hostile questions, with honest answers

**Q1. "Where does £250 per sample come from?"**
The only published UK figure is **£350 per PFAS soil sample**, given by the Environmental Industries Association to the Environmental Audit Committee in May 2025 (evidence PFAS0121, lead author Prof. Paul Nathanail, who wrote CIRIA C819). We model at £250 — 29% below it — because water is generally cheaper than soil and because we would rather understate our savings. No UK lab publishes a rate card; we checked seven. Getting a direct quote is our next action.

**Q2. "Your dye barely binds β-cyclodextrin. How can a displacement assay work?"**
That is the right question and the literature says you are largely correct. A paper published on 17 July 2026 in *J. Incl. Phenom. Macrocycl. Chem.* finds 8,1-ANS binds **γ**-cyclodextrin best, and Sueishi et al. put 1,8-ANS/β-CD at only ~50–195 M⁻¹ against ~11,700 for the 2,6 isomer. Our response is to treat the dye as a swappable parameter and move toward **2,6-ANS or a γ-CD host**. The architecture does not depend on which anilinonaphthalene we use.

**Q3. "PFAS are surfactants — so is any detergent. What stops a false positive from SDS or humic acid?"**
Nothing, at the level of a single dye. A one-dye assay measures hydrophobic-anion burden, not PFAS specifically. Every published system that achieves selectivity does it with a dye **array** plus pattern recognition. That is exactly why our output is a **risk score, not a concentration**, and why the escalation decision goes to LC-MS/MS. If we claimed specificity we would be overselling.

**Q4. "Fluorescence can't reach 0.1 µg/L. Why does this matter at all?"**
Mostly it cannot — the 2025 Nature Communications on-site sensor has an LOD of ~45 µg/L, 455× above the limit; the leading commercial field kit (FREDsense) is 10× above it. The best cyclodextrin array reaches 31–38 ng/L, below the limit, but it is a ~300× outlier and we do not assume we will match it. What bridges the gap is not the dye but **preconcentration**: DEXSORB concentrates PFAS by up to ~500,000×, a step none of those academic sensors include. And fundamentally we do not need to *measure* the limit — we need to **rank** samples well enough to decide which go to the lab.

**Q5. "What's your false-negative rate, and who's liable if you tell someone not to test and there was contamination?"**
We do not know the false-negative rate; establishing it against paired LC-MS/MS results is the entire purpose of a pilot, and until we have it the number should not be on a poster. On liability: Aegis **never** removes a sample from the workflow — it produces a priority ordering and a documented, auditable rationale. Final escalation is the consultant's professional judgement, and the audit trail exists precisely so that judgement is defensible.

**Q6. "The EAC found no evidence Part 2A is being enforced, and there's no PFAS threshold for determining a site. Why would a council buy this?"**
Correct, and it is why **consultancies are our first customer, not councils**. Consultancies have a commercial incentive today, driven by a real bottleneck the EIA described to Parliament: planning authorities are refusing to accept PFAS risk assessments at named developments including Cambridge East, Dunsfold Park and RAF Abingdon. The council market depends on the statutory limit consultation and the updated Part 2A guidance landing — which is why it is our second wave, not our first.

**Q7. "The Environment Agency has built a national PFAS risk-screening and site-prioritisation system and is giving it to councils free at the end of this year. What are you selling?"**
The EA ranks **sites** from desk data to allocate regulatory attention — it tells you where to look. It does not help an investigator on site with 60 samples and a fixed budget decide which samples to pay to analyse. We operate a layer down, at sample level, during the investigation, using a new measurement. The EA map generates exactly the queue of sites that then need sample-level triage, so it is a lead generator for us.

**Q8. "ESdat and EQuIS already do exceedance screening against UK guidelines. Isn't this a solved problem?"**
They solve a different problem. Those are **post-lab** systems: they ingest results you have already paid for and compare them to guideline values. We are **pre-lab**: we decide which samples become lab results in the first place. The saving comes from analyses never commissioned. We would expect to sit alongside ESdat, not replace it.

**Q9. "Your market chart shows a smooth curve. Where did the middle years come from?"**
Two points are published — $439m for 2026 and $1,037m for 2034, from Fortune Business Insights. The intermediate years are geometric interpolation at their stated 11.3% CAGR, and the caption should say so. The more useful fact is that four independent houses converge on **$430–540m** for the testing-services market; a fifth figure of $3.23bn is not comparable because it includes instrument sales.

**Q10. "How many samples have you actually run?"**
[The team must answer this honestly and it is the question most likely to be asked.] If the answer is none, say so immediately and pivot to what *has* been built and what the next step is: a working decision-support prototype with a transparent scoring model, and a validation plan that back-tests the risk engine against paired LC-MS/MS results. Do not let this question be met with a market-size slide.

---

## Appendix: new primary sources to add to the Sources list

| Source | URL |
|---|---|
| EAC, *Addressing the risks from PFAS*, HC 852, 23 Apr 2026 | https://publications.parliament.uk/pa/cm5901/cmselect/cmenvaud/852/report.html |
| EAC, *Government Response*, 6 Jul 2026 | https://publications.parliament.uk/pa/cm5902/cmselect/cmenvaud/519/report.html |
| Environmental Industries Association, written evidence PFAS0121, May 2025 (£350/sample) | https://committees.parliament.uk/writtenevidence/142255/html/ |
| EA / Jacobs, *PFAS – Evaluating the economic burden of remediating high-risk sites* (£31–121bn) | https://assets.publishing.service.gov.uk/media/66ebe9a6c8398625c331e778/Annex_C_PFAS_WP4_Phase_4_-_Report_Rev0_REDACTED.pdf |
| European Commission, *The cost of PFAS pollution for our society*, 29 Jan 2026 (€440bn) | https://environment.ec.europa.eu/news/new-study-confirms-huge-and-growing-costs-pfas-pollution-2026-01-29_en |
| DWI Information Letter 03/2025, revised PFAS guidance | https://dwi-production-files.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/03/24141819/Information-Letter-03_2025_revised-PFAS-guidance.pdf |
| House of Commons Library, *Local government reorganisation 2026*, CBP-10494 (307 councils) | https://commonslibrary.parliament.uk/research-briefings/cbp-10494/ |
| Han Z et al., *Anal. Chim. Acta* 2025, 1377, 344680 | https://doi.org/10.1016/j.aca.2025.344680 |
| *Weakly interacting cyclodextrin complexes…*, J. Incl. Phenom. Macrocycl. Chem., 17 Jul 2026 | https://doi.org/10.1007/s10847-026-01361-0 |
| Sueishi et al., *Spectrochim. Acta A* 2013 (ANS–CD binding constants) | https://doi.org/10.1016/j.saa.2013.05.052 |
| Nat. Commun. 2025, ratiometric BODIPY-MIP microfluidic PFOA sensor | https://doi.org/10.1038/s41467-025-66872-9 |
| Wang R, … Dichtel WR, *ACS Cent. Sci.* 2022, 8, 663 (β-CD polymer PFAS platform) | https://pubs.acs.org/acscii/article/8/5/663/451286/ |
| Environment Analyst, UK E&S Consulting Market Assessment, Nov 2025 (£4.1bn) | https://environment-analyst.com/uk/111068/ |
| ESdat (competitor) | https://esdat.net/ |
| Grand View Research, PFAS Treatment Market | https://www.grandviewresearch.com/industry-analysis/pfas-treatment-market-report |
