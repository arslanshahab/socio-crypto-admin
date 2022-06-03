import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Campaign } from '../../types';
import { Button, CircularProgress } from '@material-ui/core';
import { UPDATE_CAMPAIGN_STATUS } from '../../operations/mutations/Admin';
import styles from './pendingCampaigns.module.css';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';

export const PendingCampaigns: React.FC = () => {
  // const { data, loading, refetch } = useQuery<ListPendingCampaignsAdminResults>(ADMIN_LIST_CAMPAIGNS, {
  //   fetchPolicy: 'network-only',
  // });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [take, setTake] = useState(10);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/campaign?skip=0&take=${take}&state=ALL&status=PENDING`, {
        withCredentials: true,
      });
      setCampaigns(data.data.items);
      setTake(data.data.total);
      setLoading(false);
    };
    fetchData();
  }, []);

  const [updateStatus, { loading: actionLoading }] = useMutation(UPDATE_CAMPAIGN_STATUS);
  const [status, setStatus] = useState({ status: '', campaignId: '' });

  const handleStatusChange = async (status: string, campaignId: string) => {
    setStatus({ status: status, campaignId: campaignId });
    await updateStatus({ variables: { status, campaignId } });
    // await refetch();
    setStatus({ status: '', campaignId: '' });
  };
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.heading}>Pending Campaigns</h2>
      {campaigns?.map((campaign) => (
        <div key={campaign.id} className={styles.campaignBox}>
          <div className={styles.contentWrapper}>
            <h6>Name:</h6>
            <p>{campaign.name}</p>
          </div>
          <div className={styles.contentWrapper}>
            <h6>Company:</h6>
            <p>{campaign.company}</p>
          </div>
          <div className={styles.contentWrapper}>
            <h6>Type:</h6>
            <p>{campaign.type}</p>
          </div>
          <div className={styles.contentWrapper}>
            <h6>Budget:</h6>
            <p>
              {campaign.type == 'crypto' ? `${campaign.coiinTotal} ${campaign?.crypto?.type.toUpperCase() || ''}` : ''}
            </p>
          </div>
          <div className={styles.contentWrapper}>
            <h6>Begins:</h6>
            <p>{new Date(parseInt(campaign.beginDate)).toLocaleDateString()}</p>
          </div>
          <div className={styles.contentWrapper}>
            <h6>Ends:</h6>
            <p>{new Date(parseInt(campaign.endDate)).toLocaleDateString()}</p>
          </div>
          <div className={styles.buttonWrapper}>
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
          </div>
        </div>
      ))}
    </div>
  );
};
