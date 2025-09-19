import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: '✈️',
      title: 'Air Freight',
      description: 'Fast and efficient air cargo solutions for time-sensitive shipments.'
    },
    {
      id: 2,
      icon: '🚢',
      title: 'Sea Freight',
      description: 'Cost-effective ocean freight services for large volume shipments.'
    },
    {
      id: 3,
      icon: '🚚',
      title: 'Road Transport',
      description: 'Reliable ground transportation with extensive coverage.'
    },
    {
      id: 4,
      icon: '🏭',
      title: 'Warehousing',
      description: 'Secure storage solutions with advanced inventory management.'
    },
    {
      id: 5,
      icon: '📋',
      title: 'Customs Clearance',
      description: 'Expert assistance with customs documentation and procedures.'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className='service-title'>Our Services</h2>
        <p className="section-subtitle">Comprehensive logistics solutions for your business</p>
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className="service-link">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;