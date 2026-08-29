"use client";

import "./contact.css";

export default function ContactPage() {
  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-container">
          <div className="contact-hero-content">
            <span className="contact-eyebrow">GET IN TOUCH</span>

            <h1>
              Let’s talk about
              <span> EVs.</span>
            </h1>

            <p>
              Have a question, suggestion, feedback, or want to know more
              about EVInsights? We would love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section">
        <div className="contact-container contact-grid">
          {/* Left */}
          <div className="contact-info">
            <span className="contact-label">CONTACT US</span>

            <h2>
              We’re here
              <br />
              <span>to help.</span>
            </h2>

            <p className="contact-description">
              Whether you are looking for an electric car, comparing EVs,
              checking specifications, or simply have an idea to improve
              EVInsights, feel free to reach out.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <div className="detail-icon">✉</div>

                <div>
                  <span>Email</span>
                  <a href="mailto:hello@evinsights.in">
                    hello@evinsights.in
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">⌖</div>

                <div>
                  <span>Location</span>
                  <p>India</p>
                </div>
              </div>

              <div className="contact-detail">
                <div className="detail-icon">↗</div>

                <div>
                  <span>Response time</span>
                  <p>Usually within 24–48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your name</label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What would you like to talk about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  rows="7"
                  placeholder="Write your message here..."
                />
              </div>

              <button type="submit" className="contact-submit">
                <span>Send message</span>
                <span className="submit-arrow">→</span>
              </button>

              <p className="form-note">
                By sending this message, you agree to be contacted regarding
                your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ / Bottom CTA */}
      <section className="contact-bottom">
        <div className="contact-container">
          <div className="contact-bottom-card">
            <div>
              <span className="contact-label">EVINSIGHTS</span>

              <h2>
                Have an EV question?
                <br />
                <span>Let’s find the answer.</span>
              </h2>
            </div>

            <div className="contact-bottom-text">
              <p>
                Explore electric cars, compare models, check specifications,
                and discover everything you need to make a smarter EV
                decision.
              </p>

              <a href="/cars" className="browse-cars-btn">
                Explore EVs
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}