import React from 'react';
import { useQuery } from '@apollo/client';
import { ADMIN_LIST_CAMPAIGN_QUERY } from '../../operations/queries/admin';
import { useHistory } from 'react-router';

export const CampaignAuditList: React.FC = () => {
  const history = useHistory();
  const { loading, data, error } = useQuery(ADMIN_LIST_CAMPAIGN_QUERY, {
    variables: {
      open: false,
    },
  });

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/campaign-audit', { data: data });
  };

  const renderManageWithdrawals = () => {
    if (loading) return <div></div>;
    if (data) {
      console.log(data);
      console.log(error);
      return (
        <div>
          {data.listCampaigns.results.map((campaign: any) => {
            console.log(campaign);
            if (campaign.audited) return <div />;
            return (
              <div className="pending-withdraw" key={campaign.id} onClick={() => handleClick(campaign)}>
                <div>
                  <div className="flex-display">
                    <p>Campaign Name</p>
                    <p className="flex-item right">{campaign.name}</p>
                  </div>
                  <div className="flex-display">
                    <p>Audited</p>
                    <p className="flex-item right">{campaign.audited.toString()}</p>
                  </div>
                  <div className="flex-display">
                    <p>Campaign Ended</p>
                    <p className="flex-item right">{new Date(parseInt(campaign.endDate)).toString()}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
  return <div>{renderManageWithdrawals()}</div>;
};
