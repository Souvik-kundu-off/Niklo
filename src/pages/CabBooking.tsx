import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, Search, Plus, Minus, Percent, Target, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Phone, MessageCircle, Share2, Shield, Star, MoreVertical
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import carIcon from '../assets/car.svg';
import mapBg from '../assets/map_bg.png';
import './CabBooking.css';

const RIDES = [
  { id: 'mini', name: 'Mini', desc: 'Affordable everyday rides', time: '3 mins', price: '₹189' },
  { id: 'sedan', name: 'Sedan', desc: 'Comfort rides for daily travel', time: '4 mins', price: '₹249' },
  { id: 'suv', name: 'SUV', desc: 'Spacious rides for family trips', time: '5 mins', price: '₹399' }
];

const OUTSTATION_TRIPS = [
  { id: 1, title: 'Kolkata → Siliguri', price: '₹4,999', img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Kolkata → Digha', price: '₹2,499', img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Kolkata → Darjeeling', price: '₹5,899', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400' },
  { id: 4, title: 'Kolkata → Puri', price: '₹6,299', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400' }
];

const FAQS = [
  { question: 'How does Niklo AI Journey Planner work?', answer: 'Niklo AI uses advanced algorithms to understand your travel preferences and creates optimized itineraries automatically.' },
  { question: 'Can I book buses and cabs from the app?', answer: 'Yes! You can book both buses and inter-city cabs directly through the Niklo platform.' },
  { question: 'Are there any exclusive offers on the app?', answer: 'We regularly provide exclusive discounts and promo codes for our app users.' }
];

const CabBooking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [pickupLocation, setPickupLocation] = useState(searchParams.get('from') || 'Current Location, Kolkata');
  const [dropLocation, setDropLocation] = useState(searchParams.get('to') || 'Salt Lake Sector V, Kolkata');
  
  const [activeTab, setActiveTab] = useState('one-way');
  const [selectedRide, setSelectedRide] = useState('mini');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // 'selecting' | 'searching' | 'assigned'
  const [bookingStatus, setBookingStatus] = useState<'selecting' | 'searching' | 'assigned'>('selecting');

  const handleConfirmPickup = () => {
    setBookingStatus('searching');
    // Simulate finding a driver
    setTimeout(() => {
      setBookingStatus('assigned');
    }, 4000);
  };

  const handleCancelRequest = () => {
    setBookingStatus('selecting');
  };

  return (
    <div className="cab-booking-container">
      <Navbar theme="blue" />
      
      {/* Hero Section */}
      <section className={`cab-hero-section ${bookingStatus !== 'selecting' ? 'layout-flipped' : ''}`}>
        
        {/* Sidebar */}
        <div className="cab-sidebar">
          
          {/* STATE 1: Selecting Ride */}
          {bookingStatus === 'selecting' && (
            <>
              <div className="sidebar-header">
                <h1>Car Rides</h1>
                <p>Book cabs & outstation trips in seconds</p>
              </div>
              
              <div className="trip-type-tabs">
                <button className={`tab ${activeTab === 'one-way' ? 'active' : ''}`} onClick={() => setActiveTab('one-way')}>One Way</button>
                <button className={`tab ${activeTab === 'round-trip' ? 'active' : ''}`} onClick={() => setActiveTab('round-trip')}>Round Trip</button>
                <button className={`tab ${activeTab === 'rental' ? 'active' : ''}`} onClick={() => setActiveTab('rental')}>Rental</button>
              </div>
              
              <div className="location-inputs">
                <div className="input-field pickup-field">
                  <div className="dot-icon green-dot"></div>
                  <div className="field-content">
                    <span className="label">PICKUP LOCATION</span>
                    <input 
                      type="text" 
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                  <span className="live-badge">Live</span>
                </div>
                
                <div className="input-field drop-field">
                  <div className="dot-icon red-pin"><MapPin size={16} color="#ef4444" /></div>
                  <div className="field-content">
                    <span className="label">DROP LOCATION</span>
                    <input 
                      type="text" 
                      placeholder="Where are you going?" 
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                    />
                  </div>
                  <Search size={16} className="search-icon" />
                </div>
              </div>
              
              <div className="ride-selection">
                <h4>Choose your ride</h4>
                <div className="ride-options">
                  {RIDES.map(ride => (
                    <div 
                      key={ride.id} 
                      className={`ride-card ${selectedRide === ride.id ? 'active' : ''}`}
                      onClick={() => setSelectedRide(ride.id)}
                    >
                      <img src={carIcon} alt={ride.name} />
                      <div className="ride-info">
                        <h5>{ride.name}</h5>
                        <p>{ride.desc}</p>
                        <div className="ride-eta">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {ride.time}
                        </div>
                      </div>
                      <div className="ride-price">{ride.price}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="promo-banner">
                <Percent size={16} />
                <span>20% off on your first ride</span>
              </div>
              
              <button className="confirm-pickup-btn" onClick={handleConfirmPickup}>
                Confirm Pickup
              </button>
            </>
          )}

          {/* STATE 2: Searching */}
          {bookingStatus === 'searching' && (
            <div className="matching-state">
              <div className="state-top-nav">
                <button className="icon-btn" onClick={handleCancelRequest}><ChevronLeft size={20} /></button>
                <button className="icon-btn"><MoreVertical size={20} /></button>
              </div>
              <h1 className="state-title">Finding nearby riders...</h1>
              <p className="state-desc">Please wait while we find you a driver. This usually takes less than 5 minutes.</p>

              <div className="matching-box">
                <div className="matching-box-header">
                  <h4>Matching status</h4>
                  <Target size={16} className="blue-icon" />
                </div>
                <p className="matching-text">Our system is locating the closest riders to your pickup point.</p>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: '65%' }}></div>
                </div>
                <div className="progress-stats">
                  <span className="located-text">65% Located</span>
                  <span className="wait-text">Estimated wait: 3-5 mins</span>
                </div>
              </div>

              <div className="matching-actions">
                <button className="outline-btn">Help</button>
                <button className="outline-btn danger" onClick={handleCancelRequest}>Cancel Request</button>
              </div>
            </div>
          )}

          {/* STATE 3: Assigned */}
          {bookingStatus === 'assigned' && (
            <div className="assigned-state">
              <div className="assigned-header-top">
                <h1 className="state-title">Driver is on the way</h1>
                <div className="eta-row">
                  <span className="eta-text">Arriving in 2 mins</span>
                  <span className="otp-badge">OTP: 1234</span>
                </div>
              </div>

              <div className="driver-card">
                <div className="driver-info-main">
                  <div className="driver-avatar-wrap">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Driver" className="driver-avatar" />
                  </div>
                  <div className="driver-details">
                    <h4>Rakesh Kumar</h4>
                    <div className="rating"><Star size={12} fill="#eab308" color="#eab308" /> 4.8</div>
                  </div>
                  <div className="car-image-mini">
                     <img src={carIcon} alt="Car" />
                     <div className="plate-badge">WB 02 AB 1234</div>
                  </div>
                </div>
                <p className="car-desc">Maruti Suzuki Dzire<br/><strong>White • Sedan</strong></p>
              </div>

              <div className="quick-actions">
                <div className="action-item"><button className="round-btn"><Phone size={18} /></button><span>Call</span></div>
                <div className="action-item"><button className="round-btn"><MessageCircle size={18} /></button><span>Message</span></div>
                <div className="action-item"><button className="round-btn"><Share2 size={18} /></button><span>Share Ride</span></div>
                <div className="action-item"><button className="round-btn danger-light"><Shield size={18} color="#ef4444" /></button><span>Safety</span></div>
              </div>

              <div className="trip-details-timeline">
                <div className="timeline-header">
                  <h4>Trip Details</h4>
                  <a href="#">Details</a>
                </div>
                <div className="timeline-path">
                   <div className="t-point pickup">
                      <div className="t-dot blue"></div>
                      <div className="t-content">
                        <span className="t-label">PICKUP</span>
                        <span className="t-val">{pickupLocation}</span>
                      </div>
                   </div>
                   <div className="t-point dropoff">
                      <div className="t-dot gray"></div>
                      <div className="t-content">
                        <span className="t-label">DROP OFF</span>
                        <span className="t-val">{dropLocation}</span>
                      </div>
                   </div>
                </div>
              </div>

              <button className="cancel-request-full-btn" onClick={handleCancelRequest}>Cancel Request</button>
            </div>
          )}
        </div>
        
        {/* Right Map Area */}
        <div className="cab-map-area" style={{ backgroundImage: `url(${mapBg})` }}>
          
          {/* Overlays for searching/assigned states */}
          {bookingStatus === 'searching' && (
            <div className="map-route-overlay">
              <div className="sim-route-line"></div>
              <div className="sim-pickup-marker"></div>
              <div className="sim-car-moving"><img src={carIcon} alt="" /></div>
              <div className="eta-floating-bubble">ETA<br/>2 min away</div>
            </div>
          )}

          {bookingStatus === 'assigned' && (
            <div className="map-cars-overlay">
              <div className="sim-pickup-marker blue-glow"></div>
              <img src={carIcon} className="sim-car-static p1" alt="" />
              <img src={carIcon} className="sim-car-static p2" alt="" />
              <img src={carIcon} className="sim-car-static p3" alt="" />
              <img src={carIcon} className="sim-car-static p4" alt="" />
              <img src={carIcon} className="sim-car-static p5" alt="" />
            </div>
          )}

          <div className="map-controls">
            <button className="map-btn target-btn"><Target size={20} /></button>
            <div className="zoom-controls">
              <button><Plus size={20} /></button>
              <button><Minus size={20} /></button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Outstation Trips Section */}
      <section className="outstation-section">
        <div className="section-header">
          <h2>Outstation Trips</h2>
          <div className="carousel-nav">
            <button><ChevronLeft size={20} /></button>
            <button><ChevronRight size={20} /></button>
          </div>
        </div>
        
        <div className="outstation-grid">
          {OUTSTATION_TRIPS.map(trip => (
            <div key={trip.id} className="outstation-card">
              <img src={trip.img} alt={trip.title} />
              <div className="outstation-details">
                <h4>{trip.title}</h4>
                <div className="outstation-price">
                  <span>Starting from</span>
                  <strong>{trip.price}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question"
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                {faq.question}
                {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {activeFaq === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CabBooking;
