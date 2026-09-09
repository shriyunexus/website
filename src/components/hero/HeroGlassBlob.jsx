import { useId } from 'react';
import './heroGlassBlob.css';

/**
 * HeroGlassBlob — Reference-matched: filled organic blob + 2 offset freehand contour rings
 *
 * Visual structure (matching reference image):
 *   1. Filled translucent glass body — centered organic oval
 *   2. Contour ring A — slightly larger, offset upper-left
 *   3. Contour ring B — slightly larger than A, offset lower-right
 *   → Creates the characteristic double-ring hand-drawn editorial border
 */

const BLOBS = {
  left: {
    // Filled body — centered organic oval, leaves clear margin
    body: `
      M 220 68
      C 292 62, 368 96, 388 168
      C 408 240, 380 324, 314 364
      C 248 404, 158 400, 98 355
      C 38 310, 35 224, 56 152
      C 77 80, 148 74, 220 68 Z
    `,
    // Ring A — slightly larger, shifted ~8px upper-left relative to body
    ringA: `
      M 212 48
      C 296 40, 386 82, 405 162
      C 424 242, 392 336, 318 378
      C 244 420, 140 414, 78 362
      C 16 310, 16 216, 40 142
      C 64 68, 128 56, 212 48 Z
    `,
    // Ring B — slightly larger than A, shifted ~5px lower-right relative to A
    ringB: `
      M 228 54
      C 314 48, 398 88, 416 170
      C 434 252, 399 346, 325 388
      C 251 430, 148 424, 86 370
      C 24 316, 22 222, 46 148
      C 70 74, 142 60, 228 54 Z
    `,
  },

  right: {
    // Slightly different organic shape for visual variety
    body: `
      M 215 65
      C 290 58, 372 95, 390 170
      C 408 245, 376 328, 308 366
      C 240 404, 148 400, 90 352
      C 32 304, 32 218, 55 148
      C 78 78, 150 72, 215 65 Z
    `,
    // Ring A
    ringA: `
      M 208 46
      C 294 38, 390 84, 406 166
      C 422 248, 388 340, 312 382
      C 236 424, 132 416, 72 360
      C 12 304, 14 210, 40 138
      C 66 66, 122 54, 208 46 Z
    `,
    // Ring B
    ringB: `
      M 224 52
      C 312 45, 402 90, 418 172
      C 434 254, 396 348, 320 390
      C 244 432, 140 422, 80 366
      C 20 310, 20 216, 45 144
      C 70 72, 136 59, 224 52 Z
    `,
  },
};

export default function HeroGlassBlob({ variant = 'left', className = '', idPrefix }) {
  const reactId = useId();
  const safeId = reactId.replace(/[:]/g, '');
  const id = idPrefix || `hgb-${variant}-${safeId}`;
  const variantClass = `hero-glass-stage-${variant}`;
  const b = BLOBS[variant];

  return (
    <div
      className={`hero-glass-stage-wrapper ${variantClass} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 440 440"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`hero-art-svg hero-art-svg--${variant}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Glass body — 5-stop diagonal frosted gradient */}
          <linearGradient id={`${id}-body`} x1="8%" y1="5%" x2="92%" y2="95%">
            <stop offset="0%"   stopColor="var(--hgb-g0)" />
            <stop offset="22%"  stopColor="var(--hgb-g1)" />
            <stop offset="50%"  stopColor="var(--hgb-g2)" />
            <stop offset="78%"  stopColor="var(--hgb-g3)" />
            <stop offset="100%" stopColor="var(--hgb-g4)" />
          </linearGradient>

          {/* Inner radial highlight — light source from top-left */}
          <radialGradient id={`${id}-inner`} cx="30%" cy="28%" r="58%">
            <stop offset="0%"   stopColor="var(--hgb-inner-0)" />
            <stop offset="50%"  stopColor="var(--hgb-inner-1)" />
            <stop offset="100%" stopColor="var(--hgb-inner-2)" />
          </radialGradient>

          {/* Soft glow for ambient aura */}
          <filter id={`${id}-glow`} x="-28%" y="-28%" width="156%" height="156%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* ── 1. Soft ambient outer glow (behind everything) ── */}
        <path
          d={b.body}
          fill={`url(#${id}-body)`}
          filter={`url(#${id}-glow)`}
          className="hgb-aura"
        />

        {/* ── 2. Filled frosted glass body ── */}
        <path
          d={b.body}
          fill={`url(#${id}-inner)`}
          className="hgb-body"
        />

        {/* ── 3. Diagonal sheen overlay ── */}
        <path
          d={b.body}
          fill={`url(#${id}-body)`}
          className="hgb-sheen"
          opacity="0.55"
        />

        {/* ── 4. Contour Ring A — offset upper-left ── */}
        <path
          d={b.ringA}
          fill="none"
          stroke="var(--hgb-ring-a)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="hgb-ring-a"
        />

        {/* ── 5. Contour Ring B — offset lower-right ── */}
        <path
          d={b.ringB}
          fill="none"
          stroke="var(--hgb-ring-b)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          className="hgb-ring-b"
        />
      </svg>
    </div>
  );
}
