import React from 'react';
import { Box } from '@material-ui/core';
import { ReactComponent as RaiinmakerLogo } from '../../assets/svg/raiinmaker_logo2x1.svg';
import { ADMIN_PANEL_TAGLINE, ADMIN_PANEL_TITLE } from '../../helpers/constants';

const PublicLayout: React.FC = ({ children }) => {
  return (
    <Box className="w-full flex flex-row justify-between min-h-screen">
      <Box className="w-3/6 flex flex-row justify-center items-center min-h-screen bg-blue-800 bg-gradient-to-b from-blue-900 to-gray-900">
        <Box className="flex flex-col justify-center items-start w-4/6 p-12">
          <Box className="w-64 mb-14">
            <RaiinmakerLogo className="login-logo" />
          </Box>
          <h3 className="text-3xl text-gray-300">{ADMIN_PANEL_TITLE}</h3>
          <p className="text-lg text-gray-300 mt-3">{ADMIN_PANEL_TAGLINE}</p>
        </Box>
      </Box>
      <Box className="w-3/6 min-h-screen flex flex-col justify-center items-center">{children}</Box>
    </Box>
  );
};

export default PublicLayout;
