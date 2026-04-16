# Newera Property Management — Website

> Modern, investor-focused property management website for Houston, TX.
> Static HTML/CSS/JS with client-side Buildium API integration and Formspree contact submissions.
> Deployed on GitHub Pages with custom domain support.

---

## Quick Start

```bash
git clone https://github.com/your-org/newera-website.git
cd newera-website
npx serve . -l 8000       # Open http://localhost:8000
```

---

## Project Structure

```
newera/
├── index.html                  Homepage (9 sections)
├── about.html                  Company story, values, credentials
├── services.html               4 service detail sections + pricing
├── properties.html             Listings with client-side filters
├── contact.html                Contact form + info + Google Maps
├── faq.html                    20 Q&As, accordion + tabs
├── 404.html                    Custom error page
├── privacy.html                Privacy Policy
├── terms.html                  Terms of Service
├── css/styles.css              Global stylesheet (2,178 lines, 64 CSS vars)
├── js/
│   ├── main.js                 Nav, scroll, cookies, animations, FAQ
│   ├── form-handler.js         Contact form validation + Formspree submission
│   ├── api-client.js           Buildium API client-side fetch and render
│   └── carousel.js             Testimonial carousel (ready when enabled)
├── assets/brand/               Logo, favicon, OG image
├── assets/legal/               IABS PDF, Consumer Protection PDF
├── images/                     Hero + property photos
├── public/
│   ├── robots.txt              SEO crawl rules
│   └── sitemap.xml             XML sitemap
├── site-content.json           Editable content config (visual editor reference)
├── .env.example                Environment variable template
├── .gitignore                  Git ignore rules (includes netlify.toml)
├── package.json                Project metadata
├── LICENSE                     MIT
└── README.md                   This file
```

---

## Editing Content

All text, colors, and toggles are documented in `site-content.json`. Edit the JSON as your reference, then update the corresponding HTML. The JSON mirrors every editable element across the site.

**Colors:** Edit CSS custom properties in `css/styles.css` under `:root`. Change once, entire site updates.

**Images:** Search `unsplash.com` in HTML files — each placeholder has a comment explaining what to replace. Hero: 2400×1600 WebP. Property cards: 800×500. Logo: SVG at `/assets/brand/logo.svg`.

---

## Deploying to GitHub Pages

### Prerequisites
- GitHub account
- Git installed on your computer
- Custom domain (optional but recommended): `newerapm.com`

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `newera-property-management` (or `[username].github.io` for user site)
3. Select "Public" 
4. Initialize with README (**unchecked** — we have our own)
5. Click "Create repository"

### Step 2: Prepare Local Repository

```bash
# Navigate to your project directory
cd /path/to/newera-website

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Newera Property Management website"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/newera-property-management.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository
2. Settings → Pages
3. **Source:** Deploy from a branch
4. **Branch:** `main` + root folder (`/`)
5. Click "Save"
6. GitHub will display your site URL: `https://username.github.io/newera-property-management/` or custom domain URL

### Step 4: Connect Custom Domain (Optional)

1. Settings → Pages
2. Under "Custom domain," enter `newerapm.com`
3. Click "Save"
4. Add DNS records to your domain registrar:

```
Type: A
Name: @
Value: 185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

Type: CNAME
Name: www
Value: username.github.io
```

5. Wait 5-15 minutes for DNS propagation
6. GitHub will auto-provision HTTPS certificate

### Step 5: Configure API Keys & Secrets

Create a `.env` file in the root directory (for local development only):

```bash
cp .env.example .env
```

Fill in your actual values:
```
BUILDIUM_API_KEY=your_key_here
RECAPTCHA_SITE_KEY=your_site_key_here
FORMSPREE_ID=mlgajalw
```

**⚠️ IMPORTANT:** Never commit `.env` to GitHub. The `.gitignore` prevents this automatically.

For sensitive keys used by contact form or API calls, update the key directly in the relevant HTML/JS files or use GitHub Secrets for CI/CD workflows (if needed in the future).

---

## Buildium API Integration

**Client-side architecture:** JavaScript directly fetches from Buildium API using `api-client.js` → validates response → normalizes listings → renders property cards. 15-minute cache via localStorage. If API fails, placeholder cards remain visible (graceful degradation).

**Key file:** `js/api-client.js` — customize field mappings in `normalizeListings()` function.

**Authentication:** Add `BUILDIUM_API_KEY` to `.env` for local testing. For production, embed directly in `properties.html` or use a GitHub Secret for CI/CD workflows.

**CORS Note:** Buildium API may require CORS proxy if browser blocks cross-origin requests. Update the API base URL in `api-client.js` if needed.

---

## Contact Form

**Form Submission Flow:**
1. User fills form in `contact.html` (fullName, email, phone, inquiryType, message)
2. JavaScript validates client-side (`form-handler.js`)
3. Form submits to Formspree endpoint: `https://formspree.io/f/mlgajalw`
4. Formspree receives, validates, and forwards emails to `support@newerapm.com`

**Setup:**
- Formspree account created at [formspree.io](https://formspree.io)
- Form endpoint ID: `mlgajalw` (already configured in `contact.html`)
- Email forwarding configured in Formspree dashboard
- reCAPTCHA v3 verification can be added for spam prevention

**Customize:** Update form action URL in `contact.html` line 92 if using a different Formspree ID.

---

## Analytics & reCAPTCHA

**GA4:** Add `<script>window.__NEWERA_GA_ID='G-YOUR-ID';</script>` before `main.js`. Loads only after cookie consent.

**reCAPTCHA v3:** Add script + `window.__NEWERA_RECAPTCHA_KEY` to `contact.html`. Set `RECAPTCHA_SECRET_KEY` in env vars.

---

## Enabling Hidden Sections

**Testimonials:** Remove the HTML comment wrapper in `index.html` (search `TESTIMONIALS CAROUSEL`), comment out the trust strip, populate `site-content.json`.

**Blog:** Remove the HTML comment wrapper, set `blogPreviewEnabled: true`, create `/blog.html`.

---

## Accessibility

Skip link, visible focus rings, ARIA states, focus trap in mobile drawer, keyboard nav for dropdowns/tabs/accordion/carousel, `prefers-reduced-motion`, semantic landmarks, `aria-live` for form validation.

---

## SEO

Unique title/description per page, canonical tags, OG/Twitter meta, JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList), sitemap.xml, robots.txt, one H1 per page, lazy-loaded images, font-display:swap.

---

## Third-Party Accounts

| Service | Purpose | Cost | Setup |
|---------|---------|------|-------|
| GitHub Pages | Web hosting + deployment | Free | Included with GitHub account |
| Buildium | Property management API | Existing contract | Already integrated |
| Formspree | Contact form submissions | Free (50/month) or paid | Form endpoint already configured |
| Google Analytics 4 | Traffic analytics | Free | Optional; add GA measurement ID |
| Google reCAPTCHA v3 | Spam prevention | Free | Optional; add keys to contact form |
| Google Search Console | SEO monitoring | Free | Connect domain for indexing reports |

---

## License

MIT — see [LICENSE](./LICENSE).

Built for **Newera Property Management LLC** · Houston, TX · TREC #9016567-BB
