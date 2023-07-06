import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * 「调用Graphql服务端接口1」初始化ApolloClient
 */
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
