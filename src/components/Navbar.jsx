import { useEffect, useMemo, useRef, useState } from 'react';

export default function Navbar({ sections }) {
  const navbarRef = useRef(null);
  const collapseRef = useRef(null);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');

  const programmatic = useRef({
    activeId: '',
    targetY: 0,
    until: 0,
    inProgress: false,
  });

  const sectionEls = useMemo(() => sections.map((s) => document.getElementById(s.id)).filter(Boolean), [sections]);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const getNavbarOffset = () => Math.ceil(navbar.getBoundingClientRect().height || 0) + 10;

    const setNavbarState = () => {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 10);
    };

    const updateActiveFromScroll = () => {
      if (!sectionEls.length) return;
      const offset = getNavbarOffset();
      const probeY = offset + 8;

      let current = sectionEls.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });

      if (!current) {
        current = sectionEls
          .map((section) => ({ section, top: Math.abs(section.getBoundingClientRect().top - probeY) }))
          .sort((a, b) => a.top - b.top)[0]?.section;
      }

      if (current?.id) setActiveSection(current.id);
    };

    setNavbarState();

    const initialId = decodeURIComponent((window.location.hash || '').replace('#', ''));
    if (initialId) setActiveSection(initialId);
    updateActiveFromScroll();

    const onScroll = () => {
      setNavbarState();

      if (programmatic.current.inProgress) {
        if (programmatic.current.activeId) setActiveSection(programmatic.current.activeId);

        const reached = Math.abs(window.scrollY - programmatic.current.targetY) < 2;
        if (reached || Date.now() > programmatic.current.until) {
          programmatic.current.inProgress = false;
          programmatic.current.activeId = '';
          updateActiveFromScroll();
        }
        return;
      }

      updateActiveFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionEls]);

  const hideMobileMenuIfOpen = () => {
    const collapseEl = collapseRef.current;
    if (!collapseEl || !window.bootstrap?.Collapse) return;
    if (!collapseEl.classList.contains('show')) return;

    const instance =
      window.bootstrap.Collapse.getInstance(collapseEl) || new window.bootstrap.Collapse(collapseEl, { toggle: false });
    instance.hide();
  };

  const handleNavClick = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    const navbar = navbarRef.current;
    const offset = navbar ? Math.ceil(navbar.getBoundingClientRect().height || 0) + 10 : 0;
    const y = window.scrollY + target.getBoundingClientRect().top - offset;

    programmatic.current.inProgress = true;
    programmatic.current.activeId = id;
    programmatic.current.targetY = Math.max(0, Math.round(y));

    const distance = Math.abs(window.scrollY - programmatic.current.targetY);
    programmatic.current.until = Date.now() + Math.min(1600, 350 + distance * 0.6);

    setActiveSection(id);
    window.scrollTo({ top: programmatic.current.targetY, behavior: 'smooth' });

    hideMobileMenuIfOpen();
  };

  return (
    <nav ref={navbarRef} className="navbar navbar-expand-lg custom-navbar navbar-dark">
      <div className="container px-4">
      

        <button
          className="navbar-toggler order-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div ref={collapseRef} className="collapse navbar-collapse justify-content-center order-3 order-lg-1" id="navbarTogglerDemo02">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {sections.map((s) => (
              <li key={s.id} className="nav-item">
                <a
                  className={`nav-link${activeSection === s.id ? ' active' : ''}`}
                  href={`#${s.id}`}
                  onClick={(e) => handleNavClick(e, s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://drive.google.com/file/d/10kICZ3Jad20Zsm2Mhbh3jl7zH483qakx/view?usp=drivesdk"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume-btn order-lg-2"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
