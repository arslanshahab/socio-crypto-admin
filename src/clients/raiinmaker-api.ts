import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { getIdToken } from './firebase';
import { urls } from '../apiConfig.json';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const baseUrl = (urls as {[key: string]: string})[env] as any;

const apiURI = process.env.REACT_APP_LOCAL_URL || baseUrl;

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
