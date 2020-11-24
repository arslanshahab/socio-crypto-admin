import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { RootState } from '../../redux/reducer';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReactSVG } from 'react-svg';
import icon from '../../assets/svg/camera.svg';

export const Initialize: React.FC = () => {
  const dispatch = useDispatch();
  const beginDate = useSelector((state: RootState) => state.newCampaign.beginDate);
  const endDate = useSelector((state: RootState) => state.newCampaign.endDate);
  const handleCampaignChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    dispatch(updateCampaignState({ cat: 'info', key: event.target.name, val: event.target.value }));
  };
  const handleConfigChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    if (event.target.name === 'initialTotal') {
      dispatch(updateCampaignState({ cat: 'algoTiers', tier: '1', key: 'threshold', val: '0' }));
      dispatch(updateCampaignState({ cat: 'algoTiers', tier: '1', key: 'totalCoiins', val: event.target.value }));
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
    <div className="init-campaign-container">
      <Grid container className="form-container" direction={'column'}>
        <div className="image-upload-container">
          <label htmlFor="single">
            <ReactSVG src={icon} color="#3B5998" />
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
                variant="outlined"
                margin={'normal'}
                onChange={handleCampaignChange}
              />
            </Grid>
            <Grid container item xs={6}>
              <TextField
                fullWidth
                label={'Company Name'}
                variant="outlined"
                name={'company'}
                placeholder={'Company Name'}
                margin={'normal'}
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
                onChange={handleCampaignChange}
                fullWidth
                variant="outlined"
                className="text-field"
              />
            </Grid>
          </Grid>
        </div>
        {/* </Grid> */}
        {/* <Grid container className="form-container" direction={'row'} spacing={8} justify={'center'}> */}
        {/* <Grid item className="form-item"> */}
        <div className="margin-bottom">
          <Grid container item xs={12} spacing={3}>
            <Grid container item xs={6} spacing={0}>
              <TextField
                label={'How many tiers (1-10)'}
                fullWidth
                variant="outlined"
                name={'numOfTiers'}
                placeholder={'How many tiers'}
                margin={'normal'}
                onChange={handleConfigChange}
                className="text-field"
              />
            </Grid>
            {/* <Grid item className="form-item"> */}
            <Grid container item xs={6} spacing={0}>
              <TextField
                label={'# of post templates'}
                name={'numOfSuggestedPosts'}
                placeholder={'How many suggested posts?'}
                margin={'normal'}
                onChange={handleConfigChange}
                className="text-field"
                fullWidth
                variant="outlined"
              />
            </Grid>
            {/* <Grid item className="form-item"> */}
          </Grid>
        </div>
        {/* </Grid> */}
        {/* <Grid container className="form-container" justify={'center'}> */}
        {/* <Grid item className="form-item"> */}
        <div className="margin-bottom">
          <Grid container item xs={12} spacing={3}>
            <Grid container item xs={6}>
              <TextField
                label={'Initial Reward Offering'}
                name={'initialTotal'}
                placeholder={'Initial Reward Offering'}
                margin={'normal'}
                onChange={handleConfigChange}
                fullWidth
                variant="outlined"
                className="text-field"
              />
            </Grid>
            <Grid container item xs={6}>
              <TextField
                label={'Campaign Tagline'}
                name={'tagline'}
                placeholder={'Campaign Tagline'}
                margin={'normal'}
                onChange={handleCampaignChange}
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
                // style={{ width: '300px', paddingTop: '2em' }}
                // id="filled-multiline-static"
                label="Description"
                name="Description"
                onChange={handleCampaignChange}
                multiline
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
                // disablePast
                variant="dialog"
                fullWidth
                onChange={handleBeginDateChange}
                label="Beginning Date of Campaign"
                showTodayButton
              />
            </Grid>

            <Grid container item xs={6}>
              <DateTimePicker
                fullWidth
                // fullWidth
                value={endDate || null}
                disablePast
                onChange={handleEndDateChange}
                label="Ending Date of Campaign"
                showTodayButton
              />
            </Grid>
          </Grid>
        </div>
        {/* </Grid> */}
      </Grid>
    </div>
  );
};
