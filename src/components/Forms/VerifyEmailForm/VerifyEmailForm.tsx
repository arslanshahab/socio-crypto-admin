import React, { FC, useState } from 'react';
import { apiURI } from '../../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import CustomButton from '../../CustomButton';
import { TextField } from '@material-ui/core';
import { ErrorCard } from '../../Error';
import styles from './verifyEmailForm.module.css';
import axios from 'axios';

const VerifyEmailForm: FC = () => {
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    code: '',
  });

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiURI}/v1/auth/start-admin-verification`, {
        email,
        type: 'PASSWORD',
      });
      setLoading(false);
      push('/reset-password');
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className={styles.verifyEmailForm}>
      <h2 className="w-full text-3xl text-gray-600 font-semibold mb-8 text-left">Verify Email</h2>
      <div className="w-full">
        {error.code !== '' ? (
          <ErrorCard
            data={'The email you entered does not match the information we have on file.'}
            close={() => setError({ code: '' })}
          ></ErrorCard>
        ) : (
          <div />
        )}
      </div>
      <div className="w-full pb-5">
        <TextField
          required
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          variant="outlined"
          value={email}
          fullWidth
        />
      </div>

      <div className="relative w-full mb-3">
        <CustomButton
          loading={loading}
          className="w-full bg-blue-600 h-14 rounded text-lg text-white"
          onClick={verifyEmail}
        >
          Verify Email
        </CustomButton>
      </div>
      <p className="text-md text-blue-600 cursor-pointer" onClick={() => push('/')}>
        Please click here to login
      </p>
    </div>
  );
};

export default VerifyEmailForm;
