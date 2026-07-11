import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Tag, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import busSvg from '../assets/bus.svg';
import carSvg from '../assets/car.svg';
import adventureSvg from '../assets/adventure.svg';
import hotelSvg from '../assets/Hotel.svg';
import './Offers.css';

// Mock Offers Data
const OFFERS_DATA = [
  {
    id: 1,
    type: 'Bus',
    badge: 'Flat ₹150 OFF',
    title: 'Save More on Every Journey',
    desc: 'Valid till 31 Aug 2026',
    code: 'Code: BUS150',
    cleanCode: 'BUS150',
    bgClass: 'bg-light-blue',
    img: busSvg
  },
  {
    id: 2,
    type: 'Car Rides',
    badge: 'Flat ₹100 OFF',
    title: 'Airport Transfer Deal',
    desc: 'Travel to and from the airport at discounted fares. Valid till 31 Aug 2026',
    code: 'Code: CAB100',
    cleanCode: 'CAB100',
    bgClass: 'bg-light-indigo',
    img: carSvg
  },
  {
    id: 3,
    type: 'Packages',
    badge: 'Save ₹3,000',
    title: 'Dream Vacation Sale',
    desc: 'On holiday packages above ₹20,000. Valid till 31 Aug 2026',
    code: 'Code: TRAVEL3000',
    cleanCode: 'TRAVEL3000',
    bgClass: 'bg-light-yellow',
    img: hotelSvg
  },
  {
    id: 4,
    type: 'Adventures',
    badge: 'Flat ₹500 OFF',
    title: 'Thrill Seeker Deal',
    desc: 'Book adventure activities with friends and enjoy.. Valid till 31 Aug 2026',
    code: 'Code: THRILLFREE',
    cleanCode: 'THRILLFREE',
    bgClass: 'bg-light-pink',
    img: adventureSvg
  }
];

const Offers: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredOffers = OFFERS_DATA.filter(offer => {
    if (activeFilter === 'All') return true;
    return offer.type.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="of-page-wrapper">
      <Navbar theme="blue" />

      {/* Header section */}
      <div className="of-header-section">
        <div className="of-header-container">
          <h1>Travel Offers</h1>
        </div>
      </div>

      {/* Filters row & cards list */}
      <main className="of-main">
        <div className="of-container">
          
          {/* Filters Bar */}
          <div className="of-filters-row">
            {['All', 'Bus', 'Car Rides', 'Packages', 'Adventures'].map(pill => (
              <button 
                key={pill} 
                className={`of-pill-btn ${activeFilter === pill ? 'active' : ''}`}
                onClick={() => setActiveFilter(pill)}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Grid list of offers */}
          <div className="of-grid">
            {filteredOffers.map(offer => (
              <div key={offer.id} className={`of-card ${offer.bgClass}`}>
                <div className="of-card-left">
                  <div className="of-badge">
                    <Tag size={14} />
                    <span>{offer.badge}</span>
                  </div>
                  <h2>{offer.title}</h2>
                  <p>{offer.desc}</p>
                  
                  <div className="of-code-box-wrap" onClick={() => handleCopy(offer.cleanCode)}>
                    <div className="of-code-box">
                      <span>{offer.code}</span>
                    </div>
                    <button className="of-copy-btn">
                      {copiedCode === offer.cleanCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="of-card-right">
                  <img src={offer.img} alt={offer.title} className="of-card-graphic" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Offers;
