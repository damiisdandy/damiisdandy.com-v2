import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import useColorMode from '../../hooks/useColorMode';
import { useGlobalStoreContext, initialState } from '../../context';
import { CONTEXT_PERSIST_NAME } from '../../config';
import { Helmet } from 'react-helmet';
import { IoIosArrowUp } from 'react-icons/io';
import useScroll from '../../hooks/useScroll';

const Layout: React.FC = ({ children }) => {
  const { isLightMode } = useColorMode();
  const { dispatch, state } = useGlobalStoreContext();
  const { ratio, position } = useScroll();

  useEffect(() => {
    // fetch localStorage data and fill global state
    const rawLocalData = localStorage.getItem(CONTEXT_PERSIST_NAME);
    const localData = rawLocalData ? JSON.parse(rawLocalData) : initialState;
    const returnValue: Store = { ...initialState, ...localData };
    dispatch({
      type: 'INIT',
      payload: { ...returnValue, isSidebarOpen: false },
    });
  }, []);
  return (
    <>
      <Helmet
        htmlAttributes={{
          class: state.isSidebarOpen ? 'no-scroll' : 'scroll',
        }}
      />
      <div className={`root ${isLightMode && 'light'}`}>
        <div className="container">
          <Navbar />
          <div className="children">{children}</div>
          <Footer />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`scroll-to-top ${
              (ratio > 0.6 || position > 700) && 'active'
            }`}
          >
            <IoIosArrowUp />
          </button>
        </div>
      </div>
    </>
  );
};

export default Layout;
