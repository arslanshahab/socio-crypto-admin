import initialState from '../initialState';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { UPDATE_CAMPAIGN, RESET_CAMPAIGN } from '../actions/campaign';
import { CampaignState } from '../../types.d';

const campaign = createReducer(initialState.newCampaign, {
  [UPDATE_CAMPAIGN]: (state, action: PayloadAction<CampaignState>) => {
    state = action.payload;
    return state;
  },

  [RESET_CAMPAIGN]: () => {
    return initialState.newCampaign;
  },
});

export default campaign;
