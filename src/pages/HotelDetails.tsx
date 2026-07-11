import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Star, Shield, RefreshCw, Image
} from 'lucide-react';
import Navbar from '../components/Navbar';
import './HotelDetails.css';

// Nearby locations
const NEARBY = [
  { name: 'Victoria Memorial', dist: '1.8 km from hotel', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=300' },
  { name: 'Park Street', dist: '2.2 km from hotel', img: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=300' },
  { name: 'Howrah Bridge', dist: '3.5 km from hotel', img: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=300' },
  { name: 'Eden Gardens', dist: '1.2 km from hotel', img: 'https://images.unsplash.com/photo-1595258700295-7be5c5d012a6?auto=format&fit=crop&q=80&w=300' }
];

const HotelDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="hotel-details-page">
      <Navbar theme="blue" />

      {/* Hero Section */}
      <section 
        className="hd-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200')` }}
      >
        <div className="hd-hero-overlay"></div>
        <div className="hd-hero-content">
          <h1>The Lalit Great Eastern Kolkata</h1>
          <div className="hd-hero-rating">
            <div className="hd-stars">
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="#fbbf24" color="#fbbf24" />
              <Star size={16} fill="none" color="#cbd5e1" />
            </div>
            <span>4 (1234 reviews)</span> • <span className="hd-addr">1,2, Old Court House Street, Kolkata</span>
          </div>
        </div>
        <div className="hd-photo-badge">
          <Image size={14} />
          <span>1 / 24</span>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="hd-tabs-nav">
        <div className="hd-tabs-container">
          {['Overview', 'Rooms', 'Amenities', 'Reviews', 'Location'].map(tab => (
            <div 
              key={tab} 
              className={`hd-tab-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="hd-main-content">
        <div className="hd-container">
          
          {/* Left Column info */}
          <div className="hd-left-col">
            
            <section className="hd-info-section">
              <div className="hd-section-header">
                <h2>About this property</h2>
                <span className="hd-cancel-badge">FREE CANCELLATION</span>
              </div>
              <p className="hd-desc-text">
                The Lalit Great Eastern Kolkata is a historic luxury hotel located in the heart of Kolkata's central business
                district. Built in 1840, this iconic "Jewel of the East" combines the colonial charm of the Victorian era with
                modern-day amenities. Guests can experience world-class hospitality, fine dining, and serene wellness
                offerings in a location that puts the city's heritage at your doorstep.
              </p>
              <a href="#readmore" className="hd-read-more" onClick={e => e.preventDefault()}>Read more</a>
            </section>

            <section className="hd-info-section">
              <h2>Amenities</h2>
              <div className="hd-amenities-grid">
                <div className="hd-amenity-item">🌊 <span>Swimming Pool</span></div>
                <div className="hd-amenity-item">💆‍♀️ <span>Luxury Spa</span></div>
                <div className="hd-amenity-item">🚗 <span>Free Parking</span></div>
                <div className="hd-amenity-item">💪 <span>Fitness Center</span></div>
                <div className="hd-amenity-item">📶 <span>High-speed WiFi</span></div>
                <div className="hd-amenity-item">🍽️ <span>Multi-cuisine Dining</span></div>
              </div>
              <a href="#amenities" className="hd-see-all-btn" onClick={e => e.preventDefault()}>See all 24 amenities</a>
            </section>

            <section className="hd-info-section">
              <h2>Why guests love this property</h2>
              <div className="hd-reviews-highlights">
                <div className="hd-highlight-card">
                  <div className="hd-hl-header">
                    <strong>Excellent Location</strong>
                    <span>4.7/5</span>
                  </div>
                  <p>Near Victoria Memorial and business hubs.</p>
                </div>
                <div className="hd-highlight-card">
                  <div className="hd-hl-header">
                    <strong>Great for Families</strong>
                  </div>
                  <p>Spacious suites and child-friendly dining.</p>
                </div>
                <div className="hd-highlight-card">
                  <div className="hd-hl-header">
                    <strong>Top-Rated Service</strong>
                    <span>4.6/5</span>
                  </div>
                  <p>Highly attentive and professional staff.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column sidebar card */}
          <div className="hd-right-col">
            <div className="hd-booking-card">
              <div className="hd-price-box">
                <span className="hd-start-lbl">Starting from</span>
                <strong className="hd-price-amount">₹6,500 <span>/ night</span></strong>
                <span className="hd-tax-lbl">+ ₹780 taxes & fees</span>
              </div>

              <div className="hd-action-buttons">
                <button 
                  className="hd-btn-check-availability"
                  onClick={() => navigate(`/hotels/${id || 'the-lalit-great-eastern'}/availability`)}
                >
                  Check Availability
                </button>
                <button className="hd-btn-offers">View All Offers</button>
              </div>

              <div className="hd-guarantees">
                <div className="hd-guar-item">
                  <Shield size={14} />
                  <span>Price Match Guarantee</span>
                </div>
                <div className="hd-guar-item">
                  <RefreshCw size={14} />
                  <span>Free Cancellation until 24h prior</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Explore Nearby Section */}
      <section className="hd-explore-section">
        <div className="hd-explore-container">
          <div className="hd-explore-header">
            <h2>Explore nearby</h2>
            <a href="#map" className="hd-view-map-link" onClick={e => e.preventDefault()}>View on map</a>
          </div>

          <div className="hd-nearby-grid">
            {NEARBY.map((item, idx) => (
              <div key={idx} className="hd-nearby-card">
                <img src={item.img} alt={item.name} className="hd-nearby-img" />
                <div className="hd-nearby-info">
                  <h3>{item.name}</h3>
                  <span>{item.dist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="hd-footer">
        <div className="hd-footer-container">
          <p>© 2024 The Lalit Great Eastern Kolkata. All rights reserved.</p>
          <div className="hd-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotelDetails;
