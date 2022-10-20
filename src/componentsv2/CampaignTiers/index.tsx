import React, { FC } from 'react';
import './campaignTiers.scss';
import menuIcon from '../../assets/svg/tiers/more.svg';
import successIcon from '../../assets/svg/tiers/successIcon.svg';
import { CampaignAggregationTypes, SocialPostMetrics, UserDemographicsTypes } from '../../types';
import { useHistory } from 'react-router';
// import { campaignTiersData } from '../../helpers/constants';
import usersIcon from '../../assets/svg/tiers/users.svg';
import tagUser from '../../assets/svg/tiers/tagUser.svg';
import tierOneIcon from '../../assets/svg/tiers/activity.svg';

interface TierIProps {
  aggregates: CampaignAggregationTypes;
  socialPostMetrics: SocialPostMetrics[];
  demographics: UserDemographicsTypes;
}

const CampaignTiers: FC<TierIProps> = ({ aggregates, socialPostMetrics, demographics }: TierIProps) => {
  const { push } = useHistory();

  const campaignTiersData = [
    {
      name: 'totalParticipants',
      image: tierOneIcon,
      description: 'Tier 1: Campaign Engagement',
      link: '/dashboard/campaign/engagement',
      data: aggregates,
    },
    {
      name: 'totalUsers',
      image: usersIcon,
      description: 'Tier 2: Campaign Demographics',
      link: '/dashboard/campaign/demographics',
      data: demographics,
    },
    {
      name: 'totalSocialPosts',
      image: tagUser,
      description: 'Tier 3: Campaign by Channel',
      link: '/dashboard/campaign/channel/engagement',
      data: socialPostMetrics,
    },
  ];

  return (
    <div className="campaignTiers">
      {campaignTiersData.map((x) => (
        <div className="cardOutline" key={x.description} onClick={() => push(x.link, x.data)}>
          <div className="iconSection">
            <div className="iconWrapper">
              <img src={x.image} alt="campaign tiers" />
            </div>
            <img src={menuIcon} alt="campaign tiers" className="menuIcon" />
          </div>
          <div className="contentWrapper">
            {x.name === 'totalUsers' ? <h3>{demographics.count || 0}</h3> : <h3>{aggregates[x.name] || 0}</h3>}
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
