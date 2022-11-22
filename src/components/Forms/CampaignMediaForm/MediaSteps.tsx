import React, { FC } from 'react';
import { ChannelMediaObject, ChannelMediaStructure, ChannelMediaTypes, FileObject } from '../../../types';
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
import { useSelector } from 'react-redux';
import { FACEBOOK, INSTAGRAM, TIKTOK, TWITTER } from '../../../helpers/constants';

interface MediaStepsIProps {
  campaignImage: FileObject;
  socialMediaType: string[];
  onCampaignImageSuccess: (data: FileObject) => void;
  onError: (msg: string) => void;
  onSuccess: (channel: string, list: ChannelMediaObject[]) => void;
  channelMedia: ChannelMediaStructure;
  handleChannelMedia: (channel: string, ratio: string, data: FileObject, slug: string) => void;
  removeChannelMedia: (index: number, data: ChannelMediaObject, ratio: string) => void;
  platform: string;
}

const MediaSteps: FC<MediaStepsIProps> = ({
  campaignImage,
  onCampaignImageSuccess,
  onError,
  channelMedia,
  onSuccess,
  handleChannelMedia,
  removeChannelMedia,
  platform,
}) => {
  const channelMediaList = useSelector((state: { channelMedia: ChannelMediaTypes }) => state.channelMedia);
  console.log('platform--------------------', platform);

  switch (platform) {
    case 'Campaign':
      return (
        <CampaignMedia
          title="Upload your campaign image cover for the raiinmaker app"
          campaignImage={campaignImage}
          onCampaignImageSuccess={onCampaignImageSuccess}
          onError={onError}
        />
      );
    case TWITTER:
      return (
        <ChannelMedia
          channelMedia={channelMedia.Twitter}
          onSuccess={onSuccess}
          onError={onError}
          channelName={TWITTER}
          socialPlatFormImage={twitterPhone}
          secondMobileImage={twitterPhone2}
          horizontalVideo={twitterHz}
          handleChannelMedia={handleChannelMedia}
          firstMedia={channelMediaList.twitter.first}
          secondMedia={channelMediaList.twitter.second}
          thirdMedia={channelMediaList.twitter.third}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Twitter"
        />
      );
    case INSTAGRAM:
      return (
        <ChannelMedia
          channelMedia={channelMedia.Instagram}
          onSuccess={onSuccess}
          onError={onError}
          channelName={INSTAGRAM}
          socialPlatFormImage={instagramPhone}
          secondMobileImage={instagramPhone2}
          horizontalVideo={instagramHz}
          handleChannelMedia={handleChannelMedia}
          firstMedia={channelMediaList.instagram.first}
          secondMedia={channelMediaList.instagram.second}
          thirdMedia={channelMediaList.instagram.third}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Instagram"
        />
      );
    case FACEBOOK:
      return (
        <ChannelMedia
          channelMedia={channelMedia.Facebook}
          onSuccess={onSuccess}
          onError={onError}
          channelName={FACEBOOK}
          socialPlatFormImage={facebookPhone}
          secondMobileImage={facebookPhone2}
          horizontalVideo={facebookHz}
          handleChannelMedia={handleChannelMedia}
          firstMedia={channelMediaList.facebook.first}
          secondMedia={channelMediaList.facebook.second}
          thirdMedia={channelMediaList.facebook.third}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Facebook"
        />
      );
    case TIKTOK:
      return (
        <ChannelMedia
          channelMedia={channelMedia.Tiktok}
          onSuccess={onSuccess}
          onError={onError}
          channelName={TIKTOK}
          socialPlatFormImage={tiktokPhone}
          handleChannelMedia={handleChannelMedia}
          firstMedia={channelMediaList.tiktok.first}
          removeChannelMedia={removeChannelMedia}
          title="Upload media you want users to view & share on Tiktok"
        />
      );
    default:
      return (
        <CampaignMedia
          title="Upload your campaign image cover for the raiinmaker app"
          campaignImage={campaignImage}
          onCampaignImageSuccess={onCampaignImageSuccess}
          onError={onError}
        />
      );
  }
};

export default MediaSteps;
