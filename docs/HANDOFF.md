# CHITTHI.IO — SESSION HANDOFF

**Everything needed to continue this project in a new chat, with a new agent, or by hand.**
Last verified: 21 Aug 2026. All checks below were run live, not recalled.

**Update 21 Aug 2026 — the 14-template mandate shipped.** Templates 09–14 were
built, deployed and added to the storefront in one session (commits `57cca55`
and before). Six new repos live under `chitthi-io`, all demo URLs HTTP 200,
storefront now shows 14 priced cards. Delivery package: `docs/DELIVERY-PACKAGE-2026-08-21.md`.
All six new builds carry **sample data** (Anya & Prateek) — same caveats as
templates 01–08. The two CC0 tracks are still the only audio (mood-mapped:
romantic → track A, playful → track B).

---

## 1. WHAT THIS IS

Chitthi.io is a boutique digital gifting studio. Customers order a personalised,
interactive mini-website (a "keepsake") over WhatsApp and receive a private link
within 24 hours. A public storefront lists the templates.

**Owner contact — the only two channels. There is no email address.**
- WhatsApp **+91 70788 48468**
- Instagram **@chitthi.io**

---

## 2. LIVE URLS

| What | URL | Status |
|---|---|---|
| **Storefront (canonical)** | https://chitthi-io.netlify.app | 🟢 200 · 8/8 cards |
| Storefront (backup) | https://chitthi-io.github.io/Chitthi-Storefront- | 🟢 200 |

> ⚠️ The Netlify site was **renamed** mid-project. `chitth-io.netlify.app`
> (one `i`) is **dead — 404**. The correct host is **`chitthi-io.netlify.app`**.
> Both hosts deploy from the same `main` branch, so they stay in sync.

### The 8 templates — all live, all HTTP 200

| # | Template | Repo | Live |
|---|---|---|---|
| 01 | A Midnight Keepsake | `Chitthi-Happy-Birthday-1` | `/Chitthi-Happy-Birthday-1/` |
| 02 | Until We Meet Again | `Chitthi-Until-We-Meet-Again` | `/Chitthi-Until-We-Meet-Again/` |
| 03 | Playful 'Be Mine' Proposal | `Chitthi-Be-Mine-Proposal` | `/Chitthi-Be-Mine-Proposal/` |
| 04 | Retro Polaroid Scrapbook | `Chitthi-Polaroid-Scrapbook` | `/Chitthi-Polaroid-Scrapbook/` |
| 05 | Forever & Always Reel | `Chitthi-Anniversary-Reel` | `/Chitthi-Anniversary-Reel/` |
| 06 | Paper Plane Apology | `Chitthi-Paper-Plane-Apology` | `/Chitthi-Paper-Plane-Apology/` |
| 07 | Roast & Toast Book | `Chitthi-Roast-And-Toast` | `/Chitthi-Roast-And-Toast/` |
| 08 | Birthday Time Capsule | `Chitthi-Time-Capsule` | `/Chitthi-Time-Capsule/` |
| 09 | Vintage Vinyl Keepsake | `Chitthi-Vinyl-Keepsake` | `/Chitthi-Vinyl-Keepsake/` |
| 10 | Couple Trivia Challenge | `Chitthi-Couple-Trivia` | `/Chitthi-Couple-Trivia/` |
| 11 | Scratch-to-Reveal Surprise | `Chitthi-Scratch-Surprise` | `/Chitthi-Scratch-Surprise/` |
| 12 | Forever Floral Bouquet | `Chitthi-Floral-Bouquet` | `/Chitthi-Floral-Bouquet/` |
| 13 | Royal Wedding Save-The-Date | `Chitthi-Royal-Wedding` | `/Chitthi-Royal-Wedding/` |
| 14 | 'Open When' Mood Box | `Chitthi-Open-When-Box` | `/Chitthi-Open-When-Box/` |

All prefixed `https://chitthi-io.github.io`. GitHub account: **`chitthi-io`** (15 repos, all public).

---

## 3. CREDENTIALS

**No token is stored in this repository, deliberately.** Every repo is public;
committing one would expose the whole account.

The token used during this project is a **classic PAT with account-wide scope**
including `delete_repo`, `admin:org` and `gist`. It has been pasted into a chat
transcript and must be treated as compromised.

**Do this first, before anything else:**

1. Revoke it — github.com/settings/tokens
2. Mint a **fine-grained** replacement — github.com/settings/personal-access-tokens/new
   - Resource owner: `chitthi-io`
   - Repository access: **Only select repositories** → the 9 Chitthi repos
   - Permissions: **Contents** read+write · **Pages** read+write · **Workflows** read+write · **Metadata** read (auto)
   - Expiration: 30 days
3. Use it as an env var, never in a file:
   ```bash
   export GH_TOKEN=github_pat_xxxxx
   ```

Do **not** grant `Administration` — that carries repo deletion.

---

## 4. WORKSPACE LAYOUT

```
/home/user/                      ← this IS the storefront git repo
├── index.html                   storefront markup only
├── 404.html                     branded not-found page
├── netlify.toml                 headers, redirects, /whatsapp /instagram /ldr shortlinks
├── assets/css/                  tokens · base · layout · components · responsive
├── assets/js/                   config · data · render · main   (classic scripts, no modules)
├── assets/img/thumbs/           8 storefront card images, 1600x1000
├── brand/                       original logo + mockups, archived
├── tools/
│   ├── generate_thumbnail.py    1920x1080 editorial thumbnail engine (PIL)
│   ├── deploy.sh                idempotent GitHub Pages deploy (PUBLIC — demos only)
│   ├── deploy-private.sh        PRIVATE repo + Netlify deploy for REAL orders
│   ├── bust.py                  cache-busting stamper  ← MUST run before each commit
│   └── fonts/                   Playfair, Jakarta, Caveat (OFL)
├── docs/
│   ├── CLIENT-PLAYBOOK.md       intake form, delivery message, QA checklist, pricing
│   ├── TEMPLATES.md             all 8 specs + pipeline
│   └── HANDOFF.md               this file
├── backups/                     mirrors of 11 deleted repos + a zip
└── build-*/                     one working dir per template (gitignored)
```

`build-*`, `backups/`, `uploads/`, `thumbnails/` are gitignored — they are working
directories, not storefront source.

---

## 5. THE PIPELINE

```bash
# 1. build/edit the template in build-<name>/index.html
#    everything personal lives in CLIENT_CONFIG at the top of <script>

# 2. thumbnail — screenshots the REAL deployed page
python3 tools/generate_thumbnail.py \
  --repo Chitthi-Time-Capsule --title "The Birthday Time Capsule" \
  --edition "Milestone Edition" --tagline "Twelve letters. One a month." \
  --url https://chitthi-io.github.io/Chitthi-Time-Capsule/ \
  --polaroids photos/a.jpg photos/b.jpg --captions "one" "two" \
  --chips "Month 01" "Month 06" "Month 12"
# → thumbnails/<repo>_thumb.png (1920x1080) and _card.jpg (1600x1000)

# 3. deploy the template
export GH_TOKEN=github_pat_xxx
bash tools/deploy.sh Chitthi-Time-Capsule "launch the capsule" build-capsule

# 4. storefront: set status/thumb/price in assets/js/data.js, then ALWAYS
python3 tools/bust.py
git add -A && git commit -m "..." && git push
```

---

## 6. HARD-WON GOTCHAS — read before you debug anything

Each of these cost real time. They will bite again.

| Symptom | Cause | Fix |
|---|---|---|
| "My changes aren't showing" | `netlify.toml` had `max-age=3600` on CSS/JS and the HTML referenced unversioned URLs — returning visitors got hour-old code | Headers are now `max-age=0`; **run `tools/bust.py`** before every storefront commit |
| Whole page blank, script dead | `function top(){}` collides with the read-only `window.top` global | Never name a top-level function `top`, `name`, `status`, `length`, `origin` |
| Letter's first lines unreachable | `display:flex; justify-content:center` + `overflow-y:auto` clips the START of overflowing content | Centre with `.inner{margin:auto}` instead |
| Buttons unclickable | Invisible stacked cards kept `pointer-events` | Only the top card gets `pointer-events:auto` |
| Images 200 but invisible | `<span>` wrapper defaults to `display:inline`, so `width/height:100%` are ignored and absolutely-positioned children collapse | Declare `display:block` on span wrappers |
| GitHub Pages build fails | A dangling symlink (`.config/pulse/...`) was committed; `upload-pages-artifact` tars the checkout and tar exits 1 | Home dotfile dirs are gitignored — never `git add -A` after installing toolchains |
| Audio silent on iPhone | `play()` must be the **first** statement in the tap handler; any `await`/timeout first discards the activation token | Also keep `preload="none"` so 3.7MB doesn't download on load |
| "Author identity unknown" | `.git/config` is **excluded from workspace snapshots** and is wiped between sessions | Re-run `git config user.name/user.email` at the start of every session |
| External asset 404/403 | mixkit `403`, Tenor `404`, Giphy API `BANNED`, Unsplash rate limits | **Self-host everything.** All images, GIFs and audio live in their repos |
| `.reveal` classes vanish from the DOM after the entrance | By design (20 Aug 2026): `main.js initReveal()` strips `reveal`/`will-reveal`/`in` + inline `transition-delay` on settle so hover/filter transitions stay snappy. If a reveal looks missing, check `prefers-reduced-motion` or that the element was in the viewport when observed | Not a bug — stagger lives in `--index` × 90ms; don't re-add reveal classes in other scripts |

**Verification rule learned the hard way:** an HTTP 200 on an asset proves the
file is reachable, **not that it renders**. Playwright is installed — drive the
page and measure the DOM. Note its browser lives in `.cache/`, which is wiped
between sessions, so re-run `python3 -m playwright install chromium` each time.

---

## 7. OUTSTANDING WORK

**Blocking a real launch**

1. ~~**Prices**~~ ✅ **DONE 20 Aug 2026** — published in `assets/js/data.js`:
   Keepsake ₹699/mrp ₹899 (01–05), Spark ₹399/mrp ₹499 (06–07),
   Deluxe ₹1,299/mrp ₹1,599 (08). Verified live on Netlify + GH Pages via
   Playwright DOM check (8 price rows, SAVE badges, priced WhatsApp links).
2. **Reviews** — `REVIEWS_DATA` is deliberately empty. Add only real ones.

**Content quality**
3. All template `CLIENT_CONFIG`s hold **written sample data** (Anya, Meera, Dev,
   Sara…), not real orders.
4. The same 4 AI-generated demo photos are reused across all templates.
5. Two CC0 Chopin tracks are shared across eight templates.
6. Voice-note players are wired but every `voiceNote` is `null`.

**Decisions — status updated 21 Aug 2026**
7. ~~**Source visibility**~~ ✅ **RESOLVED** — `tools/deploy-private.sh` ships
   real orders to a PRIVATE repo + Netlify site (GitHub Pages on private repos
   needs a paid plan). Awaiting the owner's `NETLIFY_AUTH_TOKEN` for the first
   run. Demos stay public. See `docs/CLIENT-PLAYBOOK.md` §5.
8. **Meme licensing.** Template 03 self-hosts 6 real kitten GIFs sourced from
   Tenor. Fine for a demo; get licensed art before scaling commercially.
9. ~~`og:image`~~ ✅ **DONE** — now a generated 1200×630 brand card
   (`assets/img/og-image.png`) served from the canonical Netlify host.

**In flight (21 Aug 2026)**
10. **3D models.** Owner is sourcing Sketchfab models per
    `docs/3D-MODELS-SHOPPING-LIST.md` (5 must-haves first: turntable 09,
    cake 01, paper plane 06, envelope 14, airplane 02). Integration stack:
    self-hosted three.js + GLTFLoader per repo, render loop pauses offscreen,
    DPR cap 2, reduced-motion → static frame, 2D fallback when no WebGL.
    License gate: CC0/purchased only; CC-BY needs a credit line.

---

## 8. DESIGN TOKENS

```
paper #FAF8F5 · ink #23272F · secondary #5A6070
rose  #C87A7D · rose-deep #A85F62 · tint #F4E6E4
amber #F59E0B / #D98200 · sage #3B7A57
card  #FFFFFF · border rgba(35,39,47,.09) · shadow 0 10px 30px rgba(0,0,0,.05)
radii 18–26px
fonts Playfair Display (headings, italic) · Plus Jakarta Sans (UI) · Caveat (handwriting)
```

Non-negotiables: single-file templates, no frameworks, `100dvh`,
`overflow-x:hidden`, 48px tap targets, `prefers-reduced-motion` respected,
`noindex,nofollow` on every keepsake, `CLIENT_CONFIG` at the top of the script.

---

## 9. THE HONESTY RULE

This is enforced in code, not just by convention:

- A card links to a demo **only** when `status:"live"` and a repo resolves —
  otherwise it renders a genuinely disabled button (`config.js → demoUrl()`).
- No screenshot → neutral placeholder, never a stock mock-up.
- Prices stay hidden until a template actually exists.
- `REVIEWS_DATA` ships empty rather than with invented testimonials.
- Every thumbnail's phone screen is a **live Playwright capture** of the
  deployed page, so a thumbnail cannot show a UI that does not exist.

Keep it. It is the most valuable thing in this repo.
