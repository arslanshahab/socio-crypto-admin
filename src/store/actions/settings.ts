import { PayloadAction } from '@reduxjs/toolkit';
export const SHOW_APP_LOADER = 'SHOW_APP_LOADER';

export interface AppLoaderPayload {
  flag: boolean;
  message: string;
}

export const showAppLoader = (data: AppLoaderPayload): PayloadAction<AppLoaderPayload> => {
  return {
    type: SHOW_APP_LOADER,
    payload: data,
  };
};
