import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { getIdToken } from './firebase';

const uri = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://server.api.raiinmaker.com';
    case 'development':
      return 'https://server-staging.api.raiinmaker.com';
    case 'test':
      return 'http://localhost:4000';
  }
};

const apiURI = process.env.REACT_APP_LOCAL_URL || uri();

export const httpLink = createHttpLink({
  uri: `${apiURI}/v1/admin/graphql`,
  credentials: 'include',
});

export const graphqlClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const sessionLogin = async () => {
  const idToken = await getIdToken();
  if (!idToken) throw Error('login failed');
  const url = `${apiURI}/v1/login`;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
};

export const sessionLogout = async () => {
  const url = `${apiURI}/v1/logout`;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  });
};
