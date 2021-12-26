import React from 'react';
import Seo from '../components/Seo';

const PageNotFound = () => {
  return (
    <>
      <Seo title="404" description="Page not found" image="/seo/404.png" />
      <div className="FourZeroFour">
        <div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
