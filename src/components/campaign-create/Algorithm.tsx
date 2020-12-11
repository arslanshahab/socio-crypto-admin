import React, { ChangeEvent } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';
import { Fade } from 'react-awesome-reveal';

export const Algorithm: React.FC = () => {
  const numOfTiers = useSelector((state: RootState) => state.newCampaign.config.numOfTiers);
  const initialOffering = useSelector((state: RootState) => state.newCampaign.config.initialTotal);
  const dispatch = useDispatch();
  const handleTierChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    dispatch(
      updateCampaignState({ cat: 'algoTiers', tier: event.target.id, key: event.target.name, val: event.target.value }),
    );
  };
  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    dispatch(updateCampaignState({ cat: 'algoValues', key: event.target.name, val: event.target.value }));
  };
  const renderTiers = () => {
    const tiers: JSX.Element[] = [];
    for (let i = 0; i < numOfTiers; i++) {
      const label = `Tier ${i + 1}`;
      const id = `${i + 1}`;
      tiers.push(
        <div className="margin-bottom">
          <div>
            <Typography component="div">{label}</Typography>
          </div>
          <Grid container xs={12} spacing={3} direction={'row'} justify={'center'}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Threshold'}
                id={id}
                name={'threshold'}
                placeholder={'Threshold'}
                onChange={handleTierChange}
                className="text-field"
                defaultValue={i === 0 ? 0 : undefined}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={'Total Coiins'}
                id={id}
                name={'totalCoiins'}
                placeholder={'Total Coiins'}
                fullWidth
                onChange={handleTierChange}
                className="text-field"
                defaultValue={i === 0 ? initialOffering : undefined}
              />
            </Grid>
          </Grid>
        </div>,
      );
    }
    return tiers;
  };
  return (
    <Fade>
      <div className="init-campaign-container padding-top">
        <div className="margin-bottom">
          <Grid container justify={'flex-start'}>
            <Grid item xs={6} spacing={3} className="form-item">
              <Typography component="div" style={{ textAlign: 'center' }} variant={'h5'}>
                Values
              </Typography>
              <div className="text-card">
                <p>Define the rate campaign participants will be rewarded for the following actions.</p>
              </div>
            </Grid>
            <Grid item xs={6} spacing={3} className="form-item">
              <Typography component="div" style={{ textAlign: 'center' }} variant={'h5'}>
                Rewards
              </Typography>
              <div className="text-card">
                <p>
                  Use multiple reward tiers to insentivise participation on your campaign. When the global influence
                  reaches the defined tresholds the campaign reward payout will updated.
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container direction={'row'} justify={'space-evenly'} alignItems={'flex-start'}>
          <Grid container item xs={6} justify={'flex-start'} direction={'column'} alignItems={'stretch'} spacing={3}>
            <Grid item xs={11}>
              <TextField
                label={'Click Value'}
                name={'click'}
                defaultValue={1}
                placeholder={'Click Value'}
                onChange={handleValueChange}
                className="text-field"
                fullWidth
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'View Value'}
                name={'view'}
                placeholder={'View Value'}
                defaultValue={2}
                fullWidth
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Submission Value'}
                fullWidth
                defaultValue={6}
                name={'submission'}
                placeholder={'Submission Value'}
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Share Value'}
                name={'shares'}
                fullWidth
                defaultValue={9}
                placeholder={'Share Value'}
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Like Value'}
                name={'likes'}
                defaultValue={3}
                placeholder={'Like Value'}
                onChange={handleValueChange}
                className="text-field"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={3} direction={'column'} justify={'flex-start'}>
            {renderTiers().map((element) => element)}
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};
