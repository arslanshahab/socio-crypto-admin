import React from 'react';
import { ADMIN_LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { useMutation, useQuery } from '@apollo/client';
import { ListPendingCampaignsAdminResults } from '../types';
import { Button, Grid, Typography } from '@material-ui/core';
import { UPDATE_CAMPAIGN_STATUS } from '../operations/mutations/Admin';

export const PendingCampaigns: React.FC = () => {
  const { data, loading } = useQuery<ListPendingCampaignsAdminResults>(ADMIN_LIST_CAMPAIGNS);
  const [updateStatus] = useMutation(UPDATE_CAMPAIGN_STATUS);

  return (
    <Grid container direction={'column'}>
      <Grid item className="campaign-history-header">
        <Typography variant={'h5'}>Name</Typography>
      </Grid>
      {loading ? (
        <div />
      ) : (
        <div>
          {data &&
            data.listPendingCampaigns.results.map((campaign, index) => {
              return (
                <Grid
                  key={index}
                  container
                  item
                  direction={'row'}
                  style={{ paddingBottom: '5px' }}
                  className="campaign-history-item"
                >
                  <Grid item xs={9} style={{ marginTop: '13px' }}>
                    <Typography>{campaign.name}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{ marginBottom: '3px', marginTop: '6px' }}>
                    <Button
                      onClick={() => updateStatus({ variables: { status: 'APPROVED', campaignId: campaign.id } })}
                      variant={'contained'}
                      color={'primary'}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateStatus({ variables: { status: 'DENIED', campaignId: campaign.id } })}
                      variant={'contained'}
                      color={'primary'}
                      style={{ marginLeft: '2px' }}
                    >
                      Deny
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
        </div>
      )}
    </Grid>
  );
};
