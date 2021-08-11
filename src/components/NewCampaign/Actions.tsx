import { Box } from '@material-ui/core';
import React from 'react';
import CustomButton from '../CustomButton';

export interface CampaignActionProps {
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const Actions: React.FC<CampaignActionProps> = ({
  firstStep,
  finalStep,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
}) => {
  return (
    <Box className="mt-10 flex flex-row justify-start items-center">
      <CustomButton
        className={`w-24 h-12 mr-5 rounded-md text-md border-2 bg-transparent ${
          activeStep > firstStep ? 'border-blue-800 text-blue-800' : 'text-gray-300 border-gray-300'
        }`}
        onClick={handleBack}
        disabled={activeStep <= firstStep}
      >
        Back
      </CustomButton>
      {activeStep < finalStep && (
        <CustomButton
          className="w-24 h-12 mr-5 rounded-md text-white text-md border-2 border-blue-800 bg-blue-800"
          onClick={handleNext}
        >
          Next
        </CustomButton>
      )}
      {activeStep === finalStep && (
        <CustomButton
          className="w-24 h-12 mr-5 rounded-md text-white text-md border-2 border-blue-800 bg-blue-800"
          onClick={handleSubmit}
        >
          Submit
        </CustomButton>
      )}
    </Box>
  );
};

export default Actions;
