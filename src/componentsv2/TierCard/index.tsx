import React, { FC } from 'react';
import './tierCard.scss';
import tierOneIcon from '../../assets/svg/tiers/activity.svg';
import menuIcon from '../../assets/svg/tiers/more.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';
import usersIcon from '../../assets/svg/tiers/users.svg';
import tagUser from '../../assets/svg/tiers/tagUser.svg';
import { CampaignAggregationTypes } from '../../types';
import { useHistory } from 'react-router';

interface TierIProps {
  data: CampaignAggregationTypes;
}

const TierCard: FC<TierIProps> = ({ data }: TierIProps) => {
  const { push } = useHistory();

  return (
    <div className="tierCard">
      <div className="cardOutline" onClick={() => push('/dashboard/tier/campaignEngagement', data)}>
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={tierOneIcon} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
        </div>
        <div className="contentWrapper">
          <h3>{data.totalParticipants}</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+{data.lastWeekParticipants}</p>
              <img src={successIcon} alt="raiinmaker" />
            </div>
          </div>
        </div>
        <p>Tier 1: Campaign Engagement</p>
      </div>
      <div className="cardOutline">
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={usersIcon} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" />
        </div>
        <div className="contentWrapper">
          <h3>2,029</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+10.09</p>
              <img src={successIcon} alt="raiinmaker" />
            </div>
          </div>
        </div>
        <p>Tier 2: Campaign Engagement</p>
      </div>
      <div className="cardOutline">
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={tagUser} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
        </div>
        <div className="contentWrapper">
          <h3>402,591.00</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+130.09</p>
              <img src={successIcon} alt="raiinmaker" />
            </div>
          </div>
        </div>
        <p>Tier 3: Campaign Engagement</p>
      </div>
    </div>
  );
};

export default TierCard;
