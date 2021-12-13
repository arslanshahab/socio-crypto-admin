import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PENDING_WITHDRAWALS } from '../../../operations/queries/admin';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import styles from './pendingWithdrawList.module.css';

export const PendingWithdrawList = () => {
  const history = useHistory();
  //! GraphQL Queries
  const { data, loading } = useQuery(GET_PENDING_WITHDRAWALS, { fetchPolicy: 'network-only' });
  //! Loading
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  //! Functions
  const handleClick = (data: any) => {
    history.push('/dashboard/admin/withdraw', { data });
  };

  return (
    <div className={styles.pendingWithdrawListWrapper}>
      <h1 className={styles.withdrawalHeading}>Pending Withdrawals</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.withdrawColumn}>Name</th>
              <th className={styles.withdrawColumn}>Transfered Withdrawals</th>
              <th className={styles.withdrawColumn}>Pending Withdrawals</th>
              <th className={styles.withdrawColumn}>Total Annual Withdrawn</th>
              <th className={styles.withdrawColumn}>KYC Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.getWithdrawalsV2.map((withdraw: any, index: number) => (
              <tr className={styles.tableBodyRow} key={index} onClick={() => handleClick(withdraw)}>
                <td className={styles.withdrawColumn}>{withdraw.user.username}</td>
                <td className={styles.withdrawColumn}>{withdraw.transfers.length}</td>
                <td className={styles.withdrawColumn}>{withdraw.totalPendingWithdrawal.length}</td>
                <td className={styles.withdrawColumn}>${withdraw.totalAnnualWithdrawn}</td>
                <td
                  className={`${withdraw.user.kycStatus === 'pending' ? 'text-red-600' : 'text-green-600'} ${
                    styles.withdrawColumn
                  }`}
                >
                  {withdraw.user.kycStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
