import { useState } from 'react';
import { api } from '../services/api';

const LoginPage = ({ onLogin, onNavigateToSignup, onBackToHome }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      const response = await api.login({
        email: formData.email,
        password: formData.password
      });

      // Call onLogin with the user data from the backend
      onLogin(response.user);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '15vh',
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

      {/* Login Form Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '0',
        backdropFilter: 'blur(20px)',
        maxWidth: '400px',
        width: '100%',
        position: 'relative',
        top: '70px',
        zIndex: 10,
        animation: 'fadeIn 0.8s ease-out'
      }} className="card">
        
        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
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

        {/* Logo */}
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
            SP
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontWeight: '300',
            marginTop: '0.5rem',
            letterSpacing: '0.05em'
          }}>
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Email Input */}
          <div>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              fontWeight: '300',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '300',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              fontWeight: '300',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '300',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              color: '#ff6b6b',
              fontSize: '0.875rem',
              fontWeight: '300',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '300',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              opacity: isLoading ? 0.7 : 1
            }}
            className="btn-primary"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Additional Links */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: '300'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Don't have an account?{' '}
            <button 
              onClick={onNavigateToSignup}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: '400',
                transition: 'opacity 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'inherit'
              }}
            >
              Sign up
            </button>
          </p>
          <a href="#" style={{
            color: 'rgba(255, 255, 255, 0.6)',
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}>
            Forgot your password?
          </a>
        </div>
      </div>

      <style jsx>{`
        input:focus {
          border-color: rgba(255, 255, 255, 0.3) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .btn-primary:hover:not(:disabled) {
          background: white !important;
          color: black !important;
          border-color: white !important;
          transform: translateY(-2px);
        }
        
        a:hover, button:hover {
          opacity: 0.8;
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
          
          input {
            padding: 0.625rem;
            font-size: 0.8rem;
          }
          
          .btn-primary {
            padding: 0.625rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage; 