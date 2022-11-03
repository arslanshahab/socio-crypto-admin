import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import CustomButton from '../CustomButton';

export interface CampaignActionProps {
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit?: () => void;
}

interface PageParams {
  campaignId?: string;
}

const Actions: React.FC<CampaignActionProps> = ({
  firstStep,
  finalStep,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
}) => {
  const { campaignId } = useParams<PageParams>();
  return (
    <Box className="mt-10 flex flex-row justify-between items-center">
      <CustomButton
        className={`w-48 h-12 mr-5 rounded-md text-md border bg-transparent ${
          activeStep > firstStep ? 'border-denimBlue text-coolGray' : 'text-coolGray border-coolGray'
        }`}
        onClick={handleBack}
        disabled={activeStep < firstStep}
      >
        Back
      </CustomButton>
      {activeStep < finalStep && (
        <CustomButton
          className="w-48 h-12 mr-5 rounded-md text-black text-md border border-cyberYellow bg-cyberYellow"
          onClick={handleNext}
        >
          Next
        </CustomButton>
      )}
      {activeStep === finalStep && (
        <CustomButton
          className="w-48 h-12 mr-5 rounded-md text-black text-md border border-cyberYellow bg-cyberYellow"
          onClick={handleSubmit}
        >
          {campaignId ? 'Update Campaign' : 'Finalize'}
        </CustomButton>
      )}
    </Box>
  );
};

export default Actions;
