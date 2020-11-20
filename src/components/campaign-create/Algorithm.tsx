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
      const label = `Tier ${i + 1}`;
      const id = `${i + 1}`;
      tiers.push(
        <div className="margin-bottom">
          <div>
            {/* <Gri÷d item> */}
            <Typography>{label}</Typography>
          </div>
          <Grid container xs={12} spacing={3} direction={'row'} justify={'center'}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={'Threshold'}
                id={id}
                name={'threshold'}
                placeholder={'Threshold'}
                // margin={'normal'}
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
                // margin={'normal'}
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
    <div className="init-campaign-container padding-top">
      <div className="margin-bottom">
        <Grid container justify={'flex-start'}>
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
      </div>
      <Grid container direction={'row'} justify={'space-evenly'} alignItems={'flex-start'}>
        <Grid container item xs={6} justify={'flex-start'} direction={'column'} alignItems={'stretch'} spacing={3}>
          <Grid item xs={11}>
            <TextField
              label={'Click Value'}
              name={'clicks'}
              placeholder={'Click Value'}
              onChange={handleValueChange}
              className="text-field"
              fullWidth
            />
          </Grid>
          <Grid xs={11} item>
            <TextField
              label={'View Value'}
              name={'views'}
              placeholder={'View Value'}
              // margin={'normal'}
              fullWidth
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid xs={11} item>
            <TextField
              label={'Submission Value'}
              fullWidth
              name={'submissions'}
              placeholder={'Submission Value'}
              // margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid xs={11} item>
            <TextField
              label={'Share Value'}
              name={'shares'}
              fullWidth
              placeholder={'Share Value'}
              // margin={'normal'}
              onChange={handleValueChange}
              className="text-field"
            />
          </Grid>
          <Grid xs={11} item>
            <TextField
              label={'Like Value'}
              name={'likes'}
              placeholder={'Like Value'}
              // margin={'normal'}
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
  );
};
