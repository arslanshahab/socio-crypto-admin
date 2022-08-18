import React, { useEffect, useState } from 'react';
import CustomButton from '../../CustomButton';
import { Box, TextField } from '@material-ui/core';
import { fireClient, getAuthPersistence } from '../../../clients/firebase';
import { apiURI, sessionLogin } from '../../../clients/raiinmaker-api';
import { useHistory } from 'react-router-dom';
import { ChangePasswordDialog } from '../../ChangePasswordDialog';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/actions/user';
import axios from 'axios';
import { showAppLoader } from '../../../store/actions/settings';
import { showErrorAlert, showSuccessAlert } from '../../../store/actions/alerts';
import { VerifyCodeDialog } from '../VerifyCode';
import { ApiClient } from '../../../services/apiClient';

interface UserData {
  [key: string]: string;
  email: string;
  password: string;
}
interface VerifySession {
  id: string;
  company: string;
  role: string;
  tempPass: boolean;
  email: string;
}

const LoginForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  } as UserData);
  const [verifyData, setVerifyData] = useState<VerifySession>();
  const [verifyCodeDialog, showVerifyCodeDialog] = useState(false);
  const [admin] = useState(true);

  const verifySession = async () => {
    dispatch(showAppLoader({ flag: true, message: 'Setting up everything. Please wait!' }));
    const { data } = await axios.get(`${apiURI}/v1/organization/verify-session`, { withCredentials: true });
    setVerifyData(data.data);
    dispatch(showAppLoader({ flag: false, message: '' }));
  };

  useEffect(() => {
    if (verifyData) {
      dispatch(
        setUserData({
          ...verifyData,
          isLoggedIn: true,
        }),
      );
      history.push('/dashboard/campaigns');
    }
  }, [verifyData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...values };
    data[event.target.name] = event.target.value;
    setValues(data);
  };

  // handle verify callback
  const handleVerify = async (value: string) => {
    if (value) {
      showVerifyCodeDialog(false);
      await verifySession();
    }
  };

  // start verification
  const startVerification = () => {
    setLoading(true);
    ApiClient.startEmailVerification({ email: values.email, type: 'PASSWORD', admin: true })
      .then(() => {
        dispatch(showSuccessAlert('Verification email sent your added email address.'));
        showVerifyCodeDialog(true);
      })
      .catch((error) => {
        dispatch(showErrorAlert((error as Error).message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // handle login
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      await fireClient.auth().setPersistence(getAuthPersistence);
      await fireClient.auth().signInWithEmailAndPassword(values.email, values.password);
      const { body } = await sessionLogin();
      if (body.resetPass) {
        setChangePassword(true);
      } else if (admin) {
        startVerification();
        showVerifyCodeDialog(true);
      } else if (!admin) {
        await verifySession();
      }
      setLoading(false);
    } catch (error) {
      dispatch(showErrorAlert((error as Error).message));
      setLoading(false);
    }
  };

  // hanlde verify dialog close
  const handleClose = () => {
    showVerifyCodeDialog(false);
    setLoading(false);
  };

  return (
    <Box className={styles.loginForm}>
      <VerifyCodeDialog email={values.email} open={verifyCodeDialog} onClose={handleClose} callback={handleVerify} />
      <ChangePasswordDialog open={changePassword} setOpen={setChangePassword} email={values.email} />
      <h2 className="w-full text-3xl text-gray-600 font-semibold mb-8 text-left">Brand Login</h2>
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
          className="w-full bg-blue-800 h-14 rounded text-lg text-white"
          onClick={handleSubmit}
        >
          Login
        </CustomButton>
      </Box>
      <p className="text-md text-blue-600 cursor-pointer mt-2" onClick={() => history.push('/forget-password')}>
        Forgot Password?
      </p>
      <p className="text-md mt-2 normal-case">
        Want to promote your content?{' '}
        <b className="cursor-pointer text-blue-600" onClick={() => history.push('/register')}>
          Register
        </b>{' '}
        here!
      </p>
    </Box>
  );
};

export default LoginForm;
