import React from 'react';

/**
 * IllustrationDesign
 * Step 02: Design
 * "We turn those insights into a clear, practical solution designed around your people and processes."
 *
 * Bespoke editorial vector illustration with transparent background,
 * signature #A0BBFF accents, solution blueprinting, bezier curve pen tools,
 * modular UI architecture wireframes, and subtle micro-animations.
 */
export default function IllustrationDesign({ className = '', isSimActive = false }) {
  return (
    <div className={`process-illustration-wrap illust-design ${isSimActive ? 'is-sim-active' : ''} ${className}`}>
      <svg
        className="process-illustration-svg"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Design phase: solution architecture, human-centric wireframes and vector design"
      >
        <defs>
          {/* Ambient organic backdrop glow */}
          <radialGradient id="desGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#A0BBFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="desCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="desBezierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0BBFF" />
            <stop offset="50%" stopColor="#B4696A" />
            <stop offset="100%" stopColor="#A0BBFF" />
          </linearGradient>
        </defs>

        {/* ── 1. Soft Backdrop Ambient Aura (Transparent background) ── */}
        <circle cx="260" cy="200" r="165" fill="url(#desGlow)" />

        {/* Blueprint Grid / Geometric Guide Rings */}
        <circle
          cx="260"
          cy="200"
          r="140"
          className="illust-stroke-faint"
          strokeDasharray="4 6"
        />
        <rect
          x="120"
          y="70"
          width="280"
          height="230"
          rx="14"
          className="illust-stroke-faint"
          strokeDasharray="3 5"
          opacity="0.4"
        />

        {/* ── 2. Master Blueprint Artboard / Canvas ─────────────────── */}
        <g className="anim-canvas-float">
          {/* Main Blueprint Board */}
          <rect
            x="140"
            y="90"
            width="240"
            height="180"
            rx="12"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-main"
            strokeWidth="1.8"
          />

          {/* Canvas Window Header Bar */}
          <line x1="140" y1="116" x2="380" y2="116" className="illust-stroke-subtle" strokeWidth="1.2" />
          <circle cx="156" cy="103" r="3.5" fill="#CF6733" opacity="0.8" />
          <circle cx="168" cy="103" r="3.5" fill="#A0BBFF" opacity="0.8" />
          <circle cx="180" cy="103" r="3.5" fill="#B4696A" opacity="0.8" />
          <line x1="220" y1="103" x2="300" y2="103" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          {/* Grid Layout Rows inside Artboard */}
          <rect
            x="158"
            y="130"
            width="96"
            height="62"
            rx="6"
            fill="#A0BBFF"
            fillOpacity="0.14"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <line x1="168" y1="144" x2="216" y2="144" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="168" y1="154" x2="238" y2="154" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="168" y1="162" x2="220" y2="162" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="168" y="172" width="42" height="12" rx="3" fill="#A0BBFF" fillOpacity="0.75" />

          {/* Modular Sidebar Cards inside Artboard */}
          <rect
            x="264"
            y="130"
            width="100"
            height="40"
            rx="6"
            fill="var(--bg-surface, #191A1D)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="278" cy="150" r="6" fill="#A0BBFF" fillOpacity="0.4" />
          <line x1="292" y1="146" x2="348" y2="146" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="292" y1="154" x2="330" y2="154" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />

          <rect
            x="264"
            y="178"
            width="100"
            height="76"
            rx="6"
            fill="var(--bg-surface, #191A1D)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <line x1="278" y1="194" x2="348" y2="194" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="278" y1="204" x2="336" y2="204" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="278" y1="214" x2="318" y2="214" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* ── 3. Elegant Vector Pen-Tool Bezier Curve (Active Designing) ─ */}
        <g className="anim-pen-bezier">
          {/* Smooth S-Curve Path */}
          <path
            d="M80 230 C130 160, 200 290, 290 220 C350 170, 420 220, 450 170"
            stroke="url(#desBezierGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Anchor Node 1 with Tangent Handle */}
          <g transform="translate(200, 256)">
            {/* Dashed Tangent line */}
            <line x1="-36" y1="16" x2="36" y2="-16" stroke="#A0BBFF" strokeWidth="1.4" strokeDasharray="2 3" />
            <circle cx="-36" cy="16" r="3.5" fill="var(--bg-surface, #191A1D)" stroke="#A0BBFF" strokeWidth="1.5" />
            <circle cx="36" cy="-16" r="3.5" fill="var(--bg-surface, #191A1D)" stroke="#A0BBFF" strokeWidth="1.5" />
            {/* Primary Anchor square */}
            <rect x="-4.5" y="-4.5" width="9" height="9" fill="#A0BBFF" rx="1.5" />
          </g>

          {/* Vector Pen Tool Pointer */}
          <g transform="translate(290, 220) rotate(-45)">
            <path
              d="M0 0 L10 -22 L0 -32 L-10 -22 Z"
              fill="var(--bg-elevated, #282624)"
              stroke="#A0BBFF"
              strokeWidth="1.6"
            />
            <circle cx="0" cy="-18" r="2" fill="#A0BBFF" />
            <line x1="0" y1="0" x2="0" y2="-12" stroke="#A0BBFF" strokeWidth="1.4" />
          </g>
        </g>

        {/* ── 4. Creative Architect & UI Designer Figure ───────────── */}
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

        {/* Architectural Drafter / Product Designer (Right Side) */}
        <g className="illust-designer">
          {/* Head & Stylized Hair */}
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

          {/* Left Arm extended, adjusting the blueprint controls */}
          <path
            d="M380 236 L340 230 L318 222"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="318" cy="222" r="2.5" fill="#A0BBFF" />

          {/* Right Arm holding drafting stylus */}
          <path
            d="M428 238 L438 266 L426 284"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Legs */}
          <line x1="390" y1="284" x2="388" y2="340" className="illust-stroke-main" strokeWidth="2" />
          <line x1="422" y1="284" x2="426" y2="340" className="illust-stroke-main" strokeWidth="2" />
        </g>

        {/* ── 5. Floating Design Tools & Swatch Palette ─────────────── */}
        {/* Floating Mobile Wireframe Card */}
        <g className="anim-card-float-left">
          <rect
            x="64"
            y="130"
            width="68"
            height="110"
            rx="10"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-main"
            strokeWidth="1.5"
          />
          <rect x="80" y="138" width="36" height="4" rx="2" fill="#A0BBFF" opacity="0.6" />
          <rect x="74" y="150" width="48" height="34" rx="4" fill="#A0BBFF" fillOpacity="0.2" />
          <line x1="74" y1="194" x2="114" y2="194" stroke="#A0BBFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="74" y1="202" x2="102" y2="202" className="illust-stroke-faint" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="74" y="214" width="48" height="14" rx="4" fill="#A0BBFF" fillOpacity="0.8" />
        </g>

        {/* Floating Color Palette Chips */}
        <g className="anim-swatches-float">
          <rect
            x="110"
            y="266"
            width="88"
            height="32"
            rx="6"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="128" cy="282" r="6" fill="#A0BBFF" />
          <circle cx="146" cy="282" r="6" fill="#B4696A" />
          <circle cx="164" cy="282" r="6" fill="#CF6733" />
          <circle cx="182" cy="282" r="6" fill="#F6D6CD" />
        </g>

        {/* Architectural Compass Tool */}
        <g transform="translate(94, 76) rotate(15)">
          <line x1="0" y1="0" x2="-14" y2="38" stroke="#A0BBFF" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="0" x2="14" y2="38" stroke="#A0BBFF" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="0" cy="0" r="3.5" fill="#A0BBFF" />
          <path d="M-8 22 Q0 26 8 22" stroke="#A0BBFF" strokeWidth="1.2" fill="none" />
        </g>
      </svg>
    </div>
  );
}
