import { Box, LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, FetchResult } from '@apollo/client';
import {
  CampaignCreationResponse,
  NewCampaignVars,
  NewCampaignImageVars,
  CampaignState,
  FileObject,
} from '../../types.d';
import { NEW_CAMPAIGN, NEW_CAMPAIGN_IMAGES } from '../../operations/mutations/campaign';
import StepsView from '../../components/NewCampaign/StepsView';
import StepContent from '../../components/NewCampaign/StepsContent';
import axios from 'axios';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import GenericModal from '../../components/GenericModal';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { resetCampaign } from '../../store/actions/campaign';
import { dataURLtoFile } from '../../helpers/fileHandler';

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
  const steps = [
    'Purpose and Budget',
    'Campaign Information',
    'Suggested Posts',
    'Campaign Requirements',
    'Algorithm',
    'Preview',
  ];
  const [activeStep, setActiveStep] = useState(0);
  const campaign = useStoreCampaignSelector();

  const [saveCampaign] = useMutation<CampaignCreationResponse, NewCampaignVars>(NEW_CAMPAIGN);
  const [saveCampaignImages] = useMutation<CampaignCreationResponse, NewCampaignImageVars>(NEW_CAMPAIGN_IMAGES);

  const handleNext = () => {
    setActiveStep((prevState) => (prevState < 5 ? prevState + 1 : prevState));
  };
  const handleBack = () => {
    setActiveStep((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  };

  const createCampaign = async (data: CampaignState) => {
    try {
      showProgressModal(true);
      const response: FetchResult<Record<string, any>, Record<string, any>> = await saveCampaign({
        variables: {
          name: data.name,
          coiinTotal: parseFloat(data.config.budgetType === 'raffle' ? '0' : data.config.coiinBudget),
          target: data.target,
          targetVideo: data.targetVideo || '',
          beginDate: data.beginDate,
          endDate: data.endDate,
          cryptoId: data.cryptoId,
          description: data.description,
          company: userData.company,
          algorithm: JSON.stringify(data.algorithm),
          requirements:
            data.config.budgetType === 'raffle' ? { ...data.requirements, email: true } : { ...data.requirements },
          imagePath: data.campaignImage.filename,
          sharedMedia: data.media.filename,
          campaignType: campaign.config.campaignType,
          socialMediaType: campaign.config.socialMediaType,
          tagline: data.tagline,
          suggestedPosts: data.suggestedPosts,
          suggestedTags: data.suggestedTags,
          keywords: data.keywords,
          type: data.config.budgetType || 'coiin',
          rafflePrize:
            data.config.budgetType === 'raffle'
              ? {
                  displayName: data.config.rafflePrizeName,
                  affiliateLink: data.config.rafflePrizeAffiliateLink,
                  image: data.config.raffleImage.filename,
                }
              : undefined,
        },
      });
      if (response.data) {
        const { newCampaign } = response.data;
        if (campaign.campaignImage.file) {
          await uploadMedia(newCampaign.campaignImageSignedURL, campaign.campaignImage, setCampaignUploadProgress);
        }
        if (campaign.media.file) {
          await uploadMedia(newCampaign.sharedMediaSignedURL, campaign.media, setSharedMediaUploadProgress);
        }
        if (campaign.config.raffleImage.file) {
          await uploadMedia(newCampaign.raffleImageSignedURL, campaign.config.raffleImage, setRaffleUploadProgress);
        }

        await saveCampaignImages({
          variables: {
            id: newCampaign.campaignId,
            imagePath: campaign.campaignImage.filename,
            sharedMedia: campaign.media.filename,
            sharedMediaFormat: campaign.media.format,
          },
        });
      }
      showProgressModal(false);
      dispatch(resetCampaign());
      history.push('/dashboard/campaigns');
    } catch (e) {
      showProgressModal(false);
    }
  };

  const uploadMedia = async (url: string, file: FileObject, progressCallback: (p: number) => void) => {
    await axios({
      method: 'PUT',
      url: url,
      data: dataURLtoFile(file.file, file.filename),
      headers: {
        'Content-Type': file.format,
      },
      onUploadProgress: (event) => {
        const progress = ((event.loaded / event.total) * 100).toFixed(0);
        progressCallback(parseFloat(progress));
      },
    });
  };

  return (
    <Box className="w-full p-10 overflow-scroll">
      <GenericModal open={progressModal} onClose={() => showProgressModal(false)} size="mini" persist={true}>
        <Box className="w-full p-10">
          <LinearProgress className="mb-5" />
          <h3 className="animate-pulse text-xl">Creating campaign, Please wait...</h3>
          <Box className="w-full mt-5">
            {campaign.campaignImage.file && (
              <Box className="w-full flex flex-row items-center justify-between mb-3">
                <p>Uploading campaign image</p>
                <CircularProgressWithLabel value={campaignUploadProgress} />
              </Box>
            )}
            {campaign.media.file && (
              <Box className="w-full flex flex-row items-center justify-between mb-3">
                <p>Uploading shared media</p>
                <CircularProgressWithLabel value={sharedMediaUploadProgress} />
              </Box>
            )}
            {campaign.config.raffleImage?.file && (
              <Box className="w-full flex flex-row items-center justify-between">
                <p>Uploading raffle image</p>
                <CircularProgressWithLabel value={raffleUploadProgress} />
              </Box>
            )}
          </Box>
        </Box>
      </GenericModal>
      <StepsView list={steps} activeStep={activeStep} />
      <Box className="w-full">
        <StepContent
          activeStep={activeStep}
          firstStep={0}
          finalStep={5}
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
