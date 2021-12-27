import React from 'react';
import { Link } from 'gatsby';

const Sidebar = ({
  isOpen,
  urls,
  action,
}: {
  isOpen: boolean;
  urls: { name: string; url: string }[];
  action: () => void;
}) => {
  return (
    <div className={`Sidebar ${isOpen && 'active'}`}>
      {urls.map(el => (
        <Link onClick={action} className="link" to={el.url} key={el.url}>
          {el.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
