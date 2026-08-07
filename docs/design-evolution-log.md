# Design evolution log — template and why it matters

**Fill this in before the poster is built. It is the cheapest unbanked marks available.**

---

## Why this document exists

The competition's official Required Content names three areas. The second is:

> **Development Process and Design Evolution** — literature research, interviews, market surveys,
> data analysis, tools utilised, product testing, and iterative refinement. Documentation of team
> roles, responsibilities, and any adjustments made during development is expected. **Judges will
> ask about team collaboration during questioning.**

That maps onto:
- **8 of the oral's 40 points** — "development of the solution"
- **part of the poster's 30 content points** — it is one of the four named content areas
- **feeding the 20-point teamwork score**, because it is the evidence your mentor and the judges
  use to assess how you actually worked

Call it roughly **20 of 100 marks** that most teams address with a sentence saying "we iterated".

You have a genuine advantage here and are currently not using it: **weekly Tuesday meetings since
the start of June**. That is documented process almost no undergraduate team can evidence. But an
advantage you cannot show is not an advantage.

---

## ⚠️ Read this before you write anything

The Q&A bank's team-working answer contains the line *"we write down what we decided each week"*.

**If that is not true, either make it true now or delete the line.** A judge who hears it and asks
"can I see it?" — and they do ask — will destroy your credibility on everything else you said.

Reconstructing this honestly is fine and normal. What is not fine is implying you kept
contemporaneous minutes if you did not. If you are writing it up now from memory, the honest
framing is: *"we've kept a running record of decisions and reconstructed the early weeks from our
notes and messages"*. That is completely defensible. Say that instead.

Your Tuesday meeting on **4 August** is the natural moment to do this as a team, while three
memories are better than one.

---

## Part 1 — Roles

Fill in properly. "We all did a bit of everything" scores badly; it reads as an absence of
structure rather than as collaboration.

| Person | Discipline | Owns | Also contributed to |
|---|---|---|---|
| Dom | Chemistry | The sensing method, the dye/host chemistry, the science claims | |
| | Aerospace engineering | | |
| | Maths | The risk model, the cost case, competition deliverables | |

**Did roles change during the project?** The brief explicitly asks for "any adjustments made
during development". You have a real answer: you registered as five, two never engaged, and three
people absorbed a five-person scope. Write down *what you actually cut or changed* as a result —
that specific is worth more than the fact itself.

---

## Part 1b — Idea generation and selection (REAL — captured 4 August 2026)

**This is the strongest process evidence the team has, and almost no other entry will have it.**

Fifteen candidate ideas were generated, then each member scored every idea independently on three
axes — **how much you like it, how feasible it is, how well it will do** — each out of 5, so 15 per
person and 45 across the team.

| Rank | Idea | Dom | Evan | Alex | Total |
|---|---|---|---|---|---|
| 1 | PFAS: electrochemical filtration/degradation, detection kit and awareness app | 15 | 12 | 12 | **39** |
| 2 | At-home sewage/PFAS testing kit for tap water, rivers and seawater | 12 | 11 | 15 | **38** |
| 3 | Route adjustments to reduce aircraft contrail formation | 10 | 9 | 14 | 33 |
| 4 | UAV delivery of nutrient aerosols/seeds for reforestation | 12 | 12 | 8 | 32 |
| 5 | Wildfire detection and response network | 7 | 12 | 12 | 31 |
| 6 | Pesticides that don't kill bees | 13 | 8 | 6 | 27 |

Full list of fifteen and all scores are in the team's Notion document — keep it, it is the primary
record.

**What makes this worth marks, and how to say it:**

1. **The top two ideas were both PFAS**, scored independently, and the product is a merge of them —
   detection plus a decision layer. That is not a post-hoc rationalisation; the numbers show it.
2. **The scoring resolved a genuine disagreement.** In the team's own words: *"We really wanted to
   do different ideas at the start but came to a fair solution by doing our ranking thing."* Look
   at the spread — Dom scored the bee idea 13 and the wildfire network 7; Alex scored them 6 and
   12. Those are real differences, resolved by a rule agreed in advance rather than by whoever
   argued hardest.
3. **The stated goal was a project everyone was interested in**, not the highest-scoring idea for
   any one person. That is a defensible team-working principle and it is worth saying out loud.

⚠️ **Use the disagreement honestly.** The judges' team-working question wants a real example, and
this is one — but the honest framing is *"we disagreed about what to build and used a scoring rule
we'd agreed beforehand"*, not *"we had a big argument"*. Point at the score spread if pressed.

---

## Part 2 — The decision log

One row per meeting, or per decision if that is easier. **Reconstruct the ones you can remember;
do not invent the ones you cannot.** A short honest log beats a long fabricated one.

For each entry capture: **what you decided, what made you decide it, and what you rejected.**
The rejected option is the part that demonstrates a process rather than a preference.

| Date | Decision | What prompted it | What you rejected | Who led |
|---|---|---|---|---|
| ~1 Jun | | | | |
| | | | | |

**Decisions worth checking your memory for** — most teams have made several of these without
recording them:

- Choosing PFAS at all, over other Open Challenge / SDG directions
- Framing it as **triage rather than lab replacement** — this is the single most important
  positioning decision in the project and it should be in the log with a reason
- Targeting **environmental consultancies first** rather than local authorities
- **Excluding water companies** deliberately, because screening is not regulatory-grade
- Building a **software decision layer** rather than pursuing the chemistry alone
- Choosing a **transparent weighted model** over a machine-learning approach
- Deciding to state limitations **openly on the site** rather than burying them
- Formally removing the two non-contributing members, and when

---

## Part 3 — The design changes that actually happened

This is the strongest material you have, because a *change* proves a process in a way a decision
does not. Judges reward "we were wrong about X and here is what we did".

Three you can already evidence:

**1. The chemistry — the probe switch (June 2026, confirmed 17 July).**
The team switched the reporter dye from **1,8-ANS to 2,6-ANS in June**, on binding grounds:
Sueishi et al. (2013) measured 2,6-ANS at **80–11,700 M⁻¹** against **50–195 M⁻¹** for 1,8-ANS
across the hosts tested, and DEXSORB+ is a **β**-cyclodextrin polymer. A paper published
**17 July 2026** (*J. Incl. Phenom. Macrocycl. Chem.*, DOI 10.1007/s10847-026-01361-0), comparing
both isomers across all three native cyclodextrins, then independently confirmed it — 2,6-ANS
binds β-CD most strongly, 1,8-ANS prefers γ.

**Say it in that order: decision in June, literature in July.** "We made the call and a paper
confirmed it a month later" is a far stronger design-evolution story than "a paper made us
change", and it is the true one.

> ⚠️ Two earlier versions of this entry were wrong: one said the July paper *caused* the switch,
> the other said no switch ever happened. Neither is right. Do not reintroduce either.

**2. The competitor claim (August 2026).**
You claimed no one offered a decision-support layer. Research found ESdat, EQuIS and Locus already
sell exceedance screening into UK consultancies. Rather than drop the claim, you sharpened it:
those tools are **post-lab** — they screen results you have already paid for — whereas Fluorsight is
**pre-lab** and decides which samples become lab results at all. A weaker claim replaced by a
truer and more specific one.

**3. The cost model contradiction (August 2026).**
The business case charged the customer £25,000/year in the savings model and £5,000–£15,000 in the
revenue model. Resolved by separating a £5,000 software subscription from £40/sample consumables,
and repricing by programme scale rather than customer type.

A second correction followed on 4 August: an earlier version of this entry claimed the £250
assumption had been "re-anchored" against the only published UK figure (£350/sample, EIA written
evidence to the Commons Environmental Audit Committee, May 2025) and was therefore "demonstrably
conservative". **That was withdrawn** — the EIA figure is for *soil* and explicitly excludes water,
so it does not validate a water price and £250 cannot be called conservative relative to it. £250
is an assumption whose direction of error is unknown. Break-even is £62.50/sample.

**Add your own from June and July.** These three are all recent because they came out of this
month's research — a log that starts in August looks like it was written in August.

---

## Part 4 — Methods and tools used

The brief names these explicitly, so list them rather than assuming they are obvious.

- **Literature research** — peer-reviewed sensing literature, regulatory sources (EU DWD 2020/2184,
  DWI guidance, Defra PFAS plan, EA programmes), parliamentary evidence (EAC inquiry)
- **Market research** — four independent market estimates reconciled by scope; competitor analysis
- **Primary research** — outreach to UK laboratories and environmental consultancies *(record what
  you sent, when, and what came back — including non-replies; attempted primary research still
  counts as method)*
- **Data analysis / modelling** — transparent weighted risk engine; retrospective back-test;
  escalation-threshold sensitivity sweep; one-at-a-time weight sensitivity analysis
- **Software** — React/TypeScript prototype, 27 unit tests, deployed publicly at fluorsight.co.uk
- **Testing** — *be precise and honest here: the software is tested, the chemistry is not. No bench
  experiments have been run.*

---

## Part 5 — What to put on the poster

You cannot fit this document on an A0 poster. Compress to:

- **A short timeline** — June → September, with 4–6 dated milestones, at least two of which are
  *changes* rather than decisions
- **One sentence on roles** — three disciplines, who owns what
- **One design change told properly** — the chemistry one is the strongest, because it is dated,
  externally caused, and specific

Keep the full log for the Q&A. When a judge asks "how did you work together?", the answer is far
more convincing if you can say *"we've met every Tuesday since June and kept a decision record —
for example, in July we changed X because of Y"* than if you say you collaborated well.
