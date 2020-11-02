import React, { ChangeEvent, useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { updateCampaignState } from '../../redux/slices/campaign';
import { RootState } from '../../redux/reducer';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

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

  return (
    <Grid container className="form-container" direction={'column'}>
      <Grid item style={{ marginLeft: '5vh', marginRight: '5vh' }}>
        <TextField
          label={'Name of Campaign'}
          name={'name'}
          placeholder={'name'}
          fullWidth
          margin={'normal'}
          onChange={handleCampaignChange}
        />
      </Grid>
      <Grid container className="form-container" direction={'row'} spacing={8} justify={'center'}>
        <Grid item className="form-item">
          <TextField
            label={'Company Tagline'}
            name={'tagline'}
            placeholder={'Company Tagline'}
            margin={'normal'}
            onChange={handleCampaignChange}
            className="text-field"
          />
        </Grid>
        <Grid item className="form-item">
          <TextField
            label={'Landing Page URL'}
            name={'target'}
            placeholder={'Landing Page URL'}
            margin={'normal'}
            onChange={handleCampaignChange}
            className="text-field"
          />
        </Grid>
        <Grid item className="form-item">
          <TextField
            style={{ width: '250px' }}
            label={'Landing Page Video URL'}
            name={'targetVideo'}
            placeholder={'Landing Page Video URL'}
            margin={'normal'}
            onChange={handleCampaignChange}
            className="text-field"
          />
        </Grid>
      </Grid>
      <Grid container className="form-container" direction={'row'} spacing={8} justify={'center'}>
        <Grid item className="form-item">
          <DateTimePicker
            value={beginDate || new Date()}
            style={{ width: '300px' }}
            disablePast
            onChange={handleBeginDateChange}
            label="Beginning Date of Campaign"
            showTodayButton
          />
        </Grid>
        <Grid item className="form-item">
          <DateTimePicker
            value={endDate || new Date()}
            style={{ width: '300px' }}
            disablePast
            onChange={handleEndDateChange}
            label="Ending Date of Campaign"
            showTodayButton
          />
        </Grid>
      </Grid>
      <Grid container className="form-container" direction={'row'} spacing={8} justify={'center'}>
        <Grid item className="form-item">
          <TextField
            label={'How many tiers (1-10)'}
            name={'numOfTiers'}
            placeholder={'How many tiers'}
            margin={'normal'}
            onChange={handleConfigChange}
            className="text-field"
          />
        </Grid>
        <Grid item className="form-item">
          <TextField
            style={{ width: '250px' }}
            label={'How many suggested posts?'}
            name={'numOfSuggestedPosts'}
            placeholder={'How many suggested posts?'}
            margin={'normal'}
            onChange={handleConfigChange}
            className="text-field"
          />
        </Grid>
        <Grid item className="form-item">
          <TextField
            style={{ width: '250px' }}
            label={'Initial Reward Offering'}
            name={'initialTotal'}
            placeholder={'Initial Reward Offering'}
            margin={'normal'}
            onChange={handleConfigChange}
            className="text-field"
          />
        </Grid>
      </Grid>
      <Grid container className="form-container" justify={'center'}>
        <Grid item className="form-item">
          <TextField
            style={{ width: '300px', paddingTop: '2em' }}
            id="filled-multiline-static"
            label="description"
            name="description"
            onChange={handleCampaignChange}
            multiline
            rows={5}
            defaultValue="Description"
            variant="filled"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
