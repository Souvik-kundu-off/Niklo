import React from 'react';
import nikloLogo from '../assets/Niklo main Logo(White) 1.svg';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="home-footer">
      <div className="footer-top-columns">
        {/* Brand Info */}
        <div className="footer-brand-col">
          <img src={nikloLogo} alt="Niklo Logo" className="footer-brand-logo" />
          <p className="footer-brand-desc">
            Niklo makes intercity transport and travel planning stressfree and smart. Book standard and luxury buses, track routes, and discover premium resorts seamlessly.
          </p>
          <div className="footer-social-row">
            <a href="#twitter" className="social-circle-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="#facebook" className="social-circle-btn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#instagram" className="social-circle-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#linkedin" className="social-circle-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Columns */}
        <div>
          <h4 className="footer-col-title">Services</h4>
          <ul className="footer-links-list">
            <li><a href="#bus" onClick={(e) => e.preventDefault()}>Bus Booking</a></li>
            <li><a href="#cabs" onClick={(e) => e.preventDefault()}>Cab Booking</a></li>
            <li><a href="#hotels" onClick={(e) => e.preventDefault()}>Hotels</a></li>
            <li><a href="#ai" onClick={(e) => e.preventDefault()}>AI Travel Planner</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Support</h4>
          <ul className="footer-links-list">
            <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
            <li><a href="#help" onClick={(e) => e.preventDefault()}>Help Center</a></li>
            <li><a href="#faq" onClick={(e) => e.preventDefault()}>FAQs</a></li>
            <li><a href="#safety" onClick={(e) => e.preventDefault()}>Safety Guidelines</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Legal</h4>
          <ul className="footer-links-list">
            <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Use</a></li>
            <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
            <li><a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter row */}
      <div className="footer-newsletter-row">
        <div className="newsletter-text">
          <h4>Stay Updated with Travel Deals</h4>
          <p>Subscribe to our newsletter to receive curated promotions, discounts, and city travel guides.</p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
          <input type="email" placeholder="Enter your email address" className="newsletter-input" required />
          <button type="submit" className="btn-newsletter-submit">Subscribe</button>
        </form>
      </div>

      {/* Bottom copyright row */}
      <div className="footer-bottom-row">
        <span>&copy; 2026 Niklo Inc. All rights reserved.</span>
        <div className="footer-bottom-badges">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" className="footer-badge-img" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="footer-badge-img" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
