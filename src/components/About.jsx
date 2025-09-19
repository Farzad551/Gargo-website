import React from 'react';

const About = () => {
  const milestones = [
    { year: '2010', event: 'Company Founded', icon: '🏢' },
    { year: '2013', event: 'Expanded to European Market', icon: '🌍' },
    { year: '2015', event: 'Launched Air Freight Division', icon: '✈️' },
    { year: '2018', event: 'Reached 1 Million Shipments', icon: '📦' },
    { year: '2020', event: 'Digital Transformation Initiative', icon: '💻' },
    { year: '2023', event: 'Global Network of 150+ Countries', icon: '🤝' }
  ];

  const stats = [
    { value: '13+', label: 'Years Experience' },
    { value: '1M+', label: 'Shipments Delivered' },
    { value: '150+', label: 'Countries Served' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-intro">
          <div className="intro-text">
            <h2>Leading Global Logistics Solutions</h2>
            <p className="section-subtitle">Trusted by businesses worldwide since 2010</p>
            <p className="intro-description">
              GlobalLogistics Inc. provides comprehensive supply chain solutions tailored to meet 
              the unique needs of businesses operating in today's complex global marketplace. 
              Our innovative approach combines cutting-edge technology with deep industry expertise.
            </p>
          </div>
          <div className="intro-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <div className="text-section">
              <h3><span className="icon">🎯</span>Our Mission</h3>
              <p>To simplify global logistics through innovative technology and exceptional service, making international shipping accessible to businesses of all sizes.</p>
            </div>
            
            <div className="text-section">
              <h3><span className="icon">🌐</span>Global Reach</h3>
              <p>With offices in 25 countries and partners across 150+ nations, we provide seamless logistics solutions regardless of your shipment's origin or destination.</p>
            </div>
            
            <div className="text-section">
              <h3><span className="icon">🚚</span>Comprehensive Services</h3>
              <ul className="services-list">
                <li>Air, Ocean & Ground Freight</li>
                <li>Customs Brokerage</li>
                <li>Warehousing & Distribution</li>
                <li>Supply Chain Consulting</li>
                <li>Real-time Tracking Systems</li>
              </ul>
            </div>
          </div>
          
          <div className="milestones">
            <h3>Our Journey</h3>
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-icon">{milestone.icon}</div>
                  <div className="timeline-content">
                    <div className="timeline-year">{milestone.year}</div>
                    <div className="timeline-event">{milestone.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="certifications">
          <h3>Certifications & Accreditations</h3>
          <div className="certification-logos">
            <div className="cert-logo">
              <div className="logo-img">ISO</div>
              <p>ISO 9001:2015 Certified</p>
            </div>
            <div className="cert-logo">
              <div className="logo-img">IATA</div>
              <p>IATA Accredited</p>
            </div>
            <div className="cert-logo">
              <div className="logo-img">CBP</div>
              <p>Customs Bonded</p>
            </div>
            <div className="cert-logo">
              <div className="logo-img">EPA</div>
              <p>Environmental Compliance</p>
            </div>
          </div>
        </div>

        <div className="clients-section">
          <h3>Trusted by Industry Leaders</h3>
          <div className="client-logos">
            <div className="client-logo">TechCorp</div>
            <div className="client-logo">GlobalRetail</div>
            <div className="client-logo">AutoWorks</div>
            <div className="client-logo">MediPharm</div>
            <div className="client-logo">EcoSolutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;