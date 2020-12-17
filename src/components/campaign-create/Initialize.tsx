import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { RootState } from '../../redux/reducer';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReactSVG } from 'react-svg';
import { Fade } from 'react-awesome-reveal';

import icon from '../../assets/svg/camera.svg';

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
    if (event.target.name === 'initialTotal') {
      dispatch(updateCampaignState({ cat: 'algoTiers', tier: '1', key: 'threshold', val: '0' }));
      dispatch(
        updateCampaignState({
          cat: 'algoTiers',
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
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'beginDate', val: dateIsoString }));
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'endDate', val: dateIsoString }));
  };

  const getBase64 = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (reader.result) {
        dispatch(updateCampaignState({ cat: 'image', key: 'image', val: reader.result }));
      }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleImage = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files != null && files.length) {
      const formData = new FormData();
      formData.append(files[0].name, files[0]);
      getBase64(files[0]);
    }
  };
  return (
    <Fade>
      <div className="init-campaign-container">
        <Grid container className="form-container" direction={'column'}>
          <div className="image-upload-container">
            <label htmlFor="single">
              <div>
                {campaign.image ? (
                  <div className="image-preview">
                    <img src={campaign.image}></img>
                  </div>
                ) : (
                  <ReactSVG src={icon} color="#3B5998" />
                )}
              </div>
            </label>
            <input className="hidden" type="file" id="single" onChange={handleImage} />
          </div>
          <div className="margin-bottom">
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6}>
                <TextField
                  label={'Name of Campaign'}
                  name={'name'}
                  placeholder={'name'}
                  fullWidth
                  value={campaign.name}
                  variant="outlined"
                  margin={'normal'}
                  onChange={handleCampaignChange}
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  fullWidth
                  label={'Company Name'}
                  disabled
                  variant="outlined"
                  name={'company'}
                  placeholder={'Company Name'}
                  margin={'normal'}
                  defaultValue={props.userData ? props.userData.company : null}
                  onChange={handleCampaignChange}
                  className="text-field"
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
                  placeholder={'Landing Page URL'}
                  margin={'normal'}
                  value={campaign.target}
                  variant="outlined"
                  onChange={handleCampaignChange}
                  className="text-field"
                />
              </Grid>
              <Grid container item xs={6}>
                <TextField
                  label={'Landing Page Video URL'}
                  name={'targetVideo'}
                  placeholder={'Landing Page Video URL'}
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
                  label={'How many tiers (1-10)'}
                  fullWidth
                  variant="outlined"
                  name={'numOfTiers'}
                  defaultValue={props.campaignType === 'raffle' ? 0 : 3}
                  placeholder={'How many tiers'}
                  margin={'normal'}
                  value={campaign.config.numOfTiers}
                  onChange={handleConfigChange}
                  className="text-field"
                  disabled={props.campaignType === 'raffle'}
                />
              </Grid>
              <Grid container item xs={6} spacing={0}>
                <TextField
                  label={'# of post templates'}
                  name={'numOfSuggestedPosts'}
                  placeholder={'How many suggested posts?'}
                  margin={'normal'}
                  defaultValue={2}
                  type="number"
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
                  label="Beginning Date of Campaign"
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
                  label="Ending Date of Campaign"
                  showTodayButton
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Fade>
  );
};
