import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Campaign, CampaignDaviationTypes } from '../../types';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '../../store/actions/alerts';
import { ApiClient } from '../../services/apiClient';
import headingStyles from '../../assets/styles/heading.module.css';

type State = {
  campaign: Campaign;
  isAudit: boolean;
};

const CampaignDetails: FC = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const { state }: { state: State } = useLocation();
  const { push } = useHistory();
  const { campaign, isAudit } = state;
  const [submitLoading, setSubmitLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [crypto, setCrypto] = useState('');
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [deviation, setDeviation] = useState<CampaignDaviationTypes>();

  useEffect(() => {
    try {
      const fetchPaidCrypto = async () => {
        setCryptoLoading(true);
        const { data } = await axios.get(`${apiURI}/v1/campaign/payout/${id}`, {
          withCredentials: true,
        });
        setCrypto(data.data.totalCrypto);
        setCryptoLoading(false);
      };
      fetchPaidCrypto();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchCampaignStats = async () => {
      ApiClient.getCampaignScore(id)
        .then((res) => setDeviation(res.data))
        .catch((err) => console.log(err))
        .finally(() => console.log('finally'));
    };
    fetchCampaignStats();
  }, []);
  // Audit campaign
  const handleSubmit = async () => {
    setSubmitLoading(true);
    await axios.post(
      `${apiURI}/v1/campaign/payout-campaign-rewards?campaignId=${id}`,
      {},
      {
        withCredentials: true,
      },
    );
    setSubmitLoading(false);
    dispatch(showSuccessAlert('Campaign audited successfully!'));
    push('/dashboard/admin/audit-campaigns');
  };

  // Delete campaign
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to reject this campaign?')) {
      setRejectLoading(true);
      await axios.post(
        `${apiURI}/v1/campaign/delete-campaign?campaignId=${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setRejectLoading(false);
      dispatch(showSuccessAlert('Campaign rejected successfully!'));
      push('/dashboard/admin/audit-campaigns');
    }
  };

  return (
    <div className="p-4 w-2/4">
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Name:</h6>
        <p className="w-3/5 text-sm">{campaign.name}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Total Coin:</h6>
        <p className="w-3/5 text-sm">{campaign.coiinTotal}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Symbol:</h6>
        <p className="w-3/5 text-sm">{campaign.symbol}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Audit Status:</h6>

        <p className={`text-red-600  text-sm shadow p-1 rounded inline`}>False</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Start Date:</h6>
        <p className="w-3/5 text-sm">{new Date(campaign.beginDate).toDateString()}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">End Date:</h6>
        <p className="w-3/5 text-sm">{new Date(campaign.endDate).toDateString()}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Description:</h6>
        <p className="w-3/5 text-sm">{campaign.description}</p>
      </div>
      {campaign?.participant.length >= 0 && (
        <div>
          <div className="flex p-2 mb-4 shadow">
            <h6 className="w-2/5">Total Participants:</h6>
            <p className="w-3/5 text-sm">{campaign?.participant?.length}</p>
          </div>
        </div>
      )}
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Paid Out Crypto:</h6>
        <p className="w-3/5 text-sm">{cryptoLoading ? 'Loading...' : crypto}</p>
      </div>
      <div className="flex p-2 mb-4 shadow">
        <h6 className="w-2/5">Average Clicks:</h6>
        <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.averageClicks}</p>
      </div>
      <div>
        <h4 className={`${headingStyles.headingSm} pb-2`}>Engagement Rate:</h4>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Click Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.clickRate}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Like Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.likeRate}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Share Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.shareRate}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">View Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.viewRate}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Comment Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.commentRate}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Submission Rate</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.engagementRates.submissionRate}</p>
        </div>
      </div>
      <div>
        <h4 className={`${headingStyles.headingSm} pb-2`}>Deviation:</h4>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Clicks:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.clicksStandardDeviation}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Likes:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.likeStandardDeviation}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Shares:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.sharesStandardDeviation}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Views:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.viewsStandardDeviation}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Comments:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.commentStandardDeviation}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Submissions:</h6>
          <p className="w-3/5 text-sm">{!deviation ? 'Loading...' : deviation.submissionsStandardDeviation}</p>
        </div>
      </div>

      {isAudit && (
        <div className="flex justify-evenly items-center  shadow h-12">
          <CustomButton className={buttonStyles.secondaryButton} onClick={handleDelete} loading={rejectLoading}>
            Reject
          </CustomButton>
          <CustomButton className={buttonStyles.buttonPrimary} onClick={handleSubmit} loading={submitLoading}>
            Submit Audit
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
