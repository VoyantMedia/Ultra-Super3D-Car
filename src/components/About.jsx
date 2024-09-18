import React, { useRef, useEffect } from 'react';

const About = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ballsRef = useRef([]);
  const targetBallsRef = useRef([]);
  const requestIdRef = useRef(null);
  const aboutRef = useRef(null);
  const observerRef = useRef(null);
  const interactionRadius = 10; // Radius of mouse interaction zone
  const gravity = 0.1; // Gravity effect

  // Function to create a new ball object
  function createBall(x, y, dx, dy, radius, color) {
    return { x, y, dx, dy, radius, color, isStopped: false, stopTime: null };
  }

  // Function to create a target ball with specified position, radius, and color
  function createTargetBall(x, y, radius, color) {
    return createBall(x, y, 0, 0, radius, color);
  }

  // Function to create multiple target balls at different positions and sizes
  function createTargetBalls(canvasWidth, canvasHeight) {
    const centerBall = createTargetBall(canvasWidth / 2.5, canvasHeight / 1.01, 80, 'blue'); // Center ball with radius 80 and blue color
    const topLeftBall = createTargetBall(canvasWidth / 8, canvasHeight / 4, 100, 'green'); // Top-left ball with radius 100 and green color
    const topRightBall = createTargetBall((canvasWidth * 3.1) / 4, canvasHeight / 4, 150, 'red'); // Top-right ball with radius 150 and red color

    return [centerBall, topLeftBall, topRightBall];
  }

  // Function to create a new bouncing ball with fixed smaller radius
  function createBouncingBall(x, y) {
    const dx = (Math.random() - 0.5) * 4;
    const dy = Math.random() * 4 + 1;
    const radius = Math.random() * 20 + 10; // Random radius between 10 and 30
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    return createBall(x, y, dx, dy, radius, color);
  }

  // Function to check collision between two balls
  function checkCollision(ball1, ball2) {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ball1.radius + ball2.radius;
  }

  // Function to check collision between a ball and the mouse pointer
  function checkMouseCollision(ball) {
    const dx = ball.x - mouseRef.current.x;
    const dy = ball.y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ball.radius + interactionRadius;
  }

  // Function to animate the balls
  function animate(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw target balls
    targetBallsRef.current.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });

    // Update and draw bouncing balls
    ballsRef.current.forEach((ball, index) => {
      if (!ball.isStopped) {
        // Apply gravity
        ball.dy += gravity;
        ball.y += ball.dy;

        // Interaction with mouse pointer
        if (checkMouseCollision(ball)) {
          const angle = Math.atan2(ball.y - mouseRef.current.y, ball.x - mouseRef.current.x);
          const distance = ball.radius + interactionRadius;
          const overlap =
            distance - Math.sqrt((ball.x - mouseRef.current.x) ** 2 + (ball.y - mouseRef.current.y) ** 2);
          ball.x += Math.cos(angle) * overlap;
          ball.y += Math.sin(angle) * overlap;
          ball.dx = -ball.dx;
          ball.dy = -ball.dy;
        }

        // Check collision with bottom of canvas
        if (ball.y + ball.radius >= canvas.height) {
          ball.dy = -ball.dy * 0.9; // Bounce back with some friction
          ball.dx *= 0.9; // Apply friction
          if (Math.abs(ball.dy) < 1) {
            ball.dy = 0;
            ball.isStopped = true;
            ball.stopTime = Date.now();
          }
        }

        // Check collision with walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
        }

        // Collision detection with target balls
        targetBallsRef.current.forEach((targetBall) => {
          if (checkCollision(ball, targetBall)) {
            // Calculate the overlap distance
            const dx = ball.x - targetBall.x;
            const dy = ball.y - targetBall.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const overlap = ball.radius + targetBall.radius - distance;

            // Separate the balls along the collision axis
            const angle = Math.atan2(dy, dx);
            ball.x += overlap * Math.cos(angle);
            ball.y += overlap * Math.sin(angle);

            // Reflect velocities
            const normalX = dx / distance;
            const normalY = dy / distance;
            const dVelocity = (ball.dx - targetBall.dx) * normalX + (ball.dy - targetBall.dy) * normalY;

            ball.dx -= dVelocity * normalX;
            ball.dy -= dVelocity * normalY;
          }
        });

        // Update ball position
        ball.x += ball.dx;
      } else {
        // Remove the ball after it has been stopped for a while
        if (Date.now() - ball.stopTime > 2000) {
          ballsRef.current.splice(index, 1);
        }
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });

    // Occasionally add a new bouncing ball
    if (ballsRef.current.length < 10 && Math.random() < 0.01) {
      const randomX = Math.random() * canvas.width;
      ballsRef.current.push(createBouncingBall(randomX, -20));
    }

    requestIdRef.current = requestAnimationFrame(() => animate(ctx, canvas));
  }

  const startAnimation = (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // Set canvas height to full window height

    targetBallsRef.current = createTargetBalls(canvas.width, canvas.height);

    const initialBalls = [];
    for (let i = 0; i < 10; i++) {
      const randomX = Math.random() * canvas.width;
      initialBalls.push(createBouncingBall(randomX, -20));
    }
    ballsRef.current = initialBalls;

    animate(ctx, canvas);
  };

  const stopAnimation = () => {
    if (requestIdRef.current) {
      cancelAnimationFrame(requestIdRef.current);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation(canvas);
        } else {
          stopAnimation();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    if (aboutRef.current) {
      observerRef.current.observe(aboutRef.current);
    }

    const resizeHandler = () => {
      stopAnimation();
      startAnimation(canvas);
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resizeHandler);
      if (observerRef.current && aboutRef.current) {
        observerRef.current.unobserve(aboutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseRef.current = { x, y };
  };

  return (
    <div ref={aboutRef} className="section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', margin: '0 auto', position: 'absolute', top: 0, left: 0 }}
        onMouseMove={handleMouseMove}
      ></canvas>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, color: 'black', textAlign: 'center' }}>
        <img src="/BMW-M4-4k.jpg" alt="Video Thumbnail" style={{ width: '200px', marginBottom: '20px' }} />
        <h1>The Machine</h1>
        <p>An engineering marvel, built for elegance and performance.</p>
      </div>
    </div>
  );
};

export default About;
