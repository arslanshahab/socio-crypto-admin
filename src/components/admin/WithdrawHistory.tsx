import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WITHDRAWAL_HISTORY } from '../../operations/queries/admin';

export const WithdrawHistory: React.FC = () => {
  const [loadHistory, { loading: historyLoading, data: historyData }] = useLazyQuery(GET_WITHDRAWAL_HISTORY, {});

  const renderHistory = () => {
    if (historyLoading) return <div></div>;
    return (
      <div>
        <p>Transfer History</p>
        {historyData &&
          historyData.getWithdrawalHistory.map((transfer: any) => {
            const isCoiinTransfer = transfer.ethAddress != null;
            return (
              <div className="withdraw-contianer" key={transfer.id}>
                <div className="withdraw-item flex-reverse">
                  <p className="amount paddin-right">{`${
                    isCoiinTransfer ? transfer.amount + ' COIIN' : transfer.amount * 0.1 + ' USD'
                  } `}</p>
                </div>
                <div className="withdraw-item flex-reverse">
                  <p className="amount paddin-right">{`${transfer.withdrawStatus}`}</p>
                </div>
                <div className="withdraw-item flex-reverse">
                  <p className="date padding-right">{`${new Date(
                    parseInt(transfer.createdAt),
                  ).toLocaleDateString()}`}</p>
                  <p className="date padding-right">{`${new Date(
                    parseInt(transfer.createdAt),
                  ).toLocaleTimeString()}`}</p>
                  <p className="date padding-right right">{`UTC`}</p>
                </div>
                <div className="address-container">
                  <p className="amount right">{`${isCoiinTransfer ? transfer.ethAddress : transfer.paypalAddress} `}</p>
                </div>
              </div>
            );
          })}
        <div className="flex-display">
          <div className="flex-item right button-small primary" onClick={() => loadHistory()}>
            <p>Load Withdraws</p>
          </div>
        </div>
      </div>
    );
  };
  return <div>{renderHistory()}</div>;
};
