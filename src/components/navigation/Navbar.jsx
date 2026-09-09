import { useState, useEffect, useRef } from 'react';
import NavbarLogo from './NavbarLogo';
import DesktopNavigation from './DesktopNavigation';
import ThemeToggle from './ThemeToggle';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';
import Button from '../ui/button';
import { navigationConfig, primaryCTA } from './navigation.config';
import './navbar.css';

export default function Navbar({
  onOpenModal,
  items = navigationConfig,
  cta = primaryCTA,
  currentPage = 'home',
  onHomeClick,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollState = useRef({
    isScrolled: false,
    lastY: 0,
    accumulatedDelta: 0,
    ticking: false,
    lastTransitionTime: 0,
  });

  useEffect(() => {
    scrollState.current.lastY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);

    const update = () => {
      const state = scrollState.current;
      state.ticking = false;

      if (window.innerWidth <= 767) return;

      const y = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
      const delta = y - state.lastY;
      const now = performance.now();

      // Top of page quiet zone: smoothly open and stay open when at the very top
      if (y <= 8) {
        if (state.isScrolled) {
          state.isScrolled = false;
          state.lastTransitionTime = now;
          setScrolled(false);
        }
        state.accumulatedDelta = 0;
        state.lastY = y;
        return;
      }

      // Anti-flicker lockout guard (180ms): during active morph, ignore momentum micro-jitter
      if (now - state.lastTransitionTime < 180) {
        state.lastY = y;
        return;
      }

      // Directional accumulation with intentional threshold
      if (delta > 0) {
        // Scrolling DOWN -> silently close into compact pill
        state.accumulatedDelta = Math.max(0, state.accumulatedDelta) + delta;
        if (state.accumulatedDelta >= 2 && !state.isScrolled) {
          state.isScrolled = true;
          state.lastTransitionTime = now;
          setScrolled(true);
        }
      } else if (delta < 0) {
        // Scrolling UP -> silently open into full navbar
        state.accumulatedDelta = Math.min(0, state.accumulatedDelta) + delta;
        if (state.accumulatedDelta <= -4 && state.isScrolled) {
          state.isScrolled = false;
          state.lastTransitionTime = now;
          setScrolled(false);
        }
      }

      state.lastY = y;
    };

    const onScroll = () => {
      if (!scrollState.current.ticking) {
        scrollState.current.ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    if (currentPage === 'contact') {
      const formEl = document.querySelector('#contact-form-section');
      if (formEl && window.__lenis) {
        window.__lenis.scrollTo(formEl, { offset: -40 });
      } else if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    window.history.pushState(null, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="nav-wrap">
      <header
        className={`header-outcrowd ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-active' : ''}`}
        id="mainHeader"
        role="banner"
      >
        <div className="nav-container" id="navContainer">
          {/* LEFT: Clean Monogram Logo */}
          <NavbarLogo onHomeClick={onHomeClick} />

          {/* CENTER: Flip-Text Navigation Links */}
          <DesktopNavigation items={items} currentPage={currentPage} />

          {/* RIGHT: Action Group */}
          <div className="header-btn-wrap" id="headerBtnWrap">
            <ThemeToggle />

            {/* Primary Contact CTA Button */}
            <Button
              variant="accent"
              as="a"
              href={cta.href}
              className="nav-btn-primary"
              onClick={handleCTAClick}
              aria-label={cta.label || 'Contact'}
            >
              {cta.label || 'Contact'}
            </Button>

            {/* Mobile Burger Menu Button */}
            <MobileMenuButton
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Drawer */}
        <MobileNavigation
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          items={items}
          primaryCTA={cta}
          onCTAClick={handleCTAClick}
          currentPage={currentPage}
          onHomeClick={onHomeClick}
        />
      </header>
    </div>
  );
}
