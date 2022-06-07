import { Box, LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, FetchResult } from '@apollo/client';
import { CampaignCreationResponse, NewCampaignVars, CampaignState, CampaignMediaSignedUrl } from '../../types.d';
import { NEW_CAMPAIGN } from '../../operations/mutations/campaign';
import StepsView from '../../components/NewCampaign/StepsView';
import StepContent from '../../components/NewCampaign/StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import GenericModal from '../../components/GenericModal';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { resetCampaign } from '../../store/actions/campaign';
import { flatten } from 'lodash';
import { prepareMediaRequest, prepareTemplateRequest, uploadMedia } from '../../helpers/utils';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';

const NewCampaignPage: React.FC = () => {
  const userData = useStoreUserSelector();
  const history = useHistory();
  const dispatch = useDispatch();
  const [progressModal, showProgressModal] = useState(false);
  const [campaignUploadProgress, setCampaignUploadProgress] = useState(0);
  const [sharedMediaUploadProgress, setSharedMediaUploadProgress] = useState(0);
  const [raffleUploadProgress, setRaffleUploadProgress] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [totalMedia, setTotalMedia] = useState(0);
  const steps = [
    'Purpose and Budget',
    'Campaign Information',
    'Campaign Media',
    'Posting Templates',
    'Campaign Requirements',
    'Algorithm',
    'Preview',
  ];
  const firstStep = 0;
  const finalStep = steps.length - 1;
  const [activeStep, setActiveStep] = useState(firstStep);
  const campaign = useStoreCampaignSelector();
  const [saveCampaign] = useMutation<CampaignCreationResponse, NewCampaignVars>(NEW_CAMPAIGN);

  const handleNext = () => {
    setActiveStep((prevState) => (prevState < finalStep ? prevState + 1 : prevState));
  };
  const handleBack = () => {
    setActiveStep((prevState) => (prevState > firstStep ? prevState - 1 : prevState));
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
          symbol: data.config.cryptoSymbol.split('-')[0],
          network: data.config.cryptoSymbol.split('-')[1] || '',
          description: data.description,
          instructions: data.instructions,
          company: userData.company,
          isGlobal: campaign.config.isGlobal,
          showUrl: campaign.config.showUrl,
          algorithm: JSON.stringify(data.algorithm),
          requirements:
            data.config.budgetType === 'raffle' ? { ...data.requirements, email: true } : { ...data.requirements },
          imagePath: data.campaignImage.filename,
          campaignType: campaign.config.campaignType,
          socialMediaType: campaign.config.socialMediaType,
          tagline: data.tagline,
          suggestedPosts: data.suggestedPosts,
          suggestedTags: data.suggestedTags,
          keywords: data.keywords,
          type: data.config.budgetType || 'coiin',
          campaignMedia: prepareMediaRequest(data.config.channelMedia),
          campaignTemplates: prepareTemplateRequest(data.config.channelTemplates),
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
        const newCampaign: CampaignCreationResponse = response.data.newCampaign;
        if (newCampaign.campaignImageSignedURL) {
          await uploadMedia(newCampaign.campaignImageSignedURL, campaign.campaignImage, setCampaignUploadProgress);
        }
        if (newCampaign.raffleImageSignedURL) {
          await uploadMedia(newCampaign.raffleImageSignedURL, campaign.config.raffleImage, setRaffleUploadProgress);
        }
        if (newCampaign.mediaUrls) {
          const campaignMedia = flatten(Object.values(data.config.channelMedia));
          setTotalMedia(newCampaign.mediaUrls.length);
          for (let index = 0; index < campaignMedia.length; index++) {
            setMediaCount((prev) => prev + 1);
            const signedMediaObject = newCampaign.mediaUrls.find(
              (responseMedia: CampaignMediaSignedUrl) =>
                responseMedia.name === campaignMedia[index].media.filename &&
                responseMedia.channel === campaignMedia[index].channel,
            );
            if (signedMediaObject) {
              await uploadMedia(signedMediaObject.signedUrl, campaignMedia[index].media, setSharedMediaUploadProgress);
            }
          }
        }
      }
      setTimeout(() => {
        showProgressModal(false);
        dispatch(resetCampaign());
        history.push('/dashboard/campaigns');
      }, 1000);
    } catch (e) {
      showProgressModal(false);
    }
  };

  return (
    <Box className="w-full px-10 py-5 overflow-scroll">
      <GenericModal open={progressModal} onClose={() => showProgressModal(false)} size="mini" persist={true}>
        <Box className="w-full p-10">
          <LinearProgress className="mb-5" />
          <h3 className="animate-pulse text-xl">Creating campaign, Please wait...</h3>
          <Box className="w-full mt-5">
            <Box className="w-full flex flex-row items-center justify-between mb-3">
              <p>Uploading campaign Image</p>
              <CircularProgressWithLabel value={campaignUploadProgress} />
            </Box>
            <Box className="w-full flex flex-row items-center justify-between mb-3">
              <p>{`Uploading Campaign Media ${mediaCount}/${totalMedia}`}</p>
              <CircularProgressWithLabel value={sharedMediaUploadProgress} />
            </Box>
            {campaign.config.raffleImage?.file && (
              <Box className="w-full flex flex-row items-center justify-between">
                <p>Uploading Raffle Image</p>
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
          finalStep={steps.length - 1}
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
