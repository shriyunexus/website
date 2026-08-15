/**
 * ShowcaseMockup — Continuous crossfade edition
 * ------------------------------------------------
 * Replaces the discrete activeSlide switch with smooth, overlapping opacity
 * interpolation. Each slide has an independent opacity curve computed from
 * scroll progress, producing a visual sense of one state *transforming* into
 * the next rather than separate scenes cutting in.
 */

import { useRef } from 'react';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export default function ShowcaseMockup({ scrollProgress: p = 0 }) {
  const cardRef = useRef(null);

  /* ── Slide opacity curves — continuous crossfade ─────────────────────── */
  // Slide 0: Showcase + video
  const s0 = clamp(1 - p * 3.5, 0, 1);

  // Slide 1: Dark geometry / diamond
  const s1In = clamp((p - 0.18) * 6, 0, 1);
  const s1Out = clamp(1 - (p - 0.47) * 7, 0, 1);
  const s1 = s1In * s1Out;

  // Slide 2: Stroke typography
  const s2In = clamp((p - 0.44) * 6, 0, 1);
  const s2Out = clamp(1 - (p - 0.67) * 7, 0, 1);
  const s2 = s2In * s2Out;

  /* ── Two-Phase Screen-Aware Cinematic Animation ────────────────────────
   *
   *  PHASE 1 (p: 0.00 → 0.15) — FAST CINEMATIC RISE
   *    Tablet glides smoothly into centered position over the first 15% of scroll.
   *    Scale = 1.0. Frame intact.
   *
   *  PHASE 2 (p: 0.15 → 1.00) — IMMEDIATE & RESPONSIVE FULL-SCREEN EXPANSION
   *    Uses a responsive ease-out curve (1 - (1-p2)^1.8) so that right at this
   *    exact centered moment, size expansion begins IMMEDIATELY and visibly!
   *
   * ────────────────────────────────────────────────────────────────────── */
  const STAGE_W  = 1800;
  const STAGE_H  = 1040;
  const CARD_TOP = 738;
  const CARD_H   = 504;
  const CARD_W   = 1000;

  const winW = typeof window !== 'undefined' ? window.innerWidth  : STAGE_W;
  const winH = typeof window !== 'undefined' ? window.innerHeight : STAGE_H;

  const stageScale       = Math.min(1, winW / STAGE_W);
  const visibleStageW    = winW / stageScale;
  const visibleStageH    = winH / stageScale;

  const cardCenterYStage = CARD_TOP + CARD_H / 2; // 738 + 252 = 990px
  // Exact vertical center of viewport in stage space is 520px
  const visibleMidYStage = STAGE_H / 2; // 520px
  const peakTranslateY   = visibleMidYStage - cardCenterYStage; // -470px

  // Calculate scale needed to cover 100% of display screen with zero borders/gaps
  const EXPAND_SCALE = Math.max(visibleStageW / CARD_W, visibleStageH / CARD_H) * 1.05;

  let scale, translateY, borderRadius, cardOpacity, rotateX;

  if (p <= 0.25) {
    /* ── PHASE 1: Calm Rise to Exact Center (0% → 25%) ───────────────── */
    const p1   = clamp(p / 0.25, 0, 1);
    const ease = p1 * p1 * (3 - 2 * p1); // smoothstep ease

    scale        = 1.0;
    translateY   = ease * peakTranslateY;
    borderRadius = 36;
    cardOpacity  = 1.0;
    rotateX      = -Math.sin(Math.PI * ease) * 0.4; // subtle depth tilt

  } else {
    /* ── PHASE 2: Controlled Full-Screen Expansion (25% → 100%) ───────── */
    const p2    = clamp((p - 0.25) / 0.75, 0, 1);
    const ease2 = 1 - Math.pow(1 - p2, 2.0); // power ease-out for calm, steady expansion

    scale        = 1.0 + ease2 * (EXPAND_SCALE - 1.0);  // 1.0 → EXPAND_SCALE (100% full screen fit)
    translateY   = peakTranslateY / scale;                // lock center during scale
    borderRadius = 36 * (1 - ease2);                      // 36px → 0px
    cardOpacity  = 1.0;                                   // 100% visible throughout
    rotateX      = 0;
  }

  /* ── Supporting visual values ────────────────────────────────────── */
  const risePhase   = clamp(p / 0.25, 0, 1);
  const expandPhase = clamp((p - 0.25) / 0.75, 0, 1);
  const easeVisual  = 1 - Math.pow(1 - expandPhase, 2.0);
  // Border fully gone by end of expansion
  const borderOpacity = (0.20 + risePhase * 0.35) * (1 - easeVisual);
  // Bezel padding shrinks to 0 as frame expands to screen edges
  const bezelPad    = 10 * (1 - easeVisual);
  // Inner video radius tracks: 26px → 0px
  const videoRadius = 26 * (1 - easeVisual);
  const shadowY      = (24 + risePhase * 60) * (1 - easeVisual);
  const shadowBlur   = (40 + risePhase * 120) * (1 - easeVisual);

  /* ── Cinematic filter: blur + brightness during transformation ────────── */
  const blurWindow = 0; // blur disabled — keep video sharp
  const filterBlur = 0;
  const filterBrightness = 1 - blurWindow * 0.14;
  const filterStr = `brightness(${filterBrightness.toFixed(3)})`;

  // Background blends between slide colors as crossfades overlap
  const bg = s0 > 0.5 ? '#0d0d10'
    : s1 > 0.5 ? '#141418'
      : s2 > 0.5 ? '#101012'
        : '#0d0d10';

  return (
    /* OUTER: positioning only — no transform, no visual */
    <div className="float d2 showcase" ref={cardRef}>

      {/* MIDDLE: receives ALL scroll-driven effects */}
      <div
        className="showcase-scroll-wrap"
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) scale(${scale}) translateY(${translateY}px)`,
          borderRadius: `${borderRadius}px`,
          opacity: cardOpacity,
          filter: filterStr,
          boxShadow: `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${0.6 + expandPhase * 0.3}), inset 0 1px 0 rgba(255,255,255,${0.1 + expandPhase * 0.25})`,
          willChange: 'transform, opacity, filter',
        }}
      >

        {/* INNER: border frame + bezel — shrinks away during Phase 2 */}
        <div
          className="showcase-frame"
          style={{
            borderColor: `rgba(255,255,255,${borderOpacity})`,
            borderRadius: `${borderRadius}px`,
            background: bg,
            padding: `${bezelPad}px`,
          }}
        >
          {/* VIDEO: placed directly — border-radius collapses to 0 as it fills screen */}
          <video
            src="/showreel-home.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="showcase-video"
            style={{ borderRadius: `${videoRadius}px` }}
          />
        </div>

      </div>
    </div>
  );
}
