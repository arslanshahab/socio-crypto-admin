import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Campaign, CampaignRequirementSpecs, NewCampaignVars } from '../../types';
import { Paper, Stepper, Step, StepLabel, Button, CircularProgress } from '@material-ui/core';
import { Initialize } from './Initialize';
import { PostsAndTags } from './PostsAndTags';
import { Algorithm } from './Algorithm';
import { useSelector, useDispatch } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { Fade } from 'react-awesome-reveal';

import { RootState } from '../../redux/reducer';
import { useHistory } from 'react-router';
import { Requirements } from './Requirements';
import { SetupCampaign } from '../SetupCampaign';
import { ToastContainer, toast } from 'react-toastify';
import { LoaderDots } from '@thumbtack/thumbprint-react';
import 'react-toastify/dist/ReactToastify.css';
import { NEW_CAMPAIGN } from '../../operations/mutations/campaign';

interface Props {
  userData: any;
}

export const NewCampaign: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const steps = ['Purpose and Budget', 'Campaign Information', 'Suggested Posts', 'Campaign Requirements', 'Algorithm'];
  const [activeStep, setActiveStep] = useState(1);
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [saveCampaign, { error, loading }] = useMutation<Campaign, NewCampaignVars>(NEW_CAMPAIGN, {
    variables: {
      name: campaign.name,
      coiinTotal: parseFloat(campaign.config.budgetType === 'raffle' ? '0' : (campaign.config.coiinBudget as string)),
      target: campaign.target,
      targetVideo: campaign.targetVideo || '',
      beginDate: campaign.beginDate,
      endDate: campaign.endDate,
      cryptoId: campaign.cryptoId,
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
      type: (campaign.config.budgetType as string) || 'coiin',
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
      if (!tier.threshold || !tier.totalCoiins) return validated;
    }
    validated = true;
    return validated;
  };

  const showFormError = () => {
    return toast.error('Form Incomplete', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const payloadReady = (step: number) => {
    let validated = false;
    if (step == 0) {
      if (campaign.config.budgetType) {
        if (campaign.config.budgetType == 'crypto') {
          if (campaign.config.coiinBudget && campaign.config.campaignType && campaign.cryptoId) validated = true;
        } else if (campaign.config.budgetType === 'raffle') {
          if (campaign.config.rafflePrizeName && campaign.config.raffleImage) validated = true;
        }
      }
    }
    if (step == 1) {
      if (campaign.config.budgetType == 'crypto') {
        if (
          campaign.name &&
          campaign.target &&
          campaign.endDate &&
          campaign.beginDate &&
          campaign.description &&
          campaign.tagline &&
          campaign.suggestedPosts &&
          campaign.suggestedTags &&
          campaign.config.numOfSuggestedPosts &&
          campaign.config.numOfTiers &&
          campaign.target.startsWith('http') &&
          new Date(campaign.beginDate).getTime() < new Date(campaign.endDate).getTime() &&
          campaign.keywords.length
        )
          validated = true;
      } else if (campaign.config.budgetType == 'raffle') {
        if (
          campaign.name &&
          campaign.target &&
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
      if (campaign.config.budgetType == 'crypto') {
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
      {campaign.config.success ? (
        <Fade>
          <div className="campaign-created-container">
            <div className="center-text campaign-created-text"></div>
            <div className="center-text campaign-created-text">Your Campaign is now being submitted for review</div>
            <div className="created-loading-icon">
              <LoaderDots theme="muted" size="medium" />
            </div>
          </div>
        </Fade>
      ) : (
        <React.Fragment>
          <Paper>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, i) => (
                <Step key={label}>
                  <StepLabel
                    onClick={() => {
                      if ((payloadReady(activeStep) || i < activeStep) && i <= activeStep + 1) {
                        setActiveStep(i);
                      } else {
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
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
                        showFormError();
                        throw new Error('bad payload');
                      }
                      await saveCampaign();
                      dispatch(updateCampaignState({ cat: 'config', key: 'success', val: true }));
                      setTimeout(() => {
                        dispatch(updateCampaignState({ cat: 'reset', key: 'reset', val: 'reset' }));
                        history.push('/dashboard/campaigns');
                      }, 3000);
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
                      showFormError();
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
        </React.Fragment>
      )}
    </div>
  );
};
