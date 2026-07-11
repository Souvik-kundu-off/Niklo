import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, Home as HomeIcon, CheckCircle2,
  ChevronUp, ChevronDown, Plus, ShieldCheck, FileText, Lock, Phone
} from 'lucide-react';
import './PackageCheckout.css';

const PackageCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('23 May 2025');
  const [endDate, setEndDate] = useState('26 May 2025');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const [travellers, setTravellers] = useState([
    { id: 1, name: 'Rahul Sharma', age: '28 Years', gender: 'Male', open: true },
    { id: 2, name: 'Priya Sharma', age: '26 Years', gender: 'Female', open: false }
  ]);

  const [insurance, setInsurance] = useState(true);
  const [gstInvoice, setGstInvoice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGuestChange = (type: 'rooms' | 'adults' | 'children', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === 'rooms' && newVal < 1) return prev;
      if (type === 'adults' && newVal < 1) return prev;
      return { ...prev, [type]: newVal };
    });
  };

  const toggleTraveller = (id: number) => {
    setTravellers(travellers.map(t => t.id === id ? { ...t, open: !t.open } : t));
  };

  const handleAddTraveller = () => {
    setTravellers([...travellers, { id: travellers.length + 1, name: `Traveller ${travellers.length + 1}`, age: 'Select Age', gender: 'Select Gender', open: true }]);
  };

  const handleBookNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/booking-success', {
        state: {
          type: 'package',
          packageName: 'Meghalaya Explorer',
          startDate: startDate,
          endDate: endDate,
          amount: insurance ? '18,580' : '17,980',
          travellers: travellers
        }
      });
    }, 2000);
  };

  const handleUpdateTraveller = (id: number, field: string, value: string) => {
    setTravellers(travellers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <>
      <div className="pkg-checkout-container" onClick={() => { setShowStartDate(false); setShowEndDate(false); setShowGuestPicker(false); }}>
      
      <header className="pkg-co-header">
        <button className="pkg-co-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div className="pkg-co-title-block">
          <h1>Review Package</h1>
          <p>Most selected: Meghalaya Explorer</p>
        </div>
      </header>

      <div className="pkg-co-main">
        <div className="pkg-co-left">
          
          <section className="pkg-co-section">
            <div className="pkg-co-section-header">
              <h2 className="pkg-co-section-title">PACKAGE DURATION & STAY</h2>
              <span className="pkg-co-duration-pill">4 Days / 3 Nights</span>
            </div>
            <div className="pkg-co-grid">
              <div className="pkg-co-field relative" onClick={(e) => { e.stopPropagation(); setShowStartDate(!showStartDate); setShowEndDate(false); setShowGuestPicker(false); }}>
                <label>Start Date</label>
                <div className="pkg-co-input-wrap">
                  <Calendar size={18} className="pkg-co-icon" />
                  <span className="pkg-text-val">{startDate}</span>
                </div>
                {showStartDate && (
                  <div className="custom-calendar-popover" onClick={e => e.stopPropagation()}>
                    <div className="calendar-header">
                      <button>&lt;</button>
                      <span>May 2025</span>
                      <button>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                      <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                      {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                        <div 
                          key={d} 
                          className={`cal-day ${startDate === `${d} May 2025` ? 'selected' : ''}`} 
                          onClick={() => { setStartDate(`${d} May 2025`); setShowStartDate(false); }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="pkg-co-field relative" onClick={(e) => { e.stopPropagation(); setShowEndDate(!showEndDate); setShowStartDate(false); setShowGuestPicker(false); }}>
                <label>End Date</label>
                <div className="pkg-co-input-wrap">
                  <Calendar size={18} className="pkg-co-icon" />
                  <span className="pkg-text-val">{endDate}</span>
                </div>
                {showEndDate && (
                  <div className="custom-calendar-popover" style={{ left: 'auto', right: 0 }} onClick={e => e.stopPropagation()}>
                    <div className="calendar-header">
                      <button>&lt;</button>
                      <span>May 2025</span>
                      <button>&gt;</button>
                    </div>
                    <div className="calendar-grid">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                      <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                      {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                        <div 
                          key={d} 
                          className={`cal-day ${endDate === `${d} May 2025` ? 'selected' : ''}`} 
                          onClick={() => { setEndDate(`${d} May 2025`); setShowEndDate(false); }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>GUESTS & ROOMS</h2>
            <div className="pkg-co-field relative" onClick={(e) => { e.stopPropagation(); setShowGuestPicker(!showGuestPicker); setShowStartDate(false); setShowEndDate(false); }}>
              <div className="pkg-co-input-wrap" style={{ cursor: 'pointer' }}>
                <Users size={18} className="pkg-co-icon" />
                <span className="pkg-text-val">{guests.adults + guests.children} Travelers, {guests.rooms} Room{guests.rooms > 1 ? 's' : ''}</span>
              </div>
              {showGuestPicker && (
                <div className="custom-guest-popover" onClick={e => e.stopPropagation()}>
                  <div className="guest-row">
                    <div className="guest-info"><span>Rooms</span></div>
                    <div className="guest-controls">
                      <button onClick={() => handleGuestChange('rooms', 'sub')}>-</button>
                      <span>{guests.rooms}</span>
                      <button onClick={() => handleGuestChange('rooms', 'add')}>+</button>
                    </div>
                  </div>
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
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>TRAVELLER DETAILS</h2>
            
            {travellers.map((traveller) => (
              <div key={traveller.id} className="pkg-co-traveller">
                <div className="pkg-co-traveller-header" onClick={() => toggleTraveller(traveller.id)}>
                  <div className="pkg-co-t-left">
                    <div className="pkg-co-t-num">{traveller.id}</div>
                    <input 
                      type="text" 
                      className="pkg-co-t-name-input"
                      value={traveller.name}
                      onChange={e => handleUpdateTraveller(traveller.id, 'name', e.target.value)}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                  {traveller.open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
                </div>
                {traveller.open && (
                  <div className="pkg-co-traveller-body">
                    <div className="pkg-co-t-field">
                      <label className="pkg-co-t-label">Age</label>
                      <input 
                        type="text" 
                        className="pkg-co-t-val-input"
                        value={traveller.age}
                        onChange={e => handleUpdateTraveller(traveller.id, 'age', e.target.value)}
                        placeholder="e.g. 28 Years"
                      />
                    </div>
                    <div className="pkg-co-t-field">
                      <label className="pkg-co-t-label">Gender</label>
                      <select 
                        className="pkg-co-t-val-select"
                        value={traveller.gender}
                        onChange={e => handleUpdateTraveller(traveller.id, 'gender', e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="pkg-co-t-field">
                      <span className="pkg-co-t-label">Status</span>
                      <span className="pkg-co-verified"><CheckCircle2 size={16} /> Verified</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className="pkg-co-add-btn" onClick={handleAddTraveller}>
              <Plus size={16} /> Add Another Traveller
            </button>
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>CONTACT DETAILS</h2>
            <div className="pkg-co-contact-grid">
              <div className="pkg-co-field">
                <label>Email Address</label>
                <div className="pkg-co-input-wrap">
                  <input type="email" value="rahul@gmail.com" readOnly />
                </div>
              </div>
              <div className="pkg-co-field">
                <label>Contact Number</label>
                <div className="pkg-co-input-wrap">
                  <input type="tel" value="+91 9123456789" readOnly />
                </div>
              </div>
            </div>
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>ADDITIONAL OPTIONS</h2>
            
            <div className={`pkg-co-option ${insurance ? 'active' : ''}`}>
              <div className="pkg-co-opt-left">
                <ShieldCheck size={24} className="pkg-co-opt-icon" />
                <div className="pkg-co-opt-text">
                  <h4>Travel Insurance (Tripsure)</h4>
                  <p>Protect your trip against unforeseen cancellations and medical emergencies.</p>
                </div>
              </div>
              <div className={`toggle-switch ${insurance ? 'active' : ''}`} onClick={() => setInsurance(!insurance)}>
                <div className="toggle-knob"></div>
              </div>
            </div>

            <div className={`pkg-co-option ${gstInvoice ? 'active' : ''}`}>
              <div className="pkg-co-opt-left">
                <FileText size={24} className="pkg-co-opt-icon" />
                <div className="pkg-co-opt-text">
                  <h4>GST Invoice</h4>
                  <p>Enter your GST details to claim business tax benefits on this booking.</p>
                </div>
              </div>
              <div className={`toggle-switch ${gstInvoice ? 'active' : ''}`} onClick={() => setGstInvoice(!gstInvoice)}>
                <div className="toggle-knob"></div>
              </div>
            </div>
          </section>

        </div>

        <div className="pkg-co-right">
          <div className="pkg-co-sidebar">
            
            <div className="pkg-summary-card">
              <h3 className="pkg-summary-title">BOOKING SUMMARY</h3>
              <div className="pkg-summary-list">
                <div className="pkg-summary-row">
                  <span>Package Price (2 Travellers)</span>
                  <strong>₹17,980</strong>
                </div>
                {insurance && (
                  <div className="pkg-summary-row">
                    <span>Insurance & Protection</span>
                    <strong>₹600</strong>
                  </div>
                )}
                <div className="pkg-summary-row">
                  <span>Taxes & Fees</span>
                  <strong>Included</strong>
                </div>
              </div>
              <div className="pkg-summary-row total-row">
                <div className="total-label">
                  Total Amount
                  <a href="#" className="pkg-price-breakup">View Price Breakup</a>
                </div>
                <div className="total-amount">₹{insurance ? '18,580' : '17,980'}</div>
              </div>

              <button className="pkg-co-book-btn" onClick={handleBookNow}>Book Now</button>
              
              <div className="pkg-co-secure">
                <Lock size={14} /> Secure 256-bit SSL encrypted payment
              </div>
            </div>

            <div className="pkg-help-card">
              <h4>Need Help?</h4>
              <p>Our travel experts are available 24/7 to help with your booking.</p>
              <a href="tel:1800-TRAVEL-HELP" className="pkg-help-phone" style={{ marginTop: '12px', display: 'flex' }}>
                <Phone size={16} /> 1800-TRAVEL-HELP
              </a>
            </div>

          </div>
        </div>
      </div>

      <footer className="pkg-co-footer">
        <div>© 2025 ExploreTravels. All rights reserved.</div>
        <div className="pkg-co-footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </footer>

    </div>
      {isProcessing && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-spinner"></div>
            <h3>Confirming your payment...</h3>
            <p>Please do not close or refresh this page.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageCheckout;
