import React, { ChangeEvent } from 'react';
import { Box, Grid, TextField, Tooltip } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { RootState } from '../../redux/reducer';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReactSVG } from 'react-svg';
import { Fade } from 'react-awesome-reveal';
import { ToastContainer } from 'react-toastify';
import InfoIcon from '@material-ui/icons/Info';

import icon from '../../assets/svg/camera.svg';
import { handleImage, showErrorMessage } from '../../helpers/utils';
import { Autocomplete } from '@material-ui/lab';

interface Props {
  userData: {
    company: string;
  };
  campaignType: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 5,
      paddingBottom: 5,
      width: '100%',
    },
    autoComplete: {
      width: '100%',
    },
  }),
);

export const Initialize: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const beginDate = useSelector((state: RootState) => state.newCampaign.beginDate);
  const campaign = useSelector((state: RootState) => state.newCampaign);
  const endDate = useSelector((state: RootState) => state.newCampaign.endDate);

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
          val: props.campaignType === 'raffle' ? '0' : event.target.value,
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
      <div className="init-campaign-container">
        <Grid container className="form-container" direction={'column'}>
          <Grid container direction="row" justify="space-evenly">
            <div className="image-upload-container">
              <label htmlFor="campaignImage">
                <div>
                  {campaign.image.file ? (
                    <div className="image-preview">
                      <img src={URL.createObjectURL(campaign.image.file)} alt="image" />
                      <span>{campaign.image.filename}</span>
                    </div>
                  ) : (
                    <ReactSVG src={icon} color="#3B5998" />
                  )}
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                id="campaignImage"
                onChange={(e) => handleImage(e, dispatch, 'campaign-image')}
              />
              <Box
                className="margin-bottom"
                minWidth="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <p className="center-text setup-campaign-question">
                  {campaign.image ? 'Update Campaign Image' : 'Add Campaign Image'}
                </p>

                <Tooltip
                  placement="top"
                  title="Only Image files (JPG, JPEG, PNG, SVG) are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
                >
                  <InfoIcon className="tooltipIcon" />
                </Tooltip>
              </Box>
            </div>

            <div className="image-upload-container">
              <label htmlFor="sharedMedia">
                <div>
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
                    <ReactSVG src={icon} color="#3B5998" />
                  )}
                </div>
              </label>
              <input
                className="hidden"
                type="file"
                id="sharedMedia"
                onChange={(e) => handleImage(e, dispatch, 'shared-media')}
              />
              <Box
                className="margin-bottom"
                minWidth="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                <p className="center-text setup-campaign-question">
                  {campaign.sharedMedia ? 'Update Shared Media' : 'Default Shared Media'}
                </p>
                <Tooltip
                  placement="top"
                  title="Image/Video/GIF files are allowed and Please provide an image of following dimensions, 1200px X 675px or aspect ratio of 16:9"
                >
                  <InfoIcon className="tooltipIcon" />
                </Tooltip>
              </Box>
            </div>
          </Grid>
          <div className="margin-bottom">
            <Grid container justify={'center'}>
              <Grid item>
                <TextField
                  style={{ width: '500px' }}
                  label={'Name of Campaign'}
                  name={'name'}
                  placeholder={'name'}
                  value={campaign.name}
                  variant="outlined"
                  margin={'normal'}
                  onChange={handleCampaignChange}
                />
              </Grid>
            </Grid>
          </div>
          <div className="margin-bottom">
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6}>
                <TextField
                  fullWidth
                  label={'Landing Page URL'}
                  name={'target'}
                  placeholder={'Landing Page URL: must start with http or https'}
                  margin={'normal'}
                  value={campaign.target}
                  variant="outlined"
                  onChange={handleCampaignChange}
                  className="text-field"
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  label={'Landing Page Video URL (Optional)'}
                  name={'targetVideo'}
                  placeholder={'Video URL (Optional)'}
                  margin={'normal'}
                  value={campaign.targetVideo}
                  onChange={handleCampaignChange}
                  fullWidth
                  variant="outlined"
                  className="text-field"
                />
              </Grid>
            </Grid>
          </div>
          <div className="margin-bottom">
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6} spacing={0}>
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
                  defaultValue={props.campaignType === 'raffle' ? 0 : 3}
                  placeholder={props.campaignType === 'raffle' ? '0' : '3'}
                  margin={'normal'}
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
                  className="text-field"
                  disabled={props.campaignType === 'raffle'}
                />
              </Grid>
              <Grid container item xs={6} spacing={0}>
                <TextField
                  label={'How many Posting Templates would you like to provide? (1-5)'}
                  name={'numOfSuggestedPosts'}
                  placeholder={'2'}
                  margin={'normal'}
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
                  className="text-field"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <div className="margin-bottom">
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6}>
                <TextField
                  label={'Campaign Tagline'}
                  name={'tagline'}
                  placeholder={'Campaign Tagline'}
                  margin={'normal'}
                  value={campaign.tagline}
                  onChange={handleCampaignChange}
                  className="text-field no-top-margin"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  label="Description"
                  name="description"
                  onChange={handleCampaignChange}
                  multiline
                  value={campaign.description}
                  rows={5}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <div className="margin-bottom">
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6}>
                <DateTimePicker
                  value={beginDate || null}
                  variant="dialog"
                  fullWidth
                  className={classes.textField}
                  onChange={handleBeginDateChange}
                  label="Campaign Start Date"
                  showTodayButton
                />
              </Grid>

              <Grid container item xs={6}>
                <DateTimePicker
                  fullWidth
                  value={endDate || null}
                  disablePast
                  className={classes.textField}
                  onChange={handleEndDateChange}
                  label="Campaign End Date"
                  showTodayButton
                />
              </Grid>
            </Grid>
          </div>
          <div className="margin-bottom">
            <Box width="98%" paddingLeft={0} paddingRight={1}>
              <Autocomplete
                className={classes.autoComplete}
                id="keywords"
                freeSolo={true}
                multiple={true}
                options={campaign.keywords}
                onChange={handleKeywordsChange}
                getOptionLabel={(option) => option}
                defaultValue={campaign.keywords}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.textField}
                    variant="outlined"
                    label="Keywords"
                    placeholder="Add keywords for campaign"
                  />
                )}
              />
            </Box>
          </div>
        </Grid>
        <ToastContainer />
      </div>
    </Fade>
  );
};
