import React, { FC } from 'react';
import './campaignFirstTier.scss';
import activityTier from '../../assets/svg/tiers/activity.svg';
import participantsIcons from '../../assets/svg/tiers/participants.svg';
import { useLocation } from 'react-router-dom';
import { CampaignAggregationTypes, CampaignAnalyticTypes } from '../../types';
import clicksIcon from '../../assets/svg/tiers/clicksIcon.svg';
import commentIcon from '../../assets/svg/tiers/commentsIcon.svg';
import viewIcon from '../../assets/svg/tiers/viewsIcon.svg';
import shareIcon from '../../assets/svg/tiers/sharesIcon.svg';
import TierHeader from '../TierHeader';
import TierContent from '../TierContent';
import TierDetailsLayout from '../../sections/TierDetailsLayout';

interface StateTypes {
  state: {
    aggregates: CampaignAggregationTypes;
  };
}

const names: CampaignAnalyticTypes = {
  totalParticipants: 'Total Participants',
  clickCount: 'Total Click',
  shareCount: 'Total Shares',
  viewCount: 'Total Views',
  commentCount: 'Total Comments',
};

const icons: CampaignAnalyticTypes = {
  totalParticipants: participantsIcons,
  clickCount: clicksIcon,
  shareCount: shareIcon,
  viewCount: viewIcon,
  commentCount: commentIcon,
};

const CampaignFirstTier: FC = () => {
  const {
    state: { aggregates },
  }: StateTypes = useLocation();

  return (
    <TierDetailsLayout>
      <TierHeader title={'Tier 1: Campaign Engagement'} image={activityTier} />
      <div className="campaignFirstTierWrapper">
        {Object.entries(aggregates).map(([key, value], i) => {
          if (
            key === 'totalParticipants' ||
            key === 'clickCount' ||
            key === 'shareCount' ||
            key === 'viewCount' ||
            key === 'commentCount'
          )
            return <TierContent key={i} image={icons[key]} title={names[key]} value={value} />;
        })}
      </div>
    </TierDetailsLayout>
  );
};

export default CampaignFirstTier;
