import React, { useState } from 'react';

const Calculator = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    cargoType: 'general',
    deliverySpeed: 'standard',
    insurance: false
  });

  const [estimate, setEstimate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('dimensions.')) {
      const dimensionField = name.split('.')[1];
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [dimensionField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    
    // More realistic calculation
    const baseRate = 75;
    const weightCharge = formData.weight * 1.8;
    
    // Distance factor (mock)
    const distanceFactor = formData.origin && formData.destination ? 1.7 : 1;
    
    // Cargo type multiplier
    const typeMultiplier = 
      formData.cargoType === 'perishable' ? 1.9 : 
      formData.cargoType === 'hazardous' ? 2.8 : 
      formData.cargoType === 'fragile' ? 1.6 : 1;
    
    // Delivery speed multiplier
    const speedMultiplier = 
      formData.deliverySpeed === 'express' ? 2.2 :
      formData.deliverySpeed === 'priority' ? 1.5 : 1;
    
    // Insurance cost (2% of base value)
    const insuranceCost = formData.insurance ? (baseRate + weightCharge) * 0.02 : 0;
    
    // Dimensional weight calculation if dimensions provided
    let dimensionalWeightCharge = 0;
    if (formData.dimensions.length && formData.dimensions.width && formData.dimensions.height) {
      const dimensionalWeight = (formData.dimensions.length * formData.dimensions.width * formData.dimensions.height) / 5000;
      dimensionalWeightCharge = Math.max(0, dimensionalWeight - formData.weight) * 0.5;
    }
    
    const subtotal = baseRate + weightCharge + dimensionalWeightCharge;
    const total = (subtotal * distanceFactor * typeMultiplier * speedMultiplier) + insuranceCost;
    
    setEstimate({
      baseRate,
      weightCharge: weightCharge.toFixed(2),
      dimensionalWeightCharge: dimensionalWeightCharge.toFixed(2),
      distanceFactor,
      typeMultiplier,
      speedMultiplier,
      insuranceCost: insuranceCost.toFixed(2),
      total: total.toFixed(2)
    });
  };

  const resetForm = () => {
    setFormData({
      origin: '',
      destination: '',
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      cargoType: 'general',
      deliverySpeed: 'standard',
      insurance: false
    });
    setEstimate(null);
    setShowDetails(false);
  };

  return (
    <section id="calculator" className="calculator">
      <div className="container">
        <div className="calculator-header">
          <h2>Shipping Cost Calculator</h2>
          <p className="section-subtitle">Get an instant estimate for your global shipment</p>
        </div>
        
        <div className="calculator-container">
          <form onSubmit={calculateEstimate} className="calculator-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="origin">
                  <i className="icon">📍</i> Origin Country
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g., Afghanistan"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="destination">
                  <i className="icon">🎯</i> Destination Country
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Germany"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">
                  <i className="icon">⚖️</i> Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 25"
                  min="0.1"
                  step="0.1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cargoType">
                  <i className="icon">📦</i> Cargo Type
                </label>
                <select
                  id="cargoType"
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleChange}
                >
                  <option value="general">General Merchandise</option>
                  <option value="perishable">Perishable Goods</option>
                  <option value="hazardous">Hazardous Materials</option>
                  <option value="fragile">Fragile Items</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h4>Package Dimensions (cm) <span className="optional">Optional</span></h4>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="length">Length</label>
                  <input
                    type="number"
                    id="length"
                    name="dimensions.length"
                    value={formData.dimensions.length}
                    onChange={handleChange}
                    placeholder="Length"
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="width">Width</label>
                  <input
                    type="number"
                    id="width"
                    name="dimensions.width"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    placeholder="Width"
                    min="1"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="height">Height</label>
                  <input
                    type="number"
                    id="height"
                    name="dimensions.height"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    placeholder="Height"
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliverySpeed">
                  <i className="icon">🚀</i> Delivery Speed
                </label>
                <select
                  id="deliverySpeed"
                  name="deliverySpeed"
                  value={formData.deliverySpeed}
                  onChange={handleChange}
                >
                  <option value="economy">Economy (10-15 days)</option>
                  <option value="standard">Standard (7-10 days)</option>
                  <option value="express">Express (3-5 days)</option>
                  <option value="priority">Priority (1-2 days)</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <label htmlFor="insurance" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="insurance"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  <i className="icon">🛡️</i> Include Insurance
                </label>
                <span className="checkbox-description">Protect your shipment (2% of value)</span>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <i className="icon">🧮</i> Calculate Estimate
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                <i className="icon">🔄</i> Reset Form
              </button>
            </div>
          </form>
          
          <div className="estimate-result">
            <div className="result-header">
              <h3>Shipping Estimate</h3>
              <div className="result-actions">
                <button 
                  className={`btn-details ${showDetails ? 'active' : ''}`}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
            
            {estimate ? (
              <>
                <div className="total-cost">
                  <span className="cost-label">Total Estimated Cost</span>
                  <span className="cost-value">${estimate.total}</span>
                </div>
                
                {showDetails && (
                  <div className="cost-breakdown">
                    <div className="breakdown-item">
                      <span>Base Rate</span>
                      <span>${estimate.baseRate.toFixed(2)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Weight Charge</span>
                      <span>${estimate.weightCharge}</span>
                    </div>
                    {estimate.dimensionalWeightCharge > 0 && (
                      <div className="breakdown-item">
                        <span>Dimensional Weight</span>
                        <span>${estimate.dimensionalWeightCharge}</span>
                      </div>
                    )}
                    <div className="breakdown-item">
                      <span>Distance Factor</span>
                      <span>{estimate.distanceFactor}x</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Cargo Type Multiplier</span>
                      <span>{estimate.typeMultiplier}x</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Delivery Speed</span>
                      <span>{estimate.speedMultiplier}x</span>
                    </div>
                    {estimate.insuranceCost > 0 && (
                      <div className="breakdown-item">
                        <span>Insurance</span>
                        <span>${estimate.insuranceCost}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="estimate-disclaimer">
                  <p>This is an approximate calculation. Final cost may vary based on actual measurements, customs fees, and fuel surcharges.</p>
                </div>
                
                <div className="estimate-actions">
                  <button className="btn btn-primary">
                    <i className="icon">📋</i> Request Detailed Quote
                  </button>
                  <button className="btn btn-secondary">
                    <i className="icon">📞</i> Contact Specialist
                  </button>
                </div>
              </>
            ) : (
              <div className="no-estimate">
                <div className="placeholder-icon">🧮</div>
                <p>Fill out the form to calculate your shipping cost</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;