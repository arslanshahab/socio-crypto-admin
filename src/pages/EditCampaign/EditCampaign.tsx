import { Box, CircularProgress, LinearProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, FetchResult, useQuery } from '@apollo/client';
import {
  CampaignCreationResponse,
  NewCampaignVars,
  CampaignState,
  CampaignMediaSignedUrl,
  GetCampaignResult,
  CampaignGetVars,
} from '../../types';
import { UPDATE_CAMPAIGN } from '../../operations/mutations/campaign';
import StepsView from '../../components/NewCampaign/StepsView';
import StepContent from '../../components/NewCampaign/StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import GenericModal from '../../components/GenericModal';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { resetCampaign, updateCampaign } from '../../store/actions/campaign';
import { flatten } from 'lodash';
import { GET_CAMPAIGN } from '../../operations/queries/campaign';
import initialState from '../../store/initialState';
import {
  generateCampaignMediaUrl,
  prepareMediaRequest,
  uploadMedia,
  prepareChannelMediaFromResponse,
  prepareChannelTemplatesFromResponse,
  prepareTemplateRequest,
} from '../../helpers/utils';
import useStoreUserSelector from '../../hooks/useStoreUserSelector';

interface PageParams {
  campaignId?: string;
}

const EditCampaignPage: React.FC = () => {
  const userData = useStoreUserSelector();
  const history = useHistory();
  const { campaignId } = useParams<PageParams>();
  const dispatch = useDispatch();
  const [progressModal, showProgressModal] = useState(false);
  const [campaignUploadProgress, setCampaignUploadProgress] = useState(0);
  const [sharedMediaUploadProgress, setSharedMediaUploadProgress] = useState(0);
  const [raffleUploadProgress, setRaffleUploadProgress] = useState(0);
  const [mediaCount, setMediaCount] = useState(1);
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
  const [saveCampaign] = useMutation<CampaignCreationResponse, NewCampaignVars>(UPDATE_CAMPAIGN);
  const { loading: campaignLoading, data } = useQuery<GetCampaignResult, CampaignGetVars>(GET_CAMPAIGN, {
    variables: { id: campaignId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (campaignId && data && data.getCampaign && campaignId === data.getCampaign.id) {
      const { getCampaign } = data;
      const augmentedCampaign = {
        ...campaign,
        id: getCampaign.id,
        name: getCampaign.name,
        campaignImage: {
          filename: getCampaign.imagePath,
          file: generateCampaignMediaUrl(getCampaign.id, getCampaign.imagePath),
          format: `image/${getCampaign.imagePath.split('.')[0]}`,
        },
        description: getCampaign.description,
        instructions: getCampaign.instructions,
        tagline: getCampaign.tagline,
        target: getCampaign.target,
        targetVideo: getCampaign.targetVideo,
        keywords: getCampaign.keywords,
        beginDate: new Date(parseInt(getCampaign.beginDate)).toISOString(),
        endDate: new Date(parseInt(getCampaign.endDate)).toISOString(),
        suggestedTags: getCampaign.suggestedTags,
        requirements: getCampaign.requirements || initialState.newCampaign.requirements,
        algorithm: getCampaign.algorithm,
        config: {
          ...campaign.config,
          numOfTiers: Object.keys(getCampaign.algorithm.tiers).length.toString(),
          coiinBudget: getCampaign.coiinTotal,
          campaignType: getCampaign.campaignType,
          socialMediaType: getCampaign.socialMediaType,
          budgetType: getCampaign.type,
          cryptoSymbol: getCampaign.symbol,
          channelMedia: prepareChannelMediaFromResponse(
            { ...initialState.newCampaign.config.channelMedia },
            getCampaign.id,
            getCampaign.campaignMedia,
          ),
          channelTemplates: prepareChannelTemplatesFromResponse(
            { ...initialState.newCampaign.config.channelTemplates },
            getCampaign.campaignTemplates,
          ),
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
    }
    return () => {
      dispatch(resetCampaign());
    };
  }, [data?.getCampaign, campaignId]);

  const handleNext = () => {
    setActiveStep((prevState) => (prevState < finalStep ? prevState + 1 : prevState));
  };
  const handleBack = () => {
    setActiveStep((prevState) => (prevState > firstStep ? prevState - 1 : prevState));
  };

  const mutateCampaign = async (data: CampaignState) => {
    try {
      showProgressModal(true);
      const response: FetchResult<Record<string, any>, Record<string, any>> = await saveCampaign({
        variables: {
          id: campaignId,
          name: data.name,
          coiinTotal: parseFloat(data.config.budgetType === 'raffle' ? '0' : data.config.coiinBudget),
          target: data.target,
          targetVideo: data.targetVideo || '',
          beginDate: data.beginDate,
          endDate: data.endDate,
          symbol: data.config.cryptoSymbol,
          description: data.description,
          instructions: data.instructions,
          company: userData.company,
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
        const updatedCampaign: CampaignCreationResponse = response.data.updateCampaign;
        if (updatedCampaign.campaignImageSignedURL) {
          await uploadMedia(updatedCampaign.campaignImageSignedURL, campaign.campaignImage, setCampaignUploadProgress);
        }
        if (updatedCampaign.raffleImageSignedURL) {
          await uploadMedia(updatedCampaign.raffleImageSignedURL, campaign.config.raffleImage, setRaffleUploadProgress);
        }
        if (updatedCampaign.mediaUrls) {
          const campaignMedia = flatten(Object.values(data.config.channelMedia));
          setTotalMedia(data.config.socialMediaType.length);
          for (let index = 0; index < campaignMedia.length; index++) {
            setMediaCount((prev) => prev + 1);
            const signedMediaObject = updatedCampaign.mediaUrls.find(
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
      {campaignId && campaignLoading && (
        <Box className="w-full h-80 flex flex-row justify-center items-center">
          <CircularProgress color="primary" />
        </Box>
      )}
      {campaignId && !campaignLoading && !campaign.id && (
        <Box className="w-full h-80 flex flex-row justify-center items-center">
          <span>No campaign found</span>
        </Box>
      )}
      {campaignId && campaign.id && !campaignLoading && (
        <>
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
              firstStep={firstStep}
              finalStep={finalStep}
              handleBack={handleBack}
              handleNext={handleNext}
              handleSubmit={mutateCampaign}
              userData={userData}
              campaign={campaign}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default EditCampaignPage;
