import { useState } from 'react';

const CartIcon = ({ itemCount = 0, onClick }) => {
  return (
    <div 
      style={{
        position: 'relative',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease'
      }}
      onClick={onClick}
      onMouseEnter={(e) => e.target.style.opacity = '0.7'}
      onMouseLeave={(e) => e.target.style.opacity = '1'}
    >
      {/* Cart Icon */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ color: 'white' }}
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      
      {/* Item Count Badge */}
      {itemCount > 0 && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: 'rgba(255, 255, 255, 0.9)',
          color: 'black',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: '600',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {itemCount > 99 ? '99+' : itemCount}
        </div>
      )}
    </div>
  );
};

export default CartIcon; 