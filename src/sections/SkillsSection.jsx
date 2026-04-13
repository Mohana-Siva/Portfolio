import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const getLayoutForWidth = (width) => {
  const columns = width >= 1200 ? 5 : width >= 992 ? 4 : width >= 768 ? 3 : 2;
  const rows = width < 576 ? 3 : 2;
  return { columns, rows };
};

const chunkWithPadding = (items, size) => {
  if (size <= 0) return [];
  const pages = [];
  for (let i = 0; i < items.length; i += size) {
    const page = items.slice(i, i + size);
    while (page.length < size) page.push(null);
    pages.push(page);
  }
  return pages;
};

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRef = useRef(null);
  const [layout, setLayout] = useState(() =>
    typeof window === 'undefined' ? { columns: 5, rows: 2 } : getLayoutForWidth(window.innerWidth)
  );
  const [pageIndex, setPageIndex] = useState(0);
  const pauseRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const skills = useMemo(() => {
    const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}`;
    const simpleIcon = (name) => `https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/${name}.svg`;
    const feather = (name) => `https://cdn.jsdelivr.net/gh/feathericons/feather/icons/${name}.svg`;

    return [
      { label: 'C', icon: devicon('c/c-original.svg') },
      { label: 'C++', icon: devicon('cplusplus/cplusplus-original.svg') },
      { label: 'Java', icon: devicon('java/java-original.svg') },
      { label: 'Python', icon: devicon('python/python-original.svg') },
      { label: 'JavaScript', icon: devicon('javascript/javascript-original.svg') },
      { label: 'SQL', icon: devicon('mysql/mysql-original.svg') },
      { label: 'HTML', icon: devicon('html5/html5-original.svg') },
      { label: 'CSS', icon: devicon('css3/css3-original.svg') },
      { label: 'React', icon: devicon('react/react-original.svg') },
      { label: 'Bootstrap', icon: devicon('bootstrap/bootstrap-original.svg') },
      { label: 'Node.js', icon: devicon('nodejs/nodejs-original.svg') },
      { label: 'Express.js', icon: simpleIcon('express'), mono: true },
      { label: 'Git', icon: devicon('git/git-original.svg') },
      { label: 'GitHub', icon: simpleIcon('github'), mono: true },
      { label: 'VS Code', icon: devicon('vscode/vscode-original.svg') },
      { label: 'Figma', icon: devicon('figma/figma-original.svg') },
      { label: 'Framer', icon: simpleIcon('framer'), mono: true },
      { label: 'Postman', icon: devicon('postman/postman-original.svg') },
      { label: 'MySQL', icon: devicon('mysql/mysql-original.svg') },
      { label: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
      { label: 'Render', icon: simpleIcon('render'), mono: true },
      { label: 'Vercel', icon: simpleIcon('vercel'), mono: true },
      { label: 'RAG model', icon: feather('layers'), mono: true },
      { label: 'API Integration', icon: feather('link'), mono: true },
      { label: 'ML concepts', icon: feather('trending-up'), mono: true },
    ];
  }, []);

  const itemsPerPage = Math.max(2, layout.columns * layout.rows);
  const pages = useMemo(() => chunkWithPadding(skills, itemsPerPage), [skills, itemsPerPage]);
  const pageCount = pages.length;

  const pauseAutoScroll = (ms = 2000) => {
    pauseRef.current = true;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      pauseRef.current = false;
      resumeTimeoutRef.current = null;
    }, ms);
  };

  const goToPage = (next) => {
    if (pageCount <= 1) return;
    const resolved = (next + pageCount) % pageCount;
    setPageIndex(resolved);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setLayout(getLayoutForWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (pageCount <= 1) return;

    const interval = window.setInterval(() => {
      if (pauseRef.current) return;
      goToPage(pageIndex + 1);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, pageCount, pageIndex]);

  useEffect(() => {
    if (pageIndex <= pageCount - 1) return;
    setPageIndex(0);
  }, [pageIndex, pageCount]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const els = [root, ...Array.from(root.querySelectorAll('.scroll-reveal'))];

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

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

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [prefersReducedMotion, skills.length]);

  return (
    <section
      ref={sectionRef}
      className="skills-section section-glass scroll-reveal scroll-reveal--soft"
      id="Skills"
      onMouseEnter={() => {
        pauseRef.current = true;
      }}
      onMouseLeave={() => {
        pauseRef.current = false;
      }}
      onFocusCapture={() => pauseAutoScroll(8000)}
      onPointerDown={() => pauseAutoScroll(8000)}
    >
      <div className="container px-4">
        <div className="skills-top">
          <h2 className="skills-heading">SKILLS</h2>
        </div>

        <div className="skills-carousel" aria-roledescription="carousel" aria-label="Skills carousel">
          <div
            className="skills-track"
            style={{
              transform: `translateX(-${pageIndex * 100}%)`,
              transition: prefersReducedMotion ? 'none' : undefined,
            }}
          >
            {pages.map((page, pageIdx) => (
              <div
                key={`skills-page-${pageIdx}`}
                className="skills-page"
                aria-hidden={pageIdx !== pageIndex}
              >
                <div className="skills-cards" aria-label={`Skills page ${pageIdx + 1}`}>
                  {page.map((item, i) => {
                    if (!item) return <div key={`skills-pad-${pageIdx}-${i}`} className="skills-card skills-card--placeholder" aria-hidden="true" />;

                    return (
                      <div key={item.label} className="skills-card">
                        <img
                          className={`skills-card__icon${item.mono ? ' skills-card__icon--mono' : ''}`}
                          src={item.icon}
                          alt={item.label}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="skills-card__label">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {pageCount > 1 ? (
          <div className="skills-dots" aria-label="Skills pages">
            {pages.map((_, i) => (
              <button
                key={`skills-dot-${i}`}
                type="button"
                className={`skills-dot${i === pageIndex ? ' skills-dot--active' : ''}`}
                onClick={() => goToPage(i)}
                aria-label={`Go to skills page ${i + 1}`}
                aria-pressed={i === pageIndex}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
