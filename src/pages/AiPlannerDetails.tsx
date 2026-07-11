import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Car, Bus, Clock, Calendar, 
  Bell, Download, Share2, Wallet 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AiPlannerDetails.css';

const AiPlannerDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCar = () => {
    navigate('/booking-success', {
      state: {
        type: 'cab',
        packageName: 'Private Car Ride (Kolkata ➔ Netaji NSCBI)',
        startDate: '12 Dec 2024',
        endDate: '12 Dec 2024',
        amount: '900',
        travellers: [{ name: 'Rajesh Kumar', age: '32', gender: 'Male' }]
      }
    });
  };

  const handleBookBus = () => {
    navigate('/booking-success', {
      state: {
        type: 'bus',
        packageName: 'Intercity Volvo Bus (Kolkata ➔ Gangtok)',
        startDate: '12 Dec 2024',
        endDate: '12 Dec 2024',
        amount: '300',
        travellers: [{ name: 'Rajesh Kumar', age: '32', gender: 'Male' }]
      }
    });
  };

  return (
    <div className="ad-page-wrapper">
      <Navbar theme="blue" />

      {/* Main Content */}
      <main className="ad-main">
        <div className="ad-container">
          
          {/* Header breadcrumb & info */}
          <div className="ad-header-row">
            <button className="ad-back-link" onClick={() => navigate('/ai-planner/search')}>
              <ArrowLeft size={14} />
              <span>Back to Recommendations</span>
            </button>
            <div className="ad-title-wrap">
              <h1>Kolkata to Gangtok</h1>
              <span className="ad-badge-fastest">FASTEST</span>
            </div>
            <p className="ad-subtitle">Flight + Bus Connection • Dec 12, 2024</p>
          </div>

          {/* Journey Breakdown Card */}
          <div className="ad-breakdown-card">
            <h2>Journey Breakdown</h2>

            <div className="ad-timeline-list">
              
              {/* Point 1 */}
              <div className="ad-timeline-row">
                <div className="ad-timeline-icon green">
                  <MapPin size={18} />
                </div>
                <div className="ad-timeline-body">
                  <h3>Kolkata, WB</h3>
                  <p>Departure from Netaji Subhash Chandra Bose Int'l</p>
                </div>
              </div>

              {/* Segment line */}
              <div className="ad-timeline-line"></div>

              {/* Point 2 */}
              <div className="ad-timeline-row action">
                <div className="ad-timeline-icon blue">
                  <Car size={18} />
                </div>
                <div className="ad-timeline-body flex-row">
                  <div className="ad-body-info">
                    <h3>Private Car Ride</h3>
                    <span className="ad-duration">
                      <Clock size={12} />
                      <span>1h 45m</span>
                    </span>
                  </div>
                  <div className="ad-body-actions">
                    <span className="ad-approx-price">Approx ₹900</span>
                    <button className="ad-btn-book" onClick={handleBookCar}>Book Car</button>
                  </div>
                </div>
              </div>

              {/* Segment line */}
              <div className="ad-timeline-line"></div>

              {/* Point 3 */}
              <div className="ad-timeline-row action">
                <div className="ad-timeline-icon blue">
                  <Bus size={18} />
                </div>
                <div className="ad-timeline-body flex-row">
                  <div className="ad-body-info">
                    <h3>Intercity Volvo Bus</h3>
                    <span className="ad-duration">
                      <Clock size={12} />
                      <span>6h 32m</span>
                    </span>
                  </div>
                  <div className="ad-body-actions">
                    <span className="ad-approx-price">Approx ₹300</span>
                    <button className="ad-btn-book" onClick={handleBookBus}>Book Bus</button>
                  </div>
                </div>
              </div>

              {/* Segment line */}
              <div className="ad-timeline-line"></div>

              {/* Point 4 */}
              <div className="ad-timeline-row">
                <div className="ad-timeline-icon dark-blue">
                  <MapPin size={18} />
                </div>
                <div className="ad-timeline-body">
                  <h3>Gangtok, SK</h3>
                  <p>Arrival at Gangtok Central Bus Terminus</p>
                </div>
              </div>

            </div>
          </div>

          {/* Travel Tools & Features */}
          <section className="ad-tools-section">
            <h2>Travel Tools & Features</h2>
            <div className="ad-tools-grid">
              
              <div className="ad-tool-card">
                <div className="ad-tool-icon-box blue">
                  <Calendar size={18} />
                </div>
                <span>Schedule Optimizer</span>
              </div>

              <div className="ad-tool-card">
                <div className="ad-tool-icon-box green">
                  <Bell size={18} />
                </div>
                <span>Journey Alerts</span>
              </div>

              <div className="ad-tool-card">
                <div className="ad-tool-icon-box purple">
                  <Download size={18} />
                </div>
                <span>Offline Itinerary</span>
              </div>

              <div className="ad-tool-card">
                <div className="ad-tool-icon-box orange">
                  <Share2 size={18} />
                </div>
                <span>Journey Sharing</span>
              </div>

              <div className="ad-tool-card">
                <div className="ad-tool-icon-box light-blue">
                  <Wallet size={18} />
                </div>
                <span>Budget Tracker</span>
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AiPlannerDetails;
