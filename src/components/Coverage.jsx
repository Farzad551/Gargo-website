import React, { useState } from 'react';

const Coverage = () => {
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [showAllRegions, setShowAllRegions] = useState(false);

  const regions = [
    { name: 'Asia Pacific', countries: ['Afghanistan', 'Pakistan','Iran','Tajikstan','Uzbakistan','China', 'Japan', 'South Korea', 'Australia', 'Singapore', 'India'] },
    { name: 'North America', countries: ['United States', 'Canada', 'Mexico'] },
    { name: 'Europe', countries: ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'] },
    { name: 'South America', countries: ['Brazil', 'Argentina', 'Chile', 'Colombia'] },
    { name: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Israel', 'Qatar'] },
    { name: 'Africa', countries: ['South Africa', 'Egypt', 'Nigeria', 'Kenya'] }
  ];

  const allCountries = regions.flatMap(region => region.countries);
  const popularRoutes = [
    { from: 'Afghanistan', to: 'Pakistan', available: true },
    { from: 'Afghanistan', to: 'Germany', available: true },
    { from: 'Afghanistan', to: 'United States', available: true },
    { from: 'Pakistan', to: 'Portugal', available: false },
    { from: 'Brazil', to: 'Portugal', available: false },
  ];

  const serviceTypes = [
    { name: 'Air Freight', icon: '✈️', available: true },
    { name: 'Ocean Freight', icon: '🚢', available: true },
    { name: 'Road Transport', icon: '🚚', available: true },
    { name: 'Express Delivery', icon: '📦', available: true },
    { name: 'Customs Brokerage', icon: '📋', available: true }
  ];

  const checkAvailability = () => {
    if (selectedFrom && selectedTo) {
      // More realistic check based on actual regions
      const fromRegion = regions.find(region => region.countries.includes(selectedFrom));
      const toRegion = regions.find(region => region.countries.includes(selectedTo));
      
      // Assume we serve all major regions
      setIsAvailable(!!fromRegion && !!toRegion);
    }
  };

  return (
    <section id="coverage" className="coverage">
      <div className="container">
        <div className="coverage-header">
          <h2>Global Network Coverage</h2>
          <p className="section-subtitle">Serving businesses across 150+ countries with reliable logistics solutions</p>
        </div>
        
        <div className="coverage-content">
          <div className="map-section">
            <div className="map-visualization">
              <div className="world-map">
                <div className="region americas" data-region="americas">
                  <span className="region-name">Americas</span>
                  <span className="country-count">23 countries</span>
                </div>
                <div className="region europe" data-region="europe">
                  <span className="region-name">Europe</span>
                  <span className="country-count">38 countries</span>
                </div>
                <div className="region asia" data-region="asia">
                  <span className="region-name">Asia Pacific</span>
                  <span className="country-count">42 countries</span>
                </div>
                <div className="region africa" data-region="africa">
                  <span className="region-name">Africa</span>
                  <span className="country-count">29 countries</span>
                </div>
                <div className="region middle-east" data-region="middle-east">
                  <span className="region-name">Middle East</span>
                  <span className="country-count">18 countries</span>
                </div>
              </div>
              
              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-color direct-service"></div>
                  <span>Direct Service</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color partner-service"></div>
                  <span>Partner Network</span>
                </div>
              </div>
            </div>
            
            <div className="coverage-stats">
              <div className="stat">
                <div className="stat-value">150+</div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat">
                <div className="stat-value">500+</div>
                <div className="stat-label">Global Partners</div>
              </div>
              <div className="stat">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support Coverage</div>
              </div>
            </div>
          </div>
          
          <div className="route-checker">
            <div className="checker-header">
              <h3>Route Availability Checker</h3>
              <p>Verify service availability between countries</p>
            </div>
            
            <div className="route-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from-country">
                    <i className="icon">📤</i> Origin Country
                  </label>
                  <select 
                    id="from-country" 
                    value={selectedFrom} 
                    onChange={(e) => setSelectedFrom(e.target.value)}
                  >
                    <option value="">Select origin country</option>
                    {regions.map(region => (
                      <optgroup key={region.name} label={region.name}>
                        {region.countries.map(country => (
                          <option key={`from-${country}`} value={country}>{country}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="to-country">
                    <i className="icon">📥</i> Destination Country
                  </label>
                  <select 
                    id="to-country" 
                    value={selectedTo} 
                    onChange={(e) => setSelectedTo(e.target.value)}
                  >
                    <option value="">Select destination country</option>
                    {regions.map(region => (
                      <optgroup key={region.name} label={region.name}>
                        {region.countries.map(country => (
                          <option key={`to-${country}`} value={country}>{country}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              
              <button 
                onClick={checkAvailability} 
                disabled={!selectedFrom || !selectedTo}
                className="btn btn-primary check-btn"
              >
                <i className="icon">🔍</i> Check Availability
              </button>
              
              {isAvailable !== null && (
                <div className={`availability-result ${isAvailable ? 'available' : 'unavailable'}`}>
                  <div className="result-icon">
                    {isAvailable ? '✓' : '✗'}
                  </div>
                  <div className="result-content">
                    <h4>{isAvailable ? 'Route Available!' : 'Limited Service'}</h4>
                    <p>
                      {isAvailable 
                        ? `We provide direct service from ${selectedFrom} to ${selectedTo}`
                        : `Service between ${selectedFrom} and ${selectedTo} requires special arrangement`
                      }
                    </p>
                    {!isAvailable && (
                      <button className="btn btn-secondary">
                        Contact for Alternatives
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="popular-routes">
              <h4>Popular Routes</h4>
              <div className="routes-list">
                {popularRoutes.map((route, index) => (
                  <div key={index} className="route-item">
                    <span className="route-name">{route.from} → {route.to}</span>
                    <span className={`route-status ${route.available ? 'available' : 'unavailable'}`}>
                      {route.available ? 'Available' : 'On Request'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="services-section">
          <h3>Our Global Services</h3>
          <div className="services-grid">
            {serviceTypes.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h4>{service.name}</h4>
                <span className={`service-status ${service.available ? 'available' : 'unavailable'}`}>
                  {service.available ? 'Globally Available' : 'Select Regions'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="regional-coverage">
          <div className="section-header">
            <h3>Regional Coverage</h3>
            <button 
              className="toggle-regions"
              onClick={() => setShowAllRegions(!showAllRegions)}
            >
              {showAllRegions ? 'Show Less' : 'View All Regions'}
            </button>
          </div>
          
          <div className="regions-grid">
            {regions.slice(0, showAllRegions ? regions.length : 4).map((region, index) => (
              <div key={index} className="region-card">
                <h4>{region.name}</h4>
                <div className="countries-list">
                  {region.countries.map((country, idx) => (
                    <span key={idx} className="country-tag">{country}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;