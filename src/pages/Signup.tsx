import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import nikloLogo from '../assets/Niklo main Logo(White) 1.svg';
import welcomeBackBG from '../assets/welcome back BG.jpg';
import './Auth.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(54);
  
  // Refs for focusing OTP inputs
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && emailAddress && phoneNumber.length === 10) {
      setTimer(54); // Reset timer
      setOtp(['', '', '', '', '', '']); // Reset OTP entries
      setShowOtp(true);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    // Only accept numeric entries
    const numValue = value.replace(/\D/g, '');
    if (!numValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = numValue.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (index < 5 && numValue) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Focus previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      setShowOtp(false);
      navigate('/dashboard');
    } else {
      alert('Please enter a valid 6-digit OTP code.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(54);
      setOtp(['', '', '', '', '', '']);
      alert('A new OTP has been sent!');
    }
  };

  return (
    <div 
      className="auth-container fade-in"
      style={{ backgroundImage: `url("${welcomeBackBG}")` }}
    >
      {/* Top Left Logo */}
      <div className="auth-logo-container">
        <img 
          src={nikloLogo} 
          alt="Niklo Logo" 
          className="auth-logo-img" 
        />
      </div>

      {/* Signup Card */}
      <div className="auth-card">
        <div className="auth-title-section">
          <h2 className="auth-card-title">Create Account</h2>
          <p className="auth-card-subtitle">Experience smart and stressfree travel.</p>
        </div>

        <form className="auth-card-form" onSubmit={handleSendOtp}>
          {/* Full Name input */}
          <div className="standard-input-container">
            <label className="input-lbl" htmlFor="name-input">Full Name</label>
            <input 
              id="name-input"
              type="text"
              required
              className="standard-input-field"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div className="standard-input-container">
            <label className="input-lbl" htmlFor="email-input">Email Address</label>
            <input 
              id="email-input"
              type="email"
              required
              className="standard-input-field"
              placeholder="name@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          {/* Custom phone split input box */}
          <div className="phone-input-container">
            <div className="country-code-section">
              <span className="input-lbl">Country Code</span>
              <span className="country-code-val">+91</span>
            </div>
            
            <div className="phone-number-section">
              <label className="input-lbl" htmlFor="phone-input">Mobile number</label>
              <input 
                id="phone-input"
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className="phone-input-field"
                placeholder="1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          <button type="submit" className="btn-submit-otp">
            Sign Up & Send OTP
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?
          <Link to="/login" className="auth-footer-link">
            Sign In
          </Link>
        </p>
      </div>

      {/* OTP Verification Modal Overlay */}
      {showOtp && (
        <div className="modal-overlay">
          <div className="otp-modal">
            {/* Close Cross */}
            <button className="btn-close-modal" onClick={() => setShowOtp(false)} title="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="otp-title-section">
              <h2 className="otp-title">Enter OTP</h2>
              <p className="otp-subtitle">We've sent a 6-digit verification code to</p>
              <div className="otp-phone-row">
                <span>+91 {phoneNumber}</span>
                <button className="btn-edit-phone" onClick={() => setShowOtp(false)}>Edit</button>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* 6 Digit Input Row */}
              <div className="otp-inputs-row">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => { if (el) inputRefs.current[idx] = el; }}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="otp-box-input"
                    required
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="otp-resend-section">
                <span>Didn't receive the code?</span>
                <br />
                {timer > 0 ? (
                  <span style={{ color: '#64748b' }}>
                    Resend Code <span className="otp-timer-val">in {formatTime(timer)}</span>
                  </span>
                ) : (
                  <button type="button" className="btn-resend-code" onClick={handleResend}>
                    Resend Code
                  </button>
                )}
              </div>

              <button type="submit" className="btn-verify-otp">
                Verify OTP
              </button>

              {/* Terms and Privacy policy */}
              <p className="otp-legal-text">
                By logging in I agree to the<br />
                <a href="#terms" className="otp-legal-link" onClick={(e) => e.preventDefault()}>Terms & Conditions</a> and <a href="#privacy" className="otp-legal-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
