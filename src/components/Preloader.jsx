import { useState, useEffect } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={`preloader${hidden ? ' hidden' : ''}`}>
      <div className="preloader-content" id="preloaderLogoContent">
        <div className="preloader-logo-wrap">
          <svg className="preloader-logo-svg" width="320" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 'S' Swoosh Path (Draws First) */}
            <path className="preloader-path-s" d="M 60.84 14.55 L 58.01 15.43 L 55.27 16.70 L 52.83 18.26 L 50.68 20.02 L 48.63 22.17 L 46.78 24.61 L 45.12 27.54 L 43.95 30.37 L 43.16 33.30 L 42.87 35.45 L 46.09 37.30 L 49.22 39.65 C 51.86 42.58 52.05 42.97 52.05 42.97 L 52.34 42.77 L 52.05 41.60 L 51.95 39.75 L 52.15 37.30 L 52.64 35.06 L 53.71 32.32 L 55.08 30.08 L 56.05 28.81 L 58.69 26.37 L 60.94 25.00 L 60.84 14.55 Z M 47.95 57.03 L 47.75 57.13 L 48.24 60.06 L 48.24 63.28 L 47.66 66.41 L 46.97 68.36 L 45.70 70.80 L 44.43 72.56 L 41.99 74.90 L 39.84 76.27 L 39.94 87.89 L 42.87 86.91 L 45.80 85.35 L 48.93 83.01 L 51.37 80.57 L 53.12 78.32 L 54.98 75.29 L 56.15 72.75 L 57.13 69.92 L 57.71 67.48 L 58.01 65.04 L 55.47 63.87 L 52.44 61.82 L 49.22 58.69 Z" stroke="#050505" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* 'N' Monogram Path (Draws Second) */}
            <path className="preloader-path-n" d="M 30.76 34.38 L 34.38 34.38 L 38.67 35.16 L 42.29 36.52 L 45.21 38.18 L 50.49 42.68 L 56.74 50.88 L 59.86 53.61 L 59.96 34.57 L 69.24 34.47 L 69.34 65.92 L 66.21 66.02 L 62.21 65.43 L 59.47 64.55 L 56.05 62.79 L 53.12 60.74 L 50.39 58.20 L 44.34 50.39 L 40.33 46.97 L 40.33 65.92 L 30.86 66.02 Z" stroke="#050505" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
