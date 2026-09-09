import './heroGlassBlob.css';

/**
 * HeroGlassBlob — Organic Editorial Glass Stage
 *
 * Zen & Chill-mode luxury aesthetic:
 *   - Handcrafted organic pebble silhouette
 *   - Translucent frosted glass body with crisp specular rim
 *   - Concentric organic contour rings with subtle varying radii & wabi-sabi curvature
 *   - Slow, desynchronized harmonic breathing for pure relaxation
 *   - Left:  Intelligent Brand Blue (#A0BBFF)
 *   - Right: Warm Terracotta / Rose (#B4696A)
 */

const BLOBS = {
  left: {
    accentColor: 'rgba(160, 187, 255, 0.28)',
    bloomColor:  'rgba(160, 187, 255, 0.10)',
    strokeInner: 'rgba(100, 145, 215, 0.38)',
    strokeMid:   'rgba(120, 165, 235, 0.26)',
    strokeOuter: 'rgba(150, 190, 250, 0.18)',

    // Smooth organic pebble disc (center at 250, 250)
    disc:
      'M 410.0 250.0 C 412.5 283.5, 384.8 333.3, 358.2 358.2 ' +
      'C 331.5 383.0, 283.8 401.3, 250.0 399.1 ' +
      'C 216.2 396.8, 178.5 369.6, 155.2 344.8 ' +
      'C 132.0 320.0, 112.3 283.4, 110.5 250.0 ' +
      'C 108.7 216.6, 121.1 164.3, 144.4 144.4 ' +
      'C 167.6 124.5, 216.9 128.4, 250.0 130.5 ' +
      'C 283.1 132.6, 316.4 137.0, 343.0 157.0 ' +
      'C 369.7 176.9, 407.4 216.5, 410.0 250.0 Z',

    // Ring 1 — Inner organic contour
    ring1:
      'M 427.5 250.0 C 427.4 288.8, 395.7 340.1, 366.1 366.1 ' +
      'C 336.5 392.0, 286.1 408.3, 250.0 405.7 ' +
      'C 213.9 403.1, 176.4 376.6, 149.4 350.6 ' +
      'C 122.4 324.6, 89.1 284.7, 87.9 250.0 ' +
      'C 86.7 215.3, 115.1 163.6, 142.1 142.1 ' +
      'C 169.1 120.7, 212.6 122.8, 250.0 121.3 ' +
      'C 287.4 119.9, 337.1 111.9, 366.7 133.3 ' +
      'C 396.2 154.8, 427.6 211.2, 427.5 250.0 Z',

    // Ring 2 — Mid organic contour
    ring2:
      'M 443.1 250.0 C 440.0 295.8, 410.3 350.5, 378.1 378.1 ' +
      'C 345.9 405.7, 291.0 417.3, 250.0 415.7 ' +
      'C 209.0 414.0, 163.4 395.7, 131.9 368.1 ' +
      'C 100.4 340.5, 60.0 288.1, 61.3 250.0 ' +
      'C 62.6 211.9, 108.3 167.1, 139.7 139.7 ' +
      'C 171.2 112.3, 207.1 91.7, 250.0 85.5 ' +
      'C 292.9 79.4, 364.8 75.6, 396.9 103.1 ' +
      'C 429.1 130.5, 446.3 204.2, 443.1 250.0 Z',

    // Ring 3 — Outer organic contour
    ring3:
      'M 456.4 250.0 C 451.7 300.9, 423.1 358.3, 388.7 388.7 ' +
      'C 354.3 419.0, 297.7 430.7, 250.0 432.1 ' +
      'C 202.3 433.5, 136.5 427.7, 102.7 397.3 ' +
      'C 68.8 367.0, 43.1 295.3, 46.9 250.0 ' +
      'C 50.7 204.7, 91.7 163.0, 125.6 125.6 ' +
      'C 159.4 88.2, 201.5 32.6, 250.0 25.6 ' +
      'C 298.5 18.6, 382.2 46.0, 416.6 83.4 ' +
      'C 451.0 120.8, 461.1 199.1, 456.4 250.0 Z',
  },

  right: {
    accentColor: 'rgba(180, 105, 106, 0.26)',
    bloomColor:  'rgba(180, 105, 106, 0.09)',
    strokeInner: 'rgba(155,  85,  88, 0.36)',
    strokeMid:   'rgba(185, 110, 110, 0.24)',
    strokeOuter: 'rgba(215, 140, 135, 0.16)',

    // Smooth organic pebble disc (center at 250, 250)
    disc:
      'M 390.8 250.0 C 389.5 282.4, 366.8 320.6, 343.3 343.3 ' +
      'C 319.8 365.9, 283.8 383.1, 250.0 385.9 ' +
      'C 216.2 388.6, 162.0 382.3, 140.4 359.6 ' +
      'C 118.7 337.0, 119.2 285.5, 120.2 250.0 ' +
      'C 121.3 214.5, 124.9 174.8, 146.6 146.6 ' +
      'C 168.2 118.3, 215.9 80.0, 250.0 80.4 ' +
      'C 284.1 80.8, 327.5 120.8, 350.9 149.1 ' +
      'C 374.4 177.3, 392.1 217.6, 390.8 250.0 Z',

    // Ring 1 — Inner organic contour
    ring1:
      'M 397.7 250.0 C 396.7 284.2, 374.0 322.4, 349.4 349.4 ' +
      'C 324.8 376.4, 285.7 409.6, 250.0 412.1 ' +
      'C 214.3 414.6, 159.5 391.6, 135.4 364.6 ' +
      'C 111.3 337.6, 107.4 290.3, 105.3 250.0 ' +
      'C 103.2 209.7, 98.7 152.4, 122.8 122.8 ' +
      'C 146.9 93.2, 211.2 68.9, 250.0 72.5 ' +
      'C 288.8 76.1, 331.0 114.8, 355.7 144.3 ' +
      'C 380.3 173.9, 398.8 215.8, 397.7 250.0 Z',

    // Ring 2 — Mid organic contour
    ring2:
      'M 413.1 250.0 C 413.8 289.3, 397.3 337.3, 370.2 370.2 ' +
      'C 343.0 403.0, 290.3 446.8, 250.0 447.0 ' +
      'C 209.7 447.2, 158.6 404.3, 128.6 371.4 ' +
      'C 98.5 338.6, 74.7 295.6, 69.6 250.0 ' +
      'C 64.5 204.4, 67.8 127.8, 97.9 97.9 ' +
      'C 128.0 68.0, 205.4 64.3, 250.0 70.5 ' +
      'C 294.6 76.6, 338.2 104.7, 365.4 134.6 ' +
      'C 392.6 164.5, 412.3 210.7, 413.1 250.0 Z',

    // Ring 3 — Outer organic contour
    ring3:
      'M 438.5 250.0 C 441.7 297.7, 433.9 365.6, 402.4 402.4 ' +
      'C 371.0 439.3, 297.8 474.0, 250.0 471.0 ' +
      'C 202.2 467.9, 154.1 421.2, 115.7 384.3 ' +
      'C 77.2 347.5, 23.9 299.5, 19.2 250.0 ' +
      'C 14.6 200.5, 49.2 118.2, 87.6 87.6 ' +
      'C 126.1 57.0, 200.7 61.5, 250.0 66.3 ' +
      'C 299.3 71.1, 352.1 85.9, 383.5 116.5 ' +
      'C 414.9 147.1, 435.4 202.3, 438.5 250.0 Z',
  },
};

export default function HeroGlassBlob({ variant = 'left', className = '' }) {
  const isLeft = variant === 'left';
  const variantClass = isLeft ? 'hero-glass-stage-left' : 'hero-glass-stage-right';
  const b = BLOBS[variant];

  const discGradId = `hero-glass-grad-${variant}`;
  const rimGradId  = `hero-rim-grad-${variant}`;
  const bloomFiltId = `hero-bloom-filter-${variant}`;

  return (
    <div
      className={`hero-glass-stage-wrapper ${variantClass} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`hero-blob-svg hero-blob-svg--${variant}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Ambient soft bloom filter */}
          <filter id={bloomFiltId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          {/* Translucent Frosted Glass Radial Gradient */}
          <radialGradient
            id={discGradId}
            cx="44%"
            cy="42%"
            r="62%"
            fx="38%"
            fy="35%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.52" />
            <stop offset="55%" stopColor={isLeft ? '#A0BBFF' : '#B4696A'} stopOpacity="0.12" />
            <stop offset="100%" stopColor={isLeft ? '#A0BBFF' : '#B4696A'} stopOpacity="0.03" />
          </radialGradient>

          {/* Specular Crisp Rim Gradient (simulates top-left incident keylight) */}
          <linearGradient id={rimGradId} x1="20%" y1="15%" x2="80%" y2="85%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.70" />
            <stop offset="35%" stopColor={isLeft ? '#A0BBFF' : '#B4696A'} stopOpacity="0.35" />
            <stop offset="100%" stopColor={isLeft ? '#A0BBFF' : '#B4696A'} stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ── 0. Feathered Ambient Bloom (Atmospheric relaxation glow) ── */}
        <path
          d={b.disc}
          fill={b.bloomColor}
          filter={`url(#${bloomFiltId})`}
          className="hero-zen-bloom"
        />

        {/* ── 1. Frosted Translucent Glass Pebble Body ── */}
        <path
          d={b.disc}
          fill={`url(#${discGradId})`}
          className="hero-zen-disc-body"
        />

        {/* ── 2. Crisp Hairline Rim on the Pebble Body ── */}
        <path
          d={b.disc}
          fill="none"
          stroke={`url(#${rimGradId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="hero-zen-disc-rim"
        />

        {/* ── 3. Concentric Organic Contour Ring 1 (Inner loop) ── */}
        <path
          d={b.ring1}
          fill="none"
          stroke={b.strokeInner}
          strokeWidth="1.0"
          strokeLinejoin="round"
          className="hero-zen-ring hero-zen-ring--1"
        />

        {/* ── 4. Concentric Organic Contour Ring 2 (Mid loop) ── */}
        <path
          d={b.ring2}
          fill="none"
          stroke={b.strokeMid}
          strokeWidth="0.85"
          strokeLinejoin="round"
          className="hero-zen-ring hero-zen-ring--2"
        />

        {/* ── 5. Concentric Organic Contour Ring 3 (Outer loop) ── */}
        <path
          d={b.ring3}
          fill="none"
          stroke={b.strokeOuter}
          strokeWidth="0.75"
          strokeLinejoin="round"
          className="hero-zen-ring hero-zen-ring--3"
        />
      </svg>
    </div>
  );
}
