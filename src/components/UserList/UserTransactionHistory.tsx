import React, { FC, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import headingStyles from '../../assets/styles/heading.module.css';
import { apiURI } from '../../clients/raiinmaker-api';
import { UserTransactionHistoryTypes } from '../../types';
import Pagination from '../Pagination/Pagination';
import styles from './userList.module.css';

const UserTransactionHistory: FC = () => {
  const { id }: { id: string } = useParams();
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchTransactionHistory = async () => {
        setLoading(true);
        const response = await axios.get(
          `${apiURI}/v1/user/user-transactions-history?skip=${skip}&take=${take}&userId=${id}`,
          {
            withCredentials: true,
          },
        );
        setTransactionHistory(response.data.data.items);
        setTotal(response.data.data.total);
        setLoading(false);
      };
      fetchTransactionHistory();
    } catch (error) {
      console.log(error);
    }
  }, [skip]);

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h3 className={headingStyles.headingSm}>Transfer User Record</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableColumn}>Action</th>
              <th className={styles.tableColumn}>Currency Type</th>
              <th className={styles.tableColumn}>Amount</th>
              <th className={styles.tableColumn}>Status</th>
              <th className={styles.tableColumn}>Transaction Hash</th>
              <th className={styles.tableColumn}>Active Since</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.length > 0 ? (
              transactionHistory.map((transaction: UserTransactionHistoryTypes) => (
                <tr className={styles.tableBodyRow} key={transaction.id}>
                  <td className={styles.tableColumn}>{transaction.action}</td>
                  <td className={styles.tableColumn}>{transaction.currency}</td>
                  <td className={styles.tableColumn}>{transaction.amount}</td>
                  <td className={styles.tableColumn}>{transaction.status}</td>
                  <td className={styles.tableColumn}>{transaction.transactionHash}</td>
                  <td className={styles.tableColumn}>
                    {new Date(transaction.createdAt).toDateString()},{' '}
                    {new Date(transaction.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            ) : (
              <p className="p-2">No transaction record found</p>
            )}
          </tbody>
        </table>
      </div>
      {total > take && <Pagination skip={skip} take={take} total={total} getValue={getValue} />}
    </div>
  );
};

export default UserTransactionHistory;
