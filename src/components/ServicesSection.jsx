import { useRef } from 'react';

const servicesList = [
  {
    icon: '✦',
    name: 'Brand Strategy',
    desc: 'We establish comprehensive product-market fit hypotheses, validate them, and visualise in the most creative ways.'
  },
  {
    icon: '🎨',
    name: 'Brand Visual',
    desc: 'We create brand materials that speak of your values non-verbally and complement your offering to the market.'
  },
  {
    icon: '💻',
    name: 'Platforms',
    desc: "We think about the big picture and focus primarily on your app's business success. We research deeply, validate thoroughly, and launch confidently."
  },
  {
    icon: '🌐',
    name: 'Website',
    desc: "We don't just design websites. We build reliable sales & marketing tools that drive predictably good metrics."
  },
  {
    icon: '📱',
    name: 'Mobile Apps',
    desc: "We're masters of UX gamification and user engagement. We make usable products that attract and retain users."
  },
  {
    icon: '⚡',
    name: 'Development',
    desc: "We take care of your product's implementation, assuring the most efficient usage of time & resources in every decision & line of code."
  }
];

export default function ServicesSection() {
  const cardsRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.getElementsByClassName('service-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section className="section-services" id="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Services</h2>
          <p className="services-subtitle">
            Whether you need a full-scale IT partner to define the roadmap or a vendor for particular tasks, we got you
          </p>
          <div className="services-tag-pill">Complex solution</div>
        </div>
        
        <div className="services-grid" id="cards" ref={cardsRef} onMouseMove={handleMouseMove}>
          {servicesList.map((srv, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon">{srv.icon}</div>
              <h3 className="service-name">{srv.name}</h3>
              <p className="service-desc">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
