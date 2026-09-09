import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/button';
import './about-us.css';

gsap.registerPlugin(ScrollTrigger);

/* ── 4 Tangible Build Domains ─────────────────────────────────────────── */
const buildDomains = [
  {
    num: '01',
    category: 'ZERO-TO-ONE',
    title: 'Custom Software & Digital Platforms',
    desc: 'Bespoke web applications, client portals, and operational software built from scratch when SaaS imposes artificial limits on your actual workflow.',
    deliverables: ['Custom Web Applications', 'Client & Partner Portals', 'Operational Dashboards'],
    accent: '#A0BBFF',
    glowDark: 'rgba(160, 187, 255, 0.18)',
    glowLight: 'rgba(59, 92, 184, 0.12)',
  },
  {
    num: '02',
    category: 'RE-ENGINEERING',
    title: 'Legacy Modernization & Stack Rebuilds',
    desc: 'Rescuing strained, sluggish systems. We untangle technical debt and modernize user experiences without disrupting your live operations.',
    deliverables: ['Architecture Refactoring', 'Cloud Migration', 'UX & Performance Overhauls'],
    accent: '#B4696A',
    glowDark: 'rgba(180, 105, 106, 0.18)',
    glowLight: 'rgba(155, 77, 88, 0.12)',
  },
  {
    num: '03',
    category: 'AUTOMATION',
    title: 'Connected Workflows & Integrations',
    desc: 'Connecting fragmented databases and APIs to automate high-friction operations, eliminate manual entry, and reduce human error at scale.',
    deliverables: ['System Integrations', 'Automated Data Pipelines', 'Workflow Modernization'],
    accent: '#CF6733',
    glowDark: 'rgba(207, 103, 51, 0.18)',
    glowLight: 'rgba(192, 86, 33, 0.12)',
  },
  {
    num: '04',
    category: 'SCALE',
    title: 'Cloud Architecture & Scale Engineering',
    desc: 'High-resilience infrastructure engineered for growth. We optimize databases and backend throughput so stability holds when volume surges.',
    deliverables: ['Distributed Systems', 'Database Optimization', 'High-Availability Design'],
    accent: '#A0BBFF',
    glowDark: 'rgba(160, 187, 255, 0.18)',
    glowLight: 'rgba(59, 92, 184, 0.12)',
  },
];

/* ── 4 Operating Principles ───────────────────────────────────────────── */
const principles = [
  {
    num: '01',
    label: 'COMMERCIAL ECONOMICS FIRST',
    headline: 'Before writing code, we understand the balance sheet.',
    body: 'We evaluate workflow cost, team hours burned, and commercial payoff before scoping an architecture. If an existing off-the-shelf tool solves your problem better, we will tell you directly on day one.',
    accent: '#A0BBFF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'RUTHLESS SIMPLIFICATION',
    headline: 'More software is often a liability, not an asset.',
    body: 'Unnecessary dependencies and speculative microservices compound tech debt. We design with minimum moving parts so your core engine stays fast, debuggable, and maintainable five years from now.',
    accent: '#CF6733',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'REAL-WORLD ADOPTION',
    headline: 'If operators resist using it, the system failed.',
    body: 'An elegant database schema means nothing if field operators bypass it with spreadsheets. We map friction in daily human routines, ensuring software fits how people actually work under pressure.',
    accent: '#B4696A',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '04',
    label: 'DIRECT BUILDER ACCOUNTABILITY',
    headline: 'Direct access to the engineers writing your code.',
    body: 'Zero account executives. No junior offshore handoffs. Your technical reviews happen directly with the senior system architects responsible for each commit.',
    accent: '#A0BBFF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ── Credibility Pillars ──────────────────────────────────────────────── */
const credibilityPillars = [
  { metric: '100%', title: 'Full IP Ownership', desc: 'Every repository, commit, and asset is yours. Zero lock-in.' },
  { metric: 'Direct', title: 'Senior Access', desc: 'Straight line to the builders — no layers, no delays.' },
  { metric: 'Zero', title: 'Artificial Scope', desc: 'Clean, documented code any skilled engineer can extend.' },
  { metric: 'Grounded', title: 'Commercial Focus', desc: 'No vanity metrics. Only systems that earn measurable ROI.' },
];

export default function AboutUs({ onStartConversation }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const heroHeadlineRef = useRef(null);
  const heroLeadRef = useRef(null);
  const heroEyebrowRef = useRef(null);
  const thesisRef = useRef(null);
  const domainsRef = useRef(null);
  const principlesRef = useRef(null);
  const credibilityRef = useRef(null);
  const hundredMetricRef = useRef(null);
  const counterRefs = useRef([]);
  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero eyebrow subtle entrance
      if (heroEyebrowRef.current) {
        gsap.from(heroEyebrowRef.current, {
          y: 16,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1,
        });
      }

      // Hero lead subtle entrance
      if (heroLeadRef.current) {
        gsap.from(heroLeadRef.current, {
          y: 18,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Comparison columns
      if (thesisRef.current) {
        const cols = thesisRef.current.querySelectorAll('.thesis-comparison-col');
        gsap.from(cols, {
          y: 28,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: thesisRef.current,
            start: 'top 75%',
          },
        });
      }

      // Credibility metrics — restrained count-up for "100%" only
      if (credibilityRef.current && hundredMetricRef.current) {
        const countTarget = hundredMetricRef.current;
        const countData = { count: 0 };
        gsap.to(countData, {
          count: 100,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: credibilityRef.current,
            start: 'top 82%',
          },
          onUpdate: () => {
            countTarget.textContent = `${Math.round(countData.count)}%`;
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNavigateHome = (e, targetHash) => {
    e.preventDefault();
    window.history.pushState(null, '', `/${targetHash}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="au-root about-us-page" ref={containerRef}>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO: Editorial statement
      ══════════════════════════════════════════════════════════════════ */}
      <header className="au-hero" ref={heroRef}>
        <div className="au-hero-ambient" aria-hidden="true" />
        <div className="au-hero-grid-pattern" aria-hidden="true" />

        <div className="au-container au-hero-container">
          {/* Eyebrow badge */}
          <div className="au-eyebrow-wrap" ref={heroEyebrowRef}>
            <div className="au-eyebrow">
              <span className="au-eyebrow-dot" aria-hidden="true" />
              <span className="au-eyebrow-text">WHO WE ARE</span>
              <span className="au-eyebrow-sep" aria-hidden="true" />
              <span className="au-eyebrow-subtext">EST. 2024 · BHARUCH · AHMEDABAD · GLOBAL</span>
            </div>
          </div>

          {/* Monumental headline */}
          <h1 className="au-hero-headline" ref={heroHeadlineRef}>
            <span className="au-hl-line au-hl--thin">We build software</span>
            <span className="au-hl-line au-hl--bold">with one mandate.</span>
          </h1>

          {/* Vertical rule + lead copy layout */}
          <div className="au-hero-body" ref={heroLeadRef}>
            <div className="au-hero-rule-col" aria-hidden="true">
              <div className="au-vertical-rule" />
              <div className="au-vertical-dot" />
            </div>
            <p className="au-hero-lead">
              Most software doesn't fail from a lack of code. It fails because it was built without
              understanding the economics of the business, over-engineered for problems that didn't
              exist, or abandoned because nobody in the real workflow could use it. We founded
              Shriyu Nexus to be the exact opposite.
            </p>
          </div>

          {/* Decorative indexed marker */}
          <div className="au-hero-index" aria-hidden="true">
            <span className="au-index-label">ABOUT</span>
            <span className="au-index-rule" />
            <span className="au-index-num">001</span>
          </div>
        </div>

        {/* Full-width editorial accent line */}
        <div className="au-hero-accent-line" aria-hidden="true" />
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — THE FOUNDING THESIS: Side-by-side contrast table
      ══════════════════════════════════════════════════════════════════ */}
      <section className="au-section au-thesis" ref={thesisRef}>
        <div className="au-container">

          {/* Section header with editorial numbering */}
          <div className="au-section-header">
            <div className="au-section-num" aria-hidden="true">— 02</div>
            <div className="au-section-title-group">
              <span className="au-section-eyebrow">THE FOUNDING CONVICTION</span>
              <h2 className="au-section-heading">
                <span className="thesis-split-line">The industry is obsessed</span>
                <span className="thesis-split-line au-heading-em">with billing hours.</span>
                <span className="thesis-split-line au-heading-normal">We are obsessed with</span>
                <span className="thesis-split-line au-heading-em">solving problems.</span>
              </h2>
            </div>
          </div>

          {/* Prose manifesto */}
          <div className="au-thesis-prose">
            <p>
              When companies seek software partners, they face two broken extremes: bloated agencies
              charging massive retainers while delegating to junior contractors, or cookie-cutter template
              shops forcing unique operations into rigid, fragile workflows.
            </p>
            <p>
              Shriyu Nexus is the high-signal alternative. We treat software as capital equipment —
              every architectural decision must demonstrate clear commercial leverage, reduce operating
              friction, and stand on clean, portable foundations that you control entirely.
            </p>
          </div>

          {/* The contrast comparison — architectural layout */}
          <div className="au-thesis-comparison">
            {/* Conventional column */}
            <div className="thesis-comparison-col col-conventional">
              <div className="thesis-col-tag">
                <span className="thesis-tag-indicator conventional-indicator" aria-hidden="true" />
                <span>THE CONVENTIONAL DEV SHOP</span>
              </div>
              <h3 className="thesis-col-heading">Bloat, Overhead & Lock-In</h3>
              <ul className="thesis-col-list">
                {[
                  'Incentivized to expand scope and bill more hours',
                  'Pitched by founders, built by junior offshore developers',
                  'Theoretical architectures detached from real human use',
                  'Spaghetti code that keeps you on expensive retainers',
                ].map((item, i) => (
                  <li key={i} className="thesis-col-item">
                    <span className="thesis-item-icon thesis-icon-cross" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Divider arrow */}
            <div className="thesis-col-divider" aria-hidden="true">
              <div className="thesis-divider-line" />
              <div className="thesis-divider-arrow">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="var(--brand-blue)" strokeWidth="1" strokeOpacity="0.3"/>
                  <path d="M10 14h8M15 11l3 3-3 3" stroke="var(--brand-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="thesis-divider-line" />
            </div>

            {/* Shriyu column */}
            <div className="thesis-comparison-col col-shriyu">
              <div className="thesis-col-tag shriyu-tag">
                <span className="thesis-tag-indicator shriyu-indicator" aria-hidden="true" />
                <span>THE SHRIYU NEXUS STANDARD</span>
              </div>
              <h3 className="thesis-col-heading thesis-heading-accent">Intent, Precision & Leverage</h3>
              <ul className="thesis-col-list">
                {[
                  'Incentivized to solve the problem with minimal necessary code',
                  'Direct engineering partnership with the architects who build your software',
                  'Engineered around the messy reality of your actual workflow',
                  'Clean, documented, 100% portable codebases with full IP ownership',
                ].map((item, i) => (
                  <li key={i} className="thesis-col-item">
                    <span className="thesis-item-icon thesis-icon-check" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polyline points="1.5,5 4,7.5 8.5,2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — WHAT WE BUILD: Horizontal scrollable domain cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="au-section au-domains">
        <div className="au-container">
          <div className="au-section-header">
            <div className="au-section-num" aria-hidden="true">— 03</div>
            <div className="au-section-title-group">
              <span className="au-section-eyebrow">WHAT WE ACTUALLY BUILD</span>
              <h2 className="au-section-heading-sm">
                Four disciplines.<br />
                Rigorous engineering across each.
              </h2>
            </div>
          </div>
        </div>

        {/* Full-bleed domain cards with numbered layout */}
        <div className="au-domains-grid" ref={domainsRef}>
          {buildDomains.map((domain, i) => (
            <article
              key={domain.num}
              className={`au-domain-card ${hoveredDomain === i ? 'is-hovered' : hoveredDomain !== null ? 'is-dimmed' : ''}`}
              style={{
                '--dc-accent': domain.accent,
                '--dc-glow': domain.glowDark,
                '--dc-glow-light': domain.glowLight,
              }}
              onMouseEnter={() => setHoveredDomain(i)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              {/* Card rim */}
              <div className="au-dc-rim" aria-hidden="true" />
              {/* Corner glow */}
              <div className="au-dc-glow" aria-hidden="true" />

              {/* Number — large display */}
              <div className="au-dc-num" aria-hidden="true">{domain.num}</div>

              {/* Category pill */}
              <div className="au-dc-cat">{domain.category}</div>

              {/* Title */}
              <h3 className="au-dc-title">{domain.title}</h3>

              {/* Description */}
              <p className="au-dc-desc">{domain.desc}</p>

              {/* Deliverables */}
              <div className="au-dc-footer">
                <span className="au-dc-footer-label">DELIVERABLES</span>
                <ul className="au-dc-tags">
                  {domain.deliverables.map((d, di) => (
                    <li key={di} className="au-dc-tag">{d}</li>
                  ))}
                </ul>
              </div>

              {/* Hover accent */}
              <div className="au-dc-hover-bar" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — OPERATING PRINCIPLES: Large-format stacked layout
      ══════════════════════════════════════════════════════════════════ */}
      <section className="au-section au-principles">
        <div className="au-container">
          <div className="au-section-header">
            <div className="au-section-num" aria-hidden="true">— 04</div>
            <div className="au-section-title-group">
              <span className="au-section-eyebrow">OUR DIFFERENTIATORS</span>
              <h2 className="au-section-heading-sm">
                Four principles.<br />
                Every decision accountable to them.
              </h2>
            </div>
          </div>

          <div className="au-principles-grid" ref={principlesRef}>
            {principles.map((p, i) => (
              <div
                key={p.num}
                className={`au-principle-card ${hoveredPrinciple === i ? 'is-active is-hovered' : hoveredPrinciple !== null ? 'is-dimmed' : ''}`}
                style={{ '--pc-accent': p.accent }}
                onMouseEnter={() => setHoveredPrinciple(i)}
                onMouseLeave={() => setHoveredPrinciple(null)}
              >
                <div className="au-pc-rim" aria-hidden="true" />
                <div className="au-pc-glow" aria-hidden="true" />

                {/* Numbered-card system: desaturated oversized numeral texture */}
                <div className="au-pc-big-num" aria-hidden="true">{p.num}</div>

                {/* Icon in accent-colored circle */}
                <div className="au-pc-icon-wrap">
                  <div className="au-pc-icon">{p.icon}</div>
                </div>

                <div className="au-pc-body">
                  <div className="au-pc-meta">
                    <span className="au-pc-num">{p.num}</span>
                    <span className="au-pc-label">{p.label}</span>
                  </div>
                  <h3 className="au-pc-headline">{p.headline}</h3>
                  <p className="au-pc-text">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — RADICAL TRANSPARENCY: Full-width credibility plaque
      ══════════════════════════════════════════════════════════════════ */}
      <section className="au-section au-credibility" ref={credibilityRef}>
        <div className="au-credibility-inner">
          {/* Top rim spectrum */}
          <div className="au-cred-spectrum-rim" aria-hidden="true" />
          <div className="au-cred-ambient" aria-hidden="true" />

          <div className="au-container au-cred-container">
            <div className="au-cred-left">
              <span className="au-section-eyebrow">RADICAL TRANSPARENCY</span>
              <h2 className="au-cred-heading">
                Zero manufactured<br />metrics.
              </h2>
              <p className="au-cred-body">
                We refuse to invent synthetic heritage claims, pad case studies with advisor logos,
                or hide behind account management tiers. Every system we deploy is measured by
                production uptime, operational velocity, and verifiable bottom-line return.
              </p>
            </div>

            <div className="au-cred-right">
              {credibilityPillars.map((item, i) => (
                <div key={i} className="au-cred-item">
                  <div
                    className="au-metric-num"
                    ref={i === 0 ? hundredMetricRef : null}
                  >
                    {item.metric}
                  </div>
                  <div className="au-metric-info">
                    <strong className="au-metric-title">{item.title}</strong>
                    <p className="au-metric-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — THE OPERATING STANDARD (Editorial Pacing Beat)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="au-section au-pacing-beat" aria-label="The Operating Standard">
        <div className="au-container au-pacing-container">
          <div className="au-pacing-inner">
            <span className="au-section-eyebrow">THE OPERATING STANDARD</span>
            <blockquote className="au-pacing-quote">
              “Credibility is earned through architectural rigor, direct accountability, and software that delivers verifiable leverage from day one.”
            </blockquote>
            <cite className="au-pacing-cite">— Shriyu Nexus Engineering Charter · Protocol 01</cite>
          </div>
        </div>
      </section>
    </div>
  );
}
