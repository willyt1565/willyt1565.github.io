/* =============================================================================
   NEWERA — tenant-placement.js  (/tenant-placement/ only)
   Small, brand-subtle interactions. Everything degrades gracefully: with JS
   off or "reduce motion" on, the page shows all content statically.
     1. "At a glance" card — steps highlight one after another on a loop
     2. How-it-works timeline — line draws in, steps pop in sequence
     3. Compare table — checkmarks pop in when the table scrolls into view
     4. FAQ — only one answer open at a time, smooth open
     5. Mobile — a sticky "Contact Us" bar after you scroll past the header
   ============================================================================= */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  doc.classList.add('tp-js');
  if (reduce) doc.classList.add('tp-reduce');

  function onView(el, cb, threshold) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { cb(); io.disconnect(); } });
    }, { threshold: threshold || 0.3 });
    io.observe(el);
  }

  /* 1. Glance card: cycle the highlighted step */
  var glance = document.querySelectorAll('.tp-glance li');
  if (glance.length && !reduce) {
    var i = 0, timer = null;
    var tick = function () {
      glance.forEach(function (li, n) { li.classList.toggle('is-active', n === i); });
      i = (i + 1) % glance.length;
    };
    var start = function () { if (!timer) { tick(); timer = setInterval(tick, 2600); } };
    var stop = function () { clearInterval(timer); timer = null; };
    setTimeout(start, 1200);
    var card = document.querySelector('.tp-glance');
    card.addEventListener('mouseenter', stop);
    card.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  }

  /* 2. Timeline */
  var steps = document.querySelector('.tp-steps');
  onView(steps, function () { steps.classList.add('is-in'); }, 0.35);

  /* 3. Compare table */
  var compare = document.querySelector('.tp-compare');
  if (compare) {
    compare.querySelectorAll('.tp-yes, .tp-no').forEach(function (el, n) {
      el.style.setProperty('--tp-d', (n * 45) + 'ms');
    });
    onView(compare, function () { compare.classList.add('is-in'); }, 0.25);
  }

  /* 4. FAQ: one open at a time */
  var faqs = document.querySelectorAll('.tp-acc details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* 5. Mobile sticky CTA */
  var hero = document.querySelector('.tp-hero');
  var finalCta = document.querySelector('.final-cta');
  if (hero && 'IntersectionObserver' in window) {
    var bar = document.createElement('div');
    bar.className = 'tp-sticky';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span>Need help finding a tenant?</span><a href="/contact?form=tenant-placement" class="btn btn--primary" tabindex="-1">Contact Us</a>';
    document.body.appendChild(bar);
    var pastHero = false, atEnd = false;
    var sync = function () {
      var show = pastHero && !atEnd;
      bar.classList.toggle('is-shown', show);
      bar.setAttribute('aria-hidden', String(!show));
      bar.querySelector('a').tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (e) { pastHero = !e[0].isIntersecting; sync(); }).observe(hero);
    if (finalCta) new IntersectionObserver(function (e) { atEnd = e[0].isIntersecting; sync(); }).observe(finalCta);
  }
})();
