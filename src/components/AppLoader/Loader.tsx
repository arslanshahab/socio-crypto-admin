import React from 'react';
import './Loader.scss';
import { Box } from '@material-ui/core';
import RaiinmakerLogo from '../../assets/svg/logo.svg';

interface Props {
  message?: string;
}

const Loader: React.FC<Props> = ({ message }) => {
  return (
    <Box className="appLoader bg-gradient-to-b from-blue-800 to-gray-900 h-screen flex flex-col justify-center items-center">
      <Box className="circle animate-pulse flex flex-row justify-center items-center">
        <img alt="logo" className="animate-pulse logo w-12" src={RaiinmakerLogo} />
      </Box>
      <p className="animate-pulse text-lg text-white text-center mt-2">{message || ''}</p>
    </Box>
  );
};

export default Loader;
