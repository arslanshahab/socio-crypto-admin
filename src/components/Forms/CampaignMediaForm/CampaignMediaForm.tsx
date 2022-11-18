import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ChannelMediaObject, ChannelMediaTypes, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import Actions from '../../NewCampaign/Actions';
import {
  channelMediaAction,
  CHANNEL_MEDIA,
  removeChannelMediaAction,
  updateCampaign,
} from '../../../store/actions/campaign';
import './campaignMediaForm.scss';
import MediaSteps from './MediaSteps';

const CampaignMediaForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const socialMediaType = campaign.config.socialMediaType;
  const [campaignImage, setCampaignImage] = useState(campaign.campaignImage);
  const [channelMedia, setChannelMedia] = useState(campaign.config.channelMedia);
  const channelMediaList = useSelector((state: { channelMedia: ChannelMediaTypes }) => state.channelMedia);

  const [steps, setSteps] = useState<number>(1);
  //   const [firstTwitterMedia, setFirstTwitterMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Twitter.filter((x) => x.ratio === '1x1'),
  //   );
  //   const [firstInstagramMedia, setFirstInsagramMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Instagram.filter((x) => x.ratio === '1x1'),
  //   );
  //   const [firstFacebookMedia, setFirstFacebookMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Facebook.filter((x) => x.ratio === '1x1'),
  //   );
  //   const [secondTwitterMedia, setSecondTwitterMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Twitter.filter((x) => x.ratio === '3x4'),
  //   );
  //   const [secondInstagramMedia, setSecondInstagramMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Instagram.filter((x) => x.ratio === '3x4'),
  //   );
  //   const [secondFacebookMedia, setSecondFacebookMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Facebook.filter((x) => x.ratio === '3x4'),
  //   );
  //   const [thirdTwitterMedia, setThirdTwitterMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Twitter.filter((x) => x.ratio === 'hz'),
  //   );
  //   const [thirdInstagramMedia, setThirdInstagramMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Instagram.filter((x) => x.ratio === 'hz'),
  //   );
  //   const [thirdFacebookMedia, setThirdFacebookMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Facebook.filter((x) => x.ratio === 'hz'),
  //   );
  //   const [tiktokMedia, setTiktokMedia] = useState<ChannelMediaObject[]>(
  //     campaign.config.channelMedia.Tiktok.filter((x) => x.ratio === '1x1'),
  //   );

  const onCampaignImageSuccess = (data: FileObject) => {
    setCampaignImage(data);
  };

  const onSuccess = (channel: string, list: ChannelMediaObject[]) => {
    const allChannels = { ...channelMedia };
    allChannels[channel] = list;
    setChannelMedia(allChannels);
  };

  const handleChannelMedias = (channel: string, ratio: string, data: FileObject, slug: string) => {
    // let updatedMedia: ChannelMediaObject[] = [];
    let updatedChannelMedia: ChannelMediaObject[] = [];

    if (ratio === '1x1') {
      if (channel === 'Twitter') {
        // updatedMedia = [...firstTwitterMedia];
        updatedChannelMedia = [
          ...channelMediaList.twitter.first,
          ...channelMediaList.twitter.second,
          ...channelMediaList.twitter.third,
        ];
        const media = {
          channel: channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'first', 'twitter'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setFirstTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        updatedChannelMedia = [
          ...channelMediaList.instagram.first,
          ...channelMediaList.instagram.second,
          ...channelMediaList.instagram.third,
        ];
        // updatedMedia = [...firstInstagramMedia];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'first', 'instagram'));

        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setFirstInsagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        // updatedMedia = [...firstFacebookMedia];
        updatedChannelMedia = [
          ...channelMediaList.facebook.first,
          ...channelMediaList.facebook.second,
          ...channelMediaList.facebook.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'first', 'facebook'));

        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setFirstFacebookMedia(updatedMedia);
      }
      if (channel === 'Tiktok') {
        // updatedMedia = [...tiktokMedia];
        updatedChannelMedia = [...channelMediaList.tiktok.first];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Tiktok.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'first', 'tiktok'));

        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setTiktokMedia(updatedMedia);
      }
    }
    if (ratio === '3x4') {
      if (channel === 'Twitter') {
        // updatedMedia = [...secondTwitterMedia];
        updatedChannelMedia = [
          ...channelMediaList.twitter.first,
          ...channelMediaList.twitter.second,
          ...channelMediaList.twitter.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'second', 'twitter'));

        // updatedMedia.push(media);
        updatedChannelMedia.push(media);

        // setSecondTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        // updatedMedia = [...secondInstagramMedia];
        updatedChannelMedia = [
          ...channelMediaList.instagram.first,
          ...channelMediaList.instagram.second,
          ...channelMediaList.instagram.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'second', 'instagram'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setSecondInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        // updatedMedia = [...secondFacebookMedia];
        updatedChannelMedia = [
          ...channelMediaList.facebook.first,
          ...channelMediaList.facebook.second,
          ...channelMediaList.facebook.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'second', 'facebook'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setSecondFacebookMedia(updatedMedia);
      }
    }
    if (ratio === 'hz') {
      if (channel === 'Twitter') {
        // updatedMedia = [...thirdTwitterMedia];
        updatedChannelMedia = [
          ...channelMediaList.twitter.first,
          ...channelMediaList.twitter.second,
          ...channelMediaList.twitter.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Twitter.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'third', 'twitter'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setThirdTwitterMedia(updatedMedia);
      }
      if (channel === 'Instagram') {
        // updatedMedia = [...thirdInstagramMedia];
        updatedChannelMedia = [
          ...channelMediaList.instagram.first,
          ...channelMediaList.instagram.second,
          ...channelMediaList.instagram.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Instagram.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'third', 'instagram'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setThirdInstagramMedia(updatedMedia);
      }
      if (channel === 'Facebook') {
        // updatedMedia = [...thirdFacebookMedia];
        updatedChannelMedia = [
          ...channelMediaList.facebook.first,
          ...channelMediaList.facebook.second,
          ...channelMediaList.facebook.third,
        ];
        const media = {
          channel,
          media: data,
          slug,
          ratio,
          isDefault: channelMedia.Facebook.length < 1 ? true : false,
        };
        dispatch(channelMediaAction(media, 'third', 'facebook'));
        // updatedMedia.push(media);
        updatedChannelMedia.push(media);
        // setThirdFacebookMedia(updatedMedia);
      }
    }
    onSuccess(channel, updatedChannelMedia);
  };

  const removeChannelMedia = (index: number, channel: ChannelMediaObject, ratio: string) => {
    // let updatedMedia: ChannelMediaObject[] = [];
    if (channelMedia[channel.channel].length > 1) {
      dispatch(removeChannelMediaAction(ratio, channel.channel, index));
      // remove media from channel media list
      const updatedChannelMedias = channelMedia;
      const filterMedia = updatedChannelMedias[channel.channel].filter((x) => x.slug !== channel.slug);
      const findDefaultMedia = filterMedia.find((x) => x.isDefault === true);
      const updatedFilterMedia: ChannelMediaObject[] = filterMedia;
      if (!findDefaultMedia) {
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
        firstTwitterMedia={channelMediaList.twitter.first}
        secondTwitterMedia={channelMediaList.twitter.second}
        thirdTwitterMedia={channelMediaList.twitter.third}
        firstInstagramMedia={channelMediaList.instagram.first}
        secondInstagramMedia={channelMediaList.instagram.second}
        thirdInstagramMedia={channelMediaList.instagram.third}
        firstFacebookMedia={channelMediaList.facebook.first}
        secondFacebookMedia={channelMediaList.facebook.second}
        thirdFacebookMedia={channelMediaList.facebook.third}
        tiktokMedia={channelMediaList.tiktok.first}
        handleChannelMedia={handleChannelMedias}
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
