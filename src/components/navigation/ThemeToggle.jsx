import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`theme-toggle-wrapper ${isDark ? 'is-dark' : 'is-light'} ${className}`}>
      <button
        type="button"
        className={`day-night-switch ${isDark ? 'night' : 'day'}`}
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Background Track with Sky & Clouds / Stars */}
        <div className="switch-track" aria-hidden="true">
          {/* Day Sky with Fluffy Layered Clouds */}
          <div className="sky-day">
            <svg className="clouds-svg" viewBox="0 0 64 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34 30C34 24.5 38.5 20 44 20C45.8 20 47.4 20.5 48.8 21.3C50.2 17.5 54 15 58.5 15C64 15 68.5 19.5 68.5 25V30H34Z"
                fill="rgba(255, 255, 255, 0.4)"
              />
              <path
                d="M26 30C26 23 32 17.5 39 17.5C41.2 17.5 43.2 18.1 45 19.2C46.8 14.5 51.5 11 57 11C64 11 69.5 16.5 69.5 23.5V30H26Z"
                fill="rgba(255, 255, 255, 0.65)"
              />
              <path
                d="M18 30C18 24.5 22 20 27.5 20C29 20 30.5 20.4 31.8 21C33.5 17 37.5 14.5 42 14.5C47.2 14.5 51.5 18.5 51.5 23.8C51.5 24.4 51.4 25.1 51.2 25.7C52.4 24.9 53.8 24.5 55.2 24.5C58.5 24.5 61.2 27.2 61.2 30H18Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>

          {/* Night Sky with Concentric Depth Arcs & Sparkling Stars */}
          <div className="sky-night">
            <div className="night-arc arc-1" />
            <div className="night-arc arc-2" />

            <svg className="stars-svg" viewBox="0 0 64 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 4-Point Diamond Sparkles */}
              <path
                d="M12 7L12.8 9.4L15.2 10.2L12.8 11L12 13.4L11.2 11L8.8 10.2L11.2 9.4L12 7Z"
                fill="#FFFFFF"
                className="star-sparkle star-1"
              />
              <path
                d="M26 18L26.6 19.8L28.4 20.4L26.6 21L26 22.8L25.4 21L23.6 20.4L25.4 19.8L26 18Z"
                fill="#FFFFFF"
                className="star-sparkle star-2"
              />
              {/* Star Dots */}
              <circle cx="6" cy="18" r="0.9" fill="#FFFFFF" className="star-dot dot-1" />
              <circle cx="19" cy="8" r="1.1" fill="#FFFFFF" className="star-dot dot-2" />
              <circle cx="18" cy="22" r="0.8" fill="#FFFFFF" className="star-dot dot-3" />
              <circle cx="28" cy="8" r="0.8" fill="#FFFFFF" className="star-dot dot-4" />
            </svg>
          </div>
        </div>

        {/* Animated Sliding Knob (Sun -> Moon) */}
        <div className="switch-knob" aria-hidden="true">
          {/* Exact Radiant Golden Sun */}
          <div className="knob-sun">
            <svg viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Golden Sun Disc with Bevel */}
              <circle cx="11" cy="11" r="9" fill="url(#sunGrad)" />
              <circle cx="11" cy="11" r="8.2" stroke="#FFF0A0" strokeWidth="0.8" opacity="0.6" />
              <defs>
                <linearGradient id="sunGrad" x1="4" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFDE59" />
                  <stop offset="1" stopColor="#FF9F1C" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Exact Textured Silver-Grey Moon with Craters */}
          <div className="knob-moon">
            <svg viewBox="0 0 22 22" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Moon Disc */}
              <circle cx="11" cy="11" r="9" fill="url(#moonGrad)" />
              <circle cx="11" cy="11" r="8.2" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.7" />
              
              {/* Realistic Inset Craters */}
              {/* Crater 1 (Top Right) */}
              <circle cx="14.5" cy="7.5" r="2.2" fill="#9CA8B8" />
              <circle cx="14.2" cy="7.2" r="1.7" fill="#8896A6" />
              {/* Crater 2 (Center Left) */}
              <circle cx="7.5" cy="12.5" r="3.2" fill="#9CA8B8" />
              <circle cx="7.2" cy="12.2" r="2.6" fill="#8896A6" />
              {/* Crater 3 (Bottom Right) */}
              <circle cx="14.2" cy="14.8" r="1.8" fill="#9CA8B8" />
              <circle cx="14" cy="14.6" r="1.4" fill="#8896A6" />

              <defs>
                <linearGradient id="moonGrad" x1="4" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F0F4F8" />
                  <stop offset="1" stopColor="#C4CFDB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}
