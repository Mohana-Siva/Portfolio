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
            <h2 className="hero__role reveal">SOFTWARE DEVELOPER</h2>

            <div className="hero__actions reveal">
              <a
                className="hero__btn"
                id="resume"
                href="https://drive.google.com/file/d/10kICZ3Jad20Zsm2Mhbh3jl7zH483qakx/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                RESUME
              </a>
            </div>

            <div className="hero-social reveal">
              <a href="https://leetcode.com/u/Mohana_S08/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/leetcode.svg" alt="" width="22" height="22" />
              </a>
              <a href="https://github.com/Mohana-Siva" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt=""
                  width="22"
                  height="22"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/mohana-sivakolundu-07745931b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/linkedin.svg" alt="" width="22" height="22" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

