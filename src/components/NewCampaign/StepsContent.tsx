import React from 'react';
import { Algorithm } from '../campaign-create/Algorithm';
import { Requirements } from '../campaign-create/Requirements';
import { CampaignState } from '../../types.d';
import CampaignSetupForm from '../Forms/CampaignSetupForm';
import CampaignInitializeForm from '../Forms/CampaignInitializeForm/CampaignInitializeForm';
import CampaignPostAnndTagsForm from '../Forms/CampaignPostAnndTagsForm/CampaignPostAnndTagsForm';

interface Props {
  userData: any;
  campaign: CampaignState;
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const StepContent: React.FC<Props> = ({
  userData,
  activeStep,
  firstStep,
  finalStep,
  handleBack,
  handleNext,
  handleSubmit,
  campaign,
}) => {
  switch (activeStep) {
    case 0:
      return (
        <CampaignSetupForm
          company={userData.company}
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      );
    case 1:
      return (
        <CampaignInitializeForm
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
          campaignType={campaign.config.budgetType as string}
          userData={userData}
        />
      );
    case 2:
      return (
        <CampaignPostAnndTagsForm
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      );
    case 3:
      return <Requirements />;
    case 4:
      return <Algorithm />;
    default:
      return (
        <CampaignSetupForm
          company={userData.company}
          activeStep={activeStep}
          firstStep={0}
          finalStep={4}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={handleSubmit}
        />
      );
  }
};

export default StepContent;
