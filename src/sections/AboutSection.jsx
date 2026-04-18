export default function AboutSection() {
  return (
    <section id="about" className="about-section section-glass scroll-reveal scroll-reveal--soft">
      <div className="container px-4">
        <h2 className="about-heading">
          <span className="about-heading__accent">ABOUT ME </span>
        </h2>
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="about-card scroll-reveal scroll-reveal--pop">
              <p>
                I’m a developer focused on building practical, user-centered applications with a clean and scalable approach. I work
                with the MERN stack to create full-stack solutions, combining responsive interfaces with efficient backend systems.
              </p>
              <p>
                My foundation in DBMS helps me design structured, optimized data models, while my interest in problem solving drives me
                to approach challenges logically and efficiently. I also pay close attention to UI/UX, aiming to create interfaces that
                are simple, intuitive, and meaningful for users.
              </p>

              <div className="about-langs">
                <div className="about-langs__title">Languages</div>
                <div className="about-langs__badges" role="list">
                  <div className="lang-badge" role="listitem">
                    <img className="lang-badge__flag" src="/imgs/ame.png" alt="United States flag" />
                    <span className="lang-badge__label">English</span>
                    <div className="lang-tooltip">
                      <span>Read</span>
                      <span>Write</span>
                      <span>Speak</span>
                    </div>
                  </div>
                  <div className="lang-badge" role="listitem">
                    <img className="lang-badge__flag" src="/imgs/ind.png" alt="India flag" />
                    <span className="lang-badge__label">Tamil</span>
                    <div className="lang-tooltip">
                      <span>Read</span>
                      <span>Write</span>
                      <span>Speak</span>
                    </div>
                  </div>
                  <div className="lang-badge" role="listitem">
                    <img className="lang-badge__flag" src="/imgs/jap.png" alt="Japan flag" />
                    <span className="lang-badge__label">Japanese</span>
                    <div className="lang-tooltip">
                      <span>Read</span>
                      <span>Write</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="edu-timeline scroll-reveal">


              <div className="edu-item">
                <span className="edu-dot" aria-hidden="true"></span>
                <div className="edu-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '140ms' }}>
                  <div className="edu-logo" aria-hidden="true">
                    <img src="/imgs/clg.jpeg" alt="" />
                  </div>
                  <div className="edu-text">
                    <div className="edu-school">Kongu Engineering College</div>
                    <div className="edu-meta">
                      BE. Computer Science and Design <br /> 2023-2027
                    </div>
                  </div>
                </div>
              </div>

              <div className="edu-item">
                <span className="edu-dot" aria-hidden="true"></span>
                <div className="edu-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '70ms' }}>
                  <div className="edu-logo" aria-hidden="true">
                    <img src="/imgs/school.jpeg" alt="" />
                  </div>
                  <div className="edu-text">
                    <div className="edu-school">Jawahar Matric Hr. Sec. School</div>
                    <div className="edu-meta">
                      HSC <br />
                      2021-2023
                    </div>
                  </div>
                </div>
              </div>

              <div className="edu-item">
                <span className="edu-dot" aria-hidden="true"></span>
                <div className="edu-card scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '0ms' }}>
                  <div className="edu-logo" aria-hidden="true">
                    <img src="/imgs/school.jpeg" alt="" />
                  </div>
                  <div className="edu-text">
                    <div className="edu-school">Jawahar Matric Hr. Sec. School</div>
                    <div className="edu-meta">
                      SSLC <br />
                      2020-2021
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
