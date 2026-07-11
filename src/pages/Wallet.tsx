import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, List, Gift, Ticket, Headphones, Tag, 
  ShieldCheck, Star, Bus, Car, ChevronRight, Copy, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import walletSvg from '../assets/wallet.svg';
import './Wallet.css';

// Mock Transaction Data
const TRANSACTIONS = [
  {
    id: 1,
    title: 'Money Added',
    desc: 'From UPI',
    date: '22 May 2024 • 08:15 PM',
    amount: '+₹1,000.00',
    balance: 'Balance: ₹1,250.00',
    type: 'add',
    color: 'green'
  },
  {
    id: 2,
    title: 'Bus Booking',
    desc: 'Kolkata ➔ Siliguri',
    date: '22 May 2024 • 08:05 PM',
    amount: '-₹850.00',
    balance: 'Balance: ₹250.00',
    type: 'bus',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Cashback Received',
    desc: 'From Referral Offer',
    date: '18 May 2024 • 11:20 AM',
    amount: '+₹100.00',
    balance: 'Balance: ₹1,100.00',
    type: 'cashback',
    color: 'orange'
  },
  {
    id: 4,
    title: 'Car Ride',
    desc: 'Kolkata ➔ Howrah',
    date: '15 May 2024 • 07:45 PM',
    amount: '-₹120.00',
    balance: 'Balance: ₹1,000.00',
    type: 'cab',
    color: 'red'
  }
];

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="wa-page-wrapper">
      <Navbar theme="blue" />

      {/* Header Info */}
      <div className="wa-header-section">
        <div className="wa-header-container">
          <h1>My Wallet</h1>
          <p>Manage your balance, transactions, and exclusive travel rewards</p>
        </div>
      </div>

      {/* Main Container */}
      <main className="wa-main">
        <div className="wa-container">
          
          {/* 1. Wallet Header Banner Card */}
          <div className="wa-banner-card">
            <div className="wa-banner-left">
              <span className="wa-lbl">Available Balance</span>
              <strong className="wa-balance">₹1,250.00</strong>
              <button className="wa-add-btn" onClick={() => alert('Add Money feature coming soon!')}>Add Money</button>
            </div>
            
            <div className="wa-banner-middle">
              <img src={walletSvg} alt="Wallet Illustration" className="wa-wallet-graphic" />
            </div>

            <div className="wa-banner-right">
              <span className="wa-cashback-lbl">Unlock cashback</span>
              <strong className="wa-cashback-val">₹200 OFF</strong>
              <p>Get up to ₹200 cashback on your next bus or car booking</p>
            </div>
          </div>

          {/* 2. Action Menu Row */}
          <div className="wa-action-menu">
            <button className="wa-menu-item" onClick={() => alert('Viewing Transaction History...')}>
              <div className="wa-menu-icon-box">
                <List size={20} />
              </div>
              <span>Transaction History</span>
            </button>
            <button className="wa-menu-item" onClick={() => navigate('/referral')}>
              <div className="wa-menu-icon-box">
                <Gift size={20} />
              </div>
              <span>Refer and Earn</span>
            </button>
            <button className="wa-menu-item" onClick={() => navigate('/offers')}>
              <div className="wa-menu-icon-box">
                <Ticket size={20} />
              </div>
              <span>Exclusive Offers</span>
            </button>
            <button className="wa-menu-item" onClick={() => alert('Contacting Help Support...')}>
              <div className="wa-menu-icon-box">
                <Headphones size={20} />
              </div>
              <span>Help & Support</span>
            </button>
          </div>

          {/* 3. Recent Transactions */}
          <section className="wa-section">
            <div className="wa-section-header">
              <h2>Recent Transactions</h2>
              <a href="#all" className="wa-view-all" onClick={e => { e.preventDefault(); alert('Viewing all transactions...'); }}>View All</a>
            </div>

            <div className="wa-transactions-list">
              {TRANSACTIONS.map(tx => (
                <div key={tx.id} className="wa-tx-row">
                  <div className="wa-tx-left">
                    <div className={`wa-tx-icon-box ${tx.color}`}>
                      {tx.type === 'add' && <Plus size={18} />}
                      {tx.type === 'bus' && <Bus size={18} />}
                      {tx.type === 'cashback' && <Star size={18} />}
                      {tx.type === 'cab' && <Car size={18} />}
                    </div>
                    <div className="wa-tx-info">
                      <h3>{tx.title}</h3>
                      <p>{tx.desc} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="wa-tx-right">
                    <strong className={`wa-tx-amt ${tx.amount.startsWith('+') ? 'green' : ''}`}>{tx.amount}</strong>
                    <span className="wa-tx-bal">{tx.balance}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Exclusive Offers */}
          <section className="wa-section">
            <div className="wa-section-header">
              <h2>Exclusive Offers for You</h2>
              <a href="#all" className="wa-view-all" onClick={e => { e.preventDefault(); navigate('/offers'); }}>View All</a>
            </div>

            <div className="wa-offers-grid">
              <div className="wa-offer-box light-green">
                <div className="wa-offer-badge green">
                  <Tag size={16} />
                </div>
                <h3>Flat ₹100 OFF</h3>
                <p>On bus bookings</p>
                <div className="wa-offer-code-wrap" onClick={() => handleCopy('BUS100')}>
                  <div className="wa-offer-code">
                    <span>Code: BUS100</span>
                  </div>
                  <button className="wa-copy-btn">
                    {copiedCode === 'BUS100' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  </button>
                </div>
                <span className="wa-offer-expiry">Valid till 31 May 2024</span>
              </div>

              <div className="wa-offer-box light-blue">
                <div className="wa-offer-badge blue">
                  <Tag size={16} />
                </div>
                <h3>20% Cashback</h3>
                <p>On your next car ride</p>
                <div className="wa-offer-code-wrap" onClick={() => handleCopy('RIDE20')}>
                  <div className="wa-offer-code">
                    <span>Code: RIDE20</span>
                  </div>
                  <button className="wa-copy-btn">
                    {copiedCode === 'RIDE20' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  </button>
                </div>
                <span className="wa-offer-expiry">Valid till 25 May 2024</span>
              </div>
            </div>
          </section>

          {/* 5. Trust Security Alert */}
          <div className="wa-security-alert">
            <div className="wa-sec-left">
              <ShieldCheck size={20} className="wa-sec-icon" />
              <div className="wa-sec-text">
                <strong>Your money is safe with us!</strong>
                <span>100% Secure Payments powered by Niklo Shield</span>
              </div>
            </div>
            <a href="#details" className="wa-sec-link" onClick={e => { e.preventDefault(); alert('Payments are verified and secured via 256-bit SSL encryption.'); }}>
              <span>Know More</span>
              <ChevronRight size={16} />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wallet;
