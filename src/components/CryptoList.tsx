import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Typography } from '@material-ui/core';
import { CryptoItem } from './CryptoItem';
import { GetFundingWalletResponse, ListSupportedCryptoResults } from '../types';
import { coldWallet, RefetchWallet } from './PaymentsAccount';
import { CryptoDialog } from './CryptoDialog';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/client';
import { LIST_SUPPORTED_CRYPTO } from '../operations/queries/crypto';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const CryptoList: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const { data: currencyData, loading } = useQuery<ListSupportedCryptoResults>(LIST_SUPPORTED_CRYPTO);
  const [openCrypto, setOpenCrypto] = useState(false);
  const [openTokenRegistration, setOpenRegistration] = useState(false);

  const renderCryptoList = () => {
    let cryptoList: JSX.Element[] = [];
    if (isLoading) {
      return <div />;
    } else if (data && data.getFundingWallet) {
      cryptoList = data.getFundingWallet.currency.map((currency, index) => {
        return (
          <CryptoItem
            key={index}
            name={currency.type}
            balance={currency.balance}
            id={currency.id}
            refetchWallet={refetchWallet}
          />
        );
      });
    }
    if (cryptoList.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">Please register or add a supported crypto currency</Typography>
        </Grid>
      );
    }
    return cryptoList;
  };
  return (
    <div>
      <CryptoDialog
        isTokenRegistration={false}
        open={openTokenRegistration}
        setOpenDialog={setOpenRegistration}
        data={currencyData}
        isLoading={loading}
        refetchWallet={refetchWallet}
      />
      <Dialog open={openCrypto}>
        <DialogContent>
          <DialogContentText>
            Please send one of the listed tokens from one of your claimed addresses to this address:
          </DialogContentText>
          <DialogContentText>{coldWallet}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCrypto(false)} color="primary" variant={'contained'}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item container className="list-header" direction={'column'}>
        <Grid item container>
          <Grid item>
            <Typography component={'div'} variant={'h5'}>
              Crypto Currencies
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button color={'primary'} onClick={() => setOpenCrypto(true)}>
              Deposit
            </Button>
          </Grid>
          <Grid item>
            <Button color={'primary'} onClick={() => setOpenRegistration(true)}>
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={4}>
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs>
            <Typography>Balance</Typography>
          </Grid>
        </Grid>
      </Grid>
      {renderCryptoList()}
    </div>
  );
};
