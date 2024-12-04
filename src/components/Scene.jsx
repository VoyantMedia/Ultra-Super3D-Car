import * as THREE from 'three';
import { useEffect, useRef } from 'react';

// In your scene component
useEffect(() => {
    // ... existing scene setup ...

    const animate = () => {
        requestAnimationFrame(animate);
        // ... your other animations ...
        
        // Back to using renderer.render()
        renderer.render(scene, camera);
    };
    animate();
}, []); 