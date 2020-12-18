import React from 'react';
import { useQuery } from '@apollo/client';
import { ListPaymentMethodsResults } from '../types';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { Grid } from '@material-ui/core';
import { StripeCardItem } from './StripeCardItem';

export const StripeCardList: React.FC = () => {
  const { data, loading } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);

  return (
    <Grid container direction={'column'}>
      {loading ? (
        <div />
      ) : (
        <div>
          {data &&
            data.listPaymentMethods.map((wallet, index) => {
              return <StripeCardItem key={index} stripeWallet={wallet} />;
            })}
        </div>
      )}
    </Grid>
  );
};
