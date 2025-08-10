import { useState } from 'react';

const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [playingAudio, setPlayingAudio] = useState(null);

  const handleAudioPlay = (audioUrl) => {
    if (playingAudio === audioUrl) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(audioUrl);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0',
                fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                fontWeight: '300',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {product.category}
              </span>
              <span style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                fontWeight: '300'
              }}>
                {product.sampleCount} samples
              </span>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {product.title}
            </h1>
            
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '2rem'
            }}>
              {product.longDescription}
            </p>
          </div>

          {/* Product Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
            marginBottom: '3rem',
            padding: 'clamp(1rem, 3vw, 2rem)',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div>
              <h4 style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem'
              }}>
                BPM Range
              </h4>
              <p style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300',
                color: 'white'
              }}>
                {product.bpm}
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem'
              }}>
                Key
              </h4>
              <p style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300',
                color: 'white'
              }}>
                {product.key}
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem'
              }}>
                File Size
              </h4>
              <p style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300',
                color: 'white'
              }}>
                {product.fileSize}
              </p>
            </div>
            
            <div>
              <h4 style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem'
              }}>
                Price
              </h4>
              <p style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                fontWeight: '300',
                color: 'white'
              }}>
                ${product.price}
              </p>
            </div>
          </div>

          {/* Audio Previews */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Sample Previews
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {product.previews.map((preview, index) => (
                <div key={index} style={{
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                      fontWeight: '300',
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>
                      {preview.name}
                    </h4>
                    <p style={{
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontWeight: '300'
                    }}>
                      Duration: {preview.duration}
                    </p>
                  </div>
                  
                  <audio
                    className="audio-player"
                    controls
                    preload="none"
                    onPlay={() => handleAudioPlay(preview.url)}
                    onPause={() => setPlayingAudio(null)}
                    onEnded={() => setPlayingAudio(null)}
                    style={{
                      width: '100%',
                      height: 'clamp(32px, 8vw, 40px)'
                    }}
                  >
                    <source src={preview.url} type="audio/wav" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '1.5rem'
            }}>
              Features
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {product.features.map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                  }}>✓</span>
                  <span style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '300'
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn-primary" 
              onClick={handleAddToCart}
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              Add to Cart - ${product.price}
            </button>
            <button className="btn-secondary" style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)'
            }}>
              Download Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 