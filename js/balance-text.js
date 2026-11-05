/**
 * NEWERA | balance-text.js
 * Keeps the last two words of headings, paragraphs and list items together
 * (joined with a non-breaking space) so no line ends with a single stranded
 * word, on desktop and mobile. Works alongside the CSS `text-wrap` rules in
 * styles.css and covers browsers that don't support them yet.
 * Safety: a join is undone whenever the joined words would not fit inside
 * their box (checked on load and again when the screen size changes).
 */
(function () {
  'use strict';
  var SELECTOR = 'main h1, main h2, main h3, main h4, main p, main li, main dd, main figcaption, main .eyebrow, .final-cta p';
  var MAX_PAIR = 30;
  var NBSP = ' ';
  var joined = [];

  function lastTextNode(el) {
    for (var n = el.lastChild; n; n = n.previousSibling) {
      if (n.nodeType === 3 && /\S/.test(n.data)) return n;
      if (n.nodeType === 1) {
        if (/^(SVG|BR|IMG|INPUT|SELECT|TEXTAREA)$/i.test(n.nodeName)) continue;
        var inner = lastTextNode(n);
        if (inner) return inner;
      }
    }
    return null;
  }
  function overflows(el) { return el.scrollWidth > el.clientWidth + 1; }

  function join() {
    var els = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.hasAttribute('data-no-balance') || el.__nbBalanced) continue;
      if ((el.textContent || '').trim().split(/\s+/).length < 4) continue;
      var node = lastTextNode(el);
      if (!node) continue;
      var m = node.data.match(/^([\s\S]*\S)[ \t\n\r]+(\S+)(\s*)$/);
      if (!m) continue;
      var prev = m[1].match(/(\S+)$/)[1];
      if (prev.length + m[2].length + 1 > MAX_PAIR) continue;
      var before = overflows(el);
      var original = node.data;
      node.data = m[1] + NBSP + m[2] + m[3];
      if (!before && overflows(el)) { node.data = original; continue; }
      el.__nbBalanced = true;
      joined.push({ el: el, node: node, original: original, balanced: node.data });
    }
  }
  function recheck() {
    for (var i = 0; i < joined.length; i++) {
      var j = joined[i];
      j.node.data = j.balanced;
      if (overflows(j.el)) j.node.data = j.original;
    }
  }
  function start() {
    join();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(recheck, 150); }, { passive: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
