import React, { FC } from 'react';
import TierHeader from '../TierHeader';
import tagUserIcon from '../../assets/svg/tiers/tagUser.svg';
import TierDetailsLayout from '../../sections/TierDetailsLayout';
import { useLocation } from 'react-router-dom';
import { CampaignAggregationTypes, CampaignTierIconTypes, SocialPlatforms, SocialPostMetrics } from '../../types';
import twitterIcon from '../../assets/svg/socialIcons/TwitterLogo.svg';
import tiktokIcon from '../../assets/svg/socialIcons/TikTokLogo.svg';
import facebookIcon from '../../assets/svg/socialIcons/FBLogo.svg';
import instagramIcon from '../../assets/svg/socialIcons/InstagramLogo.svg';
import clicksIcon from '../../assets/svg/tiers/clicksIcon.svg';
import commentIcon from '../../assets/svg/tiers/commentsIcon.svg';
import viewIcon from '../../assets/svg/tiers/viewsIcon.svg';
import shareIcon from '../../assets/svg/tiers/sharesIcon.svg';
import './campaignChannelEngagement.scss';
import TierContent from '../TierContent';

interface StateTypes {
  state: {
    aggregates: CampaignAggregationTypes;
    socialPostMetrics: SocialPostMetrics[];
  };
}

const titles: CampaignTierIconTypes = {
  comments: 'Total Comments',
  likes: 'Total Likes',
  shares: 'Total Shares',
  type: '',
};

const socialIcons: SocialPlatforms = {
  twitter: twitterIcon,
  tiktok: tiktokIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
};

const tierIcons: CampaignTierIconTypes = {
  type: '',
  likes: viewIcon,
  shares: shareIcon,
  comments: commentIcon,
};

const CampaignChannelEngagement: FC = () => {
  const {
    state: { socialPostMetrics },
  }: StateTypes = useLocation();

  return (
    <TierDetailsLayout>
      <TierHeader title={'Tier 3: Campaign By Channel '} image={tagUserIcon} />
      <div className="socialTierWrapper">
        {socialPostMetrics.map((x: SocialPostMetrics) => {
          return (
            <div key={x.comments} className="socialTierContent">
              <div>
                <img src={socialIcons[x.type]} alt={x.type} />
              </div>
              <div className="">
                <h3>{x.type}</h3>
                {Object.entries(x).map(([key, value]) => {
                  if (key === 'type') return;
                  return <TierContent key={key} image={tierIcons[key]} title={titles[key]} value={value.toString()} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </TierDetailsLayout>
  );
};

export default CampaignChannelEngagement;
