// ==========================================================================
// HASSAN PORTFOLIO — site-data.js
// Single source of truth for all editable content, images, and theme.
// Used by BOTH the public site pages and the Admin Panel.
// Data lives in localStorage under the key below — this is what makes the
// Admin Panel "instantly update" the site: every page reads from here.
// ==========================================================================

const SITE_DATA_KEY = 'hassanSiteData_v1';

const ICONS = {
  store: '<path d="M6 2 4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4Z"/><path d="M4 6h16"/><path d="M10 10a2 2 0 1 0 4 0"/>',
  redesign: '<path d="M12 20v-6M12 14l4-4M12 14 8 10M4 4h16v6a8 8 0 0 1-16 0V4Z"/>',
  ads: '<path d="m3 11 18-8-8 18-2-8-8-2Z"/>',
  seo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
  star: '<path d="m12 2 2.9 6.6L22 9.3l-5 4.9 1.2 7-6.2-3.4L5.8 21.2 7 14.2l-5-4.9 7.1-1.1Z"/>',
  medal: '<circle cx="12" cy="8" r="6"/><path d="M9 13.5 7 22l5-3 5 3-2-8.5"/>',
  bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
  chart: '<path d="M3 17 9 11 13 15 21 7"/><path d="M15 7h6v6"/>',
  cert: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
  shoe: '<path d="M2 18c2-4 4-6 8-6 3 0 3 2 6 2 3 0 4-2 6-2v6H2Z"/>',
  watch: '<circle cx="12" cy="12" r="7"/><path d="M12 9v3l2 2M10 2h4M10 22h4"/>'
};

const THEMES = [
  { id: 'charcoal-olive', name: 'Charcoal Olive (Default)' },
  { id: 'midnight-forest', name: 'Midnight Forest' },
  { id: 'slate-gold', name: 'Slate Gold' },
  { id: 'deep-emerald', name: 'Deep Emerald' }
];

const SITE_DEFAULTS = {
  theme: 'charcoal-olive',

  text: {
    home_hero_eyebrow: "Shopify Expert & Digital Marketer",
    home_hero_name: "Hassan",
    home_hero_title: "Shopify Store Design, Development & Growth",
    home_hero_tagline: "I build Shopify stores that convert, not just look good. Every store I design is built around one goal — turning visitors into paying customers.",

    home_stat1_value: "100", home_stat1_suffix: "%", home_stat1_label: "Job Success Score on Upwork",
    home_stat2_value: "6", home_stat2_suffix: "+", home_stat2_label: "Client Projects Completed",
    home_stat3_value: "842", home_stat3_suffix: "%", home_stat3_label: "Max Sales Growth Achieved",
    home_stat4_value: "Rising Talent", home_stat4_label: "Official Upwork Status",

    home_services_heading: "Everything your store needs to sell more",
    home_services_sub: "From first build to full-funnel growth — design, development, and paid acquisition, handled end to end.",

    home_work_heading: "Stores built to perform",
    home_work_sub: "A look at recent Shopify builds, from footwear to fine watches.",

    home_testimonial_text: "He is a highly skilled professional with strong knowledge of Shopify and delivered the work exactly as I wanted. His humble and respectful attitude stood out the most, he always listened carefully to my instructions.",
    home_testimonial_author: "Abdullah Z.",
    home_testimonial_role: "Shopify Store Owner",

    home_cta_heading: "Ready for a store that actually converts?",
    home_cta_sub: "Tell me about your store and where you want it to go — I'll reply with next steps within a day.",

    portfolio_header_eyebrow: "Portfolio",
    portfolio_header_heading: "Work built to sell, not just look good",
    portfolio_header_sub: "A mix of Shopify store builds and paid-growth campaigns — each one solving a different problem for a different brand.",

    about_header_eyebrow: "About Me",
    about_header_heading: "From learning Shopify to building stores that sell",
    about_header_sub: "A short story of how a certification turned into a career built around one idea: a store should convert, not just look good.",
    about_p1: "I started my journey into e-commerce with a simple goal — understand how online stores actually work, not just how they look. That focus led me to earn my Shopify Store Design & Development certification from E-Commerce by Experts, Rajana in May 2022, where I learned the technical and design fundamentals of building a Shopify store from the ground up.",
    about_p2: "Design was only half the picture. Stores don't grow on good looks alone — they grow on traffic and conversions. So in October 2024, I completed a Digital Marketing certification through Digiskills, sharpening my ability to plan and run paid campaigns that actually bring in buyers, not just visitors.",
    about_p3: "Since then, I've worked with store owners on Upwork, building and growing Shopify stores from the ground up. Across 6 completed projects, I've maintained a 100% Job Success Score and earned Rising Talent status — including one project where I managed Meta and TikTok ad campaigns that grew a client's sales by 842%.",
    about_mission: "I don't just install a theme and add products. I build a store designed around conversions — from layout to checkout. My mission is to help brands turn a basic Shopify store into one that actually sells.",
    fact_location: "Punjab, Pakistan",
    fact_specialty: "Shopify & Growth",
    fact_jss: "100%",
    fact_status: "Rising Talent",
    fact_projects: "6",
    fact_result: "842% Growth",

    services_header_eyebrow: "Services",
    services_header_heading: "Pick the level of build your store needs",
    services_header_sub: "From a quick, clean setup to a fully custom build with ads management — every service is priced to be a starting point for a conversation.",

    awards_header_eyebrow: "Awards & Achievements",
    awards_header_heading: "Recognition earned through consistent results",
    awards_header_sub: "Certifications, platform badges, and a growth case study — each one a marker of a promise kept to a client.",

    contact_header_eyebrow: "Contact",
    contact_header_heading: "Let's build something that converts",
    contact_header_sub: "Tell me a bit about your store and where you want it to go — I'll get back to you within a day.",
    contact_form_intro: "Have a Shopify store or ad management project in mind? Fill out the form below and let's talk about how to get it moving."
  },

  images: {
    profile_photo: null
  },

  services: [
    { id: 'srv1', icon: 'store', badge: 'Starter', title: 'Small Store Setup', desc: 'A complete small Shopify store — theme install, a few core pages, product uploads, and payment gateway setup, ready to start selling.', price: '50', suffix: '' },
    { id: 'srv2', icon: 'redesign', badge: 'Popular', title: 'Custom Store Build', desc: 'A custom Shopify store with a tailored theme section, conversion-focused functionality, and support for a larger product catalog.', price: '80', suffix: '' },
    { id: 'srv3', icon: 'star', badge: 'Elite', title: 'Elite Store Build', desc: 'A full custom Shopify store with three custom sections, conversion-focused design throughout, and product research included.', price: '150', suffix: '' },
    { id: 'srv4', icon: 'ads', badge: 'Growth', title: 'Meta & TikTok Ads Management', desc: 'Setting up and managing ad campaigns on Meta and TikTok to drive consistent traffic and sales to your store.', price: '100', suffix: '/mo' }
  ],

  awards: [
    { id: 'awd1', icon: 'medal', date: 'Ongoing', issuer: 'Upwork', title: '100% Job Success Score', desc: 'Maintained across every completed project on Upwork. It reflects consistent client satisfaction — every store delivered on time, as promised, without exception.' },
    { id: 'awd2', icon: 'bolt', date: '2025', issuer: 'Upwork', title: 'Rising Talent Badge', desc: 'Awarded by Upwork to freelancers who show strong early performance and professionalism — a signal to clients that a track record can be trusted early on.' },
    { id: 'awd3', icon: 'chart', date: '2024', issuer: 'Client Project', title: '842% Sales Growth Case Study', desc: 'Achieved for a client\'s Shopify dropshipping store through hands-on Meta and TikTok ad campaign management — proof that the right store paired with the right ads compounds.' },
    { id: 'awd4', icon: 'cert', date: 'May 2022', issuer: 'E-Commerce by Experts, Rajana', title: 'Shopify Store Design & Development Certification', desc: 'The technical and design foundation behind every store I\'ve built since — covering theme development, Liquid, and conversion-focused layout principles.' },
    { id: 'awd5', icon: 'ads', date: 'October 2024', issuer: 'Digiskills', title: 'Digital Marketing Certification', desc: 'Formal training in paid acquisition and campaign strategy — the foundation that turned Meta and TikTok ads into a repeatable growth channel for clients.' }
  ],

  portfolio: [
    { id: 'prj1', category: 'design', catLabel: 'Store Design & Development', catPill: 'Store Design', icon: 'shoe', mock: 'mock-sneekars-full', image: null, title: 'Sneekars Hub', desc: 'A footwear Shopify store designed and developed from scratch, with a bold dark theme, sharp product photography layout, and clean, distraction-free product pages built to move visitors straight to checkout.', shortDesc: 'Designed and built a bold, dark-themed footwear store from scratch.', tags: 'Shopify · Theme Development · UI Design · CRO', featured: true },
    { id: 'prj2', category: 'design', catLabel: 'Store Design & Development', catPill: 'Store Design', icon: 'watch', mock: 'mock-watchify-full', image: null, title: 'Watchify', desc: 'A premium, minimal Shopify store built for a watch brand, using generous whitespace, refined typography, and a streamlined layout that matches the feel of a luxury product line and builds buyer trust.', shortDesc: 'Built a premium, minimal watch store layout matching a luxury product line.', tags: 'Shopify · Premium UI · Minimal Layout · Luxury Branding', featured: true },
    { id: 'prj3', category: 'ads', catLabel: 'Ads & Growth Campaigns', catPill: 'Ads & Growth', icon: 'bolt', mock: 'mock-dropship-full', image: null, title: 'Dropshipping Growth Project', desc: 'Managed Meta and TikTok ad campaigns end to end for a dropshipping store — audience testing, creative iteration, and budget scaling — growing total sales by 842% during the campaign period.', shortDesc: 'Managed Meta & TikTok ad campaigns that grew sales by 842%.', tags: 'Meta Ads · TikTok Ads · Campaign Strategy · Scaling', featured: false }
  ],

  contact: {
    email: 'hello@hassan-shopify.com',
    whatsappDisplay: '+92 300 1234567',
    whatsappLink: 'https://wa.me/923001234567',
    upwork: 'https://www.upwork.com/freelancers/~placeholderprofile',
    instagram: 'https://instagram.com/hassan.shopify',
    linkedin: 'https://linkedin.com/in/hassan-shopify',
    location: 'Punjab, Pakistan · Remote Worldwide'
  },

  timeline: [
    { date: 'May 2022', title: 'Shopify Store Design & Development Certification', desc: 'Certified by E-Commerce by Experts, Rajana — the technical and design foundation everything since has been built on.' },
    { date: 'Late 2022', title: 'First Client Project', desc: 'Took on my first Upwork client and delivered a complete Shopify build — the start of a growing track record.' },
    { date: 'October 2024', title: 'Digital Marketing Certification', desc: 'Completed a Digital Marketing certification through Digiskills, adding paid acquisition to my skill set.' },
    { date: '2024', title: 'Reached 100% Job Success Score', desc: 'Consistent, on-time delivery across every project earned a perfect Job Success Score on Upwork.' },
    { date: '2024', title: "Grew a Client's Sales by 842%", desc: 'Managed Meta and TikTok ad campaigns for a dropshipping store, scaling sales by 842% during the campaign period.' },
    { date: '2025', title: 'Achieved Rising Talent Status', desc: 'Recognized by Upwork as Rising Talent — a status reserved for freelancers with a strong, proven track record.' }
  ],

  skills: [
    { name: 'Shopify Development', percent: 95 },
    { name: 'Liquid Coding', percent: 88 },
    { name: 'CRO (Conversion Optimization)', percent: 90 },
    { name: 'SEO & Speed Optimization', percent: 85 },
    { name: 'Meta & TikTok Ads', percent: 92 },
    { name: 'Store Design', percent: 93 }
  ]
};

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function getSiteData() {
  try {
    const raw = localStorage.getItem(SITE_DATA_KEY);
    if (!raw) {
      const fresh = deepClone(SITE_DEFAULTS);
      localStorage.setItem(SITE_DATA_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw);
    // merge with defaults so newly added fields never break old saved data
    return {
      theme: parsed.theme || SITE_DEFAULTS.theme,
      text: Object.assign({}, SITE_DEFAULTS.text, parsed.text || {}),
      images: Object.assign({}, SITE_DEFAULTS.images, parsed.images || {}),
      services: parsed.services || deepClone(SITE_DEFAULTS.services),
      awards: parsed.awards || deepClone(SITE_DEFAULTS.awards),
      portfolio: parsed.portfolio || deepClone(SITE_DEFAULTS.portfolio),
      contact: Object.assign({}, SITE_DEFAULTS.contact, parsed.contact || {}),
      timeline: parsed.timeline || deepClone(SITE_DEFAULTS.timeline),
      skills: parsed.skills || deepClone(SITE_DEFAULTS.skills)
    };
  } catch (e) {
    console.error('Site data read error, resetting to defaults', e);
    const fresh = deepClone(SITE_DEFAULTS);
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(fresh));
    return fresh;
  }
}

function saveSiteData(data) {
  try {
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save site data (likely storage quota exceeded):', e);
    return false;
  }
}

function resetSiteData() {
  localStorage.setItem(SITE_DATA_KEY, JSON.stringify(deepClone(SITE_DEFAULTS)));
}

function uid(prefix) {
  return prefix + '_' + Math.random().toString(36).slice(2, 9);
}
