import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AddressCard } from './AddressCard';
import { useQuery } from '@apollo/client';
import { ListPaymentMethodsResults, ListWalletResponse } from '../types';
import { LIST_EXTERNAL_ADDRESSES } from '../operations/queries/ethereum';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { StripeCardItem } from './StripeCardItem';

export const WalletList: React.FC = () => {
  const { loading: loadingAddresses, data: addressList } = useQuery<ListWalletResponse>(LIST_EXTERNAL_ADDRESSES);
  const { data: cardList, loading: loadingCards } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);

  const renderWalletList = () => {
    const walletList: JSX.Element[] = [];
    if (loadingCards || loadingAddresses) {
      return <div />;
    } else {
      if (addressList && addressList.listExternalAddresses) {
        addressList.listExternalAddresses.map((wallet, index) => {
          walletList.push(<AddressCard key={index} wallet={wallet} />);
        });
      }
      if (cardList && cardList.listPaymentMethods) {
        cardList.listPaymentMethods.map((wallet, index) => {
          walletList.push(<StripeCardItem key={index} stripeWallet={wallet} />);
        });
      }
    }
    return walletList;
  };
  return (
    <Grid container direction={'column'}>
      <Grid item container className="ethereum-address-list-header">
        <Grid item xs={7}>
          <Typography>METHOD</Typography>
        </Grid>
      </Grid>
      <Grid item>{renderWalletList()}</Grid>
    </Grid>
  );
};
