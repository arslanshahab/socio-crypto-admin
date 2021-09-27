import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { ActionsProps } from './StepsContent';
import useStoreCampaignSelector from '../../hooks/useStoreCampaignSelector';
import Actions from './Actions';
import { campaignTypeMenu } from '../Forms/CampaignSetupForm/CampaignTypeInput';
import { format } from 'date-fns';
import CustomButton from '../CustomButton';
import GenericModal from '../GenericModal';
import { getSocialIcon } from '../Forms/CampaignSetupForm/SocialMediaTypeInput';

const PreviewScreen: React.FC<ActionsProps> = ({
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const [previewType, setPreviewType] = useState('');

  const submit = () => {
    if (handleSubmit) {
      handleSubmit({ ...campaign });
    }
  };

  return (
    <Box className="w-full px-28 mt-10">
      <h2 className="text-gray-800 text-2xl mb-5 text-center">Verify Campaign Information</h2>
      <GenericModal open={Boolean(previewType)} onClose={() => setPreviewType('')} size="small">
        {previewType === 'campaignImage' && (
          <Box className="w-full p-10">
            {
              <img
                src={campaign.campaignImage.file}
                alt="campaign-media"
                className="w-full mb-2 rounded-md object-cover"
              />
            }
          </Box>
        )}

        {previewType === 'media' && (
          <Box className="w-full p-10">
            {campaign.media.format.includes('image') ? (
              <Box className="w-full">
                <img src={campaign.media.file} alt="campaign-media" className="w-full mb-2 rounded-md object-cover" />
              </Box>
            ) : (
              <Box className="w-full">
                <video autoPlay={false} height="100%" width="100%" src={campaign.media.file} controls={true} />
              </Box>
            )}
          </Box>
        )}
        {previewType === 'raffle' && (
          <Box className="w-full">
            {
              <img
                src={campaign.config.raffleImage.file}
                alt="campaign-media"
                className="w-full mb-2 rounded-md object-cover"
              />
            }
          </Box>
        )}
      </GenericModal>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Title</h5>
        <h2 className="text-gray-800 text-md">{campaign.name}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Type</h5>
        <h2 className="w-5/6  text-gray-800 text-md">
          {campaignTypeMenu.find((item) => item.value === campaign.config.campaignType)?.name}
        </h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Social Media Channels</h5>
        <Box className="w-5/6 flex flex-row">
          {campaign.config.socialMediaType.map((item) => (
            <img key={item} className="w-10 mr-3" src={getSocialIcon[item]} alt="social-icon" />
          ))}
        </Box>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Budget Type</h5>
        <h2 className="w-5/6  text-gray-800 text-md capitalize">{campaign.config.type}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Total Budget</h5>
        <h2 className="w-5/6  text-gray-800 text-md">{`${
          campaign.config.coiinBudget
        } ${campaign.config.cryptoSymbol.toUpperCase()}`}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Duration</h5>
        <h2 className="text-gray-800 text-md">
          {campaign.beginDate &&
            campaign.endDate &&
            `${format(new Date(campaign.beginDate), 'MMM dd YYY')} -- ${format(
              new Date(campaign.endDate),
              'MMM dd YYY',
            )}`}
        </h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Description</h5>
        <h2 className="w-5/6  text-gray-800 text-md">{campaign.description}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Tagline</h5>
        <h2 className="w-5/6  text-gray-800 text-md">{campaign.tagline}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Landing Page URL</h5>
        <h2 className="w-5/6 text-gray-800 text-md">{campaign.target}</h2>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Media</h5>
        <Box className="w-5/6 flex flex-row">
          {campaign.campaignImage.file && (
            <CustomButton
              onClick={() => setPreviewType('campaignImage')}
              className="w-52 h-10 mr-5 rounded-md text-white text-md bg-gray-500"
            >
              Preview Campaign Image
            </CustomButton>
          )}
          {campaign.config.raffleImage.file && (
            <CustomButton
              onClick={() => setPreviewType('raffle')}
              className="w-52 h-10 mr-5 rounded-md text-white text-md bg-gray-500"
            >
              Preview Raffle Media
            </CustomButton>
          )}
        </Box>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Tags</h5>
        <Box className="w-5/6 flex flex-row">
          {campaign.suggestedTags.map((item, index) => (
            <span
              key={index}
              className="px-3 py-2 mt-1 mr-2 rounded-lg bg-gray-300 flex flex-row justify-between items-center"
            >
              <p>{item}</p>
            </span>
          ))}
        </Box>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Posting Templates</h5>
        <Box className="w-5/6 flex flex-col">
          {Object.keys(campaign.config.channelTemplates).map((channel, index) => (
            <Box className="w-full flex flex-col mt-3 p-3 bg-gray-100 rounded-md" key={index}>
              <p>{`${channel} Templates`}</p>
              {campaign.config.channelTemplates[channel].map((template, index2) => (
                <p key={index2} className="text-gray-800 text-sm mt-2">{`Post#${index2 + 1}: ${template.post}`}</p>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="w-full flex flex-row items-center space-x-5 mb-2">
        <h5 className="w-1/6  text-gray-500 text-sm">Campaign Keywords</h5>
        <Box className="w-5/6 flex flex-row">
          {campaign.keywords.map((item, index) => (
            <span
              key={index}
              className="px-3 py-2 mt-1 mr-2 rounded-lg bg-gray-300 flex flex-row justify-between items-center"
            >
              <p>{item}</p>
            </span>
          ))}
        </Box>
      </Box>
      <Box className="w-full">
        <Actions
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSubmit={submit}
        />
      </Box>
    </Box>
  );
};

export default PreviewScreen;
