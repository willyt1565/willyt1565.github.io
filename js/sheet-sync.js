/* =========================================================================
   NEWERA — copy every website form submission to the Google Sheet
   -------------------------------------------------------------------------
   Formspree still receives every submission (email notifications unchanged).
   This also sends a copy to the Google Apps Script web app, which files it
   into the right tab of the "Newera Form Submissions" sheet.
   Set SHEET_URL to the Apps Script Web app URL (ends in /exec).
   ========================================================================= */
(function () {
  var SHEET_URL = ''; // ← paste Apps Script Web app URL here

  if (!SHEET_URL) return;

  function toObject(body) {
    var o = {};
    if (!body) return o;
    if (typeof body === 'string') { try { return JSON.parse(body); } catch (e) { return o; } }
    if (typeof FormData !== 'undefined' && body instanceof FormData) {
      body.forEach(function (v, k) { if (typeof v === 'string') o[k] = v; });
    }
    return o;
  }

  function send(obj) {
    if (!obj || obj._gotcha) return;
    obj.page = window.location.pathname;
    var payload = JSON.stringify(obj);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(SHEET_URL, new Blob([payload], { type: 'text/plain' }))) return;
    } catch (e) {}
    try { fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain' }, body: payload }); } catch (e) {}
  }

  // 1) Forms sent with JavaScript (listing pop-ups, referral form):
  //    copy them once Formspree confirms the submission went through.
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var p = origFetch.apply(this, arguments);
      if (url.indexOf('formspree.io') !== -1 && init && init.body) {
        var data = toObject(init.body);
        p.then(function (res) { if (res && res.ok) send(data); }).catch(function () {});
      }
      return p;
    };
  }

  // 2) Forms that post straight to Formspree (Contact Us page).
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (e.defaultPrevented || !form || !form.action || form.action.indexOf('formspree.io') === -1) return;
    send(toObject(new FormData(form)));
  });
})();
