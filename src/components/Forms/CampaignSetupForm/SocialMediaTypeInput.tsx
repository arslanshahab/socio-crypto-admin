import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import InstaIcon from '../../../assets/png/instagram.png';
import TiktonIcon from '../../../assets/png/tiktok.png';
import TwitterIcon from '../../../assets/png/twitter.png';
import FacebookIcon from '../../../assets/png/facebook.png';
import useEffectSkipFirst from '../../../hooks/useEffectSkipFirst';
import './campaignSetupForm.scss';

interface Props {
  socialMediaType: string[];
  handleChange: (val: string[]) => void;
  selectAllByDefault: boolean;
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

const SocialMediaTypeInput: React.FC<Props> = ({ socialMediaType, handleChange, selectAllByDefault }) => {
  const [all, setAll] = useState(selectAllByDefault);

  const selectAll = () => {
    if (all || selectAllByDefault) {
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

  useEffectSkipFirst(selectAll, [all, selectAllByDefault]);

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
    <Box className="socialMediaTypeInputWrapper">
      <p>Choose the social media platform to promote your campaign!</p>
      <Box className="checkboxWrapper">
        <FormControlLabel
          control={
            <Checkbox
              checked={all || selectAllByDefault}
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
      <Box className="socialMediaListWrapper">
        {socialMediaTypeMenu.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleSocialSelect(item)}
            className={`socialMedia  ${socialMediaType.includes(item) ? 'selectedField' : ''}`}
          >
            <p>{item}</p>
            <img src={getSocialIcon[item]} alt="social-icon" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SocialMediaTypeInput;
