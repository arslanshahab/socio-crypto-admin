import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { CryptoItem } from './CryptoItem';
import { GetFundingWalletResponse, ListCurrenciesResult, ListSupportedCryptoResults } from '../types';
import { RefetchWallet } from './PaymentsAccount';
import { CryptoDialog } from './CryptoDialog';
import AddIcon from '@material-ui/icons/Add';
import { useQuery } from '@apollo/client';
import { LIST_CURRENCIES, LIST_SUPPORTED_CRYPTO } from '../operations/queries/crypto';
import GenericModal from './GenericModal';
import DepositCryptoForm from './Forms/DepositCryptoForm';
import cardStyles from './StatCard/statCard.module.css';
import CustomButton from '../components/CustomButton';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const CryptoList: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const { data: currencyData, loading } = useQuery<ListSupportedCryptoResults>(LIST_SUPPORTED_CRYPTO);
  const { data: currencyList } = useQuery<ListCurrenciesResult>(LIST_CURRENCIES, { fetchPolicy: 'network-only' });
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
      <GenericModal open={openCrypto} onClose={() => setOpenCrypto(false)} size="small">
        <DepositCryptoForm cryptoList={currencyList?.getSupportedCurrencies} />
      </GenericModal>
      <Grid item container className="list-header" direction={'column'}>
        {/* <Grid item container>
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
        </Grid> */}
        {/* <Grid item container>
          <Grid item xs={4}>
            <Typography>Type</Typography>
          </Grid>
          <Grid item xs>
            <Typography>Balance</Typography>
          </Grid>
        </Grid> */}
      </Grid>
      {/* {renderCryptoList()} */}
      <div className="flex justify-between items-center border-b-2 mb-6">
        <h1 className="text-center py-4 text-blue-800 text-3xl font-semibold">Crypto Currencies</h1>
        <div className="flex justify-between items-center">
          {/* <CustomButton className="text-blue-600 w-16 p-1" onClick={() => setOpenCrypto(true)}>
            Deposit
          </CustomButton> */}
          {/* <Button color={'primary'} onClick={() => setOpenCrypto(true)}>
            Deposit
          </Button> */}
          <Button color={'primary'} onClick={() => setOpenRegistration(true)}>
            <AddIcon />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 px-4">
        {data?.getFundingWallet?.currency?.map((currency) => (
          <CryptoItem
            key={currency.id}
            name={currency.type}
            balance={currency.balance}
            id={currency.id}
            refetchWallet={refetchWallet}
          />
        ))}
      </div>
    </div>
  );
};
