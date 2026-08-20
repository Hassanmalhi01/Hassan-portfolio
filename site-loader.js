// ==========================================================================
// HASSAN PORTFOLIO — site-loader.js
// Reads site data (localStorage) and renders it into the current page.
// Must run BEFORE other page scripts (main.js, portfolio.js, etc.) so that
// content exists before those scripts wire up animations. Include this
// script tag first, before other JS files, on every public page.
// ==========================================================================

(function () {

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function iconSvg(name, extraAttrs) {
    const path = ICONS[name] || ICONS.star;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' + (extraAttrs || '') + '>' + path + '</svg>';
  }

  function renderServiceCardHTML(s, variant, index) {
    if (variant === 'teaser') {
      const delayClass = index === 1 ? ' reveal-delay-1' : index === 2 ? ' reveal-delay-2' : index === 3 ? ' reveal-delay-3' : '';
      return (
        '<div class="service-card reveal' + delayClass + '">' +
          '<div class="service-icon">' + iconSvg(s.icon) + '</div>' +
          '<h3>' + s.title + '</h3>' +
          '<p>' + s.desc + '</p>' +
        '</div>'
      );
    }
    const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>';
    return (
      '<div class="pricing-card">' +
        '<div class="pricing-card-top">' +
          '<div class="pricing-icon">' + iconSvg(s.icon) + '</div>' +
          '<span class="pricing-badge">' + (s.badge || '') + '</span>' +
        '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p class="pricing-desc">' + s.desc + '</p>' +
        '<div class="pricing-footer">' +
          '<div class="pricing-price-wrap">' +
            '<span class="pricing-from">Starting at</span>' +
            '<span class="pricing-price">$' + s.price + (s.suffix ? '<span>' + s.suffix + '</span>' : '') + '</span>' +
          '</div>' +
          '<a href="contact.html" class="pricing-cta" aria-label="Get started with ' + s.title + '">' + arrowSvg + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  function renderAwardCardHTML(a) {
    return (
      '<div class="achievement-card">' +
        '<div class="achievement-medal">' + iconSvg(a.icon) + '</div>' +
        '<div class="achievement-body">' +
          '<div class="achievement-meta-row">' +
            '<span class="achievement-date">' + a.date + '</span>' +
            '<span class="achievement-issuer">' + a.issuer + '</span>' +
          '</div>' +
          '<h3>' + a.title + '</h3>' +
          '<p>' + a.desc + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function portfolioVisualHTML(p) {
    if (p.image) {
      return '<img src="' + p.image + '" alt="' + p.title + '" style="width:100%;height:100%;object-fit:cover;" />';
    }
    return '<div class="project-thumb-icon">' + iconSvg(p.icon, 'width="120" height="120"') + '</div>';
  }

  function renderPortfolioCardHTML(p) {
    return (
      '<div class="project-card" data-category="' + p.category + '" ' +
        'data-title="' + p.title.replace(/"/g, '&quot;') + '" ' +
        'data-cat-label="' + p.catLabel + '" ' +
        'data-desc="' + p.desc.replace(/"/g, '&quot;') + '" ' +
        'data-tags="' + p.tags + '">' +
        '<div class="project-thumb">' +
          '<div class="project-thumb-visual ' + (p.image ? '' : p.mock) + '">' + portfolioVisualHTML(p) + '</div>' +
          '<span class="project-cat-pill">' + p.catPill + '</span>' +
          '<button class="project-expand" aria-label="View project">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="project-body">' +
          '<h3 class="project-title">' + p.title + '</h3>' +
          '<p class="project-desc">' + p.shortDesc + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function renderWorkCardHTML(p, index) {
    const mockClass = p.category === 'design' ? (p.id === 'prj1' ? 'mock-sneekars' : 'mock-watchify') : 'mock-sneekars';
    const delayClass = index === 1 ? ' reveal-delay-2' : ' reveal-delay-1';
    return (
      '<a href="portfolio.html" class="work-card reveal' + delayClass + '">' +
        '<div class="work-thumb">' +
          '<div class="work-thumb-visual ' + (p.image ? '' : mockClass) + '">' +
            (p.image ? '<img src="' + p.image + '" alt="' + p.title + '" style="width:100%;height:100%;object-fit:cover;" />' : '') +
          '</div>' +
          '<div class="work-overlay"><div class="work-info">' +
            '<span class="work-cat">' + p.catLabel + '</span>' +
            '<h3 class="work-title">' + p.title + '</h3>' +
            '<p class="work-desc">' + p.desc + '</p>' +
          '</div></div>' +
          '<div class="work-view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg></div>' +
        '</div>' +
      '</a>'
    );
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme || 'charcoal-olive');
  }

  function render() {
    const data = getSiteData();
    applyTheme(data.theme);

    /* ---------- Profile photo (home hero) ---------- */
    const heroImg = document.querySelector('[data-editable="hero-photo"]');
    if (heroImg && data.images.profile_photo) {
      heroImg.src = data.images.profile_photo;
    }

    /* ---------- HOME PAGE ---------- */
    if (document.getElementById('stats')) {
      setText('heroEyebrow', data.text.home_hero_eyebrow);
      setText('heroName', data.text.home_hero_name);
      setText('heroTitle', data.text.home_hero_title);
      setText('heroTagline', data.text.home_hero_tagline);

      const c1 = document.getElementById('counter1'), c2 = document.getElementById('counter2'), c3 = document.getElementById('counter3');
      if (c1) { c1.dataset.target = data.text.home_stat1_value; c1.dataset.suffix = data.text.home_stat1_suffix || ''; }
      if (c2) { c2.dataset.target = data.text.home_stat2_value; c2.dataset.suffix = data.text.home_stat2_suffix || ''; }
      if (c3) { c3.dataset.target = data.text.home_stat3_value; c3.dataset.suffix = data.text.home_stat3_suffix || ''; }
      setText('stat1Label', data.text.home_stat1_label);
      setText('stat2Label', data.text.home_stat2_label);
      setText('stat3Label', data.text.home_stat3_label);
      setText('stat4Value', data.text.home_stat4_value);
      setText('stat4Label', data.text.home_stat4_label);

      setText('homeServicesHeading', data.text.home_services_heading);
      setText('homeServicesSub', data.text.home_services_sub);
      const teaserWrap = document.getElementById('homeServicesGrid');
      if (teaserWrap) teaserWrap.innerHTML = data.services.slice(0, 4).map((s, i) => renderServiceCardHTML(s, 'teaser', i)).join('');

      setText('homeWorkHeading', data.text.home_work_heading);
      setText('homeWorkSub', data.text.home_work_sub);
      const workGrid = document.getElementById('homeWorkGrid');
      if (workGrid) {
        const featured = data.portfolio.filter(p => p.featured).slice(0, 2);
        workGrid.innerHTML = featured.map((p, i) => renderWorkCardHTML(p, i)).join('');
      }

      setText('testimonialText', data.text.home_testimonial_text);
      setText('testimonialAuthor', data.text.home_testimonial_author);
      setText('testimonialRole', data.text.home_testimonial_role);
      const avatar = document.getElementById('testimonialAvatar');
      if (avatar) {
        const initials = (data.text.home_testimonial_author || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        avatar.textContent = initials || 'AZ';
      }

      setText('homeCtaHeading', data.text.home_cta_heading);
      setText('homeCtaSub', data.text.home_cta_sub);
    }

    /* ---------- PORTFOLIO PAGE ---------- */
    if (document.getElementById('portfolioGrid')) {
      setText('portfolioHeaderEyebrow', data.text.portfolio_header_eyebrow);
      setText('portfolioHeaderHeading', data.text.portfolio_header_heading);
      setText('portfolioHeaderSub', data.text.portfolio_header_sub);

      const grid = document.getElementById('portfolioGrid');
      grid.innerHTML = data.portfolio.map(renderPortfolioCardHTML).join('');

      const counts = { all: data.portfolio.length, design: 0, ads: 0, seo: 0 };
      data.portfolio.forEach(p => { if (counts[p.category] !== undefined) counts[p.category]++; });
      document.querySelectorAll('.filter-tab').forEach(tab => {
        const f = tab.dataset.filter;
        const countEl = tab.querySelector('.filter-count');
        if (countEl && counts[f] !== undefined) countEl.textContent = counts[f];
      });
    }

    /* ---------- ABOUT PAGE ---------- */
    if (document.getElementById('timelineWrap')) {
      setText('aboutHeaderEyebrow', data.text.about_header_eyebrow);
      setText('aboutHeaderHeading', data.text.about_header_heading);
      setText('aboutHeaderSub', data.text.about_header_sub);
      setText('aboutP1', data.text.about_p1);
      setText('aboutP2', data.text.about_p2);
      setText('aboutP3', data.text.about_p3);
      setText('aboutMission', data.text.about_mission);
      setText('factLocation', data.text.fact_location);
      setText('factSpecialty', data.text.fact_specialty);
      setText('factJss', data.text.fact_jss);
      setText('factStatus', data.text.fact_status);
      setText('factProjects', data.text.fact_projects);
      setText('factResult', data.text.fact_result);

      const spine = document.getElementById('timelineWrap');
      const items = spine.querySelectorAll('.timeline-item');
      data.timeline.forEach((t, i) => {
        const item = items[i];
        if (!item) return;
        const dateEl = item.querySelector('.timeline-date');
        const titleEl = item.querySelector('h3');
        const descEl = item.querySelector('p');
        if (dateEl) dateEl.textContent = t.date;
        if (titleEl) titleEl.textContent = t.title;
        if (descEl) descEl.textContent = t.desc;
      });

      const skillItems = document.querySelectorAll('.skill-item');
      data.skills.forEach((sk, i) => {
        const item = skillItems[i];
        if (!item) return;
        const nameEl = item.querySelector('.skill-name');
        const numEl = item.querySelector('.skill-num');
        const fillEl = item.querySelector('.skill-fill');
        if (nameEl) nameEl.textContent = sk.name;
        if (numEl) numEl.dataset.target = sk.percent;
        if (fillEl) fillEl.dataset.target = sk.percent;
      });
    }

    /* ---------- SERVICES PAGE ---------- */
    if (document.getElementById('servicesPricingGrid')) {
      setText('servicesHeaderEyebrow', data.text.services_header_eyebrow);
      setText('servicesHeaderHeading', data.text.services_header_heading);
      setText('servicesHeaderSub', data.text.services_header_sub);
      const grid = document.getElementById('servicesPricingGrid');
      grid.innerHTML = data.services.map(s => renderServiceCardHTML(s, 'pricing')).join('');
    }

    /* ---------- AWARDS PAGE ---------- */
    if (document.getElementById('achievementsList')) {
      setText('awardsHeaderEyebrow', data.text.awards_header_eyebrow);
      setText('awardsHeaderHeading', data.text.awards_header_heading);
      setText('awardsHeaderSub', data.text.awards_header_sub);
      const list = document.getElementById('achievementsList');
      list.innerHTML = data.awards.map(renderAwardCardHTML).join('');
    }

    /* ---------- CONTACT PAGE ---------- */
    if (document.getElementById('contactEmail')) {
      setText('contactHeaderEyebrow', data.text.contact_header_eyebrow);
      setText('contactHeaderHeading', data.text.contact_header_heading);
      setText('contactHeaderSub', data.text.contact_header_sub);
      setText('formIntro', data.text.contact_form_intro);

      const emailEl = document.getElementById('contactEmail');
      emailEl.textContent = data.contact.email;
      emailEl.href = 'mailto:' + data.contact.email;

      const waEl = document.getElementById('contactWhatsapp');
      if (waEl) { waEl.textContent = data.contact.whatsappDisplay; waEl.href = data.contact.whatsappLink; }

      const locEl = document.getElementById('contactLocation');
      if (locEl) locEl.textContent = data.contact.location;

      document.querySelectorAll('[data-social="upwork"]').forEach(a => a.href = data.contact.upwork);
      document.querySelectorAll('[data-social="instagram"]').forEach(a => a.href = data.contact.instagram);
      document.querySelectorAll('[data-social="linkedin"]').forEach(a => a.href = data.contact.linkedin);

      document.querySelectorAll('[data-mailto]').forEach(a => a.href = 'mailto:' + data.contact.email);
      document.querySelectorAll('[data-mailto-text]').forEach(a => a.textContent = data.contact.email);
      document.querySelectorAll('[data-whatsapp-link]').forEach(a => a.href = data.contact.whatsappLink);
    }

    /* ---------- FOOTER SOCIALS (all pages) ---------- */
    document.querySelectorAll('[data-social="upwork"]').forEach(a => a.href = data.contact.upwork);
    document.querySelectorAll('[data-social="instagram"]').forEach(a => a.href = data.contact.instagram);
    document.querySelectorAll('[data-social="linkedin"]').forEach(a => a.href = data.contact.linkedin);
    document.querySelectorAll('[data-mailto]').forEach(a => a.href = 'mailto:' + data.contact.email);
    document.querySelectorAll('[data-mailto-text]').forEach(a => a.textContent = data.contact.email);

    document.dispatchEvent(new Event('site-data-ready'));
  }

  document.addEventListener('DOMContentLoaded', render);

  // Live-sync: if the Admin Panel is open in another tab of the same browser
  // and a save happens, this page updates instantly without a reload.
  window.addEventListener('storage', function (e) {
    if (e.key === SITE_DATA_KEY) {
      render();
    }
  });

})();
