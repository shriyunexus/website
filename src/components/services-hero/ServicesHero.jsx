import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './services-hero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   SHRIYU NEXUS — SERVICES PAGE (EXECUTIVE MOTION SYSTEM & PART 1 ARCHITECTURE)
   
   Visual & Motion Continuity with Homepage:
   - Sequence — Hero block (0–3s):
     1. [0.0–0.4s] Skeleton state: empty rounded card fades in on sage-to-blush mesh.
     2. [0.4–0.8s] Background orb resolves behind hero text area (blur softens, gentle scale).
     3. [0.8–1.6s] Eyebrow label fades in alone. H1 reveals word-by-word, blur(6px)→blur(0), 80–120ms stagger.
     4. [1.6–2.4s] Both CTA buttons morph in from compressed capsule shapes with easeOutBack overshoot (~5-8%).
   - Sequence — Services grid assembly (scroll-triggered):
     1. Cards enter in staggered grid-reveal, top-left to bottom-right, ~100ms stagger, 96%→100% scale settle.
     2. Each card's icon appears via rotate-in (–15deg → 0deg, 200ms, easeOut) as card settles.
     3. On hover (desktop): card lifts 4px, shadow deepens, icon does a single subtle rotate/pulse loop.
   - Sequence — Trust/Proof section (scroll-triggered):
     1. Heading resolves blur→sharp.
     2. Proof numbers (150+, 98%, 12) count up from 0 on scroll-into-view, 600–900ms, decelerating into final value.
     3. Three "How We Think" statements fade in sequentially with icon rotate-in.
   - Sequence — Closing CTA ("liftoff" payoff):
     1. Background tint ripples from pink-tone to mint-tone as CTA button morphs in with easeOutBack.
   ───────────────────────────────────────────────────────────────────────────── */

export default function ServicesHero({ onExploreClick }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const proofNum1Ref = useRef(null);
  const proofNum2Ref = useRef(null);
  const proofNum3Ref = useRef(null);
  const closingBoxRef = useRef(null);
  const [phase, setPhase] = useState(1); // 1 = skeleton/init, 2 = orb & horizon resolve, 3 = eyebrow & words, 4 = button morphs, 5 = idle settled

  useEffect(() => {
    // 0–3s Hero choreography timeline matching executive motion sequence
    const t1 = setTimeout(() => setPhase(2), 400);   // [0.4s] Orb resolves behind text, sun dome eases up
    const t2 = setTimeout(() => setPhase(3), 800);   // [0.8s] Eyebrow fades in alone, word-by-word reveal triggers
    const t3 = setTimeout(() => setPhase(4), 1600);  // [1.6s] Both CTA buttons morph in from compressed capsule with easeOutBack (~5-8%)
    const t4 = setTimeout(() => setPhase(5), 2400);  // [2.4s] Full settled interactive state & breathing idle

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Subtle interactive parallax for depth
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let rafId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 26;
      targetY = y * 16;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateParallax = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      hero.style.setProperty('--mouse-px', `${currentX.toFixed(2)}px`);
      hero.style.setProperty('--mouse-py', `${currentY.toFixed(2)}px`);
      hero.style.setProperty('--mouse-char-x', `${(currentX * 0.45).toFixed(2)}px`);
      hero.style.setProperty('--mouse-char-y', `${(currentY * 0.35).toFixed(2)}px`);
      hero.style.setProperty('--mouse-tile-x', `${(currentX * -0.25).toFixed(2)}px`);
      hero.style.setProperty('--mouse-tile-y', `${(currentY * -0.2).toFixed(2)}px`);
      hero.style.setProperty('--mouse-float-x', `${(currentX * 0.65).toFixed(2)}px`);
      hero.style.setProperty('--mouse-float-y', `${(currentY * 0.55).toFixed(2)}px`);

      rafId = requestAnimationFrame(updateParallax);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ScrollTrigger orchestration for Services Grid, Trust & Proof counters, Process, and Closing CTA
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. SERVICES GRID ASSEMBLY (Scroll-triggered per card, staggered settle 96% -> 100%)
      const cards = pageRef.current?.querySelectorAll('.sh-service-item');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.96, y: 22 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1, // ~100ms stagger between cards, top-left to bottom-right
            ease: 'power2.out', // "settle", not a bounce
            scrollTrigger: {
              trigger: '#services-grid',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            onStart: () => {
              // Icon rotate-in (-15deg -> 0deg, 200ms, easeOut) as each card settles
              cards.forEach((card, idx) => {
                const icon = card.querySelector('.sh-svc-icon-badge');
                if (icon) {
                  gsap.fromTo(
                    icon,
                    { rotation: -15, scale: 0.92 },
                    {
                      rotation: 0,
                      scale: 1,
                      duration: 0.2,
                      delay: idx * 0.1 + 0.18,
                      ease: 'power2.out',
                    }
                  );
                }
              });
            },
          }
        );
      }

      // 2. TRUST / PROOF SECTION (Heading blur->sharp, statements sequential, and count-up numbers)
      const trustHeading = pageRef.current?.querySelector('.sh-trust-section .sh-section-title');
      if (trustHeading) {
        gsap.fromTo(
          trustHeading,
          { opacity: 0, filter: 'blur(6px)', y: 16 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sh-trust-section',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const trustCards = pageRef.current?.querySelectorAll('.sh-trust-card');
      if (trustCards && trustCards.length) {
        gsap.fromTo(
          trustCards,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sh-trust-pillars',
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
            onStart: () => {
              trustCards.forEach((tc, idx) => {
                const icon = tc.querySelector('.sh-trust-icon');
                if (icon) {
                  gsap.fromTo(
                    icon,
                    { rotation: -15 },
                    {
                      rotation: 0,
                      duration: 0.2,
                      delay: idx * 0.14 + 0.1,
                      ease: 'power2.out',
                    }
                  );
                }
              });
            },
          }
        );
      }

      // Proof numbers count-up from 0 on scroll-into-view (600–900ms, decelerating into final value)
      const p1 = { val: 0 };
      gsap.to(p1, {
        val: 150,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sh-proof-row',
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (proofNum1Ref.current) {
            proofNum1Ref.current.textContent = `${Math.round(p1.val)}+`;
          }
        },
      });

      const p2 = { val: 0 };
      gsap.to(p2, {
        val: 98,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sh-proof-row',
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (proofNum2Ref.current) {
            proofNum2Ref.current.textContent = `${Math.round(p2.val)}%`;
          }
        },
      });

      const p3 = { val: 0 };
      gsap.to(p3, {
        val: 12,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.sh-proof-row',
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (proofNum3Ref.current) {
            proofNum3Ref.current.textContent = `${Math.round(p3.val)}`;
          }
        },
      });

      // 3. PROCESS SECTION (Sequential timeline steps)
      const processSteps = pageRef.current?.querySelectorAll('.sh-process-step');
      if (processSteps && processSteps.length) {
        gsap.fromTo(
          processSteps,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sh-process-timeline',
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 4. OBJECTION-HANDLING BLOCK
      const objectionCard = pageRef.current?.querySelector('.sh-objection-card');
      if (objectionCard) {
        gsap.fromTo(
          objectionCard,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.sh-objection-card',
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. CLOSING CTA BLOCK ("liftoff" payoff, pink-to-mint color ripple + easeOutBack morph button)
      const closingBox = closingBoxRef.current;
      const closingBtn = pageRef.current?.querySelector('.sh-btn-closing');
      if (closingBox) {
        ScrollTrigger.create({
          trigger: closingBox,
          start: 'top 82%',
          toggleActions: 'play none none none',
          onEnter: () => {
            closingBox.classList.add('sh-closing-active');
            if (closingBtn) {
              gsap.fromTo(
                closingBtn,
                { scaleX: 0.65, scaleY: 0.35, y: 16, opacity: 0, filter: 'blur(4px)' },
                {
                  scaleX: 1,
                  scaleY: 1,
                  y: 0,
                  opacity: 1,
                  filter: 'blur(0px)',
                  duration: 0.72,
                  ease: 'back.out(1.5)', // ~5-8% overshoot identical to homepage buttons
                  delay: 0.25,
                }
              );
            }
          },
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleConsultation = () => {
    if (typeof onExploreClick === 'function') {
      onExploreClick();
    } else {
      window.history.pushState(null, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleScrollToGrid = () => {
    const target = document.getElementById('services-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sh-services-page" ref={pageRef}>
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO BLOCK (1:1 REFERENCE DESIGN + EXECUTIVE MOTION)
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className={`sh-hero sh-phase-${phase}`}
        aria-label="How We Serve Your Business"
      >
        {/* Ambient Canvas Backdrop Wash */}
        <div className="sh-hero-canvas-bg" aria-hidden="true" />

        {/* Framed Hero Artboard Card (1:1 Reference Aesthetic) */}
        <div className="sh-hero-artboard">
          {/* Floating Playful Micro-Decorations */}
          <div className="sh-micro-elements" aria-hidden="true">
            {/* Top-Left Hollow Mint/Teal Triangle */}
            <svg className="sh-micro-shape sh-micro-triangle sh-triangle-tl" viewBox="0 0 20 20" fill="none">
              <polygon points="10 2 18 17 2 17" stroke="#134E4A" strokeWidth="2.4" strokeLinejoin="round" />
            </svg>

            {/* Top-Left Soft Blurred Translucent Bubble */}
            <div className="sh-micro-shape sh-micro-orb sh-orb-tl" />

            {/* Top-Center Orange Plus Mark */}
            <span className="sh-micro-shape sh-micro-plus sh-plus-tc">+</span>

            {/* Mid-Left Soft Peach Translucent Bubble */}
            <div className="sh-micro-shape sh-micro-orb sh-orb-ml" />

            {/* Bottom-Left Orange Plus Mark */}
            <span className="sh-micro-shape sh-micro-plus sh-plus-bl">+</span>

            {/* Bottom-Center Hand-drawn Spiral Swirl Squiggle */}
            <svg className="sh-micro-shape sh-micro-squiggle sh-squiggle-bc" viewBox="0 0 36 36" fill="none">
              <path
                d="M 18 18 C 19 14, 25 14, 25 19 C 25 25, 14 26, 13 18 C 12 10, 26 8, 29 17 C 32 26, 17 33, 10 28"
                stroke="#CF6733"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>

            {/* Bottom-Right Hollow Mint/Teal Triangle */}
            <svg className="sh-micro-shape sh-micro-triangle sh-triangle-br" viewBox="0 0 20 20" fill="none">
              <polygon points="10 2 18 17 2 17" stroke="#134E4A" strokeWidth="2.4" strokeLinejoin="round" />
            </svg>

            {/* Top-Right Hand-drawn Curved Arrow Cue */}
            <svg className="sh-micro-shape sh-micro-arrow-cue sh-arrow-tr" viewBox="0 0 32 32" fill="none">
              <path
                d="M 6 8 C 16 4, 24 10, 22 22 M 22 22 L 17 18 M 22 22 L 26 16"
                stroke="#E8A87C"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Bottom-Right Soft Translucent Bubble */}
            <div className="sh-micro-shape sh-micro-orb sh-orb-br" />
          </div>

          {/* 2-Column Hero Grid */}
          <div className="sh-hero-grid">
            {/* Left Column: Psychological Typography & CTA Row */}
            <div className="sh-hero-content">
              {/* Eyebrow Badge Pill */}
              <div className="sh-eyebrow-badge">
                <span className="sh-eyebrow-text">How We Serve Your Business</span>
              </div>

              {/* H1 Headline with Dashed Highlighter Box & Sunburst Accent */}
              <h1 className="sh-hero-headline">
                <span className="sh-headline-line sh-headline-line-1">Software Built To</span>
                <span className="sh-headline-line sh-headline-line-2">
                  <span className="sh-highlight-box">
                    <span className="sh-highlight-text">Move Your Business</span>
                    {/* 4-Ray Vibrant Sunburst / Sparkle Accent */}
                    <svg className="sh-sunburst" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                      <path
                        d="M18 2V8M18 28V34M2 18H8M28 18H34M6.7 6.7L11 11M25 25L29.3 29.3M6.7 29.3L11 25M25 11L29.3 6.7"
                        stroke="#CF6733"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
                <span className="sh-headline-line sh-headline-line-3">Forward Faster</span>
              </h1>

              {/* Subhead with Psychological Risk-Reversal */}
              <p className="sh-hero-subhead">
                No jargon. No guesswork. Just clear thinking, clean execution, and technology that earns its place in your business.
              </p>

              {/* CTA Row: [ Get Consultation ] & [ View Our Services ] */}
              <div className="sh-hero-cta-row">
                <button
                  type="button"
                  className="sh-btn-consultation"
                  onClick={handleConsultation}
                  id="services-btn-consultation"
                >
                  <span>Get Consultation</span>
                </button>

                <button
                  type="button"
                  className="sh-btn-services"
                  onClick={handleScrollToGrid}
                  id="services-btn-view-services"
                >
                  <span className="sh-play-bubble">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </span>
                  <span>View Our Services</span>
                </button>
              </div>

              {/* Scroll Down Playful Hand-Drawn Indicator */}
              <div
                className="sh-scroll-down-cue"
                onClick={handleScrollToGrid}
                role="button"
                tabIndex={0}
                aria-label="Scroll down to services"
              >
                <span className="sh-scroll-cue-text">Scroll Down</span>
                <svg className="sh-scroll-arrow-curved" viewBox="0 0 28 42" fill="none" aria-hidden="true">
                  <path
                    d="M14 4C14 16 22 20 14 32M14 32L8 25M14 32L20 25"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right Column: 3D Geometric Composition & Cutout Figure */}
            <div className="sh-hero-visual-stage" aria-hidden="true">
              {/* Dot Matrix Pattern on the Right Edge */}
              <div className="sh-dot-matrix">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className="sh-dot" />
                ))}
              </div>

              {/* Rounded Backdrop Tile 1: Terracotta / Orange (Top Right) */}
              <div className="sh-geo-tile sh-tile-terracotta" />

              {/* Rounded Backdrop Tile 2: Warm Sand / Gold Peach (Bottom Left) */}
              <div className="sh-geo-tile sh-tile-sand" />

              {/* Rounded Backdrop Tile 3: Deep Teal (Bottom Right) */}
              <div className="sh-geo-tile sh-tile-teal" />

              {/* Interlocking White Ribbon / Tubular Curve */}
              <div className="sh-tubular-track">
                <svg viewBox="0 0 240 240" fill="none" className="sh-tube-svg">
                  <path
                    d="M 50 235 L 50 115 C 50 75, 80 45, 120 45 C 160 45, 190 75, 190 115 L 190 235"
                    stroke="#ffffff"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="sh-tube-path"
                  />
                </svg>
              </div>

              {/* Studio Cutout Figure (Pointing Joyfully to Headline) */}
              <div className="sh-hero-character-wrap">
                <img
                  src="/assets/services/hero_professional.png"
                  alt="Shriyu Nexus solutions specialist"
                  className="sh-hero-character-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. SERVICES GRID (7 PSYCHOLOGICALLY STRUCTURED CARDS)
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="sh-section sh-services-section" id="services-grid">
        <div className="sh-container">
          <div className="sh-section-header">
            <span className="sh-section-eyebrow">WHAT WE DELIVER</span>
            <h2 className="sh-section-title">
              Software Engineered for Measurable Competence
            </h2>
            <p className="sh-section-sub">
              Every service is structured around commercial outcomes, transparent mechanisms, and zero forced templates.
            </p>
          </div>

          <div className="sh-grid-7">
            {SERVICES_7_DATA.map((item, idx) => (
              <div
                key={item.id}
                className={`sh-service-item sh-service-item--${idx + 1}`}
                onClick={handleConsultation}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleConsultation()}
              >
                <div className="sh-svc-top">
                  <div className="sh-svc-idx">{item.num}</div>
                  <div className="sh-svc-icon-badge">{item.icon}</div>
                </div>

                <div className="sh-svc-body">
                  <h3 className="sh-svc-title">{item.title}</h3>
                  <p className="sh-svc-mechanism">{item.mechanism}</p>
                </div>

                <div className="sh-svc-footer">
                  <span className="sh-svc-tag">{item.microProof}</span>
                  <span className="sh-svc-arrow-action" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. TRUST SECTION — "HOW WE THINK"
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="sh-section sh-trust-section">
        <div className="sh-container">
          <div className="sh-section-header">
            <span className="sh-section-eyebrow">HOW WE THINK</span>
            <h2 className="sh-section-title">
              Why Businesses Trust Us With Their Technology
            </h2>
            <p className="sh-section-sub">
              Trust isn't declared in a pitch deck; it's confirmed through direct transparency, aligned commercial incentives, and continuous accountability.
            </p>
          </div>

          {/* 3 Core Trust Pillars */}
          <div className="sh-trust-pillars">
            <div className="sh-trust-card">
              <div className="sh-trust-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="sh-trust-headline">We Speak Plainly</h3>
              <p className="sh-trust-body">
                No inflated timelines, no technical smoke. You'll know what's happening and why, every single step of the engagement.
              </p>
            </div>

            <div className="sh-trust-card">
              <div className="sh-trust-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="sh-trust-headline">We Build for Outcomes, Not Hours</h3>
              <p className="sh-trust-body">
                Our success is measured by what your business gains — not how many hours we bill. Your commercial upside is our only KPI.
              </p>
            </div>

            <div className="sh-trust-card">
              <div className="sh-trust-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="sh-trust-headline">We Stay Accountable After Launch</h3>
              <p className="sh-trust-body">
                You'll have direct access to the exact engineers who built your system — not a detached support queue or ticket purgatory.
              </p>
            </div>
          </div>

          {/* Proof Row (The Specificity Effect - GSAP Count-Up Tweens) */}
          <div className="sh-proof-row">
            <div className="sh-proof-box">
              <span className="sh-proof-num" ref={proofNum1Ref}>0</span>
              <span className="sh-proof-lbl">Projects Delivered</span>
            </div>
            <div className="sh-proof-divider" />
            <div className="sh-proof-box">
              <span className="sh-proof-num" ref={proofNum2Ref}>0</span>
              <span className="sh-proof-lbl">Client Retention</span>
            </div>
            <div className="sh-proof-divider" />
            <div className="sh-proof-box">
              <span className="sh-proof-num" ref={proofNum3Ref}>0</span>
              <span className="sh-proof-lbl">Industries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. PROCESS SECTION — "HOW WE WORK TOGETHER"
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="sh-section sh-process-section">
        <div className="sh-container">
          <div className="sh-section-header">
            <span className="sh-section-eyebrow">HOW WE WORK TOGETHER</span>
            <h2 className="sh-section-title">
              A Defined, Transparent Operating System
            </h2>
            <p className="sh-section-sub">
              People trust systems more than promises. Here is exactly how we take ideas from discovery to measurable production scale.
            </p>
          </div>

          <div className="sh-process-timeline">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="sh-process-step">
                <div className="sh-process-badge">{step.step}</div>
                <h3 className="sh-process-name">{step.title}</h3>
                <p className="sh-process-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. OBJECTION-HANDLING BLOCK
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="sh-section sh-objection-section">
        <div className="sh-container">
          <div className="sh-objection-card">
            <div className="sh-objection-tag">
              <span className="sh-tag-dot" />
              <span>RISK REVERSAL GUARANTEE</span>
            </div>

            <h3 className="sh-objection-question">
              "What if it doesn't work out?"
            </h3>

            <p className="sh-objection-answer">
              Every engagement starts with a scoped consultation — not a long-term commitment. You'll see how we work before you decide how far to go.
            </p>

            <div className="sh-objection-benefits">
              <div className="sh-benefit-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Zero vendor lock-in; complete code ownership</span>
              </div>
              <div className="sh-benefit-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Direct partner access from day one</span>
              </div>
              <div className="sh-benefit-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Transparent fixed milestones & weekly demos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. CLOSING CTA BLOCK ("liftoff" payoff, pink-to-mint color ripple)
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="sh-section sh-closing-cta-section">
        <div className="sh-container">
          <div className="sh-closing-box" ref={closingBoxRef}>
            <div className="sh-closing-color-ripple" aria-hidden="true" />
            <h2 className="sh-closing-title">
              Let's Build Something Your Business Can Depend On
            </h2>
            <p className="sh-closing-sub">
              Start with a conversation. No pressure, no obligation — just clarity on what's possible.
            </p>
            <div className="sh-closing-action">
              <button
                type="button"
                className="sh-btn-closing"
                onClick={handleConsultation}
                id="services-closing-cta"
              >
                <span>Get Consultation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── DATA DEFINITIONS ─────────────────────────────────────────────────────── */

const SERVICES_7_DATA = [
  {
    id: 'custom-software',
    num: '01',
    title: 'Custom Software Development',
    mechanism: 'Software shaped around how your business runs — not the other way around. Built for your workflow, your data, your customers.',
    microProof: 'No forced templates.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'web-app-dev',
    num: '02',
    title: 'Web & App Development',
    mechanism: 'Digital experiences that convert visitors into customers, and customers into repeat business. Fast load times, clean interfaces.',
    microProof: 'Measurable conversion results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'ui-ux-design',
    num: '03',
    title: 'UI/UX Design',
    mechanism: 'Design your customers trust the moment they see it. Every interaction mapped to reduce friction and build confidence.',
    microProof: 'Frictionless interaction architecture.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
      </svg>
    ),
  },
  {
    id: 'cloud-devops',
    num: '04',
    title: 'Cloud & DevOps',
    mechanism: 'Infrastructure that scales quietly in the background — so growth never becomes downtime. Zero-downtime reliability.',
    microProof: 'Monitored, secure & cost-predictable.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    id: 'ai-automation',
    num: '05',
    title: 'AI & Automation Solutions',
    mechanism: "We remove the manual work that's quietly costing you hours every week. Automation applied where it creates real, measurable value.",
    microProof: 'Value-first, not hype-first.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 'it-consulting',
    num: '06',
    title: 'IT Consulting & Digital Transformation',
    mechanism: 'A clear technology roadmap, built around where your business is actually headed. Objective assessment first.',
    microProof: 'Recommendations second. Never reversed.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    id: 'ongoing-support',
    num: '07',
    title: 'Ongoing Support & Maintenance',
    mechanism: 'Your systems, watched and improved — long after launch day. Proactive monitoring, patching, performance tuning, and scaling.',
    microProof: 'Because "done" isn\'t a real state for software.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand',
    desc: 'We study your business before proposing anything. Workflow audits, data models, and commercial constraints.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'You see the full plan before we write a line of code. Interactive wireframes, technical specs, and cost models.',
  },
  {
    step: '03',
    title: 'Build',
    desc: 'Development in visible, trackable stages. Weekly working software demos. No black boxes.',
  },
  {
    step: '04',
    title: 'Launch',
    desc: 'Shipped with automated monitoring, redundancy, and zero-downtime cutover built in from day one.',
  },
  {
    step: '05',
    title: 'Grow',
    desc: 'We stay engaged as your business scales. Post-launch enhancements, telemetry analysis, and performance tuning.',
  },
];
