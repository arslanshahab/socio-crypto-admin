import React, { FC } from 'react';
import './campaignTiers.scss';
import menuIcon from '../../assets/svg/tiers/more.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';
import { CampaignAggregationTypes, SocialPostMetrics } from '../../types';
import { useHistory } from 'react-router';
import { campaignTiersData } from '../../helpers/constants';

interface TierIProps {
  aggregates: CampaignAggregationTypes;
  socialPostMetrics: SocialPostMetrics[];
}

const CampaignTiers: FC<TierIProps> = ({ aggregates, socialPostMetrics }: TierIProps) => {
  const { push } = useHistory();

  return (
    <div className="campaignTiers">
      {campaignTiersData.map((x) => (
        <div
          className="cardOutline"
          key={x.description}
          onClick={() => push(x.link, { aggregates, socialPostMetrics })}
        >
          <div className="iconSection">
            <div className="iconWrapper">
              <img src={x.image} alt="campaign tiers" />
            </div>
            <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
          </div>
          <div className="contentWrapper">
            <h3>{aggregates[x.name] || 0}</h3>
            <div className="analyticsWrapper">
              <div className="analytics">
                <p>+0</p>
                <img src={successIcon} alt="raiinmaker" />
              </div>
            </div>
          </div>
          <p>{x.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignTiers;
