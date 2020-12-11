import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { ListEmployees } from '../types';
import { LIST_EMPLOYEES } from '../operations/queries/admin';
import { RegisterUser } from './RegisterUser';

export const UserManagement: React.FC = () => {
  const { data, loading } = useQuery<ListEmployees>(LIST_EMPLOYEES);
  const [openUserDialog, setUserDialog] = useState(false);
  return (
    <div>
      <RegisterUser open={openUserDialog} setOpen={setUserDialog} />
      <Grid container>
        <Grid item xs>
          <Typography variant={'h4'}>Employees</Typography>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs>
          <Button variant={'contained'} color={'primary'} onClick={() => setUserDialog(true)}>
            Add User
          </Button>
        </Grid>
      </Grid>
      <Grid container direction={'column'} spacing={1}>
        <Grid container item className="user-list-header">
          <Grid item style={{ marginTop: '20px' }}>
            <Typography>Name</Typography>
          </Grid>
        </Grid>
        {loading ? (
          <div />
        ) : (
          data &&
          data.listEmployees.map((user, index) => {
            return (
              <Grid item key={index} className="user-item">
                <Typography>{user.name}</Typography>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
};
