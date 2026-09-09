import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './faq.css';

gsap.registerPlugin(ScrollTrigger);

/* ── The 9 Strategic Objection-Clearing Questions & Straight Answers ─────── */
const faqData = [
  {
    num: '01',
    id: 'faq-01',
    question: 'Do you build fully custom software, or work off templates?',
    answer:
      "Custom — shaped around how your business actually operates, not a generic template with your logo on it. That doesn't mean starting from zero every time; where a proven pattern already solves part of the problem well, we use it, so you're not paying to reinvent something that already works.",
  },
  {
    num: '02',
    id: 'faq-02',
    question: 'Can you work with our existing systems, or do we need to replace everything?',
    answer:
      "Usually no full replacement is necessary. We look at what's already working and build around or on top of it — integrating, extending, or modernizing specific pieces, not defaulting to a rebuild just because it's simpler for us.",
  },
  {
    num: '03',
    id: 'faq-03',
    question: "What if we're not even sure we need custom software?",
    answer:
      "That's a legitimate place to start. Part of the first conversation is figuring out whether software is actually the right answer — sometimes it isn't, and we'll say so directly rather than finding a way to sell you something anyway.",
  },
  {
    num: '04',
    id: 'faq-04',
    question: 'Can we start with something small, like an MVP?',
    answer:
      "Often, yes — and it's usually the right call, not a compromise. If a lean first version can answer the real question — will this actually get used, does it solve the problem — before committing to the full build, we'll recommend that path.",
  },
  {
    num: '05',
    id: 'faq-05',
    question: 'Do you work with small or early-stage businesses, or only larger ones?',
    answer:
      "We work with businesses at the size where the problem is real, not where the company is large enough to look impressive on a client list. If the problem is real and the fit is right, size isn't the deciding factor.",
  },
  {
    num: '06',
    id: 'faq-06',
    question: 'Do you offer support after launch, or does it end at delivery?',
    answer:
      "Depends on what the system actually needs, and we'll tell you which one yours is rather than defaulting to a retainer because it's convenient for us. Some systems need ongoing support. Some genuinely don't.",
  },
  {
    num: '07',
    id: 'faq-07',
    question: 'How much does a project typically cost?',
    answer:
      "That depends entirely on scope — which is exactly why we don't quote a number before understanding the problem. A real estimate only means something once we know what's actually being built.",
  },
  {
    num: '08',
    id: 'faq-08',
    question: 'Do you also handle branding, marketing, or e-commerce?',
    answer:
      "Software is our core focus — the systems, platforms, and tools that run your business. If a project touches branding, marketing, or e-commerce, ask directly and we'll tell you honestly whether that's something we handle ourselves or something we'd help you find the right partner for.",
  },
  {
    num: '09',
    id: 'faq-09',
    question: 'How does a project actually begin?',
    answer:
      "With a conversation, not a proposal — see How to Start above for exactly what that looks like.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null); // Collapsed by default, one open at a time
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const accordionRef = useRef(null);
  const pedestalRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Headline Character Scrub Reveal
      const headlineChars = headlineRef.current
        ? Array.from(headlineRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (headlineChars.length > 0) {
        gsap.fromTo(
          headlineChars,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.012,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 88%',
              end: 'bottom 55%',
              scrub: 0.4,
            },
          }
        );
      }

      // 2. Supporting Lead Reveal
      const leadChars = leadRef.current
        ? Array.from(leadRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (leadChars.length > 0) {
        gsap.fromTo(
          leadChars,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.007,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: leadRef.current,
              start: 'top 86%',
              end: 'bottom 52%',
              scrub: 0.4,
            },
          }
        );
      }

      // 3. Accordion Staggered Entrance
      if (accordionRef.current) {
        const items = accordionRef.current.querySelectorAll('.faq-item-row');
        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: accordionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Grounding Philosophy Pedestal Entrance
      if (pedestalRef.current) {
        gsap.fromTo(
          pedestalRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pedestalRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetElement, { offset: -40, duration: 1.2 });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-faq" id="faq" ref={sectionRef}>
      {/* Subtle ambient volumetric radial glow */}
      <div className="faq-ambient-glow" aria-hidden="true" />

      <div className="faq-container">
        {/* ── Centered Section Header (Website Rhythm Standard) ─────────── */}
        <div className="faq-header-center">
          {/* Eyebrow Badge (Website Theme Continuous Standard) */}
          <div className="faq-eyebrow-container">
            <div className="faq-eyebrow-badge">
              <span className="faq-eyebrow-text">FAQ</span>
              <span className="faq-eyebrow-divider" aria-hidden="true" />
              <span className="faq-eyebrow-sequence" aria-hidden="true">
                <span className="seq-dot s-1" />
                <span className="seq-dot s-2" />
                <span className="seq-dot s-3" />
                <span className="seq-dot s-4" />
              </span>
            </div>
          </div>

          {/* Monumental Centered Headline */}
          <h2 className="faq-headline" ref={headlineRef}>
            {'Questions Worth Asking First.'
              .split(' ')
              .map((word, wordIdx, arr) => (
                <span key={wordIdx} className="reveal-word">
                  {word.split('').map((char, charIdx) => (
                    <span key={charIdx} className="reveal-char">
                      {char}
                    </span>
                  ))}
                  {wordIdx < arr.length - 1 && <span className="reveal-space">&nbsp;</span>}
                </span>
              ))}
          </h2>

          {/* Supporting Centered Subhead */}
          <p className="faq-lead" ref={leadRef}>
            {"Straight answers to the things you're probably already wondering."
              .split(' ')
              .map((word, wordIdx, arr) => (
                <span key={wordIdx} className="reveal-word">
                  {word.split('').map((char, charIdx) => (
                    <span key={charIdx} className="reveal-char">
                      {char}
                    </span>
                  ))}
                  {wordIdx < arr.length - 1 && <span className="reveal-space">&nbsp;</span>}
                </span>
              ))}
          </p>
        </div>

        {/* ── Interactive 9-Item Accordion Ledger (Centered Architecture) ──── */}
        <div
          className="faq-accordion-wrapper"
          ref={accordionRef}
          role="region"
          aria-label="Frequently Asked Questions"
        >
          <div className="faq-accordion-list">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              const buttonId = `faq-btn-${item.num}`;
              const panelId = `faq-panel-${item.num}`;

              return (
                <div
                  key={item.num}
                  className={`faq-item-row ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="faq-trigger-btn"
                    onClick={() => handleToggle(index)}
                  >
                    {/* Numeral */}
                    <span className="faq-num" aria-hidden="true">
                      {item.num}
                    </span>

                    {/* Question Text */}
                    <span className="faq-question-text">{item.question}</span>

                    {/* Minimalist Precision Chevron */}
                    <span className="faq-chevron-wrap" aria-hidden="true">
                      <svg
                        className="faq-chevron-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 7.5L10 12.5L15 7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Smooth Disclosure Panel */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-answer-panel"
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer-content">
                        <p className="faq-answer-text">
                          {item.id === 'faq-09' ? (
                            <>
                              With a conversation, not a proposal — see{' '}
                              <a
                                href="#how-to-start"
                                className="faq-inline-link"
                                onClick={(e) => handleSmoothScroll(e, '#how-to-start')}
                              >
                                How to Start
                              </a>{' '}
                              above for exactly what that looks like.
                            </>
                          ) : (
                            item.answer
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Grounding Philosophy Reassurance Pedestal (Centered at Bottom) ─ */}
        <div className="faq-philosophy-pedestal" ref={pedestalRef}>
          <div className="pedestal-top-filament" aria-hidden="true" />
          <div className="pedestal-inner">
            <div className="philosophy-header-badge">
              <span className="philosophy-dot" aria-hidden="true" />
              <span className="philosophy-label">THE SHRIYU PHILOSOPHY</span>
            </div>
            <p className="philosophy-statement-text">
              We aren't trying to sell you technology. We're trying to determine whether technology can genuinely improve your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
