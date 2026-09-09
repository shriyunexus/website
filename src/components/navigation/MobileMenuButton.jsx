export default function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={`nav-mobile-toggle ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-panel"
    >
      <span className="burger-box" aria-hidden="true">
        <span className="burger-line line-1" />
        <span className="burger-line line-2" />
        <span className="burger-line line-3" />
      </span>
    </button>
  );
}
