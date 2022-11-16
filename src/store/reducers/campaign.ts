import initialState from '../initialState';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { UPDATE_CAMPAIGN, RESET_CAMPAIGN, CHANNEL_MEDIA, REMOVE_CHANNEL_MEDIA } from '../actions/campaign';
import { CampaignState, ChannelMediaObject } from '../../types.d';

const campaign = createReducer(initialState.newCampaign, {
  [UPDATE_CAMPAIGN]: (state, action: PayloadAction<CampaignState>) => action.payload,
  [RESET_CAMPAIGN]: () => initialState.newCampaign,
});

export default campaign;

export const channelMedia = createReducer(initialState.channelMedia, {
  [CHANNEL_MEDIA]: (
    state,
    action: { payload: { data: ChannelMediaObject; ratio: string; channel: string }; type: string },
  ) => {
    state[action.payload.channel][action.payload.ratio].push(action.payload.data);
  },
  [REMOVE_CHANNEL_MEDIA]: (state, action: { payload: { ratio: string; channel: string; index: number } }) => {
    debugger;
    state[action.payload.channel.toLocaleLowerCase()][screenSize[action.payload.ratio]].splice(action.payload.index, 1);
  },
});

const screenSize = {
  '1x1': 'first',
  '3x4': 'second',
  hz: 'third',
};
