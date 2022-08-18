import { AdminProfileTypes } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
export const GET_PROFILE = 'GET_PROFILE';

export const getProfile = (data: AdminProfileTypes): PayloadAction<AdminProfileTypes> => {
  return {
    type: GET_PROFILE,
    payload: data,
  };
};
