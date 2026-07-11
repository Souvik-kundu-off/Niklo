import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, Clock, Users, Activity, Calendar, Lock, Phone,
  Building, Bus, Utensils, Map
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PackageDetails.css';

const PackageDetails: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [date, setDate] = useState('22 May 2024');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleGuestChange = (type: 'adults' | 'children', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === 'adults' && newVal < 1) return prev;
      return { ...prev, [type]: newVal };
    });
  };

  const getGuestsString = () => {
    const totalGuests = guests.adults + guests.children;
    return `${totalGuests} Traveler${totalGuests > 1 ? 's' : ''}`;
  };

  return (
    <div className="pkg-detail-container">
      <Navbar theme="blue" />
      
      <div className="pkg-detail-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&q=80&w=1600')` }}>
        <div className="pkg-detail-hero-content">
          <div className="pkg-breadcrumbs">Explore &gt; India &gt; Meghalaya Explorer</div>
          <h1>Meghalaya Explorer</h1>
          <div className="pkg-hero-badges">
            <span className="pkg-bestseller-badge">Bestseller</span>
            <div className="pkg-hero-rating">
              <Star size={16} fill="#fbbf24" color="#fbbf24" /> 4.8 (145 Reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="pkg-detail-tabs-nav">
        <div className="pkg-tabs-container">
          {['Overview', 'Itinerary', 'Inclusions', 'Exclusions', 'Reviews'].map(tab => (
            <div 
              key={tab} 
              className={`pkg-tab-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="pkg-detail-main">
        <div className="pkg-detail-left">
          
          <div className="pkg-quick-info">
            <div className="pkg-qi-item">
              <div className="pkg-qi-icon"><Clock size={20} /></div>
              <div className="pkg-qi-content">
                <span className="pkg-qi-label">Duration</span>
                <span className="pkg-qi-value">4 Days / 3 Nights</span>
              </div>
            </div>
            <div className="pkg-qi-item">
              <div className="pkg-qi-icon"><Users size={20} /></div>
              <div className="pkg-qi-content">
                <span className="pkg-qi-label">Group Size</span>
                <span className="pkg-qi-value">2-6 Travelers</span>
              </div>
            </div>
            <div className="pkg-qi-item">
              <div className="pkg-qi-icon"><Activity size={20} /></div>
              <div className="pkg-qi-content">
                <span className="pkg-qi-label">Difficulty</span>
                <span className="pkg-qi-value">Moderate</span>
              </div>
            </div>
          </div>

          <section className="pkg-detail-section">
            <h2>Overview</h2>
            <p className="pkg-detail-desc">
              Explore the natural beauty of Meghalaya with visits to mesmerizing waterfalls, mysterious caves, and the 
              crystal-clear waters of Dawki. Meghalaya, known as the 'Abode of Clouds', offers a perfect blend of adventure 
              and relaxation. From the living root bridges of Cherrapunji to the mirror-like Umngot River, every corner is a 
              photographer's dream.
            </p>
            <div className="pkg-tags-row">
              <span className="pkg-tag">Shillong</span>
              <span className="pkg-tag">Cherrapunji</span>
              <span className="pkg-tag">Dawki</span>
              <span className="pkg-tag">Mawlynnong</span>
            </div>
          </section>

          <section className="pkg-detail-section">
            <h2>Itinerary</h2>
            <div className="pkg-itinerary">
              
              <div className="pkg-itin-day">
                <div className="pkg-itin-dot"><div className="pkg-itin-dot-inner"></div></div>
                <div className="pkg-itin-content">
                  <span className="pkg-itin-label">Day 1</span>
                  <h3>Arrival in Shillong</h3>
                  <p>Arrive in Shillong and check-in to your hotel. Evening at leisure. Overnight stay in Shillong.</p>
                </div>
              </div>

              <div className="pkg-itin-day">
                <div className="pkg-itin-dot"><div className="pkg-itin-dot-inner"></div></div>
                <div className="pkg-itin-content">
                  <span className="pkg-itin-label">Day 2</span>
                  <h3>Shillong - Cherrapunji</h3>
                  <p>Visit Elephant Falls, Mawsmai Cave, Seven Sisters Falls. Overnight stay in Cherrapunji.</p>
                </div>
              </div>

              <div className="pkg-itin-day">
                <div className="pkg-itin-dot"><div className="pkg-itin-dot-inner"></div></div>
                <div className="pkg-itin-content">
                  <span className="pkg-itin-label">Day 3</span>
                  <h3>Dawki Excursion</h3>
                  <p>Visit Dawki, enjoy boating in Umngot River and explore Indo-Bangla border. Return to hotel.</p>
                </div>
              </div>

              <div className="pkg-itin-day">
                <div className="pkg-itin-dot"><div className="pkg-itin-dot-inner"></div></div>
                <div className="pkg-itin-content">
                  <span className="pkg-itin-label">Day 4</span>
                  <h3>Departure</h3>
                  <p>After breakfast, check-out and departure with wonderful memories.</p>
                </div>
              </div>

            </div>
          </section>

          <section className="pkg-detail-section">
            <h2>Tour Inclusions</h2>
            <div className="pkg-inclusions-grid">
              <div className="pkg-inc-card">
                <Building size={32} className="pkg-inc-icon" />
                <span>Stay</span>
              </div>
              <div className="pkg-inc-card">
                <Bus size={32} className="pkg-inc-icon" />
                <span>Transport</span>
              </div>
              <div className="pkg-inc-card">
                <Utensils size={32} className="pkg-inc-icon" />
                <span>Meals</span>
              </div>
              <div className="pkg-inc-card">
                <Map size={32} className="pkg-inc-icon" />
                <span>Sightseeing</span>
              </div>
            </div>
          </section>

        </div>

        <div className="pkg-detail-right">
          <div className="pkg-detail-sidebar">
            
            <div className="pkg-pricing-card">
              <div className="pkg-price-header">
                <span className="label">STARTING FROM</span>
                <div className="pkg-price-amount">₹8,990 <span>/ person</span></div>
                <span className="pkg-price-taxes">* Inclusive of all taxes and fees</span>
              </div>

              <div className="pkg-booking-form">
                <div className="pkg-form-group relative" onClick={() => { setShowDatePicker(!showDatePicker); setShowGuestPicker(false); }}>
                  <label>Select Date</label>
                  <div className="pkg-form-input">
                    <Calendar size={18} color="#64748b" />
                    <span className="pkg-text-val">{date}</span>
                  </div>
                  {showDatePicker && (
                    <div className="custom-calendar-popover" onClick={e => e.stopPropagation()}>
                      <div className="calendar-header">
                        <button>&lt;</button>
                        <span>May 2024</span>
                        <button>&gt;</button>
                      </div>
                      <div className="calendar-grid">
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                        <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                        {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                          <div 
                            key={d} 
                            className={`cal-day ${date === `${d} May 2024` ? 'selected' : ''}`} 
                            onClick={() => { setDate(`${d} May 2024`); setShowDatePicker(false); }}
                          >
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pkg-form-group relative" onClick={() => { setShowGuestPicker(!showGuestPicker); setShowDatePicker(false); }}>
                  <label>Travelers</label>
                  <div className="pkg-form-input">
                    <Users size={18} color="#64748b" />
                    <span className="pkg-text-val">{getGuestsString()}</span>
                  </div>
                  {showGuestPicker && (
                    <div className="custom-guest-popover" onClick={e => e.stopPropagation()}>
                      <div className="guest-row">
                        <div className="guest-info"><span>Adults</span><small>12+ yrs</small></div>
                        <div className="guest-controls">
                          <button onClick={() => handleGuestChange('adults', 'sub')}>-</button>
                          <span>{guests.adults}</span>
                          <button onClick={() => handleGuestChange('adults', 'add')}>+</button>
                        </div>
                      </div>
                      <div className="guest-row">
                        <div className="guest-info"><span>Children</span><small>2-12 yrs</small></div>
                        <div className="guest-controls">
                          <button onClick={() => handleGuestChange('children', 'sub')}>-</button>
                          <span>{guests.children}</span>
                          <button onClick={() => handleGuestChange('children', 'add')}>+</button>
                        </div>
                      </div>
                      <button className="guest-done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
                    </div>
                  )}
                </div>
              </div>

              <button className="pkg-book-btn" onClick={() => navigate('/packages/checkout')}>Book This Trip</button>
              
              <div className="pkg-secure-text">
                <Lock size={14} /> Secure booking & support
              </div>
            </div>

            <div className="pkg-help-card">
              <h4>Need Help?</h4>
              <p>Talk to our travel experts for customized itineraries.</p>
              <a href="tel:+9118001234567" className="pkg-help-phone">
                <Phone size={16} /> +91 1800 123 4567
              </a>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
