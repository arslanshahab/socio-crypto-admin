import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN_REPORT, DELETE_CAMPAIGN, SUBMIT_AUDIT_REPORT } from '../../operations/queries/admin';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { FlaggedParticipant } from './FlaggedParticipant';
import { useHistory } from 'react-router-dom';

interface Props {
  location?: {
    state: {
      data: any;
    };
  };
  routeState?: {
    data: any;
  };
}

export const CampaignAudit: React.FC<Props> = ({ location }) => {
  interface StateInterface {
    loaded: boolean;
    rejected: string[];
  }
  const [state, setState] = useState<StateInterface>({
    loaded: false,
    rejected: [],
  });
  const history = useHistory();

  const [generateReport, { data }] = useMutation(CREATE_CAMPAIGN_REPORT, {
    variables: {
      campaignId: location ? location.state.data.id : '',
    },
  });

  const [submitReport] = useMutation(SUBMIT_AUDIT_REPORT, {
    variables: {
      campaignId: location ? location.state.data.id : '',
      rejected: state.rejected,
    },
  });

  const [deleteCampaign, { data: deletedCampaign }] = useMutation(DELETE_CAMPAIGN, {
    variables: {
      id: location ? location.state.data.id : '',
    },
  });

  const handleSubmit = async () => {
    await submitReport();
  };

  const loadData = async () => {
    await generateReport();
    setState({ ...state, loaded: true });
  };

  const toggleRejected = (id: string) => {
    let temp = [];
    temp = state.rejected;
    const index = temp.indexOf(id);
    if (index >= 0) {
      temp.splice(index, 1);
    } else {
      temp.push(id);
    }
    setState({ ...state, rejected: temp });
  };

  useEffect(() => {
    if (deletedCampaign) {
      history.push('/dashboard/admin/audit-campaigns');
    }
  }, [deletedCampaign]);

  const renderAudit = () => {
    if (!state.loaded) {
      loadData();
      return <CircularProgress />;
    }

    if (data) {
      return (
        <div>
          <div className="card">
            <p>Metrics</p>
            <div className="flex-display">
              <p>Total Clicks</p>
              <p className="flex-item right">{data.generateCampaignAuditReport.totalClicks}</p>
            </div>
            <div className="flex-display">
              <p>Total Views</p>
              <p className="flex-item right">{data.generateCampaignAuditReport.totalViews}</p>
            </div>
            <div className="flex-display">
              <p>Total Submmissions</p>
              <p className="flex-item right">{data.generateCampaignAuditReport.totalSubmissions}</p>
            </div>
            <div className="flex-display">
              <p>Total Reward Payout</p>
              <p className="flex-item right">{data.generateCampaignAuditReport.totalRewardPayout}</p>
            </div>
          </div>
          <div className="card">
            <p>Flagged Participants</p>
            {data.generateCampaignAuditReport.flaggedParticipants.map((flagged: any) => {
              return (
                <FlaggedParticipant
                  key={flagged.particpantId}
                  flagged={flagged}
                  total={data.generateCampaignAuditReport.totalRewardPayout}
                  toggleRejected={toggleRejected}
                />
              );
            })}
          </div>
          <Box
            marginTop={2}
            minWidth="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Button className="customButton submitButton" onClick={handleSubmit}>{`${
              state.rejected.length ? `Submit Audit, Rejecting ${state.rejected.length} Participants ` : 'Submit Audit'
            } `}</Button>
            <Button className="customButton deleteButton" onClick={() => deleteCampaign()}>
              Reject Campaign
            </Button>
          </Box>
        </div>
      );
    }
  };
  return <div>{renderAudit()}</div>;
};
