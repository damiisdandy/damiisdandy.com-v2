import { graphql, navigate, Link } from 'gatsby';
import React, { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import useColorMode from '../hooks/useColorMode';
import Seo from '../components/Seo';
import Post from '../components/Post';

const containerVariants = {
  hide: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const unveilVariants = {
  hide: {
    y: -20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

const Articles = ({ data }: { data: any }) => {
  const rawData: FrontmatterSlug[] = data.allMarkdownRemark.edges.map(
    (el: any) => ({ ...el.node.frontmatter, slug: el.node.fields.slug })
  );
  const { isLightMode } = useColorMode();
  const [posts, setPosts] = useState<FrontmatterSlug[]>(rawData);
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (keyword.length >= 3) {
      setPosts(
        rawData.filter(el =>
          el.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setPosts(rawData);
    }
    setKeyword(e.target.value);
  };

  return (
    <>
      <Seo
        title="My Articles"
        description="Articles written by Damilola Jerugba"
        image="/seo/articles.png"
      />
      <div className="Articles">
        <motion.div
          key={`Articles-${isLightMode}`}
          variants={containerVariants}
          whileInView="show"
          initial="hide"
          viewport={{ once: true }}
        >
          <motion.h1 variants={unveilVariants} className="heading">
            My Articles ✍🏿
          </motion.h1>
          <motion.input
            variants={unveilVariants}
            className="input"
            value={keyword}
            onChange={handleChange}
            type="text"
            placeholder="Search for article"
          />
        </motion.div>
        {keyword.length >= 3 && posts.length === 0 ? (
          <h1>No article matches "{keyword}" :(</h1>
        ) : (
          <div className="posts">
            {posts.map(el => (
              <Post key={el.title} {...el} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Articles;

export const pageQuery = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            author
            date
            description
            image
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
