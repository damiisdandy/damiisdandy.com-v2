import { graphql, Link } from 'gatsby';
import React, { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import useColorMode from '../hooks/useColorMode';

interface FrontmatterSlug extends Frontmatter {
  slug: string;
}

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
          autoFocus
          placeholder="Search for article"
        />
      </motion.div>
      {keyword.length >= 3 && posts.length === 0 ? (
        <h1>No article matches "{keyword}" :(</h1>
      ) : (
        <div className="posts">
          {posts.map(el => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="post"
              key={el.title}
            >
              <div className="image">
                <img src={el.image} alt={`${el.title} poster`} />
              </div>
              <div className="body">
                <Link to={`/articles${el.slug}`}>{el.title}</Link>
                <p>{el.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
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
