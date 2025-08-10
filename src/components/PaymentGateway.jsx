import { useState } from 'react';

// --- Cashfree SDK Integration ---
// The error you saw is because the 'import' statement couldn't find the package.
// The recommended solution is to add the following script tag to your main public/index.html file.
// This will make the Cashfree SDK globally available in your app.

// In your public/index.html, add this line in the <head> section:
// <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>

const PaymentGateway = ({ cartItems, onPaymentSuccess, onPaymentCancel, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // This function now calls your Python backend directly
  const handlePayment = async () => {
    setIsLoading(true);
    setError('');

    // 1. Check if user is logged in
    if (!user || !user.uid) {
      setError('You must be logged in to make a payment.');
      setIsLoading(false);
      return;
    }

    // 2. Calculate the final total amount from the cart
    const totalAmount = calculateTotal();
    if (totalAmount <= 0) {
        setError('Your cart is empty.');
        setIsLoading(false);
        return;
    }

    try {
      // 3. Call your Flask backend's /api/create_order endpoint
      const response = await fetch('http://localhost:5000/api/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid, // Sending the user's ID
          amount: totalAmount, // Sending the total amount
        }),
      });
      
      const data = await response.json();

      if (!response.ok || !data.success) {
        // Handle errors from your backend (e.g., user not found, etc.)
        throw new Error(data.error || 'Failed to create payment order.');
      }

      // 4. Use the payment_session_id to launch the Cashfree popup
      // This now uses the globally available Cashfree object from the script tag
      if (typeof window.Cashfree !== 'function') {
        throw new Error('Cashfree SDK not loaded. Please add the script tag to your index.html.');
      }

      const cashfree = new window.Cashfree({
        mode: 'sandbox', // Use 'production' for live payments
      });
      
      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self', // or '_blank'
      });
      
      // The onPaymentSuccess callback would typically be handled
      // on the return_url page after Cashfree redirects back.
      onPaymentSuccess();

    } catch (err) {
      console.error('Payment Error:', err);
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // --- The rest of your beautiful UI code remains the same ---
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

      {/* Payment Container */}
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
        animation: 'fadeIn 0.8s ease-out'
      }} className="card">
        
        {/* Back Button */}
        <button
          onClick={onPaymentCancel}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            zIndex: 20
          }}
        >
          ←
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '300',
            color: 'white',
            letterSpacing: '0.1em',
            margin: 0
          }}>
            Secure Payment
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: '300',
            marginTop: '0.5rem',
            letterSpacing: '0.05em'
          }}>
            Powered by Cashfree
          </p>
        </div>

        {/* Order Summary */}
        <div style={{
          marginBottom: '2rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '300',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Order Summary
          </h3>
          
          {/* Cart Items */}
          <div style={{
            marginBottom: '1rem'
          }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div>
                  <div style={{
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '300'
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.75rem',
                    fontWeight: '300'
                  }}>
                    Qty: {item.quantity}
                  </div>
                </div>
                <div style={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '300'
                }}>
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: '400'
            }}>
              Total Amount
            </div>
            <div style={{
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: '400'
            }}>
              ₹{calculateTotal()}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            color: '#ff6b6b',
            fontSize: '0.875rem',
            fontWeight: '300',
            textAlign: 'center',
            marginBottom: '1rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {error}
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading}
          style={{
            width: '100%',
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: '300',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isLoading ? 0.7 : 1
          }}
          className="btn-primary"
        >
          {isLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>

        {/* Security Notice */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'rgba(255, 255, 255, 0.5)',
          lineHeight: '1.4'
        }}>
          <p style={{ margin: '0 0 0.5rem 0' }}>
            🔒 Your payment is secured by Cashfree
          </p>
          <p style={{ margin: 0 }}>
            All transactions are encrypted and secure
          </p>
        </div>
      </div>

      <style jsx>{`
        .btn-primary:hover:not(:disabled) {
          background: white !important;
          color: black !important;
          border-color: white !important;
          transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
            padding: 0.875rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentGateway;
