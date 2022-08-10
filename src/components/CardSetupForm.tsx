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
import buttonStyles from '../assets/styles/customButton.module.css';
import headingStyles from '../assets/styles/heading.module.css';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../store/actions/alerts';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export const CardSetupForm: React.FC<Props> = ({ setModal, open }) => {
  const dispatch = useDispatch();
  const [addPaymentMethod, { loading }] = useMutation<AddPaymentMethod>(ADD_PAYMENT_METHOD, {
    refetchQueries: [{ query: LIST_PAYMENT_METHODS }],
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => {
    setModal(false);
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
        dispatch(showErrorAlert('The credit card you have entered is invalid'));
        console.log('card error: ', result.error.message);
      } else {
        console.log('successfully added payment method');
        dispatch(showSuccessAlert('Successfully added payment method'));
      }
    } else {
      console.log('error: ', errors);
    }
    handleClose();
  };

  return (
    <Dialog open={open}>
      <h2 className={headingStyles.headingXl}>Add Credit Card</h2>
      <DialogContent style={{ width: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-9">
            <CardSection />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <CustomButton className={buttonStyles.buttonPrimary} type={'submit'}>
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Submit'}
            </CustomButton>
            <CustomButton className={buttonStyles.buttonPrimary} onClick={handleClose}>
              Cancel
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
