// Machine.jsx

import React from 'react';
import { Link } from 'react-router-dom'; 

function Machine() {
  return (
    <div className="machine-container">
      <h1>Machine Page</h1>
      <Link to="/Details"> 
        <div
          className="thumbnail"
          style={{
            cursor: 'pointer',
            padding: '20px',
            border: '1px solid #ccc',
            textAlign: 'center',
            background: '#f0f0f0'
          }}
        >
          <p>Thumbnail (Click Me to see Details)</p>
        </div>
      </Link>
      <button className="centered-button">Click to this Section</button>
    </div>
  );
}

export default Machine;