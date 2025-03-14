import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './styles/Layout.css';

const Layout = () => {
  const mainContainerRef = useRef(null);

  useEffect(() => {
    const mainContainer = mainContainerRef.current;
    if (mainContainer) {
      const handleMouseMove = (e) => {
        const rect = mainContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mainContainer.style.setProperty('--mouse-x', `${x}px`);
        mainContainer.style.setProperty('--mouse-y', `${y}px`);
      };
      mainContainer.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        mainContainer.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className='container'>
      <Header className="header-container" />
      <main ref={mainContainerRef} className='main-container'>
        <Outlet />
      </main>
      <Footer className="footer-container" />
    </div>
  );
};

export default Layout;
