import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, CheckCircle2,
  ChevronDown, ShieldCheck, Lock, Star
} from 'lucide-react';
import './HotelAvailability.css';

const HotelAvailability: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState('Fri, 23 May 2025');
  const [checkOut, setCheckOut] = useState('Sun, 25 May 2025');
  
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showAvailableModal, setShowAvailableModal] = useState(false);

  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

  const handleGuestChange = (type: 'rooms' | 'adults' | 'children', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === 'rooms' && newVal < 1) return prev;
      if (type === 'adults' && newVal < 1) return prev;
      return { ...prev, [type]: newVal };
    });
  };

  const handleCheckAvailability = () => {
    setShowAvailableModal(true);
  };

  const handleContinueToPayment = () => {
    setShowAvailableModal(false);
    navigate(`/hotels/${id || 'the-lalit-great-eastern'}/checkout`, {
      state: {
        checkIn,
        checkOut,
        guests
      }
    });
  };

  return (
    <div className="ha-page-wrapper" onClick={() => { setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPicker(false); }}>
      
      {/* Dynamic Header */}
      <header className="ha-header">
        <div className="ha-header-left">
          <button className="ha-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="ha-hotel-info">
            <h2>The Lalit Great Eastern Kolkata</h2>
            <p>1, 2, 3, Old Court House St, Ward 1, Kolkata, West Bengal 700069</p>
          </div>
        </div>
        
        <div className="ha-header-right">
          <nav className="ha-nav-links">
            <span onClick={() => navigate(`/hotels/${id || 'the-lalit-great-eastern'}`)}>Overview</span>
            <span>Rooms</span>
            <span>Amenities</span>
            <span>Reviews</span>
          </nav>
          <button className="ha-signin-btn" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </header>

      {/* Main Container */}
      <main className="ha-main">
        <div className="ha-card">
          
          <h1 className="ha-title">Check Availability</h1>
          <p className="ha-subtitle">Select your dates and guest details to view the best available rates.</p>

          {/* Cancellation Alert */}
          <div className="ha-alert-box">
            <div className="ha-alert-left">
              <ShieldCheck size={24} className="ha-alert-icon" />
              <div className="ha-alert-text">
                <h3>Free Cancellation</h3>
                <p>Cancel for free up to 24 hours before check-in. Total flexibility for your stay.</p>
              </div>
            </div>
            <ChevronDown size={20} className="ha-alert-caret" />
          </div>

          {/* Date Picker Grid */}
          <div className="ha-section-lbl-row">
            <span className="ha-section-title">Select Dates</span>
            <span className="ha-nights-badge">🌙 2 Nights</span>
          </div>

          <div className="ha-dates-grid">
            <div className="ha-field relative" onClick={e => { e.stopPropagation(); setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowGuestPicker(false); }}>
              <label>CHECK-IN</label>
              <div className="ha-input-wrap">
                <span className="ha-val-text">{checkIn}</span>
                <span className="ha-sub-val">From 12:00 PM</span>
              </div>
              <Calendar size={18} className="ha-field-icon" />

              {showCheckInCal && (
                <div className="custom-calendar-popover" style={{ left: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="calendar-header">
                    <button type="button">&lt;</button>
                    <span>May 2025</span>
                    <button type="button">&gt;</button>
                  </div>
                  <div className="calendar-grid">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                    <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                    {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                      <div 
                        key={d} 
                        className={`cal-day ${checkIn.includes(`${d} May`) ? 'selected' : ''}`} 
                        onClick={() => { setCheckIn(`Fri, ${d} May 2025`); setShowCheckInCal(false); }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ha-field relative" onClick={e => { e.stopPropagation(); setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowGuestPicker(false); }}>
              <label>CHECK-OUT</label>
              <div className="ha-input-wrap">
                <span className="ha-val-text">{checkOut}</span>
                <span className="ha-sub-val">Before 11:00 AM</span>
              </div>
              <Calendar size={18} className="ha-field-icon" />

              {showCheckOutCal && (
                <div className="custom-calendar-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="calendar-header">
                    <button type="button">&lt;</button>
                    <span>May 2025</span>
                    <button type="button">&gt;</button>
                  </div>
                  <div className="calendar-grid">
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                    <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                    {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                      <div 
                        key={d} 
                        className={`cal-day ${checkOut.includes(`${d} May`) ? 'selected' : ''}`} 
                        onClick={() => { setCheckOut(`Sun, ${d} May 2025`); setShowCheckOutCal(false); }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Guest and Room Grid */}
          <div className="ha-section-lbl-row" style={{ marginTop: '24px' }}>
            <span className="ha-section-title">Guests & Rooms</span>
          </div>

          <div className="ha-guests-grid">
            <div className="ha-field relative" onClick={e => { e.stopPropagation(); setShowGuestPicker(!showGuestPicker); setShowCheckInCal(false); setShowCheckOutCal(false); }}>
              <label>ROOMS</label>
              <div className="ha-input-wrap">
                <span className="ha-val-text">{guests.rooms} Room</span>
              </div>
              <ChevronDown size={18} className="ha-field-icon" />
            </div>

            <div className="ha-field relative" onClick={e => { e.stopPropagation(); setShowGuestPicker(!showGuestPicker); setShowCheckInCal(false); setShowCheckOutCal(false); }}>
              <label>GUESTS</label>
              <div className="ha-input-wrap">
                <span className="ha-val-text">{guests.adults} Adults, {guests.children} Children</span>
              </div>
              <ChevronDown size={18} className="ha-field-icon" />

              {showGuestPicker && (
                <div className="custom-guest-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="guest-row">
                    <div className="guest-info"><span>Rooms</span></div>
                    <div className="guest-controls">
                      <button type="button" onClick={() => handleGuestChange('rooms', 'sub')}>-</button>
                      <span>{guests.rooms}</span>
                      <button type="button" onClick={() => handleGuestChange('rooms', 'add')}>+</button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <div className="guest-info"><span>Adults</span><small>12+ yrs</small></div>
                    <div className="guest-controls">
                      <button type="button" onClick={() => handleGuestChange('adults', 'sub')}>-</button>
                      <span>{guests.adults}</span>
                      <button type="button" onClick={() => handleGuestChange('adults', 'add')}>+</button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <div className="guest-info"><span>Children</span><small>2-12 yrs</small></div>
                    <div className="guest-controls">
                      <button type="button" onClick={() => handleGuestChange('children', 'sub')}>-</button>
                      <span>{guests.children}</span>
                      <button type="button" onClick={() => handleGuestChange('children', 'add')}>+</button>
                    </div>
                  </div>
                  <button type="button" className="guest-done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
                </div>
              )}
            </div>
          </div>

          <button type="button" className="ha-btn-submit" onClick={handleCheckAvailability}>
            Check Availability & Rates
          </button>
          <span className="ha-no-pay-lbl">No payment required today. You'll pay at the property.</span>

        </div>

        {/* Guarantees Row */}
        <div className="ha-footer-benefits">
          <div className="ha-benefit-item">
            <Lock size={16} />
            <span>Secure Payment</span>
          </div>
          <div className="ha-benefit-item">
            <CheckCircle2 size={16} />
            <span>Best Price Guaranteed</span>
          </div>
          <div className="ha-benefit-item">
            <Star size={16} />
            <span>Verified Luxury Stay</span>
          </div>
        </div>
      </main>

      {/* Available Rooms Modal */}
      {showAvailableModal && (
        <div className="ha-modal-overlay">
          <div className="ha-modal">
            <button className="ha-modal-close" onClick={() => setShowAvailableModal(false)}>✕</button>
            <div className="ha-modal-icon-wrap">
              <span className="ha-modal-check">✓</span>
            </div>
            <h2>Rooms Available!</h2>
            <p>Great news! Rooms available for your selected dates at The Lalit Great Eastern Kolkata.</p>
            <button className="ha-modal-continue" onClick={handleContinueToPayment}>Continue to Payment</button>
            <button className="ha-modal-modify" onClick={() => setShowAvailableModal(false)}>Modify selection</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HotelAvailability;
