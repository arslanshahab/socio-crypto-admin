import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CardSection } from '../CardSection';
import { Dialog, DialogContent } from '@material-ui/core';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import headingStyles from '../../assets/styles/heading.module.css';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../store/actions/alerts';
import { ApiClient } from '../../services/apiClient';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  callback?: () => void;
}

export const CardSetupForm: React.FC<Props> = ({ setModal, open, callback }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleClose = () => {
    setModal(false);
  };

  const addPaymentMethod = async () => {
    try {
      return await ApiClient.addPaymentMethod();
    } catch (error: any) {
      dispatch(showErrorAlert(error.message));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = await addPaymentMethod();
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) throw new Error('null card element');
    if (data?.clientSecret) {
      const result = await stripe.confirmCardSetup(data.clientSecret, {
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
        callback && callback();
      }
    } else {
      dispatch(showErrorAlert('Something went worng'));
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
            <CustomButton className={buttonStyles.outlinedButton} onClick={handleClose}>
              Cancel
            </CustomButton>
            <CustomButton className={buttonStyles.filledButton} type={'submit'} loading={loading}>
              Submit
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
