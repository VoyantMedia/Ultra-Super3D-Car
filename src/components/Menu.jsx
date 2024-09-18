import React, { useRef, useEffect } from 'react';

const Menu = () => {
  const canvasRef = useRef(null);
  const shapesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let requestId = null;

    // Function to create a new shape object
    function createShape(x, y, dx, dy, size, type, rotation, color) {
      return { x, y, dx, dy, size, type, rotation, color, stacks: 0 };
    }

    // Function to create a new square shape
    function createSquare(x, y) {
      const dx = (Math.random() - 0.5) * 2;
      const dy = Math.random() * 2 + 1;
      const size = Math.random() * 30 + 20; // Random size between 20 and 50
      const color = getRandomColor();
      return createShape(x, y, dx, dy, size, 'square', 0, color);
    }

    // Function to create a new triangle shape
    function createTriangle(x, y) {
      const dx = (Math.random() - 0.5) * 2;
      const dy = Math.random() * 2 + 1;
      const size = Math.random() * 30 + 20; // Random size between 20 and 50
      const color = getRandomColor();
      return createShape(x, y, dx, dy, size, 'triangle', 0, color);
    }

    // Function to create a new hourglass shape
    function createHourglass(x, y) {
      const dx = (Math.random() - 0.5) * 2;
      const dy = Math.random() * 2 + 1;
      const size = Math.random() * 30 + 20; // Random size between 20 and 50
      const color = getRandomColor();
      return createShape(x, y, dx, dy, size, 'hourglass', 0, color);
    }

    // Function to create a new circle shape
    function createCircle(x, y) {
      const dx = (Math.random() - 0.5) * 2;
      const dy = Math.random() * 2 + 1;
      const radius = Math.random() * 30 + 20; // Random radius between 20 and 50
      const color = getRandomColor();
      return createShape(x, y, dx, dy, radius, 'circle', 0, color);
    }

    // Function to generate random RGB color
    function getRandomColor() {
      return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    // Function to draw the shapes on the canvas
    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapesRef.current.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.beginPath();
        switch (shape.type) {
          case 'square':
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            break;
          case 'triangle':
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            ctx.closePath();
            break;
          case 'hourglass':
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(shape.size / 2, 0);
            ctx.lineTo(0, shape.size / 2);
            ctx.lineTo(-shape.size / 2, 0);
            ctx.closePath();
            break;
          case 'circle':
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
            break;
          default:
            break;
        }
        ctx.fillStyle = shape.color;
        ctx.fill();
        ctx.restore();
      });
    }

    // Function to update the position and rotation of shapes
    function updateShapes() {
      shapesRef.current.forEach((shape) => {
        const distanceX = shape.x - mousePosRef.current.x;
        const distanceY = shape.y - mousePosRef.current.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const forceDirectionX = distanceX / distance;
        const forceDirectionY = distanceY / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;

        if (distance < maxDistance) {
          shape.dx += forceDirectionX * force;
          shape.dy += forceDirectionY * force;
        }

        shape.x += shape.dx;
        shape.y += shape.dy;

        shape.dx *= 0.95; // Apply friction
        shape.dy *= 0.95; // Apply friction

        shape.rotation += shape.dx * 0.05; // Adjust rotational speed as needed

        // Keep shapes within canvas bounds
        if (shape.x < 0) shape.x = canvas.width;
        if (shape.x > canvas.width) shape.x = 0;
        if (shape.y < 0) shape.y = canvas.height;
        if (shape.y > canvas.height) shape.y = 0;
      });
    }

    // Function to animate the shapes
    function animateShapes() {
      drawShapes();
      updateShapes();
      requestId = requestAnimationFrame(animateShapes);
    }

    // Initialize canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initial setup: create shapes
    for (let i = 0; i < 50; i++) {
      const randomX = Math.random() * canvas.width;
      const randomY = Math.random() * canvas.height;
      const shapeType = Math.random() < 0.25 ? 'square' : Math.random() < 0.5 ? 'triangle' : Math.random() < 0.75 ? 'hourglass' : 'circle';

      switch (shapeType) {
        case 'square':
          shapesRef.current.push(createSquare(randomX, randomY));
          break;
        case 'triangle':
          shapesRef.current.push(createTriangle(randomX, randomY));
          break;
        case 'hourglass':
          shapesRef.current.push(createHourglass(randomX, randomY));
          break;
        case 'circle':
          shapesRef.current.push(createCircle(randomX, randomY));
          break;
        default:
          break;
      }
    }

    // Start animation
    animateShapes();

    // Add mousemove event listener
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current.x = event.clientX - rect.left;
      mousePosRef.current.y = event.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      cancelAnimationFrame(requestId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, borderRadius: '10px' }}></canvas>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <h2>Menu Section</h2>
        <p>This is the menu section.</p>
      </div>
    </div>
  );
};

export default Menu;
