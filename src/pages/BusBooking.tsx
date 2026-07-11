import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, Calendar, Users, ChevronDown, ChevronUp, 
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeatSelectionModal from '../components/SeatSelectionModal';
import './BusBooking.css';

// Mock Buses Data
const ALL_BUSES = [
  {
    id: 1,
    name: 'SRTC Volvo A/C Semi Sleeper',
    type: 'Volvo A/C Semi Sleeper (2+2)',
    category: 'AC',
    isSleeper: true,
    rating: 4.5,
    ratingsCount: 428,
    depTime: '08:00 PM',
    arrTime: '06:30 AM',
    depLoc: 'Kolkata',
    arrLoc: 'Siliguri',
    duration: '10h 30m',
    price: 799,
    discount: 'Exclusive ₹120 off',
    amenities: ['AC', 'Charging Point', 'Sleeper'],
    operator: 'SRTC'
  },
  {
    id: 2,
    name: 'Royal Travels Premium',
    type: 'Scania AC Multi-Axle Sleeper (2+1)',
    category: 'AC',
    isSleeper: true,
    rating: 4.8,
    ratingsCount: 428,
    depTime: '09:15 PM',
    arrTime: '07:45 AM',
    depLoc: 'Kolkata',
    arrLoc: 'Siliguri',
    duration: '10h 30m',
    price: 1250,
    discount: 'Free Snacks Included',
    amenities: ['WiFi', 'Water Bottle', 'AC'],
    operator: 'Private Operators'
  },
  {
    id: 3,
    name: 'Greenline Express',
    type: 'Non-AC Seater / Sleeper',
    category: 'Non-AC',
    isSleeper: true,
    rating: 3.9,
    ratingsCount: 428,
    depTime: '10:30 PM',
    arrTime: '09:00 AM',
    depLoc: 'Kolkata',
    arrLoc: 'Siliguri',
    duration: '10h 30m',
    price: 550,
    discount: '',
    amenities: ['Reading Light', 'Charging Point'],
    operator: 'Private Operators'
  },
  {
    id: 4,
    name: 'RedBus Choice Luxury',
    type: 'Scania Multi-Axle A/C Sleeper (2+2)',
    category: 'AC',
    isSleeper: true,
    rating: 4.6,
    ratingsCount: 312,
    depTime: '06:30 PM',
    arrTime: '05:00 AM',
    depLoc: 'Kolkata',
    arrLoc: 'Siliguri',
    duration: '10h 30m',
    price: 950,
    discount: 'Exclusive ₹80 off',
    amenities: ['AC', 'Charging Point', 'WiFi', 'Blankets'],
    operator: 'RedBus Choice'
  },
  {
    id: 5,
    name: 'SRTC Express Seater',
    type: 'Non-AC Seater (2+2)',
    category: 'Non-AC',
    isSleeper: false,
    rating: 4.1,
    ratingsCount: 154,
    depTime: '07:30 AM',
    arrTime: '06:00 PM',
    depLoc: 'Kolkata',
    arrLoc: 'Siliguri',
    duration: '10h 30m',
    price: 499,
    discount: '',
    amenities: ['Reading Light'],
    operator: 'SRTC'
  }
];

const BusBooking: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Search parameters state
  const [from, setFrom] = useState(searchParams.get('from') || 'Kolkata');
  const [to, setTo] = useState(searchParams.get('to') || 'Siliguri');

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Filters state
  const [depTimeFilters, setDepTimeFilters] = useState<string[]>(['5 PM - 11 PM']);
  const [busTypeFilters, setBusTypeFilters] = useState<string[]>(['AC', 'Sleeper']);
  const [amenitiesFilters, setAmenitiesFilters] = useState<string[]>(['Charging Point']);
  const [operatorFilters, setOperatorFilters] = useState<string[]>(['SRTC']);

  // Sorting & Selected Date state
  const [sortBy, setSortBy] = useState('Popularity');
  const [selectedDay, setSelectedDay] = useState('Wed 22 May');

  // Search selector popups state
  const [date, setDate] = useState(searchParams.get('date') || '22 May 2024');
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [passengers, setPassengers] = useState(searchParams.get('passengers') || '2 Adults');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Filtered Buses list
  const [filteredBuses, setFilteredBuses] = useState(ALL_BUSES);
  const [selectedBusForSeats, setSelectedBusForSeats] = useState<any>(null);

  // Apply filters logic
  useEffect(() => {
    let result = ALL_BUSES;

    // Filter by departure time slot
    if (depTimeFilters.length > 0) {
      result = result.filter(bus => {
        const hour = parseInt(bus.depTime.split(':')[0]);
        const isPM = bus.depTime.includes('PM');
        
        return depTimeFilters.some(slot => {
          if (slot === 'Before 10 AM') {
            return (!isPM && hour < 10) || (isPM && hour === 12);
          }
          if (slot === '10 AM - 5 PM') {
            return (!isPM && hour >= 10 && hour < 12) || (isPM && (hour === 12 || hour < 5));
          }
          if (slot === '5 PM - 11 PM') {
            return isPM && hour >= 5 && hour < 11;
          }
          if (slot === 'After 11 PM') {
            return (isPM && hour >= 11) || (!isPM && hour < 5);
          }
          return true;
        });
      });
    }

    // Filter by bus category
    if (busTypeFilters.length > 0) {
      result = result.filter(bus => {
        return busTypeFilters.some(filter => {
          if (filter === 'AC') return bus.category === 'AC';
          if (filter === 'Non-AC') return bus.category === 'Non-AC';
          if (filter === 'Sleeper') return bus.isSleeper;
          if (filter === 'Seater') return !bus.isSleeper;
          return true;
        });
      });
    }

    // Filter by amenities
    if (amenitiesFilters.length > 0) {
      result = result.filter(bus => {
        return amenitiesFilters.every(amenity => bus.amenities.includes(amenity));
      });
    }

    // Filter by operator
    if (operatorFilters.length > 0) {
      result = result.filter(bus => {
        return operatorFilters.includes(bus.operator);
      });
    }

    // Sort result
    if (sortBy === 'Price: Low to High') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Ratings') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    setFilteredBuses(result);
  }, [depTimeFilters, busTypeFilters, amenitiesFilters, operatorFilters, sortBy]);

  const handleCheckboxChange = (filterType: string, val: string) => {
    const toggle = (list: string[]) => 
      list.includes(val) ? list.filter(x => x !== val) : [...list, val];

    if (filterType === 'depTime') setDepTimeFilters(toggle(depTimeFilters));
    if (filterType === 'busType') setBusTypeFilters(toggle(busTypeFilters));
    if (filterType === 'amenity') setAmenitiesFilters(toggle(amenitiesFilters));
    if (filterType === 'operator') setOperatorFilters(toggle(operatorFilters));
  };

  const clearAllFilters = () => {
    setDepTimeFilters([]);
    setBusTypeFilters([]);
    setAmenitiesFilters([]);
    setOperatorFilters([]);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching buses from ${from} to ${to} on ${date}...`);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bus-booking-container">
      <Navbar />

      {/* 2. Blue Search Panel */}
      <section className="search-criteria-section">
        <div className="search-criteria-wrapper">
          <h1 className="search-title">Where to next?</h1>
          <p className="search-subtitle">Find the best bus deals for your journey</p>
          
          <form className="criteria-form" onSubmit={handleSearch}>
            <div className="criteria-input-group">
              <span className="input-label-tag">FROM</span>
              <div className="criteria-input-field">
                <MapPin size={18} style={{ color: '#0052ff' }} />
                <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
              </div>
            </div>

            <div className="criteria-input-group">
              <span className="input-label-tag">TO</span>
              <div className="criteria-input-field">
                <MapPin size={18} style={{ color: '#ef4444' }} />
                <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
              </div>
            </div>

            {/* Interactive Travel Date */}
            <div className="criteria-input-group clickable" onClick={() => { setShowCalendar(!showCalendar); setShowPassengerDropdown(false); }}>
              <span className="input-label-tag">TRAVEL DATE</span>
              <div className="criteria-input-field">
                <Calendar size={18} style={{ color: '#64748b' }} />
                <span className="criteria-value-text">{date}</span>
              </div>

              {showCalendar && (
                <div className="custom-calendar-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="calendar-header">
                    <h4>May 2024</h4>
                  </div>
                  <div className="calendar-days-grid">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                      <span key={d} className="calendar-day-header">{d}</span>
                    ))}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span key={`empty-${i}`} className="calendar-day-empty"></span>
                    ))}
                    {daysInMonth.map(day => (
                      <button 
                        key={day} 
                        type="button"
                        className={`calendar-day-btn ${day === parseInt(date.split(' ')[0]) ? 'selected' : ''}`}
                        onClick={() => {
                          setDate(`${day} May 2024`);
                          setShowCalendar(false);
                        }}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Passengers Selection */}
            <div className="criteria-input-group clickable" onClick={() => { setShowPassengerDropdown(!showPassengerDropdown); setShowCalendar(false); }}>
              <span className="input-label-tag">PASSENGERS</span>
              <div className="criteria-input-field">
                <Users size={18} style={{ color: '#64748b' }} />
                <span className="criteria-value-text">{passengers}</span>
              </div>

              {showPassengerDropdown && (
                <div className="passenger-selector-popover" onClick={(e) => e.stopPropagation()}>
                  <div className="passenger-row">
                    <div className="passenger-label-col">
                      <span className="passenger-type">Adults</span>
                      <span className="passenger-subtext">Age 12+</span>
                    </div>
                    <div className="counter-controls">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                      <span>{adults}</span>
                      <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                  </div>

                  <div className="passenger-row">
                    <div className="passenger-label-col">
                      <span className="passenger-type">Children</span>
                      <span className="passenger-subtext">Age 2-12</span>
                    </div>
                    <div className="counter-controls">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                      <span>{children}</span>
                      <button type="button" onClick={() => setChildren(children + 1)}>+</button>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="btn-passenger-done" 
                    onClick={() => {
                      setPassengers(`${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}`);
                      setShowPassengerDropdown(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            <button type="submit" className="btn-criteria-search">
              Search Buses
            </button>
          </form>
        </div>
      </section>

      {/* 3. Main Dashboard Body */}
      <div className="booking-dashboard-body">
        
        {/* Left Column: Filters */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="btn-clear-all" onClick={clearAllFilters}>Clear All</button>
          </div>

          {/* Departure Time */}
          <div className="filter-group">
            <h4>DEPARTURE TIME</h4>
            {[
              'Before 10 AM', 
              '10 AM - 5 PM', 
              '5 PM - 11 PM', 
              'After 11 PM'
            ].map(slot => (
              <label key={slot} className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={depTimeFilters.includes(slot)}
                  onChange={() => handleCheckboxChange('depTime', slot)}
                />
                <span className="custom-checkbox"></span>
                <span className="checkbox-text">{slot}</span>
              </label>
            ))}
          </div>

          {/* Bus Type */}
          <div className="filter-group">
            <h4>BUS TYPE</h4>
            {['AC', 'Non-AC', 'Sleeper', 'Seater'].map(type => (
              <label key={type} className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={busTypeFilters.includes(type)}
                  onChange={() => handleCheckboxChange('busType', type)}
                />
                <span className="custom-checkbox"></span>
                <span className="checkbox-text">{type}</span>
              </label>
            ))}
          </div>

          {/* Amenities */}
          <div className="filter-group">
            <h4>AMENITIES</h4>
            {['WiFi', 'Water Bottle', 'Blankets', 'Charging Point'].map(amenity => (
              <label key={amenity} className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={amenitiesFilters.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenity', amenity)}
                />
                <span className="custom-checkbox"></span>
                <span className="checkbox-text">{amenity}</span>
              </label>
            ))}
          </div>

          {/* Operators */}
          <div className="filter-group">
            <h4>OPERATORS</h4>
            {['SRTC', 'Private Operators', 'RedBus Choice'].map(op => (
              <label key={op} className="filter-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={operatorFilters.includes(op)}
                  onChange={() => handleCheckboxChange('operator', op)}
                />
                <span className="custom-checkbox"></span>
                <span className="checkbox-text">{op}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Right Column: Search Results */}
        <main className="results-main-area">
          <div className="results-meta-header">
            <span className="meta-text">
              <strong>{filteredBuses.length} Buses</strong> found from {from} to {to}
            </span>
            <div className="sort-by-dropdown">
              <span className="sort-label">Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Ratings</option>
              </select>
            </div>
          </div>

          {/* Horizontal Day Selector Slider */}
          <div className="days-horizontal-strip">
            {[
              'Mon 20 May',
              'Tue 21 May',
              'Wed 22 May',
              'Thu 23 May',
              'Fri 24 May',
              'Sat 25 May',
              'Sun 26 May'
            ].map(day => (
              <button 
                key={day} 
                className={`day-strip-pill ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                <span className="day-name">{day.split(' ')[0]}</span>
                <span className="day-date">{day.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>

          {/* Promo Offer Coupon card */}
          <div className="promo-apply-offer-banner">
            <div className="promo-banner-left">
              <span className="promo-badge-circle">%</span>
              <div className="promo-banner-text">
                <h5 className="promo-banner-heading">Save up to ₹120 on this route</h5>
                <p className="promo-banner-desc">Use code FIRSTBUS at checkout for exclusive discount.</p>
              </div>
            </div>
            <button className="promo-btn-apply" onClick={() => alert('Promo FIRSTBUS applied successfully!')}>
              Apply Offer
            </button>
          </div>

          {/* Buses List */}
          <div className="buses-results-list">
            {filteredBuses.length > 0 ? (
              filteredBuses.map(bus => (
                <div key={bus.id} className="bus-result-card">
                  
                  {/* Top section info */}
                  <div className="bus-card-top">
                    {/* Left: Titles & Rating */}
                    <div className="bus-title-block">
                      <h3 className="bus-card-title">{bus.name}</h3>
                      <p className="bus-card-subtitle">{bus.type}</p>
                      <div className="bus-rating-pill-container">
                        <span className={`bus-rating-badge ${bus.rating >= 4.5 ? 'green' : 'yellow'}`}>
                          ★ {bus.rating}
                        </span>
                        <span className="bus-rating-count">{bus.ratingsCount} Ratings</span>
                      </div>
                    </div>

                    {/* Center: Departure/Duration/Arrival times */}
                    <div className="bus-timing-block">
                      <div className="time-info text-right">
                        <h4 className="time-lbl">{bus.depTime}</h4>
                        <span className="loc-lbl">{bus.depLoc}</span>
                      </div>
                      
                      <div className="timing-duration-graphic">
                        <span className="duration-text">{bus.duration}</span>
                        <div className="duration-line">
                          <span className="line-dot left"></span>
                          <span className="line-bar"></span>
                          <span className="line-dot right"></span>
                        </div>
                      </div>

                      <div className="time-info text-left">
                        <h4 className="time-lbl">{bus.arrTime}</h4>
                        <span className="loc-lbl">{bus.arrLoc}</span>
                      </div>
                    </div>

                    {/* Right: Pricing & Select Seats */}
                    <div className="bus-action-block">
                      <div className="pricing-info">
                        <span className="starting-from-lbl">Starting from</span>
                        <h3 className="pricing-val">₹{bus.price}</h3>
                        {bus.discount && <span className="exclusive-discount-lbl">{bus.discount}</span>}
                      </div>
                      <button className="btn-select-seats" onClick={() => setSelectedBusForSeats(bus)}>
                        Select Seat
                      </button>
                    </div>
                  </div>

                  {/* Bottom section amenities */}
                  <div className="bus-card-bottom">
                    <div className="bus-card-amenities-row">
                      {bus.amenities.map(amenity => (
                        <span key={amenity} className="amenity-badge-item">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <button className="btn-view-cancellation" onClick={() => alert('Cancellation Policy: Get 100% refund if cancelled 24 hours prior.')}>
                      View Cancellation Policy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-results-fallback">
                <Info size={32} style={{ color: '#94a3b8', marginBottom: '12px' }} />
                <h3>No Buses Found</h3>
                <p>Try clearing some filters to find trips matching your request.</p>
                <button className="btn-reset-filters-action" onClick={clearAllFilters}>Reset Filters</button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredBuses.length > 0 && (
            <button className="btn-load-more-results" onClick={() => alert('All search results loaded.')}>
              Load More Results
            </button>
          )}
        </main>
      </div>

      {/* 4. Collapsible FAQs Accordion */}
      <section className="faq-outer-section">
        <h2 className="faq-main-title">Frequently Asked Questions</h2>
        <div className="faq-accordion-list">
          {[
            {
              q: 'How does Niklo AI Journey Planner work?',
              a: 'Niklo AI Planner gathers your travel destination, duration, budget, and traveler preferences. It automatically generates a customized itinerary, maps out stopover locations, lists standard or AC bus routes, suggests top hotels, and lets you book the entire package seamlessly in one click.'
            },
            {
              q: 'Can I book buses and cabs from the app?',
              a: 'Yes, Niklo provides integrated booking systems. You can search, compare, and book intercity buses, local car rentals, and luxury hotel rooms directly from our mobile application or web portal with zero hidden costs.'
            },
            {
              q: 'Are there any exclusive offers on the app?',
              a: 'Definitely! App users get access to exclusive coupon codes (like FIRSTBUS or NIKLOAPP) for up to 20% discounts on the first 3 bookings, along with priority support and easy cancellation.'
            }
          ].map((item, idx) => (
            <div key={idx} className={`faq-accordion-item ${activeFaq === idx ? 'expanded' : ''}`}>
              <button className="faq-question-toggle-btn" onClick={() => toggleFaq(idx)}>
                <span>{item.q}</span>
                {activeFaq === idx ? <ChevronUp size={18} style={{ color: '#0052ff' }} /> : <ChevronDown size={18} />}
              </button>
              {activeFaq === idx && (
                <div className="faq-answer-block fade-in">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
      
      {/* Seat Selection Modal */}
      {selectedBusForSeats && (
        <SeatSelectionModal 
          bus={selectedBusForSeats} 
          onClose={() => setSelectedBusForSeats(null)} 
        />
      )}
    </div>
  );
};

export default BusBooking;
