import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ListPaymentMethodsResults } from '../types';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { Button, Grid, Typography } from '@material-ui/core';
import { StripeCardItem } from './StripeCardItem';
import AddIcon from '@material-ui/icons/Add';
import { CardSetupForm } from './CardSetupForm';
import { Elements } from '@stripe/react-stripe-js';
import { stripePubKey } from '../apiConfig.json';
import { loadStripe } from '@stripe/stripe-js';
import CustomButton from './CustomButton';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);

export const CreditCardList: React.FC = () => {
  const { data, loading } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);
  const [addCard, setAddCard] = useState(false);
  console.log('Response of listPaymentMethods', data);
  // const renderCreditCardList = () => {
  //   let creditCardList: JSX.Element[] = [];
  //   if (loading) {
  //     return <div />;
  //   } else if (data && data.listPaymentMethods) {
  //     creditCardList = data.listPaymentMethods.map((card, index) => {
  //       return <StripeCardItem callback={() => setAddCard(false)} key={index} stripeWallet={card} />;
  //     });
  //   }
  //   if (creditCardList.length === 0) {
  //     return (
  //       <Grid item className="list-item">
  //         <Typography component="div">Please add a valid credit card</Typography>
  //       </Grid>
  //     );
  //   }
  //   return creditCardList;
  // };
  // const generateIcon = (type: string): string => {
  //   return getImage(type).toLowerCase().includes('unknown') ? getImage('ETH') : getImage(type);
  // };
  return (
    <div className="mt-4">
      <Elements stripe={stripePromise}>
        <CardSetupForm callback={() => setAddCard(false)} setOpen={setAddCard} open={addCard} />
      </Elements>
      <Grid container>
        <Grid item container className="list-header" direction={'column'}>
          <Grid item container>
            <div className="flex justify-between items-center border-b-2 mb-6 w-full">
              <h1 className="text-center py-4 text-blue-800 text-3xl font-semibold">Credit Cards</h1>
              <CustomButton className="text-blue-800 p-1" onClick={() => setAddCard(true)}>
                <AddIcon />
              </CustomButton>
            </div>
          </Grid>
        </Grid>
        <div className="flex flex-wrap gap-4">
          {data?.listPaymentMethods?.map((card) => (
            <StripeCardItem callback={() => setAddCard(false)} key={card.id} stripeWallet={card} />
          ))}
        </div>
      </Grid>
    </div>
  );
};
