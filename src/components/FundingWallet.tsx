import React, { useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { CreditCardList } from './CreditCardList';
import { AddressList } from './AddressList';
import { CryptoList } from './CryptoList';
import { GetFundingWalletResponse } from '../types';
import { CryptoDialog } from './CryptoDialog';
import { PurchaseDialog } from './PurchaseDialog';
import { ApolloQueryResult } from '@apollo/client';
import { RefetchWallet } from './PaymentsAccount';

interface Props {
  data: GetFundingWalletResponse | undefined;
  isLoading: boolean;
  refetchWallet: RefetchWallet;
}

export const FundingWallet: React.FC<Props> = ({ data, isLoading, refetchWallet }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [purchaseCoiin, setPurchaseCoiin] = useState(false);

  return (
    <Grid container direction={'column'}>
      <PurchaseDialog open={purchaseCoiin} setOpen={setPurchaseCoiin} />
      <CryptoDialog
        isTokenRegistration={true}
        open={openDialog}
        setOpenDialog={setOpenDialog}
        refetchWallet={refetchWallet}
      />
      <Grid item container spacing={1} justify={'flex-end'}>
        <Grid item>
          <Button variant={'contained'} color={'primary'} onClick={() => setPurchaseCoiin(true)}>
            Purchase Coiin Points
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Register ERC20 Token
          </Button>
        </Grid>
      </Grid>
      <CryptoList data={data} isLoading={isLoading} refetchWallet={refetchWallet} />
      <CreditCardList />
      <AddressList />
    </Grid>
  );
};
