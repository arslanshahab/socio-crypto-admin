import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CardSection } from './CardSection';
import { useMutation } from '@apollo/client';
import { AddPaymentMethod } from '../types';
import { ADD_PAYMENT_METHOD } from '../operations/mutations/stripe';
import { Button, Grid } from '@material-ui/core';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardSetupForm: React.FC<Props> = ({ setOpen }) => {
  const [addPaymentMethod] = useMutation<AddPaymentMethod>(ADD_PAYMENT_METHOD);
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, errors } = await addPaymentMethod();
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) throw new Error('null card element');
    if (data && data.addPaymentMethod) {
      const result = await stripe.confirmCardSetup(data.addPaymentMethod.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
      if (result.error) {
        console.log('card error: ', result.error.message);
        // Display result.error.message in your UI.
      } else {
        console.log('success: ', result.setupIntent?.payment_method);
        // The setup has succeeded. Display a success message and send
        // result.setupIntent.payment_method to your server to save the
        // card to a Customer
      }
    } else {
      console.log('error: ', errors);
    }
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container justify={'center'} direction={'column'}>
        <Grid item>
          <CardSection />
        </Grid>
      </Grid>
      <Grid container item justify={'center'} spacing={2} style={{ marginTop: '25px' }}>
        <Grid item>
          <Button variant={'contained'} color={'primary'} type={'submit'}>
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button variant={'contained'} color={'primary'} onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
