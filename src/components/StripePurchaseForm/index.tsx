import React, { useEffect, useState } from 'react';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { PaymentMethodTypes } from '../../types';
import { capitalize } from '../../helpers/formatter';
import CustomButton from '../CustomButton';
import buttonStyles from '../../assets/styles/customButton.module.css';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import { useDispatch } from 'react-redux';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  givenAmount?: number;
}

export const StripePurchaseForm: React.FC<Props> = ({ setOpen, givenAmount }) => {
  const dispatch = useDispatch();
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [amount, setAmount] = useState(givenAmount || 0);
  const [openCards, setOpenCards] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    ApiClient.getPaymentMethods()
      .then((res) => setPaymentMethods(res))
      .catch((err) => dispatch(showErrorAlert(err.message)))
      .finally(() => setIsLoading(false));
  }, []);

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
      ApiClient.purchaseCoiin({ amount, paymentMethodId })
        .then()
        .catch((err) => dispatch(showErrorAlert(err.message)));
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
        {isLoading ? (
          <CircularProgress size={22} />
        ) : (
          <FormControl className="w-full">
            <InputLabel>Select Card</InputLabel>
            <Select
              open={openCards}
              className="form-control-item w-full"
              onClose={handleCloseCards}
              onOpen={handleOpenCards}
              value={displayName}
              renderValue={() => displayName}
            >
              {paymentMethods?.map((wallet, index) => {
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
          </FormControl>
        )}
      </div>
      <div className={buttonStyles.buttonWrapper}>
        <CustomButton onClick={handleCloseDialog} className={buttonStyles.outlinedButton}>
          Cancel
        </CustomButton>
        <CustomButton onClick={handlePurchase} className={buttonStyles.filledButton}>
          Purchase
        </CustomButton>
      </div>
    </div>
  );
};
