import React, { useState } from 'react';
import { ADMIN_LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { useMutation, useQuery } from '@apollo/client';
import { ListPendingCampaignsAdminResults } from '../types';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { UPDATE_CAMPAIGN_STATUS } from '../operations/mutations/Admin';

export const PendingCampaigns: React.FC = () => {
  const { data, loading, refetch } = useQuery<ListPendingCampaignsAdminResults>(ADMIN_LIST_CAMPAIGNS, {
    fetchPolicy: 'network-only',
  });
  const [updateStatus, { loading: actionLoading }] = useMutation(UPDATE_CAMPAIGN_STATUS);
  const [status, setStatus] = useState({ status: '', campaignId: '' });

  const handleStatusChange = async (status: string, campaignId: string) => {
    setStatus({ status: status, campaignId: campaignId });
    await updateStatus({ variables: { status, campaignId } });
    await refetch();
    setStatus({ status: '', campaignId: '' });
  };

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
                    <Typography>{`Name: ${campaign.name}`}</Typography>
                    <Typography>{`Company: ${campaign.company}`}</Typography>
                    <Typography>{`Type: ${campaign.type}`}</Typography>
                    <Typography>
                      {campaign.type == 'crypto'
                        ? `Budget: ${campaign.coiinTotal} ${campaign?.crypto?.type.toUpperCase() || ''}`
                        : ''}
                    </Typography>
                    <Typography>{`Begins: ${new Date(parseInt(campaign.beginDate)).toLocaleDateString()}`}</Typography>
                    <Typography>{`Ends: ${new Date(parseInt(campaign.endDate)).toLocaleDateString()}`}</Typography>
                  </Grid>
                  <Grid item xs={3} style={{ marginBottom: '3px', marginTop: '6px' }}>
                    <Button
                      onClick={() => handleStatusChange('APPROVED', campaign.id)}
                      variant={'contained'}
                      color={'primary'}
                      style={{ minWidth: '120px' }}
                    >
                      {actionLoading && status.status === 'APPROVED' && status.campaignId === campaign.id ? (
                        <CircularProgress size={25} style={{ color: 'white' }} />
                      ) : (
                        'Approve'
                      )}
                    </Button>
                    <Button
                      onClick={() => handleStatusChange('DENIED', campaign.id)}
                      variant={'contained'}
                      style={{ marginLeft: '2px', backgroundColor: '#ca2c2c', color: 'white', minWidth: '120px' }}
                    >
                      {actionLoading && status.status === 'DENIED' && status.campaignId === campaign.id ? (
                        <CircularProgress size={25} style={{ color: 'white' }} />
                      ) : (
                        'Deny'
                      )}
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
