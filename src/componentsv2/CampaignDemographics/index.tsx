import React, { FC } from 'react';
import TierDetailsLayout from '../../sections/TierDetailsLayout';
import TierHeader from '../TierHeader';
import './campaignDemographics.scss';
import usersIcon from '../../assets/svg/tiers/users.svg';
import { CampaignUsersTypes } from '../../types';
import { useLocation } from 'react-router-dom';

interface DemographicsStateTypes {
  state: {
    participants: CampaignUsersTypes[];
  };
}

const CampaignDemographics: FC = () => {
  const {
    state: { participants },
  }: DemographicsStateTypes = useLocation();

  return (
    <TierDetailsLayout>
      <TierHeader image={usersIcon} title="Tier 2: Campaign Demographics" />
      <div className="campaignDemographics">
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Age Range</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {participants?.map(({ id, user: { profile } }: CampaignUsersTypes) => (
                <tr key={id}>
                  <td>{profile.username}</td>
                  <td>{profile.ageRange}</td>
                  {profile.city && profile.country ? (
                    <td>
                      {profile.city}, {profile.country}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TierDetailsLayout>
  );
};

export default CampaignDemographics;
