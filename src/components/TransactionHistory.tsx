import React, { useEffect, useState } from 'react';
import styles from './admin/PendingWithdrawList/pendingWithdrawList.module.css';
import headingStyles from '../assets/styles/heading.module.css';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';

type CurrencyTypes = {
  action: string;
  amount: number;
  currency: string;
  createdAt: string;
};

export const TransactionHistory: React.FC = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios(`${apiURI}/v1/funding-wallet/transaction-history`, { withCredentials: true });
      setTransactionHistory(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1 className={headingStyles.headingXl}>Transaction History</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.withdrawColumn}>Action</th>
              <th className={styles.withdrawColumn}>Amount</th>
              <th className={styles.withdrawColumn}>Currency Type</th>
              <th className={styles.withdrawColumn}>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactionHistory &&
              transactionHistory?.map((transfer: CurrencyTypes, index) => {
                return (
                  <tr className={styles.tableBodyRow} key={index}>
                    <td className={styles.withdrawColumn}>{transfer.action}</td>
                    <td className={styles.withdrawColumn}>{transfer.amount}</td>
                    <td className={`${styles.withdrawColumn} uppercase`}>{transfer.currency || 'COIN'}</td>
                    <td className={styles.withdrawColumn}>{new Date(transfer.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
