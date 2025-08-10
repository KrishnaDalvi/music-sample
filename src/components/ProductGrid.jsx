import { useState } from 'react';
import { products } from '../data/products';
import ProductDetail from './ProductDetail';

const ProductGrid = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    setSelectedProduct(null);
  };

  return (
    <section id="shop" style={{
      padding: '6rem 1rem',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Moving Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        {/* Floating Lines */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '20%',
          width: '1px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.02)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          width: '2px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.015)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '70%',
          right: '5%',
          width: '1px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.01)',
          animation: 'float 12s ease-in-out infinite'
        }}></div>
        
        {/* Floating Dots */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '3px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '60%',
          right: '15%',
          width: '2px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '50%',
          animation: 'float 9s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '85%',
          left: '20%',
          width: '1px',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.015)',
          borderRadius: '50%',
          animation: 'float 18s ease-in-out infinite'
        }}></div>

        {/* Subtle Grid Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(rgba(255, 255, 255, 0.005) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.005) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'slide 25s linear infinite'
        }}></div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '5rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: '300',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
            color: 'white'
          }}>
            Featured Packs
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300',
            padding: '0 1rem'
          }}>
            Discover our handpicked collection of premium sample packs, 
            crafted by professional producers and sound designers.
          </p>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          padding: '0 0.5rem'
        }}>
          {products.slice(0, 6).map((product) => (
            <div 
              key={product.id} 
              className="card product-card"
              onClick={() => handleProductClick(product)}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div className="product-image" style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  borderRadius: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    color: 'rgba(255, 255, 255, 0.3)',
                    fontWeight: '300',
                    letterSpacing: '0.2em',
                    textAlign: 'center'
                  }}>
                    {product.category}
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem'
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
                </div>
              </div>

              {/* Product Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{
                  fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
                  fontWeight: '300',
                  color: 'white',
                  transition: 'color 0.3s ease',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em'
                }}>
                  {product.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.9rem)',
                  fontWeight: '300'
                }}>
                  {product.description}
                </p>
                
                {/* Price and Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  marginTop: 'auto',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    fontSize: 'clamp(1.25rem, 3.5vw, 1.5rem)',
                    fontWeight: '300',
                    color: 'white'
                  }}>
                    ${product.price}
                  </div>
                  <div style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: '300'
                  }}>
                    {product.sampleCount} samples
                  </div>
                </div>

                {/* Additional Features */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                  color: 'rgba(255, 255, 255, 0.4)',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  fontWeight: '300',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span>{product.bpm} BPM</span>
                  <span>{product.fileSize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button 
            className="btn-secondary" 
            onClick={() => window.location.href = '#all-packs'}
            style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            View All Packs
          </button>
        </div>

        {/* Features Section */}
        <div style={{
          marginTop: '6rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          padding: '0 1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(60px, 15vw, 80px)',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>01</span>
            </div>
            <h3 style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '0.75rem'
            }}>Professional Quality</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.6',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9rem)',
              fontWeight: '300'
            }}>
              All samples are professionally recorded and mastered to industry standards.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(60px, 15vw, 80px)',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>02</span>
            </div>
            <h3 style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '0.75rem'
            }}>Instant Download</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.6',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9rem)',
              fontWeight: '300'
            }}>
              Get your samples immediately after purchase with instant download access.
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 'clamp(60px, 15vw, 80px)',
              height: 'clamp(60px, 15vw, 80px)',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>03</span>
            </div>
            <h3 style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '0.75rem'
            }}>Royalty Free</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.6',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9rem)',
              fontWeight: '300'
            }}>
              Use our samples in your commercial projects without any additional fees.
            </p>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default ProductGrid; 