import { useState } from 'react';
import { api } from '../services/api';

const SignupPage = ({ onSignup, onNavigateToLogin, onBackToHome }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate all fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      // Call onSignup with the user data from the backend
      onSignup(response.user);
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
      paddingTop: '10vh',
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

      {/* Signup Form Container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: 'clamp(2rem, 5vw, 3rem)',
        borderRadius: '0',
        backdropFilter: 'blur(20px)',
        maxWidth: '450px',
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
            Create your account
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Name Fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: '300',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em'
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
                placeholder="First name"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: '300',
                marginBottom: '0.5rem',
                letterSpacing: '0.05em'
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
                placeholder="Last name"
              />
            </div>
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.875rem',
              fontWeight: '300',
              marginBottom: '0.5rem',
              letterSpacing: '0.05em'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              placeholder="Confirm your password"
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
            {isLoading ? 'Creating account...' : 'Create Account'}
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
            Already have an account?{' '}
            <button 
              onClick={onNavigateToLogin}
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
              Sign in
            </button>
          </p>
          <p style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.5)',
            lineHeight: '1.4'
          }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
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
          
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage; 