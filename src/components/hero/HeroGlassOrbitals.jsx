import { forwardRef } from 'react';

/**
 * HeroGlassOrbitals — Background container
 * All background rings, tracks, and crosshair nodes removed per design request.
 */
const HeroGlassOrbitals = forwardRef(function HeroGlassOrbitals(props, ref) {
  return <div className="hero-glass-orbitals-container" ref={ref} aria-hidden="true" style={{ display: 'none' }} />;
});

export default HeroGlassOrbitals;
