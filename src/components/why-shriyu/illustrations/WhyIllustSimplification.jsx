import React from 'react';

/**
 * WhyIllustSimplification
 * Pillar 02: Simplification ("More software doesn't automatically mean a better business.")
 * Bespoke vector illustration: Precision filtration aperture distilling convoluted friction
 * into a single, streamlined, high-velocity architectural path ("Remove before you add").
 */
export default function WhyIllustSimplification({ className = '' }) {
  return (
    <div className={`why-illustration-wrap why-illust-simplification ${className}`}>
      <svg
        className="why-illust-svg"
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Illustration representing Simplification: filtering complex clutter into streamlined clarity"
      >
        <defs>
          {/* Ambient Glow */}
          <radialGradient id="simpGlowV2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CF6733" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#A0BBFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#CF6733" stopOpacity="0" />
          </radialGradient>

          {/* Caliper Filter Gate Gradient */}
          <linearGradient id="gateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CF6733" />
            <stop offset="50%" stopColor="#FFE2D9" />
            <stop offset="100%" stopColor="#CF6733" />
          </linearGradient>

          {/* Unified Beam Gradient */}
          <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CF6733" />
            <stop offset="40%" stopColor="#A0BBFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Background Grid Pattern */}
          <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A0BBFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#CF6733" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Backlight Aura */}
        <circle cx="120" cy="80" r="68" fill="url(#simpGlowV2)" />

        {/* Background Coordinate Ring */}
        <circle cx="120" cy="80" r="58" stroke="#A0BBFF" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.3" />

        {/* ── 1. Complex Tangled Paths (Left: Redundant Steps & Clutter) ── */}
        <g className="illust-clutter-paths" opacity="0.65">
          {/* Convoluted Path 1 (Overhead / Redundant) */}
          <path
            d="M24 45 C45 45 40 70 65 65 C85 60 92 78 116 78"
            stroke="#9E9C98"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            fill="none"
          />
          {/* Redundant Step Marker 1 (Being Pruned) */}
          <circle cx="58" cy="67" r="3" fill="#1C1F2E" stroke="#9E9C98" strokeWidth="1" />
          <line x1="56" y1="65" x2="60" y2="69" stroke="#CF6733" strokeWidth="1" />
          <line x1="60" y1="65" x2="56" y2="69" stroke="#CF6733" strokeWidth="1" />

          {/* Convoluted Path 2 (Middle Friction) */}
          <path
            d="M20 80 C50 80 55 98 75 95 C95 92 100 82 116 80"
            stroke="#9E9C98"
            strokeWidth="1.4"
            fill="none"
          />
          {/* Redundant Step Marker 2 */}
          <circle cx="78" cy="94" r="3" fill="#1C1F2E" stroke="#9E9C98" strokeWidth="1" />

          {/* Convoluted Path 3 (Bottom Detour) */}
          <path
            d="M26 115 C48 115 52 95 72 108 C90 120 102 84 116 82"
            stroke="#9E9C98"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
          />
          {/* Redundant Step Marker 3 */}
          <circle cx="86" cy="116" r="3" fill="#1C1F2E" stroke="#9E9C98" strokeWidth="1" />
        </g>

        {/* ── 2. Precision Architectural Aperture / Filter Caliper ── */}
        <g className="illust-filtration-gate">
          {/* Upper Caliper Jaw */}
          <path d="M116 28 L124 28 L122 70 L118 70 Z" fill="#1A1D2B" stroke="#CF6733" strokeWidth="1.3" />
          <circle cx="120" cy="70" r="3" fill="#FFE2D9" stroke="#CF6733" strokeWidth="1" />

          {/* Lower Caliper Jaw */}
          <path d="M116 132 L124 132 L122 90 L118 90 Z" fill="#1A1D2B" stroke="#CF6733" strokeWidth="1.3" />
          <circle cx="120" cy="90" r="3" fill="#FFE2D9" stroke="#CF6733" strokeWidth="1" />

          {/* Gate Focus Filament Ring */}
          <ellipse cx="120" cy="80" rx="4" ry="9" fill="none" stroke="url(#gateGrad)" strokeWidth="1.8" />

          {/* Stage Calibration Tick Lines */}
          <line x1="112" y1="40" x2="116" y2="40" stroke="#CF6733" strokeWidth="1" />
          <line x1="110" y1="52" x2="116" y2="52" stroke="#CF6733" strokeWidth="1" />
          <line x1="112" y1="120" x2="116" y2="120" stroke="#CF6733" strokeWidth="1" />
          <line x1="110" y1="108" x2="116" y2="108" stroke="#CF6733" strokeWidth="1" />
        </g>

        {/* ── 3. Single Streamlined High-Velocity Linear Path (Right) ── */}
        <g className="illust-streamlined-flow">
          {/* Glowing Aura along the resolved path */}
          <line x1="124" y1="80" x2="216" y2="80" stroke="#A0BBFF" strokeWidth="6" opacity="0.2" strokeLinecap="round" />

          {/* Pure Linear Path */}
          <line x1="124" y1="80" x2="216" y2="80" stroke="url(#streamGrad)" strokeWidth="2.8" strokeLinecap="round" />

          {/* Motion Velocity Dash Line */}
          <line x1="136" y1="73" x2="188" y2="73" stroke="#A0BBFF" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="146" y1="87" x2="198" y2="87" stroke="#CF6733" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

          {/* Terminal Precision Target Block */}
          <rect x="206" y="74" width="12" height="12" rx="3" fill="#A0BBFF" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M210 80 L213 83 L216 77" stroke="#0F1012" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Micro-spark of clarity */}
        <circle cx="120" cy="80" r="1.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
