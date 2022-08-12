import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { ChargePaymentMethodResults, ChargePaymentMethodVars, ListPaymentMethodsResults } from '../../types';
import { LIST_PAYMENT_METHODS } from '../../operations/queries/stripe';
import { capitalize } from '../../helpers/formatter';
import { CHARGE_PAYMENT_METHOD } from '../../operations/mutations/stripe';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  givenAmount?: number;
}

export const StripePurchaseForm: React.FC<Props> = ({ setOpen, givenAmount }) => {
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [amount, setAmount] = useState(givenAmount || 0);
  const [openCards, setOpenCards] = useState(false);
  const { data, loading } = useQuery<ListPaymentMethodsResults>(LIST_PAYMENT_METHODS);
  const [chargeCard] = useMutation<ChargePaymentMethodResults, ChargePaymentMethodVars>(CHARGE_PAYMENT_METHOD, {
    variables: { amount: amount, paymentMethodId: paymentMethodId },
  });
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };
  const handleClick = (paymentId: string, displayName: string) => {
    setPaymentMethodId(paymentId);
    setDisplayName(displayName);
  };
  const handleCloseCards = () => {
    setOpenCards(false);
  };

  const handleOpenCards = () => {
    setOpenCards(true);
  };

  const handlePurchase = async () => {
    try {
      await chargeCard();
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex items-end justify-between mt-4">
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          name={'amount'}
          label={'Amount (Coiin)'}
          defaultValue={amount}
          className="form-control-item w-10/12"
          onChange={handleChange}
        />
        <Typography style={{ paddingTop: '15px' }}>(${(amount !== 0 ? amount * 0.1 : 0).toFixed(2)})</Typography>
      </div>
      <div className="my-6">
        <FormControl className="w-full">
          <InputLabel>Select Card</InputLabel>
          {loading ? (
            <div />
          ) : (
            <Select
              open={openCards}
              className="form-control-item w-full"
              onClose={handleCloseCards}
              onOpen={handleOpenCards}
              value={displayName}
              renderValue={() => displayName}
            >
              {data &&
                data.listPaymentMethods.map((wallet, index) => {
                  return (
                    <MenuItem
                      onClick={() => handleClick(wallet.id, `${capitalize(wallet.brand)} (...${wallet.last4})`)}
                      key={index}
                    >
                      {capitalize(wallet.brand)} {`(...${wallet.last4})`}
                    </MenuItem>
                  );
                })}
            </Select>
          )}
        </FormControl>
      </div>
      <div className={buttonStyles.buttonWrapper}>
        <CustomButton onClick={handleCloseDialog} className={buttonStyles.secondaryButton}>
          Cancel
        </CustomButton>
        <CustomButton onClick={handlePurchase} className={buttonStyles.buttonPrimary}>
          Purchase
        </CustomButton>
      </div>
    </div>
  );
};
