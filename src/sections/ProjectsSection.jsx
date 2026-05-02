import { useEffect, useRef } from 'react';

export default function ProjectsSection() {
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const projects = [
    {
      title: 'Electric Bill Generator',
      image: '/imgs/ele.jpg',
      alt: 'Electric Bill Generator',
      description: 'Web-based system with Spring Boot to manage electricity usage and billing.',
      href: 'https://github.com/Mohana-Siva/Electric-Bill-Generator-SprinBoot-Mongo-DB-',
      tech: ['Spring Boot', 'MongoDB', 'Java'],
    },
    {
      title: 'Railway Reservation System',
      image: '/imgs/rail.jpg',
      alt: 'Railway Reservation System',
      description: 'Book tickets and generate QR-coded PDF receipts after train bookings.',
      href: 'https://github.com/Mohana-Siva/Railway-Reservation-System',
      tech: ['React', 'Node.js', 'QR/PDF'],
    },
    {
      title: 'ZIYA Ayurvedic Products',
      image: '/imgs/ayur.jpg',
      alt: 'ZIYA Ayurvedic Products',
      description: 'Platform to purchase Ayurvedic products with location-based services.',
      href: 'https://github.com/yourusername/weather-app',
      tech: ['React', 'Location API', 'Ecommerce'],
    },
    {
      title: 'Car Parking Website',
      image: '/imgs/par.jpg',
      alt: 'Car Parking Website',
      description: 'Online parking space reservation with slot viewing in React.',
      href: 'https://github.com/yourusername/blog-platform',
      tech: ['React', 'Booking Flow', 'UI'],
    },
    {
      title: 'Gardenize',
      image: '/imgs/gar.jpg',
      alt: 'Gardenize',
      description: 'Smart gardening assistant to track plant care and growth.',
      href: 'https://github.com/yourusername/expense-tracker',
      tech: ['Task Tracking', 'Reminders', 'Dashboard'],
    },
    {
      title: 'Organ Donation Website',
      image: '/imgs/org.webp',
      alt: 'Organ Donation Website',
      description: 'Connects donors, recipients, and institutions for smoother process.',
      href: 'https://github.com/yourusername/quiz-app',
      tech: ['Web App', 'Workflow', 'Community'],
    },
  ];

  const desktopSlides = [];
  for (let i = 0; i < projects.length; i += 3) desktopSlides.push(projects.slice(i, i + 3));
  const mobileSlides = projects.map((item) => [item]);

  useEffect(() => {
    const setupCarousel = (root) => {
      if (!root) return () => {};

      // If Bootstrap JS is present, let it own behavior.
      if (window.bootstrap?.Carousel) {
        const instance = window.bootstrap.Carousel.getOrCreateInstance(root, {
          interval: 4200,
          pause: false,
          wrap: true,
          touch: true,
        });
        instance.cycle();
        return () => instance.pause();
      }

      // Fallback autoplay when Bootstrap JS is not loaded.
      const items = Array.from(root.querySelectorAll('.carousel-item'));
      const indicators = Array.from(root.querySelectorAll('.carousel-indicators [data-bs-slide-to]'));
      if (items.length <= 1) return () => {};

      let activeIndex = Math.max(0, items.findIndex((item) => item.classList.contains('active')));

      const setActive = (nextIndex) => {
        items[activeIndex]?.classList.remove('active');
        indicators[activeIndex]?.classList.remove('active');
        activeIndex = nextIndex;
        items[activeIndex]?.classList.add('active');
        indicators[activeIndex]?.classList.add('active');
      };

      const intervalId = window.setInterval(() => {
        const next = (activeIndex + 1) % items.length;
        setActive(next);
      }, 4200);

      return () => window.clearInterval(intervalId);
    };

    const cleanDesktop = setupCarousel(desktopCarouselRef.current);
    const cleanMobile = setupCarousel(mobileCarouselRef.current);
    return () => {
      cleanDesktop();
      cleanMobile();
    };
  }, []);

  return (
    <section id="project" className="pro-div app-section container-fluid section-glass scroll-reveal scroll-reveal--soft">
      <div className="container px-4">
        <h2 className="section-heading">Projects</h2>

        <div
          id="projectCarouselDesktop"
          ref={desktopCarouselRef}
          className="carousel slide d-none d-md-block"
          data-bs-ride="carousel"
          data-bs-interval="4200"
          data-bs-pause="false"
          data-bs-wrap="true"
          data-bs-touch="true"
        >
          <div className="carousel-inner">
            {desktopSlides.map((slide, slideIndex) => (
              <div key={slideIndex} className={`carousel-item${slideIndex === 0 ? ' active' : ''}`}>
                <div className="row justify-content-center">
                  {slide.map((project, index) => (
                    <div key={project.title} className="col-12 col-md-4 mb-4">
                      <article className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: `${index * 70}ms` }}>
                        <img src={project.image} className="project-img" alt={project.alt} />
                        <div className="project-body">
                          <h5>{project.title}</h5>
                          <p>{project.description}</p>

                          <div className="project-tech" aria-label="Technologies used">
                            {project.tech.map((item) => (
                              <span key={item} className="project-chip">{item}</span>
                            ))}
                          </div>

                          <a
                            href={project.href}
                            target="_blank"
                            className="btn btn-outline-light project-btn"
                            rel="noreferrer"
                          >
                            View Project
                          </a>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators mt-0">
            {desktopSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#projectCarouselDesktop"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div
          id="projectCarouselMobile"
          ref={mobileCarouselRef}
          className="carousel slide d-block d-md-none"
          data-bs-ride="carousel"
          data-bs-interval="4200"
          data-bs-pause="false"
          data-bs-wrap="true"
          data-bs-touch="true"
        >
          <div className="carousel-inner">
            {mobileSlides.map((slide, slideIndex) => (
              <div key={slideIndex} className={`carousel-item${slideIndex === 0 ? ' active' : ''}`}>
                <div className="row justify-content-center">
                  {slide.map((project, index) => (
                    <div key={project.title} className="col-12 col-md-4 mb-4">
                      <article className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: `${index * 70}ms` }}>
                        <img src={project.image} className="project-img" alt={project.alt} />
                        <div className="project-body">
                          <h5>{project.title}</h5>
                          <p>{project.description}</p>

                          <div className="project-tech" aria-label="Technologies used">
                            {project.tech.map((item) => (
                              <span key={item} className="project-chip">{item}</span>
                            ))}
                          </div>

                          <a
                            href={project.href}
                            target="_blank"
                            className="btn btn-outline-light project-btn"
                            rel="noreferrer"
                          >
                            View Project
                          </a>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators mt-0">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#projectCarouselMobile"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
