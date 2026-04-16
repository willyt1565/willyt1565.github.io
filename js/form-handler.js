/**
 * =============================================================================
 * NEWERA — form-handler.js
 * Contact form: blur validation, submit, loading state, GA4 conversion tracking.
 * Gracefully degrades (native HTML validation still works without JS).
 * =============================================================================
 */
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('form-submit-btn');
  const statusEl = document.getElementById('form-status');

  const fields = {
    'full-name': { validate: (v) => v.trim().length >= 2, message: 'Please enter your full name.' },
    email: { validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), message: 'Please enter a valid email address.' },
    phone: { validate: (v) => /[\d]{7,}/.test(v.replace(/\D/g, '')), message: 'Please enter a valid phone number.' },
    'inquiry-type': { validate: (v) => v !== '', message: 'Please select an inquiry type.' },
    message: { validate: (v) => v.trim().length >= 10, message: 'Message must be at least 10 characters.' },
  };

  function sanitize(str) { const el = document.createElement('div'); el.textContent = str; return el.innerHTML; }
  function showError(id, msg) { const i = document.getElementById(id), e = document.getElementById(id + '-error'); if (i) i.classList.add('is-invalid'); if (e) e.textContent = msg; }
  function clearError(id) { const i = document.getElementById(id), e = document.getElementById(id + '-error'); if (i) i.classList.remove('is-invalid'); if (e) e.textContent = ''; }

  function validateField(id) {
    const cfg = fields[id]; if (!cfg) return true;
    const input = document.getElementById(id); if (!input) return true;
    if (!cfg.validate(input.value)) { showError(id, cfg.message); return false; }
    clearError(id); return true;
  }

  function validateAll() {
    let valid = true;
    for (const id of Object.keys(fields)) { if (!validateField(id)) valid = false; }
    return valid;
  }

  // Attach blur + input listeners
  Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(id));
    input.addEventListener('input', () => { if (input.classList.contains('is-invalid')) validateField(id); });
  });

  // Phone auto-format
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      let d = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      if (d.length >= 7) d = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
      else if (d.length >= 4) d = `(${d.slice(0, 3)}) ${d.slice(3)}`;
      phoneInput.value = d;
    });
  }

  function showStatus(type, msg) {
    if (!statusEl) return;
    statusEl.className = `form-status form-status--${type}`;
    statusEl.textContent = msg;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function hideStatus() { if (statusEl) { statusEl.style.display = 'none'; statusEl.className = 'form-status'; } }
  function setLoading(on) { if (submitBtn) { submitBtn.disabled = on; submitBtn.textContent = on ? 'Sending…' : 'Send Message'; } }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideStatus();
    if (!validateAll()) { const first = form.querySelector('.is-invalid'); if (first) first.focus(); return; }
    setLoading(true);

    const data = {
      fullName: sanitize(document.getElementById('full-name').value.trim()),
      email: sanitize(document.getElementById('email').value.trim()),
      phone: sanitize(document.getElementById('phone').value.trim()),
      inquiryType: document.getElementById('inquiry-type').value,
      propertyAddress: sanitize((document.getElementById('property-address')?.value || '').trim()),
      message: sanitize(document.getElementById('message').value.trim()),
    };

    // reCAPTCHA v3
    if (window.grecaptcha && window.__NEWERA_RECAPTCHA_KEY) {
      try { data.recaptchaToken = await window.grecaptcha.execute(window.__NEWERA_RECAPTCHA_KEY, { action: 'contact' }); }
      catch (err) { console.warn('reCAPTCHA failed:', err); }
    }

    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) {
        showStatus('success', "Thank you! We've received your message and will respond within one business day.");
        form.reset();
        Object.keys(fields).forEach(clearError);
        if (window.gtag) window.gtag('event', 'generate_lead', { event_category: 'Contact', event_label: data.inquiryType });
      } else {
        const err = await res.json().catch(() => ({}));
        showStatus('error', err.message || 'Something went wrong. Please try again or call (832) 558-2911.');
      }
    } catch {
      showStatus('error', 'Network error. Please check your connection or call (832) 558-2911.');
    } finally { setLoading(false); }
  });

  // Pre-fill from URL params
  const formType = new URLSearchParams(window.location.search).get('form');
  if (formType) {
    const messages = {
      consultation: "I'd like to schedule a free consultation to discuss property management services.",
      'rental-analysis': "I'm interested in a free rental analysis for my property.",
      'rental-alert': "I'd like to be notified when new rental properties become available.",
    };
    const msgInput = document.getElementById('message');
    if (msgInput && messages[formType] && !msgInput.value) msgInput.value = messages[formType];
    const typeSelect = document.getElementById('inquiry-type');
    if (typeSelect && formType !== 'rental-alert') typeSelect.value = 'owner';
  }
})();
