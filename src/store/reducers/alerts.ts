import initialState from '../initialState';
import { SHOW_ERROR_ALERT, HIDE_ERROR_ALERT, SHOW_SUCCESS_ALERT, HIDE_SUCCESS_ALERT } from '../actions/alerts';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

const alerts = createReducer(initialState.alerts, {
  [SHOW_ERROR_ALERT]: (state, action: PayloadAction<string, string>) => {
    state.error.open = true;
    state.error.message = action.payload;
  },

  [HIDE_ERROR_ALERT]: (state) => {
    state.error.open = false;
  },

  [SHOW_SUCCESS_ALERT]: (state, action: PayloadAction<string, string>) => {
    state.success.open = true;
    state.success.message = action.payload;
  },

  [HIDE_SUCCESS_ALERT]: (state) => {
    state.success.open = false;
  },
});

export default alerts;
