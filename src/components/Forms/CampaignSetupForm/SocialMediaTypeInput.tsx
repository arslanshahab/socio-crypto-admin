import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import InstaIcon from '../../../assets/png/instagram.png';
import TiktonIcon from '../../../assets/png/tiktok.png';
import TwitterIcon from '../../../assets/png/twitter.png';
import FacebookIcon from '../../../assets/png/facebook.png';
import useEffectSkipFirst from '../../../hooks/useEffectSkipFirst';
import './campaignSetupForm.scss';
import TwitterPhone from '../../../assets/png/socialPlatForms/TwitterPhone.png';
import InstagramPhone from '../../../assets/png/socialPlatForms/IGPhone.png';
import TiktokPhone from '../../../assets/png/socialPlatForms/TikTokPhone.png';
import FacebookPhone from '../../../assets/png/socialPlatForms/FBPhone.png';

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
  Twitter: TwitterPhone,
  Instagram: InstagramPhone,
  Tiktok: TiktokPhone,
  Facebook: FacebookPhone,
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
    <div className="socialMediaTypeInputWrapper">
      <p>Choose the social media platform to promote your campaign!</p>
      <div className="socialMediaListWrapper">
        {socialMediaTypeMenu.map((item, index) => (
          <div key={index} className="socialPlatForms">
            <div
              onClick={() => handleSocialSelect(item)}
              className={`socialMedia  ${socialMediaType.includes(item) ? 'selectedField' : ''}`}
            >
              <div className="imageWrapper">
                <img src={getSocialIcon[item]} alt="social-icon" />
              </div>
            </div>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="checkboxWrapper">
        <FormControlLabel
          control={
            <Checkbox
              checked={all || selectAllByDefault}
              style={{ color: '#000', transform: 'scale(1.6)' }}
              name="Brand Agreement"
              onChange={(e, checked) => {
                setAll(checked);
              }}
            />
          }
          label={<p className="allChannelsTitle">All Channels</p>}
        />
      </div>
    </div>
  );
};

export default SocialMediaTypeInput;
