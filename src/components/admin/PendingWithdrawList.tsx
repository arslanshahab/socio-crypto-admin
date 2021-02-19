import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PENDING_WITHDRAWALS } from '../../operations/queries/admin';
import { useHistory } from 'react-router';

export const PendingWithdrawList: React.FC = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [getPendingWithdrawals, { loading, data }] = useLazyQuery(GET_PENDING_WITHDRAWALS, {
    fetchPolicy: 'network-only',
  });

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/withdraw', { data: data });
  };

  const loadData = async () => {
    await getPendingWithdrawals();
    await setLoaded(true);
  };

  const renderManageWithdrawals = () => {
    if (!loaded) loadData();
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
                  <li className="right">{`Total Pending Withdraw: ${withdraw.totalPendingWithdrawal.length} token types`}</li>
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return <div>{renderManageWithdrawals()}</div>;
};
