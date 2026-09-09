import { useRef, useEffect, useCallback } from 'react';
import AIRobotCompanion from './AIRobotCompanion';
import HeroAnimation2 from './HeroAnimation2';
import HeroGlassOrbitals from './HeroGlassOrbitals';
import HeroGlassBlob from './HeroGlassBlob';
import './hero.css';

export default function HeroSection() {
  const heroSectionRef = useRef(null);
  const glowRef = useRef(null);
  const orbitalsRef = useRef(null);
  const upperStageRef = useRef(null);
  const robotRef = useRef(null);
  const rightAnimRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);

  const scrollStageRef = useRef(null);
  const viewportRef = useRef(null);
  const showcaseRef = useRef(null);
  const chassisRef = useRef(null);
  const rafId = useRef(null);
  const lastEligible = useRef(null);

  // One-time environment diagnostic for fixed context preservation
  useEffect(() => {
    const stage = scrollStageRef.current;
    if (!stage) return;

    let node = stage.parentElement;
    const offenders = [];
    while (node && node !== document.documentElement) {
      const cs = window.getComputedStyle(node);
      const breaksFixedContext =
        cs.transform !== 'none' ||
        cs.filter !== 'none' ||
        cs.perspective !== 'none' ||
        (cs.willChange && cs.willChange.includes('transform')) ||
        (cs.contain && cs.contain !== 'none');
      if (breaksFixedContext) {
        offenders.push({
          element: node,
          tag: `${node.tagName.toLowerCase()}${node.className ? '.' + String(node.className).split(' ').join('.') : ''}`,
          transform: cs.transform,
          filter: cs.filter,
          willChange: cs.willChange,
          contain: cs.contain,
        });
      }
      node = node.parentElement;
    }

    if (offenders.length) {
      // eslint-disable-next-line no-console
      console.warn(
        '[HeroSection] Ancestor(s) found with a transform/filter/perspective/' +
        'will-change/contain set. This creates a new containing block and ' +
        'will make the fixed-position pin anchor to that ancestor instead ' +
        'of the real viewport, breaking the fullscreen expand. Fix or ' +
        'remove these first:',
        offenders
      );
    }
  }, []);

  const handleScroll = useCallback(() => {
    const hero = heroSectionRef.current;
    const glow = glowRef.current;
    const orbitals = orbitalsRef.current;
    const upperStage = upperStageRef.current;
    const robot = robotRef.current;
    const rightAnim = rightAnimRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;

    const stage = scrollStageRef.current;
    const viewport = viewportRef.current;
    const showcase = showcaseRef.current;
    const chassis = chassisRef.current;
    if (!stage || !viewport || !showcase || !chassis) return;

    const windowH = window.innerHeight;
    const windowW = window.innerWidth;

    // 0. CINEMATIC SCROLL-EXPAND GATE (>= 768px width, >= 450px height)
    // Ensures animation applies reliably across high-DPI scaled laptops (125%, 150%), tablets, and desktops
    const isAnimationEligible = windowW >= 768 && windowH >= 450;

    if (isAnimationEligible !== lastEligible.current) {
      lastEligible.current = isAnimationEligible;
      // eslint-disable-next-line no-console
      console.info(
        `[HeroSection] Tablet scroll-expand animation ${isAnimationEligible ? 'ENABLED' : 'DISABLED'} ` +
        `— viewport ${windowW}x${windowH} (needs >= 768x450).`
      );
    }

    if (!isAnimationEligible) {
      // Reset all inline custom properties and positions cleanly for responsive / mobile mode
      if (glow) {
        glow.style.removeProperty('--glow-opacity');
        glow.style.removeProperty('--glow-scale');
      }
      if (orbitals) {
        orbitals.style.removeProperty('--orbitals-opacity');
        orbitals.style.removeProperty('--orbitals-y');
        orbitals.style.removeProperty('--orbitals-scale');
      }
      if (robot) {
        robot.style.removeProperty('--robot-x');
        robot.style.removeProperty('--robot-y');
        robot.style.removeProperty('--robot-rot');
        robot.style.removeProperty('--robot-scale');
        robot.style.removeProperty('--robot-opacity');
      }
      if (rightAnim) {
        rightAnim.style.removeProperty('--right-anim-x');
        rightAnim.style.removeProperty('--right-anim-y');
        rightAnim.style.removeProperty('--right-anim-rot');
        rightAnim.style.removeProperty('--right-anim-scale');
        rightAnim.style.removeProperty('--right-anim-opacity');
      }
      if (eyebrow) {
        eyebrow.style.removeProperty('--eyebrow-y');
        eyebrow.style.removeProperty('--eyebrow-opacity');
      }
      if (headline) {
        headline.style.removeProperty('--headline-y');
        headline.style.removeProperty('--headline-scale');
        headline.style.removeProperty('--headline-blur');
        headline.style.removeProperty('--headline-opacity');
      }
      if (upperStage) {
        upperStage.style.removeProperty('--upper-pointer-events');
      }

      viewport.style.removeProperty('position');
      viewport.style.removeProperty('top');
      viewport.style.removeProperty('bottom');
      viewport.style.removeProperty('left');
      viewport.style.removeProperty('width');
      viewport.style.removeProperty('height');
      showcase.style.removeProperty('--tablet-scale');
      showcase.style.removeProperty('--tablet-rotate-x');
      showcase.style.removeProperty('--shadow-fade');
      chassis.style.removeProperty('--chassis-radius');
      chassis.style.removeProperty('--inner-radius');
      chassis.style.removeProperty('--chassis-padding');

      if (typeof window !== 'undefined' && window.__lenis && window.__lenis.options) {
        window.__lenis.options.wheelMultiplier = 0.88;
        window.__lenis.options.touchMultiplier = 1.4;
      }
      return;
    }

    // Compute overall hero scroll ratio
    let heroScrollRatio = 0;
    if (hero) {
      const heroRect = hero.getBoundingClientRect();
      const heroScrolled = Math.max(0, -heroRect.top);
      const totalHeroTrack = Math.max(1, hero.offsetHeight - windowH);
      heroScrollRatio = Math.max(0, Math.min(1, heroScrolled / totalHeroTrack));
    }

    // 1. AMBIENT SPOTLIGHT GLOW DYNAMIC EXPANSION & FADE (0% -> 50% Domain)
    if (glow) {
      const glowProgress = Math.min(1, Math.max(0, heroScrollRatio / 0.50));
      const glowOpacity = Math.max(0, 1 - glowProgress * 1.5).toFixed(3);
      const glowScale = (1 + glowProgress * 0.35).toFixed(3);
      glow.style.setProperty('--glow-opacity', glowOpacity);
      glow.style.setProperty('--glow-scale', glowScale);
    }

    // 2. SCROLL INTEGRATION: ZERO BLURS, ZERO PREMATURE HIDING (100% Crisp & Visible)
    if (orbitals) {
      orbitals.style.setProperty('--orbitals-opacity', '1');
      orbitals.style.setProperty('--orbitals-y', '0px');
      orbitals.style.setProperty('--orbitals-scale', '1');
    }

    // Left AI Robot: 100% sharp and visible
    if (robot) {
      robot.style.setProperty('--robot-x', '0px');
      robot.style.setProperty('--robot-y', '0px');
      robot.style.setProperty('--robot-rot', '0deg');
      robot.style.setProperty('--robot-scale', '1');
      robot.style.setProperty('--robot-opacity', '1');
    }

    // Right Dynamic Visual: 100% sharp and visible
    if (rightAnim) {
      rightAnim.style.setProperty('--right-anim-x', '0px');
      rightAnim.style.setProperty('--right-anim-y', '0px');
      rightAnim.style.setProperty('--right-anim-rot', '0deg');
      rightAnim.style.setProperty('--right-anim-scale', '1');
      rightAnim.style.setProperty('--right-anim-opacity', '1');
    }

    // Eyebrow Badge: 100% sharp and visible
    if (eyebrow) {
      eyebrow.style.setProperty('--eyebrow-y', '0px');
      eyebrow.style.setProperty('--eyebrow-opacity', '1');
    }

    // Headline: NO BLURS, NO artificial hiding, 100% sharp and visible
    if (headline) {
      headline.style.setProperty('--headline-y', '0px');
      headline.style.setProperty('--headline-scale', '1');
      headline.style.setProperty('--headline-blur', '0px');
      headline.style.setProperty('--headline-opacity', '1');
    }

    if (upperStage) {
      upperStage.style.setProperty('--upper-pointer-events', 'auto');
    }

    // 3. TABLET MOCKUP EXPANSION & PIN MATH (Mathematically Exact 0.00px Handshake)
    const rect = stage.getBoundingClientRect();
    const stageHeight = rect.height;
    const initialWidthVw = windowW >= 1024 ? 50 : 60;
    const maxTabletWidth = windowW >= 1800 ? 1000 : windowW >= 1024 ? 800 : 640;
    const currentBaseWidth = Math.min((windowW * initialWidthVw) / 100, maxTabletWidth);
    const currentBaseHeight = currentBaseWidth * (9 / 16); // 16:9 widescreen height

    // Center-pin ignition point: tablet center aligns with 50vh viewport center
    const pinTriggerTop = (windowH - currentBaseHeight) / 2;

    // Release point: stage bottom aligns with viewport bottom (rect.bottom <= windowH)
    const pinEndTop = windowH - stageHeight;
    const pinTotalDistance = Math.max(1, pinTriggerTop - pinEndTop);

    // Screen-fit target scale (100vw x 100vh)
    const scaleX = windowW / currentBaseWidth;
    const scaleY = windowH / currentBaseHeight;
    const targetScale = Math.max(scaleX, scaleY);

    // Reference concentric geometry from website - Copy: 36px outer, 10px bezel padding, 26px inner video radius
    const baseRadius = 36;
    const baseInnerRadius = 26;
    const basePadding = 10;

    // 4. DETERMINISTIC ZERO-JUMP PIN HANDSHAKE & SEAMLESS SECTION 2 HANDOFF
    if (rect.top > pinTriggerTop) {
      // Phase A: Before Pin (Normal in-flow document scroll)
      viewport.style.removeProperty('position');
      viewport.style.removeProperty('top');
      viewport.style.removeProperty('bottom');
      viewport.style.removeProperty('left');
      viewport.style.removeProperty('width');
      viewport.style.removeProperty('height');

      showcase.style.setProperty('--tablet-scale', '1.0000');
      showcase.style.setProperty('--tablet-rotate-x', '0.0deg');
      showcase.style.setProperty('--shadow-fade', '1.000');
      chassis.style.setProperty('--chassis-radius', `${baseRadius.toFixed(1)}px`);
      chassis.style.setProperty('--inner-radius', `${baseInnerRadius.toFixed(1)}px`);
      chassis.style.setProperty('--chassis-padding', `${basePadding.toFixed(1)}px`);
    } else if (rect.top > pinEndTop) {
      // Phase B: Pinned to Viewport (Screen-centered smooth expansion to fullscreen)
      viewport.style.position = 'fixed';
      viewport.style.top = '0px';
      viewport.style.bottom = 'auto';
      viewport.style.left = '0px';
      viewport.style.width = '100%';
      viewport.style.height = '100vh';

      const scrolledInPin = pinTriggerTop - rect.top;
      const pinRatio = Math.max(0, Math.min(1, scrolledInPin / pinTotalDistance));

      // Scaling occupies first 85% of pinned runway; remaining 15% is a calm fullscreen hold beat
      const scaleProgress = Math.min(1, pinRatio / 0.85);
      const ease2 = 1 - Math.pow(1 - scaleProgress, 2.0);
      const currentScale = 1 + (targetScale - 1) * ease2;

      // Subtle 3D depth tilt: settles to 0 as it approaches fullscreen
      const rotateX = (-Math.sin(Math.PI * (1 - scaleProgress)) * 0.4).toFixed(2);

      // Concentric radius & bezel melting down to 0px
      const currentRadius = Math.max(0, baseRadius * (1 - ease2));
      const currentInnerRadius = Math.max(0, baseInnerRadius * (1 - ease2));
      const currentPadding = Math.max(0, basePadding * (1 - ease2));
      const shadowOpacity = Math.max(0, 1 - ease2 * 1.5);

      showcase.style.setProperty('--tablet-scale', currentScale.toFixed(4));
      showcase.style.setProperty('--tablet-rotate-x', `${rotateX}deg`);
      showcase.style.setProperty('--shadow-fade', shadowOpacity.toFixed(3));
      chassis.style.setProperty('--chassis-radius', `${currentRadius.toFixed(1)}px`);
      chassis.style.setProperty('--inner-radius', `${currentInnerRadius.toFixed(1)}px`);
      chassis.style.setProperty('--chassis-padding', `${currentPadding.toFixed(1)}px`);
    } else {
      // Phase C: Release to Stage Bottom (Exact 0.00px seamless handoff to Section 2)
      viewport.style.position = 'absolute';
      viewport.style.top = 'auto';
      viewport.style.bottom = '0px';
      viewport.style.left = '0px';
      viewport.style.width = '100%';
      viewport.style.height = '100vh';

      showcase.style.setProperty('--tablet-scale', targetScale.toFixed(4));
      showcase.style.setProperty('--tablet-rotate-x', '0.0deg');
      showcase.style.setProperty('--shadow-fade', '0.000');
      chassis.style.setProperty('--chassis-radius', '0.0px');
      chassis.style.setProperty('--inner-radius', '0.0px');
      chassis.style.setProperty('--chassis-padding', '0.0px');
    }

    // 5. RESPONSIVE SCROLL VISCOSITY (Light, silky, natural scroll speed)
    if (typeof window !== 'undefined' && window.__lenis && window.__lenis.options) {
      if (rect.top <= pinTriggerTop && rect.top > pinEndTop) {
        const scrolledInPin = pinTriggerTop - rect.top;
        const pinRatio = Math.max(0, Math.min(1, scrolledInPin / pinTotalDistance));
        const dampingIntensity = Math.sin(pinRatio * Math.PI);
        window.__lenis.options.wheelMultiplier = 0.88 - (0.88 - 0.72) * dampingIntensity;
        window.__lenis.options.touchMultiplier = 1.4 - (1.4 - 1.1) * dampingIntensity;
      } else {
        window.__lenis.options.wheelMultiplier = 0.88;
        window.__lenis.options.touchMultiplier = 1.4;
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        handleScroll();
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let lenisScrollHandler = null;
    let attachRetryId = null;

    const attachLenis = () => {
      if (window.__lenis && typeof window.__lenis.on === 'function') {
        lenisScrollHandler = () => onScroll();
        window.__lenis.on('scroll', lenisScrollHandler);
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      attachRetryId = window.setInterval(() => {
        if (attachLenis() && attachRetryId) {
          window.clearInterval(attachRetryId);
          attachRetryId = null;
        }
      }, 200);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (attachRetryId) window.clearInterval(attachRetryId);
      if (window.__lenis && lenisScrollHandler && typeof window.__lenis.off === 'function') {
        window.__lenis.off('scroll', lenisScrollHandler);
      }
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (typeof window !== 'undefined' && window.__lenis && window.__lenis.options) {
        window.__lenis.options.wheelMultiplier = 0.88;
        window.__lenis.options.touchMultiplier = 1.4;
      }
    };
  }, [handleScroll]);

  return (
    <section className="hero-section" ref={heroSectionRef} aria-label="Introduction">
      {/* Ambient Radial Spotlight Glow */}
      <div className="hero-spotlight-glow" ref={glowRef} aria-hidden="true" />

      {/* Ambient Glass Orbital Ring & Kinetic Telemetry Capsules */}
      <HeroGlassOrbitals ref={orbitalsRef} />

      {/* Upper Hero Stage (Decoupled Parallax Exit Layer) */}
      <div className="hero-upper-stage" ref={upperStageRef}>
        {/* Floating Interactive Vectors (Desktop/Laptop) */}
        <div className="hero-floating-visuals-row">
          {/* Left Floating Visuals */}
          <div className="hero-robot-floating-left" ref={robotRef}>
            <HeroGlassBlob variant="left" />
            <AIRobotCompanion />
          </div>

          {/* Right Floating Visuals */}
          <div className="hero-anim-floating-right" ref={rightAnimRef}>
            <HeroGlassBlob variant="right" />
            <HeroAnimation2 />
          </div>
        </div>

        {/* Center Hero Stage (Eyebrow & Headline) */}
        <div className="hero-center-stage">
          {/* Eyebrow Badge with Masked Traveling Border Beam */}
          <div className="hero-eyebrow-container" ref={eyebrowRef}>
            <div className="hero-eyebrow-badge">
              <span className="eyebrow-text">
                Built on intent. Scaled with discipline
              </span>
            </div>
          </div>

          {/* Bold Responsive Headline */}
          <h1 className="hero-headline" ref={headlineRef}>
            <span className="headline-line">Technology Built</span>
            <span className="headline-line">
              <span className="headline-part">Around Your</span>
              <span className="headline-part">Business</span>
            </span>
          </h1>

          {/* Mobile-only: Right-sided interactive visual composition below headline */}
          <div className="hero-mobile-visual-container" aria-label="Interactive Capabilities Visual">
            <div className="hero-mobile-visual-stage">
              <HeroGlassBlob variant="right" />
              <HeroAnimation2 />
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          HERO TABLET SCROLL TRACK & FULLSCREEN SHOWCASE
          Sticky container pins tablet at viewport center as it expands
          luxuriously into a full-screen cinematic presentation.
          ------------------------------------------------------------- */}
      <div className="hero-tablet-scroll-stage" ref={scrollStageRef}>
        <div className="hero-tablet-sticky-viewport" ref={viewportRef}>
          <div className="hero-tablet-showcase" ref={showcaseRef}>
            {/* iPad Chassis Frame */}
            <div className="ipad-chassis-frame" ref={chassisRef}>
              {/* iPad Screen Animation Layer */}
              <div className="ipad-animation-layer">
                {/* iPad Video Container & Media */}
                <div className="ipad-video-container">
                  <video
                    className="ipad-video-media"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    src="/assets/hero/hero-tablet-video.mp4"
                    aria-label="Product UI Showcase"
                  />

                  {/* Liquid Retina Screen Glass Sheen */}
                  <div className="ipad-screen-gloss" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}