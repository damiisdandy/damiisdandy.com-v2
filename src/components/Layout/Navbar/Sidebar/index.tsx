import React from 'react';
import { Link } from 'gatsby';

const Sidebar = ({
  isOpen,
  urls,
}: {
  isOpen: boolean;
  urls: { name: string; url: string }[];
}) => {
  return (
    <div className={`Sidebar ${isOpen && 'active'}`}>
      {urls.map(el => (
        <Link className="link" to={el.url} key={el.url}>
          {el.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
