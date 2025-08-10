import { useEffect } from 'react';

const ThankYouPage = ({ onBackToHome, orderDetails }) => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      {/* Thank You Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '0',
        backdropFilter: 'blur(20px)',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        animation: 'fadeIn 0.8s ease-out',
        textAlign: 'center'
      }} className="card">
        
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(76, 175, 80, 0.2)',
          border: '2px solid #4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem auto',
          animation: 'scaleIn 0.6s ease-out 0.3s both'
        }}>
          <span style={{
            fontSize: '2.5rem',
            color: '#4CAF50'
          }}>
            ✓
          </span>
        </div>

        {/* Header */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: '300',
            color: 'white',
            letterSpacing: '0.1em',
            margin: '0 0 1rem 0'
          }}>
            Thank You!
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            fontWeight: '300',
            lineHeight: '1.6',
            margin: 0
          }}>
            Your payment has been processed successfully.
          </p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0'
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '300',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              Order Details
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: '300'
              }}>
                Order ID:
              </span>
              <span style={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '400'
              }}>
                {orderDetails.orderId}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: '300'
              }}>
                Amount:
              </span>
              <span style={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '400'
              }}>
                ₹{orderDetails.amount}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.875rem',
                fontWeight: '300'
              }}>
                Status:
              </span>
              <span style={{
                color: '#4CAF50',
                fontSize: '0.875rem',
                fontWeight: '400'
              }}>
                Paid
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <div style={{
          marginBottom: '2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.875rem',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 1rem 0' }}>
            You will receive a confirmation email shortly with your order details.
          </p>
          <p style={{ margin: 0 }}>
            Thank you for choosing our music sample packs!
          </p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: '300',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          className="btn-primary"
        >
          Back to Home
        </button>

        {/* Additional Info */}
        <div style={{
          marginTop: '2rem',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.5)',
          lineHeight: '1.4'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            Need help? Contact us at support@example.com
          </p>
          <p style={{ margin: 0 }}>
            Your order will be processed within 24 hours
          </p>
        </div>
      </div>

      <style jsx>{`
        .btn-primary:hover {
          background: white !important;
          color: black !important;
          border-color: white !important;
          transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        
        @media (max-width: 480px) {
          .card {
            padding: 1.5rem;
          }
          
          .btn-primary {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ThankYouPage; 