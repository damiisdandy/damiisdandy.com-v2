import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';
import { StaticImage } from 'gatsby-plugin-image';
import useFetch from '../hooks/useFetch';
import { BsGithub, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Repo from '../components/Repo';
import useColorMode from '../hooks/useColorMode';

const BlogPost = ({ data }: { data: BlogPost }) => {
  const { isLightMode } = useColorMode();
  const frontmatter = data.markdownRemark.frontmatter;
  const { data: repoInfo, error } = useFetch(
    `https://api.github.com/repos/${frontmatter.repo}`
  );
  const markdown = data.markdownRemark.html;
  return (
    <>
      <Seo
        title={frontmatter.title}
        description={frontmatter.description}
        article
        image={frontmatter.image}
        author={frontmatter.author}
        date={frontmatter.date}
      />
      <div className="BlogPost">
        <h1 className="heading">{frontmatter.title}</h1>
        <div className="about">
          <div className="author">
            <StaticImage
              src="../images/me.jpg"
              alt="damilola jerugba"
              placeholder="blurred"
              className="image"
            />
            <span className="name">
              {frontmatter.author} / {frontmatter.date}
            </span>
          </div>
        </div>
        <img
          src={frontmatter.image}
          alt={`${frontmatter.title} poster`}
          className="banner"
        />
        <section
          className={`markdown ${isLightMode ? 'light' : 'dark'}`}
          dangerouslySetInnerHTML={{ __html: markdown }}
        />
        {frontmatter.repo &&
          (!repoInfo && !error ? (
            <div className="loader">
              <BsGithub className="gray-text pulse" />
            </div>
          ) : error ? (
            <div className="error">
              <h4>Problem fetching Github repos :(</h4>
            </div>
          ) : (
            <Repo
              description={repoInfo.description}
              fullName={repoInfo.full_name}
              name={repoInfo.name}
              stars={repoInfo.stargazers_count}
              url={repoInfo.html_url}
            />
          ))}
        <div className="pagination">
          {data.previous ? (
            <div className="button">
              <BsArrowLeftShort />
              <Link to={`/articles${data.previous.fields.slug}`}>Prev</Link>
            </div>
          ) : (
            <div></div>
          )}
          {data.next ? (
            <div className="button">
              <Link to={`/articles${data.next.fields.slug}`}>Next</Link>
              <BsArrowRightShort />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        author
        repo
        image
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
