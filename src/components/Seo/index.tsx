import React, { FC } from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO: FC<Seo> = ({ description, image, title, pathname }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const metaImage = image
          ? image.startsWith('https')
            ? image
            : `${data.site.siteMetadata.siteUrl}${image}`
          : `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.image}`;
        const metaUrl = `${data.site.siteMetadata.siteUrl}${pathname}`;
        return (
          <Helmet
            htmlAttributes={{
              lang: 'en',
            }}
            title={title}
            titleTemplate={data.site.siteMetadata.titleTemplate}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:url`,
                content: metaUrl,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:creator`,
                content: `@${data.site.siteMetadata.social.twitter}`,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: 'google-site-verification',
                content: 'QlRmuLQWttdkbKlZ0ZwIBX3xv0M8ouqTW3wE2Eg_jKI',
              },
              {
                name: 'article:published_time',
                content: data.site.buildTime,
              },
            ].concat(
              metaImage
                ? [
                    {
                      property: `og:image`,
                      content: metaImage,
                    },
                    {
                      property: `og:image:alt`,
                      content: title,
                    },
                    {
                      name: `twitter:card`,
                      content: `summary_large_image`,
                    },
                  ]
                : [
                    {
                      name: `twitter:card`,
                      content: `summary`,
                    },
                  ]
            )}
          />
        );
      }}
    />
  );
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      buildTime: buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        title
        titleTemplate
        siteUrl
        description
        image
        social {
          twitter
        }
      }
    }
  }
`;
