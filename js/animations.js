/* ============================================
   LEON — Animazioni: Counter, Parallax,
   Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Counter animation con Intersection Observer --- */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* --- Parallax leggero sull'hero (mouse move) --- */
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroBg = hero.querySelector('.hero-bg, .hero-bg-fallback');
    if (heroBg) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        heroBg.style.transform = `translate(${x * -15}px, ${y * -15}px) scale(1.05)`;
      });

      hero.addEventListener('mouseleave', () => {
        heroBg.style.transform = 'translate(0, 0) scale(1.05)';
        heroBg.style.transition = 'transform 0.5s ease';
        setTimeout(() => { heroBg.style.transition = ''; }, 500);
      });
    }
  }

  /* --- Generazione scintille/braci --- */
  const embersContainer = document.querySelector('.embers-container');
  if (embersContainer) {
    const emberCount = 25;
    for (let i = 0; i < emberCount; i++) {
      const ember = document.createElement('div');
      ember.className = 'ember';
      ember.style.left = Math.random() * 100 + '%';
      ember.style.setProperty('--duration', (4 + Math.random() * 6) + 's');
      ember.style.setProperty('--delay', (Math.random() * 5) + 's');
      ember.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      embersContainer.appendChild(ember);
    }
  }

  /* --- Sidebar menu: evidenzia sezione attiva (pagina menu) --- */
  const menuSections = document.querySelectorAll('.menu-section');
  const sidebarLinks = document.querySelectorAll('.menu-sidebar-nav a');

  if (menuSections.length > 0 && sidebarLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    menuSections.forEach(section => sectionObserver.observe(section));
  }

});
