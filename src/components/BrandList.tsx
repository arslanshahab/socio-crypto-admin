import React from 'react';
import { useQuery } from '@apollo/client';
import { LIST_ORGS } from '../operations/queries/admin';
import { ListOrgs } from '../types';
import { Grid, Typography } from '@material-ui/core';

export const BrandList: React.FC = () => {
  const { data, loading } = useQuery<ListOrgs>(LIST_ORGS);
  return (
    <Grid container direction={'column'} spacing={1}>
      <Grid container item className="brand-list-header">
        <Grid item>
          <Typography>Name</Typography>
        </Grid>
      </Grid>
      {loading ? (
        <div />
      ) : (
        data &&
        data.listOrgs.map((org, index) => {
          return (
            <Grid item key={index} className="brand-item">
              <Typography>{org.name}</Typography>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};
