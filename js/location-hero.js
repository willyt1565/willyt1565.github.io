/**
 * NEWERA | location-hero.js
 * Photo hero on the Houston and San Antonio pages:
 *   1. Crossfades between the aerial photos every few seconds (gentle zoom via CSS)
 *   2. Light parallax: the photo drifts slower than the page while the hero is visible
 * Pauses when the hero is off screen or the tab is hidden. Does nothing when the
 * visitor's device asks for reduced motion (the first photo simply stays put).
 */
(function () {
  'use strict';
  var hero = document.querySelector('[data-loc-hero]');
  if (!hero) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var media = hero.querySelector('.loc-hero__media');
  var slides = hero.querySelectorAll('.loc-hero__slide');
  var bars = hero.querySelectorAll('.loc-hero__bars i');
  var INTERVAL = 7000;
  hero.style.setProperty('--loc-interval', INTERVAL / 1000 + 's');

  // Load the later slides after the first photo is on screen.
  function hydrate(img) {
    if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
    if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
  }
  // First photo zooms in gently on load.
  requestAnimationFrame(function () { requestAnimationFrame(function () { slides[0] && slides[0].classList.add('is-active'); }); });

  if (reduce || slides.length < 2) {
    if (bars[0]) bars[0].classList.add('is-done');
    return;
  }

  window.addEventListener('load', function () { for (var i = 1; i < slides.length; i++) hydrate(slides[i]); });

  var current = 0, timer = null, visible = true;
  function setBars() {
    for (var i = 0; i < bars.length; i++) {
      bars[i].classList.remove('is-active', 'is-done');
      void bars[i].offsetWidth; // restart the fill animation
      if (i < current) bars[i].classList.add('is-done');
      if (i === current) bars[i].classList.add('is-active');
    }
  }
  function go(next) {
    var img = slides[next];
    if (!img.complete || !img.naturalWidth) { schedule(); return; } // not loaded yet, try next tick
    slides[current].classList.remove('is-active');
    img.classList.add('is-active');
    current = next;
    setBars();
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (!visible || document.hidden) return;
    timer = setTimeout(function () { go((current + 1) % slides.length); }, INTERVAL);
  }
  setBars();
  schedule();

  document.addEventListener('visibilitychange', function () { document.hidden ? clearTimeout(timer) : (setBars(), schedule()); });

  // Parallax + pause when off screen
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var rect = hero.getBoundingClientRect();
      var nowVisible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (nowVisible && rect.top <= 0) media.style.transform = 'translate3d(0,' + (-rect.top * 0.25).toFixed(1) + 'px,0)';
      else if (nowVisible) media.style.transform = '';
      if (nowVisible !== visible) { visible = nowVisible; visible ? (setBars(), schedule()) : clearTimeout(timer); }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
