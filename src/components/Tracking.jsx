import React, { useState, useEffect } from 'react';


const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipmentData, setShipmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate] = useState(new Date());

  // Generate dynamic dates relative to current date
  const generateTrackingEvents = () => {
    const events = [];
    const now = new Date();
    
    // Order Received (7 days ago)
    const orderReceived = new Date(now);
    orderReceived.setDate(orderReceived.getDate() - 7);
    orderReceived.setHours(9, 30, 45);
    
    // Processing (6 days ago)
    const processing = new Date(now);
    processing.setDate(processing.getDate() - 6);
    processing.setHours(14, 15, 22);
    
    // Picked Up (5 days ago)
    const pickedUp = new Date(now);
    pickedUp.setDate(pickedUp.getDate() - 5);
    pickedUp.setHours(10, 45, 18);
    
    // In Transit (3 days ago)
    const inTransit = new Date(now);
    inTransit.setDate(inTransit.getDate() - 3);
    inTransit.setHours(8, 20, 33);
    
    // Customs Clearance (today)
    const customsClearance = new Date(now);
    customsClearance.setHours(11, 30, 0);
    
    // Out for Delivery (tomorrow)
    const outForDelivery = new Date(now);
    outForDelivery.setDate(outForDelivery.getDate() + 1);
    outForDelivery.setHours(9, 0, 0);
    
    // Delivered (day after tomorrow)
    const delivered = new Date(now);
    delivered.setDate(delivered.getDate() + 2);
    delivered.setHours(14, 0, 0);

    return [
      { 
        status: 'Order Received', 
        description: 'We have received your shipment details', 
        completed: true,
        timestamp: orderReceived.toISOString(),
        location: 'New York, USA'
      },
      { 
        status: 'Processing', 
        description: 'Your shipment is being processed at our facility', 
        completed: true,
        timestamp: processing.toISOString(),
        location: 'New York, USA'
      },
      { 
        status: 'Picked Up', 
        description: 'Your package has been collected by our courier', 
        completed: true,
        timestamp: pickedUp.toISOString(),
        location: 'New York, USA'
      },
      { 
        status: 'In Transit', 
        description: 'Your shipment is on the way to destination', 
        completed: true,
        timestamp: inTransit.toISOString(),
        location: 'In Transit'
      },
      { 
        status: 'Customs Clearance', 
        description: 'Going through customs inspection', 
        completed: false,
        timestamp: customsClearance.toISOString(),
        location: 'London, UK'
      },
      { 
        status: 'Out for Delivery', 
        description: 'Your shipment will arrive today', 
        completed: false,
        timestamp: outForDelivery.toISOString(),
        location: null
      },
      { 
        status: 'Delivered', 
        description: 'Package has been delivered to recipient', 
        completed: false,
        timestamp: delivered.toISOString(),
        location: null
      }
    ];
  };

  const [trackingEvents, setTrackingEvents] = useState([]);

  useEffect(() => {
    setTrackingEvents(generateTrackingEvents());
  }, [currentDate]);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (trackingNumber.startsWith('ERROR')) {
        throw new Error('Tracking number not found in our system');
      }
      
      if (trackingNumber.startsWith('DELAY')) {
        throw new Error('Tracking information is temporarily unavailable');
      }

      // Calculate estimated delivery (2 days from now)
      const estimatedDelivery = new Date();
      estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
      
      setShipmentData({
        id: trackingNumber,
        origin: 'New York, USA',
        destination: 'London, UK',
        estimatedDelivery: estimatedDelivery.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric'
        }),
        status: 'In Transit',
        carrier: 'GlobalShipp Express',
        weight: '25kg',
        dimensions: '40×30×20 cm',
        serviceType: 'Express International',
        reference: 'ORD-789456',
        recipient: 'John Smith',
        lastUpdate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        distanceCovered: '65%',
        currentLocation: 'Over the Atlantic Ocean'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
    setError(null);
    if (shipmentData) setShipmentData(null);
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'Pending';
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const isFutureEvent = (timestamp) => {
    return new Date(timestamp) > new Date();
  };

  return (
    <section id="tracking" className="tracking">
      <div className="container">
        <div className="tracking-header">
          <h2>Track Your Shipment</h2>
          <p className="section-subtitle">Real-time updates for your peace of mind</p>
        </div>
        
        <div className="tracking-container">
          <div className="tracking-card">
            <form onSubmit={handleTrack} className="tracking-form">
              <div className="form-header">
                <h3>Enter Tracking Details</h3>
                <p>Track your package with your unique tracking number</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="tracking-number">
                  <i className="icon">📦</i> Tracking Number
                </label>
                <input
                  type="text"
                  id="tracking-number"
                  value={trackingNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., GS123456789"
                  className={error ? 'error' : ''}
                  disabled={isLoading}
                />
                {error && <div className="error-message">{error}</div>}
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary track-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="icon">⏳</i> Tracking...
                  </>
                ) : (
                  <>
                    <i className="icon">🔍</i> Track Shipment
                  </>
                )}
              </button>
              
              <div className="tracking-examples">
                <p>Example tracking numbers: GS123456789, EXP789123, DELAY123 (simulates error)</p>
              </div>
            </form>
          </div>
          
          {shipmentData && (
            <div className="tracking-results">
              <div className="results-header">
                <h3>Shipment Tracking Details</h3>
                <div className="status-badge status-in-transit">
                  {shipmentData.status}
                </div>
              </div>
              
              <div className="shipment-overview">
                <div className="overview-item">
                  <div className="overview-label">Tracking Number</div>
                  <div className="overview-value">{shipmentData.id}</div>
                </div>
                <div className="overview-item">
                  <div className="overview-label">Estimated Delivery</div>
                  <div className="overview-value highlight">{shipmentData.estimatedDelivery}</div>
                </div>
                <div className="overview-item">
                  <div className="overview-label">Last Update</div>
                  <div className="overview-value">{shipmentData.lastUpdate}</div>
                </div>
              </div>
              
              <div className="progress-container">
                <div className="progress-header">
                  <span>Shipment Progress</span>
                  <span>{shipmentData.distanceCovered} Complete</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: shipmentData.distanceCovered }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>{shipmentData.origin}</span>
                  <span>{shipmentData.destination}</span>
                </div>
              </div>
              
              <div className="details-grid">
                <div className="detail-section">
                  <h4>Route Information</h4>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">📤</i> Origin
                    </span>
                    <span className="detail-value">{shipmentData.origin}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">📥</i> Destination
                    </span>
                    <span className="detail-value">{shipmentData.destination}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">📍</i> Current Location
                    </span>
                    <span className="detail-value">{shipmentData.currentLocation}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Shipment Details</h4>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">⚖️</i> Weight
                    </span>
                    <span className="detail-value">{shipmentData.weight}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">📏</i> Dimensions
                    </span>
                    <span className="detail-value">{shipmentData.dimensions}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">🚚</i> Service Type
                    </span>
                    <span className="detail-value">{shipmentData.serviceType}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Additional Information</h4>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">🏢</i> Carrier
                    </span>
                    <span className="detail-value">{shipmentData.carrier}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">📋</i> Reference
                    </span>
                    <span className="detail-value">{shipmentData.reference}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <i className="icon">👤</i> Recipient
                    </span>
                    <span className="detail-value">{shipmentData.recipient}</span>
                  </div>
                </div>
              </div>
              
              <div className="tracking-timeline">
                <h4>Shipment History</h4>
                <div className="timeline">
                  {trackingEvents.map((event, index) => {
                    const isFuture = isFutureEvent(event.timestamp);
                    const isCompleted = event.completed && !isFuture;
                    
                    return (
                      <div key={index} className={`timeline-step ${isCompleted ? 'completed' : isFuture ? 'future' : 'pending'}`}>
                        <div className="step-marker">
                          {isCompleted ? '✓' : isFuture ? '→' : index + 1}
                        </div>
                        <div className="step-content">
                          <div className="step-header">
                            <h5>{event.status}</h5>
                            <span className="step-time">
                              {isFuture ? 'Scheduled: ' : ''}{formatDateTime(event.timestamp)}
                            </span>
                          </div>
                          <p>{event.description}</p>
                          {event.location && (
                            <div className="step-location">
                              <i className="icon">📍</i> {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn btn-secondary">
                  <i className="icon">📧</i> Email Updates
                </button>
                <button className="btn btn-secondary">
                  <i className="icon">📄</i> Download Proof of Delivery
                </button>
                <button className="btn btn-primary">
                  <i className="icon">📞</i> Contact Support
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Tracking;