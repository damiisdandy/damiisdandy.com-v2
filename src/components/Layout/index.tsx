import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useColorMode from '../../hooks/useColorMode';
import { useGlobalStoreContext } from '../../context';
import { CONTEXT_PERSIST_NAME } from '../../config';
import { Helmet } from 'react-helmet';

const Layout: React.FC = ({ children }) => {
  const { isLightMode } = useColorMode();
  const { dispatch, state } = useGlobalStoreContext();

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
    <>
      <Helmet
        bodyAttributes={{
          class: state.isSidebarOpen ? 'no-scroll' : 'scroll',
        }}
      />
      <div className={`root ${isLightMode && 'light'}`}>
        <div className="container">
          <Navbar />
          <div className="children">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
