import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { Box } from '@material-ui/core';
import Actions from '../../NewCampaign/Actions';
import { updateCampaign } from '../../../store/actions/campaign';
import CustomInput from '../../CustomInput';

interface Props {
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const CampaignPostAnndTagsForm: React.FC<Props> = ({
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const campaign = useStoreCampaignSelector();
  const dispatch = useDispatch();
  const [postValues, setPostValues] = useState<Array<string>>([]);
  const [tags, setTags] = useState(campaign.suggestedTags.join(','));

  const initializeSocials = () => {
    const intitValues = [];
    if (campaign.config.numOfSuggestedPosts) {
      for (let a = 0; a < campaign.config.numOfSuggestedPosts; a++) {
        if (campaign.suggestedPosts[a]) {
          intitValues.push(campaign.suggestedPosts[a]);
        } else {
          intitValues.push('');
        }
      }
      setPostValues(intitValues);
    }
  };

  useEffect(initializeSocials, [campaign.config.numOfSuggestedPosts]);

  const handlePostChange = (e: React.ChangeEvent<any>) => {
    const posts = [...postValues];
    posts[e.target.id] = e.target.value;
    setPostValues(posts);
  };

  const getTagValue = () => {
    const values = tags.split(',');
    return values.map((item) => {
      item = item.trim();
      return item.includes('#') ? `${item}` : `#${item}`;
    });
  };

  const next = () => {
    const augmentedCampaign = {
      ...campaign,
      suggestedPosts: postValues,
      suggestedTags: getTagValue(),
    };
    dispatch(updateCampaign(augmentedCampaign));
    handleNext();
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
          />
        </Box>
        <Box className="w-full">
          <Actions
            activeStep={activeStep}
            firstStep={firstStep}
            finalStep={finalStep}
            handleBack={handleBack}
            handleNext={next}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default CampaignPostAnndTagsForm;
