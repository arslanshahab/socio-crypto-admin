import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { apiURI } from '../../clients/raiinmaker-api';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Campaign } from '../../types';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { useDispatch } from 'react-redux';
import { showSuccessAlert } from '../../store/actions/alerts';

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
  const [postsCount, setPostsCount] = useState(0);
  const [postsLoading, setPostsLoading] = useState(false);

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

  // Get campaign posts count
  const getCampaignPostsCount = () => {
    setPostsLoading(true);
    axios
      .get(`${apiURI}/v1/social/posts/${id}`, { withCredentials: true })
      .then((response) => {
        setPostsCount(response.data.data.count);
      })
      .catch((error) => console.log(error))
      .finally(() => setPostsLoading(false));
  };
  useEffect(() => {
    getCampaignPostsCount();
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
        <h6 className="w-2/5">Total Posts:</h6>
        <p className="w-3/5 text-sm">{postsLoading ? 'Loading...' : postsCount}</p>
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
