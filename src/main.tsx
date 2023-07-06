import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 去掉React.StrictMode（会带来许多问题），「调用Graphql接口2」包裹ApolloProvider，其他地方都能用到
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
