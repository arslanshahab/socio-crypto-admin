import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import { WalletCard } from './WalletCard';
import { useMutation, useQuery } from '@apollo/client';
import { ClaimEthereumAddress, GetFundingWalletResponse, ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { ATTACH_WALLET } from '../operations/mutations/ethereum';
import { GET_FUNDING_WALLET } from '../operations/queries/fundingWallet';
import { TransferCard } from './TransferCard';

interface AttachWallet {
  ethereumAddress: string;
}

const coldWallet =
  process.env.NODE_ENV === 'production'
    ? '0x9f6fE7cF8CCC66477c9f7049F22FbbE35234274D'
    : '0x275EE6238D103fDBE49d4cF6358575aA914F8654';

export const PaymentsAccount: React.FC = () => {
  const [address, setAddress] = useState('');
  const [open, setOpen] = React.useState(false);
  const { loading, data } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES);
  const { loading: loadingWallet, data: walletData } = useQuery<GetFundingWalletResponse>(GET_FUNDING_WALLET);
  const [attachWallet, { error }] = useMutation<ClaimEthereumAddress, AttachWallet>(ATTACH_WALLET);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    setAddress(e.target.value);
  };
  const handleAttachWallet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await attachWallet({ variables: { ethereumAddress: address } });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderWalletBalance = () => {
    if (loadingWallet) {
      return <div />;
    } else if (walletData && walletData.getFundingWallet.balance) {
      return walletData.getFundingWallet.balance;
    } else {
      return 0;
    }
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item xs={7}>
        <Paper className="payments-account">
          <Grid container item direction={'column'} justify={'center'} spacing={2}>
            <Grid container item>
              <Grid item xs={4}>
                <Typography component="div" variant={'h4'}>
                  Payments Account
                </Typography>
              </Grid>
              <Grid item xs={6} />
              <Grid item xs={2} container>
                <Typography component="div">Balance: {renderWalletBalance()}</Typography>
                <Button variant={'contained'} size={'small'} color={'primary'} onClick={handleClickOpen}>
                  <Typography component="div">Buy Coiin</Typography>
                </Button>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">{'Purchase Instructions'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please send funds from one of your claimed addresses to this address:
                    </DialogContentText>
                    <DialogContentText>{coldWallet}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                      Okay
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <PaymentIcon />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction={'column'} spacing={2}>
                  <Typography component="div">How you pay</Typography>
                  <Typography component="div">Coiin</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography component="div">
                To manage other forms of payments, please contact your account manager.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className="ethereum-address-list">
          <Grid item container className="ethereum-address-list-header">
            <Grid item xs={7}>
              <Typography component="div" variant={'h6'}>
                Ethereum Addresses
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography component="div" variant={'h6'}>
                Claimed
              </Typography>
            </Grid>
          </Grid>
          {loading ? (
            <p>loading...</p>
          ) : (
            <div>
              {data &&
                data.listExternalAddresses.map((wallet, index) => {
                  return <WalletCard key={index} wallet={wallet} />;
                })}
            </div>
          )}
          <Grid item>
            <form onSubmit={handleAttachWallet}>
              <div style={{ marginTop: '150px' }}>
                <TextField
                  style={{ width: '450px' }}
                  type={'text'}
                  name={'address'}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="New Address"
                  variant="outlined"
                />
                <div style={{ marginTop: '10px' }}>
                  <Button variant={'contained'} color={'primary'} type={'submit'}>
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className="payments-account-history">
          <Grid item>
            <Typography component="div" className="payments-account-history-header" variant={'h5'}>
              Transaction History
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1}>
              <Typography component="div" variant={'h6'}>
                Action
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component="div" variant={'h6'}>
                Amount
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography component="div" variant={'h6'}>
                ETH Address
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component="div" variant={'h6'}>
                Date
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {loadingWallet ? (
              <p>loading...</p>
            ) : (
              walletData &&
              walletData.getFundingWallet.transfers.map((transfer, index) => {
                return <TransferCard key={index} transfer={transfer} />;
              })
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
