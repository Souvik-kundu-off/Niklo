import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Heart, Compass, Filter
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import experienceListCtaBg from '../assets/experience_list_cta_bg.png';
import './ExperiencesList.css';

// Mock Adventures Data
const ADVENTURES = [
  {
    id: 1,
    name: 'Water Rafting in Teesta',
    location: 'Siliguri, West Bengal',
    desc: 'Feel the rush as you raft through the wild rapids of Teesta River.',
    duration: '3-4 Hours',
    difficulty: 'Moderate',
    price: 1850,
    img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    name: 'Paragliding in Kalimpong',
    location: 'Kalimpong, West Bengal',
    desc: 'Soar high above the hills and enjoy breathtaking views of the Himalayas.',
    duration: '20-30 Mins',
    difficulty: 'Moderate',
    price: 2400,
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Jungle Safari in Jaldapara',
    location: 'Jaldapara National Park',
    desc: 'Explore the wilderness and spot exotic wildlife in their natural habitat.',
    duration: '3-4 Hours',
    difficulty: 'Easy',
    price: 1650,
    img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    name: 'Kayaking on the Ganges',
    location: 'Rishikesh, Uttarakhand',
    desc: 'Paddle through the serene waters and embrace the beauty of nature.',
    duration: '2-3 Hours',
    difficulty: 'Easy',
    price: 1200,
    img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600'
  }
];

const ExperiencesList: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  const handleViewDetails = () => {
    navigate('/experiences/water-rafting-in-teesta');
  };

  return (
    <div className="el-page-wrapper">
      <Navbar theme="blue" />

      {/* Header Info */}
      <div className="el-header-section">
        <div className="el-header-container">
          <span className="el-badge-lbl">DISCOVER NEW THRILLS</span>
          <h1>All Adventures</h1>
        </div>
      </div>

      {/* Filters & Grid */}
      <main className="el-main">
        <div className="el-container">
          
          {/* Filter Pills row */}
          <div className="el-filters-meta-row">
            <div className="el-pills-wrap">
              <button className="el-filter-btn">
                <Filter size={14} />
                <span>Filters</span>
              </button>
              {['All', 'Water Sports', 'Trekking', 'Camping', 'Air Sports'].map(pill => (
                <button 
                  key={pill} 
                  className={`el-pill-btn ${activeFilter === pill ? 'active' : ''}`}
                  onClick={() => setActiveFilter(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
            
            <div className="el-sort-box">
              <span>Sort by:</span>
              <select className="el-sort-select">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Duration</option>
              </select>
            </div>
          </div>

          {/* Adventures grid */}
          <div className="el-grid">
            {ADVENTURES.map(adv => (
              <div key={adv.id} className="el-card">
                <div className="el-card-img-box">
                  <img src={adv.img} alt={adv.name} className="el-card-img" />
                </div>
                
                <div className="el-card-body">
                  <div className="el-card-header-row">
                    <h2 className="el-card-title">{adv.name}</h2>
                    <button className="el-like-btn">
                      <Heart size={16} />
                    </button>
                  </div>
                  
                  <div className="el-card-loc">
                    <MapPin size={14} />
                    <span>{adv.location}</span>
                  </div>

                  <p className="el-card-desc">{adv.desc}</p>

                  <div className="el-card-tags">
                    <span className="el-tag-item">
                      <Clock size={12} />
                      <span>{adv.duration}</span>
                    </span>
                    <span className="el-tag-item">
                      <Compass size={12} />
                      <span>{adv.difficulty}</span>
                    </span>
                  </div>

                  <div className="el-card-footer">
                    <div className="el-price-col">
                      <strong className="el-price-val">₹{adv.price.toLocaleString('en-IN')}</strong>
                      <span className="el-price-lbl">/ person</span>
                    </div>
                    <button className="el-details-btn" onClick={() => handleViewDetails()}>View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Promotion Banner */}
          <section className="el-promo-section" style={{ backgroundImage: `url('${experienceListCtaBg}')` }}>
            <div className="el-promo-overlay"></div>
            <div className="el-promo-content">
              <h2>Ready for your next trip?</h2>
              <p>Join 50k+ explorers getting weekly deals and adventure tips.</p>
              <form className="el-promo-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder="Enter your email address" required className="el-promo-input" />
                <button type="submit" className="el-promo-btn">Subscribe</button>
              </form>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencesList;
