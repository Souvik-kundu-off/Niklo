import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import './BookingSuccess.css';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTicket, setShowTicket] = useState(false);
  const bookingState = location.state || { type: 'bus' };

  return (
    <div className="success-page-container">
      <Navbar theme="blue" />
      
      <div className="success-content">
        <div className="success-card">
          
          <div className="icon-container">
            {/* Confetti decorations */}
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
            <div className="confetti confetti-4"></div>
            <div className="confetti confetti-5"></div>
            <div className="confetti confetti-6"></div>
            <div className="confetti confetti-7"></div>
            
            <div className="check-circle">
              <Check size={32} strokeWidth={3} />
            </div>
          </div>
          
          <h1 className="success-title">
            {bookingState.type === 'package' ? 'Package Booking Successful!' : 'Bus Booking Successful!'}
          </h1>
          <p className="success-subtitle">
            {bookingState.type === 'package' 
              ? 'Your package booking has been confirmed. Your travel vouchers have been sent to your email.'
              : 'Your transaction has been completed successfully. A copy of your ticket has been sent to your email.'}
          </p>
          
          <div className="details-box">
            <div className="detail-row">
              <span className="detail-label">Booking ID</span>
              <span className="detail-value">{bookingState.type === 'package' ? 'PKG7890123' : 'PAY1234567890'}</span>
            </div>
            {bookingState.type === 'package' && (
              <div className="detail-row">
                <span className="detail-label">Destination</span>
                <span className="detail-value">{bookingState.packageName || 'Meghalaya Explorer'}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Date & Time</span>
              <span className="detail-value">22 May 2024 • 08:00 PM</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value">
                ₹{bookingState.type === 'package' ? (bookingState.amount || '18,580') : '1,250.00'}{' '}
                <span className="badge-paid">PAID</span>
              </span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => setShowTicket(true)}>View Details</button>
            <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Back to Home</button>
          </div>
          
          <div className="support-link">
            Need help? <a href="#support" onClick={(e) => { e.preventDefault(); alert("Contacting support..."); }}>Contact our support team</a>
          </div>
          
        </div>
      </div>
      
      {showTicket && (
        <div className="ticket-modal-overlay">
          <div className="ticket-modal-card">
            <div className="ticket-header">
              <h3>{bookingState.type === 'package' ? 'Booking Voucher' : 'Your E-Ticket'}</h3>
              <button className="btn-close-modal" onClick={() => setShowTicket(false)}><X size={24} /></button>
            </div>
            {bookingState.type === 'package' ? (
              <div className="ticket-body">
                <div className="ticket-route" style={{ marginBottom: '24px' }}>
                  <div className="loc" style={{ textAlign: 'center', width: '100%', fontSize: '1.25rem', color: '#0052ff' }}>
                    {bookingState.packageName || 'Meghalaya Explorer'}
                  </div>
                </div>
                <div className="ticket-details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="ticket-item"><span>Start Date</span><strong>{bookingState.startDate}</strong></div>
                  <div className="ticket-item"><span>End Date</span><strong>{bookingState.endDate}</strong></div>
                  <div className="ticket-item"><span>Total Paid</span><strong>₹{bookingState.amount}</strong></div>
                  <div className="ticket-item"><span>Rooms</span><strong>{bookingState.rooms || 1} Room(s)</strong></div>
                </div>
                
                <div className="ticket-travellers-list" style={{ marginTop: '20px', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '8px', fontWeight: 800 }}>TRAVELLERS DETAILS</span>
                  {bookingState.travellers?.map((t: any, idx: number) => (
                    <div key={t.id || idx} style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: '700', padding: '8px 0', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{idx + 1}. {t.name}</span>
                      <span style={{ color: '#64748b', fontWeight: '500' }}>{t.age} • {t.gender}</span>
                    </div>
                  ))}
                </div>

                <div className="qr-container" style={{ marginTop: '24px' }}>
                  <div className="mock-qr"></div>
                  <p>Present this voucher at hotel check-in</p>
                </div>
                <button className="btn-download-ticket" onClick={() => alert("Downloading Voucher PDF...")}>Download Booking Voucher</button>
              </div>
            ) : (
              <div className="ticket-body">
                <div className="ticket-route">
                  <div className="loc">Kolkata <br/><span>08:30 PM</span></div>
                  <div className="arrow"><ArrowRight size={20}/></div>
                  <div className="loc">Siliguri <br/><span>07:15 AM</span></div>
                </div>
                <div className="ticket-details-grid">
                  <div className="ticket-item"><span>Bus Name</span><strong>SBSTC Volvo AC Semi Sleeper</strong></div>
                  <div className="ticket-item"><span>Seats</span><strong>U1A, U2A</strong></div>
                  <div className="ticket-item"><span>Date</span><strong>23 May 2024</strong></div>
                  <div className="ticket-item"><span>Total Paid</span><strong>₹1,250.00</strong></div>
                </div>
                <div className="qr-container">
                  <div className="mock-qr"></div>
                  <p>Scan to board the bus</p>
                </div>
                <button className="btn-download-ticket" onClick={() => alert("Downloading Ticket PDF...")}>Download Ticket PDF</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;
