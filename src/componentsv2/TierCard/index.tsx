import React, { FC } from 'react';
import './tierCard.scss';
import tierOneIcon from '../../assets/svg/tiers/activity.svg';
import menuIcon from '../../assets/svg/tiers/more.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';

const TierCard: FC = () => {
  return (
    <div className="tierCard">
      <div className="cardOutline">
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={tierOneIcon} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
        </div>
        <div className="contentWrapper">
          <h3>609,121</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+190.09</p>
              <img src={successIcon} alt="raiinmaker" />
            </div>
          </div>
        </div>
        <p>Tier 1: Campaign Engagement</p>
      </div>
      <div className="cardOutline">
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={tierOneIcon} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" />
        </div>
        <div className="contentWrapper">
          <h3>609,121</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+190.09</p>
              <img src={successIcon} alt="raiinmaker" />
            </div>
          </div>
        </div>
        <p>Tier 2: Campaign Engagement</p>
      </div>
      <div className="cardOutline">
        <div className="iconSection">
          <div className="iconWrapper">
            <img src={tierOneIcon} alt="campaign tiers" />
          </div>
          <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
        </div>
        <div className="contentWrapper">
          <h3>609,121</h3>
          <div className="analyticsWrapper">
            <div className="analytics">
              <p>+190.09</p>
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
