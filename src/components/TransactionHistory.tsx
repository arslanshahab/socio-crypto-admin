import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { TransferCard } from './TransferCard';
import { GetFundingWalletResponse } from '../types';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
}

export const TransactionHistory: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <Grid container>
      <Grid item>
        <Typography variant={'h5'}>Transaction History</Typography>
      </Grid>
      <Grid container item className="payments-account-history-header">
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
        {isLoading ? (
          <p>loading...</p>
        ) : (
          data &&
          data.getFundingWallet.transfers.map((transfer, index) => {
            return <TransferCard key={index} transfer={transfer} />;
          })
        )}
      </Grid>
    </Grid>
  );
};
