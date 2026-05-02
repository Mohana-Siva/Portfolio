import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function SkillsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);

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

  const [hasRevealed, setHasRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setHasRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setHasRevealed(true);
          io.disconnect();
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
    );

    io.observe(root);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="skills-section app-section section-glass scroll-reveal scroll-reveal--soft" id="Skills">
      <div className="container px-4">
        <h2 className="section-heading">Skills</h2>

        <div className="skills-grid" aria-label="Skills">
          {skills.map((item, index) => (
            <div
              key={item.label}
              className={`skills-card skills-card--reveal${hasRevealed ? ' skills-card--visible' : ''}`}
              style={{ transitionDelay: hasRevealed ? `${index * 90}ms` : '0ms' }}
            >
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
