import { useState, useEffect, useRef } from 'react';
import './preloader.css';

export default function Preloader({ onReveal, onComplete }) {
  const [phase, setPhase] = useState('drawing'); // 'drawing' -> 'bloom' -> 'exiting' -> 'hidden'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    let isFinished = false;
    let lastTime = null;
    let rafId;

    // 2200ms dedicated executive cadence
    const targetDuration = 2200;

    const tick = (now) => {
      if (isFinished) return;

      if (!lastTime) {
        lastTime = now;
        rafId = requestAnimationFrame(tick);
        return;
      }

      // Clamp delta to maximum 36ms so phone CPU stalls NEVER cause jumps
      const rawDelta = now - lastTime;
      const delta = Math.min(rawDelta, 36);
      lastTime = now;

      // Increment progress smoothly
      const increment = (delta / targetDuration) * 100;
      currentProgress = Math.min(100, currentProgress + increment);

      if (currentProgress >= 100) {
        isFinished = true;
        setProgress(100);
        setPhase('bloom');
        if (onReveal) onReveal();

        const exitTimer = setTimeout(() => {
          setPhase('exiting');

          const hideTimer = setTimeout(() => {
            setPhase('hidden');
            if (onComplete) onComplete();
          }, 850);

          return () => clearTimeout(hideTimer);
        }, 340);

        return () => clearTimeout(exitTimer);
      }

      setProgress(Math.floor(currentProgress));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [onReveal, onComplete]);

  // S stroke draws between 4% and 52% progress
  const sRatio = Math.max(0, Math.min(1, (progress - 4) / 48));
  const sEase = 1 - Math.pow(1 - sRatio, 2.5);
  const sOffset = Number((100 * (1 - sEase)).toFixed(1));

  // N stroke draws between 32% and 82% progress
  const nRatio = Math.max(0, Math.min(1, (progress - 32) / 50));
  const nEase = 1 - Math.pow(1 - nRatio, 2.5);
  const nOffset = Number((100 * (1 - nEase)).toFixed(1));

  if (phase === 'hidden') return null;

  return (
    <div
      id="preloader"
      className={`preloader preloader-${phase}`}
      aria-hidden={phase === 'exiting'}
      onTouchMove={(e) => e.preventDefault()}
      onWheel={(e) => e.preventDefault()}
    >
      {/* Volumetric Radial Aura */}
      <div className="preloader-ambient-aura" />

      {/* Atmospheric Hairline Reticle Ring */}
      <div className="preloader-reticle-ring" />

      {/* Center Cinematic Stage */}
      <div className="preloader-content" id="preloaderLogoContent">
        <div className="preloader-logo-wrap">
          <svg
            className="preloader-logo-svg"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="preloaderGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7FA4FF" />
                <stop offset="50%" stopColor="var(--brand-blue, #A0BBFF)" />
                <stop offset="100%" stopColor="#C4D7FF" />
              </linearGradient>
            </defs>

            {/* 'S' Swoosh Path (Directly Coupled to Progress 4% - 52%) */}
            <path
              className="preloader-path-s"
              pathLength="100"
              d="M 60.84 14.55 L 58.01 15.43 L 55.27 16.70 L 52.83 18.26 L 50.68 20.02 L 48.63 22.17 L 46.78 24.61 L 45.12 27.54 L 43.95 30.37 L 43.16 33.30 L 42.87 35.45 L 46.09 37.30 L 49.22 39.65 C 51.86 42.58 52.05 42.97 52.05 42.97 L 52.34 42.77 L 52.05 41.60 L 51.95 39.75 L 52.15 37.30 L 52.64 35.06 L 53.71 32.32 L 55.08 30.08 L 56.05 28.81 L 58.69 26.37 L 60.94 25.00 L 60.84 14.55 Z M 47.95 57.03 L 47.75 57.13 L 48.24 60.06 L 48.24 63.28 L 47.66 66.41 L 46.97 68.36 L 45.70 70.80 L 44.43 72.56 L 41.99 74.90 L 39.84 76.27 L 39.94 87.89 L 42.87 86.91 L 45.80 85.35 L 48.93 83.01 L 51.37 80.57 L 53.12 78.32 L 54.98 75.29 L 56.15 72.75 L 57.13 69.92 L 57.71 67.48 L 58.01 65.04 L 55.47 63.87 L 52.44 61.82 L 49.22 58.69 Z"
              stroke="var(--brand-blue, #A0BBFF)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset={sOffset}
              style={{
                strokeDashoffset: sOffset,
                opacity: progress > 3 ? 1 : 0.2,
                transition: 'stroke-dashoffset 0.05s linear',
              }}
            />

            {/* 'N' Monogram Path (Directly Coupled to Progress 32% - 82%) */}
            <path
              className="preloader-path-n"
              pathLength="100"
              d="M 30.76 34.38 L 34.38 34.38 L 38.67 35.16 L 42.29 36.52 L 45.21 38.18 L 50.49 42.68 L 56.74 50.88 L 59.86 53.61 L 59.96 34.57 L 69.24 34.47 L 69.34 65.92 L 66.21 66.02 L 62.21 65.43 L 59.47 64.55 L 56.05 62.79 L 53.12 60.74 L 50.39 58.20 L 44.34 50.39 L 40.33 46.97 L 40.33 65.92 L 30.86 66.02 Z"
              stroke="var(--brand-blue, #A0BBFF)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset={nOffset}
              style={{
                strokeDashoffset: nOffset,
                opacity: progress > 30 ? 1 : 0.15,
                transition: 'stroke-dashoffset 0.05s linear',
              }}
            />
          </svg>
        </div>

        {/* Typographic Signature & Executive Telemetry */}
        <div className="preloader-footer">
          <div className="preloader-brand-signature">
            <span className="preloader-signature-text">SHRIYU NEXUS</span>
          </div>

          <div className="preloader-telemetry">
            <div className="preloader-meta-row">
              <span className="preloader-meta-phase">
                {progress < 100 ? 'INITIALIZING SYSTEMS' : 'OPERATIONAL'}
              </span>
              <span className="preloader-meta-number">
                {String(Math.floor(progress)).padStart(2, '0')}%
              </span>
            </div>
            <div className="preloader-progress-track">
              <div
                className="preloader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
