import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import { ErrorObject } from '../../../types';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import CustomButton from '../../CustomButton/CustomButton';
import AddIcon from '@material-ui/icons/Add';
import { showErrorAlert } from '../../../store/actions/alerts';
import CustomInput from '../../CustomInput/CustomInput';
import CloseIcon from '@material-ui/icons/Close';

const CampaignPostsForm: React.FC<ActionsProps> = ({ activeStep, handleBack, handleNext, firstStep, finalStep }) => {
  const campaign = useStoreCampaignSelector();
  const socialMediaType = campaign.config.socialMediaType;
  const dispatch = useDispatch();
  const [channelTemplates, setChannelTemplates] = useState(campaign.config.channelTemplates);
  const [errors, setErrors] = useState<ErrorObject>({});

  const next = () => {
    const augmentedCampaign = {
      ...campaign,
      config: {
        ...campaign.config,
        channelTemplates,
      },
    };
    dispatch(updateCampaign(augmentedCampaign));
    handleNext();
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
