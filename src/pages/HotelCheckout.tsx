import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Lock, Star, User, Plus, Edit
} from 'lucide-react';
import './HotelCheckout.css';

const HotelCheckout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get passed state or use defaults
  const checkoutState = location.state || {
    checkIn: 'Fri, 23 May 2025',
    checkOut: 'Sun, 25 May 2025',
    guests: { adults: 2, children: 0, rooms: 1 }
  };

  const [travellers, setTravellers] = useState([
    { id: 1, name: 'Rahul Sharma', age: '28', gender: 'Male', open: false }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', age: '', gender: 'Male' });

  const handleAddGuest = () => {
    setTravellers([
      ...travellers,
      { id: travellers.length + 1, name: `Guest ${travellers.length + 1}`, age: '25', gender: 'Female', open: false }
    ]);
  };

  const handleEditClick = (idx: number) => {
    setEditIndex(idx);
    setEditForm(travellers[idx]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updated = [...travellers];
      updated[editIndex] = { ...updated[editIndex], ...editForm };
      setTravellers(updated);
      setEditIndex(null);
    }
  };

  const handleContinuePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/booking-success', {
        state: {
          type: 'package',
          packageName: 'The Lalit Great Eastern Kolkata',
          startDate: checkoutState.checkIn,
          endDate: checkoutState.checkOut,
          amount: '6,401.23',
          travellers: travellers
        }
      });
    }, 2000);
  };

  return (
    <div className="hc-page-wrapper">
      
      {/* Header */}
      <header className="hc-header">
        <button className="hc-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="hc-header-title">Confirm & Pay</h1>
      </header>

      {/* Main Grid Content */}
      <main className="hc-main">
        <div className="hc-container">
          
          {/* Left Column details */}
          <div className="hc-left-col">
            
            {/* Free Cancellation Alert */}
            <div className="hc-cancellation-banner">
              <ShieldCheck size={22} className="hc-banner-icon" />
              <div className="hc-banner-text">
                <h3>Free Cancellation</h3>
                <p>Risk-free booking. Cancel anytime before your stay starts.</p>
              </div>
            </div>

            {/* Dates Card */}
            <div className="hc-card">
              <div className="hc-card-header">
                <h2>Dates</h2>
                <button className="hc-card-action-btn" onClick={() => navigate(-1)}>Change</button>
              </div>
              <div className="hc-card-grid">
                <div className="hc-card-field">
                  <span className="hc-field-lbl">CHECK-IN</span>
                  <span className="hc-field-val">{checkoutState.checkIn}</span>
                </div>
                <div className="hc-card-field">
                  <span className="hc-field-lbl">CHECK-OUT</span>
                  <span className="hc-field-val">{checkoutState.checkOut}</span>
                </div>
              </div>
              <span className="hc-nights-badge">🌙 2 Nights</span>
            </div>

            {/* Guests & Rooms Card */}
            <div className="hc-card">
              <div className="hc-card-header">
                <h2>Guests & Rooms</h2>
                <button className="hc-card-action-btn" onClick={() => navigate(-1)}>Change</button>
              </div>
              <div className="hc-card-grid">
                <div className="hc-card-field">
                  <span className="hc-field-lbl">ROOMS</span>
                  <span className="hc-field-val">{checkoutState.guests.rooms} Room</span>
                </div>
                <div className="hc-card-field">
                  <span className="hc-field-lbl">GUESTS</span>
                  <span className="hc-field-val">{checkoutState.guests.adults} Adults, {checkoutState.guests.children} Children</span>
                </div>
              </div>
            </div>

            {/* Guests Information */}
            <div className="hc-card">
              <div className="hc-card-header" style={{ marginBottom: '20px' }}>
                <h2>Guests Information</h2>
              </div>

              <div className="hc-guests-list">
                {travellers.map((traveller, idx) => (
                  <div key={traveller.id} className="hc-guest-row">
                    <div className="hc-guest-row-left">
                      <div className="hc-guest-icon-box">
                        <User size={18} />
                      </div>
                      <div className="hc-guest-details">
                        <h3>{traveller.name}</h3>
                        <p>Age: {traveller.age} • Gender: {traveller.gender}</p>
                      </div>
                    </div>
                    <button className="hc-guest-edit-btn" onClick={() => handleEditClick(idx)}>
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>

              <button className="hc-add-guest-btn" onClick={handleAddGuest}>
                <Plus size={16} />
                <span>Add another guest</span>
              </button>
            </div>

          </div>

          {/* Right Column sidebar summary */}
          <div className="hc-right-col">
            
            <div className="hc-summary-card">
              <h2>Booking Summary</h2>
              
              <div className="hc-price-details-section">
                <span className="hc-sub-title">PRICE DETAILS</span>
                <div className="hc-price-row">
                  <span>2 Nights</span>
                  <span>₹8,595.00</span>
                </div>
                <div className="hc-price-row green">
                  <span>Discount (HOTEL123)</span>
                  <span>-₹125.00</span>
                </div>
                <div className="hc-price-row">
                  <span>Taxes & Fees</span>
                  <span>₹29.23</span>
                </div>
              </div>

              <div className="hc-total-row">
                <span className="hc-total-lbl">Total Amount</span>
                <span className="hc-total-val">₹6,401.23</span>
              </div>

              <button className="hc-btn-continue" onClick={handleContinuePayment}>
                Continue to Payment
              </button>

              <div className="hc-secure-lbl">
                <Lock size={12} />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            <div className="hc-help-card">
              <h3>Need help?</h3>
              <p>Our support team is available 24/7 to assist with your booking.</p>
              <a href="#support" className="hc-support-link" onClick={e => { e.preventDefault(); alert("Contacting Support..."); }}>Contact Support</a>
            </div>

          </div>

        </div>

        {/* Bottom Benefits Row */}
        <div className="hc-footer-benefits">
          <div className="hc-benefit-item">
            <Lock size={16} />
            <span>Secure Payment</span>
          </div>
          <div className="hc-benefit-item">
            <CheckCircle2 size={16} />
            <span>Best Price Guaranteed</span>
          </div>
          <div className="hc-benefit-item">
            <Star size={16} />
            <span>Verified Luxury Stay</span>
          </div>
        </div>
      </main>

      {/* Edit Guest Modal */}
      {editIndex !== null && (
        <div className="hc-modal-overlay">
          <div className="hc-edit-modal">
            <h3>Edit Guest Info</h3>
            <div className="hc-modal-field">
              <label>Full Name</label>
              <input 
                type="text" 
                value={editForm.name} 
                onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                className="hc-modal-input"
              />
            </div>
            <div className="hc-modal-field">
              <label>Age</label>
              <input 
                type="text" 
                value={editForm.age} 
                onChange={e => setEditForm({ ...editForm, age: e.target.value })} 
                className="hc-modal-input"
              />
            </div>
            <div className="hc-modal-field">
              <label>Gender</label>
              <select 
                value={editForm.gender} 
                onChange={e => setEditForm({ ...editForm, gender: e.target.value })} 
                className="hc-modal-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="hc-modal-actions">
              <button className="hc-modal-btn-save" onClick={handleSaveEdit}>Save Changes</button>
              <button className="hc-modal-btn-cancel" onClick={() => setEditIndex(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Animation */}
      {isProcessing && (
        <div className="hc-processing-overlay">
          <div className="hc-processing-card">
            <div className="hc-spinner"></div>
            <h2>Confirming your payment...</h2>
            <p>Please do not close or refresh this page.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default HotelCheckout;
