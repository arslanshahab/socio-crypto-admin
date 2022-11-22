import { PayloadAction } from '@reduxjs/toolkit';
import { CampaignState, ChannelMediaObject, ChannelPayloadTypes, RemoveChannelMediaPayloadTypes } from '../../types.d';

export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN';
export const RESET_CAMPAIGN = 'RESET_CAMPAIGN';
export const CHANNEL_MEDIA = 'CHANNEL_MEDIA';
export const REMOVE_CHANNEL_MEDIA = 'REMOVE_CHANNEL_MEDIA';
export const RESET_CHANNEL_MEDIA = 'RESET_CHANNEL_MEDIA';

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
): PayloadAction<ChannelPayloadTypes> => {
  return {
    type: CHANNEL_MEDIA,
    payload: { data, ratio, channel },
  };
};

export const removeChannelMediaAction = (
  ratio: string,
  channel: string,
  index: number,
): PayloadAction<RemoveChannelMediaPayloadTypes> => {
  return {
    type: REMOVE_CHANNEL_MEDIA,
    payload: { ratio, channel, index },
  };
};

export const resetChannelMedia = (): PayloadAction<string | null> => {
  return {
    type: RESET_CHANNEL_MEDIA,
    payload: null,
  };
};
