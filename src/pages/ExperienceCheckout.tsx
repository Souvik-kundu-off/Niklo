import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, Lock, Star, User, Plus, Edit
} from 'lucide-react';
import './ExperienceCheckout.css';

const ExperienceCheckout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get passed state or use defaults
  const checkoutState = location.state || {
    date: '24 May 2024',
    travellersCount: 2,
    pricePerPerson: 1850
  };

  const [travellers, setTravellers] = useState([
    { id: 1, name: 'Rajesh Kumar', age: '32', gender: 'Male' },
    { id: 2, name: 'Rohan Kumar', age: '28', gender: 'Male' }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', age: '', gender: 'Male' });

  const handleAddGuest = () => {
    setTravellers([
      ...travellers,
      { id: travellers.length + 1, name: `Traveler ${travellers.length + 1}`, age: '25', gender: 'Female' }
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
          packageName: 'Water Rafting in Teesta',
          startDate: checkoutState.date,
          endDate: 'Flexible',
          amount: (checkoutState.pricePerPerson * travellers.length - 150 + 85).toLocaleString('en-IN'),
          travellers: travellers
        }
      });
    }, 2000);
  };

  const basePrice = checkoutState.pricePerPerson * travellers.length;
  const discount = 150;
  const taxes = 85;
  const total = basePrice - discount + taxes;

  return (
    <div className="ec-page-wrapper">
      
      {/* Header */}
      <header className="ec-header">
        <button className="ec-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="ec-header-title">Confirm & Pay</h1>
      </header>

      {/* Main Grid Content */}
      <main className="ec-main">
        <div className="ec-container">
          
          {/* Left Column details */}
          <div className="ec-left-col">
            
            {/* Free Cancellation Alert */}
            <div className="ec-cancellation-banner">
              <ShieldCheck size={22} className="ec-banner-icon" />
              <div className="ec-banner-text">
                <h3>Free Cancellation</h3>
                <p>Risk-free booking. Cancel anytime up to 24h before your experience starts.</p>
              </div>
            </div>

            {/* Dates Card */}
            <div className="ec-card">
              <div className="ec-card-header">
                <h2>Date</h2>
                <button className="ec-card-action-btn" onClick={() => navigate(-1)}>Change</button>
              </div>
              <div className="ec-card-grid">
                <div className="ec-card-field">
                  <span className="ec-field-lbl">EXPERIENCE DATE</span>
                  <span className="ec-field-val">{checkoutState.date}</span>
                </div>
              </div>
            </div>

            {/* Travelers Count Card */}
            <div className="ec-card">
              <div className="ec-card-header">
                <h2>Travelers</h2>
                <button className="ec-card-action-btn" onClick={() => navigate(-1)}>Change</button>
              </div>
              <div className="ec-card-grid">
                <div className="ec-card-field">
                  <span className="ec-field-lbl">TOTAL TRAVELERS</span>
                  <span className="ec-field-val">{travellers.length} Travelers</span>
                </div>
              </div>
            </div>

            {/* Travelers Information */}
            <div className="ec-card">
              <div className="ec-card-header" style={{ marginBottom: '20px' }}>
                <h2>Travelers Information</h2>
              </div>

              <div className="ec-guests-list">
                {travellers.map((traveller, idx) => (
                  <div key={traveller.id} className="ec-guest-row">
                    <div className="ec-guest-row-left">
                      <div className="ec-guest-icon-box">
                        <User size={18} />
                      </div>
                      <div className="ec-guest-details">
                        <h3>{traveller.name}</h3>
                        <p>Age: {traveller.age} • Gender: {traveller.gender}</p>
                      </div>
                    </div>
                    <button className="ec-guest-edit-btn" onClick={() => handleEditClick(idx)}>
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                ))}
              </div>

              <button className="ec-add-guest-btn" onClick={handleAddGuest}>
                <Plus size={16} />
                <span>Add another traveler</span>
              </button>
            </div>

          </div>

          {/* Right Column sidebar summary */}
          <div className="ec-right-col">
            
            <div className="ec-summary-card">
              <h2>Booking Summary</h2>
              
              <div className="ec-price-details-section">
                <span className="ec-sub-title">PRICE DETAILS</span>
                <div className="ec-price-row">
                  <span>{travellers.length} Traveler{travellers.length > 1 ? 's' : ''}</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="ec-price-row green">
                  <span>Adventure Promo Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="ec-price-row">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="ec-total-row">
                <span className="ec-total-lbl">Total Amount</span>
                <span className="ec-total-val">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button className="ec-btn-continue" onClick={handleContinuePayment}>
                Continue to Payment
              </button>

              <div className="ec-secure-lbl">
                <Lock size={12} />
                <span>Your information is secure and encrypted</span>
              </div>
            </div>

            <div className="ec-help-card">
              <h3>Need help?</h3>
              <p>Our support team is available 24/7 to assist with your booking.</p>
              <a href="#support" className="ec-support-link" onClick={e => { e.preventDefault(); alert("Contacting Support..."); }}>Contact Support</a>
            </div>

          </div>

        </div>

        {/* Bottom Benefits Row */}
        <div className="ec-footer-benefits">
          <div className="ec-benefit-item">
            <Lock size={16} />
            <span>Secure Payment</span>
          </div>
          <div className="ec-benefit-item">
            <CheckCircle2 size={16} />
            <span>Best Price Guaranteed</span>
          </div>
          <div className="ec-benefit-item">
            <Star size={16} />
            <span>Verified Luxury Stay</span>
          </div>
        </div>
      </main>

      {/* Edit Traveler Modal */}
      {editIndex !== null && (
        <div className="ec-modal-overlay">
          <div className="ec-edit-modal">
            <h3>Edit Traveler Info</h3>
            <div className="ec-modal-field">
              <label>Full Name</label>
              <input 
                type="text" 
                value={editForm.name} 
                onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                className="ec-modal-input"
              />
            </div>
            <div className="ec-modal-field">
              <label>Age</label>
              <input 
                type="text" 
                value={editForm.age} 
                onChange={e => setEditForm({ ...editForm, age: e.target.value })} 
                className="ec-modal-input"
              />
            </div>
            <div className="ec-modal-field">
              <label>Gender</label>
              <select 
                value={editForm.gender} 
                onChange={e => setEditForm({ ...editForm, gender: e.target.value })} 
                className="ec-modal-select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="ec-modal-actions">
              <button className="ec-modal-btn-save" onClick={handleSaveEdit}>Save Changes</button>
              <button className="ec-modal-btn-cancel" onClick={() => setEditIndex(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Animation */}
      {isProcessing && (
        <div className="ec-processing-overlay">
          <div className="ec-processing-card">
            <div className="ec-spinner"></div>
            <h2>Confirming your payment...</h2>
            <p>Please do not close or refresh this page.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExperienceCheckout;
