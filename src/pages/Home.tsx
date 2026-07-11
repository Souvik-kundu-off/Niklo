import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Search, ArrowRightLeft, ChevronRight, 
  Plus, Minus, ArrowRight, Heart
} from 'lucide-react';

import floatingAiIcon from '../assets/AI planner floating.svg';
import heroBg from '../assets/hero bg.jpg';
import busIcon from '../assets/bus.svg';
import cabIcon from '../assets/car.svg';
import hotelIcon from '../assets/Hotel.svg';
import adventureIcon from '../assets/adventure.svg';
import planYourTripAsset from '../assets/plan your trip asset.jpg';
import appDownloadCtaImage from '../assets/app download cta image.jpg';
import image177 from '../assets/image 177.svg';
import image180 from '../assets/image 180.svg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import './Home.css';

// Mock Destinations
const DESTINATIONS = [
  {
    id: 1,
    name: 'Varanasi',
    subtext: 'Spiritual & Cultural',
    price: 3500,
    img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Taj Mahal',
    subtext: 'Heritage & Romance',
    price: 4500,
    img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Nainital',
    subtext: 'Lakes & Mountains',
    price: 4800,
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Jaipur',
    subtext: 'Palaces & History',
    price: 4200,
    img: 'https://images.unsplash.com/photo-1477587458883-471a5ed08ff4?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  }
];

// Mock Offers with SVG illustrations and precise properties
const OFFERS = [
  {
    id: 1,
    title: 'Save More on Every Journey',
    date: 'Valid till 31 Aug 2026',
    code: 'Code: BUS150',
    bgColor: '#e0f2fe', // light blue
    textColor: '#0052ff', // blue text
    badgeColor: '#0052ff', // blue badge
    img: busIcon
  },
  {
    id: 2,
    title: 'Airport Transfer Deal',
    desc: 'Travel to and from the airport at discounted fares.',
    date: 'Valid till 31 Aug 2026',
    code: 'Code: BUS150',
    bgColor: '#e8ecf4', // greyish-purple
    textColor: '#0f172a', // dark text
    badgeColor: '#0f172a', // black badge
    img: image180
  },
  {
    id: 3,
    title: 'Save More on Every Journey',
    date: 'Valid till 31 Aug 2026',
    code: 'Code: BUS150',
    bgColor: '#fffbeb', // light orange/yellow
    textColor: '#c2410c', // orange/brown text
    badgeColor: '#7c2d12', // brown badge
    img: image177
  }
];

// Mock Hotels
const HOTELS = [
  {
    id: 1,
    name: 'Ocean Bay Resort',
    subtext: 'Luxury Beachfront',
    price: 4500,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Heritage Palace Grand',
    subtext: 'Royal Experience',
    price: 6500,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Forest Valley Retreat',
    subtext: 'Nature & Wellness',
    price: 3800,
    img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=400',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Alpine Heights Resort',
    subtext: 'Mountain Views',
    price: 5200,
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400',
    rating: 4.6
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [leavingFrom, setLeavingFrom] = useState('Kolkata');
  const [goingTo, setGoingTo] = useState('Siliguri');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePill, setActivePill] = useState('Bus');

  const swapLocations = () => {
    const temp = leavingFrom;
    setLeavingFrom(goingTo);
    setGoingTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activePill === 'Cabs') {
      navigate(`/cabs?from=${encodeURIComponent(leavingFrom)}&to=${encodeURIComponent(goingTo)}`);
    } else if (activePill === 'Hotels') {
      navigate('/hotels');
    } else if (activePill === 'Outdoor') {
      navigate('/experiences');
    } else {
      navigate(`/buses?from=${encodeURIComponent(leavingFrom)}&to=${encodeURIComponent(goingTo)}`);
    }
  };

  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const handleAiPlannerClick = () => {
    navigate('/ai-planner');
  };

  return (
    <div className="home-container">
      {/* 1. Header - Unified navbar */}
      <Navbar theme="blue" />

      {/* 2. Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url("${heroBg}")` }}>
        <div className="hero-content">
          <h1 className="hero-main-title">
            Plan your journey,<br />we'll take care<br />of the rest.
          </h1>
        </div>
      </section>

      {/* 3. Floating Search Panel - Simplified with From & To only */}
      <div className="floating-search-card">
        <form className="search-form" onSubmit={handleSearch}>
          {/* Leaving From */}
          <div className="search-input-field-group">
            <MapPin size={20} style={{ color: '#0052ff' }} />
            <input 
              type="text" 
              placeholder="Leaving from" 
              value={leavingFrom}
              onChange={(e) => setLeavingFrom(e.target.value)}
              required
            />
            <button type="button" className="swap-locations-btn" onClick={swapLocations}>
              <ArrowRightLeft size={16} style={{ color: '#64748b' }} />
            </button>
          </div>

          {/* Going To */}
          <div className="search-input-field-group">
            <MapPin size={20} style={{ color: '#ef4444' }} />
            <input 
              type="text" 
              placeholder="Going to" 
              value={goingTo}
              onChange={(e) => setGoingTo(e.target.value)}
              required
            />
          </div>

          {/* Search Button */}
          <button type="submit" className="btn-hero-search">
            <Search size={18} />
            Search
          </button>

          {/* Settings / AI Assist */}
          <button type="button" className="btn-ai-options" onClick={handleAiPlannerClick}>
            <MapPin size={20} />
          </button>
        </form>

        {/* Quick selection pills */}
        <div className="service-quick-pills">
          {['Bus', 'Cabs', 'Hotels', 'Outdoor'].map((item) => (
            <button 
              key={item} 
              className={`pill-item ${activePill === item ? 'active' : ''}`}
              onClick={() => setActivePill(item)}
            >
              {item === 'Bus' && <img src={busIcon} style={{ width: '16px', height: '16px' }} alt="" />}
              {item === 'Cabs' && <img src={cabIcon} style={{ width: '16px', height: '16px' }} alt="" />}
              {item === 'Hotels' && <img src={hotelIcon} style={{ width: '16px', height: '16px' }} alt="" />}
              {item === 'Outdoor' && <img src={adventureIcon} style={{ width: '16px', height: '16px' }} alt="" />}
              <span style={{ marginLeft: '4px' }}>{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Explore Options */}
      <div className="section-wrapper">
        <div className="section-header-row">
          <h2 className="section-main-title">Explore Travel Options with Niklo</h2>
        </div>

        <div className="travel-options-grid">
          <div className="option-card">
            <div className="option-icon-box">
              <img src={busIcon} className="option-icon-img option-bus-icon" alt="Bus Booking" />
            </div>
            <h3 className="option-title">Bus Booking</h3>
            <p className="option-desc">Intercity & local buses</p>
            <a href="#bus" className="option-link" onClick={(e) => e.preventDefault()}>
              Find routes &rarr;
            </a>
          </div>

          <div className="option-card">
            <div className="option-icon-box">
              <img src={cabIcon} className="option-icon-img option-car-icon" alt="Car Rides" />
            </div>
            <h3 className="option-title">Car Rides</h3>
            <p className="option-desc">Cabs & outstation trips</p>
            <a href="#cabs" className="option-link" onClick={(e) => e.preventDefault()}>
              Find routes &rarr;
            </a>
          </div>

          <div className="option-card">
            <div className="option-icon-box">
              <img src={hotelIcon} className="option-icon-img" alt="Hotels" />
            </div>
            <h3 className="option-title">Hotels</h3>
            <p className="option-desc">Find comfortable stays</p>
            <a href="/hotels" className="option-link" onClick={(e) => { e.preventDefault(); navigate('/hotels'); }}>
              Find routes &rarr;
            </a>
          </div>

          <div className="option-card">
            <div className="option-icon-box">
              <img src={adventureIcon} className="option-icon-img" alt="Advenure" />
            </div>
            <h3 className="option-title">Advenure</h3>
            <p className="option-desc">Water sports, safari & more</p>
            <a href="/experiences" className="option-link" onClick={(e) => { e.preventDefault(); navigate('/experiences'); }}>
              Find routes &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* 5. AI Banner */}
      <div className="section-wrapper">
        <div className="ai-planner-banner">
          <div className="ai-banner-left">
            <span className="badge-new-tag">New</span>
            <h2 className="ai-banner-title">Plan Your Perfect Trip with AI</h2>
            <p className="ai-banner-desc">
              Niklo AI yields personalized travel plans based on your destination, budget, and preferences - saving you time and helping you travel smarter.
            </p>
            <button className="btn-plan-journey" onClick={handleAiPlannerClick}>
              Plan My Journey
              <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="ai-banner-right">
            <img src={planYourTripAsset} alt="Plan your trip banner" className="ai-banner-right-img" />
          </div>
        </div>
      </div>

      {/* 6. Discover Escape */}
      <div className="section-wrapper">
        <div className="section-header-row">
          <h2 className="section-main-title">Discover Your Perfect Escape</h2>
          <a href="#" className="section-view-all" onClick={(e) => { e.preventDefault(); navigate('/packages'); }}>
            View all
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="travel-cards-grid">
          {DESTINATIONS.map((item) => (
            <div key={item.id} className="escape-card">
              <div className="card-img-box">
                <img src={item.img} alt={item.name} className="card-img" />
              </div>
              <div className="card-body">
                <div className="card-details-layout">
                  <div className="card-details-left">
                    <div className="card-title-group">
                      <h3 className="card-name">{item.name}</h3>
                      <p className="card-subtext">{item.subtext}</p>
                    </div>
                    <div className="card-price-block">
                      <span className="card-price-amount">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="card-price-per">/ person</span>
                    </div>
                  </div>
                  <div className="card-details-right">
                    <button className="btn-card-like">
                      <Heart size={16} />
                    </button>
                    <button className="btn-card-action" onClick={() => navigate('/packages/meghalaya-explorer')}>Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Offers Section */}
      <div className="section-wrapper">
        <div className="section-header-row">
          <h2 className="section-main-title">Best Offers For You</h2>
          <a href="#view-all" className="section-view-all" onClick={(e) => e.preventDefault()}>
            View all
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="offers-carousel-row">
          {OFFERS.map((item) => (
            <div 
              key={item.id} 
              className="offer-card" 
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="offer-left-section">
                <h3 className="offer-title" style={{ color: item.textColor }}>{item.title}</h3>

                <div className="offer-details">
                  {item.desc && <p className="offer-card-desc">{item.desc}</p>}
                  <p className="offer-card-date">{item.date}</p>
                </div>

                <div className="offer-code-dashed" style={{ color: item.textColor }}>
                  {item.code}
                </div>
              </div>
              
              <div className="offer-right-section">
                <span className="offer-badge-pill" style={{ color: item.textColor }}>
                  <span className="badge-percent-icon" style={{ backgroundColor: item.badgeColor }}>%</span>
                  Flat ₹150 OFF
                </span>
                <div className="offer-illust-container">
                  <img src={item.img} className="offer-illust-img" alt="Offer illustration" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Top Hotels */}
      <div className="section-wrapper">
        <div className="section-header-row">
          <h2 className="section-main-title">Top Hotels for Your Stay</h2>
          <a href="#view-all" className="section-view-all" onClick={(e) => e.preventDefault()}>
            View all
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="travel-cards-grid">
          {HOTELS.map((item) => (
            <div key={item.id} className="escape-card">
              <div className="card-img-box">
                <img src={item.img} alt={item.name} className="card-img" />
              </div>
              <div className="card-body">
                <div className="card-details-layout">
                  <div className="card-details-left">
                    <div className="card-title-group">
                      <h3 className="card-name">{item.name}</h3>
                      <p className="card-subtext">{item.subtext}</p>
                    </div>
                    <div className="card-price-block">
                      <span className="card-price-amount">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="card-price-per">/ night</span>
                    </div>
                  </div>
                  <div className="card-details-right">
                    <button className="btn-card-like">
                      <Heart size={16} />
                    </button>
                    <button className="btn-card-action" onClick={() => navigate('/packages/meghalaya-explorer')}>Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. App Download Banner */}
      <div className="section-wrapper">
        <div 
          className="app-download-banner" 
          style={{ backgroundImage: `url("${appDownloadCtaImage}")` }}
        >
          <div className="app-banner-left">
            <h2 className="app-banner-title">Your Next Adventure Starts With Niklo</h2>
            <p>Download the Niklo app to get exclusive updates, track bookings and plan itineraries on the go.</p>
            <div className="app-store-badges">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" className="badge-store-img" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="badge-store-img" />
            </div>
          </div>
          
          <div className="app-banner-right">
            <div className="app-qr-container">
              <div className="app-qr-img"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 10. FAQs Accordion */}
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {[
            {
              q: 'How do I book a bus ticket on Niklo?',
              a: 'Booking a bus ticket on Niklo is fast and easy. Simply enter your departure city, destination, and travel date in the search panel. Choose from the list of standard and luxury buses, select your preferred seat on the interactive map, enter passenger details, and complete your secure checkout using our OTP verification.'
            },
            {
              q: 'Can I cancel or reschedule my ticket?',
              a: 'Yes! You can manage and cancel your ticket directly through the "My Bookings" page. Cancellation charges depend on the bus operator policy and how close the cancellation is to the departure time. Refunds are processed within 3-5 business days.'
            },
            {
              q: 'How does the AI Travel Planner work?',
              a: 'Our AI Planner gathers your travel destination, duration, budget, and traveler preferences. It automatically generates a customized itinerary, maps out stopover locations, lists standard or AC bus routes, suggests top hotels, and lets you book the entire package seamlessly in one click.'
            }
          ].map((item, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                <span>{item.q}</span>
                {activeFaq === idx ? <Minus size={18} style={{ color: '#0052ff' }} /> : <Plus size={18} />}
              </button>
              {activeFaq === idx && (
                <div className="faq-answer fade-in">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 11. Footer */}
      <Footer />

      {/* Floating Action Button (FAB) for AI Planner */}
      <img
        src={floatingAiIcon}
        className="floating-ai-planner"
        alt="AI Planner Chat"
        onClick={handleAiPlannerClick}
      />
    </div>
  );
};

export default Home;
