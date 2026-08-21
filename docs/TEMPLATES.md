# The 14 Templates — Build Status & Specs

One repo per template. The storefront links to each via GitHub Pages.
A card only goes `status: "live"` once the site behind it actually exists.

| # | Template | Repo | Status |
|---|---|---|---|
| 01 | A Midnight Keepsake | `Chitthi-Happy-Birthday-1` | 🟢 **Live** |
| 02 | Until We Meet Again | `Chitthi-Until-We-Meet-Again` | 🟢 **Live** |
| 03 | Playful 'Be Mine' Proposal | `Chitthi-Be-Mine-Proposal` | 🟢 **Live** |
| 04 | The Retro Polaroid Scrapbook | `Chitthi-Polaroid-Scrapbook` | 🟢 **Live** |
| 05 | Forever & Always Anniversary Reel | `Chitthi-Anniversary-Reel` | 🟢 **Live** |
| 06 | The Paper Plane Apology | `Chitthi-Paper-Plane-Apology` | 🟢 **Live** |
| 07 | Best Friend Roast & Toast Book | `Chitthi-Roast-And-Toast` | 🟢 **Live** |
| 08 | The Birthday Time Capsule | `Chitthi-Time-Capsule` | 🟢 **Live** |
| 09 | The Vintage Vinyl Keepsake | `Chitthi-Vinyl-Keepsake` | 🟢 **Live** (21 Aug 2026) |
| 10 | The Couple Trivia Challenge | `Chitthi-Couple-Trivia` | 🟢 **Live** (21 Aug 2026) |
| 11 | Scratch-to-Reveal Surprise | `Chitthi-Scratch-Surprise` | 🟢 **Live** (21 Aug 2026) |
| 12 | The Forever Floral Bouquet | `Chitthi-Floral-Bouquet` | 🟢 **Live** (21 Aug 2026) |
| 13 | Royal Wedding Save-The-Date | `Chitthi-Royal-Wedding` | 🟢 **Live** (21 Aug 2026) |
| 14 | The 'Open When' Mood Box | `Chitthi-Open-When-Box` | 🟢 **Live** (21 Aug 2026) |

---

## Universal build rules

- Single `index.html`; CSS in `<style>`, JS in `<script>`. No frameworks.
- `CLIENT_CONFIG` at the very top of the script — the only thing a client edit touches.
- Mobile-first, `100dvh`, `overflow-x:hidden`, 48px minimum tap targets.
- Audio `play()` fires **synchronously inside the first tap handler**, or iOS
  discards the user-activation token. `preload="none"` so nothing downloads early.
- Glassmorphic music pill, fixed top-right, animated equaliser bars.
- `@media (prefers-reduced-motion: reduce)` respected.
- `noindex, nofollow` — keepsakes are private.
- Self-host every asset. Hotlinked CDNs have failed us three times:
  mixkit `403`, Tenor `404`, Giphy `BANNED`.

## Design tokens

| Token | Value |
|---|---|
| Paper | `#FAF8F5` |
| Ink | `#23272F` |
| Secondary | `#5A6070` |
| Rose | `#C87A7D` |
| Rose tint | `#F4E6E4` |
| Amber | `#F59E0B` / `#D98200` |
| Sage | `#3B7A57` |
| Card | `#FFFFFF`, border `rgba(35,39,47,.09)`, shadow `0 10px 30px rgba(0,0,0,.05)` |
| Fonts | Playfair Display · Plus Jakarta Sans · Caveat |

---

## Remaining specs (04–08)

### 04 · The Retro Polaroid Scrapbook
Dual-view switcher: **Messy Desk** (drag polaroids with pointer physics and
z-index elevation) ⇄ **Clean Grid**. Double-tap flips a card in 3D to reveal
date, location, memory text and an inline voice-note player. Master audio pill.

### 05 · Forever & Always Anniversary Reel
Hero live counter (days / hours / minutes together). Sticky chapter navigator:
*How We Met · First Trip · Today*. Scroll-driven vertical timeline with
alternating cards and glowing connectors. Promise Vault: 3 cards with
glowing checkmarks.

### 06 · The Paper Plane Apology
Screen 1: 3D origami plane; tap sends it flying and it unfolds into the letter.
Screen 2: three-part apology — **Accountability → Validation → Promise**.
Screen 3: truce vouchers. CTA pre-fills a WhatsApp message.

### 07 · Best Friend Roast & Toast Book
Phase 1: Tinder-style swipeable deck of 6 savage inside-joke roasts.
Phase 2: cards flip to genuine gratitude, 4 shared polaroids, tribute letter.

### 08 · The Birthday Time Capsule
12 wax-sealed envelopes, Month 01–12. Real-time date locks: locked shows a
padlock plus *"Unlocks in X days"* and shakes on click; unlocked glows with
**Open Now**. 4-digit sender PIN override for testing.

---

## Pipeline

```bash
# 1. build the template in build-<name>/index.html

# 2. thumbnail (screenshots the real deployed UI)
python3 tools/generate_thumbnail.py \
  --repo Chitthi-Roast-And-Toast \
  --title "Best Friend Roast & Toast" \
  --edition "Friendship Edition" \
  --tagline "Roast them first. Then make them cry." \
  --url https://chitthi-io.github.io/Chitthi-Roast-And-Toast/ \
  --polaroids photos/a.jpg photos/b.jpg \
  --captions "exhibit A" "exhibit B" \
  --chips "Free Maggi" "One Roast Pass" "Chai Session"

# 3. deploy
export GH_TOKEN=ghp_xxx
tools/deploy.sh Chitthi-Roast-And-Toast "launch Roast & Toast keepsake" build-roast

# 4. storefront: set status/thumb/price in assets/js/data.js
python3 tools/bust.py && git add -A && git commit && git push
```

> `tools/bust.py` must run before every storefront commit, or returning
> visitors keep cached CSS/JS and never see the change.
