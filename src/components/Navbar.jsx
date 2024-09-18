import React from 'react';

const Navbar = ({ scrollToRef, activeSection }) => {
  const handleScrollTo = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`navbar ${activeSection === 'model' ? 'white-text' : 'black-text'}`}>
      <ul>
        <li className="menu-item" onClick={() => handleScrollTo(scrollToRef.modelSectionRef)}>
          Home
        </li>
        <li className="menu-item" onClick={() => handleScrollTo(scrollToRef.menuSectionRef)}>
          Menu
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
