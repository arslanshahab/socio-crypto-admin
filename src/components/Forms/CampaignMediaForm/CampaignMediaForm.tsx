import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ChannelMediaObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
// import FileUpload from '../../../componentsv2/FileUpload';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import Actions from '../../NewCampaign/Actions';
// import ChannelMediaForm from './ChannelMediaForm';
import { updateCampaign } from '../../../store/actions/campaign';
// import CampaignAvatar from '../../../assets/svg/campaignAvatar.svg';
// import { mediaInstructions } from '../../../helpers/constants';
import './campaignMediaForm.scss';
import MediaSteps from './MediaSteps';

const CampaignMediaForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  //   const socialMedias = campaign.config.socialMediaType;
  const socialMediaType = campaign.config.socialMediaType;
  const [campaignImage, setCampaignImage] = useState(campaign.campaignImage);
  const [channelMedia, setChannelMedia] = useState(campaign.config.channelMedia);
  const [steps, setSteps] = useState<number>(1);
  const [firstTwitterMedia, setFirstTwitterMedia] = useState<ChannelMediaObject[]>([]);
  const [firstInstagramMedia, setFirstInsagramMedia] = useState<ChannelMediaObject[]>([]);
  const [firstFacebookMedia, setFirstFacebookMedia] = useState<ChannelMediaObject[]>([]);
  const [secondTwitterMedia, setSecondTwitterMedia] = useState<ChannelMediaObject[]>([]);
  const [secondInstagramMedia, setSecondInstagramMedia] = useState<ChannelMediaObject[]>([]);
  const [secondFacebookMedia, setSecondFacebookMedia] = useState<ChannelMediaObject[]>([]);
  const [thirdTwitterMedia, setThirdTwitterMedia] = useState<ChannelMediaObject[]>([]);
  const [thirdInstagramMedia, setThirdInstagramMedia] = useState<ChannelMediaObject[]>([]);
  const [thirdFacebookMedia, setThirdFacebookMedia] = useState<ChannelMediaObject[]>([]);
  const [tiktokMedia, setTiktokMedia] = useState<ChannelMediaObject[]>([]);

  const onCampaignImageSuccess = (data: FileObject) => {
    setCampaignImage(data);
  };

  const onSuccess = (channel: string, list: ChannelMediaObject[]) => {
    const allChannels = { ...channelMedia };
    allChannels[channel] = list;
    setChannelMedia(allChannels);
  };

  const handleChannelMedias = (channel: string, size: string, data: FileObject) => {
    let updatedMedia: ChannelMediaObject[] = [];
    let updatedChannelMedia: ChannelMediaObject[] = [];

    if (size === '1x1') {
      if (channel === 'Twitter') {
        updatedMedia = [...firstTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia, ...thirdTwitterMedia];
        const media = { channel: channel, media: data, isDefault: channelMedia.Twitter.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia, ...thirdInstagramMedia];
        updatedMedia = [...firstInstagramMedia];
        const media = { channel, media: data, isDefault: channelMedia.Instagram.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstInsagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...firstFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = { channel, media: data, isDefault: channelMedia.Facebook.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstFacebookMedia(updatedMedia);
      }
      if (channel === 'Tiktok') {
        updatedMedia = [...tiktokMedia];
        updatedChannelMedia = [...tiktokMedia];
        const media = { channel, media: data, isDefault: channelMedia.Facebook.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setTiktokMedia(updatedMedia);
      }
    }
    if (size === '3x4') {
      if (channel === 'Twitter') {
        updatedMedia = [...secondTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia];
        const media = { channel, media: data, isDefault: channelMedia.Twitter.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);

        setSecondTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedMedia = [...secondInstagramMedia];
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia];
        const media = { channel, media: data, isDefault: channelMedia.Instagram.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setSecondInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...firstFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = { channel, media: data, isDefault: channelMedia.Facebook.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setSecondFacebookMedia(updatedMedia);
      }
    }
    if (size === 'hz') {
      if (channel === 'Twitter') {
        updatedMedia = [...thirdTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia, ...thirdTwitterMedia];
        const media = { channel, media: data, isDefault: channelMedia.Instagram.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedMedia = [...thirdInstagramMedia];
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia, ...thirdInstagramMedia];
        const media = { channel, media: data, isDefault: channelMedia.Instagram.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...firstFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = { channel, media: data, isDefault: channelMedia.Facebook.length < 1 ? true : false };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdFacebookMedia(updatedMedia);
      }
    }
    onSuccess(channel, updatedChannelMedia);
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
      if (steps >= 5) handleNext();
      else {
        setSteps((pre) => pre + 1);
      }
    }
  };

  const back = () => {
    if (steps === 1) handleBack();
    else {
      setSteps((pre) => pre - 1);
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
      if (!defaultMedia && !steps) {
        dispatch(showErrorAlert(`Default Media is required for ${channel}`));
        return (validated = false);
      }
    }
    return validated;
  };

  return (
    <Box className="campaignMediaFormWrapper">
      <MediaSteps
        steps={steps}
        campaignImage={campaignImage}
        channelMedia={channelMedia}
        onCampaignImageSuccess={onCampaignImageSuccess}
        socialMediaType={socialMediaType}
        onSuccess={onSuccess}
        onError={onError}
        firstTwitterMedia={firstTwitterMedia}
        handleFirstMedia={handleChannelMedias}
        firstInstagramMedia={firstInstagramMedia}
        // handleSecondMedia={handleChannelMedias}
        secondTwitterMedia={secondTwitterMedia}
        secondInstagramMedia={secondInstagramMedia}
        thirdTwitterMedia={thirdTwitterMedia}
        thirdInstagramMedia={thirdInstagramMedia}
        firstFacebookMedia={firstFacebookMedia}
        secondFacebookMedia={secondFacebookMedia}
        thirdFacebookMedia={thirdFacebookMedia}
        tiktokMedia={tiktokMedia}
      />
      {/* <Box className="campaignMediaFormOutline">
        <div className="mediaContent">
          <img src={CampaignAvatar} alt={'campaign media'} />
          {campaignImage.file && (
            <div className="imageWrapper">
              <img src={campaignImage.file} alt={campaignImage.filename} className="image" />
            </div>
          )}

          <FileUpload
            label="Add Campaign Content"
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
          <Box className="channelMedias">
            <ChannelMediaForm channel={item} onChange={onSuccess} channelMedias={channelMedia[item]} />
          </Box>
          <p className="text-sm text-grayWeb mt-1 px-4">Instructions: {mediaInstructions[item]}</p>
        </div>
      ))} */}

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
