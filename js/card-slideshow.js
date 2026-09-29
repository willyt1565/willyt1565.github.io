/* Hover slideshow for property cards.
   Add data-slides="url1,url2,..." to a card's <img>. On desktop hover the
   photos cross-fade automatically; moving the mouse away resets to the cover.
   Skipped on touch devices and for visitors who prefer reduced motion. */
(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var INTERVAL = 1300, FADE = 450;

  document.querySelectorAll('.property-card__media img[data-slides]').forEach(function (img) {
    var cover = img.getAttribute('src');
    var slides = [cover].concat(img.dataset.slides.split(',').map(function (s) { return s.trim(); }).filter(Boolean));
    if (slides.length < 2) return;

    var media = img.closest('.property-card__media');
    var host = img.parentElement;           // the <a> link (or media box)
    var timer = null, idx = 0, loaded = false;

    // progress dots
    var dots = document.createElement('div');
    dots.className = 'card-slides-dots';
    dots.setAttribute('aria-hidden', 'true');
    slides.forEach(function (_, i) {
      var d = document.createElement('span');
      if (i === 0) d.className = 'is-active';
      dots.appendChild(d);
    });
    media.appendChild(dots);

    function setDot(i) {
      Array.prototype.forEach.call(dots.children, function (d, j) { d.classList.toggle('is-active', i === j); });
    }

    function show(i) {
      var layer = document.createElement('span');
      layer.className = 'card-slide';
      layer.style.backgroundImage = 'url("' + slides[i] + '")';
      host.appendChild(layer);
      requestAnimationFrame(function () { requestAnimationFrame(function () { layer.classList.add('is-in'); }); });
      setTimeout(function () {
        img.src = slides[i];
        setTimeout(function () { layer.remove(); }, 60);
      }, FADE + 20);
      setDot(i);
    }

    media.addEventListener('mouseenter', function () {
      if (!loaded) { slides.forEach(function (s) { var p = new Image(); p.src = s; }); loaded = true; }
      media.classList.add('is-sliding');
      clearInterval(timer);
      timer = setInterval(function () { idx = (idx + 1) % slides.length; show(idx); }, INTERVAL);
    });

    media.addEventListener('mouseleave', function () {
      clearInterval(timer); timer = null; idx = 0;
      host.querySelectorAll('.card-slide').forEach(function (l) { l.remove(); });
      img.src = cover; setDot(0);
      media.classList.remove('is-sliding');
    });
  });
})();
