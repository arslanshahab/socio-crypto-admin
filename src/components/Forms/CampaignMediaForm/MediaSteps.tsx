import React, { FC } from 'react';
import { ChannelMediaObject, ChannelMediaStructure, FileObject } from '../../../types';
import CampaignMedia from './CampaignMedia';
import ChannelMedia from './ChannelMedia';
import instagramPhone from '../../../assets/png/medias/instagram.png';
import tiktokPhone from '../../../assets/png/medias/tiktok.png';
import twitterPhone from '../../../assets/png/medias/twitter.png';
import facebookPhone from '../../../assets/png/medias/facebook.png';
import facebookPhone2 from '../../../assets/png/medias/facebook3x4.png';
import twitterPhone2 from '../../../assets/png/medias/twitter3x4.png';
import instagramPhone2 from '../../../assets/png/medias/instagram3x4.png';
import instagramHz from '../../../assets/png/medias/instagramHz.png';
import facebookHz from '../../../assets/png/medias/facebookHz.png';
import twitterHz from '../../../assets/png/medias/twitterHz.png';

interface MediaStepsIProps {
  steps: number;
  campaignImage: FileObject;
  socialMediaType: string[];
  onCampaignImageSuccess: (data: FileObject) => void;
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelMedia: ChannelMediaStructure;
  handleFirstMedia: (channel: string, size: string, data: FileObject, mediaSlug: string) => void;
  firstTwitterMedia: ChannelMediaObject[];
  secondTwitterMedia: ChannelMediaObject[];
  thirdTwitterMedia: ChannelMediaObject[];
  firstInstagramMedia?: ChannelMediaObject[];
  secondInstagramMedia: ChannelMediaObject[];
  thirdInstagramMedia: ChannelMediaObject[];
  firstFacebookMedia: ChannelMediaObject[];
  secondFacebookMedia: ChannelMediaObject[];
  thirdFacebookMedia: ChannelMediaObject[];
  tiktokMedia: ChannelMediaObject[];
  removeChannelMedia: (index: number, data: ChannelMediaObject, size: string) => void;
}

const MediaSteps: FC<MediaStepsIProps> = ({
  steps,
  campaignImage,
  onCampaignImageSuccess,
  onError,
  channelMedia,
  onSuccess,
  socialMediaType,
  handleFirstMedia,
  firstTwitterMedia,
  secondTwitterMedia,
  thirdTwitterMedia,
  firstInstagramMedia,
  secondInstagramMedia,
  thirdInstagramMedia,
  firstFacebookMedia,
  secondFacebookMedia,
  thirdFacebookMedia,
  tiktokMedia,
  removeChannelMedia,
}) => {
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
      return (
        <ChannelMedia
          steps={steps}
          channelMedia={channelMedia.Twitter}
          onSuccess={onSuccess}
          onError={onError}
          socialMediaType={socialMediaType}
          channelName={'Twitter'}
          socialPlatFormImage={twitterPhone}
          secondMobileImage={twitterPhone2}
          horizontalVideo={twitterHz}
          handleFirstMedia={handleFirstMedia}
          firstTwitterMedia={firstTwitterMedia}
          secondTwitterMedia={secondTwitterMedia}
          thirdTwitterMedia={thirdTwitterMedia}
          removeChannelMedia={removeChannelMedia}
        />
      );
    case 3:
      return (
        <ChannelMedia
          steps={steps}
          channelMedia={channelMedia.Instagram}
          onSuccess={onSuccess}
          onError={onError}
          socialMediaType={socialMediaType}
          channelName={'Instagram'}
          socialPlatFormImage={instagramPhone}
          secondMobileImage={instagramPhone2}
          horizontalVideo={instagramHz}
          handleFirstMedia={handleFirstMedia}
          firstInstagramMedia={firstInstagramMedia}
          secondInstagramMedia={secondInstagramMedia}
          thirdInstagramMedia={thirdInstagramMedia}
          removeChannelMedia={removeChannelMedia}
        />
      );
    case 4:
      return (
        <ChannelMedia
          steps={steps}
          channelMedia={channelMedia.Facebook}
          onSuccess={onSuccess}
          onError={onError}
          socialMediaType={socialMediaType}
          channelName={'Facebook'}
          socialPlatFormImage={facebookPhone}
          secondMobileImage={facebookPhone2}
          horizontalVideo={facebookHz}
          handleFirstMedia={handleFirstMedia}
          firstFacebookMedia={firstFacebookMedia}
          secondFacebookMedia={secondFacebookMedia}
          thirdFacebookMedia={thirdFacebookMedia}
          removeChannelMedia={removeChannelMedia}
        />
      );
    case 5:
      return (
        <ChannelMedia
          steps={steps}
          channelMedia={channelMedia.Tiktok}
          onSuccess={onSuccess}
          onError={onError}
          socialMediaType={socialMediaType}
          channelName={'Tiktok'}
          socialPlatFormImage={tiktokPhone}
          handleFirstMedia={handleFirstMedia}
          tiktokMedia={tiktokMedia}
          removeChannelMedia={removeChannelMedia}
        />
      );
    default:
      return (
        <CampaignMedia
          steps={steps}
          campaignImage={campaignImage}
          onCampaignImageSuccess={onCampaignImageSuccess}
          onError={onError}
        />
      );
  }
};

export default MediaSteps;
