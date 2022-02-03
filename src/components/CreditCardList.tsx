import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ListPaymentMethodsResults } from '../types';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { CircularProgress } from '@material-ui/core';
import { StripeCardItem } from './StripeCardItem';
import AddIcon from '@material-ui/icons/Add';
import { CardSetupForm } from './CardSetupForm';
import { Elements } from '@stripe/react-stripe-js';
import { stripePubKey } from '../apiConfig.json';
import { loadStripe } from '@stripe/stripe-js';
import CustomButton from './CustomButton';
import styles from './admin/PendingWithdrawList/pendingWithdrawList.module.css';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);

export const CreditCardList: React.FC = () => {
  const { data, loading } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);
  const [addCard, setAddCard] = useState(false);
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="mt-4">
      <Elements stripe={stripePromise}>
        <CardSetupForm callback={() => setAddCard(false)} setOpen={setAddCard} open={addCard} />
      </Elements>
      <div className="flex justify-between items-center border-b-2 mb-6 w-full">
        <h1 className="text-center py-4 text-blue-800 text-3xl font-semibold">Credit Cards</h1>
        <CustomButton className="text-blue-800 p-1" onClick={() => setAddCard(true)}>
          <AddIcon />
        </CustomButton>
      </div>
      <div className="flex flex-wrap gap-4">
        {data?.listPaymentMethods?.map((card) => (
          <StripeCardItem callback={() => setAddCard(false)} key={card.id} stripeWallet={card} />
        ))}
      </div>
    </div>
  );
};
