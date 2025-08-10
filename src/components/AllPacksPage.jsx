import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductDetail from './ProductDetail';

const AllPacksPage = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'samples':
          return b.sampleCount - a.sampleCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setSelectedProduct(null);
  };

  return (
    <section style={{
      minHeight: '100vh',
      padding: '8rem 1rem 4rem 1rem',
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
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: '300',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            color: 'white'
          }}>
            All Sample Packs
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>
            Browse our complete collection of premium sample packs
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="Search sample packs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                color: 'white',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '1.25rem'
            }}>
              🔍
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                color: 'white',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300',
                cursor: 'pointer'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category} style={{ background: '#000000' }}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                color: 'white',
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: '300',
                cursor: 'pointer'
              }}
            >
              <option value="name" style={{ background: '#000000' }}>Sort by Name</option>
              <option value="price-low" style={{ background: '#000000' }}>Price: Low to High</option>
              <option value="price-high" style={{ background: '#000000' }}>Price: High to Low</option>
              <option value="samples" style={{ background: '#000000' }}>Most Samples</option>
            </select>
          </div>

          {/* Results Count */}
          <div style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
            fontWeight: '300'
          }}>
            {filteredAndSortedProducts.length} pack{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {filteredAndSortedProducts.map((product) => (
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

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: '0.5'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '300',
              color: 'white',
              marginBottom: '1rem'
            }}>
              No packs found
            </h3>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '2rem'
            }}>
              Try adjusting your search or filter criteria
            </p>
            <button 
              className="btn-secondary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSortBy('name');
              }}
              style={{
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
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

export default AllPacksPage; 