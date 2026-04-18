import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-section section-glass mt-5">
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          {/* Left: Academic Details */}
          <div className="col-md-6 text-center text-md-start">
            <h3 className="footer-name">Mohana S</h3>
            <p className="footer-info">BE. Computer Science and Design</p>
            <p className="footer-info">Kongu Engineering College</p>
          </div>

          {/* Right: Tech and Socials */}
          <div className="col-md-6 text-center text-md-end">
            <div className="footer-tech mb-3">
              <span>Built with React</span>
              <svg width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="#61dafb" xmlns="http://www.w3.org/2000/svg" className="ms-2">
                <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                <g stroke="#61dafb" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
            </div>

            <div className="footer-socials">
              <a href="https://leetcode.com/u/Mohana_S08/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="footer-social-link">
                <img src="https://cdn.simpleicons.org/leetcode/ffffff" alt="LeetCode" />
              </a>
              <a href="https://github.com/Mohana-Siva" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-link">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" />
              </a>
              <a href="https://www.linkedin.com/in/mohana-sivakolundu-07745931b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.208 24 24 23.226 24 22.271V1.729C24 .774 23.208 0 22.225 0z" />
                </svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social-link">
                <img src="https://cdn.simpleicons.org/x/ffffff" alt="X" />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider mt-5 mb-4" />

        <div className="footer-copyright text-center">
          <p>© 2026 Mohana Sivakolundu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
