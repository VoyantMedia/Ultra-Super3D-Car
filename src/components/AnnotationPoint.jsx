import React, { useState } from 'react';
import { Html } from '@react-three/drei';

const AnnotationPoint = ({ position, content, onClick }) => {
  const [showContent, setShowContent] = useState(false);

  const handleAnnotationClick = () => {
    onClick(position);
    setShowContent(true);
  };

  const handleCloseClick = () => {
    setShowContent(false);
  };

  return (
    <>
      <mesh position={position} onClick={handleAnnotationClick}>
        <sphereGeometry args={[0.025, 16, 16]} /> {/* Reduced size */}
        <meshBasicMaterial color="white" /> {/* Changed color to white */}
      </mesh>
      {showContent && (
        <Html position={position}>
          <div className="annotation-content">
            <div className="annotation-close" onClick={handleCloseClick}>
              <div className="annotation-close-icon"></div>
            </div>
            <div className="annotation-text">
              <p>{content}</p>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default AnnotationPoint;
