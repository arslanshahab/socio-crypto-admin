import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { StripeWallet } from '../types';
import { capitalize } from '../helpers';
import { useMutation } from '@apollo/client';
import { REMOVE_PAYMENT_METHOD } from '../operations/mutations/stripe';

interface Props {
  stripeWallet: StripeWallet;
}

interface RemoveStripeWalletVars {
  paymentMethodId: string;
}

export const StripeCardItem: React.FC<Props> = ({ stripeWallet }) => {
  const [removePaymentMethod, { error }] = useMutation<boolean, RemoveStripeWalletVars>(REMOVE_PAYMENT_METHOD);
  return (
    <Grid container item direction={'row'} className="list-row">
      <Grid item className="list-item">
        <Typography>{capitalize(stripeWallet.brand)}</Typography>
      </Grid>
      <Grid item className="list-item" style={{ marginLeft: '5px' }}>
        <Typography>(...{stripeWallet.last4})</Typography>
      </Grid>
      <Grid item className="list-item">
        <Button
          size={'small'}
          color={'primary'}
          onClick={() => removePaymentMethod({ variables: { paymentMethodId: stripeWallet.id } })}
        >
          <Typography component="div">X</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
