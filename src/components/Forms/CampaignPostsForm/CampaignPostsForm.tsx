import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import { ActionsProps } from '../../NewCampaign/StepsContent';
// import CustomButton from '../../CustomButton/CustomButton';
// import AddIcon from '@material-ui/icons/Add';
import { showErrorAlert } from '../../../store/actions/alerts';
// import CustomInput from '../../CustomInput/CustomInput';
// import CloseIcon from '@material-ui/icons/Close';
// import styles from '../../CustomInput/customInput.module.css';
import './campaignPostForm.scss';
import TemplateSteps from './TemplateSteps';

const MAX_POST_LENGTH = 120;

const CampaignPostsForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const campaign = useStoreCampaignSelector();
  const socialMedias = campaign.config.socialMediaType;
  const dispatch = useDispatch();
  const [channelTemplates, setChannelTemplates] = useState(campaign.config.channelTemplates);
  const [steps, setSteps] = useState<number>(1);
  const [activeChannel, setActiveChannel] = useState<string>('');

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
      if (steps >= socialMedias.length) handleNext();
      else {
        setSteps((prev) => prev + 1);
      }
    }
  };

  const back = () => {
    if (steps === 1) handleBack();
    else {
      setSteps((prev) => prev - 1);
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
    setActiveChannel(channel);
    const templates = { ...channelTemplates };
    const channelPosts = [...templates[channel]];
    channelPosts[index] = { channel: channel, id: channelPosts[index].id || '', post: data };
    templates[channel] = channelPosts;
    setChannelTemplates(templates);
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (steps < socialMedias.length) validated;
    const { socialMediaType } = campaign.config;
    for (let index = 0; index < socialMediaType.length; index++) {
      const channel = socialMediaType[index];
      for (let index2 = 0; index2 < channelTemplates[channel].length; index2++) {
        const template = channelTemplates[channel][index2];
        if (!template.post && activeChannel === channel) {
          dispatch(showErrorAlert(`Template posts are required`));
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
        steps={steps}
        channelTemplates={channelTemplates}
        addPost={addPost}
        handlePostChange={handlePostChange}
        removePost={removePost}
      />
      {/* <Box className="campaignPostForm">
          {socialMediaType.map((channel, index) => (
            <Box key={index} className="outline">
              <Box className="headWrapper">
                <p>{`${channel} Templates`}</p>
                <CustomButton className="addTempButton" onClick={() => addPost(channel)}>
                  <AddIcon className="mr-2" />
                  <span>Add Template</span>
                </CustomButton>
              </Box>
              {channelTemplates[channel].map((item, index) => (
                <Box className="inputWrapper" key={index.toString()}>
                  <CustomInput
                    required={true}
                    label={`Template ${index + 1}`}
                    multiline
                    value={item.post}
                    rows={3}
                    className={styles.templateField}
                    onChange={(e) => {
                      handlePostChange(channel, index, e.target.value);
                    }}
                  />
                  <div className="templateInfo">
                    {index < 2 && <p>Default Template</p>}
                    {index >= 2 && (
                      <CustomButton className="removeContent" onClick={() => removePost(channel, index)}>
                        <CloseIcon className="closeIcon" />
                        <span>Remove Post</span>
                      </CustomButton>
                    )}
                    <span className="textLimit ">Characters added {`${item.post.length}/${MAX_POST_LENGTH}`}</span>
                  </div>
                </Box>
              ))}
            </Box>
          ))}
        </Box> */}
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
