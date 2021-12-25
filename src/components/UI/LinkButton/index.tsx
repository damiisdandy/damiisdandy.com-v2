import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

interface LinkButtonProps {
  children: ReactNode;
  href: string;
}

const LinkButton = ({ children, href }: LinkButtonProps) => {
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="LinkButton"
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link to={href} className="LinkButton">
        {children}
      </Link>
    );
  }
};

export default LinkButton;
