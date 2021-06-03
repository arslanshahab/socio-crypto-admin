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
import { ToastContainer, toast } from 'react-toastify';

import icon from '../../assets/svg/camera.svg';
import { handleImage } from '../../helpers/utils';

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

  const displayDateError = () => {
    toast.error('Beginning date must be before end date', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
    });
  };

  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (endDate && dateIsoString && new Date(endDate).getTime() < new Date(dateIsoString).getTime()) {
      return displayDateError();
    }
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'beginDate', val: dateIsoString }));
  };

  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (beginDate && dateIsoString && new Date(beginDate).getTime() >= new Date(dateIsoString).getTime()) {
      return displayDateError();
    }
    if (dateIsoString) dispatch(updateCampaignState({ cat: 'info', key: 'endDate', val: dateIsoString }));
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
                    <img src={campaign.image} alt="image" />
                  </div>
                ) : (
                  <ReactSVG src={icon} color="#3B5998" />
                )}
              </div>
            </label>
            <input
              className="hidden"
              type="file"
              id="single"
              onChange={(e) => handleImage(e, dispatch, 'campaign-image')}
            />
            <p className="margin-bottom center-text setup-campaign-question">
              {campaign.image ? 'Update Campaign Image' : 'Add Campaign Image'}
            </p>
          </div>
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
        </Grid>
        <ToastContainer />
      </div>
    </Fade>
  );
};
