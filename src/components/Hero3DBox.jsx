import { useState, useEffect } from 'react';

const Hero3DBox = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile) return; // Disable mouse tracking on mobile
      
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized between -1 and 1)
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1rem',
      paddingTop: '8rem',
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
        zIndex: -1
      }}>
        {/* Floating Lines */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '2px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.03)',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '1px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.02)',
          animation: 'float 6s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '20%',
          width: '3px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.02)',
          animation: 'float 10s ease-in-out infinite'
        }}></div>
        
        {/* Floating Dots */}
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '25%',
          width: '4px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '40%',
          right: '10%',
          width: '2px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '70%',
          left: '5%',
          width: '3px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '50%',
          animation: 'float 15s ease-in-out infinite'
        }}></div>

        {/* Subtle Grid Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'slide 20s linear infinite'
        }}></div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '2rem' : '4rem',
        alignItems: 'center'
      }}>
        {/* Left Side - Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '1.5rem' : '2rem',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '300',
            lineHeight: '0.9',
            letterSpacing: '-0.02em',
            color: 'white',
            margin: 0
          }}>
            Sample<br />
            <span style={{ opacity: 0.7 }}>Pack</span>
          </h1>
          
          <p style={{
            fontSize: isMobile ? 'clamp(1rem, 4vw, 1.125rem)' : 'clamp(1.125rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: '300',
            lineHeight: '1.6',
            maxWidth: isMobile ? '100%' : '500px',
            margin: 0
          }}>
            Premium music samples crafted for modern producers
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            justifyContent: isMobile ? 'center' : 'flex-start',
            flexWrap: 'wrap'
          }}>
            <button className="btn-primary">
              Explore
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Interactive 3D Box */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100%',
          order: isMobile ? -1 : 0
        }}>
          <div 
            style={{
              width: isMobile ? '250px' : '400px',
              height: isMobile ? '250px' : '400px',
              position: 'relative',
              transformStyle: 'preserve-3d',
              cursor: isMobile ? 'default' : 'pointer',
              transition: 'transform 0.3s ease',
              transform: isMobile ? 'rotateY(15deg) rotateX(15deg)' : `rotateY(${mousePosition.x * 30}deg) rotateX(${-mousePosition.y * 30}deg)`
            }}
          >
            {/* Front Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translateZ(${isMobile ? '90px' : '150px'})`,
              fontSize: isMobile ? '1.5rem' : '2rem',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                fontSize: isMobile ? '2.5rem' : '4rem', 
                marginBottom: isMobile ? '0.5rem' : '1rem',
                transition: 'transform 0.3s ease'
              }}>🎵</div>
              <div style={{ 
                fontSize: isMobile ? '0.875rem' : '1.5rem', 
                fontWeight: '300' 
              }}>SAMPLE</div>
              <div style={{ 
                fontSize: isMobile ? '0.875rem' : '1.5rem', 
                fontWeight: '300' 
              }}>PACK</div>
            </div>

            {/* Back Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateZ(${isMobile ? '-90px' : '-150px'}) rotateY(180deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '3rem',
              transition: 'all 0.3s ease'
            }}>
              🎧
            </div>

            {/* Right Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateX(${isMobile ? '90px' : '150px'}) rotateY(90deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '3rem',
              transition: 'all 0.3s ease'
            }}>
              🎹
            </div>

            {/* Left Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateX(${isMobile ? '-90px' : '-150px'}) rotateY(-90deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '3rem',
              transition: 'all 0.3s ease'
            }}>
              🥁
            </div>

            {/* Top Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateY(${isMobile ? '-90px' : '-150px'}) rotateX(90deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '3rem',
              transition: 'all 0.3s ease'
            }}>
              🎚️
            </div>

            {/* Bottom Face */}
            <div style={{
              position: 'absolute',
              width: isMobile ? '180px' : '300px',
              height: isMobile ? '180px' : '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateY(${isMobile ? '90px' : '150px'}) rotateX(-90deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2rem' : '3rem',
              transition: 'all 0.3s ease'
            }}>
              🎛️
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          from { transform: translateX(0px) translateY(0px); }
          to { transform: translateX(-50px) translateY(-50px); }
        }
        
        @media (max-width: 768px) {
          /* Hide some background elements on mobile for better performance */
          .floating-elements > div:nth-child(n+4) {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero3DBox; 