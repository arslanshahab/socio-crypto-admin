import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { ChargePaymentMethodResults, ChargePaymentMethodVars, ListPaymentMethodsResults } from '../types';
import { LIST_PAYMENT_METHODS } from '../operations/queries/stripe';
import { capitalize } from '../helpers';
import { CHARGE_PAYMENT_METHOD } from '../operations/mutations/stripe';

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
    await chargeCard();
    setOpen(false);
  };

  return (
    <Grid container direction={'column'}>
      <Grid container item direction={'row'}>
        <Grid item>
          <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            name={'amount'}
            label={'Amount (Coiin)'}
            defaultValue={amount}
            className="form-control-item"
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Typography style={{ paddingTop: '15px' }}>(${amount !== 0 ? amount * 0.1 : 0})</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Select Card</InputLabel>
          {loading ? (
            <div />
          ) : (
            <Select
              open={openCards}
              className="form-control-item"
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
      </Grid>
      <Grid container item direction={'row'} justify={'flex-end'} spacing={1}>
        <Grid item>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant={'contained'}
            style={{ marginTop: '50px', marginLeft: '50px' }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handlePurchase} color="primary" variant={'contained'} style={{ marginTop: '50px' }}>
            Purchase
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
