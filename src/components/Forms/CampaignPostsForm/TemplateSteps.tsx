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

interface TemplateStepsIProps {
  steps: number;
  channelTemplates: ChannelTemplateStructure;
  addPost: (channel: string) => void;
  handlePostChange: (channel: string, index: number, data: string) => void;
  removePost: (channel: string, index: number) => void;
}

const TemplateSteps: FC<TemplateStepsIProps> = ({
  steps,
  channelTemplates,
  addPost,
  handlePostChange,
  removePost,
}: TemplateStepsIProps) => {
  switch (steps) {
    case 1:
      return (
        <CampaignTemplate
          steps={steps}
          channelTemplates={channelTemplates.Twitter}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={twitterPhone}
          socialIcon={twitterIcon}
          socialType={'Twitter'}
        />
      );
    case 2:
      return (
        <CampaignTemplate
          steps={steps}
          channelTemplates={channelTemplates.Instagram}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={instagramPhone}
          socialIcon={instagramIcon}
          socialType={'Instagram'}
        />
      );
    case 3:
      return (
        <CampaignTemplate
          steps={steps}
          channelTemplates={channelTemplates.Facebook}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={facebookPhone}
          socialIcon={facebookIcon}
          socialType={'Facebook'}
        />
      );
    case 4:
      return (
        <CampaignTemplate
          steps={steps}
          channelTemplates={channelTemplates.Tiktok}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={tiktokPhone}
          socialIcon={tiktokIcon}
          socialType={'Tiktok'}
        />
      );
    default:
      return (
        <CampaignTemplate
          steps={steps}
          channelTemplates={channelTemplates.Tiktok}
          addPost={addPost}
          handlePostChange={handlePostChange}
          removePost={removePost}
          phoneImage={tiktokPhone}
          socialIcon={tiktokIcon}
          socialType={'Tiktok'}
        />
      );
  }
};

export default TemplateSteps;
