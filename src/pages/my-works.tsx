import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useColorMode from '../hooks/useColorMode';
import Seo from '../components/Seo';
import { graphql } from 'gatsby';

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

const WORKS: MyWork[] = [
  {
    name: 'Jetron Ticket',
    description:
      'A platform for you to discover, share and promote your events.',
    image: 'jetron-ticket',
    url: 'https://ticket.jetronmall.com',
  },
  {
    name: 'Brimble Website',
    description:
      'Spend less time on DevOps and more time building. The most efficient way to host & scale your web app.',
    image: 'brimble-client',
    url: 'https://dev.brimble.app',
  },
  {
    name: 'ToolBox',
    description:
      'With our services you can now Acquire/Request for skilled personnels in certian fields at the palm of your hands.',
    image: 'toolbox',
    url: 'https://toolbox-three.vercel.app/',
  },
  {
    name: 'Brimble App',
    description:
      'Spend less time on DevOps and more time building. The most efficient way to host & scale your web app.',
    image: 'brimble-app',
    url: 'https://www.brimble.app',
  },
  {
    name: 'Jetron Mall',
    description:
      'An intermediary online store making easy and stress-free exchange between brands and buyers.',
    image: 'jetron-mall',
    url: 'https://www.jetronmall.com',
  },
  {
    name: 'Outlawville',
    description: "Victon'y official website",
    image: 'victony',
    url: 'https://dev.brimble.app',
  },
  {
    name: 'Hoodini | damiisdandy',
    description:
      'Tranfer playlist from one streaming platform to another, stress free!',
    image: 'hoodini',
    url: 'https://hoodini.damiisdandy.com',
  },
  {
    name: 'Damiisdandy',
    description: 'My official website/portfolio',
    image: 'damiisdandy',
    url: 'https://www.victony.vercel.app',
  },
];

const MyWorks = ({ data }: { data: any }) => {
  const allMyWorks = useMemo(
    () =>
      WORKS.map(el => ({
        ...el,
        gatsbyImage: data.allImageSharp.edges.find((image: any) =>
          image.node.original.src.includes(el.image)
        ),
      })),
    [data]
  );

  const { isLightMode } = useColorMode();
  return (
    <>
      <Seo
        title="My Works"
        description="Websites made by Damilola Jerugba"
        image="/seo/my-works.png"
        pathname="/my-works"
      />
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
            Some of my freelance works
          </motion.p>
          <motion.p variants={unveilVariants} className="hint">
            Psst.. some are still in development
          </motion.p>
        </motion.div>
        <div className="works">
          {allMyWorks.map(el => (
            <div
              key={el.url}
              className="work"
              onClick={() => window.open(el.url, el.name)}
            >
              <p className="name">{el.name}</p>
              <p className="desc">{el.description}</p>
              <motion.div
                className="image"
                variants={imageVariants}
                initial="hide"
                whileInView="show"
                viewport={{ once: true }}
              >
                <GatsbyImage
                  style={{
                    width: '100%',
                  }}
                  image={el.gatsbyImage.node.gatsbyImageData}
                  alt={el.description}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyWorks;

export const pageQuery = graphql`
  query ImagesQuery {
    allImageSharp {
      edges {
        node {
          gatsbyImageData(width: 1080, placeholder: BLURRED, quality: 100)
          original {
            src
          }
        }
      }
    }
  }
`;
