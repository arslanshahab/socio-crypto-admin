import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import { showErrorAlert } from '../../../store/actions/alerts';
import './campaignPostForm.scss';
import TemplateSteps from './TemplateSteps';
import { FACEBOOK, INSTAGRAM, TIKTOK, TWITTER } from '../../../helpers/constants';

const MAX_POST_LENGTH = 120;

const CampaignPostsForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const campaign = useStoreCampaignSelector();
  const socialMedias = campaign.config.socialMediaType;
  const dispatch = useDispatch();
  const [channelTemplates, setChannelTemplates] = useState(campaign.config.channelTemplates);
  const [step, setStep] = useState<number>(0);
  const [platform, setPlatform] = useState<string>(socialMedias[0]);

  const next = () => {
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        config: {
          ...campaign.config,
          channelTemplates,
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      const lastPlatform = socialMedias[socialMedias.length - 1];
      if (lastPlatform === platform) handleNext();
      else {
        setPlatform(socialMedias[step + 1]);
        setStep((prev) => prev + 1);
      }
    }
  };

  const back = () => {
    if (platform === socialMedias[0]) handleBack();
    else {
      setPlatform(socialMedias[step - 1]);
      setStep((prev) => prev - 1);
    }
  };

  const addPost = (channel: string) => {
    const templates = { ...channelTemplates };
    const channelPosts = [...templates[channel]];
    if (channelPosts.length < 5) {
      channelPosts.push({ channel: channel, post: '' });
      templates[channel] = channelPosts;
      setChannelTemplates(templates);
    } else {
      dispatch(showErrorAlert('Maximum 5 templates are allowed per channel'));
    }
  };

  const removePost = (channel: string, index: number) => {
    const templates = { ...channelTemplates };
    const channelPosts = [...templates[channel]];
    if (channelPosts.length > 2) {
      channelPosts.splice(index, 1);
      templates[channel] = channelPosts;
      setChannelTemplates(templates);
    } else {
      dispatch(showErrorAlert('Minimum two templates are mandatory for each channel'));
    }
  };

  const handlePostChange = (channel: string, index: number, data: string) => {
    const templates = { ...channelTemplates };
    const channelPosts = [...templates[channel]];
    channelPosts[index] = { channel: channel, id: channelPosts[index].id || '', post: data };
    templates[channel] = channelPosts;
    setChannelTemplates(templates);
  };

  const validateInputs = (): boolean => {
    let validated = true;
    const { socialMediaType } = campaign.config;
    for (let index = 0; index < socialMediaType.length; index++) {
      const channel = socialMediaType[index];
      for (let index2 = 0; index2 < channelTemplates[channel].length; index2++) {
        const template = channelTemplates[channel][index2];
        if (!template.post && channel === TWITTER && platform === TWITTER) {
          dispatch(showErrorAlert(`Template posts are required Twitter`));
          return (validated = false);
        }
        if (!template.post && channel === INSTAGRAM && platform === INSTAGRAM) {
          dispatch(showErrorAlert(`Template posts are required Instagram`));
          return (validated = false);
        }
        if (!template.post && channel === FACEBOOK && platform === FACEBOOK) {
          dispatch(showErrorAlert(`Template posts are required Facebook`));
          return (validated = false);
        }
        if (!template.post && channel === TIKTOK && platform === TIKTOK) {
          dispatch(showErrorAlert(`Template posts are required Tiktok`));
          return (validated = false);
        }
        if (template.post.length > MAX_POST_LENGTH) {
          dispatch(showErrorAlert(`Post exceeded maximum length of characters.`));
          return (validated = false);
        }
      }
    }
    return validated;
  };

  return (
    <Box className="campaignPostFormWrapper">
      <TemplateSteps
        channelTemplates={channelTemplates}
        addPost={addPost}
        handlePostChange={handlePostChange}
        removePost={removePost}
        platfrom={platform}
      />
      <Box className="postFormActions">
        <Actions
          activeStep={activeStep}
          firstStep={firstStep}
          finalStep={finalStep}
          handleBack={back}
          handleNext={next}
        />
      </Box>
    </Box>
  );
};

export default CampaignPostsForm;
