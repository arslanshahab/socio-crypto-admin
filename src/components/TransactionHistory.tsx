import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TransferCard } from './TransferCard';
import { GetFundingWalletResponse } from '../types';
import { RefetchWallet } from './PaymentsAccount';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const TransactionHistory: React.FC<Props> = ({ data, isLoading }) => {
  // debugger;
  console.log('TransactionHistory data: ', data);
  const renderTransactionHistory = () => {
    let transactionList: JSX.Element[] = [];
    if (isLoading) {
      return <div />;
    } else if (data && data.getFundingWallet) {
      transactionList = data.getFundingWallet.transfers.map((transfer, index) => {
        return <TransferCard key={index} transfer={transfer} />;
      });
    }
    if (transactionList.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">You have no transaction history</Typography>
        </Grid>
      );
    }
    return transactionList;
  };
  return (
    <Grid container className="section">
      <Grid item>
        <Typography variant={'h5'}>Transaction History</Typography>
      </Grid>
      <Grid container item className="list-header">
        <Grid item container>
          <Grid item xs={1}>
            <Typography>Action</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Amount</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Method</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>Date</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item direction={'column'}>
        {/* {renderTransactionHistory()} */}
      </Grid>
    </Grid>
  );
};
