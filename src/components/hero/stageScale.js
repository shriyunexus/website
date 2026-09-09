/**
 * stageScale.js — Shared "design canvas" scale calculation
 * ─────────────────────────────────────────────────────────────────────────
 * HeroStage renders everything inside a fixed 1800×1040 canvas (".stage")
 * and scales that ENTIRE canvas down uniformly to fit the viewport width.
 * The tablet showcase mockup independently needs to know that exact same scale value
 * to work out how large the video card must grow — in canvas units — so
 * that it visually fills the real screen during the full-screen expansion
 * phase (Phase 2).
 */

export const STAGE_W = 1800;
export const STAGE_H = 1040;

export function getStageScale(viewportWidth) {
  const natural = viewportWidth / STAGE_W;

  let floor = 0;
  if (viewportWidth <= 480) floor = 0.42;        // small phones
  else if (viewportWidth <= 767) floor = 0.46;   // large phones / phablets
  else if (viewportWidth <= 1024) floor = 0.52;  // tablets

  return Math.min(1, Math.max(natural, floor));
}
