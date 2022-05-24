import { Box, CircularProgress, LinearProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useMutation, FetchResult } from '@apollo/client';
import { CampaignCreationResponse, CampaignState, CampaignMediaSignedUrl, UpdateCampaignVars } from '../../types';
import { UPDATE_CAMPAIGN } from '../../operations/mutations/campaign';
import StepsView from '../../components/NewCampaign/StepsView';
import StepContent from '../../components/NewCampaign/StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import GenericModal from '../../components/GenericModal';
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel';
import { resetCampaign, updateCampaign } from '../../store/actions/campaign';
import { flatten } from 'lodash';
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
import axios from 'axios';
import { apiURI } from '../../clients/raiinmaker-api';
import { Campaign } from '../../types.d';

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
  const [saveCampaign] = useMutation<CampaignCreationResponse, UpdateCampaignVars>(UPDATE_CAMPAIGN);
  const [campaignLoading, setCampaignLoading] = useState(false);
  const [fetchedCampaign, setFetchedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    console.log('called', campaignId);
    const fetchedCampaign = async () => {
      if (campaignId) {
        setCampaignLoading(true);
        const response = await axios.get(`${apiURI}/v1/campaign/one/${campaignId}`, {
          withCredentials: true,
        });
        setCampaignLoading(false);
        setFetchedCampaign(response.data.data);
      }
    };
    fetchedCampaign();
  }, [campaignId]);

  useEffect(() => {
    if (campaignId && fetchedCampaign && fetchedCampaign.id && campaignId === fetchedCampaign.id) {
      const augmentedCampaign = {
        ...campaign,
        id: fetchedCampaign.id,
        name: fetchedCampaign.name,
        campaignImage: {
          filename: fetchedCampaign.imagePath,
          file: generateCampaignMediaUrl(fetchedCampaign.id, fetchedCampaign.imagePath),
          format: `image/${fetchedCampaign.imagePath.split('.')[0]}`,
        },
        description: fetchedCampaign.description,
        instructions: fetchedCampaign.instructions,
        tagline: fetchedCampaign.tagline,
        target: fetchedCampaign.target,
        targetVideo: fetchedCampaign.targetVideo,
        keywords: fetchedCampaign.keywords,
        beginDate: new Date(parseInt(fetchedCampaign.beginDate)).toISOString(),
        endDate: new Date(parseInt(fetchedCampaign.endDate)).toISOString(),
        suggestedTags: fetchedCampaign.suggestedTags,
        requirements: fetchedCampaign.requirements || initialState.newCampaign.requirements,
        algorithm: fetchedCampaign.algorithm,
        config: {
          ...campaign.config,
          numOfTiers: Object.keys(fetchedCampaign.algorithm.tiers).length.toString(),
          coiinBudget: fetchedCampaign.coiinTotal,
          campaignType: fetchedCampaign.campaignType,
          socialMediaType: fetchedCampaign.socialMediaType,
          budgetType: fetchedCampaign.type,
          cryptoSymbol: `${fetchedCampaign.symbol}-${fetchedCampaign.network}`,
          isGlobal: fetchedCampaign.isGlobal,
          showUrl: fetchedCampaign.showUrl,
          channelMedia: prepareChannelMediaFromResponse(
            { ...initialState.newCampaign.config.channelMedia },
            fetchedCampaign.id,
            fetchedCampaign.campaignMedia,
          ),
          channelTemplates: prepareChannelTemplatesFromResponse(
            { ...initialState.newCampaign.config.channelTemplates },
            fetchedCampaign.campaignTemplates,
          ),
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
    }
    return () => {
      dispatch(resetCampaign());
    };
  }, [fetchedCampaign, campaignId]);

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
          id: campaignId || '',
          name: data.name,
          coiinTotal: parseFloat(data.config.budgetType === 'raffle' ? '0' : data.config.coiinBudget),
          target: data.target,
          targetVideo: data.targetVideo || '',
          beginDate: data.beginDate,
          endDate: data.endDate,
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
