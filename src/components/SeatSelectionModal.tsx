import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Wind, Plug, Grid, MapPin, Wifi, Droplet, Star, Tag } from 'lucide-react';
import './SeatSelectionModal.css';

import seatSvgUrl from '../assets/seat.svg';
import sleeperSvgUrl from '../assets/single-bed (1) 1.svg';
import steeringSvgUrl from '../assets/line-md_steering.svg';

interface SeatSelectionModalProps {
  bus: any;
  onClose: () => void;
}

const SeaterIcon = ({ state = 'available', size = 32, onClick }: any) => {
  return (
    <div 
      className={`seat-svg-icon ${state}`}
      style={{ 
        width: size, height: size, 
        maskImage: `url("${seatSvgUrl}")`,
        WebkitMaskImage: `url("${seatSvgUrl}")`
      }}
      onClick={!state.includes('booked') ? onClick : undefined}
    />
  );
};

const SleeperIcon = ({ state = 'available', size = 32, onClick }: any) => {
  return (
    <div 
      className={`sleeper-svg-icon ${state}`}
      style={{ 
        width: size, height: size * 2.2, 
        maskImage: `url("${sleeperSvgUrl}")`,
        WebkitMaskImage: `url("${sleeperSvgUrl}")`
      }}
      onClick={!state.includes('booked') ? onClick : undefined}
    />
  );
};

// Generate mock seat layout
const LOWER_DECK_ROWS = 7;
const UPPER_DECK_ROWS = 6;

const generateSeats = (type: 'seater' | 'sleeper', rows: number, prefix: string) => {
  const seats = [];
  for (let r = 1; r <= rows; r++) {
    // Randomize initial state with new ladies states
    const getState = () => {
      const rand = Math.random();
      if (rand > 0.85) return 'booked';
      if (rand > 0.75) return 'booked_ladies';
      if (rand > 0.65) return 'available_ladies';
      return 'available';
    };
    
    const s1 = getState();
    const s2 = getState();
    const s3 = getState();
    
    const o1 = s1 === 'available_ladies' || s1 === 'booked_ladies' ? 'available_ladies' : 'available';
    const o2 = s2 === 'available_ladies' || s2 === 'booked_ladies' ? 'available_ladies' : 'available';
    const o3 = s3 === 'available_ladies' || s3 === 'booked_ladies' ? 'available_ladies' : 'available';

    seats.push({ id: `${prefix}${r}A`, row: r, col: 'left', state: s1, originalState: o1, type });
    seats.push({ id: `${prefix}${r}B`, row: r, col: 'right-1', state: s2, originalState: o2, type });
    seats.push({ id: `${prefix}${r}C`, row: r, col: 'right-2', state: s3, originalState: o3, type });
  }
  return seats;
};

const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({ bus, onClose }) => {
  const navigate = useNavigate();
  const [lowerSeats, setLowerSeats] = useState(generateSeats('seater', LOWER_DECK_ROWS, 'L'));
  const [upperSeats, setUpperSeats] = useState(generateSeats('sleeper', UPPER_DECK_ROWS, 'U'));

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleSeatClick = (seatId: string, isUpper: boolean) => {
    const updateSeat = (seats: any[]) => seats.map(s => {
      if (s.id === seatId) {
        if (s.state === 'available' || s.state === 'available_ladies') return { ...s, state: 'selected' };
        if (s.state === 'selected') return { ...s, state: s.originalState }; // revert to correct available state
      }
      return s;
    });

    if (isUpper) {
      setUpperSeats(updateSeat(upperSeats));
    } else {
      setLowerSeats(updateSeat(lowerSeats));
    }
  };

  const selectedSeats = [...lowerSeats, ...upperSeats].filter(s => s.state === 'selected');
  const basePrice = selectedSeats.length * bus.price;
  const discount = selectedSeats.length > 0 ? 125 : 0; 
  const total = basePrice > 0 ? basePrice - discount : 0;

  const handleContinueBooking = () => {
    onClose();
    navigate('/passenger-details');
  };

  const renderDeck = (title: string, seats: any[], isUpper: boolean) => {
    const rows = isUpper ? UPPER_DECK_ROWS : LOWER_DECK_ROWS;
    const rowArray = Array.from({ length: rows }, (_, i) => i + 1);

    return (
      <div className="deck-container">
        <h4 className="deck-title">{title}</h4>
        <div className="deck-layout">
          {!isUpper && (
            <div className="steering-wheel">
              <img src={steeringSvgUrl} alt="Steering Wheel" width="32" height="32" />
            </div>
          )}
          <div className="seat-grid">
            {rowArray.map(r => {
              const rowSeats = seats.filter(s => s.row === r);
              const leftSeat = rowSeats.find(s => s.col === 'left');
              const rightSeat1 = rowSeats.find(s => s.col === 'right-1');
              const rightSeat2 = rowSeats.find(s => s.col === 'right-2');

              return (
                <div key={r} className="seat-row">
                  <div className="seat-col left">
                    {leftSeat && (
                      isUpper ? (
                        <SleeperIcon state={leftSeat.state} size={32} onClick={() => handleSeatClick(leftSeat.id, isUpper)} />
                      ) : (
                        <SeaterIcon state={leftSeat.state} size={32} onClick={() => handleSeatClick(leftSeat.id, isUpper)} />
                      )
                    )}
                  </div>
                  <div className="seat-aisle"></div>
                  <div className="seat-col right">
                    {rightSeat1 && (
                      isUpper ? (
                        <SleeperIcon state={rightSeat1.state} size={32} onClick={() => handleSeatClick(rightSeat1.id, isUpper)} />
                      ) : (
                        <SeaterIcon state={rightSeat1.state} size={32} onClick={() => handleSeatClick(rightSeat1.id, isUpper)} />
                      )
                    )}
                    {rightSeat2 && (
                      isUpper ? (
                        <SleeperIcon state={rightSeat2.state} size={32} onClick={() => handleSeatClick(rightSeat2.id, isUpper)} />
                      ) : (
                        <SeaterIcon state={rightSeat2.state} size={32} onClick={() => handleSeatClick(rightSeat2.id, isUpper)} />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="seat-modal-overlay">
      <div className="seat-modal-container">
        
        {/* Header */}
        <div className="seat-modal-header">
          <div className="modal-route-title">
            <span>{bus.depLoc}</span>
            <ArrowRight size={20} className="route-arrow" />
            <span>{bus.arrLoc}</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="seat-modal-body">
          
          {/* Left Column */}
          <div className="seat-modal-left">
            
            <div className="seat-selection-card">
              <div className="legend-header">
                <h3>Select Your Seats</h3>
                <div className="legend-items">
                  <div className="legend-item">
                    <SeaterIcon state="available" size={20} />
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <SeaterIcon state="selected" size={20} />
                    <span>Selected</span>
                  </div>
                  <div className="legend-item">
                    <SeaterIcon state="booked" size={20} />
                    <span>Booked</span>
                  </div>
                  <div className="legend-item">
                    <SeaterIcon state="available_ladies" size={20} />
                    <span>Ladies (Avail)</span>
                  </div>
                  <div className="legend-item">
                    <SeaterIcon state="booked_ladies" size={20} />
                    <span>Ladies (Booked)</span>
                  </div>
                </div>
              </div>

              <div className="decks-wrapper">
                {renderDeck('LOWER DECK', lowerSeats, false)}
                {renderDeck('UPPER DECK', upperSeats, true)}
              </div>
            </div>

            {/* Features Card */}
            <div className="features-card">
              <h3>Bus Features</h3>
              <div className="features-list">
                <span className="feature-pill"><Wind size={14} /> AC</span>
                <span className="feature-pill"><Plug size={14} /> Charging Point</span>
                <span className="feature-pill"><Grid size={14} /> Blanket</span>
                <span className="feature-pill"><MapPin size={14} /> Live Tracking</span>
                <span className="feature-pill"><Wifi size={14} /> WIFI</span>
                <span className="feature-pill"><Droplet size={14} /> Water Bottle</span>
              </div>
            </div>

            {/* Ratings Card */}
            <div className="ratings-card">
              <h3>Ratings & Reviews</h3>
              <div className="ratings-content">
                <div className="rating-summary">
                  <div className="rating-score">
                    <Star size={16} fill="#ffffff" />
                    <span>{bus.rating}</span>
                  </div>
                  <span className="rating-text">Very Good</span>
                  <span className="rating-count">Based on {bus.ratingsCount}+ reviews</span>
                </div>
                <div className="rating-bars">
                  {[
                    { stars: 5, pct: '72%', color: '#22c55e' },
                    { stars: 4, pct: '18%', color: '#22c55e' },
                    { stars: 3, pct: '7%', color: '#f59e0b' },
                    { stars: 2, pct: '3%', color: '#f59e0b' },
                    { stars: 1, pct: '2%', color: '#ef4444' }
                  ].map(bar => (
                    <div key={bar.stars} className="rating-bar-row">
                      <span className="bar-label">{bar.stars} ★</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: bar.pct, backgroundColor: bar.color }}></div>
                      </div>
                      <span className="bar-pct">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reviews-list">
                <div className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">Rahul D.</span>
                    <span className="review-date">Oct 12, 2023</span>
                  </div>
                  <p className="review-text">"Very comfortable journey and on-time drop. The staff was polite."</p>
                </div>
                <div className="review-item">
                  <div className="review-header">
                    <span className="reviewer-name">Sneha P.</span>
                    <span className="review-date">Sep 28, 2023</span>
                  </div>
                  <p className="review-text">"Clean bus and good AC cooling. Highly recommend for this route."</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="seat-modal-right">
            
            {/* Trip Details Card */}
            <div className="sidebar-card">
              <div className="card-header-flex">
                <h3>Trip Details</h3>
                <button className="btn-change">Change</button>
              </div>
              <div className="trip-timeline">
                <div className="timeline-point">
                  <div className="point-dot start"></div>
                  <div className="point-info">
                    <span className="point-meta">Boarding • {bus.depTime}</span>
                    <span className="point-name">Esplanade</span>
                  </div>
                </div>
                <div className="timeline-line"></div>
                <div className="timeline-point">
                  <div className="point-dot end"></div>
                  <div className="point-info">
                    <span className="point-meta">Destination • {bus.arrTime}</span>
                    <span className="point-name">Tenzing Norgay Bus Stand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="sidebar-card price-card">
              <h3>Price Breakdown</h3>
              <div className="price-row">
                <span className="price-lbl">Seats: <strong>{selectedSeats.map(s => s.id).join(', ') || '-'}</strong></span>
                <span className="price-val">₹{basePrice}</span>
              </div>
              {selectedSeats.length > 0 && discount > 0 && (
                <div className="discount-pill">
                  <span>Saved on this booking</span>
                  <span>- ₹{discount}</span>
                </div>
              )}
              <div className="total-row">
                <span>Total</span>
                <span className="total-val">₹{total}</span>
              </div>
              <button 
                className="btn-continue-booking" 
                disabled={selectedSeats.length === 0}
                onClick={handleContinueBooking}
              >
                Continue to Passenger Details
              </button>
            </div>

            {/* Offers Card */}
            <div className="sidebar-card offers-card">
              <h3>Available Offers</h3>
              <div className="offer-item">
                <Tag size={20} className="offer-icon" />
                <div className="offer-info">
                  <h4>FREE_CANCEL</h4>
                  <p>Up to 6 hrs before departure</p>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionModal;
