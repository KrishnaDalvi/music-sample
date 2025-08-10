import { useState } from 'react';

const CartPage = ({ cartItems = [], onUpdateQuantity, onRemoveItem, onCheckout, onContinueShopping }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      onCheckout();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <section style={{
        minHeight: '100vh',
        padding: '8rem 1rem 4rem 1rem',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '2rem',
            opacity: '0.5'
          }}>
            🛒
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '300',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Your Cart is Empty
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Looks like you haven't added any sample packs to your cart yet.
          </p>
          <button 
            className="btn-primary"
            onClick={onContinueShopping}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)'
            }}
          >
            Start Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 1rem 4rem 1rem',
      background: '#000000'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '300',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Shopping Cart
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem'
            }}>
              {cartItems.map((item, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto auto',
                  gap: '1.5rem',
                  alignItems: 'center',
                  padding: '1.5rem 0',
                  borderBottom: index < cartItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }}>
                    {item.category}
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                      fontWeight: '300',
                      color: 'white',
                      marginBottom: '0.5rem'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '0.5rem'
                    }}>
                      {item.category} • {item.sampleCount} samples
                    </p>
                    <div style={{
                      fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                      fontWeight: '300',
                      color: 'white'
                    }}>
                      ${item.price}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <button 
                      onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '300',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemoveItem(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      padding: '0.5rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.5)'}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            position: 'sticky',
            top: '2rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <span>Tax (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                color: 'white',
                fontWeight: '300',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="btn-primary"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: '100%',
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem)',
                marginBottom: '1rem',
                opacity: isCheckingOut ? 0.7 : 1,
                cursor: isCheckingOut ? 'not-allowed' : 'pointer'
              }}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <button 
              className="btn-secondary"
              onClick={onContinueShopping}
              style={{
                width: '100%',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem)'
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          
          .cart-item {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            text-align: center;
          }
          
          .quantity-controls {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default CartPage; 