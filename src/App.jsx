import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/navigation/Navbar';
import HeroSection from './components/hero/HeroSection';
import OurProcess from './components/our-process/OurProcess';
import BusinessNeeds from './components/business-needs/BusinessNeeds';
import WhyShriyu from './components/why-shriyu/WhyShriyu';
import HowToStart from './components/how-to-start/HowToStart';
import Faq from './components/faq/Faq';
import FinalCta from './components/final-cta/FinalCta';
import Preloader from './components/preloader/Preloader';
import AboutUs from './components/about/AboutUs';
import ContactPage from './components/contact/ContactPage';
import ServicesHero from './components/services-hero/ServicesHero';
import './tokens/theme.css';

gsap.registerPlugin(ScrollTrigger);

const getActiveRoute = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash;
  if (path === '/contact' || hash === '#contact') return 'contact';
  if (path === '/about'   || hash === '#about')   return 'about';
  if (path === '/services' || hash === '#services') return 'services';
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return getActiveRoute();
  });

  useEffect(() => {
    // Executive Momentum Damped Smooth Scroll Engine (Apple / Stripe standard)
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;

    // 1. Immediately lock scroll and stop Lenis during preloader
    lenis.stop();
    window.scrollTo(0, 0);

    // 2. Intercept and neutralize any user scroll input during preloader
    const blockScrollEvents = (e) => {
      if (document.documentElement.getAttribute('data-preloading') === 'true') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const blockKeyScroll = (e) => {
      if (document.documentElement.getAttribute('data-preloading') === 'true') {
        const scrollKeys = ['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'];
        if (
          scrollKeys.includes(e.code) ||
          [' ', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'].includes(e.key)
        ) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    window.addEventListener('wheel', blockScrollEvents, { passive: false, capture: true });
    window.addEventListener('touchmove', blockScrollEvents, { passive: false, capture: true });
    window.addEventListener('keydown', blockKeyScroll, { passive: false, capture: true });

    // View router listener for pathname (/about, /contact) and hashes
    const handleRouteChange = () => {
      const activeRoute = getActiveRoute();
      setCurrentPage(activeRoute);

      const hash = window.location.hash;
      if (activeRoute === 'about' || activeRoute === 'contact') {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      } else if (hash && hash !== '#' && hash !== '#about' && hash !== '#contact') {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target && window.__lenis) {
            window.__lenis.scrollTo(target, { offset: -80 });
          }
        }, 100);
      } else {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('wheel', blockScrollEvents, { capture: true });
      window.removeEventListener('touchmove', blockScrollEvents, { capture: true });
      window.removeEventListener('keydown', blockKeyScroll, { capture: true });
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      gsap.ticker.remove(updateTicker);
      window.__lenis = null;
      lenis.destroy();
    };
  }, []);

  const handlePreloaderReveal = useCallback(() => {
    document.documentElement.setAttribute('data-preloading', 'revealing');
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    document.documentElement.removeAttribute('data-preloading');
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
      window.__lenis.start();
    }
    ScrollTrigger.refresh();
  }, []);

  const handleOpenModal = () => {
    console.log('Open contact/booking modal triggered');
  };

  const handleNavigateHome = () => {
    if (currentPage !== 'home') {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <ThemeProvider>
      {/* S -> N Monogram Logo Morphing Preloader */}
      <Preloader
        onReveal={handlePreloaderReveal}
        onComplete={handlePreloaderComplete}
      />

      <div className="app-container">
        {/* Production Rebuilt Navbar */}
        <Navbar
          onOpenModal={handleOpenModal}
          currentPage={currentPage}
          onHomeClick={handleNavigateHome}
        />

        {/* Dynamic Route View */}
        <main>
          {currentPage === 'contact' ? (
            <ContactPage onStartConversation={handleOpenModal} />
          ) : currentPage === 'about' ? (
            <AboutUs onStartConversation={handleOpenModal} />
          ) : currentPage === 'services' ? (
            <ServicesHero onExploreClick={handleOpenModal} />
          ) : (
            <>
              {/* Hero Section with Scroll-Driven Fullscreen Tablet Mockup */}
              <HeroSection onExploreClick={handleOpenModal} />

              {/* Section 2: Our Process */}
              <OurProcess />

              {/* Section 3: What Does Your Business Need Next? */}
              <BusinessNeeds onSelectNeed={handleOpenModal} />

              {/* Section 5: Why Shriyu — We Don't Build More. We Build What Matters. */}
              <WhyShriyu onOpenModal={handleOpenModal} />

              {/* Section 6: How to Start — Bring Us the Problem. We'll Find the Opportunity. */}
              <HowToStart onOpenModal={handleOpenModal} />

              {/* Section 7: FAQ — Before We Build Anything, You Should Know What You're Getting Into. */}
              <Faq />
            </>
          )}
        </main>

        {/* Section 8: Final CTA + Footer — Your Next Move Starts With a Conversation. */}
        <FinalCta
          onOpenModal={handleOpenModal}
          showCtaCard={currentPage !== 'contact'}
        />
      </div>
    </ThemeProvider>
  );
}

