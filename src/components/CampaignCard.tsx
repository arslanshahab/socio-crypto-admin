import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface Props {
  name: string;
}

export const CampaignCard: React.FC<Props> = ({ name }) => {
  return (
    <div>
      <Grid container spacing={5}>
        <Grid item container xs={2}>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item container xs={2}>
          <Typography>$156.32</Typography>
        </Grid>
        <Grid item container xs={2}>
          <Typography>Tier 4</Typography>
        </Grid>
        <Grid item container xs={2}>
          <Typography>95463</Typography>
        </Grid>
        <Grid item container xs={2}>
          <Typography>6546</Typography>
        </Grid>
        <Grid item container xs={2}>
          <Typography>$123</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
