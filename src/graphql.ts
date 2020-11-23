import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getIdToken } from './clients/firebase';

const uri = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://raiinmaker.api.dragonchain.com';
    case 'development':
      return 'https://server-staging.api.raiinmaker.com';
    case 'test':
      return 'http://localhost:4000';
  }
};

export const httpLink = createHttpLink({
  uri: `${uri()}/v1/admin/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
