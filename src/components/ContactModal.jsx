import React from 'react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-content scroll-reveal scroll-reveal--pop is-visible" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        <div className="contact-modal-body text-center">
          <h2 className="contact-modal-title">Contact Me</h2>
          <p className="contact-modal-text">
            Open to collaborating on projects and exploring new opportunities. Feel free to reach out
          </p>
          
          <div className="contact-links mt-4">
            <a href="mailto:mohana.civa@gmail.com" className="contact-link-item">
              <div className="contact-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#97d9e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <span>mohana.civa@gmail.com</span>
            </a>
            
            <a href="https://www.linkedin.com/in/mohana-sivakolundu-07745931b/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
              <div className="contact-icon-wrapper">
                <svg width="24" height="24" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#97d9e0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.225 0z" />
                </svg>
              </div>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
