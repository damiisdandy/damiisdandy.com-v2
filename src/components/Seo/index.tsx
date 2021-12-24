import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ title, description, article, image, author, date }: Seo) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    colorTheme,
    buildTime,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image:
      image && image.includes('http')
        ? image
        : `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
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
    copyrightYear: '2021',
    creator: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    publisher: {
      '@type': 'Person',
      name: 'Damilola Jerugba',
    },
    datePublished: buildTime,
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${seo.image}`,
    },
  };

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ];

  let schemaArticle = null;

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: '2019',
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${seo.image}`,
        },
      },
      datePublished: date,
      dateModified: date,
      description: seo.description,
      headline: seo.title,
      inLanguage: 'en',
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    };
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
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
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={`${seo.image}`} />
      {/* PWA */}
      <meta content={colorTheme} name="theme-color" />
      <meta content={colorTheme} name="msapplication-TileColor" />
      <meta content={colorTheme} name="msapplication-TileColor" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="OutlawVille" name="application-name" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content={colorTheme} name="apple-mobile-web-app-status-bar-style" />
      <meta content="OutlawVille" name="apple-mobile-web-app-title" />
      {/* open graph */}
      <meta content="website" property="og:type" />
      <meta content="en-US" property="og:locale" />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={`${seo.image}`} />}
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
      {seo.image && <meta name="twitter:image" content={`${seo.image}`} />}
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
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
        colorTheme
      }
    }
  }
`;
