import React, { ChangeEvent, FC, useState } from 'react';
import CustomButton from '../../CustomButton';
import { TextField } from '@material-ui/core';
import { ErrorCard } from '../../Error';
import styles from './forgetPassword.module.css';
import axios from 'axios';
import { apiURI } from '../../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';

interface UserData {
  [key: string]: string;
  email: string;
  newPassword: string;
  verificationCode: string;
}

const ForgetPassword: FC = () => {
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
    newPassword: '',
    verificationCode: '',
  } as UserData);
  const [error, setError] = useState({
    code: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  const handleResetPassword = async (event: any) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${apiURI}/v1/auth/reset-password`, {
        email: values.email,
        password: values.newPassword,
        code: values.verificationCode,
      });
      setLoading(false);
      push('/');
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgetPasswordForm}>
      <div className="w-full">
        {error.code !== '' ? (
          <ErrorCard
            data={'The email and password or code you entered does not match the information we have on file.'}
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
          value={values.email}
          fullWidth
        />
      </div>
      <div className="w-full pb-5">
        <TextField
          type="password"
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          variant="outlined"
          onChange={handleChange}
          value={values.newPassword}
          fullWidth
        />
      </div>
      <div className="w-full pb-5">
        <TextField
          type="text"
          name="verificationCode"
          label="Verification Code"
          placeholder="Verification Code"
          variant="outlined"
          onChange={handleChange}
          value={values.verificationCode}
          fullWidth
        />
      </div>
      <div className="relative w-full mb-3">
        <CustomButton
          loading={loading}
          className="w-full bg-blue-600 h-14 rounded text-lg text-white"
          onClick={handleResetPassword}
        >
          Reset Password
        </CustomButton>
      </div>
      <p className="text-md text-blue-600 cursor-pointer" onClick={() => push('/')}>
        Please click here to login
      </p>
    </div>
  );
};

export default ForgetPassword;
