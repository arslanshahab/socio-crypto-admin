import React, { FC, useState } from 'react';
import { Campaign, ErrorObject } from '../../../../types';
import CampaignBudget from '../CampaignBudget';
import CampaignTypeInput from '../CampaignTypeInput';
import SocialMediaTypeInput from '../SocialMediaTypeInput';

interface ContentStepsIProps {
  isGlobal: boolean;
  socialMediaType: string[];
  handleSocialMediaType: (type: string[]) => void;
  campaignType: string;
  handleCampaignType: (type: string) => void;
  steps: number;
  budgetType: string;
  company: string;
  handleBudgetType: (type: string) => void;
  handleCoiinBudgetChange: (event: React.ChangeEvent<any>) => void;
  handleSelectToken: (event: React.ChangeEvent<any>) => void;
  cryptoSymbol: string;
  coiinOptions: string[];
  errors: ErrorObject;
  campaign: any;
  coiinBudget: string;
}

const ContentSteps: FC<ContentStepsIProps> = ({
  isGlobal,
  socialMediaType,
  handleSocialMediaType,
  campaignType,
  handleCampaignType,
  steps,
  budgetType,
  company,
  handleBudgetType,
  handleCoiinBudgetChange,
  handleSelectToken,
  cryptoSymbol,
  coiinOptions,
  errors,
  campaign,
  coiinBudget,
}: ContentStepsIProps) => {
  //   const [steps, setSteps] = useState<number>(1);

  switch (steps) {
    case 1:
      return (
        <SocialMediaTypeInput
          selectAllByDefault={isGlobal}
          socialMediaType={socialMediaType}
          handleChange={handleSocialMediaType}
        />
      );
    case 2:
      return <CampaignTypeInput campaignType={campaignType} handleChange={handleCampaignType} />;
    case 3:
      return (
        <CampaignBudget
          budgetType={budgetType}
          campaign={campaign}
          coiinBudget={coiinBudget}
          coiinOptions={coiinOptions}
          company={company}
          cryptoSymbol={cryptoSymbol}
          errors={errors}
          handleBudgetType={handleBudgetType}
          handleCoiinBudgetChange={handleCoiinBudgetChange}
          handleSelectToken={handleSelectToken}
        />
      );
    default:
      return (
        <SocialMediaTypeInput
          selectAllByDefault={isGlobal}
          socialMediaType={socialMediaType}
          handleChange={handleSocialMediaType}
        />
      );
  }
};

export default ContentSteps;
