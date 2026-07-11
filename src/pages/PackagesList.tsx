import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Edit3, Star, Clock, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PackagesList.css';

const TABS = [
  'All Packages', 'Beach Escapes', 'Honeymoon Special', 
  'Family Fun', 'Adventure', 'Heritage & Culture', 'Short Breaks'
];

const PACKAGES = [
  {
    id: 'goa-beach-escape',
    tag: 'SOUTH ASIA',
    title: 'Goa Beach Escape',
    desc: 'Unwind at pristine white sand beaches and enjoy luxury sea-facing accommodations with guided water sports.',
    rating: '4.8',
    duration: '3N / 4D',
    adults: '2 Adults',
    price: '₹10,999',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'goa-leisure-getaway',
    tag: 'NORTH GOA',
    title: 'Goa Leisure Getaway',
    desc: 'Explore vibrant shacks, heritage churches, and the bustling nightlife of Baga and Calangute with private transfers.',
    rating: '4.6',
    duration: '4N / 5D',
    adults: '3 Adults',
    price: '₹12,499',
    img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'goa-romantic-retreat',
    tag: 'LANDSCAPES',
    title: 'Goa Romantic Retreat',
    desc: 'A specially curated experience for couples featuring candle-lit dinners on the beach and sunset cruise sessions.',
    rating: '4.9',
    duration: '3N / 4D',
    adults: '2 Adults',
    price: '₹18,500',
    img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'goa-family-fun',
    tag: 'WILDLIFE',
    title: 'Goa Family Fun',
    desc: 'Fun-filled package for all ages including visits to spice plantations, Dudhsagar falls, and safe beach excursions.',
    rating: '4.7',
    duration: '4N / 5D',
    adults: '4 Adults',
    price: '₹19,500',
    img: 'https://images.unsplash.com/photo-1589182373715-41d636db99d5?auto=format&fit=crop&q=80&w=600'
  }
];

const PackagesList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Packages');

  return (
    <div className="pkg-list-container">
      <Navbar theme="blue" />
      
      <div className="pkg-list-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1600')` }}>
        <div className="pkg-list-hero-content">
          <span className="pkg-hero-sub">Your Next Adventure Awaits</span>
          <h1>Explore Packages</h1>
          
          <div className="pkg-summary-bar">
            <div className="pkg-summary-item">
              <span className="label">ROUTE</span>
              <span className="value">Kolkata to Goa</span>
            </div>
            <div className="pkg-summary-item">
              <span className="label">DATE</span>
              <span className="value">22 May 2024</span>
            </div>
            <div className="pkg-summary-item">
              <span className="label">TRAVELERS</span>
              <span className="value">2 Adults, 1 Room</span>
            </div>
            <button className="pkg-edit-btn" onClick={() => navigate('/packages')}>
              <Edit3 size={16} /> Edit Search
            </button>
          </div>
        </div>
      </div>

      <div className="pkg-list-main">
        <div className="pkg-list-tabs">
          {TABS.map(tab => (
            <button 
              key={tab} 
              className={`pkg-list-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="pkg-grid">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className="pkg-card">
              <img src={pkg.img} alt={pkg.title} className="pkg-card-img" />
              <div className="pkg-card-content">
                <div className="pkg-card-tag"><MapPin size={12} /> {pkg.tag}</div>
                <h3 className="pkg-card-title">{pkg.title}</h3>
                <p className="pkg-card-desc">{pkg.desc}</p>
                <div className="pkg-card-stats">
                  <div className="pkg-stat rating"><Star size={14} fill="currentColor" /> {pkg.rating}</div>
                  <div className="pkg-stat"><Clock size={14} /> {pkg.duration}</div>
                  <div className="pkg-stat"><Users size={14} /> {pkg.adults}</div>
                </div>
                <div className="pkg-card-footer">
                  <div className="pkg-price-block">
                    <span className="pkg-price-label">Starts from</span>
                    <div className="pkg-price-val">{pkg.price}</div>
                    <span className="pkg-price-unit">Per person</span>
                  </div>
                  <button className="pkg-details-btn" onClick={() => navigate(`/packages/meghalaya-explorer`)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="pkg-load-more">Load More Packages</button>
      </div>

      <Footer />
    </div>
  );
};

export default PackagesList;
