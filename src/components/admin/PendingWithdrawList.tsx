import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PENDING_WITHDRAWALS } from '../../operations/queries/admin';
import { useHistory } from 'react-router';

export const PendingWithdrawList: React.FC = () => {
  const history = useHistory();
  const { loading, data, error } = useQuery(GET_PENDING_WITHDRAWALS, {
    variables: { status: 'pending' },
  });

  const handleClick = (data: any) => {
    history.push('/dashboard/admin/withdraw', { data: data });
  };

  const renderManageWithdrawals = () => {
    if (loading) return <div></div>;
    if (data) {
      console.log(data);
      console.log(error);
      return (
        <div>
          {data.getWithdrawalsV2.map((withdraw: any) => {
            console.log(withdraw);
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
  return <div>{renderManageWithdrawals()}</div>;
};
