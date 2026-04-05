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

  function initSkillsCarousel() {
    const section = document.getElementById('Skills');
    if (!section) return;

    const pill = section.querySelector('#skillsCategory');
    const cards = section.querySelector('#skillsCards');
    const prevBtn = section.querySelector('[data-skills-prev]');
    const nextBtn = section.querySelector('[data-skills-next]');

    if (!pill || !cards || !prevBtn || !nextBtn) return;

    const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}`;
    const simpleIcon = (name) => `https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${name}.svg`;
    const feather = (name) => `https://cdn.jsdelivr.net/gh/feathericons/feather/icons/${name}.svg`;

    const categories = [
      {
        title: 'PROGRAMMING',
        items: [
          { label: 'C', icon: devicon('c/c-original.svg') },
          { label: 'C++', icon: devicon('cplusplus/cplusplus-original.svg') },
          { label: 'Java', icon: devicon('java/java-original.svg') },
          { label: 'Python', icon: devicon('python/python-original.svg') },
          { label: 'JavaScript', icon: devicon('javascript/javascript-original.svg') },
          { label: 'SQL', icon: devicon('mysql/mysql-original.svg') },
        ],
      },
      {
        title: 'FRONTEND / BACKEND',
        items: [
          { label: 'HTML', icon: devicon('html5/html5-original.svg') },
          { label: 'CSS', icon: devicon('css3/css3-original.svg') },
          { label: 'React', icon: devicon('react/react-original.svg') },
          { label: 'Bootstrap', icon: devicon('bootstrap/bootstrap-original.svg') },
          { label: 'Node.js', icon: devicon('nodejs/nodejs-original.svg') },
          { label: 'Express.js', icon: simpleIcon('express'), mono: true },
        ],
      },
      {
        title: 'DATABASE / DEPLOYMENT',
        items: [
          { label: 'MySQL', icon: devicon('mysql/mysql-original.svg') },
          { label: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
          { label: 'Render', icon: simpleIcon('render'), mono: true },
          { label: 'Vercel', icon: simpleIcon('vercel'), mono: true },
        ],
      },
      {
        title: 'TOOLS',
        items: [
          { label: 'Git', icon: devicon('git/git-original.svg') },
          { label: 'GitHub', icon: devicon('github/github-original.svg') },
          { label: 'VS Code', icon: devicon('vscode/vscode-original.svg') },
          { label: 'Figma', icon: devicon('figma/figma-original.svg') },
          { label: 'Framer', icon: simpleIcon('framer'), mono: true },
          { label: 'Postman', icon: devicon('postman/postman-original.svg') },
        ],
      },
      {
        title: 'AI',
        items: [
          { label: 'RAG model', icon: feather('layers'), mono: true },
          { label: 'API Integration', icon: feather('link'), mono: true },
          { label: 'ML concepts', icon: feather('trending-up'), mono: true },
        ],
      },
      {
        title: 'SOFT SKILLS',
        items: [
          { label: 'Time Management', icon: feather('clock'), mono: true },
          { label: 'Team Work', icon: feather('users'), mono: true },
          { label: 'Logical Thinking', icon: feather('zap'), mono: true },
        ],
      },
    ];

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;

    function render() {
      const category = categories[index];
      pill.textContent = category.title;
      cards.setAttribute('aria-label', `${category.title} skills`);

      const frag = document.createDocumentFragment();
      category.items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'skills-card';

        const img = document.createElement('img');
        img.className = `skills-card__icon${item.mono ? ' skills-card__icon--mono' : ''}`;
        img.src = item.icon;
        img.alt = item.label;
        img.loading = 'lazy';
        img.decoding = 'async';

        const label = document.createElement('span');
        label.className = 'skills-card__label';
        label.textContent = item.label;

        card.append(img, label);
        frag.append(card);
      });

      cards.replaceChildren(frag);
    }

    function switchTo(nextIndex) {
      index = (nextIndex + categories.length) % categories.length;
      if (prefersReduced) {
        render();
        return;
      }

      cards.classList.add('skills-cards--switching');
      window.setTimeout(() => {
        render();
        cards.classList.remove('skills-cards--switching');
      }, 160);
    }

    prevBtn.addEventListener('click', () => switchTo(index - 1));
    nextBtn.addEventListener('click', () => switchTo(index + 1));

    render();
  }

  initSkillsCarousel();

});
