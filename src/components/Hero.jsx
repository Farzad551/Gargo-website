import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1>Your Gateway to Easy International Shipping</h1>
          <p>Fast, secure, and reliable cargo solutions worldwide.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('calculator')}>Get a Quote</button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('tracking')}>Track Shipment</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;