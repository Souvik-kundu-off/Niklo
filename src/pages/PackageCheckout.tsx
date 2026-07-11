import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, Home as HomeIcon, CheckCircle2,
  ChevronUp, ChevronDown, Plus, ShieldCheck, FileText, Lock, Phone
} from 'lucide-react';
import './PackageCheckout.css';

const PackageCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [traveller1Open, setTraveller1Open] = useState(true);
  const [traveller2Open, setTraveller2Open] = useState(false);
  const [insurance, setInsurance] = useState(true);
  const [gstInvoice, setGstInvoice] = useState(false);

  return (
    <div className="pkg-checkout-container">
      
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
              <div className="pkg-co-field">
                <label>Start Date</label>
                <div className="pkg-co-input-wrap">
                  <Calendar size={18} className="pkg-co-icon" />
                  <select defaultValue="23-may">
                    <option value="23-may">Fri 23 May 2025</option>
                  </select>
                </div>
              </div>
              <div className="pkg-co-field">
                <label>End Date</label>
                <div className="pkg-co-input-wrap">
                  <Calendar size={18} className="pkg-co-icon" />
                  <select defaultValue="26-may">
                    <option value="26-may">Mon 26 May 2025</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>GUESTS & ROOMS</h2>
            <div className="pkg-co-grid">
              <div className="pkg-co-field">
                <label>Rooms</label>
                <div className="pkg-co-input-wrap">
                  <HomeIcon size={18} className="pkg-co-icon" />
                  <select defaultValue="1">
                    <option value="1">1 Room</option>
                    <option value="2">2 Rooms</option>
                  </select>
                </div>
              </div>
              <div className="pkg-co-field">
                <label>Travelers</label>
                <div className="pkg-co-input-wrap">
                  <Users size={18} className="pkg-co-icon" />
                  <select defaultValue="2">
                    <option value="2">2 Adults, 0 Children</option>
                    <option value="3">3 Adults, 0 Children</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="pkg-co-section">
            <h2 className="pkg-co-section-title" style={{ marginBottom: '24px' }}>TRAVELLER DETAILS</h2>
            
            <div className="pkg-co-traveller">
              <div className="pkg-co-traveller-header" onClick={() => setTraveller1Open(!traveller1Open)}>
                <div className="pkg-co-t-left">
                  <div className="pkg-co-t-num">1</div>
                  <div className="pkg-co-t-name">Rahul Sharma</div>
                </div>
                {traveller1Open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
              </div>
              {traveller1Open && (
                <div className="pkg-co-traveller-body">
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Age</span>
                    <span className="pkg-co-t-val">28 Years</span>
                  </div>
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Gender</span>
                    <span className="pkg-co-t-val">Male</span>
                  </div>
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Status</span>
                    <span className="pkg-co-verified"><CheckCircle2 size={16} /> Verified</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pkg-co-traveller">
              <div className="pkg-co-traveller-header" onClick={() => setTraveller2Open(!traveller2Open)}>
                <div className="pkg-co-t-left">
                  <div className="pkg-co-t-num">2</div>
                  <div className="pkg-co-t-name">Priya Sharma</div>
                </div>
                {traveller2Open ? <ChevronUp size={20} color="#64748b" /> : <ChevronDown size={20} color="#64748b" />}
              </div>
              {traveller2Open && (
                <div className="pkg-co-traveller-body">
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Age</span>
                    <span className="pkg-co-t-val">26 Years</span>
                  </div>
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Gender</span>
                    <span className="pkg-co-t-val">Female</span>
                  </div>
                  <div className="pkg-co-t-field">
                    <span className="pkg-co-t-label">Status</span>
                    <span className="pkg-co-verified"><CheckCircle2 size={16} /> Verified</span>
                  </div>
                </div>
              )}
            </div>

            <button className="pkg-co-add-btn">
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

              <button className="pkg-co-book-btn" onClick={() => navigate('/booking-success')}>Book Now</button>
              
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
  );
};

export default PackageCheckout;
