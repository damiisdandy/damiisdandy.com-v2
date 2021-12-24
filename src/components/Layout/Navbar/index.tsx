import React from 'react';
import useColorMode from '../../../hooks/useColorMode';

const Navbar = () => {
  const { toggleMode } = useColorMode();
  return (
    <nav className="Navbar">
      navbar <button onClick={toggleMode}>mode</button>
    </nav>
  );
};

export default Navbar;
