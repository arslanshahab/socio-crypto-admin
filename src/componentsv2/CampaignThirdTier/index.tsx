import React, { FC } from 'react';
import TierHeader from '../TierHeader';
import tagUserIcon from '../../assets/svg/tiers/tagUser.svg';
import TierDetailsLayout from '../../sections/TierDetailsLayout';
import { useLocation } from 'react-router-dom';
import { CampaignAggregationTypes, SocialPostMetrics } from '../../types';
import twitterIcon from '../../assets/svg/socialIcons/TwitterLogo.svg';
import tiktokIcon from '../../assets/svg/socialIcons/TikTokLogo.svg';
import facebookIcon from '../../assets/svg/socialIcons/FBLogo.svg';
import instagramIcon from '../../assets/svg/socialIcons/InstagramLogo.svg';
import './campaignThirdTier.scss';

interface StateTypes {
  state: {
    aggregates: CampaignAggregationTypes;
    socialPostMetrics: SocialPostMetrics[];
  };
}

const titles = {
  twitter: 'Twitter',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  instagram: 'Instagram',
};

const icons = {
  twitter: twitterIcon,
  tiktok: tiktokIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
};

const CampaignThirdTier: FC = () => {
  const {
    state: { aggregates, socialPostMetrics },
  }: StateTypes = useLocation();

  console.log('state-------', aggregates, socialPostMetrics);

  return (
    <TierDetailsLayout>
      <TierHeader title={'Tier 3: Campaign By Channel '} image={tagUserIcon} />
      <div className="socialTitleWrapper">
        <img src={twitterIcon} />
        <h3>Twitter</h3>
      </div>
    </TierDetailsLayout>
  );
};

export default CampaignThirdTier;
