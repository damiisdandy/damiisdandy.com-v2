import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useColorMode from '../../hooks/useColorMode';
import { useGlobalStoreContext } from '../../context';
import { CONTEXT_PERSIST_NAME } from '../../config';

const Layout: React.FC = ({ children }) => {
  const { isLightMode } = useColorMode();
  const { dispatch } = useGlobalStoreContext();

  useEffect(() => {
    // fetch localStorage data and fill global state
    const storedData = localStorage.getItem(CONTEXT_PERSIST_NAME);
    if (storedData)
      dispatch({
        type: 'INIT',
        payload: JSON.parse(storedData),
      });
  }, []);
  return (
    <div className={`root ${isLightMode && 'light'}`}>
      <Navbar />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
