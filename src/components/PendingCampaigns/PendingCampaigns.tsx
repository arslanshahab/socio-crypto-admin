import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Campaign } from '../../types';
import { Button, CircularProgress } from '@material-ui/core';
import { UPDATE_CAMPAIGN_STATUS } from '../../operations/mutations/Admin';
import styles from './pendingCampaigns.module.css';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';

export const PendingCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [take, setTake] = useState(10);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
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
  }, [take]);

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
            <CustomButton
              onClick={() => handleStatusChange('APPROVED', campaign.id)}
              className={buttonStyles.buttonPrimary}
              loading={acceptLoading}
            >
              Approve
            </CustomButton>
            <CustomButton
              onClick={() => handleStatusChange('DENIED', campaign.id)}
              className={buttonStyles.secondaryButton}
              loading={rejectLoading}
            >
              Deny
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  );
};
