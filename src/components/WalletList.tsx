import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { EthereumAddressList } from './EthereumAddressList';
import { StripeCardList } from './StripeCardList';

export const WalletList: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item container className="ethereum-address-list-header">
        <Grid item xs={7}>
          <Typography>METHOD</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <EthereumAddressList />
      </Grid>
      <Grid item>
        <StripeCardList />
      </Grid>
    </Grid>
  );
};
