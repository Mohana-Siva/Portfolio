import { useState } from 'react';

const certifications = [
  {
    title: "MongoDB Certified Associate Developer",
    org: "MongoDB",
    orgLogo: "https://cdn.simpleicons.org/mongodb/47A248",
    date: "Issued May 2025",
    id: "#MDBdxubyx1tvy",
    img: "/imgs/c1.png"
  },
  {
    title: "Oracle APEX Cloud Developer",
    org: "Oracle",
    orgLogo: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    date: "Issued May 2025",
    id: "101639449APEX24CDOCP",
    img: "/imgs/c2.png"
  },
  {
    title: "Generative AI Professional",
    org: "Oracle",
    orgLogo: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    date: "Issued May 2025",
    id: "101639449OCI25GAIOCP",
    img: "/imgs/c3.png"
  },
  {
    title: "AI foundation Associate",
    org: "Oracle",
    orgLogo: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    date: "Issued May 2025",
    id: "101639449OCI25AICFA",
    img: "/imgs/c4.png"
  }
];

export default function CertsSection() {
  const [modalImg, setModalImg] = useState(null);

  return (
    <section id="certs" className="certs-section app-section section-glass scroll-reveal scroll-reveal--soft">
      <div className="container px-4">
        <h2 className="section-heading reveal">Certifications</h2>
        
        <div className="row g-4 justify-content-center">
          {certifications.map((cert, index) => (
            <div key={index} className="col-lg-6 col-xl-5 reveal">
              <div className="cert-card">
                <div className="cert-card__body">
                  <div className="cert-logo">
                    <img src={cert.orgLogo} alt={cert.org} />
                  </div>
                  <div className="cert-info">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-org">{cert.org}</p>
                    <p className="cert-date">{cert.date}</p>
                    <div className="cert-credential">
                       <span className="verify-icon">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="#4CAF50" xmlns="http://www.w3.org/2000/svg">
                           <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
                         </svg>
                       </span>
                       <span className="cert-id">{cert.id}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="cert-view-btn" 
                  onClick={() => setModalImg(cert.img)}
                  aria-label="View Certificate"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalImg && (
        <div className="cert-modal-overlay" onClick={() => setModalImg(null)}>
          <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setModalImg(null)}>×</button>
            <img src={modalImg} alt="Certificate" className="cert-modal-img" />
          </div>
        </div>
      )}
    </section>
  );
}
