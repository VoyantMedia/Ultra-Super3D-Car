// src/components/Ball.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';

const Ball = ({ position, args = [0.5, 32, 32], color = 'red' }) => {
  const ref = useRef();
  const [sphereProps] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.5],
  }));

  return (
    <mesh ref={ref} {...sphereProps}>
      <sphereGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Ball;
