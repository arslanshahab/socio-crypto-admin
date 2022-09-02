import { ProfileTypes } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = (data: ProfileTypes): PayloadAction<ProfileTypes> => {
  return {
    type: GET_PROFILE,
    payload: data,
  };
};
