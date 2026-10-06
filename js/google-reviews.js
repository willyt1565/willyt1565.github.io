/* =============================================================================
   Google Business reviews — Newera Property Management
   Pulls live rating + reviews from your Google Business Profile via the
   Google Maps JavaScript API (Places library).

   SETUP (2 values):
     1. placeId — your Google Business Place ID (starts with "ChIJ...")
        Find it: https://developers.google.com/maps/documentation/places/web-service/place-id
     2. apiKey  — Google Cloud API key with "Maps JavaScript API" + "Places API (New)"
        enabled. Restrict it to HTTP referrers: newerapm.com/*, *.newerapm.com/*,
        willyt1565.github.io/*

   Until both are filled in, the page shows the "Leave us a review" fallback.
   Note: Google's API returns up to 5 reviews (Google picks which ones).
   ============================================================================= */
(function () {
  var CONFIG = {
    placeId: '',            // e.g. 'ChIJxxxxxxxxxxxxxxxxxxxx'
    apiKey: '',             // e.g. 'AIzaSy...'
    minRating: 4,           // only show reviews with this many stars or more
    maxReviews: 5,
    profileUrl: ''          // optional: your Google profile / Maps link (used if placeId is blank)
  };

  var root = document.getElementById('google-reviews');
  if (!root) return;

  var els = {
    summary: root.querySelector('[data-gr-summary]'),
    rating: root.querySelector('[data-gr-rating]'),
    stars: root.querySelector('[data-gr-stars]'),
    count: root.querySelector('[data-gr-count]'),
    list: root.querySelector('[data-gr-list]'),
    fallback: root.querySelector('[data-gr-fallback]'),
    seeAll: root.querySelectorAll('[data-gr-see-all]'),
    write: root.querySelectorAll('[data-gr-write]')
  };

  // Links work even without an API key, as long as placeId is set.
  var writeUrl = CONFIG.placeId
    ? 'https://search.google.com/local/writereview?placeid=' + encodeURIComponent(CONFIG.placeId)
    : CONFIG.profileUrl;
  var seeAllUrl = CONFIG.placeId
    ? 'https://search.google.com/local/reviews?placeid=' + encodeURIComponent(CONFIG.placeId)
    : CONFIG.profileUrl;
  setLinks(els.write, writeUrl);
  setLinks(els.seeAll, seeAllUrl);

  if (!CONFIG.placeId || !CONFIG.apiKey) { showFallback(); return; }

  loadMaps(CONFIG.apiKey)
    .then(function () { return google.maps.importLibrary('places'); })
    .then(function (lib) {
      var place = new lib.Place({ id: CONFIG.placeId });
      return place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] })
        .then(function () { return place; });
    })
    .then(render)
    .catch(function (err) { console.warn('[google-reviews]', err); showFallback(); });

  function render(place) {
    if (place.googleMapsURI && !CONFIG.profileUrl) setLinks(els.seeAll, place.googleMapsURI);

    if (place.rating) {
      els.rating.textContent = place.rating.toFixed(1);
      els.stars.innerHTML = starsHtml(place.rating);
      els.stars.setAttribute('aria-label', place.rating.toFixed(1) + ' out of 5 stars');
      els.count.textContent = 'Based on ' + (place.userRatingCount || 0) + ' Google review' + (place.userRatingCount === 1 ? '' : 's');
      els.summary.hidden = false;
    }

    var reviews = (place.reviews || [])
      .filter(function (r) { return (r.rating || 0) >= CONFIG.minRating && r.text; })
      .slice(0, CONFIG.maxReviews);

    if (!reviews.length) { showFallback(); return; }

    els.list.innerHTML = reviews.map(cardHtml).join('');
    els.list.hidden = false;
    els.fallback.hidden = true;
    root.classList.add('is-loaded');
  }

  function cardHtml(r) {
    var a = r.authorAttribution || {};
    var name = esc(a.displayName || 'Google user');
    var photo = a.photoURI
      ? '<img class="gr-card__avatar" src="' + esc(a.photoURI) + '" alt="" width="44" height="44" loading="lazy" referrerpolicy="no-referrer">'
      : '<span class="gr-card__avatar gr-card__avatar--initial" aria-hidden="true">' + name.charAt(0) + '</span>';
    var nameHtml = a.uri
      ? '<a href="' + esc(a.uri) + '" target="_blank" rel="noopener noreferrer">' + name + '</a>'
      : name;
    var text = esc(r.text);
    var long = text.length > 280;
    return '' +
      '<article class="gr-card">' +
        '<header class="gr-card__head">' + photo +
          '<div><div class="gr-card__name">' + nameHtml + '</div>' +
          '<div class="gr-card__meta">' + esc(r.relativePublishTimeDescription || '') + '</div></div>' +
          googleG() +
        '</header>' +
        '<div class="gr-stars" role="img" aria-label="' + r.rating + ' out of 5 stars">' + starsHtml(r.rating) + '</div>' +
        '<p class="gr-card__text' + (long ? ' is-clamped' : '') + '">' + text + '</p>' +
        (long ? '<button type="button" class="gr-card__more" onclick="this.previousElementSibling.classList.remove(\'is-clamped\');this.remove()">Read more</button>' : '') +
      '</article>';
  }

  function starsHtml(n) {
    var out = '';
    for (var i = 1; i <= 5; i++) {
      var fill = n >= i ? 100 : n > i - 1 ? Math.round((n - (i - 1)) * 100) : 0;
      out += '<span class="gr-star" style="--fill:' + fill + '%" aria-hidden="true">★</span>';
    }
    return out;
  }

  function googleG() {
    return '<svg class="gr-card__g" viewBox="0 0 48 48" width="20" height="20" aria-label="Google review"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
  }

  function setLinks(nodes, url) {
    Array.prototype.forEach.call(nodes, function (n) {
      if (url) { n.href = url; n.hidden = false; } else { n.hidden = true; }
    });
  }

  function showFallback() {
    els.list.hidden = true;
    els.fallback.hidden = false;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function loadMaps(key) {
    if (window.google && google.maps && google.maps.importLibrary) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      window.__neweraGrReady = resolve;
      var s = document.createElement('script');
      s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) +
              '&v=weekly&loading=async&callback=__neweraGrReady';
      s.async = true;
      s.onerror = function () { reject(new Error('Google Maps failed to load')); };
      document.head.appendChild(s);
    });
  }
})();
