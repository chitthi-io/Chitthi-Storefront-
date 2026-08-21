# 3D Models — Shopping List & Integration Spec

**Status:** ✅ 4 models INTEGRATED AND LIVE (21 Aug 2026, after the owner
shared the Sketchfab token). 6 models downloaded, staged in `models-3d/`
(gitignored), awaiting integration into the remaining template repos.

**LIVE NOW (verified in production, WebGL-checked):**
- 09 Vintage Vinyl → real 3D turntable (`platine1` platter spins on needle-drop)
- 10 Couple Trivia → 3D golden trophy rises on a perfect score
- 11 Scratch Surprise → 3D gift box whose lid springs open at reveal
- 14 Open When → floating 3D envelope in the gate
- Stack: self-hosted three.js r128 (UMD) + GLTFLoader + model.glb per repo;
  render loop pauses offscreen; DPR capped at 2; reduced-motion renders a
  static frame; WebGL absence = graceful 2D fallback; CC-BY credit line in
  each footer.

---

## 0. AUDIT RESULTS (from Sketchfab's public API, 21 Aug 2026)

### ✅ Usable — downloadable, CC Attribution (needs a small credit line)

| Model (template) | Faces | Verdict |
|---|---|---|
| Turntable (09) — by Mazou | 5,528 | ✅ Ideal poly budget. Platter may need manual separation for the spin. |
| Birthday cake (01) — by Sakthivel G | 68,750 | ⚠️ Usable but heavy — will perf-test on mobile; fall back to a lighter model if fps drops |
| Paper plane (06) — by Trockk | 6 | ✅ Ultra-light (stylised origami). |
| Envelope icon (14) — by Firman Maulana Ihsan | 534,820 | ❌ **Half a million faces — too heavy for phones. Skip; use the 60-face envelope below.** |
| Golden trophy (10) — by Incg5764 | 7,408 | ✅ |
| Sitting cat (03) — by 3D Creator | 74,586 | ⚠️ Usable but heavy — perf-test; idle animation only |
| Gift box (11) — by Neelam Devi | 342 | ✅ "Free Standard" license = attribution required |
| Heart (05) — by omarelone | 4,800 | ⚠️ **Check the visual first — this is an anatomical heart, not a stylised one. Swap for a cuter model if it looks medical.** |
| Ornate book (07) — by N8 | 10,971 | ✅ |
| Envelope (hero + 14 fallback) — by DrewA | 60 | ✅ Perfect for both the hero float and the envelope grid |

### ❌ Blocked — not downloadable / wrong license (need replacements)

| Model (template) | Blocker |
|---|---|
| Airbus plane (02) — by academyinnovaworld | All rights reserved, **not downloadable**, 474k faces. Find a CC0/CC-BY low-poly plane instead. |
| Chest (08) — by sisid | All rights reserved, not downloadable (pity — only 2k faces). Find a CC0/CC-BY chest. |
| Rose (12) — by greenlive | Sketchfab **paid Standard license**, not free-downloadable. Find a CC0/CC-BY rose. |
| Diya (13) — by Abdullah | All rights reserved, not downloadable. Find a CC0/CC-BY diya. |

### How to get the 10 usable files (choose one)

- **Option A (owner):** on each model page, hit "Download 3D Model" (needs a
  Sketchfab account; CC-BY models download free) → upload the GLB files here.
- **Option B (me):** owner shares a Sketchfab API token
  (sketchfab.com/settings/password → API section) and I download the 10
  allowed models automatically.

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
