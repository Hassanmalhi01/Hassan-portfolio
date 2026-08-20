// ==========================================================================
// HASSAN PORTFOLIO — about.js
// Timeline reveal + spine fill, animated skill bars
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Timeline item reveal ---------- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  timelineItems.forEach(item => timelineObserver.observe(item));

  /* ---------- Timeline spine fill (tracks scroll progress) ---------- */
  const wrap = document.getElementById('timelineWrap');
  const spineFill = document.getElementById('spineFill');

  if (wrap && spineFill) {
    let ticking = false;

    function updateSpine() {
      const rect = wrap.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.55;
      const progress = (viewportCenter - rect.top) / rect.height;
      const clamped = Math.max(0, Math.min(1, progress));
      spineFill.style.height = (clamped * 100) + '%';
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateSpine);
        ticking = true;
      }
    }, { passive: true });

    updateSpine();
  }

  /* ---------- Skill bars ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillNums = document.querySelectorAll('.skill-num');

  function animateSkillNumber(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillFills.forEach(fill => {
            fill.style.width = fill.dataset.target + '%';
          });
          skillNums.forEach(animateSkillNumber);
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
  }

});
