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
  handleChannelMedia: (channel: string, ratio: string, data: FileObject, mediaSlug: string) => void;
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
  removeChannelMedia: (index: number, data: ChannelMediaObject, ratio: string) => void;
}

const MediaSteps: FC<MediaStepsIProps> = ({
  steps,
  campaignImage,
  onCampaignImageSuccess,
  onError,
  channelMedia,
  onSuccess,
  socialMediaType,
  handleChannelMedia,
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
          title="Upload your campaign image cover for the raiinmaker app"
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
          handleChannelMedia={handleChannelMedia}
          firstTwitterMedia={firstTwitterMedia}
          secondTwitterMedia={secondTwitterMedia}
          thirdTwitterMedia={thirdTwitterMedia}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Twitter"
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
          handleChannelMedia={handleChannelMedia}
          firstTwitterMedia={firstInstagramMedia}
          //   firstInstagramMedia={firstInstagramMedia}
          secondTwitterMedia={secondInstagramMedia}
          thirdTwitterMedia={thirdInstagramMedia}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Instagram"
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
          handleChannelMedia={handleChannelMedia}
          firstTwitterMedia={firstFacebookMedia}
          secondTwitterMedia={secondFacebookMedia}
          thirdTwitterMedia={thirdFacebookMedia}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Facebook"
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
          handleChannelMedia={handleChannelMedia}
          firstTwitterMedia={tiktokMedia}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Facebook"
        />
      );
    default:
      return (
        <CampaignMedia
          title="Upload your campaign image cover for the raiinmaker app"
          steps={steps}
          campaignImage={campaignImage}
          onCampaignImageSuccess={onCampaignImageSuccess}
          onError={onError}
        />
      );
  }
};

export default MediaSteps;
