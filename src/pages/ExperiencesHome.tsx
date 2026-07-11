import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Compass, Users, Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import experiencesHeroImg from '../assets/experiences_hero.jpg';
import './ExperiencesHome.css';

// Popular Destinations
const POPULAR_DESTINATIONS = [
  { name: 'Andaman', img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=400' },
  { name: 'Lakshadweep', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400' },
  { name: 'Rajasthan', img: 'https://images.unsplash.com/photo-1477587458883-471a5ed08ff4?auto=format&fit=crop&q=80&w=400' },
  { name: 'Himachal', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400' },
  { name: 'Kerala', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400' }
];

// Adventure Types
const ADVENTURE_TYPES = [
  { id: 'trekking', label: 'Trekking', icon: '🥾' },
  { id: 'water', label: 'Water Sports', icon: '🏄‍♂️', active: true },
  { id: 'camping', label: 'Camping', icon: '⛺' },
  { id: 'air', label: 'Air Sports', icon: '🪂' },
  { id: 'nature', label: 'Nature Trek', icon: '🌲' },
  { id: 'road', label: 'Road Trip', icon: '🚗' },
  { id: 'skiing', label: 'Skiing', icon: '⛷️' },
  { id: 'scuba', label: 'Scuba Diving', icon: '🤿' }
];

// Trending Adventures
const TRENDING_ADVENTURES = [
  {
    id: 1,
    name: 'Rafting at Kaliagong',
    location: 'Rishikesh, Uttarakhand',
    price: 9999,
    img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 2,
    name: 'Skyline Paragliding',
    location: 'Bir Billing, HP',
    price: 18500,
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=500'
  }
];

// Social Memories
const MEMORIES = [
  { handle: '@traveler_1', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_2', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_3', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_4', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_5', img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_6', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=150' },
  { handle: '@traveler_7', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150' }
];

const ExperiencesHome: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Kolkata, WB');
  const [date, setDate] = useState('22 May 2024');
  const [adventureType, setAdventureType] = useState('Water Sports');
  const [travelers, setTravelers] = useState('21 Travelers');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const [guestsCount, setGuestsCount] = useState(21);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/experiences/search');
  };

  const handleBookNow = () => {
    navigate('/experiences/water-rafting-in-teesta');
  };

  return (
    <div className="exp-page-wrapper" onClick={() => { setShowDatePicker(false); setShowTypePicker(false); setShowGuestPicker(false); }}>
      <Navbar theme="blue" />

      {/* Hero Banner */}
      <section className="exp-hero" style={{ backgroundImage: `url('${experiencesHeroImg}')` }}>
        <div className="exp-hero-overlay"></div>
        <div className="exp-hero-content">
          <h1>Unleash Your Inner<br />Adventurer</h1>
          <p>Discover offbeat destinations and thrilling experiences curated for the bold soul.</p>
        </div>

        {/* Floating Search Bar */}
        <div className="exp-search-container" onClick={e => e.stopPropagation()}>
          <form className="exp-search-bar" onSubmit={handleSearch}>
            <div className="exp-search-field">
              <label>LOCATION</label>
              <div className="exp-input-row">
                <MapPin size={16} className="exp-icon" />
                <input 
                  type="text" 
                  value={location} 
                  onChange={e => setLocation(e.target.value)} 
                  className="exp-field-input"
                />
              </div>
            </div>

            <div className="exp-search-field relative" onClick={() => { setShowDatePicker(!showDatePicker); setShowTypePicker(false); setShowGuestPicker(false); }}>
              <label>DATE</label>
              <div className="exp-input-row">
                <Calendar size={16} className="exp-icon" />
                <span className="exp-field-val">{date}</span>
              </div>
              {showDatePicker && (
                <div className="custom-calendar-popover" style={{ left: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
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

            <div className="exp-search-field relative" onClick={() => { setShowTypePicker(!showTypePicker); setShowDatePicker(false); setShowGuestPicker(false); }}>
              <label>ADVENTURE TYPE</label>
              <div className="exp-input-row">
                <Compass size={16} className="exp-icon" />
                <span className="exp-field-val">{adventureType}</span>
              </div>
              {showTypePicker && (
                <div className="custom-guest-popover" style={{ left: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="guest-row" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Trekking', 'Water Sports', 'Camping', 'Air Sports', 'Road Trip'].map(t => (
                      <button 
                        key={t}
                        type="button"
                        className="guest-done-btn"
                        style={{ margin: 0, background: adventureType === t ? '#0052ff' : '#f1f5f9', color: adventureType === t ? '#ffffff' : '#334155' }}
                        onClick={() => { setAdventureType(t); setShowTypePicker(false); }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="exp-search-field relative" onClick={() => { setShowGuestPicker(!showGuestPicker); setShowDatePicker(false); setShowTypePicker(false); }}>
              <label>TRAVELERS</label>
              <div className="exp-input-row">
                <Users size={16} className="exp-icon" />
                <span className="exp-field-val">{travelers}</span>
              </div>
              {showGuestPicker && (
                <div className="custom-guest-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="guest-row">
                    <div className="guest-info"><span>Travelers</span></div>
                    <div className="guest-controls">
                      <button type="button" onClick={() => { setGuestsCount(Math.max(1, guestsCount - 1)); setTravelers(`${Math.max(1, guestsCount - 1)} Travelers`); }}>-</button>
                      <span>{guestsCount}</span>
                      <button type="button" onClick={() => { setGuestsCount(guestsCount + 1); setTravelers(`${guestsCount + 1} Travelers`); }}>+</button>
                    </div>
                  </div>
                  <button type="button" className="guest-done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
                </div>
              )}
            </div>

            <button type="submit" className="exp-search-btn">
              <Search size={16} />
              <span>Search Adventure</span>
            </button>
          </form>
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="exp-main">
        <div className="exp-container">
          
          {/* Popular Destinations */}
          <section className="exp-section">
            <div className="exp-section-header">
              <h2>Popular Destinations</h2>
              <a href="#viewall" className="exp-view-all">View All &rsaquo;</a>
            </div>
            
            <div className="exp-dest-grid">
              {POPULAR_DESTINATIONS.map((dest, idx) => (
                <div key={idx} className="exp-dest-card">
                  <img src={dest.img} alt={dest.name} className="exp-dest-img" />
                  <div className="exp-dest-overlay"></div>
                  <span className="exp-dest-name">{dest.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Browse by Adventure Type */}
          <section className="exp-section">
            <div className="exp-section-header">
              <h2>Browse by Adventure Type</h2>
              <a href="#viewall" className="exp-view-all">View All &rsaquo;</a>
            </div>

            <div className="exp-types-row">
              {ADVENTURE_TYPES.map(type => (
                <button 
                  key={type.id} 
                  className={`exp-type-pill ${type.active ? 'active' : ''}`}
                  onClick={() => setAdventureType(type.label)}
                >
                  <span className="exp-pill-icon">{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Trending Adventures */}
          <section className="exp-section">
            <div className="exp-section-header">
              <h2>Trending Adventures</h2>
            </div>

            <div className="exp-trending-grid">
              {TRENDING_ADVENTURES.map(adv => (
                <div key={adv.id} className="exp-trend-card">
                  <img src={adv.img} alt={adv.name} className="exp-trend-img" />
                  <div className="exp-trend-body">
                    <div className="exp-trend-loc">
                      <MapPin size={14} />
                      <span>{adv.location}</span>
                    </div>
                    <h3>{adv.name}</h3>
                    <div className="exp-trend-footer">
                      <div className="exp-price-col">
                        <span className="exp-price-lbl">Starting from</span>
                        <strong className="exp-price-val">₹{adv.price.toLocaleString('en-IN')}</strong>
                      </div>
                      <button className="exp-book-btn" onClick={() => handleBookNow()}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Exciting Offers For You */}
          <section className="exp-section">
            <div className="exp-section-header">
              <h2>Exciting offers for you</h2>
            </div>

            <div className="exp-offers-grid">
              <div className="exp-offer-card dark-blue">
                <div className="exp-offer-left">
                  <span className="offer-badge">EARLY BIRD DISCOUNT</span>
                  <h3>Get 30% Off on your first Himalayan Trek</h3>
                  <p>Use code: TREK30</p>
                </div>
                <div className="exp-offer-graphic trek-graphic"></div>
              </div>

              <div className="exp-offer-card light-blue">
                <div className="exp-offer-left">
                  <span className="offer-badge">SOLO TRAVELER DEAL</span>
                  <h3>Free gear rental for 5-day solo road trips</h3>
                  <p>Limited time offer for June-August</p>
                </div>
                <div className="exp-offer-graphic road-graphic"></div>
              </div>
            </div>
          </section>

          {/* Travel Memories Section */}
          <section className="exp-section" style={{ marginBottom: '60px' }}>
            <div className="exp-section-header" style={{ justifyContent: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Travel Memories Made Real</h2>
            </div>
            
            <div className="exp-memories-row">
              {MEMORIES.map((m, idx) => (
                <div key={idx} className="exp-memory-item">
                  <div className="exp-memory-circle">
                    <img src={m.img} alt={m.handle} className="exp-memory-img" />
                  </div>
                  <span>{m.handle}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencesHome;
