/**
 * =============================================================================
 * NEWERA PROPERTY MANAGEMENT — main.js
 * -----------------------------------------------------------------------------
 * Global site functionality:
 *   1. Sticky header scroll state
 *   2. Mobile drawer toggle + focus trap + Escape key
 *   3. Desktop dropdown keyboard navigation
 *   4. Smooth scroll offset for anchor links
 *   5. Cookie consent banner (analytics fires only after opt-in)
 *   6. Accordion (delegated)
 *   7. FAQ tab switcher + hash deep linking
 *   8. FAQ search filter
 *   9. Scroll-triggered fade-in animations
 * =============================================================================
 */

(function () {
  'use strict';

  // Utility
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* =========================================================================
     1. STICKY HEADER
     ========================================================================= */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================================
     2. MOBILE DRAWER
     ========================================================================= */
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('mobile-nav');

  if (toggle && drawer) {
    const FOCUSABLE = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';

    function openDrawer() {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('has-open-menu');
      const first = drawer.querySelector(FOCUSABLE);
      if (first) first.focus();
    }

    function closeDrawer() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('has-open-menu');
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      toggle.getAttribute('aria-expanded') === 'true' ? closeDrawer() : openDrawer();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeDrawer();
    });

    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = [...drawer.querySelectorAll(FOCUSABLE)];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (toggle.getAttribute('aria-expanded') === 'true') closeDrawer();
      });
    });
  }

  /* =========================================================================
     3. DESKTOP DROPDOWN KEYBOARD NAV
     ========================================================================= */
  document.querySelectorAll('.site-nav__item--has-dropdown').forEach((item) => {
    const trigger = item.querySelector('.site-nav__link');
    const menu = item.querySelector('.site-nav__dropdown');
    if (!trigger || !menu) return;
    const links = [...menu.querySelectorAll('a')];

    menu.addEventListener('keydown', (e) => {
      const idx = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); links[(idx + 1) % links.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); links[(idx - 1 + links.length) % links.length].focus(); }
      else if (e.key === 'Escape') { trigger.focus(); }
    });

    trigger.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && trigger.getAttribute('aria-haspopup')) {
        e.preventDefault();
        if (links.length) links[0].focus();
      }
    });
  });

  /* =========================================================================
     4. SMOOTH SCROLL OFFSET
     ========================================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#' || id === '#main') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header ? header.offsetHeight + 16 : 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  /* =========================================================================
     5. COOKIE CONSENT BANNER
     ========================================================================= */
  const CONSENT_KEY = 'newera_cookie_consent';

  function hasConsented() {
    try { return localStorage.getItem(CONSENT_KEY) === 'accepted'; } catch { return false; }
  }

  function loadAnalytics() {
    const GA_ID = window.__NEWERA_GA_ID || 'G-XXXXXXXXX';
    if (GA_ID === 'G-XXXXXXXXX') return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function createConsentBanner() {
    if (hasConsented()) { loadAnalytics(); return; }
    try { if (localStorage.getItem(CONSENT_KEY) === 'declined') return; } catch {}

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div style="max-width:var(--container-max);margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;justify-content:space-between;">
        <p style="margin:0;font-size:0.9375rem;color:var(--color-slate);flex:1 1 300px;line-height:1.5;">
          We use cookies to improve your experience and analyze site traffic.
          <a href="/privacy.html" style="color:var(--color-teal);text-decoration:underline;">Privacy Policy</a>
        </p>
        <div style="display:flex;gap:0.75rem;flex-shrink:0;">
          <button id="cookie-accept" class="btn btn--primary" style="padding:0.6rem 1.25rem;font-size:0.8125rem;">Accept</button>
          <button id="cookie-decline" class="btn btn--secondary" style="padding:0.6rem 1.25rem;font-size:0.8125rem;">Decline</button>
        </div>
      </div>`;

    Object.assign(banner.style, {
      position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '1100',
      background: 'var(--color-white)', borderTop: '1px solid var(--color-border)',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.08)', padding: '1rem clamp(1rem, 4vw, 2rem)',
      transform: 'translateY(100%)', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
    });

    document.body.appendChild(banner);
    requestAnimationFrame(() => requestAnimationFrame(() => { banner.style.transform = 'translateY(0)'; }));

    const dismiss = (accepted) => {
      try { localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined'); } catch {}
      banner.style.transform = 'translateY(100%)';
      setTimeout(() => banner.remove(), 500);
      if (accepted) loadAnalytics();
    };

    document.getElementById('cookie-accept').addEventListener('click', () => dismiss(true));
    document.getElementById('cookie-decline').addEventListener('click', () => dismiss(false));
  }

  createConsentBanner();

  /* =========================================================================
     6. ACCORDION (delegated)
     ========================================================================= */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.accordion-trigger');
    if (!trigger) return;
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.setAttribute('aria-hidden', String(expanded));
  });

  /* =========================================================================
     7. FAQ TABS + HASH DEEP LINKING
     ========================================================================= */
  const faqTabs = document.querySelectorAll('.faq-tab');
  const faqPanels = document.querySelectorAll('.faq-panel');

  if (faqTabs.length) {
    function activateTab(tab) {
      faqTabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
      faqPanels.forEach((p) => (p.hidden = true));
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    }

    faqTabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (e) => {
        const tabs = [...faqTabs];
        const idx = tabs.indexOf(tab);
        let next;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault(); next = tabs[(idx + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault(); next = tabs[(idx - 1 + tabs.length) % tabs.length];
        }
        if (next) { next.focus(); activateTab(next); }
      });
    });

    if (window.location.hash) {
      const target = window.location.hash.slice(1);
      faqTabs.forEach((tab) => {
        if (tab.getAttribute('aria-controls') === 'panel-' + target) activateTab(tab);
      });
    }
  }

  /* =========================================================================
     8. FAQ SEARCH FILTER
     ========================================================================= */
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const query = faqSearch.value.toLowerCase().trim();
      // If searching, show ALL panels so results from both tabs are visible
      if (query) {
        faqPanels.forEach((p) => (p.hidden = false));
      } else {
        // Restore tab state
        faqTabs.forEach((tab) => {
          const panel = document.getElementById(tab.getAttribute('aria-controls'));
          if (panel) panel.hidden = tab.getAttribute('aria-selected') !== 'true';
        });
      }
      document.querySelectorAll('.accordion-item').forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = query && !text.includes(query) ? 'none' : '';
      });
    });
  }

  /* =========================================================================
     9. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     ========================================================================= */
  if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.service-card, .differentiator-card, .trust-strip__card, .value-card, ' +
      '.credential-item, .property-card, .trust-stat, .contact-info__card'
    );

    if (targets.length) {
      targets.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const siblings = [...entry.target.parentElement.children];
              const idx = siblings.indexOf(entry.target);
              entry.target.style.transitionDelay = `${idx * 80}ms`;
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach((el) => observer.observe(el));
    }
  }

})();
