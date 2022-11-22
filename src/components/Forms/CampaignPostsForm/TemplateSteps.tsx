import React, { FC } from 'react';
import { ChannelTemplateStructure } from '../../../types';
import CampaignTemplate from './CampaignTemplate';
import twitterIcon from '../../../assets/svg/socialIcons/TwitterLogo.svg';
import instagramIcon from '../../../assets/svg/socialIcons/InstagramLogo.svg';
import tiktokIcon from '../../../assets/svg/socialIcons/TikTokLogo.svg';
import facebookIcon from '../../../assets/svg/socialIcons/FBLogo.svg';
import twitterPhone from '../../../assets/png/templateImages/twitter.png';
import instagramPhone from '../../../assets/png/templateImages/instagram.png';
import tiktokPhone from '../../../assets/png/templateImages/tiktok.png';
import facebookPhone from '../../../assets/png/templateImages/facebook.png';
import { FACEBOOK, INSTAGRAM, TIKTOK, TWITTER } from '../../../helpers/constants';

interface TemplateStepsIProps {
  channelTemplates: ChannelTemplateStructure;
  addPost: (channel: string) => void;
  handlePostChange: (channel: string, index: number, data: string) => void;
  removePost: (channel: string, index: number) => void;
  platfrom: string;
}

const TemplateSteps: FC<TemplateStepsIProps> = ({
  channelTemplates,
  addPost,
  handlePostChange,
  removePost,
  platfrom,
}: TemplateStepsIProps) => {
  switch (platfrom) {
    case TWITTER:
      return (
        <CampaignTemplate
          channelTemplates={channelTemplates.Twitter}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={twitterPhone}
          socialIcon={twitterIcon}
          platform={TWITTER}
        />
      );
    case INSTAGRAM:
      return (
        <CampaignTemplate
          channelTemplates={channelTemplates.Instagram}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={instagramPhone}
          socialIcon={instagramIcon}
          platform={INSTAGRAM}
        />
      );
    case FACEBOOK:
      return (
        <CampaignTemplate
          channelTemplates={channelTemplates.Facebook}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={facebookPhone}
          socialIcon={facebookIcon}
          platform={FACEBOOK}
        />
      );
    case TIKTOK:
      return (
        <CampaignTemplate
          channelTemplates={channelTemplates.Tiktok}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={tiktokPhone}
          socialIcon={tiktokIcon}
          platform={TIKTOK}
        />
      );
    default:
      return (
        <CampaignTemplate
          channelTemplates={channelTemplates.Tiktok}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={tiktokPhone}
          socialIcon={tiktokIcon}
          platform={TIKTOK}
        />
      );
  }
};

export default TemplateSteps;
