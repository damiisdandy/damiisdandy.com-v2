import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { useLocation } from '@reach/router';
import { motion } from 'framer-motion';
import useColorMode from '../hooks/useColorMode';

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

const imageVariants = {
  hide: {
    rotateX: '-60deg',
  },
  show: {
    rotateX: '0deg',
    transition: {
      duration: 0.4,
    },
  },
};

const MyWorks = () => {
  const { href } = useLocation();
  const { isLightMode } = useColorMode();
  return (
    <div className="MyWorks">
      <motion.div
        key={`MyWorks-${isLightMode}`}
        variants={containerVariants}
        whileInView="show"
        initial="hide"
        viewport={{ once: true }}
      >
        <motion.h1 variants={unveilVariants} className="header">
          work showcase
        </motion.h1>
        <motion.p variants={unveilVariants} className="desc">
          Here is a gallery of my works
        </motion.p>
        <motion.p variants={unveilVariants} className="hint">
          Psst.. some are still in development
        </motion.p>
      </motion.div>
      <div className="works">
        <div className="work">
          <p className="name">JetronTicket</p>
          <p className="desc">Event hosting and ticketing service</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() =>
                window.open('https://ticket.jetronmall.com', '_newtab')
              }
              src="../images/work/jetron-ticket.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
        <div className="work">
          <p className="name">ToolBox</p>
          <p className="desc">Online Artisan finder</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() =>
                window.open('https://toolbox-three.vercel.app/', '_newtab')
              }
              src="../images/work/toolbox.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
        <div className="work">
          <p className="name">Victon'y Official Website</p>
          <p className="desc">Artiste's personal website</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() =>
                window.open('https://victony.vercel.app/', '_newtab')
              }
              src="../images/work/victony.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
        <div className="work">
          <p className="name">Brimble</p>
          <p className="desc">Web hosting service</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() => window.open('https://dev.brimble.app', '_newtab')}
              src="../images/work/brimble.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
        <div className="work">
          <p className="name">JetronMall</p>
          <p className="desc">Online shopping mall</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() =>
                window.open('https://www-jetronmall.vercel.app', '_newtab')
              }
              src="../images/work/jetron-mall.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
        <div className="work">
          <p className="name">This Website</p>
          <p className="desc">My personal website and blog</p>
          <motion.div
            className="image"
            variants={imageVariants}
            initial="hide"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StaticImage
              onClick={() => window.open(href, '_newtab')}
              src="../images/work/mine.png"
              alt="JetronTicket webpage"
              placeholder="blurred"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyWorks;
