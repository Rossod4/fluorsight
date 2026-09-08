# The survey — who it's for, and what it should ask

**Written 18 August 2026.** Content freeze ~1 Sept (14 days). Poster due 11 Sept (24 days).
Responses have to land by ~1 Sept to reach the poster at all.

---

## 1. Who you are targeting

**Not consumers.** Your own materials commit you to a B2B buyer:

- `src/pages/Landing.tsx:57–63` names **environmental consultancies** and **Part 2A
  contaminated-land officers**.
- `docs/qa-bank.md` records a deliberate decision to **exclude water companies**, because screening
  is not regulatory-grade.
- `docs/outreach-emails.md` is written to three groups: labs, consultancies, local authorities.
- The poster's own kill criterion is *"if none confirms that budget forces under-sampling, our
  problem is wrong."* Only a professional can confirm or kill that.

So the target is **anyone who has ever decided whether a specific water sample gets sent to a
laboratory**, plus the people who price that work:

| Group | Why they matter | Where to find them |
|---|---|---|
| Contaminated-land / geoenvironmental consultants | The buyer. They hold the analytical budget | LinkedIn: "contaminated land consultant", RSK / WSP / Arcadis / Ramboll / Wood |
| Local authority contaminated-land & EHOs | The second buyer, and the Part 2A duty holder | Council Environmental Health pages |
| Environmental lab staff (technical/sales) | They hold the **real £/sample** you're currently assuming | ALS, SOCOTEC, Eurofins, i2 Analytical |
| Academics / researchers in PFAS or environmental monitoring | Cheap credibility, and they reshare | University staff pages |

## 2. What to do with the consumer survey you already have

**Don't bin it, and don't lead with it.** It is real primary research, and "market surveys" is a
named sub-criterion currently scoring zero. But be clear about what it can and cannot support:

- ✅ **It can evidence method** — you designed and ran a survey, and here is what came back.
- ✅ **It can evidence problem salience** — public awareness/concern about PFAS is context for
  why the regulatory pressure exists.
- ❌ **It cannot evidence demand for Fluorsight**, because consumers are not the buyer. A consumer
  saying "yes I'd want to know about PFAS in my water" tells you nothing about whether a
  consultancy will pay £5,000/year.

**The honest framing, which is worth more than pretending otherwise:** *"We first surveyed the
public and found [X]. That told us there's concern but not a purchaser — nobody in that group
holds an analytical budget. So we re-scoped to the people who actually commission lab tests, and
ran a second survey aimed at them."* **That is a design-evolution story.** It is exactly what
`docs/design-evolution-log.md` Part 3 is asking for, and it converts a mis-aimed survey into
evidence of a team that noticed and corrected.

---

## 3. The survey itself

**Design rule that matters more than any individual question: ask about what people _have done_,
not what they _would do_.** "Would you use a tool like this?" gets you polite yeses that evidence
nothing and that a judge will discount instantly. "How many samples did you send to a lab on your
last project, and how did you choose them?" gets you a fact.

Keep it to **8 questions, 3 minutes**. Every question below earns its place by either (a) filling a
gap the audit flagged, or (b) producing something quotable on the poster.

### Screener (Q1) — lets you separate the two audiences

**1. Which best describes you?**
- Environmental consultant (contaminated land / geoenvironmental)
- Local authority — contaminated land, environmental health, or regulatory
- Laboratory staff (analytical / technical / commercial)
- Academic or researcher
- Water industry
- None of these / general interest ← *routes them to a 2-question short version*

### The buyer questions

**2. In the last 12 months, have you been involved in deciding which water samples get sent for
PFAS analysis?** Yes / No / Not for PFAS, but for other determinands

**3. Roughly what do you currently pay per sample for confirmatory PFAS analysis in water?**
*(free text, "don't know" allowed)*
> 🎯 **This is the single most valuable question in the survey.** Your whole cost model rests on an
> assumed £250 that no source supports. One real number from one real buyer replaces it.

**4. How do you currently decide which samples get sent?** *(multi-select)*
- Send everything in scope
- Professional judgement / site history
- A formal risk or scoring framework
- Regulatory requirement dictates it
- Budget dictates it — we send what we can afford
- Other

**5. Has analytical cost ever meant you sampled or tested less than you would have liked?**
Yes, often / Yes, occasionally / No / Prefer not to say
> 🎯 **This is your kill criterion.** The poster stakes the problem statement on it. A "no" from
> most respondents is a genuinely useful finding and you should report it either way.

**6. If a cheap field screen could rank samples by likelihood — with a lab still confirming
anything flagged — where would you be most cautious?** *(free text)*
> Phrased to invite objections rather than approval. Objections are more useful, more quotable, and
> asking for them is what makes professionals answer.

**7. What would make a tool like this unusable or untrustworthy in your work?** *(free text)*
> Straight from `outreach-emails.md` §B, which is your best-tested question already.

### The close

**8. Happy for us to quote your answer anonymously in a university competition poster?**
Yes, anonymously (e.g. "a UK environmental consultant") / Yes, and you may name my organisation /
No
Plus: *optional email if you'd be open to a 20-minute conversation.*
> 🎯 **Do not skip this.** Without explicit permission you cannot put a single verbatim quote on the
> poster, and one real quote is worth more than the response count.

### Short version for the "general interest" branch
**A.** Before today, had you heard of PFAS? Yes / Vaguely / No
**B.** Anything you'd want to know about PFAS in your water? *(free text)*

---

## 4. Realistic expectations, and the thing that actually scores

`outreach-emails.md` already establishes 10–20% reply rates for cold professional outreach. **A
LinkedIn form will do worse than a targeted email**, because there is no named recipient. Plan for
**single-digit professional responses**, and treat that as the expected case rather than a failure.

Which means: **the survey is not the highest-value evidence available to you — the interviews
are.** Five 20-minute conversations beat fifty form responses on every criterion the competition
names, and the poster already commits Evan to exactly that in September. Use the survey to *find*
interviewees (question 8), not as a substitute for them.

**Report whatever you get, honestly.** "We approached N, received M responses, and the three
consultants who replied all said budget forces under-sampling" is a finding. So is "we received
four responses and cannot generalise from them" — stated openly, that scores better than a silent
gap, and far better than a rate quoted from n = 4.
