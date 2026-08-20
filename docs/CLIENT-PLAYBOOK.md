# Client Intake & Delivery Blueprint

Copy-paste scripts for running an order end to end on WhatsApp.
Number: **+91 70788 48468** · Instagram: **@chitthi.io**

---

## 1. The 6-Point Asset Intake Form

Send this the moment payment is confirmed. Six questions, nothing more — every
extra field costs you a reply cycle.

```
Yaaay, let's build this! 🎉
Just 6 quick things and I'll start coding tonight 👇

1️⃣ NAMES
   Their name (spelt exactly how you call them) + your name

2️⃣ THE DATE
   Birthday / anniversary / reunion date  (DD-MM-YYYY)
   Any date you want counted from? e.g. the day you two met

3️⃣ PHOTOS  📸
   4 favourite pictures — just send them here
   Add a 3-5 word caption for each if you can
   (portrait shots look best, but anything works)

4️⃣ THE SONG  🎵
   Song name + artist, or forward me the Spotify/YouTube link

5️⃣ THE MESSAGE  💌
   Your letter to them — voice note it if typing feels like effort,
   I'll transcribe it word for word

6️⃣ THE LITTLE THINGS  ✨
   3 inside jokes, nicknames, or promises I should hide inside
   (this is the part that makes them cry, don't skip it)

Delivery: within 24 hours of receiving these 🕐
```

### Follow-up if assets go quiet (send after ~6 hours)

```
No rush at all 🤍 just keeping your slot warm.
Send whatever you have and I'll start on the rest —
photos and the letter are the only two I truly need to begin.
```

---

## 2. The Golden Delivery Message

Send the link, the instructions, and the review request in **one** message.
Splitting them across three loses the moment.

```
It's ready 💌

Here's your keepsake:
🔗 [LIVE_LINK]

Before you send it to them, three things 👇

🎧 EARPHONES ON
   There's music. It's built for headphones, not a speaker.

📱 SEND THE LINK, NOT A SCREENSHOT
   It's interactive — tapping is the whole point.

🌙 TIMING
   Send it at midnight (or the moment they wake up).
   The first screen is written for that exact second.

The link is private and unlisted — only whoever you send it to
will ever see it. It stays live for 12 months.

If anything needs changing — a photo, a line, a name — tell me
now and I'll fix it within the hour 🛠️
```

### After they react (send ~24 hours later)

```
Sooo… what did they say? 🥹

If it landed well, two tiny things that genuinely help me:

⭐ A screenshot of their reaction (I'll never post it without asking)
📝 One line I can show on chitthi.io — even just "she cried, 10/10"

And if you ever need one for a birthday, an apology, or a
just-because — you know where I am 💌
```

---

## 3. Pre-Delivery QA Checklist

Never send a link that has not cleared all of these.

- [ ] Opened on a **real phone**, not just desktop
- [ ] Music starts on the first tap (test on **iPhone Safari** specifically)
- [ ] Every name spelt correctly — check the letter *and* the page title
- [ ] All photos load; none stretched or awkwardly cropped
- [ ] Countdown/counter shows a sensible number, not `0` or `NaN`
- [ ] Polaroids flip; every back note reads correctly
- [ ] No horizontal scroll at 320px width
- [ ] `noindex, nofollow` present in the `<head>`
- [ ] Footer links to the storefront
- [ ] Storefront card updated: `status`, `thumb`, `price`

---

## 4. Pricing Reference

| Package | Price | What it covers |
|---|---|---|
| **Spark** | ₹399 | One template, light personalisation, up to 5 photos |
| **Keepsake** | ₹699 | Full personalisation, 20 photos, music, QR card, 2 revisions |
| **Deluxe Custom** | ₹1,299 | Built from scratch, unlimited sections, 12-hour delivery |

> Storefront prices are published in `assets/js/data.js` (per-product `price`/`mrp`).
> Spark ₹399 · Keepsake ₹699 · Deluxe ₹1,299. Change tiers there, then run `tools/bust.py`.
