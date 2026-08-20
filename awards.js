// ==========================================================================
// HASSAN PORTFOLIO — awards.js
// Staggered scroll reveal for achievement cards
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.achievement-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });

  cards.forEach(card => observer.observe(card));

});
