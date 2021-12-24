import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Home = () => {
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
          <h2>Full stack developer ⚡</h2>
          <p className="about">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus
            quidem quia ipsa ex, eius, tempore nisi provident, inventore sunt
            eum sint dolorum harum corrupti!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
