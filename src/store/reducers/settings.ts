import initialState from '../initialState';
import { AppLoaderPayload, SHOW_APP_LOADER } from '../actions/settings';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

const settings = createReducer(initialState.settings, {
  [SHOW_APP_LOADER]: (state, action: PayloadAction<AppLoaderPayload>) => {
    state.appLoader = action.payload.flag;
    state.loadingMessage = action.payload.message;
  },
});

export default settings;
