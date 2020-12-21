import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { StripeWallet } from '../types';
import { capitalize } from '../helpers';

interface Props {
  stripeWallet: StripeWallet;
}

export const StripeCardItem: React.FC<Props> = ({ stripeWallet }) => {
  return (
    <Grid container item direction={'row'} className="wallet-item">
      <Grid item>
        <Typography>{capitalize(stripeWallet.brand)}</Typography>
      </Grid>
      <Grid item style={{ marginLeft: '5px' }}>
        <Typography>(...{stripeWallet.last4})</Typography>
      </Grid>
    </Grid>
  );
};
