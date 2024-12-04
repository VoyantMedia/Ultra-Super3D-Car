import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BlobTransition.css';

const BlobTransition = ({ triggerTransition }) => {
  const blobRef = useRef(null);

  useEffect(() => {
    if (triggerTransition) {
      // Blob entrance animation
      gsap.fromTo(blobRef.current, 
        { scale: 0, borderRadius: '50%' }, 
        { scale: 10, duration: 1.2, ease: 'power2.inOut' }
      );

      // Exit the blob after a delay
      gsap.to(blobRef.current, {
        scale: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        delay: 0.5,
      });
    }
  }, [triggerTransition]);

  return <div ref={blobRef} className="blob" />;
};

export default BlobTransition;
