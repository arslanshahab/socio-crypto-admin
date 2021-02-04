import React, { useState } from 'react';
import { Button, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { WalletList } from './WalletList';
import { TransactionHistory } from './TransactionHistory';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GetFundingWalletResponse, ListPaymentMethodsResults, ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { GET_FUNDING_WALLET } from '../operations/queries/fundingWallet';
import { AddPaymentMethod } from './AddPaymentMethod';
import { PurchaseDialog } from './PurchaseDialog';
import { CampaignStatusList } from './CampaignStatusList';

export const coldWallet =
  process.env.NODE_ENV === 'production'
    ? '0x9f6fE7cF8CCC66477c9f7049F22FbbE35234274D'
    : '0x275EE6238D103fDBE49d4cF6358575aA914F8654';

export const PaymentsAccount: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [walletsLoaded, setWalletsLoaded] = useState(false);
  const [paymentMethod, setOpenPM] = useState(false);
  const { loading, data } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET);
  const [listWallets, { loading: listWalletsLoading, data: wallets }] = useLazyQuery<ListWalletResponse>(
    LIST_EXTERNAL_ADDRESSES,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [listPaymentMethods, { loading: listPaymentMethodsLoading, data: paymentMethods }] = useLazyQuery<
    ListPaymentMethodsResults
  >(LIST_PAYMENT_METHODS, {
    fetchPolicy: 'network-only',
  });

  const loadWalletData = async () => {
    console.log(0);
    await listWallets();
    console.log(1);
    await listPaymentMethods();
    console.log(2);
    await setWalletsLoaded(true);
    console.log(3);
  };

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

  const getBalance = () => {
    if (data && data.getFundingWallet.balance) {
      return data.getFundingWallet.balance;
    }
    return 0;
  };

  const renderWalletList = () => {
    if (!walletsLoaded) {
      loadWalletData();
      return <CircularProgress />;
    }
    return <WalletList wallets={wallets} paymentMethods={paymentMethods} callback={loadWalletData} />;
  };

  return (
    <div>
      <AddPaymentMethod open={paymentMethod} setOpen={setOpenPM} callback={loadWalletData} />
      <PurchaseDialog open={open} setOpen={setOpen} />
      <Grid container>
        <Grid item xs={7}>
          <Paper className="paper">
            <Grid container direction={'column'} spacing={4}>
              <Grid item>
                <Grid container item direction={'column'} justify={'center'} spacing={2}>
                  <Grid container item>
                    <Grid item xs={4}>
                      <Typography component={'div'} variant={'h4'}>
                        Payments Account
                      </Typography>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2} container className="buy-button-container">
                      <Typography component={'div'}>Balance: {renderWalletBalance()}</Typography>
                      <Button
                        variant={'contained'}
                        size={'small'}
                        color={'primary'}
                        className="button"
                        onClick={handleClickOpen}
                      >
                        <Typography component={'div'}>Buy Coiin Points</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container item spacing={2}>
                    <Grid item>
                      <PaymentIcon />
                    </Grid>
                    <Grid item sm container>
                      <Grid item xs container direction={'column'} spacing={2}>
                        <Typography component={'div'}>How you pay</Typography>
                        <Typography component={'div'}>Coiin</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography component={'div'}>
                      To manage other forms of payments, please contact your account manager.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction={'row'}>
                  <Grid item xs>
                    <Typography component={'div'} variant={'h5'}>
                      Payment Methods
                    </Typography>
                  </Grid>
                  <Grid item xs={6} />
                  <Grid item xs>
                    <Button
                      variant={'contained'}
                      color={'primary'}
                      className="button"
                      onClick={handleOpenNewPaymentMethod}
                    >
                      Add Method
                    </Button>
                  </Grid>
                </Grid>
                {renderWalletList()}
              </Grid>
              <Grid item>
                <CampaignStatusList balance={getBalance()} />
              </Grid>
              <Grid item>
                <div>
                  <TransactionHistory data={data} isLoading={loading} />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
