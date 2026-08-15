import { useState } from 'react';

const stagesData = [
  {
    id: 1,
    heading: 'Pre-seed Bootstrapped',
    desc: "This is POC stage. You have a hypothetical product idea, you want it done & tested properly to know whether it's worth the time and resources.",
    highlightPrefix: 'More than 40%',
    highlightSuffix: 'of our clients on this stage get initial investment for MVPs',
    visualTag: 'POC Stage',
    visualTitle: 'Introducing 0xUSD',
    visualSubtitle: 'Cross-chain yield-bearing stablecoin product design.',
    visualClass: 'visual-preseed',
    graphClass: 'graph-1'
  },
  {
    id: 2,
    heading: 'Seed',
    desc: 'This is an MVP stage. You approved a product-market fit and want to start working with real users, and start initial marketing efforts.',
    highlightPrefix: 'More than 25%',
    highlightSuffix: 'of our clients get Series A investment to build full-scale product and start marketing',
    visualTag: 'MVP & Growth',
    visualTitle: 'Modular Design Systems',
    visualSubtitle: '2.5x conversion boost achieved for Seed stage startups.',
    visualClass: 'visual-seed',
    graphClass: 'graph-2'
  },
  {
    id: 3,
    heading: 'Series A',
    desc: 'This is a product optimisation stage. You raised the investment and faced burn-rates while expanding further.',
    highlightPrefix: 'every start-up',
    highlightPrefixBefore: "We've helped ",
    highlightSuffix: 'we worked with at this stage to cut costs and improve user experience',
    visualTag: 'Product Optimisation',
    visualTitle: 'Enterprise Analytics Dashboard',
    visualSubtitle: 'Advanced UI/UX optimization for scaling users.',
    visualClass: 'visual-seriesa',
    graphClass: 'graph-3'
  }
];

export default function StagesSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="section-stages" id="stages">
      <div className="stages-container">
        <div className="stages-header-wrap">
          <h2 className="stages-main-title">Stages of startup development</h2>
          <p className="stages-subtitle">
            Examples of our most common engagement models into early-stage start-ups on different stages of the lifecycle.
          </p>
        </div>
        <div className="stages-sticky-grid">
          
          <div className="stages-left-column">
            {stagesData.map((stage, idx) => (
              <div
                key={stage.id}
                className={`stage-info-item${activeStage === idx ? ' active' : ''}`}
                onClick={() => setActiveStage(idx)}
              >
                <h3 className="stage-item-heading">{stage.heading}</h3>
                <div className="stage-item-body">
                  <p>{stage.desc}</p>
                  <p className="highlight-text">
                    {stage.highlightPrefixBefore || ''}
                    <span className="white">{stage.highlightPrefix}</span>{' '}
                    {stage.highlightSuffix}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="stages-right-column">
            {stagesData.map((stage, idx) => (
              <div
                key={stage.id}
                className={`stage-visual-card${activeStage === idx ? ' active' : ''}`}
              >
                <div className={`visual-inner ${stage.visualClass}`}>
                  <div className="visual-tag">{stage.visualTag}</div>
                  <h4>{stage.visualTitle}</h4>
                  <p>{stage.visualSubtitle}</p>
                  <div className={`visual-mockup-graphic ${stage.graphClass}`}></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
