import { PayloadAction } from '@reduxjs/toolkit';
import { CampaignState, ChannelMediaObject } from '../../types.d';

export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const RESET_CAMPAIGN = 'RESET_CAMPAIGN';
export const CHANNEL_MEDIA = 'CHANNEL_MEDIA';
export const REMOVE_CHANNEL_MEDIA = 'REMOVE_CHANNEL_MEDIA';

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

export const channelMediaAction = (
  data: ChannelMediaObject,
  ratio: string,
  channel: string,
): PayloadAction<{ data: ChannelMediaObject; ratio: string; channel: string }> => {
  return {
    type: CHANNEL_MEDIA,
    payload: { data, ratio, channel },
  };
};

export const removeChannelMediaAction = (
  ratio: string,
  channel: string,
  index: number,
): PayloadAction<{ ratio: string; channel: string; index: number }> => {
  debugger;
  return {
    type: REMOVE_CHANNEL_MEDIA,
    payload: { ratio, channel, index },
  };
};
