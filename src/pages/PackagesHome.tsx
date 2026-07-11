import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Users, Filter, Clock, Wallet, 
  CheckCircle2, ShieldCheck, RefreshCw, ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PackagesHome.css';

const POPULAR_DESTINATIONS = [
  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=200' },
  { name: 'Manali', img: 'https://images.unsplash.com/photo-1605649487212-4d4ce7ca6e46?auto=format&fit=crop&q=80&w=200' },
  { name: 'Andaman', img: 'https://images.unsplash.com/photo-1589182373715-41d636db99d5?auto=format&fit=crop&q=80&w=200' },
  { name: 'Kashmir', img: 'https://images.unsplash.com/photo-1615888243394-b152d1b09b55?auto=format&fit=crop&q=80&w=200' },
  { name: 'Sikkim', img: 'https://images.unsplash.com/photo-1582285150893-1f19811c75c8?auto=format&fit=crop&q=80&w=200' },
  { name: 'Kerala', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=200' },
];

import packagesHeroImg from '../assets/packages_hero.png';
import beachHolidayImg from '../assets/beach_holiday.png';
import mountainEscapeImg from '../assets/mountain_escape.png';
import honeymoonImg from '../assets/honeymoon.png';
import familyTripImg from '../assets/family_trip.png';
import spiritualImg from '../assets/spiritual.png';
import escapeWeekendImg from '../assets/escape_the_weekend.png';
import premiumDealsImg from '../assets/premium_hotel_deals.png';

const TRAVEL_STYLES = [
  { name: 'Beach Holidays', icon: beachHolidayImg },
  { name: 'Mountain Escapes', icon: mountainEscapeImg },
  { name: 'Honeymoon', icon: honeymoonImg },
  { name: 'Family Trips', icon: familyTripImg },
  { name: 'Spiritual Journeys', icon: spiritualImg },
];

const TRENDING_PACKAGES = [
  {
    id: 'goa-escape',
    title: 'Goa Escape',
    duration: '5 Nights • 4 Days',
    price: '₹9,999',
    img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'meghalaya-explorer',
    title: 'Meghalaya Explorer',
    duration: '4 Nights • 5 Days',
    price: '₹18,999',
    img: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'jaipur-pink-city',
    title: 'Jaipur Pink City',
    duration: '2 Nights • 3 Days',
    price: '₹7,500',
    img: 'https://images.unsplash.com/photo-1477587458883-471a5ed08ff4?auto=format&fit=crop&q=80&w=600'
  }
];

const PackagesHome: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('Kolkata');
  const [to, setTo] = useState('Gangtok');
  const [date, setDate] = useState('22 May 2024');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState({ rooms: 1, adults: 2, children: 0 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleGuestChange = (type: 'rooms' | 'adults' | 'children', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      if (type === 'rooms' && newVal < 1) return prev;
      if (type === 'adults' && newVal < 1) return prev;
      return { ...prev, [type]: newVal };
    });
  };

  const getGuestsString = () => {
    const totalGuests = guests.adults + guests.children;
    return `${totalGuests} Guest${totalGuests > 1 ? 's' : ''} • ${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`;
  };

  const handleSearch = () => {
    navigate('/packages/search');
  };

  return (
    <div className="packages-home">
      <Navbar theme="blue" />
      
      {/* 1. Header Area with Search */}
      <div className="packages-header-bg">
        <div className="packages-container">
          <h1 className="packages-title">Travel Packages</h1>
          <p className="packages-subtitle">Curated trips for every traveler. Explore the beauty of the world with Niklo.</p>

          <div className="packages-search-bar">
            <div className="pkg-search-field">
              <span className="pkg-label">STARTING FROM</span>
              <input type="text" className="pkg-input" value={from} onChange={e => setFrom(e.target.value)} />
            </div>
            <div className="pkg-search-field">
              <span className="pkg-label">TRAVELLING TO</span>
              <input type="text" className="pkg-input" value={to} onChange={e => setTo(e.target.value)} />
            </div>
            <div className="pkg-search-field relative" onClick={() => { setShowDatePicker(!showDatePicker); setShowGuestPicker(false); }}>
              <span className="pkg-label">DATE OF JOURNEY</span>
              <div className="pkg-value-row">
                <Calendar size={16} className="pkg-icon" />
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
            <div className="pkg-search-field relative" onClick={() => { setShowGuestPicker(!showGuestPicker); setShowDatePicker(false); }}>
              <span className="pkg-label">GUESTS & ROOMS</span>
              <div className="pkg-value-row">
                <Users size={16} className="pkg-icon" />
                <span className="pkg-text-val">{getGuestsString()}</span>
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
            <button className="pkg-search-btn" onClick={handleSearch}>Search</button>
          </div>

          <div className="pkg-filter-pills">
            <div className="pkg-pill active"><Filter size={14} /> Filters</div>
            <div className="pkg-pill">All</div>
            <div className="pkg-pill"><Clock size={14} /> Duration</div>
            <div className="pkg-pill"><Wallet size={14} /> Budget</div>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="packages-main-content">
        <div className="packages-main-container">
          
          <div className="pkg-hero-banner" style={{ backgroundImage: `url('${packagesHeroImg}')` }}>
            <div className="pkg-hero-content">
              <h2>Explore curated packages for your next adventure</h2>
              <button className="pkg-hero-btn" onClick={handleSearch}>Explore Now</button>
            </div>
          </div>

          <section className="pkg-section">
            <div className="pkg-section-header">
              <h3 className="pkg-section-title">Popular Destinations</h3>
            </div>
            <div className="pkg-destinations-grid">
              {POPULAR_DESTINATIONS.map((dest, i) => (
                <div key={i} className="pkg-dest-item">
                  <img src={dest.img} alt={dest.name} className="pkg-dest-img" />
                  <span className="pkg-dest-name">{dest.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pkg-section">
            <div className="pkg-section-header">
              <h3 className="pkg-section-title">Travel Styles</h3>
              <a href="#" className="pkg-view-all">View All <ChevronRight size={16} /></a>
            </div>
            <div className="pkg-styles-grid">
              {TRAVEL_STYLES.map((style, i) => (
                <div key={i} className="pkg-style-card">
                  <div className="pkg-style-icon-wrap">
                    <img src={style.icon} alt={style.name} className="pkg-style-img" />
                  </div>
                  <span className="pkg-style-name">{style.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pkg-section">
            <div className="pkg-section-header">
              <h3 className="pkg-section-title">Trending Packages</h3>
            </div>
            <div className="pkg-trending-grid">
              {TRENDING_PACKAGES.map((pkg, i) => (
                <div key={i} className="pkg-trend-card">
                  <img src={pkg.img} alt={pkg.title} className="pkg-trend-img" />
                  <div className="pkg-trend-info">
                    <div className="pkg-trend-left">
                      <h4>{pkg.title}</h4>
                      <p>{pkg.duration}</p>
                    </div>
                    <div className="pkg-trend-right">
                      <div className="pkg-trend-price-block">
                        <div className="pkg-trend-price">{pkg.price}</div>
                        <div className="pkg-trend-person">/ person</div>
                      </div>
                      <button className="pkg-view-deal-btn" onClick={() => navigate(`/packages/${pkg.id}`)}>View Deal</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="pkg-value-props">
            <div className="pkg-prop-item">
              <div className="pkg-prop-icon"><CheckCircle2 size={24} /></div>
              <div className="pkg-prop-content">
                <h4>Verified Travel Partners</h4>
                <p>Every partner is manually vetted for safety and quality.</p>
              </div>
            </div>
            <div className="pkg-prop-item">
              <div className="pkg-prop-icon"><ShieldCheck size={24} /></div>
              <div className="pkg-prop-content">
                <h4>Best Price Guarantee</h4>
                <p>Find a lower price? We'll match it plus give you ₹500 off.</p>
              </div>
            </div>
            <div className="pkg-prop-item">
              <div className="pkg-prop-icon"><RefreshCw size={24} /></div>
              <div className="pkg-prop-content">
                <h4>Flexible Cancellation</h4>
                <p>Life happens. Cancel up to 24h before for full credit.</p>
              </div>
            </div>
          </section>

          <section className="pkg-section" style={{ marginTop: '60px' }}>
            <div className="pkg-section-header">
              <h3 className="pkg-section-title">Exciting Offers For You</h3>
            </div>
            <div className="pkg-offers-grid">
              <div className="pkg-offer-banner" style={{ backgroundImage: `url('${escapeWeekendImg}')` }}>
                <div className="pkg-offer-overlay">
                  <h4>Escape This Weekend</h4>
                  <p>Save up to ₹5,000 on handpicked trips.</p>
                </div>
              </div>
              <div className="pkg-offer-banner" style={{ backgroundImage: `url('${premiumDealsImg}')` }}>
                <div className="pkg-offer-overlay">
                  <h4>Premium Hotel Deals</h4>
                  <p>Exclusive luxury stays at early-bird prices.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PackagesHome;
