import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { firebase } from './firebase';

const uri = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://raiinmaker.api.dragonchain.com';
    case 'development':
      return 'http://localhost:4000';
    case 'test':
      return 'http://localhost:4000';
  }
};

export const httpLink = createHttpLink({
  uri: 'http://localhost:4000/v1/admin/graphql',
});

export const getToken = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          resolve(idToken);
        });
      }
    });
  });
};

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
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
