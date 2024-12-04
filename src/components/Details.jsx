import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Make sure to install framer-motion

const Details = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button 
        className="close-button"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span>×</span>
      </motion.button>

      <div className="content-grid">
        <motion.div 
          className="video-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="video-thumbnail">
            <img src="/BMW-M4-4k.jpg" alt="BMW M4" />
            <div className="play-button">
              <span>▶</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-section"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1>BMW M4 Competition</h1>
          <p>Experience the pinnacle of automotive engineering with the BMW M4 Competition. 
             This masterpiece combines raw power with elegant design, delivering an 
             unmatched driving experience.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Details;
