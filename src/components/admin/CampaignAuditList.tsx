import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ADMIN_LIST_CAMPAIGN_QUERY } from '../../operations/queries/admin';
import { useHistory } from 'react-router';
import { Button, CircularProgress } from '@material-ui/core';

interface Props {
  location?: {
    state: {
      reload: boolean;
    };
  };
}

export const CampaignAuditList: React.FC<Props> = ({ location }) => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [skip, setSkip] = useState(0);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [getCampaigns, { loading, data, refetch }] = useLazyQuery(ADMIN_LIST_CAMPAIGN_QUERY, {
    variables: {
      open: false,
      scoped: true,
      approved: true,
      skip: skip,
      take: 10,
      pendingAudit: true,
    },
  });

  const loadData = async (skip: number) => {
    try {
      await getCampaigns();
      setCampaigns([...campaigns]);
      await setSkip(skip);
    } catch (e) {
      console.log('Error: Load Data Error');
      console.log(e);
    }
    await setLoaded(true);
  };

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/campaign-audit', { data: data });
  };

  const reloadList = () => {
    if (location && location.state && location.state && location.state.reload && refetch) {
      refetch();
    }
  };

  useEffect(reloadList, [location]);

  const renderManageWithdrawals = () => {
    if (!loaded) loadData(skip);
    if (loading)
      return (
        <div>
          <CircularProgress></CircularProgress>
        </div>
      );
    if (data) {
      if (data.listCampaigns.results.length == 0)
        return (
          <div>
            <p>No Auditable Campaigns Found</p>
          </div>
        );
      return (
        <div>
          {data.listCampaigns.results.map((campaign: any) => {
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
          {skip != 0 ? (
            <Button
              onClick={async () => {
                await loadData(skip - 10);
              }}
            >
              <p>Previous</p>
            </Button>
          ) : (
            <></>
          )}
          {skip + data.listCampaigns.results.length != data.listCampaigns.total ? (
            <Button
              onClick={async () => {
                await loadData(skip + 10);
              }}
            >
              <p>Next</p>
            </Button>
          ) : (
            <></>
          )}
        </div>
      );
    }
  };
  return <div>{renderManageWithdrawals()}</div>;
};
