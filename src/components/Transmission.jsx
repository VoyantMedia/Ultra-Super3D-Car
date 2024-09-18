import React, { useEffect, useRef } from 'react';

function Transmission() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createHourglass = (size, color, position, rotation) => {
      const hourglass = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      hourglass.setAttribute('width', size);
      hourglass.setAttribute('height', size);
      hourglass.setAttribute('viewBox', '0 0 24 24');
      hourglass.setAttribute('fill', color);
      hourglass.classList.add('hourglass');
      hourglass.style.position = 'absolute';
      hourglass.style.left = position.x;
      hourglass.style.top = position.y;
      hourglass.style.transform = `rotate(${rotation}deg)`;
      hourglass.innerHTML = `
        <path d="M6 2h12v2a5 5 0 0 1-1.45 3.55L13 12l3.55 4.45A5 5 0 0 1 18 20v2H6v-2a5 5 0 0 1 1.45-3.55L11 12 7.45 7.55A5 5 0 0 1 6 4V2z"></path>
      `;
      return hourglass;
    };

    const hourglasses = [
      { size: 70, color: 'red', position: { x: '20%', y: '85%' }, rotation: 45 },
      { size: 100, color: 'blue', position: { x: '100px', y: '50px' }, rotation: 90 },
      { size: 150, color: 'green', position: { x: '50%', y: '100px' }, rotation: 135 },
      { size: 500, color: 'purple', position: { x: '70%', y: '250px' }, rotation: 200 },
    ];

    const container = containerRef.current;
    container.innerHTML = ''; // Clear the container before appending new hourglasses
    container.style.position = 'relative'; // Ensure container has relative positioning

    hourglasses.forEach(({ size, color, position, rotation }) => {
      const hourglass = createHourglass(size, color, position, rotation);
      container.appendChild(hourglass);
    });
  }, []);

  return (
    <div className="section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      ></div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <h2>Transmission Section</h2>
        <p>This is the transmission section.</p>
      </div>
    </div>
  );
}

export default Transmission;
