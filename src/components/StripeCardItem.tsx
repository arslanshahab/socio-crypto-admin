import React from 'react';
import { StripeWallet } from '../types';
import { capitalize } from '../helpers/formatter';
import { useMutation } from '@apollo/client';
import { REMOVE_PAYMENT_METHOD } from '../operations/mutations/stripe';
import { CircularProgress, Tooltip } from '@material-ui/core';
// import styles from './CryptoItem/cryptoItem.module.css';
import styles from './CryptoCard/cryptoCard.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { BsCreditCard2BackFill } from 'react-icons/bs';

interface Props {
  stripeWallet: StripeWallet;
  callback?: () => void;
  refetchCreditCard: () => void;
}

interface RemoveStripeWalletVars {
  paymentMethodId: string;
}

export const StripeCardItem: React.FC<Props> = ({ stripeWallet, refetchCreditCard }) => {
  const [removePaymentMethod, { loading }] = useMutation<boolean, RemoveStripeWalletVars>(REMOVE_PAYMENT_METHOD);
  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }
  const handleRemove = async () => {
    await removePaymentMethod({
      variables: {
        paymentMethodId: stripeWallet.id,
      },
    });
    await refetchCreditCard();
  };
  return (
    <div>
      <div className={styles.cardWrapper}>
        <div className={styles.row}>
          <Tooltip title="Card Type" placement="top-start">
            <p className={styles.name}>{capitalize(stripeWallet.brand)}</p>
          </Tooltip>
          <BsCreditCard2BackFill fontSize="20px" className="text-indigo-500" />
        </div>
        <div className={styles.row}>
          <Tooltip title="Last Four Digits of Card" placement="top-start">
            <h2 className={styles.balance}>*{stripeWallet.last4}</h2>
          </Tooltip>
          <Tooltip title="Delete Coin" placement="top-start">
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={handleRemove}
              fontSize="small"
              // onClick={async () => {
              //   if (window.confirm('Are you sure you want to delete this card?')) {
              //     await removePaymentMethod({ variables: { paymentMethodId: stripeWallet.id } });
              //     await refetchCreditCard();
              //     // await callback();
              //   }
              // }}
            />
          </Tooltip>
        </div>
      </div>

      {/* <Grid container item direction={'row'} className="list-row">
        <Grid item className="list-item">
          <Typography>{capitalize(stripeWallet.brand)}</Typography>
        </Grid>
        <Grid item className="list-item" style={{ marginLeft: '5px' }}>
          <Typography>(...{stripeWallet.last4})</Typography>
        </Grid>
        <Grid item className="list-item">
          <Button
            size={'small'}
            color={'primary'}
            onClick={async () => {
              await removePaymentMethod({ variables: { paymentMethodId: stripeWallet.id } });
              await callback();
            }}
          >
            <Typography component="div">X</Typography>
          </Button>
        </Grid>
      </Grid> */}
    </div>
  );
};
