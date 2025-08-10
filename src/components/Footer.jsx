const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sample Pack</h3>
          <p>
            Premium music samples crafted for modern producers. 
            Professional quality sounds for every genre and style.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <a href="#" style={{ fontSize: '1.5rem' }}>🎵</a>
            <a href="#" style={{ fontSize: '1.5rem' }}>🎧</a>
            <a href="#" style={{ fontSize: '1.5rem' }}>🎹</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Products</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#shop">Sample Packs</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#shop">Drum Kits</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#shop">Melody Packs</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#shop">FX Libraries</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#contact">Contact Us</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#help">Help Center</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#faq">FAQ</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#tutorials">Tutorials</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Company</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#about">About Us</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#blog">Blog</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#careers">Careers</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#press">Press</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#terms">Terms of Service</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#license">License Agreement</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#refund">Refund Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Sample Pack. All rights reserved. Professional music samples for producers worldwide.</p>
      </div>
    </footer>
  );
};

export default Footer; 