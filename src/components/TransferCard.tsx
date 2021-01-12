import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Transfer } from '../types';

interface Props {
  transfer: Transfer;
}

export const TransferCard: React.FC<Props> = ({ transfer }) => {
  const { amount, action, createdAt, currency } = transfer;
  const actionCap = action.charAt(0).toUpperCase() + action.slice(1);
  const date = new Date(Number(createdAt));
  const time = new Date(Number(createdAt));
  const friendlyTimeStamp = `${date.toLocaleDateString('en-US')} ${time.toLocaleTimeString('en-US', {
    timeZoneName: 'short',
  })}`;
  return (
    <Grid container item direction={'row'} className="list-row">
      <Grid item xs={1} className="list-item">
        <Typography component="div">{actionCap}</Typography>
      </Grid>
      <Grid item xs={2} className="list-item">
        <Typography component="div">{amount}</Typography>
      </Grid>
      <Grid item xs={6} className="list-item">
        <Typography component="div">{currency === 'usd' ? 'USD' : 'COIIN'}</Typography>
      </Grid>
      <Grid item xs={3} className="list-item">
        <Typography component="div">{friendlyTimeStamp}</Typography>
      </Grid>
    </Grid>
  );
};
