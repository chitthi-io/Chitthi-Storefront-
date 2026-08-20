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
     TODO: set `price` and add a real screenshot to `thumb`.
     ------------------------------------------------------------------ */
  {
    id:       "midnight-keepsake",
    title:    "A Midnight Keepsake",
    category: "birthday",
    status:   "live",
    repo:     "Chitthi-Happy-Birthday-1",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
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
    price:    null,
    mrp:      null,
    tag:      "Live Now",
    mood:     "✈️ 4-Stage Journey",
    thumbAlt: "Until We Meet Again shown on a phone beside two polaroids and a wax seal",
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
    status:   "soon",
    repo:     "chitthi-be-mine-proposal",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "Viral Pick",
    mood:     "🤭 The 'No' Button Runs",
    desc:     "A cheeky question page where the 'No' button dodges every click and 'Yes' grows bigger, ending in a confetti love letter.",
    features: ["Runaway 'No' button","Confetti finale","Custom love letter","Screenshot-ready design"],
    icon:     "💍"
  },
  {
    id:       "retro-polaroid-scrapbook",
    title:    "The Retro Polaroid Scrapbook",
    category: "love",
    status:   "soon",
    repo:     "chitthi-polaroid-scrapbook",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "New",
    mood:     "📸 Draggable Polaroids",
    desc:     "Scattered polaroids they can drag, flip and read handwritten captions on — a messy desk of your best moments.",
    features: ["Drag & flip polaroids","Handwritten captions","Vintage grain filter","Music player"],
    icon:     "📸"
  },
  {
    id:       "forever-anniversary-reel",
    title:    "Forever & Always Anniversary Reel",
    category: "love",
    status:   "soon",
    repo:     "chitthi-anniversary-reel",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "Bestseller",
    mood:     "❤️ Cinematic Timeline",
    desc:     "A scroll-driven timeline of your story — first message, first trip, today — closing with a promise page you write together.",
    features: ["Scroll timeline","Chapter animations","Promise page","Anniversary counter"],
    icon:     "💞"
  },
  {
    id:       "sorry-paper-plane",
    title:    "The Paper Plane Apology",
    category: "playful",
    status:   "soon",
    repo:     "chitthi-paper-plane-apology",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "Heartfelt",
    mood:     "🕊️ Soft Apology",
    desc:     "A folded paper plane flies across the screen and unfolds into your apology, one honest sentence at a time.",
    features: ["Unfolding letter animation","Line-by-line reveal","Forgive-me button","Gentle music"],
    icon:     "🕊️"
  },
  {
    id:       "friendship-roast-toast",
    title:    "Best Friend Roast & Toast Book",
    category: "friendship",
    status:   "soon",
    repo:     "chitthi-roast-and-toast",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "Fan Favourite",
    mood:     "🤝 Roast Then Toast",
    desc:     "Ten savage roast cards they flip through, then the mood turns and every card becomes a reason you're grateful for them.",
    features: ["Flip roast cards","Mood-switch finale","Group photo wall","Shareable link"],
    icon:     "🎉"
  },
  {
    id:       "birthday-time-capsule",
    title:    "Birthday Time Capsule",
    category: "birthday",
    status:   "soon",
    repo:     "chitthi-birthday-time-capsule",
    demoUrl:  null,
    thumb:    null,
    price:    null,
    mrp:      null,
    tag:      "New",
    mood:     "⏳ Opens Yearly",
    desc:     "Twelve sealed envelopes, one for each month ahead, each unlocking on its date with a note and a tiny surprise from you.",
    features: ["12 date-locked envelopes","Yearly re-open","Wish jar","Printable QR card"],
    icon:     "⏳"
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
