import React from 'react';
import { IconType } from 'react-icons';
import { BsInstagram, BsTwitter, BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaDev } from 'react-icons/fa';

const SOCIALS: {
  icon: IconType;
  url: string;
}[] = [
  {
    icon: BsInstagram,
    url: 'https://www.instagram.com/damil0la.jpg/',
  },
  {
    icon: BsTwitter,
    url: 'https://twitter.com/realdamiisdandy',
  },
  {
    icon: BsGithub,
    url: 'https://github.com/damiisdandy',
  },
  {
    icon: BsLinkedin,
    url: 'https://www.linkedin.com/in/damiisdandy',
  },
  {
    icon: FaDev,
    url: 'https://dev.to/damiisdandy',
  },
];

const date = new Date();

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Icons">
        {SOCIALS.map(el => (
          <a
            key={el.url}
            href={el.url}
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <el.icon />
          </a>
        ))}
      </div>
      <p className="copyright">&copy; damiisdandy {date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
