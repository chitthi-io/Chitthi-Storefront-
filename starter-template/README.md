# Template Starter

A real, working skeleton for **one** chitthi.io gift website.
Copy this folder into a brand-new repository — one repo per template.

## Use it

```bash
cp -r starter-template ../chitthi-<template-name>
cd ../chitthi-<template-name>
git init
git add -A
git commit -m "feat: initial template"
```

Then create the repo on GitHub and push, and turn on
**Settings → Pages → Deploy from a branch → main / root**.

Your demo URL becomes:

```
https://<your-username>.github.io/chitthi-<template-name>/
```

## Personalise

Everything a customer changes lives in the `GIFT` object at the top of the
`<script>` block in `index.html`:

- `name`, `subtitle`, `gateTitle`
- `since` — a date to count up from (`""` hides the counter)
- `photos` — array of `{ src, caption }`, files go in `assets/`
- `letter`, `signature`, `closing`
- `music` — path to an audio file (`""` for silence)

## Why the "Tap to begin" screen

iOS Safari blocks audio that plays without a user gesture. The gate turns that
limitation into part of the experience, and guarantees music works on iPhone.

## Before you ship a build to a customer

- [ ] Photos compressed (max ~1600px wide, JPG)
- [ ] Tested on a real phone, portrait **and** landscape
- [ ] Music starts after the tap and the toggle works
- [ ] `<meta name="robots" content="noindex, nofollow">` left in place
- [ ] Repo is public but the URL is unlisted — never link it from the storefront
- [ ] Screenshot saved to the storefront at `assets/img/thumbs/<product-id>.jpg`
