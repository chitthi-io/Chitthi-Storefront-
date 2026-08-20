/* ==========================================================================
   chitthi.io — RENDER
   Pure DOM builders. No side effects until main.js calls them.
   ========================================================================== */

window.CHITTHI = window.CHITTHI || {};

(function(C){
  "use strict";

  /* ---------- tiny helpers ---------- */
  const $  = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[c]);

  const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");

  C.$ = $; C.$$ = $$; C.esc = esc; C.inr = inr;

  /* ---------- thumbnail ---------- */
  /* Renders a real screenshot when one exists, otherwise a neutral
     placeholder. Never fabricates a preview of a site that isn't built. */
  function thumbMarkup(p){
    if(p.thumb){
      const alt = p.thumbAlt || `Preview of the ${p.title} template`;
      return `<img src="${esc(p.thumb)}" alt="${esc(alt)}" loading="lazy" decoding="async" width="1600" height="1000">`;
    }
    return `
      <div class="thumb-placeholder" aria-hidden="true">
        <span class="ph-icon">${esc(p.icon || "💌")}</span>
        <span class="ph-note">Preview coming soon</span>
      </div>`;
  }

  /* ---------- price block ---------- */
  function priceMarkup(p){
    if(p.status !== "live"){
      return `<span class="price-soon">Pricing announced at launch</span>`;
    }
    /* Live, but no price set yet — never invent a number. */
    if(!p.price){
      return `<span class="price-soon">Price on request · ask on WhatsApp</span>`;
    }
    const save = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
    return `
      <span class="price">${inr(p.price)}</span>
      ${p.mrp ? `<s>${inr(p.mrp)}</s>` : ""}
      ${save > 0 ? `<span class="save">SAVE ${save}%</span>` : ""}`;
  }

  /* ---------- order message ---------- */
  function orderMsg(p){
    const price = (p.status === "live" && p.price) ? ` (${inr(p.price)})` : "";
    return `Hi! I want to order the "${p.title}" template${price} from chitthi.io 💌`;
  }
  C.orderMsg = orderMsg;

  /* ======================================================================
     FILTER PILLS
     ====================================================================== */
  C.renderFilters = function(mount){
    const data = C.PRODUCTS_DATA;
    mount.innerHTML = C.CATEGORIES.map((cat) => {
      const n = cat.id === "all"
        ? data.length
        : data.filter((p) => p.category === cat.id).length;

      if(n === 0 && cat.id !== "all") return "";

      const active = cat.id === "all";
      return `
        <button class="pill${active ? " active" : ""}" role="tab"
                aria-selected="${active}" data-cat="${esc(cat.id)}">
          ${cat.emoji ? cat.emoji + " " : ""}${esc(cat.label)}
          <span class="cnt">${n}</span>
        </button>`;
    }).join("");
  };

  /* ======================================================================
     PRODUCT GRID
     ====================================================================== */
  C.renderGrid = function(mount){
    const cards = C.PRODUCTS_DATA.map((p) => {
      const isLive  = p.status === "live";
      const demo    = C.demoUrl(p);
      const tagText = isLive ? p.tag : "Coming Soon";
      const tagCls  = isLive ? (p.tag === "Bestseller" ? "tag dark" : "tag") : "tag soon";

      /* Live Demo: a real anchor only when a real URL exists.
         Otherwise a genuinely disabled button — never a dead or fake link. */
      const demoBtn = demo
        ? `<a class="btn btn-ghost btn-sm" href="${esc(demo)}" target="_blank" rel="noopener">Live Demo 👁️</a>`
        : `<button class="btn btn-ghost btn-sm" disabled aria-disabled="true"
                   title="This template is still being built">Demo Soon 🔒</button>`;

      const orderBtn = isLive
        ? `<a class="btn btn-wa btn-sm" target="_blank" rel="noopener"
              href="${esc(C.waLink(orderMsg(p)))}">Order on WhatsApp 💌</a>`
        : `<a class="btn btn-accent btn-sm" target="_blank" rel="noopener"
              href="${esc(C.waLink('Hi! Notify me when the "' + p.title + '" template launches on chitthi.io 🔔'))}">Notify Me 🔔</a>`;

      return `
        <article class="card${isLive ? "" : " is-soon"}" data-cat="${esc(p.category)}" data-id="${esc(p.id)}">
          <div class="thumb">
            <span class="${tagCls}">${esc(tagText)}</span>
            <span class="mood">${esc(p.mood)}</span>
            ${thumbMarkup(p)}
          </div>
          <div class="card-body">
            <h3>${esc(p.title)}</h3>
            <p class="desc">${esc(p.desc)}</p>
            <div class="price-row">${priceMarkup(p)}</div>
            <div class="card-actions">
              <button class="btn btn-ghost btn-sm js-details" data-id="${esc(p.id)}">Details 👁️</button>
              ${orderBtn}
            </div>
            <div class="card-actions" style="margin-top:9px;">${demoBtn}</div>
          </div>
        </article>`;
    }).join("");

    const emptyMsg = `
      <div class="empty" hidden id="empty">
        No templates in this category yet —
        <a href="${esc(C.waLink("Hi! I have a custom gift website idea 💡"))}" target="_blank" rel="noopener">ask for a custom build 💌</a>
      </div>`;

    mount.innerHTML = cards + emptyMsg;
  };

  /* ======================================================================
     FILTERING (fade in / out)
     ====================================================================== */
  C.applyFilter = function(cat){
    let shown = 0;
    $$(".card").forEach((card) => {
      const match = cat === "all" || card.dataset.cat === cat;
      if(match){
        shown++;
        card.classList.remove("hide", "enter");
        void card.offsetWidth;              // force reflow to restart animation
        card.classList.add("enter");
      }else{
        card.classList.add("hide");
        card.classList.remove("enter");
      }
    });
    const empty = $("#empty");
    if(empty) empty.hidden = shown > 0;
  };

  /* ======================================================================
     REVIEWS
     ====================================================================== */
  C.renderReviews = function(mount){
    const data = C.REVIEWS_DATA || [];

    if(!data.length){
      mount.innerHTML = `
        <div class="reviews-empty">
          ⭐ Real reviews from real orders will appear here.
          Nothing is published until a customer actually sends it.
        </div>`;
      return;
    }

    mount.innerHTML = data.map((r) => `
      <div class="review reveal">
        <div class="stars" aria-label="${r.stars} out of 5">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
        <p>${esc(r.quote)}</p>
        <div class="who">
          <div class="av">${esc(r.initials)}</div>
          <div>
            <b>${esc(r.name)}</b>
            <span>${esc(r.location)}${r.template ? " · " + esc(r.template) : ""}</span>
          </div>
        </div>
      </div>`).join("");
  };

  /* ======================================================================
     FAQ ACCORDION
     ====================================================================== */
  C.renderFAQ = function(mount){
    mount.innerHTML = C.FAQ_DATA.map((f, i) => `
      <div class="q" data-i="${i}">
        <button aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">
          <span>${esc(f.q)}</span>
          <span class="ic" aria-hidden="true">+</span>
        </button>
        <div class="a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
          <p>${esc(f.a)}</p>
        </div>
      </div>`).join("");
  };

  /* ======================================================================
     MODAL
     ====================================================================== */
  let lastFocus = null;

  C.openModal = function(id){
    const p = C.PRODUCTS_DATA.find((x) => x.id === id);
    if(!p) return;

    lastFocus = document.activeElement;
    const isLive = p.status === "live";
    const demo   = C.demoUrl(p);
    const repo   = C.repoUrl(p);

    $("#mArt").innerHTML =
      `<button class="modal-x" id="mClose" aria-label="Close preview">✕</button>` + thumbMarkup(p);

    $("#mTitle").textContent = p.title;
    $("#mDesc").textContent  = p.desc;
    $("#mPriceSlot").innerHTML = priceMarkup(p);
    $("#mChips").innerHTML = (p.features || [])
      .map((f) => `<span class="chip">✦ ${esc(f)}</span>`).join("");

    /* status note — honest about what exists */
    $("#mStatus").innerHTML = isLive
      ? (repo ? `<span class="chip">📦 Source: <a href="${esc(repo)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700;">${esc(p.repo)}</a></span>` : "")
      : `<span class="chip">🚧 This template is still in development — no live demo yet.</span>`;

    const demoBtn = $("#mDemo");
    if(demo){
      demoBtn.href = demo;
      demoBtn.removeAttribute("aria-disabled");
      demoBtn.style.display = "";
      demoBtn.textContent = "Open Live Demo 👁️";
    }else{
      demoBtn.style.display = "none";
    }

    const orderBtn = $("#mOrder");
    if(isLive){
      orderBtn.href = C.waLink(orderMsg(p));
      orderBtn.textContent = "Order on WhatsApp 💌";
      orderBtn.className = "btn btn-wa btn-sm";
    }else{
      orderBtn.href = C.waLink(`Hi! Notify me when the "${p.title}" template launches on chitthi.io 🔔`);
      orderBtn.textContent = "Notify Me at Launch 🔔";
      orderBtn.className = "btn btn-accent btn-sm";
    }

    $("#modal").classList.add("on");
    document.body.classList.add("no-scroll");
    $("#mClose").addEventListener("click", C.closeModal);
    setTimeout(() => { const b = $("#mClose"); if(b) b.focus(); }, 60);
  };

  C.closeModal = function(){
    $("#modal").classList.remove("on");
    document.body.classList.remove("no-scroll");
    if(lastFocus) lastFocus.focus();
  };

})(window.CHITTHI);
