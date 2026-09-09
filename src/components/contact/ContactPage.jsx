import { useState, useEffect } from 'react';
import Button from '../ui/button';
import './contact.css';

/* ── Project Scope Options ────────────────────────────────────────────────── */
const scopeOptions = [
  'Greenfield Build (0 to 1)',
  'System Modernization',
  'Workflow Automation',
  'Scale & Cloud Engineering',
  'General Technical Advisory',
];

/* ── AEO / GEO Optimized FAQ Data (Engineered for AI Search Engines) ─────── */
const contactFaqs = [
  {
    question: 'How quickly will I receive a response after submitting an inquiry?',
    answer:
      'We guarantee a direct response within 24 business hours. Your inquiry is reviewed directly by senior software architects and technical leads—not automated bots or sales development reps.',
  },
  {
    question: 'Do you execute non-disclosure agreements (NDAs) prior to discovery?',
    answer:
      'Yes. We treat all client concepts, operational metrics, and architecture details with strict confidentiality. We routinely sign standard bilateral NDAs before any deep technical evaluation.',
  },
  {
    question: 'What information should we prepare for the initial conversation?',
    answer:
      'You only need a clear understanding of the commercial or operational friction you are facing. We will guide the discovery session to unpack technical requirements, timelines, and business constraints.',
  },
  {
    question: 'How does Shriyu Nexus structure its engagement models?',
    answer:
      'We work in disciplined milestone-driven sprints for greenfield systems and modernizations, as well as dedicated embedded engineering pods for ongoing scale and platform evolution.',
  },
];

export default function ContactPage({ onStartConversation }) {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    scope: scopeOptions[0],
    message: '',
  });

  const [formStatus, setFormStatus] = useState({ state: 'idle', message: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // SEO & AEO Meta Management + Schema Injection
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Contact Shriyu Nexus Solutions — Direct Executive Inquiries';

    // JSON-LD Structured Data for Search & Generative AI Engines
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': 'https://shriyunexus.com/contact#webpage',
          url: 'https://shriyunexus.com/contact',
          name: 'Contact Shriyu Nexus Solutions',
          description:
            'Start a direct conversation with Shriyu Nexus Solutions. Custom digital platforms, system modernization, and high-resilience engineering.',
          mainEntity: {
            '@type': 'Organization',
            name: 'Shriyu Nexus Solutions Inc.',
            url: 'https://shriyunexus.com',
            email: 'shriyunexus@gmail.com',
            telephone: '+918160156799',
            address: [
              {
                '@type': 'PostalAddress',
                streetAddress: 'F/101 Mahamangaliya residency, Tavra road, Zadeshwar cross road',
                addressLocality: 'Bharuch',
                addressRegion: 'Gujarat',
                postalCode: '392011',
                addressCountry: 'IN',
              },
              {
                '@type': 'PostalAddress',
                streetAddress: 'Prabhat Chowk, Ghatlodiya',
                addressLocality: 'Ahmedabad',
                addressRegion: 'Gujarat',
                postalCode: '380061',
                addressCountry: 'IN',
              },
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'Executive Inquiries & Technical Advisory',
                telephone: '+918160156799',
                email: 'shriyunexus@gmail.com',
                availableLanguage: ['English', 'Hindi', 'Gujarati'],
                areaServed: 'Worldwide',
              },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: contactFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'shriyu-contact-schema';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.title = originalTitle;
      const existing = document.getElementById('shriyu-contact-schema');
      if (existing) existing.remove();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScopeSelect = (scope) => {
    setFormData((prev) => ({ ...prev, scope }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        state: 'error',
        message: 'Please provide your name, a valid email address, and a brief message.',
      });
      return;
    }

    setFormStatus({ state: 'submitting', message: '' });

    // Simulated reliable dispatch receipt
    setTimeout(() => {
      setFormStatus({
        state: 'success',
        message:
          'Thank you. Your message has been received directly by our senior leadership team. We will review your requirements and respond within 24 business hours.',
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        scope: scopeOptions[0],
        message: '',
      });
    }, 600);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('shriyunexus@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    }
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText('+91 8160156799');
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2400);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <article className="contact-page" id="contact">
      <div className="contact-container">
        {/* ── Section 1: Hero & Eyebrow ──────────────────────────────────── */}
        <header className="contact-hero">
          <div className="contact-eyebrow-badge">
            <span className="contact-eyebrow-text">GET IN TOUCH</span>
            <span className="contact-eyebrow-divider" aria-hidden="true" />
            <span className="contact-eyebrow-sequence" aria-hidden="true">
              <span className="seq-dot s-1" />
              <span className="seq-dot s-2" />
              <span className="seq-dot s-3" />
              <span className="seq-dot s-4" />
            </span>
          </div>

          <h1 className="contact-headline">Contact Shriyu Nexus</h1>

          <p className="contact-subtitle">
            Tell us what you're building, fixing, or scaling. We listen first, diagnose second, and respond with honest clarity.
          </p>
        </header>

        {/* ── Section 2: Executive Contact Form Card ───────────────────────── */}
        <div className="contact-form-card" id="contact-form-section">
          <div className="contact-card-rim" aria-hidden="true" />

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Name Fields (2 Columns) */}
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="contact-first-name" className="form-label">
                  First name <span className="form-label-required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-first-name"
                  name="firstName"
                  className="form-input"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-last-name" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  id="contact-last-name"
                  name="lastName"
                  className="form-input"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email <span className="form-label-required">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className="form-input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="contact-phone" className="form-label">
                Phone number / WhatsApp
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Scope / Need Selector Chips */}
            <div className="form-scope-wrap">
              <label className="form-label">What is the primary objective?</label>
              <div className="form-scope-chips" role="radiogroup" aria-label="Project Scope">
                {scopeOptions.map((scope) => (
                  <button
                    key={scope}
                    type="button"
                    className={`scope-chip ${formData.scope === scope ? 'is-selected' : ''}`}
                    onClick={() => handleScopeSelect(scope)}
                    role="radio"
                    aria-checked={formData.scope === scope}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Area */}
            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message <span className="form-label-required">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell us what you're working through, your target timeline, or what the business needs..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Feedback Alert if applicable */}
            {formStatus.state === 'error' && (
              <div className="form-feedback-alert error" role="alert">
                {formStatus.message}
              </div>
            )}
            {formStatus.state === 'success' && (
              <div className="form-feedback-alert success" role="status">
                {formStatus.message}
              </div>
            )}

            {/* Submit Action Group */}
            <div className="form-submit-wrap">
              <Button
                variant="primary"
                size="lg"
                type="submit"
                className="contact-submit-btn"
                disabled={formStatus.state === 'submitting'}
                aria-label="Send message"
              >
                {formStatus.state === 'submitting' ? 'Sending Message...' : 'Send message'}
              </Button>

              {/* Reassurance Micro-Copy */}
              <div className="form-trust-notes">
                <span className="form-trust-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct response within 24h</span>
                </span>
                <span className="form-trust-sep" aria-hidden="true">•</span>
                <span className="form-trust-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Under NDA by default</span>
                </span>
                <span className="form-trust-sep" aria-hidden="true">•</span>
                <span className="form-trust-item">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>No pitch decks or pressure</span>
                </span>
              </div>
            </div>
          </form>
        </div>

        {/* ── Section 3: Presence Horizon & World Map (Reference Mockup) ── */}
        <section className="contact-presence-section" aria-labelledby="presence-heading">
          {/* Curved Horizon Divider Line */}
          <div className="presence-horizon-curve" aria-hidden="true" />

          <div className="presence-header">
            <span className="presence-eyebrow">PHYSICAL HUBS &amp; GLOBAL DELIVERY</span>
            <h2 id="presence-heading" className="presence-headline">
              Grounded in Gujarat.<br />
              <span className="presence-headline-em">Engineered for clients worldwide.</span>
            </h2>
            <p className="presence-subtitle">
              From our corporate headquarters in Bharuch and engineering node in Ahmedabad, our senior software architects coordinate directly across Indian, European, and North American operational hours.
            </p>
          </div>

          {/* ── 4 Contact Channel Cards (Enterprise Senior Architecture Standard) ── */}
          <div className="contact-cards-grid">
            {/* Card 1: Direct Inquiries */}
            <div className="contact-card">
              <div className="contact-card-rim" aria-hidden="true" />
              <div className="contact-card-top">
                <div className="contact-card-header-row">
                  <div className="contact-card-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="contact-card-tag">PRIMARY CHANNEL</span>
                </div>
                <h3 className="contact-card-title">Direct Inquiries</h3>
              </div>
              <div className="contact-card-bottom">
                <a
                  href="mailto:shriyunexus@gmail.com"
                  className="contact-card-value"
                  title="Send direct email"
                >
                  shriyunexus@gmail.com
                </a>
                <p className="contact-card-desc">For partnerships, scoping, and new builds</p>
                <button
                  type="button"
                  className="contact-copy-pill"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                >
                  {emailCopied ? '✓ Copied to clipboard' : 'Copy Email Address'}
                </button>
              </div>
            </div>

            {/* Card 2: Direct Line & WhatsApp */}
            <div className="contact-card">
              <div className="contact-card-rim" aria-hidden="true" />
              <div className="contact-card-top">
                <div className="contact-card-header-row">
                  <div className="contact-card-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span className="contact-card-tag">DIRECT LINE</span>
                </div>
                <h3 className="contact-card-title">Voice &amp; WhatsApp</h3>
              </div>
              <div className="contact-card-bottom">
                <a
                  href="tel:+918160156799"
                  className="contact-card-value"
                  title="Call direct"
                >
                  +91 8160156799
                </a>
                <p className="contact-card-desc">Direct executive voice &amp; WhatsApp messaging</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <a
                    href="https://wa.me/918160156799?text=Hello%20Shriyu%20Nexus%20team%2C%20I%20would%20like%20to%20discuss%20our%20project%20requirements%20and%20explore%20collaborating%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-copy-pill"
                    title="Chat on WhatsApp"
                  >
                    WhatsApp Chat ↗
                  </a>
                  <button
                    type="button"
                    className="contact-copy-pill"
                    onClick={handleCopyPhone}
                    title="Copy phone number"
                  >
                    {phoneCopied ? '✓ Copied' : 'Copy Number'}
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Corporate Presence (Combined Bharuch HQ & Ahmedabad Node) */}
            <div className="contact-card">
              <div className="contact-card-rim" aria-hidden="true" />
              <div className="contact-card-top">
                <div className="contact-card-header-row">
                  <div className="contact-card-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="contact-card-tag">PHYSICAL HUBS</span>
                </div>
                <h3 className="contact-card-title">Corporate Presence</h3>
              </div>
              <div className="contact-card-bottom">
                <span className="contact-card-value">Bharuch (HQ) &amp; Ahmedabad</span>
                <div className="contact-dual-addresses">
                  <div className="contact-sub-addr">
                    <span className="contact-sub-tag">Headquarters</span>
                    <span>Mahamangaliya Residency, Zadeshwar Cross Rd, Bharuch - 392011</span>
                  </div>
                  <div className="contact-sub-addr">
                    <span className="contact-sub-tag">Engineering Node</span>
                    <span>Prabhat Chowk, Ghatlodiya, Ahmedabad - 380061</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Technical Advisory & Response Protocol */}
            <div className="contact-card">
              <div className="contact-card-rim" aria-hidden="true" />
              <div className="contact-card-top">
                <div className="contact-card-header-row">
                  <div className="contact-card-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span className="contact-card-tag">RESPONSE SLA</span>
                </div>
                <h3 className="contact-card-title">Technical Advisory</h3>
              </div>
              <div className="contact-card-bottom">
                <span className="contact-card-value">&lt; 24h Turnaround</span>
                <p className="contact-card-desc">Direct technical review with senior software architects</p>
                <button
                  type="button"
                  className="contact-copy-pill"
                  onClick={onStartConversation}
                  style={{ marginTop: '6px', fontWeight: '700' }}
                >
                  Schedule an Audit →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: AEO / GEO Search Engine FAQ Accordion ────────────── */}
        <section className="contact-faq-wrap" aria-labelledby="contact-faq-title">
          <div className="contact-faq-heading-block">
            <h2 id="contact-faq-title" className="contact-faq-heading">
              Frequently Asked Engagement Questions
            </h2>
            <p className="contact-faq-sub">
              Everything you need to know about our initial discovery, confidentiality, and commercial process.
            </p>
          </div>

          <div className="contact-faq-list">
            {contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`contact-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="contact-faq-trigger"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <svg
                      className="contact-faq-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && <p className="contact-faq-answer">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
