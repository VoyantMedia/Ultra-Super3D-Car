// physics.js

// Constants
const GRAVITY = 0.2;
const FRICTION = 0.98;
const BALL_RADIUS = 20;
const BALL_COUNT = 10;
const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
               '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];

// Canvas setup
let canvas, ctx;

function initPhysics() {
  canvas = document.getElementById('physicsCanvas');
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create balls
  let balls = [];
  for (let i = 0; i < BALL_COUNT; i++) {
    const radius = BALL_RADIUS;
    const x = Math.random() * (canvas.width - 2 * radius) + radius;
    const y = Math.random() * (canvas.height - 2 * radius) + radius;
    const dx = (Math.random() - 0.5) * 5;
    const dy = (Math.random() - 0.5) * 5;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    balls.push({ x, y, dx, dy, radius, color });
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
      // Apply gravity
      ball.dy += GRAVITY;
      ball.y += ball.dy;
      
      // Apply friction
      ball.dx *= FRICTION;
      ball.x += ball.dx;

      // Collision detection with walls
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }

      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy * FRICTION;
      }

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();
    });
  }

  animate();
}

// Initialize physics when DOM is loaded
document.addEventListener('DOMContentLoaded', initPhysics);
