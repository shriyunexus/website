import React, { useRef } from 'react';

export default function Button({
  children,
  variant = 'orange', // 'orange' | 'grey' | 'violet' | 'outline' | 'pill'
  size = 'md',        // 'sm' | 'md' | 'lg'
  full = false,
  className = '',
  explodeColor = 'violet',
  onClick,
  type = 'button',
  id,
  style,
  ...props
}) {
  const explodeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!explodeRef.current) return;
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    explodeRef.current.style.left = `${x}px`;
    explodeRef.current.style.top = `${y}px`;
  };

  const variantClass = variant ? ` ${variant}` : '';
  const sizeClass = size !== 'md' ? ` btn-${size}` : '';
  const fullClass = full ? ' full' : '';

  return (
    <button
      id={id}
      type={type}
      className={`btn-explode${variantClass}${sizeClass}${fullClass} ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={style}
      {...props}
    >
      <span className="btn-text">{children}</span>
      <span ref={explodeRef} className={`explode ${explodeColor}`}></span>
    </button>
  );
}
