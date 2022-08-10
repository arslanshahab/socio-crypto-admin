import React from 'react';
import { Box } from '@material-ui/core';
import { ReactComponent as RaiinmakerLogo } from '../../assets/svg/raiinmaker_logo2x1.svg';
import LoginForm from '../../components/Forms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Box className="relative flex flex-row justify-center items-center bg-gradient-to-b from-blue-900 to-gray-900 h-screen min-h-screen">
      <Box className="flex flex-row justify-between h-3/6 w-3/6 bg-white">
        <Box className="flex flex-col justify-center items-start w-3/6 px-12 py-10 bg-blue-800">
          <Box className="w-64 mb-14">
            <RaiinmakerLogo className="login-logo"></RaiinmakerLogo>
          </Box>
          <h3 className="text-3xl text-gray-300">Raiinmaker Admin Panel Registration</h3>
          <p className="text-lg text-gray-300 mt-3">
            Your personal Dashboard to manage your Campaigns and get Insights through various Data Metrics.
          </p>
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
