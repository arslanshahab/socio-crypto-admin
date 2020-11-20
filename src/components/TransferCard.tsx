import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Transfer } from '../types';

interface Props {
  transfer: Transfer;
}

export const TransferCard: React.FC<Props> = ({ transfer }) => {
  const { amount, action, ethAddress, createdAt } = transfer;
  const actionCap = action.charAt(0).toUpperCase() + action.slice(1);
  const date = new Date(Number(createdAt));
  const time = new Date(Number(createdAt));
  const friendlyTimeStamp = `${date.toLocaleDateString('en-US')} ${time.toLocaleTimeString('en-US', {
    timeZoneName: 'short',
  })}`;
  return (
    <Grid container style={{ marginBottom: '5px' }}>
      <Grid item xs={1}>
        <Typography>{actionCap}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{amount}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>{ethAddress}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{friendlyTimeStamp}</Typography>
      </Grid>
    </Grid>
  );
};
