// ==========================================================================
// HASSAN PORTFOLIO — contact.js
// Demo form submission (no backend yet — Admin Panel will wire this up later)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      successBox.classList.add('show');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();

      setTimeout(() => successBox.classList.remove('show'), 7000);
    });
  }

});
