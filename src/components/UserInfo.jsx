import { useState } from 'react';

const UserInfo = ({ isLoggedIn = false, user = null, onLogin, onLogout, onNavigateToLogin, onNavigateToSignup }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <button 
          className="btn-secondary"
          onClick={onNavigateToLogin}
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)'
          }}
        >
          Login
        </button>
        <button 
          className="btn-primary"
          onClick={onNavigateToSignup}
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)'
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      {/* User Avatar */}
      <div 
        style={{
          width: 'clamp(32px, 6vw, 40px)',
          height: 'clamp(32px, 6vw, 40px)',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onClick={() => setShowDropdown(!showDropdown)}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <span style={{
          color: 'white',
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          fontWeight: '300'
        }}>
          {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
        </span>
      </div>

      {/* User Name */}
      <span style={{
        color: 'white',
        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
        fontWeight: '300',
        display: 'none'
      }} className="desktop-only">
        {user?.firstName || user?.name || 'User'}
      </span>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            background: 'rgba(0, 0, 0, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0',
            padding: '1rem',
            minWidth: '150px',
            zIndex: 1000,
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div style={{
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '300',
            marginBottom: '0.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {user?.firstName || user?.name || 'User'}
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
            marginBottom: '1rem'
          }}>
            {user?.email || 'user@example.com'}
          </div>
          <button 
            className="btn-secondary"
            onClick={onLogout}
            style={{
              width: '100%',
              fontSize: '0.75rem',
              padding: '0.5rem',
              textAlign: 'left',
              background: 'none',
              border: 'none'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo; 