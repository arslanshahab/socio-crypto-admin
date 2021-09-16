import { Box } from '@material-ui/core';
import React from 'react';
import InstaIcon from '../../../assets/png/instagram.png';
import TiktonIcon from '../../../assets/png/tiktok.png';
import TwitterIcon from '../../../assets/png/twitter.png';
import { CampaignConfig } from '../../../types.d';

interface Props {
  socialMediaType: string;
  handleChange: (val: CampaignConfig['socialMediaType']) => void;
}
interface MenuItem {
  name: string;
  value: string;
}

export const socialMediaTypeMenu: Array<MenuItem> = [
  { name: 'Twitter', value: 'twitter' },
  { name: 'Instagram', value: 'instagram' },
  { name: 'Tiktok', value: 'tiktok' },
  { name: 'Omni Channels', value: 'omni-channels' },
];

const SocialMediaTypeInput: React.FC<Props> = ({ socialMediaType, handleChange }) => {
  const getIcon = (value: string) => {
    switch (value) {
      case 'twitter':
        return TwitterIcon;
      case 'instagram':
        return InstaIcon;
      case 'tiktok':
        return TiktonIcon;
      default:
        return '';
    }
  };

  return (
    <Box className="w-full mt-10">
      <p className="mb-3 text-center text-2xl">Choose the social media platform to promote your campaign!</p>
      <Box className="flex flex-row justify-between space-x-4">
        {socialMediaTypeMenu.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleChange(item.value as CampaignConfig['socialMediaType'])}
            className={`cursor-pointer flex flex-col justify-center items-center rounded-lg w-72 h-28 bg-gray-200 spacing-2 ${
              socialMediaType.includes(item.value) ? 'bg-blue-800 text-white' : ''
            }`}
          >
            <p className="text-lg">{item.name}</p>
            {item.value !== 'omni-channels' && <img className="w-16" src={getIcon(item.value)} alt="social-icon" />}
            {item.value === 'omni-channels' && (
              <Box className="flex flex-row justify-between space-x-2">
                <img className="w-10" src={TwitterIcon} alt="social-icon" />
                <img className="w-10" src={InstaIcon} alt="social-icon" />
                <img className="w-10" src={TiktonIcon} alt="social-icon" />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SocialMediaTypeInput;
