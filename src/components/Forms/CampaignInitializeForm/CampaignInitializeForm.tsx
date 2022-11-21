import React from 'react';
import { Box, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Fade } from 'react-awesome-reveal';
import { Autocomplete } from '@material-ui/lab';
import Actions from '../../NewCampaign/Actions';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { useState } from 'react';
import { ErrorObject } from '../../../types';
import { updateCampaign } from '../../../store/actions/campaign';
import CustomInput from '../../CustomInput';
import { ActionsProps } from '../../NewCampaign/StepsContent';
import styles from '../../CustomInput/customInput.module.css';
import './campaignInitializeForm.scss';

interface Props {
  userData: {
    company: string;
  };
  campaignType: string;
}

const MAX_TAGS_LENGTH = 50;

const CampaignInitializeForm: React.FC<Props & ActionsProps> = ({
  campaignType,
  activeStep,
  handleBack,
  handleNext,
  firstStep,
  finalStep,
}) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const [name, setName] = useState(campaign.name);
  const [target, setTarget] = useState(campaign.target);
  const [targetVideo, setTargetVideo] = useState(campaign.targetVideo);
  const [numOfTiers, setTiers] = useState(!campaign.config.isGlobal ? campaign.config.numOfTiers : '1');
  //   const [tagline, setTagline] = useState(campaign.tagline);
  const [keywords, setKeywords] = useState(campaign.keywords);
  //   const [description, setDescription] = useState(campaign.description);
  const [instructions, setInstructions] = useState(campaign.instructions);
  const [showUrl, setShowUrl] = useState(campaign.config.showUrl);
  const [beginDate, setBeginDate] = useState(
    campaign.beginDate ||
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
  );
  const [endDate, setEndDate] = useState(
    campaign.endDate ||
      new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
  );
  const [tags, setTags] = useState(campaign.suggestedTags.join(','));
  const [errors, setErrors] = useState<ErrorObject>({});

  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (endDate && dateIsoString && new Date(endDate).getTime() < new Date(dateIsoString).getTime()) {
      updateErrors('beginDate', '');
    }
    if (dateIsoString) {
      const date = new Date(dateIsoString);
      const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
      setBeginDate(dateIsoString);
      setEndDate(nextMonth.toISOString());
    }
    updateErrors('beginDate', dateIsoString);
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (beginDate && dateIsoString && new Date(beginDate).getTime() >= new Date(dateIsoString).getTime()) {
      updateErrors('endDate', '');
    }
    if (dateIsoString) {
      setEndDate(dateIsoString);
    }
    updateErrors('endDate', dateIsoString);
  };

  const updateErrors = (key: string, data: any) => {
    const value = data;
    const newErrors = { ...errors };
    if (!value || value.length === 0) {
      newErrors[key] = true;
    } else {
      if (key === 'tags') {
        if (data.length > MAX_TAGS_LENGTH) {
          newErrors[key] = true;
        } else {
          newErrors[key] = false;
        }
      }
    }
    setErrors(newErrors);
  };

  const next = () => {
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        name,
        // description,
        instructions,
        // tagline,
        target,
        targetVideo,
        keywords,
        beginDate,
        endDate,
        suggestedTags: getTagValue(),
        config: {
          ...campaign.config,
          numOfTiers,
          showUrl,
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
    }
  };

  const getTagValue = () => {
    const values = tags.split(',');
    return values.map((item) => {
      item = item.trim();
      return item ? (item.includes('#') ? `${item}` : `#${item}`) : '';
    });
  };

  const validateInputs = (): boolean => {
    let validated = true;
    if (!name) {
      setErrors((prev) => ({ ...prev, name: true }));
      return (validated = false);
    }
    if (!target) {
      setErrors((prev) => ({ ...prev, target: true }));
      return (validated = false);
    }
    if (!numOfTiers) {
      setErrors((prev) => ({ ...prev, numOfTiers: true }));
      return (validated = false);
    }
    // if (!tagline) {
    //   setErrors((prev) => ({ ...prev, tagline: true }));
    //   return (validated = false);
    // }
    if (!keywords || !keywords.length) {
      setErrors((prev) => ({ ...prev, keywords: true }));
      return (validated = false);
    }
    if (!tags) {
      setErrors((prev) => ({ ...prev, tags: true }));
      return (validated = false);
    }
    if (tags.length > MAX_TAGS_LENGTH) {
      setErrors((prev) => ({ ...prev, tags: true }));
      return (validated = false);
    }
    // if (!description) {
    //   setErrors((prev) => ({ ...prev, description: true }));
    //   return (validated = false);
    // }
    if (!instructions) {
      setErrors((prev) => ({ ...prev, instructions: true }));
      return (validated = false);
    }
    if (!beginDate) {
      setErrors((prev) => ({ ...prev, beginDate: true }));
      return (validated = false);
    }
    if (!endDate) {
      setErrors((prev) => ({ ...prev, endDate: true }));
      return (validated = false);
    }
    return validated;
  };

  return (
    <Fade>
      <Box className="campaignInitializeFormWrapper">
        <Box className="campaignInitializeFormOutline">
          <Box className="inputFieldLg">
            <CustomInput
              required={true}
              value={name}
              placeholder="name"
              label="Name of Campaign"
              error={errors['name']}
              onChange={(e) => {
                setName(e.target.value);
                updateErrors('name', e.target.value);
              }}
            />
          </Box>
          <Box className="inputField">
            <CustomInput
              required={true}
              value={target}
              placeholder="Landing Page URL: must start with http or https"
              label="Landing Page URL"
              error={errors['target']}
              onChange={(e) => {
                setTarget(e.target.value);
                updateErrors('target', e.target.value);
              }}
            />
          </Box>
          <Box className="inputField">
            <CustomInput
              label="Landing Page Video URL"
              placeholder="Video URL"
              value={targetVideo}
              error={errors['targetVideo']}
              onChange={(e) => {
                setTargetVideo(e.target.value);
                updateErrors('targetVideo', e.target.value);
              }}
            />
          </Box>
          <Box className="inputField">
            <CustomInput
              required={true}
              label="How many Reward Tiers would you like to provide? (1-10)"
              type="number"
              value={numOfTiers}
              disabled={campaignType === 'raffle'}
              error={errors['numOfTiers']}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
              onChange={(e) => setTiers(e.target.value)}
            />
          </Box>

          <Box className="inputField">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showUrl}
                  style={{ color: '#3f51b5' }}
                  name="Brand Agreement"
                  onChange={(e, checked) => {
                    setShowUrl(checked);
                  }}
                />
              }
              label="Show URL with Social Post"
            />
          </Box>

          {/* <Box className="inputField">
            <CustomInput
              required={true}
              label="Campaign Tagline"
              placeholder="Campaign Tagline"
              value={tagline}
              error={errors['tagline']}
              onChange={(e) => {
                setTagline(e.target.value);
                updateErrors('tagline', e.target.value);
              }}
            />
          </Box> */}
          <Box className="keyworkdInputFieldLg">
            <Autocomplete
              className="autoComplete"
              id="keywords"
              freeSolo={true}
              multiple={true}
              options={keywords}
              value={keywords}
              getOptionLabel={(option) => option}
              defaultValue={keywords}
              onChange={(event, newValue) => {
                setKeywords(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                const options = newInputValue.split(',');
                if (options.length > 1) {
                  setKeywords(
                    keywords
                      .concat(options)
                      .map((x) => x.trim())
                      .filter((x) => x),
                  );
                }
              }}
              renderInput={(params) => (
                <TextField
                  className="textField"
                  required={true}
                  error={errors['keywords']}
                  {...params}
                  variant="outlined"
                  label="Keywords"
                  placeholder="Add keywords for campaign and press enter"
                />
              )}
            />
          </Box>
          <Box className="inputFieldLg">
            <CustomInput
              required={true}
              value={tags}
              placeholder="#"
              label="Hashtags (Comma seperated values)"
              error={errors['tags']}
              onChange={(e) => {
                setTags(e.target.value);
                updateErrors('tags', e.target.value);
              }}
            />
            <span className={`tagStyles  ${errors['tags'] ? 'errorText' : 'grayText'}`}>
              Characters added {`${tags.length}/${MAX_TAGS_LENGTH}`}
            </span>
          </Box>
          {/* <Box className="inputFieldLg">
            <CustomInput
              required={true}
              label="Description"
              multiline
              value={description}
              rows={3}
              error={errors['description']}
              onChange={(e) => {
                setDescription(e.target.value);
                updateErrors('description', e.target.value);
              }}
            />
          </Box> */}
          <Box className="inputFieldLg">
            <CustomInput
              required={true}
              label="Campaign Instructions"
              multiline
              value={instructions}
              rows={3}
              error={errors['Instructions']}
              onChange={(e) => {
                setInstructions(e.target.value);
                updateErrors('instructions', e.target.value);
              }}
            />
          </Box>
          <Box className="inputField">
            <DateTimePicker
              required={true}
              value={beginDate || null}
              inputVariant="outlined"
              variant="dialog"
              fullWidth
              label="Campaign Start Date"
              showTodayButton
              className={styles.customInput}
              error={errors['beginDate']}
              disabled={campaign.config.isGlobal}
              onChange={handleBeginDateChange}
            />
          </Box>
          <Box className="inputField">
            <DateTimePicker
              required={true}
              inputVariant="outlined"
              fullWidth
              value={endDate || null}
              disablePast
              label="Campaign End Date"
              showTodayButton
              error={errors['endDate']}
              disabled={campaign.config.isGlobal}
              onChange={handleEndDateChange}
              className={styles.customInput}
            />
          </Box>
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
      </Box>
    </Fade>
  );
};

export default CampaignInitializeForm;
