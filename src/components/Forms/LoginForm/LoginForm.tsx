import React, { useState } from 'react';
import { ErrorCard } from '../../Error';
import CustomButton from '../../CustomButton';
import { Box, TextField } from '@material-ui/core';
import { fireClient, getAuthPersistence } from '../../../clients/firebase';
import { sessionLogin } from '../../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import { ChangePasswordDialog } from '../../ChangePasswordDialog';

interface UserData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState({
    code: '',
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
  } as UserData);

  const handleChange = (event: any) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
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
        if (body.resetPass) setChangePassword(true);
        else history.push('/dashboard/campaigns');
      } else {
        throw Error('invalid login');
      }
    } catch (e) {
      console.log('error: ', e);
      setError(e);
      setLoading(false);
    }
  };

  return (
    <Box className="p-10 w-3/6 flex flex-col justify-center items-start login-form">
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
      <a className="text-md text-blue-600" href="#">
        Forgot Password?
      </a>
    </Box>
  );
};

export default LoginForm;
