import initialState from '../initialState';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { UPDATE_CAMPAIGN, RESET_CAMPAIGN, CHANNEL_MEDIA, REMOVE_CHANNEL_MEDIA } from '../actions/campaign';
import { CampaignState, ChannelPayloadTypes, RemoveChannelMediaPayloadTypes } from '../../types.d';

const campaign = createReducer(initialState.newCampaign, {
  [UPDATE_CAMPAIGN]: (state, action: PayloadAction<CampaignState>) => action.payload,
  [RESET_CAMPAIGN]: () => initialState.newCampaign,
});

export default campaign;

export const channelMedia = createReducer(initialState.channelMedia, {
  [CHANNEL_MEDIA]: (state, action: PayloadAction<ChannelPayloadTypes>) => {
    state[action.payload.channel.toLocaleLowerCase()][screenSize[action.payload.ratio]].push(action.payload.data);
  },
  [REMOVE_CHANNEL_MEDIA]: (state, action: PayloadAction<RemoveChannelMediaPayloadTypes>) => {
    state[action.payload.channel.toLocaleLowerCase()][screenSize[action.payload.ratio]].splice(action.payload.index, 1);
  },
});

const screenSize = {
  '1x1': 'first',
  '3x4': 'second',
  hz: 'third',
};
