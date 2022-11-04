import React from 'react';
import videoViews from '../../../assets/svg/prioritize/videoViews.svg';
import brandAwareness from '../../../assets/svg/prioritize/brandAwareness.png';
import conversion from '../../../assets/svg/prioritize/conversion.svg';
import socialEngagement from '../../../assets/svg/prioritize/socialEngagement.svg';

interface Props {
  campaignType: string;
  handleChange: (val: string) => void;
}
interface MenuItem {
  name: string;
  value: string;
  icon: string;
}
interface PrioritizeIconTypes {
  [index: string]: string;
  videoViews: string;
  brandAwareness: string;
  socialEngagement: string;
  conversion: string;
}

export const campaignTypeMenu: Array<MenuItem> = [
  { name: 'Video Views', value: 'video-views', icon: 'videoViews' },
  { name: 'Brand Awareness', value: 'brand-awareness', icon: 'brandAwareness' },
  { name: 'Social Engagement', value: 'social-engagement', icon: 'socialEngagement' },
  { name: 'Conversion', value: 'conversion', icon: 'conversion' },
];

const prioritizeIcons: PrioritizeIconTypes = {
  videoViews: videoViews,
  brandAwareness: brandAwareness,
  socialEngagement: socialEngagement,
  conversion: conversion,
};

const CampaignTypeInput: React.FC<Props> = ({ campaignType, handleChange }) => {
  return (
    <div className="campaignTypeInputWrapper">
      <p>
        <span>2/3</span>What will this campaign prioritize?
      </p>
      <div className="campaignTypeListWrapper">
        {campaignTypeMenu.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => handleChange(item.value)}
              className={`selectField ${campaignType === item.value ? 'selectedField' : ''}`}
            >
              <div className="imageWrapper">
                <img src={prioritizeIcons[item.icon]} />
              </div>
            </div>
            <p className="">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignTypeInput;
