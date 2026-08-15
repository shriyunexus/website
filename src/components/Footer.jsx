import LogoSVG from './LogoSVG';

export default function Footer() {
  return (
    <footer className="footer-outcrowd" id="about">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <LogoSVG width={34} height={34} />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: '#fff', marginLeft: '10px' }}>
              Shriyu Nexus
            </span>
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon">Dribbble</a>
            <a href="#" className="social-icon">𝕏 (Twitter)</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">LinkedIn</a>
            <a href="#" className="social-icon">Behance</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Shriyu Nexus Solutions. All rights reserved. Creative branding &amp; web agency.</span>
          <span>hello@shriyunexus.com</span>
        </div>
      </div>
    </footer>
  );
}
