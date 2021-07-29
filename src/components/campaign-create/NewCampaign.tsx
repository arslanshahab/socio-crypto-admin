import React, { useState, Fragment } from 'react';
import { FetchResult, useMutation } from '@apollo/client';
import { CampaignCreationResponse, CampaignRequirementSpecs, NewCampaignVars } from '../../types';
import { Paper, Stepper, Step, StepLabel, Button, CircularProgress, Dialog, Box, Typography } from '@material-ui/core';
import { Initialize } from './Initialize';
import { PostsAndTags } from './PostsAndTags';
import { Algorithm } from './Algorithm';
import { useSelector, useDispatch } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';

import { RootState } from '../../redux/reducer';
import { useHistory } from 'react-router';
import { Requirements } from './Requirements';
import { SetupCampaign } from '../SetupCampaign';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NEW_CAMPAIGN, NEW_CAMPAIGN_IMAGES } from '../../operations/mutations/campaign';
import { showErrorMessage } from '../../helpers/utils';
import axios from 'axios';
import { NewCampaignImageVars } from '../../types.d';

interface Props {
  userData: any;
}

export const NewCampaign: React.FC<Props> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [progressModal, showProgressModal] = useState(false);
  const [campaignUploadProgress, setCampaignUploadProgress] = useState(0);
  const [sharedMediaUploadProgress, setSharedMediaUploadProgress] = useState(0);
  const [raffleUploadProgress, setRaffleUploadProgress] = useState(0);

  const steps = ['Purpose and Budget', 'Campaign Information', 'Suggested Posts', 'Campaign Requirements', 'Algorithm'];
  const [activeStep, setActiveStep] = useState(0);
  const state = useSelector((state: RootState) => state);
  const campaign = state.newCampaign;
  const [saveCampaign, { loading }] = useMutation<CampaignCreationResponse, NewCampaignVars>(NEW_CAMPAIGN, {
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
      image: campaign.image.filename,
      sharedMedia: campaign.sharedMedia.filename,
      tagline: campaign.tagline,
      suggestedPosts: campaign.suggestedPosts,
      suggestedTags: campaign.suggestedTags,
      keywords: campaign.keywords,
      type: (campaign.config.budgetType as string) || 'coiin',
      rafflePrize:
        campaign.config && campaign.config.budgetType === 'raffle'
          ? {
              displayName: campaign.config['rafflePrizeName'] as string,
              affiliateLink: campaign.config['rafflePrizeAffiliateLink'] as string,
              image: campaign.config.raffleImage?.filename as string,
            }
          : undefined,
    },
  });

  const [saveCampaignImages, { loading: savingImagesLoading }] = useMutation<
    CampaignCreationResponse,
    NewCampaignImageVars
  >(NEW_CAMPAIGN_IMAGES);

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
        return <SetupCampaign company={props.userData.company} />;
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

  const createCampaign = async () => {
    try {
      showProgressModal(true);
      const response: FetchResult<
        CampaignCreationResponse,
        Record<string, any>,
        Record<string, any>
      > = await saveCampaign();
      if (response.data) {
        // eslint-disable-next-line
        // @ts-ignore
        const { newCampaign: campaignCreateResponse } = response.data;
        if (campaign.image.file) {
          await uploadCampaignImage(campaignCreateResponse, campaign.image.file as Blob, campaign.image.format);
        }
        if (campaign.sharedMedia.file) {
          await uploadSharedMedia(
            campaignCreateResponse,
            campaign.sharedMedia.file as Blob,
            campaign.sharedMedia.format,
          );
        }
        if (campaign.config.raffleImage?.file) {
          await uploadRaffleImage(
            campaignCreateResponse,
            campaign.config.raffleImage?.file as Blob,
            campaign.config.raffleImage?.format,
          );
        }

        await saveCampaignImages({
          variables: {
            id: campaignCreateResponse.campaignId,
            image: campaign.image.filename,
            sharedMedia: campaign.sharedMedia.filename,
            sharedMediaFormat: campaign.sharedMedia.format,
          },
        });
      }
      showProgressModal(false);

      setTimeout(() => {
        dispatch(updateCampaignState({ cat: 'reset', key: 'reset', val: 'reset' }));
        showProgressModal(false);
        history.push('/dashboard/campaigns');
      }, 1000);
    } catch (e) {
      showProgressModal(false);
    }
  };

  const uploadRaffleImage = async (data: CampaignCreationResponse, file: Blob, format: string) => {
    await axios({
      method: 'PUT',
      url: data.raffleImageSignedURL,
      data: file,
      headers: {
        'Content-Type': format,
      },
      onUploadProgress: (event) => {
        const progress = ((event.loaded / event.total) * 100).toFixed(2);
        setRaffleUploadProgress(parseFloat(progress));
      },
    });
  };

  const uploadCampaignImage = async (data: CampaignCreationResponse, file: Blob, format: string) => {
    await axios({
      method: 'PUT',
      url: data.campaignImageSignedURL,
      data: file,
      headers: {
        'Content-Type': format,
      },
      onUploadProgress: (event) => {
        const progress = ((event.loaded / event.total) * 100).toFixed(2);
        setCampaignUploadProgress(parseFloat(progress));
      },
    });
  };

  const uploadSharedMedia = async (data: CampaignCreationResponse, file: Blob, format: string) => {
    await axios({
      method: 'PUT',
      url: data.sharedMediaSignedURL,
      data: file,
      headers: {
        'Content-Type': format,
      },
      onUploadProgress: (event) => {
        const progress = ((event.loaded / event.total) * 100).toFixed(2);
        setSharedMediaUploadProgress(parseFloat(progress));
      },
    });
  };

  return (
    <div className="new-campaign">
      <Dialog
        open={progressModal}
        onClose={() => showProgressModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        maxWidth="sm"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <Box className="progressModal">
          <CircularProgress size={35} color="primary" />
          <Typography variant="h3">Creating your campaign, Please wait...</Typography>
          <Box className="statusContainer">
            {campaign.image.file && (
              <Box className="statusBox">
                <Typography variant="h5">Uploading campaign image</Typography>
                <Typography variant="h5"> {campaignUploadProgress}%</Typography>
              </Box>
            )}
            {campaign.sharedMedia.file && (
              <Box className="statusBox">
                <Typography variant="h5">Uploading shared media</Typography>{' '}
                <Typography variant="h5">{sharedMediaUploadProgress}%</Typography>
              </Box>
            )}
            {campaign.config.raffleImage?.file && (
              <Box className="statusBox">
                <Typography variant="h5">Uploading raffle image</Typography>{' '}
                <Typography variant="h5">{raffleUploadProgress}%</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
      <Fragment>
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
              <Button variant="contained" className="new-campaign-button" color="primary" onClick={createCampaign}>
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
                    showErrorMessage('Form Incomplete');
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
          </div>
          <ToastContainer />
        </Paper>
      </Fragment>
    </div>
  );
};
