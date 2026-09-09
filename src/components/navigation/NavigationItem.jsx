import { useRef } from 'react';
import NavigationDropdown from './NavigationDropdown';

export default function NavigationItem({
  item,
  index = 0,
  activeDropdown,
  setActiveDropdown,
  onItemClick,
  currentPage = 'home',
}) {
  const hasDropdown = Boolean(item.items && item.items.length > 0);
  const isOpen = activeDropdown === item.id;
  const isActive =
    (item.id === 'about'    && currentPage === 'about')    ||
    (item.id === 'contact'  && currentPage === 'contact')  ||
    (item.id === 'services' && currentPage === 'services');
  const itemRef = useRef(null);

  const handleMouseEnter = () => {
    if (hasDropdown) {
      setActiveDropdown(item.id);
    }
  };

  const handleMouseLeave = () => {
    if (hasDropdown) {
      setActiveDropdown(null);
    }
  };

  const handleTriggerClick = (e) => {
    if (hasDropdown) {
      e.preventDefault();
      setActiveDropdown(isOpen ? null : item.id);
    } else if (onItemClick) {
      onItemClick();
    }
  };

  const handleLinkClick = (e) => {
    // For hash links, prevent default FIRST to stop the browser jump
    if (item.href && item.href.startsWith('#') && item.id !== 'about' && item.id !== 'contact' && item.id !== 'services') {
      e.preventDefault();
      if (onItemClick) onItemClick();

      const target = document.querySelector(item.href);
      if (!target) return;

      // Smooth scroll — positive offset skips section padding to land at content
      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          offset: 120,
          duration: 1.4,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: rect.top + scrollTop + 120, behavior: 'smooth' });
      }

      // Update URL hash cleanly (no page jump)
      window.history.pushState(null, '', item.href);
      return;
    }

    if (onItemClick) {
      onItemClick();
    }
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
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && hasDropdown) {
      e.preventDefault();
      setActiveDropdown(item.id);
    }
  };

  return (
    <div
      ref={itemRef}
      className={`nav-item-wrapper ${hasDropdown ? 'has-dropdown' : ''} ${isOpen ? 'dropdown-open' : ''} ${isActive ? 'is-active' : ''}`}
      style={{ '--i': index }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasDropdown ? (
        <button
          type="button"
          className={`nav-item flip-link nav-link-trigger ${isActive ? 'is-active' : ''}`}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls={`dropdown-${item.id}`}
        >
          <span className="txt-primary">
            {item.label}
            {item.badge && <span className="nav-link-badge">{item.badge}</span>}
          </span>
          <span className="txt-hover">
            {item.label}
            {item.badge && <span className="nav-link-badge">{item.badge}</span>}
          </span>
        </button>
      ) : (
        <a
          href={item.href}
          className={`nav-item flip-link ${isActive ? 'is-active' : ''}`}
          onClick={handleLinkClick}
        >
          <span className="txt-primary">
            {item.label}
            {item.badge && <span className="nav-link-badge">{item.badge}</span>}
          </span>
          <span className="txt-hover">
            {item.label}
            {item.badge && <span className="nav-link-badge">{item.badge}</span>}
          </span>
        </a>
      )}

      {hasDropdown && (
        <NavigationDropdown
          id={item.id}
          items={item.items}
          isOpen={isOpen}
          onClose={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
}
