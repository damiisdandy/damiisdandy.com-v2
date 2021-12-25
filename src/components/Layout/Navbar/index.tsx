import React, { useEffect } from 'react';
import useColorMode from '../../../hooks/useColorMode';
import { BiSun, BiMoon } from 'react-icons/bi';
import Sidebar from './Sidebar';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { motion } from 'framer-motion';
import { useGlobalStoreContext } from '../../../context';

const LINKS: { name: string; url: string }[] = [
  {
    name: 'home',
    url: '/',
  },
  {
    name: 'my works',
    url: '/my-works',
  },
  {
    name: 'resume',
    url: '/#',
  },
  {
    name: 'articles',
    url: '/articles',
  },
  {
    name: 'contact me',
    url: '/#contact-me',
  },
];

const Burger = ({
  isActive,
  action,
}: {
  isActive: boolean;
  action: () => void;
}) => {
  return (
    <button
      aria-label="sidebar toggler"
      onClick={action}
      className={`Burger ${isActive && 'active'}`}
    >
      <div></div>
      <div></div>
    </button>
  );
};

const ColorModeSwitch = () => {
  const { isLightMode, toggleMode } = useColorMode();
  return (
    <button
      className="Colormode"
      onClick={toggleMode}
      aria-label="toggle color-mode"
    >
      {isLightMode ? <BiMoon /> : <BiSun />}
    </button>
  );
};

const Navbar = () => {
  const { pathname, href } = useLocation();
  const { state, dispatch } = useGlobalStoreContext();

  const toggle = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

  useEffect(() => {
    dispatch({
      type: 'SET_SIDEBAR',
      payload: false,
    });
  }, [href]);
  return (
    <>
      <motion.nav
        animate={{
          y: ['-100%', '0%'],
        }}
        className="Navbar"
      >
        <Burger isActive={state.isSidebarOpen} action={toggle} />
        <div className="Links">
          {LINKS.map(el => (
            <Link
              key={el.url}
              to={el.url}
              className={`link ${pathname === el.url && 'active'}`}
            >
              {el.name}
            </Link>
          ))}
        </div>
        <ColorModeSwitch />
      </motion.nav>
      <Sidebar urls={LINKS} isOpen={state.isSidebarOpen} />
    </>
  );
};

export default Navbar;
