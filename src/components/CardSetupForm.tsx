import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CardSection } from './CardSection';
import { useMutation } from '@apollo/client';
import { AddPaymentMethod } from '../types';
import { ADD_PAYMENT_METHOD } from '../operations/mutations/stripe';
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core';
// import { reloadWindow } from '../helpers/fileHandler';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import CustomButton from './CustomButton';

interface Props {
  callback: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export const CardSetupForm: React.FC<Props> = ({ setOpen, callback, open }) => {
  const [addPaymentMethod, { loading }] = useMutation<AddPaymentMethod>(ADD_PAYMENT_METHOD, {
    refetchQueries: [{ query: LIST_PAYMENT_METHODS }],
  });
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
      } else {
        console.log('successfully added payment method');
        await callback();
      }
    } else {
      console.log('error: ', errors);
    }
    handleClose();
  };

  return (
    <Dialog open={open}>
      <h2 className="p-4 text-blue-800 text-xl font-semibold">Add Credit Card:</h2>
      <DialogContent style={{ width: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-9">
            <CardSection />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <CustomButton className="bg-blue-900 text-white w-32 rounded p-1.5" type={'submit'}>
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Submit'}
            </CustomButton>
            <CustomButton className="bg-blue-900 text-white w-32 rounded p-1.5" onClick={handleClose}>
              Cancel
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
