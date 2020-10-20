import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Campaign, NewCampaignVars } from '../../types';
import { Paper, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { Initialize } from './Initialize';
import { PostsAndTags } from './PostsAndTags';
import { Algorithm } from './Algorithm';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { useHistory } from 'react-router';

const NEW_CAMPAIGN = gql(`
    mutation newCampaign($name: String!, $beginDate: String!, $endDate: String!, $target: String!, $description: String!, $coiinTotal: Float!, $algorithm: String!, $company: String, $targetVideo: String!, $image: String, $tagline: String!,$suggestedPosts: [String], $suggestedTags: [String]) {
    newCampaign(name: $name, beginDate: $beginDate, endDate: $endDate, target: $target, description: $description, coiinTotal: $coiinTotal, algorithm: $algorithm, company: $company, targetVideo: $targetVideo, image: $image, tagline: $tagline, suggestedPosts: $suggestedPosts, suggestedTags: $suggestedTags) {
      name
    }
  }
`);

export const NewCampaign: React.FC = () => {
  const history = useHistory();
  const steps = ['Info', 'Suggested Posts', 'Algorithm'];
  const [activeStep, setActiveStep] = useState(0);
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [saveCampaign, { error }] = useMutation<Campaign, NewCampaignVars>(NEW_CAMPAIGN, {
    variables: {
      name: campaign.name,
      coiinTotal: parseFloat(campaign.config.initialTotal),
      target: campaign.target,
      targetVideo: campaign.targetVideo,
      beginDate: campaign.beginDate,
      endDate: campaign.endDate,
      description: campaign.description,
      company: campaign.company,
      algorithm: JSON.stringify(campaign.algorithm),
      image: campaign.image,
      tagline: campaign.tagline,
      suggestedPosts: campaign.suggestedPosts,
      suggestedTags: campaign.suggestedTags,
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
        return <Initialize />;
      case 1:
        return <PostsAndTags />;
      case 2:
        return <Algorithm />;
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Paper>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </React.Fragment>
      <React.Fragment>
        <Paper>
          {renderStepContent(activeStep)}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  const response = await saveCampaign();
                  console.log('REQUEST RESPONSE: ', response.data, response.errors);
                  history.push('/dashboard');
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep !== 0 && (
            <Button onClick={handleBack} color="primary">
              Back
            </Button>
          )}
        </Paper>
      </React.Fragment>
    </React.Fragment>
  );
};
