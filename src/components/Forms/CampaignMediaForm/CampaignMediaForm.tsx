import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ChannelMediaObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import FileUpload from '../../../componentsv2/FileUpload';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import Actions from '../../NewCampaign/Actions';
import ChannelMediaForm from './ChannelMediaForm';
import { updateCampaign } from '../../../store/actions/campaign';
import { ReactComponent as CampaignAvatar } from '../../../assets/svg/campaignAvatar.svg';
import { mediaInstructions } from '../../../helpers/constants';

const CampaignMediaForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const socialMediaType = campaign.config.socialMediaType;
  const [campaignImage, setCampaignImage] = useState(campaign.campaignImage);
  const [channelMedia, setChannelMedia] = useState(campaign.config.channelMedia);

  const onCampaignImageSuccess = (data: FileObject) => {
    setCampaignImage(data);
  };

  const onSuccess = (channel: string, list: ChannelMediaObject[]) => {
    const allChannels = { ...channelMedia };
    allChannels[channel] = list;
    setChannelMedia(allChannels);
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  const next = () => {
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        campaignImage,
        config: {
          ...campaign.config,
          channelMedia: channelMedia,
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
    }
  };

  const validateInputs = (): boolean => {
    let validated = true;
    const { socialMediaType } = campaign.config;
    if (!campaignImage.filename) {
      dispatch(showErrorAlert('Campaign image is required'));
      return (validated = false);
    }
    for (let index = 0; index < socialMediaType.length; index++) {
      const channel = socialMediaType[index];
      const defaultMedia = channelMedia[channel].find((item) => item.isDefault);
      if (!defaultMedia) {
        dispatch(showErrorAlert(`Default Media is required for ${channel}`));
        return (validated = false);
      }
    }
    return validated;
  };

  return (
    <Box className="w-full flex flex-col flex-wrap p-10">
      <Box className="w-full flex flex-col border-solid border-2 border-denimBlue p-5 rounded-3xl">
        <div className="flex items-center gap-8">
          <CampaignAvatar />
          {campaignImage.file && (
            <div className="w-20 h-20 bg-lightGray">
              <img
                src={campaignImage.file}
                alt={campaignImage.filename}
                className="w-full h-full rounded-md object-contain"
              />
            </div>
          )}

          <FileUpload
            label="Add Campaign Image"
            updateLabel="Update Campaign Image"
            mediaType="campaignImage"
            tooltip="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
            onFileSuccess={onCampaignImageSuccess}
            onFileError={onError}
          />
        </div>
      </Box>
      {socialMediaType.map((item, index) => (
        <div key={index}>
          <Box className="w-full flex flex-col border-solid border-2 border-denimBlue p-5 mt-6 rounded-3xl">
            <ChannelMediaForm channel={item} onChange={onSuccess} channelMedias={channelMedia[item]} />
          </Box>
          <p className="text-sm text-grayWeb mt-1 px-4">Instructions: {mediaInstructions[item]}</p>
        </div>
      ))}
      <Box className="w-full">
        <Actions
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={handleBack}
          handleNext={next}
        />
      </Box>
    </Box>
  );
};

export default CampaignMediaForm;
