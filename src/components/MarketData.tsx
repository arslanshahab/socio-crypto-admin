import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

export const MarketData: React.FC = () => {
  return (
    <div className="market-layout">
      <Paper className="market-data-summary">
        <Grid container>
          <Grid container item justify={'flex-end'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>152</Typography>
            </Grid>
            <Grid item>
              <Typography>INFs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>345</Typography>
            </Grid>
            <Grid item>
              <Typography>POSTs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>1.4k</Typography>
            </Grid>
            <Grid item>
              <Typography>DAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>1.1k</Typography>
            </Grid>
            <Grid item>
              <Typography>CAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>10.5k</Typography>
            </Grid>
            <Grid item>
              <Typography>Reach</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>4.04%</Typography>
            </Grid>
            <Grid item>
              <Typography>Eng Rate</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography>Influencer Data</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography>Discovery</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography>Discovery</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography>Discovery</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
