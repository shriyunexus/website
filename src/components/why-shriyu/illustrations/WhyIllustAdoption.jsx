import React from 'react';

/**
 * WhyIllustAdoption
 * Pillar 03: Adoption ("A technically correct system still fails if the people using it don't want to.")
 * Bespoke vector illustration: Human-centric workflow nexus & intuitive adoption orbit.
 * Visualizes placing real operating people at the center of the architecture, ensuring zero friction.
 */
export default function WhyIllustAdoption({ className = '' }) {
  return (
    <div className={`why-illustration-wrap why-illust-adoption ${className}`}>
      <svg
        className="why-illust-svg"
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Human Adoption: real users at the center of intuitive systems"
      >
        <defs>
          {/* Ambient Glow */}
          <radialGradient id="adoptGlowV2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#CF6733" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          {/* User Core Gradient */}
          <linearGradient id="userCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" />
            <stop offset="100%" stopColor="#41528A" />
          </linearGradient>

          {/* Orbit Pulse Gradient */}
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#CF6733" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ambient Backlight Aura */}
        <circle cx="120" cy="80" r="68" fill="url(#adoptGlowV2)" />

        {/* ── 1. Responsive Workflow Orbit Rings ── */}
        <g className="illust-orbit-rings">
          {/* Outer Ergonomic Track */}
          <ellipse
            cx="120"
            cy="80"
            rx="72"
            ry="46"
            stroke="#A0BBFF"
            strokeWidth="1.2"
            strokeDasharray="4 5"
            opacity="0.35"
            transform="rotate(-10 120 80)"
          />

          {/* Active Flow Orbit Arc */}
          <ellipse
            cx="120"
            cy="80"
            rx="56"
            ry="34"
            stroke="url(#orbitGrad)"
            strokeWidth="1.8"
            transform="rotate(8 120 80)"
          />

          {/* Subtle Inner Resonance Ring */}
          <circle
            cx="120"
            cy="80"
            r="38"
            stroke="#A0BBFF"
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.3"
          />
        </g>

        {/* ── 2. Real User Touchpoint Nodes on Orbit ── */}
        <g className="illust-touchpoint-nodes">
          {/* Touchpoint 1: Left Workflow Input */}
          <circle cx="68" cy="74" r="5" fill="#1A1D2B" stroke="#A0BBFF" strokeWidth="1.5" />
          <circle cx="68" cy="74" r="2" fill="#A0BBFF" />

          {/* Touchpoint 2: Top Right Feedback Loop */}
          <circle cx="170" cy="62" r="5.5" fill="#1A1D2B" stroke="#CF6733" strokeWidth="1.5" />
          <circle cx="170" cy="62" r="2.5" fill="#FFE2D9" />

          {/* Touchpoint 3: Bottom Adoption Anchor */}
          <circle cx="150" cy="108" r="4" fill="#1A1D2B" stroke="#A0BBFF" strokeWidth="1.2" />
          <circle cx="150" cy="108" r="1.5" fill="#A0BBFF" />

          {/* Connecting Data Radiations */}
          <line x1="73" y1="74" x2="98" y2="78" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
          <line x1="165" y1="64" x2="140" y2="76" stroke="#CF6733" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
        </g>

        {/* ── 3. Central Human Figure / Operator Core ── */}
        <g className="illust-human-core">
          {/* Outer Halo Disc */}
          <circle cx="120" cy="80" r="22" fill="#151722" stroke="#A0BBFF" strokeWidth="1.4" />

          {/* Stylized Human Silhouette */}
          {/* Head Node */}
          <circle cx="120" cy="71" r="5.5" fill="url(#userCoreGrad)" stroke="#FFFFFF" strokeWidth="1" />

          {/* Torso / Shoulders Arc */}
          <path
            d="M109 91 C109 82 113 79 120 79 C127 79 131 82 131 91 Z"
            fill="url(#userCoreGrad)"
            stroke="#A0BBFF"
            strokeWidth="1.1"
          />

          {/* Heart / Focus Spark at center */}
          <circle cx="120" cy="84" r="1.6" fill="#CF6733" />
        </g>

        {/* ── 4. Adoption Approval Badges (Flow / Zero Resistance) ── */}
        <g className="illust-adoption-badges">
          {/* Small Checkmark Capsule (Adoption Verified) */}
          <rect x="156" y="28" width="22" height="14" rx="7" fill="#1E2438" stroke="#A0BBFF" strokeWidth="1" />
          <path d="M162 35 L165 38 L172 31" stroke="#A0BBFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

          {/* Radiating Resonance Waves from Human Center */}
          <path d="M120 48 A32 32 0 0 1 146 62" stroke="#A0BBFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <path d="M94 98 A32 32 0 0 1 120 112" stroke="#CF6733" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
