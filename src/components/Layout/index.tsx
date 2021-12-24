import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useColorMode from '../../hooks/useColorMode';

const Layout: React.FC = ({ children }) => {
  const { isLightMode } = useColorMode();
  return (
    <div className={`Layout ${isLightMode && 'light'}`}>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
