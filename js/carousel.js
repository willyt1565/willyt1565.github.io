/**
 * =============================================================================
 * NEWERA — carousel.js
 * Testimonial carousel (activated when testimonialsEnabled = true in config).
 *
 * Features:
 *   - Auto-advance every 6 seconds
 *   - Pause on hover + keyboard focus
 *   - Left/right arrow buttons
 *   - Dot indicators
 *   - Keyboard navigation (ArrowLeft / ArrowRight)
 *   - Respects prefers-reduced-motion (no auto-advance)
 *   - Touch swipe support
 *
 * Markup contract:
 *   <div class="testimonials-carousel" id="testimonials-carousel"
 *        role="region" aria-roledescription="carousel" aria-label="…">
 *     <div class="carousel__track">
 *       <div class="carousel__slide" role="group" aria-roledescription="slide" aria-label="1 of N">
 *         ... testimonial content ...
 *       </div>
 *     </div>
 *     <div class="carousel__controls">
 *       <button class="carousel__prev" aria-label="Previous testimonial">‹</button>
 *       <div class="carousel__dots"></div>
 *       <button class="carousel__next" aria-label="Next testimonial">›</button>
 *     </div>
 *   </div>
 * =============================================================================
 */
(function () {
  'use strict';

  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = [...carousel.querySelectorAll('.carousel__slide')];
  const prevBtn = carousel.querySelector('.carousel__prev');
  const nextBtn = carousel.querySelector('.carousel__next');
  const dotsContainer = carousel.querySelector('.carousel__dots');

  if (!track || slides.length < 2) return;

  let current = 0;
  let interval = null;
  const AUTO_MS = 6000;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Go to slide ----
  function goTo(idx) {
    current = ((idx % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
    }

    // Update ARIA labels
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', String(i !== current));
      slide.setAttribute('tabindex', i === current ? '0' : '-1');
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ---- Build dots ----
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetAuto(); });
      dotsContainer.appendChild(dot);
    });
  }

  // ---- Button events ----
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  // ---- Keyboard navigation ----
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); resetAuto(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); next(); resetAuto(); }
  });

  // ---- Auto-advance ----
  function startAuto() {
    if (prefersReduced) return;
    stopAuto();
    interval = setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    if (interval) { clearInterval(interval); interval = null; }
  }

  function resetAuto() { stopAuto(); startAuto(); }

  // Pause on hover / focus
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  // ---- Touch swipe ----
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
  }, { passive: true });

  // ---- Init ----
  track.style.transition = prefersReduced ? 'none' : 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  goTo(0);
  startAuto();

})();
