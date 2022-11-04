import React, { FC } from 'react';
import { ChannelMediaObject, FileObject } from '../../../types';
import CampaignMedia from './CampaignMedia';

interface MediaStepsIProps {
  steps: number;
  campaignImage: FileObject;
  socialMediaType: string[];
  onCampaignImageSuccess: (data: FileObject) => void;
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelMedia: any;
}

const MediaSteps: FC<MediaStepsIProps> = ({ steps, campaignImage, onCampaignImageSuccess, onError }) => {
  switch (steps) {
    case 1:
      return (
        <CampaignMedia
          steps={steps}
          campaignImage={campaignImage}
          onCampaignImageSuccess={onCampaignImageSuccess}
          onError={onError}
        />
      );
    case 2:
      return <div>Twitter Media</div>;
    case 3:
      return <div>Instagram Media</div>;
    case 4:
      return <div>Facebook Media</div>;
    case 5:
      return <div>Tiktok Media</div>;
    default:
      return <div>Campaign Media</div>;
  }
};

export default MediaSteps;
