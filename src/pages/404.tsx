import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Seo from '../components/Seo';

const PageNotFound = () => {
  return (
    <>
      <Seo
        title="404"
        description="Page not found"
        image="../images/seo/404.png"
      />
      <div className="FourZeroFour">
        <div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </div>
        <StaticImage
          src="../images/illumi.jpg"
          alt="illumi with a weird face"
          placeholder="blurred"
          layout="fullWidth"
          className="image"
        />
      </div>
    </>
  );
};

export default PageNotFound;
