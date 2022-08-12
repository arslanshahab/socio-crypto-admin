import React, { useState } from 'react';
import CustomButton from '../../CustomButton';
import { Box, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showErrorAlert, showSuccessAlert } from '../../../store/actions/alerts';
import { ApiClient } from '../../../services/apiClient';
import styles from './signup.module.css';
import { ErrorObject } from '../../../types.d';
import VerifyCodeForm from '../VerifyCode';

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObject>({});
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  const [verifyCode, showVerifyCodeDialog] = useState(false);

  const startVerification = () => {
    if (validateInputs()) {
      setLoading(true);
      if (verificationToken) {
        registerBrand(verificationToken);
      } else {
        ApiClient.startEmailVerification({ email, type: 'EMAIL', admin: true })
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
      }
    }
  };

  const registerBrand = async (token: string) => {
    showVerifyCodeDialog(false);
    setVerificationToken(token);
    console.log(token);
    ApiClient.registerBrand({ name, company, email, password, verificationToken: token })
      .then(() => {
        dispatch(showSuccessAlert('Organization created successfully!'));
        history.push('/login');
      })
      .catch((error) => {
        dispatch(showErrorAlert((error as Error).message));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateErrors = (key: string, data: string) => {
    const value = data;
    const newErrors = { ...errors };
    if (!value || value.length === 0) {
      newErrors[key] = true;
    } else {
      newErrors[key] = false;
    }
    setErrors(newErrors);
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      return (validated = false);
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: true }));
      return (validated = false);
    }
    if (!company) {
      setErrors((prev) => ({ ...prev, company: true }));
      return (validated = false);
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: true }));
      return (validated = false);
    }
    return validated;
  };

  const handleClose = () => {
    showVerifyCodeDialog(false);
    setLoading(false);
  };

  return (
    <Box className={styles.signupForm}>
      <VerifyCodeForm email={email} open={verifyCode} onClose={handleClose} callback={registerBrand} />
      <h2 className="w-full text-3xl text-gray-600 font-semibold mb-8 text-left">Brand Registration</h2>
      <Box className="w-full pb-5">
        <TextField
          required
          type="text"
          name="name"
          label="Name"
          onChange={(e) => {
            setName(e.target.value);
            updateErrors('name', e.target.value);
          }}
          error={errors['name']}
          disabled={loading}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className="w-full pb-5">
        <TextField
          required
          type="email"
          name="email"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            updateErrors('name', e.target.value);
          }}
          error={errors['email']}
          disabled={loading}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className="w-full pb-5">
        <TextField
          required
          type="text"
          name="company"
          label="Company Name"
          onChange={(e) => {
            setCompany(e.target.value);
            updateErrors('name', e.target.value);
          }}
          error={errors['company']}
          disabled={loading}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className="w-full pb-5">
        <TextField
          required
          type="password"
          name="password"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            updateErrors('name', e.target.value);
          }}
          error={errors['password']}
          disabled={loading}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className="relative w-full mb-3">
        <CustomButton
          loading={loading}
          className="w-full bg-blue-800 h-14 rounded text-lg text-white"
          onClick={startVerification}
        >
          Register
        </CustomButton>
      </Box>
      <p className="text-md mt-2">
        Already Registered?{' '}
        <b className="cursor-pointer text-blue-600" onClick={() => history.push('/login')}>
          Login
        </b>{' '}
        here.
      </p>
    </Box>
  );
};

export default SignupForm;
