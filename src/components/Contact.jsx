// components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactMethods = [
    {
      title: 'Customer Support',
      details: 'Our dedicated team is ready to assist you with any inquiries',
      email: 'support@globalshipp.com',
      phone: '+93 (0) 700-3476-99',
      hours: 'Available 24/7',
      icon: '📞'
    },
    {
      title: 'Sales Department',
      details: 'Interested in our services? Our sales team can help',
      email: 'sales@globalshipp.com',
      phone: '+1 (800) 123-SALE',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM EST',
      icon: '💼'
    },
    {
      title: 'Emergency Support',
      details: 'Urgent shipping issues requiring immediate attention',
      email: 'emergency@globalshipp.com',
      phone: '+1 (800) 123-HELP',
      hours: '24/7 Priority Line',
      icon: '🚨'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">Connect with our logistics experts for personalized solutions</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Contact Information</h3>
              <p>Reach out through any of these channels for assistance with your shipping needs</p>
              
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <div key={index} className="contact-method">
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-details">
                      <h4>{method.title}</h4>
                      <p className="method-description">{method.details}</p>
                      <div className="contact-details">
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <a href={`mailto:${method.email}`}>{method.email}</a>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Phone:</span>
                          <a href={`tel:${method.phone}`}>{method.phone}</a>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Hours:</span>
                          <span>{method.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        
          </div>
          
          <div className="contact-form-container">
            <div className="form-card">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and our team will respond within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+93 (0) 700-4567-87"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an inquiry type</option>
                    <option value="general">General Information</option>
                    <option value="quote">Request a Quote</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="form-message success">
                    <span>✓</span>
                    Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="form-message error">
                    <span>⚠</span>
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;