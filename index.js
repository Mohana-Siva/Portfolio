function handleSubmit(event) {
  event.preventDefault();
  document.getElementById('popup').classList.add('active');
  event.target.reset();
}

function closePopup() {
  document.getElementById('popup').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.custom-navbar');
  const collapseEl = document.getElementById('navbarTogglerDemo02');
  const navLinks = Array.from(document.querySelectorAll('.custom-navbar .nav-link[href^="#"]'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const getNavbarOffset = () => Math.ceil(navbar?.getBoundingClientRect().height || 0) + 10;

  let isProgrammaticScroll = false;
  let programmaticTargetId = '';
  let programmaticTargetY = 0;
  let programmaticUntil = 0;

  function setNavbarState() {
    if (!navbar) return;
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 10);
  }

  function setActiveById(id) {
    navLinks.forEach((a) => a.classList.remove('active'));
    const active = navLinks.find((a) => a.getAttribute('href') === `#${id}`);
    if (active) active.classList.add('active');
  }

  function updateActiveFromScroll() {
    if (!sections.length) return;
    const offset = getNavbarOffset();
    const probeY = offset + 8;

    let current = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= probeY && rect.bottom > probeY;
    });

    if (!current) {
      current = sections
        .map((section) => ({ section, top: Math.abs(section.getBoundingClientRect().top - probeY) }))
        .sort((a, b) => a.top - b.top)[0]?.section;
    }

    if (current?.id) setActiveById(current.id);
  }

  setNavbarState();

  const initialId = decodeURIComponent((window.location.hash || '').replace('#', ''));
  if (initialId) setActiveById(initialId);
  updateActiveFromScroll();

  window.addEventListener(
    'scroll',
    () => {
      setNavbarState();

      if (isProgrammaticScroll) {
        if (programmaticTargetId) setActiveById(programmaticTargetId);
        const reached = Math.abs(window.scrollY - programmaticTargetY) < 2;
        if (reached || Date.now() > programmaticUntil) {
          isProgrammaticScroll = false;
          programmaticTargetId = '';
          updateActiveFromScroll();
        }
        return;
      }

      updateActiveFromScroll();
    },
    { passive: true }
  );

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        const offset = getNavbarOffset();
        const y = window.scrollY + target.getBoundingClientRect().top - offset;

        isProgrammaticScroll = true;
        programmaticTargetId = target.id || '';
        programmaticTargetY = Math.max(0, Math.round(y));
        const distance = Math.abs(window.scrollY - programmaticTargetY);
        programmaticUntil = Date.now() + Math.min(1600, 350 + distance * 0.6);

        if (programmaticTargetId) setActiveById(programmaticTargetId);
        window.scrollTo({ top: programmaticTargetY, behavior: 'smooth' });
      }

      if (!collapseEl || !window.bootstrap?.Collapse) return;
      if (!collapseEl.classList.contains('show')) return;
      const instance =
        bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      instance.hide();
    });
  });

  function revealHeroContent() {
    const items = Array.from(document.querySelectorAll('#home .reveal'));
    if (!items.length) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      items.forEach((el) => el.classList.add('reveal-now'));
      return;
    }

    items.forEach((el, i) => {
      window.setTimeout(() => el.classList.add('reveal-in'), 140 * i);
    });
  }

  const typeEl = document.querySelector('.typewriter[data-text]');
  if (typeEl) {
    const fullText = typeEl.getAttribute('data-text') || typeEl.textContent || '';
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      typeEl.textContent = fullText;
      typeEl.classList.add('typewriter-done');
      revealHeroContent();
    } else {
      typeEl.textContent = '';
      let i = 0;
      const speedMs = 95;
      const startDelayMs = 250;

      setTimeout(() => {
        const timer = setInterval(() => {
          typeEl.textContent += fullText.charAt(i);
          i += 1;
          if (i >= fullText.length) {
            clearInterval(timer);
            typeEl.classList.add('typewriter-done');
            revealHeroContent();
          }
        }, speedMs);
      }, startDelayMs);
    }
  } else {
    revealHeroContent();
  }

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = Array.from(document.querySelectorAll('.scroll-reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    revealEls.forEach((el) => io.observe(el));
  }

});
