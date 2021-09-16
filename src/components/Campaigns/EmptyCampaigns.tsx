import { Box } from '@material-ui/core';
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useHistory } from 'react-router';

const EmptyCampaigns: React.FC = () => {
  const history = useHistory();

  return (
    <Box className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-2xl mb-2">No Campaigns Found</p>
      <CustomButton
        className="w-60 bg-blue-600 h-12 rounded text-lg text-white"
        variant="outlined"
        color="primary"
        onClick={() => {
          history.push('/dashboard/newCampaign');
        }}
      >
        Create your first campaign
      </CustomButton>
    </Box>
  );
};

export default EmptyCampaigns;
