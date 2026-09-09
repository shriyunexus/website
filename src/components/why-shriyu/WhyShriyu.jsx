import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './why-shriyu.css';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    num: '01',
    pillar: 'ECONOMICS',
    accent: '#A0BBFF',
    accentLight: '#3b5cb8',
    glowDark: 'rgba(160, 187, 255, 0.09)',
    glowLight: 'rgba(59, 92, 184, 0.07)',
    title: "Before technology, there's a business to understand.",
    body: "We study the workflow, the people, and the real cost of doing things today — before deciding anything deserves to be built.",
    image: '/assets/why-shiryu/economics.png',
  },
  {
    num: '02',
    pillar: 'SIMPLIFICATION',
    accent: '#CF6733',
    accentLight: '#C05621',
    glowDark: 'rgba(207, 103, 51, 0.09)',
    glowLight: 'rgba(192, 86, 33, 0.07)',
    title: "More software doesn't mean a better business.",
    body: "We strip out unnecessary steps before adding new ones, and automate only where automation truly earns its place.",
    image: '/assets/why-shiryu/simplification.png',
  },
  {
    num: '03',
    pillar: 'ADOPTION',
    accent: '#B4696A',
    accentLight: '#9B4D58',
    glowDark: 'rgba(180, 105, 106, 0.09)',
    glowLight: 'rgba(155, 77, 88, 0.07)',
    title: "A technically correct system still fails without real buy-in.",
    body: "We design around real workflows and real users — not the idealized version of how the business runs on paper.",
    image: '/assets/why-shiryu/adoption.png',
  },
];

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

export default function WhyShriyu() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const gridRef = useRef(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Headline Character Scrub Reveal (Website Continuous Standard)
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
              end: 'bottom 58%',
              scrub: 0.4,
            },
          }
        );
      }

      // 2. Supporting Subhead Character Scrub Reveal (Exact same continuous standard as headline)
      const subheadChars = subheadRef.current
        ? Array.from(subheadRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (subheadChars.length > 0) {
        gsap.fromTo(
          subheadChars,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.008,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: subheadRef.current,
              start: 'top 88%',
              end: 'bottom 60%',
              scrub: 0.4,
            },
          }
        );
      }

      // 3. Staggered column entrance
      if (gridRef.current) {
        const cols = gridRef.current.querySelectorAll('.why-column');
        gsap.fromTo(
          cols,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. Grounded anchor statement entrance
      if (anchorRef.current) {
        gsap.fromTo(
          anchorRef.current,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: anchorRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-why-shriyu" id="why-shriyu" ref={sectionRef}>
      <div className="why-container">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="why-header" ref={headerRef}>
          {/* Eyebrow Badge (Website Theme Continuous Standard) */}
          <div className="why-eyebrow-container">
            <div className="why-eyebrow-badge">
              <span className="why-eyebrow-text">WHY SHRIYU</span>
              <span className="why-eyebrow-divider" aria-hidden="true" />
              <span className="why-eyebrow-sequence" aria-hidden="true">
                <span className="seq-dot s-1" />
                <span className="seq-dot s-2" />
                <span className="seq-dot s-3" />
                <span className="seq-dot s-4" />
              </span>
            </div>
          </div>

          <h2 className="why-headline" ref={headlineRef}>
            <span className="why-headline-line">
              {renderRevealText("We Don't Build More.")}
            </span>
            <span className="why-headline-line">
              {renderRevealText("We Build What Matters.")}
            </span>
          </h2>

          <p className="why-subhead" ref={subheadRef}>
            {renderRevealText(
              "The most expensive software isn't always the most complex. Sometimes, it's the software your business never needed in the first place."
            )}
          </p>
        </div>

        {/* ── 3-Column Illustrated Row (Executive Methodology Cards) ── */}
        <div className="why-triptych-grid" ref={gridRef} role="list">
          {principles.map((p) => {
            return (
              <article
                key={p.num}
                className="why-column"
                style={{
                  '--pillar-accent': p.accent,
                  '--pillar-accent-light': p.accentLight,
                  '--pillar-glow-dark': p.glowDark,
                  '--pillar-glow-light': p.glowLight,
                }}
                role="listitem"
              >
                {/* Specular Light Rim (Lights up smoothly on hover) */}
                <div className="why-card-rim" aria-hidden="true" />

                {/* Ambient Depth Glow (Smoothly blooms on hover) */}
                <div className="why-card-ambient" aria-hidden="true" />

                {/* Card Header: Clean Minimalist Step & Pillar Pill */}
                <div className="why-card-header">
                  <div className="why-card-pill">
                    <span className="why-card-pill-num">{p.num}</span>
                    <span className="why-card-pill-sep" aria-hidden="true">/</span>
                    <span className="why-card-pill-text">{p.pillar}</span>
                  </div>
                </div>

                {/* Visual 3D Illustration Stage */}
                <div className="why-col-visual" aria-hidden="true">
                  <div className="why-visual-backdrop" />
                  <img
                    src={p.image}
                    alt={p.pillar}
                    className="why-col-img"
                    loading="lazy"
                    decoding="async"
                    width={240}
                    height={240}
                  />
                </div>

                {/* Column Content */}
                <div className="why-col-content">
                  <h3 className="why-col-title">{p.title}</h3>
                  <p className="why-col-body">{p.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Grounded Closing Conviction Plaque ───────────────────────── */}
        <div className="why-closing-anchor" ref={anchorRef}>
          <div className="why-conviction-plaque">
            {/* Top Specular Rim */}
            <div className="why-conviction-rim" aria-hidden="true" />

            {/* Ambient Volumetric Glow */}
            <div className="why-conviction-glow" aria-hidden="true" />

            {/* Plaque Header */}
            <div className="why-conviction-header">
              <span className="why-conviction-label">OUR CONVICTION</span>
            </div>

            {/* Quote Body with Typographic Hierarchy */}
            <blockquote className="why-conviction-quote">
              <span className="why-conviction-lead">“Every decision has to earn its place.</span>
              <span className="why-conviction-body">
                {" "}We build around what will actually move the business forward — nothing more.”
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
