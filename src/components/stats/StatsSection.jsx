import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './stats.css';

gsap.registerPlugin(ScrollTrigger);

const statementLines = [
  'We understand',
  'design, build and evolve',
  'digital solutions around',
  'the way your business',
  'actually works.',
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      /* ── Alphabet-by-Alphabet Scroll Reveal ─────────────────────────── */
      const charEls = headingRef.current
        ? Array.from(headingRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (charEls.length > 0) {
        gsap.fromTo(
          charEls,
          { opacity: 0.12, y: 6 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              end: 'bottom 45%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-cards-statement" id="process" ref={sectionRef}>
      <div className="container-cards">
        {/* Statement Heading — Alphabet-by-Alphabet Typewriter Reveal */}
        <h2 className="outcrowd-statement-heading" ref={headingRef}>
          {statementLines.map((line, lineIdx) => (
            <span key={lineIdx} className="statement-line">
              {line.split('').map((char, charIdx) => (
                <span key={charIdx} className="reveal-char">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
