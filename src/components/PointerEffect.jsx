import React, { useEffect, useRef } from 'react';
import './PointerEffect.css';

const PointerEffect = () => {
  const pointerRef = useRef(null);

  useEffect(() => {
    const pointer = pointerRef.current;

    const movePointer = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Using transform for better performance
      pointer.style.transform = `translate(${x - 50}px, ${y - 50}px)`;
    };

    window.addEventListener('mousemove', movePointer);

    return () => {
      window.removeEventListener('mousemove', movePointer);
    };
  }, []);

  return <div className="water-pointer" ref={pointerRef}></div>;
};

export default PointerEffect; 