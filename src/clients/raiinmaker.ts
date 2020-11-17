import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { getIdToken } from './firebase';

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
  uri: `${uri()}/v1/admin/graphql`,
  credentials: 'include',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const sessionLogin = async () => {
  const idToken = await getIdToken();
  if (!idToken) throw Error('login failed');
  const url = `${uri()}/v1/login`;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });
};

export const sessionLogout = async () => {
  const url = `${uri()}/v1/logout`;
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' },
  });
};
