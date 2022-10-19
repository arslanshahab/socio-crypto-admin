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
import TierDetails from '../TierDetails';

interface StateTypes {
  state: CampaignAggregationTypes;
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
  const { state }: StateTypes = useLocation();

  return (
    <div className="campaignTierWrapper">
      <div className="campaignTierOutline">
        <div className="headingWrapper">
          <div className="iconWrapper">
            <img src={activityTier} alt="Campaign Engagement" />
          </div>
          <h3>Tier 1: Campaign Engagement</h3>
        </div>
        {Object.entries(state).map(([key, value], i) => {
          if (
            key === 'totalParticipants' ||
            key === 'clickCount' ||
            key === 'shareCount' ||
            key === 'viewCount' ||
            key === 'commentCount'
          )
            return <TierDetails key={i} image={icons[key]} title={names[key]} value={value} />;
        })}
      </div>
    </div>
  );
};

export default CampaignFirstTier;
