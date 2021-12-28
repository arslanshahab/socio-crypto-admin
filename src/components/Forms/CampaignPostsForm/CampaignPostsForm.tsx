import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import CustomButton from '../../CustomButton/CustomButton';
import AddIcon from '@material-ui/icons/Add';
import { showErrorAlert } from '../../../store/actions/alerts';
import CustomInput from '../../CustomInput/CustomInput';
import CloseIcon from '@material-ui/icons/Close';

const MAX_POST_LENGTH = 120;

const CampaignPostsForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const campaign = useStoreCampaignSelector();
  const socialMediaType = campaign.config.socialMediaType;
  const dispatch = useDispatch();
  const [channelTemplates, setChannelTemplates] = useState(campaign.config.channelTemplates);

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
      handleNext();
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
    channelPosts[index] = { channel: channel, post: data };
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
        if (!template.post) {
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
    <Box className="w-full mt-10 px-28">
      <Fade>
        <Box className="w-full flex flex-col box-border items-center">
          {socialMediaType.map((channel, index) => (
            <Box key={index} className="w-full flex flex-col border-solid border-2 border-gray-100 p-5 rounded-md mt-5">
              <Box className="w-full flex flex-row justify-between items-center box-border">
                <p className="text-xl mb-2">{`${channel} Templates`}</p>
                <CustomButton
                  className="w-40 h-8 ml-5 rounded-md text-white text-md border-2 border-green-600 bg-green-600"
                  onClick={() => addPost(channel)}
                >
                  <AddIcon className="mr-2" />
                  <span>Add Template</span>
                </CustomButton>
              </Box>
              {channelTemplates[channel].map((item, index) => (
                <Box className="w-full box-border pr-4 mt-6" key={index.toString()}>
                  <CustomInput
                    required={true}
                    label={`Template ${index + 1}`}
                    multiline
                    value={item.post}
                    rows={3}
                    onChange={(e) => {
                      handlePostChange(channel, index, e.target.value);
                    }}
                  />
                  <div className="w-full flex flex-row justify-between items-center">
                    {index < 2 && <p className="text-sm text-gray-400 mt-1">Default Template</p>}
                    {index >= 2 && (
                      <CustomButton
                        className="w-32 mt-1 rounded-md text-red-600 text-sm bg-transparent"
                        onClick={() => removePost(channel, index)}
                      >
                        <CloseIcon className="mr-1" style={{ fontSize: '18px' }} />
                        <span>Remove Post</span>
                      </CustomButton>
                    )}
                    <span className="text-xs flex flex-row justify-end text-gray-500">
                      Characters added {`${item.post.length}/${MAX_POST_LENGTH}`}
                    </span>
                  </div>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <Box className="w-full mt-10">
          <Actions
            activeStep={activeStep}
            firstStep={firstStep}
            finalStep={finalStep}
            handleBack={handleBack}
            handleNext={next}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default CampaignPostsForm;
