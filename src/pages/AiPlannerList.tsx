import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Compass, RefreshCw, Car, Bus, Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AiPlannerList.css';

// Mock Journey Options
const JOURNEY_OPTIONS = [
  {
    id: 1,
    type: 'bus',
    title: 'Intercity Bus',
    route: 'Kolkata Bus Terminus ➔ Gangtok',
    duration: '6h 32m',
    stops: 'Non-stop',
    price: 4204
  },
  {
    id: 2,
    type: 'car',
    title: 'Private SUV',
    route: 'Your Location ➔ Gangtok',
    duration: '6h 32m',
    stops: 'Non-stop',
    price: 8504
  },
  {
    id: 3,
    type: 'refresh',
    title: 'Cab + Shared Bus',
    route: 'Kolkata ➔ Siliguri ➔ Gangtok',
    duration: '8h 45m',
    stops: '1 Stop (Siliguri)',
    price: 6150
  },
  {
    id: 4,
    type: 'bus',
    title: 'Luxury Volvo Bus',
    route: 'Esplanade ➔ Gangtok Center',
    duration: '7h 15m',
    stops: 'Non-stop',
    price: 5800
  },
  {
    id: 5,
    type: 'car',
    title: 'Hatchback Economy',
    route: 'Your Location ➔ Gangtok',
    duration: '6h 50m',
    stops: 'Non-stop',
    price: 7200
  }
];

const AiPlannerList: React.FC = () => {
  const navigate = useNavigate();

  const [from, setFrom] = useState('Kolkata, West Bengal');
  const [to, setTo] = useState('Gangtok, Sikkim');
  const [date, setDate] = useState('22 May 2024');

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('');

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSelectOption = (title: string, price: number) => {
    // Redirect to booking success
    navigate('/booking-success', {
      state: {
        type: 'package',
        packageName: `AI Journey: ${title}`,
        startDate: date,
        endDate: 'Flexible',
        amount: price.toLocaleString('en-IN'),
        travellers: [
          { name: 'Rajesh Kumar', age: '32', gender: 'Male' }
        ]
      }
    });
  };

  return (
    <div className="al-page-wrapper">
      <Navbar theme="blue" />

      {/* Top Search bar block */}
      <div className="al-search-header-bar">
        <div className="al-search-bar-container">
          <div className="al-search-field">
            <label>FROM</label>
            <div className="al-input-row">
              <MapPin size={16} className="al-icon" />
              <input type="text" value={from} onChange={e => setFrom(e.target.value)} className="al-search-input" />
            </div>
          </div>
          
          <button className="al-swap-btn" onClick={handleSwap}>
            <RefreshCw size={14} />
          </button>

          <div className="al-search-field">
            <label>TO</label>
            <div className="al-input-row">
              <Compass size={16} className="al-icon" />
              <input type="text" value={to} onChange={e => setTo(e.target.value)} className="al-search-input" />
            </div>
          </div>

          <div className="al-search-field">
            <label>DEPARTURE</label>
            <div className="al-input-row">
              <Calendar size={16} className="al-icon" />
              <input type="text" value={date} onChange={e => setDate(e.target.value)} className="al-search-input" />
            </div>
          </div>

          <button className="al-search-submit-btn">Search</button>
        </div>
      </div>

      {/* Main content layout */}
      <main className="al-main">
        <div className="al-container">
          
          {/* Left Sidebar Filters */}
          <aside className="al-sidebar">
            <div className="al-sidebar-header">
              <h2>Filters</h2>
              <button className="al-clear-btn" onClick={() => { setSelectedTypes([]); setSelectedStops([]); setSelectedTime(''); }}>Clear All</button>
            </div>

            {/* Price slider */}
            <div className="al-filter-group">
              <h3>Price Range</h3>
              <div className="al-slider-wrap">
                <div className="al-slider-line"></div>
                <div className="al-slider-labels">
                  <span>₹4,000</span>
                  <span>₹20,000</span>
                </div>
              </div>
            </div>

            {/* Vehicle types checkboxes */}
            <div className="al-filter-group">
              <h3>Vehicle Type</h3>
              <div className="al-checkbox-list">
                {[
                  { id: 'suv', label: 'SUV / Prime Cab', count: 12 },
                  { id: 'bus', label: 'Luxury Bus', count: 8 },
                  { id: 'minibus', label: 'Minibus', count: 4 },
                  { id: 'hatchback', label: 'Hatchback', count: 15 }
                ].map(v => (
                  <label key={v.id} className="al-checkbox-row">
                    <input 
                      type="checkbox" 
                      checked={selectedTypes.includes(v.id)}
                      onChange={e => {
                        if (e.target.checked) setSelectedTypes([...selectedTypes, v.id]);
                        else setSelectedTypes(selectedTypes.filter(t => t !== v.id));
                      }}
                    />
                    <span>{v.label}</span>
                    <span className="al-chk-count">{v.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stops checkboxes */}
            <div className="al-filter-group">
              <h3>Stops</h3>
              <div className="al-checkbox-list">
                {[
                  { id: 'nonstop', label: 'Non-stop', count: 24 },
                  { id: '1stop', label: '1 Stop', count: 6 },
                  { id: '2stops', label: '2+ Stops', count: 2 }
                ].map(s => (
                  <label key={s.id} className="al-checkbox-row">
                    <input 
                      type="checkbox"
                      checked={selectedStops.includes(s.id)}
                      onChange={e => {
                        if (e.target.checked) setSelectedStops([...selectedStops, s.id]);
                        else setSelectedStops(selectedStops.filter(t => t !== s.id));
                      }}
                    />
                    <span>{s.label}</span>
                    <span className="al-chk-count">{s.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Departure time pills */}
            <div className="al-filter-group" style={{ borderBottom: 'none' }}>
              <h3>Departure Time</h3>
              <div className="al-pills-grid">
                {['Early Morning', 'Morning', 'Afternoon', 'Evening'].map(time => (
                  <button 
                    key={time} 
                    className={`al-time-pill ${selectedTime === time ? 'active' : ''}`}
                    onClick={() => setSelectedTime(selectedTime === time ? '' : time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main results list */}
          <div className="al-results-col">
            
            {/* Recommended row */}
            <section className="al-recommended-section">
              <h2 className="al-sec-title">Recommended for your journey</h2>
              
              <div className="al-rec-grid">
                
                {/* Cab Recommended */}
                <div className="al-rec-card green">
                  <div className="al-rec-header">
                    <span className="al-rec-badge green">BEST COMFORT</span>
                    <span className="al-rec-type">
                      <Car size={14} />
                      <span>Direct Cab</span>
                    </span>
                  </div>
                  <h3>Kolkata ➔ Gangtok</h3>
                  <div className="al-rec-price-row">
                    <div className="al-rec-lbl-col">
                      <span>Duration</span>
                      <strong>6h 32m</strong>
                    </div>
                    <div className="al-rec-lbl-col">
                      <span>Starting from</span>
                      <strong className="green-txt">₹8,504</strong>
                    </div>
                  </div>
                  <button className="al-rec-btn green" onClick={() => handleSelectOption('Direct Cab', 8504)}>Book Cab</button>
                </div>

                {/* Bus Recommended */}
                <div className="al-rec-card orange">
                  <div className="al-rec-header">
                    <span className="al-rec-badge orange">CHEAPEST</span>
                    <span className="al-rec-type">
                      <Bus size={14} />
                      <span>Direct Bus</span>
                    </span>
                  </div>
                  <h3>Kolkata ➔ Gangtok</h3>
                  <div className="al-rec-price-row">
                    <div className="al-rec-lbl-col">
                      <span>Duration</span>
                      <strong>6h 32m</strong>
                    </div>
                    <div className="al-rec-lbl-col">
                      <span>Starting from</span>
                      <strong className="orange-txt">₹4,204</strong>
                    </div>
                  </div>
                  <button className="al-rec-btn orange" onClick={() => handleSelectOption('Direct Bus', 4204)}>Book Bus</button>
                </div>

                {/* Mixed Recommended */}
                <div className="al-rec-card purple">
                  <div className="al-rec-header">
                    <span className="al-rec-badge purple">FASTEST</span>
                    <span className="al-rec-type">
                      <Zap size={14} />
                      <span>Cab + Bus</span>
                    </span>
                  </div>
                  <h3>Kolkata ➔ Bagdogra ➔ Gangtok</h3>
                  <div className="al-rec-price-row">
                    <div className="al-rec-lbl-col">
                      <span>Duration</span>
                      <strong>6h 32m</strong>
                    </div>
                    <div className="al-rec-lbl-col">
                      <span>Starting from</span>
                      <strong className="blue-txt">₹10,504</strong>
                    </div>
                  </div>
                  <button className="al-rec-btn purple" onClick={() => navigate('/ai-planner/breakdown')}>View Details</button>
                </div>

              </div>
            </section>

            {/* All Options table list */}
            <section className="al-options-section">
              <div className="al-options-header">
                <h2>All Journey Options (32)</h2>
                <div className="al-options-sort">
                  <span>Sort by:</span>
                  <select className="al-sort-select">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration</option>
                  </select>
                </div>
              </div>

              <div className="al-options-list">
                {JOURNEY_OPTIONS.map(opt => (
                  <div key={opt.id} className="al-option-card">
                    <div className="al-opt-left">
                      <div className="al-opt-icon-box">
                        {opt.type === 'bus' && <Bus size={18} />}
                        {opt.type === 'car' && <Car size={18} />}
                        {opt.type === 'refresh' && <RefreshCw size={18} />}
                      </div>
                      <div className="al-opt-info">
                        <h3>{opt.title}</h3>
                        <p>{opt.route}</p>
                      </div>
                    </div>

                    <div className="al-opt-middle">
                      <strong>{opt.duration}</strong>
                      <span>{opt.stops}</span>
                    </div>

                    <div className="al-opt-right">
                      <div className="al-opt-price-col">
                        <span className="al-price-lbl">Price</span>
                        <strong className="al-price-val">₹{opt.price.toLocaleString('en-IN')}</strong>
                      </div>
                      <button className="al-opt-select-btn" onClick={() => handleSelectOption(opt.title, opt.price)}>Select</button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="al-btn-load-more">Load More Results</button>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AiPlannerList;
