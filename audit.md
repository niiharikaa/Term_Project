# AUDIT.md – IKEA Singapore cart and checkout • the decision: "how much will this order really cost me, and do I complete it?"

**Group Members:** [CC = Carolina Cataldi], [NS = Niharika Singavajhala], [SAJ = Sherin Arun Jasmine], [VP = Valeria Pontrelli]
**Product audited:** IKEA Singapore cart and checkout (ikea.com/sg/en/cart/ → /checkout/details/ → /checkout/services/ → /checkout/payment/), operated by Ikano Pte Ltd, plus the policy pages it relies on: delivery, assembly, return policy and "Secure it or Return it!".
**Screenshots taken:** 2026-11-05, desktop, Chrome, 8 screens in `public/assets/aistudio/` (personal details blurred; filenames start `2026-11-05_ikea_01…08`): 01 cart, small item ("From $10"); 02 cart, BILLY bookcase ("From $35", $124); 03 Details ($89); 04 Services, delivery options; 05 Services, assembly +$8.90; 06 Services, pre-selected date and slot; 07 Payment ($132.90); 08 Services, lamp only (Parcel delivery $10, Click & collect $10, Truck delivery $35, nothing pre-selected). The screenshot numbers in the findings refer to these files.
**Prototype:** "Comfy Home", the "LUMA" lamp ($49.90) and the "ARLO" bookcase ($89) are fictional. Variant A reproduces IKEA's flow, wording and pricing logic.
**Repository:** https://github.com/niiharikaa/Term_Project • **Live URL:** https://term-project-q9oa.vercel.app (`?v=A` / `?v=B`)

**Decision sentence:** When a Singapore shopper decides whether to complete a furniture order, the checkout steers them to underestimate what it will cost. It shows delivery only as a "From" price, which leaves out what can be added on delivery day, and shows a total that changes at every step ($124 → $89 → $124 → $132.90). It asks for personal details before revealing delivery options, and never shows the $20 no-lift charge paid on delivery day. It does this through a "from" anchor, shifting reference points and partitioned costs (Nodder, "Greed"; Kahneman ch. 26, 27, 34). It also leaves out the safety step IKEA itself recommends for tall furniture: anchoring it to the wall.

**The flow, one ARLO/BILLY bookcase, truck delivery, assembly:**

| Step | Total shown | Note |
|---|---|---|
| Cart | $124 | "Delivery price From $35" |
| Details | **$89** | delivery drops out; personal details required here |
| Services | $124 → $132.90 | truck delivery $35; assembly +$8.90 |
| Payment | **$132.90** | final "Total price" |
| Delivery day (3rd floor, no lift) | **$152.90** | +$20 paid to the driver, shown nowhere |

> **Severity:** each member rates **alone first**, then we compare and agree a number; both are kept (course briefing). Scale: 0 not a problem – 1 cosmetic – 2 minor – 3 major – 4 fix before release.

---

## Finding 1 – Delivery shown as "From $10" / "From $35": correct, but only a floor
- **Where:** Top strip on every page: "Get your items delivered from $10". Cart order summary: "Delivery price From $10" with only the lamp, "From $35" once the bookcase is added (screenshots 01–02). IKEA's delivery page confirms both figures: parcel delivery "starts from $10" for orders up to 15 kg, and home delivery "is $35 for orders above 15kg". The same page adds the $20 no-lift charge (Finding 3).
- **What the user sees and does:** The cart switches to the right base price for what is in it, which helps. But both figures say "From": the shopper sees a minimum and is not told what can be added. For a 3rd-floor walk-up, delivery really costs $55, not $35.
- **Principle (week, reading):** **W2 – Nodder, *Evil by Design*, "Greed", "Own the anchor":** a "from" price works as a low-end anchor that later figures are compared upward from. **W3 – Ariely, *Predictably Irrational*, ch. 9 "The Effect of Expectations":** having already paid $35 for delivery, the shopper assumes everything is included. That expectation shapes how the extra $20 is felt at the door: as an unfair surprise, not part of the price. **W5 – Alter, *Drunk Tank Pink*, ch. 2 "Labels":** the cart calls the $35 the "Delivery price", so shoppers read it as the full cost of delivery. The small word "From", which says it is only the minimum, is easy to miss.
- **Mechanism, whose goal wins:** Mixed. Updating to $35 before checkout serves the shopper; leaving the add-ons behind the word "From" serves the platform. **GREY**
- **Severity 0–4:** CC [3] • NS [3] • SAJ [2] • VP [3] • agreed [3] • driver: how often (every furniture order); trust (the shopper expects $35 and pays $55)
- **Repair:** Keep the $10 → $35 switch, but drop "From": "Truck delivery (items over 15 kg): $35". Any delivery-day charge is added as its own line once the shopper answers the lift question (Finding 3).
- **Prediction:** Measured through the primary metric (test plan).

## Finding 2 – A total that changes at every step, with personal details asked first
- **Where:** Cart Subtotal $124 → Details "Total price" **$89** → Services $124, then $132.90 → Payment $132.90 (screenshots 02, 03, 04, 05, 07). The Details step requires email, name, phone and address **before** the shopper sees delivery options or prices.
- **What the user sees and does:** There is no stable number to judge the purchase by. The total drops, then rises twice, and each rise arrives after more effort has gone in.
- **Principle (week, reading):** **W4 – Kahneman, *Thinking, Fast and Slow*, ch. 26 "Prospect Theory":** outcomes are judged against a reference point. Here the reference point keeps moving, so each increase reads as a new loss against the last figure seen. **W4 – Kahneman, ch. 27 "The Endowment Effect":** after typing in their details, the order already feels like "mine", so stopping feels like a loss. **W6 – Beshears & Gino (2015):** *simplify* is a fast-thinking tool; spreading the cost over three pages does the opposite.
- **Mechanism, whose goal wins:** Revealing costs late, after sunk effort, raises completion. The platform wins at the user's cost. **SLUDGE**
- **Severity 0–4:** CC [3] • NS [3] • SAJ [3] • VP [3] • agreed [3] • driver: how often (every order); cost; trust
- **Repair:** One "Estimated total" in the cart that already includes the delivery choice, assembly and delivery-day charges (Finding 3), and that stays the same through every checkout step.
- **Prediction:** Measured through the primary metric (test plan).

## Finding 3 – The $20 no-lift charge appears nowhere
- **Where:** Nowhere in the cart or checkout, including the final Payment "Total price" (screenshot 07). Only IKEA's delivery policy page says: "an additional flat rate of **$20** will apply if there is no lift access … from the 3rd floor onwards … Please pay the fee directly to the service provider." The assembly page adds "A **$5 charge per drilled hole** … paid directly to the service provider" (and contradicts the delivery page, which says drilling is "only available with assembly purchases").
- **What the user sees and does:** A "Total price" of $132.90 that is not the total. A shopper in a walk-up flat pays $152.90.
- **Principle (week, reading):** **W5 – Thaler & Sunstein, *Nudge*, ch. 2 "Resisting Temptation", mental accounting:** money is kept in separate mental accounts. A charge paid in cash to the driver on another day sits outside the "IKEA order" account. **W4 – Kahneman, ch. 26:** reference dependence and loss aversion. We judge this charge **on its own against $0** (a separate payment to a separate person), not against the $132.90 total. Against the total, diminishing sensitivity would make $20 feel small; as a stand-alone, unexpected payment at the door it registers as a full loss. **W4 – Kahneman, ch. 34 "Frames and Reality":** in the credit-card example, the same price gap reads differently as a "cash discount" or a "surcharge"; keeping a charge outside the total is a framing choice. **Regulation:** CCCS Guidelines on Price Transparency (2020), cited in the course briefing: headline prices should include mandatory charges.
- **Mechanism, whose goal wins:** The checkout total understates the cost of the decision. The extra charge arrives on delivery day, when the furniture is at the door and refusing it is hardest (endowment, ch. 27). The platform wins. **SLUDGE**
- **Severity 0–4:** CC [3] • NS [4] • SAJ [3] • VP [4] • agreed [4] • driver: cost (money); trust (a surprise at the door); legal exposure
- **Repair:** One question in the cart, "Lift access?" (Lift / No lift, floor 1–2 / No lift, floor 3–5), **nothing pre-selected**. "No lift, floor 3–5" adds a visible line, "No-lift charge, paid to driver: +$20", to the Estimated total.
- **Trade-off we accept:** B removes the delivery-day leverage the firm currently has (Finding 3's endowment effect), and may cost some orders. In return it gains trust and fewer disputes at the door. The guardrail tests whether that cost is real.
- **Prediction:** Measured through the primary metric (test plan).

## Finding 4 – Assembly offered as "+$8.90", with nothing about anchoring (a missed nudge)
- **Where:** Services step: "Do you need assembly? BILLY Bookcase + $8.90", unticked (screenshot 05). IKEA's assembly page says the 10% fee "includes the installation of a tip-over restraint", and its "Secure it or Return it!" page says free-standing furniture must be anchored to the wall to prevent tip-over accidents involving children. Neither point appears anywhere in the flow.
- **What the user sees and does:** For a 202 cm bookcase, assembly reads as an optional fee to avoid. Nothing tells the shopper that anchoring matters or that assembly includes it.
- **Principle (week, reading):** **W7 – Lee & Aaker (2004), "Bringing the Frame into Focus":** "a message about safety, responsibility, or avoiding a negative outcome should generally fit a loss frame", so the prompt should be prevention-framed ("prevent tip-over"). **W7 – Petrova, Schwarz & Song (2012), "fluency and expected effort":** people read hard-to-process information as a sign the task is hard; here anchoring isn't explained at all. **W6 – Beshears & Gino:** planning prompts and reminders engage slow thinking at the point of decision.
- **Mechanism, whose goal wins:** Nobody wins. The user's safety goal goes unserved, and so does the store's interest in fewer accidents and more assembly bookings. **MISSED NUDGE**
- **Severity 0–4:** CC [3] • NS [3] • SAJ [3] • VP [3] • agreed [3] • driver: cost (health); how often (every tall item)
- **Repair:** Under the bookcase, a calm info card: "This bookcase must be anchored to the wall to prevent tip-over." Two **unticked** options: "Add assembly incl. anchoring (+$8.90)" and "I'll anchor it myself (kit included)".
- **Why not pre-tick assembly:** We considered making paid assembly the default. We rejected it: a pre-ticked **paid** add-on is the course's own sludge example (Makan-to-Door's pre-ticked "Order Protection"), and the CCCS guidance in the briefing rules out pre-ticked boxes. The free "anchor it myself" option means safety doesn't depend on paying.
- **Trade-off we accept:** The card adds one more thing to read and decide at checkout, so B is slightly slower. That is the point: it moves the shopper from autopilot to slow, deliberate thinking at the moment the safety choice is made (W6 – Beshears & Gino, planning prompts). We accept the extra step because it appears only for tall furniture, and the guardrail checks that it does not put shoppers off ordering.
- **Prediction:** The share who plan to anchor the bookcase (assembly, or "I'll anchor it myself") moves from about **20% in A to 40% in B**. Reasoning: today safety is invisible, so we assume a low baseline; salience plus prevention framing should roughly double it. This is a rough committed estimate and the prediction we consider most likely to fail. We drop this repair if B is not above A.

## Finding 5 – Delivery date and time slot pre-selected
- **Where:** Services step, "Pick a date for delivery": the first available date (10 Nov) and the slot "9:00 AM – 12:00 PM" are already selected (screenshot 06). The Payment step confirms "Delivery and assembly slot: 10 November 9:00 AM – 12:00 PM" (screenshot 07).
- **What the user sees and does:** Most shoppers will continue with the slot chosen for them.
- **Principle (week, reading):** **W4 – Kahneman, ch. 34 "Frames and Reality":** in the organ-donation example, people "accept the default, partly because System 2 is lazy"; there is no neutral frame.
- **Mechanism, whose goal wins:** The earliest slot is often what users want, and it fills IKEA's schedule. But a morning slot on a weekday can be wrong for a working shopper and lead to a missed delivery. **GREY**
- **Severity 0–4:** CC [1] • NS [1] • SAJ [1] • VP [1] • agreed [1] • driver: how often (every order); cost (low)
- **Repair:** None in B. We keep the test focused on cost and safety.

## Finding 6 – Instalments unlocked only at $250
- **Where:** Payment step: "Instalment plan – Only allowed by an order value of at least $250", greyed out (screenshot 07). The top strip also advertises "0% instalment payment plan".
- **What the user sees and does:** At $132.90, the shopper sees a benefit just out of reach, with a visible target.
- **Principle (week, reading):** **W2 – Berger & Pope (2011), "Can Losing Lead to Winning?":** goals act as reference points, and being slightly below one increases effort. A visible $250 threshold can pull shoppers to add items. **W5 – Thaler & Sunstein, "Resisting Temptation":** credit can defeat commitments people make to themselves.
- **Mechanism, whose goal wins:** It can help people spread a large cost, but it also invites extra spending to qualify. **GREY**
- **Severity 0–4:** CC [2] • NS [2] • SAJ [3] • VP [2] • agreed [2] • driver: cost (small, for most)
- **Repair:** None in B.

## Finding 7 – "365 days to change your mind" (a good nudge, with a condition)
- **Where:** Cart, top strip and under the payment badges (screenshots 01–02).
- **What the user sees and does:** A long return window, stated plainly at the moment of choice.
- **Principle (week, reading):** **W4 – Kahneman, ch. 26:** losses loom larger than gains; an easy return lowers the perceived risk of buying. **W3 – Ariely, ch. 9:** the promise also sets an expectation.
- **Mechanism, whose goal wins:** Lower regret risk for the user, more trust and sales for the store. **NUDGE**. **But** IKEA SG's return policy requires "unassembled, unused and undamaged products in their original packaging", and excludes damage from "incorrect self-assembly". For assembled furniture, the message overpromises. Our own B makes this sharper, because Finding 4's repair encourages assembly.
- **Severity 0–4:** CC [3] • NS [2] • SAJ [3] • VP [2] • agreed [3] • driver: trust (for assembled items)
- **Repair:** **Keep the message**, and add one line under it in B: "Returns: unassembled items in original packaging. Conditions apply."

## Finding 8 – Calm blue buttons, nothing pre-selected at delivery or payment (a good nudge to keep)
- **Where:** "Check out", "Continue to payment" (blue, rounded). The delivery method and payment method start unselected (screenshots 04, 07).
- **What the user sees and does:** No pressure and no hidden default on the two money choices.
- **Principle (week, reading):** **W8 – Labrecque & Milne (2011), "Exciting Red and Competent Blue":** blue is associated with competence, red with excitement. **W8 – Alter, *Drunk Tank Pink*, ch. 7 "Colours":** red raises arousal. A red, urgent "PAY NOW" (the course's Makan-to-Door sample) might close sales faster but adds pressure; we treat the effect on repeat purchases as a hypothesis, not a finding.
- **Mechanism, whose goal wins:** Both goals are served. **NUDGE**
- **Severity 0–4:** agreed 0 • keep it
- **Repair:** **Keep it.** In B the cart button also shows the estimate: "Check out – $[Estimated total]".

---

## Test plan (pre-registered here)
- **Question:** Does B help shoppers know what a furniture order will really cost, and plan to anchor tall furniture, without putting them off completing it?
- **Procedure:** Moderated. One URL; with no `?v` the app assigns A or B at random (kept in localStorage; `?v=A` / `?v=B` override it for demos). A group member reads the task aloud. The tester goes through the flow to the payment step and says their answers aloud. We record answers and the variant shown on the debrief in a sheet.
- **Task:** "You're buying the ARLO bookcase for your flat: 3rd floor, walk-up, **no lift**. You want it delivered to your home. Go through checkout as you normally would, and stop before paying."
- **Questions at the payment step:** (1) "How much will this order cost you in total, including anything you pay on delivery day?" (2) "Will the bookcase be anchored to the wall?" (3) "Would you place this order?"
- **Correct answer to (1):** depends on the tester's own choices, using IKEA SG's published rules: $89 + $35 truck delivery + $20 no-lift charge (+ $8.90 if they chose assembly) = **$144.00 without assembly, $152.90 with assembly**.
- **Primary metric:** the share whose stated total is within ±$5 of the correct figure for their choices. **A ≈ 10% → B ≈ 60%.** We drop the Finding 1–3 repairs if B is not at least **20 percentage points** above A (e.g. A 10% → B must reach at least 30%).
- **Secondary (exploratory):** the share who say the bookcase will be anchored (assembly chosen, or "I'll anchor it myself"): A ≈ 20% → B ≈ 40%.
- **Guardrail (the store's legitimate goal):** the share who would place the order in B is no more than 5 percentage points below A. If it falls further, we report it and revisit Finding 3's repair first.
- **Sample:** two proportions, α = .05, power = .80. Primary (10% → 60%): **14 per arm, 28 total**. Secondary (20% → 40%): 82 per arm, so with our numbers it is a pilot only.
- **Analysis:** two-proportion test; report the 95% CI, not only p.
- **Ethics:** consent screen first; no real order, payment or personal data (details fields pre-filled with fictional values and disabled); fictional brand and products; the condition is not shown before the task. The debrief says nothing was ordered and explains the $20 no-lift charge that variant A did not show.

---

## Readings cited (course list)
- Berger, J. & Pope, D. (2011). Can losing lead to winning? *Management Science* (W2)
- Nodder, C. (2013). *Evil by Design*, "Greed" (W2)
- Ariely, D. *Predictably Irrational*, ch. 9 "The Effect of Expectations" (W3)
- Kahneman, D. (2011). *Thinking, Fast and Slow*, ch. 26, 27, 34 (W4)
- Alter, A. (2014). *Drunk Tank Pink*, ch. 2 "Labels" (W5) and ch. 7 "Colours" (W8)
- Thaler, R. & Sunstein, C. *Nudge*, ch. 2 "Resisting Temptation" (W5)
- Beshears, J. & Gino, F. (2015). Leaders as decision architects. *HBR*, 93(5), 51–62 (W6)
- Lee, A. Y. & Aaker, J. L. (2004). Bringing the frame into focus (W7)
- Petrova, P., Schwarz, N. & Song, H. (2012). Fluency and social influence (W7)
- Labrecque, L. I. & Milne, G. R. (2011). Exciting red and competent blue (W8)


## Added after building
