import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Package, HelpCircle, User, ChevronDown } from 'lucide-react';
import nikloLogoBlue from '../assets/Niklo main Logo 1.svg';
import nikloLogoWhite from '../assets/Niklo main Logo(White) 1.svg';
import './Navbar.css';

interface NavbarProps {
  theme?: 'blue' | 'white';
}

const Navbar: React.FC<NavbarProps> = ({ theme = 'white' }) => {
  const navigate = useNavigate();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className={`niklo-navbar theme-${theme}`}>
      <div className="navbar-left">
        <img 
          src={theme === 'blue' ? nikloLogoWhite : nikloLogoBlue} 
          alt="Niklo Logo" 
          className="navbar-logo" 
          onClick={() => navigate('/dashboard')}
        />
      </div>
      
      <div className="navbar-right">
        <nav className="nav-links">
          {/* Interactive Language Selector */}
          <div className="nav-dropdown-container" onMouseLeave={() => setShowLangMenu(false)}>
            <button 
              className="nav-dropdown-btn" 
              onMouseEnter={() => setShowLangMenu(true)}
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <Globe size={16} />
              <span>{selectedLang === 'English' ? 'EN' : (theme === 'blue' ? selectedLang : 'HI')}</span>
              {theme === 'blue' && <ChevronDown size={12} />}
            </button>
            {showLangMenu && (
              <div className="nav-dropdown-menu">
                {['English', 'Hindi', 'Bengali', 'Spanish'].map(lang => (
                  <button key={lang} type="button" onClick={() => { setSelectedLang(lang); setShowLangMenu(false); }}>
                    {lang === 'English' && theme !== 'blue' ? 'English (EN)' : lang === 'Hindi' && theme !== 'blue' ? 'Hindi (HI)' : lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Packages */}
          <button className="nav-item" onClick={() => navigate('/packages')}>
            <Package size={18} />
            <span>Packages</span>
          </button>
          
          {/* Help */}
          <button className="nav-item">
            {theme === 'blue' && <HelpCircle size={18} />}
            <span>Help</span>
          </button>
        </nav>

        {/* Profile Dropdown */}
        <div className="profile-dropdown-container" onMouseLeave={() => setShowProfileMenu(false)}>
          <button 
            className="profile-dropdown-btn" 
            onMouseEnter={() => setShowProfileMenu(true)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <User size={16} />
            <span>Rajesh</span>
            <ChevronDown size={12} />
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown-menu">
              <button type="button" onClick={() => alert('Viewing Bookings...')}>My Bookings</button>
              <button type="button" onClick={() => alert('Viewing Profile...')}>Profile</button>
              <button type="button" onClick={() => alert('Settings')}>Settings</button>
              {theme === 'white' && <hr className="dropdown-hr" />}
              <button type="button" className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
