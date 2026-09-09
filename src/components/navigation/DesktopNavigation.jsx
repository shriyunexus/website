import { useState } from 'react';
import NavigationItem from './NavigationItem';

export default function DesktopNavigation({ items, currentPage = 'home' }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <nav className="nav-link-wrap" id="navLinkWrap" aria-label="Main Navigation">
      <div className="nav-link-track">
        {items.map((item, index) => (
          <NavigationItem
            key={item.id}
            item={item}
            index={index}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            currentPage={currentPage}
          />
        ))}
      </div>
    </nav>
  );
}
