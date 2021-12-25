import React from 'react';
import useColorMode from '../../../hooks/useColorMode';
import useDisclosure from '../../../hooks/useDisclosure';
import { BiSun, BiMoon } from 'react-icons/bi';
import Sidebar from './Sidebar';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';

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
    url: '/contact',
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
  const { isOpen, toggle } = useDisclosure(false);
  const { pathname } = useLocation();
  return (
    <nav className="Navbar">
      <Burger isActive={isOpen} action={toggle} />
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
      <Sidebar urls={LINKS} isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
