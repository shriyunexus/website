import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './button.css';

/**
 * Shriyu Nexus Unified Button Component
 * 
 * Enterprise design-system button encapsulating:
 * - Ronas IT direction-aware liquid fill hover physics (GPU-accelerated via GSAP)
 * - Kinetic trajectory arrow alternative (line anchored to exact center of 45° diamond)
 * - Dual-theme contrast inversion (Dark Obsidian <-> Light Porcelain)
 * - Variants: 'primary' | 'quiet' | 'secondary' | 'accent' | 'nav'
 * - Sizes: 'sm' | 'md' | 'lg'
 * - Custom fill color via fillColor prop
 * - Polymorphic element: as="button" | as="a"
 * - Full accessibility (keyboard focus-visible ring, aria-label, aria-disabled)
 */
export default function Button({
  as: Component = 'button',
  variant = 'primary', // 'primary' | 'quiet' | 'secondary' | 'accent' | 'nav'
  size = 'md', // 'sm' | 'md' | 'lg'
  showTrajectory, // undefined = auto (true for primary/quiet, false for secondary/accent/nav)
  fillColor, // optional custom hover fill color override
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  ...restProps
}) {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);

  const shouldShowTrajectory = showTrajectory !== undefined
    ? showTrajectory
    : (variant === 'primary' || variant === 'quiet');

  const isDirectionAware = variant !== 'secondary';

  useEffect(() => {
    if (!isDirectionAware) return;

    const btn = buttonRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouseEnter = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate the radius required to cover the furthest corner from entry point
      const dx = Math.max(x, rect.width - x);
      const dy = Math.max(y, rect.height - y);
      const maxRadius = Math.hypot(dx, dy);
      const diameter = Math.ceil(maxRadius * 2.15);

      fill.style.width = `${diameter}px`;
      fill.style.height = `${diameter}px`;
      fill.style.left = `${x}px`;
      fill.style.top = `${y}px`;
      if (fillColor) {
        fill.style.background = fillColor;
      }

      btn.classList.add('is-hovered');

      gsap.killTweensOf(fill);
      gsap.fromTo(
        fill,
        { scale: 0, xPercent: -50, yPercent: -50 },
        { scale: 1, duration: 0.42, ease: 'power2.out' }
      );
    };

    const handleMouseLeave = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      btn.classList.remove('is-hovered');

      gsap.killTweensOf(fill);
      gsap.to(fill, {
        left: x,
        top: y,
        scale: 0,
        xPercent: -50,
        yPercent: -50,
        duration: 0.36,
        ease: 'power2.inOut',
      });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(fill);
    };
  }, [isDirectionAware]);

  const elementProps = {
    ref: buttonRef,
    className: `shriyu-btn shriyu-btn--${variant} shriyu-btn--${size} ${className}`.trim(),
    onClick: disabled ? undefined : onClick,
    'aria-label': ariaLabel,
    disabled: Component === 'button' ? disabled : undefined,
    'aria-disabled': disabled ? 'true' : undefined,
    ...restProps,
  };

  if (Component === 'button') {
    elementProps.type = type;
  } else if (Component === 'a') {
    elementProps.href = href;
  }

  // Secondary text action variant
  if (variant === 'secondary') {
    return (
      <Component {...elementProps}>
        <span className="shriyu-btn-label">{children}</span>
        <span className="shriyu-btn-secondary-line" aria-hidden="true" />
      </Component>
    );
  }

  // Primary & Quiet variants with Ronas IT liquid hover fill & kinetic trajectory
  return (
    <Component {...elementProps}>
      {/* Direction-Aware Expanding Fill Layer */}
      <span className="shriyu-btn-fill" ref={fillRef} aria-hidden="true" />

      {/* Button Content Layer (Protected Above Fill) */}
      <span className="shriyu-btn-content">
        <span className="shriyu-btn-label">{children}</span>
        {shouldShowTrajectory && (
          <span className="shriyu-btn-trajectory" aria-hidden="true">
            <span className="shriyu-btn-diamond" />
          </span>
        )}
      </span>
    </Component>
  );
}
