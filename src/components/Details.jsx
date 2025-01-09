import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Details = () => {
  const navigate = useNavigate(); // Hook to navigate back

  return (
    <motion.div 
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Close Button */}
      <motion.button 
        className="close-button"
        onClick={() => navigate('/')} // Navigate back to the home page
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span>×</span>
      </motion.button>

      {/* Content Grid: Text and Image Side by Side */}
      <motion.div 
        className="content-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {/* Text Section */}
        <motion.div 
          className="text-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1>BMW M4 Competition</h1>
          <p>
            The BMW M4 Competition is a high-performance sports car that combines cutting-edge technology with breathtaking design. 
            With its powerful engine, precise handling, and luxurious interior, the M4 Competition delivers an unparalleled driving experience. 
            Whether you're on the track or the open road, this car is designed to thrill.
          </p>
          <p>
            Key features include a 3.0-liter TwinPower Turbo inline-6 engine, adaptive M suspension, and the latest in BMW's driver-assistance technologies. 
            The M4 Competition is not just a car—it's a statement.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="image-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <img src="/BMW-M4-4k.jpg" alt="BMW M4 Competition" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Details;