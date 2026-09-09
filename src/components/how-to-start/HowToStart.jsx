import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/button';
import './how-to-start.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Continuous Decision Path Stages (Editorial Flow, Zero Cards) ────────── */
/* ── Exact Reference Stages Data (01 SEE, 02 UNDERSTAND, 03 DECIDE) ───────── */
const stagesData = [
  {
    num: '01',
    phase: 'SEE',
    title: "Start with what's real.",
    items: [
      'A problem.',
      'An idea.',
      'A process that has become painful.',
      'A system that no longer fits.',
    ],
    punchline: "You don't need to explain it perfectly. Just show us what's happening.",
    accent: '#A0BBFF',
    accentLight: '#A0BBFF',
    iconBgLight: 'rgba(160, 187, 255, 0.16)',
    iconBgDark: 'rgba(160, 187, 255, 0.14)',
  },
  {
    num: '02',
    phase: 'UNDERSTAND',
    title: "Find what's actually worth solving.",
    items: [
      'Audit the workflow.',
      'Isolate the root cause.',
      'Quantify the cost of inaction.',
      'Find where technology creates measurable leverage.',
    ],
    punchline: 'No solution before the problem is understood.',
    accent: '#CF6733',
    accentLight: '#CF6733',
    iconBgLight: 'rgba(207, 103, 51, 0.12)',
    iconBgDark: 'rgba(207, 103, 51, 0.15)',
  },
  {
    num: '03',
    phase: 'DECIDE',
    title: "Choose the right next move.",
    commitments: [
      'Sometimes that means building something new.',
      'Sometimes it means fixing what already exists.',
      "If it's not the right lever, we say so — even if it costs us the sale.",
    ],
    punchline: 'The recommendation comes before the proposal.',
    accent: '#B4696A',
    accentLight: '#B4696A',
    iconBgLight: 'rgba(180, 105, 106, 0.12)',
    iconBgDark: 'rgba(180, 105, 106, 0.15)',
  },
];

/* ── Stage Concept Icons (Architectural Dual-Tone Precision Vectors) ──────── */
function StageIcon({ stepNum }) {
  if (stepNum === '01') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Outer Vision Contour */}
        <path
          d="M2.5 12C4.2 7.8 8 5 12 5C16 5 19.8 7.8 21.5 12C19.8 16.2 16 19 12 19C8 19 4.2 16.2 2.5 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Luminous Iris Ring */}
        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.7"
          fill="currentColor"
          fillOpacity="0.16"
        />
        {/* Central Precision Focal Aperture */}
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  if (stepNum === '02') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* Top Active Architectural Plane */}
        <path
          d="M12 2.5L2.5 7.2L12 12L21.5 7.2L12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.18"
        />
        {/* Exploded Audit Layer 2 */}
        <path
          d="M2.5 12.2L12 17L21.5 12.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Foundational Stack Layer 3 */}
        <path
          d="M2.5 17.2L12 22L21.5 17.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Apex Coordinate Jewel */}
        <circle cx="12" cy="7.2" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Precision Calibration Track */}
      <circle
        cx="12"
        cy="12"
        r="9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="1.8 2.6"
        opacity="0.55"
      />
      {/* Dynamic Directional Arc */}
      <circle
        cx="12"
        cy="12"
        r="9.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeDasharray="16 42"
        strokeLinecap="round"
      />
      {/* Kinetic Decision Trajectory */}
      <path
        d="M7.5 16.5L16.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 7.5H16.5V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Origin Decision Node */}
      <circle cx="7.5" cy="16.5" r="2" fill="currentColor" />
    </svg>
  );
}

const renderRevealText = (text) =>
  text.split(' ').map((word, wordIdx, arr) => (
    <span key={wordIdx} className="reveal-word">
      {word.split('').map((char, charIdx) => (
        <span key={charIdx} className="reveal-char">
          {char}
        </span>
      ))}
      {wordIdx < arr.length - 1 && <span className="reveal-space">&nbsp;</span>}
    </span>
  ));

export default function HowToStart({ onOpenModal }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const pathRef = useRef(null);
  const trustRef = useRef(null);
  const ctaRef = useRef(null);

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

      // 2. Supporting Lead Character Scrub Reveal (Exact same continuous standard as headline)
      const leadChars = leadRef.current
        ? Array.from(leadRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (leadChars.length > 0) {
        gsap.fromTo(
          leadChars,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.008,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: leadRef.current,
              start: 'top 88%',
              end: 'bottom 58%',
              scrub: 0.4,
            },
          }
        );
      }

      // 3. Decision Path Sequential Entrance
      if (pathRef.current) {
        const stages = pathRef.current.querySelectorAll('.path-stage-card-wrap');
        gsap.fromTo(
          stages,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pathRef.current,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 4. Trust Statement Monumental Reveal
      if (trustRef.current) {
        const trustLines = trustRef.current.querySelectorAll('.trust-line');
        const stream = trustRef.current.querySelector('.trust-horizon-stream');

        if (stream) {
          gsap.fromTo(
            stream,
            { opacity: 0, scaleX: 0.95 },
            {
              opacity: 1,
              scaleX: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: trustRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        gsap.fromTo(
          trustLines,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trustRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. CTA Section Entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
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

  const handleCtaClick = () => {
    if (typeof onOpenModal === 'function') {
      onOpenModal();
    }
  };

  return (
    <section className="section-how-to-start" id="how-to-start" ref={sectionRef}>
      {/* Volumetric serene ambient background glow */}
      <div className="start-ambient-glow" aria-hidden="true" />

      <div className="start-container">
        {/* ── Eyebrow Badge (Website Theme Continuous Standard) ────────── */}
        <div className="start-eyebrow-container">
          <div className="start-eyebrow-badge">
            <span className="start-eyebrow-text">HOW TO START</span>
            <span className="start-eyebrow-divider" aria-hidden="true" />
            <span className="start-eyebrow-sequence" aria-hidden="true">
              <span className="seq-dot s-1" />
              <span className="seq-dot s-2" />
              <span className="seq-dot s-3" />
              <span className="seq-dot s-4" />
            </span>
          </div>
        </div>

        {/* ── Hero Positioning Header ─────────────────────────────────── */}
        <div className="start-hero-header">
          <h2 className="start-headline" ref={headlineRef}>
            {renderRevealText("Bring Us the Problem. We'll Find the Opportunity.")}
          </h2>

          <p className="start-lead-context" ref={leadRef}>
            {renderRevealText(
              "You don't need a finished brief, a technical specification, or even the right answer yet. Tell us what's not working, what's changing, or what you're trying to achieve."
            )}
          </p>
        </div>

        {/* ── Exact Reference 3-Card Decision Path (01 SEE, 02 UNDERSTAND, 03 DECIDE) ── */}
        <div className="start-decision-path-wrapper" ref={pathRef} aria-label="Decision Path">
          <div className="path-stages-flow">
            {/* ── Card 01: SEE ── */}
            <div className="path-stage-card-wrap">
              <article className="path-stage-node stage-node-01" style={{ '--stage-accent': stagesData[0].accent }}>
                <div className="stage-header">
                  <div className="stage-icon-badge icon-badge-01" aria-hidden="true">
                    <StageIcon stepNum="01" />
                  </div>
                  <div className="stage-meta-col">
                    <span className="stage-num-badge">{stagesData[0].num}</span>
                    <span className="stage-phase-tag">{stagesData[0].phase}</span>
                  </div>
                </div>

                <h3 className="stage-title">{stagesData[0].title}</h3>

                <ul className="stage-items-list">
                  {stagesData[0].items.map((item, i) => (
                    <li key={i} className="stage-item-row">
                      <span className="stage-bullet-dot dot-blue" aria-hidden="true" />
                      <span className="item-text">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="stage-punchline-wrap">
                  <span className="punchline-accent-bar bar-blue" aria-hidden="true" />
                  <span className="stage-punchline-text">{stagesData[0].punchline}</span>
                </div>
              </article>
            </div>

            {/* ── Conduit Connector 1 -> 2 (LOOK CLOSER) ── */}
            <div className="path-stage-connector connector-1-2" aria-hidden="true">
              <span className="connector-tag">LOOK CLOSER</span>
              <div className="connector-conduit">
                <span className="conduit-line" />
                <span className="conduit-dot dot-orange" />
              </div>
            </div>

            {/* ── Card 02: UNDERSTAND ── */}
            <div className="path-stage-card-wrap">
              <article className="path-stage-node stage-node-02" style={{ '--stage-accent': stagesData[1].accent }}>
                <div className="stage-header">
                  <div className="stage-icon-badge icon-badge-02" aria-hidden="true">
                    <StageIcon stepNum="02" />
                  </div>
                  <div className="stage-meta-col">
                    <span className="stage-num-badge">{stagesData[1].num}</span>
                    <span className="stage-phase-tag">{stagesData[1].phase}</span>
                  </div>
                </div>

                <h3 className="stage-title">{stagesData[1].title}</h3>

                <ul className="stage-items-list">
                  {stagesData[1].items.map((item, i) => (
                    <li key={i} className="stage-item-row">
                      <span className="stage-bullet-dot dot-orange" aria-hidden="true" />
                      <span className="item-text">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="stage-punchline-wrap">
                  <span className="punchline-accent-bar bar-orange" aria-hidden="true" />
                  <span className="stage-punchline-text">{stagesData[1].punchline}</span>
                </div>
              </article>
            </div>

            {/* ── Conduit Connector 2 -> 3 (NOW DECIDE) ── */}
            <div className="path-stage-connector connector-2-3" aria-hidden="true">
              <span className="connector-tag">NOW DECIDE</span>
              <div className="connector-conduit">
                <span className="conduit-line" />
                <span className="conduit-dot dot-rose" />
              </div>
            </div>

            {/* ── Card 03: DECIDE ── */}
            <div className="path-stage-card-wrap">
              <article className="path-stage-node stage-node-03" style={{ '--stage-accent': stagesData[2].accent }}>
                <div className="stage-header">
                  <div className="stage-icon-badge icon-badge-03" aria-hidden="true">
                    <StageIcon stepNum="03" />
                  </div>
                  <div className="stage-meta-col">
                    <span className="stage-num-badge">{stagesData[2].num}</span>
                    <span className="stage-phase-tag">{stagesData[2].phase}</span>
                  </div>
                </div>

                <h3 className="stage-title">{stagesData[2].title}</h3>

                <ul className="stage-items-list">
                  {stagesData[2].commitments.map((cmt, i) => (
                    <li key={i} className="stage-item-row">
                      <span className="stage-bullet-dot dot-rose" aria-hidden="true" />
                      <span className="item-text">{cmt}</span>
                    </li>
                  ))}
                </ul>

                <div className="stage-punchline-wrap">
                  <span className="punchline-accent-bar bar-rose" aria-hidden="true" />
                  <span className="stage-punchline-text">{stagesData[2].punchline}</span>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* ── Exact Reference Outcomes Strip (Directly Beneath Cards) ── */}
        <div className="start-outcomes-strip-wrapper" aria-label="Commercial Outcomes">
          <span className="strip-flank-line" aria-hidden="true" />
          <div className="start-outcomes-strip">
            {/* Outcome 1: 14-21 Days */}
            <div className="outcome-item">
              <div className="outcome-icon-circle icon-circle-blue" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12.5"
                    r="8.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 7.5V12.5L15 14.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12.5" r="1.3" fill="currentColor" />
                  <path
                    d="M12 1.8V3.6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.8 3.8L17.4 5.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="outcome-text-block">
                <span className="outcome-metric">14–21 Days</span>
                <span className="outcome-caption">TO FIRST PRODUCTION MILESTONE</span>
              </div>
            </div>

            <div className="outcome-divider" aria-hidden="true" />

            {/* Outcome 2: Zero Bloat */}
            <div className="outcome-item">
              <div className="outcome-icon-circle icon-circle-orange" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {/* Top Face Luminous */}
                  <path
                    d="M12 2.5L20 7.2L12 12L4 7.2L12 2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0.22"
                  />
                  {/* Left Face */}
                  <path
                    d="M4 7.2V16.8L12 21.5V12L4 7.2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                    fillOpacity="0.08"
                  />
                  {/* Right Face */}
                  <path
                    d="M20 7.2V16.8L12 21.5V12L20 7.2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="1.3" fill="currentColor" />
                </svg>
              </div>
              <div className="outcome-text-block">
                <span className="outcome-metric">Zero Bloat</span>
                <span className="outcome-caption">ONLY WHAT CREATES VALUE</span>
              </div>
            </div>

            <div className="outcome-divider" aria-hidden="true" />

            {/* Outcome 3: Direct ROI */}
            <div className="outcome-item">
              <div className="outcome-icon-circle icon-circle-rose" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 19.5H21"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                  <path
                    d="M4.5 16L9.5 11L14 14.5L20 6.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 6.5H20V11"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9.5" cy="11" r="1.4" fill="currentColor" />
                  <circle cx="14" cy="14.5" r="1.4" fill="currentColor" />
                  <circle cx="20" cy="6.5" r="1.8" fill="currentColor" />
                </svg>
              </div>
              <div className="outcome-text-block">
                <span className="outcome-metric">Direct ROI</span>
                <span className="outcome-caption">FOCUS ON REAL BUSINESS IMPACT</span>
              </div>
            </div>
          </div>
          <span className="strip-flank-line" aria-hidden="true" />
        </div>

        {/* ── The Big Trust Manifesto (Executive Standard Reference) ── */}
        <div className="start-trust-manifesto" ref={trustRef}>
          <div className="trust-pedestal-box">
            {/* Luminous Top Light Rail Accent */}
            <div className="trust-top-rail" aria-hidden="true" />

            {/* Architectural Eyebrow Pill */}
            <div className="trust-tag-wrap">
              <span className="trust-filament" aria-hidden="true" />
              <span className="trust-tag">SHRIYU STANDARD</span>
            </div>

            <div className="trust-statements-block">
              {/* Symmetrical Precision Horizon Conduits (Aligned behind Line 2) */}
              <div className="trust-horizon-stream" aria-hidden="true">
                <div className="stream-flank stream-flank-left">
                  <svg className="stream-vectors-svg" viewBox="0 0 120 20" fill="none" preserveAspectRatio="none">
                    <line x1="0" y1="10" x2="112" y2="10" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                    <line x1="16" y1="4" x2="88" y2="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="3 4" />
                    <line x1="16" y1="16" x2="88" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="3 4" />
                    <circle cx="112" cy="10" r="2.2" fill="currentColor" />
                  </svg>
                </div>

                <div className="stream-flank stream-flank-right">
                  <svg className="stream-vectors-svg" viewBox="0 0 120 20" fill="none" preserveAspectRatio="none">
                    <circle cx="8" cy="10" r="2.2" fill="currentColor" />
                    <line x1="8" y1="10" x2="120" y2="10" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
                    <line x1="32" y1="4" x2="104" y2="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="3 4" />
                    <line x1="32" y1="16" x2="104" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.22" strokeDasharray="3 4" />
                  </svg>
                </div>
              </div>

              <div className="trust-statements">
                <h3 className="trust-line trust-line-bold">No forced package.</h3>
                <h3 className="trust-line trust-line-blue">No unnecessary build.</h3>
                <h3 className="trust-line trust-line-light">No technology for technology's sake.</h3>
              </div>
            </div>

            <p className="trust-subline">
              Just a clear conversation about what could make the business work better.
            </p>
          </div>
        </div>

        {/* ── The Permission-Based Call to Action ──────────────────────── */}
        <div className="start-action-section" ref={ctaRef}>
          <Button
            variant="primary"
            onClick={handleCtaClick}
            aria-label="Start With a Conversation"
          >
            Start With a Conversation
          </Button>

          <p className="cta-permission-note">Tell us what you're working through.</p>
        </div>
      </div>
    </section>
  );
}
