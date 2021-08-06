import { Box } from '@material-ui/core';
import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useHistory } from 'react-router';

const EmptyCampaigns: React.FC = () => {
  const history = useHistory();

  return (
    <Box className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-xl mb-2">No Campaigns Found</p>
      <CustomButton
        className="new-campaign-button"
        variant="outlined"
        color="primary"
        onClick={(e) => {
          history.push('/dashboard/newCampaign');
        }}
      >
        Create your first campaign
      </CustomButton>
    </Box>
  );
};

export default EmptyCampaigns;
