import React, { useMemo } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import useColorMode from '../hooks/useColorMode';
import useFetch from '../hooks/useFetch';
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { FaDev } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { RoughNotation } from 'react-rough-notation';
import { OFFICIAL_MAIL } from '../config';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import Repo from '../components/Repo';
import Post from '../components/Post';
import Spotify from '../components/Spotify';

const FEATURED_REPOS = [
  'use-pagination',
  'context-api-typescript',
  'playlist-converter-api',
  'vlc-video-selector',
];

const SOCIALS: {
  icon: IconType;
  url: string;
}[] = [
  {
    icon: BsInstagram,
    url: 'https://www.instagram.com/damil0la.jpg/',
  },
  {
    icon: BsTwitter,
    url: 'https://twitter.com/realdamiisdandy',
  },
  {
    icon: BsGithub,
    url: 'https://github.com/damiisdandy',
  },
  {
    icon: BsLinkedin,
    url: 'https://www.linkedin.com/in/damiisdandy',
  },
  {
    icon: FaDev,
    url: 'https://dev.to/damiisdandy',
  },
];

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const unveilVariant = {
  hidden: {
    opacity: 0,
    y: '-30px',
  },
  show: {
    opacity: 1,
    y: '0px',
  },
};

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

const date = new Date();

const Home = ({ data: posts }: { data: any }) => {
  const recentPosts: FrontmatterSlug[] = useMemo(
    () =>
      posts.allMarkdownRemark.edges
        .map((el: any) => ({
          ...el.node.frontmatter,
          slug: el.node.fields.slug,
        }))
        .sort(
          (a: FrontmatterSlug, b: FrontmatterSlug) =>
            // @ts-ignore
            new Date(b.date) - new Date(a.date)
        )
        .slice(0, 4),
    [[posts]]
  );

  const { isLightMode } = useColorMode();
  const { data, error } = useFetch(
    'https://api.github.com/users/damiisdandy/repos?per_page=1000'
  );

  return (
    <>
      <Seo
        title="Home"
        description="An overview about Damilola Jerugba"
        image="/seo/index.png"
        pathname="/"
      />
      <div className="Home">
        <div className="Heading section" key={isLightMode.toString()}>
          <motion.div
            whileInView={{
              scale: [0, 1],
            }}
            viewport={{ once: true }}
            className="image"
          >
            {isLightMode ? (
              <StaticImage
                layout="fullWidth"
                objectFit="cover"
                src="../images/me/avatar/blue-bg.jpeg"
                alt="drawing of me with blue background"
                placeholder="blurred"
              />
            ) : (
              <StaticImage
                layout="fullWidth"
                objectFit="cover"
                src="../images/me/avatar/yellow-bg.jpeg"
                alt="drawing of me with blue background"
                placeholder="blurred"
              />
            )}
          </motion.div>
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="intro"
          >
            <motion.h1 variants={unveilVariant}>damilola jerugba</motion.h1>
            <motion.h2 variants={unveilVariant}>
              Full stack developer {isLightMode ? ' 💙' : '⚡'}
            </motion.h2>
            <motion.p variants={unveilVariant} className="about">
              Hey! I'm Damilola, I'm a{' '}
              <RoughNotation
                type="underline"
                show
                padding={1}
                color={isLightMode ? '#4daddb' : '#ffe367'}
                animationDelay={1000}
                strokeWidth={2}
              >
                Full&nbsp;stack&nbsp;developer{' '}
              </RoughNotation>{' '}
              who loves building things with code. I'm in love with programming
              as a whole, especially <b>Web Development</b>, I build high
              performant web applications that meets my client's needs. I also
              love sharing my knowledge, so I write dev{' '}
              <Link className="my-link" to="/articles">
                articles.
              </Link>
            </motion.p>
          </motion.div>
        </div>
        <div className="WhatIDo section">
          <h1>what i do</h1>
          <motion.div className="Talents">
            <motion.div
              variants={scaleVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '20%' }}
              className="talent"
            >
              <StaticImage
                src="../images/memoji/frontend.png"
                alt="my memoji love"
                className="image"
              />
              <h3>frontend development</h3>
              <p>
                I build fast, beautiful, SEO friendly frontend applications that
                suites your every need. With <span className="code">HTML</span>,{' '}
                <span className="code">CSS</span>,{' '}
                <span className="code">JavaScript</span>,{' '}
                <span className="code">ReactJS</span>,{' '}
                <span className="code">VueJs</span> and more.
              </p>
            </motion.div>
            <motion.div
              variants={scaleVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '20%' }}
              className="talent"
            >
              <StaticImage
                src="../images/memoji/backend.png"
                alt="my memoji love"
                className="image"
              />
              <h3>backend development</h3>
              <p>
                I build scalable, optimized, efficient backend applications
                powered by the latest technologies. With{' '}
                <span className="code">Python</span>,{' '}
                <span className="code">JavaScript</span>,{' '}
                <span className="code">NodeJs</span>,{' '}
                <span className="code">Django</span>,{' '}
                <span className="code">ExpressJs</span>,{' '}
                <span className="code">MongoDB</span>,{' '}
                <span className="code">PostgreSQL</span>,{' '}
                <span className="code">MySQL</span> and more.
              </p>
            </motion.div>
            <motion.div
              variants={scaleVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '20%' }}
              className="talent"
            >
              <StaticImage
                src="../images/memoji/articles.png"
                alt="my memoji love"
                className="image"
              />
              <h3>article writing</h3>
              <p>
                I learn new technologies and concepts every day, and I love
                sharing my knowledge with others. I write comprehensive dev
                articles for multiple companies. Check out some of my works at{' '}
                <a
                  className="my-link"
                  href="https://dev.to/damiisdandy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DEV.to
                </a>
              </p>
            </motion.div>
            <motion.div
              variants={scaleVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '20%' }}
              className="talent"
            >
              <StaticImage
                src="../images/memoji/scripting.png"
                alt="my memoji love"
                className="image"
              />
              <h3>scripting and bots</h3>
              <p>
                I write scripts and build bots to perform any task needed. I
                even once built a bot to help me select a random video from my
                laptop for when I want to eat and watch 🤡, check it out{' '}
                <a
                  className="my-link"
                  href="https://github.com/damiisdandy/VLC-VideosSelector"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                . I use languages like <span className="code">Python</span>,{' '}
                <span className="code">JavaScript</span>,{' '}
                <span className="code">C</span>,{' '}
                <span className="code">C#</span>,{' '}
                <span className="code">Arduino/C++</span> and more.
              </p>
            </motion.div>
          </motion.div>
        </div>
        <div className="About section">
          <h1>about me</h1>
          <motion.p
            whileInView={{
              opacity: [0, 1],
              y: ['-20px', '0px'],
            }}
            viewport={{ once: true, margin: '20%' }}
            className="story"
          >
            Hey 👋🏿, My name is Damilola Onaopemipo Jerugba. I am a{' '}
            <b>Full stack Developer</b>, <b>Technical writer</b>, and{' '}
            <b>Digital artist</b>. I have{' '}
            <RoughNotation
              type="box"
              show
              padding={[2, 4]}
              color={isLightMode ? '#4daddb' : '#ffe367'}
              animationDelay={1000}
              strokeWidth={1.5}
            >
              {date.getFullYear() - 2019}+&nbsp;years
            </RoughNotation>{' '}
            of programming experience and I love to write{' '}
            <Link className="my-link" to="/articles">
              dev articles
            </Link>
            .
            <br />
            <br />
            My first experience coding was when my dad brought home an app
            called{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://scratch.mit.edu/"
              className="my-link"
            >
              scratch
            </a>
            , the app showed me how to build games 👾 with simple building
            blocks. I was fully engulfed in it but that didn't last very long.
            <br />
            <br /> Years later around August 2019 🕝, I started to learn ethical
            hacking and had a lot of fun learning it, till I realized I was
            limited to the tools I had, I wanted to build custom tools so began
            to learn python 🐍, this lead me to build a lot of scripts to
            automate stuff, I fell in love instantly and later moved to learn
            web development by building web applications with the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.djangoproject.com/"
              className="my-link"
            >
              Django
            </a>{' '}
            web framework. <br />
            <br />
            Fast forward to 2020, Covid 🦠 hit, and I had all the time in the
            world, so I consumed a lot of courses on{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.udemy.com/"
              className="my-link"
            >
              Udemy
            </a>
            . After that, I've had a lot of opportunities to work with clients
            and companies.
            <br />
            <br /> Since then I've been honing my skills and learning as I also
            taught others, I'm currently seeking a full-time role where I can
            help a company achieve its goals and build myself as a developer 👨🏾‍💻.
          </motion.p>
        </div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          id="contact-me"
          className="Contact section"
        >
          <h1>Contact Me</h1>
          <motion.h2 variants={unveilVariant}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${OFFICIAL_MAIL}`}
              className="my-link"
            >
              {OFFICIAL_MAIL}
            </a>
          </motion.h2>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://calendly.com/damiisdandy/get-to-know-me"
            className="calendly"
          >
            Book a meeting
          </a>
          <motion.div variants={unveilVariant} className="Social">
            <p>Follow me on</p>
            <div className="socials">
              {SOCIALS.map(el => (
                <a
                  key={el.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={el.url}
                >
                  <el.icon />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        <div className="Articles section">
          <h1>recent articles</h1>
          <div className="posts">
            {recentPosts.map(el => (
              <Post key={el.title} {...el} />
            ))}
          </div>
        </div>
        <div className="Spotify section">
          <h1>spotify playlist</h1>
          <motion.div
            whileInView={{
              opacity: [0, 1],
              y: ['-20px', '0px'],
            }}
            viewport={{ once: true, margin: '20%' }}
            className="container"
          >
            <Spotify />
          </motion.div>
        </div>
        <div className="Github section">
          <h1>featured repos</h1>
          {!data && !error ? (
            <div className="loader">
              <BsGithub className="gray-text pulse" />
            </div>
          ) : error ? (
            <div className="error">
              <h4>problem fetching Github repos :(</h4>
            </div>
          ) : (
            <motion.div variants={containerVariant} className="Repos">
              {data
                .filter((el: any) => FEATURED_REPOS.includes(el.name))
                .sort(
                  (a: any, b: any) => b.stargazers_count - a.stargazers_count
                )
                .map((repo: any) => (
                  <Repo
                    key={repo.id}
                    description={repo.description}
                    fullName={repo.full_name}
                    name={repo.name}
                    stars={repo.stargazers_count}
                    url={repo.html_url}
                  />
                ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

export const pageQuery = graphql`
  query BlogPostQuery {
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
