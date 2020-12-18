import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Campaign, CampaignRequirementSpecs, NewCampaignVars, RafflePrizeStructure } from '../../types';
import { Paper, Stepper, Step, StepLabel, Button, CircularProgress } from '@material-ui/core';
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
  const [saveCampaign, { error, loading }] = useMutation<Campaign, NewCampaignVars>(NEW_CAMPAIGN, {
    variables: {
      name: campaign.name,
      coiinTotal: parseFloat(campaign.config.type === 'raffle' ? '0' : (campaign.config.coiinBudget as string)),
      target: campaign.target,
      targetVideo: campaign.targetVideo,
      beginDate: campaign.beginDate,
      endDate: campaign.endDate,
      description: campaign.description,
      company: props.userData.company,
      algorithm: JSON.stringify(campaign.algorithm),
      requirements: (campaign.config && campaign.config.budgetType === 'raffle'
        ? { email: true, ...campaign.requirements }
        : { ...campaign.requirements }) as CampaignRequirementSpecs,
      image: campaign.image,
      tagline: campaign.tagline,
      suggestedPosts: campaign.suggestedPosts,
      suggestedTags: campaign.suggestedTags,
      type: (campaign.config.buddgetType as string) || 'coiin',
      rafflePrize:
        campaign.config && campaign.config.budgetType === 'raffle'
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
        return <Initialize campaignType={campaign.config.budgetType as string} {...props} />;
      case 2:
        return <PostsAndTags />;
      case 3:
        return <Requirements />;
      case 4:
        return <Algorithm />;
    }
  };

  const validateTiers = () => {
    let validated = false;
    if (campaign.config.numOfTiers > Object.entries(campaign.algorithm.tiers).length) return validated;
    for (let i = 0; i < campaign.config.numOfTiers; i++) {
      const tier = campaign.algorithm.tiers[i + 1];
      console.log(tier);
      if (!tier.threshold || !tier.totalCoiins) return validated;
    }
    validated = true;
    return validated;
  };

  const payloadReady = (step: number) => {
    let validated = false;
    if (step == 0) {
      if (campaign.config.budgetType) {
        if (campaign.config.budgetType == 'coiin') {
          if (campaign.config.coiinBudget && campaign.config.campaignType) validated = true;
        } else if (campaign.config.budgetType === 'raffle') {
          if (campaign.config.rafflePrizeName && campaign.config.raffleImage) validated = true;
        }
      }
    }
    if (step == 1) {
      if (campaign.config.budgetType == 'coiin') {
        if (
          campaign.name &&
          campaign.target &&
          campaign.targetVideo &&
          campaign.endDate &&
          campaign.beginDate &&
          campaign.description &&
          campaign.tagline &&
          campaign.suggestedPosts &&
          campaign.suggestedTags &&
          campaign.config.numOfSuggestedPosts &&
          campaign.config.numOfTiers
        )
          validated = true;
      } else if (campaign.config.budgetType == 'raffle') {
        if (
          campaign.name &&
          campaign.target &&
          campaign.targetVideo &&
          campaign.endDate &&
          campaign.beginDate &&
          campaign.description &&
          campaign.tagline &&
          campaign.suggestedPosts &&
          campaign.suggestedTags &&
          campaign.config.numOfSuggestedPosts
        )
          validated = true;
      }
    }
    if (step == 2) {
      for (let i = 0; i < campaign.config.numOfSuggestedPosts; i++) {
        const post = campaign.suggestedPosts[i];
        if (post && post.length == 0) return validated;
      }
      if (campaign.suggestedTags.length == 0) return validated;
      validated = true;
    }
    if (step == 3) return true;
    if (step == 4) {
      if (campaign.config.budgetType == 'coiin') {
        if (
          campaign.algorithm.pointValues.clicks &&
          campaign.algorithm.pointValues.views &&
          campaign.algorithm.pointValues.submissions &&
          campaign.algorithm.pointValues.shares &&
          campaign.algorithm.pointValues.likes &&
          validateTiers()
        ) {
          validated = true;
        }
      } else if (campaign.config.budgetType == 'raffle') {
        if (
          campaign.algorithm.pointValues.clicks &&
          campaign.algorithm.pointValues.views &&
          campaign.algorithm.pointValues.submissions &&
          campaign.algorithm.pointValues.shares &&
          campaign.algorithm.pointValues.likes
        ) {
          validated = true;
        }
      }
      if (!campaign.config.agreementChecked) validated = false;
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
                  if (!payloadReady(activeStep)) {
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
                  toast('Campaign Created', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  history.push('/dashboard');
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              {loading ? <CircularProgress></CircularProgress> : 'Submit'}
            </Button>
          ) : (
            <Button
              className="new-campaign-button"
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (payloadReady(activeStep)) {
                  handleNext(e);
                } else {
                  toast.error('Form Incomplete', {
                    position: 'bottom-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              }}
            >
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
