import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TransferCard } from './TransferCard';
import { GetFundingWalletResponse } from '../types';
import { RefetchWallet } from './PaymentsAccount';
import { useQuery } from '@apollo/client';
import { GET_TRANSACTION_HISTORY } from '../operations/queries/fundingWallet';
import { GetTransactionHistory } from '../types';
import styles from './admin/PendingWithdrawList/pendingWithdrawList.module.css';
import { capitalize } from '../helpers/formatter';
import headingStyles from '../assets/styles/heading.module.css';
import { CircularProgress } from '@material-ui/core';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const TransactionHistory: React.FC<Props> = () => {
  const { data, loading, error } = useQuery<GetTransactionHistory>(GET_TRANSACTION_HISTORY, {
    fetchPolicy: 'network-only',
  });

  // const renderTransactionHistory = () => {
  //   let transactionList: JSX.Element[] = [];
  //   if (isLoading) {
  //     return <div />;
  //   } else if (data && data.getFundingWallet) {
  //     transactionList = data.getFundingWallet.transfers.map((transfer, index) => {
  //       return <TransferCard key={index} transfer={transfer} />;
  //     });
  //   }
  //   if (transactionList.length === 0) {
  //     return (
  //       <Grid item className="list-item">
  //         <Typography component="div">You have no transaction history</Typography>
  //       </Grid>
  //     );
  //   }
  //   return transactionList;
  // };
  if (loading) {
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
            {data &&
              data?.transactionHistory?.map((transfer: any, index) => {
                return (
                  <tr className={styles.tableBodyRow} key={index}>
                    <td className={styles.withdrawColumn}>{transfer.action}</td>
                    <td className={styles.withdrawColumn}>{transfer.amount}</td>
                    <td className={`${styles.withdrawColumn} uppercase`}>{transfer.currency || 'COIN'}</td>
                    <td className={styles.withdrawColumn}>{new Date(parseInt(transfer.createdAt)).toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
