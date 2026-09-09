import React from 'react';

/**
 * IllustrationEvolve
 * Step 04: Evolve
 * "We refine, improve, and grow the solution as your business changes."
 *
 * Bespoke editorial vector illustration with transparent background,
 * signature #A0BBFF accents, continuous feedback loops, ascending growth curves,
 * dynamic metrics analytics, and subtle micro-animations.
 */
export default function IllustrationEvolve({ className = '', isSimActive = false }) {
  return (
    <div className={`process-illustration-wrap illust-evolve ${isSimActive ? 'is-sim-active' : ''} ${className}`}>
      <svg
        className="process-illustration-svg"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Evolve phase: continuous improvement, scale, feedback loops and growth metrics"
      >
        <defs>
          {/* Ambient organic backdrop glow */}
          <radialGradient id="evoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#A0BBFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          {/* Ascending curve gradient */}
          <linearGradient id="evoCurveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#A0BBFF" />
            <stop offset="85%" stopColor="#CF6733" />
            <stop offset="100%" stopColor="#F6D6CD" />
          </linearGradient>

          {/* Chart area fill gradient */}
          <linearGradient id="evoAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── 1. Soft Backdrop Ambient Aura (Transparent background) ── */}
        <circle cx="260" cy="200" r="165" fill="url(#evoGlow)" />

        {/* Orbital Evolution Ring */}
        <circle
          cx="260"
          cy="200"
          r="140"
          className="illust-stroke-faint"
          strokeDasharray="4 6"
        />

        {/* ── 2. Continuous Circular Feedback Iteration Loop ─────────── */}
        <g className="anim-loop-spin" style={{ transformOrigin: '260px 185px' }}>
          {/* Outer dashed orbit */}
          <circle
            cx="260"
            cy="185"
            r="105"
            stroke="#A0BBFF"
            strokeWidth="1.2"
            strokeDasharray="3 6"
            opacity="0.35"
          />
          {/* Revolving node on orbit */}
          <circle cx="365" cy="185" r="4.5" fill="#A0BBFF" />
          <circle cx="155" cy="185" r="4.5" fill="#CF6733" />
        </g>

        {/* ── 3. Soaring Exponential Growth Curve & Analytics Chart ─── */}
        <g className="anim-chart-rise">
          {/* Analytics Chart Base Panel */}
          <rect
            x="110"
            y="120"
            width="250"
            height="150"
            rx="12"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-main"
            strokeWidth="1.8"
          />

          {/* Header of analytics panel */}
          <line x1="110" y1="148" x2="360" y2="148" className="illust-stroke-subtle" strokeWidth="1.2" />
          <circle cx="128" cy="134" r="3" fill="#CF6733" opacity="0.8" />
          <circle cx="138" cy="134" r="3" fill="#A0BBFF" opacity="0.8" />
          <text x="152" y="138" fill="#A0BBFF" fontSize="10" fontFamily="monospace" opacity="0.8">
            SYSTEM EVOLUTION // TRAJECTORY
          </text>

          {/* Grid lines inside chart */}
          <line x1="130" y1="175" x2="340" y2="175" className="illust-stroke-faint" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="130" y1="205" x2="340" y2="205" className="illust-stroke-faint" strokeWidth="1" strokeDasharray="3 4" />
          <line x1="130" y1="235" x2="340" y2="235" className="illust-stroke-faint" strokeWidth="1" />

          {/* Ascending Metric Bar Pillars */}
          <g className="anim-bars-pulse">
            <rect x="145" y="210" width="16" height="25" rx="3" fill="#A0BBFF" fillOpacity="0.3" />
            <rect x="175" y="195" width="16" height="40" rx="3" fill="#A0BBFF" fillOpacity="0.45" />
            <rect x="205" y="180" width="16" height="55" rx="3" fill="#A0BBFF" fillOpacity="0.6" />
            <rect x="235" y="160" width="16" height="75" rx="3" fill="#A0BBFF" fillOpacity="0.8" />
            <rect x="265" y="145" width="16" height="90" rx="3" fill="#A0BBFF" />
          </g>

          {/* Gradient Area under Growth Curve */}
          <path
            d="M130 235 Q190 230 240 180 T340 145 L340 235 Z"
            fill="url(#evoAreaGrad)"
          />

          {/* Dynamic Ascending Growth Line */}
          <path
            d="M130 235 Q190 230 240 180 T340 145"
            stroke="url(#evoCurveGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Peak Value Beacon Marker */}
          <circle cx="340" cy="145" r="5" fill="#CF6733" />
          <circle cx="340" cy="145" r="10" stroke="#CF6733" strokeWidth="1.2" opacity="0.6" className="anim-pulse-aura" />
        </g>

        {/* ── 4. Strategic Partner / Growth Leader Figure ───────────── */}
        {/* Studio Floor Line */}
        <line
          x1="80"
          y1="340"
          x2="440"
          y2="340"
          className="illust-stroke-faint"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        <g className="illust-partner">
          {/* Head & Visionary Posture */}
          <circle
            cx="406"
            cy="196"
            r="19"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="var(--bg-surface, #191A1D)"
          />
          {/* Contemporary Hair */}
          <path
            d="M394 186 C398 174 416 172 424 180 C428 184 428 194 424 200 C416 190 404 190 394 194 Z"
            fill="#A0BBFF"
            fillOpacity="0.8"
          />

          {/* Torso in #A0BBFF tone */}
          <path
            d="M390 224 C378 234 372 254 370 284 L442 284 C442 252 432 234 420 224 Z"
            fill="#A0BBFF"
            fillOpacity="0.32"
            className="illust-stroke-main"
            strokeWidth="2"
          />

          {/* Right Arm pointing forward and upward to future scale */}
          <path
            d="M428 238 L454 212 L470 190"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="470" cy="190" r="2.5" fill="#A0BBFF" />

          {/* Left Arm resting casually on hip */}
          <path
            d="M380 236 L366 260 L380 270"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Standing legs */}
          <line x1="390" y1="284" x2="388" y2="340" className="illust-stroke-main" strokeWidth="2" />
          <line x1="422" y1="284" x2="426" y2="340" className="illust-stroke-main" strokeWidth="2" />
        </g>

        {/* ── 5. Floating Evolution & Growth Telemetry Badges ────────── */}
        {/* Scale Metric Badge (Left Floating) */}
        <g className="anim-chip-float-1" transform="translate(64, 110)">
          <rect
            x="0"
            y="0"
            width="106"
            height="36"
            rx="8"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="16" cy="18" r="4" fill="#A0BBFF" />
          <text x="28" y="16" fill="#A0BBFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
            SCALE: +10X
          </text>
          <text x="28" y="27" fill="var(--text-muted, #B5B3AF)" fontSize="8.5" fontFamily="sans-serif">
            Continuous Refine
          </text>
        </g>

        {/* Long-term Partnership Loop Badge (Bottom Floating) */}
        <g className="anim-chip-float-2" transform="translate(130, 280)">
          <rect
            x="0"
            y="0"
            width="134"
            height="32"
            rx="8"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="16" cy="16" r="4" fill="#CF6733" />
          <text x="28" y="19" fill="#A0BBFF" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">
            Adapt & Grow
          </text>
        </g>

        {/* Constellation sparkles */}
        <g className="illust-sparks" fill="#A0BBFF">
          <circle cx="95" cy="75" r="2" opacity="0.8" />
          <circle cx="390" cy="80" r="2.5" opacity="0.9" />
          <circle cx="460" cy="130" r="2" opacity="0.7" />
          <circle cx="320" cy="70" r="1.5" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
