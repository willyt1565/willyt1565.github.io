/* =============================================================================
   NEWERA — tenant-placement.js  (/tenant-placement/ only)
   Small, brand-subtle interactions. Everything degrades gracefully: with JS
   off or "reduce motion" on, the page shows all content statically.
     1. "At a glance" card — steps highlight one after another on a loop
     2. How-it-works timeline — line draws in, steps pop in sequence
     3. Compare table — checkmarks pop in when the table scrolls into view
     4. FAQ — only one answer open at a time, smooth open
     5. Mobile — a sticky "Contact Us" bar after you scroll past the header
     6. Owner advantages — clickable topics (tabs on desktop, accordion on mobile)
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

  /* 6. Owner advantages — tabs on desktop (one always open), accordion on mobile */
  (function () {
    var root = document.querySelector('[data-tp-adv]');
    if (!root) return;
    var items = Array.prototype.slice.call(root.querySelectorAll('.tp-adv__item'));
    var tabs = items.map(function (it) { return it.querySelector('.tp-adv__tab'); });
    var desktop = window.matchMedia('(min-width: 900px)');

    function setOpen(idx, open) {
      items.forEach(function (it, i) {
        var on = i === idx ? open : false;
        it.classList.toggle('is-open', on);
        tabs[i].setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }
    function current() { for (var i = 0; i < items.length; i++) if (items[i].classList.contains('is-open')) return i; return -1; }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        var isOpen = items[i].classList.contains('is-open');
        if (desktop.matches) { setOpen(i, true); return; }
        setOpen(i, !isOpen);
        if (!isOpen) setTimeout(function () {
          var r = tab.getBoundingClientRect();
          if (r.top < 80 || r.top > window.innerHeight * 0.6) window.scrollBy({ top: r.top - 96, behavior: reduce ? 'auto' : 'smooth' });
        }, 360);
      });
      tab.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n === null) return;
        e.preventDefault();
        tabs[n].focus();
        if (desktop.matches) setOpen(n, true);
      });
    });

    function sync() { if (desktop.matches && current() < 0) setOpen(0, true); }
    if (desktop.addEventListener) desktop.addEventListener('change', sync); else if (desktop.addListener) desktop.addListener(sync);
    setOpen(0, true);
  })();
})();
