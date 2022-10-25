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
    <Box className="campaignTypeInputWrapper">
      <p>What will this campaign prioritize?</p>
      <Box className="campaignTypeListWrapper">
        {campaignTypeMenu.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleChange(item.value)}
            className={`selectField ${campaignType === item.value ? 'selectedField' : ''}`}
          >
            <p className="text-base">{item.name}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CampaignTypeInput;
