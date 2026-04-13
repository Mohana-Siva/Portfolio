import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const sectionRef = useRef(null);
  const indexRef = useRef(0);
  const pauseRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const categories = useMemo(() => {
    const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}`;
    const simpleIcon = (name) => `https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/${name}.svg`;
    const feather = (name) => `https://cdn.jsdelivr.net/gh/feathericons/feather/icons/${name}.svg`;

    return [
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
        title: 'WEB DEVELOPMENT',
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
        title: 'DATABASE',
        items: [
          { label: 'MySQL', icon: devicon('mysql/mysql-original.svg') },
          { label: 'MongoDB', icon: devicon('mongodb/mongodb-original.svg') },
          
        ],
      },
      {
        title: 'DEPLOYMENT',
        items: [
          { label: 'Render', icon: simpleIcon('render'), mono: true },
          { label: 'Vercel', icon: simpleIcon('vercel'), mono: true },
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
  }, []);

  const category = categories[index] ?? categories[0];

  const pauseAutoScroll = (ms = 2000) => {
    pauseRef.current = true;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      pauseRef.current = false;
      resumeTimeoutRef.current = null;
    }, ms);
  };

  const animateTo = (resolved) => {
    if (prefersReducedMotion) {
      setIndex(resolved);
      return;
    }

    setIsSwitching(true);
    window.setTimeout(() => {
      setIndex(resolved);
      setIsSwitching(false);
    }, 160);
  };

  const switchTo = (nextIndex) => {
    const resolved = (nextIndex + categories.length) % categories.length;
    animateTo(resolved);
  };

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      if (pauseRef.current) return;
      switchTo(indexRef.current + 1);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, categories.length]);

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
  }, [prefersReducedMotion, category.title]);

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

          <div className="skills-controls" aria-label="Skills category selector">
            <div className="skills-pill" id="skillsCategory">
              {category.title}
            </div>
          </div>

          <div className="skills-dots" aria-label="Skills categories">
            {categories.map((c, i) => (
              <button
                key={c.title}
                type="button"
                className={`skills-dot${i === index ? ' skills-dot--active' : ''}`}
                onClick={() => {
                  pauseAutoScroll(9000);
                  switchTo(i);
                }}
                aria-label={c.title}
                aria-pressed={i === index}
              />
            ))}
          </div>
        </div>

        <div className={`skills-cards${isSwitching ? ' skills-cards--switching' : ''}`} id="skillsCards" aria-label={`${category.title} skills`}>
          {category.items.map((item, i) => (
            <div key={item.label} className="skills-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: `${i * 70}ms` }}>
              <img
                className={`skills-card__icon${item.mono ? ' skills-card__icon--mono' : ''}`}
                src={item.icon}
                alt={item.label}
                loading="lazy"
                decoding="async"
              />
              <span className="skills-card__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
