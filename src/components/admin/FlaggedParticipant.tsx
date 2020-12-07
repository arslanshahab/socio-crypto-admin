import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  location?: {
    state: {
      data: any;
    };
  };
  total: string;
  toggleRejected: any;
  flagged: {
    participantId: string;
    totalPayout: string;
    clickPayout: string;
    submissionPayout: string;
    viewPayout: string;
  };
}

export const FlaggedParticipant: React.FC<Props> = (props) => {
  interface StateInterface {
    open: boolean;
    rejected: boolean;
  }
  const [state, setState] = useState<StateInterface>({
    open: false,
    rejected: false,
  });

  const toggle = () => {
    setState({ ...state, open: !state.open });
  };

  const getPayoutPercentage = (participantPayout: number, totalPayout: number) => {
    if (participantPayout == 0) return 0;
    if (participantPayout < 1) return `${((participantPayout / totalPayout) * 100).toFixed(2)}%`;
    const percentage = (totalPayout / participantPayout) * 100;
    console.log('percentage');
    console.log(percentage);
    return `${percentage.toFixed(2)}%`;
  };

  const handleButtonClick = () => {
    setState({ ...state, rejected: !state.rejected });

    props.toggleRejected(props.flagged.participantId);
  };

  return (
    <div key={props.flagged.participantId}>
      <div className="flex-display">
        <p>{props.flagged.participantId}</p>
        <div className="flex-item  right">
          <div className="flex-display">
            <p className="flex-item right">
              {getPayoutPercentage(parseFloat(props.flagged.totalPayout), parseFloat(props.total))}
            </p>
            <div className="padding-left" onClick={toggle}>
              <FaAngleDown></FaAngleDown>
            </div>
          </div>
        </div>
      </div>
      {state.open ? (
        <div>
          <div className="flex-display">
            <p>Click Payout</p>
            <p className="flex-item right">{props.flagged.clickPayout}</p>
          </div>
          <div className="flex-display">
            <p>View Payout</p>
            <p className="flex-item right">{props.flagged.viewPayout}</p>
          </div>
          <div className="flex-display">
            <p>Submission Payout</p>
            <p className="flex-item right">{props.flagged.submissionPayout}</p>
          </div>
          <div className="flex-display">
            <p>Total Payout</p>
            <p className="flex-item right">{props.flagged.totalPayout}</p>
          </div>
          <div className="submit-buttons">
            <div className={`button ${state.rejected ? 'approve' : 'reject'}`} onClick={() => handleButtonClick()}>
              <p>{`${state.rejected ? 'Revert Rejection' : 'Reject Participant'}`}</p>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
