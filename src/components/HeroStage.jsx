/**
 * HeroStage — Cinematic Edition v2
 * ----------------------------------
 * Every floating element now has its OWN unique scroll-driven motion path.
 * No two elements behave the same — each exits the frame as if pushed by
 * a different force from the camera push-through.
 *
 * Element cinematic paths (at 0.01% senior designer level):
 *
 *  pulseCircle   → rises UP-LEFT, rotates -12deg, scale fades small  (bubble pop)
 *  statCard      → exits LEFT, drops slightly, rotates -8deg          (card swept away)
 *  doodleArrow   → falls DOWN, rotates +18deg, fades first            (lightly floats off)
 *  widgetCard    → exits LEFT-DOWN, rotates -5deg, scale 0.88         (heavy slide out)
 *  installsCard  → rises UP-RIGHT, tilts +7deg                        (floats up-out)
 *  percentCircle → pushes RIGHT, scales up 1.08 then fades            (zooms past camera)
 *  featuresPill  → fast RIGHT exit, slight upward drift               (flicks away)
 *  bookCall      → drops DOWN-RIGHT, rotates +4deg                    (gravity fall)
 *
 * Video wrapper (DashboardMockup):
 *  - Progressive sinusoidal blur during compression+expansion phases
 *  - Brightness dip at peak transformation
 *  - Inner vignette intensifies as card expands
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShowcaseMockup from './ShowcaseMockup';
import AIRobotCompanion from './AIRobotCompanion';

gsap.registerPlugin(ScrollTrigger);

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ─── Cinematic Transition Layer ────────────────────────────────────────── */
function CinematicTransitionLayer({ progress }) {
  const rawOpacity = Math.min(
    Math.max(0, (progress - 0.52) * 10),
    Math.max(0, 1 - (progress - 0.72) * 10),
  );
  const layerOpacity = clamp(rawOpacity, 0, 1);
  if (layerOpacity === 0) return null;

  return (
    <div className="cinematic-transition-layer" style={{ opacity: layerOpacity }} aria-hidden="true">
      <svg className="ctl-grid-svg" viewBox="0 0 1800 1040" fill="none" preserveAspectRatio="xMidYMid slice">
        {[130, 260, 390, 520, 650, 780, 910].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1800" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {[200, 400, 600, 800, 1000, 1200, 1400, 1600].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="1040" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        <line x1="400" y1="200" x2="1400" y2="840" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="8 20" />
        <line x1="600" y1="520" x2="1200" y2="520" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 12" />
      </svg>
      <div className="ctl-data-point" style={{ left: '38%', top: '42%', transform: `translate(${(progress - 0.62) * -80}px, ${(progress - 0.62) * -40}px)` }} />
      <div className="ctl-data-point ctl-dp-dim" style={{ left: '62%', top: '55%', transform: `translate(${(progress - 0.62) * 60}px, ${(progress - 0.62) * 30}px)` }} />
      <div className="ctl-data-point ctl-dp-dim" style={{ left: '50%', top: '28%', transform: `translate(${(progress - 0.62) * 20}px, ${(progress - 0.62) * -60}px)` }} />
    </div>
  );
}

/* ─── HeroStage ─────────────────────────────────────────────────────────── */
export default function HeroStage({ onOpenModal }) {
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const outerRef = useRef(null);
  const stageRef = useRef(null);
  const glowRef = useRef(null);
  const heroContentRef = useRef(null);

  // Named individual refs — each element gets its own unique cinematic path
  const pulseCircleRef = useRef(null);
  const leftOrbRef = useRef(null);
  const rightOrbRef = useRef(null);
  const statCardRef = useRef(null);
  const doodleArrowRef = useRef(null);
  const widgetCardRef = useRef(null);
  const installsCardRef = useRef(null);
  const percentCircRef = useRef(null);
  const featuresPillRef = useRef(null);
  const bookCallRef = useRef(null);

  const scrollProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [rocketBoost, setRocketBoost] = useState(false);
  const [widgetResult, setWidgetResult] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState(3);

  /* ── Responsive stage scaling ────────────────────────────────────────── */
  useEffect(() => {
    function fitStage() {
      if (!outerRef.current || !stageRef.current) return;
      const width = outerRef.current.clientWidth || window.innerWidth;
      const scale = Math.min(1, width / 1800);
      stageRef.current.style.transform = `scale(${scale})`;
      
      const baseH = 1040 * scale;
      const minH = window.innerWidth <= 767 ? 560 : window.innerWidth <= 1024 ? 680 : 0;
      outerRef.current.style.height = `${Math.max(minH, baseH)}px`;
    }
    window.addEventListener('resize', fitStage);
    window.addEventListener('load', fitStage);
    fitStage();
    return () => {
      window.removeEventListener('resize', fitStage);
      window.removeEventListener('load', fitStage);
    };
  }, []);

  /* ── Scanning bar micro-animation ───────────────────────────────────── */
  useEffect(() => {
    const id = setInterval(() => setActiveBarIndex((prev) => (prev + 1) % 5), 600);
    return () => clearInterval(id);
  }, []);

  /* ── Centre hero-content on mount (GSAP owns the transform) ─────────── */
  useEffect(() => {
    if (heroContentRef.current) {
      gsap.set(heroContentRef.current, { xPercent: -50, yPercent: -50 });
    }
  }, []);

  /* ── GSAP ScrollTrigger — single context ────────────────────────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;
          setScrollProgress(p);

          /* ── Glow: fully gone by p=0.5 (before expansion starts) ── */
          gsap.set(glowRef.current, {
            opacity: clamp(1 - p * 2.0, 0, 1),
            scale: 1 + p * 0.4,
            overwrite: 'auto',
          });

          /* ── Hero content: rises and fades early ─────────────────── */
          gsap.set(heroContentRef.current, {
            opacity: clamp(1 - p * 5.0, 0, 1),
            xPercent: -50,
            yPercent: -50,
            y: -p * 140,
            overwrite: 'auto',
          });

          /* ────────────────────────────────────────────────────────────
           *  INDIVIDUAL ELEMENT CINEMATIC PATHS
           *  Each element exits with its own unique velocity, rotation,
           *  and scale — creating a parallax depth-of-field feel.
           *  Faster fade = element appears closer to camera.
           * ──────────────────────────────────────────────────────── */

          // 1. Pulse Circle — bubble pop: rises UP-LEFT, shrinks, rotates -12deg
          if (pulseCircleRef.current) {
            gsap.set(pulseCircleRef.current, {
              opacity: clamp(1 - p * 3.0, 0, 1),
              x: -p * 240,
              y: -p * 120,
              rotate: -12 * clamp(p * 4, 0, 1),
              scale: clamp(1 - p * 0.25, 0.5, 1),
              overwrite: 'auto',
            });
          }

          // Ambient Stage Orbs (Option 1) — float outward & fade as video expands
          if (leftOrbRef.current) {
            gsap.set(leftOrbRef.current, {
              opacity: clamp(1 - p * 2.8, 0, 0.85),
              x: -p * 180,
              y: -p * 120,
              scale: clamp(1 - p * 0.25, 0.6, 1),
              overwrite: 'auto',
            });
          }
          if (rightOrbRef.current) {
            gsap.set(rightOrbRef.current, {
              opacity: clamp(1 - p * 2.8, 0, 0.85),
              x: p * 180,
              y: -p * 120,
              scale: clamp(1 - p * 0.25, 0.6, 1),
              overwrite: 'auto',
            });
          }

          // 2. Stat Card (+45% rocket) — swept LEFT with slight CW rotation
          if (statCardRef.current) {
            gsap.set(statCardRef.current, {
              opacity: clamp(1 - p * 2.8, 0, 1),
              x: -p * 190,
              y: p * 35,
              rotate: -8 * clamp(p * 3, 0, 1),
              scale: clamp(1 - p * 0.12, 0.7, 1),
              overwrite: 'auto',
            });
          }

          // 3. Doodle Arrow — floats DOWN-RIGHT, spins naturally, fades fastest
          if (doodleArrowRef.current) {
            gsap.set(doodleArrowRef.current, {
              opacity: clamp(1 - p * 4.5, 0, 1),
              x: p * 80,
              y: p * 90,
              rotate: 18 * clamp(p * 3, 0, 1),
              overwrite: 'auto',
            });
          }

          // 4. Widget Card — heaviest element, slides DOWN-LEFT, slight tilt
          if (widgetCardRef.current) {
            gsap.set(widgetCardRef.current, {
              opacity: clamp(1 - p * 2.4, 0, 1),
              x: -p * 200,
              y: p * 110,
              rotate: -5 * clamp(p * 3, 0, 1),
              scale: clamp(1 - p * 0.10, 0.75, 1),
              overwrite: 'auto',
            });
          }

          // 5. Installs Card — rises UP-RIGHT like a window floating away
          if (installsCardRef.current) {
            gsap.set(installsCardRef.current, {
              opacity: clamp(1 - p * 2.6, 0, 1),
              x: p * 220,
              y: -p * 100,
              rotate: 7 * clamp(p * 3, 0, 1),
              scale: clamp(1 - p * 0.08, 0.75, 1),
              overwrite: 'auto',
            });
          }

          // 6. Percent Circle — zooms slightly toward camera then exits RIGHT
          //    Scale briefly INCREASES before fading — depth-of-field push
          if (percentCircRef.current) {
            const zoomPush = Math.sin(Math.PI * clamp(p * 3, 0, 1)) * 0.12;
            gsap.set(percentCircRef.current, {
              opacity: clamp(1 - p * 2.2, 0, 1),
              x: p * 170,
              y: -p * 25,
              scale: 1 + zoomPush - p * 0.15,
              overwrite: 'auto',
            });
          }

          // 7. Key Features Pill — fastest exit, flicks RIGHT with upward arc
          if (featuresPillRef.current) {
            gsap.set(featuresPillRef.current, {
              opacity: clamp(1 - p * 3.5, 0, 1),
              x: p * 270,
              y: -p * 60,
              overwrite: 'auto',
            });
          }

          // 8. Book-a-call CTA — drops DOWN-RIGHT, slight gravity tilt
          if (bookCallRef.current) {
            gsap.set(bookCallRef.current, {
              opacity: clamp(1 - p * 2.9, 0, 1),
              x: p * 130,
              y: p * 130,
              rotate: 4 * clamp(p * 2.5, 0, 1),
              overwrite: 'auto',
            });
          }
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  /* ── Interaction handlers ────────────────────────────────────────────── */
  const triggerRocketBoost = useCallback(() => {
    setRocketBoost(true);
    setTimeout(() => setRocketBoost(false), 1500);
  }, []);

  const toggleWidget = useCallback(() => setWidgetResult((prev) => !prev), []);

  return (
    <div className="hero-scroll-track" ref={trackRef}>
      <div className="hero-sticky-wrap" ref={stickyRef}>
        <div className="stage-outer" ref={outerRef}>
          <div className="stage" id="stage" ref={stageRef}>

            {/* Ambient Radial Spotlight Glow */}
            <div className="glow" ref={glowRef} />

            {/* HERO HEADLINE & EYEBROW */}
            <div className="hero-content" ref={heroContentRef}>
              <span className="eyebrow">Technology, Built With Intent</span>
              <h1 className="headline">
                Solve Business<br /> Problems <br />Through Technology
              </h1>
            </div>

            {/* CinematicTransitionLayer disabled — Phase 2 is now full-screen expansion */}

            {/* DECORATIVE FLOATING LAYER */}
            <div className="decor">

              {/* Interactive AI Robot Companion with Live Mouse Tracking Eyes */}
              <div className="hero-stage-orb hero-stage-orb-left float d2" ref={leftOrbRef}>
                <AIRobotCompanion />
              </div>

              <div className="hero-stage-orb hero-stage-orb-right float d4" ref={rightOrbRef}>
                <img src="/process-2.svg" alt="Dynamic Flow Ambient Orb" className="hero-orb-img" />
              </div>

              {/* 1. White Pulse Circle (Top Left) — bubble pop exit */}
              {/* <div className="float pulse-circle" ref={pulseCircleRef}>
                <div className="pulse-dashed-line" />
                <div className="pulse-badge">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="pulse-wave-svg">
                    <path
                      d="M 2 12 H 6 L 9 6 L 14 18 L 17 12 H 22"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pulse-wave-path"
                    />
                  </svg>
                </div>
              </div> */}






              {/* 5. Central Showcase Mockup — cinematic filter effects in ShowcaseMockup */}
              <ShowcaseMockup scrollProgress={scrollProgress} />



            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
