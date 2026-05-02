import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsPopupOpen(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <>
      <section id="contact" className="contact-section app-section section-glass scroll-reveal scroll-reveal--soft">
        <div className="container px-4">
          <h2 className="section-heading scroll-reveal scroll-reveal--pop">Contact</h2>
          <div className="row justify-content-center align-items-center g-5">
            <div className="col-lg-7">
              <div className="glass-box p-4 scroll-reveal scroll-reveal--pop" style={{ transitionDelay: '0ms' }}>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                    />
                    <label htmlFor="subject">Subject</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a message"
                      id="message"
                      name="message"
                      style={{ height: 150 }}
                      required
                      value={form.message}
                      onChange={handleChange}
                    ></textarea>
                    <label htmlFor="message">Message</label>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-glow px-5">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5 text-light ">
              <div
                className="glass-box p-4 d-flex flex-column gap-4 social-links scroll-reveal scroll-reveal--pop"
                style={{ transitionDelay: '70ms' }}
              >
                <p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                    alt="Email Icon"
                    width="24"
                    className="me-3 icon-anim"
                  />
                  mohana.civa@gmail.com
                </p>
                <p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
                    alt="Phone Icon"
                    width="24"
                    className="me-3 icon-anim"
                  />
                  +91 98765 43210
                </p>
                <p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                    alt="Location Icon"
                    width="24"
                    className="me-3 icon-anim"
                  />
                  Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="popup" className={`contact-popup${isPopupOpen ? ' active' : ''}`}>
        <div className="popup-content">
          <p>
            Thank you for reaching out!
            I&apos;ll get back to you as soon as I can.
          </p>
          <button onClick={() => setIsPopupOpen(false)} className="btn btn-sm btn-dark mt-2" type="button">
            Close
          </button>
        </div>
      </div>
    </>
  );
}

