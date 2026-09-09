import React from 'react';

/**
 * WhyIllustEconomics
 * Pillar 01: Economics ("Before technology, there's a business.")
 * Bespoke vector illustration: Commercial evaluation balance & business workflow prism.
 * Visualizes analyzing real costs, people, bottlenecks, and commercial ROI before building code.
 */
export default function WhyIllustEconomics({ className = '' }) {
  return (
    <div className={`why-illustration-wrap why-illust-economics ${className}`}>
      <svg
        className="why-illust-svg"
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Economics: commercial workflow analysis and capital ROI"
      >
        <defs>
          {/* Ambient Glow */}
          <radialGradient id="econGlowV2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#A0BBFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </radialGradient>

          {/* Prism Core Gradient */}
          <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3E4E88" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E2442" stopOpacity="0.2" />
          </linearGradient>

          {/* Gold Value Bar */}
          <linearGradient id="goldBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CF6733" />
            <stop offset="50%" stopColor="#F6D6CD" />
            <stop offset="100%" stopColor="#CF6733" />
          </linearGradient>

          {/* Grid lines pattern */}
          <linearGradient id="gridLineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#A0BBFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#A0BBFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Backlight Aura */}
        <circle cx="120" cy="80" r="68" fill="url(#econGlowV2)" />

        {/* ── Background Geometric Coordinate Matrix ── */}
        <g opacity="0.4">
          <circle cx="120" cy="80" r="54" stroke="#A0BBFF" strokeWidth="0.8" strokeDasharray="3 4" />
          <line x1="120" y1="20" x2="120" y2="140" stroke="url(#gridLineGrad)" strokeWidth="1" strokeDasharray="2 3" />
          <line x1="30" y1="80" x2="210" y2="80" stroke="url(#gridLineGrad)" strokeWidth="1" strokeDasharray="2 3" />
        </g>

        {/* ── Architectural Balance Pedestal / Axis ── */}
        <path d="M100 134 L120 114 L140 134 Z" fill="#1A1D2B" stroke="#A0BBFF" strokeWidth="1.2" />
        <line x1="85" y1="134" x2="155" y2="134" stroke="#A0BBFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="120" y1="62" x2="120" y2="114" stroke="#A0BBFF" strokeWidth="1.8" />

        {/* Pivot Fulcrum Dot */}
        <circle cx="120" cy="62" r="3.5" fill="#CF6733" stroke="#FFE2D9" strokeWidth="1" />

        {/* ── Dynamic Equilibrium Beam (Cost vs. Value) ── */}
        <g className="illust-balance-beam">
          {/* Main Horizontal Fulcrum Beam */}
          <line x1="56" y1="62" x2="184" y2="62" stroke="#A0BBFF" strokeWidth="2.2" strokeLinecap="round" />

          {/* Left Pan (Current Process Cost & Friction) */}
          <line x1="68" y1="62" x2="56" y2="92" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <line x1="68" y1="62" x2="80" y2="92" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M50 92 C50 99 86 99 86 92 Z" fill="#1C1F2E" stroke="#A0BBFF" strokeWidth="1.3" />
          {/* Stacked Cost / Friction Cubes */}
          <rect x="58" y="82" width="10" height="9" rx="1.5" fill="#2A3048" stroke="#A0BBFF" strokeWidth="0.9" />
          <rect x="69" y="80" width="9" height="11" rx="1.5" fill="#22273D" stroke="#A0BBFF" strokeWidth="0.9" />

          {/* Right Pan (Compounding Business Value & ROI) */}
          <line x1="172" y1="62" x2="160" y2="92" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <line x1="172" y1="62" x2="184" y2="92" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M154 92 C154 99 190 99 190 92 Z" fill="#1C1F2E" stroke="#CF6733" strokeWidth="1.3" />
          {/* Value Yield Token / Gold Ingot */}
          <polygon points="164,88 180,88 177,82 167,82" fill="url(#goldBarGrad)" stroke="#FFE2D9" strokeWidth="0.8" />
          <polygon points="167,81 177,81 175,76 169,76" fill="url(#goldBarGrad)" stroke="#FFE2D9" strokeWidth="0.8" opacity="0.9" />
        </g>

        {/* ── Central Commercial Prism Diamond ── */}
        <g className="illust-prism-core">
          {/* Isometric Diamond */}
          <polygon points="120,32 138,44 120,56 102,44" fill="url(#prismGrad)" stroke="#A0BBFF" strokeWidth="1.4" />
          <polygon points="102,44 120,56 120,70 102,58" fill="#1E2442" stroke="#A0BBFF" strokeWidth="1.4" />
          <polygon points="138,44 120,56 120,70 138,58" fill="#2A335C" stroke="#A0BBFF" strokeWidth="1.4" />

          {/* Radiant Currency / Efficiency Vector Arrow inside */}
          <path d="M116 46 L124 38 M120 38 L124 38 L124 42" stroke="#CF6733" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Subtle Floating Metrics Sparks */}
        <circle cx="152" cy="40" r="2" fill="#A0BBFF" />
        <circle cx="88" cy="46" r="1.5" fill="#CF6733" />
        <line x1="120" y1="22" x2="120" y2="28" stroke="#A0BBFF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
