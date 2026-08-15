/**
 * Master Strategic Section — Alphabet-by-Alphabet Scroll Typewriter Edition
 * -----------------------------------------------------------------------
 * 1. Text is 100% HIDDEN initially (opacity: 0 — zero premature visibility under video).
 * 2. On Scroll: Alphabet-by-Alphabet typewriter illumination:
 *    "We understand, design, build, and evolve digital solutions around the way
 *     your business actually works."
 *
 * 3. 2x2 Strategic Cards Grid:
 *    • UNDERSTAND - "We start with the real problem..."
 *    • DESIGN     - "Experiences shaped around real users..."
 *    • BUILD      - "Software and systems built for reality."
 *    • EVOLVE     - "Foundations ready for what comes next."
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statementText =
  'We understand, design, build, and evolve digital solutions around the way your business actually works.';

const processCardsData = [
  {
    step: '01 / UNDERSTAND',
    title: 'UNDERSTAND',
    quote: 'We start with the real problem...',
    desc: 'Uncovering root business challenges and user needs to define strategic clarity before building.',
    accentColor: '#ff471a',
  },
  {
    step: '02 / DESIGN',
    title: 'DESIGN',
    quote: 'Experiences shaped around real users...',
    desc: 'Crafting intuitive, high-converting interfaces and brand systems that users fall in love with.',
    accentColor: '#7c5cfc',
  },
  {
    step: '03 / BUILD',
    title: 'BUILD',
    quote: 'Software and systems built for reality.',
    desc: 'Engineered for rock-solid performance, security, and scalability with modern tech stacks.',
    accentColor: '#2f6bff',
  },
  {
    step: '04 / EVOLVE',
    title: 'EVOLVE',
    quote: 'Foundations ready for what comes next.',
    desc: 'Built to continuously adapt, optimize, and scale alongside your growing business goals.',
    accentColor: '#33d6a8',
  },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* ── 1. Alphabet-by-Alphabet Scroll Reveal (100% hidden initially) ─── */
      const charEls = headingRef.current
        ? Array.from(headingRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (charEls.length > 0) {
        gsap.fromTo(
          charEls,
          { opacity: 0, color: 'rgba(255, 255, 255, 0)', y: 8 },
          {
            opacity: 1,
            color: '#ffffff',
            y: 0,
            stagger: 0.015, // rapid, silky alphabet-by-alphabet typewriter reveal
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      }

      /* ── 2. Strategic Cards Entrance ─────────────────────────────────────── */
      const cards = cardsRef.current.filter(Boolean);

      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (i) => (el) => {
    cardsRef.current[i] = el;
  };

  const charArray = statementText.split('');

  return (
    <section className="section-cards-statement" id="process" ref={sectionRef}>
      <div className="container-cards">

        {/* Statement Heading — Alphabet-by-Alphabet Typewriter Reveal */}
        <h2 className="outcrowd-statement-heading" ref={headingRef}>
          {charArray.map((char, idx) => (
            <span key={idx} className="reveal-char" style={{ opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        {/* 2x2 Strategic Cards Grid */}
        <div className="outcrowd-metrics-grid">
          {processCardsData.map((item, idx) => (
            <div
              className="outcrowd-metric-card-wrapper"
              key={item.title}
              ref={setCardRef(idx)}
            >
              <div className="outcrowd-metric-card">
                <div
                  className="outcrowd-badge"
                  style={{
                    color: item.accentColor,
                    backgroundColor: `${item.accentColor}15`,
                    borderColor: `${item.accentColor}40`,
                  }}
                >
                  <span>{item.step}</span>
                </div>
                <div className="outcrowd-card-body">
                  <h3 className="outcrowd-card-title">{item.title}</h3>
                  <p className="outcrowd-quote">"{item.quote}"</p>
                  <p className="outcrowd-desc">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
