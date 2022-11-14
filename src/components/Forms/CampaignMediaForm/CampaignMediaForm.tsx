import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ChannelMediaObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import './campaignMediaForm.scss';
import MediaSteps from './MediaSteps';

const CampaignMediaForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const socialMediaType = campaign.config.socialMediaType;
  const [campaignImage, setCampaignImage] = useState(campaign.campaignImage);
  const [channelMedia, setChannelMedia] = useState(campaign.config.channelMedia);

  const [steps, setSteps] = useState<number>(1);
  const [firstTwitterMedia, setFirstTwitterMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Twitter.filter((x) => x.ratio === '1x1'),
  );
  const [firstInstagramMedia, setFirstInsagramMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Instagram.filter((x) => x.ratio === '1x1'),
  );
  const [firstFacebookMedia, setFirstFacebookMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Facebook.filter((x) => x.ratio === '1x1'),
  );
  const [secondTwitterMedia, setSecondTwitterMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Twitter.filter((x) => x.ratio === '3x4'),
  );
  const [secondInstagramMedia, setSecondInstagramMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Instagram.filter((x) => x.ratio === '3x4'),
  );
  const [secondFacebookMedia, setSecondFacebookMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Facebook.filter((x) => x.ratio === '3x4'),
  );
  const [thirdTwitterMedia, setThirdTwitterMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Twitter.filter((x) => x.ratio === 'hz'),
  );
  const [thirdInstagramMedia, setThirdInstagramMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Instagram.filter((x) => x.ratio === 'hz'),
  );
  const [thirdFacebookMedia, setThirdFacebookMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Facebook.filter((x) => x.ratio === 'hz'),
  );
  const [tiktokMedia, setTiktokMedia] = useState<ChannelMediaObject[]>(
    campaign.config.channelMedia.Tiktok.filter((x) => x.ratio === '1x1'),
  );

  const onCampaignImageSuccess = (data: FileObject) => {
    setCampaignImage(data);
  };

  const onSuccess = (channel: string, list: ChannelMediaObject[]) => {
    const allChannels = { ...channelMedia };
    allChannels[channel] = list;
    setChannelMedia(allChannels);
  };

  const handleChannelMedias = (channel: string, ratio: string, data: FileObject, mediaSlug: string) => {
    let updatedMedia: ChannelMediaObject[] = [];
    let updatedChannelMedia: ChannelMediaObject[] = [];
    if (ratio === '1x1') {
      if (channel === 'Twitter') {
        updatedMedia = [...firstTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia, ...thirdTwitterMedia];
        const media = {
          channel: channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia, ...thirdInstagramMedia];
        updatedMedia = [...firstInstagramMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstInsagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...firstFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setFirstFacebookMedia(updatedMedia);
      }
      if (channel === 'Tiktok') {
        updatedMedia = [...tiktokMedia];
        updatedChannelMedia = [...tiktokMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Tiktok.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setTiktokMedia(updatedMedia);
      }
    }
    if (ratio === '3x4') {
      if (channel === 'Twitter') {
        updatedMedia = [...secondTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia, ...thirdTwitterMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);

        setSecondTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedMedia = [...secondInstagramMedia];
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia, ...thirdInstagramMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setSecondInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...secondFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setSecondFacebookMedia(updatedMedia);
      }
    }
    if (ratio === 'hz') {
      if (channel === 'Twitter') {
        updatedMedia = [...thirdTwitterMedia];
        updatedChannelMedia = [...firstTwitterMedia, ...secondTwitterMedia, ...thirdTwitterMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedMedia = [...thirdInstagramMedia];
        updatedChannelMedia = [...firstInstagramMedia, ...secondInstagramMedia, ...thirdInstagramMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        updatedMedia = [...thirdFacebookMedia];
        updatedChannelMedia = [...firstFacebookMedia, ...secondFacebookMedia, ...thirdFacebookMedia];
        const media = {
          channel,
          media: data,
          mediaSlug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        updatedMedia.push(media);
        updatedChannelMedia.push(media);
        setThirdFacebookMedia(updatedMedia);
      }
    }
    onSuccess(channel, updatedChannelMedia);
  };

  const removeChannelMedia = (index: number, channel: ChannelMediaObject, ratio: string) => {
    let updatedMedia: ChannelMediaObject[] = [];
    if (channelMedia[channel.channel].length > 1) {
      if (ratio === '1x1') {
        if (channel.channel === 'Twitter') {
          updatedMedia = [...firstTwitterMedia];
          updatedMedia.splice(index, 1);
          setFirstTwitterMedia(updatedMedia);
        } else if (channel.channel === 'Instagram') {
          updatedMedia = [...firstInstagramMedia];
          updatedMedia.splice(index, 1);
          setFirstInsagramMedia(updatedMedia);
        } else if (channel.channel === 'Facebook') {
          updatedMedia = [...firstFacebookMedia];
          updatedMedia.splice(index, 1);
          setFirstFacebookMedia(updatedMedia);
        } else if (channel.channel === 'Tiktok') {
          updatedMedia = [...tiktokMedia];
          updatedMedia.splice(index, 1);
          setTiktokMedia(updatedMedia);
        }
      }
      if (ratio === '3x4') {
        if (channel.channel === 'Twitter') {
          updatedMedia = [...secondTwitterMedia];
          updatedMedia.splice(index, 1);
          setSecondTwitterMedia(updatedMedia);
        } else if (channel.channel === 'Instagram') {
          updatedMedia = [...secondInstagramMedia];
          updatedMedia.splice(index, 1);
          setSecondInstagramMedia(updatedMedia);
        } else if (channel.channel === 'Facebook') {
          updatedMedia = [...secondFacebookMedia];
          updatedMedia.splice(index, 1);
          setSecondFacebookMedia(updatedMedia);
        }
      }
      if (ratio === 'hz') {
        if (channel.channel === 'Twitter') {
          updatedMedia = [...thirdTwitterMedia];
          updatedMedia.splice(index, 1);
          setThirdTwitterMedia(updatedMedia);
        } else if (channel.channel === 'Instagram') {
          updatedMedia = [...thirdInstagramMedia];
          updatedMedia.splice(index, 1);
          setThirdInstagramMedia(updatedMedia);
        } else if (channel.channel === 'Facebook') {
          updatedMedia = [...thirdFacebookMedia];
          updatedMedia.splice(index, 1);
          setThirdFacebookMedia(updatedMedia);
        }
      }

      // remove media from channel media list
      const updatedChannelMedias = { ...channelMedia };
      const filterMedia = updatedChannelMedias[channel.channel].filter((x) => x.mediaSlug !== channel.mediaSlug);
      const findDefaultMedia = filterMedia.filter((x) => x.isDefault !== true);
      const updatedFilterMedia = [...filterMedia];
      if (findDefaultMedia.length === updatedFilterMedia.length) {
        updatedFilterMedia[0].isDefault = true;
      }
      updatedChannelMedias[channel.channel] = updatedFilterMedia;
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
      if (steps > socialMediaType.length) handleNext();
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
    // const { socialMediaType } = campaign.config;
    if (!campaignImage.filename) {
      dispatch(showErrorAlert('Campaign image is required'));
      return (validated = false);
    }
    // if (channelMedia);
    if (!channelMedia.Twitter.length && steps === 2) {
      dispatch(showErrorAlert(`Default Media is required for Twitter`));
      return (validated = false);
    }
    if (!channelMedia.Instagram.length && steps === 3) {
      dispatch(showErrorAlert(`Default Media is required for Instagram`));
      return (validated = false);
    }
    if (!channelMedia.Facebook.length && steps === 4) {
      dispatch(showErrorAlert(`Default Media is required for Facebook`));
      return (validated = false);
    }
    if (!channelMedia.Tiktok.length && steps === 5) {
      dispatch(showErrorAlert(`Default Media is required for Tiktok`));
      return (validated = false);
    }
    // for (let index = 0; index < socialMediaType.length; index++) {
    //   const channel = socialMediaType[index];
    //   const defaultMedia = channelMedia[channel].find((item) => item.isDefault);
    //   if (!defaultMedia) {
    //     dispatch(showErrorAlert(`Default Media is required for ${channel}`));
    //     return (validated = false);
    //   }
    // }
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
        handleChannelMedia={handleChannelMedias}
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
        removeChannelMedia={removeChannelMedia}
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
