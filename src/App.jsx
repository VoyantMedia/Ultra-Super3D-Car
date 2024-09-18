import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import About from './components/About';
import Transmission from './components/Transmission';
import Contact from './components/Contact';
import Menu from './components/Menu';
import Model from './components/Model';
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorActive, setCursorActive] = useState(false);

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
      } else {
        setActiveSection('menu');
      }
    };

    const handleWheel = (event) => {
      if (activeSection === 'model' || event.deltaY === 0) return;

      event.preventDefault();
      scrollContainer.scrollBy({
        left: event.deltaY,
        behavior: 'smooth',
      });
    };

    const handleTouchMove = (event) => {
      if (activeSection === 'model' || event.touches.length === 0) return;

      event.preventDefault();
      const delta = event.touches[0].clientY;
      scrollContainer.scrollLeft += delta * 0.4;
    };

    const handleMouseDown = (event) => {
      const { target } = event;
      if (target.closest('.model')) return; // Exclude model section from dragging

      setIsDragging(true);
      setStartX(event.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      const x = event.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scroll speed here
      scrollContainer.scrollLeft = scrollLeft - walk;

      // Update active section based on scroll position
      const { scrollLeft, clientWidth } = scrollContainer;
      if (scrollLeft < clientWidth * 0.4) {
        setActiveSection('model');
      } else if (scrollLeft < clientWidth * 1.4) {
        setActiveSection('about');
      } else if (scrollLeft < clientWidth * 2.4) {
        setActiveSection('transmission');
      } else if (scrollLeft < clientWidth * 3.4) {
        setActiveSection('contact');
      } else {
        setActiveSection('menu');
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleDoubleClickDrag = (event) => {
      event.preventDefault();
      if (event.detail === 2) { // Check if it's a double-click
        const x = event.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed here
        scrollContainer.scrollLeft = scrollLeft - walk;
      }
    };

    const handleMouseMoveCursor = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseEnterCursor = () => {
      setCursorActive(true);
    };

    const handleMouseLeaveCursor = () => {
      setCursorActive(false);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.addEventListener('wheel', handleWheel);
    scrollContainer.addEventListener('touchmove', handleTouchMove);
    scrollContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('dblclick', handleDoubleClickDrag);
    document.addEventListener('mousemove', handleMouseMoveCursor);
    document.addEventListener('mouseenter', handleMouseEnterCursor);
    document.addEventListener('mouseleave', handleMouseLeaveCursor);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('wheel', handleWheel);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('dblclick', handleDoubleClickDrag);
      document.removeEventListener('mousemove', handleMouseMoveCursor);
      document.removeEventListener('mouseenter', handleMouseEnterCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveCursor);
    };
  }, [activeSection, isDragging, startX, scrollLeft]);

  const handleNextButtonClick = () => {
    const nextSection = modelSectionRef.current.nextSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-page" style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <Navbar
        scrollToRef={{
          modelSectionRef,
          aboutSectionRef,
          transmissionSectionRef,
          contactSectionRef,
          menuSectionRef,
        }}
        activeSection={activeSection}
      />
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
              onClick={handleNextButtonClick}
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
      <div
        className={`liquid-cursor ${cursorActive ? 'active' : ''}`}
        style={{ top: cursorPosition.y, left: cursorPosition.x }}
      >
        <div className="liquid"></div>
      </div>
    </div>
  );
}

export default App;
