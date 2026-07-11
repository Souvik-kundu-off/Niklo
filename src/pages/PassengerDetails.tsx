import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, User as UserIcon, Mail, ChevronUp, ChevronDown
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PassengerDetails.css';

const PassengerDetails = () => {
  const navigate = useNavigate();
  
  // Form states
  const [passengers, setPassengers] = useState([
    { id: 1, name: '', age: '', gender: 'Male' },
    { id: 2, name: '', age: '', gender: 'Male' }
  ]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState(true);
  const [gst, setGst] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleContinuePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/booking-success');
    }, 2500);
  };

  return (
    <div className="passenger-details-page">
      {isProcessing && (
        <div className="payment-modal-overlay">
          <div className="payment-overlay-card">
            <div className="spinner"></div>
            <h2>Confirming your payment...</h2>
            <p>Please do not close this window or press back. We are securing your seats.</p>
          </div>
        </div>
      )}
      {/* 1. Header Navigation */}
      <Navbar theme="white" />

      {/* 2. Blue Top Banner */}
      <div className="page-banner">
        <div className="banner-content">
          <button className="btn-back" onClick={() => navigate('/buses')}>
            <ArrowLeft size={16} />
            Back to Select Seats
          </button>
          <h1>Passenger Details</h1>
          <p>Fill passenger information to continue booking</p>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <main className="main-content-grid">
        
        {/* Left Column (Forms) */}
        <div className="left-column">
          
          {/* Bus Summary Card */}
          <div className="details-card bus-summary-card">
            <div className="bus-summary-header">
              <div className="bus-title-area">
                <h2>SBSTC Volvo AC Semi Sleeper</h2>
                <div className="bus-rating">
                  <span className="rating-badge">4.5 ★</span>
                  <span className="rating-text">Top Rated</span>
                </div>
              </div>
              <div className="bus-time-area">
                <span className="bus-date">23 May 2024</span>
                <span className="bus-time">08:30 PM Departure</span>
              </div>
            </div>
            
            <div className="bus-route-summary">
              <div className="route-point">
                <div className="point-dot blue"></div>
                <div className="point-text">
                  <strong>Kolkata</strong>
                  <span>Boarding: Netaji Subhas</span>
                </div>
              </div>
              <div className="route-line-vertical"></div>
              <div className="route-point">
                <div className="point-dot orange"></div>
                <div className="point-text">
                  <strong>Siliguri</strong>
                  <span>Dropping: Main Hub</span>
                </div>
              </div>
              
              <div className="seats-badge">
                <strong>2 Seats</strong>
                <span>SELECTED</span>
              </div>
            </div>
          </div>

          {/* Passenger Input Cards */}
          {passengers.map((p, index) => (
            <div key={p.id} className="details-card passenger-card">
              <div className="card-header">
                <UserIcon size={20} className="icon-blue" />
                <h3>Passenger {index + 1} Adult</h3>
              </div>
              <div className="form-grid">
                <div className="input-group full-name">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul Sharma" 
                    value={p.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="input-group age">
                  <label>Age</label>
                  <input 
                    type="number" 
                    placeholder="25" 
                    value={p.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  />
                </div>
                <div className="input-group gender">
                  <label>Gender</label>
                  <div className="gender-toggle">
                    <button 
                      className={`gender-btn ${p.gender === 'Male' ? 'active' : ''}`}
                      onClick={() => handlePassengerChange(index, 'gender', 'Male')}
                    >
                      Male
                    </button>
                    <button 
                      className={`gender-btn ${p.gender === 'Female' ? 'active' : ''}`}
                      onClick={() => handlePassengerChange(index, 'gender', 'Female')}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Contact Details Card */}
          <div className="details-card contact-card">
            <div className="card-header">
              <Mail size={20} className="icon-blue" />
              <h3>Contact Details</h3>
            </div>
            <p className="card-subtitle">Ticket details will be sent to this email and mobile number.</p>
            <div className="form-grid contact-grid">
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="rahul@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 9876543210" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Options Card */}
          <div className="details-card options-card">
            <div className="card-header">
              <Shield size={20} className="icon-blue" />
              <h3>Additional Options</h3>
            </div>
            <div className="options-list">
              
              <label className="custom-checkbox-wrapper">
                <div className="checkbox-input">
                  <input 
                    type="checkbox" 
                    checked={insurance} 
                    onChange={(e) => setInsurance(e.target.checked)} 
                  />
                  <span className="checkmark"></span>
                </div>
                <div className="checkbox-content">
                  <div className="checkbox-title-row">
                    <strong>Travel Insurance</strong>
                    <span className="price-tag">₹20</span>
                  </div>
                  <p>Get secure travel with insurance for just ₹10 per passenger.</p>
                </div>
              </label>

              <label className="custom-checkbox-wrapper">
                <div className="checkbox-input">
                  <input 
                    type="checkbox" 
                    checked={gst} 
                    onChange={(e) => setGst(e.target.checked)} 
                  />
                  <span className="checkmark"></span>
                </div>
                <div className="checkbox-content">
                  <div className="checkbox-title-row">
                    <strong>I have a GST Invoice</strong>
                  </div>
                  <p>Provide your GST details for business tax benefits.</p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="right-column">
          
          <div className="details-card fare-summary-card">
            <h3>Fare Summary</h3>
            <div className="fare-breakdown">
              <div className="fare-row">
                <span>Ticket Fare (2 Seats)</span>
                <span>₹793</span>
              </div>
              <div className="fare-row discount">
                <span>Discount (BLOSAVE)</span>
                <span>-₹121</span>
              </div>
              <div className="fare-row">
                <span>Travel Insurance</span>
                <span>₹20</span>
              </div>
              <div className="fare-row">
                <span>Taxes & Fees</span>
                <span>₹20</span>
              </div>
            </div>
            <div className="fare-total">
              <span>Total Amount</span>
              <span className="total-val">₹689</span>
            </div>
            <button className="btn-continue-payment" onClick={handleContinuePayment}>
              Continue to Payment
              <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <div className="secure-badge">
              <Shield size={14} className="icon-green" />
              <span>100% Secure & Safe Payments</span>
            </div>
          </div>

          <div className="promo-applied-card">
            <h4>Promo Applied!</h4>
            <p>You saved ₹121 with BLOSAVE. Book more to earn rewards.</p>
          </div>

        </div>

      </main>

      {/* 4. FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {[
            "How does Niklo AI Journey Planner work?",
            "Can I book buses and cabs from the app?",
            "Are there any exclusive offers on the app?"
          ].map((question, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{question}</span>
                {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {activeFaq === index && (
                <div className="faq-answer">
                  <p>Detailed answer goes here...</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default PassengerDetails;
