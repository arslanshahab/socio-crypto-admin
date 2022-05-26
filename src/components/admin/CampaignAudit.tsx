import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';

interface Props {
  auditDetails?: any;
  handleCampaignAuditModal?: any;
}

export const CampaignAudit: React.FC<Props> = ({ auditDetails, handleCampaignAuditModal }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    await axios.post(
      `${apiURI}/v1/campaign/payout-campaign-rewards?campaignId=${auditDetails.id}`,
      {},
      {
        withCredentials: true,
      },
    );
    setSubmitLoading(false);
    handleCampaignAuditModal(false);
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to reject this campaign?')) {
      setRejectLoading(true);
      await axios.post(
        `${apiURI}/v1/campaign/delete-campaign?campaignId=${auditDetails.id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setRejectLoading(false);
      handleCampaignAuditModal(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-blue-900 font-semibold text-2xl pb-3">Audit Detials:</h3>
      <div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Name:</h6>
          <p className="w-3/5 text-sm">{auditDetails?.name}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Total Coin:</h6>
          <p className="w-3/5 text-sm">{auditDetails?.coiinTotal}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Symbol:</h6>
          <p className="w-3/5 text-sm">{auditDetails?.symbol}</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Audit Status:</h6>

          <p className={`text-red-600  text-sm shadow p-1 rounded inline`}>False</p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Description:</h6>
          <p className="w-3/5 text-sm">{auditDetails?.description}</p>
        </div>
        {auditDetails?.participant.length >= 0 && (
          <div>
            <div className="flex p-2 mb-4 shadow">
              <h6 className="w-2/5">Total Participants:</h6>
              <p className="w-3/5 text-sm">{auditDetails?.participant?.length}</p>
            </div>
          </div>
        )}

        <div className="flex justify-evenly items-center pt-6">
          <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>
            {submitLoading ? <CircularProgress size={20} color="inherit" /> : 'Submit Audit'}
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={handleDelete}>
            {rejectLoading ? <CircularProgress size={20} color="inherit" /> : 'Reject Campaign'}
          </Button>
        </div>
      </div>
    </div>
  );
};
