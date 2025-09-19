import React, { useState, useCallback } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">AghanGargo</h3>
            <p className="footer-description">
              Simplifying global logistics through innovative technology and exceptional service.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('home')} className="footer-link-button">Home</button></li>
              <li><button onClick={() => scrollToSection('services')} className="footer-link-button">Services</button></li>
              <li><button onClick={() => scrollToSection('calculator')} className="footer-link-button">Get Quote</button></li>
              <li><button onClick={() => scrollToSection('tracking')} className="footer-link-button">Tracking</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="footer-link-button">Contact</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Air Freight</a></li>
              <li><a href="#" className="footer-link">Sea Freight</a></li>
              <li><a href="#" className="footer-link">Road Transport</a></li>
              <li><a href="#" className="footer-link">Warehousing</a></li>
              <li><a href="#" className="footer-link">Customs Clearance</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Newsletter</h4>
            <p className="footer-newsletter-description">
              Subscribe to our newsletter for shipping insights and updates.
            </p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="newsletter-input"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="newsletter-submit-button"
                >
                  {isSubmitting ? 'Submitting...' : 'Subscribe'}
                </button>
              </div>
              {subscriptionStatus === 'success' && (
                <p className="newsletter-success-message">
                  Thank you for subscribing!
                </p>
              )}
              {subscriptionStatus === 'error' && (
                <p className="newsletter-error-message">
                  Subscription failed. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} AfghanGargo. All rights reserved.
            </p>
            <div className="legal-links">
              <a href="#" className="legal-link">Privacy Policy</a>
              <a href="#" className="legal-link">Terms & Conditions</a>
              <a href="#" className="legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;