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

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);

export const CreditCardList: React.FC = () => {
  const { data, loading } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);
  const [addCard, setAddCard] = useState(false);

  const renderCreditCardList = () => {
    let creditCardList: JSX.Element[] = [];
    if (loading) {
      return <div />;
    } else if (data && data.listPaymentMethods) {
      creditCardList = data.listPaymentMethods.map((card, index) => {
        return <StripeCardItem callback={() => setAddCard(false)} key={index} stripeWallet={card} />;
      });
    }
    if (creditCardList.length === 0) {
      return (
        <Grid item className="list-item">
          <Typography component="div">Please add a valid credit card</Typography>
        </Grid>
      );
    }
    return creditCardList;
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CardSetupForm callback={() => setAddCard(false)} setOpen={setAddCard} open={addCard} />
      </Elements>
      <Grid container>
        <Grid item container className="list-header" direction={'column'}>
          <Grid item container>
            <Grid item>
              <Typography component={'div'} variant={'h5'}>
                Credit Cards
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button color={'primary'} onClick={() => setAddCard(true)}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>Type</Typography>
          </Grid>
        </Grid>
        {renderCreditCardList()}
      </Grid>
    </div>
  );
};
