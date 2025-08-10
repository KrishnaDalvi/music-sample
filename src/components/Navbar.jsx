import { useState, useEffect } from 'react';
import CartIcon from './CartIcon';
import UserInfo from './UserInfo';

const Navbar = ({ cartItemCount = 0, onCartClick, isLoggedIn = false, user = null, onLogin, onLogout, onNavigateToLogin, onNavigateToSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'transparent',
      zIndex: 50,
      padding: 'clamp(1rem, 3vw, 2rem) 0',
      transition: 'all 0.3s ease'
    }} className={isScrolled ? 'navbar-scrolled' : ''}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div>
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: '300', 
            margin: 0,
            letterSpacing: '0.1em',
            color: 'white'
          }}>
            SP
          </h2>
        </div>
        
        {/* Desktop Menu */}
        <div style={{ 
          display: 'none', 
          gap: 'clamp(2rem, 5vw, 3rem)', 
          alignItems: 'center' 
        }} className="desktop-menu">
          <a href="#work" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '300',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'opacity 0.3s ease'
          }} className="nav-link">
            Work
          </a>
          <a href="#about" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '300',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'opacity 0.3s ease'
          }} className="nav-link">
            About
          </a>
          <a href="#contact" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '300',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'opacity 0.3s ease'
          }} className="nav-link">
            Contact
          </a>
        </div>

        {/* Right Side - Cart and User */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2rem)'
        }}>
          {/* Desktop User Info */}
          <div className="desktop-only">
            <UserInfo 
              isLoggedIn={isLoggedIn}
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
              onNavigateToLogin={onNavigateToLogin}
              onNavigateToSignup={onNavigateToSignup}
            />
          </div>

          {/* Desktop Cart Icon */}
          <div className="desktop-only">
            <CartIcon 
              itemCount={cartItemCount}
              onClick={onCartClick}
            />
          </div>

          {/* Mobile Menu Button */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3px', 
            cursor: 'pointer',
            padding: '0.5rem'
          }} 
               onClick={toggleMenu} className="mobile-menu-btn">
            <span style={{
              width: 'clamp(16px, 4vw, 20px)',
              height: '1px',
              background: 'white',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></span>
            <span style={{
              width: 'clamp(16px, 4vw, 20px)',
              height: '1px',
              background: 'white',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              width: 'clamp(16px, 4vw, 20px)',
              height: '1px',
              background: 'white',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
            }}></span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden',
        zIndex: 40
      }} className="mobile-menu">
        <div style={{ 
          textAlign: 'center',
          padding: '2rem',
          width: '100%'
        }}>
          {/* Mobile User Info */}
          <div style={{
            marginBottom: '3rem'
          }}>
            <UserInfo 
              isLoggedIn={isLoggedIn}
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
              onNavigateToLogin={onNavigateToLogin}
              onNavigateToSignup={onNavigateToSignup}
            />
          </div>

          {/* Mobile Cart */}
          <div style={{
            marginBottom: '3rem'
          }}>
            <CartIcon 
              itemCount={cartItemCount}
              onClick={() => {
                onCartClick();
                setIsMenuOpen(false);
              }}
            />
            <div style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              marginTop: '0.5rem'
            }}>
              Cart ({cartItemCount} items)
            </div>
          </div>

          {/* Mobile Navigation */}
          <a href="#work" className="menu-item">Work</a>
          <a href="#about" className="menu-item">About</a>
          <a href="#contact" className="menu-item">Contact</a>
        </div>
      </div>

      <style jsx>{`
        .desktop-menu {
          display: none;
        }
        
        .nav-link:hover {
          opacity: 0.7;
        }
        
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
          }
          
          .mobile-menu {
            display: none !important;
          }
          
          .desktop-only {
            display: block !important;
          }
        }
        
        @media (max-width: 767px) {
          .desktop-only {
            display: none !important;
          }
          
          .menu-item {
            font-size: clamp(18px, 6vw, 24px);
            margin-bottom: clamp(15px, 4vw, 20px);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 