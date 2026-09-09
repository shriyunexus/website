import './heroGlassBlob.css';

/**
 * HeroGlassBlob — Executive Minimalist Optical Glass Stage
 * 
 * Designed with senior UI/UX director craftsmanship (Apple / Linear / Stripe aesthetic):
 * - Pure, pristine circular glass geometry (eliminates awkward AI-like wire doodles & potato blobs)
 * - True high-transmission frosted glassmorphism (backdrop-filter: blur(28px))
 * - Precision specular chamfered glass rim catching ambient studio light
 * - Soft, diffused atmospheric light cushion in web theme tones
 * 
 * @param {'left' | 'right'} variant
 * @param {string} className
 */
export default function HeroGlassBlob({ variant = 'left', className = '' }) {
  const isLeft = variant === 'left';
  const variantClass = isLeft ? 'hero-glass-stage-left' : 'hero-glass-stage-right';

  return (
    <div className={`hero-glass-stage-wrapper ${variantClass} ${className}`} aria-hidden="true">
      {/* 1. Atmospheric Diffused Light Cushion */}
      <div className="hero-glass-stage-ambient" />

      {/* 2. Secondary Concentric Frosted Halo Ring */}
      <div className="hero-glass-stage-halo" />

      {/* 3. Primary Precision Frosted Optical Glass Disc */}
      <div className="hero-glass-stage-disc">
        {/* 4. Directional Specular Glass Sheen */}
        <div className="hero-glass-stage-sheen" />
      </div>
    </div>
  );
}
