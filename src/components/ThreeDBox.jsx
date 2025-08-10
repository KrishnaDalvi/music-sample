import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RotatingBox() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!hovered) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  return (
    <group ref={meshRef}>
      {/* Main Box */}
      <Box
        args={[2, 2, 2]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.05 : 1}
      >
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.8}
          transparent={true}
          opacity={0.1}
        />
      </Box>

      {/* Wireframe effect */}
      <Box args={[2, 2, 2]}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </Box>

      {/* Sample Pack Text */}
      <Text
        position={[0, 0, 1.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        fontWeight={300}
      >
        SAMPLE
      </Text>
      <Text
        position={[0, -0.3, 1.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        fontWeight={300}
      >
        PACK
      </Text>

      {/* Music Note Icon */}
      <Text
        position={[0, 0.3, 1.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        opacity={0.7}
      >
        🎵
      </Text>
    </group>
  );
}

const ThreeDBox = () => {
  return (
    <div style={{ width: '350px', height: '350px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        
        <RotatingBox />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDBox; 