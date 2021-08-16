import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import CustomInput from '../../CustomInput';
import { ErrorObject } from '../../../types';
import { ActionsProps } from '../../NewCampaign/StepsContent';

const CampaignPostAnndTagsForm: React.FC<ActionsProps> = ({
  activeStep,
  handleBack,
  handleNext,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const numOfSuggestedPosts = parseInt(campaign.config.numOfSuggestedPosts);
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState<Array<string>>([]);
  const [tags, setTags] = useState(campaign.suggestedTags.join(','));
  const [errors, setErrors] = useState<ErrorObject>({});

  const initializeSocials = () => {
    const intitValues = [];
    if (numOfSuggestedPosts) {
      for (let a = 0; a < numOfSuggestedPosts; a++) {
        if (campaign.suggestedPosts[a]) {
          intitValues.push(campaign.suggestedPosts[a]);
        } else {
          intitValues.push('');
        }
      }
      setPostValues(intitValues);
    }
  };

  useEffect(initializeSocials, [numOfSuggestedPosts]);

  const handlePostChange = (e: React.ChangeEvent<any>) => {
    const posts = [...postValues];
    posts[e.target.id] = e.target.value;
    setPostValues(posts);
  };

  const getTagValue = () => {
    const values = tags.split(',');
    return values.map((item) => {
      item = item.trim();
      return item ? (item.includes('#') ? `${item}` : `#${item}`) : '';
    });
  };

  const next = () => {
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        suggestedPosts: postValues,
        suggestedTags: getTagValue(),
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
    }
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!tags) {
      setErrors((prev) => ({ ...prev, tags: true }));
      return (validated = false);
    }
    return validated;
  };

  return (
    <Box className="w-full mt-10 px-28">
      <Fade>
        {postValues.map((item, index) => (
          <Box key={index} className="w-full mb-6">
            <CustomInput
              id={index.toString()}
              label={`Suggested Post #${index + 1}`}
              multiline
              value={item}
              rows={4}
              placeholder={`Check out ${campaign.name}...`}
              onChange={handlePostChange}
            />
          </Box>
        ))}
        <Box className="w-full mb-6">
          <CustomInput
            label="Suggested Tags - Comma Separated With Hashtags"
            value={tags}
            placeholder="#raiinmaker, #coiin"
            onChange={(e) => setTags(e.target.value)}
            error={errors['tags']}
          />
        </Box>
        <Box className="w-full">
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

export default CampaignPostAnndTagsForm;
