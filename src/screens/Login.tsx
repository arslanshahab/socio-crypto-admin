import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebase } from '../firebase';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

interface UserData {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  } as UserData);

  const handleClick = () => {
    history.push('/register');
  };

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
      console.log('email and password', values.email, values.password);
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      history.push('/dashboard');
    } catch (e) {
      console.log('error logging in: ', e);
    }
  };

  return (
    <Grid container className="login-layout" justify={'center'}>
      <Grid item>
        <Paper>
          <form className="login-form">
            <h1>Login</h1>
            <div>
              <TextField required type="text" name="email" label="Email" placeholder="Email" onChange={handleChange} />
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
            <div>
              <Button onClick={handleClick}>Register</Button>
            </div>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
