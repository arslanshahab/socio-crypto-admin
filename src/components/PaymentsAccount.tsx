import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

export const PaymentsAccount: React.FC = () => {
  return (
    <div>
      <Paper className="payments-account">
        <Grid container direction={'column'} justify={'center'} spacing={2}>
          <Grid item>
            <Grid item>
              <Typography variant={'h4'}>Payments Account</Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item>
              <PaymentIcon />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction={'column'} spacing={2}>
                <Typography>How you pay</Typography>
                <Typography>Coiin</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Typography>To manage other forms of payments, please contact your account manager.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container direction={'column'}>
        <Grid item>
          <Typography>Ethereum Addresses</Typography>
          <Paper className="ethereum-address-paper">
            <Grid container justify={'center'}>
              <Grid item>
                <Typography>Add Ethereum Address</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction={'column'}>
        <Grid container item>
          <Typography>Claimed Ethereum Addresses</Typography>
        </Grid>
        <Grid item>
          <Paper className="ethereum-address-paper">
            <Grid container justify={'center'}>
              <Grid item>
                <Typography>Address</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction={'column'}>
        <Grid item>
          <Typography>Unclaimed Ethereum Addresses</Typography>
        </Grid>
        <Paper className="ethereum-address-paper">
          <Grid container>
            <Grid item container direction={'column'}>
              <Grid item>
                <Typography>Address</Typography>
              </Grid>
              <Grid item>Issue Claiming?</Grid>
            </Grid>
            <Grid item container justify={'flex-end'}>
              <Grid item>
                <Typography>Claim Address via Signature</Typography>
              </Grid>
              <Grid item>Enable web3/metamask to claim</Grid>
              <Grid item>Remove</Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
