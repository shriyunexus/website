import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroStage from './components/HeroStage';
import StatsSection from './components/StatsSection';
import StagesSection from './components/StagesSection';
import ServicesSection from './components/ServicesSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* ─── Top 0.01% World-Class Lenis Smooth Scroll Engine ──────────────────── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.065, // Calibrated smooth lerp rate to slow down scroll velocity
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* S -> N Monogram Logo Morphing Preloader */}
      <Preloader />

      {/* Floating Dynamic Navbar */}
      <Navbar onOpenModal={openModal} />

      {/* Hero Stage with 3D Dashboard & Interactive Widgets */}
      <HeroStage onOpenModal={openModal} />

      {/* Main Website Sections */}
      <main className="page-main-content">
        <StatsSection />
        <StagesSection />
        <ServicesSection />
      </main>

      {/* Interactive Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Footer */}
      <Footer />
    </>
  );
}
