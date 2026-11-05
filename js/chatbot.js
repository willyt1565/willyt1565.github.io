/* =========================================================================
   NEWERA PROPERTY MANAGEMENT | Website help chat (free, no AI service)
   -------------------------------------------------------------------------
   Answers come ONLY from the knowledge base below, written from the content
   on newerapm.com. If a question isn't matched, the visitor sees our phone
   numbers and emails and can send the question to the team (Formspree,
   same form as the Contact page, so it lands in info@newerapm.com).

   TO UPDATE AN ANSWER: edit the KB list below (q = title, k = keywords,
   a = answer HTML, l = optional [link text, url]). Keep answers matching
   the website. Never promise approvals or decisions.
   Load on every page with:  <script defer src="/js/chatbot.js"></script>
   ========================================================================= */
(function () {
  'use strict';
  if (window.__neweraChat) return; window.__neweraChat = true;
  if (/^\/invoices/.test(location.pathname)) return; // internal page

  var FORM_URL = 'https://formspree.io/f/mlgajalw';
  var HOU = '<a href="tel:+18325582911">(832) 558-2911</a>';
  var SA  = '<a href="tel:+12108125880">(210) 812-5880</a>';
  var INFO = '<a href="mailto:info@newerapm.com">info@newerapm.com</a>';
  var SUPPORT = '<a href="mailto:support@newerapm.com">support@newerapm.com</a>';
  var PORTAL = 'https://newerapm.managebuilding.com/Resident/portal';
  var OWNER_PORTAL = 'https://newerapm.managebuilding.com/manager';
  var PETS = 'https://newera.petscreening.com';

  /* ---------------- Knowledge base (from newerapm.com) ---------------- */
  var KB = [
    // ---------- Owners ----------
    { q: 'Property management fees', k: ['cost', 'price', 'pricing', 'fee', 'fees', 'charge', 'how much do you charge', 'how much does it cost', 'how much is management', 'management fee', 'percent', 'percentage', 'rate', 'rates', 'expensive', 'cheap', 'quote', 'commission', 'flat fee'],
      a: 'Our management fee is typically <strong>8% of the monthly rent</strong>. Leasing and renewal fees are quoted during your <strong>free consultation</strong>, based on your property. Owners with multiple properties can qualify for portfolio discounts. There are no hidden charges and no markups on vendor invoices.',
      l: ['Get a Free Consultation', '/contact?form=consultation'] },
    { q: 'Areas we serve', k: ['area', 'areas', 'serve', 'service area', 'location', 'locations', 'where', 'city', 'cities', 'houston', 'san antonio', 'katy', 'cypress', 'spring', 'woodlands', 'tomball', 'sugar land', 'pearland', 'schertz', 'garden ridge', 'new braunfels', 'bulverde', 'canyon lake', 'near me', 'texas'],
      a: 'We serve <strong>Houston</strong> (including Katy, Cypress, Spring, The Woodlands, Tomball, Sugar Land and Pearland) and <strong>San Antonio</strong> (including Schertz, Garden Ridge, New Braunfels, Bulverde and Canyon Lake), plus surrounding areas. Each market has a dedicated local team member.',
      l: ['Houston', '/houston-property-management/'], l2: ['San Antonio', '/san-antonio-property-management/'] },
    { q: 'Types of properties we manage', k: ['type of property', 'property type', 'single family', 'single-family', 'multifamily', 'multi family', 'duplex', 'fourplex', 'apartment', 'townhome', 'condo', 'what do you manage', 'kind of property'],
      a: 'We manage <strong>single-family and multifamily rentals</strong> in Houston and San Antonio, leased to residents on standard long-term leases.' },
    { q: 'Short-term rentals and Airbnb', k: ['airbnb', 'short term', 'short-term', 'vrbo', 'vacation rental', 'str'],
      a: 'No, we don\'t manage short-term rentals or Airbnbs. We focus on long-term residential rentals: single-family and multifamily homes leased to residents on standard leases.' },
    { q: 'Our services', k: ['service', 'services', 'what do you do', 'offer', 'full service', 'property management', 'manage my property', 'manage my home', 'manage my house', 'hire', 'help me manage'],
      a: 'Our full property management covers four areas: <strong>marketing, leasing and tenant screening</strong>, <strong>rent collection and owner reporting</strong>, <strong>maintenance and vendor management</strong>, and <strong>inspections</strong> every 6 months. We are also a licensed Texas brokerage and can help you buy or sell.',
      l: ['See All Services', '/services'], l2: ['Get a Free Consultation', '/contact?form=consultation'] },
    { q: 'Tenant placement (leasing only)', k: ['tenant placement', 'leasing only', 'leasing-only', 'placement', 'find a tenant', 'find tenant', 'just leasing', 'only find', 'self manage', 'self-manage', 'manage myself'],
      a: 'Yes, we offer <strong>tenant placement</strong> (leasing only) for landlords who want help finding and screening a tenant but plan to manage the property themselves. We help market the rental, screen applicants and prepare a Texas lease, then hand the property back to you. Reach out to learn more about the process and pricing, with no obligation.',
      l: ['Tenant Placement', '/tenant-placement/'] },
    { q: 'Out-of-state and military owners', k: ['military', 'pcs', 'deployed', 'deployment', 'while i m deployed', 'while deployed', 'getting deployed', 'relocating', 'relocate', 'moving away', 'out of state', 'out-of-state', 'live far', 'another state', 'jbsa', 'lackland', 'fort sam', 'randolph'],
      a: 'Yes. We manage homes for out-of-state owners and military owners relocating on PCS orders. A local team member handles showings, inspections and vendor visits, and you can see everything in your owner portal from anywhere. We also work with military residents moving into the San Antonio area.',
      l: ['PCS Rental Guide', '/blog/renting-out-your-home-pcs-san-antonio/'] },
    { q: 'Switching property managers', k: ['switch', 'switching', 'change manager', 'current manager', 'new property manager', 'leave my manager', 'unhappy with my manager', 'transfer management'],
      a: 'Switching is simpler than most owners expect. We put together a step-by-step guide for Texas owners, and our team can walk you through your situation during a free consultation.',
      l: ['How to Switch Property Managers', '/blog/how-to-switch-property-managers-texas/'] },
    { q: 'Rent collection and owner payouts', k: ['rent collection', 'collect rent', 'get paid', 'owner payout', 'payout', 'deposit to my account', 'when do i get paid', 'owner distribution', 'distribution', 'direct deposit', 'paid on time'],
      a: 'Residents pay online through a secure portal. Funds clear through our trust account and net proceeds are deposited to your bank account on a consistent monthly schedule, typically by the <strong>10th of the month</strong> once rent has been collected and cleared. You can check payment status anytime in your owner portal.' },
    { q: 'Owner statements and reports', k: ['statement', 'statements', 'report', 'reports', 'reporting', '1099', 'tax', 'taxes', 'ledger', 'financial', 'owner portal', 'owner login'],
      a: 'Everything lives in your secure <strong>owner portal</strong>: monthly statements, year-to-date ledgers, work order history, inspection reports and year-end 1099 tax documents (delivered every January). You can log in anytime from any device.',
      l: ['Owner Portal Login', OWNER_PORTAL] },
    { q: 'If a resident doesn\'t pay rent', k: ['not pay', 'doesn t pay', 'does not pay', 'stop paying', 'non payment', 'nonpayment', 'eviction', 'evict', 'delinquent', 'late tenant', 'tenant late'],
      a: 'We follow a consistent, Texas-compliant process: late fees are assessed, reminders are sent and formal notices are posted on the required legal schedule. If a payment plan can protect your cash flow, we\'ll propose it with the numbers. If eviction becomes necessary, we coordinate the filing, court date and turnover.' },
    { q: 'Inspections', k: ['inspection', 'inspections', 'inspect', 'check on my property', 'condition', 'walkthrough', 'visit my property'],
      a: 'We inspect every property we manage <strong>every 6 months</strong>. Findings are documented with photos and shared in your owner portal. Small issues are scheduled for repair, and larger concerns are brought to you for a decision.' },
    { q: 'Maintenance for owners', k: ['owner maintenance', 'repair cost', 'repairs cost', 'reserve', 'maintenance reserve', 'markup', 'approve repairs', 'who pays for repairs', '500'],
      a: 'Each owner keeps a maintenance reserve with Newera. Repairs under <strong>$500</strong> are typically paid from that reserve, and larger repairs are always reviewed with you before work begins. Our vendors are licensed, insured and vetted, and we never mark up vendor invoices. Every expense is itemized on your monthly statement.' },
    { q: 'Raising the rent', k: ['raise rent', 'raise the rent', 'increase rent', 'rent increase', 'rent control', 'market rent', 'how much rent', 'rental analysis', 'rent price', 'pricing my rental'],
      a: 'At each lease renewal we provide a market analysis and recommend a rent adjustment based on local comparables, property condition and occupancy trends. You make the final decision. Texas has no rent control, so increases are governed by the lease terms. Want to know what your home could rent for? Ask for a free rental analysis.',
      l: ['Get a Free Rental Analysis', '/contact?form=consultation'] },
    { q: 'Choosing the resident', k: ['approve tenant', 'approve the tenant', 'choose tenant', 'final say', 'final approval', 'pick tenant', 'tenant screening', 'screen tenants', 'screening process', 'background check on tenant'],
      a: 'Every applicant goes through the same Fair Housing compliant screening: credit, criminal, eviction and income checks, plus employment and prior landlord verification. We present qualified applicants with a screening summary, and <strong>you have final approval</strong>. We never sign a lease without your sign-off.' },
    { q: 'Resident disputes', k: ['dispute', 'disputes', 'problem tenant', 'bad tenant', 'lease violation', 'violation', 'complaint about tenant'],
      a: 'We handle all resident communication on your behalf. Lease violations are documented in writing, notices are posted per Texas law, and you\'re kept informed at every step. If legal action becomes necessary, we coordinate with licensed attorneys who specialize in Texas landlord-tenant law.' },
    { q: 'Buying or selling a property', k: ['buy', 'buying', 'sell', 'selling', 'sell my', 'sell a home', 'sell my home', 'purchase', 'for sale', 'realtor', 'agent', 'broker', 'brokerage', 'list my house', 'investment property'],
      a: 'We are a licensed Texas real estate brokerage, so we can represent you when buying or selling a property, including investment properties. Tell us what you\'re looking for and our team will follow up.',
      l: ['Contact Us', '/contact'] },
    { q: 'License and credentials', k: ['license', 'licensed', 'trec', 'broker of record', 'legit', 'legitimate', 'narpm', 'insured', 'credentials'],
      a: 'Newera Property Management LLC is a licensed Texas real estate brokerage (<strong>TREC License #9016567-BB</strong>), and all property management services are provided under our designated broker of record. We are also a NARPM member.' },
    { q: 'Referral program', k: ['refer', 'referral', 'referrals', 'refer a friend', 'earn', 'bonus', 'finder fee', 'refer an owner'],
      a: 'Our Refer &amp; Earn program pays <strong>$150 per client plus $10 per door</strong> they own, paid once the referred owner signs a Property Management Agreement. There is no cap on referrals.',
      l: ['Refer &amp; Earn', '/referral/'] },
    { q: 'About Newera', k: ['about', 'who are you', 'company', 'history', 'background', 'newera', 'new era', 'why choose', 'why newera', 'different'],
      a: 'Newera is a modern property management company built by real estate investors who own and manage rentals themselves. We bring an investor\'s perspective, transparent reporting and real-time portal access to single-family and multifamily rentals in Houston and San Antonio.',
      l: ['About Newera', '/about'] },
    { q: 'Reviews', k: ['review', 'reviews', 'testimonial', 'testimonials', 'rating', 'google reviews', 'what do people say'],
      a: 'You can read what owners and residents say about us on our Reviews page and on Google.',
      l: ['Reviews &amp; Testimonials', '/reviews'] },

    // ---------- Residents ----------
    { q: 'Paying rent online', k: ['pay rent', 'paying rent', 'pay my rent', 'rent payment', 'make a payment', 'autopay', 'auto pay', 'ach', 'credit card', 'debit card', 'how to pay', 'online payment', 'where do i pay'],
      a: 'Log in to the <strong>Resident Portal</strong> with the credentials provided at move-in, select "Make a Payment" and choose ACH bank transfer, debit card or credit card. You can also set up autopay. Rent is due on the 1st of each month.',
      l: ['Resident Portal', PORTAL] },
    { q: 'Resident portal login', k: ['resident portal', 'tenant portal', 'portal', 'login', 'log in', 'sign in', 'password', 'username', 'account'],
      a: 'Residents can log in to the Resident Portal to pay rent, submit maintenance requests and track work orders. If you have trouble logging in, email ' + SUPPORT + '.',
      l: ['Resident Portal', PORTAL] },
    { q: 'Can\'t pay rent on time', k: ['can t pay', 'cannot pay', 'cant pay', 'late rent', 'pay late', 'late fee', 'late fees', 'grace period', 'payment plan', 'behind on rent', 'short on rent'],
      a: 'Please contact us as early as possible. We are required to enforce your lease terms (including any late fees), but depending on the circumstances we can sometimes work out a short-term plan. Reaching out before the due date is always better. Email ' + SUPPORT + ' or call ' + HOU + ' (Houston) or ' + SA + ' (San Antonio).' },
    { q: 'Submitting a maintenance request', k: ['maintenance', 'maintenance request', 'repair', 'repairs', 'fix', 'broken', 'work order', 'leak', 'leaking', 'ac', 'a c', 'air conditioning', 'hvac', 'heater', 'heat', 'plumbing', 'toilet', 'faucet', 'appliance', 'dishwasher', 'not working'],
      a: 'Log in to the <strong>Resident Portal</strong> and select "Submit Maintenance Request." Describe the issue, add photos if you can and submit. Requests are prioritized by urgency: emergencies are typically dispatched within the hour, urgent items the same day, and routine items within a few business days.',
      l: ['Submit a Request', PORTAL] },
    { q: 'Checking a maintenance request', k: ['status', 'request status', 'work order status', 'update on my request', 'maintenance status', 'scheduled'],
      a: 'Log in to the Resident Portal and open your work orders to see the current status (submitted, scheduled, in progress, completed) and any notes from the vendor or our team. We also send email updates at each stage.',
      l: ['Resident Portal', PORTAL] },
    { q: 'Who pays for repairs (residents)', k: ['my responsibility', 'responsible for repairs', 'charged for repair', 'do i pay for repair', 'tenant responsibility', 'resident responsibility', 'damage i caused', 'negligence'],
      a: 'Generally, routine maintenance and system repairs are the owner\'s responsibility. Damage caused by misuse or negligence (for example, a drain clogged by improper disposal) may be charged to the resident per the lease. Your lease outlines the specific responsibilities.' },
    { q: 'Security deposit return', k: ['security deposit', 'deposit back', 'deposit return', 'get my deposit', 'move out', 'move-out', 'moving out', 'deductions', 'refund deposit'],
      a: 'Under Texas law, we have <strong>30 days after move-out</strong> to return your security deposit or provide an itemized list of deductions. The move-out inspection is compared with your move-in photos. If the home is returned in the same condition, minus normal wear and tear, you receive a full refund.' },
    { q: 'Normal wear and tear', k: ['wear and tear', 'normal wear', 'nail holes', 'scuffs', 'carpet', 'paint', 'damage'],
      a: 'Normal wear and tear includes minor scuffs, slight carpet wear in traffic areas and small nail holes from hanging pictures. Damage includes large holes in drywall, stained or burned carpet, broken fixtures, unauthorized paint and pet damage. Move-in photos are the baseline for comparison.' },
    { q: 'Lease or rent questions', k: ['lease question', 'my lease', 'renew lease', 'lease renewal', 'renewal', 'break lease', 'break my lease', 'end lease', 'early termination', 'sublease'],
      a: 'For questions about your lease or rent, email ' + SUPPORT + ' or call ' + HOU + ' (Houston) or ' + SA + ' (San Antonio), Monday to Friday, 9 AM to 5 PM Central. We respond to resident inquiries within one business day.' },

    // ---------- Applicants / renters ----------
    { q: 'Available homes for rent', k: ['available', 'for rent', 'rent a home', 'rent a house', 'rentals', 'listings', 'listing', 'vacancy', 'vacancies', 'homes for rent', 'houses for rent', 'looking to rent', 'looking for a home', 'bedroom'],
      a: 'You can browse our current homes for rent (and properties for sale) on our Available Properties page. Open any listing to see details and request a showing, or join our alert list to hear when a new home comes up.',
      l: ['Available Properties', '/properties'] },
    { q: 'Scheduling a showing', k: ['showing', 'tour', 'see the house', 'view the home', 'viewing', 'visit the home', 'self guided', 'appointment to see'],
      a: 'Open the listing on our Available Properties page and use the button to schedule a showing. Every listing walks you through the next steps.',
      l: ['Available Properties', '/properties'] },
    { q: 'How to apply', k: ['apply', 'application', 'how do i apply', 'rental application', 'submit application', 'applying'],
      a: 'Start by reviewing our <strong>Resident Qualification Criteria</strong>. If you meet the minimum requirements, apply through the listing on our Available Properties page. Every adult 18 or older who will live in the home must apply, and all applications in a group must be submitted at the same time. Every applicant also completes a PetScreening profile, even without pets.',
      l: ['Qualification Criteria', '/qualification-criteria'], l2: ['Available Properties', '/properties'] },
    { q: 'Will I be approved?', k: ['will i be approved', 'will i get approved', 'approved', 'pre approve', 'pre-approve', 'prequalify', 'pre qualify', 'guarantee', 'chance', 'chances', 'denied', 'denial', 'rejected', 'exception', 'bad credit', 'low credit', 'no credit'],
      a: 'We can\'t pre-approve or pre-screen applications here. Every application is reviewed against our published Qualification Criteria, the same way for every applicant. Please review the criteria, and if you meet the minimum requirements you are encouraged to apply. For specific questions, contact our team.',
      l: ['Qualification Criteria', '/qualification-criteria'], team: true },
    { q: 'Rental requirements', k: ['tenant criteria', 'rental criteria', 'requirement', 'requirements', 'qualify', 'qualification', 'criteria', 'income', 'credit', 'credit score', 'minimum', 'rental history', 'eviction history', 'background', 'criminal', 'felony', '3x', 'three times'],
      a: 'In short: one applicant needs gross monthly income of at least <strong>3 times the rent</strong> (two combined incomes must total 3.5 times), a <strong>640+ TransUnion credit score</strong>, no eviction, broken lease or judgment in the last 5 years, and a criminal background check. The criteria are applied the same way to every applicant. Please read the full page before applying.',
      l: ['Full Qualification Criteria', '/qualification-criteria'] },
    { q: 'Application and move-in fees', k: ['application', 'fee', 'application fee', 'app fee', 'apply fee', 'lease administration', 'admin fee', 'move in cost', 'move-in cost', 'move in fee', 'resident benefits package', 'benefits package', '75', '49'],
      a: 'The application fee is <strong>$75 per adult</strong> (non-refundable). There is a <strong>$75 lease administration fee</strong> at signing and at each renewal, and a required <strong>Resident Benefits Package of $49/month</strong>. Renters insurance with at least $100,000 liability coverage is required before move-in. The security deposit is scaled based on credit score.',
      l: ['Qualification Criteria', '/qualification-criteria'] },
    { q: 'Co-signers', k: ['cosigner', 'co signer', 'co-signer', 'guarantor', 'cosign'],
      a: 'Co-signers are not accepted. The financially responsible person must live at the property.' },
    { q: 'Renters insurance', k: ['renters insurance', 'insurance', 'liability coverage', 'additional interested'],
      a: 'Renters insurance with at least <strong>$100,000 liability coverage</strong> is required before move-in. Your proof must show the policy dates and who is covered, with Newera Property Management named as an "Additional Interested" party.' },
    { q: 'Disability accommodation in the application', k: ['reasonable accommodation', 'accommodation', 'disability', 'disabled', 'accessible', 'accessibility', 'fair housing', 'discrimination', 'discriminate'],
      a: 'Newera follows the federal Fair Housing Act and Texas fair housing laws. Applicants with disabilities may request a reasonable accommodation in the application or screening process by sending the request in writing to our office before application review. For assistance animals, see our Pet &amp; Animal Policy. Our team reviews each request individually.',
      l: ['Pet &amp; Animal Policy', '/pet-policy/'], team: true },

    // ---------- Pets ----------
    { q: 'Pet policy', k: ['pet', 'pets', 'dog', 'dogs', 'cat', 'cats', 'pet friendly', 'pet-friendly', 'allowed pets', 'pet policy', 'animal', 'animals', 'pet rent', 'pet fee', 'pet deposit', 'breed', 'breeds', 'restricted breed', 'fido score'],
      a: 'Dogs and cats are allowed at properties listed as pet-friendly, and other animals are reviewed case by case. Every applicant and resident completes a <strong>PetScreening</strong> profile, even without pets. Approved pets need a pet deposit and a monthly pet fee based on the pet\'s FIDO Score. Some breeds may be restricted by the owner\'s insurance. No pet may live at or visit the home before written approval.',
      l: ['Pet &amp; Animal Policy', '/pet-policy/'] },
    { q: 'PetScreening profile', k: ['petscreening', 'pet screening', 'pet profile', 'screening profile', 'no pet profile', 'create profile'],
      a: 'Go to <a href="' + PETS + '" target="_blank" rel="noopener noreferrer">newera.petscreening.com</a> and choose No Pet / Animal (free), Household Pet ($30 by card or $25 by ACH per pet, yearly) or Assistance Animal (free). Only one adult per household needs to complete it. PetScreening fees go to PetScreening, not Newera.',
      l: ['Start Your Profile', PETS] },
    { q: 'Existing PetScreening profile', k: ['already have', 'existing profile', 'have a profile', 'old profile', 'previous landlord', 'link my profile', 'share my profile', 'transfer profile', 'reuse'],
      a: 'No need to create a new one. Make sure your profile is active and up to date, then email ' + SUPPORT + ' with the email address on your PetScreening account. We\'ll send an access request through PetScreening. Approve it, and your profile is linked to Newera.',
      l: ['See the Steps', '/pet-policy/#existing-profile'] },
    { q: 'Assistance animals', k: ['assistance animal', 'service animal', 'service dog', 'support animal', 'emotional support', 'esa', 'therapy animal', 'companion animal'],
      a: 'Service and support animals are not considered pets. Requests are reviewed under the federal Fair Housing Act and Texas law, and can be submitted free through PetScreening using the Assistance Animal profile. Verified assistance animals have no pet fees, pet rent or pet deposit, and breed restrictions don\'t apply. Each request is reviewed individually by our team.',
      l: ['Pet &amp; Animal Policy', '/pet-policy/'], team: true },

    // ---------- General ----------
    { q: 'Contact and office hours', k: ['contact', 'phone', 'phone number', 'call', 'email', 'hours', 'office hours', 'open', 'business hours', 'reach you', 'talk', 'speak', 'number'],
      a: 'Call <strong>Houston</strong> ' + HOU + ' or <strong>San Antonio</strong> ' + SA + '. Email ' + INFO + ' (owners and general) or ' + SUPPORT + ' (residents). Office hours are Monday to Friday, 9 AM to 5 PM Central, and we reply within one business day.',
      l: ['Contact Us', '/contact'] },
    { q: 'Office address', k: ['address', 'office', 'office address', 'where are you located', 'mailing address', 'visit your office', 'located'],
      a: 'Our Houston and San Antonio office addresses are listed on our Contact page. Please call or email before visiting so we can make sure the right team member is available.',
      l: ['Contact Page', '/contact'] },
    { q: 'Careers', k: ['job', 'jobs', 'career', 'careers', 'hiring', 'work for', 'position', 'positions', 'employment', 'resume'],
      a: 'There are no open positions right now. You\'re welcome to send your resume to ' + INFO + ' and we\'ll keep it on file for future openings.',
      l: ['Careers', '/careers'] },
    { q: 'Vendors and partners', k: ['vendor', 'vendors', 'contractor', 'partner', 'partnership', 'handyman', 'plumber', 'electrician', 'roofer', 'work with you', 'join your vendor'],
      a: 'We\'re always looking for reliable, licensed and insured vendors across Houston and San Antonio. Visit our Vendors &amp; Partners page to connect with us.',
      l: ['Vendors &amp; Partners', '/vendors'] }
  ];

  var CHIPS = ['Our services', 'Management fees', 'Tenant placement', 'Areas we serve', 'Homes for rent', 'Tenant criteria', 'Pay rent online', 'Maintenance request', 'Talk to the team'];

  /* ---------------- Matching ---------------- */
  var STOP = ' a an the i me my we our you your is are am do does did can could would should will to of in on for and or it its this that there what how when where who why with be been have has at as by from if any about so just please hi hey hello thanks ';
  function norm(s) { return (' ' + String(s).toLowerCase().replace(/['’]/g, ' ').replace(/[^a-z0-9$]+/g, ' ') + ' ').replace(/\s+/g, ' '); }
  function stem(w) { return w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w; }
  function tokens(s) { return norm(s).trim().split(' ').filter(function (w) { return w && STOP.indexOf(' ' + w + ' ') === -1; }).map(stem); }

  KB.forEach(function (e) {
    e._p = []; e._w = {};
    e.k.forEach(function (k) {
      var n = norm(k);
      if (n.trim().indexOf(' ') !== -1) e._p.push(n); else e._w[stem(n.trim())] = 1;
    });
    tokens(e.q).forEach(function (t) { if (!e._w[t]) e._w[t] = 0.5; });
  });

  function rank(text) {
    var n = norm(text), t = tokens(text);
    return KB.map(function (e) {
      var s = 0;
      e._p.forEach(function (p) { if (n.indexOf(p) !== -1) s += 2.5; });
      t.forEach(function (w) { if (e._w[w]) s += e._w[w]; });
      return { e: e, s: s };
    }).filter(function (r) { return r.s > 0; }).sort(function (a, b) { return b.s - a.s; });
  }

  var EMERG = /\b(gas leak|smell gas|smell of gas|gas smell|fire|smoke|flood|flooding|sewer back|sewage|spark|carbon monoxide|electrical burn|burning smell|emergency|burst pipe|water everywhere)\b/;
  var HUMAN = /(human|real person|agent|representative|talk to (someone|a person|the team|team)|speak to (someone|a person)|call me|contact (someone|the team))/;

  /* ---------------- UI ---------------- */
  var css = '' +
    '.nb-launch{position:fixed;right:20px;bottom:20px;z-index:800;display:inline-flex;align-items:center;gap:10px;padding:12px 18px 12px 14px;border:0;border-radius:999px;background:#1E3A8A;color:#fff;font:600 15px/1 Inter,system-ui,sans-serif;box-shadow:0 14px 34px -10px rgba(11,31,74,.55);cursor:pointer;transition:transform .2s,background .2s}' +
    '.nb-launch[hidden]{display:none!important}' +
    '.nb-launch:hover{background:#162B65;transform:translateY(-2px)}.nb-launch svg{width:22px;height:22px;flex:none}' +
    '.nb-launch:focus-visible,.nb-panel button:focus-visible,.nb-panel a:focus-visible,.nb-panel input:focus-visible,.nb-panel select:focus-visible{outline:3px solid #0EA5E9;outline-offset:2px}' +
    'body.has-open-menu .nb-launch,body.has-open-menu .nb-panel{display:none}' +
    '@media (max-width:899px){body:has(.tp-sticky.is-shown) .nb-launch{bottom:84px}}' +
    '@media (max-width:520px){.nb-launch span{display:none}.nb-launch{padding:14px}}' +
    '.nb-panel{position:fixed;right:20px;bottom:20px;z-index:850;width:380px;max-width:calc(100vw - 32px);height:min(600px,calc(100vh - 40px));display:flex;flex-direction:column;background:#fff;border:1px solid #E2E8F0;border-radius:20px;box-shadow:0 30px 70px -20px rgba(11,31,74,.5);overflow:hidden;font:400 14.5px/1.55 Inter,system-ui,sans-serif;color:#1E293B}' +
    '.nb-panel[hidden]{display:none}' +
    '@media (max-width:520px){.nb-panel{right:0;left:0;bottom:0;width:auto;max-width:none;height:min(88vh,100dvh);border-radius:20px 20px 0 0}}' +
    '.nb-head{display:flex;align-items:center;gap:12px;padding:16px 16px 14px 18px;background:linear-gradient(145deg,#1E3A8A,#162B65);color:#fff}' +
    '.nb-head__ico{flex:none;display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.14);color:#7DD3FC}.nb-head__ico svg{width:20px;height:20px}' +
    '.nb-head h2{margin:0;font:700 16px/1.2 "League Spartan",Inter,sans-serif;color:#fff}.nb-head p{margin:2px 0 0;font-size:12px;color:rgba(255,255,255,.78)}' +
    '.nb-x{margin-left:auto;flex:none;width:36px;height:36px;border:0;border-radius:10px;background:rgba(255,255,255,.12);color:#fff;cursor:pointer;display:grid;place-items:center}.nb-x:hover{background:rgba(255,255,255,.22)}.nb-x svg{width:18px;height:18px}' +
    '.nb-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#F8FAFC;overscroll-behavior:contain}' +
    '.nb-msg{max-width:88%;padding:10px 13px;border-radius:14px;word-wrap:break-word}.nb-msg p{margin:0 0 6px}.nb-msg p:last-child{margin:0}' +
    '.nb-bot{align-self:flex-start;background:#fff;border:1px solid #E2E8F0;border-bottom-left-radius:4px}' +
    '.nb-user{align-self:flex-end;background:#1E3A8A;color:#fff;border-bottom-right-radius:4px}' +
    '.nb-msg a{color:#0284C7;font-weight:600}.nb-user a{color:#fff}' +
    '.nb-title{display:block;font-weight:700;color:#1E3A8A;margin-bottom:4px}' +
    '.nb-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}' +
    '.nb-link{display:inline-flex;align-items:center;gap:4px;padding:6px 12px;border-radius:999px;background:#E0F2FE;color:#075985!important;font-size:13px;font-weight:600;text-decoration:none}.nb-link:hover{background:#BAE6FD}' +
    '.nb-chips{display:flex;flex-wrap:wrap;gap:6px;align-self:stretch}' +
    '.nb-chip{padding:7px 12px;border:1px solid #CBD5E1;border-radius:999px;background:#fff;color:#1E3A8A;font:600 13px/1.2 Inter,system-ui,sans-serif;cursor:pointer}.nb-chip:hover{border-color:#0EA5E9;background:#F0F9FF}' +
    '.nb-alert{border-left:4px solid #DC2626;background:#FEF2F2}' +
    '.nb-card{display:grid;gap:6px;margin-top:8px;padding:10px 12px;border-radius:12px;background:#F1F5F9;font-size:13.5px}.nb-card strong{color:#0F172A}' +
    '.nb-form{display:grid;gap:8px;margin-top:10px}.nb-form label{display:grid;gap:3px;font-size:12.5px;font-weight:600;color:#334155}' +
    '.nb-form input,.nb-form select,.nb-form textarea{width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid #CBD5E1;border-radius:10px;font:400 14px/1.4 Inter,system-ui,sans-serif;color:#0F172A;background:#fff}' +
    '.nb-form textarea{min-height:64px;resize:vertical}.nb-form .nb-hp{position:absolute;left:-9999px}' +
    '.nb-btn{padding:10px 14px;border:0;border-radius:10px;background:#0EA5E9;color:#fff;font:600 14px/1 Inter,system-ui,sans-serif;cursor:pointer}.nb-btn:hover{background:#0284C7}.nb-btn[disabled]{opacity:.6;cursor:default}' +
    '.nb-err{color:#B91C1C;font-size:12.5px}' +
    '.nb-foot{padding:10px 12px 12px;border-top:1px solid #E2E8F0;background:#fff}' +
    '.nb-send{display:flex;gap:8px}.nb-send input{flex:1;min-width:0;padding:11px 13px;border:1px solid #CBD5E1;border-radius:12px;font:400 15px/1.3 Inter,system-ui,sans-serif}' +
    '.nb-send button{flex:none;width:44px;border:0;border-radius:12px;background:#1E3A8A;color:#fff;cursor:pointer;display:grid;place-items:center}.nb-send button:hover{background:#162B65}.nb-send svg{width:18px;height:18px}' +
    '.nb-note{margin:8px 2px 0;font-size:11px;color:#64748B;line-height:1.4}.nb-note a{color:#0284C7;font-weight:600}' +
    '.nb-typing{display:inline-flex;gap:4px}.nb-typing i{width:6px;height:6px;border-radius:50%;background:#94A3B8;animation:nbb 1s infinite}.nb-typing i:nth-child(2){animation-delay:.15s}.nb-typing i:nth-child(3){animation-delay:.3s}' +
    '.nb-launch{touch-action:none;user-select:none;-webkit-user-select:none}.nb-launch.nb-dragging{cursor:grabbing;transform:scale(1.06);transition:none}' +
    '@media (min-width:521px){.nb-head{cursor:move;user-select:none;-webkit-user-select:none;touch-action:none}.nb-head .nb-x{cursor:pointer}}' +
    '.nb-teaser{position:fixed;z-index:801;width:260px;max-width:calc(100vw - 32px);padding:14px 36px 14px 16px;background:#fff;border:1px solid #E2E8F0;border-radius:16px;box-shadow:0 18px 40px -14px rgba(11,31,74,.45);font:400 14px/1.5 Inter,system-ui,sans-serif;color:#334155;cursor:pointer;opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s}' +
    '.nb-teaser.nb-show{opacity:1;transform:none}.nb-teaser[hidden]{display:none}' +
    '.nb-teaser strong{display:block;margin-bottom:2px;font:700 15.5px/1.3 "League Spartan",Inter,sans-serif;color:#1E3A8A}' +
    '.nb-teaser p{margin:0}.nb-teaser__x{position:absolute;top:8px;right:8px;width:24px;height:24px;border:0;border-radius:8px;background:#F1F5F9;color:#475569;cursor:pointer;display:grid;place-items:center;padding:0}.nb-teaser__x:hover{background:#E2E8F0}.nb-teaser__x svg{width:12px;height:12px}' +
    'body.has-open-menu .nb-teaser{display:none}' +
    '@media (prefers-reduced-motion:reduce){.nb-teaser{transition:none}}' +
    '@keyframes nbb{0%,80%,100%{opacity:.3}40%{opacity:1}}' +
    '@media (prefers-reduced-motion:reduce){.nb-launch{transition:none}.nb-typing i{animation:none}}';

  var ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>';
  var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function el(tag, cls, htmlStr) { var n = document.createElement(tag); if (cls) n.className = cls; if (htmlStr != null) n.innerHTML = htmlStr; return n; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  var style = el('style'); style.textContent = css; document.head.appendChild(style);

  var launch = el('button', 'nb-launch', ICON_CHAT + '<span>Ask Newera</span>');
  launch.type = 'button'; launch.setAttribute('aria-label', 'Open help chat'); launch.setAttribute('aria-haspopup', 'dialog');

  var panel = el('section', 'nb-panel');
  panel.hidden = true; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Newera help chat');
  panel.innerHTML =
    '<div class="nb-head"><span class="nb-head__ico">' + ICON_CHAT + '</span><div><h2>Newera Help</h2><p>Instant answers from newerapm.com</p></div>' +
    '<button type="button" class="nb-x" aria-label="Close chat">' + ICON_X + '</button></div>' +
    '<div class="nb-log" aria-live="polite"></div>' +
    '<div class="nb-foot"><form class="nb-send" autocomplete="off"><label class="nb-hp" for="nb-q" style="position:absolute;left:-9999px">Your question</label><input id="nb-q" type="text" maxlength="300" placeholder="Type your question..." aria-label="Type your question"><button type="submit" aria-label="Send">' + ICON_SEND + '</button></form>' +
    '<p class="nb-note">Answers are general and may not reflect recent updates. For accurate answers, please <a href="/contact">contact our team</a>.</p></div>';

  document.body.appendChild(launch); document.body.appendChild(panel);
  var log = panel.querySelector('.nb-log'), input = panel.querySelector('#nb-q');

  var history = [];
  function save() { store('nbChat', JSON.stringify(history.slice(-30))); }
  function scroll() { log.scrollTop = log.scrollHeight; }

  function addMsg(who, htmlStr, extraCls, noSave) {
    var m = el('div', 'nb-msg nb-' + who + (extraCls ? ' ' + extraCls : ''), htmlStr);
    log.appendChild(m); scroll();
    if (!noSave) { history.push([who, htmlStr, extraCls || '']); save(); }
    return m;
  }
  function linkHtml(l) { if (!l) return ''; var ext = /^https?:/.test(l[1]); return '<a class="nb-link" href="' + l[1] + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + l[0] + (ext ? ' &#8599;' : ' &#8250;') + '</a>'; }
  function contactCard() {
    return '<div class="nb-card"><span><strong>Houston:</strong> ' + HOU + '</span><span><strong>San Antonio:</strong> ' + SA + '</span><span><strong>Owners and general:</strong> ' + INFO + '</span><span><strong>Residents:</strong> ' + SUPPORT + '</span><span>Monday to Friday, 9 AM to 5 PM Central</span></div>';
  }
  function chips(list) {
    var wrap = el('div', 'nb-chips');
    list.forEach(function (c) {
      var b = el('button', 'nb-chip', esc(c)); b.type = 'button';
      b.addEventListener('click', function () { ask(c); });
      wrap.appendChild(b);
    });
    log.appendChild(wrap); scroll();
  }

  function answer(e) {
    var h = '<span class="nb-title">' + e.q + '</span><p>' + e.a + '</p>';
    if (e.l || e.l2) h += '<div class="nb-links">' + linkHtml(e.l) + linkHtml(e.l2) + '</div>';
    if (e.team) h += contactCard();
    addMsg('bot', h);
  }

  function fallback(question) {
    addMsg('bot', '<p>Sorry, I couldn\'t find an answer to that on our website. Our team is happy to help. You can reach us directly:</p>' + contactCard() + '<p style="margin-top:8px">Or send your question below and we\'ll reply within one business day.</p>');
    teamForm(question);
  }

  function teamForm(question) {
    var box = el('div', 'nb-msg nb-bot');
    box.innerHTML = '<span class="nb-title">Send your question to our team</span>' +
      '<form class="nb-form" novalidate>' +
      '<label>Your name*<input name="fullName" required maxlength="80" autocomplete="name"></label>' +
      '<label>Email*<input name="email" type="email" required maxlength="120" autocomplete="email"></label>' +
      '<label>Phone (optional)<input name="phone" type="tel" maxlength="30" autocomplete="tel"></label>' +
      '<label>I am a...<select name="inquiryType"><option value="other" selected>Choose one</option><option value="owner">Property owner</option><option value="resident">Current resident</option><option value="other">Applicant or renter</option><option value="other">Other</option></select></label>' +
      '<label>Your question*<textarea name="message" required maxlength="1000"></textarea></label>' +
      '<input class="nb-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<span class="nb-err" role="alert"></span><button type="submit" class="nb-btn">Send to the Team</button></form>';
    log.appendChild(box); scroll();
    var f = box.querySelector('form'), err = box.querySelector('.nb-err');
    f.message.value = question || '';
    f.addEventListener('submit', function (ev) {
      ev.preventDefault(); err.textContent = '';
      var name = f.fullName.value.trim(), mail = f.email.value.trim(), msg = f.message.value.trim();
      if (!name || !msg || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { err.textContent = 'Please add your name, a valid email and your question.'; return; }
      var btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Sending...';
      var data = new FormData(f);
      data.set('message', '[Website chat question] ' + msg);
      data.append('_subject', 'New question from the website chat');
      data.append('_replyto', mail);
      data.append('source', 'Website chat');
      data.append('page', location.pathname);
      fetch(FORM_URL, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); })
        .then(function () {
          box.innerHTML = '<span class="nb-title">Thanks, ' + esc(name.split(' ')[0]) + '!</span><p>Your question was sent to our team. We\'ll reply to ' + esc(mail) + ' within one business day.</p>';
          history.push(['bot', box.innerHTML, '']); save();
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send to the Team';
          err.innerHTML = 'Sorry, that didn\'t go through. Please email ' + INFO + ' or call us.';
        });
    });
  }

  function respond(text) {
    var n = norm(text);
    if (EMERG.test(n) && !/emergency maintenance hours/.test(n)) {
      addMsg('bot', '<span class="nb-title">If anyone is in danger, call 911 first.</span><p>For a gas leak, fire, flooding, sewer backup or electrical sparking, leave the home if it\'s unsafe and call 911. Then call your local Newera team right away: Houston ' + HOU + ' or San Antonio ' + SA + '. You can also submit an urgent request in the Resident Portal.</p><div class="nb-links">' + linkHtml(['Resident Portal', PORTAL]) + '</div>', 'nb-alert');
      return;
    }
    if (HUMAN.test(n) || /^\s*talk to the team\s*$/.test(n)) {
      addMsg('bot', '<p>Happy to connect you with our team:</p>' + contactCard());
      teamForm('');
      return;
    }
    if (/^\s*(hi|hello|hey|good (morning|afternoon|evening)|yo)\s*$/.test(n)) { addMsg('bot', '<p>Hi there! What can I help you with today?</p>'); chips(CHIPS.slice(0, 6)); return; }
    if (/^\s*(thanks|thank you|thank u|ty|ok|okay|great|cool|got it)( so much| you)?\s*$/.test(n)) { addMsg('bot', '<p>You\'re welcome! Anything else I can help with?</p>'); return; }

    var r = rank(text);
    if (!r.length || r[0].s < 1) { fallback(text); return; }
    answer(r[0].e);
    var more = r.slice(1, 3).filter(function (x) { return x.s >= 1 && x.s >= r[0].s * 0.4; });
    if (more.length) {
      addMsg('bot', '<p>Related topics:</p>', '', false);
      chips(more.map(function (x) { return x.e.q; }));
    }
  }

  function ask(text) {
    text = String(text || '').trim(); if (!text) return;
    addMsg('user', esc(text));
    var t = el('div', 'nb-msg nb-bot', '<span class="nb-typing" aria-label="Typing"><i></i><i></i><i></i></span>');
    log.appendChild(t); scroll();
    setTimeout(function () { t.remove(); respond(text); }, 450);
  }

  // Chip labels that should map to a specific answer
  var CHIP_MAP = { 'tenant criteria': 'Rental requirements', 'our services': 'Our services', 'tenant placement': 'Tenant placement (leasing only)', 'management fees': 'Property management fees', 'pay rent online': 'Paying rent online', 'maintenance request': 'Submitting a maintenance request', 'homes for rent': 'Available homes for rent' };
  var origRespond = respond;
  respond = function (text) {
    var key = String(text).toLowerCase().trim(), title = CHIP_MAP[key] || text;
    for (var i = 0; i < KB.length; i++) if (KB[i].q.toLowerCase() === String(title).toLowerCase()) { answer(KB[i]); return; }
    origRespond(text);
  };

  function greet() {
    addMsg('bot', '<p>Hi! I\'m Newera\'s help assistant. I can tell you about our full-service property management, fees, tenant placement, the areas we serve and more. Residents and renters, I can help you too.</p><p>What can I help you with?</p>', '', true);
    chips(CHIPS);
  }

  function restore() {
    var saved; try { saved = JSON.parse(store('nbChat') || '[]'); } catch (e) { saved = []; }
    greet();
    if (saved && saved.length) { history = saved; saved.forEach(function (m) { addMsg(m[0], m[1], m[2], true); }); }
  }

  var started = false;
  function open() {
    if (!started) { started = true; restore(); }
    panel.hidden = false; launch.hidden = true; if (!isSheet()) place(panel, lget('nbPanelPos')); launch.setAttribute('aria-expanded', 'true');
    store('nbOpen', '1'); if (typeof hideTeaser === 'function' && !teaser.hidden) hideTeaser(true); setTimeout(function () { input.focus(); scroll(); }, 30);
  }
  function close() { panel.hidden = true; launch.hidden = false; launch.setAttribute('aria-expanded', 'false'); store('nbOpen', '0'); launch.focus(); }


  /* ---------------- Drag to move (button anywhere; window on desktop) ---------------- */
  function lget(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }
  function lset(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function clampTo(node, x, y) {
    var w = node.offsetWidth, h = node.offsetHeight, m = 8;
    return { x: Math.min(Math.max(m, x), Math.max(m, window.innerWidth - w - m)), y: Math.min(Math.max(m, y), Math.max(m, window.innerHeight - h - m)) };
  }
  function place(node, pos) {
    if (!pos) { node.style.left = node.style.top = node.style.right = node.style.bottom = ''; return; }
    var c = clampTo(node, pos.x, pos.y);
    node.style.left = c.x + 'px'; node.style.top = c.y + 'px'; node.style.right = 'auto'; node.style.bottom = 'auto';
  }
  function isSheet() { return window.innerWidth <= 520; }
  function makeDraggable(node, handle, key, opts) {
    var sx, sy, ox, oy, moved = false, active = false;
    handle.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || (opts.skip && opts.skip(e))) return;
      var r = node.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top; moved = false; active = true;
      try { handle.setPointerCapture(e.pointerId); } catch (er) {}
    });
    handle.addEventListener('pointermove', function (e) {
      if (!active) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return;
      if (!moved) { moved = true; node.classList.add('nb-dragging'); }
      var c = clampTo(node, ox + dx, oy + dy);
      node.style.left = c.x + 'px'; node.style.top = c.y + 'px'; node.style.right = 'auto'; node.style.bottom = 'auto';
      e.preventDefault();
    });
    function end() {
      if (!active) return; active = false; node.classList.remove('nb-dragging');
      if (moved) { var r = node.getBoundingClientRect(); lset(key, { x: r.left, y: r.top }); node.__justDragged = true; setTimeout(function () { node.__justDragged = false; }, 50); }
      else if (opts.onTap) opts.onTap();
    }
    handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
  }
  makeDraggable(launch, launch, 'nbLaunchPos', { onTap: function () { open(); } });
  makeDraggable(panel, panel.querySelector('.nb-head'), 'nbPanelPos', { skip: function (e) { return isSheet() || e.target.closest('.nb-x'); } });
  launch.addEventListener('click', function (e) { if (launch.__justDragged) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  function applyPositions() {
    place(launch, lget('nbLaunchPos'));
    if (isSheet()) place(panel, null); else if (!panel.hidden) place(panel, lget('nbPanelPos'));
  }
  applyPositions();
  window.addEventListener('resize', applyPositions);

  /* ---------------- Greeting bubble next to the button ---------------- */
  var teaser = el('div', 'nb-teaser', '<button type="button" class="nb-teaser__x" aria-label="Dismiss greeting">' + ICON_X + '</button><strong>Hello, Welcome to Newera!</strong><p>I\'m Newera\'s help assistant. Ask me about our property management services in Houston and San Antonio, fees, tenant placement and more.</p>');
  teaser.hidden = true; teaser.setAttribute('role', 'status');
  document.body.appendChild(teaser);
  function placeTeaser() {
    if (teaser.hidden) return;
    var r = launch.getBoundingClientRect(), tw = teaser.offsetWidth, th = teaser.offsetHeight, m = 8, gap = 12;
    var left = (r.left + r.width / 2 > window.innerWidth / 2) ? r.right - tw : r.left;
    var top = r.top - th - gap; if (top < m) top = r.bottom + gap;
    left = Math.min(Math.max(m, left), window.innerWidth - tw - m);
    teaser.style.left = left + 'px'; teaser.style.top = top + 'px';
  }
  function hideTeaser(forGood) {
    teaser.classList.remove('nb-show'); teaser.hidden = true;
    if (forGood) store('nbTeaser', 'done');
  }
  function showTeaser() {
    if (store('nbTeaser') === 'done' || !panel.hidden || launch.hidden) return;
    teaser.hidden = false; placeTeaser();
    requestAnimationFrame(function () { teaser.classList.add('nb-show'); });
  }
  teaser.addEventListener('click', function (e) {
    if (e.target.closest('.nb-teaser__x')) { hideTeaser(true); return; }
    hideTeaser(true); open();
  });
  new MutationObserver(placeTeaser).observe(launch, { attributes: true, attributeFilter: ['style', 'class'] });
  window.addEventListener('resize', placeTeaser);
  setTimeout(showTeaser, 2000);
  launch.addEventListener('click', open);
  panel.querySelector('.nb-x').addEventListener('click', close);
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  panel.querySelector('.nb-send').addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; ask(v); });
  if (store('nbOpen') === '1' && window.innerWidth > 520) open();

  window.NeweraChat = { open: open, ask: function (q) { open(); ask(q); }, _rank: function (q) { return rank(q).slice(0, 3).map(function (r) { return r.e.q + ' ' + r.s; }); } };
})();
