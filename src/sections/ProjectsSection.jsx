import { useEffect, useRef } from 'react';

export default function ProjectsSection() {
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const projects = [
    {
      title: 'Career Guidance Platform',
      image: '/imgs/career.jpg',
      alt: 'Career Guidance Platform',
      description:
        'Full-stack career guidance web app for students in India with an AI chatbot, Nala. For college cutoff and choice-list queries, it fetches and processes MongoDB data directly. For broader career questions, it uses a RAG pipeline with Nomic embeddings, Pinecone retrieval, and LLaMA 3.1 via Groq for reliable responses.',
      href: ' https://career-counseling-app.netlify.app',
      tech: ['MERN', 'Pinecone', 'Groq AI'],
    },
    {
      title: 'E-commerce Platform',
      image: '/imgs/collage.jpg',
      alt: 'Plastic Recycling E-commerce Platform',
      description:
        'Developed an e-commerce platform for a plastic recycling company with role-based access for admin, customer, and employee. Admin manages products, orders, and analytics. Customers browse, purchase, and receive updates. Employees use an AR-based learning system for machine guidance, improving training efficiency and operational productivity.',
      href: 'https://sri-sai-traders.vercel.app/',
      tech: ['MERN', 'AR', 'Razor Pay'],
    },
    {
      title: 'Railway Reservation System',
      image: '/imgs/rail.jpg',
      alt: 'Railway Reservation System',
      description:
        'Developed a full stack Railway Ticket Booking System that allows users to search trains, check availability, book tickets, and generate PDF receipts with QR codes. Implemented secure login, dynamic seat allocation, and database integration using Flask and MySQL, with a responsive frontend built using HTML, CSS, and JavaScript.',
      href: 'https://github.com/Mohana-Siva/Railway-Reservation-System',
      tech: ['React', 'Node.js', 'QR/PDF'],
    },
    {
      title: 'Electric Bill Generator',
      image: '/imgs/ele.jpg',
      alt: 'Electric Bill Generator',
      description:
        'Developed an Electricity Bill Generator using Spring Boot that calculates bills based on unit consumption and tariff rates. Implemented user input handling, automated bill computation, and data storage with database integration. Designed a simple interface to generate and display accurate bills efficiently for users and administrators.',
      href: 'https://github.com/Mohana-Siva/Electric-Bill-Generator-SprinBoot-Mongo-DB-',
      tech: ['Spring Boot', 'MongoDB', 'Java'],
    },
    {
      title: 'Duolingo-Inspired UI/UX Redesign',
      image: '/imgs/duolingo.png',
      alt: 'Duolingo-Inspired UI/UX Redesign',
      description:
        'Designed a UI/UX mockup inspired by Duolingo with enhanced features to improve user engagement and learning efficiency. Focused on personalized learning paths, improved progress tracking, and richer gamification. Created wireframes and prototypes in Figma, emphasizing intuitive navigation, accessibility, and a user-centered experience.',
      href: 'https://www.figma.com/design/x5J7xyB4R6rlytjB6iIDw3/Untitled?t=JhhMQ0TnjRIMhjVv-0',
      tech: ['Redesign', 'UI', 'UX'],
    },
    {
      title: 'Gardenize',
      image: '/imgs/gar.jpg',
      alt: 'Gardenize',
      description:
        'Designed a UI/UX prototype for Gardenize, a gardening app that helps users plan, organize, and design their gardens. The app enables users to track plants, purchase gardening utilities, and engage with a community for tips, ideas, and inspiration, enhancing both gardening efficiency and user experience.',
      href: 'https://www.figma.com/design/BbxunhwjcrpmwelEjXg522/Gardenize---High-Fidelity?node-id=0-1&p=f&t=e9jYMfIBPelxONGm-0',
      tech: ['Figma', 'UI/UX', 'Prototype'],
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
          pause: 'hover',
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

      let intervalId = null;
      const startAutoplay = () => {
        if (intervalId !== null) return;
        intervalId = window.setInterval(() => {
          const next = (activeIndex + 1) % items.length;
          setActive(next);
        }, 4200);
      };

      const stopAutoplay = () => {
        if (intervalId === null) return;
        window.clearInterval(intervalId);
        intervalId = null;
      };

      root.addEventListener('mouseenter', stopAutoplay);
      root.addEventListener('mouseleave', startAutoplay);
      startAutoplay();

      return () => {
        stopAutoplay();
        root.removeEventListener('mouseenter', stopAutoplay);
        root.removeEventListener('mouseleave', startAutoplay);
      };
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
          data-bs-pause="hover"
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
          data-bs-pause="hover"
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
