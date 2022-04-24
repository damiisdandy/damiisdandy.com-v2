import React from 'react';
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaDev } from 'react-icons/fa';
import { IconType } from 'react-icons';

const date = new Date();

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

const About = () => {
  return (
    <div className="About">
      <h1>about me</h1>
      <p>
        Hey 👋🏿, My name is Damilola Onaopemipo Jerugba. I am a{' '}
        <b>Full stack Developer</b>, <b>Technical writer</b>, and{' '}
        <b>Digital artist</b>. I have {date.getFullYear() - 2019}+&nbsp;years of
        programming experience and I love to write dev articles . My first
        experience coding was when my dad brought home an app called scratch ,
        the app showed me how to build games 👾 with simple building blocks. I
        was fully engulfed in it but that didn't last very long. Years later
        around August 2019 🕝, I started to learn ethical hacking and had a lot
        of fun learning it, till I realized I was limited to the tools I had, I
        wanted to build custom tools so began to learn python 🐍, this lead me
        to build a lot of scripts to automate stuff, I fell in love instantly
        and later moved to learn web development by building web applications
        with the web framework. Fast forward to 2020, Covid 🦠 hit, and I had
        all the time in the world, so I consumed a lot of courses on Udemy .
        After that, I've had a lot of opportunities to work with clients and
        companies. Since then I've been honing my skills and learning as I also
        taught others, I'm currently seeking a full-time role where I can help a
        company achieve its goals and build myself as a developer 👨🏾‍💻.
      </p>
    </div>
  );
};

export default About;
