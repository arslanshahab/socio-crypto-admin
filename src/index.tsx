import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from './clients/raiinmaker-api';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import './assets/styles/index.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DayJsUtils}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={graphqlClient}>
              <App />
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
