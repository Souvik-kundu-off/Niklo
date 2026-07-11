import React from 'react';
import { Link } from 'react-router-dom';
import nikloLogo from '../assets/Niklo main Logo(White) 1.svg';
import getStartedAssets from '../assets/get started asets.svg';
import './GetStarted.css';

const GetStarted: React.FC = () => {
  return (
    <div className="get-started-container fade-in">
      {/* Top Left Logo */}
      <div className="logo-container">
        <img 
          src={nikloLogo} 
          alt="Niklo Logo" 
          className="logo-img" 
        />
      </div>
      
      {/* Main Content Area */}
      <div className="get-started-content">
        {/* Left Section */}
        <div className="get-started-left">
          <h1 className="get-started-title">
            Your Journey<br />Starts Here
          </h1>
          <p className="get-started-subtitle">
            Book buses, track rides, and travel stressfree with seamless booking.
          </p>
        </div>

        {/* Right Section */}
        <div className="get-started-right">
          <div className="assets-illustration-container">
            <img 
              src={getStartedAssets} 
              alt="Bus Illustration" 
              className="assets-illustration" 
            />
          </div>
          
          <div className="get-started-buttons">
            <Link to="/signup" className="btn-create-account">
              Create Account
            </Link>
            <Link to="/login" className="btn-login">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
