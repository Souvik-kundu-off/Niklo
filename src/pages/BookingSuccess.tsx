import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import './BookingSuccess.css';

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [showTicket, setShowTicket] = useState(false);

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
          
          <h1 className="success-title">Bus Booking Successful!</h1>
          <p className="success-subtitle">
            Your transaction has been completed successfully. A copy of your ticket has been sent to your email.
          </p>
          
          <div className="details-box">
            <div className="detail-row">
              <span className="detail-label">Payment ID</span>
              <span className="detail-value">PAY1234567890</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date & Time</span>
              <span className="detail-value">22 May 2024 • 08:00 PM</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value">
                ₹1,250.00 <span className="badge-paid">PAID</span>
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
              <h3>Your E-Ticket</h3>
              <button className="btn-close-modal" onClick={() => setShowTicket(false)}><X size={24} /></button>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;
