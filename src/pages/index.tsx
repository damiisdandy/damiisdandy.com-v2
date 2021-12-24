import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import useColorMode from '../hooks/useColorMode';

const Home = () => {
  const { isLightMode } = useColorMode();
  return (
    <div className="Home">
      <div className="Heading">
        <div className="image">
          <StaticImage
            layout="fullWidth"
            objectFit="cover"
            src="../images/me.jpg"
            alt="drawing of me (cartoon)"
            placeholder="blurred"
          />
        </div>
        <div className="intro">
          <h1>damilola jerugba</h1>
          <h2>Full stack developer {isLightMode ? ' 💙' : '⚡'}</h2>
          <p className="about">
            Hey! Fun fact, I'm in love with programming as whole, especially{' '}
            <b>Web Development</b> (and anime), I build high performating web
            applications that meets my client's needs. I also love sharing my
            knowledge so I write dev{' '}
            <Link className="my-link" to="/articles">
              articles.
            </Link>
          </p>
        </div>
      </div>
      <div className="WhatIDo">
        <h1>what i do</h1>
      </div>
    </div>
  );
};

export default Home;
