import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, Heart, CheckCircle, 
  DollarSign, Car
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import hotelsHeroImg from '../assets/hotels_hero.jpg';
import hotelOfferBannerImg from '../assets/hotel_offer_banner.png';
import './HotelsHome.css';

// Categories
const CATEGORIES = [
  { id: 'hotels', label: 'Hotels', icon: '🏨' },
  { id: 'resorts', label: 'Resorts', icon: '🏖️' },
  { id: 'villas', label: 'Villas', icon: '🏡' },
  { id: 'apartments', label: 'Apartments', icon: '🏢' },
  { id: 'homestays', label: 'Homestays', icon: '🛖' }
];

// Popular Destinations
const POPULAR_DESTINATIONS = [
  { id: 'tokyo', name: 'Tokyo', count: '1,240 hotels', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400' },
  { id: 'paris', name: 'Paris', count: '890 hotels', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400' },
  { id: 'bali', name: 'Bali', count: '2,100 hotels', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400' },
  { id: 'london', name: 'London', count: '690 hotels', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&q=80&w=400' },
  { id: 'dubai', name: 'Dubai', count: '450 hotels', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400' }
];

// Trending Hotels
const TRENDING_HOTELS = [
  {
    id: 1,
    name: 'The Azure Retreat',
    rating: 4.9,
    location: 'Maldives',
    price: 450,
    img: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    name: 'Grand Vista Palace',
    rating: 4.8,
    location: 'Paris',
    price: 320,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    name: 'Forest Edge Villas',
    rating: 4.7,
    location: 'Ubud, Bali',
    price: 280,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    name: 'Skyline Residences',
    rating: 4.9,
    location: 'Tokyo',
    price: 550,
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400'
  }
];

const HotelsHome: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('Add dates');
  const [checkOut, setCheckOut] = useState('Add dates');
  const [showCheckInCal, setShowCheckInCal] = useState(false);
  const [showCheckOutCal, setShowCheckOutCal] = useState(false);

  const [guests, setGuests] = useState({ adults: 2, rooms: 1 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleGuestChange = (type: 'adults' | 'rooms', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(1, prev[type] - 1);
      return { ...prev, [type]: newVal };
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/hotels/search');
  };

  return (
    <div className="hotels-home-page" onClick={() => { setShowCheckInCal(false); setShowCheckOutCal(false); setShowGuestPicker(false); }}>
      <Navbar theme="blue" />

      {/* Hero Section */}
      <section className="hotels-hero" style={{ backgroundImage: `url('${hotelsHeroImg}')` }}>
        <div className="hotels-hero-overlay"></div>
        <div className="hotels-hero-content">
          <h1>Find your next getaway</h1>
          <p>Discover exclusive deals on the world's most beautiful stays</p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div className="hotels-search-container">
        <form className="hotels-search-bar" onSubmit={handleSearch}>
          <div className="hotels-search-field" onClick={e => e.stopPropagation()}>
            <label className="hotels-label">Destination</label>
            <div className="hotels-value-row">
              <MapPin size={18} className="hotels-icon" />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="hotels-input"
              />
            </div>
          </div>

          <div className="hotels-search-field relative" onClick={e => { e.stopPropagation(); setShowCheckInCal(!showCheckInCal); setShowCheckOutCal(false); setShowGuestPicker(false); }}>
            <label className="hotels-label">Check-in</label>
            <div className="hotels-value-row">
              <Calendar size={18} className="hotels-icon" />
              <span className="hotels-text-val">{checkIn}</span>
            </div>
            {showCheckInCal && (
              <div className="custom-calendar-popover" onClick={e => e.stopPropagation()}>
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
                      className={`cal-day ${checkIn === `${d} May 2024` ? 'selected' : ''}`} 
                      onClick={() => { setCheckIn(`${d} May 2024`); setShowCheckInCal(false); }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hotels-search-field relative" onClick={e => { e.stopPropagation(); setShowCheckOutCal(!showCheckOutCal); setShowCheckInCal(false); setShowGuestPicker(false); }}>
            <label className="hotels-label">Check-out</label>
            <div className="hotels-value-row">
              <Calendar size={18} className="hotels-icon" />
              <span className="hotels-text-val">{checkOut}</span>
            </div>
            {showCheckOutCal && (
              <div className="custom-calendar-popover" onClick={e => e.stopPropagation()}>
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
                      className={`cal-day ${checkOut === `${d} May 2024` ? 'selected' : ''}`} 
                      onClick={() => { setCheckOut(`${d} May 2024`); setShowCheckOutCal(false); }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hotels-search-field relative" onClick={e => { e.stopPropagation(); setShowGuestPicker(!showGuestPicker); setShowCheckInCal(false); setShowCheckOutCal(false); }}>
            <label className="hotels-label">Guests</label>
            <div className="hotels-value-row">
              <Users size={18} className="hotels-icon" />
              <span className="hotels-text-val">{guests.adults} Adults, {guests.rooms} Room</span>
            </div>
            {showGuestPicker && (
              <div className="custom-guest-popover" onClick={e => e.stopPropagation()}>
                <div className="guest-row">
                  <div className="guest-info"><span>Rooms</span></div>
                  <div className="guest-controls">
                    <button type="button" onClick={() => handleGuestChange('rooms', 'sub')}>-</button>
                    <span>{guests.rooms}</span>
                    <button type="button" onClick={() => handleGuestChange('rooms', 'add')}>+</button>
                  </div>
                </div>
                <div className="guest-row">
                  <div className="guest-info"><span>Adults</span><small>12+ yrs</small></div>
                  <div className="guest-controls">
                    <button type="button" onClick={() => handleGuestChange('adults', 'sub')}>-</button>
                    <span>{guests.adults}</span>
                    <button type="button" onClick={() => handleGuestChange('adults', 'add')}>+</button>
                  </div>
                </div>
                <button type="button" className="guest-done-btn" onClick={() => setShowGuestPicker(false)}>Done</button>
              </div>
            )}
          </div>

          <button type="submit" className="hotels-search-btn">Search Hotels</button>
        </form>
      </div>

      {/* Main Content */}
      <main className="hotels-main-content">
        <div className="hotels-container">
          
          {/* Popular Destinations */}
          <section className="hotels-section">
            <div className="hotels-section-header">
              <div>
                <h2>Popular Destinations</h2>
                <p className="hotels-section-sub">Top-rated cities recommended for you</p>
              </div>
              <a href="#explore" className="hotels-view-all" onClick={e => e.preventDefault()}>Explore All</a>
            </div>
            
            <div className="hotels-dest-grid">
              {POPULAR_DESTINATIONS.map(dest => (
                <div key={dest.id} className="hotels-dest-card">
                  <img src={dest.img} alt={dest.name} className="hotels-dest-img" />
                  <div className="hotels-dest-overlay"></div>
                  <div className="hotels-dest-info">
                    <h3>{dest.name}</h3>
                    <span>{dest.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories / Filter Pills */}
          <div className="hotels-categories-wrapper">
            <div className="hotels-categories-grid">
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="hotels-category-card">
                  <div className="hotels-cat-icon-wrap">
                    <span className="hotels-cat-emoji">{cat.icon}</span>
                  </div>
                  <span className="hotels-cat-label">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Book With Nikko */}
          <section className="hotels-why-section">
            <h2 className="why-title">Why Book With Nikko?</h2>
            <div className="why-grid">
              <div className="why-card">
                <div className="why-icon-wrap blue-bg">
                  <CheckCircle size={24} className="why-icon" />
                </div>
                <h3>Verified Top Stay</h3>
                <p>Rigorous 50-point quality check for every property.</p>
              </div>
              <div className="why-card">
                <div className="why-icon-wrap blue-bg">
                  <DollarSign size={24} className="why-icon" />
                </div>
                <h3>Best Price Guarantee</h3>
                <p>Found it cheaper? We'll match the price and beat it by 5%.</p>
              </div>
              <div className="why-card">
                <div className="why-icon-wrap blue-bg">
                  <Car size={24} className="why-icon" />
                </div>
                <h3>Private Cab Pickup</h3>
                <p>Complimentary premium airport transfer for all bookings.</p>
              </div>
            </div>
          </section>

          {/* Trending Hotels */}
          <section className="hotels-section">
            <div className="hotels-section-header">
              <div>
                <h2>Trending Hotels</h2>
                <p className="hotels-section-sub">Most booked properties this month</p>
              </div>
            </div>

            <div className="hotels-trending-grid">
              {TRENDING_HOTELS.map(hotel => (
                <div key={hotel.id} className="hotels-trend-card">
                  <div className="hotels-trend-img-wrap">
                    <img src={hotel.img} alt={hotel.name} className="hotels-trend-img" />
                    <button className="hotels-like-btn">
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="hotels-trend-body">
                    <h3>{hotel.name}</h3>
                    <div className="hotels-trend-rating">
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      <span>{hotel.rating}</span> • <span className="hotels-loc">{hotel.location}</span>
                    </div>
                    <div className="hotels-trend-footer">
                      <div className="hotels-trend-price">
                        <span className="starts-label">Starts from</span>
                        <span className="price-val">${hotel.price}<span>/night</span></span>
                      </div>
                      <button 
                        className="hotels-view-details-btn"
                        onClick={() => navigate(`/hotels/${hotel.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Promotional Banner */}
          <section className="hotels-promo-section" style={{ backgroundImage: `url('${hotelOfferBannerImg}')` }}>
            <div className="hotels-promo-overlay"></div>
            <div className="hotels-promo-content">
              <span className="promo-badge">LIMITED OFFER</span>
              <h2>Exciting Offers for Your<br />First Booking</h2>
              <p>Get up to 35% off on selected luxury resorts and villas worldwide.</p>
              <div className="hotels-promo-actions">
                <button className="hotels-promo-btn" onClick={() => alert('Discount claimed!')}>Claim Discount</button>
                <a href="#offers" className="hotels-promo-link" onClick={e => e.preventDefault()}>View All Offers</a>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HotelsHome;
