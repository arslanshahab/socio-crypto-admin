import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Paper, TextField } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { fireClient, getAuthPersistence } from '../clients/firebase';
import { sessionLogin } from '../clients/raiinmaker-api';

interface FormItems {
  email: string;
  password: string;
  orgName: string;
}

const NEW_ORG = gql(`
  mutation newOrg($orgName: String!) {
    newOrg(orgName: $orgName)
  }
`);

export const Register: React.FC = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    orgName: '',
  } as FormItems);
  const [newOrg, { error, data }] = useMutation(NEW_ORG, {
    variables: { orgName: values.orgName },
  });

  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event?.preventDefault();
    try {
      await fireClient.auth().setPersistence(getAuthPersistence);
      await fireClient.auth().createUserWithEmailAndPassword(values.email, values.password);
      const res = await sessionLogin();
      if (res.status === 200) {
        console.log('creating org');
        await newOrg();
        if (error) throw new Error(`ERROR: error creating new org ${error}`);
        history.push('/dashboard/campaigns');
      } else {
        throw new Error(res.statusText);
      }
    } catch (e) {
      console.log('Registration error', e);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Paper>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              type="orgName"
              name="orgName"
              id="orgName"
              label="Name of Brand"
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField type="email" name="email" placeholder="Email" onChange={handleChange} />
          </div>
          <div>
            <TextField type="password" name="password" placeholder="Password" onChange={handleChange} />
          </div>
          <button type="submit">Sign Up</button>
          <p>Already have account?</p>
          <button onClick={handleClick}>Login</button>
        </form>
      </Paper>
    </div>
  );
};
