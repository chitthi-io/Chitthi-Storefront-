/* ==========================================================================
   chitthi.io — MAIN
   Boots the app and wires all interactions. Loaded last.
   ========================================================================== */

(function(C){
  "use strict";

  const $  = C.$;
  const $$ = C.$$;

  /* ---------- filter pills ---------- */
  function bindFilters(){
    const box = $("#filters");
    if(!box) return;
    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".pill");
      if(!btn) return;
      $$(".pill").forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      C.applyFilter(btn.dataset.cat);
    });
  }

  /* ---------- FAQ accordion ---------- */
  function bindFAQ(){
    const list = $("#faqList");
    if(!list) return;
    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if(!btn) return;

      const item   = btn.parentElement;
      const panel  = item.querySelector(".a");
      const isOpen = item.classList.contains("open");

      $$(".q").forEach((q) => {
        q.classList.remove("open");
        q.querySelector(".a").style.maxHeight = null;
        q.querySelector("button").setAttribute("aria-expanded", "false");
      });

      if(!isOpen){
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });

    /* keep an open panel correctly sized on resize */
    window.addEventListener("resize", () => {
      const open = $(".q.open");
      if(open){
        const panel = open.querySelector(".a");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }, { passive:true });
  }

  /* ---------- navbar ---------- */
  function initNav(){
    const nav    = $("#nav");
    const burger = $("#burger");
    const menu   = $("#mobileMenu");
    if(!nav) return;

    const onScroll = () => nav.classList.toggle("stuck", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });

    if(burger && menu){
      burger.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        burger.classList.toggle("on", open);
        burger.setAttribute("aria-expanded", String(open));
      });
      $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.classList.remove("on");
        burger.setAttribute("aria-expanded", "false");
      }));
    }
  }

  /* ---------- scroll reveal ---------- */
  function initReveal(){
    const els = $$(".reveal");
    if(!("IntersectionObserver" in window)){
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if(en.isIntersecting){
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold:.12, rootMargin:"0px 0px -40px 0px" });

    els.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 60 + "ms";
      io.observe(el);
    });
  }

  /* ---------- footer occasion jumps ---------- */
  function initJumps(){
    $$("[data-jump]").forEach((a) => a.addEventListener("click", () => {
      const pill = $(`.pill[data-cat="${a.dataset.jump}"]`);
      if(pill) setTimeout(() => pill.click(), 320);
    }));
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg){
    const t = $("#toast");
    if(!t) return;
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2600);
  }

  /* ---------- static WhatsApp links ---------- */
  /* Any element with data-wa gets its href built from config, so the
     phone number lives in exactly one place. */
  function bindWaLinks(){
    $$("[data-wa]").forEach((el) => {
      el.href = C.waLink(el.dataset.wa || C.CONFIG.waDefaultMsg);
      el.target = "_blank";
      el.rel = "noopener";
    });
  }

  /* ---------- dev warning ---------- */
  function configCheck(){
    if(C.CONFIG.githubUser === "YOUR_GITHUB_USERNAME"){
      console.warn(
        "%c[chitthi.io]%c githubUser is not set in assets/js/config.js — " +
        "live demo links stay disabled until you set it.",
        "color:#C87A7D;font-weight:bold", "color:inherit"
      );
    }
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    C.renderFilters($("#filters"));
    C.renderGrid($("#grid"));
    C.renderReviews($("#reviews"));
    C.renderFAQ($("#faqList"));

    bindFilters();
    bindFAQ();
    bindWaLinks();
    initNav();
    initJumps();
    initReveal();
    configCheck();

    const yr = $("#yr");
    if(yr) yr.textContent = new Date().getFullYear();

    /* Hero stat: count of genuinely live templates, straight from the data */
    const statLive = $("#statLive");
    if(statLive){
      statLive.textContent = C.PRODUCTS_DATA.filter((p) => p.status === "live").length;
    }

    /* card detail buttons */
    const grid = $("#grid");
    if(grid){
      grid.addEventListener("click", (e) => {
        const b = e.target.closest(".js-details");
        if(b) C.openModal(b.dataset.id);
      });
    }

    /* modal dismissal */
    const modal = $("#modal");
    if(modal){
      modal.addEventListener("click", (e) => { if(e.target.id === "modal") C.closeModal(); });
    }
    document.addEventListener("keydown", (e) => { if(e.key === "Escape") C.closeModal(); });

    /* friendly nudge on WhatsApp clicks */
    if(C.CONFIG.showToastOnWhatsApp){
      document.addEventListener("click", (e) => {
        if(e.target.closest('a[href^="https://wa.me/"]')) toast(C.CONFIG.toastMessage);
      });
    }
  });

})(window.CHITTHI);
