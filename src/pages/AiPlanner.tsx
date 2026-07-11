import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, ArrowRight, Zap, Bell, Download, Share2, ChevronRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import headerIllustration from '../assets/image 177.svg';
import './AiPlanner.css';

// Mock Saved Journeys
const SAVED_JOURNEYS = [
  {
    id: 1,
    title: 'Weekend Gangtok Trip',
    route: 'Kolkata ➔ Gangtok',
    date: '18 May 2024',
    passengers: '2 Passengers',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 2,
    title: 'Darjeeling Planner',
    route: 'Kolkata ➔ Darjeeling',
    date: '10 Jun 2024',
    passengers: '3 Stops',
    img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    title: 'Sikkim Explorer',
    route: 'Gangtok ➔ North Sikkim',
    date: '15 Jul 2024',
    passengers: '1 Passenger',
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=200'
  }
];

const AiPlanner: React.FC = () => {
  const navigate = useNavigate();
  
  const [from, setFrom] = useState('Kolkata');
  const [fromStation, setFromStation] = useState('Capilmoda');
  
  const [to, setTo] = useState('Gangtok');
  const [toStation, setToStation] = useState('Tenzing Norgay Bus Stand');
  
  const [date, setDate] = useState('22 May 2024');
  const [passengers, setPassengers] = useState('2 Passenger');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassengerPicker, setShowPassengerPicker] = useState(false);
  const [passengersCount, setPassengersCount] = useState(2);
  
  const [isPlanning, setIsPlanning] = useState(false);

  const handlePlanJourney = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanning(true);
    setTimeout(() => {
      setIsPlanning(false);
      navigate('/ai-planner/search');
    }, 2500);
  };

  return (
    <div className="ap-page-wrapper" onClick={() => { setShowDatePicker(false); setShowPassengerPicker(false); }}>
      <Navbar theme="blue" />

      {/* 1. Large Blue Banner Section */}
      <section className="ap-hero">
        <div className="ap-hero-container">
          <div className="ap-hero-left">
            <h1>Plan smart multi-leg<br />journeys across cities</h1>
            <p>Experience the future of travel with AI-driven route optimization and real-time connectivity.</p>
          </div>
          
          <div className="ap-hero-right">
            <img src={headerIllustration} alt="Bus and Car Illustration" className="ap-hero-graphic" />
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="ap-search-container" onClick={e => e.stopPropagation()}>
          <form className="ap-search-bar" onSubmit={handlePlanJourney}>
            <div className="ap-search-field">
              <label>FROM</label>
              <div className="ap-input-row">
                <MapPin size={16} className="ap-icon" />
                <div className="ap-input-col">
                  <input type="text" value={from} onChange={e => setFrom(e.target.value)} className="ap-field-input-main" />
                  <input type="text" value={fromStation} onChange={e => setFromStation(e.target.value)} className="ap-field-input-sub" />
                </div>
              </div>
            </div>

            <div className="ap-search-field">
              <label>TO</label>
              <div className="ap-input-row">
                <ArrowRight size={16} className="ap-icon" />
                <div className="ap-input-col">
                  <input type="text" value={to} onChange={e => setTo(e.target.value)} className="ap-field-input-main" />
                  <input type="text" value={toStation} onChange={e => setToStation(e.target.value)} className="ap-field-input-sub" />
                </div>
              </div>
            </div>

            <div className="ap-search-field relative" onClick={() => { setShowDatePicker(!showDatePicker); setShowPassengerPicker(false); }}>
              <label>DATE OF JOURNEY</label>
              <div className="ap-input-row">
                <Calendar size={16} className="ap-icon" />
                <div className="ap-input-col">
                  <span className="ap-field-val-main">{date}</span>
                  <span className="ap-field-val-sub">Wednesday</span>
                </div>
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

            <div className="ap-search-field relative" onClick={() => { setShowPassengerPicker(!showPassengerPicker); setShowDatePicker(false); }}>
              <label>PASSENGERS</label>
              <div className="ap-input-row">
                <Users size={16} className="ap-icon" />
                <div className="ap-input-col">
                  <span className="ap-field-val-main">{passengers}</span>
                  <span className="ap-field-val-sub">Standard Seat</span>
                </div>
              </div>

              {showPassengerPicker && (
                <div className="custom-guest-popover" style={{ right: '0', top: '100%' }} onClick={e => e.stopPropagation()}>
                  <div className="guest-row">
                    <div className="guest-info"><span>Passengers</span></div>
                    <div className="guest-controls">
                      <button type="button" onClick={() => { setPassengersCount(Math.max(1, passengersCount - 1)); setPassengers(`${Math.max(1, passengersCount - 1)} Passenger`); }}>-</button>
                      <span>{passengersCount}</span>
                      <button type="button" onClick={() => { setPassengersCount(passengersCount + 1); setPassengers(`${passengersCount + 1} Passenger`); }}>+</button>
                    </div>
                  </div>
                  <button type="button" className="guest-done-btn" onClick={() => setShowPassengerPicker(false)}>Done</button>
                </div>
              )}
            </div>

            <button type="submit" className="ap-search-btn">
              Plan Journey
            </button>
          </form>
        </div>
      </section>

      {/* Main Container */}
      <main className="ap-main">
        <div className="ap-container">
          
          {/* 2. Travel Tools & Features */}
          <section className="ap-section">
            <div className="ap-section-header">
              <h2>Travel Tools & Features</h2>
              <p>Everything you need to manage your trips effectively.</p>
            </div>

            <div className="ap-features-grid">
              <div className="ap-feature-card">
                <div className="ap-feat-icon-box blue">
                  <Zap size={18} />
                </div>
                <h3>Smart Schedule Optimizer</h3>
                <p>Optimize your routes and stay ahead of schedule with smart alerts.</p>
              </div>

              <div className="ap-feature-card">
                <div className="ap-feat-icon-box green">
                  <Bell size={18} />
                </div>
                <h3>Journey Alerts</h3>
                <p>Optimize your routes and stay ahead of schedule with smart alerts.</p>
              </div>

              <div className="ap-feature-card">
                <div className="ap-feat-icon-box purple">
                  <Download size={18} />
                </div>
                <h3>Offline Itinerary</h3>
                <p>Optimize your routes and stay ahead of schedule with smart alerts.</p>
              </div>

              <div className="ap-feature-card">
                <div className="ap-feat-icon-box orange">
                  <Share2 size={18} />
                </div>
                <h3>Journey Sharing</h3>
                <p>Optimize your routes and stay ahead of schedule with smart alerts.</p>
              </div>
            </div>
          </section>

          {/* 3. Saved Journeys */}
          <section className="ap-section" style={{ marginBottom: '60px' }}>
            <div className="ap-section-header-row">
              <div className="ap-sec-title-wrap">
                <h2>Saved Journeys</h2>
                <p>Quickly rebook or view your recent travel plans.</p>
              </div>
              <a href="#all" className="ap-view-all" onClick={e => { e.preventDefault(); alert('Viewing all saved journeys...'); }}>View All</a>
            </div>

            <div className="ap-saved-grid">
              {SAVED_JOURNEYS.map(j => (
                <div key={j.id} className="ap-saved-card" onClick={() => { setFrom(j.route.split(' ➔ ')[0]); setTo(j.route.split(' ➔ ')[1]); }}>
                  <div className="ap-saved-left">
                    <img src={j.img} alt={j.title} className="ap-saved-img" />
                    <div className="ap-saved-info">
                      <h3>{j.title}</h3>
                      <p className="ap-saved-route">{j.route}</p>
                      <p className="ap-saved-meta">📅 {j.date}  •  👥 {j.passengers}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="ap-saved-caret" />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* AI Processing Animation */}
      {isPlanning && (
        <div className="ap-processing-overlay">
          <div className="ap-processing-card">
            <div className="ap-spinner"></div>
            <h2>AI Route Optimizer</h2>
            <p>Finding the smartest multi-leg routes and booking rates for you...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AiPlanner;
