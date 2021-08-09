import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, FetchResult } from '@apollo/client';
import {
  CampaignCreationResponse,
  NewCampaignVars,
  CampaignRequirementSpecs,
  NewCampaignImageVars,
} from '../../types.d';
import { NEW_CAMPAIGN, NEW_CAMPAIGN_IMAGES } from '../../operations/mutations/campaign';
import StepsView from '../../components/NewCampaign/StepsView';
import StepContent from '../../components/NewCampaign/StepsContent';
import { updateCampaignState } from '../../redux/slices/campaign';
import axios from 'axios';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';

interface Props {
  userData: any;
}

const NewCampaignPage: React.FC<Props> = ({ userData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [progressModal, showProgressModal] = useState(false);
  const [campaignUploadProgress, setCampaignUploadProgress] = useState(0);
  const [sharedMediaUploadProgress, setSharedMediaUploadProgress] = useState(0);
  const [raffleUploadProgress, setRaffleUploadProgress] = useState(0);
  const steps = ['Purpose and Budget', 'Campaign Information', 'Suggested Posts', 'Campaign Requirements', 'Algorithm'];
  const [activeStep, setActiveStep] = useState(0);
  const campaign = useStoreCampaignSelector();

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
      company: userData.company,
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

  const handleNext = () => {
    setActiveStep((prevState) => (prevState < 4 ? prevState + 1 : prevState));
  };
  const handleBack = () => {
    setActiveStep((prevState) => (prevState > 0 ? prevState - 1 : prevState));
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
    <Box className="w-full p-10 overflow-scroll">
      <StepsView list={steps} activeStep={activeStep} />
      <Box className="w-full">
        <StepContent
          activeStep={activeStep}
          firstStep={0}
          finalStep={4}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={createCampaign}
          userData={userData}
          campaign={campaign}
        />
      </Box>
    </Box>
  );
};

export default NewCampaignPage;
