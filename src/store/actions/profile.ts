import { ProfileTypes } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
export const GET_PROFILE = 'GET_PROFILE';
export const WALKTHROUGH_STATUS = 'WALKTHROUGH_STATUS';

export const getProfile = (data: ProfileTypes): PayloadAction<ProfileTypes> => {
  return {
    type: GET_PROFILE,
    payload: data,
  };
};

export const walkthroughAction = (status: boolean): PayloadAction<boolean> => {
  return {
    type: WALKTHROUGH_STATUS,
    payload: status,
  };
};
