import React from 'react';
import ReactDOM from 'react-dom';
import whyDidYouRender from '@welldone-software/why-did-you-render';

import App from '@app/index';
import './index.css'

import 'moment/locale/vi';
// eslint-disable-next-line
import '@assets/styles/styles.less';
import 'react-day-picker/lib/style.css';

import 'semantic-ui-css/semantic.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    // trackAllPureComponents: true,
  });
}
const client = new QueryClient()
ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
, document.getElementById('root'));
