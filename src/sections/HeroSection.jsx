import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

export default function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);

  const fullText = "I'M MOHANA S,";
  const [typedText, setTypedText] = useState(prefersReducedMotion ? fullText : '');
  const [typewriterDone, setTypewriterDone] = useState(prefersReducedMotion);

  useEffect(() => {
    const revealHeroContent = () => {
      const root = sectionRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll('.reveal'));
      if (!items.length) return;

      if (prefersReducedMotion) {
        items.forEach((el) => el.classList.add('reveal-now'));
        return;
      }

      items.forEach((el, i) => window.setTimeout(() => el.classList.add('reveal-in'), 140 * i));
    };

    if (prefersReducedMotion) {
      setTypedText(fullText);
      setTypewriterDone(true);
      revealHeroContent();
      return;
    }

    setTypedText('');
    setTypewriterDone(false);

    let index = 0;
    const speedMs = 95;
    const startDelayMs = 250;
    let timer = null;

    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        index += 1;
        setTypedText(fullText.slice(0, index));
        if (index >= fullText.length) {
          if (timer) window.clearInterval(timer);
          setTypewriterDone(true);
          revealHeroContent();
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="home" className="main-div full-screen section-glass hero">
      <div className="container px-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-4 col-md-5 d-flex justify-content-center text-center img-animate">
            <div className="hero-photo-frame">
              <div className="hero-photo-flip" aria-hidden="true">
                <img src="/imgs/me.png" className="hero-photo hero-photo--front" alt="" />
                <img src="/imgs/me.png" className="hero-photo hero-photo--back" alt="" />
              </div>
              <span className="visually-hidden">Mohana portrait</span>
            </div>
          </div>

          <div className="col-lg-6 col-md-7 hero__content">
            <h1 className={`hero__title typewriter${typewriterDone ? ' typewriter-done' : ''}`} data-text={fullText}>
              {typedText}
            </h1>
            <h2 className="hero__role reveal">Software Developer</h2>

            <p className="hero__description reveal">
              I build full-stack web applications using the MERN stack, focusing on clean architecture and real-world
              usability, develop intelligent features by integrating APIs and AI/NLP models to solve practical user
              problems, and design scalable systems with secure authentication, efficient databases, and user-friendly
              interfaces.
            </p>

            <div className="hero__actions reveal">
            </div>

            <div className="hero-social reveal">
              <a href="https://leetcode.com/u/Mohana_S08/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <img src="https://cdn.simpleicons.org/leetcode/97d9e0" alt="LeetCode" />
              </a>
              <a href="https://github.com/Mohana-Siva" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src="https://cdn.simpleicons.org/github/97d9e0" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/mohana-sivakolundu-07745931b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#97d9e0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.225 0z" />
                </svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
                <img src="https://cdn.simpleicons.org/x/97d9e0" alt="X" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

