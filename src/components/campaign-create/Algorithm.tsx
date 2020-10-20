import React, { ChangeEvent } from 'react';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';

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
      const label = `Tier ${i + 1}:`;
      const id = `${i + 1}`;
      tiers.push(
        <Grid container spacing={3} direction={'row'} justify={'center'}>
          <Grid item>
            <Typography style={{ paddingTop: '38px' }}>{label}</Typography>
          </Grid>
          <Grid item className="form-item">
            <TextField
              label={'Threshold'}
              id={id}
              name={'threshold'}
              placeholder={'Threshold'}
              margin={'normal'}
              onChange={handleTierChange}
              className="text-field"
              defaultValue={i === 0 ? 0 : undefined}
            />
          </Grid>
          <Grid item className="form-item">
            <TextField
              label={'Total Coiins'}
              id={id}
              name={'totalCoiins'}
              placeholder={'Total Coiins'}
              margin={'normal'}
              onChange={handleTierChange}
              className="text-field"
              defaultValue={i === 0 ? initialOffering : undefined}
            />
          </Grid>
        </Grid>,
      );
    }
    return tiers;
  };
  return (
    <div>
      <Grid container justify={'center'}>
        <Grid item xs={6} className="form-item">
          <Typography style={{ textAlign: 'center' }} variant={'h5'}>
            Values
          </Typography>
        </Grid>
        <Grid item xs={6} className="form-item">
          <Typography style={{ textAlign: 'center' }} variant={'h5'}>
            Rewards
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction={'row'} justify={'space-evenly'} alignItems={'center'}>
        <Grid container item xs={6} justify={'center'} direction={'column'} alignItems={'center'}>
          <Grid item>
            <TextField
              label={'Click Value'}
              name={'clicks'}
              placeholder={'Click Value'}
              margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid item>
            <TextField
              label={'View Value'}
              name={'views'}
              placeholder={'View Value'}
              margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Submission Value'}
              name={'submissions'}
              placeholder={'Submission Value'}
              margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Share Value'}
              name={'shares'}
              placeholder={'Share Value'}
              margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid item>
            <TextField
              label={'Like Value'}
              name={'likes'}
              placeholder={'Like Value'}
              margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
        </Grid>
        <Grid container item xs={6} spacing={3} direction={'row'} justify={'center'}>
          {renderTiers().map((element) => element)}
        </Grid>
      </Grid>
    </div>
  );
};
