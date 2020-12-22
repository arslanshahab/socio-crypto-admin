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
    const addressArray: JSX.Element[] = [];
    const cardArray: JSX.Element[] = [];
    if (loadingCards || loadingAddresses) {
      return <div />;
    } else {
      let key = 0;
      if (addressList && addressList.listExternalAddresses) {
        for (const address of addressList.listExternalAddresses) {
          addressArray.push(<AddressCard key={key} wallet={address} />);
          key++;
        }
      }
      if (cardList && cardList.listPaymentMethods) {
        for (const card of cardList.listPaymentMethods) {
          cardArray.push(<StripeCardItem key={key} stripeWallet={card} />);
          key++;
        }
      }
    }
    return addressArray.concat(cardArray);
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
