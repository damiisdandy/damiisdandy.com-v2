import React from 'react';
import useColorMode from '../../../hooks/useColorMode';
import useDisclosure from '../../../hooks/useDisclosure';
import { BiSun, BiMoon } from 'react-icons/bi';
import Sidebar from './Sidebar';

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
  return (
    <nav className="Navbar">
      <Burger isActive={isOpen} action={toggle} />
      <ColorModeSwitch />
      <Sidebar isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
