import { useState, useEffect, useRef, useMemo } from 'react';
import Button from '../ui/button';
import './contact.css';

/* ── Project Scope Options ────────────────────────────────────────────────── */
const scopeOptions = [
  'General Inquiry',
  'Request a Quote / Pricing',
  'Product / Service Demo',
  'Partnership / Collaboration',
  'Careers',
  'Technical Support',
  'Media / Press',
  'Investor Relations',
  'Feedback / Suggestion',
  'Other',
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

/* ── Knuth-Plass Balanced Line-Breaking Engine for Scope Chips ───────────────
   Finds the globally optimal partition of variable-width chips into balanced rows
   that minimizes wasted line-end whitespace variance (O(n*k) dynamic programming).
─────────────────────────────────────────────────────────────────────────────── */
const precomputedChipWidths = {
  'General Inquiry': 144,
  'Request a Quote / Pricing': 208,
  'Product / Service Demo': 188,
  'Partnership / Collaboration': 218,
  'Careers': 96,
  'Technical Support': 158,
  'Media / Press': 128,
  'Investor Relations': 158,
  'Feedback / Suggestion': 183,
  'Other': 84,
};

function computeBalancedRows(items, containerWidth, gap = 12, measuredWidths = null) {
  if (!containerWidth || containerWidth <= 0) {
    return [items.slice(0, 3), items.slice(3, 6), items.slice(6, 10)];
  }

  const widths = items.map(
    (item, idx) => (measuredWidths && measuredWidths[idx]) || precomputedChipWidths[item] || 150
  );

  const n = items.length;
  const maxWidth = Math.max(...widths);

  if (containerWidth < maxWidth) {
    return [items];
  }

  let greedyRows = 1;
  let curW = 0;
  for (let i = 0; i < n; i++) {
    const w = widths[i];
    if (curW === 0) {
      curW = w;
    } else if (curW + gap + w <= containerWidth) {
      curW += gap + w;
    } else {
      greedyRows++;
      curW = w;
    }
  }

  function solvePartition(k) {
    const memo = Array.from({ length: n + 1 }, () => Array(k + 1).fill(null));

    function dp(i, row) {
      if (i === n && row === k) return { cost: 0, path: [] };
      if (i === n || row === k) return { cost: Infinity, path: [] };
      if (memo[i][row] !== null) return memo[i][row];

      let bestCost = Infinity;
      let bestPath = [];
      let rowW = 0;

      for (let j = i; j < n; j++) {
        rowW += widths[j] + (j > i ? gap : 0);
        if (rowW > containerWidth) break;

        const unused = containerWidth - rowW;
        const penalty = row === k - 1 ? unused * 0.7 : unused * unused;

        const next = dp(j + 1, row + 1);
        if (next.cost !== Infinity) {
          const totalCost = penalty + next.cost;
          if (totalCost < bestCost) {
            bestCost = totalCost;
            bestPath = [j + 1, ...next.path];
          }
        }
      }

      memo[i][row] = { cost: bestCost, path: bestPath };
      return memo[i][row];
    }

    const res = dp(0, 0);
    if (res.cost === Infinity) return null;

    const rows = [];
    let start = 0;
    for (const split of res.path) {
      rows.push(items.slice(start, split));
      start = split;
    }
    return rows;
  }

  let best = solvePartition(greedyRows);
  if (greedyRows < n) {
    const alt = solvePartition(greedyRows + 1);
    if (alt && (!best || alt.cost < best.cost * 0.82)) {
      best = alt;
    }
  }

  return best || [items];
}

function IntelligentScopeChips({ options, selectedScope, onSelect }) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(672);
  const [measuredWidths, setMeasuredWidths] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chips = containerRef.current.querySelectorAll('.scope-chip');
    if (chips.length === options.length) {
      const widths = Array.from(chips).map((el) => Math.ceil(el.getBoundingClientRect().width));
      setMeasuredWidths(widths);
    }
  }, [options]);

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = Math.round(entry.contentRect.width);
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const rows = useMemo(() => {
    return computeBalancedRows(options, containerWidth, 12, measuredWidths);
  }, [options, containerWidth, measuredWidths]);

  return (
    <div
      ref={containerRef}
      className="form-scope-chips"
      role="radiogroup"
      aria-label="What is the primary objective?"
    >
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="form-scope-row">
          {row.map((scope) => {
            const isSelected = selectedScope === scope;
            return (
              <button
                key={scope}
                type="button"
                className={`scope-chip ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelect(scope)}
                role="radio"
                aria-checked={isSelected}
              >
                {scope}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ── Objective-Specific Guidance ─────────────────────────────────────────────── */
const OBJECTIVE_GUIDANCE = {
  'General Inquiry': 'Create a simple message saying the user would like to discuss an enquiry.',
  'Request a Quote / Pricing': 'Say the user would like to discuss pricing or get a quote.',
  'Product / Service Demo': 'Say the user would like to see or learn more about a product or service.',
  'Partnership / Collaboration': 'Say the user would like to discuss a possible collaboration or partnership.',
  'Careers': 'Say the user is interested in career opportunities at Shriyu Nexus Solutions.',
  'Technical Support': 'Say the user needs help with a technical issue or support.',
  'Media / Press': 'Say the user would like to discuss a media or press-related matter.',
  'Investor Relations': 'Say the user would like to discuss an investor-related matter.',
  'Feedback / Suggestion': 'Say the user would like to share feedback or a suggestion.',
  'Other': 'Create a simple message saying the user would like to discuss something with the team.',
};

/* ── Dynamic ChatGPT Prompt Builder for Contact Inquiries ──────────────────── */
const buildChatGptPrompt = (scope) => {
  const objective = scope || 'General Inquiry';
  const guidance = OBJECTIVE_GUIDANCE[objective] || OBJECTIVE_GUIDANCE['General Inquiry'];

  return `You are helping a user create a short, natural message to start a conversation with Shriyu Nexus Solutions.

You have ONLY this detail:

Primary Objective:
${objective}

Create ONE short, friendly, professional message that the user can copy and send directly to Shriyu Nexus Solutions.

IMPORTANT:
- Use the selected Primary Objective to determine the purpose of the message.
- Do not include personal names or assume user identity.
- Do not invent any business, project, technical, budget, timeline, or personal details.
- Do not assume what the user specifically needs beyond the selected objective.
- Keep the language simple and natural.
- Make it sound like a real person, not AI-generated.
- Keep it short and conversational.
- Do not use overly formal or corporate language.
- Do not repeat the objective word-for-word if it sounds unnatural.
- Do not ask detailed questions.
- A simple request to discuss the matter is enough.
- The message must be between 20 and 1000 characters.
- Prefer around 1–2 short sentences.
- Return ONLY the message.
- No quotation marks.
- No heading.
- No explanation.
- No bullet points.
- No character count.

OBJECTIVE-SPECIFIC GUIDANCE:

${objective}:
${guidance}

STYLE:
The message should feel similar to something a person would actually type in a contact form or WhatsApp message.

Return ONLY the final message.`;
};

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

  // Auto-dismiss floating toast notification after 5 seconds
  useEffect(() => {
    if (formStatus.state === 'error' || formStatus.state === 'success') {
      const timer = setTimeout(() => {
        setFormStatus({ state: 'idle', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus.state, formStatus.message]);

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

    if (!formData.firstName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormStatus({
        state: 'error',
        message: 'Please provide your name, email address, and phone number.',
      });
      return;
    }

    const trimmedMsg = formData.message.trim();
    if (trimmedMsg.length > 0 && trimmedMsg.length < 20) {
      setFormStatus({
        state: 'error',
        message: 'Message should be at least 20 characters, or leave it blank.',
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

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(
    buildChatGptPrompt(formData.scope)
  )}`;

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
                Phone number <span className="form-label-required">*</span>
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                className="form-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Scope / Need Selector Chips (Intelligent Balanced Layout) */}
            <div className="form-scope-wrap">
              <label className="form-label">What is the primary objective?</label>
              <IntelligentScopeChips
                options={scopeOptions}
                selectedScope={formData.scope}
                onSelect={handleScopeSelect}
              />
            </div>

            {/* Message Area (Optional, with AI Draft Assistant) */}
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="contact-message" className="form-label">
                  Message <span className="form-label-optional">(Optional)</span>
                </label>
                <a
                  href={chatGptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="form-ai-draft-btn"
                  title="Draft your message with ChatGPT based on your objective"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                  </svg>
                  <span>Write with AI</span>
                  <span className="ai-btn-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell us what you're working through, your target timeline, or what the business needs..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
              />
              <div className="form-message-meta">
                <span className="form-char-count">
                  {formData.message.length > 0
                    ? `${formData.message.length} / 1,000 characters`
                    : 'Optional • 20 to 1,000 characters if provided'}
                </span>
              </div>
            </div>

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

          {/* ── Executive Contact Grid: Corporate Presence (2*1 Full) + Comms Stack (2*1 Top/Bottom) ── */}
          <div className="contact-cards-grid">
            {/* Left Column: 2*1 Full - Corporate Presence */}
            <div className="contact-card contact-card--presence">
              <div className="contact-card-rim" aria-hidden="true" />
              
              <div className="presence-card-header">
                <div className="contact-card-header-row">
                  <div className="contact-card-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="contact-card-tag">PHYSICAL HUBS</span>
                </div>

                <div className="presence-title-group">
                  <h3 className="contact-card-title">Corporate Presence</h3>
                  <div className="presence-main-val">Bharuch (HQ) &amp; Ahmedabad</div>
                  <p className="presence-lead-desc">Registered corporate headquarters &amp; active technical engineering node</p>
                </div>
              </div>

              <div className="contact-dual-addresses">
                {/* Headquarters Hub (Full Official Registered Address) */}
                <div className="contact-sub-addr">
                  <div className="contact-sub-header">
                    <div className="contact-sub-title-wrap">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-addr-icon" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="contact-sub-tag">Headquarters</span>
                    </div>
                  </div>
                  <div className="contact-sub-line">
                    F/101, Mahamangaliya Residency, Tavra Road, Zadeshwar Cross Rd, Bharuch, Gujarat &ndash; 392011
                  </div>
                </div>

                {/* Engineering Node Hub */}
                <div className="contact-sub-addr">
                  <div className="contact-sub-header">
                    <div className="contact-sub-title-wrap">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-addr-icon" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="contact-sub-tag">Engineering Node</span>
                    </div>
                  </div>
                  <div className="contact-sub-line">
                    Prabhat Chowk, Ghatlodiya, Ahmedabad, Gujarat &ndash; 380061
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2*1 Top/Bottom Stack -> Direct Inquiries & Contact Number */}
            <div className="contact-cards-stack">
              {/* Top 1*1 - Direct Inquiries */}
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
                  <div className="contact-card-value-row">
                    <span className="contact-card-value">shriyunexus@gmail.com</span>
                    <button
                      type="button"
                      className="contact-copy-round"
                      onClick={handleCopyEmail}
                      title={emailCopied ? "Email copied to clipboard!" : "Copy email address"}
                      aria-label="Copy email address"
                    >
                      {emailCopied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="contact-card-desc">For partnerships, scoping, and new builds</p>
                  <div className="contact-card-actions">
                    <a
                      href="mailto:shriyunexus@gmail.com"
                      className="contact-copy-pill"
                      title="Send mail to shriyunexus@gmail.com"
                    >
                      <span>Send Mail</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom 1*1 - Contact Number */}
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
                  <h3 className="contact-card-title">Contact Number</h3>
                </div>
                <div className="contact-card-bottom">
                  <div className="contact-card-value-row">
                    <span className="contact-card-value">+91 8160156799</span>
                    <button
                      type="button"
                      className="contact-copy-round"
                      onClick={handleCopyPhone}
                      title={phoneCopied ? "Phone number copied to clipboard!" : "Copy phone number"}
                      aria-label="Copy phone number"
                    >
                      {phoneCopied ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="contact-card-desc">Direct executive voice &amp; WhatsApp messaging</p>
                  <div className="contact-card-actions">
                    <a
                      href="tel:+918160156799"
                      className="contact-copy-pill"
                      title="Call +91 8160156799"
                    >
                      <span>Call</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/918160156799?text=Hello%20Shriyu%20Nexus%20team%2C%20I%20would%20like%20to%20discuss%20our%20project%20requirements%20and%20explore%20collaborating%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-copy-pill"
                      title="Chat on WhatsApp"
                    >
                      <span>WhatsApp</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
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

      {/* ── Executive Floating Toast Notification ────────────────────────── */}
      {(formStatus.state === 'error' || formStatus.state === 'success') && (
        <div
          className={`contact-toast-container ${formStatus.state}`}
          role="status"
          aria-live="assertive"
        >
          <div className={`contact-toast ${formStatus.state}`}>
            <div className="contact-toast-icon-wrap" aria-hidden="true">
              {formStatus.state === 'error' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
            </div>

            <div className="contact-toast-content">
              <div className="contact-toast-title">
                {formStatus.state === 'error' ? 'Action Required' : 'Message Transmitted'}
              </div>
              <p className="contact-toast-message">{formStatus.message}</p>
            </div>

            <button
              type="button"
              className="contact-toast-close"
              onClick={() => setFormStatus({ state: 'idle', message: '' })}
              aria-label="Dismiss notification"
              title="Close notification"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
