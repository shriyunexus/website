/**
 * ScrollAnimatedVisual
 * ---------------------
 * A reusable wrapper that owns the GSAP/scroll-driven animation surface.
 * It controls: position, scale, opacity, translateY, clipPath of the wrapper.
 *
 * Children (video, SVG, Lottie, WebGL, 3D, image…) are fully decoupled.
 * Swapping the visual content does NOT require touching the animation logic.
 *
 * Architecture:
 *   ScrollAnimatedVisual  ← animation/scroll controller
 *     └── children        ← current visual (video today, SVG/Lottie tomorrow)
 *
 * Usage:
 *   <ScrollAnimatedVisual style={...} className="...">
 *     <video src="..." autoPlay loop muted playsInline />
 *   </ScrollAnimatedVisual>
 */

import { forwardRef } from 'react';

/**
 * The wrapper element that GSAP will animate.
 * Pass `innerRef` to gain a ref to the inner DOM node from a parent.
 */
const ScrollAnimatedVisual = forwardRef(function ScrollAnimatedVisual(
  { children, className = '', style = {}, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={`scroll-animated-visual${className ? ` ${className}` : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        willChange: 'transform, opacity',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default ScrollAnimatedVisual;
