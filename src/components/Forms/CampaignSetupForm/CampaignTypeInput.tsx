import { Box } from '@material-ui/core';
import React from 'react';

interface Props {
  campaignType: string;
  handleChange: (val: string) => void;
}
interface MenuItem {
  name: string;
  value: string;
}

export const campaignTypeMenu: Array<MenuItem> = [
  { name: 'Video Views', value: 'video-views' },
  { name: 'Brand Awareness', value: 'brand-awareness' },
  { name: 'Social Engagement', value: 'social-engagement' },
  { name: 'Conversion', value: 'conversion' },
];

const CampaignTypeInput: React.FC<Props> = ({ campaignType, handleChange }) => {
  return (
    <Box className="w-full mt-10">
      <p className="mb-4 text-center text-2xl">What will this campaign prioritize?</p>
      <Box className="flex flex-row justify-between space-x-4">
        {campaignTypeMenu.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleChange(item.value)}
            className={`cursor-pointer flex flex-row justify-center items-center rounded-full w-72 h-16 border-2 border-denimBlue spacing-2 ${
              campaignType === item.value ? 'bg-denimBlue text-white' : ''
            }`}
          >
            <p className="text-base">{item.name}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignTypeInput;
