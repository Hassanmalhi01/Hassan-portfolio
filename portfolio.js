// ==========================================================================
// HASSAN PORTFOLIO — portfolio.js
// Filter tabs, staggered card reveal, lightbox
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.getElementById('portfolioGrid');
  const emptyGrid = document.getElementById('emptyGrid');
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const tabs = document.querySelectorAll('.filter-tab');

  /* ---------- Staggered scroll reveal for cards ---------- */
  cards.forEach((card, i) => {
    card.style.transitionDelay = (i % 6) * 0.08 + 's';
  });

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(card => cardObserver.observe(card));

  /* ---------- Filter tabs ---------- */
  function applyFilter(filter) {
    let visibleCount = 0;

    cards.forEach((card, i) => {
      const matches = filter === 'all' || card.dataset.category === filter;

      if (matches) {
        visibleCount++;
        card.classList.remove('filtered-out');
        // restagger the fade-in for the new arrangement
        card.classList.remove('in-view');
        card.style.transitionDelay = (visibleCount - 1) * 0.08 + 's';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add('in-view'));
        });
      } else {
        card.classList.add('filtered-out');
      }
    });

    if (emptyGrid) {
      emptyGrid.style.display = visibleCount === 0 ? 'grid' : 'none';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilter(tab.dataset.filter);
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxTags = document.getElementById('lightboxTags');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(card) {
    const visualClass = card.querySelector('.project-thumb-visual').className
      .split(' ')
      .find(c => c.startsWith('mock-'));
    const iconHTML = card.querySelector('.project-thumb-icon').innerHTML;

    lightboxImage.className = 'lightbox-image ' + visualClass;
    lightboxImage.innerHTML = `<div class="project-thumb-icon" style="opacity:0.6;">${iconHTML}</div>`;

    lightboxCat.textContent = card.dataset.catLabel || card.querySelector('.project-cat-pill').textContent;
    lightboxTitle.textContent = card.dataset.title;
    lightboxDesc.textContent = card.dataset.desc;

    lightboxTags.innerHTML = '';
    (card.dataset.tags || '').split('·').forEach(tag => {
      const t = tag.trim();
      if (!t) return;
      const span = document.createElement('span');
      span.className = 'lightbox-tag';
      span.textContent = t;
      lightboxTags.appendChild(span);
    });

    lightbox.classList.add('open');
    document.body.classList.add('lightbox-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-locked');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

});
