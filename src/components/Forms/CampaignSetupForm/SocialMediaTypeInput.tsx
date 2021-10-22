import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import InstaIcon from '../../../assets/png/instagram.png';
import TiktonIcon from '../../../assets/png/tiktok.png';
import TwitterIcon from '../../../assets/png/twitter.png';
import FacebookIcon from '../../../assets/png/facebook.png';
import useEffectSkipFirst from '../../../hooks/useEffectSkipFirst';

interface Props {
  socialMediaType: string[];
  handleChange: (val: string[]) => void;
}

interface IconsObject {
  [key: string]: string;
  Twitter: string;
  Facebook: string;
  Tiktok: string;
  Instagram: string;
}

export const getSocialIcon: IconsObject = {
  Twitter: TwitterIcon,
  Instagram: InstaIcon,
  Tiktok: TiktonIcon,
  Facebook: FacebookIcon,
};

export const socialMediaTypeMenu: string[] = ['Twitter', 'Instagram', 'Tiktok', 'Facebook'];

const SocialMediaTypeInput: React.FC<Props> = ({ socialMediaType, handleChange }) => {
  const [all, setAll] = useState(false);

  const selectAll = () => {
    if (all) {
      const channels = [...socialMediaType];
      socialMediaTypeMenu.forEach((item) => {
        if (!channels.includes(item)) {
          channels.push(item);
        }
      });
      handleChange(channels);
    } else {
      handleChange([]);
    }
  };

  useEffectSkipFirst(selectAll, [all]);

  const handleSocialSelect = (val: string) => {
    const channels = [...socialMediaType];
    if (channels.includes(val)) {
      const index = channels.findIndex((item) => item === val);
      channels.splice(index, 1);
    } else {
      channels.push(val);
    }
    handleChange(channels);
  };

  return (
    <Box className="w-full mt-10">
      <p className="mb-3 text-center text-2xl">Choose the social media platform to promote your campaign!</p>
      <Box className="w-full flex flex-row justify-start items-center">
        <FormControlLabel
          control={
            <Checkbox
              checked={all}
              style={{ color: '#3f51b5' }}
              name="Brand Agreement"
              onChange={(e, checked) => {
                setAll(checked);
              }}
            />
          }
          label="All channels"
        />
      </Box>
      <Box className="flex flex-row justify-between space-x-4">
        {socialMediaTypeMenu.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSocialSelect(item)}
            className={`cursor-pointer flex flex-col justify-center items-center rounded-lg w-72 h-28 bg-gray-200 spacing-2 ${
              socialMediaType.includes(item) ? 'bg-blue-800 text-white' : ''
            }`}
          >
            <p className="text-lg">{item}</p>
            <img className="w-16" src={getSocialIcon[item]} alt="social-icon" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SocialMediaTypeInput;
