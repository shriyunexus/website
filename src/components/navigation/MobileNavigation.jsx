import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import NavbarLogo from './NavbarLogo';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/button';
import { siteConfig } from './navigation.config';

export default function MobileNavigation({
  isOpen,
  onClose,
  items,
  primaryCTA,
  onCTAClick,
  currentPage = 'home',
  onHomeClick,
}) {
  const panelRef = useRef(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (e, item) => {
    onClose();
    if (item.id === 'about') {
      e.preventDefault();
      window.history.pushState(null, '', '/about');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (item.id === 'contact') {
      e.preventDefault();
      window.history.pushState(null, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (item.id === 'services') {
      e.preventDefault();
      window.history.pushState(null, '', '/services');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (currentPage !== 'home' && item.href) {
      e.preventDefault();
      window.history.pushState(null, '', `/${item.href}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else if (item.href && item.href.startsWith('#')) {
      e.preventDefault();
      // Small delay to let mobile menu close animation finish
      setTimeout(() => {
        const target = document.querySelector(item.href);
        if (!target) return;
        if (window.__lenis) {
          window.__lenis.scrollTo(target, {
            offset: 50,
            duration: 1.4,
            easing: (t) => 1 - Math.pow(1 - t, 4),
          });
        } else {
          const rect = target.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({ top: rect.top + scrollTop + 50, behavior: 'smooth' });
        }
      }, 350);
    }
  };

  const handleCTAClick = (e) => {
    onClose();
    if (onCTAClick) {
      onCTAClick(e);
    }
  };

  const content = (
    <div
      id="mobile-nav-panel"
      ref={panelRef}
      className={`mob-menu ${isOpen ? 'active' : ''}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Top Mobile Header with Logo, Theme Toggle, and Close 'X' Button */}
      <div className="mob-header">
        <NavbarLogo onHomeClick={() => { onClose(); if (onHomeClick) onHomeClick(); }} />
        <div className="mob-header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="mob-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
            title="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Center Links */}
      <div className="mob-nav-block">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
          className={
            (item.id === 'about'    && currentPage === 'about')    ||
            (item.id === 'contact'  && currentPage === 'contact')  ||
            (item.id === 'services' && currentPage === 'services')
              ? 'active-mob-link' : ''
          }
            onClick={(e) => handleLinkClick(e, item)}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Bottom Contact and CTA Block */}
      <div className="mob-social-block">
        <a href={`mailto:${siteConfig.email}`} className="mail-link">
          {siteConfig.email}
        </a>

        <Button
          variant="accent"
          className="full"
          onClick={handleCTAClick}
          aria-label={primaryCTA.label || 'Contact'}
        >
          {primaryCTA.label || 'Contact'}
        </Button>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(content, document.body);
}
