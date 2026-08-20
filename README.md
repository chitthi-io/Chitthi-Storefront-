# chitthi.io — Storefront

The public storefront for **chitthi.io**: interactive digital keepsakes (mini gift
websites) built to order and delivered in 24 hours over WhatsApp.

Repo: `Chitthi-Storefront`

---

## Architecture

This repo contains **only the storefront**. Every gift template is a *separate*
repository with its own GitHub Pages deployment, so each one can be shared,
versioned and demoed independently.

```
Chitthi-Storefront/          <- this repo (the shop)
chitthi-midnight-birthday-vault/   <- one repo per template
chitthi-ldr-bridge/
chitthi-be-mine-proposal/
...
```

The storefront builds each demo link from a single pattern:

```
https://<githubUser>.github.io/<product.repo>/
```

---

## File map

```
.
├── index.html                    # structure only — no inline CSS or JS
├── assets/
│   ├── css/
│   │   ├── tokens.css            # colours, fonts, radii, shadows  <- re-skin here
│   │   ├── base.css              # reset + typography + reveal animation
│   │   ├── layout.css            # containers, sections, grids, footer
│   │   ├── components.css        # buttons, nav, cards, tiers, modal, FAQ
│   │   └── responsive.css        # 1024 / 860 / 640 breakpoints
│   ├── js/
│   │   ├── config.js             # phone number, GitHub user, link builders
│   │   ├── data.js               # PRODUCTS_DATA · CATEGORIES · FAQ · REVIEWS
│   │   ├── render.js             # DOM builders (pure)
│   │   └── main.js               # boot + event wiring
│   └── img/
│       ├── favicon.svg
│       └── thumbs/               # REAL screenshots only
├── starter-template/             # skeleton to copy into each new template repo
├── .github/workflows/deploy-pages.yml
├── .nojekyll
└── README.md
```

Scripts are **classic** (not ES modules) on purpose, so the site also works when
you just double-click `index.html` from disk.

---

## First-time setup

1. Open `assets/js/config.js`
2. Set `githubUser` to your GitHub username
3. Commit and push

Until `githubUser` is set, all "Live Demo" buttons stay disabled and the console
prints a reminder. This is intentional — **the storefront will never link to a
website that does not exist.**

---

## Honesty rules baked into the code

| Rule | Where it is enforced |
|---|---|
| A demo button only becomes a real link when `status: "live"` **and** a repo/URL resolves | `config.js → CHITTHI.demoUrl()` |
| Coming Soon cards render a disabled `<button>`, never a dead `<a>` | `render.js → renderGrid()` |
| Prices are hidden until a template is actually live | `render.js → priceMarkup()` |
| No screenshot exists → neutral placeholder, never a stock mock-up | `render.js → thumbMarkup()` |
| Reviews array ships empty; placeholder shown instead of invented quotes | `data.js → REVIEWS_DATA` |

---

## Publishing a template (the 5-step loop)

1. **Create the template repo**

   ```bash
   cp -r starter-template ../chitthi-midnight-birthday-vault
   cd ../chitthi-midnight-birthday-vault
   git init && git add -A && git commit -m "feat: initial template"
   gh repo create chitthi-midnight-birthday-vault --public --source=. --push
   ```

2. **Enable GitHub Pages** on that repo
   → Settings → Pages → Source: `Deploy from a branch` → `main` / `root`

3. **Screenshot it** and save to this repo as
   `assets/img/thumbs/<product-id>.jpg` (1600×1000, ~16:10)

4. **Flip the switch** in `assets/js/data.js`:

   ```js
   status: "live",
   thumb:  "assets/img/thumbs/midnight-birthday-vault.jpg",
   price:  699,
   mrp:    999,
   ```

5. **Push the storefront.** The card goes live with a working demo link.

---

## Adding a brand-new template concept

Copy any object in `CHITTHI.PRODUCTS_DATA` and edit the fields. Filter pill
counts, the category tabs, the modal and the prefilled WhatsApp messages all
update automatically — no other file needs touching.

---

## Local development

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

---

## Deployment

GitHub Pages, via `.github/workflows/deploy-pages.yml`.
Every push to `main` publishes the site. Enable it once at
**Settings → Pages → Source: GitHub Actions**.

---

## Contact

WhatsApp: +91 70788 48468 · hello@chitthi.io
