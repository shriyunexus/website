import { useState, useEffect } from 'react';
import './heroStoryboard.css';

/**
 * HeroStoryboardAnimation
 * Pure React + 60fps CSS vector animation
 */
export default function HeroStoryboardAnimation() {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    // 6 scenes, 2 seconds each = 12s loop
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % 6);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="storyboard-card" aria-label="Interactive Product Capabilities Animation">
      <div className="storyboard-inner">

        {/* SCENE 0: Geometric Shapes (Blue Square, Orange Circle, Green Pill) */}
        <div className={`sb-scene sb-scene-0 ${sceneIndex === 0 ? 'active' : ''}`}>
          <div className="sb-shape-row">
            <div className="sb-blue-square" />
            <div className="sb-orange-circle" />
          </div>
          <div className="sb-green-pill" />
        </div>

        {/* SCENE 1: "What is your idea" Pill */}
        <div className={`sb-scene sb-scene-1 ${sceneIndex === 1 ? 'active' : ''}`}>
          <div className="sb-idea-pill">
            <span className="sb-idea-text">What is your idea</span>
            <span className="sb-cursor">|</span>
          </div>
        </div>

        {/* SCENE 2: AI Sparkles Card */}
        <div className={`sb-scene sb-scene-2 ${sceneIndex === 2 ? 'active' : ''}`}>
          <div className="sb-ai-card">
            <div className="sb-sparkles-wrap">
              <svg className="sb-sparkle sb-sp-1" viewBox="0 0 100 100" fill="none">
                <path d="M50 0C50 27.6 72.4 50 100 50C72.4 50 50 72.4 50 100C50 72.4 27.6 50 0 50C27.6 50 50 27.6 50 0Z" fill="#3180FF" />
              </svg>
              <svg className="sb-sparkle sb-sp-2" viewBox="0 0 100 100" fill="none">
                <path d="M50 0C50 27.6 72.4 50 100 50C72.4 50 50 72.4 50 100C50 72.4 27.6 50 0 50C27.6 50 50 27.6 50 0Z" fill="#3180FF" />
              </svg>
              <svg className="sb-sparkle sb-sp-3" viewBox="0 0 100 100" fill="none">
                <path d="M50 0C50 27.6 72.4 50 100 50C72.4 50 50 72.4 50 100C50 72.4 27.6 50 0 50C27.6 50 50 27.6 50 0Z" fill="#3180FF" />
              </svg>
            </div>
            <h3 className="sb-ai-heading">Get smart AI guided suggestions</h3>
          </div>
        </div>

        {/* SCENE 3: Stacked Style Pills (Modern, Clean, Professional) */}
        <div className={`sb-scene sb-scene-3 ${sceneIndex === 3 ? 'active' : ''}`}>
          <div className="sb-pill-stack">
            <div className="sb-stack-pill sb-pill-blue">Modern</div>
            <div className="sb-stack-pill sb-pill-orange">Clean</div>
            <div className="sb-stack-pill sb-pill-green">Professional</div>
          </div>
        </div>

        {/* SCENE 4: Security Shield & Document */}
        <div className={`sb-scene sb-scene-4 ${sceneIndex === 4 ? 'active' : ''}`}>
          <div className="sb-security-wrap">
            <div className="sb-shield-icon-box">
              <svg className="sb-doc-svg" viewBox="0 0 80 90" fill="none">
                {/* Document Sheet */}
                <rect x="8" y="4" width="64" height="82" rx="10" stroke="#052A75" strokeWidth="6" fill="#FFFFFF" />
                <line x1="22" y1="28" x2="44" y2="28" stroke="#052A75" strokeWidth="6" strokeLinecap="round" />
                <line x1="22" y1="44" x2="48" y2="44" stroke="#052A75" strokeWidth="6" strokeLinecap="round" />
                <line x1="22" y1="60" x2="40" y2="60" stroke="#052A75" strokeWidth="6" strokeLinecap="round" />
              </svg>

              {/* Cyan/Blue Shield Overlay */}
              <div className="sb-shield-badge">
                <svg viewBox="0 0 60 70" fill="none" className="sb-shield-svg">
                  <path d="M30 4L54 16V36C54 52 30 66 30 66C30 66 6 52 6 36V16L30 4Z" fill="#3180FF" stroke="#052A75" strokeWidth="4" />
                  <path d="M22 35L28 41L40 27" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <p className="sb-security-text">
              Your sensitive info,<br />securely protected.
            </p>
          </div>
        </div>

        {/* SCENE 5: Social Proof Avatars & Logos */}
        <div className={`sb-scene sb-scene-5 ${sceneIndex === 5 ? 'active' : ''}`}>
          <div className="sb-social-grid">
            <img src="/assets/hero-anim-0.png" alt="Client 1" className="sb-avatar sb-av-1" />
            <img src="/assets/hero-anim-1.png" alt="Client 2" className="sb-avatar sb-av-2" />
            <div className="sb-logo-circle sb-lc-1">
              <span>S</span>
            </div>
            <div className="sb-social-center-text">
              Used by business owners, designers and agencies.
            </div>
            <img src="/assets/hero-anim-2.png" alt="Client 3" className="sb-avatar sb-av-3" />
            <div className="sb-logo-circle sb-lc-2">
              <div className="sb-stripes">
                <div /><div /><div />
              </div>
            </div>
            <img src="/assets/hero-anim-5.png" alt="Client 4" className="sb-avatar sb-av-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
