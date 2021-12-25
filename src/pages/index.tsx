import React, { useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import useColorMode from '../hooks/useColorMode';
import useFetch from '../hooks/useFetch';
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsStar,
  BsTwitter,
} from 'react-icons/bs';
import LinkButton from '../components/UI/LinkButton';
import { FaDev } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { OFFICIAL_MAIL } from '../config';
import Seo from '../components/Seo';

const FEATURED_REPOS = [
  'use-pagination',
  'context-api-typescript',
  'zero-billion',
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

const date = new Date();

const Home = () => {
  const { isLightMode } = useColorMode();
  const { data, error } = useFetch(
    'https://api.github.com/users/damiisdandy/repos'
  );

  useEffect(() => {}, [isLightMode]);

  return (
    <>
      <Seo
        title="Home"
        description="A short overview about Damilola Jerugba"
        image="/seo/index.png"
      />
      <div className="Home">
        <div className="Heading section">
          <div className="image">
            <StaticImage
              layout="fullWidth"
              objectFit="cover"
              src="../images/me.jpg"
              alt="drawing of me (cartoon)"
              placeholder="blurred"
            />
          </div>
          <div className="intro">
            <h1>damilola jerugba</h1>
            <h2>Full stack developer {isLightMode ? ' 💙' : '⚡'}</h2>
            <p className="about">
              Hey! Fun fact, I'm in love with programming as whole, especially{' '}
              <b>Web Development</b> (and anime), I build high performating web
              applications that meets my client's needs. I also love sharing my
              knowledge so I write dev{' '}
              <Link className="my-link" to="/articles">
                articles.
              </Link>
            </p>
          </div>
        </div>
        <div className="WhatIDo section">
          <h1>what i do</h1>
          <div className="Talents">
            <div className="talent">
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
            </div>
            <div className="talent">
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
            </div>
            <div className="talent">
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
            </div>
            <div className="talent">
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
            </div>
          </div>
        </div>
        <div className="Articles section">
          <h1>featured articles</h1>
        </div>
        <div className="About section">
          <h1>about me</h1>
          <p className="story">
            Hey 👋🏿, My name is Damilola Onaopemipo Jerugba. I am a{' '}
            <b>Fullstack web developer</b>, <b>Photographer</b>,{' '}
            <b>Graphic designer</b>, and <b>Digital artist</b>. I own a startup
            called Jetron Mall, which comprises an
            <a
              href="https://www.jetronmall.com"
              target="_blank"
              rel="noopener noreferrer"
              className="my-link"
            >
              E-commerce
            </a>{' '}
            section and{' '}
            <a
              href="https://ticket.jetronmall.com"
              target="_blank"
              rel="noopener noreferrer"
              className="my-link"
            >
              Jetron Ticket
            </a>
            . I have {date.getFullYear() - 2017}+ years of programming
            experience. I love to write dev articles. I majored in Mechanical
            Engineering. I currently work as a Software Engineer 🎉.
          </p>
        </div>
        <div id="contact-me" className="Contact section">
          <h1>Contact Me</h1>
          <h2>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${OFFICIAL_MAIL}`}
              className="my-link"
            >
              {OFFICIAL_MAIL}
            </a>
          </h2>
          <div className="Social">
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
          </div>
        </div>
        <div className="Github section">
          <h1>featured repos</h1>
          {!data && !error ? (
            <div className="loader">
              <BsGithub className="gray-text pulse" />
            </div>
          ) : error ? (
            <div className="error">
              <h4>Problem fetching Github repos :(</h4>
            </div>
          ) : (
            <div className="Repos">
              {data
                .filter((el: any) => FEATURED_REPOS.includes(el.name))
                .sort(
                  (a: any, b: any) => b.stargazers_count - a.stargazers_count
                )
                .map((repo: any) => (
                  <div key={repo.id} className="repo">
                    <div className="title">
                      <BsGithub />
                      <p>{repo.full_name}</p>
                    </div>
                    <p className="name">{repo.name}</p>
                    <p className="description">{repo.description}</p>
                    <div className="bottom">
                      <div className="star">
                        <BsStar />
                        <p className="star-num">{repo.stargazers_count}</p>
                      </div>
                      <LinkButton href={repo.html_url}>Learn more</LinkButton>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
