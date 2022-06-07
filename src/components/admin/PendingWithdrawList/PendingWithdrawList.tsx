import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import styles from './pendingWithdrawList.module.css';
import { apiURI } from '../../../clients/raiinmaker-api';
import axios from 'axios';

export const PendingWithdrawList = () => {
  const history = useHistory();
  const [pendingWithdrawals, setPendingWithdrawals] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${apiURI}/v1/withdraw`, { withCredentials: true });
      setPendingWithdrawals(data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //! Functions
  const handleClick = (data: any) => {
    history.push('/dashboard/admin/withdraw', { data });
  };

  //! Loading
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
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
            {pendingWithdrawals?.map((withdraw: any, index: number) => (
              <tr className={styles.tableBodyRow} key={index} onClick={() => handleClick(withdraw)}>
                <td className={styles.withdrawColumn}>{withdraw?.user?.username || ''}</td>
                <td className={styles.withdrawColumn}>{(withdraw.transfers && withdraw.transfers.length) || 0}</td>
                <td className={styles.withdrawColumn}>
                  {(withdraw.totalPendingWithdrawal && withdraw.totalPendingWithdrawal.length) || 0}
                </td>
                <td className={styles.withdrawColumn}>${withdraw.totalAnnualWithdrawn || 0}</td>
                <td
                  className={`${
                    withdraw.user && withdraw.user.kycStatus === 'pending' ? 'text-red-600' : 'text-green-600'
                  } ${styles.withdrawColumn}`}
                >
                  {withdraw.user && withdraw.user.kycStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
