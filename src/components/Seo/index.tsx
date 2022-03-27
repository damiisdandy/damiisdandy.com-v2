import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import useColorMode from '../../hooks/useColorMode';

const thisDate = new Date();

const Seo = ({ title, description, article, image, author, date }: Seo) => {
  const { href, host } = useLocation();
  const { site } = useStaticQuery(query);
  const { isLightMode } = useColorMode();
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    buildTime,
  } = site.siteMetadata;

  const seo: Seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image ? image : defaultImage,
  };

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    headline: seo.title,
    inLanguage: 'en',
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    copyrightHolder: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    copyrightYear: thisDate.getFullYear(),
    creator: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    publisher: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    datePublished: date ? date : buildTime,
    dateModified: date ? date : buildTime,
    image: {
      '@type': 'ImageObject',
      url: `https://www.damiisdandy.com${seo.image}`,
    },
  };

  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': siteUrl,
        name: 'Home',
      },
    },
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': siteUrl + '/my-works',
        name: 'My Works',
      },
    },
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': siteUrl,
        name: siteUrl + '/articles',
      },
    },
  ];

  let schemaArticle = null;

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author ? author : 'Damilola Jerugba',
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author ? author : 'Damilola Jerugba',
      },
      copyrightYear: thisDate.getFullYear(),
      creator: {
        '@type': 'Person',
        name: author ? author : 'Damilola Jerugba',
      },
      publisher: {
        '@type': 'Organization',
        name: author ? author : 'Damilola Jerugba',
        logo: {
          '@type': 'ImageObject',
          url: `https://www.damiisdandy.com${seo.image}`,
        },
      },
      datePublished: date ? date : buildTime,
      dateModified: date ? date : buildTime,
      description: seo.description,
      headline: seo.title,
      inLanguage: 'en',
      url: `https://www.damiisdandy.com`,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: `https://www.damiisdandy.com${seo.image}`,
      },
      mainEntityOfPage: `https://www.damiisdandy.com`,
    };
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': `https://www.damiisdandy.com`,
        name: seo.title || defaultTitle,
      },
      position: 2,
    });
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta charSet="utf-8" />
      <meta content="ie=edge" httpEquiv="x-ua-compatible" />
      <meta content="initial-scale=1, width=device-width" name="viewport" />
      <link rel="canonical" href={href} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={`https://www.damiisdandy.com${seo.image}`} />
      {/* PWA */}
      <meta content={isLightMode ? '#4daddb' : '#ffe367'} name="theme-color" />
      <meta
        content={isLightMode ? '#4daddb' : '#ffe367'}
        name="msapplication-TileColor"
      />
      <meta
        content={isLightMode ? '#4daddb' : '#ffe367'}
        name="msapplication-TileColor"
      />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="damiisdandy" name="application-name" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        content={isLightMode ? '' : ''}
        name="apple-mobile-web-app-status-bar-style"
      />
      <meta content="damiisdandy" name="apple-mobile-web-app-title" />
      {/* open graph */}
      <meta content="website" property="og:type" />
      <meta content="en-US" property="og:locale" />
      <meta property="og:url" content={`https://www.damiisdandy.com`} />
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && (
        <meta
          property="og:image"
          content={`https://www.damiisdandy.com${seo.image}`}
        />
      )}
      {/* twitter */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && (
        <meta
          name="twitter:image"
          content={
            seo.image.startsWith('http')
              ? seo.image
              : `https://www.damiisdandy.com${seo.image}`
          }
        />
      )}
      {/* Insert schema.org data conditionally (webpage/article) + everytime (breadcrumbs) */}
      {!article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </script>
      )}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaArticle)}
        </script>
      )}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
};

export default Seo;

const query = graphql`
  query SEO {
    site {
      buildTime: buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        title
        titleTemplate
        description
        siteUrl
        image
        twitterUsername
        colorTheme
      }
    }
  }
`;
