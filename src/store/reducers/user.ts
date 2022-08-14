import initialState from '../initialState';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { LOGOUT_USER, SET_USER_DATA } from '../actions/user';
import { UserData } from '../../types.d';

const user = createReducer(initialState.user, {
  [SET_USER_DATA]: (state, action: PayloadAction<UserData>) => {
    state.id = action.payload.id;
    state.tempPass = action.payload.tempPass;
    state.role = action.payload.role;
    state.company = action.payload.company;
    state.email = action.payload.email;
    state.isLoggedIn = action.payload.isLoggedIn;
  },

  [LOGOUT_USER]: () => initialState.user,
});

export default user;
