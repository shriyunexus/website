export default function NavbarLogo({ size = 32, onHomeClick }) {
  const handleClick = (e) => {
    const path = window.location.pathname.replace(/\/+$/, '');
    const hash = window.location.hash;
    const isAbout = path === '/about' || hash === '#about';

    if (isAbout) {
      e.preventDefault();
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      if (onHomeClick) onHomeClick();
    } else if (hash && hash !== '#') {
      // Clear hash and scroll to top
      e.preventDefault();
      window.history.pushState(null, '', '/');
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href="/"
      className="logo-nav"
      onClick={handleClick}
      aria-label="Shriyu Nexus Homepage"
    >
      <div className="logo-icon-wrap">
        <img
          src="/logo/shryu-sky-tp-logo.png"
          alt="Shriyu Logo"
          width={size}
          height={size}
          className="brand-logo-img"
          loading="eager"
        />
      </div>
    </a>
  );
}
