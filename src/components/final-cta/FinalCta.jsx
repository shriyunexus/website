import { useState } from 'react';
import Button from '../ui/button';
import './final-cta.css';

export default function FinalCta({ onOpenModal, showCtaCard = true }) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (targetId === '/about' || targetId === '#about') {
      window.history.pushState(null, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    if (targetId === '/contact' || targetId === '#contact') {
      window.history.pushState(null, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    if (targetId === '/services' || targetId === '#services') {
      window.history.pushState(null, '', '/services');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }
    const path = window.location.pathname.replace(/\/+$/, '');
    const isSpecialPage = path === '/about' || path === '/contact' || path === '/services' || window.location.hash === '#about' || window.location.hash === '#contact' || window.location.hash === '#services';
    if (isSpecialPage) {
      window.history.pushState(null, '', `/${targetId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    // Scroll to top — clear hash and go to top
    if (targetId === '#hero') {
      window.history.pushState(null, '', '/');
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetElement, { offset: 120, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      const rect = targetElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({ top: rect.top + scrollTop + 120, behavior: 'smooth' });
    }
    // Update URL hash
    window.history.pushState(null, '', targetId);
  };

  const handleStartConversation = () => {
    if (typeof onOpenModal === 'function') {
      onOpenModal();
    }
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('shriyunexus@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    }
  };

  return (
    <footer className={`section-final-cta ${!showCtaCard ? 'footer-only' : ''}`} id="final-cta">
      {/* Volumetric serene ambient background glow */}
      {showCtaCard && <div className="final-ambient-glow" aria-hidden="true" />}

      <div className="final-cta-container">
        {/* ── Floating Executive CTA Card (Matching Reference Standard) ── */}
        {showCtaCard && (
          <div className="final-cta-card">
            {/* Top Specular Rim Filament */}
            <div className="final-card-rim" aria-hidden="true" />

            {/* Eyebrow Badge (Website Theme Continuous Standard) */}
            <div className="final-eyebrow-container">
              <div className="final-eyebrow-badge">
                <span className="final-eyebrow-text">READY WHEN YOU ARE</span>
                <span className="final-eyebrow-divider" aria-hidden="true" />
                <span className="final-eyebrow-sequence" aria-hidden="true">
                  <span className="seq-dot s-1" />
                  <span className="seq-dot s-2" />
                  <span className="seq-dot s-3" />
                  <span className="seq-dot s-4" />
                </span>
              </div>
            </div>

            {/* Monumental Typographic Closing Composition */}
            <div className="final-hero-header">
              <h2 className="final-headline">
                Your Next Move Starts With a Conversation.
              </h2>

              <p className="final-supporting-copy">
                Whether you're starting something new, fixing what's holding you back, or preparing for what's next — let's talk about what the business actually needs.
              </p>
            </div>

            {/* Strong Trust Reassurance (Executive Segmented Capsule) */}
            <div className="final-trust-pedestal">
              <div className="trust-pedestal-content">
                <span className="trust-item-text">No pitch deck</span>
                <span className="trust-pillar-sep" aria-hidden="true" />
                <span className="trust-item-text">No pressure</span>
                <span className="trust-pillar-sep" aria-hidden="true" />
                <span className="trust-item-text">Just a useful conversation</span>
              </div>
            </div>

            {/* Dual Action Triggers (Primary & Secondary) */}
            <div className="final-actions-group">
              {/* Primary CTA */}
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartConversation}
                aria-label="Start a Conversation"
              >
                Start a Conversation
              </Button>

              {/* Secondary CTA */}
              <Button
                variant="secondary"
                as="a"
                href="#business-needs"
                onClick={(e) => handleSmoothScroll(e, '#business-needs')}
                aria-label="Explore What We Do"
              >
                Explore What We Do
              </Button>
            </div>

            {/* Architectural Monogram Watermark Inside Card */}
            <div className="final-watermark" aria-hidden="true">
              SHRIYU NEXUS
            </div>
          </div>
        )}

        {/* ── Executive Footer Divider (Clean Theme Standard) ────────── */}
        {showCtaCard && <div className="final-footer-divider" aria-hidden="true" />}

        {/* ── Clean Executive Footer Columns ─────────────────────────── */}
        <div className="final-footer-content">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-lockup">
              <div className="brand-logo-frame">
                <img
                  src="/logo/shryu-sky-tp-logo.png"
                  alt="Shriyu Logo"
                  className="footer-brand-logo"
                  width={34}
                  height={34}
                  loading="lazy"
                />
              </div>
              <div className="footer-brand-info">
                <h4 className="footer-brand-name">Shriyu Nexus Solutions</h4>
                <p className="footer-tagline">
                  Built on intent. Scaled with discipline.
                </p>
              </div>
            </div>

            {/* Quick Email Inquiry Lockup */}
            <div className="footer-dispatch-card">
              <div className="footer-email-lockup">
                <a
                  href="mailto:shriyunexus@gmail.com"
                  className="footer-email-link"
                  title="Send direct inquiry"
                >
                  <svg
                    className="email-link-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>shriyunexus@gmail.com</span>
                </a>
                <button
                  type="button"
                  className="footer-copy-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  title={emailCopied ? "Email copied!" : "Copy email"}
                >
                  {emailCopied ? (
                    <span className="copied-pill">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Connect & Social Channels: Phone, WhatsApp, LinkedIn, Instagram */}
            <div className="footer-brand-socials" aria-label="Direct contact and social profiles">
              <a
                href="tel:+918160156799"
                className="footer-social-btn phone-btn"
                aria-label="Call Shriyu Nexus Solutions (+91 8160156799)"
                title="Phone: +91 8160156799"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <a
                href="https://wa.me/918160156799?text=Hello%20Shriyu%20Nexus%20team%2C%20I%20would%20like%20to%20discuss%20our%20project%20requirements%20and%20explore%20collaborating%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn wa-btn"
                aria-label="Chat with Shriyu Nexus Solutions on WhatsApp"
                title="WhatsApp: +91 8160156799"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-.01 0 0 0 0 0-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.02.79.81-2.95-.19-.3A8.178 8.178 0 0 1 3.8 11.91c0-4.54 3.7-8.24 8.25-8.24m4.52 10.23c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/shriyunexus"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn in-btn"
                aria-label="Follow Shriyu Nexus Solutions on LinkedIn"
                title="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.5a1.63 1.63 0 0 0-1.63 1.63c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/shriyunexus/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn ig-btn"
                aria-label="Follow Shriyu Nexus Solutions on Instagram"
                title="Instagram"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Physical Hubs / Corporate Presence */}
            <div className="footer-offices-card" aria-label="Physical office hubs">
              <div className="footer-office-row">
                <svg className="footer-office-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="footer-office-address">
                  F/101 Mahamangaliya Residency, Tavra Road, Zadeshwar Cross Rd, Bharuch &ndash; 392011
                </p>
              </div>

              <div className="footer-office-row">
                <svg className="footer-office-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="footer-office-address">
                  Prabhat Chowk, Ghatlodiya, Ahmedabad &ndash; 380061
                </p>
              </div>
            </div>
          </div>

          {/* Navigation: Explore */}
          <div className="footer-nav-col">
            <span className="footer-nav-heading">Explore</span>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="#our-process"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#our-process')}
                >
                  <span>How we Works</span>
                </a>
              </li>
              <li>
                <a
                  href="#why-shriyu"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#why-shriyu')}
                >
                  <span>Why Us</span>
                </a>
              </li>
              <li>
                <a
                  href="#business-needs"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#business-needs')}
                >
                  <span>Business Solutions</span>
                </a>
              </li>
              <li>
                <a
                  href="#how-to-start"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#how-to-start')}
                >
                  <span>How to Start</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation: Services */}
          <div className="footer-nav-col">
            <span className="footer-nav-heading">Services</span>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>Custom Software</span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>Web & App Development</span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>UI/UX Design</span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>AI & Automation</span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>Digital Marketing</span>
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/services')}
                >
                  <span>E-commerce</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation: Company */}
          <div className="footer-nav-col">
            <span className="footer-nav-heading">Company</span>
            <ul className="footer-nav-list">
              <li>
                <a
                  href="/about"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/about')}
                >
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#faq')}
                >
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a
                  href="#how-to-start"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '#how-to-start')}
                >
                  <span>How To Start</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="footer-nav-link"
                  onClick={(e) => handleSmoothScroll(e, '/contact')}
                >
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ── Footer Bottom Bar (Authentic Executive Standard) ─────────── */}
        <div className="final-bottom-bar">
          <div className="bottom-bar-left">
            <span className="copyright-text">
              &copy; {new Date().getFullYear()} Shriyu Nexus Solutions Inc. All rights reserved.
            </span>
          </div>

          <div className="bottom-bar-right">
            <div className="bottom-legal-group">
              <button
                type="button"
                className="legal-link-btn"
                onClick={handleStartConversation}
              >
                Privacy Policy
              </button>
              <span className="legal-sep" aria-hidden="true">&bull;</span>
              <button
                type="button"
                className="legal-link-btn"
                onClick={handleStartConversation}
              >
                Terms of Service
              </button>
              <span className="legal-sep" aria-hidden="true">&bull;</span>
              <button
                type="button"
                className="legal-link-btn"
                onClick={handleStartConversation}
              >
                Security
              </button>
            </div>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={(e) => handleSmoothScroll(e, '#hero')}
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
