import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PENDING_WITHDRAWALS } from '../../../operations/queries/admin';
import { useHistory } from 'react-router';
import styles from './pendingWithdrawList.module.css';

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
        <div className={styles.pendingWithdrawListWrapper}>
          <h1>Pending Withdrawals</h1>
          {/* //!-----------*********-------------  */}
          <div className="w-full pb-10 overflow-scroll">
            <table className="w-full table-auto bg-gray-50">
              <thead>
                <tr className="font-semibold bg-gray-100">
                  <th className="px-7 py-5 text-left">Name</th>
                  <th className="px-7 py-5 text-left">Transfered Withdrawals</th>
                  <th className="px-7 py-5 text-left">Pending Withdrawals</th>
                  <th className="px-7 py-5 text-left">Total Annual Withdrawn</th>
                  <th className="px-7 py-5 text-left">KYC Status</th>
                  <th className="px-7 py-5 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data?.getWithdrawalsV2.map((withdraw: any, index: number) => (
                  <tr
                    className="hover:bg-gray-100 border-b-2 border-solid border-gray-100"
                    key={index}
                    onClick={() => handleClick(withdraw)}
                  >
                    <td className="px-7 py-5 text-left capitalize">{withdraw.user.username}</td>
                    <td className="px-7 py-5 text-left capitalize">{withdraw.transfers.length}</td>
                    <td className="px-7 py-5 text-left capitalize">{withdraw.totalPendingWithdrawal.length}</td>
                    <td className="px-7 py-5 text-left capitalize">{withdraw.totalAnnualWithdrawn}</td>
                    <td className="px-7 py-5 text-left capitalize">{withdraw.user.kycStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* //!-----------______----------------- */}
          {/* {data.getWithdrawalsV2.map((withdraw: any) => {
            return (
              <div className="pending-withdraw" key={withdraw.user.id} onClick={() => handleClick(withdraw)}>
                <ul>
                  <li>{withdraw.user.username}</li>
                  <li className="right">{`Total Pending Withdraw: ${withdraw.totalPendingWithdrawal.length} token types`}</li>
                </ul>
              </div>
            );
          })} */}
        </div>
      );
    }
  };

  return <div>{renderManageWithdrawals()}</div>;
};
