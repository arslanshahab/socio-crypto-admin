import { PayloadAction } from '@reduxjs/toolkit';
import { CampaignState } from '../../types.d';

export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const RESET_CAMPAIGN = 'RESET_CAMPAIGN';

export const updateCampaign = (data: CampaignState): PayloadAction<CampaignState> => {
  return {
    type: UPDATE_CAMPAIGN,
    payload: data,
  };
};

export const resetCampaign = (): PayloadAction<string | null> => {
  return {
    type: RESET_CAMPAIGN,
    payload: null,
  };
};
