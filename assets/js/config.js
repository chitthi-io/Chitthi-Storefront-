/* ==========================================================================
   chitthi.io — CONFIG
   Global settings. Edit this file first when anything about the business
   changes (number, domain, GitHub account).
   Loaded before every other script.
   ========================================================================== */

window.CHITTHI = window.CHITTHI || {};

CHITTHI.CONFIG = {

  /* ---- Brand ---- */
  brand:        "chitthi.io",
  tagline:      "Interactive digital keepsakes, delivered in 24 hours.",

  /* ---- Contact ---- */
  whatsapp:     "917078848468",          // country code + number, digits only
  phoneDisplay: "+91 70788 48468",
  instagram:    "chitthi.io",
  instagramUrl: "https://instagram.com/chitthi.io",
  /* No email — WhatsApp and Instagram are the only real contact channels. */

  /* ---- GitHub ----------------------------------------------------------
     Each template website lives in its OWN repository (one repo per
     template), published with GitHub Pages. Demo URLs are built as:

         https://<githubUser>.github.io/<product.repo>/

     Set githubUser once here and every live demo link resolves correctly.
     If a template uses a custom domain instead, put the full URL in that
     product's `demoUrl` field in data.js and it overrides this pattern.
  --------------------------------------------------------------------- */
  githubUser:      "chitthi-io",
  storefrontRepo:  "Chitthi-Storefront-",   // note: trailing hyphen is part of the real repo name

  /* ---- Copy ---- */
  waDefaultMsg: "Hi! I want to order a custom gift website",

  /* ---- Behaviour ---- */
  showToastOnWhatsApp: true,
  toastMessage: "Opening WhatsApp… we usually reply within minutes 💌"
};

/* ---- Derived helpers ------------------------------------------------- */

/** Build a wa.me link with a URL-encoded prefilled message. */
CHITTHI.waLink = function(message){
  const msg = message || CHITTHI.CONFIG.waDefaultMsg;
  return `https://wa.me/${CHITTHI.CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
};

/**
 * Resolve the live demo URL for a product.
 * Priority: explicit demoUrl  ->  GitHub Pages pattern  ->  null.
 * Returns null when the template has no real website yet, which is what
 * keeps "Coming Soon" cards from linking anywhere fake.
 */
CHITTHI.demoUrl = function(product){
  if(!product || product.status !== "live") return null;
  if(product.demoUrl) return product.demoUrl;
  if(product.repo && CHITTHI.CONFIG.githubUser){
    return `https://${CHITTHI.CONFIG.githubUser}.github.io/${product.repo}/`;
  }
  return null;
};

/* NOTE: there is deliberately no repoUrl() helper.
   The storefront must never link to a template's source repository —
   the code is the product being sold. `product.repo` is used only to
   build the public demo URL. */
