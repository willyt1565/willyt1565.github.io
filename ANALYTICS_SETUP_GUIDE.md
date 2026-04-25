# Newera PM — Analytics Setup Guide (GA4)

This is your one-time, step-by-step guide to turn on visitor tracking for **newerapm.com** using Google Analytics 4. The tracking code is already built into the website — you just need to create one account, copy one ID, and paste it into one file.

**Total time:** about 15 minutes.
**Cost:** $0.

---

## Step 1 — Create your Google Analytics 4 account

1. Go to **https://analytics.google.com** and sign in with your Newera Google account.
2. Click **Start measuring** (or **Admin → Create → Account** if you already use Google Analytics).
3. **Account name:** `Newera Property Management`. Accept the data-sharing defaults.
4. **Property name:** `newerapm.com`. Time zone: **United States (Central)**. Currency: **USD**.
5. Business details: industry **Real Estate**, size **Small**, objective **Generate leads** (you can pick others too).
6. **Platform:** choose **Web**. Enter:
   - Website URL: `https://www.newerapm.com`
   - Stream name: `newerapm.com – web`
7. Click **Create stream**.

You'll land on a page with a **Measurement ID** at the top right — it looks like:
```
G-XXXXXXXXXX
```
**Copy that ID.** Keep it open in a tab.

---

## Step 2 — Paste the ID into the website

1. Open `website-code/js/analytics.js` in your editor (VS Code, etc.).
2. Near the top you'll see this block:
   ```js
   var CONFIG = {
     GA4_ID: 'G-XXXXXXXXXX',
     RESPECT_DNT: true,
   };
   ```
3. Replace the placeholder `'G-XXXXXXXXXX'` with your real Measurement ID. Keep the quotes.
4. Save the file.

---

## Step 3 — Push to GitHub

```bash
cd website-code
git add js/analytics.js
git commit -m "Activate Google Analytics 4 tracking"
git push
```

Wait 1–2 minutes for GitHub Pages to redeploy. Watch the green checkmark in your repo's **Actions** tab if you want to be sure.

---

## Step 4 — Verify it's working

1. Open an **incognito** browser window (so ad blockers / your own cached login don't interfere).
2. Visit `https://www.newerapm.com` and click around 3–4 pages.
3. Back in Google Analytics, go to **Reports → Realtime**.
4. Within about 30 seconds you should see "1 user in last 30 minutes" with your visit showing up.

If nothing appears after 2 minutes:
- Check the ID you pasted (no extra spaces, correct case — it must start with `G-`)
- Make sure GitHub Pages finished deploying
- Disable any ad blocker / privacy extension in your test browser

---

## What gets tracked automatically

Once GA4 is live, the site tracks these events on its own — no further coding needed:

| Event | When it fires | Why it matters |
|---|---|---|
| `page_view` | Every page load | Total visits, popular pages |
| `phone_click` | Visitor taps `(832) 558-2911` | Counts inbound call interest |
| `email_click` | Visitor taps `info@` or `support@` | Counts email inquiries |
| `generate_lead` | Visitor submits contact form | The big one — tracks actual leads |
| `cta_click` | Visitor clicks "Get a Free Consultation" | Measures button effectiveness |
| `portal_click` | Visitor clicks Owner or Resident portal link | Existing-client vs. new-lead behavior |

Find them in GA4 under **Reports → Engagement → Events**.

---

## Where to look in GA4

Once data starts flowing (give it 24–48 hours for meaningful patterns), here are the reports worth checking:

- **Reports → Realtime** — what's happening right now
- **Reports → Acquisition → Traffic acquisition** — where visitors come from (Google search, Facebook, direct, referrals)
- **Reports → Engagement → Pages and screens** — which pages get the most views
- **Reports → Engagement → Events** — phone clicks, form submissions, CTA clicks
- **Reports → Demographics → Demographic details** — geography (city/state of visitors)
- **Reports → Tech → Tech details** — devices and browsers visitors use

---

## Privacy note

The tracking code has IP anonymization on by default and respects Do-Not-Track browser settings. The existing Privacy Policy at `/privacy.html` already discloses GA4 usage, so you're covered legally for Texas and most U.S. visitors.

---

## Want to add ranking insights later?

GA4 alone tells you **how many** people came from Google search — but not **what they searched for** or **where you ranked**. If you want that data later, you can add Google Search Console in about 5 minutes; let me know and I'll wire it back in.

---

## Quick links

- **Google Analytics:** https://analytics.google.com
- **Your dashboard in Cowork:** "Newera Analytics" artifact in the sidebar
