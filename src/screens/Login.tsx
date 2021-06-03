import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fireClient, getAuthPersistence } from '../clients/firebase';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { sessionLogin } from '../clients/raiinmaker-api';
import { ChangePasswordDialog } from '../components/ChangePasswordDialog';
import { ReactComponent as RaiinmakerLogo } from '../assets/svg/raiinmaker_logo2x1.svg';
import { ErrorCard } from '../components/Error';
interface UserData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const [changePassword, setChangePassword] = React.useState(false);
  const [error, setError] = useState({
    code: '',
  });
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
    setError({ code: '' });
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
      setError(e);
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
        <Grid className="form-container">
          <Paper className="login-form">
            <div className="padding-bottom">
              <RaiinmakerLogo className="login-logo"></RaiinmakerLogo>
            </div>
            <form>
              <Grid container item xs={12} spacing={0} className="padding-bottom">
                <TextField
                  required
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid container item xs={12} spacing={0} className="padding-bottom">
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <div>
                {error.code !== '' ? (
                  <ErrorCard
                    data={'The email and password you entered does not match the information we have on file.'}
                    close={() => setError({ code: '' })}
                  ></ErrorCard>
                ) : (
                  <div />
                )}
                <Button className="button" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
