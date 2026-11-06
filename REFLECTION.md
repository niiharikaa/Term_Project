# REFLECTION.md – Comfy Home (audit of IKEA Singapore cart and checkout) 
**Members:** [CC = Carolina Cataldi], [NS = Niharika Singavajhala], [SAJ = Sherin Arun Jasmine], [VP = Valeria Pontrelli]
**Length:**  1,490 words.
**Written by:** all four members together (CC, NS, SAJ, VP). We drafted, discussed and agreed every section as a group, so no part has a single author.

---

## Part A – Critical thinking

### A1 Where did the AI get the behavioural science wrong, and how did you catch it?
AI Studio added behavioural interventions we never asked for, each of which would have changed what our test measures. It pre-selected "Truck delivery", although IKEA pre-selects nothing. A default is a nudge in its own right (Kahneman ch. 34: people "accept the default"), so variant A would no longer have been a faithful baseline, and it contradicted our Finding 8. We caught it by reading the code against screenshot 08 (Entry 7). It also put "Active Study Condition: Variant A" on the consent screen; a tester who knows their condition may hunt for hidden costs, biasing our main metric (Entry 4).

The AI we used for drafting described the product wrongly. Its first draft of Finding 1 said the "delivered from $10" banner was really the click-and-collect price. IKEA's delivery page shows parcel delivery "starts from $10" for orders up to 15 kg, so the $10 is real. We learned to treat any AI description of the product as a claim to check against our screenshots and the policy pages.

### A2 Which claim did you check at source (reading and page), and what did you find?
We checked IKEA Singapore's delivery page directly. It confirms all three figures our audit relies on: parcel delivery from $10 (up to 15 kg), home delivery $35 "for orders above 15kg", and "an additional flat rate of $20" when there is no lift access from the 3rd floor onwards, to be paid "directly to the service provider". That last phrase is the evidence for Finding 3: the charge is real and published, but never reaches the checkout total. The same page also says drilling is "only available with assembly purchases", which contradicts the assembly page's $5 per hole for customers who have not booked assembly. The AI had not mentioned that.

For the readings, we checked that Lee & Aaker (2004) support a loss frame for safety: a message about safety, responsibility, or avoiding a negative outcome should generally fit a loss frame. That is why our anchoring card says "to prevent tip-over" rather than "for peace of mind". We dropped two ideas that our sources did not support.

### A3 Which nudge-or-sludge call did you make against the AI's suggestion, and why?
Finding 1 is the call that changed most. The first draft rated "Delivered from $10" as SLUDGE: a pick-up price dressed up as delivery. After checking the delivery page and our lamp screenshot, we rated it GREY. The cart updates honestly from "From $10" to "From $35" before checkout, which serves the shopper. What remains is the word "From": $35 reads as the delivery price, but a 3rd-floor walk-up pays $55. We kept the severity at 3 because the trust cost is real for every furniture order, but we no longer call it a deception.

We also turned down a design the evidence seemed to invite. Because anchoring is a safety issue, pre-ticking "Add assembly incl. anchoring" looked like a strong nudge. We rejected it: a pre-ticked paid add-on is the course's own sludge example (Makan-to-Door's "Order Protection"), and the CCCS guidance rules it out. Both options in B start unticked, and the free "I'll anchor it myself" option means safety does not depend on paying.

### A4 What about your users could the AI not know?
The AI treated "no lift" as an edge case. In Singapore most HDB blocks have lifts, but older walk-up flats and shophouses do not, and tall items do not always fit in a lift. Whether the $20 applies depends on the shopper's building, which is why B asks "Lift access?" instead of assuming. The AI also could not know that renters often need landlord permission to drill, so "I'll anchor it myself" is not open to everyone.

One of us has lived this. CC's sofa did not fit into the lift to her fifth-floor flat, and she was charged an extra $20 at delivery that nobody had mentioned beforehand. With the sofa already at her door, she felt she had no choice but to pay. That is the endowment effect behind Finding 3, and no AI could have told us it happens.

---

## Part B – Reflection

### B1 Which principle replicated, or was refuted, in your pilot or prediction?
We did not run the pilot (paper section 5 is optional), so this is a prediction check. One prediction was partly refuted before we built anything. We expected IKEA's cart to use $10 as a misleading anchor for furniture, but the cart switches to "From $35" and $10 is a genuine parcel price. Nodder's "own the anchor" still fits the site-wide banner, but more weakly, and Finding 1 moved from SLUDGE to GREY.

Building B supported Finding 2. In A, the $152.90 a 3rd-floor walk-up shopper will pay appears on no screen, and the total moves $124 → $89 → $124 → $132.90; in B it shows at every step, which by Kahneman's reference-point account (ch. 26) should remove the step-by-step "losses". The figures below are the predictions committed in AUDIT.md, not results. We expect the primary metric (testers stating the right total, about 10% in A → 60% in B) to replicate most strongly. The one most likely to fail is anchoring (about 20% → 40%): prevention framing may raise intent, but the cost of assembly may outweigh it, and a rise that small needs about 82 testers per variant, so at our scale it could only be a pilot.

### B2 What would you test next, and what result would change your mind?
First, the moderated test from AUDIT.md: 14 testers per arm, the same neutral task, and their stated total recorded at payment. We would drop the cost repairs if B's correct-total rate were not at least 20 points above A's, and revisit the lift question if the share willing to order fell by more than 5 points.

Second, a test we only saw after building B. Once the cart shows the full cost, the later pages mostly repeat choices already made (AUDIT.md, "Added after building"). We wanted one page, with personal details asked last, which would also fix the other half of Finding 2. We did not build it: the brief asks for one layout for A and B so that only the audited elements differ, and with both changes we could not tell which one worked. We also noticed that, looking at B alone, little seemed to have changed; the differences stood out only side by side with A. A real tester sees one variant, which is why we measure behaviour (can they state the right total?) rather than preference. We would test B against a one-page B; if it did not raise the correct-total rate or completion, the stable total, not the page count, is what matters.

### B3 How did AI change who did what in your group?
None of us wrote code. Variant A went from our first Stitch prompt (13:03) to a pushed, working checkout (14:42) in under two hours, and B took one prompt. The work moved from making things to three jobs the AI could not do for us.

The first was **specifying**. Our early prompts were long and still let AI Studio invent features (a free-delivery rule, a GST line, promo codes). We learned to write short prompts that named exactly what to keep, ended with "Change nothing else" and repeated our guardrails. We used Claude to help tighten them, but their content came from our audit.

The second was **checking**, which took most of our time. Every build was laid next to our IKEA screenshots and clicked through total by total. That is how we caught Gemini packages we had excluded, real IKEA article numbers and a "TOP RECOMMENDATION" badge. AI Studio reported "12/12 tests passed" for B; our own walkthrough confirmed the totals but also found an amber highlight on the no-lift line that A does not have. We treated the AI's report as a claim and our walkthrough as the evidence.

The third was **judging**. Each member rated severity alone before we agreed a number, so nobody simply copied the AI's verdict. Which product to audit, which findings to cut and what to leave out of B stayed our decisions.

NS drove AI Studio and kept the log; the others checked builds against the screenshots and policy pages and wrote parts of the audit and this reflection. The main risk was speed: a polished build looks finished. Our answer was to slow down at checking, not building.
