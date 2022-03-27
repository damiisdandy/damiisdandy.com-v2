declare module '*.scss';

interface Seo {
  title: string;
  image?: string;
  description?: string;
  pathname: string;
}

interface Store {
  isLightmode: boolean;
  isSidebarOpen: boolean;
}
type ActionTypes = 'INIT' | 'TOGGLE_MODE' | 'SET_MODE' | 'TOGGLE_SIDEBAR' | 'SET_SIDEBAR';

interface Action {
  type: ActionTypes;
  payload?: any;
}

type Reducer = (state: Store, action: Action) => Store;


interface Frontmatter {
  title: string;
  description: string;
  date: string;
  repo: string;
  author: string;
  image: string;
}

interface FrontmatterSlug extends Frontmatter {
  slug: string;
}

interface MarkdownRemark {
  id: string;
  frontmatter: Frontmatter;
  excerpt: any;
  html: string;
  timeToRead: number;
  fields: {
    slug: string;
  }
}

interface SiteMetaData {
  title: string
  description: string
  author: {
    name: string;
    summary: string;
  }
  siteUrl: string
  social: Social
  titleTemplate: string
  url: string
  image: string
  twitterUsername: string
  colorTheme: string
}

interface BlogPost {
  site: SiteMetaData;
  markdownRemark: MarkdownRemark;
  previous: MarkdownRemark;
  next: MarkdownRemark;
}

interface MyWork {
  name: string
  description: string
  image: string
  url: string
}