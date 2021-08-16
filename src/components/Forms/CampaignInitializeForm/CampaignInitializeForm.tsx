import React from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useDispatch } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Fade } from 'react-awesome-reveal';
import { ToastContainer } from 'react-toastify';
import InfoIcon from '@material-ui/icons/Info';

import icon from '../../../assets/svg/camera.svg';
import { handleImage } from '../../../helpers/fileHandler';
import { Autocomplete } from '@material-ui/lab';
import Actions from '../../NewCampaign/Actions';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';
import { useState } from 'react';
import { ErrorObject, FileObject } from '../../../types';
import { showErrorAlert } from '../../../store/actions/alerts';
import { updateCampaign } from '../../../store/actions/campaign';
import CustomInput from '../../CustomInput';

interface Props {
  userData: {
    company: string;
  };
  campaignType: string;
  activeStep: number;
  firstStep: number;
  finalStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleSubmit: () => void;
}

const CampaignInitializeForm: React.FC<Props> = ({
  campaignType,
  activeStep,
  handleBack,
  handleNext,
  handleSubmit,
  firstStep,
  finalStep,
}) => {
  const dispatch = useDispatch();
  const campaign = useStoreCampaignSelector();
  const [name, setName] = useState(campaign.name);
  const [target, setTarget] = useState(campaign.target);
  const [targetVideo, setTargetVideo] = useState(campaign.targetVideo);
  const [numOfTiers, setTiers] = useState(campaign.config.numOfTiers);
  const [numOfSuggestedPosts, setPosts] = useState(campaign.config.numOfSuggestedPosts);
  const [tagline, setTagline] = useState(campaign.tagline);
  const [keywords, setKeywords] = useState(campaign.keywords);
  const [description, setDescription] = useState(campaign.description);
  const [beginDate, setBeginDate] = useState(campaign.beginDate);
  const [endDate, setEndDate] = useState(campaign.endDate);
  const [campaignImage, setCampaignImage] = useState(campaign.image);
  const [sharedMedia, setSharedMedia] = useState(campaign.sharedMedia);
  const [errors, setErrors] = useState<ErrorObject>({});

  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (endDate && dateIsoString && new Date(endDate).getTime() < new Date(dateIsoString).getTime()) {
      updateErrors('beginDate', '');
    }
    if (dateIsoString) {
      setBeginDate(dateIsoString);
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

  const onSuccess = (data: FileObject, type: string) => {
    if (type === 'campaignImage') {
      setCampaignImage(data);
    } else {
      setSharedMedia(data);
    }
  };

  const onError = (msg: string) => {
    dispatch(showErrorAlert(msg));
  };

  const updateErrors = (name: string, data: any) => {
    const key = name;
    const value = data;
    const newErrors = { ...errors };
    if (!value || value.length === 0) {
      newErrors[key] = true;
    } else {
      newErrors[key] = false;
    }
    setErrors(newErrors);
  };

  const next = () => {
    if (validateInputs()) {
      const augmentedCampaign = {
        ...campaign,
        name,
        description,
        tagline,
        target,
        targetVideo,
        keywords,
        beginDate,
        endDate,
        image: campaignImage,
        sharedMedia,
        config: {
          ...campaign.config,
          numOfTiers,
          numOfSuggestedPosts,
        },
      };
      dispatch(updateCampaign(augmentedCampaign));
      handleNext();
    }
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
    if (!numOfSuggestedPosts) {
      setErrors((prev) => ({ ...prev, numOfSuggestedPosts: true }));
      return (validated = false);
    }
    if (!tagline) {
      setErrors((prev) => ({ ...prev, tagline: true }));
      return (validated = false);
    }
    if (!keywords || !keywords.length) {
      setErrors((prev) => ({ ...prev, keywords: true }));
      return (validated = false);
    }
    if (!description) {
      setErrors((prev) => ({ ...prev, description: true }));
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
      <Box className="w-full flex flex-row flex-wrap px-20 mt-10">
        <Box className="box-border w-4/6 flex flex-row flex-wrap">
          <Box className="w-full box-border pr-4 mt-5">
            <CustomInput
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
          <Box className="w-3/6 box-border pr-4 mt-5">
            <CustomInput
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
          <Box className="w-3/6 box-border pr-4 mt-5">
            <CustomInput
              label="Landing Page Video URL (Optional)"
              placeholder={'Video URL (Optional)'}
              value={targetVideo}
              error={errors['targetVideo']}
              onChange={(e) => {
                setTargetVideo(e.target.value);
                updateErrors('targetVideo', e.target.value);
              }}
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <CustomInput
              label="How many Reward Tiers would you like to provide? (1-10)"
              type="number"
              value={numOfTiers}
              disabled={campaignType === 'raffle'}
              error={errors['numOfTiers']}
              onChange={(e) => {
                const value = parseInt(e.target.value) < 1 ? 1 : parseInt(e.target.value) > 10 ? 10 : 0;
                setTiers(value);
                updateErrors('numOfTiers', e.target.value);
              }}
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <CustomInput
              label="How many Posting Templates would you like to provide? (1-5)"
              type="number"
              value={numOfSuggestedPosts}
              error={errors['numOfSuggestedPosts']}
              onChange={(e) => {
                const value = parseInt(e.target.value) < 1 ? 1 : parseInt(e.target.value) > 5 ? 5 : 0;
                setPosts(value);
                updateErrors('numOfSuggestedPosts', e.target.value);
              }}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <CustomInput
              label="Campaign Tagline"
              placeholder="Campaign Tagline"
              value={tagline}
              error={errors['tagline']}
              onChange={(e) => {
                setTagline(e.target.value);
                updateErrors('tagline', e.target.value);
              }}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <Autocomplete
              className="w-full customInput"
              id="keywords"
              freeSolo={true}
              multiple={true}
              options={keywords}
              getOptionLabel={(option) => option}
              defaultValue={keywords}
              renderInput={(params) => (
                <TextField
                  error={errors['keywords']}
                  {...params}
                  variant="outlined"
                  label="Keywords"
                  placeholder="Add keywords for campaign and press enter"
                />
              )}
              onChange={(e, val) => {
                setKeywords(val);
                updateErrors('keywords', val.length ? val : '');
              }}
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <CustomInput
              label="Description"
              multiline
              value={description}
              rows={4}
              error={errors['description']}
              onChange={(e) => {
                setDescription(e.target.value);
                updateErrors('description', e.target.value);
              }}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <DateTimePicker
              value={beginDate || null}
              inputVariant="outlined"
              variant="dialog"
              fullWidth
              label="Campaign Start Date"
              showTodayButton
              className="customInput"
              error={errors['beginDate']}
              onChange={handleBeginDateChange}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <DateTimePicker
              inputVariant="outlined"
              fullWidth
              value={endDate || null}
              disablePast
              label="Campaign End Date"
              showTodayButton
              className="customInput"
              error={errors['endDate']}
              onChange={handleEndDateChange}
            />
          </Box>
        </Box>
        <Box className="w-2/6 flex flex-col flex-wrap">
          <Box className="flex flex-col p-5 w-full">
            <label htmlFor="campaignImage" className="cursor-pointer w-full">
              <Box className=" w-full flex flex-col justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
                {campaignImage.file ? (
                  <Box className="w-full">
                    <img src={campaignImage.file} alt="image" className="w-full h-44 mb-2 rounded-md object-cover" />
                  </Box>
                ) : (
                  <>
                    <img src={icon} alt="campaign-media" className="w-24" />
                  </>
                )}
              </Box>
            </label>
            <input
              hidden
              type="file"
              id="campaignImage"
              onChange={(e) => handleImage(e, 'campaignImage', onSuccess, onError)}
            />
            <label htmlFor="campaignImage">
              <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 cursor-pointer rounded-b-lg">
                <p className="text-center text-gray-600 text-lg mt-2 mr-2">
                  {campaignImage.filename ? 'Update Campaign Image' : 'Add Campaign Image'}
                </p>

                <Tooltip
                  placement="top"
                  title="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
                >
                  <InfoIcon className="tooltipIcon" />
                </Tooltip>
              </Box>
            </label>
          </Box>

          <Box className="flex flex-col p-5 w-full">
            <label htmlFor="sharedMedia" className="cursor-pointer w-full">
              <Box className="flex flex-col justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
                {sharedMedia.file ? (
                  sharedMedia.format.includes('image') ? (
                    <Box className="w-full">
                      <img src={sharedMedia.file} alt="image" className="w-full h-44 mb-2 rounded-md object-cover" />
                    </Box>
                  ) : (
                    <Box className="w-full">
                      <video
                        autoPlay={false}
                        height="150"
                        width="250"
                        src={URL.createObjectURL(campaign.sharedMedia.file)}
                      />
                      <span>{sharedMedia.filename}</span>
                    </Box>
                  )
                ) : (
                  <>
                    <img src={icon} alt="shared-media" className="w-24" />
                  </>
                )}
              </Box>
            </label>
            <input
              hidden
              type="file"
              id="sharedMedia"
              onChange={(e) => handleImage(e, 'sharedMedia', onSuccess, onError)}
            />
            <label htmlFor="sharedMedia">
              <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 rounded-b-lg">
                <p className="text-center text-gray-600 text-lg mt-2 mr-2">
                  {sharedMedia.filename ? 'Update Shared Media' : 'Default Shared Media'}
                </p>
                <Tooltip
                  placement="top"
                  title="This is the default media to be shared by the Raiinmaker in this particular campaign. Image/Video/GIF files are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
                >
                  <InfoIcon className="tooltipIcon" />
                </Tooltip>
              </Box>
            </label>
          </Box>
        </Box>
        <ToastContainer />
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
      </Box>
    </Fade>
  );
};

export default CampaignInitializeForm;
