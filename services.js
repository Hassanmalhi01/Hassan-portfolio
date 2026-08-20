// ==========================================================================
// HASSAN PORTFOLIO — services.js
// Staggered scroll reveal for pricing cards
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.pricing-card');

  cards.forEach((card, i) => {
    card.style.transitionDelay = (i % 4) * 0.12 + 's';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(card => observer.observe(card));

});
