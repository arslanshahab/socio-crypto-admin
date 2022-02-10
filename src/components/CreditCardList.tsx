import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
import PrimaryCard from './CryptoCard/PrimaryCard';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { REMOVE_PAYMENT_METHOD } from '../operations/mutations/stripe';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);
interface RemoveStripeWalletVars {
  paymentMethodId: string;
}

export const CreditCardList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [removalId, setRemovalId] = useState('');
  const { data, loading, refetch } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
  const [removePaymentMethod, { loading: removeLoading }] = useMutation<boolean, RemoveStripeWalletVars>(
    REMOVE_PAYMENT_METHOD,
  );

  const performDeletion = async (id: string) => {
    setRemovalId(id);
    await removePaymentMethod({ variables: { paymentMethodId: id } });
    await refetch();
  };

  const toolTipMap = {
    title: 'Credit Card Type',
    value: 'Last Four Digits of Card',
  };

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
              {data?.listPaymentMethods?.map((payment) => (
                <PrimaryCard
                  key={payment.id}
                  title={payment.brand}
                  value={`*${payment.last4}`}
                  tooltipTitle={toolTipMap['title']}
                  tooltipValue={toolTipMap['value']}
                  icon={<BsCreditCard2BackFill />}
                  removeMethod={performDeletion}
                  removeLoading={removeLoading && removalId === payment.id}
                  id={payment.id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
