import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './business-needs.css';

gsap.registerPlugin(ScrollTrigger);

// Global session flag: guarantees the typewriter runs strictly ONCE per session.
// Once completed, titles permanently stay at "Something New??", "Something Better??", etc.
// Scrolling up or down will never erase the suffixes and will never re-trigger typing.
let hasGlobalTyped = false;

/* ── 4 Strategic Business Situations ─────────────────────────────────────── */
const businessNeeds = [
  {
    category: 'ZERO-TO-ONE',
    title: 'Something New??',
    titleSuffix: 'New??',
    image: '/assets/business-needs/something-new.png',
    imageAlt: 'Architectural 3D concept illustration representing zero-to-one product development, custom software, and digital platforms',
    context: 'You have an idea, or a gap in how things run, and nothing built to solve it yet.',
    resolution: 'Custom software & digital platforms',
    action: 'Build From Scratch',
    accent: '#A0BBFF',
    accentGlow: 'rgba(160, 187, 255, 0.22)',
    tags: ['Custom Software', 'Digital Platforms'],
  },
  {
    category: 'RE-ENGINEERING',
    title: 'Something Better??',
    titleSuffix: 'Better??',
    image: '/assets/business-needs/something-better.png',
    imageAlt: 'Architectural 3D concept illustration representing legacy modernization, cloud systems re-engineering, and experience rebuilding',
    context: "What you're using now is outdated, clunky, or actively getting in the way.",
    resolution: 'Modernization & experience rebuilding',
    action: 'Modernize Your Stack',
    accent: '#B4696A',
    accentGlow: 'rgba(180, 105, 106, 0.22)',
    tags: ['Modernization', 'Stack Rebuild'],
  },
  {
    category: 'AUTOMATION',
    title: 'Something Smarter??',
    titleSuffix: 'Smarter??',
    image: '/assets/business-needs/something-smarter.png',
    imageAlt: 'Architectural 3D concept illustration representing intelligent automation, connected workflows, and systems integration',
    context: 'Your team is still doing by hand what the right system could handle on its own.',
    resolution: 'Automation & integrations',
    action: 'Automate Workflows',
    accent: '#CF6733',
    accentGlow: 'rgba(207, 103, 51, 0.22)',
    tags: ['AI Workflows', 'Integrations'],
  },
  {
    category: 'SCALE',
    title: 'Something Bigger??',
    titleSuffix: 'Bigger??',
    image: '/assets/business-needs/something-bigger.png',
    imageAlt: 'Architectural 3D concept illustration representing scalable enterprise infrastructure, high-growth architecture, and performance engineering',
    context: 'What worked when you were smaller is starting to strain under real growth.',
    resolution: 'Architecture & scalable technology',
    action: 'Scale Infrastructure',
    accent: '#8EA8FF',
    accentGlow: 'rgba(142, 168, 255, 0.22)',
    tags: ['Cloud Architecture', 'High Scale'],
  },
];

const renderRevealText = (text) =>
  text.split(' ').map((word, wordIdx, arr) => (
    <span key={wordIdx} className="reveal-word">
      {word.split('').map((char, charIdx) => (
        <span key={charIdx} className="reveal-char">
          {char}
        </span>
      ))}
      {wordIdx < arr.length - 1 && <span className="reveal-space">&nbsp;</span>}
    </span>
  ));

const NeedsHeader = memo(function NeedsHeader({ eyebrowRef, headingH2Ref, subheadRef }) {
  return (
    <>
      {/* ── Eyebrow Badge (Website Theme Continuous Standard) ────────── */}
      <div className="needs-eyebrow-container" ref={eyebrowRef}>
        <div className="needs-eyebrow-badge">
          <span className="needs-eyebrow-text">WHERE WE MEET YOU</span>
          <span className="needs-eyebrow-divider" aria-hidden="true" />
          <span className="needs-eyebrow-sequence" aria-hidden="true">
            <span className="seq-dot s-1" />
            <span className="seq-dot s-2" />
            <span className="seq-dot s-3" />
            <span className="seq-dot s-4" />
          </span>
        </div>
      </div>

      {/* ── Header & Subhead ───────────────────────────────────────── */}
      <h2 className="needs-heading" ref={headingH2Ref}>
        {renderRevealText('What Does Your Business Need Next?')}
      </h2>

      <p className="needs-subhead" ref={subheadRef}>
        {renderRevealText(
          'Every business reaches a different point where technology needs to catch up. Start with the one that feels closest to where you are.'
        )}
      </p>
    </>
  );
});

export default function BusinessNeeds({ onSelectNeed }) {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingH2Ref = useRef(null);
  const subheadRef = useRef(null);
  const cardsRef = useRef([]);
  const isRunningTypingRef = useRef(false);

  // React state ensures text is permanently preserved across all re-renders and scroll movements.
  // If typing has already completed once, initial state starts with the full suffixes.
  const [typedText, setTypedText] = useState(() =>
    hasGlobalTyped
      ? businessNeeds.map((n) => n.titleSuffix)
      : ['', '', '', '']
  );
  const [activeCursorIndex, setActiveCursorIndex] = useState(-1);

  const setCardRef = (i) => (el) => {
    cardsRef.current[i] = el;
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Accessibility fallback: if reduced motion, display full titles immediately
    if (prefersReduced) {
      hasGlobalTyped = true;
      setTypedText(businessNeeds.map((n) => n.titleSuffix));
      return;
    }

    // Function to run the sequential deliberate typewriter effect once
    const startTypewriterSequence = () => {
      if (hasGlobalTyped || isRunningTypingRef.current) return;
      isRunningTypingRef.current = true;

      const suffixes = businessNeeds.map((n) => n.titleSuffix);
      let cardIdx = 0;
      let charIdx = 0;
      const currentAccumulator = ['', '', '', ''];

      setActiveCursorIndex(0);

      const step = () => {
        if (cardIdx >= suffixes.length) {
          hasGlobalTyped = true;
          isRunningTypingRef.current = false;
          setTypedText([...suffixes]);
          setTimeout(() => {
            setActiveCursorIndex(-1);
          }, 350);
          return;
        }

        const targetWord = suffixes[cardIdx];

        if (charIdx < targetWord.length) {
          currentAccumulator[cardIdx] = targetWord.slice(0, charIdx + 1);
          setTypedText([...currentAccumulator]);
          charIdx++;
          setTimeout(step, 45);
        } else {
          // Completed one word
          cardIdx++;
          charIdx = 0;
          if (cardIdx < suffixes.length) {
            setActiveCursorIndex(cardIdx);
            setTimeout(step, 180);
          } else {
            step();
          }
        }
      };

      step();
    };

    const ctx = gsap.context(() => {
      // 0. Eyebrow Badge Subtle Rise
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: eyebrowRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 1a. Heading Cinematic Character Scrub Reveal
      const h2Chars = headingH2Ref.current
        ? Array.from(headingH2Ref.current.querySelectorAll('.reveal-char'))
        : [];

      if (h2Chars.length > 0) {
        gsap.fromTo(
          h2Chars,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.012,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: headingH2Ref.current,
              start: 'top 88%',
              end: 'bottom 58%',
              scrub: 0.4,
            },
          }
        );
      }

      // 1b. Subheading Character Scrub Reveal (Matches Continuous Standard)
      const subheadChars = subheadRef.current
        ? Array.from(subheadRef.current.querySelectorAll('.reveal-char'))
        : [];

      if (subheadChars.length > 0) {
        gsap.fromTo(
          subheadChars,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.008,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: subheadRef.current,
              start: 'top 88%',
              end: 'bottom 60%',
              scrub: 0.4,
            },
          }
        );
      }

      // 2. Staggered Cards Float-In (Entrance only - stays permanent)
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector('.needs-grid'),
            start: 'top 82%',
            toggleActions: 'play none none none', // Never reverses on scroll up
          },
        }
      );

      // 3. Dedicated Typewriter ScrollTrigger
      // Fires ONCE only when the bottom of the card is achieved inside the viewport (90%)
      if (!hasGlobalTyped) {
        ScrollTrigger.create({
          trigger: cards[0] || sectionRef.current?.querySelector('.needs-grid'),
          start: 'bottom 90%',
          once: true,
          onEnter: () => {
            startTypewriterSequence();
          },
        });
      }

      // 4. Mobile & Tablet Scroll-Driven Auto-Hover & Clean Un-Hover
      const mm = gsap.matchMedia();
      mm.add('(max-width: 1024px)', () => {
        cards.forEach((cardEl) => {
          if (!cardEl) return;
          ScrollTrigger.create({
            trigger: cardEl,
            start: 'top 65%',
            end: 'bottom 35%',
            onEnter: () => {
              cards.forEach((c) => {
                if (c !== cardEl) c?.classList.remove('is-active-card');
              });
              cardEl.classList.add('is-active-card');
            },
            onEnterBack: () => {
              cards.forEach((c) => {
                if (c !== cardEl) c?.classList.remove('is-active-card');
              });
              cardEl.classList.add('is-active-card');
            },
            onLeave: () => {
              cardEl.classList.remove('is-active-card');
            },
            onLeaveBack: () => {
              cardEl.classList.remove('is-active-card');
            },
          });
        });

        // Ensure all cards un-hover when section scrolls out of view in either direction
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onLeave: () => {
            cards.forEach((c) => c?.classList.remove('is-active-card'));
          },
          onLeaveBack: () => {
            cards.forEach((c) => c?.classList.remove('is-active-card'));
          },
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (item) => {
    if (typeof onSelectNeed === 'function') {
      onSelectNeed(item.title);
    }
  };

  return (
    <section className="section-business-needs" id="capabilities" ref={sectionRef}>
      {/* Volumetric ambient background glow */}
      <div className="needs-ambient-glow" aria-hidden="true" />

      <div className="needs-container">
        {/* ── Section Header (Memoized to isolate from typewriter re-renders) ── */}
        <NeedsHeader
          eyebrowRef={eyebrowRef}
          headingH2Ref={headingH2Ref}
          subheadRef={subheadRef}
        />

        {/* ── 4-Door Interactive Matrix ──────────────────────────────── */}
        <div className="needs-grid">
          {businessNeeds.map((item, idx) => (
            <div
              key={item.title}
              ref={setCardRef(idx)}
              className="need-card"
              style={{
                '--need-accent': item.accent,
                '--need-accent-glow': item.accentGlow,
              }}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item);
                }
              }}
              aria-label={`${item.title} — ${item.resolution}`}
            >
              {/* Top Specular Perimeter Glow */}
              <div className="need-card-rim" aria-hidden="true" />
              <div className="need-card-ambient" aria-hidden="true" />

              {/* 3D Illustration Canvas (Flushes seamlessly behind sheet with zero gap) */}
              <div className="need-card-media">
                <div className="need-showcase-glow" aria-hidden="true" />
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="need-illustration-img"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="400"
                />
                <div className="need-media-glaze" aria-hidden="true" />
              </div>

              {/* Interactive Expanding Sheet */}
              <div className="need-card-sheet">
                {/* Specular Top Rim */}
                <div className="sheet-rim-highlight" aria-hidden="true" />

                {/* Sheet Top Header: Category on left, Shriyu 45° Arrow on right */}
                <div className="sheet-header">
                  <span className="sheet-category">{item.category}</span>
                  <div className="sheet-arrow-portal" aria-label={item.action}>
                    <svg
                      className="shriyu-arrow-45"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        className="arrow-stem"
                        x1="2.5"
                        y1="12.5"
                        x2="11.5"
                        y2="3.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        className="arrow-wings"
                        d="M5.5 3.5H11.5V9.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Situation Title (Starts as "Something " and sequentially types "New??", "Better??", etc.) */}
                <h3 className="sheet-title" aria-label={item.title}>
                  Something{' '}
                  <span className="sheet-title-suffix">
                    {typedText[idx]}
                  </span>
                  <span
                    className={`sheet-typing-cursor ${
                      activeCursorIndex === idx ? 'is-typing' : ''
                    }`}
                    aria-hidden="true"
                  />
                </h3>

                {/* Expandable Drawer (reveals full description and tags on hover / mobile active) */}
                <div className="sheet-drawer">
                  <div className="sheet-drawer-inner">
                    <div className="sheet-divider" aria-hidden="true" />
                    <p className="sheet-description">{item.context}</p>
                    <div className="sheet-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="sheet-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Anchored Footer: Resolution Text with Luminous Filament */}
                <div className="sheet-footer">
                  <div className="sheet-resolution">
                    <span
                      className="resolution-filament"
                      style={{ backgroundColor: item.accent }}
                      aria-hidden="true"
                    />
                    <span className="sheet-resolution-text">{item.resolution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
