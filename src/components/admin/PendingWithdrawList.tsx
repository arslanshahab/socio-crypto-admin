import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_PENDING_WITHDRAWALS, GET_WITHDRAWAL_HISTORY } from '../../operations/queries/admin';
import { useHistory } from 'react-router';

export const PendingWithdrawList: React.FC = () => {
  const history = useHistory();
  const { loading, data, error } = useQuery(GET_PENDING_WITHDRAWALS, {});

  const [loadHistory, { loading: historyLoading, data: historyData }] = useLazyQuery(GET_WITHDRAWAL_HISTORY, {});

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/withdraw', { data: data });
  };

  const renderManageWithdrawals = () => {
    if (loading) return <div></div>;
    if (data) {
      return (
        <div className="margin-bottom">
          <p>Pending Withdrawals</p>
          {data.getWithdrawalsV2.map((withdraw: any) => {
            return (
              <div className="pending-withdraw" key={withdraw.user.id} onClick={() => handleClick(withdraw)}>
                <ul>
                  <li>{withdraw.user.username}</li>
                  <li className="right">{`Total Pending Withdraw: ${withdraw.totalPendingWithdrawal} Coiin`}</li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  };

  const renderHistory = () => {
    if (historyLoading) return <div></div>;
    return (
      <div>
        <p>History</p>
        <div className="button-small primary" onClick={() => loadHistory()}>
          <p>Load History</p>
        </div>

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
      </div>
    );
  };
  return (
    <div>
      {renderManageWithdrawals()}
      {renderHistory()}
    </div>
  );
};
