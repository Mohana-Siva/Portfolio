export default function ProjectsSection() {
  return (
    <section id="project" className="pro-div container-fluid section-glass scroll-reveal scroll-reveal--soft">
      <div className="container py-5">
        <h2 className="text-center mb-4">My Projects</h2>

        <div id="projectCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '0ms' }}>
                    <img src="/imgs/ele.jpg" className="project-img" alt="Project 1" />
                    <div className="project-body">
                      <h5>Electric Bill Generator</h5>
                      <p>Web-based system with Spring Boot to manage electricity usage and billing.</p>
                      <a
                        href="https://github.com/Mohana-Siva/Electric-Bill-Generator-SprinBoot-Mongo-DB-"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '70ms' }}>
                    <img src="/imgs/rail.jpg" className="project-img" alt="Project 2" />
                    <div className="project-body">
                      <h5>Railway Reservation System</h5>
                      <p>Book tickets and generate QR-coded PDF receipts after train bookings.</p>
                      <a
                        href="https://github.com/Mohana-Siva/Railway-Reservation-System"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '140ms' }}>
                    <img src="/imgs/ayur.jpg" className="project-img" alt="Project 3" />
                    <div className="project-body">
                      <h5>ZIYA Ayurvedic Products</h5>
                      <p>Platform to purchase Ayurvedic products with location-based services.</p>
                      <a
                        href="https://github.com/yourusername/weather-app"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '0ms' }}>
                    <img src="/imgs/par.jpg" className="project-img" alt="Car Parking Website" />
                    <div className="project-body">
                      <h5>Car Parking Website</h5>
                      <p>Online parking space reservation with slot viewing in React.</p>
                      <a
                        href="https://github.com/yourusername/blog-platform"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '70ms' }}>
                    <img src="/imgs/gar.jpg" className="project-img" alt="Gardenize" />
                    <div className="project-body">
                      <h5>Gardenize</h5>
                      <p>Smart gardening assistant to track plant care and growth.</p>
                      <a
                        href="https://github.com/yourusername/expense-tracker"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="project-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '140ms' }}>
                    <img src="/imgs/org.webp" className="project-img" alt="Organ Donation Website" />
                    <div className="project-body">
                      <h5>Organ Donation Website</h5>
                      <p>Connects donors, recipients, and institutions for smoother process.</p>
                      <a
                        href="https://github.com/yourusername/quiz-app"
                        target="_blank"
                        className="btn btn-outline-light"
                        rel="noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-indicators mt-0">
            <button type="button" data-bs-target="#projectCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#projectCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#projectCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#projectCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
