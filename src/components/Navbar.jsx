import { useState, useEffect } from 'react';
import LogoSVG from './LogoSVG';
import Button from './Button';

export default function Navbar({ onOpenModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 767) {
        setScrolled(window.pageYOffset > 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="nav-wrap">
      <header className={`header-outcrowd${scrolled ? ' scrolled' : ''}`} id="mainHeader">
        <div className="nav-container" id="navContainer">

          {/* Clean Monogram Logo on Left (Exact match to screenshot) */}
          <a href="#" className="logo-nav" id="targetNavLogo" aria-label="Shriyu Nexus Solutions Home">
            <div className="logo-icon-wrap">
              <LogoSVG width={32} height={32} />
            </div>
          </a>

          {/* Center Nav Links with Dual Layer Text Flip */}
          <div className="nav-link-wrap" id="navLinkWrap">
            <a href="#cases" className="nav-item flip-link">
              <span className="txt-primary">Cases</span>
              <span className="txt-hover">Cases</span>
            </a>
            <a href="#services" className="nav-item flip-link">
              <span className="txt-primary">Service</span>
              <span className="txt-hover">Service</span>
            </a>
            <a href="#metrics" className="nav-item flip-link">
              <span className="txt-primary">Blog</span>
              <span className="txt-hover">Blog</span>
            </a>
            <a href="#stages" className="nav-item flip-link">
              <span className="txt-primary">About us</span>
              <span className="txt-hover">About us</span>
            </a>
          </div>

          {/* Header Action Button on Right (Exact match to screenshot) */}
          <div className="header-btn-wrap" id="headerBtnWrap">
            {scrolled && (
              <Button
                variant="grey"
                id="navBookBtn"
                className="nav-book-btn"
                onClick={onOpenModal}
              >
                Book a call
              </Button>
            )}

            <Button
              variant="orange"
              className="nav-contact-btn"
              onClick={onOpenModal}
            >
              Contact
            </Button>
          </div>

          {/* Mobile Burger Menu Toggle */}
          <button
            className="burger-wrap"
            id="burgerWrap"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>

        </div>

        {/* Mobile Fullscreen Navigation Dropdown */}
        <div className={`mob-menu${mobileOpen ? ' active' : ''}`} id="mobMenu">
          <div className="mob-nav-block">
            <a href="#cases" onClick={() => setMobileOpen(false)}>Cases</a>
            <a href="#services" onClick={() => setMobileOpen(false)}>Service</a>
            <a href="#metrics" onClick={() => setMobileOpen(false)}>Blog</a>
            <a href="#stages" onClick={() => setMobileOpen(false)}>About us</a>
          </div>
          <div className="mob-social-block">
            <a href="mailto:hello@shriyunexus.com" className="mail-link">hello@shriyunexus.com</a>
            <Button
              variant="orange"
              full
              onClick={() => { setMobileOpen(false); onOpenModal(); }}
            >
              Contact
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
