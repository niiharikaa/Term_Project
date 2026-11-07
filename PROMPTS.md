# PROMPTS.md – Comfy Home (audit of IKEA Singapore cart and checkout)
**Members:** [CC = Carolina Cataldi], [NS = Niharika Singavajhala], [SAJ = Sherin Arun Jasmine], [VP = Valeria Pontrelli]
**Repository:** https://github.com/niiharikaa/Term_Project
**Live link:** https://term-project-q9oa.vercel.app (`?v=A` / `?v=B`)
**Roles:** driver NS • prompter NS,CC,SAJ, VP • logger NS
**Other AI used:** we used Claude (Claude Code) to help write and refine the prompts below.

---

## Entry 1 – Variant A screens • 2026-11-05, 13:03 SGT • sent by NS • Google Stitch
Input: 7 dated screenshots of IKEA Singapore's cart and checkout (2026-11-05, personal details blurred), plus:
```
Replicate these IKEA Singapore screens exactly as four mobile/desktop web screens – Cart, Checkout Details, Checkout Services, Checkout Payment – under the fictional brand "COMFY HOME" (no IKEA logo, colours or product names; use "LUMA table lamp" and "ARLO bookcase"). Same layout, wording and prices as the screenshots. Do not add anything that isn't in them. Reference: IKEA Singapore cart and checkout (ikea.com/sg/en/cart/), captured 2026-11-05 – use the attached screenshots as the source.
```
**What came back:** Four screens, but the cart showed only the bookcase. Although we attached both the lamp-only and the bookcase screenshots, Stitch merged them into one cart state, so the "Delivery price From $10" (small item) → "From $35" (furniture) change was lost.
**Our judgement, and what we changed next:** That change is the evidence for our first finding (delivery shown only as a "From" price), so variant A must show both cart states. Stitch only designs static screens, so instead of another Stitch prompt we exported the design and made AI Studio build the $10 → $35 switch, with the lamp screenshot attached as the reference (Entry 2).
**Principle check:** none: production only.

## Entry 2 – Variant A build • 2026-11-05, 13:22 SGT, pushed 14:04 (`e0b6bcd`) • sent by NS • Google AI Studio (Build)
Input: the Stitch export, plus the 7 dated screenshots attached. Stitch's export pre-filled the message "Build me an app with screens that look like this. You can hotlink images from the html." We replaced it with our own prompt, because in our first attempt that default led AI Studio to invent features and load outside images.
```
We are SMU students building "variant A" of a class experiment for a university term paper. Turn this Stitch design into a working app that replicates the attached IKEA Singapore screenshots exactly: cart → checkout Details → Services → Payment, brand "COMFY HOME". Do not improve or add anything that isn't in the screenshots.

The Stitch design only shows the cart with the bookcase. The cart must START with only the "LUMA table lamp" ($49.90), as in the lamp screenshot, with a "You may also like" row offering the "ARLO bookcase" ($89) and an "Add to cart" button.

Keep the pricing behaviour exactly as shown:
- Cart: "Delivery price From $10" with only the lamp, "From $35" once the bookcase is added; Subtotal includes that figure.
- Details: Total price shows products only (delivery drops out).
- Services: delivery options and assembly add to the total; delivery date and time slot pre-selected, as in the screenshot.

Also:
- A consent screen first ("Class prototype – no real order, no payment, no personal data").
- Details fields pre-filled with fictional values and disabled.
- Choosing a payment method goes to a short debrief (nothing ordered, brand fictional, "You saw variant A") – no card fields.
- Read ?v= from the URL; everyone sees A for now. Do not build variant B.

Guardrails: static Vite + React front end only. No server, no Gemini or API keys, no network calls, no login, no real payment, no real brand names, logos or images from other sites.
```
**What came back:** The first thing we noticed: the Stitch design was **not carried over** by the export, so AI Studio built the screens from our prompt and the attached screenshots instead. The result matched IKEA's flow and pricing. Cart "From $10" (lamp only) → "From $35" with the bookcase ($124); Details $89 (delivery drops out); Services +$35 truck and +$8.90 assembly = $132.90; delivery date and slot pre-selected; instalments locked below $250; details fields disabled; consent and debrief present. Three problems: Gemini, Express and a GEMINI_API_KEY were still in the project files despite our guardrail; the products carried **real IKEA article numbers** (005.682.24, 005.220.47); and the debrief did not explain the $20 no-lift charge the checkout leaves out.
**Our judgement, and what we changed next:** The screenshots, not the Stitch design, were what made the replica accurate, so attaching them was the right call. We accepted the build as variant A and fixed the three problems in one follow-up prompt (Entry 3) before committing AUDIT.md.
**Principle check:** none: production only. (All findings are visible in A as on IKEA's site.)

## Entry 3 – Clean-up: Gemini, article numbers, debrief • 2026-11-05, 14:18 SGT, pushed 14:42 (`70be986`) • sent by NS • AI Studio
```
Three fixes, change nothing else:
1) Remove @google/genai, express and dotenv from package.json, the GEMINI_API_KEY and APP_URL lines from .env.example, and the server-side Gemini capability from metadata.json.
2) Replace the article numbers with fictional ones: LUMA lamp "302.118.47", ARLO bookcase "105.274.63".
3) Add to the debrief: "In a real order to a 3rd-floor flat with no lift, a $20 no-lift charge would also be paid to the driver – this checkout did not show it. You saw variant A."
```
**What came back:** All three fixes applied. Gemini, Express and dotenv were removed from package.json, the key lines from .env.example and the Gemini capability from metadata.json. The article numbers are now fictional (302.118.47, 105.274.63). The debrief now explains the $20 no-lift charge. AI Studio reported its own checks: 8 pricing unit tests passed, browser test of the new article numbers and debrief text, no build or lint errors.
**Our judgement, and what we changed next:** We did not rely on AI Studio's self-report. We checked the pushed files on GitHub ourselves (package.json, .env.example, metadata.json) and clicked through the flow once more. Variant A is final; next we commit AUDIT.md before any prompt for B.
**Principle check:** Ethics (the debrief explains what A withholds).

## Entry 4 – Hide the variant on the consent screen • 2026-11-05, 14:22 SGT, pushed 14:42 (`70be986`) • sent by NS • AI Studio
```
Remove the line "Active Study Condition: Variant A" from the consent screen. The variant should only be shown in the debrief at the end. Change nothing else.
```
**What came back:** The line was removed; the consent screen is otherwise unchanged and the debrief still names the variant.
**Our judgement, and what we changed next:** AI Studio had added "Active Study Condition: Variant A" to the consent screen unasked. A tester who knows their condition before using the page may search harder for hidden costs or guess what we are testing, which biases the A/B comparison. So the condition is revealed only in the debrief.
**Principle check:** W1 – randomised experiments: participants should not know their condition in advance.

## Entry 5 – Assembly only with the bookcase • 2026-11-05, 14:27 SGT, pushed 14:42 (`70be986`) • sent by NS • AI Studio
```
Assembly only applies to the ARLO bookcase. If the bookcase is not in the cart, hide the assembly option and reset it to unticked, and don't list assembly in the checkout summary or the debrief. Change nothing else.
```
**What came back:** The assembly fix worked: a lamp-only order no longer lists assembly (total $84.90). We then noticed the debrief always shows the "$20 no-lift charge" sentence, even for a lamp-only order, where IKEA's policy (the charge belongs to home delivery of large items) would not apply.
**Known limitation, left as is:** Our test task uses the bookcase, where the sentence is correct, so we did not spend another prompt on it. We note it here instead.
**Our judgement, and what we changed next:** While testing, a lamp-only order showed "Assembly service: Selected (+$8.90)" in the debrief, though the $84.90 total did not charge it. Assembly had stayed ticked after the bookcase was removed. IKEA offers assembly only for items that need it, so the display was wrong rather than the maths. We re-tested the main path afterwards (bookcase, truck delivery, assembly → $132.90).
**Principle check:** none: production only.

## Entry 6 – Fix the failed Vercel build • 2026-11-05, 15:11 SGT, pushed 15:13 (`e3adfdd`) • sent by NS • AI Studio
Vercel's first deploy failed. The first red line in the build log was an npm peer-dependency conflict, "Conflicting peer dependency: esbuild@0.28.2".
```
The Vercel build fails with an npm peer-dependency conflict: "Conflicting peer dependency: esbuild@0.28.2" (devDependencies pins esbuild ^0.25.0, but vite ^8 needs esbuild ^0.27 || ^0.28). Remove "esbuild" and "tsx" from devDependencies in package.json – this is a static Vite + React app and doesn't need them. Make sure "npm install" and "npm run build" succeed. Change nothing else.
```
**What came back:** esbuild and tsx removed from package.json; Vercel redeployed successfully at https://term-project-q9oa.vercel.app.
**Our judgement, and what we changed next:** The conflict came from leftovers of AI Studio's server template (esbuild, tsx) that a static front end doesn't need. Following the course's failure catalogue, we pasted the first red line into AI Studio rather than working around it in Vercel.
**Principle check:** none: production only.

## Entry 7 – Parcel delivery for the lamp, nothing pre-selected • 2026-11-05, 17:59 SGT, pushed 18:11 (`e396f7c`) • sent by NS • AI Studio
Input: screenshot 08 (IKEA Services step, lamp only, personal details blurred), plus:
```
On the Services step, match the IKEA lamp screenshot:
- When only the LUMA lamp is in the cart, show three delivery options in this order: "Parcel delivery – Delivered within 3-5 working days – $10", "Click & collect – Select preferred collection date – $10", "Truck delivery – Select preferred delivery date – $35". Parcel delivery has no date or time picker.
- When the ARLO bookcase is in the cart, don't show Parcel delivery (it is only for orders up to 15 kg).
- No delivery option is pre-selected; the shopper must choose one to continue.
- If Parcel delivery is chosen, add $10 to the total and show "Parcel delivery $10" in the summary and debrief.
Change nothing else.
```
**Why we sent it:** While checking the audit, we found IKEA's lamp order offers Parcel delivery at $10 (its delivery page: parcel delivery "starts from $10" for orders up to 15 kg). Variant A had only Click & collect and Truck, and Truck was pre-selected, while IKEA pre-selects nothing. This also corrected our first reading of Finding 1: we had assumed the $10 was the pick-up price, but it is a real parcel-delivery price, so the cart's "From $10" → "From $35" is accurate and Finding 1 became GREY.
**What came back:** AI Studio reported all four changes. Lamp only: Parcel delivery, Click & collect and Truck delivery, in that order, Parcel without a date picker. Bookcase in the cart: Parcel delivery hidden, only Click & collect ($10) and Truck delivery ($35). No option pre-selected, and "Continue to payment" appears only after one is chosen. Parcel adds $10 and is listed in the summary and the debrief.
**Our judgement, and what we changed next:** We checked it ourselves rather than relying on the report: [lamp only, Parcel → $59.90; bookcase, Truck + assembly → $132.90]. This is our final variant A, pushed at 18:11 (`e396f7c`).
**Principle check:** W4 – Kahneman ch. 34 (defaults): variant A must not add a default that IKEA doesn't have, or A would no longer be a faithful baseline.

---

## Pre-registration • AUDIT.md committed on github.com, 2026-11-05, 18:17 SGT (`b27ce73`) • by NS
Committed after the final variant A push (18:11) and before any prompt for B. From here on, nothing above "Added after building" in AUDIT.md changes.
On 2026-11-06 at 19:08 SGT (`703b362`) the file was renamed from `audit.md` to `AUDIT.md` (the name the brief asks for) and the group number filled in; no finding or prediction changed. Pulled into AI Studio before the B prompt.

---

## Entry 8 – Variant B • 2026-11-06, 19:13 SGT, pushed 19:36 (`a7d631d`, together with Entry 9) • sent by NS • AI Studio
```
Add variant B, the redesign. Keep variant A exactly as it is.
1) ?v=A shows A and ?v=B shows B. With no ?v, assign A or B at random once and keep it in localStorage; ?v= always wins.
2) B changes only these elements, as AUDIT.md predicts:
- F1: In the cart, replace "Delivery price From $10/From $35" with the delivery for this cart, without "From": "Parcel delivery: $10" (lamp only) or "Truck delivery (items over 15 kg): $35" (bookcase in cart).
- F3: When the bookcase is in the cart, add a question in the cart: "Lift access?" with three options: Lift / No lift, floor 1–2 / No lift, floor 3–5. Nothing pre-selected. "No lift, floor 3–5" adds a line "No-lift charge, paid to driver: +$20".
- F4: Under the bookcase in the cart, a calm info card: "This bookcase must be anchored to the wall to prevent tip-over." with two unticked options: "Add assembly incl. anchoring (+$8.90)" and "I'll anchor it myself (kit included)".
- F2: Rename "Subtotal (excl. assembly fees)" to "Estimated total": products + delivery + assembly (if chosen) + no-lift charge (if chosen). Show this same Estimated total on Details, Services and Payment instead of the changing totals. It only changes if the shopper changes a choice (e.g. Click & collect removes the delivery and no-lift lines).
- F7: Under "365 days to change your mind", add: "Returns: unassembled items in original packaging. Conditions apply."
- F8: The cart button reads "Check out – $[Estimated total]". Same blue colour.
3) Nothing pre-selected or pre-ticked. Same layout, fonts and colours as A. The debrief names the variant seen.
Change nothing else.
```
**What came back:** AI Studio reported all six repairs. `?v=A` / `?v=B` routing with 50/50 random assignment kept in localStorage. F1 delivery without "From" ("Parcel delivery: $10" / "Truck delivery (items over 15 kg): $35"). F3 "Lift access?" unselected, +$20 line for floor 3–5. F4 anchoring card with both options unticked. F2 one "Estimated total" held across Details, Services and Payment. F7 return line. F8 "Check out – $[Estimated total]" in the same blue. The debrief names the variant and lists the lift and assembly answers. AI Studio reported 12/12 pricing tests passing and a clean build.
**Our judgement, and what we changed next:** We checked B ourselves on the live site (`?v=B`), not only AI Studio's tests:
- Lamp only: "Parcel delivery $10", "Estimated total $59.90", "Check out – $59.90"; no lift question or anchoring card. ✓
- Bookcase, Truck, "No lift, floor 3–5", assembly: **$152.90** in the cart, on the button, and on Details, Services and Payment; the debrief repeats it and says "You saw variant B". ✓
- Same, "I'll anchor it myself": **$144**. ✓
- Lift question and anchoring card start unselected, also after "Test again". ✓
- Click & collect: the delivery and no-lift lines drop out ($99). Assembly also drops out, as in A, since assembly comes with delivery. ✓
- `?v=A` unchanged ("From $10", "Subtotal (excl. assembly fees)", plain "Check out"). ✓
Small points we noted but did not change: the no-lift line is shown in an amber colour, a slight visual emphasis that A does not have; whole-dollar totals show as "$144" rather than "$144.00"; and choosing Click & collect silently drops the assembly the shopper ticked in the cart.
**Principle check:** each repair traces to a finding in AUDIT.md (F1 Nodder/Ariely/Alter; F2 Kahneman ch. 26–27, Beshears & Gino; F3 Thaler & Sunstein, Kahneman ch. 26, 34; F4 Lee & Aaker, Petrova et al.; F7 Kahneman ch. 26; F8 Labrecque & Milne). F5 and F6 deliberately unchanged.

## Entry 9 – Read ?v from the hash, for checking in the preview • 2026-11-06, 19:30 SGT, pushed 19:36 (`a7d631d`) • sent by NS • AI Studio
```
For our own checking only: in the preview, if the URL has no ?v, read ?v from the hash too (e.g. #v=B). Change nothing else.
```
**Why we sent it:** The AI Studio preview opens without `?v=`, so the app randomly assigned us variant A and kept it in localStorage; we could not see B to check it. We asked for a hash fallback instead of a visible A/B switch, because a switch would show testers their condition.
**What came back:** `?v=` still wins; with no `?v`, the app reads `#v=A` / `#v=B`; with neither, the random 50/50 assignment in localStorage is unchanged. AI Studio also added, unasked, a listener so changing the hash switches the variant live.
**Our judgement, and what we changed next:** The extra listener only matters to someone who edits the URL, so testers are unaffected and we kept it. We pushed variant B and the hash fallback together and checked B on the live Vercel site with `?v=B` (results in Entry 8).
**Principle check:** W1 – randomised experiments: the condition stays hidden from testers; `?v=` and the hash are for the team only.

---

## Entry 10 – Side-by-side comparison (presentation only) • 2026-11-06, 20:33 SGT • sent by NS • AI Studio (separate app, not part of the experiment)
```
Show a comparison of the two websites next to each other. Left (variant A): https://term-project-q9oa.vercel.app/?v=A Right (variant B): https://term-project-q9oa.vercel.app/?v=B
```
**Why we sent it:** To show A and B together for the paper (section 3) and the presentation. We built it as a separate app so the experiment itself stays one URL with random assignment, and testers never see both variants.
**What came back:** Both variants live in two frames, side by side, with zoom, device presets and split ratios. AI Studio also added, unasked, a "differences matrix" with behavioural-science explanations, a walkthrough guide and a 5-point evaluation scorecard with export.
**Our judgement, and what we changed next:** The two live frames are what we wanted. The extras we do not use. The differences matrix compared only the lamp-only cart (the default state when the page loads), so it missed our main repairs: the "Lift access?" question, the +$20 no-lift line and the anchoring card, which appear only once the bookcase is added. Its explanations were also its own, not our audit's. For example, it said the "Estimated total" label "builds commitment" and the price on the button "pre-qualifies purchase intent", neither of which is our reasoning or in our readings. We use the app for visuals only and take every explanation from AUDIT.md.
**Principle check:** none: presentation only. It does not change either variant.

---

**Entry 11 – Variant A: assembly must start unticked • 2026-11-07, 20:38 SGT; fixed on GitHub 21:40 (e24f475) • sent by NS • AI Studio, then GitHub**
```
In variant A, adding the ARLO bookcase must not tick assembly. Assembly starts unticked in variant A, as in IKEA screenshot 05, and is ticked only when the shopper ticks it. Variant B is unchanged. Change nothing else.
```

**Why we sent it**: In our final review, VP found that variant A ticked paid assembly automatically when the bookcase was added (setAssemblySelected(true) in src/App.tsx). IKEA's Services step (screenshot 05) shows it unticked, as our Finding 4 states. The default had been in AI Studio's first build (e0b6bcd) and survived every later fix. We missed it because the payment total still matched IKEA's $132.90. Left in place, A would test a pre-ticked default against B's unticked options, and the anchoring comparison would partly measure the default instead of our repair. **What came back:** AI Studio fixed it in the preview, but the fix never reached GitHub. AI Studio reported "changes in both Google AI Studio and GitHub" (we had edited the md files on github.com). We pulled first, as the panel asked; the pull replaced AI Studio's code with GitHub's, so the fix was lost, and the panel then showed "in sync" with the bug still in place. A second attempt would not push either. **Our judgement, and what we changed next:** We checked GitHub directly rather than trusting the "in sync" message, and found setAssemblySelected(true) still there. Since the bug was one word, we edited src/App.tsx on github.com ourselves (true → false, commit e24f475, one line changed) and pulled it back into AI Studio. Checked on the live site (?v=A, bookcase only, Truck): assembly unticked, Total price $124; ticked, $132.90. B's code was not touched. Lesson: after editing files on github.com, pull into AI Studio before prompting, or the next pull can overwrite the AI's work. Principle check: W4 – Kahneman ch. 34 (defaults): a pre-ticked paid add-on is the default our audit warns against; variant A must not contain a default IKEA does not have.
