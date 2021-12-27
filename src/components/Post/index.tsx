import React from 'react';
import { motion } from 'framer-motion';
import { Link, navigate } from 'gatsby';

interface PostProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const Post = ({ title, description, image, slug }: PostProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="Post"
      key={title}
      onClick={() => navigate(`/articles${slug}`)}
    >
      <div className="image">
        <img src={image} alt={`${title} poster`} />
      </div>
      <div className="body">
        <Link to={`/articles${slug}`}>{title}</Link>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Post;
