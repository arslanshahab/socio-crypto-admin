import React, { FC } from 'react';
import './campaignFirstTier.scss';
import activityTier from '../../assets/svg/tiers/activity.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';
import participantsIcons from '../../assets/svg/tiers/participants.svg';
import { useLocation } from 'react-router-dom';
import { CampaignAggregationTypes } from '../../types';
import clicksIcon from '../../assets/svg/tiers/clicksIcon.svg';
import commentIcon from '../../assets/svg/tiers/commentsIcon.svg';
import viewIcon from '../../assets/svg/tiers/viewsIcon.svg';
import shareIcon from '../../assets/svg/tiers/sharesIcon.svg';

interface StateTypes {
  state: CampaignAggregationTypes;
}

interface CampaignAnalyticTypes {
  [index: string]: string;
  totalParticipants: string;
  clickCount: string;
  shareCount: string;
  viewCount: string;
  commentCount: string;
}

const CampaignFirstTier: FC = () => {
  const { state }: StateTypes = useLocation();

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
          if (key === 'campaignName' || key === 'participationScore' || key === 'lastWeekParticipants') return;
          return (
            <div className="titleWrapper" key={i}>
              <img src={icons[key]} alt="" />
              <div className="tierContent">
                <p>{names[key]}:</p>
                <div className="counts">
                  <h3>{value}</h3>
                  <div className="successCount">
                    <p>+1981</p>
                    <img src={successIcon} alt="campaign success" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignFirstTier;
