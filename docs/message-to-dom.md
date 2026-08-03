# Message to Dom — chemistry, before Wednesday's mentor call

**Use the short version.** The longer drafts below are kept in case you want the detail, but the
short one is the right amount: Dom needs the paper, the corrected number, and the question. The
corrected number has to travel with the question, because it is the whole reason the question is
being asked — without it the repositioning sounds arbitrary.

---

## Short version — recommended

> Two things before Wednesday:
>
> 1. Paper from 17 July: 1,8-ANS binds γ-cyclodextrin best, not β. DEXSORB+ is β-CD.
>    DOI 10.1007/s10847-026-01361-0
>
> 2. I checked the DEXSORB preconcentration figure we've been using. The 500,000× is from their
>    water *treatment* line — waste-volume reduction during regeneration, not sampling. The actual
>    test kit is 250 mL through the disc, so realistically ~250×, maybe 2,000× with a 1 L protocol.
>    Which means the 0.1 µg/L limit only shows up as ~25 µg/L at the detector.
>
> So: should we stop pitching this as a guideline-level screen and pitch it as an **AFFF
> source-zone screen** instead — 10 µg/L to mg/L, where fire training ground concentrations
> actually are?
>
> Need your call before Wednesday, the poster hangs off it.

---

## Version 1 — message

> Hey, heads up before Wednesday — I've been going through the literature for the poster and
> found two things about our chemistry that I think you need to see tonight rather than in
> front of the mentor.
>
> **1.** There's a paper from 17 July, so about two weeks ago, saying 1,8-ANS actually binds
> γ-cyclodextrin best — γ being the only host they tested that fully fits the naphthalene in
> the cavity. And there's an older one (Sueishi 2013) putting 1,8-ANS with β-CD at only about
> 50–195 M⁻¹, against up to ~11,700 for the 2,6 isomer. DEXSORB+ is a β-CD polymer. So as far
> as I can tell we've paired our dye with the host it fits worst. You'll know better than me
> how bad that actually is, but if it is bad, moving to 2,6-ANS looks like the cheap fix since
> it keeps DEXSORB+ and everything else.
>
> **2.** This one's worse and it's my fault. We've been saying DEXSORB preconcentrates by up to
> 500,000×. I went and checked where that number comes from and it's from Cyclopure's water
> *treatment* line — it's how much they shrink the waste volume when they're cleaning up
> contaminated water. It's not a sampling preconcentration factor at all. Their actual test kit
> is 250 mL through the disc, so eluted into ~1 mL that's more like **250×**. Maybe 2,000× if
> we design the protocol around a 1 L sample.
>
> Please don't say 500,000 to the mentor. I nearly did.
>
> The reason 2 matters: at a few hundred fold, the 0.1 µg/L limit only comes out at about
> 25 µg/L by the time it hits the detector, and I don't think a single dye in a cuvette
> resolves that — but that's genuinely your call, not mine.
>
> Which leads to the actual thing I need from you:
>
> **Should we stop pitching this as a guideline-level screen, and pitch it as an AFFF
> source-zone screen instead — working at 10 µg/L to mg/L, where the concentrations at fire
> training grounds actually are?**
>
> I think yes, and I think it's actually a *stronger* pitch, because it explains why
> airfield/AFFF history is the heaviest weight in our risk model. But it's your area and the
> entire poster hangs off the answer, so I don't want to build it until you've decided.
>
> There's a longer write-up with all the citations and the arithmetic in the repo —
> `docs/chemistry-brief-for-dom.md`, section 4 is the preconcentration bit. Worth a read if you
> get time, but the above is the gist.
>
> No stress if tonight's not realistic, I just want it in your head before Wednesday.

---

## Version 2 — email

**Subject:** Chemistry problem before Wednesday — need your call on one thing

> Dom,
>
> I've been going through the literature properly for the poster and hit two things I think you
> need to see before the mentor call, rather than in the call.
>
> **The dye/host pairing looks wrong.**
> A paper published on 17 July (*J. Incl. Phenom. Macrocycl. Chem.*, DOI 10.1007/s10847-026-01361-0)
> finds 1,8-ANS binds γ-cyclodextrin best — apparently γ is the only host tested that fully
> accommodates the naphthalene in the cavity. Sueishi et al. 2013 put 1,8-ANS with β-CD at only
> ~50–195 M⁻¹, versus up to ~11,700 M⁻¹ for the 2,6 isomer. DEXSORB+ is a β-CD polymer, so on the
> face of it we've picked the dye that fits our host worst. You'll know how much that actually
> matters for a displacement assay better than I do. If it does matter, switching to 2,6-ANS looks
> like the cheapest fix because it keeps DEXSORB+ and changes nothing else.
>
> **The preconcentration number we've been using is wrong, and that one's on me.**
> We've been quoting "up to 500,000×" from Cyclopure. I traced it: that figure is from their water
> *treatment* line and describes waste-volume reduction during remediation. It isn't an analytical
> preconcentration factor. Their actual Water Test Kit passes 250 mL through the disc — eluted into
> roughly 1 mL, that's about **250×**, or maybe 2,000× if we built the field protocol around a
> litre. So we were out by a factor of a couple of thousand, and on the wrong quantity entirely.
> Whatever else happens, we shouldn't say 500,000 to anyone.
>
> **What that does to the sensitivity story.**
> At 250×, the 0.1 µg/L guideline only presents as ~25 µg/L at the detector. For comparison, the
> 2025 Nature Comms on-site sensor is ~45 µg/L and FREDsense is ~1 µg/L. I'm not confident a single
> dye in a cuvette with weak binding gets us there, but that's your judgement.
>
> **The one thing I actually need an answer on:**
>
> Do we stop positioning Aegis as a guideline-level screen, and position it as an **AFFF
> source-zone screen operating at 10 µg/L to mg/L** instead?
>
> My view is yes. It's the only claim I think we can defend on the numbers, and it's genuinely
> stronger rather than weaker — it explains why firefighting foam / airfield history is the heaviest
> weight in the risk model, and conceding a narrower true claim beats defending a broad one a
> chemist can take apart in the Q&A. But it's your area, and the whole poster follows from the
> answer, so I don't want to commit until you've decided.
>
> Full write-up with citations and the worked arithmetic is in the repo at
> `docs/chemistry-brief-for-dom.md` — section 4 covers the preconcentration maths and section 3
> lays out the dye options with trade-offs.
>
> If you can, have a view by Wednesday. Happy to talk it through before if easier.
>
> Alex

---

## If Dom asks "so what do I actually decide?"

Three questions, in priority order:

1. **Guideline-level screen, or AFFF source-zone screen?** This is the one that changes the poster.
2. **2,6-ANS, γ-CD host, or stay with 1,8-ANS + DEXSORB+?** Affects how the design-evolution panel
   reads — showing a change made in response to a two-week-old paper is worth real marks.
3. **Elute and solvent-exchange, or read in-cartridge?** Needs stating before print either way,
   because ANS is strongly solvatochromic and eluting into methanol would produce a turn-on
   artefact bigger than the displacement signal.
