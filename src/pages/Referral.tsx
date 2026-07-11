import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, FileText, CheckSquare, Gift, Copy, Check, ChevronRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import referralHeroSvg from '../assets/referral_hero.svg';
import './Referral.css';

// Mock Referrals Data
const REFERRALS_DATA = [
  {
    id: 1,
    name: 'Aarav Sharma',
    date: 'Joined on Oct 12, 2023',
    status: 'completed',
    badge: '✓ + ₹100.00 Completed First Booking',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 2,
    name: 'Ishani Gupta',
    date: 'Joined on Oct 10, 2023',
    status: 'pending',
    badge: 'Reward Pending — Waiting for First Booking',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 3,
    name: 'Kabir Singh',
    date: 'Joined on Oct 08, 2023',
    status: 'completed',
    badge: '✓ + ₹100.00 Completed First Booking',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 4,
    name: 'Mira Kapoor',
    date: 'Joined on Oct 05, 2023',
    status: 'completed',
    badge: '✓ + ₹100.00 Completed First Booking',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100'
  }
];

const Referral: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NIKLO100');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareInvite = () => {
    alert('Share link copied to clipboard! Share it with your friends.');
  };

  return (
    <div className="re-page-wrapper">
      <Navbar theme="blue" />

      {/* Main Container */}
      <main className="re-main">
        <div className="re-container">
          
          {/* 1. Header Banner Card */}
          <div className="re-banner-card">
            <div className="re-banner-left">
              <h1>Earn ₹100 for Every<br />Friend You Refer</h1>
              <p>
                Invite friends to Niklo Travel and earn rewards when they complete 
                their first hotel or flight booking. There's no limit to how much you 
                can earn!
              </p>
              <button className="re-share-btn" onClick={handleShareInvite}>Share Invite</button>
            </div>

            <div className="re-banner-right">
              <img src={referralHeroSvg} alt="Referral Illustration" className="re-hero-graphic" />
            </div>
          </div>

          {/* 2. Centered Floating Referral Code Card */}
          <div className="re-code-section">
            <div className="re-code-card">
              <span className="re-code-lbl">YOUR REFERRAL CODE</span>
              <div className="re-code-box" onClick={handleCopyCode}>
                <span className="re-code-val">NIKLO100</span>
                <button className="re-copy-btn">
                  {copied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                </button>
              </div>
              <span className="re-code-note">Tap to copy and share with friends on WhatsApp or Social Media</span>
            </div>
          </div>

          {/* 3. How It Works */}
          <section className="re-how-it-works">
            <h2>How It Works</h2>
            
            <div className="re-steps-row">
              <div className="re-step-item">
                <div className="re-step-icon-box">
                  <UserPlus size={22} />
                </div>
                <h3>Invite Friends</h3>
              </div>
              
              <div className="re-step-divider"></div>

              <div className="re-step-item">
                <div className="re-step-icon-box">
                  <FileText size={22} />
                </div>
                <h3>Friend Signs Up</h3>
              </div>

              <div className="re-step-divider"></div>

              <div className="re-step-item">
                <div className="re-step-icon-box">
                  <CheckSquare size={22} />
                </div>
                <h3>Friend Completes Booking</h3>
              </div>

              <div className="re-step-divider"></div>

              <div className="re-step-item">
                <div className="re-step-icon-box">
                  <Gift size={22} />
                </div>
                <h3>Both Earn Rewards</h3>
              </div>
            </div>
          </section>

          {/* 4. Recent Referrals */}
          <section className="re-section">
            <div className="re-section-header">
              <h2>Recent Referrals</h2>
              <a href="#all" className="re-view-all" onClick={e => { e.preventDefault(); alert('Viewing all referrals...'); }}>View All Referrals</a>
            </div>

            <div className="re-table-wrapper">
              <div className="re-table-header">
                <span>FRIEND DETAILS</span>
                <span>STATUS & REWARD</span>
              </div>

              <div className="re-table-body">
                {REFERRALS_DATA.map(ref => (
                  <div key={ref.id} className="re-table-row">
                    <div className="re-friend-info">
                      <img src={ref.avatar} alt={ref.name} className="re-friend-avatar" />
                      <div className="re-friend-text">
                        <h3>{ref.name}</h3>
                        <p>{ref.date}</p>
                      </div>
                    </div>

                    <div className="re-status-col">
                      <span className={`re-status-badge ${ref.status}`}>
                        {ref.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Bottom Call to Action */}
          <div className="re-cta-banner">
            <div className="re-cta-left">
              <h2>Ready to earn more?</h2>
              <p>Share your code NIKLO100 with your community.</p>
            </div>
            <button className="re-cta-btn" onClick={handleCopyCode}>
              <span>Refer Now</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Referral;
