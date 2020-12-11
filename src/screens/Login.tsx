import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fireClient, getAuthPersistence } from '../clients/firebase';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { sessionLogin } from '../clients/raiinmaker-api';
import { ChangePasswordDialog } from '../components/ChangePasswordDialog';

interface UserData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const [changePassword, setChangePassword] = React.useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  } as UserData);

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await fireClient.auth().setPersistence(getAuthPersistence);
      await fireClient.auth().signInWithEmailAndPassword(values.email, values.password);
      const { status, body } = await sessionLogin();
      if (status === 200) {
        if (body.resetPass) setChangePassword(true);
        else history.push('/dashboard/campaigns');
      } else {
        throw Error('invalid login');
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return (
    <div>
      <ChangePasswordDialog open={changePassword} setOpen={setChangePassword} email={values.email} />
      <Grid
        container
        className="login-layout"
        justify={'center'}
        direction={'column'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item>
          <Paper className="login-form">
            <form>
              <Typography>Login</Typography>
              <div>
                <TextField
                  required
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button onClick={handleSubmit}>Login</Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
