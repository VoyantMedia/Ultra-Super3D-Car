import React, { useEffect, useState } from 'react';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import AnnotationPoint from './AnnotationPoint';

  
function FluorescentLight({ position, rotation, onClick }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        onClick(position);
      }}
    >
      <boxGeometry args={[1.5, 0.05, 0.3]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={3} />
    </mesh>
  );
}

function Model(props) {
  const { scene } = useGLTF('/bmw_m4.glb');
  const { camera, gl } = useThree();
  const [initialCameraPosition, setInitialCameraPosition] = useState(null);
  const controlsRef = React.useRef();

  useEffect(() => {
    if (scene) {
      scene.scale.set(0.1, 0.1, 0.1); // Adjust the scale as necessary
    }
  }, [scene]);

  // Set initial camera position once when scene is loaded
  useFrame(() => {
    if (scene && !initialCameraPosition) {
      setInitialCameraPosition(camera.position.clone());
    }
  });

  const handleClick = (point) => {
    const newPosition = new THREE.Vector3(...point);
    const offset = new THREE.Vector3(0, 3, 1); // Adjusted offset to control zoom level

    // Calculate finalPosition based on newPosition and offset
    const finalPosition = newPosition.clone().add(offset);

    // Ensure initialCameraPosition is set before using it
    if (initialCameraPosition) {
      // Apply a minimum distance constraint to avoid clipping the car model
      const minDistance = 2; // Adjust this value as necessary
      const distanceToCar = finalPosition.distanceTo(scene.position);

      if (distanceToCar < minDistance) {
        const direction = finalPosition.clone().sub(scene.position).normalize();
        finalPosition.copy(scene.position).add(direction.multiplyScalar(minDistance));
      }

      // Directly animate to finalPosition without additional zooming out
      animateCamera(camera.position.clone(), finalPosition);
    }
  };

  const animateCamera = (initialPosition, finalPosition) => {
    const duration = 1000; // Duration in milliseconds
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress * (2 - progress); // Ease-out effect

      camera.position.lerpVectors(initialPosition, finalPosition, easedProgress);
      camera.lookAt(finalPosition);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Positions and rotations for the fluorescent lights on the roof, closer to the car
  const lightPositions = [
    { position: [0, 1.5, 0.6], rotation: [0, 0, 0] }, // Center light
    { position: [0, 1.5, -0.1], rotation: [0, 0, 0] }, // Left light
    { position: [0, 1.5, -0.8], rotation: [0, 0, 0] }, // Right light
  ];

  // Positions for the annotation points on the car with example content
  const annotationPositions = [
    { position: [0.37, 0.1, 0.5], content: 'This is the first annotation.' },
    { position: [-0.5, 0.3, 0], content: 'This is the second annotation.' },
  ];

  return (
    <>
      {scene && (
        <>
          <primitive object={scene} {...props} />
          {lightPositions.map((point, index) => (
            <FluorescentLight
              key={index}
              position={point.position}
              rotation={point.rotation}
              onClick={handleClick}
            />
          ))}
          {annotationPositions.map((point, index) => (
            <AnnotationPoint
              key={index}
              position={point.position}
              content={point.content}
              onClick={handleClick}
            />
          ))}
          <OrbitControls 
            ref={controlsRef} 
            args={[camera, gl.domElement]} 
            minDistance={4} 
            maxDistance={10} 
          />
          <Environment files="/canary_wharf_4k.hdr" background={false} />
        </>
      )}
    </>
  );
}

export default Model;