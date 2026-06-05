/* ============================================
   LEON — Filtro Menu Interattivo
   (mobile: filtra sezioni senza reload)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuSections = document.querySelectorAll('.menu-section');

  if (filterBtns.length === 0 || menuSections.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Aggiorna stato attivo bottoni
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostra/nascondi sezioni
      if (filter === 'all') {
        menuSections.forEach(section => {
          section.style.display = '';
        });
      } else {
        menuSections.forEach(section => {
          if (section.dataset.category === filter) {
            section.style.display = '';
          } else {
            section.style.display = 'none';
          }
        });
      }

      // Scrolla in alto alla prima sezione visibile
      const firstVisible = document.querySelector('.menu-section:not([style*="display: none"])');
      if (firstVisible) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const top = firstVisible.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
