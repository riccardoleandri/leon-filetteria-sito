/* ============================================
   LEON — JavaScript Principale
   Navbar, Loader, Smooth Scroll, Mobile Menu
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Loader iniziale --- */
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Rimuovi dal DOM dopo la transizione
      setTimeout(() => loader.remove(), 600);
    }, 1500);
  }

  /* --- Navbar shrink on scroll --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Stato iniziale
  }

  /* --- Mobile menu hamburger --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Chiudi menu al click su un link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Smooth anchor scroll con offset per navbar fixed --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* --- Form validation con feedback visivo --- */
  const form = document.querySelector('.prenota-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Valida campi required
      form.querySelectorAll('[required]').forEach(field => {
        const errorEl = field.nextElementSibling;
        if (!field.value.trim()) {
          field.classList.add('error');
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.style.display = 'block';
          }
          isValid = false;
        } else {
          field.classList.remove('error');
          if (errorEl && errorEl.classList.contains('form-error')) {
            errorEl.style.display = 'none';
          }
        }
      });

      // Valida telefono
      const tel = form.querySelector('input[type="tel"]');
      if (tel && tel.value.trim() && !/^[\d\s\+\-\.]{6,20}$/.test(tel.value.trim())) {
        tel.classList.add('error');
        isValid = false;
      }

      if (isValid) {
        showToast('Prenotazione inviata! Vi contatteremo presto.');
        form.reset();
      }
    });

    // Rimuovi errore al focus
    form.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('focus', () => {
        field.classList.remove('error');
        const errorEl = field.nextElementSibling;
        if (errorEl && errorEl.classList.contains('form-error')) {
          errorEl.style.display = 'none';
        }
      });
    });
  }

  /* --- Toast notification --- */
  function showToast(message) {
    // Rimuovi toast esistente
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);

    // Trigger animazione
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Rimuovi dopo 4 secondi
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* --- Card flip (pagina carni) --- */
  document.querySelectorAll('.carne-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

});
