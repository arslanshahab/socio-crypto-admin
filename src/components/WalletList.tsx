import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AddressCard } from './AddressCard';
import { ListPaymentMethodsResults, ListWalletResponse } from '../types';
import { StripeCardItem } from './StripeCardItem';

interface WalletListProps {
  paymentMethods: ListPaymentMethodsResults | undefined;
  wallets: ListWalletResponse | undefined;
  callback: () => void;
}

export const WalletList: React.FC<WalletListProps> = (props) => {
  const renderWalletList = () => {
    const addressArray: JSX.Element[] = [];
    const cardArray: JSX.Element[] = [];

    if (!props.wallets && !props.paymentMethods) return <div />;
    let key = 0;
    if (props.wallets && props.wallets.listExternalAddresses.length > 0) {
      console.log(props.wallets);
      for (const address of props.wallets.listExternalAddresses) {
        addressArray.push(<AddressCard key={key} wallet={address} />);
        key++;
      }
    }
    if (props.paymentMethods && props.paymentMethods.listPaymentMethods.length > 0) {
      for (const card of props.paymentMethods.listPaymentMethods) {
        cardArray.push(<StripeCardItem key={key} stripeWallet={card} callback={props.callback} />);
        key++;
      }
    }
    return addressArray.concat(cardArray);
  };
  return (
    <Grid container direction={'column'}>
      <Grid item container className="list-header">
        <Grid item xs={7}>
          <Typography>METHOD</Typography>
        </Grid>
      </Grid>
      <Grid item>{renderWalletList()}</Grid>
    </Grid>
  );
};
