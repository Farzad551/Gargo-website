import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Supply Chain Director',
      company: 'TechGlobal Inc.',
      content: 'GlobalShipp has transformed our supply chain. Their reliable service and real-time tracking have reduced our shipping costs by 23% in the first year.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Logistics Manager',
      company: 'Oceanic Imports',
      content: 'The customs clearance service is exceptional. What used to take weeks now happens in days, with no paperwork headaches on our end.',
      rating: 5
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      position: 'Operations Director',
      company: 'EuroFashion Retail',
      content: 'Their warehousing solutions have helped us scale our business efficiently. The inventory management system is intuitive and powerful.',
      rating: 4
    }
  ];

  const partners = [
    { name: 'TechGlobal', logo: 'TG' },
    { name: 'Oceanic', logo: 'OC' },
    { name: 'EuroFashion', logo: 'EF' },
    { name: 'PrimeGoods', logo: 'PG' },
    { name: 'GlobalElectro', logo: 'GE' },
    { name: 'StyleHub', logo: 'SH' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentTestimonial]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToTestimonial = (index) => {
    if (index === currentTestimonial) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTransitioning(false);
    }, 300);
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'star filled' : 'star'}>
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">Trusted by industry leaders worldwide</p>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-slider">
            <button 
              className="slider-btn prev" 
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            
            <div className={`testimonial-card ${isTransitioning ? 'fading' : ''}`}>
              <div className="quote-icon">"</div>
              <div className="testimonial-content">
                <p>"{testimonials[currentTestimonial].content}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[currentTestimonial].name}</h4>
                <p className="author-position">{testimonials[currentTestimonial].position}</p>
                <p className="author-company">{testimonials[currentTestimonial].company}</p>
                <div className="rating">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>
            </div>
            
            <button 
              className="slider-btn next" 
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;