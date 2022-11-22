import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ChannelMediaObject, ChannelMediaTypes, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import Actions from '../../NewCampaign/Actions';
import { channelMediaAction, removeChannelMediaAction, updateCampaign } from '../../../store/actions/campaign';
import './campaignMediaForm.scss';
import MediaSteps from './MediaSteps';

const CampaignMediaForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const socialMediaType = ['Campaign', ...campaign.config.socialMediaType];
  const [campaignImage, setCampaignImage] = useState(campaign.campaignImage);
  const [channelMedia, setChannelMedia] = useState(campaign.config.channelMedia);
  const channelMediaList = useSelector((state: { channelMedia: ChannelMediaTypes }) => state.channelMedia);
  const [platform, setPlatform] = useState<string>('Campaign');
  const [step, setStep] = useState<number>(0);

  const onCampaignImageSuccess = (data: FileObject) => {
    setCampaignImage(data);
  };

  const onSuccess = (channel: string, list: ChannelMediaObject[]) => {
    const allChannels = { ...channelMedia };
    allChannels[channel] = list;
    setChannelMedia(allChannels);
  };

  const handleChannelMedias = (channel: string, ratio: string, data: FileObject, slug: string) => {
    const media = {
      channel: channel,
      media: data,
      slug,
      ratio,
      isDefault: channelMedia[channel].length < 1 ? true : false,
    };
    dispatch(channelMediaAction(media, ratio, channel));
    if (channel === 'Tiktok') {
      onSuccess(channel, [...channelMediaList[channel.toLocaleLowerCase()]['first'], media]);
    } else {
      onSuccess(channel, [
        ...channelMediaList[channel.toLocaleLowerCase()]['first'],
        ...channelMediaList[channel.toLocaleLowerCase()]['second'],
        ...channelMediaList[channel.toLocaleLowerCase()]['third'],
        media,
      ]);
    }
  };

  const removeChannelMedia = (index: number, channel: ChannelMediaObject, ratio: string) => {
    if (channelMedia[channel.channel].length > 1) {
      dispatch(removeChannelMediaAction(ratio, channel.channel, index));
      // remove media from channel media list
      const updatedChannelMedias = { ...channelMedia };
      const filterMedia = updatedChannelMedias[channel.channel].filter((x) => x.slug !== channel.slug);
      const findDefaultMedia = filterMedia.find((x) => x.isDefault === true);
      if (!findDefaultMedia) filterMedia[0] = { ...filterMedia[0], isDefault: true };
      updatedChannelMedias[channel.channel] = filterMedia;
      setChannelMedia(updatedChannelMedias);
    } else {
      return dispatch(showErrorAlert('Default media is required'));
    }
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
      const lastChannel = socialMediaType[socialMediaType.length - 1];
      if (lastChannel === platform) handleNext();
      else {
        setPlatform(socialMediaType[step + 1]);
        setStep((pre) => pre + 1);
      }
    }
  };

  const back = () => {
    if (platform === socialMediaType[0]) handleBack();
    else {
      setStep((pre) => pre - 1);
      setPlatform(socialMediaType[step - 1]);
    }
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!campaignImage.filename) {
      dispatch(showErrorAlert('Campaign image is required'));
      return (validated = false);
    }
    if (!channelMedia.Twitter.length && platform === 'Twitter') {
      dispatch(showErrorAlert(`Default Media is required for Twitter`));
      return (validated = false);
    }
    if (!channelMedia.Instagram.length && platform === 'Instagram') {
      dispatch(showErrorAlert(`Default Media is required for Instagram`));
      return (validated = false);
    }
    if (!channelMedia.Facebook.length && platform === 'Facebook') {
      dispatch(showErrorAlert(`Default Media is required for Facebook`));
      return (validated = false);
    }
    if (!channelMedia.Tiktok.length && platform === 'Tiktok') {
      dispatch(showErrorAlert(`Default Media is required for Tiktok`));
      return (validated = false);
    }
    return validated;
  };

  return (
    <Box className="campaignMediaFormWrapper">
      <MediaSteps
        // steps={steps}
        campaignImage={campaignImage}
        channelMedia={channelMedia}
        onCampaignImageSuccess={onCampaignImageSuccess}
        socialMediaType={socialMediaType}
        onSuccess={onSuccess}
        onError={onError}
        handleChannelMedia={handleChannelMedias}
        removeChannelMedia={removeChannelMedia}
        platform={platform}
      />

      <Actions
        activeStep={activeStep}
        firstStep={firstStep}
        finalStep={finalStep}
        handleBack={back}
        handleNext={next}
      />
    </Box>
  );
};

export default CampaignMediaForm;
