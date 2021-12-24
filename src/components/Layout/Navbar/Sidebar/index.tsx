import React from 'react';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return <div className={`Sidebar ${isOpen && 'active'}`}></div>;
};

export default Sidebar;
