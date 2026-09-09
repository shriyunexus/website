import { useState, useEffect, useRef, useId } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './heroStoryboard.css';

const TOTAL_CYCLE = 10.8; // 10.8s master timeline

const QUESTION_TEXT = "What are you trying to make possible?";
const STATEMENT_TEXT = "Start there.";

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutQuad(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function springOvershoot(x) {
  const c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export default function HeroAnimation2() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const reactId = useId();
  const gradId = `shGrad-${reactId.replace(/[:]/g, '')}`;

  const [time, setTime] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    let animId;
    const update = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = ((now - startTimeRef.current) / 1000) % TOTAL_CYCLE;
      setTime(elapsed);
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 5 sequential scenes running on a 10.8s master timeline
  const isScene0 = time < 1.8;
  const isScene1 = time >= 1.8 && time < 5.4;
  const isScene2 = time >= 5.4 && time < 7.2;
  const isScene3 = time >= 7.2 && time < 9.0;
  const isScene4 = time >= 9.0;

  // CONTINUOUS MATHEMATICAL MOTION FOR PILL (Scene 0 -> Scene 1)
  let pillY = 195;
  let pillScaleX = 1;
  let pillScaleY = 1;

  if (isScene0) {
    if (time < 1.0) {
      pillY = 270;
    } else if (time < 1.25) {
      const p = (time - 1.0) / 0.25;
      const squash = Math.sin(p * Math.PI);
      pillY = 270 + squash * 6;
      pillScaleX = 1 + squash * 0.06;
      pillScaleY = 1 - squash * 0.06;
    } else {
      const p = (time - 1.25) / 0.55;
      const eased = easeOutCubic(Math.min(1, Math.max(0, p)));
      pillY = 270 - eased * 75;
    }
  } else if (isScene1) {
    pillY = 195;
  }

  // SCENE 0: TOP SHAPES DROP
  let sqX = 90, sqY = 80, sqRot = 0, sqScale = 1, sqOpacity = 1;
  let ciX = 345, ciY = 152, ciScale = 1, ciOpacity = 1;

  if (isScene0) {
    if (time < 0.55) {
      const f = Math.sin(time * 3.5);
      sqY = 80 - f * 4;
      ciY = 152 + f * 4;
    } else if (time < 1.15) {
      const p = (time - 0.55) / 0.6;
      const ep = easeInOutQuad(p);

      sqX = 90 + ep * 45;
      sqY = 80 + ep * 140;
      sqRot = ep * 18;
      sqScale = 1 - ep * 0.85;
      sqOpacity = Math.max(0, 1 - ep * 1.3);

      ciX = 345 - ep * 45;
      ciY = 152 + ep * 90;
      ciScale = 1 - ep * 0.85;
      ciOpacity = Math.max(0, 1 - ep * 1.3);
    } else {
      sqOpacity = 0;
      ciOpacity = 0;
    }
  }

  // SCENE 1: REAL-TIME CHARACTER TYPEWRITER
  let typedText = '';
  let cursorBlink = Math.floor(time * 3.5) % 2 === 0;

  if (isScene1) {
    const s1Time = time - 1.8;
    if (s1Time < 0.1) {
      typedText = '';
    } else if (s1Time < 1.2) {
      const p = (s1Time - 0.1) / 1.1;
      const charCount = Math.floor(p * QUESTION_TEXT.length);
      typedText = QUESTION_TEXT.slice(0, charCount);
    } else if (s1Time < 2.0) {
      typedText = QUESTION_TEXT;
    } else if (s1Time < 2.4) {
      const p = (s1Time - 2.0) / 0.4;
      const remaining = Math.floor((1 - p) * QUESTION_TEXT.length);
      typedText = QUESTION_TEXT.slice(0, remaining);
    } else if (s1Time < 2.9) {
      const p = (s1Time - 2.4) / 0.5;
      const charCount = Math.floor(p * STATEMENT_TEXT.length);
      typedText = STATEMENT_TEXT.slice(0, charCount);
    } else {
      typedText = STATEMENT_TEXT;
    }
  }

  // SCENE 2: AI CARD WITH 3 SPARKLE STARS
  let s2CardScale = 1;
  let star1Scale = 0, star1Rot = 0;
  let star2Scale = 0, star2Rot = 0;
  let star3Scale = 0, star3Rot = 0;
  let s2TextY = 0, s2TextOpacity = 1;

  if (isScene2) {
    const s2Time = time - 5.4;
    const cardP = Math.min(1, s2Time / 0.35);
    s2CardScale = 0.92 + easeOutCubic(cardP) * 0.08;

    const st1P = Math.min(1, Math.max(0, (s2Time - 0.08) / 0.4));
    star1Scale = springOvershoot(st1P) * 0.95 * (1 + Math.sin(time * 3) * 0.05);
    star1Rot = Math.sin(time * 2.2) * 14;

    const st2P = Math.min(1, Math.max(0, (s2Time - 0.16) / 0.4));
    star2Scale = springOvershoot(st2P) * 0.6 * (1 + Math.cos(time * 2.6) * 0.06);
    star2Rot = -Math.sin(time * 2.4) * 16;

    const st3P = Math.min(1, Math.max(0, (s2Time - 0.24) / 0.4));
    star3Scale = springOvershoot(st3P) * 0.45 * (1 + Math.sin(time * 3.2) * 0.08);
    star3Rot = Math.cos(time * 2.8) * 18;

    const txtP = Math.min(1, Math.max(0, (s2Time - 0.12) / 0.35));
    s2TextY = (1 - easeOutCubic(txtP)) * 14;
    s2TextOpacity = easeOutCubic(txtP);
  }

  // SCENE 4: SECURITY SHIELD & CHECKMARK
  let s4ShieldScale = 0, s4CheckOffset = 80;
  if (isScene4) {
    const s4Time = time - 9.0;
    const shP = Math.min(1, Math.max(0, s4Time / 0.4));
    s4ShieldScale = springOvershoot(shP);

    const ckP = Math.min(1, Math.max(0, (s4Time - 0.18) / 0.35));
    s4CheckOffset = 80 * (1 - easeOutCubic(ckP));
  }

  const starPath = "M 0,-40 C 0,-15 15,0 40,0 C 15,0 0,15 0,40 C 0,15 -15,0 -40,0 C -15,0 0,-15 0,-40 Z";

  return (
    <div className="hero-master-card" aria-label="Interactive Capabilities Animation">
      <div className="hero-master-inner">
        <svg viewBox="0 0 500 500" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Theme Signature Gradient: Brand Blue (#A0BBFF) to Brand Terracotta (#cf6733) */}
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0BBFF" />
              <stop offset="100%" stopColor="#cf6733" />
            </linearGradient>
          </defs>

          {/* ================================================================
              SCENE 0 & 1: FLOATING BRAND PILL
              ================================================================ */}
          {(isScene0 || isScene1) && (
            <g
              style={{
                transformOrigin: '250px 250px',
                transform: `scale(${pillScaleX}, ${pillScaleY})`
              }}
            >
              <rect
                x="45"
                y={pillY}
                width="410"
                height="110"
                rx="55"
                fill="#A0BBFF"
              />
            </g>
          )}

          {/* SCENE 0: FALLING GEOMETRIC SHAPES */}
          {isScene0 && (
            <g>
              {sqOpacity > 0 && (
                <rect
                  x={sqX}
                  y={sqY}
                  width="145"
                  height="145"
                  rx="36"
                  fill="#b4696a"
                  opacity={sqOpacity}
                  style={{
                    transformOrigin: `${sqX + 72.5}px ${sqY + 72.5}px`,
                    transform: `rotate(${sqRot}deg) scale(${sqScale})`
                  }}
                />
              )}
              {ciOpacity > 0 && (
                <circle
                  cx={ciX}
                  cy={ciY}
                  r="72"
                  fill="#cf6733"
                  opacity={ciOpacity}
                  style={{
                    transformOrigin: `${ciX}px ${ciY}px`,
                    transform: `scale(${ciScale})`
                  }}
                />
              )}
            </g>
          )}

          {/* SCENE 1: REAL-TIME TYPEWRITER TEXT */}
          {isScene1 && (
            <g>
              <text
                x="250"
                y="250"
                fill="#0F1012"
                fontSize="23"
                fontWeight="700"
                letterSpacing="-0.02em"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Plus Jakarta Sans, -apple-system, sans-serif"
              >
                {typedText}
                <tspan
                  fill="#0F1012"
                  fontWeight="900"
                  opacity={cursorBlink ? 1 : 0}
                  dx="3"
                >
                  |
                </tspan>
              </text>
            </g>
          )}

          {/* ================================================================
              SCENE 2 (5.4s - 7.2s): AI CARD ("Get smart AI guided suggestions")
              ================================================================ */}
          {isScene2 && (
            <g style={{ filter: isLight ? 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.07))' : 'drop-shadow(0 18px 36px rgba(0, 0, 0, 0.40))' }}>
              <rect
                x="60"
                y="60"
                width="380"
                height="380"
                rx="42"
                fill={isLight ? '#FFFFFF' : '#191A1D'}
                stroke={isLight ? 'rgba(33, 31, 29, 0.08)' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth="2"
                style={{
                  transformOrigin: '250px 250px',
                  transform: `scale(${s2CardScale})`
                }}
              />

              {/* Star 1 - Brand Blue (#A0BBFF) */}
              <g
                style={{
                  transformOrigin: '180px 175px',
                  transform: `translate(180px, 175px) rotate(${star1Rot}deg) scale(${star1Scale})`
                }}
              >
                <path d={starPath} fill="#A0BBFF" />
              </g>

              {/* Star 2 - Brand Copper (#cf6733) */}
              <g
                style={{
                  transformOrigin: '255px 130px',
                  transform: `translate(255px, 130px) rotate(${star2Rot}deg) scale(${star2Scale})`
                }}
              >
                <path d={starPath} fill="#cf6733" />
              </g>

              {/* Star 3 - Brand Rose (#b4696a) */}
              <g
                style={{
                  transformOrigin: '275px 205px',
                  transform: `translate(275px, 205px) rotate(${star3Rot}deg) scale(${star3Scale})`
                }}
              >
                <path d={starPath} fill="#b4696a" />
              </g>

              {/* Headline Typography */}
              <g
                style={{
                  transform: `translateY(${s2TextY}px)`,
                  opacity: s2TextOpacity
                }}
              >
                <text
                  x="105"
                  y="325"
                  fill={isLight ? '#16181D' : '#F7F4EF'}
                  fontSize="30"
                  fontWeight="700"
                  letterSpacing="-0.025em"
                  fontFamily="Plus Jakarta Sans, -apple-system, sans-serif"
                >
                  <tspan x="105" dy="0">Get smart AI</tspan>
                  <tspan x="105" dy="40">guided</tspan>
                  <tspan x="105" dy="40">suggestions</tspan>
                </text>
              </g>
            </g>
          )}

          {/* ================================================================
              SCENE 3 (7.2s - 9.0s): THREE STACKED PILLS (BRAND TRIAD)
              ================================================================ */}
          {isScene3 && (
            <g className="master-scene s3-scene">
              {/* Pill 1: Modern (#A0BBFF) */}
              <g className="s3-pill-spring s3-stagger-1">
                <rect x="75" y="115" width="350" height="76" rx="38" fill="#A0BBFF" />
                <text x="250" y="153" fill="#0F1012" fontSize="26" fontWeight="700" textAnchor="middle" dominantBaseline="central" letterSpacing="-0.01em" fontFamily="Plus Jakarta Sans, sans-serif">
                  Modern
                </text>
              </g>

              {/* Pill 2: Clean (#b4696a) */}
              <g className="s3-pill-spring s3-stagger-2">
                <rect x="95" y="212" width="310" height="76" rx="38" fill="#b4696a" />
                <text x="250" y="250" fill="#FFFFFF" fontSize="26" fontWeight="700" textAnchor="middle" dominantBaseline="central" letterSpacing="-0.01em" fontFamily="Plus Jakarta Sans, sans-serif">
                  Clean
                </text>
              </g>

              {/* Pill 3: Professional (#cf6733) */}
              <g className="s3-pill-spring s3-stagger-3">
                <rect x="75" y="309" width="350" height="76" rx="38" fill="#cf6733" />
                <text x="250" y="347" fill="#FFFFFF" fontSize="26" fontWeight="700" textAnchor="middle" dominantBaseline="central" letterSpacing="-0.01em" fontFamily="Plus Jakarta Sans, sans-serif">
                  Professional
                </text>
              </g>
            </g>
          )}

          {/* ================================================================
              SCENE 4 (9.0s - 10.8s): SECURITY SHIELD & CHECKMARK (THEME HARMONIZED)
              ================================================================ */}
          {isScene4 && (
            <g className="master-scene s4-scene">
              {/* Document Sheet in Theme Ivory with Brand Blue Stroke */}
              <rect
                className="s4-doc-sheet"
                x="155"
                y="70"
                width="190"
                height="225"
                rx="24"
                fill={isLight ? "#FFFFFF" : "#F7F4EF"}
                stroke="#A0BBFF"
                strokeWidth="10"
                strokeLinejoin="round"
              />
              <line x1="195" y1="140" x2="260" y2="140" stroke="#A0BBFF" strokeWidth="9" strokeLinecap="round" />
              <line x1="195" y1="180" x2="280" y2="180" stroke="#A0BBFF" strokeWidth="9" strokeLinecap="round" />
              <line x1="195" y1="220" x2="245" y2="220" stroke="#A0BBFF" strokeWidth="9" strokeLinecap="round" />

              {/* Brand Shield & Checkmark */}
              <g
                style={{
                  transformOrigin: '295px 200px',
                  transform: `scale(${s4ShieldScale})`
                }}
              >
                <path
                  d="M295,120 L360,150 C360,150 368,230 295,285 C222,230 230,150 230,150 L295,120 Z"
                  fill={`url(#${gradId})`}
                  stroke={isLight ? "#0F1012" : "#F7F4EF"}
                  strokeWidth="7"
                  strokeLinejoin="round"
                />

                <path
                  d="M 265 205 L 286 226 L 328 172"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="80"
                  strokeDashoffset={s4CheckOffset}
                />
              </g>

              {/* Theme Primary Text (Warm Ivory in Dark Mode / Dark Espresso in Light Mode) */}
              <text
                x="250"
                y="355"
                fill={isLight ? "#211F1D" : "#F7F4EF"}
                fontSize="25"
                fontWeight="700"
                textAnchor="middle"
                letterSpacing="-0.02em"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                <tspan x="250" dy="0">Your sensitive info,</tspan>
                <tspan x="250" dy="35">securely protected.</tspan>
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
