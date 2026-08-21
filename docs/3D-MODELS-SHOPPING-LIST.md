# 3D Models — Shopping List & Integration Spec

**Status:** awaiting models from the owner. Integration stack is decided and
ready — as each model arrives it goes into its template (and the storefront
hero where marked), tested on mobile, and deployed.

---

## 1. How the models will be integrated (read this first)

- **Engine:** self-hosted `three.js` (min build) + `GLTFLoader` stored *inside
  each repo* — no CDN, per the studio self-host rule. Only templates that get
  a 3D model pay the ~160 KB (gzip) cost.
- **Files accepted:** `GLB` (preferred — textures baked in) or `OBJ`+`MTL`+textures.
- **Mobile 60fps rules (I enforce in code):**
  - render loop **pauses when the section scrolls offscreen** (IntersectionObserver)
  - `devicePixelRatio` capped at 2
  - `prefers-reduced-motion` → model renders as a static frame
  - no WebGL → the existing 2D art stays (graceful fallback, nothing breaks)
  - single directional + ambient light, no shadows (shadows kill mobile GPUs)
- **Animations are mine, in code** (spin, hover, lid-open, flap-open, flight
  path). The models should be *static, clean, low-poly meshes* — no rigs needed.
  If a model happens to ship with a baked idle animation, that's fine too.

## 2. What I need from you, per model

Send the **GLB file** (or a ZIP with OBJ/MTL/textures) plus the **Sketchfab
page link**. The page link matters — it shows the license, which decides
whether the model can go into a commercial product.

### License policy (honest version)

| License | Verdict |
|---|---|
| **CC0 / Public Domain** | ✅ Perfect — free, no attribution, any use |
| **Royalty-free / purchased** | ✅ Fine — keep the receipt |
| **CC-BY** | ⚠️ Free but **requires credit**. If you're OK with a tiny "model by X" line in the footer, I'll add it. If you want zero attribution, skip these |
| **Standard Sketchfab download (all rights reserved)** | ❌ Not embeddable in a paid product |

**About "removing watermarks":** downloaded model *files* don't contain
watermarks (watermarks are on Sketchfab's preview images). The real constraint
is the license above — if a model's license doesn't permit modification or
commercial use, no amount of watermark removal makes it legal to sell. I'll
check every file you send and tell you plainly if one can't be used.

---

## 3. THE SHOPPING LIST

### 🎯 PRIORITY 1 — Must-haves (5 models, biggest visual payoff)

| # | Template | Model | Search on Sketchfab | Poly target | Notes |
|---|---|---|---|---|---|
| 1 | 09 Vintage Vinyl | **Turntable** | `turntable record player` | 15–25k tris | **Platter must be a separate mesh** so I can spin it in code; otherwise I'll swap the disk myself |
| 2 | 01 Midnight Keepsake | **Birthday cake** | `birthday cake low poly` | 8–15k tris | One or two tiers, no candles needed — the flame stays code-drawn (shader) |
| 3 | 06 Paper Plane Apology | **Origami paper plane** | `origami paper plane` | 1–3k tris | Super light; will fly, tumble and unfold via code |
| 4 | 14 'Open When' Box | **Envelope** | `envelope low poly` | 1–2k tris | **Flap as a separate mesh** for the 3D opening; seal stays CSS |
| 5 | 02 Until We Meet Again | **Passenger airplane** | `airplane low poly` | 4–8k tris | Flies the route line in the LDR gate |

### ✨ PRIORITY 2 — Nice-to-haves (5 models)

| # | Template | Model | Search on Sketchfab | Poly target | Notes |
|---|---|---|---|---|---|
| 6 | 10 Couple Trivia | **Golden trophy** | `trophy low poly` | 4–8k tris | Rises on the 100% score, confetti stays particles |
| 7 | 08 Time Capsule | **Treasure chest / vintage box** | `treasure chest low poly` | 6–12k tris | **Lid as separate mesh** so it opens per unlocked month |
| 8 | 03 Be Mine Proposal | **Cute sitting cat** | `cat low poly cute` | 6–12k tris | Idle-blinks beside the buttons; the 6 kitten memes stay |
| 9 | 11 Scratch Surprise | **Gift box** | `gift box low poly` | 2–5k tris | Pops open at the reveal moment |
| 10 | 05 Anniversary Reel | **Heart** | `heart low poly` | 1–3k tris | Beats softly in the hero behind the counter |

### 🌿 PRIORITY 3 — Optional (4 models)

| # | Template | Model | Search on Sketchfab | Poly target | Notes |
|---|---|---|---|---|---|
| 11 | 07 Roast & Toast | **Book** | `book low poly` | 4–8k tris | Sits under the swipe deck |
| 12 | 12 Floral Bouquet | **Single rose** | `rose low poly` | 3–8k tris | 3D hero accent; SVG bouquet stays |
| 13 | 13 Royal Wedding | **Mandap** (or a lighter **diya**) | `mandap` / `diya low poly` | 20–30k / 3–5k tris | Mandap only if a genuinely low-poly one exists |
| 14 | Storefront hero | **Floating envelope** | `envelope low poly` | 1–2k tris | Gentle idle float behind the H1 on chitthi.io |

---

## 4. Delivery workflow once files arrive

1. You drop files into the workspace (or send a download link) with the
   Sketchfab page URL per model.
2. I verify each license → integrate (`three.js` + loader, self-hosted in the
   target repo) → mobile QA on 390px (fps + overflow + reduced-motion) →
   deploy → you see it live.
3. Anything that fails licensing or perf gets sent back with a reason and a
   suggested replacement search.

**Suggested first batch:** the 5 must-haves (turntable, cake, paper plane,
envelope, airplane) — that covers templates 09, 01, 06, 14, 02 in one pass.
