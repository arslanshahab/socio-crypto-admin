import React, { FC, useState } from 'react';
import CampaignTypeInput from '../CampaignTypeInput';
import SocialMediaTypeInput from '../SocialMediaTypeInput';

interface ContentStepsIProps {
  isGlobal: boolean;
  socialMediaType: string[];
  handleSocialMediaType: (type: string[]) => void;
  campaignType: string;
  handleCampaignType: (type: string) => void;
  steps: number;
}

const ContentSteps: FC<ContentStepsIProps> = ({
  isGlobal,
  socialMediaType,
  handleSocialMediaType,
  campaignType,
  handleCampaignType,
  steps,
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
      return <div>Campaign Budget</div>;
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
