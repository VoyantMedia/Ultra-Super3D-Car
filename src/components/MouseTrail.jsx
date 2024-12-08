import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MouseTrail = () => {
  const lightRef = useRef();
  const cubes = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1

      // Update light position
      if (lightRef.current) {
        lightRef.current.position.set(x * 10, y * 10, 5); // Adjust the multiplier for distance
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    // Optional: Add any animations or updates here
    cubes.current.forEach((cube) => {
      cube.rotation.x += 0.01; // Rotate the cubes
      cube.rotation.y += 0.01;
    });
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} intensity={1} distance={50} decay={2} />
      
      {/* Create multiple cubes */}
      {Array.from({ length: 10 }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => (cubes.current[index] = el)} // Store reference to each cube
          position={[Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5]} // Random positions
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={`hsl(${Math.random() * 360}, 100%, 50%)`} /> {/* Random color */}
        </mesh>
      ))}
    </>
  );
};

const MouseTrailScene = () => {
  return (
    <Canvas>
      <MouseTrail />
    </Canvas>
  );
};

export default MouseTrailScene; 