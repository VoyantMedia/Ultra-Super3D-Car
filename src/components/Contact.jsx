import React, { useEffect, useRef } from 'react';

function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createTriangle = (size, color, position, rotation) => {
      const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      triangle.setAttribute('width', size);
      triangle.setAttribute('height', size);
      triangle.setAttribute('viewBox', '0 0 24 24');
      triangle.setAttribute('fill', color);
      triangle.classList.add('triangle');
      triangle.style.position = 'absolute';
      triangle.style.left = position.x;
      triangle.style.top = position.y;
      triangle.style.transform = `rotate(${rotation}deg)`;
      triangle.innerHTML = `
        <polygon points="12 2 2 22 22 22"></polygon>
      `;
      return triangle;
    };

    const triangles = [
      { size: 50, color: 'red', position: { x: '20%', y: '85%' }, rotation: 45 },
      { size: 100, color: 'blue', position: { x: '100px', y: '50px' }, rotation: 90 },
      { size: 150, color: 'green', position: { x: '50%', y: '100px' }, rotation: 135 },
      { size: 200, color: 'purple', position: { x: '70%', y: '250px' }, rotation: 200 },
    ];

    const container = containerRef.current;
    container.innerHTML = ''; // Clear the container before appending new triangles
    container.style.position = 'relative'; // Ensure container has relative positioning

    triangles.forEach(({ size, color, position, rotation }) => {
      const triangle = createTriangle(size, color, position, rotation);
      container.appendChild(triangle);
    });
  }, []);

  return (
    <div className="section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      ></div>
      <div style={formContainerStyle}>
        <div style={columnStyle}>
          <p>1234 Supercar Blvd<br />Cityville, ST 12345</p>
        </div>
        <div style={columnStyle}>
          <p>
            <a href="https://twitter.com/supercar" style={linkStyle}>Twitter</a><br />
            <a href="https://instagram.com/supercar" style={linkStyle}>Instagram</a><br />
            <a href="https://tiktok.com/@supercar" style={linkStyle}>TikTok</a>
          </p>
          <p>General enquiries<br /><a href="mailto:hello@supercar.com" style={linkStyle}>hello@supercar.com</a></p>
        </div>
        <div style={newsletterContainerStyle}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Subscribe to our newsletter</h2>
          <form style={newsletterFormStyle}>
            <div style={inputContainerStyle}>
              <input type="email" name="newsletterEmail" placeholder="Your Email" style={inputStyle} />
              <button type="submit" style={buttonStyle}>➔</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const formContainerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  padding: '40px',
  borderRadius: '10px',
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between',
};

const columnStyle = {
  flex: '1',
  margin: '0 10px',
  textAlign: 'left',
};

const newsletterContainerStyle = {
  flex: '1',
  margin: '0 10px',
  textAlign: 'center',
};

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
};

const inputStyle = {
  flex: '1',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '18px',
};

const newsletterFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const buttonStyle = {
  padding: '15px 30px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '24px',
  color: '#000',
};

const linkStyle = {
  color: '#007BFF',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
};

linkStyle[':hover'] = {
  textDecoration: 'underline',
  paddingLeft: '5px',
  transform: 'scale(1.1)',
};

export default Contact;
