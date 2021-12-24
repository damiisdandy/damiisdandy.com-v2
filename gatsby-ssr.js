// normalize CSS across browsers
import './src/styles/normalize.scss';
// custom CSS styles
import './src/styles/style.scss';
// Highlighting for code blocks
import 'prismjs/themes/prism.css';

import React from 'react';
import Layout from './src/components/Layout';
import { GlobalStoreProvider } from './src/context';

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return <GlobalStoreProvider>{element}</GlobalStoreProvider>;
};
