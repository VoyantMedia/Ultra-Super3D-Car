import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import About from './components/About';
import Transmission from './components/Transmission';
import Contact from './components/Contact';
import Menu from './components/Menu';
import Model from './components/Model';
import Details from './components/Details';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const scrollContainerRef = useRef(null);
  const modelSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const transmissionSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const menuSectionRef = useRef(null);

  const [activeSection, setActiveSection] = useState('model');
  const location = useLocation(); // Get the current route

  // Handle scroll to detect active section
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = scrollContainer;

      if (scrollLeft < clientWidth * 0.4) {
        setActiveSection('model');
      } else if (scrollLeft < clientWidth * 1.4) {
        setActiveSection('about');
      } else if (scrollLeft < clientWidth * 2.4) {
        setActiveSection('transmission');
      } else if (scrollLeft < clientWidth * 3.4) {
        setActiveSection('contact');
      } else if (scrollLeft < clientWidth * 4.4) {
        setActiveSection('menu');
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle route changes to update activeSection
  useEffect(() => {
    if (location.pathname === '/') {
      // When navigating back to the home page, reset the activeSection based on scroll position
      const scrollContainer = scrollContainerRef.current;
      const { scrollLeft, clientWidth } = scrollContainer;

      if (scrollLeft < clientWidth * 0.4) {
        setActiveSection('model');
      } else if (scrollLeft < clientWidth * 1.4) {
        setActiveSection('about');
      } else if (scrollLeft < clientWidth * 2.4) {
        setActiveSection('transmission');
      } else if (scrollLeft < clientWidth * 3.4) {
        setActiveSection('contact');
      } else if (scrollLeft < clientWidth * 4.4) {
        setActiveSection('menu');
      }
    }
  }, [location]);

  // Determine the navbar class based on the active section
  const navbarClass = activeSection === 'model' ? 'white-text' : 'black-text';

  return (
    <div className="home-page" style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      {/* Conditionally render the Navbar */}
      {location.pathname !== '/details' && (
        <Navbar
          scrollToRef={{
            modelSectionRef,
            aboutSectionRef,
            transmissionSectionRef,
            contactSectionRef,
            menuSectionRef,
          }}
          activeSection={activeSection}
          className={navbarClass} // Apply the dynamic class
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="scroll-container"
              style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', overflow: 'hidden' }}
              ref={scrollContainerRef}
            >
              <div className="section model" ref={modelSectionRef} style={{ position: 'relative', width: '100vw', height: '100vh' }}>
                <Canvas shadows camera={{ position: [-3, 0, 5], fov: 30 }}>
                  <color attach="background" args={['#101010']} />
                  <Stage environment={null}>
                    <Model scale={0.01} />
                  </Stage>
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                    position={[0, 1, 5]} // Adjust the initial position of the OrbitControls camera
                  />
                </Canvas>
                {activeSection === 'model' && (
                  <button
                    className="next-button"
                    onClick={() => scrollContainerRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 10.605 15.555">
                      <polygon points="2.828 15.555 10.605 7.776 2.828 0 0 2.828 4.949 7.776 0 12.727 2.828 15.555" fill="#ffffff" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="section about" ref={aboutSectionRef} style={{ width: '100vw', height: '100vh' }}>
                <About />
              </div>
              <div className="section transmission" ref={transmissionSectionRef} style={{ width: '100vw', height: '100vh' }}>
                <Transmission />
              </div>
              <div className="section contact" ref={contactSectionRef} style={{ width: '100vw', height: '100vh' }}>
                <Contact />
              </div>
              <div className="section menu" ref={menuSectionRef} style={{ width: '100vw', height: '100vh' }}>
                <Menu />
              </div>
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/transmission" element={<Transmission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
}

// Wrap the App component with the Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}