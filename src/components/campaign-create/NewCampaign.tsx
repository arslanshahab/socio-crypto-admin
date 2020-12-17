import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Campaign, CampaignRequirementSpecs, NewCampaignVars, RafflePrizeStructure } from '../../types';
import { Paper, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { Initialize } from './Initialize';
import { PostsAndTags } from './PostsAndTags';
import { Algorithm } from './Algorithm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { useHistory } from 'react-router';
import { Requirements } from './Requirements';
import { SetupCampaign } from '../SetupCampaign';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NEW_CAMPAIGN = gql(`
    mutation newCampaign($name: String!, $beginDate: String!, $endDate: String!, $target: String!, $description: String!, $coiinTotal: Float!, $algorithm: String!, $company: String, $targetVideo: String!, $image: String, $tagline: String!,  $requirements: JSON!, $suggestedPosts: [String], $suggestedTags: [String], $type: String, $rafflePrize: JSON) {
    newCampaign(name: $name, beginDate: $beginDate, endDate: $endDate, target: $target, description: $description, coiinTotal: $coiinTotal, algorithm: $algorithm, company: $company, targetVideo: $targetVideo, image: $image, tagline: $tagline, requirements: $requirements, suggestedPosts: $suggestedPosts, suggestedTags: $suggestedTags, type: $type, rafflePrize: $rafflePrize) {
      name
    }
  }
`);

interface Props {
  userData: any;
}

export const NewCampaign: React.FC<Props> = (props) => {
  const history = useHistory();
  const steps = ['Getting Started', 'Info', 'Suggested Posts', 'Requirements', 'Algorithm'];
  const [activeStep, setActiveStep] = useState(0);
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  console.log(props);
  const [saveCampaign, { error }] = useMutation<Campaign, NewCampaignVars>(NEW_CAMPAIGN, {
    variables: {
      name: campaign.name,
      coiinTotal: parseFloat(campaign.config.coiinBudget as string),
      target: campaign.target,
      targetVideo: campaign.targetVideo,
      beginDate: campaign.beginDate,
      endDate: campaign.endDate,
      description: campaign.description,
      company: props.userData.company,
      algorithm: JSON.stringify(campaign.algorithm),
      requirements: (campaign.config && campaign.config.type === 'raffle'
        ? { email: true, ...campaign.requirements }
        : { ...campaign.requirements }) as CampaignRequirementSpecs,
      image: campaign.image,
      tagline: campaign.tagline,
      suggestedPosts: campaign.suggestedPosts,
      suggestedTags: campaign.suggestedTags,
      type: (campaign.config.type as string) || 'coiin',
      rafflePrize:
        campaign.config && campaign.config.type === 'raffle'
          ? {
              displayName: campaign.config['rafflePrizeName'] as string,
              affiliateLink: campaign.config['rafflePrizeAffiliateLink'] as string,
              image: campaign.config['raffleImage'] as string,
            }
          : undefined,
    },
  });

  const handleNext = (e: any) => {
    e.preventDefault();
    setActiveStep((prevState) => prevState + 1);
  };
  const handleBack = (e: any) => {
    e.preventDefault();
    setActiveStep((prevState) => prevState - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SetupCampaign raffleImage={campaign.config.raffleImage} company={props.userData.company} />;
      case 1:
        return <Initialize campaignType={campaign.config.type as string} {...props} />;
      case 2:
        return <PostsAndTags />;
      case 3:
        return <Requirements />;
      case 4:
        return <Algorithm />;
    }
  };

  const payloadReady = () => {
    let validated = false;
    if (
      campaign.name &&
      (campaign.config.coiinBudget || campaign.config.usdBudget) &&
      campaign.target &&
      campaign.targetVideo &&
      campaign.beginDate &&
      campaign.endDate &&
      campaign.description &&
      campaign.tagline &&
      campaign.suggestedPosts &&
      campaign.suggestedTags &&
      campaign.config.agreementChecked
    ) {
      validated = true;
    }
    return validated;
  };

  return (
    <div className="new-campaign">
      <Paper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
      <Paper>
        {renderStepContent(activeStep)}
        <div>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              className="new-campaign-button"
              color="primary"
              onClick={async () => {
                try {
                  if (!payloadReady()) {
                    toast.error('Form Incomplete', {
                      position: 'bottom-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    throw new Error('bad payload');
                  }
                  await saveCampaign();
                  history.push('/dashboard');
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Submit
            </Button>
          ) : (
            <Button className="new-campaign-button" variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep !== 0 && (
            <Button className="new-campaign-button" onClick={handleBack} color="primary">
              Back
            </Button>
          )}
          <ToastContainer />
        </div>
      </Paper>
    </div>
  );
};
