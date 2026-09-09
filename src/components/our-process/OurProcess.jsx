import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './our-process.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Heading lines for character-by-character scroll reveal ────────────── */
const headingLines = [
  'We understand your business,',
  'design with purpose, and build',
  'technology around the way',
  'you actually work.',
];

/* ── Process Steps (Strictly 100% Preserved Content) ─────────────────────── */
const processSteps = [
  {
    num: '01',
    title: 'Understand',
    desc: 'We learn how your business operates, where the friction exists, and what actually needs to improve.',
    specs: ['Business Context', 'Workflows', 'Pain Points'],
    accent: '#A0BBFF',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'We turn those insights into a clear, practical solution designed around your people and processes.',
    specs: ['User Journeys', 'Solution Structure', 'Experience'],
    accent: '#B4696A',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'We engineer reliable technology with the quality, scalability, and usability needed for real-world use.',
    specs: ['Development', 'Integration', 'Testing'],
    accent: '#CF6733',
  },
  {
    num: '04',
    title: 'Evolve',
    desc: 'We refine, improve, and grow the solution over time, adapting your technology as your business changes.',
    specs: ['Improve', 'Adapt', 'Scale'],
    accent: '#A0BBFF',
  },
];

/* ── Step Concept Icons (Instant Big-Picture Understanding) ─────────────── */
function StepConceptIcon({ stepNum, color }) {
  if (stepNum === '01') {
    // 01: Understand — Discovery & Research Lens (Optically Dead-Centered)
    return (
      <div className="card-concept-icon icon-understand" aria-label="Discovery & Research" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M15.5 15.5L20.5 20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="10.5" cy="10.5" r="2.25" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" />
          <path d="M10.5 6.5V8M10.5 13V14.5M6.5 10.5H8M13 10.5H14.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (stepNum === '02') {
    // 02: Design — Digital Architecture & Vector Pen Tool (Optically Dead-Centered)
    return (
      <div className="card-concept-icon icon-design" aria-label="Design Systems & Architecture" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 19L19 12L22 15L15 22L12 19Z"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M2 2L9.5 9.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="11" cy="11" r="1.75" fill={color} />
        </svg>
      </div>
    );
  }

  if (stepNum === '03') {
    // 03: Build — Software Engineering & Code Terminal (Optically Dead-Centered)
    return (
      <div className="card-concept-icon icon-build" aria-label="Software Development & Engineering" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M7 8L2.5 12L7 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 8L21.5 12L17 16" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 4.5L10 19.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 04: Evolve — Growth, Scaling & Optimization Trajectory (Optically Dead-Centered)
  return (
    <div className="card-concept-icon icon-evolve" aria-label="Growth & Scaling" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 17.5L8.5 12L13 15.5L21 6"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 6H21V12"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 21H21" stroke={color} strokeWidth="1.4" strokeOpacity="0.3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Staggered Executive Card ──────────────────────────────────────────── */
function StaggeredProcessCard({ step }) {
  return (
    <div className="staggered-card" style={{ '--card-accent': step.accent }}>
      {/* Top Row: Numeral + Concept Icon */}
      <div className="staggered-card-top-row">
        <div className="staggered-card-num" style={{ color: step.accent }}>
          {step.num}
        </div>
        <StepConceptIcon stepNum={step.num} color={step.accent} />
      </div>

      {/* Step Title (Clean & Authoritative, Zero Arrows) */}
      <h3 className="staggered-card-title">{step.title}</h3>

      {/* Step Description (Strictly 100% Preserved) */}
      <p className="staggered-card-desc">{step.desc}</p>

      {/* Bottom Footer: Execution Markers */}
      <div className="staggered-card-footer">
        <div className="staggered-card-specs" aria-label="Key focus areas">
          {step.specs.map((spec, i) => (
            <span key={i} className="staggered-spec-tag">
              <span className="spec-dot" style={{ backgroundColor: step.accent }} />
              <span className="spec-label">{spec}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OurProcess() {
  const sectionRef = useRef(null);
  const headingH2Ref = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const setCardRef = (i) => (el) => {
    cardsRef.current[i] = el;
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* ── 1a. Main heading character reveal ────────────────────────── */
      const h2Chars = headingH2Ref.current
        ? Array.from(headingH2Ref.current.querySelectorAll('.reveal-char'))
        : [];

      if (h2Chars.length > 0) {
        gsap.fromTo(
          h2Chars,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.018,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headingH2Ref.current,
              start: 'top 88%',
              end: 'bottom 55%',
              scrub: 0.5,
            },
          }
        );
      }

      /* ── 1b. Subheading character reveal ──────────────────────────── */
      const charEls = headingRef.current
        ? Array.from(headingRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (charEls.length > 0) {
        gsap.fromTo(
          charEls,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.012,
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

      /* ── 2. Staggered Cards Entrance Animation ────────────────────── */
      const cards = cardsRef.current.filter(Boolean);
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 36,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: i % 2 === 1 ? 0.12 : 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split steps into 2 columns for staggered zigzag positioning:
  // Column 1: Step 01 (index 0) and Step 03 (index 2)
  // Column 2 (Offset down): Step 02 (index 1) and Step 04 (index 3)
  const col1Steps = [processSteps[0], processSteps[2]];
  const col2Steps = [processSteps[1], processSteps[3]];

  return (
    <section className="section-our-process" id="process" ref={sectionRef}>
      {/* Ambient background volumetric glow */}
      <div className="process-ambient-glow" aria-hidden="true" />

      <div className="process-container">
        {/* ── Eyebrow Badge ──────────────────────────────────────────── */}
        <div className="process-eyebrow-container">
          <div className="process-eyebrow-badge">
            <span className="process-eyebrow-text">OUR PROCESS</span>
            <span className="process-eyebrow-divider" aria-hidden="true" />
            <span className="process-eyebrow-sequence" aria-hidden="true">
              <span className="seq-dot s-1" />
              <span className="seq-dot s-2" />
              <span className="seq-dot s-3" />
              <span className="seq-dot s-4" />
            </span>
          </div>
        </div>

        {/* ── Main Heading with character scroll reveal ──────────────── */}
        <h2 className="process-heading" ref={headingH2Ref}>
          {'A Process Built Around Reality.'.split(' ').map((word, wordIdx, arr) => (
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

        {/* ── Subheading with character reveal ──────────────────────────── */}
        <p className="process-subheading" ref={headingRef}>
          {headingLines.map((line, lineIdx) => (
            <span key={lineIdx} className="subheading-line">
              {line.split(' ').map((word, wordIdx, arr) => (
                <span key={wordIdx} className="reveal-word">
                  {word.split('').map((char, charIdx) => (
                    <span key={charIdx} className="reveal-char">
                      {char}
                    </span>
                  ))}
                  {wordIdx < arr.length - 1 && <span className="reveal-space">&nbsp;</span>}
                </span>
              ))}
            </span>
          ))}
        </p>

        {/* ── 2-Column Staggered Zigzag Grid (Halo Lab Style Position) ── */}
        <div className="staggered-zigzag-grid">
          {/* Column 1: Card 01 & Card 03 */}
          <div className="staggered-col staggered-col-left">
            {col1Steps.map((step, idx) => (
              <div
                key={step.num}
                ref={setCardRef(idx * 2)}
                className={`process-card-slot slot-${step.num}`}
              >
                <StaggeredProcessCard step={step} />
              </div>
            ))}
          </div>

          {/* Column 2: Card 02 & Card 04 (Offset vertically) */}
          <div className="staggered-col staggered-col-right">
            {col2Steps.map((step, idx) => (
              <div
                key={step.num}
                ref={setCardRef(idx * 2 + 1)}
                className={`process-card-slot slot-${step.num}`}
              >
                <StaggeredProcessCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
