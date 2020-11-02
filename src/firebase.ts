import app from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAAXv6aKS3xdrnTLf5hVVJgW60h26vFJok',
  authDomain: 'raiinmaker-mobile.firebaseapp.com',
  databaseURL: 'https://raiinmaker-mobile.firebaseio.com',
  projectId: 'raiinmaker-mobile',
  storageBucket: 'raiinmaker-mobile.appspot.com',
  messagingSenderId: '827350082736',
  appId: '1:827350082736:web:ade61d0aa225db5394c775',
};

export const firebase = app.initializeApp(firebaseConfig);

export const getIdToken = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then(
          (idToken) => {
            resolve(idToken);
          },
          (error) => {
            resolve(null);
          },
        );
      } else {
        resolve(null);
      }
    });
  });
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};
