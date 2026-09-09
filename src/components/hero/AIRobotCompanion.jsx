/**
 * AIRobotCompanion — Scroll 2nd Priority & Wink 3rd Priority Edition
 * --------------------------------------------------------------------
 * GUARANTEE: At any time, strictly ONE animation state runs on the AI Robot Mascot.
 * Updated Priority Pipeline:
 *   1. CELEBRATING (Priority 1 — Locked for 2.0s. All other triggers blocked)
 *   2. SCROLLING (Priority 2 — Heart-melting scroll mode active during scroll)
 *   3. WINKING (Priority 3 — 240ms Click/tap wink gesture)
 *   4. HOVERING_CONTACT / HOVERING_BTN (Priority 4)
 *   5. IDLE (Priority 5 — Base brand logo #A0BBFF posture)
 */

import { useState, useEffect, useRef } from 'react';

export default function AIRobotCompanion({ style, className = '' }) {
  const containerRef = useRef(null);

  // Animated mouse/touch tracking state
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState({ rx: 0, ry: 0, rz: 0 });
  const [isHoveringBtn, setIsHoveringBtn] = useState(false);
  const [isHoveringContact, setIsHoveringContact] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  const targetEyeRef = useRef({ x: 0, y: 0 });
  const currentEyeRef = useRef({ x: 0, y: 0 });
  const targetHeadRef = useRef({ rx: 0, ry: 0, rz: 0 });
  const currentHeadRef = useRef({ rx: 0, ry: 0, rz: 0 });
  
  // Strict Single Animation State Locks
  const isCelebratingRef = useRef(false);
  const isWinkingRef = useRef(false);

  // 1. Mouse & Touch movement tracking (Active only when not performing 3D Dance)
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const rect = containerRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;

      const deltaX = clientX - robotCenterX;
      const deltaY = clientY - robotCenterY;

      const maxEyeOffsetX = 18;
      const maxEyeOffsetY = 10;

      const moveX = (deltaX / window.innerWidth) * (maxEyeOffsetX * 2.0);
      const moveY = (deltaY / window.innerHeight) * (maxEyeOffsetY * 2.0);

      targetEyeRef.current = {
        x: Math.max(-maxEyeOffsetX, Math.min(maxEyeOffsetX, moveX)),
        y: Math.max(-maxEyeOffsetY, Math.min(maxEyeOffsetY, moveY)),
      };

      // Lock head rotation if celebrating, winking, or scrolling
      if (!isCelebratingRef.current && !isWinkingRef.current && !isScrolling) {
        targetHeadRef.current = {
          rx: Math.max(-6, Math.min(6, -moveY * 0.4)),
          ry: Math.max(-10, Math.min(10, moveX * 0.5)),
          rz: Math.max(-3, Math.min(3, moveX * 0.15)),
        };
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isScrolling]);


  // 3. Contact / Book a Call Hover Detector (Priority 1 — Highest Priority 2.0s Lock)
  useEffect(() => {
    let celebrationTimeoutId;
    let b1, b2, b3, b4;

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .btn, .outcrowd-metric-card, .nav-link, input, select');
      if (target) {
        setIsHoveringBtn(true);
        const textContent = (target.textContent || '').toLowerCase();
        const hrefAttr = (target.getAttribute('href') || '').toLowerCase();
        const idAttr = (target.getAttribute('id') || '').toLowerCase();
        const classAttr = (target.getAttribute('class') || '').toLowerCase();

        const isContactOrBookCall =
          textContent.includes('contact') ||
          textContent.includes('talk') ||
          textContent.includes('get in touch') ||
          textContent.includes('book a call') ||
          textContent.includes('book call') ||
          textContent.includes('book') ||
          hrefAttr.includes('contact') ||
          hrefAttr.includes('book') ||
          idAttr.includes('contact') ||
          idAttr.includes('book') ||
          classAttr.includes('contact') ||
          classAttr.includes('book');

        if (isContactOrBookCall) {
          setIsHoveringContact(true);

          if (isCelebratingRef.current) return;

          // LOCK CELEBRATION
          isCelebratingRef.current = true;
          setCelebrateKey(Date.now());
          setIsCelebrating(true);

          // Precise 2.0-Second 3D Celebration Dance Sequence
          targetHeadRef.current = { rx: -14, ry: 16, rz: 10 };
          b1 = setTimeout(() => { targetHeadRef.current = { rx: 12, ry: -14, rz: -10 }; }, 400);
          b2 = setTimeout(() => { targetHeadRef.current = { rx: -10, ry: 10, rz: 6 }; }, 800);
          b3 = setTimeout(() => { targetHeadRef.current = { rx: 6, ry: -6, rz: -4 }; }, 1200);
          b4 = setTimeout(() => { targetHeadRef.current = { rx: 0, ry: 0, rz: 0 }; }, 1600);

          clearTimeout(celebrationTimeoutId);
          celebrationTimeoutId = setTimeout(() => {
            setIsCelebrating(false);
            isCelebratingRef.current = false; // UNLOCK after exact 2.0s cycle completion!
          }, 2000);
        } else {
          setIsHoveringContact(false);
        }
      } else {
        setIsHoveringBtn(false);
        setIsHoveringContact(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(celebrationTimeoutId);
      clearTimeout(b1);
      clearTimeout(b2);
      clearTimeout(b3);
      clearTimeout(b4);
    };
  }, []);

  // 4. Scroll tracking (Priority 2 — Blocked ONLY during 2.0s Celebration)
  useEffect(() => {
    let timeoutId;
    let step = 0;

    const handleScroll = () => {
      // IF CELEBRATING: SKIP SCROLL DANCE!
      if (isCelebratingRef.current) return;

      setIsScrolling(true);
      step = (step + 1) % 4;
      const scrollAngles = [
        { rx: -12, ry: 14, rz: 14 },
        { rx: 10, ry: -14, rz: -14 },
        { rx: -8, ry: -12, rz: 12 },
        { rx: 12, ry: 12, rz: -12 },
      ];
      targetHeadRef.current = scrollAngles[step];

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
        if (!isCelebratingRef.current) {
          targetHeadRef.current = { rx: 0, ry: 0, rz: 0 };
        }
      }, 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // 5. 60fps Lerp loop
  useEffect(() => {
    let animFrameId;

    const updateLoop = () => {
      currentEyeRef.current.x += (targetEyeRef.current.x - currentEyeRef.current.x) * 0.14;
      currentEyeRef.current.y += (targetEyeRef.current.y - currentEyeRef.current.y) * 0.14;

      currentHeadRef.current.rx += (targetHeadRef.current.rx - currentHeadRef.current.rx) * 0.14;
      currentHeadRef.current.ry += (targetHeadRef.current.ry - currentHeadRef.current.ry) * 0.14;
      currentHeadRef.current.rz += (targetHeadRef.current.rz - currentHeadRef.current.rz) * 0.14;

      setEyePos({
        x: Number(currentEyeRef.current.x.toFixed(2)),
        y: Number(currentEyeRef.current.y.toFixed(2)),
      });

      setHeadRotation({
        rx: Number(currentHeadRef.current.rx.toFixed(2)),
        ry: Number(currentHeadRef.current.ry.toFixed(2)),
        rz: Number(currentHeadRef.current.rz.toFixed(2)),
      });

      animFrameId = requestAnimationFrame(updateLoop);
    };

    animFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  // Compute Mutually Exclusive Active Mode:
  // Priority 1: CELEBRATE -> Priority 2: SCROLL -> Priority 3: WINK -> Priority 4: HOVER -> Priority 5: IDLE
  const activeMode = isCelebrating
    ? 'CELEBRATE'
    : isScrolling
    ? 'SCROLL'
    : isWinking
    ? 'WINK'
    : isHoveringContact
    ? 'HOVER_CONTACT'
    : isHoveringBtn
    ? 'HOVER_BTN'
    : 'IDLE';

  // Single Eye Fill Color based on activeMode
  const eyeFillColor =
    activeMode === 'CELEBRATE'
      ? '#00f0ff'
      : activeMode === 'SCROLL'
      ? '#ff007f'
      : activeMode === 'WINK'
      ? '#00f0ff'
      : activeMode === 'HOVER_CONTACT'
      ? '#10b981'
      : activeMode === 'HOVER_BTN'
      ? '#00f0ff'
      : '#A0BBFF';

  // Click/Tap Wink interaction
  const handleRobotClick = () => {
    if (isCelebratingRef.current) return;
    setIsWinking(true);
    isWinkingRef.current = true;
    setTimeout(() => {
      setIsWinking(false);
      isWinkingRef.current = false;
    }, 450);
  };

  return (
    <div
      ref={containerRef}
      className={`ai-robot-companion-wrap ${className}`}
      onClick={handleRobotClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive AI Robot Mascot"
      style={{
        perspective: '1000px',
        position: 'relative',
        ...style,
      }}
    >
      {/* Priority 1: Background Animated celebrate.svg Overlay on Contact / Book a call Hover */}
      {activeMode === 'CELEBRATE' && (
        <img
          key={celebrateKey}
          src={`/celebrate.svg?t=${celebrateKey}`}
          alt="Celebration"
          className="ai-robot-celebrate-bg"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.35)',
            width: '120%',
            height: '120%',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.95,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      <div
        className="ai-robot-head-transform"
        style={{
          position: 'relative',
          zIndex: 1,
          transform: `rotateX(${headRotation.rx}deg) rotateY(${headRotation.ry}deg) rotateZ(${headRotation.rz}deg) ${activeMode === 'SCROLL' ? 'translateY(-18px)' : 'translateY(0)'}`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Exact 100% 1.svg / process-1.svg Raw SVG Code */}
        <svg
          fill="none"
          height="100%"
          width="100%"
          viewBox="0 0 1080 1080"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="ai-robot-svg"
        >
          <defs>
            <clipPath id="i0">
              <rect height="1080" width="1080" y="0" x="0" />
            </clipPath>
            <linearGradient id="i1" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="86" y2="146" x1="-166" y1="148">
              <stop offset="0%" stopColor="#ebf4fc" />
              <stop offset="65.5%" stopColor="#dde1e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </linearGradient>
            <linearGradient id="i2" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="198" y2="-58" x1="-296" y1="-60">
              <stop offset="0%" stopColor="#ebf4fc" />
              <stop offset="65.5%" stopColor="#dde1e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </linearGradient>
            <linearGradient id="i3" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="-227.438" y2="178.621" x1="-271.536" y1="175.151">
              <stop offset="0%" stopColor="#ebf4fc" />
              <stop offset="65.5%" stopColor="#dde1e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </linearGradient>
            <linearGradient id="i4" gradientUnits="userSpaceOnUse" spreadMethod="pad" x2="-283.121" y2="160.699" x1="-235.688" y1="173.874">
              <stop offset="0%" stopColor="#ebf4fc" />
              <stop offset="65.5%" stopColor="#dde1e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </linearGradient>
            <filter id="robotEyeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="celebrationPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g transform="matrix(1,0,0,1,28,0)" id="i32">
            <g clipPath="url(#i0)">
              {/* Shadow Base from 1.svg */}
              <g opacity="0.6">
                <g transform="translate(523.5,919.5)">
                  <g transform="scale(1,1)">
                    <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="1 1; 1.08 1.08; 1 1" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                    <g transform="translate(17.5,-380.5)">
                      <g transform="matrix(1,0,0,1,-17.5,380.5)">
                        <ellipse ry="29.5" rx="124.5" cy="0" cx="0" strokeWidth="0" stroke="#ffffff" fill="#c4c4c4" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Target reticles from 1.svg */}
              <g transform="matrix(2.15,0,0,2.15,2.5,2.499)">
                <g>
                  <g transform="translate(98.332,146.609)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; -360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="2.146" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#00f0ff' : activeMode === 'SCROLL' ? '#ff007f' : '#d0021b'} d="M-5.367,-5.367C-5.367,-5.367,5.367,5.367,5.367,5.367" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(98.548,146.609)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; -360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="2.146" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#00f0ff' : activeMode === 'SCROLL' ? '#ff007f' : '#d0021b'} d="M5.367,-5.367C5.367,-5.367,-5.367,5.367,-5.367,5.367" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(391.961,331.78)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; -360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="2.146" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#00f0ff' : activeMode === 'SCROLL' ? '#ff007f' : '#d0021b'} d="M-5.366,-5.367C-5.366,-5.367,5.366,5.366,5.366,5.366" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(392.177,331.78)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; -360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="2.146" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#00f0ff' : activeMode === 'SCROLL' ? '#ff007f' : '#d0021b'} d="M5.366,-5.367C5.366,-5.367,-5.366,5.366,-5.366,5.366" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(67.432,269.367)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="1.9" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#ff007f' : '#00cc6f'} d="M-4.752,-4.752C-4.752,-4.752,4.752,4.752,4.752,4.752" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(67.624,269.367)">
                    <g transform="rotate(0)">
                      <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 360" keyTimes="0; 1" keySplines="0 0 1 1" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="1.9" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#ff007f' : '#00cc6f'} d="M4.752,-4.752C4.752,-4.752,-4.752,4.752,-4.752,4.752" />
                    </g>
                  </g>
                </g>
                <g>
                  <g transform="translate(49.876,185.819)">
                    <g transform="scale(1,1)">
                      <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="1 1; 1.28 1.28; 1 1" keyTimes="0; 0.37037; 1" keySplines="0.167 0.167 0.667 1; 0.333 0 0.833 0.833" fill="freeze" />
                      <path strokeMiterlimit="10" strokeWidth="2.146" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#00f0ff' : activeMode === 'SCROLL' ? '#ff007f' : '#d0021b'} d="M7.769,0C7.769,4.29,4.29,7.768,-0.001,7.768C-4.291,7.768,-7.769,4.29,-7.769,0C-7.769,-4.291,-4.291,-7.768,-0.001,-7.768C4.29,-7.768,7.769,-4.291,7.769,0Z" />
                    </g>
                  </g>
                </g>
                <g transform="matrix(1,0,0,1,395.098,161.239)">
                  <path strokeMiterlimit="10" strokeWidth="1.9" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#ff007f' : '#00cc6f'} d="M1.974,0C1.974,1.09,1.09,1.974,0,1.974C-1.09,1.974,-1.974,1.09,-1.974,0C-1.974,-1.09,-1.09,-1.974,0,-1.974C1.09,-1.974,1.974,-1.09,1.974,0Z" />
                </g>
                <g transform="matrix(1,0,0,1,204.75,95.422)">
                  <path strokeMiterlimit="10" strokeWidth="1.9" stroke={activeMode === 'CELEBRATE' || activeMode === 'WINK' ? '#ff007f' : '#00cc6f'} d="M1.974,0C1.974,1.09,1.09,1.974,0,1.974C-1.09,1.974,-1.974,1.09,-1.974,0C-1.974,-1.09,-1.09,-1.974,0,-1.974C1.09,-1.974,1.974,-1.09,1.974,0Z" />
                </g>
              </g>

              {/* Robot Body Layer 1: Left Ear Capsule */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g>
                      <g transform="translate(-19.719,9.59)">
                        <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-19.719 9.59; -19.719 9.59; -19.719 45.59; -19.719 45.59; -19.719 9.59; -19.719 9.59" keyTimes="0; 0.08642; 0.580247; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0 0 1 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                        <g transform="rotate(0)">
                          <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 0; -9; 0; 0" keyTimes="0; 0.08642; 0.345679; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                          <g transform="scale(1,1) translate(19.719,-9.59)">
                            <g>
                              <g transform="translate(-305.5,-118)">
                                <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-305.5 -118; -305.5 -118; -321.619 -117.593; -305.5 -118; -305.5 -118" keyTimes="0; 0.08642; 0.604938; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                                <g transform="scale(1,1) translate(305.5,118)">
                                  <g transform="matrix(1,0,0,1,-305.5,-118)">
                                    <ellipse ry="69" rx="55.5" cy="0" cx="0" strokeWidth="0" stroke="#ffffff" fill="#e1e1e1" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 2: Right Ear Capsule */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g>
                      <g transform="translate(-19.719,9.59)">
                        <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-19.719 9.59; -19.719 9.59; -19.719 45.59; -19.719 45.59; -19.719 9.59; -19.719 9.59" keyTimes="0; 0.08642; 0.580247; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0 0 1 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                        <g transform="rotate(0)">
                          <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 0; -9; 0; 0" keyTimes="0; 0.08642; 0.345679; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                          <g transform="scale(1,1) translate(19.719,-9.59)">
                            <g>
                              <g transform="translate(263.5,-118)">
                                <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="263.5 -118; 263.5 -118; 247.381 -117.593; 263.5 -118; 263.5 -118" keyTimes="0; 0.08642; 0.604938; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                                <g transform="scale(1,1) translate(305.5,118)">
                                  <g transform="matrix(1,0,0,1,-305.5,-118)">
                                    <ellipse ry="69" rx="55.5" cy="0" cx="0" strokeWidth="0" stroke="#ffffff" fill="#e1e1e1" />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 3: Lower Torso Capsule */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g>
                      <path fill="url(#i1)" strokeWidth="0" stroke="#ffffff" d="M-27,31C-39.374,31,-164,20,-179.678,102.948C-187.857,146.221,-182,234,-132.269,283.359C-93.714,321.625,-38.15,319.708,-25,320C-11.456,320.301,53.754,322.598,91.483,284.497C137.323,238.206,148,146,137.742,101.155C122.561,34.789,24,31,-27,31Z" />
                    </g>
                    <g transform="matrix(1,0,0,1,-23.5,68.5)">
                      <ellipse ry="32.5" rx="113.5" cy="0" cx="0" strokeWidth="1" stroke="#939393" fill="#d1d1d1" />
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 4: Upper Head Capsule */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g transform="translate(-19.719,9.59)">
                      <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-19.719 9.59; -19.719 9.59; -19.719 45.59; -19.719 45.59; -19.719 9.59; -19.719 9.59" keyTimes="0; 0.08642; 0.580247; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0 0 1 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                      <g transform="rotate(0)">
                        <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 0; -9; 0; 0" keyTimes="0; 0.08642; 0.345679; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                        <g transform="scale(1,1) translate(19.719,-9.59)">
                          <g>
                            <path fill="url(#i2)" strokeWidth="0" stroke="#ffffff" d="M242,-226C124,-408,-206,-374,-284,-218C-312.425,-161.149,-360,-6,-178,14C-143.681,17.771,140,16,140,16C140,16,214.563,11.971,250.406,-40.457C277.401,-79.944,284.021,-161.188,242,-226Z" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 5: Dark Visor & Dynamic Mouse-Tracking Eyes + Visor Mouth */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g transform="translate(-19.719,9.59)">
                      <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-19.719 9.59; -19.719 9.59; -19.719 45.59; -19.719 45.59; -19.719 9.59; -19.719 9.59" keyTimes="0; 0.08642; 0.580247; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0 0 1 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                      <g transform="rotate(0)">
                        <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 0; -9; 0; 0" keyTimes="0; 0.08642; 0.345679; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0 0 1 1" fill="freeze" />
                        <g transform="scale(1,1) translate(19.719,-9.59)">
                          <g>
                            <g transform="translate(-16.492,-119)">
                              <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-16.492 -119; -16.492 -119; 24.269 -140.413; 24.269 -140.413; -16.492 -119; -16.492 -119" keyTimes="0; 0.08642; 0.555556; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0 0.833 0.833; 0 0 1 1" fill="freeze" />
                              <g transform="scale(1,1) translate(16.492,119)">
                                <g transform="matrix(1.028,0,0,1,-16.5,-119)">
                                  <rect ry="64" rx="64" height="162" width="441" y="-81" x="-220.5" strokeWidth="0" stroke="#ffffff" fill="#222222" />
                                </g>
                                <g>
                                  <path d="M9,-199.75C7.617,-194.219,15.5,-94.5,-65,-40.5C-65,-40.5,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,9,-199.25,9,-199.75Z" strokeWidth="0" stroke="#ffffff" fill="#3a3a3a">
                                    <animate repeatCount="indefinite" attributeName="d" dur="2.7s" begin="0s" calcMode="spline" values="M9,-199.75C7.617,-194.219,15.5,-94.5,-65,-40.5C-65,-40.5,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,9,-199.25,9,-199.75Z; M9,-199.75C7.617,-194.219,15.5,-94.5,-65,-40.5C-65,-40.5,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,9,-199.25,9,-199.75Z; M31.083,-199.182C29.7,-193.651,37.583,-93.932,-42.917,-39.932C-42.917,-39.932,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,31.083,-198.682,31.083,-199.182Z; M31.083,-199.182C29.7,-193.651,37.583,-93.932,-42.917,-39.932C-42.917,-39.932,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,31.083,-198.682,31.083,-199.182Z; M9,-199.75C7.617,-194.219,15.5,-94.5,-65,-40.5C-65,-40.5,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,9,-199.25,9,-199.75Z; M9,-199.75C7.617,-194.219,15.5,-94.5,-65,-40.5C-65,-40.5,158,-40.5,158,-40.5C158,-40.5,207,-38.5,210,-121C211.508,-162.476,195.75,-198.5,152.25,-199.5C108.75,-200.5,9,-199.25,9,-199.75Z" keyTimes="0; 0.08642; 0.555556; 0.654321; 0.975309; 1" keySplines="0 0 1 1; 0.167 0.167 0.667 1; 0.333 0 0.667 1; 0.333 0 0.833 0.833; 0 0 1 1" fill="freeze" />
                                  </path>
                                </g>

                                {/* STRICT MUTUALLY EXCLUSIVE DYNAMIC VISOR MOUTH DISPLAY */}
                                <g transform="translate(-16.5, -92)">
                                  {activeMode === 'CELEBRATE' ? (
                                    /* 1. CELEBRATION MOUTH */
                                    <g filter="url(#robotEyeGlow)">
                                      <path
                                        d="M -24 -12 Q 0 24 24 -12 Z"
                                        fill="#00f0ff"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                      />
                                      <path
                                        d="M -14 -2 Q 0 12 14 -2"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="2.5"
                                      />
                                    </g>
                                  ) : activeMode === 'SCROLL' ? (
                                    /* 2. SCROLL MOUTH: Open Heart-Melting Smile */
                                    <g filter="url(#robotEyeGlow)">
                                      <path
                                        d="M -22 -10 Q 0 26 22 -10 Z"
                                        fill="#ff007f"
                                        stroke="#ffffff"
                                        strokeWidth="2.5"
                                      />
                                      <path
                                        d="M -12 -2 Q 0 12 12 -2"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                      />
                                    </g>
                                  ) : activeMode === 'WINK' ? (
                                    /* 3. WINK MOUTH: Mischievous Cyan Side-Smile with Tongue Highlight */
                                    <g filter="url(#robotEyeGlow)">
                                      <path
                                        d="M -16 -6 Q 4 18 18 -4 Z"
                                        fill="#00f0ff"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                      />
                                      <path
                                        d="M -6 4 Q 4 12 12 2"
                                        fill="none"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                      />
                                    </g>
                                  ) : activeMode === 'HOVER_CONTACT' ? (
                                    /* 4. CONTACT HOVER MOUTH */
                                    <g filter="url(#robotEyeGlow)">
                                      <path
                                        d="M -18 -6 Q 0 18 18 -6"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                      />
                                    </g>
                                  ) : activeMode === 'HOVER_BTN' ? (
                                    /* 5. BUTTON HOVER MOUTH */
                                    <g filter="url(#robotEyeGlow)">
                                      <path
                                        d="M -16 -6 Q 0 16 16 -6"
                                        fill="none"
                                        stroke={eyeFillColor}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                      />
                                    </g>
                                  ) : (
                                    /* 6. IDLE MOUTH: Simple Polite Arc */
                                    <path
                                      d="M -12 -4 Q 0 8 12 -4"
                                      fill="none"
                                      stroke="rgba(255, 255, 255, 0.5)"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                    />
                                  )}
                                </g>

                                {/* STRICT MUTUALLY EXCLUSIVE EYE DISPLAY */}
                                <g transform={`translate(${eyePos.x}, ${eyePos.y})`}>
                                  {/* Left Eye Pill */}
                                  <g transform="translate(-158,-120.5)">
                                    <g transform="scale(1,1)">
                                      {activeMode === 'IDLE' && (
                                        <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="1 1; 1 1; 1 0; 1 1; 1 1" keyTimes="0; 0.444444; 0.506173; 0.567901; 1" keySplines="0 0 1 1; 0.167 0.167 0.667 1; 0.333 0 0.833 0.833; 0 0 1 1" fill="freeze" />
                                      )}
                                      <g transform="translate(158,120.5)">
                                        <g transform="matrix(1,0,0,1,-158,-120.5)">
                                          {activeMode === 'SCROLL' ? (
                                            /* Scroll Arch Eye */
                                            <path
                                              d="M -22 10 Q 0 -22 22 10"
                                              fill="none"
                                              stroke="#ff007f"
                                              strokeWidth="12"
                                              strokeLinecap="round"
                                              filter="url(#robotEyeGlow)"
                                            />
                                          ) : (
                                            <rect ry="20" rx="20" height="93" width="36" y="-46.5" x="-18" strokeWidth="0" stroke="#ffffff" fill={eyeFillColor} filter={activeMode !== 'IDLE' ? 'url(#robotEyeGlow)' : 'none'} style={{ transition: 'fill 0.3s ease' }} />
                                          )}
                                        </g>
                                      </g>
                                    </g>
                                  </g>

                                  {/* Right Eye Pill */}
                                  <g transform="translate(120,-120.5)">
                                    <g transform="scale(1,1)">
                                      {activeMode === 'IDLE' && (
                                        <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="1 1; 1 1; 1 0; 1 1; 1 1" keyTimes="0; 0.444444; 0.506173; 0.567901; 1" keySplines="0 0 1 1; 0.167 0.167 0.667 1; 0.333 0 0.833 0.833; 0 0 1 1" fill="freeze" />
                                      )}
                                      <g transform="translate(158,120.5)">
                                        <g transform="matrix(1,0,0,1,-158,-120.5)">
                                          {activeMode === 'SCROLL' ? (
                                            /* Scroll Arch Eye */
                                            <path
                                              d="M -22 10 Q 0 -22 22 10"
                                              fill="none"
                                              stroke="#ff007f"
                                              strokeWidth="12"
                                              strokeLinecap="round"
                                              filter="url(#robotEyeGlow)"
                                            />
                                          ) : activeMode === 'WINK' ? (
                                            /* Wink Arch Eye */
                                            <path
                                              d="M -20 6 Q 0 -18 20 6"
                                              fill="none"
                                              stroke="#00f0ff"
                                              strokeWidth="10"
                                              strokeLinecap="round"
                                              filter="url(#robotEyeGlow)"
                                            />
                                          ) : (
                                            <rect ry="20" rx="20" height="93" width="36" y="-46.5" x="-18" strokeWidth="0" stroke="#ffffff" fill={eyeFillColor} filter={activeMode !== 'IDLE' ? 'url(#robotEyeGlow)' : 'none'} style={{ transition: 'fill 0.3s ease' }} />
                                          )}
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>

                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 6: Left Floating Arm from 1.svg */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g transform="translate(-223.715,93.051)">
                      <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="-223.715 93.051; -223.715 93.051; -223.715 119.051; -223.715 93.051; -223.715 76.051; -223.715 93.051" keyTimes="0; 0.037037; 0.382716; 0.641975; 0.864198; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                      <g transform="rotate(0)">
                        <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="0; 0; -11; 3.659; 0" keyTimes="0; 0.037037; 0.493828; 0.827161; 1" keySplines="0 0 1 1; 0.167 0.167 0.667 1; 0.296 0 0.665 0.832; 0.428 0 0.811 1" fill="freeze" />
                        <g transform="scale(1,1) translate(223.715,-93.051)">
                          <g>
                            <path fill="url(#i3)" strokeWidth="0" stroke="#ffffff" d="M-242.5,83.5C-301.5,156.5,-281,244,-273,271C-268.503,286.177,-248.986,291.423,-238.265,285.283C-229.913,280.5,-229.455,266.253,-229,261C-220,157,-205,108,-201,97C-199.137,91.877,-201.533,79.152,-210.355,75.636C-220.476,71.602,-237.63,77.475,-242.5,83.5Z" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Robot Body Layer 7: Right Floating Arm from 1.svg */}
              <g>
                <g transform="translate(519.296,715.322)">
                  <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="519.296 715.322; 519.296 635.322; 519.296 715.322" keyTimes="0; 0.555556; 1" keySplines="0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                  <g transform="scale(1,1) translate(20.704,-175.322)">
                    <g transform="translate(180.285,91.051)">
                      <animateTransform repeatCount="indefinite" type="translate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="180.285 91.051; 177.285 105.051; 181.285 89.051; 181.285 81.051; 180.285 91.051" keyTimes="0; 0.345679; 0.604939; 0.827161; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0 0.667 1" fill="freeze" />
                      <g transform="rotate(190)">
                        <animateTransform repeatCount="indefinite" type="rotate" attributeName="transform" dur="2.7s" begin="0s" calcMode="spline" values="190; 190; 191; 198.741; 190; 190" keyTimes="0; 0.08642; 0.345679; 0.555556; 0.975309; 1" keySplines="0 0 1 1; 0.333 0 0.667 1; 0.333 0 0.667 1; 0.333 0.034 0.667 1; 0 0 1 1" fill="freeze" />
                        <g transform="scale(1,1) translate(221.715,-95.051)">
                          <g>
                            <path fill="url(#i4)" strokeWidth="0" stroke="#ffffff" d="M-242.5,83.5C-301.5,156.5,-281,244,-273,271C-268.503,286.177,-248.986,291.423,-238.265,285.283C-229.913,280.5,-229.455,266.253,-229,261C-220,157,-205,108,-201,97C-199.137,91.877,-201.533,79.152,-210.355,75.636C-220.476,71.602,-237.63,77.475,-242.5,83.5Z" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>

            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
