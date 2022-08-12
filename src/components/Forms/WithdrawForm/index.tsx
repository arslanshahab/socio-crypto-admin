import React, { useState } from 'react';
import CustomButton from '../../CustomButton';
import { TextField } from '@material-ui/core';
import styles from './withdrawForm.module.css';
import GenericModal from '../../GenericModal';
import { FundingWallet } from '../../../types';

interface WithdrawFormProps {
  currency: FundingWallet;
  callback?: () => void;
}

interface WithdrawFormModalProps extends WithdrawFormProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ currency, callback }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  const withdraw = () => {
    setLoading(true);
    if (callback) callback();
  };

  return (
    <div className={styles.verifyEmailForm}>
      <h2 className="w-full text-2xl text-gray-600 font-semibold mb-8 text-left">
        Withdraw Funds to external address.
      </h2>
      <h3 className="w-full text-sm text-gray-600 mb-1 text-left">
        Symbol: <b className="text-blue-800">{currency.type}</b>
      </h3>
      <h3 className="w-full text-sm text-gray-600 mb-1 text-left">
        Network: <b className="text-blue-800">{currency.network}</b>
      </h3>
      <h3 className="w-full text-sm text-gray-600 mb-8 text-left">
        Available Balance: <b className="text-blue-800">{currency.balance}</b>
      </h3>
      <div className="w-full pb-5">
        <TextField
          required
          type="number"
          name="amount"
          label="Amount To Withdraw"
          onChange={handleChange}
          variant="outlined"
          value={amount}
          fullWidth
        />
      </div>

      <div className="relative w-full mb-3">
        <CustomButton
          disabled={loading}
          loading={loading}
          className="w-full bg-blue-600 h-14 rounded text-lg text-white"
          onClick={withdraw}
        >
          Withdraw Funds
        </CustomButton>
      </div>
    </div>
  );
};

export default WithdrawForm;

export const WithdrawFormModal: React.FC<WithdrawFormModalProps> = ({ currency, open, onClose, callback }) => {
  return (
    <GenericModal open={open} onClose={onClose} size="small">
      <WithdrawForm currency={currency} callback={callback} />
    </GenericModal>
  );
};
