import React, { useState } from 'react';
import { Box, Dialog, CircularProgress } from '@material-ui/core';
import styles from './verifyCode.module.css';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../../../store/actions/alerts';
import ReactCodeInput from 'react-verification-code-input';
import { ApiClient } from '../../../services/apiClient';

interface VerifyCodeProps {
  email: string;
  open: boolean;
  onClose: () => void;
  callback: (token: string) => void;
}

const VerifyCodeForm: React.FC<VerifyCodeProps> = ({ email, open, onClose, callback }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const verifyCode = (code: string) => {
    if (email && code) {
      setLoading(true);
      ApiClient.completeEmailVerification({ email, code: code.toUpperCase() })
        .then((resp) => {
          console.log(resp);
          callback(resp.data.verificationToken);
        })
        .catch((error) => {
          dispatch(showErrorAlert((error as Error).message));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box className={styles.verifyCodeForm}>
        {loading ? (
          <CircularProgress className="loader" size={36} thickness={5} />
        ) : (
          <>
            <h2 className="w-full text-3xl text-gray-600 font-semibold mb-5 text-left">Verification Code</h2>
            <h2 className="w-full text-lg text-gray-600 mb-5 text-left font-medium">
              Enter the code sent to you via email.
            </h2>
            <ReactCodeInput type="text" onComplete={verifyCode} className={styles.codeInput} />
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default VerifyCodeForm;
