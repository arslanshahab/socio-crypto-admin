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
import headingStyles from '../assets/styles/heading.module.css';
import commonStyles from '../assets/styles/common.module.css';
import customButtonStyle from '../assets/styles/customButton.module.css';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);

export const CreditCardList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const { data, loading, refetch } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

  return (
    <div className={`${commonStyles.sectionMinHeight} mt-4`}>
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Elements stripe={stripePromise}>
            <CardSetupForm setModal={setModal} open={modal} />
          </Elements>
          <div className={headingStyles.paymentHeadingWrapper}>
            <h1 className={headingStyles.headingXl}>Credit Cards</h1>
            <CustomButton className={customButtonStyle.addButton} onClick={() => setModal(true)}>
              <AddIcon />
            </CustomButton>
          </div>
          {data && data.listPaymentMethods.length < 1 ? (
            <div className={commonStyles.hasItemList}> There is no credit card found</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {data?.listPaymentMethods?.map((card) => (
                <StripeCardItem key={card.id} stripeWallet={card} refetchCreditCard={refetch} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
