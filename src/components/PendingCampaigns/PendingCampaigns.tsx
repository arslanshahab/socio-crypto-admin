import React, { useEffect, useState } from 'react';
import { Campaign, PendingCampaignStatus } from '../../types';
import { CircularProgress } from '@material-ui/core';
import styles from './pendingCampaigns.module.css';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import Pagination from '../Pagination/Pagination';
import GenericModal from '../GenericModal';
import { ApiClient } from '../../services/apiClient';

export const PendingCampaigns: React.FC = () => {
  const dispatch = useDispatch();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take] = useState(20);
  const [total, setTotal] = useState(0);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/campaign?skip=0&take=${take}&state=ALL&status=PENDING`, {
        withCredentials: true,
      });
      setCampaigns(data.data.items);
      setTotal(data.data.total);
      setLoading(false);
    };
    fetchData();
  }, [refetch]);

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  // Update campaign status
  const updateCampaignStatus = async (status: PendingCampaignStatus, campaignId: string) => {
    setSelectedCampaignId(campaignId);
    status === 'APPROVED' ? setAcceptLoading(true) : setRejectLoading(true);
    ApiClient.updatePendingCampaignStatus({ status, campaignId, reason: message })
      .then((res) => {
        dispatch(showSuccessAlert(res.message));
        setRefetch(!refetch);
      })
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => {
        setAcceptLoading(false);
        setRejectLoading(false);
        setIsOpen(false);
      });
  };

  const getValue = (skip: number) => {
    setSkip(skip);
  };

  const handleClose = () => {
    setIsOpen(false);
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
      <GenericModal open={isOpen} onClose={handleClose} size="medium">
        <div className={styles.textarea}>
          <textarea
            className={styles.textareaField}
            rows={7}
            placeholder="Enter reason for rejection"
            onChange={handleChange}
            value={message}
          />
          <div className={styles.sendButton}>
            <CustomButton
              className={buttonStyles.buttonPrimary}
              onClick={() => updateCampaignStatus('DENIED', selectedCampaignId)}
              loading={rejectLoading}
            >
              Send
            </CustomButton>
          </div>
        </div>
      </GenericModal>
      <h2 className={styles.heading}>Pending Campaigns</h2>
      {campaigns?.length <= 0 ? (
        <div>No pending campaigns</div>
      ) : (
        campaigns?.map((campaign) => (
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
                {campaign.type == 'crypto'
                  ? `${campaign.coiinTotal} ${campaign?.crypto?.type.toUpperCase() || ''}`
                  : ''}
              </p>
            </div>
            <div className={styles.contentWrapper}>
              <h6>Begins:</h6>
              <p>{new Date(campaign.beginDate).toDateString()}</p>
            </div>
            <div className={styles.contentWrapper}>
              <h6>Ends:</h6>
              <p>{new Date(campaign.endDate).toDateString()}</p>
            </div>
            <div className={styles.buttonWrapper}>
              <CustomButton
                onClick={() => updateCampaignStatus('APPROVED', campaign.id)}
                className={buttonStyles.buttonPrimary}
                loading={acceptLoading && selectedCampaignId === campaign.id}
              >
                Approve
              </CustomButton>
              <CustomButton
                onClick={() => {
                  setIsOpen(true);
                  setSelectedCampaignId(campaign.id);
                }}
                className={buttonStyles.secondaryButton}
              >
                Deny
              </CustomButton>
            </div>
          </div>
        ))
      )}
      {total > take && <Pagination skip={skip} take={take} total={total} getValue={getValue} />}
    </div>
  );
};
