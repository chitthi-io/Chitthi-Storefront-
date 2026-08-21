/* ==========================================================================
   chitthi.io — DATA
   The single source of truth for the catalogue, FAQ and reviews.
   Add a template in ~30 seconds: copy a block, edit the fields, save.
   NOTHING here invents a live website. A card can only show a working
   "Live Demo" button once status is "live" AND a real repo/URL exists.
   ========================================================================== */

window.CHITTHI = window.CHITTHI || {};

/* --------------------------------------------------------------------------
   CATEGORIES — drives the filter pills. Counts are computed automatically.
   -------------------------------------------------------------------------- */
CHITTHI.CATEGORIES = [
  { id:"all",        label:"All",                  emoji:""   },
  { id:"birthday",   label:"Birthday",             emoji:"🎂" },
  { id:"love",       label:"Love & Anniversary",   emoji:"❤️" },
  { id:"ldr",        label:"Long Distance",        emoji:"✈️" },
  { id:"playful",    label:"Playful & Confession", emoji:"🤭" },
  { id:"friendship", label:"Friendship",           emoji:"🤝" }
];

/* --------------------------------------------------------------------------
   PRODUCTS_DATA

   FIELD REFERENCE
   ---------------
   id        (string)  unique slug, used for DOM ids
   title     (string)  card heading
   category  (string)  must match a CATEGORIES id
   status    "soon" | "live"
             "soon" -> greyed card, no price, Live Demo disabled
             "live" -> full card, price shown, Live Demo opens the real site
   repo      (string)  GitHub repo name for THIS template's own website.
                       Demo URL becomes https://<githubUser>.github.io/<repo>/
   demoUrl   (string)  optional. Full URL that overrides the pattern above
                       (use when a template sits on a custom domain).
   thumb     (string)  optional. Path to a REAL screenshot, e.g.
                       "assets/img/thumbs/birthday-vault.jpg".
                       Leave null and a neutral placeholder is drawn instead.
   price/mrp (number)  INR. Only rendered when status is "live".
   desc      (string)  2-line description.
   tag       (string)  badge text. Ignored while status is "soon".
   mood      (string)  small bottom-right chip on the thumbnail.
   features  (array)   bullet chips shown in the preview modal.

   TO PUBLISH A TEMPLATE
   ---------------------
   1. Build the real website in its own repo (see starter-template/).
   2. Enable GitHub Pages on that repo.
   3. Here: set status:"live", confirm repo, add price and a real thumb.
   -------------------------------------------------------------------------- */
CHITTHI.PRODUCTS_DATA = [
  /* ---- LIVE ---------------------------------------------------------
     Real website, already published by you:
     https://chitthi-io.github.io/Chitthi-Happy-Birthday-1/
     Sections below are taken from the actual page, not invented.
     Prices are published on every card. Thumbnails are real screenshots —
     keep them that way.
     ------------------------------------------------------------------ */
  {
    id:       "midnight-keepsake",
    title:    "A Midnight Keepsake",
    category: "birthday",
    status:   "live",
    repo:     "Chitthi-Happy-Birthday-1",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/midnight-keepsake.jpg",
    thumbAlt: "Custom birthday website with a 3D cake and flickering candle by Chitthi.io — shown on a phone beside polaroids and voucher cards",
    price:    699,
    mrp:      899,
    tag:      "Live Now",
    mood:     "🎂 Midnight Birthday",
    desc:     "A silent wish, a candle to blow out, and every second of them counted. Four framed memories, a letter, and vouchers to claim.",
    features: [
      "Silent-wish candle you blow out",
      "\"Every second of you, counted\" live timer",
      "Four-frame photo gallery",
      "Private letter section",
      "Tap-to-claim birthday vouchers",
      "Background song, iPhone-safe tap to start"
    ],
    icon:     "🎂"
  },
  {
    id:       "until-we-meet-again",
    title:    "Until We Meet Again",
    category: "ldr",
    status:   "live",
    repo:     "Chitthi-Until-We-Meet-Again",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/until-we-meet-again.jpg",
    price:    699,
    mrp:      899,
    tag:      "Live Now",
    mood:     "✈️ 4-Stage Journey",
    thumbAlt: "Long-distance relationship countdown website by Chitthi.io — shown on a phone beside two polaroids and a wax seal",
    desc:     "Two hearts, two places, one promise. A distance gate, a live reunion countdown, polaroids that flip to reveal hidden notes, and a letter that ends in confetti.",
    features: [
      "Distance gate with real km between your cities",
      "Live reunion countdown to the second",
      "Send a Virtual Hug — floating hearts + haptics",
      "Tap-to-flip 3D polaroid deck",
      "Handwritten letter with confetti finale",
      "Glassmorphic music player, iPhone-safe"
    ],
    icon:     "✈️"
  },
  {
    id:       "be-mine-proposal",
    title:    "Playful 'Be Mine' Proposal",
    category: "playful",
    status:   "live",
    repo:     "Chitthi-Be-Mine-Proposal",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/be-mine-proposal.jpg",
    thumbAlt: "Playful 'will you be mine' proposal website with runaway Yes button by Chitthi.io — shown on a phone beside polaroids and date vouchers",
    price:    699,
    mrp:      899,
    tag:      "Viral Pick",
    mood:     "🤭 Valentine & Crush Edition",
    desc:     "The 'No' button runs away and a new kitten meme guilt-trips them on every attempt, while 'Yes' grows 18% bigger each time.",
    features: [
      "Runaway 'No' button with touch physics",
      "6 escalating real kitten memes",
      "'Yes' grows 18% per attempt",
      "Confetti + heart shower on yes",
      "Flip polaroids & handwritten letter",
      "Celebration soundtrack, iPhone-safe"
    ],
    icon:     "💍"
  },
  {
    id:       "retro-polaroid-scrapbook",
    title:    "The Retro Polaroid Scrapbook",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Polaroid-Scrapbook",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/retro-polaroid-scrapbook.jpg",
    thumbAlt: "Interactive draggable polaroid scrapbook website by Chitthi.io — shown on a phone beside clipped polaroids",
    price:    699,
    mrp:      899,
    tag:      "New",
    mood:     "🖐️ Drag & Flip",
    desc:     "A messy desk of polaroids you can drag anywhere, flip in 3D, and read the story written on the back.",
    features: [
      "Drag polaroids with touch physics",
      "Messy desk ⇄ clean grid view",
      "3D flip to date, place & memory",
      "Inline voice-note player",
      "Shared soundtrack, iPhone-safe"
    ],
    icon:     "📸"
  },
  {
    id:       "forever-anniversary-reel",
    title:    "Forever & Always Anniversary Reel",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Anniversary-Reel",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/forever-anniversary-reel.jpg",
    thumbAlt: "Anniversary website with live days-together counter by Chitthi.io — shown on a phone beside polaroids",
    price:    699,
    mrp:      899,
    tag:      "Bestseller",
    mood:     "❤️ Live Since Counter",
    desc:     "Every second since day one, counted live — then a scroll-driven timeline of your chapters and a vault of promises.",
    features: [
      "Live days/hours/minutes together",
      "Sticky chapter navigator",
      "Scroll-driven glowing timeline",
      "Promise vault you both sign",
      "Handwritten anniversary letter"
    ],
    icon:     "💞"
  },
  {
    id:       "sorry-paper-plane",
    title:    "The Paper Plane Apology",
    category: "playful",
    status:   "live",
    repo:     "Chitthi-Paper-Plane-Apology",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/sorry-paper-plane.jpg",
    thumbAlt: "Apology website with a flying paper plane by Chitthi.io — shown on a phone beside polaroids and truce cards",
    price:    399,
    mrp:      499,
    tag:      "Heartfelt",
    mood:     "🕊️ Unfolds Into Words",
    desc:     "A paper plane you send across the screen, unfolding into a three-part apology and a truce they can claim.",
    features: [
      "3D paper plane with flight trail",
      "Accountability → Validation → Promise",
      "Claimable truce vouchers",
      "Pre-filled WhatsApp reply",
      "Soft piano, fades in gently"
    ],
    icon:     "🕊️"
  },
  {
    id:       "friendship-roast-toast",
    title:    "Best Friend Roast & Toast Book",
    category: "friendship",
    status:   "live",
    repo:     "Chitthi-Roast-And-Toast",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/friendship-roast-toast.jpg",
    thumbAlt: "Best friend roast and toast book website by Chitthi.io — shown on a phone beside polaroids and vouchers",
    price:    399,
    mrp:      499,
    tag:      "Fan Favourite",
    mood:     "🤝 Swipe To Roast",
    desc:     "Six savage roast cards they swipe through — then the deck runs out and it turns into something they'll screenshot.",
    features: [
      "Tinder-style swipeable roast deck",
      "Six inside-joke roasts",
      "Confetti turn into the toast",
      "Four flip polaroids",
      "Tribute letter they won't expect"
    ],
    icon:     "🎉"
  },
  {
    id:       "birthday-time-capsule",
    title:    "Birthday Time Capsule",
    category: "birthday",
    status:   "live",
    repo:     "Chitthi-Time-Capsule",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/birthday-time-capsule.jpg",
    thumbAlt: "Birthday time capsule website with 12 date-locked letters by Chitthi.io — shown on a phone beside month cards",
    price:    1299,
    mrp:      1599,
    tag:      "New",
    mood:     "⏳ One Opens Monthly",
    desc:     "Twelve sealed envelopes that unlock on their own dates — a letter a month for a whole year.",
    features: [
      "12 real-time date-locked envelopes",
      "Live 'unlocks in X days' countdown",
      "Wax seal glows when ready",
      "Photo + voice note per letter",
      "Sender PIN override for testing"
    ],
    icon:     "⏳"
  },
  /* ---- NEW: templates 09-14 (built 21 Aug 2026, all deployed & live) ---- */
  {
    id:       "vintage-vinyl",
    title:    "The Vintage Vinyl Keepsake",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Vinyl-Keepsake",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/vintage-vinyl.jpg",
    thumbAlt: "Vintage vinyl keepsake website with a spinning turntable by Chitthi.io — shown on a phone beside polaroids",
    price:    699,
    mrp:      899,
    tag:      "New",
    mood:     "🎵 Drop The Needle",
    desc:     "A spinning 3D turntable with a real tonearm you drag onto the groove, vinyl crackle, and memory captions that light up in sync with the song.",
    features: [
      "3D spinning turntable + draggable tonearm",
      "Vinyl crackle via WebAudio",
      "Memory captions synced to the music",
      "Four touch-to-flip polaroids",
      "Live 'together since' counter",
      "Handwritten liner-note letter"
    ],
    icon:     "🎵"
  },
  {
    id:       "couple-trivia",
    title:    "The Couple Trivia Challenge",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Couple-Trivia",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/couple-trivia.jpg",
    thumbAlt: "Couple trivia quiz gift website by Chitthi.io — shown on a phone beside polaroids and a wax seal",
    price:    699,
    mrp:      899,
    tag:      "New",
    mood:     "🏆 Score 100%",
    desc:     "Five inside-joke questions with live scoring, affectionate roasts for wrong answers, and a golden grand prize that unlocks the real letter.",
    features: [
      "5 relationship trivia questions",
      "Live progress bar + score tally",
      "Roast popups on wrong answers",
      "Heart confetti on correct ones",
      "Golden confetti grand prize",
      "Unlocks letter + 3 date vouchers"
    ],
    icon:     "🎯"
  },
  {
    id:       "scratch-reveal",
    title:    "Scratch-to-Reveal Surprise",
    category: "playful",
    status:   "live",
    repo:     "Chitthi-Scratch-Surprise",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/scratch-reveal.jpg",
    thumbAlt: "Scratch-to-reveal surprise gift website by Chitthi.io — shown on a phone beside polaroids",
    price:    399,
    mrp:      499,
    tag:      "New",
    mood:     "✨ Scratch To Reveal",
    desc:     "A metallic rose-gold foil your finger scratches away. Cross the threshold and the card dissolves into golden stardust to show what's hiding underneath.",
    features: [
      "Canvas metallic-foil scratch-off",
      "Real-time 'percent revealed' counter",
      "Golden stardust dissolve at 65%",
      "Hidden prize ticket underneath",
      "Finger physics with pointer events",
      "Celebration soundtrack"
    ],
    icon:     "✨"
  },
  {
    id:       "floral-bouquet",
    title:    "The Forever Floral Bouquet",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Floral-Bouquet",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/floral-bouquet.jpg",
    thumbAlt: "Digital floral bouquet website that blooms on tap by Chitthi.io — shown on a phone beside polaroids",
    price:    699,
    mrp:      899,
    tag:      "New",
    mood:     "🌸 Blooms On Tap",
    desc:     "An illustrated SVG bouquet that blooms petal by petal when the ribbon is untied, with a love note hidden inside each of its three flowers.",
    features: [
      "SVG roses, lilies & peonies",
      "Staggered petal bloom animation",
      "Gentle sway after blooming",
      "A hidden note inside each flower",
      "Untie-the-ribbon reveal",
      "Heartfelt closing letter"
    ],
    icon:     "🌸"
  },
  {
    id:       "royal-wedding",
    title:    "Royal Wedding Save-The-Date",
    category: "love",
    status:   "live",
    repo:     "Chitthi-Royal-Wedding",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/royal-wedding.jpg",
    thumbAlt: "Royal wedding save-the-date website with muhurat countdown by Chitthi.io — shown on a phone beside polaroids",
    price:    1299,
    mrp:      1599,
    tag:      "Royal Edition",
    mood:     "👑 Muhurat Countdown",
    desc:     "An Indian luxury invite in royal linen, deep emerald and gold leaf — live muhurat countdown, itinerary cards with maps, and a one-tap WhatsApp RSVP.",
    features: [
      "Live muhurat countdown to the second",
      "Mehendi · Phere · Reception cards",
      "Google Maps venue buttons",
      "One-tap WhatsApp RSVP",
      "Shehnai ambience soundtrack",
      "Royal emerald & gold-leaf palette"
    ],
    icon:     "👑"
  },
  {
    id:       "open-when-box",
    title:    "The 'Open When' Mood Box",
    category: "ldr",
    status:   "live",
    repo:     "Chitthi-Open-When-Box",
    demoUrl:  null,
    thumb:    "assets/img/thumbs/open-when-box.jpg",
    thumbAlt: "'Open when' mood envelope keepsake website by Chitthi.io — shown on a phone beside polaroids",
    price:    1299,
    mrp:      1599,
    tag:      "New",
    mood:     "💌 Six Little Moods",
    desc:     "Six wax-sealed envelopes — sad, missing you, fighting, sleepless, hungry, victorious — each with a letter that unfolds exactly when it's needed.",
    features: [
      "Six mood-labelled envelopes",
      "3D flap-unfolding reading modal",
      "A note + photo inside each",
      "Wax seals mark opened ones",
      "Voice-note slot per envelope",
      "Gently looping soundtrack"
    ],
    icon:     "💌"
  }

];

/* --------------------------------------------------------------------------
   REVIEWS_DATA
   Deliberately empty. Add real customer quotes here only after real orders —
   the section renders a graceful placeholder until then.
   Shape: { name, initials, location, template, stars, quote }
   -------------------------------------------------------------------------- */
CHITTHI.REVIEWS_DATA = [];

/* --------------------------------------------------------------------------
   FAQ_DATA
   -------------------------------------------------------------------------- */
CHITTHI.FAQ_DATA = [
  {
    q: "How fast will I actually receive my link?",
    a: "Standard delivery is within 24 hours of receiving your photos, names and payment. Most orders go out in 10–14 hours. If you are on a deadline — a midnight birthday, for example — message on WhatsApp first and it gets prioritised. Deluxe Custom orders ship in 12 hours."
  },
  {
    q: "Are my photos and messages private?",
    a: "Yes, completely. Your keepsake lives on a private, unlisted link that is never indexed by Google and never listed on this site. Your photos are never reused in demos or marketing, and the original files are permanently deleted 7 days after delivery unless you ask for them to be kept for revisions."
  },
  {
    q: "Will the background music play on iPhone?",
    a: "It will — with one tap. iOS blocks audio from auto-playing, so every template opens with a gentle 'Tap to begin 🎵' screen. One tap unlocks the music and the experience runs exactly as designed on Safari, Chrome, and inside the Instagram or WhatsApp in-app browser."
  },
  {
    q: "What if I want changes after delivery?",
    a: "The Keepsake package includes 2 free revision rounds and Deluxe Custom includes unlimited revisions for 7 days. Typos, swapped photos and text tweaks are usually turned around within an hour. Larger structural changes after the revision window are quoted separately."
  }

];
