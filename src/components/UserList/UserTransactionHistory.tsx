import React, { FC } from 'react';
import headingStyles from '../../assets/styles/heading.module.css';
import { UserTransactionHistoryTypes, UserTransactionHistoryTypesArray } from '../../types';
import styles from './userList.module.css';

const UserTransactionHistory: FC<UserTransactionHistoryTypesArray> = (props) => {
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
            {props.transactionHistory &&
              props.transactionHistory.map((transaction: UserTransactionHistoryTypes) => (
                <tr className={styles.tableBodyRow} key={transaction.id}>
                  <td className={styles.tableColumn}>{transaction.action}</td>
                  <td className={styles.tableColumn}>{transaction.currency}</td>
                  <td className={styles.tableColumn}>{transaction.amount}</td>
                  <td className={styles.tableColumn}>{transaction.status}</td>
                  <td className={styles.tableColumn}>{transaction.transactionHash}</td>
                  <td className={styles.tableColumn}>{new Date(transaction.createdAt).toDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactionHistory;
