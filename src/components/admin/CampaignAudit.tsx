import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAMPAIGN, SUBMIT_AUDIT_REPORT } from '../../operations/queries/admin';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

interface Props {
  auditDetails?: any;
  handleCampaignAuditModal?: any;
}
interface StateInterface {
  loaded: boolean;
  rejected: string[];
}

export const CampaignAudit: React.FC<Props> = ({ auditDetails, handleCampaignAuditModal }) => {
  const [state, setState] = useState<StateInterface>({
    loaded: false,
    rejected: [],
  });
  const history = useHistory();

  const [submitReport] = useMutation(SUBMIT_AUDIT_REPORT, {
    variables: {
      campaignId: auditDetails?.id,
      rejected: state.rejected,
    },
  });
  const [deleteCampaign, { data: deletedCampaign }] = useMutation(DELETE_CAMPAIGN, {
    variables: {
      id: auditDetails?.id,
    },
  });
  useEffect(() => {
    if (deletedCampaign) {
      history.push('/dashboard/admin/audit-campaigns');
    }
  }, [deletedCampaign]);

  const handleSubmit = async () => {
    await submitReport();
    handleCampaignAuditModal(false);
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to reject this campaign?')) {
      await deleteCampaign();
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

          <p
            className={`${
              auditDetails?.audited == false ? 'text-red-600' : 'text-green-600'
            }  text-sm shadow p-1 rounded inline`}
          >
            {auditDetails?.audited.toString()}
          </p>
        </div>
        <div className="flex p-2 mb-4 shadow">
          <h6 className="w-2/5">Description:</h6>
          <p className="w-3/5 text-sm">{auditDetails?.description}</p>
        </div>
        {auditDetails?.participants.length >= 0 && (
          <div>
            <div className="flex p-2 mb-4 shadow">
              <h6 className="w-2/5">Total Participants:</h6>
              <p className="w-3/5 text-sm">{auditDetails?.participants?.length}</p>
            </div>
          </div>
        )}

        <div className="flex justify-evenly items-center pt-6">
          <Button variant="contained" color="primary" size="small" onClick={handleSubmit}>{`${
            state.rejected.length ? `Submit Audit, Rejecting ${state.rejected.length} Participants ` : 'Submit Audit'
          } `}</Button>
          <Button variant="contained" color="secondary" size="small" onClick={handleDelete}>
            Reject Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};
