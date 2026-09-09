import React from 'react';

/**
 * IllustrationBuild
 * Step 03: Build
 * "We engineer reliable technology with the quality, scalability, and usability needed for real-world use."
 *
 * Bespoke editorial vector illustration with transparent background,
 * signature #A0BBFF accents, modular software engineering, clean code structures,
 * dynamic circuit data streams, and high-reliability systems.
 */
export default function IllustrationBuild({ className = '', isSimActive = false }) {
  return (
    <div className={`process-illustration-wrap illust-build ${isSimActive ? 'is-sim-active' : ''} ${className}`}>
      <svg
        className="process-illustration-svg"
        viewBox="0 0 520 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Build phase: reliable technology engineering, scalable architecture and code execution"
      >
        <defs>
          {/* Ambient organic backdrop glow */}
          <radialGradient id="bldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.22" />
            <stop offset="65%" stopColor="#A0BBFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="bldGradBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0BBFF" />
            <stop offset="100%" stopColor="#CF6733" />
          </linearGradient>
        </defs>

        {/* ── 1. Soft Backdrop Ambient Aura (Transparent background) ── */}
        <circle cx="260" cy="200" r="165" fill="url(#bldGlow)" />

        {/* Architectural Rings & Orbitals */}
        <circle
          cx="260"
          cy="200"
          r="140"
          className="illust-stroke-faint"
          strokeDasharray="4 6"
        />

        {/* ── 2. Scalable Modular Tech Architecture / Servers ───────── */}
        {/* Central Terminal / IDE Code Window */}
        <g className="anim-code-window">
          <rect
            x="130"
            y="96"
            width="230"
            height="150"
            rx="12"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-main"
            strokeWidth="1.8"
          />
          {/* Terminal Window Header */}
          <line x1="130" y1="124" x2="360" y2="124" className="illust-stroke-subtle" strokeWidth="1.2" />
          <circle cx="146" cy="110" r="3" fill="#CF6733" opacity="0.8" />
          <circle cx="156" cy="110" r="3" fill="#A0BBFF" opacity="0.8" />
          <circle cx="166" cy="110" r="3" fill="#B4696A" opacity="0.8" />
          <text
            x="180"
            y="114"
            fill="#A0BBFF"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="0.05em"
            opacity="0.8"
          >
            nexus-engine.ts
          </text>

          {/* Clean Code Lines */}
          {/* Line 1: import */}
          <line x1="148" y1="140" x2="188" y2="140" stroke="#CF6733" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="194" y1="140" x2="252" y2="140" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />

          {/* Line 2: function */}
          <line x1="148" y1="152" x2="204" y2="152" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="210" y1="152" x2="278" y2="152" className="illust-stroke-faint" strokeWidth="1.6" strokeLinecap="round" />

          {/* Line 3: nested logic */}
          <line x1="162" y1="164" x2="218" y2="164" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="224" y1="164" x2="310" y2="164" className="illust-stroke-faint" strokeWidth="1.6" strokeLinecap="round" />

          {/* Line 4: reliable flag */}
          <line x1="162" y1="176" x2="236" y2="176" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="242" y1="176" x2="286" y2="176" stroke="#CF6733" strokeWidth="1.6" strokeLinecap="round" />

          {/* Line 5: return */}
          <line x1="148" y1="188" x2="182" y2="188" stroke="#CF6733" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="188" y1="188" x2="246" y2="188" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />

          {/* Interactive Cursor in Code Window */}
          <line x1="250" y1="184" x2="250" y2="192" stroke="#A0BBFF" strokeWidth="2" className="anim-pulse-cursor" />

          {/* Build Output Status Chip */}
          <g transform="translate(148, 206)">
            <rect x="0" y="0" width="134" height="24" rx="4" fill="#A0BBFF" fillOpacity="0.14" />
            <circle cx="12" cy="12" r="3.5" fill="#A0BBFF" />
            <text x="24" y="15" fill="#A0BBFF" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              BUILD: READY [99.99%]
            </text>
          </g>
        </g>

        {/* ── 3. High-Precision Modular Tech Blocks (Isometric) ─────── */}
        {/* Floating Interlocking Block (Left) */}
        <g className="anim-block-float-1" transform="translate(68, 170)">
          {/* Isometric Cube Top */}
          <path d="M40 0 L75 18 L35 36 L0 18 Z" fill="#A0BBFF" fillOpacity="0.3" stroke="#A0BBFF" strokeWidth="1.4" />
          {/* Left Side */}
          <path d="M0 18 L35 36 L35 70 L0 52 Z" fill="var(--bg-elevated, #282624)" stroke="#A0BBFF" strokeWidth="1.4" />
          {/* Right Side */}
          <path d="M35 36 L75 18 L75 52 L35 70 Z" fill="#A0BBFF" fillOpacity="0.16" stroke="#A0BBFF" strokeWidth="1.4" />
          {/* Status Dot */}
          <circle cx="35" cy="18" r="3" fill="#A0BBFF" />
        </g>

        {/* Interlocking Database Storage Node (Center Bottom) */}
        <g transform="translate(160, 260)">
          {/* Cylinder 1 */}
          <ellipse cx="44" cy="14" rx="38" ry="10" fill="var(--bg-elevated, #282624)" className="illust-stroke-main" strokeWidth="1.6" />
          <path d="M6 14 L6 30 C6 35.5 23 40 44 40 C65 40 82 35.5 82 30 L82 14" className="illust-stroke-main" strokeWidth="1.6" fill="var(--bg-elevated, #282624)" />
          <line x1="26" y1="28" x2="62" y2="28" stroke="#A0BBFF" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="70" cy="28" r="2.5" fill="#A0BBFF" />

          {/* Cylinder 2 Bottom */}
          <path d="M6 30 L6 46 C6 51.5 23 56 44 56 C65 56 82 51.5 82 46 L82 30" className="illust-stroke-main" strokeWidth="1.6" fill="var(--bg-elevated, #282624)" />
          <line x1="26" y1="44" x2="62" y2="44" stroke="#A0BBFF" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="70" cy="44" r="2.5" fill="#A0BBFF" />
        </g>

        {/* ── 4. Animated Circuit Data Tracks & Traveling Packets ───── */}
        <g className="illust-circuits">
          {/* Circuit from Cube to Terminal */}
          <path
            d="M106 188 H130"
            stroke="#A0BBFF"
            strokeWidth="1.8"
            strokeDasharray="3 4"
            fill="none"
          />
          {/* Circuit from Database to Terminal */}
          <path
            d="M204 260 V246"
            stroke="#A0BBFF"
            strokeWidth="1.8"
            strokeDasharray="3 4"
            fill="none"
          />
          {/* Circuit from Terminal to Engineer */}
          <path
            d="M360 170 H400 V210"
            stroke="#A0BBFF"
            strokeWidth="1.8"
            strokeDasharray="3 4"
            fill="none"
          />
          {/* Circuit junction nodes */}
          <circle cx="106" cy="188" r="3.5" fill="#A0BBFF" />
          <circle cx="204" cy="246" r="3.5" fill="#A0BBFF" />
          <circle cx="360" cy="170" r="3.5" fill="#A0BBFF" />
          <circle cx="400" cy="210" r="3.5" fill="#A0BBFF" />

          {/* Traveling Data Packet Animations */}
          <circle cx="118" cy="188" r="2.5" fill="#A0BBFF" className="anim-packet-1" />
          <circle cx="380" cy="170" r="2.5" fill="#A0BBFF" className="anim-packet-2" />
        </g>

        {/* ── 5. Systems Engineer & Architect Figure ───────────────── */}
        {/* Ground Baseline */}
        <line
          x1="80"
          y1="340"
          x2="440"
          y2="340"
          className="illust-stroke-faint"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        <g className="illust-engineer">
          {/* Head & Modern Glasses */}
          <circle
            cx="396"
            cy="194"
            r="19"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="var(--bg-surface, #191A1D)"
          />
          {/* Clean tech hairstyle */}
          <path
            d="M382 184 C386 172 404 170 414 178 C418 182 418 190 416 196 C408 186 394 186 382 192 Z"
            fill="#A0BBFF"
            fillOpacity="0.8"
          />
          {/* Sleek round glasses */}
          <circle cx="390" cy="194" r="4.5" className="illust-stroke-main" strokeWidth="1.4" />
          <line x1="394.5" y1="194" x2="399" y2="194" className="illust-stroke-main" strokeWidth="1.2" />

          {/* Torso in #A0BBFF tone */}
          <path
            d="M382 222 C370 232 364 252 362 284 L432 284 C432 252 424 232 412 222 Z"
            fill="#A0BBFF"
            fillOpacity="0.3"
            className="illust-stroke-main"
            strokeWidth="2"
          />

          {/* Left Arm configuring the code console */}
          <path
            d="M374 234 L346 226 L332 216"
            className="illust-stroke-main"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="332" cy="216" r="2.5" fill="#A0BBFF" />

          {/* Right Arm holding diagnostic tablet */}
          <path
            d="M418 236 L432 258 L420 274"
            className="illust-stroke-main"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />

          {/* Standing legs */}
          <line x1="384" y1="284" x2="380" y2="340" className="illust-stroke-main" strokeWidth="2" />
          <line x1="414" y1="284" x2="418" y2="340" className="illust-stroke-main" strokeWidth="2" />
        </g>

        {/* Scalability Badge Floating Top Right */}
        <g className="anim-chip-float-1" transform="translate(358, 64)">
          <rect
            x="0"
            y="0"
            width="108"
            height="32"
            rx="8"
            fill="var(--bg-elevated, #282624)"
            className="illust-stroke-subtle"
            strokeWidth="1.2"
          />
          <circle cx="16" cy="16" r="4" fill="#A0BBFF" />
          <line x1="28" y1="13" x2="94" y2="13" stroke="#A0BBFF" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="28" y1="20" x2="76" y2="20" className="illust-stroke-faint" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
