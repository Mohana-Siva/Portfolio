import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import SiteBackground from './components/SiteBackground.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import HeroSection from './sections/HeroSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import CertsSection from './sections/CertsSection.jsx';
import ConnectFab from './components/ConnectFab.jsx';

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = Array.from(document.querySelectorAll('.scroll-reveal'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
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

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const sections = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'Skills', label: 'SKILLS' },
    { id: 'project', label: 'PROJECTS' },
    { id: 'certs', label: 'CERTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <>
      <SiteBackground />
      <Navbar sections={sections} />
      <ConnectFab />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
      </main>
    </>
  );
}
