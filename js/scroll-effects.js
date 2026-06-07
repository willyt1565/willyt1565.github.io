/**
 * =============================================================================
 * NEWERA PROPERTY MANAGEMENT — scroll-effects.js
 * -----------------------------------------------------------------------------
 * A refined, self-contained scroll-motion layer. Loads on every page.
 *
 *   1. Reveal-on-scroll  — sections & cards ease in as they enter the viewport,
 *                          with a gentle stagger across items in the same row.
 *   2. Scroll progress   — a slim brand-gradient bar fills as you read down.
 *   3. Hero parallax     — the hero photo drifts slightly slower than the page.
 *   4. Stat counters     — numeric trust stats tick up from zero on first view.
 *
 * Progressive enhancement: if IntersectionObserver is unavailable, the script
 * exits and the page renders normally (all content visible). If the OS requests
 * reduced motion, content appears instantly with no movement.
 * =============================================================================
 */
(function () {
  'use strict';

  var docEl = document.documentElement;
  var supportsIO = 'IntersectionObserver' in window;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Without IntersectionObserver we can't safely hide-then-reveal, so bail and
  // leave the page in its natural, fully-visible state.
  if (!supportsIO) return;

  // Signals to the stylesheet that JS is in control — only now do the
  // pre-reveal hidden states (which live under `html.js-anim`) take effect.
  docEl.classList.add('js-anim');

  /* =========================================================================
     1. REVEAL ON SCROLL
     ========================================================================= */

  // Components that should ease in. Anything already carrying [data-reveal] in
  // the markup is respected as-is; everything below is auto-tagged so the
  // effect works site-wide without editing each page.
  var REVEAL_SELECTORS = [
    '.section__header',
    '.service-card',
    '.differentiator-card',
    '.trust-strip__card',
    '.value-card',
    '.credential-item',
    '.property-card',
    '.trust-stat',
    '.about-home__text',
    '.about-home__cards',
    '.resident-cta__panel',
    '.final-cta__content',
    '.referral-callout__text',
    '.referral-callout__cta-wrap',
    '.contact-info__card',
    '.contact-form',
    '.faq-tabs',
    '.accordion-item',
    '.process-step',
    '.feature-row',
    '.cta-panel',
    '.gallery-item',
    '.property-detail__section'
  ];

  // Tag matching elements (skip if author already set a direction).
  REVEAL_SELECTORS.forEach(function (sel) {
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].hasAttribute('data-reveal')) {
        nodes[i].setAttribute('data-reveal', 'up');
      }
    }
  });

  var revealEls = document.querySelectorAll('[data-reveal]');

  // Stagger: items that share a parent reveal one after another. Reset per
  // parent so delays never accumulate across the page.
  var groups = new Map();
  for (var r = 0; r < revealEls.length; r++) {
    var parent = revealEls[r].parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    var order = groups.get(parent);
    revealEls[r].setAttribute('data-reveal-order', String(order));
    groups.set(parent, order + 1);
  }

  var STAGGER_STEP = 90;   // ms between siblings
  var STAGGER_MAX = 5;     // cap so large grids don't drag

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        if (!reduceMotion) {
          var order = parseInt(el.getAttribute('data-reveal-order') || '0', 10);
          if (order > STAGGER_MAX) order = STAGGER_MAX;
          el.style.transitionDelay = order * STAGGER_STEP + 'ms';
        }
        el.classList.add('is-visible');
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  for (var v = 0; v < revealEls.length; v++) {
    revealObserver.observe(revealEls[v]);
  }

  /* =========================================================================
     2. SCROLL PROGRESS BAR
     ========================================================================= */
  var progress = null;
  if (!reduceMotion) {
    progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
  }

  /* =========================================================================
     3. HERO PARALLAX
     ========================================================================= */
  var heroBg = document.querySelector('.hero__bg');
  var hero = document.querySelector('.hero');
  var PARALLAX_FACTOR = 0.18;

  /* =========================================================================
     SHARED SCROLL LOOP (progress + parallax, batched via rAF)
     ========================================================================= */
  var ticking = false;

  function onScroll() {
    var scrollTop = window.scrollY || window.pageYOffset || 0;

    // Progress bar
    if (progress) {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = docH > 0 ? scrollTop / docH : 0;
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      docEl.style.setProperty('--scroll-progress', ratio.toFixed(4));
    }

    // Hero parallax — only while the hero is on screen.
    if (heroBg && hero && !reduceMotion) {
      var heroH = hero.offsetHeight;
      if (scrollTop < heroH) {
        heroBg.style.setProperty('--hero-shift', (scrollTop * PARALLAX_FACTOR).toFixed(1) + 'px');
      }
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }

  if (progress || (heroBg && !reduceMotion)) {
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    onScroll(); // set initial state
  }

  /* =========================================================================
     4. ANIMATED STAT COUNTERS
     Numeric stats (e.g. "100%") tick from 0 to their value the first time they
     scroll into view. Non-numeric labels ("Licensed", "24/7") are left alone.
     ========================================================================= */
  if (!reduceMotion) {
    var counters = document.querySelectorAll('.trust-stat__primary, [data-count]');
    var toAnimate = [];

    for (var c = 0; c < counters.length; c++) {
      var raw = counters[c].textContent.trim();
      // Skip anything with a slash (e.g. "24/7") or no digits.
      if (raw.indexOf('/') !== -1) continue;
      var m = raw.match(/^(\D*?)([\d,]+)(.*)$/);
      if (!m) continue;
      var value = parseInt(m[2].replace(/,/g, ''), 10);
      if (isNaN(value)) continue;
      toAnimate.push({
        el: counters[c],
        prefix: m[1],
        value: value,
        suffix: m[3],
        grouped: m[2].indexOf(',') !== -1
      });
    }

    if (toAnimate.length) {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var data = entry.target.__counter;
            if (data) runCount(data);
            countObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.5 }
      );

      toAnimate.forEach(function (data) {
        data.el.__counter = data;
        countObserver.observe(data.el);
      });
    }

    function formatNum(n, grouped) {
      return grouped ? n.toLocaleString('en-US') : String(n);
    }

    function runCount(data) {
      var DURATION = 1400;
      var start = null;
      data.el.classList.add('is-counting');

      function frame(ts) {
        if (start === null) start = ts;
        var t = Math.min((ts - start) / DURATION, 1);
        // easeOutCubic
        var eased = 1 - Math.pow(1 - t, 3);
        var current = Math.round(eased * data.value);
        data.el.textContent = data.prefix + formatNum(current, data.grouped) + data.suffix;
        if (t < 1) {
          window.requestAnimationFrame(frame);
        } else {
          data.el.textContent = data.prefix + formatNum(data.value, data.grouped) + data.suffix;
        }
      }
      window.requestAnimationFrame(frame);
    }
  }
})();
