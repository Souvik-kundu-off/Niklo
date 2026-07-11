import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bus, Car, QrCode, Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import escapeWeekendImg from '../assets/escape_the_weekend.png';
import './MyBookings.css';

// Mock Bookings Data
const BOOKINGS_DATA = [
  {
    id: 1,
    type: 'Bus',
    title: 'Kolkata ➔ Siliguri',
    date: '22 May 2024',
    badge: 'UPCOMING',
    vehicle: 'SBSTC Volvo / WB 11 2345',
    boarding: 'Kolkata / Esplanade',
    dropping: 'Siliguri / Tenzing Norgay Bus Stand',
    duration: '10h 30m • Non Stop',
    pnr: 'SBSTC12345678',
    status: 'CONFIRMED'
  },
  {
    id: 2,
    type: 'Cab',
    title: 'Airport Pickup',
    date: '23 May 2024',
    badge: 'UPCOMING',
    vehicle: 'SBSTC Volvo / WB 11 2345',
    boarding: 'Kolkata',
    dropping: 'Siliguri / Tenzing Norgay Bus Stand',
    duration: '10h 30m • Non Stop',
    pnr: 'SBSTC12345678',
    status: 'CONFIRMED'
  }
];

const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [showQrModal, setShowQrModal] = useState<string | null>(null);

  const filteredBookings = BOOKINGS_DATA.filter(booking => {
    if (activeTab === 'Upcoming') return booking.badge === 'UPCOMING';
    if (activeTab === 'Completed') return booking.badge === 'COMPLETED';
    if (activeTab === 'Cancelled') return booking.badge === 'CANCELLED';
    return true; // All Trips
  });

  return (
    <div className="mb-page-wrapper">
      <Navbar theme="blue" />

      {/* Header section */}
      <div className="mb-header-section">
        <div className="mb-header-container">
          <h1>My Bookings</h1>
          <p>Your complete travel history at a glance</p>
        </div>
      </div>

      {/* Main Tabs & List content */}
      <main className="mb-main">
        <div className="mb-container">
          
          {/* Filter Tabs */}
          <div className="mb-tabs-row">
            {['Upcoming', 'Completed', 'Cancelled', 'All Trips'].map(tab => (
              <button 
                key={tab} 
                className={`mb-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Bookings cards list */}
          <div className="mb-grid">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <div key={booking.id} className="mb-card">
                  <div className="mb-card-header">
                    <div className="mb-card-title-wrap">
                      <h2>{booking.title}</h2>
                      <span className="mb-card-date">{booking.date}</span>
                    </div>
                    <span className="mb-upcoming-badge">{booking.badge}</span>
                  </div>

                  <div className="mb-card-body">
                    {/* Vehicle description */}
                    <div className="mb-vehicle-row">
                      {booking.type === 'Bus' ? <Bus size={18} /> : <Car size={18} />}
                      <span>{booking.vehicle}</span>
                    </div>

                    {/* Timeline itinerary */}
                    <div className="mb-timeline">
                      <div className="mb-timeline-item">
                        <div className="mb-dot blue"></div>
                        <div className="mb-timeline-content">
                          <span className="mb-lbl">BOARDING</span>
                          <span className="mb-val">{booking.boarding}</span>
                        </div>
                      </div>
                      <div className="mb-timeline-item">
                        <div className="mb-dot grey"></div>
                        <div className="mb-timeline-content">
                          <span className="mb-lbl">DROPPING</span>
                          <span className="mb-val">{booking.dropping}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="mb-divider" />

                    {/* Metadata & Actions row */}
                    <div className="mb-footer-row">
                      <div className="mb-meta-info">
                        <div className="mb-duration">
                          <Clock size={14} />
                          <span>{booking.duration}</span>
                        </div>
                        <div className="mb-pnr">
                          <span>PNR: <strong>{booking.pnr}</strong></span>
                          <span className="mb-status-badge">{booking.status}</span>
                        </div>
                      </div>

                      <div className="mb-action-btns">
                        <button className="mb-qr-btn" onClick={() => setShowQrModal(booking.pnr)}>
                          <QrCode size={18} />
                        </button>
                        <button className="mb-details-btn" onClick={() => navigate('/booking-success', {
                          state: {
                            type: booking.type === 'Bus' ? 'bus' : 'cab',
                            packageName: booking.title,
                            startDate: booking.date,
                            endDate: 'Flexible',
                            amount: '850',
                            travellers: [{ name: 'Rajesh Kumar', age: '32', gender: 'Male' }]
                          }
                        })}>
                          View Details
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="mb-empty-state">
                <p>No bookings found for this category.</p>
              </div>
            )}
          </div>

          {/* Promotion Banner */}
          <section className="mb-promo-banner" style={{ backgroundImage: `url('${escapeWeekendImg}')` }}>
            <div className="mb-promo-overlay"></div>
            <div className="mb-promo-content">
              <h2>Plan your next adventure</h2>
              <p>Explore exciting destinations with premium bus services across the country.</p>
              <button className="mb-promo-btn" onClick={() => navigate('/experiences')}>
                Explore Destinations
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* QR Code Modal Popup */}
      {showQrModal && (
        <div className="mb-modal-overlay" onClick={() => setShowQrModal(null)}>
          <div className="mb-qr-modal" onClick={e => e.stopPropagation()}>
            <h3>Boarding Pass QR</h3>
            <p>PNR: {showQrModal}</p>
            <div className="mb-qr-graphic">
              {/* Mock QR graphic */}
              <div className="mb-qr-block"></div>
            </div>
            <p className="mb-qr-note">Present this QR code to the driver at the time of boarding.</p>
            <button className="mb-modal-close-btn" onClick={() => setShowQrModal(null)}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyBookings;
