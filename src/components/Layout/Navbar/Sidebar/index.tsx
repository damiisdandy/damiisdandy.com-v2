import React from 'react';

const Sidebar = ({
  isOpen,
  urls,
}: {
  isOpen: boolean;
  urls: { name: string; url: string }[];
}) => {
  return <div className={`Sidebar ${isOpen && 'active'}`}></div>;
};

export default Sidebar;
