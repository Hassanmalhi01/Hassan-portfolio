// ==========================================================================
// HASSAN PORTFOLIO — admin-dashboard.js
// Wires up every field in the dashboard to the shared site data store.
// Every "Save" button writes straight to localStorage via saveSiteData(),
// which is the same store every public page reads from — so changes are
// live the instant you save (and instant in any other open tab too).
// ==========================================================================

(function () {

  /* ---------- Auth guard ---------- */
  if (!isAdminLoggedIn()) {
    window.location.href = 'index.html';
    return;
  }

  let data = getSiteData();

  function persist() {
    const ok = saveSiteData(data);
    if (ok) {
      showToast();
    } else {
      showToast('Save failed — this is likely too much data for browser storage (often caused by a large image). Try a smaller image.', true);
    }
    refreshOverview();
    return ok;
  }

  function showToast(msg, isError) {
    const toast = document.getElementById('adminToast');
    const text = document.getElementById('adminToastText');
    text.textContent = msg || 'Saved — your changes are now live.';
    toast.style.borderColor = isError ? '#C8463C' : '';
    toast.style.color = isError ? '#E8938A' : '';
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), isError ? 5200 : 3200);
  }

  function val(id) { const el = document.getElementById(id); return el ? el.value : ''; }
  function setVal(id, v) { const el = document.getElementById(id); if (el) el.value = v == null ? '' : v; }

  /* ---------- Sidebar navigation ---------- */
  const navBtns = document.querySelectorAll('.admin-nav-btn');
  const panels = document.querySelectorAll('.admin-panel');

  function goToPanel(key) {
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.panel === key));
    panels.forEach(p => p.classList.toggle('active', p.id === 'panel-' + key));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navBtns.forEach(btn => btn.addEventListener('click', () => goToPanel(btn.dataset.panel)));
  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', () => goToPanel(el.dataset.goto));
  });

  /* ---------- Logout ---------- */
  document.getElementById('logoutBtn').addEventListener('click', () => {
    setAdminLoggedIn(false);
    window.location.href = 'index.html';
  });

  /* ---------- Overview tiles ---------- */
  function refreshOverview() {
    document.getElementById('ovServices').textContent = data.services.length;
    document.getElementById('ovAwards').textContent = data.awards.length;
    document.getElementById('ovProjects').textContent = data.portfolio.length;
  }

  /* =========================================================
     HOME PAGE
     ========================================================= */

  function loadHomeForm() {
    setVal('f_home_hero_eyebrow', data.text.home_hero_eyebrow);
    setVal('f_home_hero_name', data.text.home_hero_name);
    setVal('f_home_hero_title', data.text.home_hero_title);
    setVal('f_home_hero_tagline', data.text.home_hero_tagline);

    setVal('f_stat1_value', data.text.home_stat1_value);
    setVal('f_stat1_label', data.text.home_stat1_label);
    setVal('f_stat2_value', data.text.home_stat2_value);
    setVal('f_stat2_label', data.text.home_stat2_label);
    setVal('f_stat3_value', data.text.home_stat3_value);
    setVal('f_stat3_label', data.text.home_stat3_label);
    setVal('f_stat4_value', data.text.home_stat4_value);
    setVal('f_stat4_label', data.text.home_stat4_label);

    setVal('f_home_services_heading', data.text.home_services_heading);
    setVal('f_home_services_sub', data.text.home_services_sub);
    setVal('f_home_work_heading', data.text.home_work_heading);
    setVal('f_home_work_sub', data.text.home_work_sub);

    setVal('f_testimonial_text', data.text.home_testimonial_text);
    setVal('f_testimonial_author', data.text.home_testimonial_author);
    setVal('f_testimonial_role', data.text.home_testimonial_role);

    setVal('f_home_cta_heading', data.text.home_cta_heading);
    setVal('f_home_cta_sub', data.text.home_cta_sub);

    const preview = document.getElementById('previewProfilePhoto');
    if (data.images.profile_photo) {
      preview.innerHTML = '<img src="' + data.images.profile_photo + '" alt="Profile preview" />';
    }
  }

  document.getElementById('uploadProfilePhoto').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      data.images.profile_photo = ev.target.result;
      document.getElementById('previewProfilePhoto').innerHTML = '<img src="' + ev.target.result + '" alt="Profile preview" />';
      persist();
      showToast('Profile photo updated — now live on the Home Page.');
    };
    reader.readAsDataURL(file);
  });

  document.querySelector('[data-save="home-hero"]').addEventListener('click', () => {
    data.text.home_hero_eyebrow = val('f_home_hero_eyebrow');
    data.text.home_hero_name = val('f_home_hero_name');
    data.text.home_hero_title = val('f_home_hero_title');
    data.text.home_hero_tagline = val('f_home_hero_tagline');
    persist();
  });

  document.querySelector('[data-save="home-stats"]').addEventListener('click', () => {
    data.text.home_stat1_value = val('f_stat1_value');
    data.text.home_stat1_label = val('f_stat1_label');
    data.text.home_stat2_value = val('f_stat2_value');
    data.text.home_stat2_label = val('f_stat2_label');
    data.text.home_stat3_value = val('f_stat3_value');
    data.text.home_stat3_label = val('f_stat3_label');
    data.text.home_stat4_value = val('f_stat4_value');
    data.text.home_stat4_label = val('f_stat4_label');
    persist();
  });

  document.querySelector('[data-save="home-headings"]').addEventListener('click', () => {
    data.text.home_services_heading = val('f_home_services_heading');
    data.text.home_services_sub = val('f_home_services_sub');
    data.text.home_work_heading = val('f_home_work_heading');
    data.text.home_work_sub = val('f_home_work_sub');
    persist();
  });

  document.querySelector('[data-save="home-testimonial"]').addEventListener('click', () => {
    data.text.home_testimonial_text = val('f_testimonial_text');
    data.text.home_testimonial_author = val('f_testimonial_author');
    data.text.home_testimonial_role = val('f_testimonial_role');
    persist();
  });

  document.querySelector('[data-save="home-cta"]').addEventListener('click', () => {
    data.text.home_cta_heading = val('f_home_cta_heading');
    data.text.home_cta_sub = val('f_home_cta_sub');
    persist();
  });

  /* =========================================================
     PORTFOLIO PROJECTS (CRUD)
     ========================================================= */

  const ICON_OPTIONS = Object.keys(ICONS);

  /**
   * Reads an image file, downsizes it to maxDim on its longest side, and
   * re-encodes it as JPEG at the given quality. This keeps uploaded photos
   * (which can be several MB straight off a phone camera) small enough to
   * reliably fit in localStorage instead of silently failing to save.
   */
  function compressImageFile(file, maxDim, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Could not read that file.'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('That file doesn\'t look like a valid image.'));
        img.onload = () => {
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) { height = Math.round(height * (maxDim / width)); width = maxDim; }
            else { width = Math.round(width * (maxDim / height)); height = maxDim; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          try {
            resolve(canvas.toDataURL('image/jpeg', quality));
          } catch (err) {
            reject(err);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function iconOptionsHTML(selected) {
    return ICON_OPTIONS.map(name =>
      '<option value="' + name + '"' + (name === selected ? ' selected' : '') + '>' + name.charAt(0).toUpperCase() + name.slice(1) + '</option>'
    ).join('');
  }

  function renderPortfolioList() {
    const wrap = document.getElementById('portfolioList');
    wrap.innerHTML = data.portfolio.map((p, i) => `
      <div class="item-card" data-index="${i}">
        <div class="item-card-head">
          <span class="item-card-tag">Project ${i + 1}</span>
          <button class="item-card-delete" data-delete-portfolio="${i}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            Remove
          </button>
        </div>

        <div class="image-upload-box" style="margin-bottom:18px;">
          <div class="image-preview">${p.image ? '<img src="' + p.image + '" alt="' + p.title + '" />' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 5 5 4-4 5 5"/></svg>'}</div>
          <div class="image-upload-controls">
            <label class="file-input-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 21h14"/></svg>
              Upload Thumbnail
              <input type="file" accept="image/*" data-portfolio-image="${i}" />
            </label>
            <span class="admin-hint">Leave empty to keep the default placeholder graphic.</span>
          </div>
        </div>

        <div class="admin-field-row">
          <div class="admin-field"><label>Title</label><input type="text" data-p-field="title" data-p-index="${i}" value="${p.title.replace(/"/g, '&quot;')}" /></div>
          <div class="admin-field">
            <label>Category</label>
            <select data-p-field="category" data-p-index="${i}">
              <option value="design" ${p.category === 'design' ? 'selected' : ''}>Store Design &amp; Development</option>
              <option value="ads" ${p.category === 'ads' ? 'selected' : ''}>Ads &amp; Growth Campaigns</option>
              <option value="seo" ${p.category === 'seo' ? 'selected' : ''}>SEO &amp; Conversion Projects</option>
            </select>
          </div>
        </div>

        <div class="admin-field"><label>Short Description (shown on card)</label><input type="text" data-p-field="shortDesc" data-p-index="${i}" value="${p.shortDesc.replace(/"/g, '&quot;')}" /></div>
        <div class="admin-field"><label>Full Description (shown in lightbox)</label><textarea data-p-field="desc" data-p-index="${i}">${p.desc}</textarea></div>
        <div class="admin-field"><label>Tags (separate with ·)</label><input type="text" data-p-field="tags" data-p-index="${i}" value="${p.tags.replace(/"/g, '&quot;')}" /></div>

        <div class="admin-field-row">
          <div class="admin-field">
            <label>Placeholder Icon</label>
            <select data-p-field="icon" data-p-index="${i}">${iconOptionsHTML(p.icon)}</select>
          </div>
          <div class="admin-field">
            <label>Show on Home Page as Featured</label>
            <select data-p-field="featured" data-p-index="${i}">
              <option value="true" ${p.featured ? 'selected' : ''}>Yes</option>
              <option value="false" ${!p.featured ? 'selected' : ''}>No</option>
            </select>
          </div>
        </div>

        <div class="admin-actions-row">
          <button class="admin-btn admin-btn-primary admin-btn-sm" data-save-portfolio="${i}">Save This Project</button>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-save-portfolio]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.savePortfolio, 10);
        const p = data.portfolio[i];
        wrap.querySelectorAll(`[data-p-index="${i}"]`).forEach(input => {
          const field = input.dataset.pField;
          if (field === 'featured') p.featured = input.value === 'true';
          else p[field] = input.value;
        });
        p.catLabel = p.category === 'design' ? 'Store Design & Development' : p.category === 'ads' ? 'Ads & Growth Campaigns' : 'SEO & Conversion Projects';
        p.catPill = p.category === 'design' ? 'Store Design' : p.category === 'ads' ? 'Ads & Growth' : 'SEO & Conversion';
        persist();
      });
    });

    wrap.querySelectorAll('[data-delete-portfolio]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Remove this project? This cannot be undone.')) return;
        const i = parseInt(btn.dataset.deletePortfolio, 10);
        data.portfolio.splice(i, 1);
        persist();
        renderPortfolioList();
      });
    });

    wrap.querySelectorAll('[data-portfolio-image]').forEach(input => {
      input.addEventListener('change', (e) => {
        const i = parseInt(input.dataset.portfolioImage, 10);
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type || !file.type.startsWith('image/')) {
          showToast('Please choose an image file (JPG, PNG, etc).', true);
          input.value = '';
          return;
        }

        showToast('Uploading thumbnail…');

        compressImageFile(file, 1000, 0.82)
          .then((dataUrl) => {
            data.portfolio[i].image = dataUrl;
            const ok = persist();
            if (ok) {
              renderPortfolioList();
              showToast('Project thumbnail updated — now live.');
            }
            // on failure, persist() already showed a clear error toast
          })
          .catch((err) => {
            console.error('Thumbnail upload failed:', err);
            showToast(err.message || "Couldn't process that image — please try a different file.", true);
          })
          .finally(() => {
            input.value = ''; // allow re-selecting the same file to retry
          });
      });
    });
  }

  document.getElementById('addPortfolioBtn').addEventListener('click', () => {
    data.portfolio.push({
      id: uid('prj'), category: 'design', catLabel: 'Store Design & Development', catPill: 'Store Design',
      icon: 'store', mock: 'mock-sneekars-full', image: null,
      title: 'New Project', desc: 'Describe this project in detail here.', shortDesc: 'One-line summary of this project.',
      tags: 'Shopify · Store Design', featured: false
    });
    persist();
    renderPortfolioList();
  });

  /* =========================================================
     SERVICES (CRUD)
     ========================================================= */

  function renderServicesList() {
    const wrap = document.getElementById('servicesList');
    wrap.innerHTML = data.services.map((s, i) => `
      <div class="item-card">
        <div class="item-card-head">
          <span class="item-card-tag">Service ${i + 1}</span>
          <button class="item-card-delete" data-delete-service="${i}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            Remove
          </button>
        </div>
        <div class="admin-field-row">
          <div class="admin-field"><label>Title</label><input type="text" data-s-field="title" data-s-index="${i}" value="${s.title.replace(/"/g, '&quot;')}" /></div>
          <div class="admin-field"><label>Badge Label</label><input type="text" data-s-field="badge" data-s-index="${i}" value="${s.badge.replace(/"/g, '&quot;')}" /></div>
        </div>
        <div class="admin-field"><label>Description</label><textarea data-s-field="desc" data-s-index="${i}">${s.desc}</textarea></div>
        <div class="admin-field-row">
          <div class="admin-field"><label>Starting Price ($)</label><input type="text" data-s-field="price" data-s-index="${i}" value="${s.price}" /></div>
          <div class="admin-field"><label>Price Suffix (e.g. /mo)</label><input type="text" data-s-field="suffix" data-s-index="${i}" value="${s.suffix}" /></div>
        </div>
        <div class="admin-field">
          <label>Icon</label>
          <select data-s-field="icon" data-s-index="${i}">${iconOptionsHTML(s.icon)}</select>
        </div>
        <div class="admin-actions-row">
          <button class="admin-btn admin-btn-primary admin-btn-sm" data-save-service="${i}">Save This Service</button>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-save-service]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.saveService, 10);
        const s = data.services[i];
        wrap.querySelectorAll(`[data-s-index="${i}"]`).forEach(input => { s[input.dataset.sField] = input.value; });
        persist();
      });
    });

    wrap.querySelectorAll('[data-delete-service]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Remove this service? This cannot be undone.')) return;
        const i = parseInt(btn.dataset.deleteService, 10);
        data.services.splice(i, 1);
        persist();
        renderServicesList();
      });
    });
  }

  document.getElementById('addServiceBtn').addEventListener('click', () => {
    data.services.push({ id: uid('srv'), icon: 'store', badge: 'New', title: 'New Service', desc: 'Describe this service here.', price: '0', suffix: '' });
    persist();
    renderServicesList();
  });

  /* =========================================================
     AWARDS (CRUD)
     ========================================================= */

  function renderAwardsList() {
    const wrap = document.getElementById('awardsList');
    wrap.innerHTML = data.awards.map((a, i) => `
      <div class="item-card">
        <div class="item-card-head">
          <span class="item-card-tag">Achievement ${i + 1}</span>
          <button class="item-card-delete" data-delete-award="${i}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>
            Remove
          </button>
        </div>
        <div class="admin-field"><label>Title</label><input type="text" data-a-field="title" data-a-index="${i}" value="${a.title.replace(/"/g, '&quot;')}" /></div>
        <div class="admin-field-row">
          <div class="admin-field"><label>Date</label><input type="text" data-a-field="date" data-a-index="${i}" value="${a.date.replace(/"/g, '&quot;')}" /></div>
          <div class="admin-field"><label>Issued By</label><input type="text" data-a-field="issuer" data-a-index="${i}" value="${a.issuer.replace(/"/g, '&quot;')}" /></div>
        </div>
        <div class="admin-field"><label>Why It Matters</label><textarea data-a-field="desc" data-a-index="${i}">${a.desc}</textarea></div>
        <div class="admin-field">
          <label>Icon</label>
          <select data-a-field="icon" data-a-index="${i}">${iconOptionsHTML(a.icon)}</select>
        </div>
        <div class="admin-actions-row">
          <button class="admin-btn admin-btn-primary admin-btn-sm" data-save-award="${i}">Save This Achievement</button>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-save-award]').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.saveAward, 10);
        const a = data.awards[i];
        wrap.querySelectorAll(`[data-a-index="${i}"]`).forEach(input => { a[input.dataset.aField] = input.value; });
        persist();
      });
    });

    wrap.querySelectorAll('[data-delete-award]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!confirm('Remove this achievement? This cannot be undone.')) return;
        const i = parseInt(btn.dataset.deleteAward, 10);
        data.awards.splice(i, 1);
        persist();
        renderAwardsList();
      });
    });
  }

  document.getElementById('addAwardBtn').addEventListener('click', () => {
    data.awards.push({ id: uid('awd'), icon: 'medal', date: '2026', issuer: 'Issuer Name', title: 'New Achievement', desc: 'Describe this achievement here.' });
    persist();
    renderAwardsList();
  });

  /* =========================================================
     ABOUT PAGE
     ========================================================= */

  function loadAboutForm() {
    setVal('f_about_header_eyebrow', data.text.about_header_eyebrow);
    setVal('f_about_header_heading', data.text.about_header_heading);
    setVal('f_about_header_sub', data.text.about_header_sub);
    setVal('f_about_p1', data.text.about_p1);
    setVal('f_about_p2', data.text.about_p2);
    setVal('f_about_p3', data.text.about_p3);
    setVal('f_about_mission', data.text.about_mission);
    setVal('f_fact_location', data.text.fact_location);
    setVal('f_fact_specialty', data.text.fact_specialty);
    setVal('f_fact_jss', data.text.fact_jss);
    setVal('f_fact_status', data.text.fact_status);
    setVal('f_fact_projects', data.text.fact_projects);
    setVal('f_fact_result', data.text.fact_result);

    const tWrap = document.getElementById('timelineFields');
    tWrap.innerHTML = data.timeline.map((t, i) => `
      <div class="item-card">
        <div class="item-card-head"><span class="item-card-tag">Milestone ${i + 1}</span></div>
        <div class="admin-field-row">
          <div class="admin-field"><label>Date</label><input type="text" data-t-field="date" data-t-index="${i}" value="${t.date}" /></div>
          <div class="admin-field"><label>Title</label><input type="text" data-t-field="title" data-t-index="${i}" value="${t.title.replace(/"/g, '&quot;')}" /></div>
        </div>
        <div class="admin-field"><label>Description</label><textarea data-t-field="desc" data-t-index="${i}">${t.desc}</textarea></div>
      </div>
    `).join('');

    const skWrap = document.getElementById('skillsFields');
    skWrap.innerHTML = data.skills.map((sk, i) => `
      <div class="admin-field-row" style="align-items:end; margin-bottom:14px;">
        <div class="admin-field" style="margin-bottom:0;"><label>Skill Name</label><input type="text" data-sk-field="name" data-sk-index="${i}" value="${sk.name.replace(/"/g, '&quot;')}" /></div>
        <div class="admin-field" style="margin-bottom:0;"><label>Percent (0–100)</label><input type="number" min="0" max="100" data-sk-field="percent" data-sk-index="${i}" value="${sk.percent}" /></div>
      </div>
    `).join('');
  }

  document.querySelector('[data-save="about-header"]').addEventListener('click', () => {
    data.text.about_header_eyebrow = val('f_about_header_eyebrow');
    data.text.about_header_heading = val('f_about_header_heading');
    data.text.about_header_sub = val('f_about_header_sub');
    persist();
  });

  document.querySelector('[data-save="about-story"]').addEventListener('click', () => {
    data.text.about_p1 = val('f_about_p1');
    data.text.about_p2 = val('f_about_p2');
    data.text.about_p3 = val('f_about_p3');
    data.text.about_mission = val('f_about_mission');
    persist();
  });

  document.querySelector('[data-save="about-facts"]').addEventListener('click', () => {
    data.text.fact_location = val('f_fact_location');
    data.text.fact_specialty = val('f_fact_specialty');
    data.text.fact_jss = val('f_fact_jss');
    data.text.fact_status = val('f_fact_status');
    data.text.fact_projects = val('f_fact_projects');
    data.text.fact_result = val('f_fact_result');
    persist();
  });

  document.querySelector('[data-save="about-timeline"]').addEventListener('click', () => {
    document.querySelectorAll('#timelineFields [data-t-index]').forEach(input => {
      const i = parseInt(input.dataset.tIndex, 10);
      data.timeline[i][input.dataset.tField] = input.value;
    });
    persist();
  });

  document.querySelector('[data-save="about-skills"]').addEventListener('click', () => {
    document.querySelectorAll('#skillsFields [data-sk-index]').forEach(input => {
      const i = parseInt(input.dataset.skIndex, 10);
      const field = input.dataset.skField;
      data.skills[i][field] = field === 'percent' ? Math.max(0, Math.min(100, parseInt(input.value, 10) || 0)) : input.value;
    });
    persist();
  });

  /* =========================================================
     CONTACT
     ========================================================= */

  function loadContactForm() {
    setVal('f_contact_email', data.contact.email);
    setVal('f_contact_location', data.contact.location);
    setVal('f_contact_whatsapp_display', data.contact.whatsappDisplay);
    setVal('f_contact_whatsapp_link', data.contact.whatsappLink);
    setVal('f_contact_upwork', data.contact.upwork);
    setVal('f_contact_instagram', data.contact.instagram);
    setVal('f_contact_linkedin', data.contact.linkedin);
    setVal('f_contact_header_eyebrow', data.text.contact_header_eyebrow);
    setVal('f_contact_header_heading', data.text.contact_header_heading);
    setVal('f_contact_header_sub', data.text.contact_header_sub);
    setVal('f_contact_form_intro', data.text.contact_form_intro);
  }

  document.querySelector('[data-save="contact-details"]').addEventListener('click', () => {
    data.contact.email = val('f_contact_email');
    data.contact.location = val('f_contact_location');
    data.contact.whatsappDisplay = val('f_contact_whatsapp_display');
    data.contact.whatsappLink = val('f_contact_whatsapp_link');
    persist();
  });

  document.querySelector('[data-save="contact-socials"]').addEventListener('click', () => {
    data.contact.upwork = val('f_contact_upwork');
    data.contact.instagram = val('f_contact_instagram');
    data.contact.linkedin = val('f_contact_linkedin');
    persist();
  });

  document.querySelector('[data-save="contact-text"]').addEventListener('click', () => {
    data.text.contact_header_eyebrow = val('f_contact_header_eyebrow');
    data.text.contact_header_heading = val('f_contact_header_heading');
    data.text.contact_header_sub = val('f_contact_header_sub');
    data.text.contact_form_intro = val('f_contact_form_intro');
    persist();
  });

  /* =========================================================
     THEME SWITCHER
     ========================================================= */

  const THEME_SWATCHES = {
    'charcoal-olive': ['#1B1D16', '#5E8E3E', '#8FBF5F'],
    'midnight-forest': ['#0F1A17', '#2E8B6E', '#5FD1A8'],
    'slate-gold': ['#1A1A1C', '#C79A3A', '#E8C468'],
    'deep-emerald': ['#0D1712', '#1FA05C', '#4FD98A']
  };

  function renderThemeGrid() {
    const grid = document.getElementById('themeGrid');
    grid.innerHTML = THEMES.map(t => {
      const colors = THEME_SWATCHES[t.id];
      return `
        <div class="theme-card ${data.theme === t.id ? 'selected' : ''}" data-theme-option="${t.id}">
          <div class="theme-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></div>
          <div class="theme-swatch" style="background:${colors[0]};">
            <span class="theme-dot" style="background:${colors[1]};"></span>
            <span class="theme-dot" style="background:${colors[2]};"></span>
          </div>
          <div class="theme-card-name">${t.name}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-theme-option]').forEach(card => {
      card.addEventListener('click', () => {
        data.theme = card.dataset.themeOption;
        document.documentElement.setAttribute('data-theme', data.theme);
        persist();
        renderThemeGrid();
        showToast('Theme updated — live across every page now.');
      });
    });
  }

  /* =========================================================
     ACCOUNT / SECURITY
     ========================================================= */

  document.getElementById('changeCredsBtn').addEventListener('click', () => {
    const newUser = val('f_new_username').trim();
    const newPass = val('f_new_password');
    const confirmPass = val('f_confirm_password');
    const errorEl = document.getElementById('credsError');

    if (!newUser || !newPass) {
      errorEl.textContent = 'Please fill in both a username and a new password.';
      errorEl.style.display = 'block';
      return;
    }
    if (newPass !== confirmPass) {
      errorEl.textContent = "Passwords don't match — please re-enter.";
      errorEl.style.display = 'block';
      return;
    }
    errorEl.style.display = 'none';
    saveAdminCreds({ username: newUser, password: newPass });
    setVal('f_new_username', '');
    setVal('f_new_password', '');
    setVal('f_confirm_password', '');
    showToast('Login credentials updated. Use them next time you log in.');
  });

  document.getElementById('resetAllBtn').addEventListener('click', () => {
    if (!confirm('This will erase all your edits and restore the original demo content. Continue?')) return;
    resetSiteData();
    data = getSiteData();
    loadHomeForm();
    loadAboutForm();
    loadContactForm();
    renderPortfolioList();
    renderServicesList();
    renderAwardsList();
    renderThemeGrid();
    refreshOverview();
    showToast('All content reset to defaults.');
  });

  /* ---------- Init ---------- */
  loadHomeForm();
  loadAboutForm();
  loadContactForm();
  renderPortfolioList();
  renderServicesList();
  renderAwardsList();
  renderThemeGrid();
  refreshOverview();

})();
