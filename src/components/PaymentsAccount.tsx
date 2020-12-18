import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { WalletList } from './WalletList';
import { TransactionHistory } from './TransactionHistory';
import { useQuery } from '@apollo/client';
import { GetFundingWalletResponse } from '../types';
import { GET_FUNDING_WALLET } from '../operations/queries/fundingWallet';
import { AddPaymentMethod } from './AddPaymentMethod';
import { PurchaseDialog } from './PurchaseDialog';
import { CampaignInfoList } from './CampaignInfoList';

const coldWallet =
  process.env.NODE_ENV === 'production'
    ? '0x9f6fE7cF8CCC66477c9f7049F22FbbE35234274D'
    : '0x275EE6238D103fDBE49d4cF6358575aA914F8654';

export const PaymentsAccount: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setOpenPM] = useState(false);
  const { loading, data } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenNewPaymentMethod = () => {
    setOpenPM(true);
  };

  const renderWalletBalance = () => {
    if (loading) {
      return <div />;
    } else if (data && data.getFundingWallet.balance) {
      return data.getFundingWallet.balance;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <AddPaymentMethod open={paymentMethod} setOpen={setOpenPM} />
      <PurchaseDialog open={open} setOpen={setOpen} coldWallet={coldWallet} />
      <Grid container direction={'column'} spacing={2}>
        <Grid item xs={7}>
          <Paper className="payments-account">
            <Grid container item direction={'column'} justify={'center'} spacing={2}>
              <Grid container item>
                <Grid item xs={4}>
                  <Typography variant={'h4'}>Payments Account</Typography>
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={2} container>
                  <Typography>Balance: {renderWalletBalance()}</Typography>
                  <Button
                    variant={'contained'}
                    size={'small'}
                    color={'primary'}
                    style={{ textTransform: 'none' }}
                    onClick={handleClickOpen}
                  >
                    <Typography>Buy Coiin</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item>
                  <PaymentIcon />
                </Grid>
                <Grid item sm container>
                  <Grid item xs container direction={'column'} spacing={2}>
                    <Typography>How you pay</Typography>
                    <Typography>Coiin</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>To manage other forms of payments, please contact your account manager.</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className="ethereum-address-list">
            <Grid container direction={'row'}>
              <Grid item xs>
                <Typography variant={'h5'}>Payment Methods</Typography>
              </Grid>
              <Grid xs={6} />
              <Grid item xs>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  style={{ textTransform: 'none' }}
                  onClick={handleOpenNewPaymentMethod}
                >
                  Add Method
                </Button>
              </Grid>
            </Grid>
            <WalletList />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className="ethereum-address-list">
            <Grid container className="campaign-header" direction={'row'}>
              <Grid item xs={7}>
                <Typography variant={'h5'}>Campaigns</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant={'h6'}>Status</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant={'h6'}>Cost</Typography>
              </Grid>
            </Grid>
            <CampaignInfoList />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className="payments-account-history">
            <TransactionHistory data={data} isLoading={loading} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
