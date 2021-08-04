import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from './clients/raiinmaker-api';
import { Provider } from 'react-redux';
import store from './redux/store';
import './assets/styles/tailwind.generated.css';
import './assets/styles/main.scss';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { createTheme, MuiThemeProvider } from '@material-ui/core';

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
          <ApolloProvider client={graphqlClient}>
            <App />
          </ApolloProvider>
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
