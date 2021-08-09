import React, { ChangeEvent } from 'react';
import { Box, TextField, Tooltip } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { updateCampaignState } from '../../../redux/slices/campaign';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Fade } from 'react-awesome-reveal';
import { ToastContainer } from 'react-toastify';
import InfoIcon from '@material-ui/icons/Info';

import icon from '../../../assets/svg/camera.svg';
import { handleImage, showErrorMessage } from '../../../helpers/utils';
import { Autocomplete } from '@material-ui/lab';
import Actions from '../../NewCampaign/Actions';
import useStoreCampaignSelector from '../../../hooks/useStoreCampaignSelector';

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

  const beginDate = campaign.beginDate;
  const endDate = campaign.endDate;

  const handleCampaignChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    dispatch(updateCampaignState({ cat: 'info', key: event.target.name, val: event.target.value }));
  };

  const handleConfigChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    if (event.target.name === 'numOfTiers') {
      if (parseInt(event.target.value) > 10) {
        event.target.value = '10';
      }
      if (parseInt(event.target.value) < 1) {
        event.target.value = '1';
      }
    }
    if (event.target.name === 'numOfSuggestedPosts') {
      if (parseInt(event.target.value) > 5) {
        event.target.value = '5';
      }
      if (parseInt(event.target.value) < 1) {
        event.target.value = '1';
      }
    }
    if (event.target.name === 'initialTotal') {
      dispatch(updateCampaignState({ cat: 'algoTiersCount', tier: '1', key: 'threshold', val: '0' }));
      dispatch(
        updateCampaignState({
          cat: 'algoTiersCount',
          tier: '1',
          key: 'totalCoiins',
          val: campaignType === 'raffle' ? '0' : event.target.value,
        }),
      );
    }
    dispatch(updateCampaignState({ cat: 'config', key: event.target.name, val: event.target.value }));
  };

  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (endDate && dateIsoString && new Date(endDate).getTime() < new Date(dateIsoString).getTime()) {
      return showErrorMessage('Beginning date must be before end date');
    }
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'beginDate', val: dateIsoString }));
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (beginDate && dateIsoString && new Date(beginDate).getTime() >= new Date(dateIsoString).getTime()) {
      return showErrorMessage('Beginning date must be before end date');
    }
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'endDate', val: dateIsoString }));
  };

  const handleKeywordsChange = (event: ChangeEvent<unknown>, value: string[]) => {
    if (value.length) {
      dispatch(updateCampaignState({ cat: 'keywords', key: 'keywords', val: value }));
    }
  };

  return (
    <Fade>
      <Box className="w-full flex flex-row flex-wrap px-20 mt-10">
        <Box className="box-border w-4/6 flex flex-row flex-wrap">
          <Box className="w-full box-border pr-4 mt-5">
            <TextField
              fullWidth
              className="customInput"
              label="Name of Campaign"
              name="name"
              placeholder={'name'}
              value={campaign.name}
              variant="outlined"
              onChange={handleCampaignChange}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <TextField
              fullWidth
              className="customInput"
              label={'Landing Page URL'}
              name={'target'}
              placeholder={'Landing Page URL: must start with http or https'}
              value={campaign.target}
              variant="outlined"
              onChange={handleCampaignChange}
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <TextField
              label={'Landing Page Video URL (Optional)'}
              name={'targetVideo'}
              placeholder={'Video URL (Optional)'}
              value={campaign.targetVideo}
              onChange={handleCampaignChange}
              fullWidth
              variant="outlined"
              className="customInput"
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <TextField
              label={'How many Reward Tiers would you like to provide? (1-10)'}
              fullWidth
              type="number"
              InputProps={{
                inputProps: {
                  max: 10,
                  min: 1,
                },
              }}
              variant="outlined"
              name={'numOfTiers'}
              defaultValue={campaignType === 'raffle' ? 0 : 3}
              placeholder={campaignType === 'raffle' ? '0' : '3'}
              value={campaign.config.numOfTiers}
              onChange={(e) => {
                handleConfigChange(e);
                dispatch(
                  updateCampaignState({
                    cat: 'algoTiersCount',
                    tier: campaign.config.numOfTiers.toString(),
                    key: 'totalCoiins',
                    val: '',
                  }),
                );
                dispatch(
                  updateCampaignState({
                    cat: 'algoTiersCount',
                    tier: e.target.value,
                    key: 'totalCoiins',
                    val: campaign.config.coiinBudget,
                  }),
                );
              }}
              className="customInput"
              disabled={campaignType === 'raffle'}
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <TextField
              label={'How many Posting Templates would you like to provide? (1-5)'}
              name={'numOfSuggestedPosts'}
              placeholder={'2'}
              defaultValue={2}
              type="number"
              InputProps={{
                inputProps: {
                  max: 5,
                  min: 1,
                },
              }}
              onChange={handleConfigChange}
              value={campaign.config.numOfSuggestedPosts}
              className="customInput"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <TextField
              label={'Campaign Tagline'}
              name={'tagline'}
              placeholder={'Campaign Tagline'}
              value={campaign.tagline}
              onChange={handleCampaignChange}
              className="customInput"
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <Autocomplete
              className="w-full customInput"
              id="keywords"
              freeSolo={true}
              multiple={true}
              options={campaign.keywords}
              onChange={handleKeywordsChange}
              getOptionLabel={(option) => option}
              defaultValue={campaign.keywords}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Keywords" placeholder="Add keywords for campaign" />
              )}
            />
          </Box>
          <Box className="w-full box-border pr-4 mt-5">
            <TextField
              label="Description"
              name="description"
              onChange={handleCampaignChange}
              multiline
              value={campaign.description}
              rows={4}
              fullWidth
              variant="outlined"
              className="customInput"
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <DateTimePicker
              value={beginDate || null}
              inputVariant="outlined"
              variant="dialog"
              fullWidth
              onChange={handleBeginDateChange}
              label="Campaign Start Date"
              showTodayButton
              className="customInput"
            />
          </Box>
          <Box className="w-3/6 box-border pr-4 mt-5">
            <DateTimePicker
              inputVariant="outlined"
              fullWidth
              value={endDate || null}
              disablePast
              onChange={handleEndDateChange}
              label="Campaign End Date"
              showTodayButton
              className="customInput"
            />
          </Box>
        </Box>
        <Box className="w-2/6 flex flex-col flex-wrap">
          <Box className="flex flex-col p-5">
            <label htmlFor="campaignImage cursor-pointer">
              <Box className="flex flex-row justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
                {campaign.image.file ? (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(campaign.image.file)} alt="image" />
                    <span>{campaign.image.filename}</span>
                  </div>
                ) : (
                  <img src={icon} alt="campaign-media" className="w-24" />
                )}
              </Box>
            </label>
            <input hidden type="file" id="campaignImage" onChange={(e) => handleImage(e, dispatch, 'campaign-image')} />
            <label htmlFor="campaignImage">
              <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 cursor-pointer rounded-b-lg">
                <p className="text-center text-gray-600 text-xl mt-2 mr-2">
                  {campaign.image.filename ? 'Update Campaign Image' : 'Add Campaign Image'}
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

          <Box className="flex flex-col p-5">
            <label htmlFor="sharedMedia">
              <Box className="flex flex-row justify-center items-center w-full h-44 bg-gray-100 rounded-lg">
                {campaign.sharedMedia.file ? (
                  campaign.sharedMedia.format.includes('image') ? (
                    <div className="image-preview">
                      <img src={URL.createObjectURL(campaign.sharedMedia.file)} alt="image" />
                      <span>{campaign.sharedMedia.filename}</span>
                    </div>
                  ) : (
                    <div className="image-preview">
                      <video
                        autoPlay={true}
                        height="150"
                        width="250"
                        src={URL.createObjectURL(campaign.sharedMedia.file)}
                      />
                      <span>{campaign.sharedMedia.filename}</span>
                    </div>
                  )
                ) : (
                  <img src={icon} alt="shared-media" className="w-24" />
                )}
              </Box>
            </label>
            <input hidden type="file" id="sharedMedia" onChange={(e) => handleImage(e, dispatch, 'shared-media')} />
            <label htmlFor="sharedMedia">
              <Box className="w-full flex flex-row justify-center items-center bg-gray-100 pb-2 rounded-b-lg">
                <p className="text-center text-gray-600 text-xl mt-2 mr-2">
                  {campaign.sharedMedia.filename ? 'Update Shared Media' : 'Default Shared Media'}
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
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default CampaignInitializeForm;
