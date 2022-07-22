import React, { useEffect, useState } from 'react';
import { ErrorCard } from '../../Error';
import CustomButton from '../../CustomButton';
import { Box, TextField } from '@material-ui/core';
import { fireClient, getAuthPersistence } from '../../../clients/firebase';
import { sessionLogin } from '../../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import { ChangePasswordDialog } from '../../ChangePasswordDialog';
import styles from './login.module.css';
import { useQuery } from '@apollo/client';
import { VERIFY_SESSION } from '../../../operations/queries/firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/actions/user';
import AppLoader from '../../AppLoader';

interface UserData {
  [key: string]: string;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState({
    code: '',
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
  } as UserData);
  const { data, loading: userDataLoading } = useQuery(VERIFY_SESSION, { skip: !hasLoggedIn });

  useEffect(() => {
    if (data?.verifySession) {
      dispatch(
        setUserData({
          ...data.verifySession,
          isLoggedIn: true,
        }),
      );
      history.push('/dashboard/campaigns');
    }
  }, [data?.verifySession]);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError({ code: '' });
    try {
      setLoading(true);
      await fireClient.auth().setPersistence(getAuthPersistence);
      await fireClient.auth().signInWithEmailAndPassword(values.email, values.password);
      const { status, body } = await sessionLogin();
      if (status === 200) {
        setHasLoggedIn(true);
        if (body.resetPass) setChangePassword(true);
      } else {
        throw Error('invalid login');
      }
    } catch (e) {
      console.log('error: ', e);
      setError(e);
      setLoading(false);
    }
  };

  if (userDataLoading) return <AppLoader message="Setting up everything. Please wait!" />;

  return (
    <Box className={styles.loginForm}>
      <ChangePasswordDialog open={changePassword} setOpen={setChangePassword} email={values.email} />
      <Box className="w-full">
        {error.code !== '' ? (
          <ErrorCard
            data={'The email and password you entered does not match the information we have on file.'}
            close={() => setError({ code: '' })}
          ></ErrorCard>
        ) : (
          <div />
        )}
      </Box>
      <Box className="w-full pb-5">
        <TextField
          required
          type="text"
          name="email"
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className="w-full pb-5">
        <TextField
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box className="relative w-full mb-3">
        <CustomButton
          loading={loading}
          className="w-full bg-blue-600 h-14 rounded text-lg text-white"
          onClick={handleSubmit}
        >
          Login
        </CustomButton>
      </Box>
      <p className="text-md text-blue-600 cursor-pointer">Forgot Password?</p>
    </Box>
  );
};

export default LoginForm;
