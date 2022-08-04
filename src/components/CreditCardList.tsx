import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
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
import axios from 'axios';
import { apiURI } from '../clients/raiinmaker-api';

const env = process.env.REACT_APP_STAGE === undefined ? 'local' : process.env.REACT_APP_STAGE;
const stripeKey = (stripePubKey as { [key: string]: string })[env] as any;
const stripePromise = loadStripe(stripeKey);
interface RemoveStripeWalletVars {
  paymentMethodId: string;
}

type PaymentMethodTypes = {
  id: string;
  brand: string;
  last4: string;
};

export const CreditCardList: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [removalId, setRemovalId] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [removePaymentMethod, { loading: removeLoading }] = useMutation<boolean, RemoveStripeWalletVars>(
    REMOVE_PAYMENT_METHOD,
  );

  // Fetch list of payment methods
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${apiURI}/v1/stripe/payment-methods`, { withCredentials: true });
        setPaymentMethods(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const performDeletion = async (id: string) => {
    setRemovalId(id);
    await removePaymentMethod({ variables: { paymentMethodId: id } });
    // await refetch();
  };

  const toolTipMap = {
    title: 'Credit Card Type',
    value: 'Last Four Digits of Card',
  };

  return (
    <div className={`${commonStyles.sectionMinHeight} mt-4`}>
      {isLoading ? (
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
          {!paymentMethods ? (
            <div className={commonStyles.hasItemList}> There is no credit card found</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {paymentMethods?.map((payment) => (
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
