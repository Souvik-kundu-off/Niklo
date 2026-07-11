import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, Star, Shield, RefreshCw, 
  Tag, Headphones, Wifi, Coffee
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './HotelsList.css';

// Mock Hotels
const HOTELS_DATA = [
  {
    id: 1,
    name: 'The Oberoi Grand Kolkata',
    rating: 4.8,
    reviews: 1240,
    ratingText: 'Excellent',
    distance: '0.2 km from center',
    price: 12500,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'breakfast'],
    freeCancel: true
  },
  {
    id: 2,
    name: 'ITC Sonar, a Luxury Collection Hotel',
    rating: 4.8,
    reviews: 980,
    ratingText: 'Excellent',
    distance: '3.5 km from center',
    price: 9800,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'breakfast'],
    freeCancel: true
  },
  {
    id: 3,
    name: 'Hyatt Regency Kolkata',
    rating: 4.2,
    reviews: 2100,
    ratingText: 'Very Good',
    distance: '4.1 km from center',
    price: 7200,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'breakfast'],
    freeCancel: true
  },
  {
    id: 4,
    name: 'The Peerless Inn Kolkata',
    rating: 4.2,
    reviews: 1540,
    ratingText: 'Good',
    distance: '0.5 km from center',
    price: 4500,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi'],
    freeCancel: true
  },
  {
    id: 5,
    name: 'Taj Bengal Kolkata',
    rating: 4.8,
    reviews: 1620,
    ratingText: 'Excellent',
    distance: '2.1 km from center',
    price: 14000,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'breakfast'],
    freeCancel: true
  },
  {
    id: 6,
    name: 'Kenilworth Hotel',
    rating: 4.2,
    reviews: 750,
    ratingText: 'Good',
    distance: '1.2 km from center',
    price: 5800,
    taxes: 450,
    img: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&q=80&w=600',
    amenities: ['wifi', 'breakfast'],
    freeCancel: true
  }
];

const HotelsList: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Kolkata, West Bengal');
  const [dates, setDates] = useState('22 May – 23 May, 2024');
  const [guestsRooms, setGuestsRooms] = useState('2 Guests, 1 Room');
  
  const [showDatesCal, setShowDatesCal] = useState(false);
  const [showGuestsPicker, setShowGuestsPicker] = useState(false);
  const [guests, setGuests] = useState({ adults: 2, rooms: 1 });

  const [priceFilter, setPriceFilter] = useState('2000-5000');
  const [starFilter, setStarFilter] = useState('4');
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>(['wifi', 'breakfast']);
  const [typeFilter, setTypeFilter] = useState('hotels');

  const handleGuestChange = (type: 'adults' | 'rooms', op: 'add' | 'sub') => {
    setGuests(prev => {
      const newVal = op === 'add' ? prev[type] + 1 : Math.max(1, prev[type] - 1);
      return { ...prev, [type]: newVal };
    });
    setGuestsRooms(`${guests.adults} Guests, ${guests.rooms} Room`);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenitiesFilter(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="hotels-list-page" onClick={() => { setShowDatesCal(false); setShowGuestsPicker(false); }}>
      <Navbar theme="blue" />

      {/* Header Info */}
      <div className="hl-header-section">
        <div className="hl-header-container">
          <h1>Find the best hotels in Kolkata</h1>
          <p>Compare prices and book your safe stay today</p>
        </div>
      </div>

      {/* Compact Search Bar */}
      <div className="hl-search-wrapper">
        <div className="hl-search-bar">
          <div className="hl-search-field">
            <label>Location</label>
            <div className="hl-input-row">
              <MapPin size={16} className="hl-icon" />
              <input 
                type="text" 
                value={destination} 
                onChange={e => setDestination(e.target.value)} 
                className="hl-field-input"
              />
            </div>
          </div>

          <div className="hl-search-field relative" onClick={e => { e.stopPropagation(); setShowDatesCal(!showDatesCal); setShowGuestsPicker(false); }}>
            <label>Dates</label>
            <div className="hl-input-row">
              <Calendar size={16} className="hl-icon" />
              <span className="hl-field-val">{dates}</span>
            </div>
            {showDatesCal && (
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
                      className={`cal-day ${dates.includes(`${d} May`) ? 'selected' : ''}`} 
                      onClick={() => { setDates(`${d} May – ${d + 1} May, 2024`); setShowDatesCal(false); }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hl-search-field relative" onClick={e => { e.stopPropagation(); setShowGuestsPicker(!showGuestsPicker); setShowDatesCal(false); }}>
            <label>Guests & Rooms</label>
            <div className="hl-input-row">
              <Users size={16} className="hl-icon" />
              <span className="hl-field-val">{guestsRooms}</span>
            </div>
            {showGuestsPicker && (
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
                <button type="button" className="guest-done-btn" onClick={() => setShowGuestsPicker(false)}>Done</button>
              </div>
            )}
          </div>

          <button className="hl-search-btn" onClick={() => alert('Searching...')}>Search</button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="hl-pills-container">
        <div className="hl-pills-row">
          <button className="hl-pill-btn">Filters</button>
          <button className="hl-pill-btn active">Recommended</button>
          <button className="hl-pill-btn">Budget</button>
          <button className="hl-pill-btn">Luxury</button>
          <button className="hl-pill-btn">Top Rated</button>
          <button className="hl-pill-btn">Family Friendly</button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="hl-main-content">
        <div className="hl-layout-container">
          
          {/* Left Sidebar Filter panel */}
          <aside className="hl-sidebar">
            
            <div className="hl-filter-section">
              <h3>PRICE PER NIGHT</h3>
              <div className="hl-checkbox-list">
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={priceFilter === '0-2000'} onChange={() => setPriceFilter('0-2000')} />
                  <span>₹0 - ₹2,000</span>
                  <span className="hl-count">12</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={priceFilter === '2000-5000'} onChange={() => setPriceFilter('2000-5000')} />
                  <span>₹2,000 - ₹5,000</span>
                  <span className="hl-count">45</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={priceFilter === '5000-10000'} onChange={() => setPriceFilter('5000-10000')} />
                  <span>₹5,000 - ₹10,000</span>
                  <span className="hl-count">28</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={priceFilter === '10000+'} onChange={() => setPriceFilter('10000+')} />
                  <span>₹10,000+</span>
                  <span className="hl-count">14</span>
                </label>
              </div>
            </div>

            <div className="hl-filter-section">
              <h3>STAR RATING</h3>
              <div className="hl-checkbox-list">
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={starFilter === '5'} onChange={() => setStarFilter('5')} />
                  <span>5 Stars</span>
                  <span className="hl-count">8</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={starFilter === '4'} onChange={() => setStarFilter('4')} />
                  <span>4 Stars</span>
                  <span className="hl-count">22</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={starFilter === '3'} onChange={() => setStarFilter('3')} />
                  <span>3 Stars</span>
                  <span className="hl-count">34</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={starFilter === '2-below'} onChange={() => setStarFilter('2-below')} />
                  <span>2 Stars & Below</span>
                  <span className="hl-count">12</span>
                </label>
              </div>
            </div>

            <div className="hl-filter-section">
              <h3>AMENITIES</h3>
              <div className="hl-checkbox-list">
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('wifi')} onChange={() => toggleAmenity('wifi')} />
                  <span>Free Wi-Fi</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('breakfast')} onChange={() => toggleAmenity('breakfast')} />
                  <span>Free Breakfast</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('pool')} onChange={() => toggleAmenity('pool')} />
                  <span>Swimming Pool</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('fitness')} onChange={() => toggleAmenity('fitness')} />
                  <span>Fitness Center</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('spa')} onChange={() => toggleAmenity('spa')} />
                  <span>Spa & Wellness</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={amenitiesFilter.includes('shuttle')} onChange={() => toggleAmenity('shuttle')} />
                  <span>Airport Shuttle</span>
                </label>
              </div>
            </div>

            <div className="hl-filter-section">
              <h3>PROPERTY TYPE</h3>
              <div className="hl-checkbox-list">
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={typeFilter === 'hotels'} onChange={() => setTypeFilter('hotels')} />
                  <span>Hotels</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={typeFilter === 'apartments'} onChange={() => setTypeFilter('apartments')} />
                  <span>Apartments</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={typeFilter === 'guesthouses'} onChange={() => setTypeFilter('guesthouses')} />
                  <span>Guest Houses</span>
                </label>
                <label className="hl-checkbox-item">
                  <input type="checkbox" checked={typeFilter === 'resorts'} onChange={() => setTypeFilter('resorts')} />
                  <span>Resorts</span>
                </label>
              </div>
            </div>

          </aside>

          {/* Results Grid List */}
          <main className="hl-results-content">
            <div className="hl-results-meta">
              <span className="hl-results-count">Kolkata: 154 properties found</span>
              <div className="hl-sort-box">
                <span>Sort by:</span>
                <select className="hl-sort-select">
                  <option>Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>User Rating</option>
                </select>
              </div>
            </div>

            <div className="hl-results-grid">
              {HOTELS_DATA.map(hotel => (
                <div key={hotel.id} className="hl-hotel-card">
                  <div className="hl-card-img-box">
                    <img src={hotel.img} alt={hotel.name} className="hl-card-img" />
                    <span className="hl-dist-badge">{hotel.distance}</span>
                  </div>
                  <div className="hl-card-body">
                    <div className="hl-card-rating-block">
                      <div className="hl-stars">
                        {Array.from({length: 5}, (_, i) => (
                          <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                        ))}
                      </div>
                      <div className="hl-rating-badge-wrap">
                        <div className="hl-rating-text-col">
                          <span className="hl-rating-text">{hotel.ratingText}</span>
                          <small className="hl-reviews-count">{hotel.reviews} reviews</small>
                        </div>
                        <span className="hl-score">{hotel.rating}</span>
                      </div>
                    </div>

                    <h2 className="hl-hotel-name">{hotel.name}</h2>
                    
                    <div className="hl-card-amenities">
                      {hotel.amenities.includes('breakfast') && (
                        <span className="hl-amenity-tag"><Coffee size={14} /> Free Breakfast</span>
                      )}
                      {hotel.amenities.includes('wifi') && (
                        <span className="hl-amenity-tag"><Wifi size={14} /> Free Wi-Fi</span>
                      )}
                    </div>

                    {hotel.freeCancel && (
                      <div className="hl-cancel-block">
                        <span className="hl-cancel-tag">Free cancellation</span>
                        <small>Breakfast included</small>
                        <small>Price for 1 night</small>
                      </div>
                    )}

                    <div className="hl-card-footer">
                      <div className="hl-price-col">
                        <strong className="hl-price-val">₹{hotel.price.toLocaleString('en-IN')}</strong>
                        <span className="hl-taxes-label">+ ₹{hotel.taxes} taxes & fees</span>
                      </div>
                      <button className="hl-details-btn" onClick={() => navigate(`/hotels/${hotel.id}`)}>View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hl-show-more-wrap">
              <button className="hl-show-more-btn">Show More Results</button>
            </div>
          </main>

        </div>
      </div>

      {/* Feature Row Banner */}
      <section className="hl-feature-row">
        <div className="hl-feature-container">
          <div className="hl-feature-card">
            <Shield size={24} className="hl-feat-icon" />
            <div className="hl-feat-text">
              <h3>Book with Confidence</h3>
              <p>Your safety and security are our priority.</p>
            </div>
          </div>
          <div className="hl-feature-card">
            <RefreshCw size={24} className="hl-feat-icon" />
            <div className="hl-feat-text">
              <h3>Flexible Cancellations</h3>
              <p>Adjust your plans without the stress.</p>
            </div>
          </div>
          <div className="hl-feature-card">
            <Tag size={24} className="hl-feat-icon" />
            <div className="hl-feat-text">
              <h3>Price Guarantee</h3>
              <p>Best prices on 2M+ hotels worldwide.</p>
            </div>
          </div>
          <div className="hl-feature-card">
            <Headphones size={24} className="hl-feat-icon" />
            <div className="hl-feat-text">
              <h3>24/7 Support</h3>
              <p>We're here for you at every step.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HotelsList;
