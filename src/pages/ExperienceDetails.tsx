import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, 
  ShieldCheck, Heart, Check, 
  Coffee, UserCheck, Shield, Sparkles, Sun, Smile, ShoppingBag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ExperienceDetails.css';

const ExperienceDetails: React.FC = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState('Select Date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [travellersCount, setTravellersCount] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleBookNow = () => {
    if (date === 'Select Date') {
      alert('Please select a date first.');
      return;
    }
    
    // Navigate to checkout
    navigate(`/experiences/water-rafting-in-teesta/checkout`, {
      state: {
        date,
        travellersCount,
        pricePerPerson: 1850
      }
    });
  };

  return (
    <div className="ed-page-wrapper" onClick={() => { setShowDatePicker(false); setShowGuestPicker(false); }}>
      <Navbar theme="blue" />

      {/* Breadcrumbs */}
      <div className="ed-breadcrumbs-bar">
        <div className="ed-breadcrumbs-container">
          <span onClick={() => navigate('/experiences')}>Home</span> &rsaquo; 
          <span onClick={() => navigate('/experiences/search')}>West Bengal</span> &rsaquo; 
          <span onClick={() => navigate('/experiences/search')}>Siliguri</span> &rsaquo; 
          <span className="active">Water Rafting in Teesta</span>
        </div>
      </div>

      <main className="ed-main">
        <div className="ed-container">
          
          {/* Header title block */}
          <div className="ed-title-block">
            <h1>Water Rafting in Teesta</h1>
            <div className="ed-meta-row">
              <span className="ed-rating">
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <strong>4.6</strong> <span className="review-count">(1,234 reviews)</span>
              </span>
              <span className="ed-location">
                <MapPin size={16} />
                <span>Siliguri, West Bengal</span>
              </span>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="ed-gallery-grid">
            <div className="ed-gallery-main">
              <img src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=800" alt="Main Rafting" />
            </div>
            
            <div className="ed-gallery-thumbs">
              <div className="ed-thumb-item">
                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400" alt="Valley River" />
              </div>
              <div className="ed-thumb-item">
                <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=400" alt="Action Shot" />
              </div>
              <div className="ed-thumb-item">
                <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400" alt="Gear Paddles" />
              </div>
              <div className="ed-thumb-item">
                <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" alt="Sunset River" />
              </div>
            </div>
          </div>

          {/* Quick info tags bar */}
          <div className="ed-quick-info-row">
            <div className="ed-quick-card">
              <span className="eq-label">DURATION</span>
              <strong className="eq-value">3-4 Hours</strong>
            </div>
            <div className="ed-quick-card">
              <span className="eq-label">DIFFICULTY</span>
              <strong className="eq-value">Moderate</strong>
            </div>
            <div className="ed-quick-card">
              <span className="eq-label">GROUP SIZE</span>
              <strong className="eq-value">2-12 People</strong>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="ed-tabs-row">
            <button className="ed-tab-btn active">Overview</button>
            <button className="ed-tab-btn">Highlights</button>
            <button className="ed-tab-btn">Amenities</button>
            <button className="ed-tab-btn">Necessities</button>
            <button className="ed-tab-btn">Reviews</button>
          </div>

          {/* Main Content Details (Left) + Sticky Booking Card (Right) */}
          <div className="ed-grid-layout">
            
            <div className="ed-details-col">
              
              {/* About section */}
              <section className="ed-section">
                <h2>About this Experience</h2>
                <p>
                  Experience the thrill of white water rafting in the scenic Teesta River. This adventure takes you 
                  through the heart of the Darjeeling hills, offering breathtaking views of lush forests and winding 
                  valleys. Our professional guides ensure a safe yet exhilarating journey as you tackle Class II and 
                  III rapids. Perfect for both beginners looking for their first thrill and experienced rafters seeking a 
                  beautiful new run.
                </p>
              </section>

              {/* Highlights list */}
              <section className="ed-section">
                <h2>Highlights</h2>
                <div className="ed-highlights-list">
                  <div className="ed-highlight-item">
                    <Check size={18} className="ed-check-icon" />
                    <span>Scenic river views of the Darjeeling hills</span>
                  </div>
                  <div className="ed-highlight-item">
                    <Check size={18} className="ed-check-icon" />
                    <span>Top-of-the-line safety equipment provided</span>
                  </div>
                  <div className="ed-highlight-item">
                    <Check size={18} className="ed-check-icon" />
                    <span>Professional and certified river guides</span>
                  </div>
                  <div className="ed-highlight-item">
                    <Check size={18} className="ed-check-icon" />
                    <span>Suitable for beginners and families</span>
                  </div>
                </div>
              </section>

              {/* What's Included */}
              <section className="ed-section">
                <h2>What's Included</h2>
                <div className="ed-inclusion-row">
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Shield size={20} />
                    </div>
                    <span>Safety Equipment</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <UserCheck size={20} />
                    </div>
                    <span>Professional Guide</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Coffee size={20} />
                    </div>
                    <span>Refreshments</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Heart size={20} />
                    </div>
                    <span>Insurance</span>
                  </div>
                </div>
              </section>

              {/* What to Bring */}
              <section className="ed-section">
                <h2>What to Bring</h2>
                <div className="ed-inclusion-row">
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Sun size={20} />
                    </div>
                    <span>Swimwear</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Smile size={20} />
                    </div>
                    <span>Towel</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <ShoppingBag size={20} />
                    </div>
                    <span>Change of Clothes</span>
                  </div>
                  <div className="ed-inclusion-item">
                    <div className="ed-inc-icon-box">
                      <Sparkles size={20} />
                    </div>
                    <span>Sunscreen</span>
                  </div>
                </div>
              </section>

              {/* Reviews & Breakdown */}
              <section className="ed-section" style={{ borderBottom: 'none' }}>
                <div className="ed-reviews-header-block">
                  <div className="ed-reviews-overall">
                    <strong>4.7</strong>
                    <div className="ed-stars-row">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                    <span>1,234 Reviews</span>
                  </div>

                  <div className="ed-reviews-bars">
                    <div className="ed-bar-item">
                      <span>Safety</span>
                      <div className="ed-bar-line"><div className="ed-bar-fill" style={{ width: '98%' }}></div></div>
                      <span>4.9</span>
                    </div>
                    <div className="ed-bar-item">
                      <span>Experience</span>
                      <div className="ed-bar-line"><div className="ed-bar-fill" style={{ width: '96%' }}></div></div>
                      <span>4.8</span>
                    </div>
                    <div className="ed-bar-item">
                      <span>Value for Money</span>
                      <div className="ed-bar-line"><div className="ed-bar-fill" style={{ width: '92%' }}></div></div>
                      <span>4.6</span>
                    </div>
                  </div>
                </div>

                <div className="ed-reviews-list">
                  <div className="ed-review-card">
                    <div className="ed-rev-header">
                      <div className="ed-rev-user">
                        <div className="ed-user-avatar">R</div>
                        <div className="ed-user-info">
                          <h4>Rahul Mehra</h4>
                          <span>October 2023</span>
                        </div>
                      </div>
                      <div className="ed-stars-row">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                        ))}
                      </div>
                    </div>
                    <p className="ed-rev-text">
                      Absolutely amazing experience! The Teesta rapids were thrilling but felt very safe with our guide, 
                      Pemba. The views of the valley are unmatched. Highly recommend the morning slot for the best light.
                    </p>
                  </div>

                  <div className="ed-review-card">
                    <div className="ed-rev-header">
                      <div className="ed-rev-user">
                        <div className="ed-user-avatar">P</div>
                        <div className="ed-user-info">
                          <h4>Priya Sharma</h4>
                          <span>September 2023</span>
                        </div>
                      </div>
                      <div className="ed-stars-row">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                        ))}
                        <Star size={14} fill="none" color="#cbd5e1" />
                      </div>
                    </div>
                    <p className="ed-rev-text">
                      Great trip for a first-timer. The equipment was in good condition and the refreshments at the end 
                      were a nice touch. It gets a bit crowded on weekends, so try to book a weekday if possible.
                    </p>
                  </div>
                </div>

                <button className="ed-btn-all-reviews">Show all 1,234 reviews</button>
              </section>

            </div>

            {/* Right Sticky Booking Card */}
            <div className="ed-booking-col">
              <div className="ed-booking-card">
                <div className="ed-book-price-row">
                  <span>From</span>
                  <strong>₹1,850</strong>
                  <span>/person</span>
                </div>

                <div className="ed-book-form">
                  <div className="ed-book-field relative" onClick={e => { e.stopPropagation(); setShowDatePicker(!showDatePicker); setShowGuestPicker(false); }}>
                    <label>DATE</label>
                    <div className="ed-book-input-row">
                      <span>{date}</span>
                      <Calendar size={18} className="ed-book-icon" />
                    </div>

                    {showDatePicker && (
                      <div className="custom-calendar-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                        <div className="calendar-header">
                          <button type="button">&lt;</button>
                          <span>May 2024</span>
                          <button type="button">&gt;</button>
                        </div>
                        <div className="calendar-grid">
                          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
                          <div className="cal-empty"></div><div className="cal-empty"></div><div className="cal-empty"></div>
                          {Array.from({length: 31}, (_, i) => i + 1).map(d => (
                            <div 
                              key={d} 
                              className={`cal-day ${date.includes(`${d} May`) ? 'selected' : ''}`} 
                              onClick={() => { setDate(`${d} May 2024`); setShowDatePicker(false); }}
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="ed-book-field relative" onClick={e => { e.stopPropagation(); setShowGuestPicker(!showGuestPicker); setShowDatePicker(false); }}>
                    <label>TRAVELERS</label>
                    <div className="ed-book-input-row">
                      <span>{travellersCount} Travelers</span>
                      <Users size={18} className="ed-book-icon" />
                    </div>

                    {showGuestPicker && (
                      <div className="custom-guest-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                        <div className="guest-row">
                          <div className="guest-info"><span>Travelers</span></div>
                          <div className="guest-controls">
                            <button type="button" onClick={() => setTravellersCount(Math.max(1, travellersCount - 1))}>-</button>
                            <span>{travellersCount}</span>
                            <button type="button" onClick={() => setTravellersCount(travellersCount + 1)}>+</button>
                          </div>
                        </div>
                        <button type="button" className="guest-done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
                      </div>
                    )}
                  </div>
                </div>

                <button className="ed-btn-book" onClick={handleBookNow}>
                  Book Now
                </button>

                <div className="ed-free-cancel-lbl">
                  <ShieldCheck size={14} />
                  <span>Free cancellation up to 24h before</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperienceDetails;
