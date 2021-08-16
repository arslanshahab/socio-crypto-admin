export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';
import { PayloadAction } from '@reduxjs/toolkit';
export const HIDE_ERROR_ALERT = 'HIDE_ERROR_ALERT';
export const SHOW_SUCCESS_ALERT = 'SHOW_SUCCESS_ALERT';
export const HIDE_SUCCESS_ALERT = 'HIDE_SUCCESS_ALERT';

export const showErrorAlert = (message: string): PayloadAction<string, string> => {
  return {
    type: SHOW_ERROR_ALERT,
    payload: message,
  };
};

export const hideErrorAlert = (): PayloadAction<string, string> => {
  return {
    type: HIDE_ERROR_ALERT,
    payload: '',
  };
};

export const showSuccessAlert = (message: string): PayloadAction<string, string> => {
  return {
    type: SHOW_SUCCESS_ALERT,
    payload: message,
  };
};

export const hideSuccessAlert = (): PayloadAction<string, string> => {
  return {
    type: HIDE_SUCCESS_ALERT,
    payload: '',
  };
};
