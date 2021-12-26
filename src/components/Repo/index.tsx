import React from 'react';
import { motion } from 'framer-motion';
import { BsGithub, BsStar } from 'react-icons/bs';
import LinkButton from '../UI/LinkButton';

const scaleVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

interface RepoProps {
  fullName: string;
  name: string;
  description: string;
  url: string;
  stars: number;
}

const Repo = ({ fullName, description, name, stars, url }: RepoProps) => {
  return (
    <motion.div
      variants={scaleVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '20%' }}
      className="Repo"
    >
      <div className="title">
        <BsGithub />
        <p>{fullName}</p>
      </div>
      <p className="name">{name}</p>
      <p className="description">{description}</p>
      <div className="bottom">
        <div className="star">
          <BsStar />
          <p className="star-num">{stars}</p>
        </div>
        <LinkButton href={url}>Learn more</LinkButton>
      </div>
    </motion.div>
  );
};

export default Repo;
