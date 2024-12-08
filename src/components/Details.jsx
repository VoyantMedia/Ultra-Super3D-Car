import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Details.css'; // Import the CSS file for styling

const Details = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="details-container">
      <div className="video-thumbnail">
        <img src="/BMW-M4-4k.jpg" alt="Video Thumbnail" />
        <button className="play-button">▶</button>
      </div>
      <div className="text-section">
        <h1 className="title">The Supercar Experience</h1>
        <p className="body-text">
          Discover the unparalleled performance and elegance of our supercars. 
          Experience the thrill of driving a machine engineered for excellence.
        </p>
      </div>
      <button className="close-button" onClick={handleClose}>✖</button>
    </div>
  );
};

export default Details;
