import React, { FC } from 'react';
import './campaignTier.scss';
import activityTier from '../../assets/svg/tiers/activity.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';
import participantsIcons from '../../assets/svg/tiers/participants.svg';

const CampaignTier: FC = () => {
  return (
    <div className="campaignTierOutline">
      <div className="headingWrapper">
        <div className="iconWrapper">
          <img src={activityTier} alt="Campaign Engagement" />
        </div>
        <h3>Tier 1: Campaign Engagement</h3>
      </div>
      <div className="titleWrapper">
        <img src={participantsIcons} alt="" />
        <div className="tierContent">
          <p>Total Participants:</p>
          <div className="counts">
            <h3>600,000</h3>
            <div className="successCount">
              <p>+1981</p>
              <img src={successIcon} alt="campaign success" />
            </div>
          </div>
        </div>
      </div>
      {/* ........................ */}
      <div className="titleWrapper">
        <img src={participantsIcons} alt="" />
        <div className="tierContent">
          <p>Total Participants:</p>
          <div className="counts">
            <h3>600,000</h3>
            <div className="successCount">
              <p>+1981</p>
              <img src={successIcon} alt="campaign success" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTier;
