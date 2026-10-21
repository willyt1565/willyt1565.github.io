/* =======================================================================
   NEWERA — ANALYTICS BOOTSTRAP (Google Analytics 4 only)
   -----------------------------------------------------------------------
   To activate tracking, paste your GA4 Measurement ID below and commit.
   That's it — the entire site will start tracking visitors and leads.

   See ANALYTICS_SETUP_GUIDE.md in the repo root for step-by-step
   instructions to create your GA4 account and find your ID.
   ======================================================================= */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // CONFIG — edit this one value, commit, done.
  // ------------------------------------------------------------------
  var CONFIG = {
    // Google Analytics 4 Measurement ID
    // (from analytics.google.com → Admin → Data Streams → click your stream)
    GA4_ID: 'G-DDDNHSS94Q',

    // Respect Do-Not-Track browser setting? (recommended: true)
    RESPECT_DNT: true,
  };

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  var hasPlaceholder = function (value) {
    return !value || /X{4,}/.test(value);
  };

  var dntEnabled = function () {
    if (!CONFIG.RESPECT_DNT) return false;
    var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return dnt === '1' || dnt === 'yes';
  };

  if (dntEnabled()) {
    console.info('[newera-analytics] Do-Not-Track is on — analytics disabled.');
    return;
  }

  if (hasPlaceholder(CONFIG.GA4_ID)) {
    console.info('[newera-analytics] GA4_ID not configured yet — paste your Measurement ID into js/analytics.js to activate.');
    return;
  }

  // ------------------------------------------------------------------
  // Google Analytics 4 bootstrap
  // ------------------------------------------------------------------
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_ID;
  document.head.appendChild(gaScript);

  // ------------------------------------------------------------------
  // Internal traffic flag — visit any page with ?internal=on once on each
  // team device/browser (?internal=off to undo). GA4's "Internal Traffic"
  // data filter then excludes these visits from reports.
  // ------------------------------------------------------------------
  var isInternal = false;
  try {
    var flag = new URLSearchParams(window.location.search).get('internal');
    if (flag === 'on') localStorage.setItem('newera_internal', '1');
    if (flag === 'off') localStorage.removeItem('newera_internal');
    isInternal = localStorage.getItem('newera_internal') === '1';
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  var gaConfig = {
    anonymize_ip: true,
    send_page_view: true,
  };
  if (isInternal) gaConfig.traffic_type = 'internal';
  window.gtag('config', CONFIG.GA4_ID, gaConfig);

  // ------------------------------------------------------------------
  // Leads from forms that submit with JavaScript (property inquiry and
  // "notify me" forms post to Formspree via fetch). Counted only when
  // Formspree confirms the submission.
  // ------------------------------------------------------------------
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var p = origFetch.apply(this, arguments);
      if (url.indexOf('formspree.io') !== -1 && init && init.method && String(init.method).toUpperCase() === 'POST') {
        p.then(function (res) {
          if (res && res.ok && window.gtag) {
            window.gtag('event', 'generate_lead', {
              form_id: 'property-inquiry',
              inquiry_type: 'property',
              page_location: window.location.pathname,
              currency: 'USD',
              value: 1,
            });
          }
        }).catch(function () {});
      }
      return p;
    };
  }

  // ------------------------------------------------------------------
  // Auto-tracked lead events
  // ------------------------------------------------------------------
  var track = function (eventName, params) {
    if (window.gtag) window.gtag('event', eventName, params || {});
  };

  // Expose a helper so other scripts (like form-handler.js) can record
  // business events without coupling to gtag directly.
  window.NeweraAnalytics = { track: track };

  var onReady = function (fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  onReady(function () {
    // Phone click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('phone_click', {
          phone_number: el.getAttribute('href').replace('tel:', ''),
          link_text: (el.innerText || '').trim().slice(0, 60),
          page_location: window.location.pathname,
        });
      });
    });

    // Email click tracking
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('email_click', {
          email_address: el.getAttribute('href').replace('mailto:', ''),
          link_text: (el.innerText || '').trim().slice(0, 60),
          page_location: window.location.pathname,
        });
      });
    });

    // Contact form submission — marked as a lead in GA4
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        if (e.defaultPrevented) return;
        if (contactForm.checkValidity && !contactForm.checkValidity()) return;
        var typeEl = contactForm.querySelector('[name="inquiry-type"], #inquiry-type');
        track('generate_lead', {
          form_id: 'contact-form',
          inquiry_type: typeEl ? typeEl.value : 'unknown',
          page_location: window.location.pathname,
          currency: 'USD',
          value: 1,
        });
      }, { passive: true });
    }

    // Owner/Resident portal outbound clicks
    document.querySelectorAll('a[href*="managebuilding.com"]').forEach(function (el) {
      el.addEventListener('click', function () {
        track('portal_click', {
          destination: el.href,
          link_text: (el.innerText || '').trim().slice(0, 60),
          page_location: window.location.pathname,
        });
      });
    });

    // "Get a Free Consultation" CTA
    document.querySelectorAll('a[href*="form=consultation"], .site-header__cta, .mobile-nav__cta').forEach(function (el) {
      el.addEventListener('click', function () {
        track('cta_click', {
          cta_name: 'free_consultation',
          page_location: window.location.pathname,
        });
      });
    });
  });
})();
