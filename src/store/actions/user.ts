import { PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../types.d';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUserData = (data: UserData): PayloadAction<UserData> => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};

export const logoutUser = (): PayloadAction => {
  return {
    type: LOGOUT_USER,
    payload: undefined,
  };
};
