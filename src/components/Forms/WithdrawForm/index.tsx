import React, { useState } from 'react';
import CustomButton from '../../CustomButton';
import { TextField } from '@material-ui/core';
import styles from './withdrawForm.module.css';
import GenericModal from '../../GenericModal';
import { ErrorObject, FundingWallet } from '../../../types';
import { ApiClient } from '../../../services/apiClient';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../../store/actions/alerts';
import useStoreUserSelector from '../../../hooks/useStoreUserSelector';
import { VerifyCodeDialog } from '../VerifyCode/index';

interface WithdrawFormProps {
  currency: FundingWallet;
  callback?: () => void;
}

interface WithdrawFormModalProps extends WithdrawFormProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = ({ currency, callback }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [verifyCodeDialog, showVerifyCodeDialog] = useState(false);
  const [errors, setErrors] = useState<ErrorObject>({});
  const userData = useStoreUserSelector();

  const startVerification = () => {
    if (validateInputs()) {
      setLoading(true);
      if (verificationToken) {
        withdraw(verificationToken);
      } else {
        ApiClient.startEmailVerification({ email: userData.email, type: 'WITHDRAW', admin: true })
          .then(() => {
            showVerifyCodeDialog(true);
          })
          .catch((error) => {
            dispatch(showErrorAlert((error as Error).message));
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const withdraw = (token: string) => {
    if (validateInputs()) {
      if (verifyCodeDialog) showVerifyCodeDialog(false);
      setVerificationToken(token);
      setLoading(true);
      ApiClient.withdrawFunds({
        verificationToken: token,
        symbol: currency.type,
        network: currency.network,
        amount,
        address,
      })
        .then(() => {
          setVerificationToken('');
          dispatch(showSuccessAlert('Withdraw completed successfully'));
        })
        .catch((error) => {
          dispatch(showErrorAlert((error as Error).message));
        })
        .finally(() => {
          setLoading(false);
        });
      if (callback) callback();
    }
  };

  const updateErrors = (key: string, data: string) => {
    const value = data;
    const newErrors = { ...errors };
    if (!value || value.length === 0) {
      newErrors[key] = true;
    } else {
      if (key === 'address' && data.length < 32) {
        newErrors[key] = true;
      } else {
        newErrors[key] = false;
      }
    }
    setErrors(newErrors);
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!amount) {
      setErrors((prev) => ({ ...prev, name: true }));
      return (validated = false);
    }
    if (!address) {
      setErrors((prev) => ({ ...prev, email: true }));
      return (validated = false);
    }
    return validated;
  };

  return (
    <div className={styles.verifyEmailForm}>
      <VerifyCodeDialog
        email={userData.email}
        open={verifyCodeDialog}
        onClose={() => showVerifyCodeDialog(false)}
        callback={withdraw}
      />
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

      <div className="w-full pb-5 flex flex-row justify-between">
        <div className="w-3/4">
          <TextField
            required
            type="number"
            name="amount"
            label="Amount To Withdraw"
            onChange={(e) => {
              if (parseFloat(e.target.value) > parseFloat(currency.balance)) {
                setAmount(parseFloat(currency.balance));
              } else {
                setAmount(parseFloat(e.target.value));
              }
              updateErrors('amount', e.target.value);
            }}
            error={errors['amount']}
            variant="outlined"
            value={amount}
            disabled={loading}
            fullWidth
          />
        </div>
        <div className="w-1/4 flex flex-col align-middle">
          <CustomButton
            disabled={parseFloat(currency.balance) <= 0}
            className="w-full mb-1 text-yellow-600 rounded text-sm font-semibold"
            onClick={() => setAmount(parseFloat(currency.balance) / 2)}
          >
            Half
          </CustomButton>
          <CustomButton
            disabled={parseFloat(currency.balance) <= 0}
            className="w-full text-yellow-600 rounded text-sm font-semibold"
            onClick={() => setAmount(parseFloat(currency.balance))}
          >
            Max
          </CustomButton>
        </div>
      </div>

      <div className="w-full pb-5">
        <TextField
          required
          type="text"
          name="address"
          label="Address"
          onChange={(e) => {
            setAddress(e.target.value);
            updateErrors('address', e.target.value);
          }}
          error={errors['address']}
          disabled={loading}
          variant="outlined"
          fullWidth
        />
      </div>

      <div className="relative w-full mb-3">
        <CustomButton
          disabled={loading}
          loading={loading}
          className="w-full bg-blue-800 h-14 rounded text-lg text-white"
          onClick={startVerification}
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
