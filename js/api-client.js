/**
 * =============================================================================
 * NEWERA — api-client.js
 * Fetches rental listings from the server-side Buildium proxy (/api/listings)
 * and renders property cards into the DOM. Also powers client-side filtering
 * on the properties page.
 *
 * Uses:
 *   - Homepage: #featured-properties  (3 cards)
 *   - Properties page: #all-properties (all available + filters)
 *
 * Caching: localStorage with 15-min TTL to reduce API calls.
 * Fallback: If fetch fails, placeholder cards stay visible; empty-state block
 *           shown only if API returns zero listings.
 * =============================================================================
 */
(function () {
  'use strict';

  const CACHE_KEY = 'newera_listings';
  const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

  // ---- Cache helpers ----
  function getCached() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
      return data;
    } catch { return null; }
  }

  function setCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); }
    catch { /* quota exceeded — ignore */ }
  }

  // ---- Render a single property card ----
  function renderCard(listing) {
    const {
      id, address, city, state, zip, rent, beds, baths, sqft,
      availableDate, status, type, photoUrl,
    } = listing;

    const badgeClass = status === 'coming_soon' ? 'property-card__badge--coming-soon' : '';
    const badgeText = status === 'coming_soon' ? 'Coming Soon' : 'Available Now';
    const dateText = status === 'coming_soon' ? `Available ${availableDate}` : 'Available Now';
    const typeLabel = type === 'multifamily' ? 'Duplex / Multi' : 'Single-Family';

    return `
      <article class="property-card" data-beds="${beds}" data-rent="${rent}" data-type="${type}">
        <div class="property-card__media">
          <img src="${photoUrl || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'}"
               alt="${beds}-bedroom home in ${city}, ${state}"
               loading="lazy" width="800" height="500">
          <span class="property-card__badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="property-card__body">
          <p class="property-card__address">${address}<br>${city}, ${state} ${zip}</p>
          <p class="property-card__rent">$${Number(rent).toLocaleString()}<span> / month</span></p>
          <div class="property-card__specs">
            <span><strong>${beds}</strong> bd</span>
            <span><strong>${baths}</strong> ba</span>
            <span><strong>${Number(sqft).toLocaleString()}</strong> sqft</span>
          </div>
          <p class="property-card__meta">${dateText} · ${typeLabel}</p>
          <a href="/properties.html${id ? '?id=' + id : ''}" class="btn btn--primary property-card__cta">View Details</a>
        </div>
      </article>`;
  }

  // ---- Render listings into a container ----
  function renderListings(containerId, listings, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const emptyEl = document.getElementById(containerId + '-empty');

    if (!listings || listings.length === 0) {
      container.innerHTML = '';
      if (emptyEl) emptyEl.classList.remove('u-hidden');
      container.setAttribute('aria-busy', 'false');
      return;
    }

    const display = limit ? listings.slice(0, limit) : listings;
    container.innerHTML = display.map(renderCard).join('');
    container.setAttribute('aria-busy', 'false');
    if (emptyEl) emptyEl.classList.add('u-hidden');
  }

  // ---- Fetch listings ----
  async function fetchListings() {
    // Try cache first
    const cached = getCached();
    if (cached) return cached;

    try {
      const res = await fetch('/api/listings');
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      const listings = Array.isArray(data) ? data : data.listings || [];
      setCache(listings);
      return listings;
    } catch (err) {
      console.warn('Buildium API unavailable — using placeholder cards:', err.message);
      return null; // null = keep placeholder cards in DOM
    }
  }

  // ---- Client-side filtering (properties page) ----
  function initFilters(listings) {
    const bedsSelect = document.getElementById('filter-beds');
    const priceSelect = document.getElementById('filter-price-max');
    const typeSelect = document.getElementById('filter-type');
    const resetBtn = document.getElementById('filter-reset');
    const countEl = document.getElementById('properties-count');

    if (!bedsSelect || !priceSelect || !typeSelect) return;

    function applyFilters() {
      const beds = parseInt(bedsSelect.value, 10) || 0;
      const maxRent = parseInt(priceSelect.value, 10) || Infinity;
      const type = typeSelect.value;

      const filtered = listings.filter((l) => {
        if (l.beds < beds) return false;
        if (l.rent > maxRent) return false;
        if (type && l.type !== type) return false;
        return true;
      });

      renderListings('all-properties', filtered);

      if (countEl) {
        countEl.textContent = filtered.length === listings.length
          ? `Showing all ${listings.length} properties`
          : `Showing ${filtered.length} of ${listings.length} properties`;
      }
    }

    bedsSelect.addEventListener('change', applyFilters);
    priceSelect.addEventListener('change', applyFilters);
    typeSelect.addEventListener('change', applyFilters);

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        bedsSelect.value = '';
        priceSelect.value = '';
        typeSelect.value = '';
        applyFilters();
      });
    }
  }

  // ---- Initialize ----
  async function init() {
    const listings = await fetchListings();

    // If API returned null (failed), keep placeholder cards — don't re-render
    if (listings === null) {
      // Mark grids as no longer loading
      document.querySelectorAll('[aria-busy="true"]').forEach((el) => {
        el.setAttribute('aria-busy', 'false');
      });
      return;
    }

    // Homepage featured properties (3)
    const featuredContainer = document.getElementById('featured-properties');
    if (featuredContainer && featuredContainer.dataset.feed === 'featured') {
      const count = parseInt(featuredContainer.dataset.count, 10) || 3;
      renderListings('featured-properties', listings, count);
    }

    // Properties page (all)
    const allContainer = document.getElementById('all-properties');
    if (allContainer && !allContainer.dataset.feed) {
      renderListings('all-properties', listings);
      initFilters(listings);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
